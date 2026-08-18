(function(){
  'use strict';
  // MY AUTO — functional fix only.
  // The previous V5 script injected a second visual design that conflicted with
  // the approved reference. Styling is now owned by index.html/premium.css.
  let touch = null;
  let lastSwipe = 0;

  function selectCar(dir){
    if(!Array.isArray(window.db?.cars) || db.cars.length < 2) return;
    const i = Math.max(0, db.cars.findIndex(c => c.id === db.activeCarId));
    db.activeCarId = db.cars[(i + (dir > 0 ? 1 : -1) + db.cars.length) % db.cars.length].id;
    try { render(); } catch(e) {}
    try { saveCloud(); } catch(e) {}
  }

  function bindSwipe(){
    const h = document.getElementById('hero');
    if(!h || h.dataset.moySwipeClean === '1') return;
    h.dataset.moySwipeClean = '1';
    h.style.touchAction = 'pan-y';
    h.addEventListener('touchstart', e => {
      if(e.touches.length === 1){
        const t = e.touches[0];
        touch = {x:t.clientX, y:t.clientY, time:Date.now()};
      }
    }, {passive:true});
    h.addEventListener('touchend', e => {
      if(!touch) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touch.x;
      const dy = t.clientY - touch.y;
      const dt = Date.now() - touch.time;
      touch = null;
      if(dt < 900 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.15 && Date.now() - lastSwipe > 400){
        lastSwipe = Date.now();
        selectCar(dx < 0 ? 1 : -1);
      }
    }, {passive:true});
  }

  function syncHomeNav(){
    const active = document.querySelector('#bottomNav button.active');
    const id = active?.dataset.tab || 'home';
    document.querySelectorAll('#homeNav button').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  }

  function run(){
    bindSwipe();
    syncHomeNav();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  new MutationObserver(() => setTimeout(run, 60)).observe(document.body, {
    subtree:true, childList:true, attributes:true, attributeFilter:['class']
  });
})();
