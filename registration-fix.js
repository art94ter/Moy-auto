// RECOVERY_BOOT_V21 — main dashboard swipe for the actual current UI
(function(){
  function loadCore(){
    if(document.querySelector('script[data-registration-core]')){installFix();return;}
    const s=document.createElement('script');s.src='./registration-core.js?v=21';s.dataset.registrationCore='1';s.onload=installFix;s.onerror=installFix;document.head.appendChild(s);
  }
  function installFix(){
    const style=document.createElement('style');
    style.textContent=`.hero-car{position:relative!important;touch-action:pan-y!important;user-select:none;-webkit-user-select:none}.dashboard-car-count{position:absolute;top:18px;right:18px;z-index:20;font-size:11px;font-weight:800;letter-spacing:.12em;color:#f0cf91;padding:7px 10px;border-radius:999px;background:rgba(215,177,109,.09);border:1px solid rgba(215,177,109,.18)}.dashboard-swipe-hint{position:absolute;left:20px;bottom:18px;z-index:20;display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(8,10,15,.72);border:1px solid rgba(255,255,255,.08);color:#aeb6c3;font-size:11px;pointer-events:none}.dashboard-swipe-hint b{color:#f0cf91}.dashboard-car-link{display:inline-flex!important;width:auto!important;margin-top:12px!important;padding:10px 13px!important}.quick[data-dashboard-car-removed="1"]{display:none!important}`;
    document.head.appendChild(style);

    const home=()=>document.querySelector('nav button.active')?.textContent.trim()==='Главная';
    const navTo=(text)=>{const b=[...document.querySelectorAll('nav button')].find(x=>x.textContent.trim()===text);if(b){b.click();return true}return false};
    function hero(){return document.querySelector('.hero-car')}

    function carItems(){
      return [...document.querySelectorAll('.item')].filter(x=>/Выбрать|ОСНОВНАЯ/.test(x.textContent||'') && !/Редактировать/.test(x.textContent||''));
    }
    function currentIndex(items){const i=items.findIndex(x=>/ОСНОВНАЯ/.test(x.textContent||''));return i>=0?i:0}
    function switchBySwipe(dir){
      if(!home())return;
      const h=hero();if(!h)return;
      const wasMain=h;
      navTo('Данные');
      setTimeout(()=>{
        const items=carItems();
        if(items.length<2){navTo('Главная');return}
        const cur=currentIndex(items);const next=(cur+(dir>0?1:-1)+items.length)%items.length;
        const btn=items[next].querySelector('button:not(.danger)') || [...items[next].querySelectorAll('button')].find(b=>b.textContent.trim()==='Выбрать');
        if(btn)btn.click();
        setTimeout(()=>navTo('Главная'),220);
      },80);
      wasMain.classList.add(dir>0?'car-swipe-left':'car-swipe-right');
      setTimeout(()=>wasMain.classList.remove('car-swipe-left','car-swipe-right'),380);
    }

    function optimize(){
      const h=hero();if(!h)return;
      if(!h.querySelector('.dashboard-car-count')){
        const c=document.createElement('span');c.className='dashboard-car-count';c.textContent='АВТО';h.appendChild(c);
      }
      if(!h.querySelector('.dashboard-swipe-hint')){
        const hint=document.createElement('div');hint.className='dashboard-swipe-hint';hint.innerHTML='<b>‹</b> Свайп между автомобилями <b>›</b>';h.appendChild(hint);
      }
      if(!h.querySelector('.dashboard-car-link')){
        const b=document.createElement('button');b.type='button';b.className='dashboard-car-link secondary';b.textContent='Автомобили →';b.onclick=()=>navTo('Данные');h.appendChild(b);
      }
      document.querySelectorAll('.quick').forEach(q=>{const t=(q.textContent||'').replace(/\s+/g,' ').trim();if(t.includes('Автомобиль')&&t.includes('Профиль и автомобили'))q.dataset.dashboardCarRemoved='1'});
      if(h.dataset.swipeV21==='1')return;
      h.dataset.swipeV21='1';
      let sx=0,sy=0,active=false;
      const start=(x,y)=>{sx=x;sy=y;active=true};
      const end=(x,y)=>{if(!active)return;active=false;const dx=x-sx,dy=y-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15)switchBySwipe(dx)};
      h.addEventListener('touchstart',e=>{if(e.touches.length===1)start(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});
      h.addEventListener('touchend',e=>{const t=e.changedTouches[0];end(t.clientX,t.clientY)},{passive:true});
      h.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start(e.clientX,e.clientY)},{passive:true});
      h.addEventListener('pointerup',e=>{if(e.pointerType==='touch')end(e.clientX,e.clientY)},{passive:true});
    }
    const run=()=>setTimeout(optimize,250);
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
    new MutationObserver(()=>setTimeout(optimize,50)).observe(document.body,{childList:true,subtree:true});
    setInterval(optimize,1500);
  }
  loadCore();
})();
