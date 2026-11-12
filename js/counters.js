(function () {
  const items = document.querySelectorAll('[data-count]');
  if (!items.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finalText = el => el.dataset.count + (el.dataset.suffix || '');

  const run = el => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 1400;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => { el.textContent = finalText(el); });
    return;
  }

  items.forEach(el => { el.textContent = '0' + (el.dataset.suffix || ''); });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  items.forEach(el => io.observe(el));
})();