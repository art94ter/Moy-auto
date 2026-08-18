// MY AUTO — APPROVED INTERACTION LAYER
// Keeps car switching by swipe, but intentionally does not load or display car photos.
(function(){
  'use strict';
  if(window.__MOY_AUTO_APPROVED_INTERACTIONS__) return;
  window.__MOY_AUTO_APPROVED_INTERACTIONS__=true;
  let touch=null,lastSwipe=0;
  function bindSwipe(){
    const h=document.getElementById('hero');
    if(!h||h.dataset.approvedSwipe==='1') return;
    h.dataset.approvedSwipe='1';
    h.style.touchAction='pan-y';
    h.addEventListener('touchstart',function(e){
      if(e.touches.length===1){const t=e.touches[0];touch={x:t.clientX,y:t.clientY,time:Date.now()};}
    },{passive:true});
    h.addEventListener('touchend',function(e){
      if(!touch)return;
      const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y,dt=Date.now()-touch.time;
      touch=null;
      if(dt<900&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-lastSwipe>400){
        lastSwipe=Date.now();
        if(Array.isArray(window.db?.cars)&&window.db.cars.length>1){
          const i=Math.max(0,window.db.cars.findIndex(c=>c.id===window.db.activeCarId));
          window.db.activeCarId=window.db.cars[(i+(dx<0?1:-1)+window.db.cars.length)%window.db.cars.length].id;
          try{window.render();}catch(_e){}
          try{window.saveCloud();}catch(_e){}
        }
      }
    },{passive:true});
  }
  function cleanPhoto(){
    document.querySelectorAll('#heroPhoto,.hero-photo,.ref-car-photo,.hero-car,.car-catalog-photo,.car-photo-credit').forEach(function(el){el.remove();});
    const h=document.getElementById('hero');
    if(h){h.style.backgroundImage='';}
  }
  function run(){cleanPhoto();bindSwipe();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(function(){run();}).observe(document.documentElement,{subtree:true,childList:true});
})();
