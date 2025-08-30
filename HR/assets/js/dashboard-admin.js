/* ====== LAYOUT & DROPDOWNS – one place to rule them all ====== */
(function(){
  /* helpers */
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const sb   = () => $('#sidebar');
  const main = () => $('#mainContent');

  /* ---- Sidebar collapse ---- */
  function applyCollapse(on){
    const S = sb(), M = main();
    if(!S || !M) return;
    S.classList.toggle('sidebar-collapsed', !!on);
    M.classList.toggle('main-content-collapsed', !!on);
    // aria-state on header button if exists
    const burger = $('#menuToggle'); if (burger) burger.setAttribute('aria-expanded', (!!on).toString());
    try{ localStorage.setItem('sb.state', on ? '1' : '0'); }catch(e){}
  }
  function isCollapsed(){ return sb()?.classList.contains('sidebar-collapsed'); }
  function toggleSidebar(){ applyCollapse(!isCollapsed()); }
  function restore(){ try{ applyCollapse(localStorage.getItem('sb.state')==='1'); }catch(e){} }

  /* ---- Header dropdown logic ---- */
  function closeAllDropdowns(){
    const n = $('#notificationDropdown'), u = $('#userDropdown');
    n && n.classList.remove('show');
    if(u){ u.classList.remove('show'); }
    $('#avatarChevron')?.classList.remove('rotate-180');
    // aria
    $('#notificationBtn')?.setAttribute('aria-expanded','false');
    $('#userBtn')?.setAttribute('aria-expanded','false');
  }
  function toggleNotifications(){
    const d = $('#notificationDropdown'); if(!d) return;
    $('#userDropdown')?.classList.remove('show');
    $('#avatarChevron')?.classList.remove('rotate-180');
    const newState = !d.classList.contains('show');
    closeAllDropdowns();
    if(newState){ d.classList.add('show'); $('#notificationBtn')?.setAttribute('aria-expanded','true'); }
  }
  function toggleUserDropdown(){
    const d = $('#userDropdown'); if(!d) return;
    $('#notificationDropdown')?.classList.remove('show');
    const newState = !d.classList.contains('show');
    closeAllDropdowns();
    if(newState){
      d.classList.add('show');
      $('#avatarChevron')?.classList.add('rotate-180');
      $('#userBtn')?.setAttribute('aria-expanded','true');
    }
  }

  /* expose for inline (nếu có) */
  window.toggleNotifications = toggleNotifications;
  window.toggleUserDropdown  = toggleUserDropdown;

  /* ---- Filter dropdowns ---- */
  window.toggleFilter = function(id){
    const f = document.getElementById(id);
    if(!f) return;
    $$('.filter-dropdown').forEach(x=>{ if(x!==f) x.classList.remove('show'); });
    f.classList.toggle('show');
  };

  /* ---- Sidebar bottom user dropdown ---- */
  function bindSbUser(){
    const btn = $('#sbUserBtn');
    const dd  = $('#sbUserDropdown');
    if(!btn || !dd || btn.__sbBound) return;

    btn.addEventListener('click', (e)=>{ e.stopPropagation(); dd.classList.toggle('show'); });
    document.addEventListener('click', (e)=>{
      if (!dd.contains(e.target) && !btn.contains(e.target)){ dd.classList.remove('show'); }
    });
    btn.__sbBound = true;
  }

  /* ---- Bind all controls (id-based) ---- */
  function bindOnce(el, evt, fn){
    if(!el || el.__bound) return;
    el.addEventListener(evt, fn);
    el.__bound = true;
  }
  function bindAll(){
    bindOnce($('#menuToggle'), 'click', toggleSidebar);
    bindOnce($('#sidebarToggle'), 'click', toggleSidebar);
    bindOnce($('#notificationBtn'), 'click', toggleNotifications);
    bindOnce($('#userBtn'), 'click', toggleUserDropdown);
    bindSbUser();
  }

  /* click outside for header dropdowns + filters; ESC to close */
  document.addEventListener('click', (e)=>{
    const inUser = e.target.closest('#userBtn, #userDropdown');
    const inNoti = e.target.closest('#notificationBtn, #notificationDropdown');
    const inFilter = e.target.closest('.filter-dropdown');
    const isFilterBtn = e.target.closest('[data-filter-btn]') || e.target.closest('[onclick*="toggleFilter"]');
    if(!inUser && !inNoti) closeAllDropdowns();
    if(!inFilter && !isFilterBtn){ $$('.filter-dropdown').forEach(f=>f.classList.remove('show')); }
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeAllDropdowns(); });

  /* Restore + observe after fragments loaded by fetch */
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ bindAll(); restore(); });
  } else { bindAll(); restore(); }

  // khi Header.html/Sidebar.html nạp xong
  new MutationObserver(()=>bindAll()).observe(document.documentElement, {childList:true, subtree:true});

  /* ===== Chart.js demo (safe if canvas not found) ===== */
  function getChartOptions(){
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#374151', font: { size: 12, weight: '500' } } } },
      scales: {
        x: { ticks: { color: '#6b7280', font: { size: 11 } }, grid: { color: '#f3f4f6', borderColor: '#e5e7eb' } },
        y: { ticks: { color: '#6b7280', font: { size: 11 } }, grid: { color: '#f3f4f6', borderColor: '#e5e7eb' } }
      }
    };
  }

  if (document.getElementById('weeklyApplicationsChart')) {
    const ctx = document.getElementById('weeklyApplicationsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','CN'],
        datasets: [
          { label:'Nộp hồ sơ', data:[120,190,300,500,620,800,750], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,.1)', tension:0.4, fill:true, borderWidth:3, pointBackgroundColor:'#3b82f6', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 },
          { label:'Phỏng vấn', data:[80,120,180,250,320,380,350],  borderColor:'#10b981', backgroundColor:'rgba(16,185,129,.1)', tension:0.4, fill:true, borderWidth:3, pointBackgroundColor:'#10b981', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 }
        ]
      },
      options: getChartOptions()
    });
  }

  if (document.getElementById('candidateStatusChart')) {
    const ctx = document.getElementById('candidateStatusChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Cần PV vòng 2','Đã trúng tuyển','Ứng viên mới','Từ chối'],
        datasets: [{ data:[260,420,210,110], backgroundColor:['#f59e0b','#10b981','#3b82f6','#ef4444'], borderWidth:0, hoverOffset:8 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'#374151', padding:20, font:{ size:12, weight:'500' }, usePointStyle:true, pointStyle:'circle' } } }, cutout:'60%' }
    });
  }

  if (document.getElementById('sourceChart')) {
    const ctx = document.getElementById('sourceChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['LinkedIn','Giới thiệu','Trang web','TopCV','Khác'],
        datasets: [{ data:[35,25,20,15,5], backgroundColor:['#0077b5','#10b981','#3b82f6','#f59e0b','#6b7280'], borderWidth:0, hoverOffset:8 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'right', labels:{ color:'#374151', padding:15, font:{ size:12, weight:'500' }, usePointStyle:true, pointStyle:'circle', boxWidth:12 } } }, cutout:'60%', layout:{ padding:{ right:20 } } }
    });
  }

  if (document.getElementById('experienceChart')) {
    const ctx = document.getElementById('experienceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: { labels:['0-1 năm','2-3 năm','4-6 năm','7+ năm'], datasets:[{ label:'Phần trăm (%)', data:[28,34,26,12], backgroundColor:['#8b5cf6','#a855f7','#c084fc','#d8b4fe'], borderRadius:8, borderSkipped:false }] },
      options: { ...getChartOptions(), scales:{ ...getChartOptions().scales, x:{ ...getChartOptions().scales.x, title:{ display:true, text:'Kinh nghiệm', color:'#6b7280', font:{ size:12, weight:'600' } } }, y:{ ...getChartOptions().scales.y, title:{ display:true, text:'Phần trăm (%)', color:'#6b7280', font:{ size:12, weight:'600' } } } } }
    });
  }

  if (document.getElementById('ageChart')) {
    const ctx = document.getElementById('ageChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: { labels:['<25','25-30','31-35','36-40','>40'], datasets:[{ label:'Phần trăm (%)', data:[20,42,24,10,4], backgroundColor:['#f59e0b','#f97316','#fb923c','#fdba74','#fed7aa'], borderRadius:8, borderSkipped:false }] },
      options: { ...getChartOptions(), scales:{ ...getChartOptions().scales, x:{ ...getChartOptions().scales.x, title:{ display:true, text:'Độ tuổi', color:'#6b7280', font:{ size:12, weight:'600' } } }, y:{ ...getChartOptions().scales.y, title:{ display:true, text:'Phần trăm (%)', color:'#6b7280', font:{ size:12, weight:'600' } } } } }
    });
  }
})();
// (Optional) đảm bảo menuToggle hoạt động nếu header.js không gắn
(function(){
  function bind(){
    const b = document.getElementById('menuToggle');
    if(b && !b.__once){
      b.addEventListener('click', function(){
        const sb = document.getElementById('sidebar');
        const main = document.getElementById('mainContent');
        if(!sb || !main) return;
        const on = !sb.classList.contains('sidebar-collapsed');
        sb.classList.toggle('sidebar-collapsed', on);
        main.classList.toggle('main-content-collapsed', on);
        try{ localStorage.setItem('sb.state', on ? '1':'0'); }catch(e){}
      });
      b.__once = true;
    }
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', bind); } else { bind(); }
  new MutationObserver(bind).observe(document.documentElement, {childList:true, subtree:true});
})();
// ==== CyberFortis Page Loader (real-speed based) ====
(function(){
  const wrap = document.getElementById('cfLoader');
  if(!wrap) return; // không có overlay thì bỏ qua

  const fill = document.getElementById('cfFill');
  const pct  = document.getElementById('cfPct');
  const stxt = document.getElementById('cfStatus');

  // ---- CONFIG: tỉ trọng các mốc ----
  const W = {
    INTERACTIVE: 10,   // DOM interactive
    DCL:        10,    // DOMContentLoaded
    FCP:        10,    // first-contentful-paint
    LCP:        15,    // largest-contentful-paint (nếu có)
    FONTS:       5,    // fonts ready
    RESOURCES:  45,    // ảnh/css/js theo số lượng
    LOAD:        5     // load event hoàn tất
  };
  const TOTAL_WEIGHT = Object.values(W).reduce((a,b)=>a+b,0); // =100

  let progress = 0;
  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
  const setProgress = (val, label) => {
    progress = clamp(val, 0, 100);
    fill.style.width = progress + '%';
    pct.textContent  = Math.round(progress) + '%';
    if (label) stxt.textContent = label;
  };

  // ---- 1) Tài nguyên thực (img/css/js) ----
  const resourceNodes = [
    ...document.querySelectorAll('img[src]'),
    ...document.querySelectorAll('script[src]'),
    ...document.querySelectorAll('link[rel="stylesheet"][href]')
  ];
  let resTotal = resourceNodes.length;
  let resDone  = 0;

  function bumpResource(node){
    // tính phần tài nguyên trong 0..W.RESOURCES
    resDone++;
    const resPct = resTotal ? (resDone/resTotal)*W.RESOURCES : 0;
    setProgress(baseProgress() + resPct);
  }

  // nếu ảnh đã cache => complete ngay
  resourceNodes.forEach(n=>{
    const tag = n.tagName;
    const done = (tag === 'IMG' && (n.complete || n.naturalWidth>0)) ||
                 (tag !== 'IMG' && performance.getEntriesByName(n.src||n.href).length>0);
    if (done) resDone++;
    else {
      n.addEventListener('load', ()=>bumpResource(n), {once:true});
      n.addEventListener('error',()=>bumpResource(n), {once:true});
    }
  });

  // ---- 2) Mốc thời gian tài liệu ----
  let hit = {interactive:false, dcl:false, fcp:false, lcp:false, fonts:false, load:false};

  function baseProgress(){
    return (hit.interactive?W.INTERACTIVE:0) +
           (hit.dcl?W.DCL:0) +
           (hit.fcp?W.FCP:0) +
           (hit.lcp?W.LCP:0) +
           (hit.fonts?W.FONTS:0) +
           (hit.load?W.LOAD:0);
  }

  if (document.readyState !== 'loading') {
    hit.interactive = true;
  } else {
    document.addEventListener('readystatechange', ()=>{
      if (!hit.interactive && (document.readyState === 'interactive' || document.readyState === 'complete')){
        hit.interactive = true;
        setProgress(baseProgress() + (resDone/resTotal)*W.RESOURCES, 'Parsing DOM');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    hit.dcl = true;
    setProgress(baseProgress() + (resDone/resTotal)*W.RESOURCES, 'Building interface');
  });

  // ---- 3) Paint metrics (FCP/LCP) ----
  try{
    const paintObs = new PerformanceObserver((list)=>{
      for (const e of list.getEntries()){
        if (e.name === 'first-contentful-paint' && !hit.fcp){
          hit.fcp = true;
          setProgress(baseProgress() + (resDone/resTotal)*W.RESOURCES, 'First content');
        }
      }
    });
    paintObs.observe({ type:'paint', buffered:true });

    const lcpObs = new PerformanceObserver((list)=>{
      const last = list.getEntries().at(-1);
      if (last){ hit.lcp = true;
        setProgress(baseProgress() + (resDone/resTotal)*W.RESOURCES, 'Largest content');
      }
    });
    lcpObs.observe({ type:'largest-contentful-paint', buffered:true });
  }catch(e){/* older browsers ignore */ }

  // ---- 4) Fonts ----
  if (document.fonts && document.fonts.ready){
    document.fonts.ready.then(()=>{
      hit.fonts = true;
      setProgress(baseProgress() + (resDone/resTotal)*W.RESOURCES, 'Fonts ready');
    });
  }

  // ---- 5) Load end ----
  window.addEventListener('load', ()=>{
    hit.load = true;
    // nếu còn resource chưa đếm (từ CSS…) thì xem PerformanceEntries đã có bao nhiêu mới
    try{
      const perfRes = performance.getEntriesByType('resource').length;
      if (perfRes > resTotal){ resTotal = perfRes; resDone = perfRes; }
    }catch(e){}
    setProgress(100, 'System ready');

    // Ẩn overlay mượt
    setTimeout(()=>wrap.classList.add('hide'), 200);
    setTimeout(()=>wrap.remove(), 800);
  });

  // ---- 6) Fallback “nhích” chậm theo thời gian nếu mạng rất yếu (không vượt 80%) ----
  let t = 0;
  const timer = setInterval(()=>{
    t += 1;
    // nhích dần tới tối đa 80% trước khi các mốc thực tới
    if (progress < 80){
      setProgress(Math.min(80, progress + Math.max(0.3, 1.2 - t*0.05)));
    }else{
      clearInterval(timer);
    }
  }, 200);

  // Nếu back/forward từ bfcache, ẩn ngay
  window.addEventListener('pageshow', e=>{
    if (e.persisted){ setProgress(100, 'Ready (bfcache)'); wrap.classList.add('hide'); setTimeout(()=>wrap.remove(), 400); }
  });
})();
