/* Global Google Ads measurement. Consent is a visitor choice, never inferred. */
(() => {
  'use strict';
  const production = ['cryptomarketing.global', 'www.cryptomarketing.global'].includes(location.hostname);
  const preview = ['localhost', '127.0.0.1'].includes(location.hostname);
  if ((!production && !preview) || window.__globalGoogleAdsLoaded) return;
  window.__globalGoogleAdsLoaded = true;
  const KEY = 'cmg-measurement-consent-v1';
  const AGE = 180 * 24 * 60 * 60 * 1000;
  const copy = {"en":["Measurement preferences","Allow Google Ads measurement cookies? Personalised advertising stays off.","Allow","Decline","Privacy","Cookie settings"],"tr":["Ölçüm tercihleri","Google Ads ölçüm çerezlerine izin verilsin mi? Kişiselleştirilmiş reklamlar kapalı kalır.","İzin ver","Reddet","Gizlilik","Çerez ayarları"],"es":["Preferencias de medición","¿Permites las cookies de medición de Google Ads? La publicidad personalizada seguirá desactivada.","Permitir","Rechazar","Privacidad","Ajustes de cookies"],"de":["Messeinstellungen","Google Ads-Cookies zur Erfolgsmessung zulassen? Personalisierte Werbung bleibt deaktiviert.","Zulassen","Ablehnen","Datenschutz","Cookie-Einstellungen"],"fr":["Préférences de mesure","Autoriser les cookies de mesure Google Ads ? La publicité personnalisée reste désactivée.","Autoriser","Refuser","Confidentialité","Paramètres des cookies"],"pt-br":["Preferências de medição","Permitir cookies de medição do Google Ads? A publicidade personalizada continuará desativada.","Permitir","Recusar","Privacidade","Configurações de cookies"],"ru":["Настройки измерений","Разрешить файлы cookie для измерений Google Ads? Персонализированная реклама останется отключённой.","Разрешить","Отклонить","Конфиденциальность","Настройки cookie"],"ar":["تفضيلات القياس","هل تسمح بملفات تعريف الارتباط لقياس أداء Google Ads؟ ستظل الإعلانات المخصّصة معطّلة.","السماح","الرفض","الخصوصية","إعدادات ملفات تعريف الارتباط"],"ja":["測定の設定","Google Ads の測定用 Cookie を許可しますか？パーソナライズ広告は無効のままです。","許可する","拒否する","プライバシー","Cookie 設定"],"zh-hans":["衡量设置","是否允许 Google Ads 衡量 Cookie？个性化广告将保持关闭。","允许","拒绝","隐私","Cookie 设置"],"sr":["Podešavanja merenja","Dozvoliti kolačiće za merenje Google Ads učinka? Personalizovano oglašavanje ostaje isključeno.","Dozvoli","Odbij","Privatnost","Podešavanja kolačića"],"hr":["Postavke mjerenja","Dopustiti kolačiće za mjerenje Google Ads učinka? Personalizirano oglašavanje ostaje isključeno.","Dopusti","Odbij","Privatnost","Postavke kolačića"],"it":["Preferenze di misurazione","Consentire i cookie di misurazione di Google Ads? La pubblicità personalizzata rimarrà disattivata.","Consenti","Rifiuta","Privacy","Impostazioni dei cookie"],"nl":["Meetvoorkeuren","Meetcookies van Google Ads toestaan? Gepersonaliseerde advertenties blijven uitgeschakeld.","Toestaan","Weigeren","Privacy","Cookie-instellingen"],"pl":["Preferencje pomiaru","Zezwolić na pliki cookie do pomiarów Google Ads? Reklamy spersonalizowane pozostaną wyłączone.","Zezwól","Odrzuć","Prywatność","Ustawienia plików cookie"],"uk":["Налаштування вимірювань","Дозволити файли cookie для вимірювань Google Ads? Персоналізована реклама залишиться вимкненою.","Дозволити","Відхилити","Конфіденційність","Налаштування cookie"],"ro":["Preferințe de măsurare","Permiți cookie-urile de măsurare Google Ads? Publicitatea personalizată rămâne dezactivată.","Permite","Refuză","Confidențialitate","Setări cookie"],"el":["Προτιμήσεις μέτρησης","Να επιτραπούν τα cookie μέτρησης του Google Ads; Οι εξατομικευμένες διαφημίσεις παραμένουν απενεργοποιημένες.","Αποδοχή","Απόρριψη","Απόρρητο","Ρυθμίσεις cookie"],"cs":["Předvolby měření","Povolit soubory cookie pro měření Google Ads? Personalizovaná reklama zůstane vypnutá.","Povolit","Odmítnout","Soukromí","Nastavení cookies"],"sk":["Predvoľby merania","Povoliť súbory cookie na meranie Google Ads? Personalizovaná reklama zostane vypnutá.","Povoliť","Odmietnuť","Súkromie","Nastavenia cookies"],"hu":["Mérési beállítások","Engedélyezi a Google Ads mérési sütijeit? A személyre szabott hirdetések kikapcsolva maradnak.","Engedélyezés","Elutasítás","Adatvédelem","Sütibeállítások"],"bg":["Предпочитания за измерване","Разрешавате ли бисквитките за измерване на Google Ads? Персонализираните реклами остават изключени.","Разрешавам","Отказвам","Поверителност","Настройки за бисквитки"],"sl":["Nastavitve merjenja","Dovolite piškotke za merjenje Google Ads? Prilagojeno oglaševanje ostane izklopljeno.","Dovoli","Zavrni","Zasebnost","Nastavitve piškotkov"],"bs":["Postavke mjerenja","Dozvoliti kolačiće za mjerenje Google Ads učinka? Personalizirano oglašavanje ostaje isključeno.","Dozvoli","Odbij","Privatnost","Postavke kolačića"],"sq":["Preferencat e matjes","Të lejohen cookie-t e matjes së Google Ads? Reklamat e personalizuara mbeten të çaktivizuara.","Lejo","Refuzo","Privatësia","Cilësimet e cookie-ve"],"sv":["Mätningsinställningar","Tillåt mätningscookies för Google Ads? Anpassade annonser förblir avstängda.","Tillåt","Avvisa","Integritet","Cookieinställningar"],"nb":["Målingsinnstillinger","Tillate målingsinformasjonskapsler fra Google Ads? Personlig tilpassede annonser forblir avslått.","Tillat","Avvis","Personvern","Innstillinger for informasjonskapsler"],"da":["Målingsindstillinger","Tillad målingscookies fra Google Ads? Tilpassede annoncer forbliver deaktiveret.","Tillad","Afvis","Privatliv","Cookieindstillinger"],"fi":["Mittausasetukset","Sallitaanko Google Adsin mittausevästeet? Yksilölliset mainokset pysyvät pois käytöstä.","Salli","Hylkää","Tietosuoja","Evästeasetukset"],"et":["Mõõtmise eelistused","Kas lubada Google Adsi mõõtmisküpsised? Isikupärastatud reklaamid jäävad välja lülitatuks.","Luba","Keeldu","Privaatsus","Küpsiste seaded"],"lv":["Mērījumu iestatījumi","Vai atļaut Google Ads mērījumu sīkfailus? Personalizētās reklāmas paliks izslēgtas.","Atļaut","Noraidīt","Privātums","Sīkfailu iestatījumi"],"lt":["Matavimo nuostatos","Leisti „Google Ads“ matavimo slapukus? Suasmenintos reklamos liks išjungtos.","Leisti","Atmesti","Privatumas","Slapukų nuostatos"],"ko":["측정 설정","Google Ads 측정 쿠키를 허용하시겠습니까? 맞춤 광고는 계속 비활성화됩니다.","허용","거부","개인정보 보호","쿠키 설정"],"id":["Preferensi pengukuran","Izinkan cookie pengukuran Google Ads? Iklan yang dipersonalisasi tetap dinonaktifkan.","Izinkan","Tolak","Privasi","Pengaturan cookie"],"ms":["Pilihan pengukuran","Benarkan kuki pengukuran Google Ads? Iklan diperibadikan kekal dinyahaktifkan.","Benarkan","Tolak","Privasi","Tetapan kuki"],"th":["การตั้งค่าการวัดผล","อนุญาตคุกกี้การวัดผลของ Google Ads หรือไม่? โฆษณาเฉพาะบุคคลจะยังคงปิดอยู่","อนุญาต","ปฏิเสธ","ความเป็นส่วนตัว","การตั้งค่าคุกกี้"],"fil":["Mga kagustuhan sa pagsukat","Payagan ang cookies ng Google Ads para sa pagsukat? Mananatiling naka-off ang mga personalized na ad.","Payagan","Tanggihan","Privacy","Mga setting ng cookies"],"hi":["मापन प्राथमिकताएँ","Google Ads की मापन कुकी की अनुमति दें? वैयक्तिकृत विज्ञापन बंद रहेंगे।","अनुमति दें","अस्वीकार करें","निजता","कुकी सेटिंग"],"bn":["পরিমাপের পছন্দ","Google Ads-এর পরিমাপ কুকির অনুমতি দেবেন? ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ থাকবে।","অনুমতি দিন","প্রত্যাখ্যান করুন","গোপনীয়তা","কুকি সেটিংস"],"ur":["پیمائش کی ترجیحات","کیا Google Ads کی پیمائشی کوکیز کی اجازت دیں؟ ذاتی نوعیت کے اشتہارات بند رہیں گے۔","اجازت دیں","مسترد کریں","رازداری","کوکی کی ترتیبات"],"pa":["ਮਾਪ ਦੀਆਂ ਤਰਜੀਹਾਂ","ਕੀ Google Ads ਦੀਆਂ ਮਾਪ ਕੂਕੀਜ਼ ਨੂੰ ਇਜਾਜ਼ਤ ਦੇਣੀ ਹੈ? ਵਿਅਕਤੀਗਤ ਵਿਗਿਆਪਨ ਬੰਦ ਰਹਿਣਗੇ।","ਇਜਾਜ਼ਤ ਦਿਓ","ਅਸਵੀਕਾਰ ਕਰੋ","ਪਰਦੇਦਾਰੀ","ਕੂਕੀ ਸੈਟਿੰਗਾਂ"],"ta":["அளவீட்டு விருப்பங்கள்","Google Ads அளவீட்டு குக்கீகளை அனுமதிக்கவா? தனிப்பயனாக்கப்பட்ட விளம்பரங்கள் முடக்கப்பட்டே இருக்கும்.","அனுமதி","நிராகரி","தனியுரிமை","குக்கீ அமைப்புகள்"],"te":["కొలత ప్రాధాన్యతలు","Google Ads కొలత కుకీలను అనుమతించాలా? వ్యక్తిగతీకరించిన ప్రకటనలు ఆఫ్‌లోనే ఉంటాయి.","అనుమతించు","తిరస్కరించు","గోప్యత","కుకీ సెట్టింగ్‌లు"],"fa":["تنظیمات اندازه‌گیری","به کوکی‌های اندازه‌گیری Google Ads اجازه می‌دهید؟ تبلیغات شخصی‌سازی‌شده خاموش می‌ماند.","اجازه دادن","رد کردن","حریم خصوصی","تنظیمات کوکی"],"he":["העדפות מדידה","לאפשר קובצי Cookie למדידה של Google Ads? מודעות מותאמות אישית יישארו כבויות.","אישור","דחייה","פרטיות","הגדרות קובצי Cookie"],"az":["Ölçmə seçimləri","Google Ads ölçmə kukilərinə icazə verilsin? Fərdiləşdirilmiş reklamlar bağlı qalacaq.","İcazə ver","Rədd et","Məxfilik","Kuki ayarları"],"ka":["გაზომვის პარამეტრები","დაუშვებთ Google Ads-ის გაზომვის ქუქი-ფაილებს? პერსონალიზებული რეკლამები გამორთული დარჩება.","დაშვება","უარყოფა","კონფიდენციალურობა","ქუქი-ფაილების პარამეტრები"],"hy":["Չափման նախընտրություններ","Թույլատրե՞լ Google Ads-ի չափման cookie-ները։ Անհատականացված գովազդը կմնա անջատված։","Թույլատրել","Մերժել","Գաղտնիություն","Cookie-ների կարգավորումներ"],"kk":["Өлшеу параметрлері","Google Ads өлшеу cookie файлдарына рұқсат бересіз бе? Жекелендірілген жарнамалар өшірулі қалады.","Рұқсат беру","Бас тарту","Құпиялылық","Cookie параметрлері"],"uz":["O‘lchash sozlamalari","Google Ads o‘lchash cookie-fayllariga ruxsat berilsinmi? Shaxsiylashtirilgan reklamalar o‘chiq qoladi.","Ruxsat berish","Rad etish","Maxfiylik","Cookie sozlamalari"],"ky":["Өлчөө жөндөөлөрү","Google Ads өлчөө cookie файлдарына уруксат бересизби? Жекелештирилген жарнамалар өчүк бойдон калат.","Уруксат берүү","Баш тартуу","Купуялык","Cookie жөндөөлөрү"],"is":["Mælingastillingar","Leyfa mælingavafrakökur frá Google Ads? Sérsniðnar auglýsingar verða áfram óvirkar.","Leyfa","Hafna","Persónuvernd","Vafrakökustillingar"],"lb":["Miessastellungen","Miess-Cookië vu Google Ads erlaben? Personaliséiert Reklamme bleiwen ausgeschalt.","Erlaben","Ofleenen","Dateschutz","Cookie-Astellungen"]};
  const code = (document.documentElement.lang || 'en').toLowerCase();
  const text = copy[code === 'sr-latn' ? 'sr' : code] || copy.en;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const state = allowed => ({ad_storage: allowed ? 'granted' : 'denied', analytics_storage: allowed ? 'granted' : 'denied', ad_user_data: allowed ? 'granted' : 'denied', ad_personalization: 'denied'});
  function stored() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && saved.v === 1 && typeof saved.allow === 'boolean' && Number.isFinite(saved.at) && saved.at <= Date.now() && Date.now() - saved.at < AGE) return saved;
    } catch (_) {}
    return null;
  }
  let choice = stored();
  // Head bootstrap is primary; keep a fallback for cached older HTML and local QA.
  if (!window.__globalGoogleAdsBootstrapped) {
    window.__globalGoogleAdsBootstrapped = true;
    window.gtag('consent', 'default', state(false));
    window.gtag('set', 'ads_data_redaction', true);
    if (choice) window.gtag('consent', 'update', state(choice.allow));
    window.gtag('js', new Date());
    window.gtag('config', 'AW-18475015064', {allow_ad_personalization_signals: false});
    if (production) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18475015064';
      document.head.appendChild(script);
    }
  }
  function clearMeasurementCookies() {
    const names = document.cookie.split(';').map(item => item.split('=')[0].trim()).filter(name => /^(_gcl_|_ga(?:_|$)|_gid$)/.test(name));
    const paths = new Set(['/']);
    const parts = location.pathname.split('/').filter(Boolean);
    let path = '';
    for (const part of parts) { path += '/' + part; paths.add(path); paths.add(path + '/'); }
    for (const name of names) for (const path of paths) for (const domain of ['', location.hostname, '.cryptomarketing.global']) {
      document.cookie = name + '=; Max-Age=0; Path=' + path + (domain ? '; Domain=' + domain : '') + '; SameSite=Lax; Secure';
    }
  }
  function mount() {
    if (!document.body || document.getElementById('cmg-consent')) return;
    const style = document.createElement('style');
    style.textContent = `
      #cmg-consent{position:fixed;inset:auto max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) auto;box-sizing:border-box;width:min(430px,calc(100% - 24px - env(safe-area-inset-left) - env(safe-area-inset-right)));max-height:calc(100dvh - 24px);overflow:auto;z-index:100001;padding:20px;border:1px solid #d2d2d7;border-radius:22px;background:rgba(255,255,255,.98);color:#1d1d1f;box-shadow:0 8px 35px #0002;font:16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,sans-serif;text-align:start;overflow-wrap:anywhere}
      #cmg-consent[hidden]{display:none!important}#cmg-consent h2{font:600 17px/1.35 system-ui,sans-serif;letter-spacing:-.01em;color:inherit;margin:0 0 8px}#cmg-consent p{font:inherit;color:inherit;margin:0 0 16px}#cmg-consent .cmg-actions{display:flex;flex-wrap:wrap;gap:10px}#cmg-consent button{flex:1 1 120px;min-width:0;min-height:44px;padding:10px 16px;border:1px solid #d2d2d7;border-radius:12px;background:#f5f5f7;color:#1d1d1f;cursor:pointer;font:600 15px/1.4 system-ui,sans-serif;overflow-wrap:anywhere}#cmg-consent button:active{background:#e5e5ea}#cmg-consent a{display:inline-block;margin-top:12px;color:inherit;text-decoration:underline;font:14px/1.5 system-ui,sans-serif}#cmg-consent button:focus-visible,#cmg-consent a:focus-visible,.cmg-consent-settings:focus-visible{outline:2px solid currentColor;outline-offset:3px}
      .cmg-consent-settings{display:inline-block;min-height:44px;margin:8px 16px;padding:10px 0;background:none;border:0;color:inherit;text-decoration:underline;cursor:pointer;font:14px/1.5 system-ui,sans-serif;overflow-wrap:anywhere;text-align:start;max-width:calc(100% - 32px)}
      [data-theme="dark"] #cmg-consent{background:rgba(28,28,30,.98);color:#f5f5f7;border-color:#48484a;box-shadow:0 8px 35px #0006}[data-theme="dark"] #cmg-consent button{background:#2c2c2e;color:#f5f5f7;border-color:#636366}[data-theme="dark"] #cmg-consent button:active{background:#48484a}
      @media(prefers-reduced-transparency:reduce){#cmg-consent{background:#fff}[data-theme="dark"] #cmg-consent{background:#1c1c1e}}
      @media(forced-colors:active){#cmg-consent,#cmg-consent button{background:Canvas;color:CanvasText;border-color:CanvasText}}
    `;
    document.head.appendChild(style);
    const panel = document.createElement('section');
    panel.id = 'cmg-consent';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', 'cmg-consent-title');
    panel.hidden = Boolean(choice);
    const title = document.createElement('h2'); title.id = 'cmg-consent-title'; title.textContent = text[0];
    const description = document.createElement('p'); description.textContent = text[1];
    const actions = document.createElement('div'); actions.className = 'cmg-actions';
    const accept = document.createElement('button'); accept.type = 'button'; accept.textContent = text[2];
    const reject = document.createElement('button'); reject.type = 'button'; reject.textContent = text[3];
    const privacy = document.createElement('a'); privacy.href = code === 'tr' ? '/tr/privacy/' : '/privacy/'; privacy.textContent = text[4];
    if (code !== 'tr' && code !== 'en') { privacy.lang = 'en'; privacy.textContent += ' (English)'; }
    const settings = document.createElement('button'); settings.type = 'button'; settings.className = 'cmg-consent-settings'; settings.textContent = text[5]; settings.setAttribute('aria-controls', 'cmg-consent'); settings.setAttribute('aria-expanded', String(!choice));
    const footer = document.querySelector('footer') || document.body;
    footer.appendChild(settings);
    actions.append(reject, accept); panel.append(title, description, actions, privacy); document.body.appendChild(panel);
    let returnFocus = false;
    function choose(allow) {
      choice = {v:1, allow, at:Date.now()};
      try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (_) {}
      window.gtag('consent', 'update', state(allow));
      if (!allow) clearMeasurementCookies();
      panel.hidden = true; settings.setAttribute('aria-expanded', 'false');
      if (returnFocus) settings.focus();
    }
    accept.addEventListener('click', () => choose(true));
    reject.addEventListener('click', () => choose(false));
    settings.addEventListener('click', () => { panel.hidden = false; returnFocus = true; settings.setAttribute('aria-expanded', 'true'); reject.focus(); });
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') { panel.hidden = true; settings.setAttribute('aria-expanded','false'); settings.focus(); } });
    window.addEventListener('storage', e => {
      if (e.key !== KEY && e.key !== null) return;
      choice = stored(); window.gtag('consent', 'update', state(Boolean(choice && choice.allow)));
      if (!choice || !choice.allow) clearMeasurementCookies();
      panel.hidden = Boolean(choice); settings.setAttribute('aria-expanded', String(!choice));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();

/* End Global Google Ads measurement. */

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

