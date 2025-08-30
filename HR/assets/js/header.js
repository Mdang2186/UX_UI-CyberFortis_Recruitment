/* ==== HEADER: dropdown thông báo & tài khoản + click ra ngoài/ESC + NEW TOGGLE ==== */
(function () {
  const qs = (s, r = document) => r.querySelector(s);
  const el = (id) => document.getElementById(id);

  const getEls = () => ({
    userBtn: qs('#userBtn'),
    userDrop: qs('#userDropdown'),
    chevron: qs('#avatarChevron'),
    notifBtn: qs('#notifBtn'),
    notifDrop: qs('#notificationDropdown'),
    toggleCheckbox: qs('#menuToggle'),
    sidebar: qs('#sidebar'),
    mainContent: qs('#mainContent, .main-content')
  });

  // ===== USER DROPDOWN FUNCTIONS =====
  function closeUser() {
    const { userBtn, userDrop, chevron } = getEls();
    if (!userDrop) return;
    userDrop.classList.remove('show');
    if (userBtn) userBtn.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove('rotate-180');
  }

  function openUser() {
    const { userBtn, userDrop, chevron } = getEls();
    if (!userDrop) return;
    userDrop.classList.add('show');
    if (userBtn) userBtn.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.classList.add('rotate-180');
  }

  function toggleUser(e) {
    e?.stopPropagation();
    const { userDrop } = getEls();
    if (!userDrop) return;
    if (userDrop.classList.contains('show')) {
      closeUser();
    } else {
      closeNotif();
      openUser();
    }
  }

  // ===== NOTIFICATION DROPDOWN FUNCTIONS =====
  function closeNotif() {
    const { notifBtn, notifDrop } = getEls();
    if (!notifDrop) return;
    notifDrop.classList.remove('show');
    if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
  }

  function openNotif() {
    const { notifBtn, notifDrop } = getEls();
    if (!notifDrop) return;
    notifDrop.classList.add('show');
    if (notifBtn) notifBtn.setAttribute('aria-expanded', 'true');
  }

  function toggleNotif(e) {
    e?.stopPropagation();
    const { notifDrop } = getEls();
    if (!notifDrop) return;
    if (notifDrop.classList.contains('show')) {
      closeNotif();
    } else {
      closeUser();
      openNotif();
    }
  }

  // ===== SIDEBAR TOGGLE FUNCTIONS =====
function getSidebarState() {
  const { sidebar } = getEls();
  // true = ĐANG ĐÓNG (collapsed), false = ĐANG MỞ
  return sidebar ? sidebar.classList.contains('sidebar-collapsed') : false;
}


  function ensureOverlay(){
  let ov = document.getElementById('sbOverlay');
  if (!ov){
    ov = document.createElement('div');
    ov.id = 'sbOverlay';
    document.body.appendChild(ov);
  }
  return ov;
}

function setSidebarState(collapsed) {
  const { toggleCheckbox, sidebar, mainContent } = getEls();
  const overlay = ensureOverlay();

  if (toggleCheckbox) toggleCheckbox.checked = !collapsed; // ← MỞ = checked

  if (sidebar) sidebar.classList.toggle('sidebar-collapsed', collapsed);
  if (mainContent) mainContent.classList.toggle('main-content-collapsed', collapsed);

  try {
    localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
    localStorage.setItem('sb.state', collapsed ? '1' : '0');
  } catch (e) {}

  closeUser(); closeNotif();

  if (!collapsed) overlay.classList.add('show'); else overlay.classList.remove('show');

  window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed } }));
}



function toggleSidebar() {
  const collapsed = getSidebarState();   // true = đang đóng
  setSidebarState(!collapsed);           // đảo trạng thái
}

  function restoreSidebarState() {
    try {
      const saved = localStorage.getItem('sidebar-collapsed');
      if (saved === '1') {
        setSidebarState(true);
      }
    } catch (e) {
      console.warn('Could not restore sidebar state from localStorage');
    }
  }

  // ===== BINDING FUNCTIONS =====
  function bindDropdowns() {
    const { userBtn, notifBtn, userDrop, notifDrop } = getEls();

    // Bind user button
    if (userBtn && !userBtn.__bound) {
      userBtn.addEventListener('click', toggleUser);
      userBtn.__bound = true;
    }

    // Bind notification button
    if (notifBtn && !notifBtn.__bound) {
      notifBtn.addEventListener('click', toggleNotif);
      notifBtn.__bound = true;
    }

    // Click outside to close dropdowns
    if (!document.__hdrOutside) {
      document.addEventListener('click', (e) => {
        // Close user dropdown if clicking outside
        if (userDrop && userDrop.classList.contains('show')) {
          const { userBtn } = getEls();
          if (!userDrop.contains(e.target) && (!userBtn || !userBtn.contains(e.target))) {
            closeUser();
          }
        }
        
        // Close notification dropdown if clicking outside
        if (notifDrop && notifDrop.classList.contains('show')) {
          const { notifBtn } = getEls();
          if (!notifDrop.contains(e.target) && (!notifBtn || !notifBtn.contains(e.target))) {
            closeNotif();
          }
        }
      });

      // ESC key to close dropdowns
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeUser();
          closeNotif();
        }
      });

      document.__hdrOutside = true;
    }
  }

  function bindSidebarToggle() {
    const { toggleCheckbox } = getEls();
    
    if (toggleCheckbox && !toggleCheckbox.__sidebarBound) {
  // Checkbox đổi: checked = MỞ → collapsed = !checked
  toggleCheckbox.addEventListener('change', (e) => {
    setSidebarState(!e.target.checked);
  });

  // Label (for="menuToggle") click: ngăn double toggle, tự gọi toggle
  const label = document.querySelector('label[for="menuToggle"]');
  if (label && !label.__sidebarBound) {
    label.addEventListener('click', (e) => { e.preventDefault(); toggleSidebar(); });
    label.__sidebarBound = true;
  }

  toggleCheckbox.__sidebarBound = true;
}

    
    // Also bind to any existing menuToggle buttons (backward compatibility)
    const legacyToggle = el('menuToggleBtn') || document.querySelector('[data-toggle="sidebar"]');
    if (legacyToggle && !legacyToggle.__sidebarBound) {
      legacyToggle.addEventListener('click', toggleSidebar);
      legacyToggle.__sidebarBound = true;
    }
  }
// Overlay click → đóng
(function bindOverlayAndESC(){
  const overlay = document.getElementById('sbOverlay') || document.createElement('div');
  if (!overlay.id){ overlay.id = 'sbOverlay'; document.body.appendChild(overlay); }
  if (!overlay.__bound){
    overlay.addEventListener('click', () => setSidebarState(true)); // đóng
    overlay.__bound = true;
  }
  // ESC → nếu đang MỞ thì đóng
  if (!document.__sbEscBound){
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape'){
        try {
          const saved = localStorage.getItem('sidebar-collapsed') === '1';
          if (!saved) setSidebarState(true);
        } catch(_) {}
      }
    });
    document.__sbEscBound = true;
  }
})();

  // ===== RESPONSIVE HANDLING =====
  function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, always close dropdowns on resize
      closeUser();
      closeNotif();
    }
  }


  function bind() {
    const { userBtn, notifBtn, userDrop, notifDrop } = getEls();

    if (userBtn && !userBtn.__bound) {
      userBtn.addEventListener('click', toggleUser);
      userBtn.__bound = true;
    }
    if (notifBtn && !notifBtn.__bound) {
      notifBtn.addEventListener('click', toggleNotif);
      notifBtn.__bound = true;
    }

    // Click ra ngoài
    if (!document.__hdrOutside) {
      document.addEventListener('click', (e) => {
        if (userDrop && userDrop.classList.contains('show')) {
          const { userBtn } = getEls();
          if (!userDrop.contains(e.target) && (!userBtn || !userBtn.contains(e.target))) closeUser();
        }
        if (notifDrop && notifDrop.classList.contains('show')) {
          const { notifBtn } = getEls();
          if (!notifDrop.contains(e.target) && (!notifBtn || !notifBtn.contains(e.target))) closeNotif();
        }
      });
      // ESC để đóng
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeUser(); closeNotif(); } });
      document.__hdrOutside = true;
    }
  }

  // Header nạp bằng fetch → cần observe để bind lại
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else { bind(); }
  new MutationObserver(bind).observe(document.documentElement, { childList: true, subtree: true });
})();

// Toggle sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            sidebar.classList.add('sidebar-collapsed');
            mainContent.classList.add('main-content-collapsed');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
            mainContent.classList.remove('main-content-collapsed');
        }
    });

    // Dropdown functionality
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notificationDropdown');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    notifBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notifDropdown.classList.toggle('show');
        userDropdown.classList.remove('show');
    });

    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
        notifDropdown.classList.remove('show');
    });

    document.addEventListener('click', function() {
        notifDropdown.classList.remove('show');
        userDropdown.classList.remove('show');
    });
});// ====== Helpers ======
function getEls(){
  return {
    toggle: document.getElementById('menuToggle'),
    sidebar: document.getElementById('sidebar'),
    main: document.querySelector('.main-content') || document.getElementById('mainContent'),
    overlay: document.getElementById('overlay')
  };
}

function isCollapsed(sidebar){
  return sidebar?.classList.contains('sidebar-collapsed');
}

function syncIconFromSidebar(){
  const { toggle, sidebar } = getEls();
  if(!toggle || !sidebar) return;
  const collapsed = isCollapsed(sidebar);
  // mở => checked = true (để ra X)
  toggle.checked = !collapsed;
  toggle.setAttribute('aria-expanded', String(!collapsed));
  toggle.setAttribute('aria-pressed',  String(!collapsed));
}

function applySidebar(collapsed){
  const { toggle, sidebar, main, overlay } = getEls();
  if(!sidebar) return;

  sidebar.classList.toggle('sidebar-collapsed', collapsed);
  if(main)   main.classList.toggle('main-content-collapsed', collapsed);

  // Overlay tùy bạn dùng; giữ logic cũ (chỉ bỏ "nền mờ" của NÚT, không đụng overlay trang)
  if(overlay){
    overlay.classList.toggle('opacity-0', collapsed);
    overlay.classList.toggle('pointer-events-none', collapsed);
    overlay.classList.toggle('opacity-100', !collapsed);
  }

  // đồng bộ icon
  if(toggle){
    toggle.checked = !collapsed;                 // mở = checked
    toggle.setAttribute('aria-expanded', String(!collapsed));
  }

  try{
    localStorage.setItem('sidebar-collapsed', collapsed ? '1':'0');
  }catch(e){}

  // phát sự kiện cho phần khác (nếu có)
  window.dispatchEvent(new CustomEvent('sidebarToggle', { detail:{ collapsed } }));
}

// ====== Events ======
(function initSidebarToggle(){
  const { toggle, sidebar, overlay } = getEls();
  if(!sidebar) return;

  // 1) Khởi tạo từ DOM/Storage
  let collapsed = sidebar.classList.contains('sidebar-collapsed');
  try{
    const saved = localStorage.getItem('sidebar-collapsed');
    if(saved === '1' || saved === '0'){
      collapsed = (saved === '1');
      applySidebar(collapsed);
    }else{
      // nếu chưa có storage, đồng bộ icon theo DOM hiện tại
      syncIconFromSidebar();
    }
  }catch(e){
    syncIconFromSidebar();
  }

  // 2) Click vào toggle: đảo trạng thái (checked = mở)
  if(toggle){
    toggle.addEventListener('change', ()=>{
      const willOpen = toggle.checked;
      applySidebar(!willOpen); // collapsed = ngược lại
    });
  }

  // 3) Overlay click / ESC: đóng
  if(overlay){
    overlay.addEventListener('click', ()=> applySidebar(true));
  }
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') applySidebar(true);
  });

  // 4) Theo dõi mọi thay đổi class từ code khác (luôn nhận biết trạng thái)
  const mo = new MutationObserver(()=> syncIconFromSidebar());
  mo.observe(sidebar, { attributes:true, attributeFilter:['class'] });

  // 5) Nhận sự kiện từ nơi khác (nếu dùng)
  window.addEventListener('sidebarToggle', syncIconFromSidebar);

  // 6) Đồng bộ giữa các tab
  window.addEventListener('storage', (e)=>{
    if(e.key === 'sidebar-collapsed'){
      applySidebar(e.newValue === '1');
    }
  });

  // 7) Đồng bộ lần cuối sau khi layout render
  requestAnimationFrame(syncIconFromSidebar);
})();
