(function(){
'use strict';
if(window.__MOY_AUTO_DESIGN_V4__)return;
window.__MOY_AUTO_DESIGN_V4__=true;
let touch=null,lastSwipe=0;
function css(){if(document.getElementById('moy-auto-design-v4'))return;const s=document.createElement('style');s.id='moy-auto-design-v4';s.textContent=`
:root{--bg:#030609!important;--gold:#d8b16d!important;--gold2:#f4cf88!important;--text:#f7f5f0!important;--muted:#bdb8af!important;--line:rgba(216,177,109,.58)!important}
html,body{background:radial-gradient(900px 500px at 50% -10%,#17120a 0,#07090d 45%,#030609 100%)!important;color:var(--text)!important}
main{max-width:860px!important;padding:10px 22px 112px!important}
.hero{height:285px!important;margin:8px 0 0!important;padding:28px 34px!important;border-radius:27px!important;border:1px solid #d8b16dc7!important;background:radial-gradient(360px 230px at 88% 8%,#d8b16d13,transparent 70%),linear-gradient(145deg,#0d1117,#070a0f)!important;box-shadow:inset 0 1px #fff2,0 24px 70px #0009!important}
.hero:before{width:480px!important;height:300px!important;right:-105px!important;top:-125px!important;border-color:#f0c87360!important;box-shadow:0 0 0 30px #f0c87308,0 0 0 62px #f0c87304!important}
.hero:after{width:430px!important;height:270px!important;right:-65px!important;top:-12px!important;border-color:#f0c87328!important}
.hero-photo{display:none!important}
.kicker{font-size:12px!important;letter-spacing:.27em!important;color:var(--gold2)!important}
.hero-name{font-size:39px!important;max-width:100%!important;margin:12px 0 6px!important;letter-spacing:-.055em!important}
.hero-meta{font-size:16px!important;color:#bcb8b0!important}
.hero-km{font-size:55px!important;margin-top:38px!important;letter-spacing:-.06em!important}
.hero-km span{font-size:16px!important;color:#bcb8b0!important;letter-spacing:0!important}
.progress-wrap{left:34px!important;right:34px!important;bottom:24px!important}
.progress-label{font-size:13px!important;color:#c8c2b8!important;margin-bottom:9px!important}
.progress{height:9px!important;background:#ffffff12!important}.progress i{background:linear-gradient(90deg,#d7aa55,#f5d28b)!important;box-shadow:0 0 20px #d8b16d66!important}
.progress-wrap:after{content:'●  ●  ●';position:absolute;right:50%;bottom:-31px;transform:translateX(50%);font-size:9px;letter-spacing:5px;color:#77736d}.progress-wrap:before{content:'●';position:absolute;right:50%;bottom:-31px;transform:translateX(calc(50% - 20px));font-size:10px;color:#f1cf91;z-index:2}
.section-head{margin:30px 3px 14px!important}.section-head h2,.events-head h2{font-size:21px!important;letter-spacing:-.025em!important}.section-head h2:after,.events-head h2:after{height:3px!important;width:48px!important;background:#f1cf91!important}
.quick-grid,.stats-grid{gap:11px!important}.quick,.stat-card{border-color:#b78d49b8!important;border-radius:20px!important;background:linear-gradient(145deg,#13171d,#080b10)!important;box-shadow:inset 0 1px #fff1,0 16px 40px #0006!important}
.quick{height:160px!important;padding:17px!important}.quick strong{font-size:16px!important;margin-top:15px!important}.quick small{font-size:12px!important;line-height:1.45!important;color:#bdb8af!important}.quick:after{right:14px!important;bottom:9px!important;color:#f0c979!important}
.icon{width:50px!important;height:50px!important;border-radius:16px!important;border-color:#dcb66d99!important;background:#d8b16d13!important;font-size:25px!important}
.stat-card{height:155px!important;padding:16px!important}.stat-card b{font-size:30px!important;margin-top:16px!important}.stat-card span{font-size:12px!important;line-height:1.45!important;color:#bdb8af!important}.stat-icon{width:45px!important;height:45px!important;border-color:#dcb66d99!important;background:#d8b16d13!important;color:#f1cf91!important}
.events{margin-top:34px!important}.events-head{margin-bottom:13px!important}.events-head button{padding:9px 14px!important;border-radius:13px!important;font-size:12px!important}.event-empty{padding:17px!important;border-radius:18px!important;background:linear-gradient(145deg,#10151b,#080b10)!important;border-color:#ffffff20!important}.event-empty b{font-size:15px!important}.event-empty p{font-size:12px!important;color:#aaa59d!important}
main>nav{bottom:max(9px,env(safe-area-inset-bottom))!important;height:72px!important;width:calc(100vw - 28px)!important;border-radius:24px!important;background:linear-gradient(145deg,#161b22ee,#070a0eee)!important;border-color:#ffffff2b!important;box-shadow:inset 0 1px #fff2,0 18px 60px #000b!important}
main>nav button{height:64px!important;min-height:64px!important;font-size:11px!important;color:#c1bcb4!important;gap:3px!important}
main>nav button:before{font-size:23px!important;line-height:23px!important;filter:drop-shadow(0 2px 7px #000)!important}
main>nav button:nth-child(1):before{content:'⌂'}main>nav button:nth-child(2):before{content:'⌕'}main>nav button:nth-child(3):before{content:'▣'}main>nav button:nth-child(4):before{content:'◉'}main>nav button:nth-child(5):before{content:'▥'}
main>nav button.active{color:#f1cf91!important;background:linear-gradient(145deg,#d8b16d30,#d8b16d08)!important;border-color:#d8b16d62!important;box-shadow:inset 0 1px #fff2,0 8px 22px #d8b16d18!important}
.home-nav{display:flex;gap:4px;margin:20px 0 2px;padding:4px;height:76px;border:1px solid #ffffff25;border-radius:24px;background:linear-gradient(145deg,#151a21,#080b10);box-shadow:inset 0 1px #fff1,0 16px 45px #0007;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.home-nav button{flex:1;border:1px solid transparent;border-radius:19px;background:transparent;color:#c2bdb5;font-size:13px;font-weight:700;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}.home-nav button:before{font-size:22px}.home-nav button:nth-child(1):before{content:'⌂'}.home-nav button:nth-child(2):before{content:'⌕'}.home-nav button:nth-child(3):before{content:'▣'}.home-nav button:nth-child(4):before{content:'◉'}.home-nav button:nth-child(5):before{content:'▥'}.home-nav button.active{color:#f1cf91;background:#d8b16d16;border-color:#d8b16d55}
@media(max-width:600px){main{padding:0 12px 106px!important}.hero{height:285px!important;padding:25px 30px!important;margin-top:10px!important}.hero-name{font-size:34px!important}.hero-meta{font-size:15px!important}.hero-km{font-size:48px!important;margin-top:36px!important}.progress-wrap{left:30px!important;right:30px!important;bottom:25px!important}.quick-grid,.stats-grid{gap:8px!important}.quick{height:145px!important;padding:13px!important}.quick strong{font-size:14px!important}.quick small{font-size:11px!important}.stat-card{height:145px!important;padding:13px!important}.stat-card b{font-size:27px!important}.home-nav{height:72px!important}.home-nav button{font-size:10px!important}}
`;
document.head.appendChild(s)}
function active(){try{return typeof activeCar==='function'?activeCar():null}catch(e){return null}}
function selectCar(dir){if(!Array.isArray(window.db?.cars)||db.cars.length<2)return;const i=Math.max(0,db.cars.findIndex(c=>c.id===db.activeCarId));db.activeCarId=db.cars[(i+(dir>0?1:-1)+db.cars.length)%db.cars.length].id;try{render()}catch(e){}try{saveCloud()}catch(e){}}
function bindSwipe(){const h=document.getElementById('hero');if(!h||h.dataset.moySwipeV4==='1')return;h.dataset.moySwipeV4='1';h.style.touchAction='pan-y';h.addEventListener('touchstart',e=>{if(e.touches.length===1){const t=e.touches[0];touch={x:t.clientX,y:t.clientY,time:Date.now()}}},{passive:true});h.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y,dt=Date.now()-touch.time;touch=null;if(dt<900&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-lastSwipe>400){lastSwipe=Date.now();selectCar(dx<0?1:-1)}},{passive:true})}
function makeHomeNav(){const hero=document.getElementById('hero');if(!hero||document.getElementById('homeNav'))return;const nav=document.createElement('div');nav.id='homeNav';nav.className='home-nav';[['home','Главная'],['service','ТО'],['fuel','Топливо'],['tires','Шины'],['data','Данные']].forEach(([id,label],i)=>{const b=document.createElement('button');b.dataset.tab=id;b.textContent=label;if(i===0)b.classList.add('active');b.onclick=()=>{document.querySelectorAll('.home-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const bottom=document.querySelector(`#bottomNav button[data-tab="${id}"]`);if(typeof tab==='function')tab(id,bottom)};nav.appendChild(b)});hero.insertAdjacentElement('afterend',nav)}
function syncHomeNav(){const id=document.querySelector('#bottomNav button.active')?.dataset.tab||'home';document.querySelectorAll('.home-nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id))}
function run(){css();makeHomeNav();bindSwipe();syncHomeNav();window.loadCarImage=function(){}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>setTimeout(run,60)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
