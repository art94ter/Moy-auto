// RECOVERY_DEPLOY_V11 — single recovery entry point
(function(){
  const RESET = new URL('./reset.html?v=11', location.href).href;
  function params(){
    const qs = new URLSearchParams(location.search || '');
    const hs = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    return {qs, hs};
  }
  function isRecoveryUrl(){
    const {qs, hs} = params();
    const type = qs.get('type') || hs.get('type');
    return type === 'recovery' || qs.has('token_hash') || hs.has('token_hash') || qs.has('code') || hs.has('code') || hs.has('access_token') || hs.has('refresh_token') || qs.has('confirmation_url');
  }
  if(isRecoveryUrl() && !location.pathname.endsWith('/reset.html')){
    const target = new URL(RESET);
    target.search = location.search || '';
    target.hash = location.hash || '';
    location.replace(target.href);
    return;
  }
  if(!window.supabase?.createClient) return;
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
      authMsg('Письмо отправлено. Открой самое последнее письмо и нажми «Продолжить восстановление».');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };
})();
