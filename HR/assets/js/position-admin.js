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

  // ================== CHARTS (an toàn: chỉ init nếu có canvas & Chart.js) ==================
  function initStatusChart() {
    const el = $('#statusChart'); if (!el || !hasChart()) return;
    new Chart(el, {
      type: 'doughnut',
      data: { labels: ['Đang','Tạm','Đóng'], datasets: [{ data:[70,15,15], backgroundColor:['#10b981','#f59e0b','#ef4444'], borderWidth:0 }] },
      options: { plugins:{ legend:{ position:'bottom', labels:{ usePointStyle:true } } }, maintainAspectRatio:false }
    });
  }
  function initDeptChart() {
    const el = $('#departmentChart'); if (!el || !hasChart()) return;
    new Chart(el, {
      type: 'bar',
      data: { labels: ['IT','Kinh doanh','HR'], datasets: [{ data:[60,25,15], backgroundColor:['#3b82f6','#f59e0b','#10b981'], borderRadius:8, borderSkipped:false }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true }, x:{ grid:{ display:false } } } }
    });
  }
  function initTrendChart() {
    const el = $('#recruitmentTrendChart'); if (!el || !hasChart()) return;
    const ctx = el.getContext('2d');
    window.recruitmentTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
        datasets: [
          { label:'Đang tuyển', data:[8,12,15,18,22,25,28,24,20,18,16,14], borderColor:'#10B981', backgroundColor:'rgba(16,185,129,0.1)', tension:.4, fill:false, borderWidth:3, pointBackgroundColor:'#10B981', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 },
          { label:'Tạm dừng',   data:[2,3,4,3,5,4,6,8,7,5,4,3],             borderColor:'#F59E0B', backgroundColor:'rgba(245,158,11,0.1)', tension:.4, fill:false, borderWidth:3, pointBackgroundColor:'#F59E0B', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 },
          { label:'Đã đóng',    data:[1,2,1,3,2,4,3,5,6,4,3,2],             borderColor:'#EF4444', backgroundColor:'rgba(239,68,68,0.1)', tension:.4, fill:false, borderWidth:3, pointBackgroundColor:'#EF4444', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:5 }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } },
        interaction:{ intersect:false, mode:'index' },
        scales:{ y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,0.05)', drawBorder:false }, ticks:{ callback:v => v + ' vị trí' } }, x:{ grid:{ display:false } } }
      }
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
    initStatusChart(); initDeptChart(); initTrendChart();
  });
})();
