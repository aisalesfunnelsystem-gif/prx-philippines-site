(() => {
  const stage = document.getElementById('banner-motion');
  const button = document.querySelector('.motion-toggle');
  if (!stage || !button) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inView = !('IntersectionObserver' in window);
  let pausedByUser = false;

  function update() {
    const canMove = !reducedMotion.matches;
    button.hidden = !canMove;
    stage.classList.toggle('is-running', canMove && inView && !document.hidden && !pausedByUser);
    button.setAttribute('aria-pressed', String(pausedByUser));
    button.setAttribute('aria-label', pausedByUser ? 'Play banner movement' : 'Pause banner movement');
    button.innerHTML = pausedByUser ? 'Play motion <span aria-hidden="true">▶</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  }

  button.addEventListener('click', () => { pausedByUser = !pausedByUser; update(); });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', update);
  else reducedMotion.addListener(update);
  document.addEventListener('visibilitychange', update);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: 0.05 }).observe(stage);
  }
  update();
})();
