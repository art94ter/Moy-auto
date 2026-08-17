(function(){
'use strict';
if(window.__MOY_AUTO_FIXES_V3__)return;
window.__MOY_AUTO_FIXES_V3__=true;
let touch=null,lastSwipe=0;
function css(){if(document.getElementById('moy-auto-fixes-v3'))return;const s=document.createElement('style');s.id='moy-auto-fixes-v3';s.textContent=`:root{--muted:#d0c8bc!important;--text:#f5f2ec!important}body,button,input,select,textarea{color:#f5f2ec}.hero-meta,.hero-km span,.progress-label,.quick small,.stat-card span,.events-head span,.event-empty p,.muted,.small{color:#d0c8bc!important}main>nav button{color:#d0c8bc!important}main>nav button.active{color:#f1cf91!important}.hero-photo{display:none!important}`;document.head.appendChild(s)}
function selectCar(dir){if(!Array.isArray(window.db?.cars)||db.cars.length<2)return;const i=Math.max(0,db.cars.findIndex(c=>c.id===db.activeCarId));db.activeCarId=db.cars[(i+(dir>0?1:-1)+db.cars.length)%db.cars.length].id;try{render()}catch(e){}try{saveCloud()}catch(e){}}
function bindSwipe(){const h=document.getElementById('hero');if(!h||h.dataset.moySwipeV3==='1')return;h.dataset.moySwipeV3='1';h.style.touchAction='pan-y';h.addEventListener('touchstart',e=>{if(e.touches.length===1){const t=e.touches[0];touch={x:t.clientX,y:t.clientY,time:Date.now()}}},{passive:true});h.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y,dt=Date.now()-touch.time;touch=null;if(dt<900&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-lastSwipe>400){lastSwipe=Date.now();selectCar(dx<0?1:-1)}},{passive:true})}
function run(){css();bindSwipe()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>setTimeout(run,80)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();