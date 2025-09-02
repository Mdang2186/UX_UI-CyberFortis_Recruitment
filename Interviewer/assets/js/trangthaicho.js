/* ============ FILTERS & ACTIONS (giữ nguyên hành vi) ============ */
function toggleScoreFilter() {
  const dropdown = document.getElementById('scoreFilterDropdown');
  const menu = document.getElementById('scoreFilterMenu');
  dropdown?.classList.toggle('active');
  menu?.classList.toggle('show');
}
function togglePositionFilter() {
  const dropdown = document.getElementById('positionFilterDropdown');
  const menu = document.getElementById('positionFilterMenu');
  dropdown?.classList.toggle('active');
  menu?.classList.toggle('show');
}
function toggleWaitingFilter() {
  const dropdown = document.getElementById('waitingFilterDropdown');
  const menu = document.getElementById('waitingFilterMenu');
  dropdown?.classList.toggle('active');
  menu?.classList.toggle('show');
}
function setScoreFilter(score) {
  document.querySelectorAll('#scoreFilterMenu .dropdown-item').forEach(i=>i.classList.remove('active'));
  (event?.target)?.classList.add('active');
  const names={all:'Tất cả điểm số',excellent:'Xuất sắc (8.5-10)',good:'Tốt (7.0-8.4)',average:'Trung bình (5.5-6.9)',poor:'Yếu (< 5.5)'};
  const el=document.getElementById('selectedScore'); if(el) el.textContent=names[score];
  filterTableByScore(score);
  document.getElementById('scoreFilterDropdown')?.classList.remove('active');
  document.getElementById('scoreFilterMenu')?.classList.remove('show');
}
function setPositionFilter(position) {
  document.querySelectorAll('#positionFilterMenu .dropdown-item').forEach(i=>i.classList.remove('active'));
  (event?.target)?.classList.add('active');
  const names={all:'Tất cả vị trí',frontend:'Frontend',backend:'Backend',uiux:'UI/UX',fullstack:'Fullstack'};
  const el=document.getElementById('selectedPosition'); if(el) el.textContent=names[position];
  filterTableByPosition(position);
  document.getElementById('positionFilterDropdown')?.classList.remove('active');
  document.getElementById('positionFilterMenu')?.classList.remove('show');
}
function setWaitingFilter(waiting) {
  document.querySelectorAll('#waitingFilterMenu .dropdown-item').forEach(i=>i.classList.remove('active'));
  (event?.target)?.classList.add('active');
  const names={all:'Tất cả thời gian chờ',urgent:'Khẩn cấp (> 7 ngày)',warning:'Cảnh báo (4-7 ngày)',normal:'Bình thường (< 4 ngày)'};
  const el=document.getElementById('selectedWaiting'); if(el) el.textContent=names[waiting];
  filterTableByWaiting(waiting);
  document.getElementById('waitingFilterDropdown')?.classList.remove('active');
  document.getElementById('waitingFilterMenu')?.classList.remove('show');
}
document.addEventListener('click', (e)=>{
  [['scoreFilterDropdown','scoreFilterMenu'],
   ['positionFilterDropdown','positionFilterMenu'],
   ['waitingFilterDropdown','waitingFilterMenu']
  ].forEach(([d,m])=>{
    const dd=document.getElementById(d), menu=document.getElementById(m);
    if(dd && !dd.contains(e.target)){ dd.classList.remove('active'); menu?.classList.remove('show'); }
  });
});
function filterTableByScore(score){
  document.querySelectorAll('.candidates-table tbody tr').forEach(row=>{
    const e=row.querySelector('.score-value');
    let show=score==='all';
    if(!show && e){
      const v=parseFloat(e.textContent);
      show = (score==='excellent' && v>=8.5) ||
             (score==='good'      && v>=7.0 && v<8.5) ||
             (score==='average'   && v>=5.5 && v<7.0) ||
             (score==='poor'      && v<5.5);
    }
    row.style.display= show ? '' : 'none';
  });
}
function filterTableByPosition(position){
  document.querySelectorAll('.candidates-table tbody tr').forEach(row=>{
    const e=row.querySelector('.position-badge');
    let show=position==='all';
    if(!show && e){
      const p = e.classList.contains('frontend') ? 'frontend'
              : e.classList.contains('backend')  ? 'backend'
              : e.classList.contains('uiux')     ? 'uiux'
              : e.classList.contains('fullstack')? 'fullstack' : 'other';
      show = p===position;
    }
    row.style.display= show ? '' : 'none';
  });
}
function filterTableByWaiting(waiting){
  document.querySelectorAll('.candidates-table tbody tr').forEach(row=>{
    const e=row.querySelector('.waiting-days');
    let show=waiting==='all';
    if(!show && e){
      const c = e.classList.contains('urgent') ? 'urgent'
              : e.classList.contains('warning')? 'warning' : 'normal';
      show = c===waiting;
    }
    row.style.display= show ? '' : 'none';
  });
}
function searchCandidates(term){
  const q = (term||'').toLowerCase().trim();
  document.querySelectorAll('.candidates-table tbody tr').forEach(row=>{
    const name = row.querySelector('.candidate-details h4')?.textContent.toLowerCase()||'';
    const mail = row.querySelector('.candidate-details p')?.textContent.toLowerCase()||'';
    const pos  = row.querySelector('.position-badge')?.textContent.toLowerCase()||'';
    const show = !q || name.includes(q) || mail.includes(q) || pos.includes(q);
    row.style.display = show ? '' : 'none';
  });
}
function viewEvaluation(name){
  const el=document.getElementById('candidateName'); if(el) el.textContent=name;
  document.getElementById('evaluationModal')?.classList.add('show');
}
function viewCV(name){ alert(`Đang mở CV của ${name}...`); }
function scheduleInterview(name){
  const el=document.getElementById('scheduleCandidate'); if(el) el.textContent=name;
  document.getElementById('scheduleModal')?.classList.add('show');
}
function scheduleFromEvaluation(){
  const name=document.getElementById('candidateName')?.textContent||'';
  closeModal('evaluationModal'); scheduleInterview(name);
}
function confirmSchedule(){ alert('Đã xếp lịch phỏng vấn vòng 2 thành công!'); closeModal('scheduleModal'); }
function closeModal(id,e){ if(e && e.target!==e.currentTarget) return; document.getElementById(id)?.classList.remove('show'); }

/* ===================== CHARTS ===================== */
function initCharts(){
  if(!window.Chart){ console.error('Chart.js chưa nạp'); return; }

  // Doughnut: Phân bố trạng thái
  const st = document.getElementById('statusChart');
  if (st){
    const old = Chart.getChart(st); if(old) old.destroy();
    new Chart(st.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Chờ xử lý', 'Đang xử lý', 'Ưu tiên cao', 'Hoàn thành'],
        datasets: [{
          data: [24,12,8,15],
          backgroundColor:[
            '#3b82f6',
            '#22d3ee',
            '#5eead4',
            '#10b981'
          ],
          borderColor:['#3b82f6','#22d3ee','#5eead4','#10b981'],
          borderWidth:2,
          hoverOffset:8,
          cutout:'65%'
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
          legend:{ position:'bottom', labels:{ usePointStyle:true, pointStyle:'circle', padding:16 } },
          tooltip:{
            backgroundColor:'rgba(17,24,39,.95)',
            borderColor:'rgba(59,130,246,.5)', borderWidth:1,
            padding:12, cornerRadius:10
          }
        }
      }
    });
  }

  // Bar: Thời gian xử lý
  const tm = document.getElementById('timeChart');
  if (tm){
    const old = Chart.getChart(tm); if(old) old.destroy();
    new Chart(tm.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Sàng lọc CV','Phỏng vấn HR','Test kỹ thuật','Phỏng vấn chuyên môn','Quyết định cuối'],
        datasets: [{
          label: 'Thời gian trung bình (ngày)',
          data: [2,3,5,4,2],
          backgroundColor:[
            '#3b82f6','#0ea5e9','#0ea5e9',
            '#14b8a6','#10b981'
          ],
          borderColor:['#3b82f6','#0ea5e9','#0ea5e9',
            '#14b8a6','#10b981'],
          borderWidth:2,
          borderSkipped:false,
          borderRadius:8,
          maxBarThickness:48
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{ legend:{ display:false },
          tooltip:{ backgroundColor:'rgba(17,24,39,.95)', padding:12, cornerRadius:10 }
        },
        scales:{
          y:{ beginAtZero:true, ticks:{ stepSize:1, callback:v=>v+' ngày' }, grid:{ color:'rgba(148,163,184,.15)' } },
          x:{ grid:{ display:false } }
        },
        animation:{ duration:900, easing:'easeOutQuart' }
      }
    });
  }
}

/* Khởi tạo sau khi DOM xong + 1 frame để layout tính chiều cao canvas */
document.addEventListener('DOMContentLoaded', ()=> {
  requestAnimationFrame(()=> initCharts());
});
