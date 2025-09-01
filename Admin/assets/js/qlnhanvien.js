/* =========================================================
   NhanVien-Admin – JS tối ưu (filters + charts + modals)
   ========================================================= */
'use strict';

/* -------- Helpers -------- */
const $  = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const esc = s=>String(s).replace(/[&<>"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* -------- Data (demo) -------- */
const EMP = [
  ['Trần Thanh An','Kỹ thuật','Backend Dev','an.tran@corp.vn',1,'TA','b-blue',5],
  ['Hoàng Đức Dũng','Phân tích DL','Data Analyst','dung.hoang@corp.vn',1,'HD','b-green',3],
  ['Nguyễn Minh Hải','Sản phẩm','Frontend Dev','hai.nguyen@corp.vn',1,'NH','b-purple',2],
  ['Lê Tuấn','Đảm bảo chất lượng','QA','tuan.le@corp.vn',0,'LT','b-blue',6],
  ['Trịnh Phương','Thiết kế','UX/UI','phuong.trinh@corp.vn',1,'TP','b-green',4],
  ['Vũ Thanh Tùng','Kỹ thuật','Fullstack Dev','tung.vu@corp.vn',1,'TT','b-blue',7],
  ['Bùi Ngọc Anh','Kinh doanh','PM','anh.bui@corp.vn',1,'NA','b-green',8],
  ['Đỗ Mỹ Linh','Nhân sự','HR','linh.do@corp.vn',1,'ML','b-purple',9],
  ['Phạm Ngọc Quỳnh','Kỹ thuật','Tester','quynh.pn@corp.vn',1,'PQ','b-blue',1],
  ['Vũ Đức Kiên','Kỹ thuật','Backend Dev','kien.vu@corp.vn',1,'VK','b-blue',3],
  ['Ngô Quang Minh','Kỹ thuật','Frontend Dev','minh.ngo@corp.vn',1,'QM','b-purple',1],
  ['Phùng Hồng Sơn','Phân tích DL','Data Analyst','son.ph@corp.vn',1,'HS','b-green',6],
  ['Hà Hữu Long','Kinh doanh','PM','long.ha@corp.vn',1,'HL','b-green',10],
  ['Tạ Minh Tuấn','Sản phẩm','Frontend Dev','tuan.ta@corp.vn',1,'TTu','b-purple',2],
  ['Kiều Ánh Dương','Thiết kế','UX/UI','duong.kieu@corp.vn',1,'AD','b-green',4],
  ['Lâm Khánh Vy','Đảm bảo chất lượng','QA','vy.lam@corp.vn',1,'KV','b-blue',5],
  ['Đặng Bảo Trâm','Nhân sự','HR','tram.dang@corp.vn',0,'BT','b-purple',7],
  ['Phan Quốc Việt','Kỹ thuật','Fullstack Dev','viet.pq@corp.vn',1,'PV','b-blue',5],
  ['Nguyễn Đức Cường','Kỹ thuật','Backend Dev','cuong.nd@corp.vn',1,'NC','b-blue',8],
  ['Trần Thu Trang','Kế toán','PM','trang.tt@corp.vn',1,'TT','b-green',12],
  ['Lý Quốc Huy','Kỹ thuật','Tester','huy.ly@corp.vn',1,'QH','b-blue',2],
  ['Đỗ Anh Khoa','Kỹ thuật','Frontend Dev','khoa.do@corp.vn',1,'AK','b-purple',3],
  ['Đinh Phương Nam','Phân tích DL','Data Analyst','nam.dp@corp.vn',1,'PN','b-green',4],
  ['Phạm Thị Yến','Thiết kế','UX/UI','yen.pt@corp.vn',1,'TY','b-green',6],
  ['Lê Thị Bích','Nhân sự','HR','bich.le@corp.vn',1,'LB','b-purple',8],
  ['Nguyễn Thành Phong','Sản phẩm','PM','phong.nt@corp.vn',1,'NP','b-green',9],
  ['Mai Hồng Quân','Kỹ thuật','Fullstack Dev','quan.mh@corp.vn',1,'MQ','b-blue',7],
  ['Ngô Nhật Anh','Đảm bảo chất lượng','QA','anh.ng@corp.vn',1,'NA2','b-blue',3],
  ['Vũ Thị Hoa','Kế toán','PM','hoa.vt@corp.vn',1,'VH','b-green',11],
  ['Bạch Minh Tú','Kỹ thuật','Tester','tu.bm@corp.vn',0,'MT','b-blue',1],
  ['Đào Hoài Nam','Kỹ thuật','Backend Dev','nam.dh@corp.vn',1,'HN','b-blue',6],
  ['Trịnh Văn Tài','Kỹ thuật','Frontend Dev','tai.tv@corp.vn',1,'TV','b-purple',5],
  ['Nguyễn Lan Anh','Nhân sự','HR','anh.nl@corp.vn',1,'LA','b-purple',4],
  ['Trần Phú Lộc','Kỹ thuật','Fullstack Dev','loc.tp@corp.vn',1,'PL','b-blue',8],
  ['Nguyễn Hữu Phước','Kinh doanh','PM','phuoc.nh@corp.vn',1,'HP','b-green',9],
  ['Phạm Gia Bảo','Kỹ thuật','Tester','bao.pg@corp.vn',1,'GB','b-blue',2],
  ['Đặng Thái Sơn','Phân tích DL','Data Analyst','son.dt@corp.vn',1,'TS','b-green',5],
  ['Lương Mỹ Duyên','Thiết kế','UX/UI','duyen.lm@corp.vn',1,'MD','b-green',4],
  ['Trần Minh Khang','Đảm bảo chất lượng','QA','khang.tm@corp.vn',1,'MK','b-blue',3],
].map(([n,d,t,e,a,i,c,exp])=>({n,d,t,e,a,i,c,exp}));

const HIRED = [
  ['Vũ Thanh Tùng','Backend Dev','13/12/2023','25–30 triệu','Nguyễn Văn A','Hoàn thành'],
  ['Lê Văn C','Data Analyst','10/12/2023','18–22 triệu','Trần Thị B','Hoàn thành'],
  ['Đặng Quỳnh','UX/UI','08/12/2023','30–35 triệu','Nguyễn Văn A','Đang thử việc'],
  ['Phạm Dũng','Tester','05/12/2023','28–32 triệu','Lê Hồng','Chờ onboard'],
  ['Phạm Hương','Frontend Dev','03/01/2024','18–22 triệu','Nguyễn Văn A','Hoàn thành'],
].map(([n,r,s,sal,own,st],i)=>({n,r,s,sal,own,st,i:n.split(' ').map(x=>x[0]).join('').slice(0,2),c:i%2?'b-green':'b-blue'}));

const ACC = [
  ['admin','admin@corp.vn','Admin',1,'20/08/2025 09:12'],
  ['hr01','hr01@corp.vn','HR',1,'19/08/2025 14:03'],
  ['iv01','iv01@corp.vn','Interviewer',1,'18/08/2025 16:40'],
].map(([u,email,role,active,last])=>({u,email,role,active,last}));

/* -------- Render helpers -------- */
const $id = s=>document.getElementById(s);
const state = { current:[...EMP] };

function renderKPI(list){
  $id('kpiTotal').textContent  = list.length;
  $id('kpiActive').textContent = list.filter(x=>x.a).length;
  $id('kpiManager').textContent= list.filter(x=>x.t==='PM').length;
  $id('kpiDept').textContent   = new Set(list.map(x=>x.d)).size;
}
function renderEmp(list){
  const tb = $id('empTable').querySelector('tbody');
  tb.innerHTML = list.map((x,idx)=>`
    <tr data-i="${idx}">
      <td>
        <div class="nv-cell-user">
          <div class="nv-badge ${x.c}">${x.i}</div>
          <span class="nv-name">${esc(x.n)}</span>
        </div>
      </td>
      <td>${esc(x.d)}</td>
      <td>${esc(x.t)}</td>
      <td>${esc(x.e)}</td>
      <td>${x.a?'<span class="nv-status st-green">Đang hoạt động</span>':'<span class="nv-status st-gray">Tạm ngưng</span>'}</td>
      <td>
        <div class="nv-row-actions">
          <button class="nv-act blue" title="Xem"><i class="fa-solid fa-eye"></i></button>
          <button class="nv-act green js-create-acc" title="Tạo tài khoản"><i class="fa-solid fa-user-shield"></i></button>
          <button class="nv-act red" title="Tạm ngưng"><i class="fa-solid fa-ban"></i></button>
        </div>
      </td>
    </tr>`).join('');
  renderKPI(list);
}
function renderHired(list){
  const tb = $id('hiredTable').querySelector('tbody');
  tb.innerHTML = list.map((x,idx)=>`
    <tr data-hi="${idx}">
      <td>
        <div class="nv-cell-user">
          <div class="nv-badge ${x.c}">${x.i}</div>
          <span class="nv-name">${esc(x.n)}</span>
        </div>
      </td>
      <td>${esc(x.r)}</td>
      <td>${esc(x.s)}</td>
      <td>${esc(x.sal)}</td>
      <td>${esc(x.own)}</td>
      <td>${
        x.st==='Hoàn thành'   ? '<span class="nv-status st-green">Hoàn thành</span>' :
        x.st==='Đang thử việc'? '<span class="nv-status st-blue">Đang thử việc</span>' :
                                '<span class="nv-status st-yellow">Chờ onboard</span>'}
      </td>
      <td>
        <div class="nv-row-actions">
          <button class="nv-act green js-promote" title="Nhập nhân viên"><i class="fa-solid fa-user-check"></i></button>
        </div>
      </td>
    </tr>`).join('');
}
function renderAcc(list){
  const tb = $id('accTable').querySelector('tbody');
  tb.innerHTML = list.map(x=>`
    <tr>
      <td>${esc(x.u)}</td>
      <td>${esc(x.email)}</td>
      <td>${
        x.role==='Admin' ? '<span class="nv-status st-red">Admin</span>' :
        x.role==='HR'    ? '<span class="nv-status st-blue">HR</span>' :
                           '<span class="nv-status st-green">Interviewer</span>'}
      </td>
      <td>${x.active?'<span class="nv-status st-green">Active</span>':'<span class="nv-status st-gray">Locked</span>'}</td>
      <td>${esc(x.last)}</td>
      <td>
        <div class="nv-row-actions">
          <button class="nv-act blue" title="Xem"><i class="fa-solid fa-eye"></i></button>
          <button class="nv-act green" title="Cấp quyền"><i class="fa-solid fa-key"></i></button>
          <button class="nv-act red" title="Khóa"><i class="fa-solid fa-lock"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

/* -------- Filters -------- */
function inRange(exp, pick){
  if(pick==='Chọn khoảng') return true;
  if(pick==='0-1 năm') return exp>=0 && exp<=1;
  if(pick==='1-3 năm') return exp>=1 && exp<=3;
  if(pick==='3-5 năm') return exp>=3 && exp<=5;
  if(pick==='5-8 năm') return exp>=5 && exp<=8;
  if(pick==='8+ năm') return exp>8;
  return true;
}
function applyFilters(){
  const q   = ($id('fltSearch').value || '').toLowerCase().trim();
  const dep = $id('fltDept').value;
  const tit = $id('fltTitle').value;
  const exp = $id('fltExp').value;

  state.current = EMP.filter(x=>{
    const textOk = !q || [x.n,x.e,x.d,x.t].some(v=>String(v).toLowerCase().includes(q));
    const depOk  = dep==='Tất cả' || x.d===dep;
    const titOk  = tit==='Tất cả' || x.t===tit;
    const expOk  = inRange(x.exp, exp);
    return textOk && depOk && titOk && expOk;
  });
  renderEmp(state.current);
}
function bindSearch(id, baseList, render, fields){
  const ip = $id(id);
  const run = ()=>{
    const q = (ip.value||'').toLowerCase().trim();
    render(!q ? baseList : baseList.filter(o=>fields.some(f=>String(o[f]??'').toLowerCase().includes(q))));
  };
  ip.addEventListener('input', run);
}

/* -------- Modals -------- */
function showModal(id){ const m=$id(id); if(!m) return; m.classList.add('show'); m.setAttribute('aria-hidden','false'); }
function hideModal(id){ const m=$id(id); if(!m) return; m.classList.remove('show'); m.setAttribute('aria-hidden','true'); }

/* -------- Charts -------- */
const PALETTE = { blue:'#3E73FF', blue2:'#60a5fa', green:'#34d399', orange:'#fb923c' };
const rgba = (hex,a)=>{ const n=parseInt(hex.replace('#',''),16),r=n>>16&255,g=n>>8&255,b=n&255; return `rgba(${r},${g},${b},${a})`; };
const scalesBase = {
  x:{ grid:{ color:'rgba(2,6,23,.06)' }, ticks:{ color:'#64748b', font:{ size:11 } } },
  y:{ grid:{ color:'rgba(2,6,23,.06)' }, ticks:{ color:'#64748b', font:{ size:11 } } }
};
const legendPos = ()=> (window.innerWidth < 1300 ? 'bottom' : 'right');

function makeDoughnut(canvas, data, cutout='60%', pos=null){
  const ctx = canvas.getContext('2d');
  return new Chart(ctx,{
    type:'doughnut',
    data,
    options:{
      responsive:true, maintainAspectRatio:false, cutout,
      plugins:{ legend:{ position: pos ?? legendPos(), labels:{ usePointStyle:true, boxWidth:10 } } },
      animation:{ duration:700, easing:'easeOutCubic' }
    }
  });
}

function initCharts(){
  if(!window.Chart) return;
  const charts = [];

  const g = $('#growthChart');
  if(g){
    charts.push(new Chart(g.getContext('2d'),{
      type:'line',
      data:{
        labels:['2017','2018','2019','2020','2021','2022','2023','2024','2025'],
        datasets:[{
          label:'Số NV',
          data:[4,5,7,8,12,15,18,21,23],
          borderColor:PALETTE.blue, backgroundColor:rgba(PALETTE.blue,.12),
          fill:true, tension:.35, borderWidth:3, pointRadius:3.5, pointBackgroundColor:'#fff'
        }]
      },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:scalesBase }
    }));
  }

  const role = $('#roleChart');
  if(role){
    charts.push(makeDoughnut(role,{
      labels:['Trưởng phòng','HR','Backend','Data Analyst','Kinh doanh','Tester','HR Assistant','Frontend','Fullstack','Trưởng phòng NS'],
      datasets:[{ data:[10,8,12,10,8,5,6,7,6,4],
        backgroundColor:['#3b82f6','#ef4444','#60a5fa','#22c55e','#f59e0b','#38bdf8','#a78bfa','#34d399','#93c5fd','#22d3ee'],
        borderWidth:0, hoverOffset:6 }]
    }));
  }

  const dept = $('#deptChart');
  if(dept){
    charts.push(makeDoughnut(dept,{
      labels:['Phòng Dữ liệu','Phòng IT','Kế toán','Kinh doanh','Nhân sự'],
      datasets:[{ data:[38,26,12,16,8], backgroundColor:['#8b5cf6','#f43f5e','#60a5fa','#f59e0b','#3b82f6'], borderWidth:0 }]
    }, '62%'));
  }

  const age = $('#ageChart');
  if(age){
    charts.push(new Chart(age.getContext('2d'),{
      type:'bar',
      data:{
        labels:['<25','25-30','31-35','36-40','41+'],
        datasets:[{ data:[2,6,11,4,1],
          backgroundColor:[rgba(PALETTE.blue,.9), rgba(PALETTE.blue2,.9), rgba(PALETTE.orange,.9), rgba(PALETTE.blue2,.6), rgba(PALETTE.blue2,.35)],
          borderRadius:8, borderSkipped:false }]
      },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:scalesBase }
    }));
  }

  const exp = $('#expChart');
  if(exp){
    charts.push(makeDoughnut(exp,{
      labels:['1-2','3-5','6-8','>8'],
      datasets:[{ data:[20,38,22,10], backgroundColor:['#3b82f6','#fb7185','#f59e0b','#10b981'], borderWidth:0 }]
    }, '65%', 'bottom'));
  }

  const role2 = $('#role2Chart');
  if(role2){
    charts.push(makeDoughnut(role2,{
      labels:['Admin','HR','Interviewer'],
      datasets:[{ data:[10,20,70], backgroundColor:['#3b82f6','#ef4444','#f59e0b'], borderWidth:0 }]
    }, '65%', 'bottom'));
  }

  // Reflow khi đổi kích thước/thu gọn sidebar
  const reflow = ()=>{
    charts.forEach(c=>{
      if(c.config.type==='doughnut' && c.options.plugins?.legend){
        c.options.plugins.legend.position = legendPos();
      }
      c.resize(); c.update('none');
    });
  };
  window.addEventListener('resize', reflow);
  const main = $('#mainContent');
  if(main){ new MutationObserver(()=> reflow()).observe(main,{ attributes:true, attributeFilter:['class','style'] }); }
}

/* -------- Page init -------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // Render bảng + KPI
  renderEmp(state.current);
  renderHired(HIRED);
  renderAcc(ACC);

  // Filters
  $id('fltSearch').addEventListener('input', applyFilters);
  $id('fltDept').addEventListener('change', applyFilters);
  $id('fltTitle').addEventListener('change', applyFilters);
  $id('fltExp').addEventListener('change', applyFilters);
  $id('btnReset').addEventListener('click', ()=>{
    ['fltSearch','fltDept','fltTitle','fltExp'].forEach(id=>{
      const el=$id(id); if(el.tagName==='INPUT') el.value=''; else el.selectedIndex=0;
    });
    state.current=[...EMP]; renderEmp(state.current);
  });

  // Search nhanh 3 bảng
  bindSearch('empSearch',   state.current, list=>renderEmp(list),   ['n','d','t','e']);
  bindSearch('hiredSearch', HIRED,         list=>renderHired(list), ['n','r','sal','own','st']);
  bindSearch('accSearch',   ACC,           list=>renderAcc(list),   ['u','email','role']);

  // Modals
  $$('.nv-modal [data-close]').forEach(btn=>btn.addEventListener('click', e=> hideModal(btn.closest('.nv-modal-backdrop').id)));
  $$('.nv-modal-backdrop').forEach(overlay=> overlay.addEventListener('click', e=>{ if(e.target===overlay) hideModal(overlay.id); }));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ $$('.nv-modal-backdrop.show').forEach(m=>hideModal(m.id)); } });

  // Thêm nhân viên
  const openAdd = ()=>{
    $id('ae_name').value=''; $id('ae_email').value=''; $id('ae_exp').value='2';
    $id('ae_active').checked=true; $id('ae_dept').selectedIndex=0; $id('ae_title').selectedIndex=0;
    showModal('modalAddEmp');
  };
  $id('btnAdd')?.addEventListener('click', openAdd);
  $id('btnAddEmp')?.addEventListener('click', openAdd);
  $id('ae_save').addEventListener('click', ()=>{
    const n=$id('ae_name').value.trim(), d=$id('ae_dept').value, t=$id('ae_title').value;
    const e=$id('ae_email').value.trim(), a=$id('ae_active').checked?1:0, exp=parseInt($id('ae_exp').value||'0',10);
    if(!n || !e) return alert('Vui lòng nhập họ tên và email.');
    const i=n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
    const c=['b-blue','b-green','b-purple'][Math.floor(Math.random()*3)];
    EMP.unshift({n,d,t,e,a,i,c,exp}); state.current=[...EMP];
    renderEmp(state.current); hideModal('modalAddEmp');
  });

  // Nhập ứng viên thành nhân viên
  $id('hiredTable').addEventListener('click', e=>{
    const btn = e.target.closest('.js-promote'); if(!btn) return;
    const tr = e.target.closest('tr'); const idx = parseInt(tr.dataset.hi,10);
    const hv = HIRED[idx];
    $id('pm_idx').value=idx;
    $id('pm_name').value = hv.n;
    $id('pm_title').value = hv.r;
    $id('pm_dept').selectedIndex = 0;
    $id('pm_email').value = hv.n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'.')+'@corp.vn';
    $id('pm_exp').value = 1; $id('pm_active').checked=true;
    showModal('modalPromote');
  });
  $id('pm_save').addEventListener('click', ()=>{
    const n=$id('pm_name').value.trim(), d=$id('pm_dept').value, t=$id('pm_title').value;
    const e=$id('pm_email').value.trim(), a=$id('pm_active').checked?1:0, exp=parseInt($id('pm_exp').value||'1',10);
    if(!n || !e) return alert('Thiếu họ tên hoặc email.');
    const i=n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
    const c=['b-blue','b-green','b-purple'][Math.floor(Math.random()*3)];
    EMP.unshift({n,d,t,e,a,i,c,exp}); state.current=[...EMP];
    renderEmp(state.current); hideModal('modalPromote');
  });

  // Tạo tài khoản
  $id('empTable').addEventListener('click', e=>{
    const btn = e.target.closest('.js-create-acc'); if(!btn) return;
    const tr = e.target.closest('tr'); const idx = parseInt(tr.dataset.i,10);
    const emp = state.current[idx];
    const suggestion = (emp.e.split('@')[0] || emp.n.split(' ')[0]).toLowerCase().replace(/[^a-z0-9\.]/g,'');
    $id('ac_user').value = suggestion;
    $id('ac_email').value = emp.e;
    $id('ac_role').value  = 'HR';
    $id('ac_active').value= '1';
    $id('ac_from_email').value = emp.e;
    showModal('modalAccount');
  });
  $id('btnAddAcc')?.addEventListener('click', ()=>{
    $id('ac_user').value=''; $id('ac_email').value=''; $id('ac_role').value='HR'; $id('ac_active').value='1';
    $id('ac_from_email').value=''; showModal('modalAccount');
  });
  $id('ac_save').addEventListener('click', ()=>{
    const u=$id('ac_user').value.trim(), email=$id('ac_email').value.trim();
    const role=$id('ac_role').value, active=+$id('ac_active').value;
    if(!u || !email) return alert('Vui lòng nhập username & email');
    ACC.unshift({u,email,role,active,last:'—'}); renderAcc(ACC);
    hideModal('modalAccount');
  });

  // Charts sau cùng (đợi layout ổn định)
  requestAnimationFrame(initCharts);
});
