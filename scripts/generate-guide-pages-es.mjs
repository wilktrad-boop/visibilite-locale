/**
 * Génère les 14 nouvelles pages du guide SEO local (ES)
 * Usage : node scripts/generate-guide-pages-es.mjs [--force]
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
  lang="es"
  ogImage="${ogImage}"
>
  <section class="border-b border-gray-200 bg-gray-50 py-14">
    <div class="mx-auto max-w-3xl px-4">
      <nav class="mb-4 text-sm text-gray-500">
        <a href="/es/" class="hover:text-blue-600">Inicio</a> &rsaquo;
        <a href="/es/guide-seo-local" class="hover:text-blue-600">Guía SEO local</a> &rsaquo;
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
        <p class="font-semibold text-blue-900">Artículos relacionados</p>
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
    file: 'src/pages/es/guide-seo-local/algoritmo-local.astro',
    title: "Algoritmo local de Google: relevancia, distancia y notoriedad | Guía SEO local",
    description: "Cómo Google clasifica los resultados locales según tres factores: relevancia, distancia y notoriedad. Actualización Pigeon, Possum y Vicinity para optimizar tu estrategia.",
    ogImage: '/images/guide/es-algoritmo-local.webp',
    currentCrumb: 'Algoritmo local',
    h1: "El algoritmo local de Google",
    intro: "Google evalúa los resultados locales en tres dimensiones: relevancia, distancia y notoriedad. Entender estos factores permite concentrar los esfuerzos donde tendrán mayor impacto.",
    sections: `
      <h2>Los 3 factores oficiales de posicionamiento local</h2>
      <p>El propio Google describe tres dimensiones para evaluar los resultados locales:</p>
      <ul>
        <li><strong>Relevancia</strong>: en qué medida tu ficha coincide con la búsqueda — categoría GBP, palabras clave en la descripción, servicios registrados, coherencia con el sitio web.</li>
        <li><strong>Distancia</strong>: proximidad de tu establecimiento al usuario o a la ubicación indicada en la consulta. Este factor no puede optimizarse directamente.</li>
        <li><strong>Notoriedad</strong>: reputación online — número y calidad de reseñas, citas en directorios, autoridad de dominio, menciones en prensa local.</li>
      </ul>

      <h2>Las actualizaciones algorítmicas clave</h2>
      <ul>
        <li><strong>Pigeon (2014)</strong>: integración de señales SEO clásicas (autoridad de dominio, backlinks) en el posicionamiento local.</li>
        <li><strong>Possum (2016)</strong>: filtrado de fichas similares en la misma zona. Si dos empresas del mismo sector están muy cerca, Google suele mostrar solo una en el paquete local.</li>
        <li><strong>Vicinity (2021)</strong>: refuerzo del criterio de proximidad física. Los establecimientos más cercanos al usuario tomaron ventaja sobre competidores alejados, aunque más conocidos.</li>
      </ul>

      <h2>Lo que puedes controlar</h2>
      <ul>
        <li><strong>Mejorar la relevancia</strong>: elige la categoría principal GBP más precisa, rellena todos los servicios y atributos, integra palabras clave locales de forma natural.</li>
        <li><strong>Aumentar la notoriedad</strong>: recoge reseñas regularmente, mantén la coherencia NAP en todos los directorios, consigue backlinks de sitios locales y medios de proximidad.</li>
        <li><strong>La distancia</strong> es fija para un comercio físico. Para un prestador de servicios móvil, define tu zona de actuación con precisión en GBP.</li>
      </ul>

      <h2>Paquete local vs resultados orgánicos: dos algoritmos distintos</h2>
      <p>El paquete local (las 3 fichas con mapa) y los resultados orgánicos clásicos utilizan algoritmos diferentes. Un sitio puede posicionarse bien en orgánico sin aparecer en el paquete local, y viceversa. La estrategia óptima trabaja los dos simultáneamente: GBP para el paquete local, sitio optimizado para lo orgánico.</p>

      <h2>Las señales secundarias que importan</h2>
      <ul>
        <li>Coherencia de la información NAP en toda la web</li>
        <li>Velocidad de las reseñas (regularidad en el tiempo)</li>
        <li>Engagement: clics, llamadas, solicitudes de ruta desde la ficha</li>
        <li>Actividad de la ficha: fotos recientes, publicaciones regulares</li>
        <li>Señales de comportamiento de los usuarios (tasa de clics)</li>
      </ul>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/paquete-local', label: 'El paquete local: cómo aparecer en el 3-pack' },
      { href: '/es/guide-seo-local/google-business-profile', label: 'Optimizar tu Google Business Profile' },
      { href: '/es/blog/es-audit-seo-local/', label: 'Cómo hacer una auditoría SEO local' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/paquete-local.astro',
    title: "Paquete local de Google: cómo aparecer en el 3-pack | Guía SEO local",
    description: "Todo sobre el paquete local de Google: qué es el 3-pack, cómo posicionarse en él, diferencias con los resultados orgánicos y estrategias concretas para aparecer en las 3 primeras fichas.",
    ogImage: '/images/guide/es-paquete-local.webp',
    currentCrumb: 'Paquete local',
    h1: "El paquete local de Google",
    intro: "El paquete local — las 3 fichas de establecimientos mostradas con un mapa en la parte superior de los resultados — captura una parte mayoritaria de los clics en búsquedas locales. Así es como conseguir un puesto.",
    sections: `
      <h2>¿Qué es el paquete local?</h2>
      <p>Cuando alguien busca un servicio local ("fontanero Madrid", "restaurante cerca de mí"), Google muestra en la parte superior un bloque con 3 fichas de Google Business Profile acompañadas de un mapa. Esto es el <strong>paquete local</strong> (o "3-pack"). Esta posición es distinta de los resultados orgánicos clásicos y goza de una visibilidad premium: aparece antes de los 10 primeros resultados orgánicos.</p>

      <h2>Por qué el paquete local es estratégico</h2>
      <ul>
        <li>Es visible sin necesidad de hacer scroll</li>
        <li>Muestra directamente el teléfono, dirección, horarios y reseñas</li>
        <li>Los clics suelen generar llamadas directas en lugar de visitas al sitio</li>
        <li>En móvil, las 3 fichas ocupan toda la parte superior de la pantalla</li>
      </ul>

      <h2>Cómo Google selecciona las 3 fichas</h2>
      <p>Google selecciona las fichas del paquete local combinando relevancia, distancia y notoriedad. La ficha más relevante, mejor completada, geográficamente cercana y con mejor reputación online tiene más probabilidades de aparecer. No hay una fórmula mágica: es la combinación de todas las señales lo que marca la diferencia.</p>

      <h2>Acciones concretas para aparecer en el paquete local</h2>
      <ol>
        <li><strong>Reclamar y verificar tu ficha GBP</strong> — una ficha no verificada no puede posicionarse.</li>
        <li><strong>Elegir la categoría principal correcta</strong> — la señal de relevancia más fuerte.</li>
        <li><strong>Completar el 100% de los campos</strong> — horarios, descripción, servicios, atributos, fotos.</li>
        <li><strong>Recopilar reseñas regularmente</strong> — apuntar a 4+ estrellas con velocidad constante.</li>
        <li><strong>Asegurar la coherencia NAP</strong> — mismo nombre, dirección y teléfono en todos los directorios.</li>
        <li><strong>Publicar regularmente</strong> — al menos una publicación GBP por semana para mantenerse activo.</li>
      </ol>

      <h2>Paquete local y resultados orgánicos: complementariedad</h2>
      <p>Algunas búsquedas locales muestran tanto un paquete local como resultados orgánicos debajo. Una estrategia local completa apunta a los dos: aparecer en el paquete mediante GBP Y posicionarse en los resultados orgánicos con un sitio optimizado. Las empresas que dominan ambos capturan casi todo el tráfico local disponible.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/algoritmo-local', label: 'Cómo funciona el algoritmo local de Google' },
      { href: '/es/guide-seo-local/google-business-profile', label: 'Optimizar tu Google Business Profile' },
      { href: '/es/guide-seo-local/movil-velocidad', label: 'Móvil y velocidad para el SEO local' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/palabras-clave-locales.astro',
    title: "Investigación de palabras clave locales: método y herramientas | Guía SEO local",
    description: "Cómo encontrar las palabras clave locales adecuadas para tu negocio. Método [servicio]+[ciudad], long tail local, Google Suggest, Search Console y herramientas de pago.",
    ogImage: '/images/guide/es-palabras-clave-locales.webp',
    currentCrumb: 'Palabras clave locales',
    h1: "Investigación de palabras clave locales",
    intro: "Las palabras clave locales siguen una lógica diferente a las genéricas: combinan una intención de servicio con una dimensión geográfica. Este es el método para identificarlas y explotarlas.",
    sections: `
      <h2>La intención local: entender qué buscan tus clientes</h2>
      <p>Las búsquedas locales adoptan diversas formas:</p>
      <ul>
        <li><strong>[Servicio] + [Ciudad]</strong>: "fontanero Madrid", "dentista Barcelona" — búsquedas directas con fuerte intención comercial</li>
        <li><strong>[Servicio] + "cerca de mí"</strong>: Google detecta la ubicación y muestra resultados de proximidad</li>
        <li><strong>[Servicio] + [Barrio]</strong>: "restaurante Gràcia Barcelona", "peluquería Lavapiés"</li>
        <li><strong>Preguntas locales</strong>: "mejor abogado laboral en Valencia", "dónde reparar bicicletas en Sevilla"</li>
      </ul>

      <h2>Método de investigación gratuita con Google</h2>
      <ul>
        <li><strong>Google Suggest</strong>: escribe "[tu servicio] + [tu ciudad]" y observa las sugerencias de autocompletado — son búsquedas reales con volumen.</li>
        <li><strong>Búsquedas relacionadas</strong>: al final de la página de resultados, Google lista 8 consultas relacionadas — una mina para el long tail.</li>
        <li><strong>Google Search Console</strong>: si tu sitio ya existe, la pestaña "Rendimiento" revela las consultas que generan impresiones.</li>
        <li><strong>GBP Insights</strong>: muestra los términos de búsqueda que la gente utilizó para encontrar tu ficha.</li>
      </ul>

      <h2>Herramientas de pago para ir más lejos</h2>
      <ul>
        <li><strong>SEMrush / Ahrefs</strong>: volumen de búsqueda local por ciudad, dificultad, variaciones</li>
        <li><strong>BrightLocal</strong>: especializado en SEO local, seguimiento de posiciones en el paquete local por código postal</li>
        <li><strong>Whitespark Local Rank Tracker</strong>: seguimiento de posiciones locales con geolocalización precisa</li>
      </ul>

      <h2>Construir una lista de palabras clave accionable</h2>
      <ol>
        <li>Lista todos tus servicios y productos</li>
        <li>Crúzalos con tus zonas geográficas (ciudad principal + localidades cercanas)</li>
        <li>Añade variaciones long tail ("urgencia", "24h", "económico", "express")</li>
        <li>Agrupa por intención y página objetivo (una página = un cluster semántico)</li>
        <li>Prioriza por volumen + viabilidad competitiva</li>
      </ol>

      <h2>Palabras clave locales y estrategia de contenido</h2>
      <p>Cada cluster de palabras clave locales debería corresponder a una página dedicada en tu sitio. Un fontanero en Madrid no debería tener solo una página "fontanero Madrid" sino potencialmente: "desatascar tuberías Madrid", "reparar fugas Madrid", "instalar calentador Madrid". Esta granularidad maximiza las oportunidades de posicionamiento en consultas menos competidas.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/paginas-servicio-ciudad', label: 'Crear páginas de servicio + ciudad eficaces' },
      { href: '/es/blog/es-mots-cles-locaux/', label: 'Guía completa de palabras clave locales' },
      { href: '/es/guide-seo-local/medir-resultados', label: 'Medir tus resultados SEO local' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/paginas-servicio-ciudad.astro',
    title: "Páginas de servicio + ciudad: landing pages locales eficaces | Guía SEO local",
    description: "Cómo estructurar tus páginas de servicio y ciudad para posicionarte en SEO local. Contenido único, señales de localización, arquitectura del sitio y ejemplos concretos.",
    ogImage: '/images/guide/es-paginas-servicio-ciudad.webp',
    currentCrumb: 'Páginas servicio + ciudad',
    h1: "Páginas de servicio + ciudad: el pilar on-site del SEO local",
    intro: "Las páginas de servicio + ciudad son landing pages diseñadas específicamente para captar búsquedas locales precisas. Bien construidas, permiten aparecer en los resultados orgánicos y reforzar la autoridad de tu ficha GBP.",
    sections: `
      <h2>Por qué crear páginas dedicadas por zona</h2>
      <p>Una sola página "Nuestros servicios" no puede posicionarse para "fontanero urgencias Madrid Este" Y "fontanero Madrid Norte" al mismo tiempo. La granularidad geográfica requiere páginas dedicadas. Cada página de servicio + ciudad apunta a un conjunto preciso de consultas y ayuda a Google a entender exactamente dónde operas.</p>

      <h2>Estructura de una página de servicio + ciudad de alto rendimiento</h2>
      <ul>
        <li><strong>Title tag</strong>: [Servicio] en [Ciudad] — [Beneficio clave] | [Marca]</li>
        <li><strong>H1</strong>: [Servicio] en [Ciudad] — preciso, sin sobreoptimización</li>
        <li><strong>Introducción</strong>: 100-150 palabras mencionando servicio Y ciudad de forma natural</li>
        <li><strong>Secciones H2</strong>: presentación del servicio, zona cubierta, ventajas, precios orientativos</li>
        <li><strong>Testimonios de clientes locales</strong>: idealmente de clientes en esa zona geográfica</li>
        <li><strong>Mapa de Google Maps</strong> incrustado o referencia a tu zona de actuación</li>
        <li><strong>Schema.org LocalBusiness</strong>: datos estructurados con dirección completa</li>
        <li><strong>Llamada a la acción</strong>: teléfono clicable, formulario de contacto, reserva de cita</li>
      </ul>

      <h2>Contenido único: regla absoluta</h2>
      <p>El error más común es crear 20 páginas idénticas cambiando solo el nombre de la ciudad. Google penaliza el contenido duplicado. Cada página debe tener una introducción redactada específicamente para esa ciudad, referencias locales (barrios, lugares emblemáticos, particularidades geográficas) e idealmente testimonios o realizaciones en esa zona.</p>

      <h2>Arquitectura del sitio para páginas locales</h2>
      <ul>
        <li><code>/servicios/fontaneria/</code> — página principal del servicio</li>
        <li><code>/servicios/fontaneria/madrid/</code> — página servicio + ciudad principal</li>
        <li><code>/servicios/fontaneria/madrid-norte/</code> — página ultra-local (barrio)</li>
      </ul>
      <p>El enlazado interno entre estas páginas transfiere autoridad y ayuda a Google a entender la estructura geográfica de tu actividad.</p>

      <h2>Páginas de ciudad vs ficha GBP: complementariedad</h2>
      <p>Las páginas de servicio + ciudad influyen en el posicionamiento orgánico Y refuerzan indirectamente tu ficha GBP. Un sitio con páginas locales relevantes y bien optimizadas envía a Google una señal fuerte sobre la zona de actividad de la empresa, lo que puede mejorar tu posición en el paquete local.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/palabras-clave-locales', label: 'Investigación de palabras clave locales' },
      { href: '/es/guide-seo-local/schema-local', label: 'Datos estructurados LocalBusiness' },
      { href: '/es/blog/es-page-service-ville/', label: 'Páginas de servicio + ciudad (artículo detallado)' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/schema-local.astro',
    title: "Datos estructurados LocalBusiness para SEO local | Guía SEO local",
    description: "Implementar Schema.org LocalBusiness en JSON-LD para mejorar tu posicionamiento local. Tipos, propiedades esenciales, ejemplos de código y herramientas de prueba.",
    ogImage: '/images/guide/es-schema-local.webp',
    currentCrumb: 'Datos estructurados locales',
    h1: "Datos estructurados LocalBusiness",
    intro: "Los datos estructurados Schema.org permiten a Google comprender con precisión tu empresa, su ubicación y sus servicios. Un marcado correcto puede mejorar la apariencia de tus resultados y reforzar las señales de SEO local.",
    sections: `
      <h2>Por qué los datos estructurados importan en el SEO local</h2>
      <p>El marcado Schema.org LocalBusiness transmite a Google información estructurada sobre tu empresa: nombre, dirección, teléfono, horarios, tipo de actividad. Esta información alimenta el Knowledge Graph, los rich snippets y puede influir en tu posición en el paquete local al reforzar la coherencia de datos entre tu sitio y tu ficha GBP.</p>

      <h2>Tipos LocalBusiness especializados</h2>
      <ul>
        <li><strong>Restaurant</strong>, <strong>Bakery</strong>, <strong>CafeOrCoffeeShop</strong> — hostelería</li>
        <li><strong>MedicalBusiness</strong>, <strong>Dentist</strong>, <strong>Optician</strong> — salud</li>
        <li><strong>LegalService</strong>, <strong>Notary</strong>, <strong>AccountingService</strong> — profesiones liberales</li>
        <li><strong>AutoRepair</strong>, <strong>Plumber</strong>, <strong>Electrician</strong> — oficios</li>
        <li><strong>HairSalon</strong>, <strong>BeautySalon</strong>, <strong>SpaOrBeautyShop</strong> — estética</li>
      </ul>

      <h2>Ejemplo JSON-LD mínimo</h2>
      <pre><code>{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Fontanería García",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Mayor 12",
    "addressLocality": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "telephone": "+34 91 000 00 00",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "url": "https://www.fontaneria-garcia.es"
}</code></pre>

      <h2>Propiedades que no debes pasar por alto</h2>
      <ul>
        <li><code>priceRange</code>: €, €€ o €€€ — señal de confianza</li>
        <li><code>aggregateRating</code>: puntuación media y número de reseñas</li>
        <li><code>areaServed</code>: lista de ciudades o zonas cubiertas</li>
        <li><code>hasMap</code>: enlace a Google Maps</li>
        <li><code>sameAs</code>: URLs de tus perfiles sociales y directorios</li>
      </ul>

      <h2>Probar y validar tu marcado</h2>
      <ul>
        <li><strong>Google Rich Results Test</strong>: <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">search.google.com/test/rich-results</a></li>
        <li><strong>Schema Markup Validator</strong>: validator.schema.org</li>
        <li><strong>Google Search Console</strong>: pestaña "Mejoras" para detectar errores tras la indexación</li>
      </ul>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/paginas-servicio-ciudad', label: 'Páginas de servicio + ciudad' },
      { href: '/es/blog/es-schema-local-business/', label: 'Schema LocalBusiness: guía completa' },
      { href: '/es/blog/es-donnees-structurees-avancees/', label: 'Datos estructurados avanzados' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/movil-velocidad.astro',
    title: "Móvil y velocidad de carga para el SEO local | Guía SEO local",
    description: "Mobile-first indexing, Core Web Vitals y velocidad de página: los fundamentos técnicos del SEO local. Cómo optimizar para búsquedas móviles y mejorar tu posicionamiento.",
    ogImage: '/images/guide/es-movil-velocidad.webp',
    currentCrumb: 'Móvil y velocidad',
    h1: "Móvil y velocidad: los fundamentos técnicos del SEO local",
    intro: "Más del 60% de las búsquedas locales se realizan en móvil. Un sitio lento o mal adaptado a pantallas pequeñas pierde clientes antes de que hayan podido leer tu contenido.",
    sections: `
      <h2>Mobile-first indexing: qué cambia</h2>
      <p>Desde 2021, Google indexa prioritariamente la versión móvil de tu sitio. Esto significa que es la experiencia móvil la que determina tu posicionamiento — incluso en escritorio. Un sitio responsive y rápido en móvil no es opcional: es la base.</p>

      <h2>Core Web Vitals: las 3 métricas a vigilar</h2>
      <ul>
        <li><strong>LCP (Largest Contentful Paint)</strong>: tiempo de carga del elemento principal visible. Objetivo: menos de 2,5 segundos.</li>
        <li><strong>INP (Interaction to Next Paint)</strong>: capacidad de respuesta a las interacciones del usuario. Objetivo: menos de 200 ms.</li>
        <li><strong>CLS (Cumulative Layout Shift)</strong>: estabilidad visual de la página (elementos que se mueven al cargar). Objetivo: menos de 0,1.</li>
      </ul>

      <h2>Por qué es crucial en SEO local</h2>
      <p>Las búsquedas locales suelen tener una intención inmediata: el usuario busca un número de teléfono, una dirección u horarios. Si tu página tarda 5 segundos en cargar en móvil, vuelve a Google y hace clic en el siguiente resultado. La alta tasa de rebote envía una señal negativa que puede perjudicar tu posicionamiento.</p>

      <h2>Optimizaciones técnicas prioritarias</h2>
      <ul>
        <li><strong>Imágenes</strong>: usar formato WebP, definir atributos width/height, lazy loading para imágenes fuera de pantalla</li>
        <li><strong>Alojamiento</strong>: elegir un proveedor con servidores en España para audiencia española</li>
        <li><strong>Caché</strong>: implementar caché de navegador y de servidor</li>
        <li><strong>CSS/JS</strong>: minificar archivos, diferir JavaScript no crítico</li>
        <li><strong>Fuentes</strong>: precargar las fuentes usadas above-the-fold, usar font-display: swap</li>
      </ul>

      <h2>Herramientas de diagnóstico</h2>
      <ul>
        <li><strong>PageSpeed Insights</strong>: pagespeed.web.dev — analiza LCP/INP/CLS con sugerencias detalladas</li>
        <li><strong>Google Search Console</strong>: informe "Experiencia de página" para URLs con problemas</li>
        <li><strong>WebPageTest.org</strong>: prueba avanzada desde diferentes ubicaciones y conexiones</li>
      </ul>

      <h2>Diseño móvil para búsquedas locales</h2>
      <p>Más allá de la velocidad, la ergonomía móvil importa: teléfono clicable en la parte superior, botón de dirección Google Maps, formulario de contacto simple. Un usuario móvil que busca un fontanero de urgencia debe poder llamar en 2 segundos desde los resultados de búsqueda.</p>`,
    relatedLinks: [
      { href: '/es/blog/es-mobile-recherche-locale/', label: 'Móvil y búsqueda local: cifras y optimizaciones' },
      { href: '/es/blog/es-core-web-vitals-local/', label: 'Core Web Vitals y SEO local' },
      { href: '/es/guide-seo-local/schema-local', label: 'Datos estructurados LocalBusiness' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/directorios-locales.astro',
    title: "Directorios locales prioritarios: cuáles elegir y cómo registrarse | Guía SEO local",
    description: "Los directorios locales esenciales para el SEO local en España. Cómo elegir, registrarse y mantener la coherencia NAP para maximizar tu visibilidad local.",
    ogImage: '/images/guide/es-directorios-locales.webp',
    currentCrumb: 'Directorios locales',
    h1: "Los directorios locales prioritarios",
    intro: "Las citas en directorios locales (menciones de tu nombre, dirección y teléfono) son una señal de confianza fundamental para Google. Aquí están los directorios a priorizar y el método para gestionarlos eficazmente.",
    sections: `
      <h2>Por qué los directorios locales importan</h2>
      <p>Los directorios locales crean <strong>citas</strong> — menciones de tu NAP (Nombre, Dirección, Teléfono) en sitios de terceros. Estas citas confirman a Google la existencia y legitimidad de tu empresa. Cuanto más coherente y presente sea tu información en fuentes de autoridad, mayor será tu notoriedad local.</p>

      <h2>Los directorios generales imprescindibles</h2>
      <ul>
        <li><strong>Google Business Profile</strong> — la base absoluta</li>
        <li><strong>Páginas Amarillas</strong> (paginasamarillas.es) — referencia histórica en España</li>
        <li><strong>Yelp</strong> — fuerte en restaurantes y comercios</li>
        <li><strong>Facebook</strong> — página de empresa con dirección y horarios</li>
        <li><strong>Apple Maps</strong> (a través de Apple Business Connect) — para usuarios iOS</li>
        <li><strong>Bing Places</strong> — Bing representa alrededor del 5% de las búsquedas en España</li>
        <li><strong>Infobel</strong>, <strong>11870.com</strong> — directorios secundarios pero referenciados</li>
      </ul>

      <h2>Directorios sectoriales prioritarios</h2>
      <ul>
        <li><strong>Restaurantes</strong>: TripAdvisor, ElTenedor (TheFork), Tripadvisor</li>
        <li><strong>Reformas/Oficios</strong>: Habitissimo, Certicalia, Cronoshare</li>
        <li><strong>Salud</strong>: Top Doctors, Doctoralia, Salud180</li>
        <li><strong>Jurídico/Contable</strong>: Abogados.es, directorio del Colegio de Economistas</li>
        <li><strong>Alojamiento</strong>: Booking.com, Expedia, TripAdvisor Hotels</li>
      </ul>

      <h2>Método de alta eficaz</h2>
      <ol>
        <li><strong>Prepara tu ficha estandarizada</strong>: nombre exacto, dirección completa, teléfono, URL, descripción de 150 palabras, logo y fotos</li>
        <li><strong>Verifica las fichas existentes</strong> antes de crear — tu empresa puede ya estar listada con información incorrecta</li>
        <li><strong>Da de alta por orden de prioridad</strong>: Google + Páginas Amarillas primero, luego sectoriales, luego secundarios</li>
        <li><strong>Mantén una hoja de seguimiento</strong> con la URL de cada ficha y credenciales de acceso</li>
      </ol>

      <h2>Mantener la coherencia NAP</h2>
      <p>La coherencia es más importante que el volumen. Una inconsistencia (nombre abreviado, dirección antigua, número diferente) puede anular el efecto positivo de decenas de citas correctas. Verifica y corrige regularmente tus fichas, especialmente después de un cambio de domicilio o de número.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/citas-locales', label: 'Citas locales y coherencia NAP' },
      { href: '/es/blog/es-annuaires-locaux/', label: 'Los mejores directorios locales por sector' },
      { href: '/es/blog/es-nap-coherence/', label: 'Coherencia NAP: por qué y cómo' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/responder-resenas.astro',
    title: "Responder a las reseñas de Google: estrategia y plantillas | Guía SEO local",
    description: "Cómo responder a las reseñas positivas y negativas en Google. Estrategia de respuesta, plantillas listas para usar e impacto en el SEO local y las decisiones de compra.",
    ogImage: '/images/guide/es-responder-resenas.webp',
    currentCrumb: 'Responder a reseñas',
    h1: "Responder a las reseñas: estrategia y plantillas",
    intro: "Responder a las reseñas no es opcional — es una señal SEO y una palanca de conversión. Google tiene en cuenta la actividad de respuesta al evaluar la calidad de tu ficha.",
    sections: `
      <h2>Por qué responder a las reseñas mejora el SEO local</h2>
      <p>Google confirma que las respuestas a las reseñas son una señal de engagement tenida en cuenta en el algoritmo local. Una ficha con 100% de respuestas muestra una empresa activa y atenta. Además, tus respuestas están indexadas por Google — son contenido adicional naturalmente enriquecido con palabras clave de tu actividad y localización.</p>

      <h2>Responder a las reseñas positivas</h2>
      <p>No te limites a un genérico "¡Gracias!". Personaliza cada respuesta:</p>
      <ul>
        <li>Menciona el nombre del cliente si está disponible</li>
        <li>Haz referencia a un detalle específico de la reseña</li>
        <li>Integra de forma natural una palabra clave local ("nuestro equipo en [Ciudad]")</li>
        <li>Termina con una invitación a volver o recomendar</li>
      </ul>
      <p><strong>Plantilla</strong>: "¡Muchas gracias [Nombre] por tu valoración! Nos alegra mucho que [detalle específico] haya sido de tu agrado. Todo el equipo de [Empresa] en [Ciudad] estará encantado de volverte a atender. ¡Hasta pronto!"</p>

      <h2>Responder a las reseñas negativas</h2>
      <ol>
        <li><strong>Responde en 24-48 horas</strong> — la rapidez demuestra profesionalidad</li>
        <li><strong>Mantén la profesionalidad</strong> — nunca te defiendas agresivamente ni contraataques</li>
        <li><strong>Reconoce la experiencia</strong> aunque no estés de acuerdo</li>
        <li><strong>Propón una solución privada</strong> (email, teléfono) para evitar el debate público</li>
        <li><strong>Evita fórmulas genéricas</strong> — transmiten indiferencia</li>
      </ol>
      <p><strong>Plantilla</strong>: "Hola [Nombre], lamentamos sinceramente esta experiencia. Esto no refleja nuestros estándares habituales. ¿Podrías contactarnos directamente en [email/tel] para que podamos encontrar una solución?"</p>

      <h2>Reportar reseñas fraudulentas</h2>
      <p>Si recibes una reseña que sospechas fraudulenta (competidor, persona que no reconoces), puedes reportarla a través de la interfaz de GBP. El reporte no garantiza la eliminación, pero Google investiga si el contenido viola sus políticas.</p>

      <h2>Frecuencia y organización</h2>
      <p>Establece un proceso: revisar las nuevas reseñas cada 2 días, responder en un máximo de 48 horas. Designa a una persona responsable. La herramienta de notificaciones de GBP (email o app) te avisa en cuanto se publica una reseña.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/resenas-clientes', label: 'Estrategia completa de gestión de reseñas' },
      { href: '/es/blog/es-repondre-avis-negatifs/', label: 'Cómo responder a las reseñas negativas' },
      { href: '/es/blog/es-generar-avis-google/', label: 'Cómo generar más reseñas de Google' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/restaurantes.astro',
    title: "SEO local para restaurantes: guía completa 2025 | Guía SEO local",
    description: "Estrategia SEO local completa para restaurantes. GBP con menú, TripAdvisor, ElTenedor, reseñas de clientes, fotos y atributos específicos de la restauración.",
    ogImage: '/images/guide/es-restaurantes.webp',
    currentCrumb: 'Restaurantes',
    h1: "SEO local para restaurantes",
    intro: "El sector de la restauración es uno de los más competitivos en SEO local. Aquí está la estrategia completa para aparecer en los primeros resultados y llenar tus mesas.",
    sections: `
      <h2>Google Business Profile: funcionalidades específicas para restaurantes</h2>
      <ul>
        <li><strong>Menú</strong>: añade tu menú directamente en GBP (platos, precios, descripciones). Aparece en tu ficha y puede influir en las búsquedas por tipo de cocina.</li>
        <li><strong>Reservas</strong>: integra un botón de reserva a través de ElTenedor, Resy o tu propio sistema.</li>
        <li><strong>Atributos</strong>: terraza, wifi, parking, accesible para discapacitados, entrega a domicilio, para llevar — cada atributo específico aumenta tus posibilidades en búsquedas filtradas.</li>
        <li><strong>Horas punta</strong>: visible en la ficha, informa a los clientes de los horarios más tranquilos.</li>
      </ul>

      <h2>Plataformas de reseñas imprescindibles</h2>
      <ul>
        <li><strong>Google</strong>: prioridad absoluta, impacto directo en el paquete local</li>
        <li><strong>TripAdvisor</strong>: gran peso para las búsquedas "mejor restaurante [ciudad]"</li>
        <li><strong>ElTenedor (TheFork)</strong>: referencia para reservas online en España</li>
        <li><strong>Facebook</strong>: importante para la comunidad local y los eventos</li>
      </ul>

      <h2>Fotos: el arma principal de los restaurantes</h2>
      <ul>
        <li>Fotos de los platos estrella (alta resolución, buena iluminación, fondo limpio)</li>
        <li>Ambiente interior y exterior (terraza, decoración del salón)</li>
        <li>Equipo en acción (cocina abierta, servicio en sala)</li>
        <li>Actualización estacional (nueva carta, eventos)</li>
      </ul>
      <p>Apunta a un mínimo de 50 fotos. Las fichas con más de 100 fotos reciben un 520% más de llamadas.</p>

      <h2>Contenido del sitio: apuntar a las búsquedas de restaurante</h2>
      <ul>
        <li>Página de inicio optimizada para "restaurante [cocina] [ciudad]"</li>
        <li>Página de menú en HTML (no solo PDF — Google no lee bien los PDF)</li>
        <li>Página de eventos para aparecer en "restaurante cumpleaños [ciudad]"</li>
        <li>Blog o noticias para novedades de carta, eventos de temporada</li>
      </ul>

      <h2>Schema.org para restaurantes</h2>
      <p>Usa el tipo <code>Restaurant</code> (subtipo de LocalBusiness) y añade las propiedades <code>servesCuisine</code>, <code>hasMenu</code>, <code>acceptsReservations</code>, <code>priceRange</code>. Estos datos alimentan los rich snippets y pueden aparecer directamente en los resultados.</p>`,
    relatedLinks: [
      { href: '/es/blog/es-seo-local-restaurants/', label: 'SEO local para restaurantes: artículo completo' },
      { href: '/es/guide-seo-local/resenas-clientes', label: 'Estrategia de gestión de reseñas' },
      { href: '/es/guide-seo-local/google-business-profile', label: 'Optimizar tu Google Business Profile' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/artesanos.astro',
    title: "SEO local para artesanos y oficios: guía completa 2025 | Guía SEO local",
    description: "Estrategia SEO local para fontaneros, electricistas, pintores y oficios. Zona de actuación, certificaciones, fotos de trabajos y reseñas para dominar los resultados locales.",
    ogImage: '/images/guide/es-artesanos.webp',
    currentCrumb: 'Artesanos y oficios',
    h1: "SEO local para artesanos y oficios",
    intro: "Fontaneros, electricistas, pintores, carpinteros — los artesanos tienen un potencial SEO local enorme en búsquedas con alta intención de compra. Aquí está la estrategia adaptada.",
    sections: `
      <h2>Definir y orientar tu zona de actuación</h2>
      <p>La mayoría de los artesanos no tienen una dirección comercial visible pero se desplazan a los clientes. En GBP, puedes ocultar tu dirección particular, definir una zona de actuación (por radio o lista de municipios) y aparecer en el paquete local para todas las localidades de tu zona.</p>
      <p>En tu sitio, crea una página dedicada por cada localidad principal de tu zona. Un fontanero que cubre Madrid y alrededores debería tener páginas para Madrid, Alcobendas, Pozuelo de Alarcón, Leganés, etc.</p>

      <h2>Certificaciones: señales de confianza poderosas</h2>
      <ul>
        <li><strong>Instalador autorizado por RITE</strong> — para instalaciones térmicas</li>
        <li><strong>Instalador electricista autorizado</strong> — certificación del Ministerio</li>
        <li><strong>Empresa instaladora de gas</strong> — habilitación regional</li>
        <li><strong>Artesano certificado</strong> — por cámaras de comercio o asociaciones sectoriales</li>
      </ul>
      <p>Muestra estas certificaciones en tu sitio, fichas GBP y directorios. Cada mención de una certificación en un sitio externo crea una cita y una señal de confianza.</p>

      <h2>Fotos de trabajos: tu mejor argumento</h2>
      <ul>
        <li>Publica fotos antes/después en GBP con descripciones que incluyan tipo de trabajo y ciudad</li>
        <li>Crea una galería de realizaciones en tu sitio con pies de foto optimizados</li>
        <li>Geolocaliza tus fotos cuando sea posible (con permiso del cliente)</li>
      </ul>

      <h2>Estrategia de reseñas para artesanos</h2>
      <p>Los artesanos tienen una ventaja: están físicamente en casa del cliente al terminar el trabajo. Ese es el momento ideal para pedir una reseña. Hazte el hábito de enviar un SMS con el enlace directo a tu ficha GBP justo después del trabajo, mencionarlo en tu factura o email de seguimiento, y preparar una tarjeta de visita con código QR hacia tu perfil de reseñas.</p>

      <h2>Directorios especializados para artesanos</h2>
      <ul>
        <li><strong>Habitissimo</strong>: portal líder de reformas en España</li>
        <li><strong>Certicalia</strong>: especializado en certificaciones y reformas</li>
        <li><strong>Cronoshare</strong>: plataforma de captación de presupuestos</li>
        <li><strong>Houzz</strong>: ideal para oficios relacionados con el hogar</li>
      </ul>`,
    relatedLinks: [
      { href: '/es/blog/es-seo-local-artisans/', label: 'SEO local para artesanos: artículo completo' },
      { href: '/es/guide-seo-local/paginas-servicio-ciudad', label: 'Crear páginas por zona de actuación' },
      { href: '/es/guide-seo-local/resenas-clientes', label: 'Recopilar y gestionar las reseñas de clientes' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/salud.astro',
    title: "SEO local para profesionales de la salud | Guía SEO local",
    description: "SEO local para médicos, dentistas, fisioterapeutas y paramédicos. YMYL, E-E-A-T, Doctoralia, datos estructurados y gestión de reseñas de pacientes.",
    ogImage: '/images/guide/es-salud.webp',
    currentCrumb: 'Profesionales de la salud',
    h1: "SEO local para profesionales de la salud",
    intro: "La salud es un sector YMYL (Your Money or Your Life): Google aplica criterios E-E-A-T especialmente estrictos. Aquí están las especificidades del SEO local para profesionales sanitarios.",
    sections: `
      <h2>YMYL y E-E-A-T: los requisitos específicos de la salud</h2>
      <p>Google clasifica la salud entre los contenidos YMYL — temas donde una información errónea puede tener consecuencias graves. Para estos contenidos, el algoritmo da mayor importancia a las señales E-E-A-T:</p>
      <ul>
        <li><strong>Experience</strong>: pruebas de experiencia práctica (casos clínicos, testimonios de pacientes)</li>
        <li><strong>Expertise</strong>: títulos, especialidades, publicaciones, afiliaciones profesionales</li>
        <li><strong>Authoritativeness</strong>: menciones en prensa médica, citas por colegas</li>
        <li><strong>Trustworthiness</strong>: reseñas auténticas, información de contacto clara, política de privacidad</li>
      </ul>

      <h2>Google Business Profile para profesionales de la salud</h2>
      <ul>
        <li>Usa el tipo exacto (Dentist, Physiotherapist, Doctor...)</li>
        <li>Indica tus especialidades en la descripción</li>
        <li>Activa los atributos de accesibilidad (silla de ruedas, aparcamiento)</li>
        <li>Integra un botón de cita a través de Doctoralia o tu propio sistema</li>
        <li>Nunca publiques información médica específica sobre pacientes</li>
      </ul>

      <h2>Plataformas médicas: Doctoralia y Top Doctors</h2>
      <p>Doctoralia y Top Doctors aparecen frecuentemente en primera página para búsquedas como "dentista Madrid" o "fisioterapeuta Barcelona". Tener un perfil completo y actualizado en estas plataformas (y Reservasalud según tu especialidad) es complementario a tu propio sitio web y genera citas valiosas.</p>

      <h2>Gestión de reseñas de pacientes</h2>
      <ul>
        <li>Responde a todas las reseñas sin confirmar ni desmentir la relación médico-paciente</li>
        <li>No incluyas nunca detalles clínicos en tus respuestas (secreto profesional)</li>
        <li>Si una reseña viola claramente el secreto médico, repórtala a Google</li>
        <li>Orienta las insatisfacciones hacia tu secretaría o un email dedicado</li>
      </ul>

      <h2>Contenido del sitio para profesionales sanitarios</h2>
      <ul>
        <li>Página por especialidad o patología tratada (con fuentes médicas referenciadas)</li>
        <li>Página "Sobre mí" con trayectoria, títulos y afiliaciones claramente indicados</li>
        <li>FAQ sobre consultas, reembolsos, tiempos de espera</li>
        <li>Schema.org: tipos <code>MedicalBusiness</code>, <code>Dentist</code>, <code>Physician</code> con <code>medicalSpecialty</code></li>
      </ul>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/schema-local', label: 'Datos estructurados LocalBusiness' },
      { href: '/es/guide-seo-local/resenas-clientes', label: 'Gestión de reseñas de clientes' },
      { href: '/es/blog/es-donnees-structurees-avancees/', label: 'Datos estructurados avanzados' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/profesiones-liberales.astro',
    title: "SEO local para profesiones liberales | Guía SEO local",
    description: "SEO local para abogados, notarios, asesores fiscales y profesiones reguladas. Directorios profesionales, E-E-A-T, páginas de especialidades y estrategia de contenido.",
    ogImage: '/images/guide/es-profesiones-liberales.webp',
    currentCrumb: 'Profesiones liberales',
    h1: "SEO local para profesiones liberales",
    intro: "Abogados, notarios, asesores fiscales, arquitectos — las profesiones reguladas tienen restricciones específicas en materia de comunicación. Así se optimiza la visibilidad local dentro de ese marco.",
    sections: `
      <h2>Normativa deontológica y SEO</h2>
      <p>Las profesiones reguladas están sujetas a normas de comunicación estrictas. El SEO está generalmente permitido — no es publicidad directa sino optimización de visibilidad — pero ciertos contenidos (comparaciones con colegas, garantías de resultados) deben evitarse. Consulta el reglamento de tu colegio profesional antes de publicar cualquier contenido comercial.</p>

      <h2>Los directorios profesionales que no debes ignorar</h2>
      <ul>
        <li><strong>Abogados</strong>: directorio del Consejo General de la Abogacía, colegios de abogados provinciales</li>
        <li><strong>Notarios</strong>: notariado.org (directorio oficial)</li>
        <li><strong>Asesores fiscales</strong>: directorio del Colegio de Economistas, REAF</li>
        <li><strong>Arquitectos</strong>: directorio del Consejo Superior de Arquitectos</li>
      </ul>
      <p>Estos directorios oficiales tienen una autoridad de dominio muy elevada. Una mención en ellos vale mucho más que un alta en un directorio generalista.</p>

      <h2>Estructurar tu sitio por especialidad</h2>
      <p>La clave para las profesiones liberales es la granularidad temática Y geográfica:</p>
      <ul>
        <li>Un abogado en Madrid debería tener páginas para: "abogado laboral Madrid", "abogado divorcios Madrid", "abogado penal Madrid"</li>
        <li>Un asesor fiscal: "asesor fiscal autónomos Madrid", "asesoría fiscal pymes Madrid", "declaración renta Madrid"</li>
      </ul>

      <h2>Construir la autoridad local (E-E-A-T)</h2>
      <ul>
        <li>Artículos en prensa jurídica o económica local</li>
        <li>Intervenciones en eventos locales (cámaras de comercio, colegios profesionales)</li>
        <li>Colaboraciones con profesiones complementarias (abogado + notario + asesor)</li>
        <li>Página biográfica detallada: trayectoria, especializaciones, formación continua</li>
      </ul>

      <h2>Reseñas de clientes y profesiones reguladas</h2>
      <p>Las reseñas de Google están permitidas para la mayoría de las profesiones liberales. Invita a tus clientes satisfechos a dejar una reseña respetando la confidencialidad (nunca menciones el objeto del asunto en tus respuestas). Para profesiones médicas, consulta las precauciones específicas en la sección de salud.</p>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/salud', label: 'SEO local para profesionales de la salud' },
      { href: '/es/guide-seo-local/paginas-servicio-ciudad', label: 'Páginas de servicio + ciudad eficaces' },
      { href: '/es/blog/es-contenu-seo-local/', label: 'Crear contenido local de alto rendimiento' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/herramientas.astro',
    title: "Las mejores herramientas de SEO local en 2025 | Guía SEO local",
    description: "Comparativa de las mejores herramientas de SEO local: BrightLocal, Whitespark, SEMrush, Moz Local, Google Search Console. Herramientas gratuitas y de pago para mejorar tu visibilidad.",
    ogImage: '/images/guide/es-herramientas-seo.webp',
    currentCrumb: 'Herramientas SEO local',
    h1: "Las mejores herramientas de SEO local",
    intro: "Gestionar el SEO local sin herramientas es navegar a ciegas. Aquí está la comparativa de las herramientas esenciales — gratuitas y de pago — para monitorizar, optimizar y medir tu visibilidad local.",
    sections: `
      <h2>Herramientas gratuitas imprescindibles</h2>
      <ul>
        <li><strong>Google Business Profile</strong>: gratuito, obligatorio. Panel de gestión con insights (vistas, clics, llamadas).</li>
        <li><strong>Google Search Console</strong>: seguimiento de impresiones y posiciones para tus búsquedas locales.</li>
        <li><strong>Google Analytics 4</strong>: análisis del tráfico orgánico local, comportamiento de visitantes, conversiones.</li>
        <li><strong>Google PageSpeed Insights</strong>: diagnóstico de Core Web Vitals, crucial para el SEO local en móvil.</li>
      </ul>

      <h2>BrightLocal — el especialista en SEO local</h2>
      <ul>
        <li>Seguimiento de posiciones en el paquete local por código postal (grid tracker)</li>
        <li>Auditoría de citas NAP en 300+ directorios</li>
        <li>Gestión de reseñas en múltiples plataformas</li>
        <li>Informes para clientes en marca blanca</li>
      </ul>
      <p>Precio: desde 39 $/mes. Ideal para agencias y empresas con múltiples establecimientos.</p>

      <h2>Whitespark — experto en citas</h2>
      <ul>
        <li>Local Citation Finder: encuentra los directorios usados por tus competidores</li>
        <li>Local Rank Tracker: seguimiento ultra-preciso de posiciones locales por geolocalización</li>
        <li>Citation Building Service: servicio gestionado de alta en directorios</li>
      </ul>

      <h2>SEMrush — suite SEO completa con módulo local</h2>
      <p>SEMrush ofrece un módulo de "Gestión de listados" que sincroniza tu información en 70+ directorios europeos. La suite completa también permite la investigación de palabras clave locales, el análisis de competidores y el seguimiento de posiciones.</p>

      <h2>Herramientas de monitorización de reputación</h2>
      <ul>
        <li><strong>Google Alerts</strong>: alerta por email ante cualquier mención de tu nombre online</li>
        <li><strong>Mention</strong>: monitorización de menciones en tiempo real</li>
        <li><strong>ReviewTrackers</strong>: agregador de reseñas en múltiples plataformas</li>
      </ul>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/medir-resultados', label: 'Medir tus resultados SEO local' },
      { href: '/es/blog/es-audit-seo-local/', label: 'Cómo hacer una auditoría SEO local' },
      { href: '/es/guide-seo-local/citas-locales', label: 'Citas locales y NAP' },
    ]
  },
  {
    file: 'src/pages/es/guide-seo-local/medir-resultados.astro',
    title: "Medir los resultados SEO local: KPIs y herramientas | Guía SEO local",
    description: "Cómo medir el rendimiento de tu SEO local. KPIs esenciales (impresiones GSC, llamadas GBP, solicitudes de ruta), paneles de control e informes mensuales.",
    ogImage: '/images/guide/es-medir-resultados.webp',
    currentCrumb: 'Medir resultados',
    h1: "Medir y hacer seguimiento de los resultados SEO local",
    intro: "Sin medición, no hay mejora. El SEO local produce resultados visibles en múltiples fuentes de datos. Aquí están los KPIs a seguir y cómo construir un panel de control eficaz.",
    sections: `
      <h2>Los KPIs de Google Business Profile</h2>
      <ul>
        <li><strong>Vistas de la ficha</strong>: cuántas veces apareció tu ficha (búsqueda + Maps)</li>
        <li><strong>Llamadas telefónicas</strong>: clics en el número desde la ficha — indicador de conversión fuerte</li>
        <li><strong>Solicitudes de ruta</strong>: señala intención de visita física</li>
        <li><strong>Visitas al sitio</strong>: clics hacia tu sitio desde GBP</li>
        <li><strong>Mensajes</strong>: si has activado la mensajería GBP</li>
      </ul>

      <h2>Los KPIs de Google Search Console</h2>
      <ul>
        <li><strong>Impresiones</strong> en búsquedas locales ([servicio] + [ciudad]) — indica tu visibilidad</li>
        <li><strong>Clics</strong> — tráfico real generado</li>
        <li><strong>CTR</strong> — una CTR baja sugiere que tus títulos/descripciones pueden mejorarse</li>
        <li><strong>Posición media</strong> — sigue la evolución en tus palabras clave objetivo</li>
      </ul>

      <h2>Crear un panel de control mensual</h2>
      <ol>
        <li>Evolución de las vistas GBP (mes vs mes anterior + año anterior)</li>
        <li>Número de llamadas y solicitudes de ruta desde GBP</li>
        <li>Top 10 de búsquedas orgánicas locales en GSC con posiciones</li>
        <li>Número de reseñas recibidas y nota media</li>
        <li>Posición en el paquete local para tus 5 búsquedas prioritarias</li>
      </ol>

      <h2>Medir el retorno de la inversión</h2>
      <ul>
        <li>Usa un número de seguimiento dedicado para tu GBP (diferente al del sitio)</li>
        <li>Forma a tu equipo para preguntar "¿cómo nos encontró?"</li>
        <li>Configura objetivos de conversión en GA4 (formularios, clics tel)</li>
        <li>Compara el tráfico SEO local antes/después de una acción (nueva página, campaña de reseñas)</li>
      </ul>

      <h2>Frecuencia de reporting recomendada</h2>
      <ul>
        <li><strong>Semanal</strong>: verificar las nuevas reseñas, alertas sobre tu marca</li>
        <li><strong>Mensual</strong>: panel de control completo (GBP + GSC + posiciones)</li>
        <li><strong>Trimestral</strong>: auditoría más profunda (citas, competidores, oportunidades de contenido)</li>
      </ul>`,
    relatedLinks: [
      { href: '/es/guide-seo-local/herramientas', label: 'Las mejores herramientas de SEO local' },
      { href: '/es/blog/es-audit-seo-local/', label: 'Cómo hacer una auditoría SEO local completa' },
      { href: '/es/guide-seo-local/google-business-profile', label: 'Optimizar tu Google Business Profile' },
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
