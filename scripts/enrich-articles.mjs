/**
 * Enrichit tous les articles de blog (90 MDX) via Claude Haiku :
 * - Ajoute 2-3 nouvelles sections H2 avec conseils pratiques
 * - Génère 5 FAQ dans la langue de l'article
 * - Améliore le meta-title (60-65 chars) et meta-description (150-160 chars)
 * - Ajoute le champ `image` pointant vers l'image générée par generate-images.mjs
 *
 * Usage :
 *   node --env-file=.env.local scripts/enrich-articles.mjs
 *   node --env-file=.env.local scripts/enrich-articles.mjs --force
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');
const FORCE = process.argv.includes('--force');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY manquant dans .env.local');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Appel Claude Haiku
// ---------------------------------------------------------------------------
async function callHaiku(systemPrompt, userPrompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        // Rate limit → attendre davantage
        if (res.status === 429 && attempt < retries) {
          const wait = attempt * 5000;
          console.log(`    ⏳  rate limit, attente ${wait / 1000}s...`);
          await new Promise(r => setTimeout(r, wait));
          continue;
        }
        throw new Error(`Anthropic ${res.status}: ${err}`);
      }

      const data = await res.json();
      return data.content[0].text;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`    ⚠  tentative ${attempt} échouée: ${err.message}`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ---------------------------------------------------------------------------
// Parsing / reconstruction MDX
// ---------------------------------------------------------------------------
function parseMdx(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Frontmatter introuvable');
  const frontmatter = yaml.load(match[1]);
  const body = match[2];
  return { frontmatter, body };
}

function buildMdx(fm, body) {
  const lines = [];
  lines.push(`title: ${JSON.stringify(fm.title)}`);
  lines.push(`description: ${JSON.stringify(fm.description)}`);
  lines.push(`date: "${fm.date}"`);
  lines.push(`lang: "${fm.lang}"`);
  if (fm.slug) lines.push(`slug: "${fm.slug}"`);
  if (fm.image) lines.push(`image: "${fm.image}"`);
  if (fm.faqs?.length) {
    lines.push('faqs:');
    for (const faq of fm.faqs) {
      // Réponse sur une ligne, guillemets YAML
      const q = fm.lang === 'fr' ? faq.question : faq.question;
      const a = String(faq.answer).replace(/\n/g, ' ').replace(/"/g, "'");
      lines.push(`  - question: ${JSON.stringify(q)}`);
      lines.push(`    answer: ${JSON.stringify(a)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

function injectSections(body, sections) {
  const newContent = sections
    .map(s => `## ${s.heading}\n\n${s.body}`)
    .join('\n\n');
  return body.trimEnd() + '\n\n' + newContent + '\n';
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `Tu es un expert en SEO local et rédacteur de contenu web.
Étant donné un article de blog existant, retourne un objet JSON avec exactement ces clés :
{
  "sections": [   // 2 à 3 nouvelles sections H2 à ajouter (exemples pratiques, cas réels, conseils actionnables NON couverts dans l'article existant)
    { "heading": "...", "body": "..." }  // body en Markdown (peut contenir ## (sous-titres H3), listes, gras)
  ],
  "faqs": [       // exactement 5 questions-réponses FAQ dans la même langue que l'article
    { "question": "...", "answer": "..." }  // answer = une seule phrase ou deux maximum, sans retour à la ligne
  ],
  "title": "...",        // meta-title amélioré, 60-65 caractères, keyword principal + bénéfice concret
  "description": "..."   // meta-description 150-160 caractères, verbe d'action, inclut le keyword
}

RÈGLES STRICTES :
- Écris dans la même langue que l'article (fr/en/es)
- Les nouvelles sections ne doivent PAS répéter ce qui est déjà dans l'article
- Les réponses FAQ sont concises (1-2 phrases max), sans saut de ligne
- Retourne UNIQUEMENT du JSON valide, sans balises markdown, sans commentaires`;

function buildUserPrompt(fm, body) {
  return `Titre de l'article : ${fm.title}
Langue : ${fm.lang}
Contenu actuel :
${body}

Enrichis cet article avec 2-3 nouvelles sections et génère 5 FAQ. Retourne uniquement du JSON valide.`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const files = (await readdir(BLOG_DIR))
  .filter(f => f.endsWith('.mdx'))
  .sort();

console.log(`\n📚  ${files.length} articles à traiter\n`);

let done = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const slug = file.replace('.mdx', '');
  const raw = await readFile(filePath, 'utf-8');

  let frontmatter, body;
  try {
    ({ frontmatter, body } = parseMdx(raw));
  } catch (e) {
    console.error(`  ❌  parsing ${file}: ${e.message}`);
    errors++;
    continue;
  }

  if (!FORCE && frontmatter.faqs?.length) {
    console.log(`  ⏭  skip (déjà enrichi): ${file}`);
    skipped++;
    continue;
  }

  console.log(`  ✍  traitement: ${file}`);

  let enriched;
  try {
    const raw_response = await callHaiku(SYSTEM_PROMPT, buildUserPrompt(frontmatter, body));
    // Nettoyer les éventuels fences markdown autour du JSON
    const cleaned = raw_response.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    enriched = JSON.parse(cleaned);
  } catch (e) {
    console.error(`  ❌  enrichissement ${file}: ${e.message}`);
    errors++;
    continue;
  }

  // Construire le nouveau contenu
  const newBody = injectSections(body, enriched.sections || []);
  const newFm = {
    ...frontmatter,
    title: enriched.title || frontmatter.title,
    description: enriched.description || frontmatter.description,
    image: `/images/blog/${slug}.webp`,
    faqs: enriched.faqs || [],
  };

  const output = buildMdx(newFm, newBody);
  await writeFile(filePath, output, 'utf-8');
  done++;
  console.log(`  ✅  sauvegardé: ${file}`);

  // Pause entre chaque article pour respecter les rate limits
  await new Promise(r => setTimeout(r, 800));
}

console.log(`\n✨  Terminé ! ${done} enrichis, ${skipped} skippés, ${errors} erreurs\n`);
