// RECOVERY_DEPLOY_V9 — browser-independent password recovery for GitHub Pages
(function(){
  const SUPABASE_URL='https://rimssvnrcpnemeiwptxu.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY='sb_publishable_RjG_mMHnoSt7TpQEyUpaQw_MlK6kNL_';

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
    const target=new URL('./reset.html'+(location.search||'')+(location.hash||''),location.href).href;
    if(location.pathname.endsWith('/reset.html'))return;
    location.replace(target);
  }

  // Recovery links must never be handled by the normal garage page.
  if(urlHasRecovery()){
    goToReset();
    return;
  }

  // IMPORTANT: the main app uses its own auth client. For password recovery we
  // deliberately use an IMPLICIT-flow client so the email link carries the
  // session tokens in the URL fragment. This works even when the user opens
  // the email in a different browser (Safari/Yandex) from the one that
  // requested the reset. PKCE would require the same browser/device because
  // its code verifier is stored locally.
  const recoverySupa=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{
    auth:{flowType:'implicit',autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}
  });

  window.resetPassword=async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email)return authMsg('Сначала введи e-mail.');
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const redirectTo=new URL('./reset.html',location.href).href;
      const {error}=await recoverySupa.auth.resetPasswordForEmail(email,{redirectTo});
      if(error)throw error;
      authMsg('Письмо отправлено. Открой самое последнее письмо — ссылка откроет страницу создания нового пароля.');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };
})();
