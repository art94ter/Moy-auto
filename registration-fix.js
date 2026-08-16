// PREMIUM NAV V29 — single compact bottom navigation + clean premium home
(function(){
  'use strict';
  const STYLE_ID='premium-nav-v29-style';

  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      /* Remove the old top navigation completely. */
      #appShell>main>nav{display:none!important}
      body{padding-bottom:104px!important}

      /* Compact premium glass bottom navigation. */
      #premiumBottomNav{
        position:fixed!important;left:12px!important;right:12px!important;
        bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;
        width:auto!important;height:68px!important;min-height:68px!important;max-height:68px!important;
        margin:0!important;padding:6px!important;display:grid!important;
        grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;gap:5px!important;
        overflow:hidden!important;box-sizing:border-box!important;border-radius:24px!important;
        background:linear-gradient(145deg,rgba(30,36,47,.86),rgba(8,11,17,.82))!important;
        border:1px solid rgba(255,255,255,.16)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.15),inset 0 -1px 0 rgba(0,0,0,.4),0 18px 48px rgba(0,0,0,.5),0 0 28px rgba(215,177,109,.08)!important;
        backdrop-filter:blur(28px) saturate(160%)!important;-webkit-backdrop-filter:blur(28px) saturate(160%)!important;
        z-index:2147483647!important;pointer-events:auto!important;touch-action:manipulation!important;
      }
      #premiumBottomNav button{
        position:relative!important;z-index:1!important;width:100%!important;height:54px!important;
        min-width:0!important;min-height:54px!important;max-height:54px!important;margin:0!important;padding:4px 2px!important;
        display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;
        box-sizing:border-box!important;border:1px solid transparent!important;border-radius:17px!important;
        background:rgba(255,255,255,.025)!important;color:#929cab!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.045)!important;
        font:700 10px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important;cursor:pointer!important;
        pointer-events:auto!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important;appearance:none!important;
      }
      #premiumBottomNav button .bn-icon{font-size:19px!important;line-height:19px!important}
      #premiumBottomNav button.active{
        color:#f1cf91!important;background:linear-gradient(145deg,rgba(240,207,145,.20),rgba(215,177,109,.055))!important;
        border-color:rgba(240,207,145,.30)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 5px 18px rgba(215,177,109,.10)!important
      }
      #premiumBottomNav button:active{transform:scale(.95)!important}

      /* The home screen has one source of truth: the hero car card. */
      .moy-auto-duplicate-hidden{display:none!important}

      /* Make the main hero feel like the reference premium glass card. */
      .hero-car{
        background:linear-gradient(145deg,rgba(255,255,255,.085),rgba(255,255,255,.018) 52%,rgba(255,255,255,.01))!important;
        border:1px solid rgba(255,255,255,.13)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 24px 70px rgba(0,0,0,.36)!important;
        backdrop-filter:blur(20px) saturate(125%)!important;-webkit-backdrop-filter:blur(20px) saturate(125%)!important;
      }
      .premium-stat{
        background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025))!important;
        border-color:rgba(255,255,255,.11)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 12px 30px rgba(0,0,0,.20)!important;
        backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;
      }
      .quick{backdrop-filter:blur(22px) saturate(130%)!important;-webkit-backdrop-filter:blur(22px) saturate(130%)!important}

      @media(max-width:600px){
        #premiumBottomNav{left:10px!important;right:10px!important;bottom:calc(9px + env(safe-area-inset-bottom,0px))!important;height:66px!important;min-height:66px!important;max-height:66px!important;border-radius:23px!important}
        #premiumBottomNav button{height:52px!important;min-height:52px!important;max-height:52px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function textOf(el){return (el?.innerText||el?.textContent||'').replace(/\\s+/g,' ').trim()}

  function hideCardContaining(match, options){
    const root=document.getElementById('home')||document.querySelector('.view.active')||document.body;
    const nodes=[...root.querySelectorAll('.card,section,article,div')];
    for(const node of nodes){
      const text=textOf(node);
      if(!match.test(text)) continue;
      if(options && options.exclude && options.exclude.test(text)) continue;
      const rect=node.getBoundingClientRect();
      if(rect.width<250 || rect.height<60) continue;
      let target=node;
      /* Prefer the nearest reasonably sized card/section instead of a tiny child. */
      let parent=node.parentElement;
      while(parent && parent!==root && parent.getBoundingClientRect().width>=250 && parent.getBoundingClientRect().height<700){
        const pt=textOf(parent);
        if(options && options.stop && options.stop.test(pt)) break;
        if((parent.classList.contains('card')||parent.tagName==='SECTION'||parent.tagName==='ARTICLE')) target=parent;
        parent=parent.parentElement;
      }
      target.classList.add('moy-auto-duplicate-hidden');
      return true;
    }
    return false;
  }

  function cleanHome(){
    const home=document.getElementById('home');
    if(!home) return;

    /* Hide the separate car-management selector panel on Home.
       The garage remains available through the "Автомобили" action/data screen. */
    hideCardContaining(/Мои автомобили\s+Переключайся между автомобилями/i,{exclude:/Мой автомобиль/i});

    /* Hide the old duplicate car summary block, but NEVER hide the premium hero card. */
    hideCardContaining(/Автомобиль\s*→/i,{exclude:/MY AUTO|PREMIUM GARAGE|До ближайшего регламента/i});

    /* Older versions sometimes render a second car/profile card with both
       "Автомобиль" and "Пробег". Keep the first hero-car only. */
    const heroes=[...home.querySelectorAll('.hero-car')];
    if(heroes.length>1) heroes.slice(1).forEach(x=>x.classList.add('moy-auto-duplicate-hidden'));
  }

  function installNav(){
    let bar=document.getElementById('premiumBottomNav');
    if(!bar){
      bar=document.createElement('nav');
      bar.id='premiumBottomNav';
      bar.setAttribute('aria-label','Основная навигация');
      document.body.appendChild(bar);
    }
    const items=[['⌂','Главная','home'],['🔧','ТО','service'],['⛽','Топливо','fuel'],['◉','Шины','tires'],['▣','Данные','data']];
    if(bar.dataset.v29!=='1'){
      bar.dataset.v29='1';
      bar.innerHTML='';
      items.forEach(([icon,label,target],i)=>{
        const b=document.createElement('button');
        b.type='button';b.dataset.target=target;
        b.innerHTML='<span class="bn-icon">'+icon+'</span><span>'+label+'</span>';
        const activate=e=>{e.preventDefault();e.stopPropagation();go(target,i)};
        b.addEventListener('touchend',activate,{passive:false});
        b.addEventListener('click',activate,{passive:false});
        bar.appendChild(b);
      });
    }
    sync();
  }

  function go(target,index){
    const original=document.querySelector('#appShell>main>nav button:nth-child('+(index+1)+')');
    if(typeof window.tab==='function') window.tab(target,original||document.querySelector('nav button'));
    else{
      document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
      const v=document.getElementById(target);if(v)v.classList.add('active');
    }
    cleanHome();sync();window.scrollTo({top:0,behavior:'smooth'});
  }

  function sync(){
    const bar=document.getElementById('premiumBottomNav');if(!bar)return;
    const views=[...document.querySelectorAll('.view')];
    let idx=views.findIndex(v=>v.classList.contains('active'));if(idx<0)idx=0;
    bar.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===idx));
  }

  function boot(){
    installStyle();installNav();cleanHome();
    setTimeout(cleanHome,250);setTimeout(cleanHome,700);setTimeout(cleanHome,1500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(()=>{cleanHome();sync()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
