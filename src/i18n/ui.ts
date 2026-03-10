export const languages = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'fr';

export const ui = {
  fr: {
    'nav.home': 'Accueil',
    'nav.guide': 'Guide SEO local',
    'nav.blog': 'Blog',
    'nav.tools': 'Outils',
    'hero.title': 'Maîtrisez le SEO local',
    'hero.subtitle': 'Guides, conseils et ressources pour améliorer la visibilité locale de votre entreprise sur Google.',
    'hero.cta': 'Lire le guide',
    'latest.title': 'Derniers articles',
    'readmore': 'Lire la suite →',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.home': 'Home',
    'nav.guide': 'Local SEO Guide',
    'nav.blog': 'Blog',
    'nav.tools': 'Tools',
    'hero.title': 'Master Local SEO',
    'hero.subtitle': 'Guides, tips and resources to improve your business local visibility on Google.',
    'hero.cta': 'Read the guide',
    'latest.title': 'Latest articles',
    'readmore': 'Read more →',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.guide': 'Guía SEO local',
    'nav.blog': 'Blog',
    'nav.tools': 'Herramientas',
    'hero.title': 'Domina el SEO local',
    'hero.subtitle': 'Guías, consejos y recursos para mejorar la visibilidad local de tu negocio en Google.',
    'hero.cta': 'Leer la guía',
    'latest.title': 'Últimos artículos',
    'readmore': 'Leer más →',
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;

export type Lang = keyof typeof ui;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}
