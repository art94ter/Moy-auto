// RECOVERY_DEPLOY_V16 — password recovery + password eyes + animated dashboard car swipe
(function(){
  const RESET = new URL('./reset-v11.html', location.href).href;
  function params(){
    const qs=new URLSearchParams(location.search||'');
    const hs=new URLSearchParams((location.hash||'').replace(/^#/,''));
    return {qs,hs};
  }
  function isRecoveryUrl(){
    const {qs,hs}=params();
    const type=qs.get('type')||hs.get('type');
    return type==='recovery'||qs.has('token_hash')||hs.has('token_hash')||qs.has('code')||hs.has('code')||hs.has('access_token')||hs.has('refresh_token')||qs.has('confirmation_url');
  }
  if(isRecoveryUrl()&&!location.pathname.endsWith('/reset-v11.html')){
    const target=new URL(RESET);
    target.search=location.search||'';
    target.hash=location.hash||'';
    location.replace(target.href);
    return;
  }
  if(!window.supabase?.createClient)return;
  const U='https://rimssvnrcpnemeiwptxu.supabase.co';
  const K='sb_publishable_RjG_mMHnoSt7TpQEyUpaQw_MlK6kNL_';
  const supa=window.supabase.createClient(U,K,{auth:{flowType:'pkce',autoRefreshToken:true,persistSession:true,detectSessionInUrl:false}});
  window.resetPassword=async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email){authMsg('Сначала введи e-mail.');return;}
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const {error}=await supa.auth.resetPasswordForEmail(email,{redirectTo:RESET});
      if(error)throw error;
      authMsg('Письмо отправлено. Открой самое последнее письмо и перейди по ссылке восстановления.');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };

  // 👁 Показывать/скрывать пароль во всех полях type=password.
  function addPasswordEyes(){
    document.querySelectorAll('input[type="password"]').forEach(function(input){
      if(input.dataset.eyeAdded==='1')return;
      input.dataset.eyeAdded='1';
      const wrap=document.createElement('span');
      wrap.className='password-eye-wrap';
      const parent=input.parentNode;
      parent.insertBefore(wrap,input);
      wrap.appendChild(input);
      const eye=document.createElement('button');
      eye.type='button';
      eye.className='password-eye';
      eye.setAttribute('aria-label','Показать пароль');
      eye.setAttribute('title','Показать пароль');
      eye.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/></svg>';
      eye.addEventListener('click',function(){
        const show=input.type==='password';
        input.type=show?'text':'password';
        eye.classList.toggle('is-visible',show);
        eye.setAttribute('aria-label',show?'Скрыть пароль':'Показать пароль');
        eye.setAttribute('title',show?'Скрыть пароль':'Показать пароль');
      });
      wrap.appendChild(eye);
    });
  }
  const eyeStyle=document.createElement('style');
  eyeStyle.textContent='.password-eye-wrap{position:relative;width:100%;display:block}.password-eye-wrap>input{padding-right:52px!important}.password-eye{position:absolute!important;right:6px;top:50%;transform:translateY(-50%);width:42px!important;min-width:42px!important;height:40px!important;min-height:40px!important;margin:0!important;padding:8px!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#8e98a8!important;display:grid;place-items:center;cursor:pointer}.password-eye:hover{filter:none!important;transform:translateY(-50%)!important;color:#f0cf91!important}.password-eye svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.password-eye.is-visible{color:#f0cf91!important}';
  document.head.appendChild(eyeStyle);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addPasswordEyes);else addPasswordEyes();
  new MutationObserver(addPasswordEyes).observe(document.documentElement,{childList:true,subtree:true});

  // 🚗 Переключение автомобилей свайпом влево/вправо на главной карточке.
  function setupCarSwipe(){
    const hero=document.getElementById('premiumHero');
    const select=document.getElementById('topCarSelect')||document.getElementById('carSelect');
    if(!hero||!select||hero.dataset.swipeReady==='1')return;
    hero.dataset.swipeReady='1';
    let startX=0,startY=0,moved=false;
    function refreshHint(){
      const count=select.options.length;
      let hint=hero.querySelector('.car-swipe-hint');
      if(count<2){if(hint)hint.remove();return;}
      if(!hint){
        hint=document.createElement('div');
        hint.className='car-swipe-hint';
        hint.innerHTML='<span class="car-swipe-arrows">‹</span><span class="car-swipe-text">Свайп</span><span class="car-swipe-arrows">›</span><span class="car-swipe-dots"></span>';
        hero.appendChild(hint);
      }
      const dots=hint.querySelector('.car-swipe-dots');
      dots.innerHTML=Array.from(select.options).map((_,i)=>`<i class="${i===select.selectedIndex?'active':''}"></i>`).join('');
    }
    function move(delta){
      const n=select.options.length;
      if(n<2)return;
      const next=(select.selectedIndex+delta+n)%n;
      const id=select.options[next].value;
      hero.classList.remove('car-swipe-left','car-swipe-right');
      void hero.offsetWidth;
      hero.classList.add(delta>0?'car-swipe-left':'car-swipe-right');
      if(typeof window.switchCar==='function')window.switchCar(id);
      else {select.value=id;select.dispatchEvent(new Event('change',{bubbles:true}));}
      setTimeout(()=>{
        hero.classList.remove('car-swipe-left','car-swipe-right');
        refreshHint();
      },380);
    }
    hero.addEventListener('touchstart',e=>{
      if(!e.touches.length)return;
      startX=e.touches[0].clientX;startY=e.touches[0].clientY;moved=false;
    },{passive:true});
    hero.addEventListener('touchmove',e=>{
      if(!e.touches.length)return;
      const dx=e.touches[0].clientX-startX,dy=e.touches[0].clientY-startY;
      if(Math.abs(dx)>18&&Math.abs(dx)>Math.abs(dy)*1.15){moved=true;e.preventDefault();}
    },{passive:false});
    hero.addEventListener('touchend',e=>{
      if(!moved)return;
      const dx=e.changedTouches[0].clientX-startX;
      if(Math.abs(dx)>=45)move(dx<0?1:-1);
    },{passive:true});
    refreshHint();
    new MutationObserver(refreshHint).observe(select,{childList:true,subtree:true});
  }
  const swipeStyle=document.createElement('style');
  swipeStyle.textContent='.car-swipe-hint{position:absolute;z-index:3;left:50%;bottom:12px;transform:translateX(-50%);display:flex;align-items:center;gap:6px;padding:6px 9px;border-radius:999px;background:rgba(7,9,13,.58);border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#9da6b4;font-size:10px;letter-spacing:.08em;pointer-events:none;white-space:nowrap}.car-swipe-arrows{font-size:16px;line-height:10px;color:#f0cf91}.car-swipe-text{text-transform:uppercase}.car-swipe-dots{display:flex;gap:3px;margin-left:2px}.car-swipe-dots i{display:block;width:4px;height:4px;border-radius:50%;background:#697382}.car-swipe-dots i.active{background:#f0cf91;transform:scale(1.25)}.car-swipe-left,.car-swipe-right{transition:transform .34s cubic-bezier(.22,.61,.36,1),opacity .34s ease,filter .34s ease}.car-swipe-left{animation:carSwipeLeft .36s cubic-bezier(.22,.61,.36,1)}.car-swipe-right{animation:carSwipeRight .36s cubic-bezier(.22,.61,.36,1)}@keyframes carSwipeLeft{0%{transform:translateX(0);opacity:1}45%{transform:translateX(-28px);opacity:.35}100%{transform:translateX(0);opacity:1}}@keyframes carSwipeRight{0%{transform:translateX(0);opacity:1}45%{transform:translateX(28px);opacity:.35}100%{transform:translateX(0);opacity:1}}';
  document.head.appendChild(swipeStyle);

  // Убираем дублирующие блоки выбора/профиля автомобиля на главной — основным остаётся hero-карточка.
  const garageStyle=document.createElement('style');
  garageStyle.textContent='.top-garage-menu{display:none!important}.card:has(#dashCar){display:none!important}';
  document.head.appendChild(garageStyle);

  function bootSwipe(){setTimeout(setupCarSwipe,300);setTimeout(setupCarSwipe,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootSwipe);else bootSwipe();
})();