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
    const { toggleCheckbox } = getEls();
    return toggleCheckbox ? toggleCheckbox.checked : false;
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

  // Checkbox: checked = đang MỞ (đảo logic so với trước)
  if (toggleCheckbox) toggleCheckbox.checked = !collapsed;

  if (sidebar) sidebar.classList.toggle('sidebar-collapsed', collapsed);
  if (mainContent) mainContent.classList.toggle('main-content-collapsed', collapsed);

  // Lưu cả hai key để tương thích code cũ (nếu còn dùng)
  try {
    localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
    localStorage.setItem('sb.state', collapsed ? '1' : '0'); // compat với sidebar.js
  } catch (e) {}

  // Dropdown đóng khi toggle
  closeUser(); closeNotif();

  // Overlay: hiện khi MỞ (expanded)
  if (!collapsed){
    overlay.classList.add('show');
  } else {
    overlay.classList.remove('show');
  }

  // Phát event cho component khác (nếu cần)
  window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed } }));
}


  function toggleSidebar() {
    const isCurrentlyCollapsed = getSidebarState();
    setSidebarState(!isCurrentlyCollapsed);
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
});
/* Bind nút toggle mới */
const menuToggle = el('menuToggle');
const checkbox = el('checkbox');

if (menuToggle && checkbox) {
  menuToggle.addEventListener('click', function(e) {
    // Nếu click vào container nhưng không phải checkbox
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    // Trigger toggle sidebar
    toggle();
  });
  
  // Cũng bind trực tiếp vào checkbox
  checkbox.addEventListener('change', toggle);
}
// === Sidebar toggle: checked = OPEN (icon = X) ===
(function(){
  const cb      = document.getElementById('menuToggle'); // <input type="checkbox">
  const label   = document.querySelector('label.toggle-button[for="menuToggle"]');
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('mainContent') || document.querySelector('#mainContent,.main-content');
  if(!cb || !label || !sidebar) return;

  const LS_KEY  = 'sidebar-collapsed';     // '1' = ĐÓNG, '0' = MỞ
  const SB_CLS  = 'sidebar-collapsed';
  const MC_CLS  = 'main-content-collapsed';

  const isCollapsed = () => sidebar.classList.contains(SB_CLS);

  function syncIconFromSidebar(){
    const collapsed = isCollapsed();
    // nếu đang ĐÓNG mà checkbox vẫn checked → sửa về false (☰)
    if (cb.checked === collapsed) cb.checked = !collapsed;
    label.setAttribute('aria-pressed', String(!collapsed));
  }

  function apply(collapsed){
    sidebar.classList.toggle(SB_CLS, collapsed);
    if (main) main.classList.toggle(MC_CLS, collapsed);
    try{ localStorage.setItem(LS_KEY, collapsed ? '1':'0'); }catch(e){}
    syncIconFromSidebar();  // đảm bảo icon đúng: MỞ = X, ĐÓNG = ☰
  }

  function toggle(){ apply(!isCollapsed()); }

  // Khôi phục ban đầu từ localStorage (ưu tiên), fallback theo class hiện có
  (function restore(){
    let collapsed = isCollapsed();
    try{
      const s = localStorage.getItem(LS_KEY);
      if (s === '1') collapsed = true;
      if (s === '0') collapsed = false;
    }catch(e){}
    apply(collapsed);
  })();

  // Bấm ở đâu trên nút cũng toggle — và chỉ toggle 1 lần
  const handle = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    toggle();
  };
  label.addEventListener('click', handle, true);  // capture để “đè” handler cũ
  cb.addEventListener('click', handle, true);

  // Vô hiệu hóa mọi 'change' gây đảo chiều (nếu có script cũ)
  cb.addEventListener('change', (e) => {
    // Giữ nguyên mapping: checked = MỞ
    e.preventDefault(); e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    // đồng bộ lại cho chắc
    syncIconFromSidebar();
  }, true);

  // Nếu có script khác tự đổi class của sidebar → đồng bộ lại icon ngay
  new MutationObserver(syncIconFromSidebar)
    .observe(sidebar, { attributes:true, attributeFilter:['class'] });

  // ESC để đóng
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isCollapsed()) apply(true);
  });
})();
