// MY AUTO — APPROVED DESIGN ONLY
// Legacy dashboard injector disabled. The live page must use index.html + premium.css.
(function(){
  'use strict';
  function clean(){
    document.querySelectorAll('.ref-car-photo,.hero-car,.car-catalog-photo,.car-photo-credit').forEach(function(el){el.remove();});
    document.querySelectorAll('#premium-approved-style,#premium-final-style,#premium-ui-style').forEach(function(el){el.remove();});
  }
  function run(){ clean(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
  new MutationObserver(function(){clean();}).observe(document.documentElement,{subtree:true,childList:true});
})();
