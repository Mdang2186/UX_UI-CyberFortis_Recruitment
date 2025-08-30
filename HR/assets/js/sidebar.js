/* ========= SIDEBAR: toggle, user dropdown, AUTO ACTIVE ========= */
(function(){
  const SIDEBAR_ID = 'sidebar';
  const MAIN_ID    = 'mainContent';
  const BTN_ID     = 'sbUserBtn';
  const DD_ID      = 'sbUserDropdown';
  const STORAGE_K  = 'sb.state'; // 1 = collapsed

  const el   = (id) => document.getElementById(id);
  const $    = (sel, root=document) => root.querySelector(sel);
  const $$   = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  /* ===== Collapse ===== */
  function isCollapsed(){ return el(SIDEBAR_ID)?.classList.contains('sidebar-collapsed'); }
  function applyCollapse(on){
    const sb = el(SIDEBAR_ID), main = el(MAIN_ID);
    if(!sb || !main) return;
    sb.classList.toggle('sidebar-collapsed', on);
    main.classList.toggle('main-content-collapsed', on);
    try{ localStorage.setItem(STORAGE_K, on ? '1':'0'); }catch(e){}
    hideUserDropdown();
  }
  function toggle(){ applyCollapse(!isCollapsed()); }
  function restore(){ try{ applyCollapse(localStorage.getItem(STORAGE_K)==='1'); }catch(e){} }

  /* Bind nút ☰ trên Header (id="menuToggle") */
  function bindBurger(){
    const btn = document.getElementById('menuToggle');
    if(btn && !btn.__sbBound){ btn.addEventListener('click', toggle); btn.__sbBound = true; }
  }

  /* ===== User dropdown (đáy sidebar) ===== */
  function showUserDropdown(){ const dd=el(DD_ID), btn=el(BTN_ID); if(!dd||!btn) return; dd.classList.add('show'); btn.setAttribute('aria-expanded','true'); }
  function hideUserDropdown(){ const dd=el(DD_ID), btn=el(BTN_ID); if(!dd||!btn) return; dd.classList.remove('show'); btn.setAttribute('aria-expanded','false'); }
  function toggleUserDropdown(){ const dd=el(DD_ID); if(!dd) return; dd.classList.contains('show') ? hideUserDropdown() : showUserDropdown(); }
  function bindUser(){
    const btn = el(BTN_ID);
    if(btn && !btn.__bound){
      btn.addEventListener('click', (e)=>{ e.stopPropagation(); toggleUserDropdown(); });
      btn.__bound = true;
    }
    // click ngoài để đóng
    if(!document.__sbOutside){
      document.addEventListener('click', (e)=>{
        const dd=el(DD_ID), btn=el(BTN_ID);
        if(!dd||!btn) return;
        if(!dd.contains(e.target) && !btn.contains(e.target)) hideUserDropdown();
      });
      document.__sbOutside = true;
    }
  }

  /* ===== Auto ACTIVE theo URL ===== */
  const norm = (s)=> (s||'').toLowerCase();
  const slug = (s)=> norm(s).replace(/\.(html|aspx)$/,'').replace(/[^a-z0-9]+/g,'');
  function currentKey(){
    const file = (location.pathname.split('/').filter(Boolean).pop()||'').split('#')[0].split('?')[0];
    return slug(file) || 'dashboardadmin';
  }
  function setActive(){
    const key = currentKey();
    const items = $$('#'+SIDEBAR_ID+' .nav-item');
    // reset
    items.forEach(a=>a.classList.remove('active'));

    // 1) match theo href
    let matched = false;
    items.forEach(a=>{
      const hrefKey = slug(a.getAttribute('href')||'');
      if(hrefKey && (key===hrefKey || key.endsWith('/'+hrefKey))){
        a.classList.add('active'); matched = true;
      }
      // tooltip khi collapse
      const label = $('.nav-text', a)?.textContent?.trim();
      if(label) a.setAttribute('title', label);
    });

    // 2) nếu chưa match, dùng data-route (hỗ trợ route MVC không có .html)
    if(!matched){
      items.forEach(a=>{
        const routes = (a.getAttribute('data-route')||'').split(',').map(slug);
        if(routes.length && routes.some(r=> r && key.includes(r))){
          a.classList.add('active'); matched = true;
        }
      });
    }

    // 3) fallback: match tiền tố
    if(!matched){
      const first = items.find(a=>{
        const routes = (a.getAttribute('data-route')||'').split(',').map(slug);
        return routes.some(r=> r && key.startsWith(r));
      });
      if(first) first.classList.add('active');
    }
  }

  /* ===== Init ===== */
  function init(){ bindBurger(); bindUser(); restore(); setActive(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Quan sát do Header/Sidebar có thể được nạp bằng fetch
  new MutationObserver(init).observe(document.documentElement, { childList:true, subtree:true });

  // Cho phép gọi lại sau Promise.all(fetch(...))
  window.SidebarInit = init;
})();
