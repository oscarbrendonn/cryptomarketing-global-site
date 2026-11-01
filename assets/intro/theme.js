/* Apply before first paint. The preference uses the same key as the main site. */
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'cmp-appearance';
  const valid = value => value === 'light' || value === 'dark';
  const labels = {
    en: ['Switch to dark appearance', 'Switch to light appearance'],
    is: ['Dökkt útlit', 'Ljóst útlit'],
    lb: ['Däischtert Ausgesinn', 'Hellt Ausgesinn'],
    tr: ['Koyu görünüme geç', 'Açık görünüme geç'],
    es: ['Cambiar al modo oscuro', 'Cambiar al modo claro'],
    de: ['Dunkle Ansicht aktivieren', 'Helle Ansicht aktivieren'],
    fr: ['Activer le mode sombre', 'Activer le mode clair'],
    'pt-BR': ['Ativar modo escuro', 'Ativar modo claro'],
    ru: ['Включить тёмную тему', 'Включить светлую тему'],
    ar: ['التبديل إلى المظهر الداكن', 'التبديل إلى المظهر الفاتح'],
    ja: ['ダークモードに切り替える', 'ライトモードに切り替える'],
    'zh-Hans': ['切换为深色模式', '切换为浅色模式'],
    sr: ['Uključi tamni prikaz', 'Uključi svetli prikaz'],
    hr: ['Uključi tamni prikaz', 'Uključi svijetli prikaz']
  };
  Object.assign(labels,{"it": ["Aspetto scuro", "Aspetto chiaro"], "nl": ["Donkere weergave", "Lichte weergave"], "pl": ["Ciemny wygląd", "Jasny wygląd"], "uk": ["Темне оформлення", "Світле оформлення"], "ro": ["Aspect întunecat", "Aspect luminos"], "el": ["Σκοτεινή εμφάνιση", "Φωτεινή εμφάνιση"], "cs": ["Tmavý vzhled", "Světlý vzhled"], "sk": ["Tmavý vzhľad", "Svetlý vzhľad"], "hu": ["Sötét megjelenés", "Világos megjelenés"], "bg": ["Тъмен облик", "Светъл облик"], "sl": ["Temni videz", "Svetli videz"], "bs": ["Tamni izgled", "Svijetli izgled"], "sq": ["Pamje e errët", "Pamje e çelët"], "sv": ["Mörkt utseende", "Ljust utseende"], "nb": ["Mørkt utseende", "Lyst utseende"], "da": ["Mørkt udseende", "Lyst udseende"], "fi": ["Tumma ulkoasu", "Vaalea ulkoasu"], "et": ["Tume välimus", "Hele välimus"], "lv": ["Tumšais izskats", "Gaišais izskats"], "lt": ["Tamsi išvaizda", "Šviesi išvaizda"], "ko": ["다크 모드", "라이트 모드"], "id": ["Tampilan gelap", "Tampilan terang"], "ms": ["Paparan gelap", "Paparan cerah"], "th": ["โหมดมืด", "โหมดสว่าง"], "fil": ["Madilim na tema", "Maliwanag na tema"], "hi": ["डार्क मोड", "लाइट मोड"], "bn": ["ডার্ক মোড", "লাইট মোড"], "ur": ["ڈارک موڈ", "لائٹ موڈ"], "pa": ["ਡਾਰਕ ਮੋਡ", "ਲਾਈਟ ਮੋਡ"], "ta": ["இருண்ட தோற்றம்", "ஒளிர் தோற்றம்"], "te": ["డార్క్ మోడ్", "లైట్ మోడ్"], "fa": ["نمای تیره", "نمای روشن"], "he": ["מראה כהה", "מראה בהיר"], "az": ["Tünd görünüş", "Açıq görünüş"], "ka": ["მუქი რეჟიმი", "ღია რეჟიმი"], "hy": ["Մուգ տեսք", "Լուսավոր տեսք"], "kk": ["Қараңғы режим", "Ашық режим"], "uz": ["Tungi ko‘rinish", "Yorug‘ ko‘rinish"], "ky": ["Караңгы режим", "Жарык режим"]});
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch {}
  function requested() { return (window.CMP_INTRO_CONTEXT || {}).theme || new URLSearchParams(location.search).get('theme'); }
  function resolve() {
    const query = requested();
    return valid(query) ? query : valid(saved) ? saved : system.matches ? 'dark' : 'light';
  }
  function updateLabel() {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const text = (labels[root.lang] || labels.en)[root.dataset.theme === 'dark' ? 1 : 0];
    button.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    button.setAttribute('aria-label', text);
    button.title = text;
  }
  function apply(theme) {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0a0a0c' : '#ffffff';
    updateLabel();
    document.dispatchEvent(new CustomEvent('cmp:themechange', {detail:{theme}}));
  }
  if (valid(requested())) { saved = requested(); try { localStorage.setItem(storageKey, saved); } catch {} }
  apply(resolve());
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('themeToggle');
    button.hidden = false;
    apply(resolve());
    button.addEventListener('click', event => {
      saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(storageKey, saved); } catch {}
      root.classList.toggle('theme-instant', event.detail === 0);
      if (window.CMP_INTRO_CONTEXT) window.CMP_INTRO_CONTEXT.theme = saved;
      const url = new URL(location.href);
      // Keep a preview link in sync with the visitor's manual choice.
      if (url.searchParams.has('theme')) {
        url.searchParams.set('theme', saved);
        try { history.replaceState(history.state, '', url); } catch {}
      }
      apply(saved);
    });
  });
  document.addEventListener('cmp:languagechange', updateLabel);
  addEventListener('popstate', () => apply(resolve()));
  system.addEventListener('change', () => { if (!valid(saved) && !valid(requested())) apply(resolve()); });
})();
