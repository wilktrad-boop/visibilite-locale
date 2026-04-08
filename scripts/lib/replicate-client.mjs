import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * Génère une image via Replicate flux-schnell (appel synchrone avec Prefer: wait).
 * Gère automatiquement les erreurs 429 avec backoff.
 * @param {string} prompt
 * @param {string} apiKey
 * @param {number} retries
 * @returns {Promise<string>} URL de l'image générée
 */
export async function generateImage(prompt, apiKey, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'wait',
        },
        body: JSON.stringify({
          input: {
            prompt,
            num_outputs: 1,
            output_format: 'webp',
            output_quality: 85,
            width: 1200,
            height: 630,
            num_inference_steps: 4,
          },
        }),
      }
    );

    // Gestion rate limit 429
    if (response.status === 429) {
      let waitMs = 15000;
      try {
        const body = await response.json();
        if (body.retry_after) waitMs = (body.retry_after + 3) * 1000;
      } catch {}
      if (attempt < retries) {
        console.log(`    ⏳  rate limit, attente ${waitMs / 1000}s (tentative ${attempt}/${retries})...`);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      throw new Error(`Replicate 429: rate limit dépassé après ${retries} tentatives`);
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Replicate ${response.status}: ${err}`);
    }

    const prediction = await response.json();

    // Si Prefer:wait n'a pas suffi, poll jusqu'à completion
    if (prediction.status === 'processing' || prediction.status === 'starting') {
      return await pollPrediction(prediction.id, apiKey);
    }

    const outputUrl = Array.isArray(prediction.output)
      ? prediction.output[0]
      : prediction.output;

    if (!outputUrl) throw new Error(`Pas d'output pour la prédiction ${prediction.id}`);
    return outputUrl;
  }
  throw new Error('generateImage: toutes les tentatives ont échoué');
}

async function pollPrediction(id, apiKey, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const p = await res.json();
    if (p.status === 'succeeded') {
      return Array.isArray(p.output) ? p.output[0] : p.output;
    }
    if (p.status === 'failed' || p.status === 'canceled') {
      throw new Error(`Prédiction ${id} échouée : ${p.error}`);
    }
  }
  throw new Error(`Timeout pour la prédiction ${id}`);
}

/**
 * Télécharge un fichier webp depuis une URL et le sauvegarde.
 * @param {string} url
 * @param {string} destPath  chemin absolu du fichier destination
 */
export async function downloadWebp(url, destPath) {
  await mkdir(path.dirname(destPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Téléchargement échoué ${res.status} pour ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buffer);
}
