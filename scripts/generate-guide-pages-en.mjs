/**
 * Génère les 14 nouvelles pages du guide SEO local (EN)
 * Usage : node scripts/generate-guide-pages-en.mjs [--force]
 */
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FORCE = process.argv.includes('--force');

function page({ file, title, description, ogImage, currentCrumb, h1, intro, sections, relatedLinks }) {
  const rel = relatedLinks.map(l => `<li><a href="${l.href}" class="hover:underline">${l.label}</a></li>`).join('\n          ');
  return `---
import Layout from '../../../layouts/Layout.astro';
---

<Layout
  title="${title}"
  description="${description}"
  lang="en"
  ogImage="${ogImage}"
>
  <section class="border-b border-gray-200 bg-gray-50 py-14">
    <div class="mx-auto max-w-3xl px-4">
      <nav class="mb-4 text-sm text-gray-500">
        <a href="/en/" class="hover:text-blue-600">Home</a> &rsaquo;
        <a href="/en/guide-seo-local" class="hover:text-blue-600">Local SEO Guide</a> &rsaquo;
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
        <p class="font-semibold text-blue-900">Related articles</p>
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
    file: 'src/pages/en/guide-seo-local/local-algorithm.astro',
    title: "How Google's Local Algorithm Works: Relevance, Distance, Prominence | Local SEO Guide",
    description: "Google ranks local results using three factors: relevance, distance and prominence. Understand the algorithm — including Pigeon, Possum and Vicinity updates — to optimise your local strategy.",
    ogImage: '/images/guide/en-local-algorithm.webp',
    currentCrumb: 'Local Algorithm',
    h1: "Google's Local Search Algorithm",
    intro: "Google evaluates local results across three dimensions: relevance, distance and prominence. Understanding these factors lets you focus your efforts where they'll have the most impact.",
    sections: `
      <h2>The 3 Official Local Ranking Factors</h2>
      <p>Google itself describes three dimensions for evaluating local results:</p>
      <ul>
        <li><strong>Relevance</strong>: how well your listing matches the search query — GBP category, keywords in your description, services listed, consistency with your website.</li>
        <li><strong>Distance</strong>: how far your business is from the user's location or the location specified in the query. This factor cannot be directly optimised.</li>
        <li><strong>Prominence</strong>: your online reputation — number and quality of reviews, citations in directories, domain authority, mentions in local press.</li>
      </ul>

      <h2>Key Algorithm Updates</h2>
      <ul>
        <li><strong>Pigeon (2014)</strong>: integrated classic SEO signals (domain authority, backlinks) into local rankings. Sites with strong organic SEO gained local visibility.</li>
        <li><strong>Possum (2016)</strong>: filters out similar listings in the same area. Two businesses in the same sector with nearby addresses tend not to both appear in the local pack.</li>
        <li><strong>Vicinity (2021)</strong>: strengthened the proximity factor. Businesses physically close to the searcher gained advantage over distant but highly prominent competitors.</li>
      </ul>

      <h2>What You Can Actually Control</h2>
      <ul>
        <li><strong>Relevance</strong>: choose the most precise GBP primary category, fill in all services and attributes, naturally integrate local keywords in your description and website.</li>
        <li><strong>Prominence</strong>: collect reviews consistently, maintain NAP consistency across all directories, build links from local websites and trusted partners.</li>
        <li><strong>Distance</strong>: for service-area businesses, define your coverage area precisely in GBP. For fixed premises, focus on the other two factors.</li>
      </ul>

      <h2>Local Pack vs Organic Results: Two Separate Algorithms</h2>
      <p>The local pack (3 map listings) and classic organic results use different algorithms. A site can rank organically without appearing in the local pack — and vice versa. The optimal strategy works on both: GBP for the local pack, an optimised site for organic results.</p>

      <h2>Secondary Signals That Matter</h2>
      <ul>
        <li>NAP consistency across the web</li>
        <li>Review velocity (consistent new reviews over time)</li>
        <li>Engagement: clicks, calls, direction requests from your listing</li>
        <li>Listing activity: recent photos, regular posts</li>
        <li>User behaviour signals (click-through rate in results)</li>
      </ul>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/local-pack', label: 'The local pack: how to appear in the 3-pack' },
      { href: '/en/guide-seo-local/google-business-profile', label: 'Optimise your Google Business Profile' },
      { href: '/en/blog/en-audit-seo-local/', label: 'How to run a local SEO audit' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/local-pack.astro',
    title: "Google Local Pack: How to Appear in the 3-Pack | Local SEO Guide",
    description: "Everything you need to know about the Google local pack: what the 3-pack is, how to rank in it, how it differs from organic results, and concrete strategies to earn a spot.",
    ogImage: '/images/guide/en-local-pack.webp',
    currentCrumb: 'Local Pack',
    h1: "The Google Local Pack",
    intro: "The local pack — the 3 business listings shown with a map at the top of search results — captures a major share of clicks on local queries. Here's how to earn a spot.",
    sections: `
      <h2>What Is the Local Pack?</h2>
      <p>When someone searches for a local service ("plumber London", "restaurant near me"), Google displays a block of 3 Google Business Profile listings with a map at the top of the results. This is the <strong>local pack</strong> (or "3-pack"). It appears above the 10 classic organic results and is the most prominent position for local searches.</p>

      <h2>Why the Local Pack Is So Valuable</h2>
      <ul>
        <li>It's visible without scrolling</li>
        <li>It directly displays your phone number, address, opening hours and reviews</li>
        <li>Clicks often lead directly to phone calls rather than site visits</li>
        <li>On mobile, the 3 listings occupy the entire above-the-fold screen</li>
      </ul>

      <h2>How Google Selects the 3 Listings</h2>
      <p>Google selects local pack listings by combining relevance, distance and prominence. The most relevant, complete listing that is geographically close to the searcher and has the best online reputation has the best chance of appearing. There's no single magic lever — it's the combination of all signals that makes the difference.</p>

      <h2>Concrete Actions to Rank in the Local Pack</h2>
      <ol>
        <li><strong>Claim and verify your GBP listing</strong> — an unverified listing cannot rank.</li>
        <li><strong>Choose the right primary category</strong> — the strongest relevance signal.</li>
        <li><strong>Complete 100% of fields</strong> — hours, description, services, attributes, photos.</li>
        <li><strong>Collect reviews regularly</strong> — aim for 4+ stars with consistent velocity.</li>
        <li><strong>Ensure NAP consistency</strong> — same name, address and phone number across all directories.</li>
        <li><strong>Post regularly</strong> — at least one GBP post per week to signal activity.</li>
      </ol>

      <h2>Local Pack and Organic: Complementary Strategies</h2>
      <p>Some local queries display both a local pack and organic results below it. A complete local strategy targets both: appearing in the pack via GBP AND ranking in the organic results with an optimised site. Businesses dominating both capture almost all available local traffic.</p>

      <h2>The Local Pack on Mobile</h2>
      <p>On mobile, the local pack is even more dominant — it fills the entire screen above the fold. With 60%+ of local searches on mobile, optimising for the local pack means primarily optimising for the mobile experience.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/local-algorithm', label: "How Google's local algorithm works" },
      { href: '/en/guide-seo-local/google-business-profile', label: 'Optimise your Google Business Profile' },
      { href: '/en/guide-seo-local/mobile-speed', label: 'Mobile and page speed for local SEO' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/local-keywords.astro',
    title: "Local Keyword Research: Method and Tools | Local SEO Guide",
    description: "How to find the right local keywords for your business. The [service]+[city] method, local long-tail keywords, Google Suggest, Search Console and paid tools.",
    ogImage: '/images/guide/en-local-keywords.webp',
    currentCrumb: 'Local Keywords',
    h1: "Local Keyword Research",
    intro: "Local keywords follow a different logic from generic ones — they combine a service intent with a geographic dimension. Here's the method to identify and exploit them.",
    sections: `
      <h2>Understanding Local Search Intent</h2>
      <p>Local queries take several forms:</p>
      <ul>
        <li><strong>[Service] + [City]</strong>: "plumber London", "dentist Manchester" — direct queries with strong commercial intent</li>
        <li><strong>[Service] + "near me"</strong>: Google detects the user's location and shows nearby results</li>
        <li><strong>[Service] + [Neighbourhood]</strong>: "restaurant Shoreditch", "hairdresser Notting Hill"</li>
        <li><strong>Local questions</strong>: "best tax lawyer in Birmingham", "where to fix a bike in Leeds"</li>
      </ul>

      <h2>Free Research Method with Google</h2>
      <ul>
        <li><strong>Google Suggest</strong>: type "[your service] + [your city]" and note the autocomplete suggestions — these are real queries with search volume.</li>
        <li><strong>Related searches</strong>: at the bottom of the results page, Google lists 8 related queries — a goldmine for long-tail keywords.</li>
        <li><strong>Google Search Console</strong>: if your site already exists, the Performances tab reveals queries generating impressions — some may not yet be optimised.</li>
        <li><strong>GBP Insights</strong>: shows the search terms people used to find your listing.</li>
      </ul>

      <h2>Paid Tools for Deeper Research</h2>
      <ul>
        <li><strong>SEMrush / Ahrefs</strong>: local search volume by city, keyword difficulty, variations</li>
        <li><strong>BrightLocal</strong>: specialised in local SEO, tracks positions in the local pack by postcode</li>
        <li><strong>Whitespark Local Rank Tracker</strong>: local position tracking with precise geolocation</li>
      </ul>

      <h2>Building an Actionable Keyword List</h2>
      <ol>
        <li>List all your services and products</li>
        <li>Cross-reference with your geographic areas (main city + surrounding towns)</li>
        <li>Add long-tail variations ("emergency", "24/7", "cheap", "same day")</li>
        <li>Group by intent and target page (one page = one semantic cluster)</li>
        <li>Prioritise by volume + competitive feasibility</li>
      </ol>

      <h2>Local Keywords and Content Strategy</h2>
      <p>Each local keyword cluster should correspond to a dedicated page on your site. A plumber in London shouldn't have a single "plumber London" page but potentially: "emergency drain unblocking London", "boiler repair North London", "bathroom installation Islington". This granularity maximises ranking opportunities on less competitive queries.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/service-area-pages', label: 'Creating effective service + city pages' },
      { href: '/en/blog/en-mots-cles-locaux/', label: 'Local keywords: complete guide' },
      { href: '/en/guide-seo-local/measuring-results', label: 'Measuring your local SEO results' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/service-area-pages.astro',
    title: "Service Area Pages: Creating Effective Local Landing Pages | Local SEO Guide",
    description: "How to structure service + city pages to rank in local SEO. Unique content, localisation signals, site architecture and concrete examples for service area businesses.",
    ogImage: '/images/guide/en-service-area-pages.webp',
    currentCrumb: 'Service Area Pages',
    h1: "Service Area Pages: The On-Site Pillar of Local SEO",
    intro: "Service area pages are landing pages specifically designed to target precise local queries. Well built, they help you rank in organic results and reinforce your GBP listing's authority.",
    sections: `
      <h2>Why Create Dedicated Pages per Area</h2>
      <p>A single "Our Services" page cannot rank for "emergency plumber East London" AND "plumber West London" simultaneously. Geographic granularity requires dedicated pages. Each service + city page targets a precise set of queries and helps Google understand exactly where you operate.</p>

      <h2>Structure of a High-Performing Service Area Page</h2>
      <ul>
        <li><strong>Title tag</strong>: [Service] in [City] — [Key Benefit] | [Brand]</li>
        <li><strong>H1</strong>: [Service] in [City] — precise, without keyword stuffing</li>
        <li><strong>Introduction</strong>: 100–150 words mentioning both service and city naturally</li>
        <li><strong>H2 sections</strong>: service overview, coverage area, benefits, indicative pricing</li>
        <li><strong>Local testimonials</strong>: ideally from clients in that geographic area</li>
        <li><strong>Embedded Google Maps</strong> or reference to your service area</li>
        <li><strong>LocalBusiness Schema.org</strong>: structured data with full address</li>
        <li><strong>Call to action</strong>: clickable phone number, contact form, booking button</li>
      </ul>

      <h2>Unique Content: The Absolute Rule</h2>
      <p>The most common mistake is creating 20 identical pages changing only the city name. Google penalises duplicate content. Each page must have:</p>
      <ul>
        <li>An introduction written specifically for that city</li>
        <li>Local references (neighbourhoods, landmarks, geographic specifics)</li>
        <li>Ideally, testimonials or case studies from clients in that area</li>
        <li>Practical information specific to that location (access, parking, exact service area)</li>
      </ul>

      <h2>Site Architecture for Local Pages</h2>
      <p>Organise your pages in a logical hierarchy:</p>
      <ul>
        <li><code>/services/plumbing/</code> — main service page</li>
        <li><code>/services/plumbing/london/</code> — main service + city page</li>
        <li><code>/services/plumbing/east-london/</code> — hyper-local page (neighbourhood)</li>
      </ul>
      <p>Internal links between these pages pass authority and help Google understand your geographic structure.</p>

      <h2>City Pages and GBP: Complementarity</h2>
      <p>Service area pages influence organic rankings AND indirectly reinforce your GBP listing. A site with relevant, well-optimised local pages sends Google a strong signal about where the business operates, which can improve your local pack positioning.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/local-keywords', label: 'Local keyword research' },
      { href: '/en/guide-seo-local/local-schema', label: 'LocalBusiness structured data' },
      { href: '/en/blog/en-page-service-ville/', label: 'Service + city pages: detailed article' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/local-schema.astro',
    title: "LocalBusiness Structured Data for Local SEO | Local SEO Guide",
    description: "Implement Schema.org LocalBusiness structured data in JSON-LD to improve your local rankings. Types, essential properties, code examples and testing tools.",
    ogImage: '/images/guide/en-local-schema.webp',
    currentCrumb: 'Local Structured Data',
    h1: "LocalBusiness Structured Data",
    intro: "Schema.org structured data lets Google precisely understand your business, its location and services. Correct markup can improve how your results appear and strengthen your local SEO signals.",
    sections: `
      <h2>Why Structured Data Matters for Local SEO</h2>
      <p>LocalBusiness Schema markup transmits structured information to Google: name, address, phone, hours, business type. This feeds the Knowledge Graph, rich snippets and can influence local pack positioning by reinforcing data consistency between your site and your GBP listing.</p>

      <h2>Specialised LocalBusiness Types</h2>
      <ul>
        <li><strong>Restaurant</strong>, <strong>Bakery</strong>, <strong>CafeOrCoffeeShop</strong> — food service</li>
        <li><strong>MedicalBusiness</strong>, <strong>Dentist</strong>, <strong>Optician</strong> — healthcare</li>
        <li><strong>LegalService</strong>, <strong>Notary</strong>, <strong>AccountingService</strong> — professional services</li>
        <li><strong>AutoRepair</strong>, <strong>Plumber</strong>, <strong>Electrician</strong> — trades</li>
        <li><strong>HairSalon</strong>, <strong>BeautySalon</strong>, <strong>SpaOrBeautyShop</strong> — beauty</li>
      </ul>

      <h2>Minimal JSON-LD Example</h2>
      <pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Johnson Plumbing",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 High Street",
    "addressLocality": "Manchester",
    "postalCode": "M1 1AA",
    "addressCountry": "GB"
  },
  "telephone": "+44 161 000 0000",
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
    "latitude": 53.4808,
    "longitude": -2.2426
  },
  "url": "https://www.johnsonplumbing.co.uk"
}</code></pre>

      <h2>Properties Not to Overlook</h2>
      <ul>
        <li><code>priceRange</code>: £, ££ or £££ — a trust signal</li>
        <li><code>aggregateRating</code>: average rating and review count (if you manage reviews yourself)</li>
        <li><code>areaServed</code>: list of towns or zones covered</li>
        <li><code>hasMap</code>: link to Google Maps</li>
        <li><code>sameAs</code>: URLs of your social profiles and directory listings</li>
      </ul>

      <h2>Testing and Validating Your Markup</h2>
      <ul>
        <li><strong>Google Rich Results Test</strong>: <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">search.google.com/test/rich-results</a></li>
        <li><strong>Schema Markup Validator</strong>: validator.schema.org</li>
        <li><strong>Google Search Console</strong>: "Enhancements" tab for errors after indexing</li>
      </ul>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/service-area-pages', label: 'Service area pages: structure and content' },
      { href: '/en/blog/en-schema-local-business/', label: 'LocalBusiness schema: complete guide' },
      { href: '/en/blog/en-donnees-structurees-avancees/', label: 'Advanced structured data for local SEO' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/mobile-speed.astro',
    title: "Mobile and Page Speed for Local SEO | Local SEO Guide",
    description: "Mobile-first indexing, Core Web Vitals and page speed: the technical foundations of local SEO. How to optimise for mobile searches and improve your local rankings.",
    ogImage: '/images/guide/en-mobile-speed.webp',
    currentCrumb: 'Mobile and Speed',
    h1: "Mobile and Speed: Technical Foundations of Local SEO",
    intro: "Over 60% of local searches happen on mobile. A slow or poorly adapted site loses customers before they've even read your content.",
    sections: `
      <h2>Mobile-First Indexing: What It Changes</h2>
      <p>Since 2021, Google primarily indexes the mobile version of your site. This means mobile performance determines your ranking — including on desktop. A responsive, fast mobile site is no longer optional: it's the baseline.</p>

      <h2>Core Web Vitals: The 3 Metrics to Monitor</h2>
      <ul>
        <li><strong>LCP (Largest Contentful Paint)</strong>: loading time of the main visible element. Target: under 2.5 seconds.</li>
        <li><strong>INP (Interaction to Next Paint)</strong>: responsiveness to user interactions. Target: under 200ms.</li>
        <li><strong>CLS (Cumulative Layout Shift)</strong>: visual stability (elements jumping during load). Target: under 0.1.</li>
      </ul>

      <h2>Why This Is Critical for Local SEO</h2>
      <p>Local searches often have immediate intent: the user is looking for a phone number, address or opening hours. If your page takes 5 seconds to load on mobile, they go back to Google and click the next result. High bounce rates send a negative signal that can hurt your rankings.</p>

      <h2>Priority Technical Optimisations</h2>
      <ul>
        <li><strong>Images</strong>: use WebP format, set width/height attributes, lazy load off-screen images</li>
        <li><strong>Hosting</strong>: choose a host with servers near your target audience</li>
        <li><strong>Caching</strong>: implement browser and server-side caching</li>
        <li><strong>CSS/JS</strong>: minify files, defer non-critical JavaScript</li>
        <li><strong>Fonts</strong>: preload above-the-fold fonts, use font-display: swap</li>
      </ul>

      <h2>Diagnostic Tools</h2>
      <ul>
        <li><strong>PageSpeed Insights</strong>: pagespeed.web.dev — analyses LCP/INP/CLS with detailed suggestions</li>
        <li><strong>Google Search Console</strong>: "Page Experience" report for failing URLs</li>
        <li><strong>WebPageTest.org</strong>: advanced testing from different locations and connections</li>
      </ul>

      <h2>Mobile UX for Local Searches</h2>
      <p>Beyond speed, mobile ergonomics matter: clickable phone number at the top of the page, Google Maps directions button, simple contact form (3 fields maximum). A mobile user searching for an emergency plumber should be able to call within 2 seconds of reaching your page.</p>`,
    relatedLinks: [
      { href: '/en/blog/en-mobile-recherche-locale/', label: 'Mobile and local search: stats and optimisations' },
      { href: '/en/blog/en-core-web-vitals-local/', label: 'Core Web Vitals and local SEO' },
      { href: '/en/guide-seo-local/local-schema', label: 'LocalBusiness structured data' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/local-directories.astro',
    title: "Top Local Directories: Which to Choose and How to Submit | Local SEO Guide",
    description: "The essential local directories for local SEO. How to choose, submit and maintain NAP consistency to maximise your local visibility and citation signals.",
    ogImage: '/images/guide/en-local-directories.webp',
    currentCrumb: 'Local Directories',
    h1: "Top Local Directories for Local SEO",
    intro: "Citations in local directories (mentions of your name, address and phone) are a major trust signal for Google. Here are the directories to prioritise and the method to manage them effectively.",
    sections: `
      <h2>Why Local Directories Matter</h2>
      <p>Local directories create <strong>citations</strong> — mentions of your NAP (Name, Address, Phone) on third-party sites. These citations confirm to Google the existence and legitimacy of your business. The more consistently your information appears on authoritative sources, the higher your local prominence score.</p>

      <h2>Essential General Directories</h2>
      <ul>
        <li><strong>Google Business Profile</strong> — the absolute foundation</li>
        <li><strong>Bing Places for Business</strong> — Bing represents ~10% of UK searches</li>
        <li><strong>Apple Maps</strong> (via Apple Business Connect) — essential for iPhone users</li>
        <li><strong>Yelp</strong> — strong for restaurants and retail</li>
        <li><strong>Facebook Business Page</strong> — with full address and hours</li>
        <li><strong>Yell.com</strong> — UK's leading directory</li>
        <li><strong>Thomson Local</strong>, <strong>192.com</strong> — secondary UK directories</li>
      </ul>

      <h2>Industry-Specific Directories</h2>
      <ul>
        <li><strong>Restaurants</strong>: TripAdvisor, OpenTable, Deliveroo, Just Eat</li>
        <li><strong>Trades</strong>: Checkatrade, Rated People, MyBuilder, TrustATrader</li>
        <li><strong>Healthcare</strong>: NHS.uk, Doctify, WhatClinic</li>
        <li><strong>Legal</strong>: Law Society Find a Solicitor, Solicitors.com</li>
        <li><strong>Hotels</strong>: Booking.com, Expedia, TripAdvisor</li>
      </ul>

      <h2>Effective Submission Method</h2>
      <ol>
        <li><strong>Prepare your standardised listing</strong>: exact name, full address, phone, URL, 150-word description, logo and photos</li>
        <li><strong>Check for existing listings</strong> before creating — your business may already be listed with incorrect information</li>
        <li><strong>Submit in priority order</strong>: Google + Bing first, then industry-specific, then secondary directories</li>
        <li><strong>Keep a tracking spreadsheet</strong> with URL of each listing and login credentials</li>
      </ol>

      <h2>Maintaining NAP Consistency</h2>
      <p>Consistency is more important than volume. One inconsistency (abbreviated name, old address, different number) can cancel the positive effect of dozens of correct citations. Regularly audit and correct your listings, especially after a move or phone number change.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/local-citations', label: 'Local citations and NAP consistency' },
      { href: '/en/blog/en-annuaires-locaux/', label: 'Best local directories by sector' },
      { href: '/en/blog/en-nap-coherence/', label: 'NAP consistency: why and how' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/responding-to-reviews.astro',
    title: "Responding to Google Reviews: Strategy and Templates | Local SEO Guide",
    description: "How to respond to positive and negative Google reviews. Response strategy, ready-to-use templates, impact on local SEO and purchase decisions.",
    ogImage: '/images/guide/en-responding-reviews.webp',
    currentCrumb: 'Responding to Reviews',
    h1: "Responding to Reviews: Strategy and Templates",
    intro: "Responding to reviews isn't optional — it's an SEO signal and a conversion lever. Google takes response activity into account when evaluating the quality of your listing.",
    sections: `
      <h2>Why Responding to Reviews Improves Local SEO</h2>
      <p>Google confirms that review responses are an engagement signal factored into the local algorithm. A listing with 100% response rate shows an active, attentive business. Moreover, your responses are indexed by Google — providing additional content naturally enriched with keywords related to your activity and location.</p>

      <h2>Responding to Positive Reviews</h2>
      <p>Don't settle for a generic "Thank you!" Personalise each response:</p>
      <ul>
        <li>Mention the customer's first name if available</li>
        <li>Reference a specific detail from their review</li>
        <li>Naturally integrate a local keyword ("our team in [City]")</li>
        <li>End with an invitation to return or recommend</li>
      </ul>
      <p><strong>Template</strong>: "Thank you [Name] for your kind words! We're so glad that [specific detail] met your expectations. The whole team at [Business] in [City] looks forward to welcoming you again soon!"</p>

      <h2>Responding to Negative Reviews</h2>
      <p>Negative reviews handled well can become a selling point. The process:</p>
      <ol>
        <li><strong>Respond within 24–48 hours</strong> — speed shows professionalism</li>
        <li><strong>Stay professional</strong> — never defend yourself aggressively or counter-attack</li>
        <li><strong>Acknowledge the experience</strong> even if you disagree</li>
        <li><strong>Offer an offline solution</strong> (email, phone) to avoid public debate</li>
        <li><strong>Avoid generic phrases</strong> — they signal indifference</li>
      </ol>
      <p><strong>Template</strong>: "Hello [Name], we're truly sorry about your experience. This doesn't reflect our usual standards. Could you contact us directly at [email/phone] so we can find a resolution?"</p>

      <h2>Flagging Fraudulent Reviews</h2>
      <p>If you receive a review you suspect is fraudulent (competitor, person you don't recognise), you can flag it via the GBP interface. Flagging doesn't guarantee removal, but Google investigates if the content violates its policies (fake review, hateful content, off-topic).</p>

      <h2>Frequency and Organisation</h2>
      <p>Set a process: check for new reviews every 2 days, respond within 48 hours maximum. Designate a responsible person. The GBP notification tool (email or app) alerts you as soon as a review is published.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/customer-reviews', label: 'Full review management strategy' },
      { href: '/en/blog/en-repondre-avis-negatifs/', label: 'How to respond to negative reviews' },
      { href: '/en/blog/en-generer-avis-google/', label: 'How to generate more Google reviews' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/restaurants.astro',
    title: "Local SEO for Restaurants: Complete 2025 Guide | Local SEO Guide",
    description: "Complete local SEO strategy for restaurants. GBP with menu, TripAdvisor, OpenTable, customer reviews, photos and restaurant-specific attributes.",
    ogImage: '/images/guide/en-restaurants.webp',
    currentCrumb: 'Restaurants',
    h1: "Local SEO for Restaurants",
    intro: "The restaurant industry is one of the most competitive in local SEO. Here's the complete strategy to appear at the top of results and fill your tables.",
    sections: `
      <h2>Google Business Profile: Restaurant-Specific Features</h2>
      <ul>
        <li><strong>Menu</strong>: add your menu directly in GBP (dishes, prices, descriptions). It appears in your listing and can influence searches by cuisine type.</li>
        <li><strong>Reservations</strong>: integrate a booking button via OpenTable, Resy or your own system.</li>
        <li><strong>Attributes</strong>: outdoor seating, wifi, parking, wheelchair accessible, delivery, takeaway — each targeted attribute increases your chances on filtered searches.</li>
        <li><strong>Popular times</strong>: visible on the listing, helps customers choose quieter slots.</li>
      </ul>

      <h2>Essential Review Platforms</h2>
      <ul>
        <li><strong>Google</strong>: absolute priority, direct impact on the local pack</li>
        <li><strong>TripAdvisor</strong>: significant weight for "best restaurant [city]" queries</li>
        <li><strong>OpenTable / Resy</strong>: booking integration that Google sometimes pulls into results</li>
        <li><strong>Facebook</strong>: important for local community and events</li>
      </ul>

      <h2>Photos: The Restaurant's Main Weapon</h2>
      <ul>
        <li>Hero dish photos (high resolution, good lighting, clean background)</li>
        <li>Interior and exterior atmosphere (terrace, dining room decor)</li>
        <li>Team in action (open kitchen, floor service)</li>
        <li>Seasonal updates (new menus, events)</li>
      </ul>
      <p>Aim for a minimum of 50 photos. Listings with 100+ photos receive 520% more calls.</p>

      <h2>Website Content: Targeting Restaurant Queries</h2>
      <ul>
        <li>Home page optimised for "[cuisine] restaurant [city]"</li>
        <li>HTML menu page (not just a PDF — Google doesn't read PDFs reliably)</li>
        <li>Events page to rank for "birthday restaurant [city]", "private dining [city]"</li>
        <li>Blog or news section for seasonal menu updates and events</li>
      </ul>

      <h2>Schema.org for Restaurants</h2>
      <p>Use the <code>Restaurant</code> type (a subtype of LocalBusiness) and add properties <code>servesCuisine</code>, <code>hasMenu</code>, <code>acceptsReservations</code>, <code>priceRange</code>. These feed rich snippets and can appear directly in search results.</p>`,
    relatedLinks: [
      { href: '/en/blog/en-seo-local-restaurants/', label: 'Local SEO for restaurants: detailed article' },
      { href: '/en/guide-seo-local/customer-reviews', label: 'Review management strategy' },
      { href: '/en/guide-seo-local/google-business-profile', label: 'Optimise your Google Business Profile' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/tradespeople.astro',
    title: "Local SEO for Tradespeople: Complete 2025 Guide | Local SEO Guide",
    description: "Local SEO strategy for plumbers, electricians, builders and trades. Service area, quality accreditations, job photos and customer reviews to dominate local results.",
    ogImage: '/images/guide/en-tradespeople.webp',
    currentCrumb: 'Tradespeople',
    h1: "Local SEO for Tradespeople",
    intro: "Plumbers, electricians, painters, carpenters — tradespeople benefit from enormous local SEO potential on high-intent queries. Here's the adapted strategy.",
    sections: `
      <h2>Defining and Targeting Your Service Area</h2>
      <p>Most tradespeople don't have a visible commercial address but travel to customers. In GBP, you can:</p>
      <ul>
        <li>Hide your home address</li>
        <li>Define a service area (by radius or list of postcodes/towns)</li>
        <li>Appear in the local pack for all towns within your area</li>
      </ul>
      <p>On your website, create a dedicated page for each main town in your area. A plumber covering Manchester should have pages for Manchester, Salford, Stockport, Trafford, etc.</p>

      <h2>Accreditations: Powerful Trust Signals</h2>
      <ul>
        <li><strong>Gas Safe Register</strong> — mandatory for gas work in the UK</li>
        <li><strong>NICEIC / NAPIT</strong> — electrical certification bodies</li>
        <li><strong>Which? Trusted Traders</strong> — high consumer recognition</li>
        <li><strong>TrustMark</strong> — government-endorsed quality scheme</li>
        <li><strong>Checkatrade, Rated People</strong> — trade-specific review platforms</li>
      </ul>
      <p>Display these accreditations on your site, GBP listing and directory profiles. Each mention of an accreditation on an external site creates a citation and trust signal.</p>

      <h2>Job Photos: Your Best Argument</h2>
      <ul>
        <li>Publish before/after photos regularly on GBP with descriptions including job type and location</li>
        <li>Build a portfolio gallery on your site with optimised captions</li>
        <li>Geotag photos where possible (with client permission)</li>
      </ul>

      <h2>Review Strategy for Trades</h2>
      <p>Tradespeople have an advantage: you're physically with the customer at the end of the job. Take that opportunity to:</p>
      <ul>
        <li>Send an SMS with the direct link to your GBP listing immediately after the job</li>
        <li>Mention the review in your invoice or follow-up email</li>
        <li>Prepare a business card with a QR code to your review profile</li>
      </ul>

      <h2>Specialist Trade Directories</h2>
      <ul>
        <li><strong>Checkatrade</strong>: leading UK trades directory with strong SEO presence</li>
        <li><strong>Rated People</strong>: job lead generation platform</li>
        <li><strong>MyBuilder</strong>: popular for home improvement trades</li>
        <li><strong>Houzz</strong>: ideal for interior trades and home improvement</li>
      </ul>`,
    relatedLinks: [
      { href: '/en/blog/en-seo-local-artisans/', label: 'Local SEO for trades: detailed article' },
      { href: '/en/guide-seo-local/service-area-pages', label: 'Creating pages for your service area' },
      { href: '/en/guide-seo-local/customer-reviews', label: 'Collecting and managing customer reviews' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/healthcare.astro',
    title: "Local SEO for Healthcare Professionals | Local SEO Guide",
    description: "Local SEO for doctors, dentists, physiotherapists and healthcare practitioners. YMYL standards, E-E-A-T signals, online booking platforms and patient review management.",
    ogImage: '/images/guide/en-healthcare.webp',
    currentCrumb: 'Healthcare',
    h1: "Local SEO for Healthcare Professionals",
    intro: "Healthcare is a YMYL (Your Money or Your Life) sector — Google applies particularly strict E-E-A-T criteria. Here are the local SEO specifics to master as a healthcare professional.",
    sections: `
      <h2>YMYL and E-E-A-T: Healthcare-Specific Requirements</h2>
      <p>Google classifies healthcare among YMYL content — topics where poor information can have serious consequences. For these, the algorithm places extra weight on E-E-A-T signals:</p>
      <ul>
        <li><strong>Experience</strong>: evidence of practical experience (case studies, patient testimonials)</li>
        <li><strong>Expertise</strong>: qualifications, specialisations, publications, professional memberships</li>
        <li><strong>Authoritativeness</strong>: mentions in medical press, citations by peers</li>
        <li><strong>Trustworthiness</strong>: authentic reviews, clear contact information, privacy policy</li>
      </ul>

      <h2>Google Business Profile for Healthcare Professionals</h2>
      <ul>
        <li>Use the precise business type (Dentist, Physiotherapist, Doctor, etc.)</li>
        <li>List your specialties in the description</li>
        <li>Enable accessibility attributes (wheelchair access, parking)</li>
        <li>Integrate a booking button via your appointment system</li>
        <li>Never publish specific patient information — even anonymised</li>
      </ul>

      <h2>Online Booking Platforms</h2>
      <p>Platforms like Doctify, WhatClinic and NHS.uk often rank on first page for queries like "dentist London" or "physiotherapist Manchester". A complete, up-to-date profile on these platforms complements your own website and creates valuable citations.</p>

      <h2>Managing Patient Reviews</h2>
      <ul>
        <li>Respond to all reviews (positive and negative) without confirming the patient relationship</li>
        <li>Never include clinical details in your responses (patient confidentiality)</li>
        <li>If a review clearly violates patient confidentiality, flag it to Google</li>
        <li>Direct dissatisfied patients to a private email or phone number</li>
      </ul>

      <h2>Website Content for Healthcare Professionals</h2>
      <ul>
        <li>Page per specialty or condition treated (with referenced medical sources)</li>
        <li>"About" page with qualifications, experience and professional affiliations clearly listed</li>
        <li>FAQ on consultations, fees, referrals and what to expect</li>
        <li>Schema.org: <code>MedicalBusiness</code>, <code>Dentist</code>, <code>Physician</code> types with <code>medicalSpecialty</code></li>
      </ul>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/local-schema', label: 'LocalBusiness structured data' },
      { href: '/en/guide-seo-local/customer-reviews', label: 'Review management' },
      { href: '/en/blog/en-donnees-structurees-avancees/', label: 'Advanced structured data' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/professional-services.astro',
    title: "Local SEO for Professional Services | Local SEO Guide",
    description: "Local SEO for solicitors, accountants, financial advisers and regulated professions. Professional directories, E-E-A-T, specialty pages and compliant content strategy.",
    ogImage: '/images/guide/en-professional-services.webp',
    currentCrumb: 'Professional Services',
    h1: "Local SEO for Professional Services",
    intro: "Solicitors, accountants, financial advisers, architects — regulated professions have specific communication constraints. Here's how to optimise your local visibility within that framework.",
    sections: `
      <h2>Professional Conduct Rules and SEO</h2>
      <p>Regulated professions are subject to strict advertising rules. SEO is generally permitted — it's visibility optimisation, not direct advertising — but certain content (comparison with competitors, guaranteed results) should be avoided. Check your professional body's guidelines before publishing any commercial content.</p>

      <h2>Professional Directories Not to Miss</h2>
      <ul>
        <li><strong>Solicitors</strong>: Law Society Find a Solicitor, Legal 500, Chambers and Partners</li>
        <li><strong>Accountants</strong>: ICAEW, ACCA, CIMA member directories</li>
        <li><strong>Financial Advisers</strong>: FCA Register, Unbiased.co.uk, VouchedFor</li>
        <li><strong>Architects</strong>: ARB Register, RIBA Find an Architect</li>
      </ul>
      <p>These official directories have very high domain authority. A mention there is far more valuable than a listing in a generic directory.</p>

      <h2>Structuring Your Site by Speciality</h2>
      <p>The key for professional services is thematic AND geographic granularity:</p>
      <ul>
        <li>A solicitor in London should have pages for: "employment law solicitor London", "divorce solicitor London", "property law solicitor London"</li>
        <li>An accountant: "accountant for startups London", "SME accounting London", "VAT returns London"</li>
      </ul>
      <p>Each page must provide genuine informational value — process explanations, what's covered, indicative fees where possible.</p>

      <h2>Building Local Authority (E-E-A-T)</h2>
      <ul>
        <li>Articles in local business or trade press</li>
        <li>Speaking at local events (chambers of commerce, professional associations)</li>
        <li>Partnerships with complementary professions (solicitor + accountant + financial adviser)</li>
        <li>Detailed biography page: career, specialisations, ongoing training</li>
      </ul>

      <h2>Client Reviews and Regulated Professions</h2>
      <p>Google reviews are permitted for most professional services. Invite satisfied clients to leave a review while respecting confidentiality (never mention the nature of the matter in your responses). For medical professionals, see the specific precautions in the healthcare section.</p>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/healthcare', label: 'Local SEO for healthcare professionals' },
      { href: '/en/guide-seo-local/service-area-pages', label: 'Effective service area pages' },
      { href: '/en/blog/en-contenu-seo-local/', label: 'Creating high-performing local content' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/tools.astro',
    title: "Best Local SEO Tools in 2025 | Local SEO Guide",
    description: "Comparison of the best local SEO tools: BrightLocal, Whitespark, SEMrush, Moz Local, Google Search Console. Free and paid tools to track and improve your local visibility.",
    ogImage: '/images/guide/en-seo-tools.webp',
    currentCrumb: 'Local SEO Tools',
    h1: "The Best Local SEO Tools",
    intro: "Managing local SEO without tools means navigating blind. Here's a comparison of the essential tools — free and paid — to monitor, optimise and measure your local visibility.",
    sections: `
      <h2>Essential Free Tools</h2>
      <ul>
        <li><strong>Google Business Profile</strong>: free, mandatory. Management dashboard with insights (views, clicks, calls).</li>
        <li><strong>Google Search Console</strong>: tracks impressions and positions for local queries. Performance report filterable by country, device and result type.</li>
        <li><strong>Google Analytics 4</strong>: analysis of local organic traffic, visitor behaviour, conversions (calls, forms).</li>
        <li><strong>Google PageSpeed Insights</strong>: Core Web Vitals diagnostics, critical for local mobile SEO.</li>
      </ul>

      <h2>BrightLocal — The Local SEO Specialist</h2>
      <p>BrightLocal is the reference tool for local SEO:</p>
      <ul>
        <li>Local pack position tracking by postcode (grid tracker)</li>
        <li>NAP citation audit across 300+ directories</li>
        <li>Multi-platform review management</li>
        <li>White-label client reports</li>
      </ul>
      <p>Pricing: from $39/month. Ideal for agencies and multi-location businesses.</p>

      <h2>Whitespark — Citation Expert</h2>
      <ul>
        <li>Local Citation Finder: finds directories used by your competitors</li>
        <li>Local Rank Tracker: ultra-precise local position tracking by geolocation</li>
        <li>Citation Building Service: managed directory submission service</li>
      </ul>

      <h2>SEMrush — Full Suite with Local Module</h2>
      <p>SEMrush's "Listing Management" module syncs your information across 70+ directories. The full suite also offers local keyword research, competitor analysis and position tracking.</p>

      <h2>Moz Local</h2>
      <p>Moz Local automates citation management across the main local data aggregators. Less comprehensive than BrightLocal but more accessible ($14/month per location). Ideal for small businesses automating their directory presence.</p>

      <h2>Reputation Monitoring Tools</h2>
      <ul>
        <li><strong>Google Alerts</strong>: email alert for every online mention of your name</li>
        <li><strong>Mention</strong>: real-time mention monitoring</li>
        <li><strong>ReviewTrackers</strong>: multi-platform review aggregator</li>
      </ul>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/measuring-results', label: 'Measuring your local SEO results' },
      { href: '/en/blog/en-audit-seo-local/', label: 'How to run a local SEO audit' },
      { href: '/en/guide-seo-local/local-citations', label: 'Local citations and NAP' },
    ]
  },
  {
    file: 'src/pages/en/guide-seo-local/measuring-results.astro',
    title: "Measuring Local SEO Results: KPIs and Tools | Local SEO Guide",
    description: "How to measure your local SEO performance. Essential KPIs (GSC impressions, GBP calls, direction requests), dashboards and monthly reporting for local businesses.",
    ogImage: '/images/guide/en-measuring-results.webp',
    currentCrumb: 'Measuring Results',
    h1: "Measuring and Tracking Local SEO Results",
    intro: "Without measurement, there's no improvement. Local SEO produces visible results across multiple data sources. Here are the KPIs to track and how to build an effective dashboard.",
    sections: `
      <h2>Google Business Profile KPIs</h2>
      <p>The "Performance" tab in your GBP provides metrics directly tied to your local visibility:</p>
      <ul>
        <li><strong>Listing views</strong>: how often your listing appeared (Search + Maps)</li>
        <li><strong>Phone calls</strong>: clicks on the number from your listing — a strong conversion indicator</li>
        <li><strong>Direction requests</strong>: signals intent to visit physically</li>
        <li><strong>Website visits</strong>: clicks to your site from GBP</li>
        <li><strong>Messages</strong>: if you've enabled GBP messaging</li>
      </ul>

      <h2>Google Search Console KPIs</h2>
      <ul>
        <li><strong>Impressions</strong> for local queries ([service] + [city]) — indicates your visibility</li>
        <li><strong>Clicks</strong> — actual traffic generated</li>
        <li><strong>CTR</strong> — low CTR suggests your titles/descriptions can be improved</li>
        <li><strong>Average position</strong> — track changes on your target keywords</li>
      </ul>

      <h2>Building a Monthly Dashboard</h2>
      <ol>
        <li>GBP views trend (month vs previous month + previous year)</li>
        <li>Calls and direction requests from GBP</li>
        <li>Top 10 local organic queries in GSC with positions</li>
        <li>Number of reviews received and average rating</li>
        <li>Local pack position for your 5 priority queries (manual check or BrightLocal)</li>
      </ol>

      <h2>Measuring Return on Investment</h2>
      <p>Local SEO generates conversions that are often untracked (direct call, physical visit). To measure them:</p>
      <ul>
        <li>Use a dedicated tracking number for your GBP (different from your site number)</li>
        <li>Train your team to ask "how did you find us?"</li>
        <li>Set up conversion goals in GA4 (forms, phone clicks)</li>
        <li>Compare local SEO traffic before/after an action (new page, review campaign)</li>
      </ul>

      <h2>Recommended Reporting Frequency</h2>
      <ul>
        <li><strong>Weekly</strong>: check new reviews, brand alerts</li>
        <li><strong>Monthly</strong>: full dashboard (GBP + GSC + positions)</li>
        <li><strong>Quarterly</strong>: deeper audit (citations, competitors, content opportunities)</li>
      </ul>`,
    relatedLinks: [
      { href: '/en/guide-seo-local/tools', label: 'The best local SEO tools' },
      { href: '/en/blog/en-audit-seo-local/', label: 'How to run a complete local SEO audit' },
      { href: '/en/guide-seo-local/google-business-profile', label: 'Optimise your Google Business Profile' },
    ]
  },
];

async function run() {
  let created = 0, skipped = 0;
  for (const p of PAGES) {
    const dest = path.resolve(ROOT, p.file);
    if (!FORCE && existsSync(dest)) { console.log(`  ⏭  skip: ${p.file}`); skipped++; continue; }
    await writeFile(dest, page(p), 'utf8');
    console.log(`  ✅  ${p.file}`);
    created++;
  }
  console.log(`\n✨ ${created} créées, ${skipped} skippées`);
}
run().catch(console.error);
