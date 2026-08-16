(function(){
'use strict';
const log=(...a)=>console.log('[MoyAuto swipe v22]',...a);
function text(el){return (el?.textContent||'').replace(/\s+/g,' ').trim()}
function navButton(name){return [...document.querySelectorAll('nav button, nav [role="button"]')].find(b=>text(b)===name)}
function home(){const b=navButton('Главная'); if(b && !b.classList.contains('active')) b.click()}
function data(){const b=navButton('Данные'); if(b) {b.click();return true} return false}
function hero(){return document.querySelector('.hero-car') || document.querySelector('#premiumHero') || [...document.querySelectorAll('.card')].find(x=>/Премиум|Мой автомобиль|До ближайшего регламента/.test(text(x)))}
function carRows(){
 return [...document.querySelectorAll('.item, .car-item, [data-car-id]')].filter(x=>{
   const t=text(x); return /Выбрать/.test(t) && !/Редактировать/.test(t);
 });
}
function currentRow(rows){return rows.findIndex(x=>/ОСНОВНАЯ/.test(text(x)))}
function selectNext(dir){
 if(!navButton('Главная') || !document.querySelector('nav')) return;
 const h=hero(); if(!h) return;
 if(!data()) return;
 setTimeout(()=>{
   const rows=carRows();
   if(rows.length<2){home();return}
   let cur=currentRow(rows);
   if(cur<0){cur=0}
   const next=(cur+(dir>0?1:-1)+rows.length)%rows.length;
   const buttons=[...rows[next].querySelectorAll('button')];
   const btn=buttons.find(b=>text(b)==='Выбрать') || buttons.find(b=>/Выбрать/.test(text(b)));
   if(btn){btn.click();log('selected',text(rows[next]));}
   setTimeout(home,250);
 },100);
}
function decorate(){
 const h=hero(); if(!h) return;
 h.style.position='relative'; h.style.touchAction='pan-y'; h.style.webkitUserSelect='none'; h.style.userSelect='none';
 if(!h.querySelector('.ma-swipe-count')){const c=document.createElement('span');c.className='ma-swipe-count';c.textContent='СВАЙП';h.appendChild(c)}
 if(!h.querySelector('.ma-swipe-hint')){const q=document.createElement('div');q.className='ma-swipe-hint';q.innerHTML='<b>‹</b> свайп между автомобилями <b>›</b>';h.appendChild(q)}
}
let sx=0,sy=0,down=false,last=0;
function bind(){
 const h=hero(); if(!h || h.dataset.maSwipe22) return;
 h.dataset.maSwipe22='1'; decorate();
 h.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;down=true;},{passive:true});
 h.addEventListener('touchend',e=>{if(!down)return;down=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-last>700){last=Date.now();selectNext(dx<0?1:-1)}},{passive:true});
 h.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;sx=e.clientX;sy=e.clientY;down=true},{passive:true});
 h.addEventListener('pointerup',e=>{if(e.pointerType!=='touch'||!down)return;down=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-last>700){last=Date.now();selectNext(dx<0?1:-1)}},{passive:true});
 log('bound to hero',h);
}
function run(){decorate();bind()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>{if(document.querySelector('nav'))setTimeout(run,30)}).observe(document.documentElement,{childList:true,subtree:true});
setInterval(run,1000);
})();
