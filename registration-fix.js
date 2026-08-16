// RECOVERY_DEPLOY_V5
(function(){
  // Recovery must be driven by a real Supabase Auth session, never by a
  // persistent "pending" flag. The previous flag could leave the app stuck
  // on the new-password screen with "Auth session missing!" after a failed
  // or already-consumed reset link.
  const OLD_KEYS=[
    'moy-auto-recovery-v1','moy-auto-recovery-v2','moy-auto-recovery-v3',
    'moy-auto-recovery-v4','moy-auto-recovery-pending-v4'
  ];

  function clearOldRecoveryState(){
    for(const key of OLD_KEYS){
      try{sessionStorage.removeItem(key);}catch(e){}
      try{localStorage.removeItem(key);}catch(e){}
    }
  }

  function recoveryParams(){
    const qs=new URLSearchParams(location.search||'');
    const hs=new URLSearchParams((location.hash||'').replace(/^#/,''));
    return {qs,hs};
  }

  function urlHasRecovery(){
    const {qs,hs}=recoveryParams();
    return qs.get('type')==='recovery' ||
      qs.get('type')==='password_recovery' ||
      qs.has('code') ||
      hs.get('type')==='recovery' ||
      hs.has('access_token') ||
      hs.has('refresh_token') ||
      hs.has('code');
  }

  function setRecoveryUI(){
    window.recoveryFlow=true;
    const app=document.getElementById('appShell');
    const auth=document.getElementById('authScreen');
    if(app)app.style.display='none';
    if(auth)auth.style.display='grid';
    if(typeof showAuth==='function')showAuth('recovery');
  }

  function clearRecoveryUI(){
    window.recoveryFlow=false;
    const app=document.getElementById('appShell');
    const auth=document.getElementById('authScreen');
    if(app)app.style.display='none';
    if(auth)auth.style.display='grid';
    if(typeof showAuth==='function')showAuth('login');
  }

  async function sessionFromCallback(){
    // 1) Prefer the session already established by Supabase's automatic URL
    //    detection. This is the normal implicit-flow password recovery path.
    try{
      const {data}=await supa.auth.getSession();
      if(data?.session)return data.session;
    }catch(e){console.warn('RECOVERY GET SESSION',e)}

    const {qs,hs}=recoveryParams();

    // 2) If a PKCE-style code is present, exchange it explicitly.
    const code=qs.get('code');
    if(code){
      try{
        const {data,error}=await supa.auth.exchangeCodeForSession(code);
        if(!error && data?.session)return data.session;
        console.warn('RECOVERY CODE EXCHANGE',error);
      }catch(e){console.warn('RECOVERY CODE EXCHANGE EXCEPTION',e)}
    }

    // 3) If the callback contains an implicit-flow token pair, explicitly set
    //    it on the main client. This also repairs cases where URL detection
    //    raced the page initialization.
    const accessToken=hs.get('access_token');
    const refreshToken=hs.get('refresh_token');
    if(accessToken && refreshToken){
      try{
        const {data,error}=await supa.auth.setSession({
          access_token:accessToken,
          refresh_token:refreshToken
        });
        if(!error && data?.session)return data.session;
        console.warn('RECOVERY SET SESSION',error);
      }catch(e){console.warn('RECOVERY SET SESSION EXCEPTION',e)}
    }

    // Give Supabase's initialization/listener a moment to finish if it was
    // already consuming the callback URL in parallel.
    for(let i=0;i<8;i++){
      await new Promise(r=>setTimeout(r,150));
      try{
        const {data}=await supa.auth.getSession();
        if(data?.session)return data.session;
      }catch(e){}
    }
    return null;
  }

  async function enterRecovery(){
    const session=await sessionFromCallback();
    if(!session){
      clearRecoveryUI();
      authMsg('Ссылка восстановления уже использована или недействительна. Запроси новое письмо и открой его один раз.');
      return false;
    }
    setRecoveryUI();
    authMsg('Придумай новый пароль.');
    return true;
  }

  // Remove all stale flags created by previous recovery patches. A normal
  // visit must always show the normal login screen, not a fake recovery page.
  clearOldRecoveryState();

  const originalStartApp=window.startApp;
  window.startApp=async function(user){
    if(window.recoveryFlow || urlHasRecovery()){
      return enterRecovery();
    }
    return originalStartApp ? originalStartApp(user) : undefined;
  };

  // Password reset request: keep the existing implicit flow so the link can
  // be opened in either Safari or Yandex without a PKCE verifier mismatch.
  window.resetPassword=async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email)return authMsg('Сначала введи e-mail.');
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const redirectTo=location.origin+location.pathname;
      const {error}=await supa.auth.resetPasswordForEmail(email,{redirectTo});
      if(error)return authMsg(error.message||'Не удалось отправить письмо.');
      authMsg('Письмо отправлено. Открой самое последнее письмо и нажми ссылку восстановления один раз.');
    }catch(e){
      console.error('RECOVERY REQUEST ERROR',e);
      authMsg(e?.message||'Не удалось отправить письмо.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Забыли пароль?';}
    }
  };

  window.updatePassword=async function(){
    const p1=document.getElementById('authNewPassword')?.value||'';
    const p2=document.getElementById('authNewPassword2')?.value||'';
    if(p1.length<6)return authMsg('Новый пароль должен быть не короче 6 символов.');
    if(p1!==p2)return authMsg('Пароли не совпадают.');

    const btn=document.querySelector('#authRecovery button[onclick*="updatePassword"]');
    if(btn){btn.disabled=true;btn.textContent='Сохраняем…';}
    try{
      // Never call updateUser blindly. First make sure a real recovery session
      // exists; otherwise Supabase correctly returns "Auth session missing!".
      const session=await sessionFromCallback();
      if(!session){
        clearRecoveryUI();
        return authMsg('Сессия восстановления не установлена. Открой самое последнее письмо восстановления один раз.');
      }

      const {error}=await supa.auth.updateUser({password:p1});
      if(error)return authMsg(error.message||'Не удалось сохранить пароль.');

      try{history.replaceState({},document.title,location.pathname);}catch(e){}
      await supa.auth.signOut({scope:'local'}).catch(()=>{});
      clearRecoveryUI();
      authMsg('Пароль сохранён. Теперь введи e-mail и новый пароль и нажми «Войти».');
      const a=document.getElementById('authNewPassword');
      const b=document.getElementById('authNewPassword2');
      if(a)a.value='';
      if(b)b.value='';
    }catch(e){
      console.error('UPDATE PASSWORD ERROR',e);
      authMsg(e?.message||'Не удалось сохранить пароль.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Сохранить новый пароль';}
    }
  };

  supa.auth.onAuthStateChange((event,session)=>{
    if(event==='PASSWORD_RECOVERY'){
      if(session?.user){
        setRecoveryUI();
        authMsg('Придумай новый пароль.');
      }else{
        void enterRecovery();
      }
      return;
    }
    if(event==='SIGNED_OUT'){
      window.recoveryFlow=false;
      return;
    }
    if(window.recoveryFlow || urlHasRecovery())return;
    if(event==='SIGNED_IN' && session?.user && typeof originalStartApp==='function'){
      originalStartApp(session.user);
    }
  });

  // Handle the callback after the page has loaded. Do not enter recovery just
  // because a flag exists in storage: only a valid Auth session can do that.
  if(urlHasRecovery()){
    void enterRecovery();
  }
})();
