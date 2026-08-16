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
      const result=await supa.auth.signUp({email,password,options:{data:{full_name:name,name:name}}});
      const error=result.error;
      if(error){
        const m=(error.message||'').toLowerCase();
        if(m.includes('already registered')||m.includes('already exists')||m.includes('user already')){
          return authMsg('Этот e-mail уже зарегистрирован. Войди в аккаунт или используй «Забыли пароль?»');
        }
        return authMsg(error.message||'Не удалось создать аккаунт.');
      }
      if(result.data && result.data.session){
        showAuth('login');
        document.getElementById('authEmail').value=email;
        document.getElementById('authPassword').value=password;
        await loginUser();
      }else{
        showAuth('login');
        authMsg('Аккаунт создан. Теперь войди с новым паролем.');
      }
    }catch(e){
      console.error(e);
      authMsg('Не удалось создать аккаунт. Попробуй ещё раз.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Создать аккаунт';}
    }
  };
})();
