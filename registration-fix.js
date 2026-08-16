(function(){
  // Reliable registration.
  window.signupUser=async function(){
    const name=(document.getElementById('authName')?.value||'').trim();
    const email=(document.getElementById('authEmail2')?.value||'').trim().toLowerCase();
    const password=document.getElementById('authPassword2')?.value||'';
    if(!email)return authMsg('Введите e-mail.');
    if(!/^\S+@\S+\.\S+$/.test(email))return authMsg('Введите корректный e-mail.');
    if(password.length<6)return authMsg('Пароль должен быть не короче 6 символов.');
    const btn=document.querySelector('#authSignup button[onclick*="signupUser"]');
    if(btn){btn.disabled=true;btn.textContent='Создаём аккаунт…';}
    try{
      const result=await supa.auth.signUp({email,password,options:{data:{full_name:name,name:name},emailRedirectTo:location.origin+location.pathname}});
      if(result.error){
        const m=(result.error.message||'').toLowerCase();
        if(m.includes('already registered')||m.includes('already exists')||m.includes('user already'))return authMsg('Этот e-mail уже зарегистрирован. Войди в аккаунт или используй «Забыли пароль?»');
        return authMsg(result.error.message||'Не удалось создать аккаунт.');
      }
      if(result.data?.session){showAuth('login');document.getElementById('authEmail').value=email;document.getElementById('authPassword').value=password;await loginUser();}
      else{showAuth('login');authMsg('Аккаунт создан. Проверь почту и подтверди e-mail.');}
    }catch(e){console.error('SIGNUP ERROR',e);authMsg(e?.message||'Не удалось создать аккаунт.');}
    finally{if(btn){btn.disabled=false;btn.textContent='Создать аккаунт';}}
  };

  // Replace the old service worker that injected a second recovery screen.
  const SW_KEY='moy-auto-clean-sw-v1';
  async function cleanServiceWorker(){
    if(!('serviceWorker' in navigator)||sessionStorage.getItem(SW_KEY))return;
    try{
      sessionStorage.setItem(SW_KEY,'1');
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister()));
      await navigator.serviceWorker.register('./sw-clean.js');
      location.reload();
    }catch(e){console.warn('SW cleanup',e);sessionStorage.removeItem(SW_KEY);}
  }
  cleanServiceWorker();

  // Password recovery must never open the cabinet before a new password is set.
  const url=new URL(location.href);
  const hp=new URLSearchParams(location.hash.replace(/^#/,'').replace(/^\?/,'')||'');
  const recoveryUrl=url.searchParams.has('code')||url.searchParams.get('type')==='recovery'||hp.get('type')==='recovery'||hp.has('access_token')||hp.has('refresh_token');
  let recoveryMode=!!recoveryUrl;
  function showRecovery(){
    recoveryMode=true;
    const app=document.getElementById('appShell');if(app)app.classList.add('authHidden');
    if(typeof showAuth==='function')showAuth('recovery');
    if(typeof authMsg==='function')authMsg('Придумай новый пароль.');
  }
  const originalStartApp=window.startApp;
  if(typeof originalStartApp==='function')window.startApp=async function(user){
    if(recoveryMode){showRecovery();return;}
    return originalStartApp.apply(this,arguments);
  };
  if(supa?.auth)supa.auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY')showRecovery();});
  (async()=>{
    try{
      if(url.searchParams.has('code')){
        const {error}=await supa.auth.exchangeCodeForSession(url.searchParams.get('code'));
        if(error){authMsg(error.message||'Ссылка восстановления недействительна или уже использована.');return;}
        history.replaceState({},document.title,location.pathname);
        showRecovery();
      }else if(recoveryUrl){showRecovery();}
    }catch(e){console.error('RECOVERY ERROR',e);authMsg('Не удалось открыть восстановление пароля. Откройте новое письмо ещё раз.');}
  })();
})();
