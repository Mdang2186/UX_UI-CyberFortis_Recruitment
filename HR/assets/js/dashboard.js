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
          { label:'Phỏng vấn', data:[80,120,180,250,320,380,350],  borderColor:'#1b966dff', backgroundColor:'rgba(16,185,129,.1)', tension:0.4, fill:true, borderWidth:3, pointBackgroundColor:'#10b981', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 }
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
        datasets: [{ data:[260,420,210,110], backgroundColor:['#2ab7dbff','#3ae1cbff','#2d95ceff','#44a2efff'], borderWidth:0, hoverOffset:8 }]
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
        datasets: [{ data:[35,25,20,15,5], backgroundColor:['#3be7d8ff','#2fb2a3ff','#258dddff','#176fb7ff','#0d8cc6ff'], borderWidth:0, hoverOffset:8 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'right', labels:{ color:'#374151', padding:15, font:{ size:12, weight:'500' }, usePointStyle:true, pointStyle:'circle', boxWidth:12 } } }, cutout:'60%', layout:{ padding:{ right:20 } } }
    });
  }

  if (document.getElementById('experienceChart')) {
    const ctx = document.getElementById('experienceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: { labels:['0-1 năm','2-3 năm','4-6 năm','7+ năm'], datasets:[{ label:'Phần trăm (%)', data:[28,34,26,12], backgroundColor:['#5a99dcff','#3a82cfff','#60a4edff','#97c5f3ff'], borderRadius:8, borderSkipped:false }] },
      options: { ...getChartOptions(), scales:{ ...getChartOptions().scales, x:{ ...getChartOptions().scales.x, title:{ display:true, text:'Kinh nghiệm', color:'#6b7280', font:{ size:12, weight:'600' } } }, y:{ ...getChartOptions().scales.y, title:{ display:true, text:'Phần trăm (%)', color:'#6b7280', font:{ size:12, weight:'600' } } } } }
    });
  }

  if (document.getElementById('ageChart')) {
    const ctx = document.getElementById('ageChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: { labels:['<25','25-30','31-35','36-40','>40'], datasets:[{ label:'Phần trăm (%)', data:[20,42,24,10,4], backgroundColor:['#35ab8dff','#279d80ff','#40c9a7ff','#5ddabbff','#97f2dbff'], borderRadius:8, borderSkipped:false }] },
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
// position-admin.js — Minimal, single-source-of-truth for modal + charts + UX
(() => {
  // ================== DATA (mock) ==================
  const POSITIONS = {
    'backend-dev': {
      name: 'Senior Backend Developer',
      department: 'IT',
      status: 'Đang tuyển',
      rounds: 3,
      description: 'Chúng tôi đang tìm kiếm một Senior Backend Developer có kinh nghiệm với Java, Spring Boot, và MySQL. Ứng viên cần có ít nhất 2 năm kinh nghiệm làm việc với các hệ thống backend quy mô lớn, hiểu biết về microservices và có khả năng làm việc nhóm tốt.',
      location: 'Hà Nội, Việt Nam',
      salary: '25-35 triệu VNĐ',
      type: 'Full-time',
      experience: '2+ năm kinh nghiệm',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Kubernetes', 'Redis']
    },
    'sales-manager': {
      name: 'Trưởng phòng Kinh doanh',
      department: 'Kinh doanh',
      status: 'Tạm dừng',
      rounds: 2,
      description: 'Vị trí Trưởng phòng Kinh doanh yêu cầu ứng viên có kinh nghiệm quản lý team bán hàng, xây dựng chiến lược kinh doanh và phát triển thị trường. Cần có kỹ năng lãnh đạo xuất sắc và hiểu biết sâu về thị trường B2B.',
      location: 'TP.HCM, Việt Nam',
      salary: '40-60 triệu VNĐ',
      type: 'Full-time',
      experience: '5+ năm kinh nghiệm',
      skills: ['Quản lý','Bán hàng','Marketing','Lãnh đạo','Chiến lược','B2B']
    },
    'ui-designer': {
      name: 'Senior UI/UX Designer',
      department: 'IT',
      status: 'Đang tuyển',
      rounds: 2,
      description: 'Cần thành thạo Figma, Adobe XD, Sketch và có kinh nghiệm thiết kế web/mobile.',
      location: 'Hà Nội, Việt Nam',
      salary: '20-30 triệu VNĐ',
      type: 'Full-time',
      experience: '3+ năm kinh nghiệm',
      skills: ['Figma','Adobe XD','Sketch','Prototyping']
    }
  };

  // ================== HELPERS ==================
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const hasChart = () => typeof window.Chart === 'function';
// ===== Palette & series cho phòng ban (Tháng/Quý/Năm) =====
const PALETTE = { sky:'#0EA5E9', cyan:'#06B6D4', emerald:'#10B981', grid:'rgba(15,23,42,.06)' };
// ===== Chart.js defaults (rõ ràng & full khung) =====
if (window.Chart){
  Chart.defaults.font.family = "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial";
  Chart.defaults.color = "#0f172a";
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  Chart.defaults.elements.point.radius = 4;
  Chart.defaults.elements.point.hoverRadius = 6;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.tooltip.backgroundColor = "rgba(15,23,42,.92)";
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 10;
}

// Trợ giúp: format số & phần trăm
const fmtNumber = v => v.toLocaleString("vi-VN");
const fmtPercent = (val, total) => `${Math.round(val*100/total)}%`;

// Tự resize khi khung đổi kích thước (mở/thu sidebar, thay layout…)
function watchResize(container, chart){
  if (!('ResizeObserver' in window)) return;
  const ro = new ResizeObserver(() => chart.resize());
  ro.observe(container.closest('.chart-container') || container);
}

const DEPT_SERIES = {
  month: {
    labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
    IT: [55,54,34,65,63,76,66,54,59,54,32,54],
    KD: [18,21,22,32,23,24,26,23,24,32,22,21],
    HR: [10,12,12,13,12,34,43,54,65,34,45,43]
  },
  quarter: {
    labels: ['Q1','Q2','Q3','Q4'],
    IT: [58,43,61,56],
    KD: [20,43,23,34],
    HR: [12,23,13,12]
  },
  year: {
    labels: ['2021','2022','2023','2024','2025'],
    IT: [52,56,23,61,32],
    KD: [18,34,23,24,22],
    HR: [10,11,21,32,12]
  }
};

let deptLineChart;
function initDeptLineChart(){
  const el = document.getElementById('deptTrendChart'); if (!el || !hasChart()) return;
  deptLineChart = new Chart(el, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { label:'IT',          data: [], borderColor: PALETTE.sky,     backgroundColor:'rgba(14,165,233,.12)', tension:.35, fill:false, borderWidth:3, pointRadius:4, pointBackgroundColor:PALETTE.sky,     pointBorderColor:'#fff', pointBorderWidth:2 },
        { label:'Kinh doanh',  data: [], borderColor: PALETTE.cyan,    backgroundColor:'rgba(6,182,212,.12)',  tension:.35, fill:false, borderWidth:3, pointRadius:4, pointBackgroundColor:PALETTE.cyan,    pointBorderColor:'#fff', pointBorderWidth:2 },
        { label:'HR',          data: [], borderColor: PALETTE.emerald, backgroundColor:'rgba(16,185,129,.12)', tension:.35, fill:false, borderWidth:3, pointRadius:4, pointBackgroundColor:PALETTE.emerald, pointBorderColor:'#fff', pointBorderWidth:2 }
      ]
    },
    options: {
      maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      plugins:{ legend:{ position:'bottom', labels:{ usePointStyle:true } } },
      scales:{
        y:{ beginAtZero:true, grid:{ color:PALETTE.grid, drawBorder:false } },
        x:{ grid:{ display:false } }
      }
    }
  });
  setDeptRange('month'); // mặc định hiển thị theo tháng
}

window.setDeptRange = function(range){
  if (!deptLineChart || !DEPT_SERIES[range]) return;
  const src = DEPT_SERIES[range];
  deptLineChart.data.labels = src.labels;
  deptLineChart.data.datasets[0].data = src.IT;
  deptLineChart.data.datasets[1].data = src.KD;
  deptLineChart.data.datasets[2].data = src.HR;
  deptLineChart.update();

  // Active UI cho 3 nút
  document.querySelectorAll('.range-tab').forEach(b => b.classList.remove('bg-white','shadow'));
  const map = { month:'#btnRangeMonth', quarter:'#btnRangeQuarter', year:'#btnRangeYear' };
  const btn = document.querySelector(map[range]); if (btn) btn.classList.add('bg-white','shadow');
};

  // ================== CHARTS (an toàn: chỉ init nếu có canvas & Chart.js) ==================
  function initStatusChart() {
    const el = $('#statusChart'); if (!el || !hasChart()) return;
    new Chart(el, {
      type: 'doughnut',
      data: { labels: ['Đang','Tạm','Đóng'], datasets: [{ data:[70,15,15], backgroundColor:['#3b82f6','#67e8f9','#10b981'], borderWidth:0 }] },
      options: { plugins:{ legend:{ position:'bottom', labels:{ usePointStyle:true } } }, maintainAspectRatio:false }
    });
  }
  function initDeptChart() {
    const el = $('#departmentChart'); if (!el || !hasChart()) return;
    new Chart(el, {
      type: 'bar',
      data: { labels: ['IT','Kinh doanh','HR'], datasets: [{ data:[60,25,15], backgroundColor:['#0c3d8cff','#67e8f9','#1e9c72ff'], borderRadius:8, borderSkipped:false }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true }, x:{ grid:{ display:false } } } }
    });
  }
   
  window.updateTrendChart = function(){ if (window.recruitmentTrendChart) window.recruitmentTrendChart.update() };

  // ================== MODAL ==================
  const modal = $('#positionDetail');
  let lastActiveEl = null;
  const focusables = () =>
    $$('#positionDetail a[href], #positionDetail button:not([disabled]), #positionDetail textarea, #positionDetail input, #positionDetail select, #positionDetail [tabindex]:not([tabindex="-1"])');

  function fillForm(data) {
    if (!data) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
    set('positionName', data.name);
    set('positionDepartment', data.department);
    set('positionStatus', data.status);
    set('interviewRounds', data.rounds ?? 1);
    set('positionType', data.type);
    set('positionLocation', data.location);
    set('positionSalary', data.salary);
    set('positionExperience', data.experience);
    set('positionSkills', (data.skills || []).join(', '));
    set('positionDescription', data.description);
  }

  function showModal() {
    if (!modal) return;
    lastActiveEl = document.activeElement;
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    const first = focusables()[0]; if (first) first.focus();
  }
  function hideModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    setTimeout(() => { modal.style.display = 'none'; if (lastActiveEl && lastActiveEl.focus) lastActiveEl.focus(); }, 200);
  }

  // Public API (giữ tương thích với HTML)
  window.openModal = function(positionId){
    if (positionId && POSITIONS[positionId]) fillForm(POSITIONS[positionId]);
    showModal();
    showNotification('Mở chi tiết vị trí', 'info');
  };
  window.editPosition = function(positionId){ window.openModal(positionId) };
  window.openCreate = function(){
    fillForm({ department:'IT', status:'Đang tuyển', rounds:1, type:'Full-time', skills:[] });
    showModal();
    showNotification('Mở form tạo vị trí mới', 'info');
  };
  window.closeModal = function(id){ if (!id || id === 'positionDetail') hideModal() };

  // Overlay click + ESC + Trap focus
  if (modal) {
    modal.addEventListener('mousedown', (e) => { if (e.target === modal) hideModal() });
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const items = focusables(); if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('show')) hideModal() });

  // ================== NOTIFICATION (nhẹ, 1 bản duy nhất) ==================
  window.showNotification = function(message, type='info'){
    const el = document.createElement('div');
    el.className = 'fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[2000] transition-all duration-300 transform translate-x-full text-white';
    el.classList.add(type==='success'?'bg-green-500':type==='error'?'bg-red-500':'bg-blue-500');
    el.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'exclamation-circle':'info-circle'} mr-2"></i>${message}`;
    document.body.appendChild(el);
    setTimeout(()=>el.classList.remove('translate-x-full'), 60);
    setTimeout(()=>{ el.classList.add('translate-x-full'); setTimeout(()=>el.remove(), 280); }, 3000);
  };

  // ================== STUBS (để không lỗi khi HTML gọi) ==================
  window.filterByStatus = window.filterByStatus || function(){};
  window.openBulkImport = window.openBulkImport || function(){ showNotification('Tính năng Import đang cập nhật', 'info') };
  window.savePosition = window.savePosition || function(){ hideModal(); showNotification('Đã lưu thành công!', 'success') };

  // ================== BOOT ==================
  document.addEventListener('DOMContentLoaded', () => {
    // đảm bảo modal ẩn sạch khi vào trang
    if (modal) { modal.classList.remove('show'); modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); }
    // init charts nếu có
    initStatusChart(); initDeptLineChart(); initTrendChart();
  });
})();
// Wheel -> horizontal scroll (không ảnh hưởng link/nút bên trong)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.job-rail__track').forEach(track => {
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        track.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  });
});
(function sidebarSync(){
  const main = document.getElementById('mainContent');
  const root = document.documentElement.style;
  const isCollapsed = document.getElementById('sidebar')?.classList.contains('collapsed');
  main?.classList.toggle('main-content-collapsed', !!isCollapsed);
  root.setProperty('--shell-left', isCollapsed ? 'var(--sidebar-wc)' : 'var(--sidebar-w)');
})();
// ====== Đồng bộ biến --shell-left theo sidebar ======
(function syncShellLeftVar(){
  const root    = document.documentElement;
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('mainContent');

  if(!sidebar || !main) return;

  const apply = () => {
    const w = Math.round(sidebar.getBoundingClientRect().width);
    root.style.setProperty('--shell-left', w + 'px');
    // Toggle class cho margin-left fallback nếu bạn vẫn muốn dùng:
    if (w <= 100) {
      main.classList.add('main-content-collapsed');
    } else {
      main.classList.remove('main-content-collapsed');
    }
  };

  // Lần đầu + khi resize
  apply();
  window.addEventListener('load', apply);
  window.addEventListener('resize', () => requestAnimationFrame(apply));

  // Theo dõi thay đổi width (khi sidebar transition)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(apply);
    ro.observe(sidebar);
  }

  // Nếu code thu gọn sidebar của bạn toggle class -> nghe event ‘transitionend’
  sidebar.addEventListener('transitionend', apply);

  // (Tùy chọn) bắt thay đổi class nếu sidebar gắn/tháo class 'collapsed'
  const mo = new MutationObserver(apply);
  mo.observe(sidebar, { attributes: true, attributeFilter: ['class', 'style'] });
})();
