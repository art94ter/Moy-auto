(function(){
'use strict';
// V27 — compact premium glass bottom navigation, safe on iPhone/Safari.
const log=(...a)=>console.log('[MoyAuto swipe v27]',...a);
const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
function navButton(name){return [...document.querySelectorAll('nav button')].find(b=>txt(b)===name)}
function hero(){return document.querySelector('#premiumHero')||document.querySelector('.hero-car')}
function home(){const b=navButton('Главная');if(b&&!b.classList.contains('active'))b.click()}
function realCarSelect(){return document.querySelector('#carSelect')}
function selectBySwipe(dir){
 const sel=realCarSelect();
 if(!sel||sel.options.length<2){log('not enough cars',sel?.options?.length);return}
 const n=sel.options.length,cur=Math.max(0,sel.selectedIndex),next=(cur+(dir>0?1:-1)+n)%n;
 sel.selectedIndex=next;sel.dispatchEvent(new Event('change',{bubbles:true}));
 setTimeout(home,180);
}
function decorate(){
 const h=hero();if(!h)return;
 h.style.position='relative';h.style.touchAction='pan-y';h.style.webkitUserSelect='none';h.style.userSelect='none';
 if(!h.querySelector('.ma-swipe-hint')){const q=document.createElement('div');q.className='ma-swipe-hint';q.innerHTML='<b>‹</b> Свайп между автомобилями <b>›</b>';q.style.cssText='position:absolute;left:20px;bottom:18px;z-index:30;display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(8,10,15,.78);border:1px solid rgba(255,255,255,.08);color:#aeb6c3;font-size:11px;pointer-events:none';h.appendChild(q)}
}
function premiumGlassNav(){
 const nav=document.querySelector('nav');if(!nav)return;
 nav.dataset.premiumGlass='1';
 nav.style.cssText += ';position:fixed!important;inset:auto 14px calc(10px + env(safe-area-inset-bottom)) 14px!important;transform:none!important;width:auto!important;max-width:none!important;height:72px!important;min-height:72px!important;max-height:72px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:5px!important;padding:6px!important;margin:0!important;border-radius:24px!important;background:linear-gradient(145deg,rgba(31,36,46,.82),rgba(9,12,18,.74))!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),inset 0 -1px 0 rgba(0,0,0,.35),0 18px 55px rgba(0,0,0,.5),0 0 28px rgba(215,177,109,.08)!important;backdrop-filter:blur(28px) saturate(150%)!important;-webkit-backdrop-filter:blur(28px) saturate(150%)!important;z-index:10000!important;overflow:hidden!important;';
 [...nav.querySelectorAll('button')].forEach(b=>{
  b.style.cssText += ';position:relative!important;flex:1 1 0!important;min-width:0!important;width:auto!important;height:58px!important;min-height:58px!important;max-height:58px!important;margin:0!important;padding:6px 4px!important;border:1px solid transparent!important;border-radius:17px!important;background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.015))!important;color:#8993a3!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.045)!important;font-size:12px!important;font-weight:700!important;line-height:1.1!important;transition:transform .18s ease,background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important;';
  if(b.classList.contains('active'))b.style.cssText += ';color:#f5d28f!important;background:linear-gradient(145deg,rgba(240,207,145,.22),rgba(215,177,109,.075))!important;border-color:rgba(240,207,145,.38)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 6px 22px rgba(215,177,109,.13),0 0 18px rgba(215,177,109,.08)!important;';
  if(!b.dataset.glassBound){b.dataset.glassBound='1';b.addEventListener('touchstart',()=>{b.style.transform='scale(.94)'},{passive:true});b.addEventListener('touchend',()=>{b.style.transform='scale(1)'},{passive:true});b.addEventListener('touchcancel',()=>{b.style.transform='scale(1)'},{passive:true});}
 });
 document.querySelector('main')?.style.setProperty('padding-bottom','calc(96px + env(safe-area-inset-bottom))','important');
}
function hideDuplicateGarage(){const g=document.querySelector('#topGarageMenu');if(g){g.style.display='none';g.dataset.hiddenOnHome='1'}}
function showGarageWhenData(){const g=document.querySelector('#topGarageMenu');if(g&&document.querySelector('#data')?.classList.contains('active'))g.style.display=''}
let sx=0,sy=0,down=false,last=0;
function bind(){
 const h=hero();if(!h)return;decorate();hideDuplicateGarage();
 if(h.dataset.maSwipe27==='1')return;h.dataset.maSwipe27='1';
 const start=(x,y)=>{sx=x;sy=y;down=true};
 const end=(x,y)=>{if(!down)return;down=false;const dx=x-sx,dy=y-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-last>500){last=Date.now();selectBySwipe(dx<0?1:-1)}};
 h.addEventListener('touchstart',e=>{if(e.touches.length===1)start(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});
 h.addEventListener('touchend',e=>{const t=e.changedTouches[0];end(t.clientX,t.clientY)},{passive:true});
 h.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start(e.clientX,e.clientY)},{passive:true});
 h.addEventListener('pointerup',e=>{if(e.pointerType==='touch')end(e.clientX,e.clientY)},{passive:true});
}
function run(){const h=hero();if(h){decorate();bind()}premiumGlassNav();const dataView=document.querySelector('#data');if(dataView?.classList.contains('active'))showGarageWhenData();else hideDuplicateGarage()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>setTimeout(run,40)).observe(document.documentElement,{childList:true,subtree:true});
setInterval(run,1000);
})();
