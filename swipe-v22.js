(function(){
'use strict';
// V28 — car swipe only. Bottom navigation is owned by registration-fix.js.
const log=(...a)=>console.log('[MoyAuto swipe v28]',...a);
function navButton(name){return [...document.querySelectorAll('#premiumBottomNav button')].find(b=>(b.textContent||'').replace(/\s+/g,' ').trim()===name)}
function hero(){return document.querySelector('#premiumHero')||document.querySelector('.hero-car')}
function home(){const b=navButton('Главная');if(b)b.click()}
function realCarSelect(){return document.querySelector('#carSelect')}
function selectBySwipe(dir){
 const sel=realCarSelect();
 if(!sel||sel.options.length<2){log('not enough cars');return}
 const n=sel.options.length,cur=Math.max(0,sel.selectedIndex),next=(cur+(dir>0?1:-1)+n)%n;
 sel.selectedIndex=next;
 sel.dispatchEvent(new Event('change',{bubbles:true}));
 setTimeout(home,180);
}
function decorate(){
 const h=hero();if(!h)return;
 h.style.position='relative';
 h.style.touchAction='pan-y';
 h.style.webkitUserSelect='none';
 h.style.userSelect='none';
 if(!h.querySelector('.ma-swipe-hint')){
   const q=document.createElement('div');
   q.className='ma-swipe-hint';
   q.innerHTML='<b>‹</b> Свайп между автомобилями <b>›</b>';
   q.style.cssText='position:absolute;left:20px;bottom:18px;z-index:30;display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(8,10,15,.78);border:1px solid rgba(255,255,255,.08);color:#aeb6c3;font-size:11px;pointer-events:none';
   h.appendChild(q);
 }
}
function hideDuplicateGarage(){const g=document.querySelector('#topGarageMenu');if(g){g.style.display='none';g.dataset.hiddenOnHome='1'}}
function showGarageWhenData(){const g=document.querySelector('#topGarageMenu');if(g&&document.querySelector('#data')?.classList.contains('active'))g.style.display=''}
let sx=0,sy=0,down=false,last=0;
function bind(){
 const h=hero();if(!h)return;
 decorate();
 hideDuplicateGarage();
 if(h.dataset.maSwipe28==='1')return;
 h.dataset.maSwipe28='1';
 const start=(x,y)=>{sx=x;sy=y;down=true};
 const end=(x,y)=>{
   if(!down)return;down=false;
   const dx=x-sx,dy=y-sy;
   if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-last>500){last=Date.now();selectBySwipe(dx<0?1:-1)}
 };
 h.addEventListener('touchstart',e=>{if(e.touches.length===1)start(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});
 h.addEventListener('touchend',e=>{const t=e.changedTouches[0];end(t.clientX,t.clientY)},{passive:true});
 h.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start(e.clientX,e.clientY)},{passive:true});
 h.addEventListener('pointerup',e=>{if(e.pointerType==='touch')end(e.clientX,e.clientY)},{passive:true});
}
function run(){
 const h=hero();
 if(h){decorate();bind()}
 const dataView=document.querySelector('#data');
 if(dataView?.classList.contains('active'))showGarageWhenData();else hideDuplicateGarage();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>setTimeout(run,40)).observe(document.documentElement,{childList:true,subtree:true});
setInterval(run,1000);
})();
