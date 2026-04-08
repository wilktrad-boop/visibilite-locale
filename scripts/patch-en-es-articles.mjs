/**
 * Injecte image + FAQs dans tous les articles EN et ES en une seule passe.
 * Les FAQs sont adaptées à la langue de chaque article.
 *
 * Usage : node scripts/patch-en-es-articles.mjs
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');
const FORCE = process.argv.includes('--force');

// ─── FAQs par sujet (topic key → {en: [], es: []}) ────────────────────────

const FAQS = {
  'google-business-profile': {
    en: [
      { question: "Is Google Business Profile free to use?", answer: "Yes, creating and managing a Google Business Profile is completely free. Only Google Ads (Local Services Ads) are paid, but they are optional." },
      { question: "How do I verify my Google Business Profile?", answer: "Google offers several verification methods: by postcard (code sent in 5-14 days), by phone, by email, or via Search Console if your site is already verified. Video verification is increasingly common for new listings." },
      { question: "Can I have a GBP listing without a physical address?", answer: "Yes. Service-area businesses that travel to customers (plumbers, electricians, caterers) can hide their address and define a service area instead, allowing them to appear in the local pack without revealing their home address." },
      { question: "How many photos should I publish on Google Business Profile?", answer: "Google recommends a minimum of 10 photos. Listings with more than 100 photos receive on average 520% more calls than listings with fewer than 10 photos. Prioritize quality photos of the interior, exterior, team, and products." },
      { question: "What's the difference between GBP posts and photos?", answer: "Photos remain permanently on your listing. Posts (updates, offers, events) are temporary and disappear after 7 days for standard posts but remain in the history. Both signals contribute to your listing's engagement." }
    ],
    es: [
      { question: "¿Google Business Profile es gratuito?", answer: "Sí, crear y gestionar un perfil de Google Business es completamente gratuito. Solo los Google Ads locales son de pago, pero son opcionales." },
      { question: "¿Cómo verificar mi ficha de Google Business Profile?", answer: "Google ofrece varios métodos: por correo postal (código enviado en 5-14 días), por teléfono, por email, o a través de Search Console si tu sitio ya está verificado. La verificación por vídeo es cada vez más habitual." },
      { question: "¿Puedo tener una ficha GBP sin dirección física?", answer: "Sí. Las empresas de servicio que se desplazan a los clientes (fontaneros, electricistas) pueden ocultar su dirección y definir un área de servicio, apareciendo en el paquete local sin revelar su domicilio." },
      { question: "¿Cuántas fotos debo publicar en Google Business Profile?", answer: "Google recomienda un mínimo de 10 fotos. Las fichas con más de 100 fotos reciben de media un 520% más de llamadas que las fichas con menos de 10 fotos. Prioriza fotos de calidad del interior, exterior, equipo y productos." },
      { question: "¿Cuál es la diferencia entre posts y fotos de GBP?", answer: "Las fotos permanecen de forma permanente en tu ficha. Los posts (novedades, ofertas, eventos) son temporales y desaparecen tras 7 días para los posts estándar, pero quedan accesibles en el historial. Ambos contribuyen al engagement de la ficha." }
    ]
  },
  'local-citations': {
    en: [
      { question: "What is a local citation in SEO?", answer: "A local citation is any mention of your business on the internet that includes its name, address, and phone number (NAP). It can be found in directories, press articles, or social networks." },
      { question: "Why does NAP consistency matter for Google?", answer: "Google cross-references data from hundreds of sources to verify a business's existence and location. Inconsistent information creates confusion and reduces the trust granted to your listing, penalizing your local ranking." },
      { question: "How many local citations do you need to rank well?", answer: "There's no magic number. Quality trumps quantity. 30 consistent citations on high-authority directories are worth more than 200 citations on low-traffic sites." },
      { question: "How do I fix a NAP inconsistency on a directory?", answer: "Log in to your account on the relevant directory and update the information directly. If you don't have an account, use the error reporting form. Tools like BrightLocal or Moz Local automate this process across dozens of directories." },
      { question: "Are local citations the same as backlinks?", answer: "Not necessarily. A citation can be a simple text mention without a clickable link. However, when a citation includes a link to your site, it combines both benefits: local trust signal AND domain authority." }
    ],
    es: [
      { question: "¿Qué es una cita local en SEO?", answer: "Una cita local es cualquier mención de tu empresa en internet que incluya su nombre, dirección y teléfono (NAP). Puede encontrarse en directorios, artículos de prensa o redes sociales." },
      { question: "¿Por qué es importante la coherencia NAP para Google?", answer: "Google cruza datos de cientos de fuentes para verificar la existencia y ubicación de una empresa. La información inconsistente crea confusión y reduce la confianza otorgada a tu ficha, penalizando tu posicionamiento local." },
      { question: "¿Cuántas citas locales necesito para posicionarme bien?", answer: "No hay un número mágico. La calidad prima sobre la cantidad. 30 citas coherentes en directorios de alta autoridad valen más que 200 citas en sitios sin tráfico." },
      { question: "¿Cómo corrijo una inconsistencia NAP en un directorio?", answer: "Inicia sesión en tu cuenta en el directorio correspondiente y actualiza la información directamente. Si no tienes cuenta, usa el formulario de reporte de errores. Herramientas como BrightLocal o Moz Local automatizan este proceso." },
      { question: "¿Son lo mismo las citas locales y los backlinks?", answer: "No necesariamente. Una cita puede ser una simple mención de texto sin enlace clicable. Sin embargo, cuando la cita incluye un enlace a tu sitio, combina ambos beneficios: señal de confianza local Y autoridad de dominio." }
    ]
  },
  'customer-reviews': {
    en: [
      { question: "How many Google reviews do you need to appear in the local pack?", answer: "There's no minimum threshold, but in most sectors, 20 reviews with a rating of 4.3 or higher is enough to start appearing in the local pack. Review frequency (regularity) matters as much as total volume." },
      { question: "Can you ask customers for reviews?", answer: "Yes, it's even recommended. You can send a direct link to your review form by email, SMS, or QR code. However, offering an incentive (discount, gift) in exchange for a review is prohibited by Google's Terms of Service." },
      { question: "Should you respond to all Google reviews?", answer: "Yes. Responding to all reviews, positive and negative, is an engagement signal taken into account by Google. For positive reviews, a short response is enough. For negative reviews, respond calmly with a concrete solution." },
      { question: "How do you report a fake Google review?", answer: "In your Google Business Profile interface, click on the review then on 'Report a review'. Specify the reason (fake review, inappropriate content). Google examines reports within 3 to 5 business days, but removal is not guaranteed." },
      { question: "Do Tripadvisor or Yelp reviews influence Google SEO?", answer: "Indirectly. These reviews strengthen your overall online reputation and increase the likelihood that users will search for your name on Google. Some aggregators also send trust signals that Google takes into account." }
    ],
    es: [
      { question: "¿Cuántas reseñas de Google se necesitan para aparecer en el paquete local?", answer: "No hay un umbral mínimo, pero en la mayoría de sectores, 20 reseñas con una valoración de 4,3 o más es suficiente para empezar a aparecer en el paquete local. La frecuencia (regularidad) importa tanto como el volumen total." },
      { question: "¿Se puede pedir reseñas a los clientes?", answer: "Sí, es incluso recomendable. Puedes enviar un enlace directo a tu formulario de reseñas por email, SMS o código QR. Sin embargo, ofrecer un incentivo a cambio de una reseña está prohibido por los Términos de Servicio de Google." },
      { question: "¿Hay que responder a todas las reseñas de Google?", answer: "Sí. Responder a todas las reseñas, positivas y negativas, es una señal de compromiso que Google tiene en cuenta. Para las positivas, una respuesta breve es suficiente. Para las negativas, responde con calma y ofrece una solución." },
      { question: "¿Cómo denunciar una reseña falsa de Google?", answer: "En tu interfaz de Google Business Profile, haz clic en la reseña y luego en 'Denunciar una reseña'. Especifica el motivo. Google examina las denuncias en 3 a 5 días hábiles, pero la eliminación no está garantizada." },
      { question: "¿Las reseñas de Tripadvisor o Yelp influyen en el SEO de Google?", answer: "Indirectamente. Estas reseñas refuerzan tu reputación online global y aumentan la probabilidad de que los usuarios busquen tu nombre en Google. Algunos agregadores también envían señales de confianza que Google tiene en cuenta." }
    ]
  },
  'local-content': {
    en: [
      { question: "How many local landing pages should I create?", answer: "Create one page per city or geographic area where you genuinely want to appear in results. 5 quality pages with unique content are better than 50 duplicated pages with only the city name changed." },
      { question: "Can a local landing page rank without backlinks?", answer: "Yes, especially for less competitive queries in mid-sized cities. Well-structured content with LocalBusiness schema, authentic local signals, and consistent NAP can rank based on content alone." },
      { question: "What's the ideal length for a local service page?", answer: "Between 600 and 1500 words depending on competition. Analyze pages ranking positions 1-3 for your target query and aim for similar content depth. Avoid keyword stuffing: editorial quality comes first." },
      { question: "How do I avoid duplicate content across local landing pages?", answer: "Each page must have at least 60% unique content. Include city-specific elements: references to local neighborhoods or landmarks, testimonials from clients in that city, specific geographic context." },
      { question: "Should a local blog be on the same domain as the main site?", answer: "Yes, ideally. A blog on your main domain (mysite.com/blog/) transfers its authority directly to your service pages. A blog on a subdomain or separate domain is less effective for local SEO." }
    ],
    es: [
      { question: "¿Cuántas páginas de aterrizaje locales debo crear?", answer: "Crea una página por ciudad o área geográfica donde realmente quieras aparecer en los resultados. 5 páginas de calidad con contenido único son mejores que 50 páginas duplicadas con solo el nombre de la ciudad cambiado." },
      { question: "¿Puede una página local posicionarse sin backlinks?", answer: "Sí, especialmente para consultas poco competitivas en ciudades medianas. Contenido bien estructurado con schema LocalBusiness, señales locales auténticas y coherencia NAP puede posicionarse únicamente gracias al contenido." },
      { question: "¿Cuál es la longitud ideal para una página de servicio local?", answer: "Entre 600 y 1500 palabras según la competencia. Analiza las páginas que rankean en posición 1-3 para tu consulta objetivo y apunta a una profundidad de contenido similar. Evita el relleno de palabras clave: la calidad editorial es lo primero." },
      { question: "¿Cómo evito el contenido duplicado en páginas de aterrizaje locales?", answer: "Cada página debe tener al menos un 60% de contenido único. Incluye elementos específicos de cada ciudad: referencias a barrios o monumentos locales, testimonios de clientes de esa ciudad, contexto geográfico específico." },
      { question: "¿Debe el blog local estar en el mismo dominio que el sitio principal?", answer: "Sí, idealmente. Un blog en tu dominio principal transfiere su autoridad directamente a tus páginas de servicio. Un blog en un subdominio o dominio separado es menos efectivo para el SEO local." }
    ]
  },
  'local-backlinks': {
    en: [
      { question: "Is a local backlink worth less than a national backlink?", answer: "No. A backlink from a relevant local site (city newspaper, chamber of commerce, local association) can be more valuable for your local SEO than a backlink from a national site with no connection to your geographic area." },
      { question: "How do I get a link from a local online newspaper?", answer: "Pitch a press release with a strong local angle: business opening, local hiring, environmental initiative, event sponsorship. Local newspapers regularly look for content about businesses in their area. A direct email to the editorial team often works." },
      { question: "Do links from local directories count as backlinks?", answer: "Yes, but with moderate value. Citations with links on high-authority directories (Yelp, Tripadvisor) contribute to your link profile. However, links from directories with no traffic or authority have little value." },
      { question: "How many local backlinks do you need to improve SEO?", answer: "Quantity matters less than quality. In most local markets, 20 to 50 backlinks from relevant, diverse local sources are enough to establish solid local authority, especially if your competitors have few." },
      { question: "Do nofollow links from local partners have value?", answer: "For PageRank, a nofollow link doesn't pass authority. But it can generate direct traffic and positive behavioral signals. A diverse link profile including nofollows also appears more natural to Google." }
    ],
    es: [
      { question: "¿Vale menos un backlink local que uno nacional?", answer: "No. Un backlink de un sitio local relevante (periódico de la ciudad, cámara de comercio, asociación local) puede tener más valor para tu SEO local que un backlink de un sitio nacional sin relación con tu área geográfica." },
      { question: "¿Cómo consigo un enlace desde un periódico local online?", answer: "Propón una nota de prensa con un ángulo local fuerte: apertura de negocio, contratación local, iniciativa ecológica, patrocinio de evento. Los periódicos locales buscan regularmente contenido sobre empresas de su zona." },
      { question: "¿Los enlaces de directorios locales cuentan como backlinks?", answer: "Sí, pero con valor moderado. Las citas con enlace en directorios de alta autoridad (Yelp, Tripadvisor) contribuyen a tu perfil de enlaces. Sin embargo, los enlaces de directorios sin tráfico ni autoridad tienen poco valor." },
      { question: "¿Cuántos backlinks locales se necesitan para mejorar el SEO?", answer: "La cantidad importa menos que la calidad. En la mayoría de mercados locales, 20 a 50 backlinks de fuentes locales relevantes y diversas son suficientes para establecer una autoridad local sólida." },
      { question: "¿Los enlaces nofollow de socios locales tienen valor?", answer: "Para el PageRank, un enlace nofollow no transmite autoridad. Pero puede generar tráfico directo y señales de comportamiento positivas. Un perfil de enlaces diverso que incluya nofollow también parece más natural a Google." }
    ]
  },
  'businesses': {
    en: [
      { question: "Can a small local business rank on Google without a website?", answer: "Partially yes. A well-optimized Google Business Profile can position you in the local pack without a website. But for organic results and informational queries, a website is essential." },
      { question: "How long does local SEO take to show results?", answer: "First results (better GBP visibility) can appear within 4 to 8 weeks. Significant organic ranking improvements take 3 to 6 months. Local SEO is a long-term investment, not an instant solution." },
      { question: "What's the most important local SEO action for a small business?", answer: "Claiming and fully optimizing your Google Business Profile is the single most impactful action. A complete, accurate GBP listing with recent photos and regular reviews delivers the fastest results." },
      { question: "How much does local SEO cost for a small business?", answer: "DIY local SEO (GBP optimization, citations, review management) costs primarily time, not money. Professional agency help typically runs €300-800/month for a complete local SEO package for a small business." },
      { question: "Do social media pages help local SEO for small businesses?", answer: "Indirectly. Social media profiles with consistent NAP information contribute to citation diversity. Active social profiles also increase brand mentions and can drive traffic to your site, both positive signals." }
    ],
    es: [
      { question: "¿Puede un pequeño negocio local posicionarse en Google sin un sitio web?", answer: "Parcialmente sí. Un perfil de Google Business bien optimizado puede posicionarte en el paquete local sin un sitio web. Pero para los resultados orgánicos y las consultas informativas, un sitio web es esencial." },
      { question: "¿Cuánto tiempo tarda el SEO local en mostrar resultados?", answer: "Los primeros resultados (mejor visibilidad en GBP) pueden aparecer en 4 a 8 semanas. Las mejoras significativas en el posicionamiento orgánico tardan de 3 a 6 meses. El SEO local es una inversión a largo plazo." },
      { question: "¿Cuál es la acción de SEO local más importante para un pequeño negocio?", answer: "Reclamar y optimizar completamente tu perfil de Google Business es la acción más impactante. Una ficha GBP completa y precisa con fotos recientes y reseñas regulares ofrece los resultados más rápidos." },
      { question: "¿Cuánto cuesta el SEO local para un pequeño negocio?", answer: "El SEO local DIY (optimización de GBP, citas, gestión de reseñas) cuesta principalmente tiempo, no dinero. La ayuda profesional de una agencia normalmente cuesta entre 300 y 800 €/mes para un paquete completo." },
      { question: "¿Las redes sociales ayudan al SEO local de los pequeños negocios?", answer: "Indirectamente. Los perfiles de redes sociales con información NAP coherente contribuyen a la diversidad de citas. Los perfiles activos también aumentan las menciones de marca y pueden generar tráfico, señales positivas." }
    ]
  }
};

// Génération de FAQs génériques pour les articles sans correspondance spécifique
function getGenericFaqs(lang, title, slug) {
  const topicKey = slug.replace(/^(en|es)-/, '');

  if (lang === 'en') {
    return [
      { question: `How long does it take to see results from ${title.toLowerCase().split(':')[0]}?`, answer: "Significant results typically appear within 3 to 6 months of consistent effort. Some quick wins like GBP optimization can show improvement within 4-8 weeks." },
      { question: "Is this local SEO strategy suitable for small businesses?", answer: "Yes. Most local SEO strategies require more time than money, making them accessible to small businesses and sole traders with limited budgets." },
      { question: "Should I hire an agency or do local SEO myself?", answer: "Start with DIY for the fundamentals: GBP optimization, NAP consistency, and review management. These can be done without specialist knowledge. For more advanced technical work, consider professional help." },
      { question: "How do I measure the ROI of local SEO?", answer: "Track calls, direction requests, and website visits from your GBP Insights dashboard. Use Google Search Console to monitor organic traffic from local queries. Compare these metrics before and after implementing changes." },
      { question: "What's the biggest local SEO mistake to avoid?", answer: "Inconsistent NAP information across online directories is the most common and damaging mistake. Ensure your business name, address, and phone number are identical on every platform where your business is listed." }
    ];
  } else {
    return [
      { question: `¿Cuánto tiempo lleva ver resultados con esta estrategia de SEO local?`, answer: "Los resultados significativos suelen aparecer entre 3 y 6 meses de esfuerzo constante. Algunas victorias rápidas como la optimización de GBP pueden mostrar mejoras en 4-8 semanas." },
      { question: "¿Esta estrategia de SEO local es adecuada para pequeñas empresas?", answer: "Sí. La mayoría de las estrategias de SEO local requieren más tiempo que dinero, lo que las hace accesibles para pequeñas empresas y autónomos con presupuestos limitados." },
      { question: "¿Debo contratar una agencia o hacer el SEO local yo mismo?", answer: "Comienza con el DIY para los fundamentos: optimización de GBP, coherencia NAP y gestión de reseñas. Para trabajo técnico más avanzado, considera la ayuda profesional." },
      { question: "¿Cómo medir el ROI del SEO local?", answer: "Rastrea llamadas, solicitudes de indicaciones y visitas al sitio web desde el panel de estadísticas de GBP. Usa Google Search Console para monitorear el tráfico orgánico de consultas locales." },
      { question: "¿Cuál es el mayor error de SEO local que hay que evitar?", answer: "La información NAP inconsistente en los directorios online es el error más común y dañino. Asegúrate de que tu nombre, dirección y teléfono sean idénticos en todas las plataformas donde esté listada tu empresa." }
    ];
  }
}

// Mapping slug → topic key
const SLUG_TO_TOPIC = {
  'google-business-profile': 'google-business-profile',
  'local-citations': 'local-citations',
  'annuaires-locaux': 'local-citations',
  'citations-locales-nap': 'local-citations',
  'nap-coherence': 'local-citations',
  'customer-reviews': 'customer-reviews',
  'avis-clients-seo-local': 'customer-reviews',
  'avis-note-etoiles': 'customer-reviews',
  'generer-avis-google': 'customer-reviews',
  'resenas-clientes': 'customer-reviews',
  'local-content': 'local-content',
  'local-backlinks': 'local-backlinks',
  'businesses': 'businesses',
  'comercios': 'businesses',
  'commerces': 'businesses',
};

// ─── Parsing MDX ─────────────────────────────────────────────────────────────

function parseMdx(raw) {
  // Normalize line endings (CRLF → LF)
  const normalized = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
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
      const a = String(faq.answer).replace(/\n/g, ' ').replace(/"/g, "'");
      lines.push(`  - question: ${JSON.stringify(faq.question)}`);
      lines.push(`    answer: ${JSON.stringify(a)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const allFiles = await readdir(BLOG_DIR);
const targetFiles = allFiles
  .filter(f => f.endsWith('.mdx') && (f.startsWith('en-') || f.startsWith('es-')))
  .sort();

console.log(`\n📚  ${targetFiles.length} articles EN/ES à traiter\n`);

let done = 0, skipped = 0, errors = 0;

for (const file of targetFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const slug = file.replace('.mdx', '');
  const topicSlug = slug.replace(/^(en|es)-/, '');
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

  // Image path
  const image = `/images/blog/${slug}.webp`;

  // FAQs
  const topicKey = SLUG_TO_TOPIC[topicSlug];
  let faqs;
  if (topicKey && FAQS[topicKey]?.[frontmatter.lang]) {
    faqs = FAQS[topicKey][frontmatter.lang];
  } else {
    faqs = getGenericFaqs(frontmatter.lang, frontmatter.title, slug);
  }

  const newFm = { ...frontmatter, image, faqs };
  const output = buildMdx(newFm, body);
  await writeFile(filePath, output, 'utf-8');
  done++;
  console.log(`  ✅  ${file}`);
}

console.log(`\n✨  Terminé ! ${done} patchés, ${skipped} skippés, ${errors} erreurs\n`);
