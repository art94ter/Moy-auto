(function(){
  // Keep registration validation, but do not wrap startApp or recovery state.
  // Recovery is handled by index.html itself. A previous wrapper kept a local
  // recoveryMode=true after password reset and blocked every normal login.
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

  // Remove any previously installed service worker and its caches once.
  const SW_KEY='moy-auto-clean-sw-v2';
  async function cleanServiceWorker(){
    if(!('serviceWorker' in navigator)||sessionStorage.getItem(SW_KEY))return;
    try{
      sessionStorage.setItem(SW_KEY,'1');
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister()));
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
      location.reload();
    }catch(e){console.warn('SW cleanup',e);sessionStorage.removeItem(SW_KEY);}
  }
  cleanServiceWorker();
})();
