// MOY AUTO — HOME LAYOUT V30
(function(){
  'use strict';
  if(window.__MOY_AUTO_LAYOUT_V30__) return;
  window.__MOY_AUTO_LAYOUT_V30__=true;
  const STYLE_ID='moy-auto-layout-v30';
  const NAV_ID='premiumBottomNav';

  function text(el){ return (el && (el.innerText || el.textContent) || '').replace(/\s+/g,' ').trim(); }
  function style(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style'); s.id=STYLE_ID;
    s.textContent=`
      body{padding-bottom:96px!important}
      body>nav:not(#${NAV_ID}),main>nav,#appShell nav:not(#${NAV_ID}){display:none!important}
      #${NAV_ID}{position:fixed!important;left:10px!important;right:10px!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;width:auto!important;height:66px!important;min-height:66px!important;max-height:66px!important;margin:0!important;padding:6px!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:5px!important;align-items:stretch!important;overflow:hidden!important;box-sizing:border-box!important;border-radius:22px!important;background:linear-gradient(145deg,rgba(34,40,51,.84),rgba(9,12,18,.80))!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 18px 48px rgba(0,0,0,.52)!important;backdrop-filter:blur(26px) saturate(155%)!important;-webkit-backdrop-filter:blur(26px) saturate(155%)!important;z-index:2147483647!important;pointer-events:auto!important;touch-action:manipulation!important}
      #${NAV_ID} button{width:100%!important;height:52px!important;min-height:52px!important;max-height:52px!important;margin:0!important;padding:4px 2px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;border:1px solid transparent!important;border-radius:17px!important;background:rgba(255,255,255,.025)!important;color:#929cab!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important;font:700 10px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important;pointer-events:auto!important;touch-action:manipulation!important;appearance:none!important;-webkit-tap-highlight-color:transparent!important}
      #${NAV_ID} .bn-icon{font-size:19px!important;line-height:19px!important}
      #${NAV_ID} button.active{color:#f1cf91!important;background:linear-gradient(145deg,rgba(240,207,145,.20),rgba(215,177,109,.055))!important;border-color:rgba(240,207,145,.30)!important}
      #${NAV_ID} button:active{transform:scale(.95)!important}
      .moy-hidden-duplicate{display:none!important}
    `;
    document.head.appendChild(s);
  }
  function nearestCard(el){let n=el;for(let i=0;i<7&&n;i++,n=n.parentElement){if(n.classList&&(n.classList.contains('card')||n.classList.contains('item')||n.tagName==='SECTION'))return n}return el.parentElement||el}
  function cleanHome(){
    const active=document.querySelector('.view.active')||document.body;
    [...active.querySelectorAll('*')].forEach(el=>{
      if(el.dataset&&el.dataset.moyHidden==='1')return;
      if(el.classList&&el.classList.contains('hero-car'))return;
      const t=text(el);
      if(t.length>0&&t.length<900&&/Мои автомобили/.test(t)&&/Переключайся между автомобилями|ГАРАЖ|Добавить автомобиль/.test(t)){const box=nearestCard(el);if(box&&!box.classList.contains('hero-car')){box.classList.add('moy-hidden-duplicate');box.dataset.moyHidden='1'}}
      else if(t.length>0&&t.length<500&&/Автомобиль/.test(t)&&/Пробег/.test(t)&&/км/.test(t)){const box=nearestCard(el);if(box&&!box.classList.contains('hero-car')){box.classList.add('moy-hidden-duplicate');box.dataset.moyHidden='1'}}
    });
    document.querySelectorAll('nav:not(#'+NAV_ID+')').forEach(n=>n.style.setProperty('display','none','important'));
  }
  function syncNav(){const bar=document.getElementById(NAV_ID);if(!bar)return;const views=[...document.querySelectorAll('.view')];let idx=views.findIndex(v=>v.classList.contains('active'));if(idx<0)idx=0;bar.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===idx))}
  function go(target,index){const original=document.querySelector('nav:not(#'+NAV_ID+') button:nth-child('+(index+1)+')');if(typeof window.tab==='function')window.tab(target,original||null);else{document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));const v=document.getElementById(target);if(v)v.classList.add('active')}setTimeout(cleanHome,0);setTimeout(syncNav,30);window.scrollTo({top:0,behavior:'smooth'})}
  function makeNav(){let bar=document.getElementById(NAV_ID);if(!bar){bar=document.createElement('nav');bar.id=NAV_ID;bar.setAttribute('aria-label','Основная навигация');document.body.appendChild(bar)}if(bar.dataset.v30!=='1'){bar.dataset.v30='1';bar.innerHTML='';[['⌂','Главная','home'],['🔧','ТО','service'],['⛽','Топливо','fuel'],['◉','Шины','tires'],['▣','Данные','data']].forEach(([icon,label,target],i)=>{const b=document.createElement('button');b.type='button';b.dataset.target=target;b.innerHTML='<span class="bn-icon">'+icon+'</span><span>'+label+'</span>';const activate=e=>{e.preventDefault();e.stopPropagation();go(target,i)};b.addEventListener('touchend',activate,{passive:false});b.addEventListener('click',activate);bar.appendChild(b)})}syncNav()}
  function boot(){try{style();makeNav();cleanHome();setTimeout(()=>{try{style();makeNav();cleanHome()}catch(e){}},300);setTimeout(()=>{try{style();makeNav();cleanHome()}catch(e){}},1200)}catch(e){console.warn('Moy Auto layout:',e)}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
