(() => {
  'use strict';
  if (parent === window) return;
  const origin = new URL(document.baseURI).origin;
  const send = (type, more = {}) => parent.postMessage({type, ...more}, origin);
  for (const id of ['brandPill', 'skip', 'cta', 'allServices']) {
    const link = document.getElementById(id);
    link.addEventListener('click', event => {
      event.preventDefault();
      send('cmp-intro:exit', {href:link.getAttribute('href')});
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); send('cmp-intro:exit', {href:document.getElementById('skip').getAttribute('href')}); }
  });
  addEventListener('message', event => {
    if (event.source !== parent || event.origin !== origin) return;
    if (event.data?.type === 'cmp-intro:progress') {
      window.CMP_INTRO_PROGRESS = event.data.progress;
      window.CMP_INTRO_VISIBLE = event.data.visible;
    } else if (event.data?.type === 'cmp-intro:visible') dispatchEvent(new Event('resize'));
    // Let visitors choose their first control; Tab focus stays visible.
  });
  // Keyboard scrolling in an inline frame follows the same native page track.
  document.addEventListener('keydown', event => {
    if (window.CMP_INTRO_CONTEXT?.mode !== 'inline' || /INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target?.tagName || '') || event.target?.isContentEditable) return;
    const amount = {ArrowDown:0.08,ArrowUp:-0.08,PageDown:0.9,PageUp:-0.9,' ':event.shiftKey?-0.9:0.9}[event.key];
    if (amount !== undefined) { event.preventDefault(); send('cmp-intro:scroll',{amount}); }
  });
  // Readiness never depends on decorative images or hidden animation frames.
  // Decorative logos load progressively; one slow image must not hide the site.
  function ready() {
    if (!window.CMP_INTRO || !document.getElementById('mk')) return send('cmp-intro:error');
    const reducedMotion = document.documentElement.classList.contains('reduced-motion');
    send('cmp-intro:ready', {title:document.title,reducedMotion,height:document.body.scrollHeight});
    if (reducedMotion && window.ResizeObserver) new ResizeObserver(() => send('cmp-intro:height',{height:document.body.scrollHeight})).observe(document.body);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true});
  else ready();
})();
