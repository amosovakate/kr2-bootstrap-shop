(() => {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 400) btn.classList.add('is-visible');
    else btn.classList.remove('is-visible');
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();