// Mobile : les boutons flottants s'effacent pendant la lecture (défilement vers le bas)
// et reviennent dès qu'on remonte ou qu'on arrive en bas de page.
(() => {
  const fab = document.querySelector('.fab');
  if (!fab) return;
  const small = matchMedia('(max-width: 640px)');
  let lastY = scrollY, queued = false;
  const update = () => {
    queued = false;
    const y = scrollY, atEnd = innerHeight + y >= document.documentElement.scrollHeight - 80;
    const hide = small.matches && y > 240 && y > lastY + 4 && !atEnd;
    if (hide) fab.classList.add('is-hidden');
    else if (y < lastY - 4 || atEnd || y <= 240 || !small.matches) fab.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  small.addEventListener('change', update);
  fab.addEventListener('focusin', () => fab.classList.remove('is-hidden'));
})();
