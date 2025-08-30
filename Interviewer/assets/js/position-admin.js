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
const PALETTE = { sky:'#0EA5E9', orange:'#e97f0eff',cyan:'#06B6D4', emerald:'#10B981', grid:'rgba(15,23,42,.06)' };
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
    HT: [23,54,22,23,54,65,34,23,24,32,54,21],
    HR: [10,12,12,13,12,34,43,54,65,34,45,43]
  },
  quarter: {
    labels: ['Q1','Q2','Q3','Q4'],
    IT: [58,43,61,56],
    KD: [20,43,23,34],
    HT: [34,45,65,32],
    HR: [12,23,13,12]
  },
  year: {
    labels: ['2021','2022','2023','2024','2025'],
    IT: [52,56,23,61,32],
    KD: [18,34,23,24,22],
    HT: [34,43,54,65,65],
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
        { label:'Kinh doanh',  data: [], borderColor: PALETTE.orange,    backgroundColor:'rgba(6,182,212,.12)',  tension:.35, fill:false, borderWidth:3, pointRadius:4, pointBackgroundColor:PALETTE.orange,    pointBorderColor:'#fff', pointBorderWidth:2 },
        { label:'HT',  data: [], borderColor: PALETTE.cyan,    backgroundColor:'rgba(6,182,212,.12)',  tension:.35, fill:false, borderWidth:3, pointRadius:4, pointBackgroundColor:PALETTE.cyan,    pointBorderColor:'#fff', pointBorderWidth:2 },
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
  deptLineChart.data.datasets[2].data = src.HT;
  deptLineChart.data.datasets[3].data = src.HR;
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
      data: { labels: ['IT','Kinh doanh','HT','HR'], datasets: [{ data:[60,25,45,15], backgroundColor:['#0c3d8cff','#8c500cff','#67e8f9','#1e9c72ff'], borderRadius:8, borderSkipped:false }] },
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
