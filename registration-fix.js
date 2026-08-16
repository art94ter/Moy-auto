// MOY AUTO — MOBILE PREMIUM LAYOUT V31
(function(){
  'use strict';
  if (window.__MOY_AUTO_LAYOUT_V31__) return;
  window.__MOY_AUTO_LAYOUT_V31__ = true;

  const NAV_ID = 'moyPremiumBottomNav';
  const STYLE_ID = 'moyPremiumV31Style';

  function txt(el){
    return ((el && (el.innerText || el.textContent)) || '').replace(/\s+/g,' ').trim();
  }

  function addStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      html,body{width:100%;max-width:100%;overflow-x:hidden!important}
      body{padding-bottom:0!important}
      main{width:100%!important;max-width:820px!important;margin:0 auto!important;padding:0 12px 170px!important}

      /* There must be only one navigation bar. */
      body>nav:not(#${NAV_ID}),main>nav,#appShell>nav{display:none!important}
      #${NAV_ID}{
        position:fixed!important;
        left:50%!important;
        right:auto!important;
        top:auto!important;
        bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;
        transform:translateX(-50%)!important;
        width:min(820px,calc(100vw - 18px))!important;
        height:68px!important;
        margin:0!important;
        padding:6px!important;
        display:grid!important;
        grid-template-columns:repeat(5,minmax(0,1fr))!important;
        gap:5px!important;
        overflow:hidden!important;
        box-sizing:border-box!important;
        z-index:2147483647!important;
        border:1px solid rgba(255,255,255,.16)!important;
        border-radius:23px!important;
        background:linear-gradient(145deg,rgba(33,38,47,.90),rgba(11,14,20,.88))!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 20px 55px rgba(0,0,0,.55)!important;
        backdrop-filter:blur(28px) saturate(150%)!important;
        -webkit-backdrop-filter:blur(28px) saturate(150%)!important;
        pointer-events:auto!important;
        touch-action:manipulation!important;
      }
      #${NAV_ID} button{
        width:100%!important;
        min-width:0!important;
        height:54px!important;
        min-height:54px!important;
        margin:0!important;
        padding:4px 1px!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        gap:3px!important;
        overflow:hidden!important;
        border:1px solid transparent!important;
        border-radius:17px!important;
        background:rgba(255,255,255,.025)!important;
        color:#929cab!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important;
        font:700 10px/1.05 -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important;
        pointer-events:auto!important;
        touch-action:manipulation!important;
        -webkit-tap-highlight-color:transparent!important;
        appearance:none!important;
      }
      #${NAV_ID} .moy-nav-icon{font-size:19px!important;line-height:19px!important}
      #${NAV_ID} button.active{
        color:#f1cf91!important;
        background:linear-gradient(145deg,rgba(240,207,145,.20),rgba(215,177,109,.055))!important;
        border-color:rgba(240,207,145,.30)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.11),0 7px 20px rgba(216,179,110,.08)!important;
      }
      #${NAV_ID} button:active{transform:scale(.96)!important}

      /* Remove the duplicate garage/car panels from the Home screen. */
      #topGarageMenu{display:none!important}
      #home .moy-home-duplicate{display:none!important}
      #home .moy-home-garage{display:none!important}

      /* Keep the single premium hero as the main vehicle block. */
      #premiumHero{margin-top:14px!important}

      /* Make quick actions fit cleanly on phones. */
      .quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
      .quick{min-width:0!important;min-height:145px!important}

      @media(max-width:600px){
        main{padding-left:10px!important;padding-right:10px!important;padding-bottom:150px!important}
        #${NAV_ID}{width:calc(100vw - 16px)!important;height:66px!important;border-radius:21px!important}
        #${NAV_ID} button{height:52px!important;min-height:52px!important;font-size:10px!important}
        #${NAV_ID} .moy-nav-icon{font-size:18px!important}
        .hero-car{margin-top:12px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function hideDuplicateHomeBlocks(){
    const home=document.getElementById('home');
    if(!home) return;

    // Remove the old in-home garage selector if a previous version duplicated it.
    home.querySelectorAll('.card,.tile').forEach(function(el){
      const t=txt(el);
      if(!t) return;
      if(/Мои автомобили/.test(t) && /Переключайся между автомобилями|ГАРАЖ|Добавить автомобиль|Удалить текущий/.test(t)){
        el.classList.add('moy-home-garage');
      }
      // The old dashboard vehicle card has both the vehicle label and mileage.
      if(/Автомобиль/.test(t) && /Пробег/.test(t) && /км/.test(t) && !el.id.includes('premiumHero')){
        el.classList.add('moy-home-duplicate');
      }
    });

    const top=document.getElementById('topGarageMenu');
    if(top) top.style.setProperty('display','none','important');
  }

  function setActive(index){
    const bar=document.getElementById(NAV_ID);
    if(!bar) return;
    bar.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===index));
  }

  function navigate(target,index){
    const original=document.querySelector('body>main nav button:nth-child('+(index+1)+')') || document.querySelector('main>nav button:nth-child('+(index+1)+')');
    try{
      if(typeof window.tab==='function') window.tab(target,original);
      else{
        document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
        const view=document.getElementById(target);
        if(view) view.classList.add('active');
      }
    }catch(e){
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      const view=document.getElementById(target);
      if(view) view.classList.add('active');
    }
    setActive(index);
    hideDuplicateHomeBlocks();
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(function(){setActive(index);hideDuplicateHomeBlocks();},60);
  }

  function buildNav(){
    let bar=document.getElementById(NAV_ID);
    if(!bar){
      bar=document.createElement('nav');
      bar.id=NAV_ID;
      bar.setAttribute('aria-label','Основная навигация');
      document.body.appendChild(bar);
    }
    if(bar.dataset.v31==='1') return;
    bar.dataset.v31='1';
    bar.innerHTML='';
    [
      ['⌂','Главная','home'],
      ['🔧','ТО','service'],
      ['⛽','Топливо','fuel'],
      ['◉','Шины','tires'],
      ['▣','Данные','data']
    ].forEach(function(item,index){
      const b=document.createElement('button');
      b.type='button';
      b.innerHTML='<span class="moy-nav-icon">'+item[0]+'</span><span>'+item[1]+'</span>';
      const action=function(e){
        if(e){e.preventDefault();e.stopPropagation();}
        navigate(item[2],index);
      };
      b.addEventListener('click',action);
      b.addEventListener('touchend',action,{passive:false});
      bar.appendChild(b);
    });
  }

  function sync(){
    const views=[...document.querySelectorAll('.view')];
    const active=views.findIndex(v=>v.classList.contains('active'));
    setActive(active<0?0:Math.min(active,4));
    hideDuplicateHomeBlocks();
  }

  function boot(){
    try{
      addStyle();
      buildNav();
      sync();
      setTimeout(sync,250);
      setTimeout(sync,1000);
    }catch(e){console.warn('Moy Auto V31:',e)}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();

  // Re-apply only when the app changes the active view; do not mutate layout continuously.
  const observer=new MutationObserver(function(mutations){
    let relevant=false;
    mutations.forEach(function(m){
      if(m.type==='attributes' && m.attributeName==='class' && m.target.classList && m.target.classList.contains('view')) relevant=true;
    });
    if(relevant) sync();
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',function(){addStyle();});
})();
