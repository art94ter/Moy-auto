(function(){
  window.signupUser = async function(){
    const name=(document.getElementById('authName')?.value||'').trim();
    const email=(document.getElementById('authEmail2')?.value||'').trim().toLowerCase();
    const password=document.getElementById('authPassword2')?.value||'';
    if(!email) return authMsg('Введите e-mail.');
    if(!/^\S+@\S+\.\S+$/.test(email)) return authMsg('Введите корректный e-mail.');
    if(password.length<6) return authMsg('Пароль должен быть не короче 6 символов.');
    const btn=document.querySelector('#authSignup button[onclick*="signupUser"]');
    if(btn){btn.disabled=true;btn.textContent='Создаём аккаунт…';}
    try{
      const result=await supa.auth.signUp({email,password,options:{data:{full_name:name,name:name},emailRedirectTo:location.origin+location.pathname}});
      const error=result.error;
      if(error){
        const m=(error.message||'').toLowerCase();
        if(m.includes('already registered')||m.includes('already exists')||m.includes('user already'))return authMsg('Этот e-mail уже зарегистрирован. Войди в аккаунт или используй «Забыли пароль?»');
        return authMsg(error.message||'Не удалось создать аккаунт.');
      }
      if(result.data && result.data.session){
        showAuth('login');
        document.getElementById('authEmail').value=email;
        document.getElementById('authPassword').value=password;
        await loginUser();
      }else{showAuth('login');authMsg('Аккаунт создан. Проверь почту и подтверди e-mail.');}
    }catch(e){console.error('SIGNUP ERROR',e);authMsg('Не удалось создать аккаунт. Попробуй ещё раз.');}
    finally{if(btn){btn.disabled=false;btn.textContent='Создать аккаунт';}}
  };

  const url=new URL(location.href);
  const hp=new URLSearchParams(location.hash.replace(/^#/,'').replace(/^\?/,'')||'');
  const recoveryUrl=url.searchParams.has('code')||url.searchParams.get('type')==='recovery'||hp.get('type')==='recovery'||hp.has('access_token')||hp.has('refresh_token');
  let recoveryMode=!!recoveryUrl;
  window.__myAutoRecoveryMode=recoveryMode;

  const originalStartApp=window.startApp;
  if(typeof originalStartApp==='function')window.startApp=async function(user){
    if(recoveryMode){showRecovery();return;}
    return originalStartApp.apply(this,arguments);
  };

  function showRecovery(){
    recoveryMode=true;window.__myAutoRecoveryMode=true;
    const app=document.getElementById('appShell');if(app)app.classList.add('authHidden');
    if(typeof showAuth==='function')showAuth('recovery');
    if(typeof authMsg==='function')authMsg('Придумай новый пароль.');
  }

  async function handleRecoveryUrl(){
    try{
      if(url.searchParams.has('code')){
        const {error}=await supa.auth.exchangeCodeForSession(url.searchParams.get('code'));
        if(error){authMsg(error.message||'Ссылка восстановления недействительна или уже использована.');return;}
        history.replaceState({},document.title,location.pathname);
        showRecovery();
        return;
      }
      if(recoveryUrl)showRecovery();
    }catch(e){console.error('RECOVERY ERROR',e);authMsg('Не удалось открыть восстановление пароля. Откройте новое письмо ещё раз.');}
  }

  if(supa?.auth)supa.auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY')showRecovery();});
  handleRecoveryUrl();
})();
