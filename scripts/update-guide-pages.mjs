/**
 * Ajoute une image hero et améliore les meta-titles/descriptions
 * sur les 18 pages de guide statiques.
 *
 * Usage : node scripts/update-guide-pages.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Configuration de chaque page guide
const GUIDE_PAGES = [
  // ── Français ──
  {
    file: 'src/pages/guide-seo-local/google-business-profile.astro',
    image: '/images/guide/fr-google-business-profile.webp',
    title: 'Google Business Profile : guide complet 2025 | visibilite-locale.online',
    description: 'Optimisez votre fiche Google Business Profile étape par étape. Apparaissez dans le pack local, attirez plus de clients dès maintenant.',
  },
  {
    file: 'src/pages/guide-seo-local/citations-locales.astro',
    image: '/images/guide/fr-citations-locales.webp',
    title: 'Citations locales NAP : guide complet pour le SEO | visibilite-locale.online',
    description: 'Maîtrisez les citations locales et la cohérence NAP pour booster votre référencement local. Annuaires, outils et bonnes pratiques.',
  },
  {
    file: 'src/pages/guide-seo-local/avis-clients.astro',
    image: '/images/guide/fr-avis-clients.webp',
    title: 'Avis clients et SEO local : gérer sa réputation en ligne | visibilite-locale.online',
    description: 'Générez, gérez et répondez aux avis Google pour améliorer votre classement local. Stratégie complète pour les TPE et PME.',
  },
  {
    file: 'src/pages/guide-seo-local/contenu-local.astro',
    image: '/images/guide/fr-contenu-local.webp',
    title: 'Contenu local : créer des pages qui rankent localement | visibilite-locale.online',
    description: 'Créez du contenu optimisé pour la recherche locale. Pages de service, articles de blog géolocalisés et stratégie éditoriale locale.',
  },
  {
    file: 'src/pages/guide-seo-local/backlinks-locaux.astro',
    image: '/images/guide/fr-backlinks-locaux.webp',
    title: 'Backlinks locaux : obtenir des liens de qualité pour le SEO | visibilite-locale.online',
    description: 'Construisez un profil de liens locaux solide. Partenariats, associations, presse locale : les meilleures sources de backlinks.',
  },
  {
    file: 'src/pages/guide-seo-local/commerces.astro',
    image: '/images/guide/fr-commerces.webp',
    title: 'SEO local pour les commerces de proximité : guide pratique | visibilite-locale.online',
    description: 'Stratégie SEO local adaptée aux commerces de proximité. Attirez des clients dans votre zone de chalandise grâce à Google.',
  },

  // ── English ──
  {
    file: 'src/pages/en/guide-seo-local/google-business-profile.astro',
    image: '/images/guide/en-google-business-profile.webp',
    title: 'Google Business Profile: Complete 2025 Guide | visibilite-locale.online',
    description: 'Step-by-step guide to optimize your Google Business Profile. Rank in the local pack and attract more customers today.',
  },
  {
    file: 'src/pages/en/guide-seo-local/local-citations.astro',
    image: '/images/guide/en-local-citations.webp',
    title: 'Local Citations & NAP: Complete SEO Guide | visibilite-locale.online',
    description: 'Master local citations and NAP consistency to boost your local search rankings. Best directories, tools, and strategies.',
  },
  {
    file: 'src/pages/en/guide-seo-local/customer-reviews.astro',
    image: '/images/guide/en-customer-reviews.webp',
    title: 'Customer Reviews & Local SEO: Reputation Management Guide | visibilite-locale.online',
    description: 'Generate, manage and respond to Google reviews to improve your local ranking. Complete strategy for small businesses.',
  },
  {
    file: 'src/pages/en/guide-seo-local/local-content.astro',
    image: '/images/guide/en-local-content.webp',
    title: 'Local Content Strategy: Create Pages That Rank Locally | visibilite-locale.online',
    description: 'Create content optimized for local search. Service pages, geo-targeted blog posts, and local editorial strategy.',
  },
  {
    file: 'src/pages/en/guide-seo-local/local-backlinks.astro',
    image: '/images/guide/en-local-backlinks.webp',
    title: 'Local Backlinks: Build Quality Links for Local SEO | visibilite-locale.online',
    description: 'Build a strong local link profile. Partnerships, associations, local press: the best sources for local backlinks.',
  },
  {
    file: 'src/pages/en/guide-seo-local/businesses.astro',
    image: '/images/guide/en-businesses.webp',
    title: 'Local SEO for Small Businesses: Practical Guide | visibilite-locale.online',
    description: 'Local SEO strategy tailored for small and local businesses. Attract customers in your area through Google search.',
  },

  // ── Español ──
  {
    file: 'src/pages/es/guide-seo-local/google-business-profile.astro',
    image: '/images/guide/es-google-business-profile.webp',
    title: 'Google Business Profile: Guia Completa 2025 | visibilite-locale.online',
    description: 'Optimiza tu ficha de Google Business Profile paso a paso. Aparece en el paquete local y atrae mas clientes hoy.',
  },
  {
    file: 'src/pages/es/guide-seo-local/citas-locales.astro',
    image: '/images/guide/es-citas-locales.webp',
    title: 'Citas Locales y NAP: Guia SEO Completa | visibilite-locale.online',
    description: 'Domina las citas locales y la coherencia NAP para mejorar tu posicionamiento local. Directorios, herramientas y buenas practicas.',
  },
  {
    file: 'src/pages/es/guide-seo-local/resenas-clientes.astro',
    image: '/images/guide/es-resenas-clientes.webp',
    title: 'Resenas de Clientes y SEO Local: Gestiona tu Reputacion | visibilite-locale.online',
    description: 'Genera, gestiona y responde a las resenas de Google para mejorar tu clasificacion local. Estrategia completa para PYMES.',
  },
  {
    file: 'src/pages/es/guide-seo-local/contenido-local.astro',
    image: '/images/guide/es-contenido-local.webp',
    title: 'Contenido Local: Crea Paginas que Posicionan Localmente | visibilite-locale.online',
    description: 'Crea contenido optimizado para la busqueda local. Paginas de servicio, articulos geolocalizados y estrategia editorial local.',
  },
  {
    file: 'src/pages/es/guide-seo-local/backlinks-locales.astro',
    image: '/images/guide/es-backlinks-locales.webp',
    title: 'Backlinks Locales: Consigue Enlaces de Calidad para SEO | visibilite-locale.online',
    description: 'Construye un perfil de enlaces locales solido. Asociaciones, prensa local, directorios: las mejores fuentes de backlinks.',
  },
  {
    file: 'src/pages/es/guide-seo-local/comercios.astro',
    image: '/images/guide/es-comercios.webp',
    title: 'SEO Local para Comercios: Guia Practica | visibilite-locale.online',
    description: 'Estrategia SEO local adaptada para comercios de proximidad. Atrae clientes en tu zona con Google Maps y busqueda local.',
  },
];

// Snippet image à injecter entre les deux sections (hero et contenu)
function buildImageSnippet(imagePath) {
  return `
  <!-- Image hero -->
  <div class="mx-auto max-w-3xl px-4 pt-8">
    <img
      src="${imagePath}"
      alt=""
      class="w-full rounded-xl object-cover shadow-sm"
      loading="eager"
      width="1200"
      height="400"
      style="max-height:320px"
      onerror="this.style.display='none'"
    />
  </div>
`;
}

for (const page of GUIDE_PAGES) {
  const filePath = path.join(ROOT, page.file);
  let content;
  try {
    content = await readFile(filePath, 'utf-8');
  } catch (e) {
    console.warn(`  ⚠  fichier introuvable: ${page.file}`);
    continue;
  }

  // 1. Mettre à jour title et description dans <Layout>
  content = content.replace(/title="[^"]*"/, `title="${page.title}"`);
  content = content.replace(/description="[^"]*"/, `description="${page.description}"`);

  // 2. Ajouter ogImage au <Layout> si pas déjà présent
  if (!content.includes('ogImage=')) {
    content = content.replace(
      /(<Layout[^>]*)(lang="[^"]*")(\s*>)/,
      `$1$2\n  ogImage="${page.image}"\n$3`
    );
  }

  // 3. Injecter l'image entre les deux sections (après </section> du hero)
  if (!content.includes('<!-- Image hero -->')) {
    // Trouver la première </section> et insérer l'image après
    const firstSectionEnd = content.indexOf('</section>');
    if (firstSectionEnd !== -1) {
      content =
        content.slice(0, firstSectionEnd + '</section>'.length) +
        buildImageSnippet(page.image) +
        content.slice(firstSectionEnd + '</section>'.length);
    }
  }

  await writeFile(filePath, content, 'utf-8');
  console.log(`  ✅  ${page.file}`);
}

console.log('\n✨  Toutes les pages guide mises à jour !');
