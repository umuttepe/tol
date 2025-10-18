document.addEventListener('DOMContentLoaded', () => {
  // ===== Contact form (keep this if you already use Formspree) =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(e.target);
      try {
        const resp = await fetch(e.target.action, { method: form.method, body: data, headers: { Accept: 'application/json' }});
        if (resp.ok) {
          status.textContent = 'Thanks for your submission!';
          form.reset();
        } else {
          const d = await resp.json().catch(()=>null);
          status.textContent = d && d.errors ? d.errors.map(x=>x.message).join(', ') : 'Oops! There was a problem submitting your form';
        }
      } catch {
        status.textContent = 'Oops! There was a problem submitting your form';
      }
    });
  }

  // ===== Hero slider =====
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides  = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots    = Array.from(slider.querySelectorAll('.hero-dots .dot'));
  const prevBtn = slider.querySelector('.hero-nav.prev');
  const nextBtn = slider.querySelector('.hero-nav.next');

  if (slides.length <= 1) return; // nothing to slide

  let idx = slides.findIndex(s => s.classList.contains('is-active'));
  if (idx < 0) idx = 0;
  const N = slides.length;
  const AUTOPLAY_MS = 5000;
  let timer = null;

  function show(i) {
    idx = (i + N) % N;
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
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  function start() { stop(); timer = setInterval(next, AUTOPLAY_MS); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  show(idx);
  start();
});
