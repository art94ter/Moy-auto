(function(){
  'use strict';
  if (window.__MOY_AUTO_FIXES_V1__) return;
  window.__MOY_AUTO_FIXES_V1__ = true;

  const IMAGE_CACHE = 'moy-auto-image-v1:';
  let imageRequest = 0;
  let touchStart = null;
  let lastSwipe = 0;

  function css(){
    if(document.getElementById('moy-auto-fixes-style')) return;
    const s=document.createElement('style');
    s.id='moy-auto-fixes-style';
    s.textContent=`
      :root{--muted:#c3bdb2!important}
      .hero-meta,.hero-km span,.progress-label,.quick small,.stat-card span,.events-head span,.event-empty p,.muted,.small{color:#c3bdb2!important}
      main>nav button{color:#c8c2b8!important}
      main>nav button.active{color:#f1cf91!important}
      .hero-photo{transition:opacity .22s ease,filter .22s ease!important}
      .hero-photo.moy-loading{opacity:.18!important}
      .moy-swipe-zone{position:absolute;inset:0;z-index:5;pointer-events:auto;touch-action:pan-y;background:transparent}
    `;
    document.head.appendChild(s);
  }

  function car(){
    try{return typeof activeCar==='function'?activeCar():null}catch(e){return null}
  }

  function photoEl(){
    return document.querySelector('#home .hero-photo') || document.querySelector('.hero .hero-photo');
  }

  function signature(c){
    const x=c?.car||{};
    return [x.name||'',x.year||'',x.engine||''].join('|').trim();
  }

  function cleanQuery(value){
    return String(value||'').replace(/[|•·]/g,' ').replace(/\s+/g,' ').trim();
  }

  async function findImage(c){
    const x=c?.car||{};
    const name=cleanQuery(x.name);
    const year=String(x.year||'').trim();
    if(!name) return null;
    const sig=signature(c);
    const cacheKey=IMAGE_CACHE+sig.toLowerCase();
    try{const cached=sessionStorage.getItem(cacheKey);if(cached)return cached}catch(e){}

    const queries=[
      `${name} ${year} automobile`,
      `${name} ${year}`,
      `${name} car`
    ].filter(Boolean);

    for(const q of queries){
      try{
        const u=new URL('https://commons.wikimedia.org/w/api.php');
        u.searchParams.set('action','query');
        u.searchParams.set('generator','search');
        u.searchParams.set('gsrsearch',q);
        u.searchParams.set('gsrnamespace','6');
        u.searchParams.set('gsrlimit','8');
        u.searchParams.set('prop','imageinfo');
        u.searchParams.set('iiprop','url|mime');
        u.searchParams.set('iiurlwidth','1000');
        u.searchParams.set('format','json');
        u.searchParams.set('origin','*');
        const r=await fetch(u.toString(),{cache:'force-cache'});
        if(!r.ok)continue;
        const data=await r.json();
        const pages=Object.values(data?.query?.pages||{});
        const page=pages.find(p=>p?.imageinfo?.[0]?.thumburl||p?.imageinfo?.[0]?.url);
        const url=page?.imageinfo?.[0]?.thumburl||page?.imageinfo?.[0]?.url;
        if(url){try{sessionStorage.setItem(cacheKey,url)}catch(e){}return url;}
      }catch(e){/* keep fallback */}
    }
    return null;
  }

  async function updateImage(){
    const img=photoEl(), c=car();
    if(!img||!c)return;
    const sig=signature(c);
    if(img.dataset.moySignature===sig && img.src)return;
    const req=++imageRequest;
    img.dataset.moySignature=sig;
    img.classList.add('moy-loading');
    const url=await findImage(c);
    if(req!==imageRequest)return;
    if(url){
      img.onload=()=>img.classList.remove('moy-loading');
      img.onerror=()=>img.classList.remove('moy-loading');
      img.src=url;
    }else{
      img.classList.remove('moy-loading');
    }
  }

  function selectCar(direction){
    if(!window.db||!Array.isArray(db.cars)||db.cars.length<2)return false;
    const current=Math.max(0,db.cars.findIndex(x=>x.id===db.activeCarId));
    const next=(current+(direction>0?1:-1)+db.cars.length)%db.cars.length;
    db.activeCarId=db.cars[next].id;
    try{if(typeof render==='function')render();}catch(e){}
    try{if(typeof saveCloud==='function')saveCloud();}catch(e){}
    updateImage();
    return true;
  }

  function bindSwipe(){
    const hero=document.querySelector('#home .hero');
    if(!hero||hero.dataset.moySwipeBound==='1')return;
    hero.dataset.moySwipeBound='1';
    hero.style.touchAction='pan-y';
    const start=(x,y)=>{touchStart={x,y,time:Date.now()};};
    const end=(x,y)=>{
      if(!touchStart)return;
      const dx=x-touchStart.x,dy=y-touchStart.y,dt=Date.now()-touchStart.time;
      touchStart=null;
      if(dt>900||Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.2||Date.now()-lastSwipe<450)return;
      lastSwipe=Date.now();
      selectCar(dx<0?1:-1);
    };
    hero.addEventListener('touchstart',e=>{if(e.touches.length===1){const t=e.touches[0];start(t.clientX,t.clientY)}},{passive:true});
    hero.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(t)end(t.clientX,t.clientY)},{passive:true});
    hero.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start(e.clientX,e.clientY)},{passive:true});
    hero.addEventListener('pointerup',e=>{if(e.pointerType==='touch')end(e.clientX,e.clientY)},{passive:true});
  }

  function run(){css();bindSwipe();updateImage();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(()=>setTimeout(run,60)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',run,{passive:true});
})();
