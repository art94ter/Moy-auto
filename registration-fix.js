// RECOVERY_BOOT_V20 — load preserved fixes + robust iPhone dashboard swipe/optimization
(function(){
  function loadCore(){
    if(document.querySelector('script[data-registration-core]')){installFix();return;}
    const s=document.createElement('script');
    s.src='./registration-core.js?v=20';
    s.dataset.registrationCore='1';
    s.onload=installFix;
    s.onerror=function(){console.error('registration-core.js failed to load')};
    document.head.appendChild(s);
  }
  function installFix(){
    const style=document.createElement('style');
    style.textContent='#premiumHero{touch-action:pan-y!important;user-select:none;-webkit-user-select:none}.dashboard-car-name{position:relative;z-index:2}.dashboard-car-count{position:absolute;top:20px;right:20px;z-index:4}.dashboard-car-link{display:inline-flex!important;width:auto!important}.quick-grid .quick[data-dashboard-car-removed="1"]{display:none!important}';
    document.head.appendChild(style);
    function hero(){return document.getElementById('premiumHero')}
    function select(){return document.getElementById('topCarSelect')||document.getElementById('carSelect')}
    function refresh(){
      const h=hero(),s=select();
      if(!h||!s)return;
      const n=s.options.length;
      h.querySelector('.car-swipe-hint')?.remove();
      if(n<2)return;
      const hint=document.createElement('div');
      hint.className='car-swipe-hint';
      hint.innerHTML='<span class="car-swipe-arrows">‹</span><span class="car-swipe-text">Свайп</span><span class="car-swipe-arrows">›</span><span class="car-swipe-dots"></span>';
      hint.querySelector('.car-swipe-dots').innerHTML=Array.from(s.options).map((_,i)=>'<i class="'+(i===s.selectedIndex?'active':'')+'"></i>').join('');
      h.appendChild(hint);
    }
    function move(dx){
      const s=select();
      if(!s||s.options.length<2)return;
      const next=(s.selectedIndex+(dx<0?1:-1)+s.options.length)%s.options.length;
      const id=s.options[next].value;
      haptic();
      const h=hero();
      if(h){h.classList.remove('car-swipe-left','car-swipe-right');void h.offsetWidth;h.classList.add(dx<0?'car-swipe-left':'car-swipe-right');setTimeout(()=>h.classList.remove('car-swipe-left','car-swipe-right'),360)}
      if(typeof window.switchCar==='function')window.switchCar(id);else{s.value=id;s.dispatchEvent(new Event('change',{bubbles:true}))}
      setTimeout(refresh,80);
    }
    function haptic(){try{if(navigator.vibrate)navigator.vibrate(8)}catch(e){}}
    function bind(){
      const h=hero();
      if(!h||h.dataset.swipeV20==='1')return;
      h.dataset.swipeV20='1';
      let sx=0,sy=0,active=false;
      h.addEventListener('pointerdown',e=>{if(e.pointerType&&e.pointerType!=='touch')return;sx=e.clientX;sy=e.clientY;active=true},{passive:true});
      h.addEventListener('pointerup',e=>{if(!active)return;active=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.15)move(dx);},{passive:true});
      h.addEventListener('pointercancel',()=>{active=false},{passive:true});
      h.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;active=true},{passive:true});
      h.addEventListener('touchend',e=>{if(!active)return;active=false;const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.15)move(dx);},{passive:true});
    }
    function optimize(){
      const h=hero();
      if(!h)return;
      h.style.position='relative';
      let name=h.querySelector('.dashboard-car-name');
      if(!name){name=document.createElement('div');name.className='dashboard-car-name';const k=h.querySelector('.hero-kicker');(k?k.parentNode:h).insertBefore(name,k?k.nextSibling:h.firstChild)}
      let count=h.querySelector('.dashboard-car-count');
      if(!count){count=document.createElement('span');count.className='dashboard-car-count';h.appendChild(count)}
      let link=h.querySelector('.dashboard-car-link');
      if(!link){link=document.createElement('button');link.type='button';link.className='dashboard-car-link';link.textContent='Автомобили →';link.onclick=()=>{const b=[...document.querySelectorAll('nav button')].find(x=>x.textContent.trim()==='Данные');if(b)b.click()};h.appendChild(link)}
      const s=select(),n=s?.options.length||0;count.textContent=n>1?n+' АВТО':'';name.textContent=s?.options[s.selectedIndex]?.textContent||document.getElementById('premiumCarName')?.textContent||'Мой автомобиль';
      document.querySelectorAll('.quick').forEach(q=>{const t=q.textContent.replace(/\s+/g,' ').trim();if(t.includes('Автомобиль')&&t.includes('Профиль и автомобили'))q.dataset.dashboardCarRemoved='1'});
      bind();refresh();
    }
    const run=()=>setTimeout(optimize,150);
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
    new MutationObserver(()=>{if(document.getElementById('premiumHero'))optimize()}).observe(document.body,{childList:true,subtree:true});
    setInterval(()=>{if(document.getElementById('premiumHero'))optimize()},1000);
  }
  loadCore();
})();
