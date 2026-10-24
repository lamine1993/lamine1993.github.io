// Mobile : points de position sous chaque carrousel manuel (glisser au doigt)
(() => {
  const small = matchMedia('(max-width: 640px)');
  document.querySelectorAll('.modules, .mgrid, .projects, .certs, .posts').forEach(track => {
    const items = [...track.children];
    if (items.length < 2) return;
    const dots = document.createElement('div');
    dots.className = 'dots';
    dots.setAttribute('aria-hidden', 'true');
    items.forEach((item, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.tabIndex = -1;
      d.addEventListener('click', () => track.scrollTo({ left: item.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: 'smooth' }));
      dots.appendChild(d);
    });
    track.after(dots);
    let queued = false;
    const update = () => {
      queued = false;
      if (!small.matches) return;
      const mid = track.scrollLeft + track.clientWidth * 0.35;
      let k = 0;
      items.forEach((item, i) => { if (item.offsetLeft - track.offsetLeft <= mid) k = i; });
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) k = items.length - 1;
      [...dots.children].forEach((d, i) => d.classList.toggle('on', i === k));
    };
    track.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    small.addEventListener('change', update);
    update();
  });
})();
