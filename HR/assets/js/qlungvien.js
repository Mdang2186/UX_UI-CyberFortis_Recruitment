// ============ NAVIGATION ============
function navigateTo(page){
  if(page==='dashboard'){ alert('Điều hướng đến trang Tổng quan'); }
  else if(page==='candidates'){ console.log('Already on candidates page'); }
  else{ alert(`Điều hướng đến trang ${page}`); }
}

// ============ SIDEBAR SECTIONS ============
function toggleSection(sectionId){
  const sidebar = document.querySelector('.sidebar');            // FIX: khai báo sidebar
  const section = document.querySelector(`#${sectionId}-content`).parentElement;
  const chevron = document.getElementById(`${sectionId}-chevron`);
  if(sidebar && sidebar.classList.contains('collapsed')) return;
  section.classList.toggle('collapsed');
  chevron.style.transform = section.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
}

// ============ USER DROPDOWN ============
function toggleUserDropdown(){
  const dropdown = document.getElementById('userDropdown');
  const chevron = document.getElementById('avatarChevron');
  dropdown.classList.toggle('opacity-0');
  dropdown.classList.toggle('invisible');
  chevron.classList.toggle('rotate-180');
}
function expandAvatar(){}  // handled by CSS
function collapseAvatar(){} // handled by CSS
function toggleUserMenu(){
  const userMenu = document.getElementById('userMenu');
  if(userMenu){ userMenu.classList.toggle('opacity-0'); userMenu.classList.toggle('invisible'); }
}

// ============ FILTER DROPDOWNS ============
function toggleFilter(filterId){
  const filter = document.getElementById(filterId);
  document.querySelectorAll('.filter-dropdown').forEach(f=>{ if(f.id!==filterId) f.classList.remove('show'); });
  filter.classList.toggle('show');
}
document.addEventListener('click', (e)=>{
  const isBtn = !!e.target.closest('[onclick^="toggleFilter"]');
  const isDD  = !!e.target.closest('.filter-dropdown');
  if(!isBtn && !isDD) document.querySelectorAll('.filter-dropdown').forEach(d=>d.classList.remove('show'));
});

// ============ DETAILS DRAWER ============
function openDetails(candidateId){
  const candidate = candidatesData[candidateId];
  if(!candidate) return;
  const drawerContent = document.getElementById('drawerContent');
  drawerContent.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">${candidate.hoTen}</h3>
        <button onclick="closeDetails()" class="p-2 rounded-lg hover:bg-gray-100">
          <i class="fas fa-times text-gray-500"></i>
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${[
          ['Họ tên', candidate.hoTen],
          ['Email', candidate.email],
          ['SĐT', candidate.sdt],
          ['Vị trí', candidate.viTri],
          ['Trạng thái', `<span class="status-chip status-${candidate.tt.toLowerCase().replace(' ', '-').replace('đã tuyển','da-tuyen')}">${candidate.tt}</span>`],
          ['Ngày nộp hồ sơ', candidate.ngay],
          ['Ngày sinh', candidate.ngaySinh],
          ['Giới tính', candidate.gioiTinh],
          ['Địa chỉ', candidate.diaChi],
          ['Kinh nghiệm', candidate.kinhnghiem],
          ['Học vấn', candidate.hocVan],
          ['Kỹ năng', candidate.kyNang],
          ['Mô tả', candidate.moTa],
        ].map(([k,v])=>`
          <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
            <p class="text-sm text-gray-600 font-medium">${k}</p>
            <p class="text-gray-800">${v}</p>
          </div>`).join('')}
        <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
          <p class="text-sm text-gray-600 font-medium">CV</p>
          <button onclick="viewCV('${candidate.cv}')" class="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
            <i class="fas fa-file-pdf"></i><span>Xem CV</span>
          </button>
        </div>
      </div>
      <div class="flex space-x-3 pt-4 border-t border-gray-200">
        <button onclick="sendMail('${candidate.email}')" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <i class="fas fa-envelope mr-2"></i>Gửi email
        </button>
        <button class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <i class="fas fa-calendar-plus mr-2"></i>Lên lịch PV
        </button>
      </div>
    </div>`;
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('detailsDrawer').classList.add('open');
}
function closeDetails(){
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('detailsDrawer').classList.remove('open');
}
function sendMail(email){ alert(`Mở giao diện gửi email cho: ${email}`); }
function viewCV(cvPath){ alert(`Xem CV: ${cvPath}`); }

// ============ CHARTS (Chart.js) ============
let sourceChart, statusChart, trendChart, ageChart;

document.addEventListener('DOMContentLoaded', initializeCharts);

function initializeCharts(){
  if(typeof Chart==='undefined') return;

  // Source (Doughnut)
  const sourceCtx = document.getElementById('sourceChart')?.getContext('2d');
  if(sourceCtx){
    sourceChart = new Chart(sourceCtx,{  // FIX: gán biến global (không dùng const local)
      type:'doughnut',
      data:{
        labels:['Website','LinkedIn','Facebook','Khác'],
        datasets:[{
          data:[45,30,15,10],
          backgroundColor:['#3B82F6','#10B981','#8B5CF6','#F59E0B'],
          hoverBackgroundColor:['#2563EB','#059669','#7C3AED','#D97706'],
          hoverOffset:10
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false},
          tooltip:{ callbacks:{ label:(ctx)=>{
            const val=ctx.raw, total=ctx.dataset.data.reduce((a,b)=>a+b,0);
            return `${ctx.label}: ${val} (${((val/total)*100).toFixed(2)}%)`; } } },
        },
        cutout:'60%'
      }
    });
  }

  // Status (Pie)
  const statusCtx = document.getElementById('statusChart')?.getContext('2d');
  if(statusCtx){
    statusChart = new Chart(statusCtx,{
      type:'pie',
      data:{
        labels:['Mới','PV1','PV2','Đã tuyển','Trượt'],
        datasets:[{
          data:[350,180,95,120,255],
          backgroundColor:['#60A5FA','#EAB308','#F97316','#10B981','#EF4444'],
          hoverBackgroundColor:['#2563EB','#CA8A04','#EA580C','#059669','#DC2626'],
          hoverOffset:10
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false},
          tooltip:{ callbacks:{ label:(ctx)=>{
            const val=ctx.raw, total=ctx.dataset.data.reduce((a,b)=>a+b,0);
            return `${ctx.label}: ${val} (${((val/total)*100).toFixed(2)}%)`; } } }
        }
      }
    });
  }

  // Trend (Line)
  const trendCtx = document.getElementById('trendChart')?.getContext('2d');
  if(trendCtx){
    trendChart = new Chart(trendCtx,{
      type:'line',
      data:{
        labels:['T2','T3','T4','T5','T6','T7','CN'],
        datasets:[
          {label:'Ứng viên mới', data:[12,19,15,25,22,18,8],
           borderColor:'#3B82F6', backgroundColor:'rgba(59,130,246,.10)', tension:.4, fill:true, borderWidth:4},
          {label:'Đã tuyển', data:[2,3,5,4,6,3,1],
           borderColor:'#10B981', backgroundColor:'rgba(16,185,129,.10)', tension:.4, fill:true, borderWidth:4},
          {label:'Trượt', data:[5,8,6,12,9,7,3],
           borderColor:'#EF4444', backgroundColor:'rgba(239,68,68,.10)', tension:.4, fill:true, borderWidth:4}
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{ position:'bottom', labels:{ usePointStyle:true, pointStyle:'circle' } },
          tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}` } }
        },
        scales:{
          y:{ beginAtZero:true, grid:{ color:'rgba(0,0,0,.1)' } },
          x:{ grid:{ display:false } }
        }
      }
    });
  }

  // Age (Bar)
  const ageCtx = document.getElementById('ageChart')?.getContext('2d');
  if(ageCtx){
    ageChart = new Chart(ageCtx,{
      type:'bar',
      data:{
        labels:['Dưới 25','25-30','31-35','36-40','Trên 40'],
        datasets:[{
          label:'Số lượng ứng viên',
          data:[120,300,200,100,50],
          backgroundColor:['#60A5FA','#F59E0B','#10B981','#F97316','#8B5CF6'],
          borderRadius:8, borderSkipped:false
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false},
          tooltip:{ callbacks:{ label:(ctx)=>`${ctx.label}: ${ctx.raw} ứng viên` } } },
        scales:{
          x:{ ticks:{ color:'#6B7280', font:{ size:12 } }, grid:{ color:'#F3F4F6', borderColor:'#E5E7EB' },
              title:{ display:true, text:'Độ tuổi', color:'#6B7280', font:{ size:14, weight:'600' } } },
          y:{ ticks:{ color:'#6B7280', font:{ size:12 } }, grid:{ color:'#F3F4F6', borderColor:'#E5E7EB' },
              title:{ display:true, text:'Số lượng ứng viên', color:'#6B7280', font:{ size:14, weight:'600' } } }
        }
      }
    });
  }
}

// Cập nhật biểu đồ xu hướng theo kỳ
function updateTrendChart(period){
  // Reset button states (nếu có các nút weekBtn, monthBtn, quarterBtn)
  document.querySelectorAll('[id$="Btn"]').forEach(btn=>{
    btn.className='px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg';
  });
  const active = document.getElementById(period+'Btn');
  if(active){ active.className='px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg'; }

  if(!trendChart) return;
  let labels,newData,hiredData,rejectedData;
  if(period==='week'){
    labels=['T2','T3','T4','T5','T6','T7','CN'];
    newData=[12,19,15,25,22,18,8]; hiredData=[2,3,5,4,6,3,1]; rejectedData=[5,8,6,12,9,7,3];
  }else if(period==='month'){
    labels=['Tuần 1','Tuần 2','Tuần 3','Tuần 4'];
    newData=[85,92,78,95]; hiredData=[15,18,22,25]; rejectedData=[35,42,38,45];
  }else{
    labels=['Tháng 1','Tháng 2','Tháng 3'];
    newData=[120,80,150]; hiredData=[85,95,90]; rejectedData=[150,180,65];
  }
  trendChart.data.labels=labels;
  trendChart.data.datasets[0].data=newData;
  trendChart.data.datasets[1].data=hiredData;
  trendChart.data.datasets[2].data=rejectedData;
  trendChart.update();
}

// ============ QUICK FILTERS ============
function applyQuickFilters(){
  const statusFilters = Array.from(document.querySelectorAll('#statusFilter input:checked')).map(cb=>cb.parentElement.textContent.trim());
  const positionFilters = Array.from(document.querySelectorAll('#positionFilter input:checked')).map(cb=>cb.parentElement.textContent.trim());
  const timeFilter = document.querySelector('input[name="timeRange"]:checked')?.value || 'all';

  let resultCount = 1000;
  if(statusFilters.length>0)   resultCount=Math.floor(resultCount*0.7);
  if(positionFilters.length>0) resultCount=Math.floor(resultCount*0.6);
  if(timeFilter!=='all')       resultCount=Math.floor(resultCount*0.5);

  const btn = event.target, old = btn.innerHTML;
  btn.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i>Đang lọc...'; btn.disabled=true;
  setTimeout(()=>{
    btn.innerHTML=old; btn.disabled=false;
    const tableCount=document.getElementById('tableResultCount');
    if(tableCount) tableCount.textContent=`Hiển thị 1-10 trong ${resultCount.toLocaleString()} kết quả`;
    showQuickStats(statusFilters, positionFilters, timeFilter, resultCount);
    const mini=document.getElementById('resultCountMini');   // cập nhật số mini nếu có
    if(mini) mini.textContent=resultCount.toLocaleString();
  },1000);
}

function showQuickStats(statusFilters, positionFilters, timeFilter, totalCount){
  const quickStats = document.getElementById('quickStats');
  const quickStatsContent = document.getElementById('quickStatsContent');
  const stats={ total:totalCount, new:Math.floor(totalCount*0.35), interview:Math.floor(totalCount*0.25), hired:Math.floor(totalCount*0.12) };
  quickStatsContent.innerHTML = `
    <div class="text-center"><div class="text-2xl font-bold text-gray-800">${stats.total.toLocaleString()}</div><div class="text-sm text-gray-600">Tổng ứng viên</div></div>
    <div class="text-center"><div class="text-2xl font-bold text-blue-600">${stats.new.toLocaleString()}</div><div class="text-sm text-gray-600">Mới</div></div>
    <div class="text-center"><div class="text-2xl font-bold text-orange-600">${stats.interview.toLocaleString()}</div><div class="text-sm text-gray-600">Phỏng vấn</div></div>
    <div class="text-center"><div class="text-2xl font-bold text-green-600">${stats.hired.toLocaleString()}</div><div class="text-sm text-gray-600">Đã tuyển</div></div>`;
  quickStats.style.display='block';
}

function clearQuickFilters(){
  document.querySelectorAll('#statusFilter input, #positionFilter input').forEach(i=>i.checked=false);
  document.querySelectorAll('input[name="timeRange"]').forEach(i=>i.checked=false);
  const quickStats=document.getElementById('quickStats'); if(quickStats) quickStats.style.display='none';
  const tableCount=document.getElementById('tableResultCount'); if(tableCount) tableCount.textContent='Hiển thị 1-10 trong 1,000 kết quả';
  const mini=document.getElementById('resultCountMini'); if(mini) mini.textContent='1,000';
}

// ============ ADVANCED FILTERS ============
function applyFilters(){
  const resultCount = Math.floor(Math.random()*500)+500;
  // cập nhật số mini
  const mini=document.getElementById('resultCountMini'); if(mini) mini.textContent=resultCount.toLocaleString();

  const btn = event.target, old = btn.innerHTML;
  btn.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i>Đang lọc...'; btn.disabled=true;
  setTimeout(()=>{ btn.innerHTML=old; btn.disabled=false; alert(`Đã áp dụng bộ lọc! Tìm thấy ${resultCount} ứng viên phù hợp.`); },1500);
}

function resetFilters(){
  document.querySelectorAll('input[type="date"]').forEach(i=>i.value='');
  document.querySelectorAll('select').forEach(s=>s.selectedIndex=0);
  const mini=document.getElementById('resultCountMini'); if(mini) mini.textContent='1,000';
  alert('Đã đặt lại tất cả bộ lọc!');
}

// ============ ADD CANDIDATE (thay cho Export) ============
function openAddCandidate(){
  // TODO: gắn với modal/drawer thêm ứng viên thực tế của bạn
  alert('Mở form thêm ứng viên');
}
