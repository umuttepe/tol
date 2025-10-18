<script>
/* === Hero slider logic === */
(function(){
  const slider   = document.querySelector('.hero-slider');
  if(!slider) return;

  const slides   = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots     = Array.from(slider.querySelectorAll('.hero-dots .dot'));
  const prevBtn  = slider.querySelector('.hero-nav.prev');
  const nextBtn  = slider.querySelector('.hero-nav.next');

  let idx = 0, timer = null, AUTOPLAY_MS = 5000;

  function show(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, k)=> s.classList.toggle('is-active', k === idx));
    dots.forEach((d, k)=> d.classList.toggle('is-active', k === idx));
  }
  function next(){ show(idx + 1); }
  function prev(){ show(idx - 1); }

  function start(){ stop(); timer = setInterval(next, AUTOPLAY_MS); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  // events
  nextBtn.addEventListener('click', ()=>{ next(); start(); });
  prevBtn.addEventListener('click', ()=>{ prev(); start(); });
  dots.forEach((d, k)=> d.addEventListener('click', ()=>{ show(k); start(); }));

  // pause on hover / when tab hidden
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', ()=>{ document.hidden ? stop() : start(); });

  // init
  show(0); start();
})();
</script>

