/**
 * Génère les 14 nouvelles pages du guide SEO local (FR)
 * Usage : node scripts/generate-guide-pages-fr.mjs [--force]
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FORCE = process.argv.includes('--force');

function page({ file, title, description, ogImage, currentCrumb, h1, intro, sections, relatedLinks }) {
  const rel = relatedLinks.map(l => `<li><a href="${l.href}" class="hover:underline">${l.label}</a></li>`).join('\n          ');
  return `---
import Layout from '../../layouts/Layout.astro';
---

<Layout
  title="${title}"
  description="${description}"
  lang="fr"
  ogImage="${ogImage}"
>
  <section class="border-b border-gray-200 bg-gray-50 py-14">
    <div class="mx-auto max-w-3xl px-4">
      <nav class="mb-4 text-sm text-gray-500">
        <a href="/" class="hover:text-blue-600">Accueil</a> &rsaquo;
        <a href="/guide-seo-local" class="hover:text-blue-600">Guide SEO local</a> &rsaquo;
        <span class="text-gray-900">${currentCrumb}</span>
      </nav>
      <h1 class="mb-4 text-4xl font-bold text-gray-900">${h1}</h1>
      <p class="text-lg text-gray-600 leading-relaxed">${intro}</p>
    </div>
  </section>

  <div class="mx-auto max-w-3xl px-4 pt-8">
    <img src="${ogImage}" alt="" class="w-full rounded-xl object-cover shadow-sm" loading="eager" width="1200" height="400" style="max-height:320px" onerror="this.style.display='none'" />
  </div>

  <section class="py-14">
    <div class="mx-auto max-w-3xl px-4 prose">
      ${sections}
      <div class="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-6">
        <p class="font-semibold text-blue-900">Articles associés</p>
        <ul class="mt-2 space-y-1 text-blue-700">
          ${rel}
        </ul>
      </div>
    </div>
  </section>
</Layout>
`;
}

const PAGES = [
  {
    file: 'src/pages/guide-seo-local/algorithme-local.astro',
    title: "Algorithme local Google : pertinence, distance, notoriété | Guide SEO local",
    description: "Comprendre les 3 facteurs de classement local de Google (pertinence, distance, notoriété) et les mises à jour Pigeon, Possum, Vicinity pour optimiser votre stratégie.",
    ogImage: '/images/guide/fr-algorithme-local.webp',
    currentCrumb: 'Algorithme local',
    h1: "L'algorithme local de Google",
    intro: "Google évalue les résultats locaux selon trois grandes dimensions : pertinence, distance et notoriété. Maîtriser ces facteurs permet de concentrer ses efforts là où l'impact est maximal.",
    sections: `
      <h2>Les 3 facteurs officiels de classement local</h2>
      <p>Google décrit lui-même trois dimensions pour évaluer les résultats locaux :</p>
      <ul>
        <li><strong>Pertinence</strong> : dans quelle mesure votre fiche correspond-elle à la requête ? Catégorie GBP, mots-clés dans la description, services renseignés, cohérence avec le site web.</li>
        <li><strong>Distance</strong> : proximité de votre établissement par rapport à l'internaute ou à la localisation précisée dans la requête. Ce facteur ne peut pas être optimisé directement — il dépend de votre adresse physique.</li>
        <li><strong>Notoriété</strong> : réputation en ligne — nombre et qualité des avis, citations sur les annuaires, autorité de votre domaine, mentions dans la presse locale.</li>
      </ul>

      <h2>Les mises à jour algorithmiques clés</h2>
      <p>Depuis 2014, plusieurs mises à jour ont profondément reconfiguré le SEO local :</p>
      <ul>
        <li><strong>Pigeon (2014)</strong> : intégration des signaux SEO classiques (autorité de domaine, backlinks) dans le classement local. Un site bien référencé en organique gagne en visibilité locale.</li>
        <li><strong>Possum (2016)</strong> : filtrage des fiches similaires dans une même zone. Si deux entreprises du même secteur sont très proches, Google n'en affiche généralement qu'une dans le pack local.</li>
        <li><strong>Vicinity (2021)</strong> : renforcement du critère de proximité. Les établissements géographiquement proches de l'internaute ont pris l'avantage sur des concurrents plus éloignés, même très notoires.</li>
      </ul>

      <h2>Ce que vous pouvez contrôler</h2>
      <p>Deux des trois facteurs sont actionnables :</p>
      <ul>
        <li><strong>Améliorer la pertinence</strong> : sélectionnez la catégorie principale GBP la plus précise, renseignez tous vos services et attributs, intégrez des mots-clés locaux naturellement dans votre description et sur votre site.</li>
        <li><strong>Augmenter la notoriété</strong> : collectez des avis régulièrement, maintenez la cohérence NAP sur tous les annuaires, obtenez des backlinks depuis des médias locaux et des partenaires de confiance.</li>
        <li><strong>La distance</strong> est fixe pour un commerce physique. Pour un prestataire mobile, définissez précisément votre zone d'intervention dans GBP.</li>
      </ul>

      <h2>Pack local et résultats organiques : deux algorithmes distincts</h2>
      <p>Le pack local (les 3 fiches avec carte) et les résultats organiques utilisent des algorithmes différents. Un site peut très bien ranker en organique sans apparaître dans le pack local, et inversement. La stratégie optimale travaille les deux simultanément : GBP pour le pack local, site optimisé pour l'organique.</p>

      <h2>Les signaux secondaires qui comptent</h2>
      <ul>
        <li>Cohérence des informations NAP sur l'ensemble du web</li>
        <li>Vélocité des avis (régularité dans le temps)</li>
        <li>Engagement : clics, appels, demandes d'itinéraire depuis la fiche</li>
        <li>Activité de la fiche : photos récentes, publications régulières</li>
        <li>Comportement des utilisateurs dans les résultats (taux de clics)</li>
      </ul>`,
    relatedLinks: [
      { href: '/guide-seo-local/pack-local', label: 'Le pack local : comment y apparaître' },
      { href: '/guide-seo-local/google-business-profile', label: 'Optimiser votre Google Business Profile' },
      { href: '/blog/fr-audit-seo-local/', label: 'Réaliser un audit SEO local complet' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/pack-local.astro',
    title: "Pack local Google : comment apparaître dans le 3-pack | Guide SEO local",
    description: "Tout comprendre sur le pack local Google : qu'est-ce que le 3-pack, comment y apparaître, différence avec l'organique et stratégies concrètes pour intégrer les 3 premières fiches.",
    ogImage: '/images/guide/fr-pack-local.webp',
    currentCrumb: 'Pack local',
    h1: "Le pack local Google",
    intro: "Le pack local — les 3 fiches d'établissements affichées avec une carte en haut des résultats — capte une part majeure des clics sur les requêtes locales. Voici comment l'intégrer.",
    sections: `
      <h2>Qu'est-ce que le pack local ?</h2>
      <p>Lorsqu'un internaute tape une requête à intention locale (« plombier Paris », « restaurant près de moi »), Google affiche en tête des résultats un bloc de 3 fiches Google Business Profile accompagnées d'une carte. C'est le <strong>pack local</strong> (ou « 3-pack »). Ce positionnement est distinct des résultats organiques classiques et dispose d'une visibilité premium : il apparaît avant les 10 premiers résultats organiques.</p>

      <h2>Pourquoi le pack local est stratégique</h2>
      <ul>
        <li>Il est visible sans que l'internaute fasse défiler la page</li>
        <li>Il affiche directement le numéro de téléphone, l'adresse, les horaires et les avis</li>
        <li>Les clics vers le pack local génèrent souvent des appels directs plutôt que des visites de site</li>
        <li>Sur mobile, les 3 fiches occupent toute la partie supérieure de l'écran</li>
      </ul>

      <h2>Comment Google sélectionne les 3 fiches</h2>
      <p>Google sélectionne les fiches du pack local en combinant pertinence, distance et notoriété. La fiche GBP la plus pertinente, la mieux renseignée, géographiquement proche et avec la meilleure réputation en ligne a les meilleures chances d'apparaître. Il n'y a pas de recette magique : c'est la combinaison de tous ces signaux qui fait la différence.</p>

      <h2>Les actions concrètes pour intégrer le pack local</h2>
      <ol>
        <li><strong>Revendiquer et vérifier votre fiche GBP</strong> — une fiche non vérifiée ne peut pas ranker.</li>
        <li><strong>Choisir la bonne catégorie principale</strong> — c'est le signal de pertinence le plus fort.</li>
        <li><strong>Compléter 100 % des champs</strong> — horaires, description, services, attributs, photos.</li>
        <li><strong>Collecter des avis régulièrement</strong> — viser 4+ étoiles avec une vélocité constante.</li>
        <li><strong>Assurer la cohérence NAP</strong> — même nom, adresse et téléphone sur tous les annuaires.</li>
        <li><strong>Publier régulièrement</strong> — au moins une publication GBP par semaine pour rester actif.</li>
      </ol>

      <h2>Pack local vs résultats organiques : la complémentarité</h2>
      <p>Certaines requêtes locales affichent un pack local mais aussi des résultats organiques en dessous. Une stratégie locale complète vise les deux : apparaître dans le pack via GBP ET ranker dans les résultats organiques avec un site optimisé. Les entreprises qui dominent les deux visibilités captent la quasi-totalité du trafic local disponible.</p>

      <h2>Le pack local sur mobile</h2>
      <p>Sur mobile, le pack local est encore plus dominant : il occupe tout l'écran au-dessus de la ligne de flottaison. Avec 60 %+ des recherches locales effectuées sur mobile, optimiser pour le pack local, c'est avant tout optimiser pour l'expérience mobile.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/algorithme-local', label: "Comment fonctionne l'algorithme local de Google" },
      { href: '/guide-seo-local/google-business-profile', label: 'Optimiser votre Google Business Profile' },
      { href: '/guide-seo-local/mobile-vitesse', label: 'Mobile et vitesse : les fondamentaux techniques' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/mots-cles-locaux.astro',
    title: "Recherche de mots-clés locaux : méthode et outils | Guide SEO local",
    description: "Comment trouver les mots-clés locaux pertinents pour votre activité. Méthode [service]+[ville], longue traîne locale, Google Suggest, Search Console et outils payants.",
    ogImage: '/images/guide/fr-mots-cles-locaux.webp',
    currentCrumb: 'Mots-clés locaux',
    h1: "Recherche de mots-clés locaux",
    intro: "Les mots-clés locaux suivent une logique différente des mots-clés génériques : ils combinent une intention de service avec une dimension géographique. Voici la méthode pour les identifier et les exploiter.",
    sections: `
      <h2>L'intention locale : comprendre ce que cherchent vos clients</h2>
      <p>Les requêtes locales prennent plusieurs formes :</p>
      <ul>
        <li><strong>[Service] + [Ville]</strong> : « plombier Lyon », « dentiste Bordeaux » — requêtes directes à fort intent commercial</li>
        <li><strong>[Service] + « près de moi »</strong> : Google détecte la localisation et affiche des résultats de proximité</li>
        <li><strong>[Service] + [Quartier/Arrondissement]</strong> : « restaurant 11e arrondissement », « coiffeur Montmartre »</li>
        <li><strong>Questions locales</strong> : « meilleur avocat fiscal à Nantes », « où réparer son vélo à Lille »</li>
      </ul>

      <h2>Méthode de recherche gratuite avec Google</h2>
      <p>Commencez par les outils gratuits :</p>
      <ul>
        <li><strong>Google Suggest</strong> : tapez « [votre service] + [votre ville] » dans Google et observez les suggestions. Ce sont des requêtes réelles avec volume.</li>
        <li><strong>Recherches associées</strong> : en bas de la page de résultats, Google liste 8 requêtes connexes — mine d'or pour la longue traîne.</li>
        <li><strong>Google Search Console</strong> : si votre site existe déjà, l'onglet « Performances » révèle les requêtes qui génèrent des impressions — certaines ne sont pas encore optimisées.</li>
        <li><strong>Google Business Profile Insights</strong> : affiche les termes de recherche utilisés pour trouver votre fiche.</li>
      </ul>

      <h2>Outils payants pour aller plus loin</h2>
      <ul>
        <li><strong>SEMrush / Ahrefs</strong> : volume de recherche local par ville, difficulté, variations</li>
        <li><strong>BrightLocal</strong> : spécialisé SEO local, suivi des positions dans le pack local par code postal</li>
        <li><strong>Whitespark Local Rank Tracker</strong> : suivi des positions locales avec géolocalisation précise</li>
      </ul>

      <h2>Construire une liste de mots-clés actionnables</h2>
      <ol>
        <li>Listez tous vos services et produits</li>
        <li>Croisez avec vos zones géographiques (ville principale + communes proches)</li>
        <li>Ajoutez les variantes longue traîne (« urgence », « pas cher », « 24h/24 »)</li>
        <li>Regroupez par intention et par page cible (une page = un cluster sémantique)</li>
        <li>Priorisez par volume + faisabilité concurrentielle</li>
      </ol>

      <h2>Mots-clés locaux et stratégie de contenu</h2>
      <p>Chaque cluster de mots-clés locaux devrait correspondre à une page dédiée sur votre site. Un plombier à Lyon ne devrait pas avoir une seule page « plombier Lyon » mais potentiellement : « débouchage canalisation Lyon », « réparation fuite Lyon 3 », « installation chauffe-eau Lyon ». Cette granularité maximise les opportunités de classement sur des requêtes moins concurrentielles.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/pages-service-ville', label: 'Créer des pages service + ville efficaces' },
      { href: '/blog/fr-mots-cles-locaux/', label: 'Guide complet des mots-clés locaux' },
      { href: '/guide-seo-local/mesurer-resultats', label: 'Mesurer vos résultats SEO local' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/pages-service-ville.astro',
    title: "Pages service + ville : créer des landing pages locales efficaces | Guide SEO local",
    description: "Comment structurer vos pages service et ville pour ranker en SEO local. Contenu unique, signaux de localisation, architecture du site et exemples concrets.",
    ogImage: '/images/guide/fr-pages-service-ville.webp',
    currentCrumb: 'Pages service + ville',
    h1: "Pages service + ville : le pilier on-site du SEO local",
    intro: "Les pages service + ville sont des landing pages spécialement conçues pour cibler des requêtes locales précises. Bien construites, elles permettent d'apparaître dans les résultats organiques et d'alimenter la notoriété de votre fiche GBP.",
    sections: `
      <h2>Pourquoi créer des pages dédiées par zone</h2>
      <p>Une seule page « Nos services » ne peut pas ranker sur « plombier urgence Lyon 3 » ET « plombier Lyon 6 » en même temps. La granularité géographique réclame des pages dédiées. Chaque page service + ville cible un segment de requêtes précis et permet à Google de comprendre exactement où vous opérez et ce que vous proposez.</p>

      <h2>Structure d'une page service + ville performante</h2>
      <ul>
        <li><strong>Title tag</strong> : [Service] à [Ville] — [Bénéfice clé] | [Marque]</li>
        <li><strong>H1</strong> : [Service] à [Ville] — précis, sans sur-optimisation</li>
        <li><strong>Introduction</strong> : 100-150 mots, mentionne le service ET la ville naturellement</li>
        <li><strong>Sections H2</strong> : présentation du service, zone couverte, avantages, tarifs indicatifs</li>
        <li><strong>Témoignages clients locaux</strong> : idéalement de clients dans cette zone géographique</li>
        <li><strong>Carte Google Maps</strong> embarquée ou référence à votre zone d'intervention</li>
        <li><strong>Schema.org LocalBusiness</strong> : données structurées avec l'adresse complète</li>
        <li><strong>Appel à l'action</strong> : téléphone cliquable, formulaire de contact, prise de RDV</li>
      </ul>

      <h2>Le contenu unique : règle absolue</h2>
      <p>L'erreur la plus commune est de créer 20 pages identiques en changeant seulement le nom de la ville. Google pénalise le contenu dupliqué. Chaque page doit avoir :</p>
      <ul>
        <li>Une introduction rédigée spécifiquement pour cette ville</li>
        <li>Des références locales (quartiers, landmarks, particularités géographiques)</li>
        <li>Idéalement des témoignages ou réalisations dans cette zone</li>
        <li>Des informations pratiques spécifiques (accès, parking, zone d'intervention précise)</li>
      </ul>

      <h2>Architecture du site pour les pages locales</h2>
      <p>Organisez vos pages dans une hiérarchie logique :</p>
      <ul>
        <li><code>/services/plomberie/</code> — page principale du service</li>
        <li><code>/services/plomberie/lyon/</code> — page service + ville principale</li>
        <li><code>/services/plomberie/lyon-3/</code> — page ultra-locale (arrondissement)</li>
      </ul>
      <p>Le maillage interne entre ces pages transmet l'autorité et aide Google à comprendre la structure géographique de votre activité.</p>

      <h2>Pages de ville vs fiche GBP : la complémentarité</h2>
      <p>Les pages service + ville influencent le classement organique ET renforcent indirectement votre fiche GBP. Un site avec des pages locales pertinentes et bien optimisées envoie à Google un signal fort sur la zone d'activité de l'entreprise, ce qui peut améliorer votre positionnement dans le pack local.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/mots-cles-locaux', label: 'Recherche de mots-clés locaux' },
      { href: '/guide-seo-local/schema-local', label: 'Données structurées LocalBusiness' },
      { href: '/blog/fr-page-service-ville/', label: 'Créer une page service + ville (article détaillé)' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/schema-local.astro',
    title: "Schema.org LocalBusiness : données structurées pour le SEO local | Guide SEO local",
    description: "Implémenter les données structurées LocalBusiness en JSON-LD pour améliorer votre référencement local. Types, propriétés essentielles, exemples de code et outils de test.",
    ogImage: '/images/guide/fr-schema-local.webp',
    currentCrumb: 'Données structurées locales',
    h1: "Données structurées LocalBusiness",
    intro: "Les données structurées Schema.org permettent à Google de comprendre précisément votre entreprise, son emplacement et ses services. Un balisage correct peut améliorer l'apparence de vos résultats et renforcer vos signaux SEO local.",
    sections: `
      <h2>Pourquoi les données structurées sont importantes en local</h2>
      <p>Le balisage Schema.org LocalBusiness transmet à Google des informations structurées sur votre entreprise : nom, adresse, téléphone, horaires, type d'activité. Ces informations alimentent le Knowledge Graph, les rich snippets et peuvent influencer votre positionnement dans le pack local en renforçant la cohérence des données entre votre site et votre fiche GBP.</p>

      <h2>Les types LocalBusiness spécialisés</h2>
      <p>Schema.org propose des sous-types précis pour chaque secteur :</p>
      <ul>
        <li><strong>Restaurant</strong>, <strong>Bakery</strong>, <strong>CafeOrCoffeeShop</strong> — pour la restauration</li>
        <li><strong>MedicalBusiness</strong>, <strong>Dentist</strong>, <strong>Optician</strong> — pour la santé</li>
        <li><strong>LegalService</strong>, <strong>Notary</strong>, <strong>AccountingService</strong> — pour les professions libérales</li>
        <li><strong>AutoRepair</strong>, <strong>Plumber</strong>, <strong>Electrician</strong> — pour les artisans</li>
        <li><strong>HairSalon</strong>, <strong>BeautySalon</strong>, <strong>SpaOrBeautyShop</strong> — pour les soins</li>
      </ul>

      <h2>Exemple JSON-LD minimal</h2>
      <pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Plomberie Martin",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue de la Paix",
    "addressLocality": "Lyon",
    "postalCode": "69001",
    "addressCountry": "FR"
  },
  "telephone": "+33 4 72 00 00 00",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.7640,
    "longitude": 4.8357
  },
  "url": "https://www.plomberie-martin.fr",
  "image": "https://www.plomberie-martin.fr/logo.jpg"
}</code></pre>

      <h2>Propriétés à ne pas négliger</h2>
      <ul>
        <li><code>priceRange</code> : €, €€ ou €€€ — signal de confiance</li>
        <li><code>aggregateRating</code> : note moyenne et nombre d'avis (si vous les gérez vous-même)</li>
        <li><code>areaServed</code> : liste des villes ou zones couvertes</li>
        <li><code>hasMap</code> : lien vers Google Maps</li>
        <li><code>sameAs</code> : URLs de vos profils sociaux et annuaires</li>
      </ul>

      <h2>Tester et valider votre balisage</h2>
      <ul>
        <li><strong>Google Rich Results Test</strong> : <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">search.google.com/test/rich-results</a></li>
        <li><strong>Schema Markup Validator</strong> : validator.schema.org</li>
        <li><strong>Google Search Console</strong> : onglet « Améliorations » pour détecter les erreurs après indexation</li>
      </ul>`,
    relatedLinks: [
      { href: '/guide-seo-local/pages-service-ville', label: 'Pages service + ville : structure et contenu' },
      { href: '/blog/fr-schema-local-business/', label: 'Schema LocalBusiness : guide complet' },
      { href: '/blog/fr-donnees-structurees-avancees/', label: 'Données structurées avancées pour le local' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/mobile-vitesse.astro',
    title: "Mobile et vitesse de chargement pour le SEO local | Guide SEO local",
    description: "Mobile-first indexing, Core Web Vitals et vitesse de page : les fondamentaux techniques du SEO local. Comment optimiser pour les recherches mobiles et améliorer votre classement.",
    ogImage: '/images/guide/fr-mobile-vitesse.webp',
    currentCrumb: 'Mobile et vitesse',
    h1: "Mobile et vitesse : les fondamentaux techniques du SEO local",
    intro: "Plus de 60 % des recherches locales sont effectuées sur mobile. Un site lent ou mal adapté aux petits écrans perd des clients avant même qu'ils aient pu lire votre contenu.",
    sections: `
      <h2>Le mobile-first indexing : ce que ça change</h2>
      <p>Depuis 2021, Google indexe en priorité la version mobile de votre site. Cela signifie que c'est l'expérience mobile qui détermine votre positionnement — y compris sur desktop. Un site responsive et rapide sur mobile n'est plus optionnel : c'est la base.</p>

      <h2>Core Web Vitals : les 3 métriques à surveiller</h2>
      <ul>
        <li><strong>LCP (Largest Contentful Paint)</strong> : temps de chargement de l'élément principal visible. Cible : moins de 2,5 secondes.</li>
        <li><strong>FID / INP (Interaction to Next Paint)</strong> : réactivité aux interactions utilisateur. Cible : moins de 200 ms.</li>
        <li><strong>CLS (Cumulative Layout Shift)</strong> : stabilité visuelle de la page (éléments qui sautent au chargement). Cible : moins de 0,1.</li>
      </ul>

      <h2>Pourquoi c'est crucial en SEO local</h2>
      <p>Les recherches locales ont souvent une forte intention immédiate : l'internaute cherche un numéro de téléphone, une adresse ou des horaires. Si votre page met 5 secondes à charger sur mobile, il retourne dans Google et clique sur le concurrent suivant. Le taux de rebond élevé envoie un signal négatif qui peut dégrader votre positionnement.</p>

      <h2>Optimisations techniques prioritaires</h2>
      <ul>
        <li><strong>Images</strong> : utiliser le format WebP, définir les attributs width/height, lazy loading sur les images hors écran</li>
        <li><strong>Hébergement</strong> : choisir un hébergeur avec serveurs en France pour un public français (latence réduite)</li>
        <li><strong>Cache</strong> : mettre en place un cache navigateur et serveur</li>
        <li><strong>CSS/JS</strong> : minifier les fichiers, différer le JavaScript non critique</li>
        <li><strong>Polices</strong> : précharger les polices utilisées above-the-fold, utiliser font-display: swap</li>
      </ul>

      <h2>Outils de diagnostic</h2>
      <ul>
        <li><strong>PageSpeed Insights</strong> : pagespeed.web.dev — analyse LCP/INP/CLS avec suggestions détaillées</li>
        <li><strong>Google Search Console</strong> : rapport « Expérience de la page » pour voir les URLs en échec</li>
        <li><strong>WebPageTest.org</strong> : test avancé depuis différentes localisations et connexions</li>
      </ul>

      <h2>Design mobile pour les recherches locales</h2>
      <p>Au-delà de la vitesse, l'ergonomie mobile compte : numéro de téléphone cliquable en haut de page, bouton d'itinéraire Google Maps, formulaire de contact simple (3 champs max). Un utilisateur mobile qui cherche un plombier d'urgence doit pouvoir appeler en 2 secondes depuis les résultats de recherche.</p>`,
    relatedLinks: [
      { href: '/blog/fr-mobile-recherche-locale/', label: 'Mobile et recherche locale : chiffres et optimisations' },
      { href: '/blog/fr-core-web-vitals-local/', label: 'Core Web Vitals et SEO local' },
      { href: '/guide-seo-local/schema-local', label: 'Données structurées LocalBusiness' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/annuaires-locaux.astro',
    title: "Annuaires locaux prioritaires : lesquels choisir et comment s'inscrire | Guide SEO local",
    description: "Les annuaires locaux essentiels pour le SEO local en France. Comment choisir, s'inscrire et maintenir la cohérence NAP pour maximiser votre visibilité locale.",
    ogImage: '/images/guide/fr-annuaires-locaux.webp',
    currentCrumb: 'Annuaires locaux',
    h1: "Les annuaires locaux prioritaires",
    intro: "Les citations dans les annuaires locaux (mentions de votre nom, adresse et téléphone) sont un signal de confiance majeur pour Google. Voici les annuaires à privilégier et la méthode pour les gérer efficacement.",
    sections: `
      <h2>Pourquoi les annuaires locaux comptent</h2>
      <p>Les annuaires locaux créent des <strong>citations</strong> — des mentions de votre NAP (Nom, Adresse, Téléphone) sur des sites tiers. Ces citations confirment à Google l'existence et la légitimité de votre entreprise. Plus vos informations sont cohérentes et présentes sur des sources faisant autorité, plus votre notoriété locale augmente.</p>

      <h2>Les annuaires génériques incontournables</h2>
      <ul>
        <li><strong>Google Business Profile</strong> — la base absolue</li>
        <li><strong>Pages Jaunes</strong> (pagesjaunes.fr) — référence historique en France</li>
        <li><strong>Yelp</strong> — fort sur les restaurants et commerces</li>
        <li><strong>Facebook</strong> — page entreprise avec adresse et horaires</li>
        <li><strong>Apple Maps</strong> — pour les utilisateurs iOS (via Apple Business Connect)</li>
        <li><strong>Bing Places</strong> — Bing représente environ 5 % des recherches en France</li>
        <li><strong>Kompass</strong> — annuaire B2B très référencé</li>
        <li><strong>123pages.fr</strong>, <strong>laposte.fr/annuaire</strong> — annuaires secondaires mais cités</li>
      </ul>

      <h2>Les annuaires sectoriels prioritaires</h2>
      <ul>
        <li><strong>Restaurants/bars</strong> : TripAdvisor, TheFork (LaFourchette), Zomato</li>
        <li><strong>Artisans/BTP</strong> : Houzz, Habitissimo, Travaux.com</li>
        <li><strong>Santé</strong> : Doctolib, Docaposte, Annuaire de la Santé</li>
        <li><strong>Juridique/Comptable</strong> : annuaire du barreau, Ordre des experts-comptables</li>
        <li><strong>Hôtellerie</strong> : Booking.com, Expedia, Hotels.com</li>
      </ul>

      <h2>Méthode de soumission efficace</h2>
      <ol>
        <li><strong>Préparez votre fiche standardisée</strong> : nom exact, adresse complète, téléphone, URL, description 150 mots, logo et photos</li>
        <li><strong>Vérifiez les fiches existantes</strong> avant de créer — votre entreprise est peut-être déjà référencée avec des informations incorrectes</li>
        <li><strong>Soumettez par ordre de priorité</strong> : Google + Pages Jaunes d'abord, puis les sectoriels, puis les secondaires</li>
        <li><strong>Gardez un tableau de suivi</strong> avec URL de chaque fiche et identifiants de connexion</li>
      </ol>

      <h2>Maintenir la cohérence NAP</h2>
      <p>La cohérence est plus importante que le volume. Une incohérence (abréviation du nom, ancienne adresse, numéro différent) peut annuler l'effet positif de dizaines de citations correctes. Vérifiez et corrigez régulièrement vos fiches, notamment après un déménagement ou changement de numéro.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/citations-locales', label: 'Citations locales et cohérence NAP' },
      { href: '/blog/fr-annuaires-locaux/', label: 'Les meilleurs annuaires locaux par secteur' },
      { href: '/blog/fr-nap-coherence/', label: 'Cohérence NAP : pourquoi et comment' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/repondre-avis.astro',
    title: "Répondre aux avis Google : stratégie et templates | Guide SEO local",
    description: "Comment répondre aux avis positifs et négatifs sur Google. Stratégie de réponse, templates prêts à l'emploi, impact sur le SEO local et les décisions d'achat.",
    ogImage: '/images/guide/fr-repondre-avis.webp',
    currentCrumb: 'Répondre aux avis',
    h1: "Répondre aux avis : stratégie et templates",
    intro: "Répondre aux avis n'est pas une option — c'est un signal SEO et un levier de conversion. Google prend en compte l'activité de réponse dans son évaluation de la qualité de votre fiche.",
    sections: `
      <h2>Pourquoi répondre aux avis améliore votre SEO local</h2>
      <p>Google confirme que les réponses aux avis sont un signal d'engagement pris en compte dans l'algorithme local. Une fiche avec 100 % de réponses aux avis montre une entreprise active et attentive. De plus, vos réponses sont indexées par Google — c'est du contenu supplémentaire naturellement enrichi de mots-clés liés à votre activité et localisation.</p>

      <h2>Répondre aux avis positifs</h2>
      <p>Ne vous contentez pas d'un « Merci ! » générique. Personnalisez chaque réponse :</p>
      <ul>
        <li>Mentionnez le prénom du client si disponible</li>
        <li>Faites référence à un détail spécifique de l'avis</li>
        <li>Intégrez naturellement un mot-clé local (« notre équipe à [Ville] »)</li>
        <li>Terminez par une invitation à revenir ou à recommander</li>
      </ul>
      <p><strong>Template</strong> : « Merci [Prénom] pour votre retour ! Nous sommes ravis que [détail spécifique] vous ait satisfait. Toute l'équipe de [Nom entreprise] à [Ville] est à votre disposition pour votre prochain [service]. À bientôt ! »</p>

      <h2>Répondre aux avis négatifs</h2>
      <p>Les avis négatifs bien gérés peuvent se transformer en argument de vente. La procédure :</p>
      <ol>
        <li><strong>Répondez dans les 24-48h</strong> — la rapidité montre votre sérieux</li>
        <li><strong>Restez professionnel</strong> — ne vous défendez pas, ne contre-attaquez jamais</li>
        <li><strong>Reconnaissez l'expérience</strong> même si vous n'êtes pas en faute</li>
        <li><strong>Proposez une solution hors ligne</strong> (email, téléphone) pour éviter le débat public</li>
        <li><strong>Évitez les formules génériques</strong> — elles donnent une impression d'indifférence</li>
      </ol>
      <p><strong>Template</strong> : « Bonjour [Prénom], nous sommes sincèrement désolés de cette expérience. Ce type de situation ne reflète pas nos standards habituels. Pourriez-vous nous contacter directement à [email/tel] pour que nous puissions trouver une solution ? »</p>

      <h2>Signaler les avis frauduleux</h2>
      <p>Si vous recevez un avis que vous suspectez frauduleux (concurrent, personne que vous ne reconnaissez pas), vous pouvez le signaler via l'interface GBP. Le signalement ne garantit pas la suppression, mais Google enquête si le contenu viole ses règles (fake review, contenu haineux, hors sujet).</p>

      <h2>Fréquence et organisation</h2>
      <p>Définissez un process : vérifier les nouveaux avis tous les 2 jours, répondre dans les 48h maximum. Désignez une personne responsable. L'outil de notification GBP (email ou app) vous alerte dès qu'un avis est publié.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/avis-clients', label: 'Stratégie complète de gestion des avis' },
      { href: '/blog/fr-repondre-avis-negatifs/', label: 'Comment répondre aux avis négatifs' },
      { href: '/blog/fr-generer-avis-google/', label: 'Générer plus d\'avis Google' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/restaurants.astro',
    title: "SEO local pour les restaurants : guide complet 2025 | Guide SEO local",
    description: "Stratégie SEO local complète pour les restaurants. GBP avec menu, TripAdvisor, TheFork, avis clients, photos et attributs spécifiques à la restauration.",
    ogImage: '/images/guide/fr-restaurants.webp',
    currentCrumb: 'Restaurants',
    h1: "SEO local pour les restaurants",
    intro: "Le secteur de la restauration est l'un des plus compétitifs en SEO local. Voici la stratégie complète pour apparaître en tête des résultats et remplir vos tables.",
    sections: `
      <h2>Google Business Profile : les spécificités restaurant</h2>
      <p>Le GBP d'un restaurant offre des fonctionnalités supplémentaires :</p>
      <ul>
        <li><strong>Menu</strong> : ajoutez votre menu directement dans GBP (plats, prix, descriptions). Il apparaît dans la fiche et peut influencer les recherches par type de cuisine.</li>
        <li><strong>Réservations</strong> : intégrez un bouton de réservation via TheFork, Resy ou votre système maison.</li>
        <li><strong>Attributs</strong> : terrasse, wifi, parking, accessible PMR, livraison, à emporter — chaque attribut ciblé augmente vos chances d'apparaître sur des requêtes filtrées.</li>
        <li><strong>Heures d'affluence</strong> : visible sur la fiche, informe les clients des horaires les plus calmes.</li>
      </ul>

      <h2>Les plateformes d'avis incontournables</h2>
      <ul>
        <li><strong>Google</strong> : priorité absolue, impacts direct sur le pack local</li>
        <li><strong>TripAdvisor</strong> : poids important pour les requêtes « meilleur restaurant [ville] »</li>
        <li><strong>TheFork (LaFourchette)</strong> : référence pour les réservations en ligne, Google y intègre parfois les notes</li>
        <li><strong>Facebook</strong> : important pour la communauté locale et les événements</li>
      </ul>
      <p>Synchronisez votre stratégie de collecte d'avis sur toutes ces plateformes, pas uniquement Google.</p>

      <h2>Photos : l'arme principale des restaurants</h2>
      <p>Pour un restaurant, les photos sont le principal facteur de conversion. Priorité :</p>
      <ul>
        <li>Photos des plats phares (haute résolution, bonne lumière, sur fond simple)</li>
        <li>Ambiance intérieure et extérieure (terrasse en été, décoration intérieure)</li>
        <li>Équipe en action (cuisine ouverte, service en salle)</li>
        <li>Mise à jour saisonnière (nouvelles cartes, événements)</li>
      </ul>
      <p>Visez un minimum de 50 photos. Les fiches avec plus de 100 photos reçoivent 520 % plus d'appels.</p>

      <h2>Contenu du site : cibler les requêtes restaurant</h2>
      <ul>
        <li>Page d'accueil optimisée « restaurant [cuisine] [ville] »</li>
        <li>Page menu en HTML (pas uniquement PDF — Google ne lit pas les PDF)</li>
        <li>Page événements pour apparaître sur les requêtes « restaurant anniversaire [ville] »</li>
        <li>Blog ou actualités pour les nouveautés de carte, événements saisonniers</li>
      </ul>

      <h2>Schema.org pour les restaurants</h2>
      <p>Utilisez le type <code>Restaurant</code> (sous-type de LocalBusiness) et ajoutez les propriétés <code>servesCuisine</code>, <code>hasMenu</code>, <code>acceptsReservations</code>, <code>priceRange</code>. Ces données alimentent les rich snippets et peuvent apparaître directement dans les résultats.</p>`,
    relatedLinks: [
      { href: '/blog/fr-seo-local-restaurants/', label: 'SEO local pour restaurants : article complet' },
      { href: '/guide-seo-local/avis-clients', label: 'Stratégie de gestion des avis' },
      { href: '/guide-seo-local/google-business-profile', label: 'Optimiser votre Google Business Profile' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/artisans.astro',
    title: "SEO local pour les artisans : guide complet 2025 | Guide SEO local",
    description: "Stratégie SEO local pour artisans, plombiers, électriciens et BTP. Zone d'intervention, labels qualité, photos de chantiers et avis clients pour dominer les résultats locaux.",
    ogImage: '/images/guide/fr-artisans.webp',
    currentCrumb: 'Artisans',
    h1: "SEO local pour les artisans",
    intro: "Plombiers, électriciens, peintres, menuisiers — les artisans bénéficient d'un potentiel SEO local considérable sur des requêtes à forte intention d'achat. Voici la stratégie adaptée.",
    sections: `
      <h2>Définir et cibler votre zone d'intervention</h2>
      <p>La majorité des artisans n'ont pas d'adresse commerciale visible mais interviennent chez leurs clients. Dans GBP, vous pouvez :</p>
      <ul>
        <li>Masquer votre adresse personnelle</li>
        <li>Définir une zone d'intervention (par rayon ou par liste de communes)</li>
        <li>Apparaître dans le pack local pour toutes les villes de votre zone</li>
      </ul>
      <p>Sur votre site, créez une page dédiée par commune principale de votre zone. Un plombier couvrant Lyon et ses environs devrait avoir des pages pour Lyon, Villeurbanne, Vénissieux, Caluire, etc.</p>

      <h2>Labels et certifications : des signaux de confiance puissants</h2>
      <p>Les labels qualité sont des arguments décisifs pour les clients locaux et des signaux E-E-A-T pour Google :</p>
      <ul>
        <li><strong>RGE (Reconnu Garant de l'Environnement)</strong> — obligatoire pour accéder aux aides de l'État</li>
        <li><strong>Qualibat</strong> — certification qualité BTP reconnue</li>
        <li><strong>QualiPAC, QualiSol</strong> — spécifiques aux énergies renouvelables</li>
        <li><strong>Artisan de France</strong> — label chambre des métiers</li>
      </ul>
      <p>Affichez ces labels sur votre site, dans vos fiches GBP et sur vos annuaires. Chaque mention d'un label sur un site externe crée une citation et un signal de confiance.</p>

      <h2>Photos de réalisations : votre meilleur argument</h2>
      <p>Les photos avant/après de chantiers sont le contenu le plus engageant pour un artisan :</p>
      <ul>
        <li>Publiez régulièrement sur GBP avec une description incluant le type de travaux et la ville</li>
        <li>Créez une galerie de réalisations sur votre site avec des légendes optimisées</li>
        <li>Géotagguez vos photos avec les coordonnées du chantier (avec accord du client)</li>
      </ul>

      <h2>Stratégie d'avis pour les artisans</h2>
      <p>Les artisans ont un avantage : ils sont physiquement chez le client à la fin du chantier. C'est le moment idéal pour demander un avis. Ayez le réflexe de :</p>
      <ul>
        <li>Envoyer un SMS avec le lien direct vers votre fiche GBP juste après le chantier</li>
        <li>Mentionner l'avis dans votre facture ou mail de suivi</li>
        <li>Préparer une carte de visite avec QR code vers votre profil d'avis</li>
      </ul>

      <h2>Annuaires spécialisés artisans</h2>
      <ul>
        <li><strong>Houzz</strong> : idéal pour les corps de métier liés à la maison</li>
        <li><strong>Habitissimo</strong> et <strong>Travaux.com</strong> : plateformes de mise en relation</li>
        <li><strong>Annuaire des artisans</strong> (chambres des métiers) : fort signal de légitimité</li>
        <li><strong>Pages Jaunes Travaux</strong> : section dédiée BTP</li>
      </ul>`,
    relatedLinks: [
      { href: '/blog/fr-seo-local-artisans/', label: 'SEO local pour artisans : article complet' },
      { href: '/guide-seo-local/pages-service-ville', label: 'Créer des pages par zone d\'intervention' },
      { href: '/guide-seo-local/avis-clients', label: 'Collecter et gérer les avis clients' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/sante.astro',
    title: "SEO local pour les professionnels de santé | Guide SEO local",
    description: "SEO local pour médecins, dentistes, kinésithérapeutes et paramédicaux. Knowledge Panel médical, YMYL, Doctolib, données structurées et gestion des avis patients.",
    ogImage: '/images/guide/fr-sante.webp',
    currentCrumb: 'Professionnels de santé',
    h1: "SEO local pour les professionnels de santé",
    intro: "La santé est un secteur YMYL (Your Money or Your Life) : Google y applique des critères E-E-A-T particulièrement stricts. Voici les spécificités à maîtriser pour ranker localement en tant que professionnel de santé.",
    sections: `
      <h2>YMYL et E-E-A-T : les exigences spécifiques à la santé</h2>
      <p>Google classe la santé parmi les contenus YMYL (Your Money or Your Life) — des thèmes où une mauvaise information peut avoir des conséquences graves. Pour ces contenus, l'algorithme accorde une importance accrue aux signaux E-E-A-T :</p>
      <ul>
        <li><strong>Experience</strong> : preuves d'expérience pratique (cas cliniques, témoignages patients)</li>
        <li><strong>Expertise</strong> : diplômes, spécialités, publications, affiliations professionnelles</li>
        <li><strong>Authoritativeness</strong> : mentions dans la presse médicale, citations par des confrères</li>
        <li><strong>Trustworthiness</strong> : avis authentiques, informations de contact claires, politique de confidentialité</li>
      </ul>

      <h2>Google Business Profile pour les professionnels de santé</h2>
      <ul>
        <li>Utilisez le type exact (Dentist, Physiotherapist, GeneralPractitioner...)</li>
        <li>Indiquez vos spécialités dans la description</li>
        <li>Activez les attributs accessibilité (PMR, parking)</li>
        <li>Intégrez un bouton de prise de RDV via Doctolib ou Maiia</li>
        <li>Ne publiez jamais d'informations médicales spécifiques sur des patients — même anonymisées</li>
      </ul>

      <h2>Doctolib et les plateformes médicales</h2>
      <p>Doctolib est devenu un acteur SEO incontournable en santé : les profils Doctolib apparaissent souvent en première page sur des requêtes comme « dermatologue Paris ». Avoir un profil complet et à jour sur Doctolib (et Maiia, Keldoc selon votre spécialité) est complémentaire de votre site propre.</p>

      <h2>Gestion des avis patients</h2>
      <p>Les avis Google pour les professionnels de santé sont particulièrement sensibles :</p>
      <ul>
        <li>Répondez à tous les avis (positifs et négatifs) sans jamais confirmer ou infirmer la relation patient</li>
        <li>Ne mentionnez aucun détail médical dans vos réponses (secret médical)</li>
        <li>En cas d'avis clairement diffamatoire ou violant le secret médical, signalez-le à Google</li>
        <li>Orientez les insatisfactions vers votre secrétariat ou une adresse email dédiée</li>
      </ul>

      <h2>Contenu de site pour professionnels de santé</h2>
      <ul>
        <li>Page par spécialité / pathologie traitée (avec sources médicales référencées)</li>
        <li>Page « À propos » avec parcours, diplômes et affiliations clairement mentionnés</li>
        <li>FAQ sur les consultations, remboursements, dépassements d'honoraires</li>
        <li>Schema.org : types <code>MedicalBusiness</code>, <code>Dentist</code>, <code>Physician</code> avec <code>medicalSpecialty</code></li>
      </ul>`,
    relatedLinks: [
      { href: '/guide-seo-local/schema-local', label: 'Données structurées LocalBusiness' },
      { href: '/guide-seo-local/avis-clients', label: 'Gestion des avis clients' },
      { href: '/blog/fr-donnees-structurees-avancees/', label: 'Données structurées avancées' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/professions-liberales.astro',
    title: "SEO local pour les professions libérales | Guide SEO local",
    description: "SEO local pour avocats, notaires, experts-comptables et professions libérales. Annuaires professionnels, E-E-A-T, pages de spécialités et stratégie de contenu conforme.",
    ogImage: '/images/guide/fr-professions-liberales.webp',
    currentCrumb: 'Professions libérales',
    h1: "SEO local pour les professions libérales",
    intro: "Avocats, notaires, experts-comptables, architectes : les professions réglementées ont des contraintes spécifiques en matière de communication. Voici comment optimiser votre visibilité locale dans ce cadre.",
    sections: `
      <h2>Contraintes déontologiques et SEO</h2>
      <p>Les professions réglementées (avocats, notaires, médecins, experts-comptables) sont soumises à des règles de communication strictes qui encadrent la publicité. Le SEO est généralement autorisé — il ne s'agit pas de publicité directe mais d'optimisation de visibilité — mais certains contenus (comparaisons avec des confrères, garanties de résultats) sont à proscrire. Consultez le règlement de votre ordre avant de publier tout contenu commercial.</p>

      <h2>Les annuaires professionnels à ne pas négliger</h2>
      <ul>
        <li><strong>Avocats</strong> : annuaire du Conseil National des Barreaux (cnb.avocat.fr), annuaire du barreau local</li>
        <li><strong>Notaires</strong> : notaires.fr (annuaire officiel), immonot.com</li>
        <li><strong>Experts-comptables</strong> : annuaire de l'Ordre des Experts-Comptables</li>
        <li><strong>Architectes</strong> : annuaire du Conseil National de l'Ordre des Architectes</li>
      </ul>
      <p>Ces annuaires officiels ont une autorité de domaine très élevée. Une mention dessus vaut beaucoup plus qu'une inscription dans un annuaire généraliste.</p>

      <h2>Structurer son site par spécialité</h2>
      <p>La clé pour les professions libérales est la granularité thématique ET géographique :</p>
      <ul>
        <li>Un avocat à Lyon devrait avoir des pages pour : « avocat droit du travail Lyon », « avocat divorce Lyon », « avocat immobilier Lyon »</li>
        <li>Un expert-comptable : « expert-comptable startup Lyon », « expert-comptable TPE Lyon », « comptabilité artisan Lyon »</li>
      </ul>
      <p>Chaque page doit apporter une vraie valeur informative — explications de la procédure, cas couverts, honoraires indicatifs si possible.</p>

      <h2>Bâtir l'autorité locale (E-E-A-T)</h2>
      <ul>
        <li>Publications dans la presse juridique ou économique locale</li>
        <li>Interventions dans des événements locaux (CCI, barreaux, clubs d'entrepreneurs)</li>
        <li>Partenariats avec d'autres professions complémentaires (avocat + notaire + expert-comptable)</li>
        <li>Page biographie détaillée : parcours, spécialisations, formations continues</li>
      </ul>

      <h2>Avis clients et professions réglementées</h2>
      <p>Les avis Google sont autorisés pour la plupart des professions libérales. Invitez vos clients satisfaits à laisser un avis en respectant la confidentialité (ne mentionnez jamais l'objet de la mission dans vos réponses). Pour les professions médicales, voir les précautions spécifiques dans la section santé.</p>`,
    relatedLinks: [
      { href: '/guide-seo-local/sante', label: 'SEO local pour les professionnels de santé' },
      { href: '/guide-seo-local/pages-service-ville', label: 'Pages service + ville efficaces' },
      { href: '/blog/fr-contenu-seo-local/', label: 'Créer du contenu local performant' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/outils.astro',
    title: "Les meilleurs outils SEO local en 2025 | Guide SEO local",
    description: "Comparatif des meilleurs outils SEO local : BrightLocal, Whitespark, SEMrush, Moz Local, Google Search Console. Outils gratuits et payants pour suivre et améliorer votre visibilité locale.",
    ogImage: '/images/guide/fr-outils-seo.webp',
    currentCrumb: 'Outils SEO local',
    h1: "Les meilleurs outils SEO local",
    intro: "Gérer son SEO local sans outils, c'est naviguer à vue. Voici le comparatif des outils essentiels — gratuits et payants — pour surveiller, optimiser et mesurer votre visibilité locale.",
    sections: `
      <h2>Outils gratuits indispensables</h2>
      <ul>
        <li><strong>Google Business Profile</strong> : gratuit, obligatoire. Dashboard de gestion de votre fiche avec insights (vues, clics, appels).</li>
        <li><strong>Google Search Console</strong> : suivi des impressions et positions sur vos requêtes locales. Rapport « Performances » filtrable par pays, appareil, type de résultat.</li>
        <li><strong>Google Analytics 4</strong> : analyse du trafic organique local, comportement des visiteurs, conversions (appels, formulaires).</li>
        <li><strong>Google PageSpeed Insights</strong> : diagnostic des Core Web Vitals, crucial pour le SEO local mobile.</li>
      </ul>

      <h2>BrightLocal — le spécialiste du SEO local</h2>
      <p>BrightLocal est la référence pour le SEO local. Fonctionnalités clés :</p>
      <ul>
        <li>Suivi des positions dans le pack local par code postal (grid tracker)</li>
        <li>Audit des citations NAP sur 300+ annuaires</li>
        <li>Gestion des avis multi-plateformes</li>
        <li>Rapports clients en marque blanche</li>
      </ul>
      <p>Tarif : à partir de 39 $/mois. Idéal pour les agences et les entreprises multi-établissements.</p>

      <h2>Whitespark — expert des citations</h2>
      <p>Whitespark excelle dans la gestion des citations locales :</p>
      <ul>
        <li>Local Citation Finder : trouve les annuaires utilisés par vos concurrents</li>
        <li>Local Rank Tracker : suivi des positions locales ultra-précis par géolocalisation</li>
        <li>Citation Building Service : service géré de soumission aux annuaires</li>
      </ul>

      <h2>SEMrush — suite SEO complète avec module local</h2>
      <p>SEMrush propose un module « Listing Management » qui synchronise vos informations sur 70+ annuaires américains et européens. La suite complète permet aussi la recherche de mots-clés locaux, l'analyse de concurrents et le suivi de positions.</p>

      <h2>Moz Local</h2>
      <p>Moz Local automatise la gestion des citations sur les principaux agrégateurs de données locales. Moins complet que BrightLocal mais plus accessible (14 $/mois par établissement). Idéal pour les petites entreprises qui veulent automatiser leur présence sur les annuaires.</p>

      <h2>Outils de suivi de réputation</h2>
      <ul>
        <li><strong>Google Alerts</strong> : alerte email à chaque mention de votre nom en ligne</li>
        <li><strong>Mention</strong> : surveillance des mentions en temps réel</li>
        <li><strong>ReviewTrackers</strong> : agrégateur d'avis multi-plateformes</li>
      </ul>`,
    relatedLinks: [
      { href: '/guide-seo-local/mesurer-resultats', label: 'Mesurer et suivre vos résultats SEO local' },
      { href: '/blog/fr-audit-seo-local/', label: 'Réaliser un audit SEO local' },
      { href: '/guide-seo-local/citations-locales', label: 'Citations locales et NAP' },
    ]
  },
  {
    file: 'src/pages/guide-seo-local/mesurer-resultats.astro',
    title: "Mesurer ses résultats SEO local : KPIs et outils | Guide SEO local",
    description: "Comment mesurer l'efficacité de votre SEO local. KPIs essentiels (impressions GSC, appels GBP, clics itinéraires), tableaux de bord et reporting mensuel.",
    ogImage: '/images/guide/fr-mesurer-resultats.webp',
    currentCrumb: 'Mesurer les résultats',
    h1: "Mesurer et suivre ses résultats SEO local",
    intro: "Sans mesure, pas d'amélioration. Le SEO local produit des résultats visibles dans plusieurs sources de données. Voici les KPIs à suivre et comment construire un tableau de bord efficace.",
    sections: `
      <h2>Les KPIs Google Business Profile</h2>
      <p>L'onglet « Performances » de votre GBP fournit des métriques directement liées à votre visibilité locale :</p>
      <ul>
        <li><strong>Vues de la fiche</strong> : nombre de fois où votre fiche est apparue (recherche + Maps)</li>
        <li><strong>Appels téléphoniques</strong> : clics sur le numéro depuis la fiche — indicateur de conversion fort</li>
        <li><strong>Demandes d'itinéraire</strong> : signale l'intention de visite physique</li>
        <li><strong>Visites du site</strong> : clics vers votre site depuis GBP</li>
        <li><strong>Messages</strong> : si vous avez activé la messagerie GBP</li>
      </ul>

      <h2>Les KPIs Google Search Console</h2>
      <ul>
        <li><strong>Impressions</strong> sur les requêtes locales ([service] + [ville]) — indique votre visibilité</li>
        <li><strong>Clics</strong> — trafic réel généré</li>
        <li><strong>CTR</strong> — taux de clic moyen. Un CTR faible suggère que vos titres/descriptions peuvent être améliorés</li>
        <li><strong>Position moyenne</strong> — suivez l'évolution sur vos mots-clés cibles</li>
      </ul>

      <h2>Créer un tableau de bord mensuel</h2>
      <p>Compilez mensuellement :</p>
      <ol>
        <li>Évolution des vues GBP (mois vs mois précédent + année précédente)</li>
        <li>Nombre d'appels et demandes d'itinéraire depuis GBP</li>
        <li>Top 10 des requêtes organiques locales en GSC avec positions</li>
        <li>Nombre d'avis reçus et note moyenne</li>
        <li>Position dans le pack local pour vos 5 requêtes prioritaires (suivi manuel ou via BrightLocal)</li>
      </ol>

      <h2>Mesurer le retour sur investissement</h2>
      <p>Le SEO local génère des conversions souvent non trackées (appel direct, visite physique). Pour les mesurer :</p>
      <ul>
        <li>Utilisez un numéro de tracking dédié pour votre GBP (différent de celui du site)</li>
        <li>Formez votre équipe à demander « comment nous avez-vous trouvés ? »</li>
        <li>Configurez des objectifs de conversion dans GA4 (formulaires, clics tel)</li>
        <li>Comparez le trafic SEO local avant/après une action (nouvelle page, campagne d'avis)</li>
      </ul>

      <h2>Fréquence de reporting recommandée</h2>
      <ul>
        <li><strong>Hebdomadaire</strong> : vérifier les nouveaux avis, alertes Google sur votre marque</li>
        <li><strong>Mensuel</strong> : tableau de bord complet (GBP + GSC + positions)</li>
        <li><strong>Trimestriel</strong> : audit plus profond (citations, concurrents, opportunités de contenu)</li>
      </ul>`,
    relatedLinks: [
      { href: '/guide-seo-local/outils', label: 'Les meilleurs outils SEO local' },
      { href: '/blog/fr-audit-seo-local/', label: 'Réaliser un audit SEO local complet' },
      { href: '/guide-seo-local/google-business-profile', label: 'Optimiser votre Google Business Profile' },
    ]
  },
];

async function run() {
  let created = 0, skipped = 0;
  for (const p of PAGES) {
    const dest = path.resolve(ROOT, p.file);
    if (!FORCE && existsSync(dest)) {
      console.log(`  ⏭  skip: ${p.file}`);
      skipped++;
      continue;
    }
    const content = page(p);
    await writeFile(dest, content, 'utf8');
    console.log(`  ✅  ${p.file}`);
    created++;
  }
  console.log(`\n✨ ${created} créées, ${skipped} skippées`);
}

run().catch(console.error);
