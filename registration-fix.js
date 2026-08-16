// RECOVERY_DEPLOY_V14 — password recovery uses PKCE so Safari and Yandex follow the same flow
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
})();
