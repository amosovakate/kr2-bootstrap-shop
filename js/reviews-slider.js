(function () {
  var slider = document.getElementById('rv-slider');
  if (!slider) return; // на других страницах блока нет

  var track = slider.querySelector('.rv-track');
  var slides = track.querySelectorAll('.rv-card');
  var prevBtn = slider.querySelector('.rv-btn--prev');
  var nextBtn = slider.querySelector('.rv-btn--next');
  var dotsBox = slider.querySelector('.rv-dots');
  var behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  var dots = [];

  function gap() {
    return parseFloat(getComputedStyle(track).columnGap) || 0;
  }
  function step() {
    return slides[0].getBoundingClientRect().width + gap();
  }
  function perView() {
    return Math.max(1, Math.round((track.clientWidth + gap()) / step()));
  }
  function pages() {
    return Math.max(1, slides.length - perView() + 1);
  }
  function current() {
    return Math.min(pages() - 1, Math.round(track.scrollLeft / step()));
  }

  function updateDots() {
    var c = current();
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === c);
      d.setAttribute('aria-current', i === c ? 'true' : 'false');
    });
  }

  function goTo(i) {
    track.scrollTo({ left: i * step(), behavior: behavior });
  }

  function buildDots() {
    dotsBox.innerHTML = '';
    dots = [];
    for (var i = 0; i < pages(); i++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'rv-dot';
        dot.setAttribute('aria-label', 'Отзыв ' + (index + 1));
        dot.addEventListener('click', function () { goTo(index); });
        dotsBox.appendChild(dot);
        dots.push(dot);
      })(i);
    }
    updateDots();
  }

  function next() {
    var c = current();
    goTo(c >= pages() - 1 ? 0 : c + 1);
  }
  function prev() {
    var c = current();
    goTo(c <= 0 ? pages() - 1 : c - 1);
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });

  var ticking = false;
  track.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updateDots(); ticking = false; });
  });
  window.addEventListener('resize', buildDots);

  buildDots();
})();