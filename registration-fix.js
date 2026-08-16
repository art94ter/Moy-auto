// RECOVERY_DEPLOY_V7 — dedicated reset page
(function(){
  function recoveryParams(){
    const qs=new URLSearchParams(location.search||'');
    const hs=new URLSearchParams((location.hash||'').replace(/^#/,''));
    return {qs,hs};
  }
  function urlHasRecovery(){
    const {qs,hs}=recoveryParams();
    return qs.get('type')==='recovery' || qs.get('type')==='password_recovery' ||
      qs.has('code') || qs.has('token_hash') ||
      hs.get('type')==='recovery' || hs.has('access_token') || hs.has('refresh_token') ||
      hs.has('code') || hs.has('token_hash');
  }
  function goToReset(){
    const target='./reset.html'+(location.search||'')+(location.hash||'');
    if(location.pathname.endsWith('/reset.html')) return;
    location.replace(target);
  }

  // A recovery callback must NEVER be handled by the normal garage page.
  // Safari and Yandex can otherwise consume the Auth session differently.
  if(urlHasRecovery()){
    goToReset();
    return;
  }

  // Password-reset request always uses the dedicated static reset page.
  window.resetPassword=async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email)return authMsg('Сначала введи e-mail.');
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const redirectTo=location.origin+'/reset.html';
      const {error}=await supa.auth.resetPasswordForEmail(email,{redirectTo});
      if(error)throw error;
      authMsg('Письмо отправлено. Открой самое последнее письмо — ссылка откроет отдельную страницу создания нового пароля.');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };
})();
