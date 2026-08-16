// RECOVERY_BOOT_V23 — premium glass quick actions + bottom navigation + dashboard swipe
(function(){
  function loadCore(){
    if(document.querySelector('script[data-registration-core]')){installFix();return;}
    const s=document.createElement('script');s.src='./registration-core.js?v=23';s.dataset.registrationCore='1';s.onload=installFix;s.onerror=installFix;document.head.appendChild(s);
  }
  function installFix(){
    const style=document.createElement('style');
    style.id='premium-glass-v23';
    style.textContent=`
      .hero-car{position:relative!important;touch-action:pan-y!important;user-select:none;-webkit-user-select:none}
      .dashboard-car-count{position:absolute;top:18px;right:18px;z-index:20;font-size:11px;font-weight:800;letter-spacing:.12em;color:#f0cf91;padding:7px 10px;border-radius:999px;background:rgba(215,177,109,.09);border:1px solid rgba(215,177,109,.18)}
      .dashboard-swipe-hint{position:absolute;left:20px;bottom:18px;z-index:20;display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(8,10,15,.72);border:1px solid rgba(255,255,255,.08);color:#aeb6c3;font-size:11px;pointer-events:none}
      .dashboard-swipe-hint b{color:#f0cf91}.dashboard-car-link{display:inline-flex!important;width:auto!important;margin-top:12px!important;padding:10px 13px!important}.quick[data-dashboard-car-removed="1"]{display:none!important}
      .quick-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;margin:0 0 10px!important}
      .quick-grid .quick{position:relative!important;display:block!important;min-height:150px!important;width:100%!important;margin:0!important;padding:19px!important;overflow:hidden!important;isolation:isolate!important;text-align:left!important;border-radius:24px!important;cursor:pointer!important;color:#f7f8fb!important;background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.055) 46%,rgba(255,255,255,.025))!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 -1px 0 rgba(0,0,0,.3),0 18px 42px rgba(0,0,0,.32)!important;backdrop-filter:blur(26px) saturate(145%)!important;-webkit-backdrop-filter:blur(26px) saturate(145%)!important;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important}
      .quick-grid .quick:before{content:""!important;position:absolute!important;left:-25px!important;top:-45px!important;width:180px!important;height:130px!important;border-radius:50%!important;background:radial-gradient(circle,rgba(240,207,145,.2),transparent 68%)!important;filter:blur(8px)!important;pointer-events:none!important;z-index:-1!important}
      .quick-grid .quick:after{content:""!important;position:absolute!important;inset:1px!important;border-radius:23px!important;background:linear-gradient(120deg,rgba(255,255,255,.09),transparent 38%,rgba(240,207,145,.025))!important;pointer-events:none!important;z-index:-1!important}
      .quick-grid .quick:hover{transform:translateY(-2px)!important;border-color:rgba(240,207,145,.38)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.19),0 24px 52px rgba(0,0,0,.38)!important}
      .quick-grid .quick:active{transform:scale(.985)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 9px 24px rgba(0,0,0,.3)!important}
      .quick-grid .quick .qicon{position:relative!important;z-index:2!important;width:46px!important;height:46px!important;margin:0!important;display:grid!important;place-items:center!important;border-radius:15px!important;background:linear-gradient(145deg,rgba(240,207,145,.2),rgba(255,255,255,.055))!important;border:1px solid rgba(240,207,145,.2)!important;color:#f0cf91!important;font-size:20px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.13),0 8px 20px rgba(0,0,0,.2)!important}
      .quick-grid .quick strong{position:relative!important;z-index:2!important;display:block!important;margin:14px 0 0!important;font-size:16px!important;line-height:1.15!important;letter-spacing:-.025em!important;color:#f7f8fb!important}.quick-grid .quick small{position:relative!important;z-index:2!important;display:block!important;margin:6px 0 0!important;font-size:12px!important;line-height:1.3!important;color:#9fa9b8!important}

      /* V23 PREMIUM BOTTOM NAVIGATION */
      body{padding-bottom:96px!important}
      nav.main-top-nav{display:none!important}
      #premiumBottomNav{position:fixed!important;left:12px!important;right:12px!important;bottom:max(12px,env(safe-area-inset-bottom))!important;z-index:9998!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:5px!important;padding:7px!important;border-radius:22px!important;background:rgba(18,22,29,.78)!important;border:1px solid rgba(255,255,255,.13)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 18px 55px rgba(0,0,0,.48)!important;backdrop-filter:blur(28px) saturate(145%)!important;-webkit-backdrop-filter:blur(28px) saturate(145%)!important}
      #premiumBottomNav button{position:relative!important;width:100%!important;min-width:0!important;min-height:56px!important;margin:0!important;padding:7px 2px 6px!important;border:1px solid transparent!important;border-radius:16px!important;background:transparent!important;color:#7f8998!important;box-shadow:none!important;font-size:11px!important;font-weight:700!important;letter-spacing:-.01em!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;white-space:nowrap!important}
      #premiumBottomNav button .bn-icon{font-size:18px!important;line-height:18px!important;filter:drop-shadow(0 2px 5px rgba(0,0,0,.2))}
      #premiumBottomNav button.active{color:#f0cf91!important;background:linear-gradient(145deg,rgba(240,207,145,.14),rgba(240,207,145,.045))!important;border-color:rgba(240,207,145,.16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 5px 16px rgba(0,0,0,.16)!important}
      #premiumBottomNav button:active{transform:scale(.96)!important}
      @media(max-width:600px){.quick-grid{gap:10px!important}.quick-grid .quick{min-height:142px!important;padding:17px!important;border-radius:22px!important}.quick-grid .quick:after{border-radius:21px!important}.quick-grid .quick .qicon{width:44px!important;height:44px!important}.quick-grid .quick strong{font-size:15px!important}#premiumBottomNav{left:8px!important;right:8px!important;border-radius:20px!important;padding:6px!important}#premiumBottomNav button{min-height:54px!important;font-size:10px!important}}
    `;
    if(!document.getElementById('premium-glass-v23'))document.head.appendChild(style);

    const navButtons=()=>[...document.querySelectorAll('nav button')];
    const navTo=(text)=>{const b=navButtons().find(x=>x.textContent.trim()===text);if(b){b.click();return true}return false};
    function buildBottomNav(){
      let bar=document.getElementById('premiumBottomNav');
      if(!bar){bar=document.createElement('div');bar.id='premiumBottomNav';bar.setAttribute('role','navigation');bar.setAttribute('aria-label','Основная навигация');document.body.appendChild(bar)}
      const items=[['⌂','Главная'],['🔧','ТО'],['⛽','Топливо'],['◉','Шины'],['▣','Данные']];
      const originals=navButtons();
      bar.innerHTML='';
      items.forEach(([icon,text],i)=>{
        const b=document.createElement('button');b.type='button';b.dataset.target=text;b.innerHTML='<span class="bn-icon">'+icon+'</span><span>'+text+'</span>';
        b.onclick=()=>{const original=navButtons().find(x=>x.textContent.trim()===text);if(original)original.click();setTimeout(syncBottomNav,30)};
        bar.appendChild(b);
      });
      syncBottomNav();
    }
    function syncBottomNav(){const bar=document.getElementById('premiumBottomNav');if(!bar)return;const active=navButtons().find(x=>x.classList.contains('active'));const target=active?.textContent.trim()||'Главная';bar.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.target===target))}
    function home(){return navButtons().find(x=>x.classList.contains('active'))?.textContent.trim()==='Главная'}
    function hero(){return document.querySelector('.hero-car')}
    function carItems(){return [...document.querySelectorAll('.item')].filter(x=>/Выбрать|ОСНОВНАЯ/.test(x.textContent||'')&&!/Редактировать/.test(x.textContent||''))}
    function currentIndex(items){const i=items.findIndex(x=>/ОСНОВНАЯ/.test(x.textContent||''));return i>=0?i:0}
    function switchBySwipe(dir){if(!home())return;const h=hero();if(!h)return;navTo('Данные');setTimeout(()=>{const items=carItems();if(items.length<2){navTo('Главная');return}const cur=currentIndex(items);const next=(cur+(dir>0?1:-1)+items.length)%items.length;const btn=items[next].querySelector('button:not(.danger)')||[...items[next].querySelectorAll('button')].find(b=>b.textContent.trim()==='Выбрать');if(btn)btn.click();setTimeout(()=>navTo('Главная'),220)},80)}
    function optimize(){
      buildBottomNav();
      const h=hero();if(!h)return;
      if(!h.querySelector('.dashboard-car-count')){const c=document.createElement('span');c.className='dashboard-car-count';c.textContent='АВТО';h.appendChild(c)}
      if(!h.querySelector('.dashboard-swipe-hint')){const hint=document.createElement('div');hint.className='dashboard-swipe-hint';hint.innerHTML='<b>‹</b> Свайп между автомобилями <b>›</b>';h.appendChild(hint)}
      if(!h.querySelector('.dashboard-car-link')){const b=document.createElement('button');b.type='button';b.className='dashboard-car-link secondary';b.textContent='Автомобили →';b.onclick=()=>navTo('Данные');h.appendChild(b)}
      document.querySelectorAll('.quick').forEach(q=>{const t=(q.textContent||'').replace(/\s+/g,' ').trim();if(t.includes('Автомобиль')&&t.includes('Профиль и автомобили'))q.dataset.dashboardCarRemoved='1'});
      syncBottomNav();
      if(h.dataset.swipeV23==='1')return;h.dataset.swipeV23='1';
      let sx=0,sy=0,active=false;const start=(x,y)=>{sx=x;sy=y;active=true};const end=(x,y)=>{if(!active)return;active=false;const dx=x-sx,dy=y-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15)switchBySwipe(dx)};
      h.addEventListener('touchstart',e=>{if(e.touches.length===1)start(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});h.addEventListener('touchend',e=>{const t=e.changedTouches[0];end(t.clientX,t.clientY)},{passive:true});h.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start(e.clientX,e.clientY)},{passive:true});h.addEventListener('pointerup',e=>{if(e.pointerType==='touch')end(e.clientX,e.clientY)},{passive:true})
    }
    const run=()=>setTimeout(optimize,250);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();new MutationObserver(()=>setTimeout(optimize,50)).observe(document.body,{childList:true,subtree:true});setInterval(optimize,1500);
  }
  loadCore();
})();
