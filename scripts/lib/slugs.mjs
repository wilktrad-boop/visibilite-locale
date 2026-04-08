import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../../src/content/blog');
const SUFFIX =
  ', flat design vector illustration, clean minimal style, blue and indigo color palette, local business, no text, no letters, white background';

/** Sujets par slug (partie après le préfixe de langue) */
const TOPICS = {
  'google-business-profile': 'Google Business Profile optimization, storefront with map pin, smartphone showing Google Maps',
  'citations-locales': 'local business citations, NAP consistency, online directories, local listings',
  'citations-locales-nap': 'NAP consistency, local citations, business name address phone, online directories',
  'avis-clients': 'customer reviews, star ratings, happy customers, review management',
  'avis-clients-seo-local': 'customer reviews and star ratings for local SEO, review platform icons',
  'contenu-seo-local': 'local SEO content strategy, blog writing, city-specific landing pages',
  'backlinks-locaux': 'local backlinks, link building, local partnerships, city directory',
  'commerces': 'local retail business, shop storefront, local commerce, neighborhood store',
  'google-maps-ads-vs-seo': 'Google Maps advertising versus organic SEO, comparison chart, local search',
  'mots-cles-locaux': 'local keywords research, search bar with city name, keyword tools',
  'schema-local-business': 'structured data schema markup, code snippet, local business rich results',
  'donnees-structurees-avancees': 'advanced structured data, JSON-LD, rich snippets, schema.org',
  'audit-seo-local': 'local SEO audit, checklist, magnifying glass on website, analysis dashboard',
  'mobile-recherche-locale': 'mobile local search, smartphone map navigation, near me search',
  'core-web-vitals-local': 'web performance, Core Web Vitals, page speed, loading metrics',
  'vitesse-seo-local': 'website speed optimization, fast loading website, performance dashboard',
  'page-service-ville': 'city service page, local landing page, city skyline with business icons',
  'reseaux-sociaux-seo-local': 'social media local SEO, social network icons, local business social presence',
  'link-building-local': 'local link building, partnership handshake, local websites network',
  'nap-coherence': 'NAP consistency, name address phone, business information accuracy',
  'photos-gbp': 'Google Business Profile photos, storefront photography, product photos, interior shots',
  'attributs-gbp': 'Google Business Profile attributes, accessibility icons, business features',
  'categories-gbp': 'Google Business Profile categories, business category selection, local search',
  'posts-google-business': 'Google Business posts, social media posts, business updates, events',
  'questions-reponses-gbp': 'Google Business Q&A, customer questions, FAQ management',
  'multi-etablissements-gbp': 'multi-location business management, chain stores, multiple map pins',
  'generer-avis-google': 'generating Google reviews, QR code for reviews, customer feedback request',
  'avis-note-etoiles': 'star ratings and reviews, five stars, customer satisfaction',
  'repondre-avis-negatifs': 'responding to negative reviews, customer service, reputation management',
  'analyser-concurrents-locaux': 'local competitor analysis, competition research, market analysis dashboard',
  'annuaires-locaux': 'local business directories, listing websites, Yelp Pages Jaunes icons',
  'seo-local-restaurants': 'restaurant local SEO, food establishment, menu, dining, Google Maps restaurant pin',
  'seo-local-artisans': 'artisan craftsman local SEO, workshop tools, handmade products, craft business',
  'seo-local-multi-villes': 'multi-city local SEO, multiple city pins on map, geographic expansion',
  'seo-local-vs-sea': 'SEO versus paid ads, organic vs paid comparison, Google search results',
  'contenu-local': 'local content strategy, blog posts, city-specific content, local audience',
  'customer-reviews': 'customer reviews and star ratings, happy customers, review management',
  'local-citations': 'local business citations, online directories, NAP consistency',
  'local-backlinks': 'local backlinks, link building, community partnerships',
  'businesses': 'local business storefront, neighborhood shop, small business owner',
  'local-citations-nap': 'NAP consistency, local citations, business information',
  'resenas-clientes': 'customer reviews and ratings, satisfied customers, review management',
  'citas-locales': 'local citations, business directories, NAP consistency',
  'backlinks-locales': 'local backlinks, link building, community partnerships',
  'comercios': 'local commerce, retail shop, small business storefront',
  'contenido-local': 'local content strategy, city-specific content, local audience',
};

function getTopic(slug) {
  // slug = "fr-google-business-profile" → "google-business-profile"
  const key = slug.replace(/^(fr|en|es)-/, '');
  return TOPICS[key] || `local SEO for small business, ${key.replace(/-/g, ' ')}, map pin, storefront`;
}

/**
 * Retourne la liste de tous les slugs blog depuis le filesystem.
 */
export async function getBlogSlugs() {
  const files = await readdir(BLOG_DIR);
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const slug = f.replace('.mdx', '');
      return {
        slug,
        dest: `public/images/blog/${slug}.webp`,
        prompt: getTopic(slug) + SUFFIX,
      };
    });
}

/** Pages guide : lang + slug de page */
export const GUIDE_PAGES = [
  // Français
  { lang: 'fr', page: 'google-business-profile', topic: 'Google Business Profile guide, storefront map pin, smartphone' },
  { lang: 'fr', page: 'citations-locales', topic: 'local citations NAP consistency, online directories' },
  { lang: 'fr', page: 'avis-clients', topic: 'customer reviews management, star ratings, local business' },
  { lang: 'fr', page: 'contenu-local', topic: 'local content strategy, blog writing, city landing pages' },
  { lang: 'fr', page: 'backlinks-locaux', topic: 'local backlinks, community partnerships, link building' },
  { lang: 'fr', page: 'commerces', topic: 'local retail commerce, neighborhood shop, small business owner' },
  // English
  { lang: 'en', page: 'google-business-profile', topic: 'Google Business Profile guide, storefront map pin, smartphone' },
  { lang: 'en', page: 'local-citations', topic: 'local citations NAP consistency, online directories' },
  { lang: 'en', page: 'customer-reviews', topic: 'customer reviews management, star ratings, local business' },
  { lang: 'en', page: 'local-content', topic: 'local content strategy, blog writing, city landing pages' },
  { lang: 'en', page: 'local-backlinks', topic: 'local backlinks, community partnerships, link building' },
  { lang: 'en', page: 'businesses', topic: 'local retail business, neighborhood shop, small business owner' },
  // Español
  { lang: 'es', page: 'google-business-profile', topic: 'Google Business Profile guide, storefront map pin, smartphone' },
  { lang: 'es', page: 'citas-locales', topic: 'local citations NAP consistency, online directories' },
  { lang: 'es', page: 'resenas-clientes', topic: 'customer reviews management, star ratings, local business' },
  { lang: 'es', page: 'contenido-local', topic: 'local content strategy, blog writing, city landing pages' },
  { lang: 'es', page: 'backlinks-locales', topic: 'local backlinks, community partnerships, link building' },
  { lang: 'es', page: 'comercios', topic: 'local retail commerce, neighborhood shop, small business owner' },
].map(g => ({
  ...g,
  dest: `public/images/guide/${g.lang}-${g.page}.webp`,
  prompt: g.topic + SUFFIX,
}));
