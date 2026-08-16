// RECOVERY_DEPLOY_V3
(function(){
  const RECOVERY_KEY='moy-auto-recovery-v3';

  function isRecoveryUrl(){
    const qs=new URLSearchParams(location.search);
    const hs=new URLSearchParams((location.hash||'').replace(/^#/,''));
    return qs.get('type')==='recovery' || hs.get('type')==='recovery' ||
           !!hs.get('access_token') || !!hs.get('refresh_token') ||
           !!qs.get('code');
  }

  function setRecovery(on){
    window.recoveryFlow=!!on;
    try{ sessionStorage.setItem(RECOVERY_KEY,on?'1':'0'); }catch(e){}
    const app=document.getElementById('appShell');
    const auth=document.getElementById('authScreen');
    if(on){
      if(app) app.style.display='none';
      if(auth) auth.style.display='grid';
      if(typeof showAuth==='function') showAuth('recovery');
    }
  }

  if(isRecoveryUrl()){
    setRecovery(true);
  }else{
    try{ sessionStorage.removeItem(RECOVERY_KEY); }catch(e){}
  }

  const originalStartApp=window.startApp;
  window.startApp=async function(user){
    if(window.recoveryFlow || isRecoveryUrl()){
      setRecovery(true);
      return;
    }
    return originalStartApp ? originalStartApp(user) : undefined;
  };

  window.resetPassword=async function(){
    const email=(document.getElementById('authEmail')?.value||'').trim();
    if(!email)return authMsg('Сначала введи e-mail.');
    const btn=document.querySelector('#authLogin button[onclick*="resetPassword"]');
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    try{
      const {error}=await supa.auth.resetPasswordForEmail(email,{
        redirectTo:location.origin+location.pathname
      });
      if(error) return authMsg(error.message||'Не удалось отправить письмо.');
      authMsg('Письмо отправлено. Открой САМОЕ ПОСЛЕДНЕЕ письмо и нажми ссылку восстановления один раз.');
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
      const {error}=await supa.auth.updateUser({password:p1});
      if(error) return authMsg(error.message||'Не удалось сохранить пароль.');

      window.recoveryFlow=false;
      try{sessionStorage.removeItem(RECOVERY_KEY);}catch(e){}
      document.getElementById('authNewPassword').value='';
      document.getElementById('authNewPassword2').value='';

      await supa.auth.signOut({scope:'local'}).catch(()=>{});
      const app=document.getElementById('appShell');
      if(app)app.style.display='none';
      const auth=document.getElementById('authScreen');
      if(auth)auth.style.display='grid';
      showAuth('login');
      authMsg('Пароль сохранён. Теперь введи e-mail и НОВЫЙ пароль и нажми «Войти».');
    }catch(e){
      console.error('UPDATE PASSWORD ERROR',e);
      authMsg(e?.message||'Не удалось сохранить пароль.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Сохранить новый пароль';}
    }
  };

  supa.auth.onAuthStateChange((event,session)=>{
    if(event==='PASSWORD_RECOVERY'){
      setRecovery(true);
      authMsg('Придумай новый пароль.');
      return;
    }
    if(window.recoveryFlow || isRecoveryUrl())return;
    if(event==='SIGNED_IN' && session?.user && typeof originalStartApp==='function'){
      originalStartApp(session.user);
    }
  });

  if(isRecoveryUrl()){
    setRecovery(true);
    supa.auth.getSession().then(({data})=>{
      if(data?.session){
        setRecovery(true);
        authMsg('Придумай новый пароль.');
      }
    }).catch(()=>{});
  }

  if(typeof window.showAuth==='function' && isRecoveryUrl()){
    window.showAuth('recovery');
  }
})();
