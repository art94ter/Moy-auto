// MY AUTO — APPROVED DESIGN ONLY
// Back navigation fix for the published app.
(function(){
  'use strict';
  function clean(){
    document.querySelectorAll('.ref-car-photo,.hero-car,.car-catalog-photo,.car-photo-credit').forEach(function(el){el.remove();});
    document.querySelectorAll('#premium-approved-style,#premium-final-style,#premium-ui-style').forEach(function(el){el.remove();});
  }
  function goHome(e){
    var btn=e.target.closest('.moy-back');
    if(!btn)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if(typeof window.setTab==='function'){
      window.setTab('home');
    }else{
      var home=document.querySelector('.home-nav button[data-tab="home"]');
      if(home)home.click();
    }
  }
  function run(){ clean(); }
  document.addEventListener('click',goHome,true);
  document.addEventListener('touchend',function(e){
    var btn=e.target.closest('.moy-back');
    if(btn){
      e.preventDefault();
      if(typeof window.setTab==='function')window.setTab('home');
    }
  },{passive:false,capture:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
  new MutationObserver(function(){clean();}).observe(document.documentElement,{subtree:true,childList:true});
})();
