// MOY AUTO — LUXURY GARAGE VISUAL FIX V42
(function(){
  'use strict';
  if(window.__MOY_AUTO_LUXURY_V42__) return;
  window.__MOY_AUTO_LUXURY_V42__=true;

  const STYLE='moyAutoLuxuryV42Style';
  const NAV='moyAutoLuxuryBottomNav';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  function inject(){
    if($('#'+STYLE)) return;
    const s=document.createElement('style'); s.id=STYLE;
    s.textContent=`
      html,body{background:#020405!important;overflow-x:hidden!important}
      body{padding-bottom:0!important}
      #app{width:min(100%,430px)!important;margin:0 auto!important;padding:0 12px 92px!important;min-height:100vh!important}
      #app>.topline{display:none!important}
      #app>.vehicle{height:200px!important;margin-top:12px!important;border-radius:18px!important;padding:17px 17px 10px!important;border-color:rgba(214,170,79,.72)!important;background:radial-gradient(230px 120px at 87% 6%,rgba(223,177,73,.16),transparent 70%),linear-gradient(145deg,#090c0e,#101214 52%,#080a0b)!important;box-shadow:inset 0 1px rgba(255,255,255,.08),0 18px 45px rgba(0,0,0,.55)!important}
      #app>.vehicle:before{width:310px!important;height:190px!important;right:-105px!important;top:-68px!important;border-color:rgba(224,179,79,.72)!important;box-shadow:0 0 0 16px rgba(224,179,79,.05),0 0 0 34px rgba(224,179,79,.035),0 0 0 52px rgba(224,179,79,.02)!important}
      #app>.vehicle:after{right:0!important;bottom:0!important;width:72%!important;height:60px!important;background:radial-gradient(ellipse,rgba(224,179,79,.13),transparent 70%)!important}
      #app .v-kicker{font-size:8px!important;letter-spacing:.28em!important;color:#f1c76f!important}
      #app .v-name{font-size:24px!important;line-height:1!important;margin-top:8px!important;letter-spacing:-.045em!important}
      #app .v-meta{font-size:10px!important;margin-top:7px!important;color:#a7adb5!important}
      #app .v-km{font-size:33px!important;line-height:1!important;margin-top:25px!important;letter-spacing:-.055em!important}
      #app .v-km span{font-size:11px!important;color:#9299a1!important}
      #app .v-progress{left:17px!important;right:17px!important;bottom:13px!important}
      #app .v-plabel{font-size:8px!important;margin-bottom:6px!important}
      #app .bar{height:5px!important;background:rgba(255,255,255,.10)!important}
      #app .bar i{background:linear-gradient(90deg,#d5a746,#f6d98b)!important}

      #app>.nav{position:relative!important;top:auto!important;margin:10px 0 27px!important;height:64px!important;padding:3px!important;border-radius:17px!important;background:linear-gradient(145deg,rgba(27,30,33,.94),rgba(7,9,11,.96))!important;border-color:rgba(255,255,255,.20)!important;box-shadow:inset 0 1px rgba(255,255,255,.08),0 13px 30px rgba(0,0,0,.5)!important;z-index:10!important}
      #app>.nav button{height:56px!important;border-radius:13px!important;color:#c8cbd0!important;font-size:9px!important}
      #app>.nav button.active{color:#f5ce7b!important;background:linear-gradient(145deg,rgba(221,175,76,.18),rgba(221,175,76,.045))!important;border-color:rgba(221,175,76,.52)!important}
      #app>.nav svg{width:23px!important;height:23px!important;stroke-width:1.8!important}

      #app #home{padding:0 1px!important}
      #app .section-head{margin:0 3px 10px!important;align-items:center!important}
      #app .section-head h2{font-size:16px!important;font-weight:800!important;letter-spacing:-.025em!important}
      #app .section-head h2:after{width:29px!important;height:2px!important;margin-top:6px!important;background:#f1c76f!important}
      #app .section-head button{font-size:9px!important;padding:7px 13px!important;border-radius:10px!important;border-color:rgba(218,173,73,.78)!important;background:rgba(10,12,14,.45)!important;color:#f0c66e!important}

      #app .quick-grid,#app .stats-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:9px!important}
      #app .glass-card{height:132px!important;min-height:132px!important;padding:11px!important;border-radius:14px!important;border-color:rgba(214,170,79,.84)!important;background:linear-gradient(145deg,rgba(25,27,29,.82),rgba(7,9,11,.94))!important;box-shadow:inset 0 1px rgba(255,255,255,.07),0 12px 24px rgba(0,0,0,.36)!important}
      #app .qicon{width:38px!important;height:38px!important;border-radius:12px!important;border-color:rgba(235,194,105,.78)!important;color:#f2c970!important;background:rgba(225,178,72,.08)!important}
      #app .qicon svg{width:24px!important;height:24px!important}
      #app .glass-card strong{font-size:10px!important;margin-top:10px!important}
      #app .glass-card small{font-size:8px!important;line-height:1.45!important;color:#aeb3ba!important}
      #app .glass-card .arrow{right:8px!important;bottom:6px!important;color:#efc66d!important;font-size:22px!important}

      #app .spacer{height:24px!important}
      #app .stat-card{height:140px!important;min-height:140px!important;padding:11px!important;border-radius:14px!important;border-color:rgba(214,170,79,.72)!important;background:linear-gradient(145deg,rgba(23,25,27,.84),rgba(7,9,11,.95))!important}
      #app .stat-icon{width:36px!important;height:36px!important;color:#efc66d!important;border-color:rgba(224,178,76,.72)!important;background:rgba(224,178,76,.05)!important}
      #app .stat-card b{font-size:20px!important;margin-top:11px!important}
      #app .stat-card span{font-size:8px!important;line-height:1.45!important}

      #app .event{min-height:76px!important;border-radius:14px!important;padding:10px 12px!important;border-color:rgba(255,255,255,.18)!important;background:linear-gradient(145deg,rgba(18,22,25,.88),rgba(7,9,11,.96))!important}
      #app .event-icon{font-size:27px!important;color:#efc66d!important;width:38px!important}
      #app .event strong{font-size:10px!important}
      #app .event small{font-size:8px!important}

      #app #recentHome{border-radius:14px!important;padding:4px 12px!important;background:linear-gradient(145deg,rgba(18,22,25,.84),rgba(7,9,11,.94))!important;border-color:rgba(255,255,255,.15)!important}

      #${NAV}{position:fixed;left:50%;bottom:calc(8px + env(safe-area-inset-bottom));transform:translateX(-50%);width:min(calc(100vw - 24px),406px);height:64px;z-index:9999;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;padding:3px;border:1px solid rgba(255,255,255,.22);border-radius:18px;background:linear-gradient(145deg,rgba(25,28,31,.96),rgba(7,9,11,.98));box-shadow:inset 0 1px rgba(255,255,255,.08),0 14px 38px rgba(0,0,0,.7);backdrop-filter:blur(22px)}
      #${NAV} button{border:1px solid transparent;border-radius:14px;background:transparent;color:#c5c9ce;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:9px}
      #${NAV} button.active{color:#f4cd7a;border-color:rgba(224,178,77,.55);background:linear-gradient(145deg,rgba(224,178,77,.18),rgba(224,178,77,.035));box-shadow:inset 0 1px rgba(255,255,255,.08)}
      #${NAV} svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      @media(max-width:370px){#app{padding-left:9px!important;padding-right:9px!important}.vehicle{height:196px!important}.v-name{font-size:22px!important}.v-km{font-size:31px!important}.quick-grid,.stats-grid{gap:6px!important}.glass-card{height:126px!important;min-height:126px!important;padding:9px!important}.stat-card{height:132px!important;min-height:132px!important}}
    `;
    document.head.appendChild(s);
  }

  function navIcon(k){
    const m={
      home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9 20v-5h6v5"/></svg>',
      service:'<svg viewBox="0 0 24 24"><path d="m14 6 4-4 4 4-4 4"/><path d="m13 8-8 8a2 2 0 0 0 3 3l8-8"/></svg>',
      fuel:'<svg viewBox="0 0 24 24"><path d="M6 3h9v18H6zM9 3v5h6V3M18 8l3 3v7a2 2 0 0 1-4 0v-7"/></svg>',
      tire:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="m12 3.5 2.5 6.3M20.5 12l-6.3 2.5M12 20.5l-2.5-6.3M3.5 12l6.3-2.5"/></svg>',
      data:'<svg viewBox="0 0 24 24"><path d="M5 20V10M10 20V5M15 20v-8M20 20V3M3 20h19"/></svg>'};return m[k];
  }

  function bottomNav(){
    let n=$('#'+NAV); if(!n){n=document.createElement('nav');n.id=NAV;document.body.appendChild(n)}
    const items=[['home','Главная'],['service','ТО'],['fuel','Топливо'],['tires','Шины'],['data','Данные']];
    n.innerHTML=items.map(([k,t])=>`<button data-tab="${k}">${navIcon(k)}<span>${t}</span></button>`).join('');
    const active=$$('.view.active')[0]?.id||'home';
    $$('#'+NAV+' button').forEach(b=>{b.classList.toggle('active',b.dataset.tab===active);b.onclick=()=>{const top=$$('#nav button').find(x=>(x.textContent||'').trim()===b.textContent.trim());if(top)top.click();else if(typeof go==='function')go(b.dataset.tab);setTimeout(bottomNav,40)}});
  }

  function polish(){
    const k=$('.v-kicker'); if(k) k.textContent='MY AUTO · PREMIUM GARAGE';
    const app=$('#app'); if(!app||app.classList.contains('hidden')) return;
    inject(); bottomNav();
    const nav=$('#nav'); if(nav) nav.style.position='relative';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',polish); else polish();
  new MutationObserver(()=>setTimeout(polish,30)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',polish);
})();