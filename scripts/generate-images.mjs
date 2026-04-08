/**
 * Génère les images illustratives pour tous les articles de blog et pages de guide
 * via l'API Replicate (flux-schnell, illustrations flat design).
 *
 * Usage :
 *   node --env-file=.env.local scripts/generate-images.mjs
 *   node --env-file=.env.local scripts/generate-images.mjs --force   (régénère tout)
 */

import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateImage, downloadWebp } from './lib/replicate-client.mjs';
import { getBlogSlugs, GUIDE_PAGES } from './lib/slugs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FORCE = process.argv.includes('--force');
// Compte Replicate < $5 : rate limit 6 req/min → concurrence 1 + délai 12s
const CONCURRENCY = 1;
const DELAY_BETWEEN_REQUESTS_MS = 12000;

const API_KEY = process.env.REPLICATE_API_KEY;
if (!API_KEY) {
  console.error('❌  REPLICATE_API_KEY manquant dans .env.local');
  process.exit(1);
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function processItem({ dest, prompt, slug, page, lang }) {
  const label = slug || `${lang}-${page}`;
  const destAbs = path.join(ROOT, dest);

  if (!FORCE && (await fileExists(destAbs))) {
    console.log(`  ⏭  skip (existe déjà): ${dest}`);
    return;
  }

  try {
    console.log(`  🎨  génération: ${label}`);
    const url = await generateImage(prompt, API_KEY);
    await downloadWebp(url, destAbs);
    console.log(`  ✅  sauvegardé: ${dest}`);
    // Respecter le rate limit : 6 req/min → attendre entre chaque image
    await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS_MS));
  } catch (err) {
    console.error(`  ❌  erreur pour ${label}: ${err.message}`);
  }
}

async function runPool(items, fn, concurrency) {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      await fn(item);
    }
  });
  await Promise.all(workers);
}

// --- main ---
const blogSlugs = await getBlogSlugs();
const all = [...blogSlugs, ...GUIDE_PAGES];

console.log(`\n🚀  Génération de ${all.length} images (concurrence: ${CONCURRENCY})\n`);
await runPool(all, processItem, CONCURRENCY);
console.log('\n✨  Terminé !');
