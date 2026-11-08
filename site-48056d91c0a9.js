
/* Shared appearance control: preference persists across pages and languages. */
(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('[data-theme-toggle]')];
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { preference = localStorage.getItem('cmp-appearance'); } catch (_) {}
  function apply(theme) {
    root.dataset.theme = theme;
    buttons.forEach(button => { button.hidden = false; button.setAttribute('aria-pressed', String(theme === 'dark')); });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#101012' : '#ffffff';
  }
  apply(root.dataset.theme || (system.matches ? 'dark' : 'light'));
  buttons.forEach(button => button.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('cmp-appearance', preference); } catch (_) {}
    apply(preference);
  }));
  system.addEventListener('change', e => { if (preference !== 'light' && preference !== 'dark') apply(e.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', e => {
    if (e.key !== 'cmp-appearance' && e.key !== null) return;
    preference = e.newValue;
    apply(preference === 'dark' || preference === 'light' ? preference : (system.matches ? 'dark' : 'light'));
  });
})();
(() => {
  const dialog = document.querySelector('#languages');
  if (!dialog) return;
  const languageSearch = document.querySelector('#language-search');
  let opener;
  document.querySelectorAll('[data-open-languages]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    dialog.showModal();
    languageSearch.focus();
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const b = dialog.getBoundingClientRect();
    if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
  const normalize = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  languageSearch.addEventListener('input', () => {
    const q = normalize(languageSearch.value.trim());
    dialog.querySelectorAll('[data-language]').forEach(a => a.hidden = !normalize(a.dataset.language).includes(q));
  });
  const query = document.querySelector('#service-search');
  const category = document.querySelector('#category-filter');
  const cards = [...document.querySelectorAll('.platform-card')];
  const entries = [...document.querySelectorAll('.service-entry, [data-catalog-entry]')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#no-results');
  // Service pages and 404 pages share the language dialog, not catalog controls.
  if (!query || !category || !count || !empty) return;
  function filterServices() {
    const q = normalize(query.value.trim());
    let visible = 0;
    const filtering = !!q || category.value !== '';
    entries.forEach(entry => {
      entry.hidden = (category.value !== '' && entry.dataset.group !== category.value) || !normalize(entry.dataset.search).includes(q);
      if (!entry.hidden) visible++;
    });
    cards.forEach(card => {
      const matches = [...card.querySelectorAll('.service-entry, [data-catalog-entry]')].filter(entry => !entry.hidden).length;
      card.hidden = matches === 0;
      const badge = card.querySelector('.platform-count');
      if (badge) badge.textContent = String(matches);
      card.open = filtering && !card.hidden;
    });
    document.querySelectorAll('[data-influencer-context]').forEach(card => card.hidden = filtering);
    count.textContent = String(visible);
    empty.hidden = visible > 0;
  }
  query.addEventListener('input', filterServices);
  category.addEventListener('change', filterServices);
  function revealServiceAnchor() {
    const entry = document.getElementById(location.hash.slice(1));
    if (!entry || !(entry.classList.contains('service-entry') || entry.matches('[data-catalog-entry], #influencer-packages'))) return;
    query.value = '';
    category.value = '';
    filterServices();
    entry.closest('.platform-card').open = true;
    if (entry.matches('details')) entry.open = true;
    entry.scrollIntoView({block:'center',behavior:'instant'});
  }
  window.addEventListener('hashchange', revealServiceAnchor);
  revealServiceAnchor();
})();

// Global Google Ads contact-page measurement for the tilkisarp account.
// The conversion rule itself is configured in Google Ads for /contact/.
(() => {
  'use strict';
  if (!['cryptomarketing.global', 'www.cryptomarketing.global'].includes(location.hostname)) return;
  if (window.__globalGoogleAdsLoaded) return;
  window.__globalGoogleAdsLoaded = true;

  const tagId = 'GTM-PKNXPD5M';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  // No consent is inferred. Keep advertising/analytics storage and
  // personalization denied; Google may send limited cookieless signals.
  window.gtag('consent', 'default', {
    ad_storage: 'denied', analytics_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('js', new Date());

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
  document.head.appendChild(script);
})();
