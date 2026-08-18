(function(){'use strict';const css=`
.quick{display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;position:relative!important;padding:16px!important}
.quick .icon{flex:0 0 46px!important;width:46px!important;height:46px!important;margin:0!important;display:grid!important;place-items:center!important}
.quick strong{display:block!important;margin-top:11px!important;line-height:1.12!important;max-width:calc(100% - 4px)!important;position:relative!important;z-index:2!important}
.quick small{display:block!important;margin-top:5px!important;line-height:1.28!important;max-width:calc(100% - 4px)!important;position:relative!important;z-index:2!important}
@media(max-width:600px){.quick{padding:12px!important}.quick .icon{flex-basis:42px!important;width:42px!important;height:42px!important}.quick strong{margin-top:9px!important;font-size:13px!important;line-height:1.1!important}.quick small{margin-top:4px!important;font-size:10px!important;line-height:1.25!important}}
`;
function install(){let s=document.getElementById('my-auto-quick-fix-v1');if(!s){s=document.createElement('style');s.id='my-auto-quick-fix-v1';document.head.appendChild(s)}s.textContent=css}
function goHome(){const b=document.querySelector('#homeNav button[data-tab="home"],#homeNav [data-tab="home"],[data-tab="home"]');if(b)b.click()}
function addBackButtons(){document.querySelectorAll('.view').forEach(v=>{if(v.id==='home'||v.querySelector(':scope > .moy-back'))return;const b=document.createElement('button');b.type='button';b.className='moy-back';b.innerHTML='<span>‹</span> Назад';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();goHome()});v.insertBefore(b,v.firstChild)})}
function run(){install();addBackButtons()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();new MutationObserver(run).observe(document.body,{subtree:true,childList:true})})();