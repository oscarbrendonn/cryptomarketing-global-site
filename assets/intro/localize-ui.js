(function () {
  'use strict';
  const I = window.CMP_LOCALE;
  const D = window.CMP_INTRO;
  const $ = id => document.getElementById(id);
  const genericKeys = ['editorial', 'website', 'automation', 'audit', 'dashboard', 'volume'];
  let language = I.initial.code;
  const select = $('language');
  I.locales.forEach(locale => {
    const option = document.createElement('option');
    option.value = locale.code;
    option.textContent = locale.name;
    option.lang = locale.code;
    select.append(option);
  });
  function apply(code, source) {
    const locale = I.locales.find(l => l.code === code);
    const text = I.copy[code];
    if (!locale || !text) return;
    language = code;
    document.documentElement.lang = code;
    document.documentElement.dir = locale.dir;
    document.documentElement.dataset.localeSource = source;
    document.title = text.title + ' · Crypto Marketing Global';
    $('heroTitle').textContent = text.title;
    $('heroLead').textContent = text.lead;
    $('skipText').textContent = text.skip;
    $('language').setAttribute('aria-label', text.language);
    $('brandPill').setAttribute('aria-label', text.home);
    $('finalTitle').textContent = text.final;
    $('cta').textContent = text.contact;
    $('allServices').textContent = text.all;
    $('hintText').textContent = text.scroll;
    $('skip').href = $('brandPill').href = I.websiteURL(code);
    $('cta').href = I.websiteURL(code, 'contact/');
    $('allServices').href = I.websiteURL(code, 'services/');
    select.value = code;
    const exchanges = D.exchangeKeys.length;
    $('midTitle').textContent = I.count(code, 'services', D.chapters.reduce((n,c) => n+c.services.length,0)) + ' · ' + I.count(code, 'exchanges', exchanges);
    [...$('chaps').children].forEach((el, i) => {
      const [label,title,body] = text.chapters[i];
      el.setAttribute('aria-label', label);
      el.querySelector('.kicker').textContent = String(i+1).padStart(2,'0') + '   ' + label;
      el.querySelector('h2').textContent = title;
      el.querySelector('.text').textContent = body.replace('{n}', new Intl.NumberFormat(code).format(exchanges));
      el.querySelector('.count').textContent = I.count(code,'services',D.chapters[i].services.length) + (D.chapters[i].exchanges ? ' · ' + I.count(code,'exchanges',exchanges) : '');
    });
    genericKeys.forEach((key,i) => {
      const name = document.querySelector('[data-logo="'+key+'"] .nm');
      if (name) name.textContent = text.generic[i];
    });
    document.dispatchEvent(new CustomEvent('cmp:languagechange', { detail:{code,source} }));
    document.documentElement.dataset.localized = 'true';
  }
  select.addEventListener('change', () => {
    const code = select.value;
    I.remember(code);
    apply(code,'selection');
  });
  addEventListener('popstate', () => {
    const chosen = I.resolve({pathname:location.pathname,search:location.search,saved:I.readSaved(),languages:navigator.languages || [navigator.language]});
    apply(chosen.code,chosen.source);
  });
  addEventListener('languagechange', () => {
    const chosen = I.resolve({pathname:location.pathname,search:location.search,saved:I.readSaved(),languages:navigator.languages || [navigator.language]});
    apply(chosen.code,chosen.source);
  });
  apply(language,I.initial.source);
})();
