(() => {
  'use strict';
  const boot = window.CMP_INTRO_BOOT;
  // The tiny head bootstrap reserves the first viewport before paint. If it
  // timed out, keep the ordinary page rather than inserting a late intro.
  if (!boot || !document.documentElement.classList.contains('cmp-intro-pending')) return;
  const query = new URLSearchParams(location.search);
  const seenKey = 'cmp-intro-seen-v1';
  let section, frame, timer, raf, ready = false, finished = false, reduced = false;
  // A real, localized full-site link stays usable while the artwork loads.
  const placeholder = document.createElement('div');
  placeholder.id = 'cmp-intro-placeholder';
  const mark = document.createElement('img');
  mark.src = '/assets/intro/logo-512.png'; mark.alt = ''; mark.width = 112; mark.height = 112;
  const full = new URL(location.pathname + location.search, location.origin);
  full.searchParams.delete('intro'); full.searchParams.set('view','full');
  const fallback = document.createElement('a');
  fallback.href = full.href;
  fallback.textContent = document.querySelector('a[href="#services"],a[href$="/services/"]')?.textContent || document.title;
  fallback.addEventListener('click', event => { event.preventDefault(); exit(full.href); });
  placeholder.append(mark); placeholder.append(fallback);
  document.body.prepend(placeholder);
  function cleanup() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    clearTimeout(boot.timer);
    cancelAnimationFrame(raf);
    removeEventListener('message', message);
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    document.documentElement.classList.remove('cmp-intro-pending');
    section?.remove();
    placeholder.remove();
  }
  function seen() { try { sessionStorage.setItem(seenKey, '1'); } catch {} }
  function exit(href) {
    const url = new URL(href || location.pathname, location.origin);
    if (url.origin !== location.origin || !url.pathname.startsWith('/')) return;
    for (const [key,value] of query) if (!['intro','theme','lang','view'].includes(key) && !url.searchParams.has(key)) url.searchParams.append(key,value);
    seen();
    // A real navigation gives the full site its own loading/interaction metrics.
    // Removing the overview from the parent here produces layout shift because
    // an iframe click is not a recent input in the parent's performance timeline.
    if (url.pathname === location.pathname) {
      url.searchParams.delete('intro');
      url.searchParams.set('view','full');
    }
    location.assign(url.href);
  }

  function sync() {
    raf = 0;
    if (finished) return;
    if (!ready) {
      // Never move content away from someone already reading or scrolling it.
      if (scrollY > 10) cleanup();
      return;
    }
    const rect = section.getBoundingClientRect();
    const span = Math.max(1, section.offsetHeight - frame.clientHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / span));
    frame.contentWindow.postMessage({type:'cmp-intro:progress',progress,visible:rect.bottom>0 && rect.top<innerHeight}, location.origin);
    if (rect.bottom <= 0) seen();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(sync); }
  function message(event) {
    if (!frame || event.source !== frame.contentWindow || event.origin !== location.origin) return;
    const data = event.data;
    if (data?.type === 'cmp-intro:exit') exit(data.href);
    else if (data?.type === 'cmp-intro:error') cleanup();
    else if (data?.type === 'cmp-intro:ready' && !finished && !ready) {
      if (scrollY > 10 || !document.documentElement.classList.contains('cmp-intro-pending')) return cleanup();
      clearTimeout(timer);
      clearTimeout(boot.timer);
      reduced = !!data.reducedMotion;
      section.setAttribute('aria-label', data.title || document.title);
      frame.title = data.title || document.title;
      section.dataset.ready = 'true';
      section.dataset.reducedMotion = String(reduced);
      if (reduced && Number.isFinite(data.height)) frame.style.height = Math.max(innerHeight,data.height)+'px';
      document.documentElement.classList.remove('cmp-intro-pending');
      placeholder.remove();
      ready = true;
      frame.contentWindow.postMessage({type:'cmp-intro:visible'}, location.origin);
      document.documentElement.dataset.introReady = 'true';
      sync();
    } else if (data?.type === 'cmp-intro:height' && reduced && Number.isFinite(data.height)) {
      frame.style.height = Math.max(innerHeight,data.height)+'px';
    } else if (data?.type === 'cmp-intro:scroll' && ready && Number.isFinite(data.amount)) {
      window.scrollBy({top:Math.max(-1,Math.min(1,data.amount))*innerHeight,behavior:'instant'});
    }
  }
  const controller = new AbortController();
  timer = setTimeout(() => { controller.abort(); cleanup(); }, 12000);
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  fetch('/assets/intro/document.txt?v=20261026-seo3', {signal:controller.signal}).then(response => {
    if (!response.ok) throw Error('Intro unavailable');
    return response.text();
  }).then(html => {
    if (finished || !html.includes('<!--CMP_CONTEXT-->')) return cleanup();
    section = document.createElement('section');
    section.id = 'cmp-intro-preview';
    section.setAttribute('aria-label',document.title);
    frame = document.createElement('iframe');
    frame.title = document.title;
    frame.setAttribute('referrerpolicy','same-origin');
    const context = JSON.stringify({pathname:location.pathname,search:location.search,theme:query.get('theme'),mode:'inline'}).replaceAll('<','\\u003c');
    frame.srcdoc = html.replace('<!--CMP_CONTEXT-->','<script>window.CMP_INTRO_CONTEXT='+context+';document.documentElement.classList.add("cmp-inline-intro");</script>');
    addEventListener('message',message);
    section.append(frame);
    document.body.prepend(section);
  }).catch(cleanup);
})();
