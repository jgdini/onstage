(function(){
  var T = {}, KEYS = { en:1, pt:2, es:3 }, HTMLLANG = { en:'en', pt:'pt-BR', es:'es' };
  window.OS_T.forEach(function(r){ T[r[0]] = r; });

  function slots(s){ return s.replace(/\[\[(.+?)\]\]/g,'<span class="slot">$1</span>'); }

  function getLang(){
    try{
      var q = new URLSearchParams(location.search).get('lang');
      if (KEYS[q]) return q;
      var s = localStorage.getItem('os-lang-choice'); if (KEYS[s]) return s;
    }catch(e){}
    return 'en';
  }

  function tr(key, lang){ var r = T[key]; return r ? r[KEYS[lang]] : ''; }

  function apply(lang){
    var i = KEYS[lang];
    document.documentElement.lang = HTMLLANG[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var r = T[el.getAttribute('data-i18n')]; if (r) el.innerHTML = slots(r[i]);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var r = T[el.getAttribute('data-i18n-ph')]; if (r) el.placeholder = r[i];
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function(el){
      var r = T[el.getAttribute('data-i18n-label')]; if (r) el.setAttribute('data-label', r[i]);
    });
    document.querySelectorAll('.lang button').forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.l === lang ? 'true':'false');
    });
    var tg = document.querySelector('.slot-toggle');
    if (tg) tg.textContent = tr(document.body.classList.contains('show-slots') ? 'slots.off' : 'slots.on', lang);
    window.OS_LANG = lang;
  }

  var lang = getLang();
  apply(lang);
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){
      lang = b.dataset.l; apply(lang);
      try{ localStorage.setItem('os-lang-choice', lang); }catch(e){}
    });
  });

  /* header */
  var hdr = document.querySelector('.hdr');
  function onScroll(){ hdr.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

  var burger = document.querySelector('.burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function(){
    var o = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });
  nav.addEventListener('click', function(e){
    if (e.target.tagName === 'A'){ nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow=''; }
  });

  /* reveal */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:.12 });
    rv.forEach(function(el){ io.observe(el); });
  } else rv.forEach(function(el){ el.classList.add('in'); });

  /* client-slot highlighter */
  var tg = document.querySelector('.slot-toggle');
  if (tg) tg.addEventListener('click', function(){
    var on = document.body.classList.toggle('show-slots');
    tg.setAttribute('aria-pressed', on); apply(lang);
  });

  /* briefing form */
  var form = document.getElementById('brief-form');
  if (form){
    var steps = form.querySelectorAll('.fstep'), bars = form.querySelectorAll('.prog-bar i'), cur = 0;
    function show(n){
      cur = n;
      steps.forEach(function(s,i){ s.classList.toggle('on', i===n); });
      bars.forEach(function(b,i){ b.classList.toggle('on', i<=n); });
    }
    show(0);
    form.querySelectorAll('[data-next]').forEach(function(b){
      b.addEventListener('click', function(){
        var s = steps[cur], bad = s.querySelector(':invalid');
        if (bad){ bad.reportValidity(); return; }
        show(cur+1);
      });
    });
    form.querySelectorAll('[data-back]').forEach(function(b){ b.addEventListener('click', function(){ show(cur-1); }); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!form.checkValidity()){ form.reportValidity(); return; }
      form.classList.add('sent');
    });
  }
  document.querySelectorAll('form.news').forEach(function(f){
    f.addEventListener('submit', function(e){ e.preventDefault(); f.querySelector('button').textContent = '✓'; });
  });
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();

/* count-up numbers when the stats section enters the viewport */
(function(){
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(el){
    var end = +el.dataset.count, t0 = null, dur = 1800;
    function tick(t){
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (reduce || !('IntersectionObserver' in window)) return;
  els.forEach(function(el){ el.textContent = '0'; });
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: .6 });
  els.forEach(function(el){ io.observe(el); });
})();
