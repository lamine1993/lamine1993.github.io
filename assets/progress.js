// Barre de progression de lecture des articles
(() => {
  const bar = document.querySelector('.progress span');
  const body = document.querySelector('article.body');
  if (!bar || !body) return;
  let queued = false;
  const update = () => {
    queued = false;
    const r = body.getBoundingClientRect();
    const total = r.height - innerHeight;
    const k = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
    bar.style.transform = `scaleX(${k})`;
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', ask, { passive: true });
  addEventListener('resize', ask);
  update();
})();
