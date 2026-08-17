(function(){
'use strict';
if(window.__MOY_AUTO_FIXES_V2__)return;
window.__MOY_AUTO_FIXES_V2__=true;
const CACHE='moy-auto-image-v2:';
let reqId=0,touch=null,lastSwipe=0;

function css(){
 if(document.getElementById('moy-auto-fixes-v2'))return;
 const s=document.createElement('style');s.id='moy-auto-fixes-v2';
 s.textContent=`
 :root{--muted:#d0c8bc!important;--text:#f5f2ec!important}
 body,button,input,select,textarea{color:#f5f2ec}
 .hero-meta,.hero-km span,.progress-label,.quick small,.stat-card span,.events-head span,.event-empty p,.muted,.small{color:#d0c8bc!important}
 main>nav button{color:#d0c8bc!important}
 main>nav button.active{color:#f1cf91!important}
 .hero-photo{transition:opacity .25s ease,filter .25s ease!important}
 .hero-photo.moy-loading{opacity:.08!important}
 `;
 document.head.appendChild(s);
}

// Disable the older loose image loader from index.html. This fixer owns image selection.
window.loadCarImage=function(){};
function active(){try{return typeof activeCar==='function'?activeCar():null}catch(e){return null}}
function photo(){return document.getElementById('heroPhoto')||document.querySelector('.hero-photo')}
function norm(v){return String(v||'').toLowerCase().replace(/[^a-zа-я0-9]+/gi,' ').trim()}
function tokens(v){return norm(v).split(/\s+/).filter(x=>x.length>1)}
function sig(c){const x=c?.car||{};return [x.name||'',x.year||'',x.engine||''].join('|').trim()}
function score(title,name,year){
 const t=norm(title), ts=tokens(name);let n=0;
 ts.forEach(x=>{if(t.includes(x))n+=3});
 if(year&&t.includes(String(year)))n+=4;
 if(/\b(car|automobile|vehicle|ford|focus|transit|connect|volkswagen|bmw|audi|mercedes|toyota|skoda|opel|renault|peugeot|citroen|kia|hyundai|nissan|honda)\b/i.test(t))n+=1;
 if(/logo|badge|engine|interior|wheel|rim|part|brochure|drawing|diagram|toy|model kit|game|video/i.test(t))n-=8;
 return n;
}
async function commons(name,year){
 const u=new URL('https://commons.wikimedia.org/w/api.php');
 u.searchParams.set('action','query');u.searchParams.set('generator','search');
 u.searchParams.set('gsrsearch',`"${name}" ${year||''} car`);u.searchParams.set('gsrnamespace','6');
 u.searchParams.set('gsrlimit','20');u.searchParams.set('prop','imageinfo');u.searchParams.set('iiprop','url|mime');
 u.searchParams.set('iiurlwidth','1200');u.searchParams.set('format','json');u.searchParams.set('origin','*');
 const r=await fetch(u.toString(),{cache:'no-store'});if(!r.ok)return null;const d=await r.json();
 const pages=Object.values(d?.query?.pages||{}).filter(p=>p?.imageinfo?.[0]&&String(p.imageinfo[0].mime||'').startsWith('image/'));
 pages.sort((a,b)=>score(b.title,name,year)-score(a.title,name,year));
 const best=pages[0];const sc=best?score(best.title,name,year):0;
 return sc>=7?(best.imageinfo[0].thumburl||best.imageinfo[0].url):null;
}
async function wikipedia(name){
 const u=new URL('https://en.wikipedia.org/w/api.php');u.searchParams.set('action','query');u.searchParams.set('list','search');
 u.searchParams.set('srsearch',name+' car');u.searchParams.set('srnamespace','0');u.searchParams.set('srlimit','5');u.searchParams.set('format','json');u.searchParams.set('origin','*');
 const r=await fetch(u.toString(),{cache:'no-store'});if(!r.ok)return null;const d=await r.json();
 const hits=d?.query?.search||[];if(!hits.length)return null;
 const title=hits[0].title;const p=new URL('https://en.wikipedia.org/w/api.php');p.searchParams.set('action','query');p.searchParams.set('titles',title);p.searchParams.set('prop','pageimages');p.searchParams.set('pithumbsize','1200');p.searchParams.set('format','json');p.searchParams.set('origin','*');
 const rr=await fetch(p.toString(),{cache:'no-store'});if(!rr.ok)return null;const dd=await rr.json();const page=Object.values(dd?.query?.pages||{})[0];return page?.thumbnail?.source||null;
}
async function findImage(c){
 const x=c?.car||{},name=String(x.name||'').trim(),year=String(x.year||'').trim();if(!name)return null;
 const key=CACHE+sig(c).toLowerCase();
 try{const old=sessionStorage.getItem(key);if(old)return old}catch(e){}
 let url=null;
 try{url=await commons(name,year)}catch(e){}
 if(!url){try{url=await wikipedia(name)}catch(e){}}
 if(url){try{sessionStorage.setItem(key,url)}catch(e){}}
 return url;
}
async function updateImage(force){
 const img=photo(),c=active();if(!img||!c)return;
 const s=sig(c);if(!force&&img.dataset.moySig===s&&img.src)return;
 const id=++reqId;img.dataset.moySig=s;img.classList.add('moy-loading');img.removeAttribute('src');
 const url=await findImage(c);if(id!==reqId)return;
 if(url){img.onload=()=>img.classList.remove('moy-loading');img.onerror=()=>{img.removeAttribute('src');img.classList.remove('moy-loading')};img.src=url}
 else img.classList.remove('moy-loading');
}
function selectCar(dir){
 if(!Array.isArray(window.db?.cars)||db.cars.length<2)return;
 const i=Math.max(0,db.cars.findIndex(c=>c.id===db.activeCarId));db.activeCarId=db.cars[(i+(dir>0?1:-1)+db.cars.length)%db.cars.length].id;
 try{render()}catch(e){};try{saveCloud()}catch(e){};setTimeout(()=>updateImage(true),0);
}
function bindSwipe(){
 const h=document.getElementById('hero');if(!h||h.dataset.moySwipeV2==='1')return;h.dataset.moySwipeV2='1';h.style.touchAction='pan-y';
 h.addEventListener('touchstart',e=>{if(e.touches.length===1){const t=e.touches[0];touch={x:t.clientX,y:t.clientY,time:Date.now()}}},{passive:true});
 h.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y,dt=Date.now()-touch.time;touch=null;if(dt<900&&Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15&&Date.now()-lastSwipe>400){lastSwipe=Date.now();selectCar(dx<0?1:-1)}},{passive:true});
}
function run(){css();bindSwipe();updateImage(false)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(()=>setTimeout(run,80)).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
