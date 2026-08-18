(function(){
  'use strict';

  /* MY AUTO — PREMIUM GLASS UI */
  const css = `
    :root{--gold:#d8b16d;--gold2:#f4cf88;--text:#f7f4ee;--muted:#c5beb4}
    html,body{background:radial-gradient(700px 420px at 85% -5%,rgba(216,177,109,.10),transparent 60%),radial-gradient(600px 420px at 10% 35%,rgba(255,255,255,.025),transparent 65%),#05070b!important;color:var(--text)!important}
    main{max-width:900px!important;padding-bottom:118px!important}

    /* Only one navigation bar. It is the MAIN navigation and stays at the bottom. */
    #bottomNav{display:none!important}
    #homeNav{
      display:flex!important;
      position:fixed!important;
      left:12px!important;right:12px!important;bottom:calc(12px + env(safe-area-inset-bottom))!important;
      width:auto!important;height:74px!important;margin:0!important;padding:5px!important;gap:5px!important;
      z-index:9999!important;border-radius:25px!important;
      border:1px solid rgba(255,255,255,.20)!important;
      background:linear-gradient(145deg,rgba(37,43,52,.78),rgba(8,11,16,.86))!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 -1px 0 rgba(0,0,0,.45),0 22px 60px rgba(0,0,0,.55)!important;
      backdrop-filter:blur(30px) saturate(165%)!important;-webkit-backdrop-filter:blur(30px) saturate(165%)!important;
    }
    #homeNav button{
      color:#c9c4bb!important;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.018))!important;
      border:1px solid rgba(255,255,255,.08)!important;border-radius:21px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)!important;text-shadow:none!important
    }
    #homeNav button.active{color:var(--gold2)!important;background:linear-gradient(145deg,rgba(244,207,136,.19),rgba(216,177,109,.045))!important;border-color:rgba(244,207,136,.42)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 0 24px rgba(216,177,109,.09)!important}
    #homeNav .nav-icon{color:inherit!important}

    .hero{height:360px!important;padding:31px 34px!important;border-radius:31px!important;border:1px solid rgba(244,207,136,.72)!important;background:radial-gradient(420px 250px at 84% 35%,rgba(216,177,109,.16),transparent 62%),linear-gradient(145deg,rgba(25,29,35,.96),rgba(7,10,15,.98))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -30px 80px rgba(0,0,0,.24),0 26px 75px rgba(0,0,0,.58)!important}
    .hero:before{width:590px!important;height:390px!important;right:-155px!important;top:-155px!important;border-color:rgba(240,200,115,.58)!important;box-shadow:0 0 0 30px rgba(240,200,115,.045),0 0 0 62px rgba(240,200,115,.028),0 0 0 96px rgba(240,200,115,.018)!important}
    .hero:after{width:500px!important;height:315px!important;right:-95px!important;top:15px!important;border-color:rgba(240,200,115,.22)!important}
    .kicker{color:var(--gold2)!important;letter-spacing:.28em!important}.hero-name{color:#fff!important;font-size:41px!important}.hero-meta{color:#c9c4bb!important}.hero-km{color:#fff!important;font-size:58px!important}.hero-km span{color:#c9c4bb!important}.progress-label{color:#c9c4bb!important}.progress{background:rgba(255,255,255,.10)!important;height:10px!important}.progress i{background:linear-gradient(90deg,#d8ad5e,#f4cf88)!important}
    .section-head{margin-top:34px!important;margin-bottom:15px!important}.section-head h2,.events-head h2{color:#f4f1eb!important;font-size:22px!important;font-weight:900!important;letter-spacing:-.025em!important}.section-head h2:after,.events-head h2:after{background:var(--gold2)!important}.section-head span{color:#bdb7ae!important}
    .quick-grid,.stats-grid{gap:12px!important}
    .quick,.stat-card{color:var(--text)!important;border:1px solid rgba(244,207,136,.43)!important;background:linear-gradient(145deg,rgba(255,255,255,.105),rgba(255,255,255,.028))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 -1px 0 rgba(0,0,0,.25),0 18px 44px rgba(0,0,0,.30)!important;backdrop-filter:blur(28px) saturate(170%)!important;-webkit-backdrop-filter:blur(28px) saturate(170%)!important}
    .quick{height:168px!important;padding:18px!important}.quick strong,.stat-card b{color:#f7f4ee!important;text-shadow:none!important}.quick small,.stat-card span{color:#c5beb4!important}.quick:after{color:var(--gold2)!important}
    .icon,.stat-icon{color:var(--gold2)!important;background:linear-gradient(145deg,rgba(244,207,136,.13),rgba(255,255,255,.025))!important;border:1px solid rgba(244,207,136,.52)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 8px 22px rgba(0,0,0,.22)!important}.stat-card{height:160px!important}
    .event-empty,.card{background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025))!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 48px rgba(0,0,0,.28)!important;backdrop-filter:blur(24px) saturate(160%)!important;-webkit-backdrop-filter:blur(24px) saturate(160%)!important}
    .events-head button{color:var(--gold2)!important;background:rgba(216,177,109,.045)!important;border-color:rgba(244,207,136,.45)!important}
    .quick *, .stat-card *, .event-empty *, .card *{text-shadow:none}.quick strong,.stat-card b{color:#f7f4ee!important}.kicker,.nav-icon,.event-icon,.quick:after,.section-head h2:after,.events-head h2:after{color:var(--gold2)!important}
    @media(max-width:600px){main{padding:0 12px calc(112px + env(safe-area-inset-bottom))!important}.hero{height:350px!important;padding:27px 30px!important;margin-top:10px!important}.hero-name{font-size:35px!important}.hero-km{font-size:51px!important;margin-top:39px!important}#homeNav{left:8px!important;right:8px!important;bottom:calc(8px + env(safe-area-inset-bottom))!important;height:72px!important;border-radius:24px!important}#homeNav button{font-size:10px!important}.quick{height:151px!important;padding:14px!important}.quick strong{font-size:14px!important}.quick small{font-size:10px!important}.stat-card{height:150px!important;padding:14px!important}.stat-card b{font-size:28px!important}.stat-card span{font-size:10px!important}}
  `;

  function install(){
    let s=document.getElementById('my-auto-premium-glass-v3');
    if(!s){s=document.createElement('style');s.id='my-auto-premium-glass-v3';document.head.appendChild(s)}
    s.textContent=css;
  }
  function cleanDuplicateNav(){const n=document.getElementById('bottomNav');if(n)n.remove()}
  function syncHomeNav(){const active=document.querySelector('.view.active')?.id||'home';document.querySelectorAll('#homeNav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===active))}
  let touch=null,lastSwipe=0;
  function bindSwipe(){const h=document.getElementById('hero');if(!h||h.dataset.moySwipeV3==='1')return;h.dataset.moySwipeV3='1';h.style.touchAction='pan-y';h.addEventListener('touchstart',e=>{if(e.touches.length===1){const t=e.touches[0];touch={x:t.clientX,y:t.clientY,time:Date.now()}}},{passive:true});h.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y,dt=Date.now()-touch.time;touch=null;if(dt<900&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-lastSwipe>400){lastSwipe=Date.now();if(typeof window.swipe==='function')window.swipe(dx<0?1:-1)}},{passive:true})}
  function run(){install();cleanDuplicateNav();syncHomeNav();bindSwipe()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(()=>setTimeout(run,60)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
