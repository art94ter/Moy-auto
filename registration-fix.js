// PREMIUM NAV V25 — real bottom navigation, iPhone-safe positioning, direct tab switching
(function(){
  const styleId='premium-nav-v25-style';
  function install(){
    if(!document.getElementById(styleId)){
      const s=document.createElement('style');s.id=styleId;s.textContent=`
        /* Hide the old duplicate top navigation */
        #appShell>main>nav{display:none!important}
        body{padding-bottom:145px!important}
        #premiumBottomNav{position:fixed!important;left:10px!important;right:10px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 78px)!important;z-index:2147483647!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:5px!important;padding:7px!important;border-radius:26px!important;background:linear-gradient(145deg,rgba(48,55,67,.72),rgba(11,14,20,.88))!important;border:1px solid rgba(255,255,255,.2)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -1px 0 rgba(0,0,0,.45),0 20px 55px rgba(0,0,0,.55),0 0 30px rgba(215,177,109,.08)!important;backdrop-filter:blur(30px) saturate(180%)!important;-webkit-backdrop-filter:blur(30px) saturate(180%)!important;pointer-events:auto!important;touch-action:manipulation!important}
        #premiumBottomNav button{position:relative!important;z-index:3!important;pointer-events:auto!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important;appearance:none!important;width:100%!important;min-width:0!important;min-height:58px!important;margin:0!important;padding:7px 2px 6px!important;border:1px solid transparent!important;border-radius:18px!important;background:transparent!important;color:#9aa4b4!important;box-shadow:none!important;font:750 10px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;cursor:pointer!important}
        #premiumBottomNav button .bn-icon{font-size:20px!important;line-height:20px!important}
        #premiumBottomNav button.active{color:#f2cf91!important;background:linear-gradient(145deg,rgba(240,207,145,.22),rgba(240,207,145,.055))!important;border-color:rgba(240,207,145,.24)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 5px 18px rgba(0,0,0,.22)!important}
        #premiumBottomNav button:active{transform:scale(.94)!important;background:rgba(240,207,145,.18)!important}
        @media(max-width:600px){#premiumBottomNav{left:8px!important;right:8px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 76px)!important;border-radius:24px!important}.quick-grid .quick{touch-action:manipulation!important}}
      `;document.head.appendChild(s);
    }
    let bar=document.getElementById('premiumBottomNav');
    if(!bar){bar=document.createElement('nav');bar.id='premiumBottomNav';bar.setAttribute('aria-label','Основная навигация');document.body.appendChild(bar)}
    const items=[['⌂','Главная','home'],['🔧','ТО','service'],['⛽','Топливо','fuel'],['◉','Шины','tires'],['▣','Данные','data']];
    if(bar.dataset.v25!=='1'){
      bar.dataset.v25='1';bar.innerHTML='';
      items.forEach(([icon,label,target],i)=>{
        const b=document.createElement('button');b.type='button';b.dataset.target=target;b.innerHTML='<span class="bn-icon">'+icon+'</span><span>'+label+'</span>';
        b.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();go(target,i)},{passive:false});
        b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(target,i)},{passive:false});
        bar.appendChild(b);
      });
    }
    sync();
  }
  function go(target,index){
    const original=document.querySelector('#appShell>main>nav button:nth-child('+(index+1)+')');
    if(typeof window.tab==='function') window.tab(target,original||document.querySelector('nav button'));
    else {document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));const v=document.getElementById(target);if(v)v.classList.add('active');}
    sync();window.scrollTo({top:0,behavior:'smooth'});
  }
  function sync(){const bar=document.getElementById('premiumBottomNav');if(!bar)return;const views=[...document.querySelectorAll('.view')];let idx=views.findIndex(v=>v.classList.contains('active'));if(idx<0)idx=0;bar.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===idx));}
  function boot(){install();setTimeout(install,300);setTimeout(install,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  const mo=new MutationObserver(()=>sync());mo.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
