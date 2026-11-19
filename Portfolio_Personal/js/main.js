// Idioma (ES por defecto) y modo claro/oscuro (claro por defecto).
// El español vive en el HTML; acá solo están las traducciones al inglés.

const EN = {
  'meta.description': 'Portfolio of Giuliano Giovanola, UX/UI and Product Designer.',
  'skip': 'Skip to content',
  'nav.profile': 'Profile & experience',
  'nav.work': 'Work',
  'cv': 'Download CV (PDF)',
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

  'work.kicker': '02 / Selected work',
  'work.title': 'Some of the projects I have worked on.',
  'work.intro': 'A short summary of each project. Full case studies, with process and outcomes, are in progress.',
  'work.ternium.ind': 'Steel manufacturing',
  'work.ternium.desc': 'Designed clear, consistent interfaces for data-dense industrial platforms, and expanded their visual language with 3D assets of fleet and industrial infrastructure.',
  'work.ypf.ind': 'Energy',
  'work.ypf.desc': 'Designed the conversational content for an institutional chatbot, from the core text flow to its voice adaptation, and contributed to mobile design and developer handoff.',
  'work.edesur.ind': 'Electric utilities',
  'work.edesur.desc': 'Turned an audit of an existing product into a design proposal prioritized by business goals and validated with users.',
  'work.toyota.ind': 'Automotive',
  'work.toyota.desc': 'Redesigned a mobile app to simplify its navigation and core flows, iterating on prototypes through developer handoff.',
  'work.cta.kicker': 'Full case studies',
  'work.cta.title': 'Want to see the process behind a project?',
  'work.cta.text': 'While I finish the case studies, I can walk you through it on a call.',
  'linkedin.btn': 'Message me on LinkedIn',

  'contact.kicker': '04 / Contact',
  'contact.title': 'Let’s build clear digital products together.',
  'contact.text': 'If your team needs to simplify complex processes, let’s talk.',
  'contact.top': 'Back to top',
  'footer.location': 'Argentina · Open to remote work',
};

const root = document.documentElement;
const metaDesc = document.querySelector('meta[name="description"]');

function store(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}
function read(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

// Guarda el texto original en español de cada elemento traducible.
const textEls = [...document.querySelectorAll('[data-i18n]')];
const ariaEls = [...document.querySelectorAll('[data-i18n-aria]')];
textEls.forEach(el => { el.dataset.es = el.textContent; });
ariaEls.forEach(el => { el.dataset.esAria = el.getAttribute('aria-label'); });
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
  if (metaDesc) metaDesc.content = en ? EN['meta.description'] : metaEs;
  document.querySelectorAll('[data-set-lang]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setLang === root.lang));
  });
  store('lang', root.lang);
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

// Barra superior: sombra cuando la página se desplaza
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Por defecto: español y modo claro. Si la persona ya eligió otra cosa, se respeta.
setLang(read('lang') === 'en' ? 'en' : 'es');
setTheme(read('theme') === 'dark' ? 'dark' : 'light');
