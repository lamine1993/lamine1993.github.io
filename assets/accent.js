// Choix de la couleur du site : bleu (défaut), vert ou ambre. Mémorisé dans le navigateur du visiteur.
(() => {
  const root = document.documentElement;
  const KEY = 'mls-accent';
  const current = () => root.getAttribute('data-accent') || 'blue';
  function apply(accent) {
    if (accent === 'blue') root.removeAttribute('data-accent');
    else root.setAttribute('data-accent', accent);
    try { localStorage.setItem(KEY, accent); } catch (e) {}
    const ink = getComputedStyle(root).getPropertyValue('--ink').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && ink) meta.setAttribute('content', ink);
    sync();
    document.dispatchEvent(new CustomEvent('accentchange', { detail: accent }));
  }
  function sync() {
    document.querySelectorAll('.accent button').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.accent === current()));
    });
  }
  document.querySelectorAll('.accent button').forEach(b => {
    b.addEventListener('click', () => apply(b.dataset.accent));
  });
  sync();
})();
