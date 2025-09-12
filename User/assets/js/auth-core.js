/* assets/js/auth-core.js — Auth core (safe redirect, no loop) */
(() => {
  // --- Avoid double init ---
  if (window.__AUTH_CORE_INIT__) { console.debug('[auth-core] already inited'); return; }
  window.__AUTH_CORE_INIT__ = true;

  // --- Pages (chỉnh nếu đặt khác thư mục) ---
  const PAGES = {
    intro: 'IntroPerfomanceTuyenDung.html',
    user : 'UserView.html',
  };

  // --- Keys + Helpers ---
  const KEY = { users:'cf_users', sess:'cf_session', lock:'cf_redirect_lock' };
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const show = el => { el?.classList.remove('hidden'); el?.classList.add('flex'); };
  const hide = el => { el?.classList.add('hidden'); el?.classList.remove('flex'); };
  const toast = (msg, ok=true) => {
    let t=document.getElementById('toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.className='fixed top-5 right-5 z-[120]'; document.body.appendChild(t); }
    t.innerHTML=`<div class="min-w-[260px] max-w-[380px] px-4 py-3 rounded-xl shadow-lg ${ok?'bg-emerald-600':'bg-red-600'} text-white font-semibold">${msg}</div>`;
    t.classList.remove('hidden'); setTimeout(()=>t.classList.add('hidden'), 2000);
  };

  // --- Demo store (thay bằng API khi lên production) ---
  const loadUsers = () => JSON.parse(localStorage.getItem(KEY.users) || '[]');
  const saveUsers = (u) => localStorage.setItem(KEY.users, JSON.stringify(u));
  const getSession= () => JSON.parse(localStorage.getItem(KEY.sess)  || 'null');
  const setSession= (email) => localStorage.setItem(KEY.sess, JSON.stringify({email, ts:Date.now()}));
  const clearSession = () => localStorage.removeItem(KEY.sess);
  const strongPw = pw => pw?.length>=8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);

  async function register(email, pw){
    const users=loadUsers();
    if (users.some(u=>u.email.toLowerCase()===email.toLowerCase())) throw new Error('Email đã tồn tại');
    if (!strongPw(pw)) throw new Error('Mật khẩu yếu (≥8, gồm chữ & số)');
    users.push({email, pw}); saveUsers(users);  
  }
  async function login(email, pw){
    const u=loadUsers().find(u=>u.email.toLowerCase()===email.toLowerCase());
    if (!u) throw new Error('Tài khoản không tồn tại');
    if (u.pw!==pw) throw new Error('Mật khẩu không đúng');
    setSession(email);
  }
  async function changePassword(email, oldPw, newPw){
    const users=loadUsers(); const i=users.findIndex(u=>u.email.toLowerCase()===email.toLowerCase());
    if (i<0) throw new Error('Không tìm thấy tài khoản');
    if (users[i].pw!==oldPw) throw new Error('Mật khẩu hiện tại sai');
    if (!strongPw(newPw)) throw new Error('Mật khẩu mới yếu (≥8, gồm chữ & số)');
    users[i].pw=newPw; saveUsers(users);
  }
  async function resetPassword(email, otp, newPw){
    if (otp!=='123456') throw new Error('OTP không đúng (demo: 123456)');
    const users=loadUsers(); const i=users.findIndex(u=>u.email.toLowerCase()===email.toLowerCase());
    if (i<0) throw new Error('Không tìm thấy tài khoản');
    if (!strongPw(newPw)) throw new Error('Mật khẩu mới yếu (≥8, gồm chữ & số)');
    users[i].pw=newPw; saveUsers(users);
  }

  // --- Redirect lock (chống vòng lặp) ---
  function withRedirectLock(fn){
    try{
      const now=Date.now(); const last=+(sessionStorage.getItem(KEY.lock)||0);
      if (now-last<500) return; // vừa redirect xong → bỏ qua
      sessionStorage.setItem(KEY.lock, now.toString());
    }catch{}
    fn();
  }
  function normalizePath(p){ return p.replace(/\/+$/, ''); }
  function samePath(a,b){ return normalizePath(a)===normalizePath(b); }
  function safeGo(target){
    const u=new URL(target, location.href);
    if (samePath(u.pathname, location.pathname)) { console.debug('[auth-core] skip same-path', u.pathname); return; }
    location.replace(u.href);
  }

  // --- Forms wiring (nếu phần tử tồn tại thì bind) ---
  function wireForms(){
    // login
    $('#loginForm')?.addEventListener('submit', async e=>{
      e.preventDefault();
      try{
        await login($('#loginEmail').value.trim(), $('#loginPassword').value);
        hide($('#loginModal')); toast('Đăng nhập thành công');
        withRedirectLock(()=> safeGo(PAGES.user));
      }catch(err){ toast(err.message||'Đăng nhập thất bại', false); }
    });

    // register
    // ⬇️ REPLACE HANDLER #registerForm
$('#registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const pw1 = $('#regPassword').value;
    const pw2 = $('#regPassword2').value;
    if (pw1 !== pw2) throw new Error('Xác nhận mật khẩu không khớp');

    const email = $('#regEmail').value.trim();
    await register(email, pw1);

    // đóng Register → mở Login
    hide($('#registerModal'));
    if ($('#loginEmail')) $('#loginEmail').value = email;   // prefill
    show($('#loginModal'));
    setTimeout(() => $('#loginPassword')?.focus(), 100);

    toast?.('Tạo tài khoản thành công. Vui lòng đăng nhập 👇');
  } catch (err) {
    toast?.(err.message || 'Đăng ký thất bại', false);
  }
});


    // forgot
    $('#forgotForm')?.addEventListener('submit', async e=>{
      e.preventDefault();
      try{
        await resetPassword($('#forgotEmail').value.trim(), $('#forgotOtp').value.trim(), $('#forgotNewPw').value);
        hide($('#forgotModal')); toast('Đã đổi mật khẩu. Hãy đăng nhập lại');
        show($('#loginModal'));
      }catch(err){ toast(err.message||'Không thể đổi mật khẩu', false); }
    });

    // change pw
    $('#changePwForm')?.addEventListener('submit', async e=>{
      e.preventDefault();
      try{
        const sess=getSession(); if(!sess?.email) throw new Error('Bạn chưa đăng nhập');
        const n1=$('#cpwNew').value, n2=$('#cpwNew2').value; if(n1!==n2) throw new Error('Xác nhận mật khẩu không khớp');
        await changePassword(sess.email, $('#cpwOld').value, n1);
        hide($('#changePwModal')); toast('Đã cập nhật mật khẩu');
      }catch(err){ toast(err.message||'Không thể cập nhật mật khẩu', false); }
    });

    // close by [data-close] (dấu ✕)
    document.addEventListener('click', (e)=>{
      const btn=e.target.closest('[data-close]'); if(!btn) return;
      const sel=btn.getAttribute('data-close'); const m=sel&&document.querySelector(sel); if(m) hide(m);
    });

    // mở login từ các nút
    const openLogin = ()=>{ show($('#loginModal')); setTimeout(()=> $('#loginEmail')?.focus(), 100); };
    $('#btnLoginNav')?.addEventListener('click', openLogin);
    $('#btnLoginHero')?.addEventListener('click', openLogin);
  }

  // --- Guard + Auto-redirect theo trang ---
  function guardAndAuto(){
    const sess = getSession();
    const path = location.pathname.toLowerCase();
    const isIntro = path.endsWith('/'+PAGES.intro.toLowerCase()) || path.endsWith(PAGES.intro.toLowerCase());
    const isUser  = path.endsWith('/'+PAGES.user.toLowerCase())  || path.endsWith(PAGES.user.toLowerCase());

    // Intro: đã login → sang User (1 lần)
    if (isIntro && sess?.email){
      withRedirectLock(()=> safeGo(PAGES.user));
    }
    // User: chưa login → về Intro (1 lần)
    if (isUser && !sess?.email){
      withRedirectLock(()=> safeGo(PAGES.intro));
    }
  }

  // --- Logout (#btnLogout, [data-logout], a[href="#logout"]) ---
  function wireLogout(){
    document.addEventListener('click', e=>{
      const el = e.target.closest('#btnLogout, [data-logout], a[href="#logout"]'); if(!el) return;
      e.preventDefault(); try{ clearSession(); }catch{}
      withRedirectLock(()=> safeGo(PAGES.intro));
    });
  }

  // --- BOOT ---
  wireForms();
  wireLogout();
  guardAndAuto();

  // Public helper (nếu cần)
  window.CFAuth = { getSession, setSession, clearSession };
})();
