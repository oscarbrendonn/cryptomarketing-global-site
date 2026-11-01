(() => {document.querySelectorAll('[data-cex-listing]').forEach(section => {
 const input=section.querySelector('input');const cards=[...section.querySelectorAll('[data-cex-id]')];const output=section.querySelector('output');const empty=section.querySelector('[data-cex-empty]');
 const normalize=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 input.addEventListener('input',()=>{const q=normalize(input.value);let n=0;cards.forEach(c=>{c.hidden=!normalize(c.dataset.cexSearch).includes(q);if(!c.hidden)n++;});output.textContent=`${n} / ${cards.length}`;empty.hidden=n>0;});
});})();
