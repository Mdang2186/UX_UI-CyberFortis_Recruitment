/* ======================== SETTINGS – FULL JS (OPTIMIZED) ========================= */
/* Tương thích cấu trúc hiện tại: showSection, saveSettings, uploader logo/favicon,
   và FIX hoàn toàn chức năng đổi ảnh đại diện ở hồ sơ cá nhân.
   - Hỗ trợ 2 mode:
     (A) Có #avatarDropzone + #avatarInput  → dùng dropzone preview + drag&drop
     (B) Không có dropzone                  → tự tạo input ẩn & cập nhật .profile-avatar
   - Ảnh đại diện auto resize/crop về PNG vuông 256x256 để lên UI sắc nét.
   - Lưu base64 avatar vào localStorage để reload vẫn hiển thị.
*/

/* ------------------------------ UTILITIES -------------------------------- */
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const byId = (id) => document.getElementById(id);

function showNotification(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `alert alert-${type}`;
  el.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000; min-width: 300px;
    display:flex;align-items:center;gap:10px; animation: slideIn .25s ease;
  `;
  const icon = type === 'success' ? 'check-circle'
             : type === 'error'   ? 'exclamation-circle'
             : 'info-circle';
  el.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'slideOut .25s ease';
    setTimeout(() => el.remove(), 260);
  }, 3000);
}

// Animations (if not exists)
(() => {
  if (document.getElementById('cf-anim-style')) return;
  const style = document.createElement('style');
  style.id = 'cf-anim-style';
  style.textContent = `
    @keyframes slideIn { from{ transform: translateX(100%); opacity: 0 } to{ transform: translateX(0); opacity: 1 } }
    @keyframes slideOut{ from{ transform: translateX(0); opacity: 1 }    to{ transform: translateX(100%); opacity: 0 } }
  `;
  document.head.appendChild(style);
})();

// Input helpers
function getVal(id){ return (byId(id)?.value || '').trim(); }
function setVal(id, v){ const el = byId(id); if (el!=null) el.value = v ?? ''; }

/* ------------------------------ NAV TABS --------------------------------- */
// Không thay đổi API: giữ signature showSection(sectionId, element)
window.showSection = window.showSection || function(sectionId, element){
  $$('.settings-section').forEach(s => s.classList.remove('active'));
  byId(sectionId)?.classList.add('active');
  $$('.settings-nav-item').forEach(i => i.classList.remove('active'));
  element?.classList?.add('active');
};

/* ------------------------------ SAVE SETTINGS ---------------------------- */
// Giữ nút đang bấm, hiển thị spinner, và tự reset
window.saveSettings = window.saveSettings || function(section){
  const btn = window.event?.target;
  const keep = btn?.innerHTML;
  if (btn){ btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...'; }

  // Demo: lưu hồ sơ cá nhân vào localStorage (text fields)
  if (section === 'profile'){
    const profile = {
      fullname: getVal('pf_fullname'),
      email:    getVal('pf_email'),
      phone:    getVal('pf_phone'),
      title:    getVal('pf_title'),
      dept:     getVal('pf_dept'),
      username: getVal('pf_username'),
      dob:      getVal('pf_dob'),
      gender:   getVal('pf_gender'),
      address:  getVal('pf_address'),
      bio:      getVal('pf_bio'),
      website:  getVal('pf_website'),
      linkedin: getVal('pf_linkedin'),
      github:   getVal('pf_github'),
      facebook: getVal('pf_facebook'),
      twitter:  getVal('pf_twitter')
    };
    try { localStorage.setItem('cf_profile', JSON.stringify(profile)); } catch {}
  }

  // Giả lập API
  setTimeout(() => {
    if (btn){ btn.innerHTML = '<i class="fas fa-check"></i> Đã lưu'; }
    showNotification('Cài đặt đã được lưu thành công!', 'success');
    setTimeout(() => {
      if (btn){ btn.innerHTML = keep; btn.disabled = false; }
    }, 1200);
  }, 900);
};

window.saveAllSettings = window.saveAllSettings || function(){
  showNotification('Đang lưu tất cả cài đặt...', 'info');
  setTimeout(() => showNotification('Tất cả cài đặt đã được lưu!', 'success'), 1200);
};

/* ------------------------------ Uploader Core ---------------------------- */
/* Drop-in initUploader cho các khối .cf-upl (logo, favicon, avatar, cover) */
function initUploader({ root, input, maxMB, acceptTypes, transform, onFileReady }){
  if (!root || !input) return;

  const area    = root.querySelector('.cf-upl__area');
  const preview = root.querySelector('.cf-upl__preview');
  const img     = preview?.querySelector('img');
  const btnChg  = preview?.querySelector('[data-action="change"]');
  const btnDel  = preview?.querySelector('[data-action="remove"]');

  const pick = () => input.click();

  area?.addEventListener('click', pick);
  btnChg?.addEventListener('click', pick);
  btnDel?.addEventListener('click', clearFile);

  // Drag&Drop
  ['dragenter','dragover'].forEach(evt=>{
    root.addEventListener(evt, e=>{ e.preventDefault(); root.classList.add('is-drag'); }, { passive:false });
  });
  ['dragleave','drop'].forEach(evt=>{
    root.addEventListener(evt, e=>{ e.preventDefault(); root.classList.remove('is-drag'); }, { passive:false });
  });
  root.addEventListener('drop', e=>{
    const f = e.dataTransfer?.files?.[0]; if (f) handleFile(f);
  });

  // Input change
  input.addEventListener('change', ()=> {
    const f = input.files?.[0]; if (f) handleFile(f);
  });

  async function handleFile(file){
    if (acceptTypes?.length && !acceptTypes.includes(file.type)){
      alert(`Định dạng không hợp lệ: ${file.type}`); return;
    }
    if (maxMB && file.size > maxMB * 1024 * 1024){
      alert(`Kích thước vượt quá ${maxMB}MB`); return;
    }
    if (typeof transform === 'function'){
      file = await transform(file); // ví dụ: resize/crop
    }
    const url = URL.createObjectURL(file);
    if (img){ img.src = url; }
    if (area) area.hidden = true;
    if (preview) preview.hidden = false;
    onFileReady?.(file, url);
  }

  function clearFile(){
    if (area) area.hidden = false;
    if (preview) preview.hidden = true;
    if (img) img.src = '';
    input.value = '';
    onFileReady?.(null, null);
  }
}

/* ------------------------------ Image Helpers --------------------------- */
function readImage(file){
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/* center-crop → PNG w×h */
function cropToPng(img, w, h){
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const s = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = Math.floor((img.naturalWidth - s)/2);
  const sy = Math.floor((img.naturalHeight - s)/2);
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(img, sx, sy, s, s, 0, 0, w, h);
  return new Promise(res => canvas.toBlob(b => res(b), 'image/png', 0.92));
}

async function resizeAvatarTo256(file){
  const img = await readImage(file);
  const blob = await cropToPng(img, 256, 256);
  return new File([blob], 'avatar.png', { type:'image/png' });
}

async function resizeCover(file){
  const img = await readImage(file);
  const blob = await cropToPng(img, 1200, 300);
  return new File([blob], 'cover.png', { type:'image/png' });
}

function fileToDataURL(file){
  return new Promise((resolve, reject)=>{
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* ------------------------------ PROFILE – AVATAR FIX -------------------- */
const AVATAR_LOCAL_KEY = 'cf_profile_avatar_b64';
const COVER_LOCAL_KEY  = 'cf_profile_cover_b64';

function setInitialsIfNeeded(){
  const box = $('.profile-avatar');
  if (!box || box.classList.contains('has-photo')) return;
  const name = getVal('pf_fullname') || 'Nguyễn Văn An';
  const initials = name.trim().split(/\s+/).slice(-2).map(s => s[0]).join('').toUpperCase() || 'NA';
  box.textContent = initials;
}

function applyAvatarB64(b64){
  const box = $('.profile-avatar');
  if (!box) return;
  if (b64){
    box.style.backgroundImage = `url("${b64}")`;
    box.classList.add('has-photo');
    box.textContent = '';
  } else {
    box.style.backgroundImage = '';
    box.classList.remove('has-photo');
    setInitialsIfNeeded();
  }
}

/* Fallback picker: nếu KHÔNG có #avatarInput thì tự tạo input ẩn */
function ensureFallbackAvatarPicker(){
  let input = byId('avatarInput');
  if (!input){
    input = document.createElement('input');
    input.type = 'file';
    input.id = 'avatarInput';
    input.accept = 'image/png,image/jpeg';
    input.hidden = true;
    document.body.appendChild(input);
  }
  return input;
}

async function handleAvatarFile(file){
  if (!file) return;
  if (!/image\/(png|jpeg)/.test(file.type)){ alert('Chỉ nhận PNG/JPG'); return; }
  if (file.size > 2*1024*1024){ alert('Ảnh ≤ 2MB'); return; }
  const png = await resizeAvatarTo256(file);
  const b64 = await fileToDataURL(png);
  applyAvatarB64(b64);
  try { localStorage.setItem(AVATAR_LOCAL_KEY, b64); } catch {}
}

/* ------------------------------ BOOTSTRAP ------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Mặc định mở tab hồ sơ nếu có
  if (byId('profile') && $('.settings-nav-item[href="#profile"]')){
    showSection('profile', $('.settings-nav-item[href="#profile"]'));
  }

  /* ====== Khởi tạo uploader cho các khối có sẵn ====== */
  const uploadState = {
    logo   : { file:null, blobUrl:null },
    favicon: { file:null, blobUrl:null },
    avatar : { file:null, blobUrl:null },
    cover  : { file:null, blobUrl:null }
  };

  // Ngăn mở file khi thả ảnh ngoài dropzone
  ['dragover','drop'].forEach(evt => window.addEventListener(evt, e => e.preventDefault(), { passive:false }));

  // LOGO
  initUploader({
    root: byId('logoDropzone'),
    input: byId('logoInput'),
    maxMB: 2,
    acceptTypes: ['image/png','image/jpeg','image/svg+xml'],
    onFileReady: (file, url) => { uploadState.logo = { file, blobUrl:url }; }
  });

  // FAVICON
  initUploader({
    root: byId('faviconDropzone'),
    input: byId('faviconInput'),
    maxMB: 0.5,
    acceptTypes: ['image/png','image/x-icon'],
    onFileReady: (file, url) => { uploadState.favicon = { file, blobUrl:url }; }
  });

  /* ====== AVATAR – 2 MODE ====== */
  const avatarDrop = byId('avatarDropzone');
  const avatarInputExisting = byId('avatarInput');
  const avatarButton = byId('uploadBtn');
  const avatarCircle = $('.profile-avatar');

  if (avatarDrop && avatarInputExisting){
    // MODE A: Có dropzone avatar
    initUploader({
      root: avatarDrop,
      input: avatarInputExisting,
      maxMB: 2,
      acceptTypes: ['image/png','image/jpeg'],
      transform: resizeAvatarTo256,
      onFileReady: async (file, url) => {
        uploadState.avatar = { file, blobUrl:url };
        if (file){
          const b64 = await fileToDataURL(file);
          try { localStorage.setItem(AVATAR_LOCAL_KEY, b64); } catch {}
          applyAvatarB64(b64);
        } else {
          try { localStorage.removeItem(AVATAR_LOCAL_KEY); } catch {}
          applyAvatarB64('');
        }
      }
    });
    // Cho phép click vòng tròn cũng mở picker
    avatarCircle?.addEventListener('click', () => avatarInputExisting.click());
    avatarButton?.addEventListener('click', () => avatarInputExisting.click());
  } else {
    // MODE B: Không có dropzone → tạo input ẩn
    const fallbackInput = ensureFallbackAvatarPicker();
    fallbackInput.addEventListener('change', e => handleAvatarFile(e.target.files?.[0]));
    avatarCircle?.addEventListener('click', () => fallbackInput.click());
    avatarButton?.addEventListener('click', () => fallbackInput.click());
  }

  /* ====== COVER (nếu có) ====== */
  const coverDrop = byId('coverDropzone');
  const coverInput = byId('coverInput');
  if (coverDrop && coverInput){
    const heroCoverEls = $$('.js-cover-target'); // nếu bạn có hero preview
    initUploader({
      root: coverDrop,
      input: coverInput,
      maxMB: 3,
      acceptTypes: ['image/png','image/jpeg'],
      transform: resizeCover,
      onFileReady: async (file, url) => {
        uploadState.cover = { file, blobUrl:url };
        if (file){
          const b64 = await fileToDataURL(file);
          try { localStorage.setItem(COVER_LOCAL_KEY, b64); } catch {}
          heroCoverEls.forEach(div => div.style.backgroundImage = `url("${b64}")`);
        } else {
          try { localStorage.removeItem(COVER_LOCAL_KEY); } catch {}
          heroCoverEls.forEach(div => div.style.backgroundImage = '');
        }
      }
    });
  }

  /* ====== Khôi phục dữ liệu hồ sơ + avatar/cover từ localStorage ====== */
  try {
    const raw = localStorage.getItem('cf_profile');
    if (raw){
      const pf = JSON.parse(raw);
      setVal('pf_fullname', pf.fullname);
      setVal('pf_email',    pf.email);
      setVal('pf_phone',    pf.phone);
      setVal('pf_title',    pf.title);
      setVal('pf_dept',     pf.dept);
      setVal('pf_username', pf.username);
      setVal('pf_dob',      pf.dob);
      setVal('pf_gender',   pf.gender);
      setVal('pf_address',  pf.address);
      setVal('pf_bio',      pf.bio);
      setVal('pf_website',  pf.website);
      setVal('pf_linkedin', pf.linkedin);
      setVal('pf_github',   pf.github);
      setVal('pf_facebook', pf.facebook);
      setVal('pf_twitter',  pf.twitter);
    }
  } catch {}

  // Khôi phục avatar/cover
  try {
    const av = localStorage.getItem(AVATAR_LOCAL_KEY);
    if (av) applyAvatarB64(av); else setInitialsIfNeeded();

    const cv = localStorage.getItem(COVER_LOCAL_KEY);
    if (cv) $$('.js-cover-target').forEach(div => div.style.backgroundImage = `url("${cv}")`);
  } catch {}

  // Khi thay đổi tên → cập nhật initials nếu chưa có ảnh
  byId('pf_fullname')?.addEventListener('input', setInitialsIfNeeded);

  /* ====== Chặn nhảy trang vì anchor #hash trong menu settings ====== */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.settings-nav-item[href^="#"], .settings-nav a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const sectionId = link.getAttribute('href')?.slice(1);
    if (!sectionId) return;
    const y = window.scrollY;
    showSection(sectionId, link);
    requestAnimationFrame(() => window.scrollTo({ top: y, left: 0 }));
  }, { passive:false });

  /* ====== Auto-resize textarea ====== */
  $$('.form-textarea').forEach(ta => {
    const fit = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
    ta.addEventListener('input', fit); fit();
  });
});
// ==== FIX tabs: scope theo container, tránh đụng ID trùng ====
(function initScopedTabs() {
  // Với mỗi cụm card có tabs
  document.querySelectorAll('.card-shadow').forEach(container => {
    const tabButtons  = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');
    if (!tabButtons.length || !tabContents.length) return;

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');

        // 1) Visual state cho nút trong CÙNG container
        tabButtons.forEach(btn => {
          btn.classList.remove('border-blue-500', 'text-blue-600');
          btn.classList.add('border-transparent', 'text-gray-500');
        });
        button.classList.remove('border-transparent', 'text-gray-500');
        button.classList.add('border-blue-500', 'text-blue-600');

        // 2) Ẩn/hiện panel trong CÙNG container
        tabContents.forEach(content => content.classList.add('hidden'));
        const target = container.querySelector(`#${tabName}-tab`);
        if (target) target.classList.remove('hidden');
      });
    });
  });
})();
