// PREMIUM NAV V28 — compact glass bottom navigation
(function(){
  'use strict';
  const STYLE_ID='premium-nav-v28-style';

  function install(){
    if(!document.getElementById(STYLE_ID)){
      const s=document.createElement('style');
      s.id=STYLE_ID;
      s.textContent=`
        #appShell>main>nav{display:none!important}
        body{padding-bottom:105px!important}
        #premiumBottomNav{
          position:fixed!important;left:12px!important;right:12px!important;
          bottom:calc(12px + env(safe-area-inset-bottom,0px))!important;
          width:auto!important;height:68px!important;min-height:68px!important;max-height:68px!important;
          margin:0!important;padding:6px!important;display:grid!important;
          grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;gap:5px!important;
          overflow:hidden!important;box-sizing:border-box!important;border-radius:23px!important;
          background:linear-gradient(145deg,rgba(35,41,52,.82),rgba(10,13,19,.76))!important;
          border:1px solid rgba(255,255,255,.16)!important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.14),inset 0 -1px 0 rgba(0,0,0,.38),0 18px 48px rgba(0,0,0,.48),0 0 24px rgba(215,177,109,.07)!important;
          backdrop-filter:blur(26px) saturate(155%)!important;-webkit-backdrop-filter:blur(26px) saturate(155%)!important;
          z-index:2147483647!important;pointer-events:auto!important;touch-action:manipulation!important;
        }
        #premiumBottomNav button{
          position:relative!important;z-index:1!important;width:100%!important;height:54px!important;
          min-width:0!important;min-height:54px!important;max-height:54px!important;margin:0!important;padding:5px 2px!important;
          display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;
          box-sizing:border-box!important;border:1px solid transparent!important;border-radius:17px!important;
          background:rgba(255,255,255,.025)!important;color:#929cab!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.045)!important;
          font:700 10px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important;cursor:pointer!important;
          pointer-events:auto!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important;appearance:none!important;
          transition:transform .16s ease,background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease!important;
        }
        #premiumBottomNav button .bn-icon{font-size:19px!important;line-height:19px!important}
        #premiumBottomNav button.active{color:#f1cf91!important;background:linear-gradient(145deg,rgba(240,207,145,.20),rgba(215,177,109,.055))!important;border-color:rgba(240,207,145,.30)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 5px 18px rgba(215,177,109,.10)!important}
        #premiumBottomNav button:active{transform:scale(.95)!important}
        @media(max-width:600px){#premiumBottomNav{left:10px!important;right:10px!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;height:66px!important;min-height:66px!important;max-height:66px!important;border-radius:22px!important}#premiumBottomNav button{height:52px!important;min-height:52px!important;max-height:52px!important}}
      `;
      document.head.appendChild(s);
    }
    let bar=document.getElementById('premiumBottomNav');
    if(!bar){bar=document.createElement('nav');bar.id='premiumBottomNav';bar.setAttribute('aria-label','Основная навигация');document.body.appendChild(bar)}
    const items=[['⌂','Главная','home'],['🔧','ТО','service'],['⛽','Топливо','fuel'],['◉','Шины','tires'],['▣','Данные','data']];
    if(bar.dataset.v28!=='1'){
      bar.dataset.v28='1';bar.innerHTML='';
      items.forEach(([icon,label,target],i)=>{
        const b=document.createElement('button');b.type='button';b.dataset.target=target;b.innerHTML='<span class="bn-icon">'+icon+'</span><span>'+label+'</span>';
        const activate=e=>{e.preventDefault();e.stopPropagation();go(target,i)};
        b.addEventListener('touchend',activate,{passive:false});b.addEventListener('click',activate,{passive:false});bar.appendChild(b);
      });
    }
    sync();
  }
  function go(target,index){
    const original=document.querySelector('#appShell>main>nav button:nth-child('+(index+1)+')');
    if(typeof window.tab==='function')window.tab(target,original||document.querySelector('nav button'));
    else{document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));const v=document.getElementById(target);if(v)v.classList.add('active')}
    sync();window.scrollTo({top:0,behavior:'smooth'});
  }
  function sync(){const bar=document.getElementById('premiumBottomNav');if(!bar)return;const views=[...document.querySelectorAll('.view')];let idx=views.findIndex(v=>v.classList.contains('active'));if(idx<0)idx=0;bar.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===idx))}
  function boot(){install();setTimeout(install,300);setTimeout(install,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(sync).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
