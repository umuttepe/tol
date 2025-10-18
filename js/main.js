document.addEventListener('DOMContentLoaded', () => {
  // ===== Contact form (unchanged if you have it above) =====

  // ===== Hero slider with on-demand image loading =====
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides  = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots    = Array.from(slider.querySelectorAll('.hero-dots .dot'));
  const prevBtn = slider.querySelector('.hero-nav.prev');
  const nextBtn = slider.querySelector('.hero-nav.next');

  if (slides.length <= 1) return;

  let idx = slides.findIndex(s => s.classList.contains('is-active'));
  if (idx < 0) idx = 0;
  const N = slides.length;
  const AUTOPLAY_MS = 5000;
  let timer = null;

  function ensureLoaded(slideIndex) {
    const slide = slides[slideIndex];
    if (!slide) return;
    const img = slide.querySelector('img');
    if (img && img.dataset.src && !img.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  }
  function preload(nextIndex) {
    const s = slides[(nextIndex + N) % N];
    if (!s) return;
    const img = s.querySelector('img');
    if (img && img.dataset.src && !img.src) {
      const pre = new Image();
      pre.src = img.dataset.src;
    }
  }

  function show(i) {
    idx = (i + N) % N;
    ensureLoaded(idx);
    slides.forEach((s, k) => {
      const active = k === idx;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (dots.length === N) {
      dots.forEach((d, k) => {
        const active = k === idx;
        d.classList.toggle('is-active', active);
        d.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }
    preload(idx + 1);
  }

  function next(){ show(idx + 1); }
  function prev(){ show(idx - 1); }

  function start(){ stop(); timer = setInterval(next, AUTOPLAY_MS); }
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  // init
  ensureLoaded(idx);
  show(idx);
  start();
});
