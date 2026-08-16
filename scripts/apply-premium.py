from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
marker = '<!-- PREMIUM DASHBOARD V5 -->'
v6 = '<style id="premium-dashboard-v6-fix">'

if v6 not in s:
    css = r'''<style id="premium-dashboard-v6-fix">
html,body{width:100%;max-width:100%;overflow-x:hidden!important}
body{padding-bottom:0!important}
main{width:100%!important;max-width:820px!important;margin:0 auto!important;padding:0 14px 155px!important}
body>nav,nav{position:fixed!important;left:50vw!important;right:auto!important;top:auto!important;bottom:calc(82px + env(safe-area-inset-bottom))!important;transform:translateX(-50%)!important;width:calc(100vw - 20px)!important;max-width:820px!important;height:auto!important;margin:0!important;padding:6px!important;display:flex!important;flex-wrap:nowrap!important;gap:5px!important;overflow:hidden!important;z-index:2147483000!important;border-radius:22px!important;background:linear-gradient(145deg,rgba(35,40,49,.88),rgba(12,15,21,.86))!important;border:1px solid rgba(255,255,255,.15)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 18px 55px rgba(0,0,0,.58)!important;backdrop-filter:blur(28px) saturate(150%)!important;-webkit-backdrop-filter:blur(28px) saturate(150%)!important}
nav button{position:relative!important;flex:1 1 0!important;width:auto!important;min-width:0!important;min-height:56px!important;height:56px!important;margin:0!important;padding:6px 2px!important;border-radius:17px!important;background:transparent!important;border:1px solid transparent!important;box-shadow:none!important;color:#8791a1!important;font-size:12px!important;font-weight:750!important;white-space:nowrap!important;overflow:hidden!important}
nav button.active{color:#f1cf91!important;background:linear-gradient(145deg,rgba(216,179,110,.19),rgba(216,179,110,.055))!important;border-color:rgba(216,179,110,.30)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.11),0 7px 20px rgba(216,179,110,.08)!important}
nav button:active{transform:scale(.96)!important}
body.home-v6-clean #home .premium-v6-garage-hide,body.home-v6-clean #home .premium-v6-profile-hide{display:none!important}
@media(max-width:600px){main{padding:0 12px 150px!important}.hero-car{margin-top:12px!important}.premium-stat-grid{margin-bottom:20px!important}.quick-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}.quick{min-height:145px!important;padding:16px!important}.quick strong{font-size:14px!important}.quick small{font-size:10px!important}nav{bottom:calc(78px + env(safe-area-inset-bottom))!important;width:calc(100vw - 16px)!important;border-radius:20px!important}nav button{min-height:54px!important;height:54px!important;font-size:11px!important}}
</style>'''
    js = r'''<script id="premium-dashboard-v6-fix-js">(function(){
function clean(){
  var home=document.getElementById('home');
  var isHome=!!(home&&home.classList.contains('active'));
  document.body.classList.toggle('home-v6-clean',isHome);
  if(!isHome||!home)return;
  home.querySelectorAll('.card,.tile').forEach(function(el){
    var t=(el.innerText||'').replace(/\s+/g,' ').trim();
    if(/Мои автомобили|Переключайся между автомобилями в один клик|Удалить текущий|\+ Добавить автомобиль/.test(t))el.classList.add('premium-v6-garage-hide');
    if(/Профиль и автомобили/.test(t))el.classList.add('premium-v6-profile-hide');
  });
}
function navFix(){var nav=document.querySelector('nav');if(!nav)return;nav.style.position='fixed';nav.style.left='50vw';nav.style.right='auto';nav.style.top='auto';nav.style.bottom='calc(82px + env(safe-area-inset-bottom))';nav.style.transform='translateX(-50%)';nav.style.width='calc(100vw - 20px)';nav.style.maxWidth='820px';nav.style.margin='0'}
function run(){clean();navFix()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(run).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
window.addEventListener('resize',navFix);
})();</script>'''
    if '</head>' not in s or '</body>' not in s: raise SystemExit('index.html markers not found')
    s=s.replace('</head>',marker+css+'</head>',1)
    s=s.replace('</body>',js+'</body>',1)
    p.write_text(s,encoding='utf-8')
    print('premium dashboard v6 fix applied')
else:
    print('premium dashboard v6 already applied')
