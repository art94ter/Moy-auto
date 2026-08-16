// RECOVERY_DEPLOY_V10 — recovery entry-point only; verification is user-initiated on reset.html
(function(){
  const BASE = new URL('./', location.href);
  const RESET = new URL('./reset.html', location.href).href;

  function params(){
    const qs = new URLSearchParams(location.search || '');
    const hs = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    return {qs, hs};
  }

  function isRecoveryUrl(){
    const {qs, hs} = params();
    const type = qs.get('type') || hs.get('type');
    return type === 'recovery' || qs.has('token_hash') || hs.has('token_hash') ||
      qs.has('code') || hs.has('code') || hs.has('access_token') || hs.has('refresh_token') ||
      qs.has('confirmation_url');
  }

  // Never let the normal garage page consume a recovery callback.
  // The reset page handles token_hash only after an explicit user click,
  // preventing email scanners/prefetchers from consuming the one-time token.
  if(isRecoveryUrl() && !location.pathname.endsWith('/reset.html')){
    const target = new URL(RESET);
    target.search = location.search || '';
    target.hash = location.hash || '';
    location.replace(target.href);
    return;
  }

  // This function is intentionally independent from the main app's auth client.
  // The reset request itself does not need a browser-bound PKCE verifier when
  // the recovery email template uses {{ .TokenHash }} + verifyOtp on reset.html.
  const SUPABASE_URL='https://rimssvnrcpnemeiwptxu.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY='sb_publishable_RjG_mMHnoSt7TpQEyUpaQw_MlK6kNL_';
  if(!window.supabase?.createClient) return;
  const supa = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth:{flowType:'pkce',autoRefreshToken:true,persistSession:true,detectSessionInUrl:false}
  });

  window.resetPassword = async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email) return authMsg('Сначала введи e-mail.');
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const redirectTo = RESET;
      const {error}=await supa.auth.resetPasswordForEmail(email,{redirectTo});
      if(error) throw error;
      authMsg('Письмо отправлено. Открой самое последнее письмо и нажми «Продолжить восстановление».');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };
})();
