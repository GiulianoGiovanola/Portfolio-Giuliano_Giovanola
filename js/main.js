// Idioma (ES por defecto) y modo claro/oscuro (claro por defecto).
// El español vive en el HTML; acá solo están las traducciones al inglés.

const EN = {
  'meta.description': 'Portfolio of Giuliano Giovanola, UX/UI and Product Designer.',
  'skip': 'Skip to content',
  'cv': 'Download CV (PDF)',
  'cv.nav': 'Download CV',
  'lang.group': 'Language',
  'theme.dark': 'Dark mode',

  'hero.lead': 'I design digital products for large companies in industry, energy and automotive, from research to developer handoff.',
  'hero.location': 'Argentina · Open to remote work',

  'profile.kicker': '01 / Profile',
  'profile.title': 'I design products that make it to production.',
  'profile.p1': 'For more than 4 years I have designed institutional products, B2B platforms and regional and international projects for clients in energy, steel, automotive and technology.',
  'profile.p2': 'I specialize in simplifying complex workflows and turning them into clear interfaces. Every design decision I make is grounded in research and business goals.',
  'profile.p3': 'I enjoy working with multidisciplinary teams and staying close to development, so what I design reaches production as intended.',

  'exp.kicker': 'Core expertise',
  'exp.g1': 'Strategy & discovery',
  'exp.g2': 'Research & content',
  'exp.g3': 'Design & systems',
  'exp.b2b': 'B2B Platforms',
  'exp.a11y': 'Accessibility (WCAG)',

  'work.kicker': '02 / Work',
  'work.title': 'Some of the projects I have worked on.',
  'work.intro': 'A summary of my client projects and a few case studies in detail, with the full process.',
  'work.sub.clients': 'Client projects',
  'work.sub.studies': 'Case studies',
  'work.ternium.ind': 'Steel manufacturing',
  'work.ternium.desc': 'Designed clear, consistent interfaces for data-dense industrial platforms, and expanded their visual language with 3D assets of fleet and industrial infrastructure.',
  'work.ypf.ind': 'Energy',
  'work.ypf.desc': 'Designed the conversational content for an institutional chatbot, from the core text flow to its voice adaptation, and contributed to mobile design and developer handoff.',
  'work.edesur.ind': 'Electric utilities',
  'work.edesur.desc': 'Turned an audit of an existing product into a design proposal prioritized by business goals and validated with users.',
  'work.toyota.ind': 'Automotive',
  'work.toyota.desc': 'Redesigned a mobile app to simplify its navigation and core flows, iterating on prototypes through developer handoff.',

  'studies.type.mobile': 'Mobile app',
  'studies.role': 'Role',
  'studies.focus': 'Focus',
  'studies.work': 'Work',
  'studies.cta': 'View case',
  'studies.medora.role': 'UX/UI Designer',
  'studies.medora.desc': 'A mobile app for accessing health services in a simple way. I designed the onboarding, sign-up and log-in so anyone can create an account and get in without friction.',
  'studies.medora.focus': 'Reducing friction in sign-up, which in health apps tends to be long and unclear.',
  'studies.medora.work': 'Benchmark, competitive analysis, user persona, problem definition, user flow, information architecture, wireframes, visual system, components, UI and interactive prototype.',
  'studies.medora.alt': 'Screens from the Medora app',
  'studies.type.web': 'Web design',
  'studies.sonos.desc': 'A redesign of the product page for Sonos’ compact subwoofer, made as an academic project. I designed and built a landing page that tells the product as a story, starting with emotion and ending with the technical details.',
  'studies.sonos.role': 'UX/UI Designer and front-end development',
  'studies.sonos.focus': 'Turning technical specs into clear benefits, along a path that goes from the general to the specific.',
  'studies.sonos.work': 'Benchmark of the product, the Sonos website and app, wireframes, visual system, UI and prototype in Figma, and development in HTML, CSS and JavaScript.',
  'studies.sonos.alt': 'Sonos Sub Mini landing page on desktop and mobile',

  'contact.kicker': '03 / Contact',
  'contact.title': 'Let’s build clear digital products together.',
  'contact.text': 'If your team needs to simplify complex processes, let’s talk.',
  'contact.top': 'Back to top',
  'contact.copy': 'Copy',
  'contact.copy.aria': 'Copy email',
  'footer.location': 'Argentina · Open to remote work',
};

// Cada caso de estudio suma sus propias traducciones (por ejemplo, js/i18n-medora.js)
Object.assign(EN, window.I18N_EXTRA || {});

const root = document.documentElement;
const metaDesc = document.querySelector('meta[name="description"]');

function store(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { }
}
function read(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

// Guarda el texto original en español de cada elemento traducible.
const textEls = [...document.querySelectorAll('[data-i18n]')];
const ariaEls = [...document.querySelectorAll('[data-i18n-aria]')];
const altEls = [...document.querySelectorAll('[data-i18n-alt]')];
textEls.forEach(el => { el.dataset.es = el.textContent; });
ariaEls.forEach(el => { el.dataset.esAria = el.getAttribute('aria-label'); });
altEls.forEach(el => { el.dataset.esAlt = el.alt; });
const metaEs = metaDesc ? metaDesc.content : '';

function setLang(lang) {
  const en = lang === 'en';
  root.lang = en ? 'en' : 'es';
  textEls.forEach(el => {
    const t = EN[el.dataset.i18n];
    el.textContent = en && t ? t : el.dataset.es;
  });
  ariaEls.forEach(el => {
    const t = EN[el.dataset.i18nAria];
    el.setAttribute('aria-label', en && t ? t : el.dataset.esAria);
  });
  altEls.forEach(el => {
    const t = EN[el.dataset.i18nAlt];
    el.alt = en && t ? t : el.dataset.esAlt;
  });
  if (metaDesc) metaDesc.content = en ? EN['meta.description'] : metaEs;
  markLang(root.lang);
  store('lang', root.lang);
}

// Marca el botón activo y mueve el indicador deslizante del selector ES/EN
const langGroup = document.querySelector('.lang');
function markLang(lang) {
  if (langGroup) langGroup.dataset.active = lang;
  document.querySelectorAll('[data-set-lang]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
  });
}

function setTheme(theme) {
  const dark = theme === 'dark';
  if (dark) root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  document.querySelector('.theme-btn').setAttribute('aria-pressed', String(dark));
  store('theme', dark ? 'dark' : 'light');
}

// Transiciones suaves (se desactivan si la persona pidió reducir el movimiento)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const LANG_FADE_MS = 220;
const THEME_FADE_MS = 450;
let langTimer, themeTimer;

function switchLang(lang) {
  if (lang === root.lang) return;
  if (reduceMotion.matches) { setLang(lang); return; }
  clearTimeout(langTimer);
  markLang(lang); // el indicador se desliza ya, mientras el texto hace el fundido
  root.classList.add('lang-out');
  langTimer = setTimeout(() => {
    setLang(lang);
    requestAnimationFrame(() => root.classList.remove('lang-out'));
  }, LANG_FADE_MS);
}

function switchTheme() {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if (reduceMotion.matches) { setTheme(next); return; }
  clearTimeout(themeTimer);
  root.classList.add('theme-anim');
  setTheme(next);
  themeTimer = setTimeout(() => root.classList.remove('theme-anim'), THEME_FADE_MS + 50);
}

document.querySelectorAll('[data-set-lang]').forEach(btn => {
  btn.addEventListener('click', () => switchLang(btn.dataset.setLang));
});
document.querySelector('.theme-btn').addEventListener('click', switchTheme);

// Barra superior: sombra cuando la página se desplaza.
// Botón "volver arriba": aparece cuando el centro de la pantalla llega a la mitad
// de la primera sección después del hero (Perfil en el inicio, "El desafío" en los casos),
// y cambia de colores cuando pasa sobre el cierre oscuro.
const header = document.querySelector('.site-header');
const toTop = document.querySelector('.to-top');
const endBand = document.querySelector('.end-band');
const firstSection = document.querySelector('#sobre-mi, .case-sec');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  if (!toTop) return;
  let show = window.scrollY > window.innerHeight;
  if (firstSection) {
    const r = firstSection.getBoundingClientRect();
    show = r.top + r.height / 2 <= window.innerHeight / 2;
  }
  toTop.classList.toggle('show', show);
  if (endBand) {
    const btnCenter = toTop.getBoundingClientRect().top + toTop.offsetHeight / 2;
    toTop.classList.toggle('on-dark', endBand.getBoundingClientRect().top < btnCenter);
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

// La barra superior es sticky, así que un link a "#top" casi no mueve la página.
// Se sube al principio de todo y se lleva el foco al primer link de la barra.
if (toTop) {
  toTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    const first = header.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  });
}
onScroll();

// Botón "Copiar" del email: lo copia al portapapeles y muestra "Copiado" por unos segundos
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Alternativa para navegadores viejos o páginas abiertas sin https
  return new Promise((resolve, reject) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    ok ? resolve() : reject();
  });
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  const label = btn.querySelector('.copy-label');
  let resetTimer;
  btn.addEventListener('click', () => {
    copyText(btn.dataset.copy).then(() => {
      clearTimeout(resetTimer);
      btn.classList.add('copied');
      label.textContent = root.lang === 'en' ? 'Copied' : 'Copiado';
      resetTimer = setTimeout(() => {
        btn.classList.remove('copied');
        label.textContent = root.lang === 'en' ? EN['contact.copy'] : label.dataset.es;
      }, 2000);
    }).catch(() => { });
  });
});

// Idioma: si la persona ya eligió uno, se respeta. Si es su primera visita y su
// navegador está en inglés, se muestra en inglés. En cualquier otro caso, español.
function browserLang() {
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  for (const l of langs) {
    const code = String(l).toLowerCase().slice(0, 2);
    if (code === 'es') return 'es';
    if (code === 'en') return 'en';
  }
  return 'es';
}
const savedLang = read('lang');
setLang(savedLang === 'en' || savedLang === 'es' ? savedLang : browserLang());
// A partir de acá el indicador del idioma se anima (en la carga inicial no)
requestAnimationFrame(() => requestAnimationFrame(() => {
  if (langGroup) langGroup.classList.add('ready');
}));

// Modo claro por defecto. Si la persona ya eligió el oscuro, se respeta.
setTheme(read('theme') === 'dark' ? 'dark' : 'light');
