/* ============================================================================
   Thống Kê & Báo Cáo – Chart area có NỀN, không viền/khung, hover nổi bật
   Tone: Navi → Green Pastel. Giữ nguyên mọi tương tác (legend/tooltip/filters)
============================================================================ */
(function(){
  'use strict';
  if (typeof window.Chart === 'undefined') return;

  /* ===== Defaults ===== */
  Chart.defaults.font.family = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  Chart.defaults.color = '#334155';
  Chart.defaults.borderColor = 'rgba(226,232,240,.9)';
  Chart.defaults.animation.duration = 600;
  Chart.defaults.elements.point.radius = 3.5;
  Chart.defaults.elements.point.hoverRadius = 6.5;
  Chart.defaults.elements.point.hitRadius = 12;
  Chart.defaults.elements.line.borderWidth = 3;
  Chart.defaults.elements.bar.borderRadius = 10;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;

  /* ===== Palette & helpers ===== */
// === PALETTE MỚI: Navi → Blue → Mint Pastel (đậm → nhạt) ===
const NAVY   = '#18356E';   // navi đậm
const BLUE   = '#2F63D8';   // xanh dương chủ đạo
const BLUE300= '#8FB6FF';   // xanh dương nhạt
const TEAL   = '#6FCDBE';   // teal pastel
const PASTEL = '#CFF6EA';   // mint pastel rất nhạt
const GREEN  = '#17B890';   // xanh lục brand (line thứ 2, donut/stack)

  const hex2rgb = h => { const n=parseInt(h.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; };
  const rgba = (h,a)=>{ const [r,g,b]=hex2rgb(h); return `rgba(${r},${g},${b},${a})`; };
  const gradY = (ctx, hex)=>{
    const g = ctx.createLinearGradient(0,0,0,ctx.canvas.height||300);
    g.addColorStop(0, rgba(hex,.24));
    g.addColorStop(1, rgba(hex,.06));
    return g;
  };
  const lerp = (a,b,t)=>a+(b-a)*t;
  const lerpHex = (h1,h2,t)=>{
    const [r1,g1,b1]=hex2rgb(h1), [r2,g2,b2]=hex2rgb(h2);
    const r=Math.round(lerp(r1,r2,t)), g=Math.round(lerp(g1,g2,t)), b=Math.round(lerp(b1,b2,t));
    return `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`;
  };
  const scaleBetween = (start,end,n)=> Array.from({length:n},(_,i)=> lerpHex(start,end, i/(n-1||1)) );

  /* ===== Plugins ===== */
  // 1) Nền cho chart-area (không phải viền/khung)
  const chartAreaBg = {
    id:'chartAreaBg',
    beforeDraw(chart, args, opts){
      const {ctx, chartArea} = chart;
      if(!chartArea) return;
      const {left, top, right, bottom} = chartArea;
      ctx.save();
      ctx.fillStyle = opts?.color || 'rgba(37, 99, 235, .045)'; // xanh navi nhạt
      ctx.fillRect(left, top, right-left, bottom-top);
      ctx.restore();
    }
  };
  // 2) Crosshair dọc
  const crosshair = {
    id:'crosshair',
    afterDatasetsDraw(chart){
      const act = chart.tooltip?.getActiveElements?.() || [];
      if(!act.length) return;
      const {ctx, chartArea:{top,bottom}, scales:{x}} = chart;
      const idx = act[0].index;
      const xPos = x?.getPixelForValue ? x.getPixelForValue(idx) : act[0].element?.x;
      if(!xPos) return;
      ctx.save();
      ctx.setLineDash([4,4]);
      ctx.strokeStyle = 'rgba(15,23,42,.35)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xPos, top); ctx.lineTo(xPos, bottom); ctx.stroke();
      ctx.restore();
    }
  };
  // 3) Làm mờ dataset không active nhưng tôn trọng legend
  const highlightActive = {
    id:'highlightActive',
    beforeDatasetsDraw(chart){
      const act = chart.tooltip?.getActiveElements?.() || [];
      const idx = act[0]?.datasetIndex ?? null;
      const {ctx} = chart; ctx.save();
      chart.data.datasets.forEach((_, i)=>{
        if (!chart.isDatasetVisible(i)) return;
        const meta = chart.getDatasetMeta(i);
        ctx.globalAlpha = (idx===null || idx===i) ? 1 : .38;
        meta.controller.draw();
        ctx.globalAlpha = 1;
      });
      ctx.restore();
      return true;
    }
  };
  // 4) Glow cho bar/donut khi hover
  const glow = {
    id:'segmentGlow',
    afterDraw(chart){
      const act = chart.getActiveElements?.() || [];
      if(!act.length) return;
      const di = act[0].datasetIndex;
      if(!chart.isDatasetVisible(di)) return;
      const meta = chart.getDatasetMeta(di);
      if(!['bar','doughnut','pie'].includes(meta.type)) return;
      const {ctx} = chart;
      ctx.save(); ctx.shadowColor='rgba(0,0,0,.18)'; ctx.shadowBlur=12; ctx.shadowOffsetY=8;
      meta.controller.draw(); ctx.restore();
    }
  };
  Chart.register(chartAreaBg, crosshair, highlightActive, glow);

  /* ===== Base options (áp nền chart-area qua plugin) ===== */
  const base = {
    responsive:true, maintainAspectRatio:false,
    interaction:{ mode:'index', intersect:false },
    plugins:{
      legend:{ position:'bottom',
        labels:{ color:'#334155', padding:16, boxWidth:10, font:{ size:12, weight:'600' } }
      },
      tooltip:{
        backgroundColor:'rgba(2,6,23,.96)', borderColor:'#0f172a', borderWidth:1,
        titleColor:'#F8FAFC', bodyColor:'#F8FAFC', cornerRadius:10, padding:12,
        displayColors:true, titleFont:{ size:13, weight:'800' }, bodyFont:{ size:12, weight:'600' }
      },
      // >>> NỀN chart-area (có thể đổi đậm/nhạt ở đây)
      chartAreaBg:{ color:'rgba(30, 58, 138, .05)' } // NAVY 5%
    },
    onHover:(e)=>{ e?.native && (e.native.target.style.cursor='crosshair'); },
    scales:{
      x:{ grid:{ display:false }, ticks:{ color:'#475569', font:{ size:12, weight:'600' } } },
      y:{ grid:{ color:'rgba(203,213,225,.55)', drawBorder:false }, ticks:{ color:'#475569', font:{ size:12, weight:'600' } }, beginAtZero:true }
    }
  };

  /* ===== Safe ctx ===== */
  const ctxOf = id => { const el=document.getElementById(id); return el ? el.getContext('2d') : null; };

  /* ===== Data packs giữ API ===== */
  const packs = {
    month:{ labels:['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'], candidates:[120,150,180,200,170,190,210,230,220,240,260,255], interviews:[30,45,55,60,50,58,62,66,61,70,74,72] },
    quarter:{ labels:['Q1','Q2','Q3','Q4'], candidates:[450,520,560,640], interviews:[130,155,170,190] },
    year:{ labels:['2021','2022','2023','2024','2025'], candidates:[1650,1820,2010,2280,2410], interviews:[480,560,650,720,790] }
  };
  const lineDS = (label,data,color,ctx,fill=true)=>({
    label, data, borderColor:color,
    backgroundColor: fill ? gradY(ctx, color) : 'transparent',
    pointBackgroundColor:'#fff', pointBorderColor:color, pointBorderWidth:2,
    tension:.35, fill
  });

  /* ===================== CHARTS ===================== */

  // 1) Xu hướng theo vị trí
  (function(){
    const ctx = ctxOf('positionTrendChart'); if(!ctx) return;
    new Chart(ctx,{ type:'line',
      data:{ labels:['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
        datasets:[
          lineDS('Frontend',[15,18,16,22,25,28,26,31,35,40,43,39], BLUE, ctx),
          lineDS('Business Analyst',[11,13,12,15,18,20,19,22,24,27,30,26], BLUE300, ctx),
          lineDS('UI/UX',[7,9,8,11,12,14,13,16,18,20,22,19], GREEN, ctx),
          lineDS('Marketing',[5,7,6,9,11,12,14,15,17,19,21,18], TEAL, ctx),
          lineDS('Data',[4,6,5,8,9,10,12,13,15,17,19,16], PASTEL, ctx, false)
        ]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{...base.plugins.legend, position:'top'} } }
    });
  })();

  // 2) Phân bố phòng ban (doughnut)
  (function(){
    const ctx = ctxOf('departmentChart'); if(!ctx) return;
    new Chart(ctx,{ type:'doughnut',
      data:{
        labels:['IT','Marketing','Sales','HR','Finance'],
        datasets:[{
          data:[35,25,20,12,8],
          backgroundColor:[NAVY, BLUE, TEAL, PASTEL, BLUE300],
          hoverOffset:12, borderWidth:0
        }]
      },
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{ ...base.plugins, legend:{ position:'bottom', labels:{ ...base.plugins.legend.labels, padding:12 } } } }
    });
  })();

  // 3) Xu hướng theo tháng (main)
  (function(){
    const ctx = ctxOf('monthlyTrendChart'); if(!ctx) return;
    window.monthlyTrendChart = new Chart(ctx,{ type:'line',
      data:{ labels:packs.month.labels,
        datasets:[ lineDS('Ứng viên', packs.month.candidates, BLUE, ctx),
                   lineDS('Phỏng vấn', packs.month.interviews, GREEN, ctx) ]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{...base.plugins.legend, position:'top', align:'end'} } }
    });
  })();

  // 4) Phễu chuyển đổi (NAVY → PASTEL GREEN across steps)
  (function(){
    const ctx = ctxOf('conversionFunnelChart'); if(!ctx) return;
    const steps = ['Lượt xem','Ứng tuyển','Sàng lọc','Phỏng vấn','Offer','Nhận việc'];
    const data = [1000,750,450,280,156,89];
    const colors = scaleBetween(NAVY, PASTEL, steps.length);
    const hovers  = colors.map(c=> rgba(c, .9));

    new Chart(ctx,{ type:'bar',
      data:{ labels:steps, datasets:[{ label:'Số lượng', data,
        backgroundColor:colors, hoverBackgroundColor:hovers, borderSkipped:false }] },
      options:{ ...base, plugins:{ ...base.plugins, legend:{display:false} } }
    });
  })();

  // 5) Hiệu suất tuần
  (function(){
    const ctx = ctxOf('weeklyPerformanceChart'); if(!ctx) return;
    new Chart(ctx,{ type:'bar',
      data:{ labels:['Tuần 1','Tuần 2','Tuần 3','Tuần 4'],
        datasets:[
          { label:'Hồ sơ mới', data:[45,52,38,48], backgroundColor:BLUE,  hoverBackgroundColor:rgba(BLUE,.9) },
          { label:'Phỏng vấn', data:[12,15,10,14], backgroundColor:GREEN, hoverBackgroundColor:rgba(GREEN,.9) },
          { label:'Tuyển dụng', data:[3,4,2,5],   backgroundColor:BLUE300,  hoverBackgroundColor:rgba(BLUE300,.9) }
        ]},
      options:{ ...base }
    });
  })();

  // 6) Nguồn ứng tuyển
  (function(){
    const ctx = ctxOf('applicationSourceChart'); if(!ctx) return;
    new Chart(ctx,{ type:'doughnut',
      data:{ labels:['Website','LinkedIn','Facebook','Giới thiệu','Khác'],
        datasets:[{ data:[35,28,18,12,7],
          backgroundColor:[BLUE, GREEN, BLUE300, TEAL, PASTEL],
          hoverOffset:12, borderWidth:0 }]},
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{ ...base.plugins, legend:{ position:'bottom', labels:{ ...base.plugins.legend.labels, padding:12 } } } }
    });
  })();

  // 7) Trạng thái ứng viên
  (function(){
    const ctx = ctxOf('statusDistributionChart'); if(!ctx) return;
    new Chart(ctx,{ type:'pie',
      data:{ labels:['Trúng tuyển','Từ chối','Rút đơn','Chờ'],
        datasets:[{ data:[35,40,15,10],
          backgroundColor:[GREEN, BLUE, TEAL, BLUE300], borderWidth:0 }]},
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{ ...base.plugins, legend:{ position:'bottom', labels:{ ...base.plugins.legend.labels, padding:12 } } } }
    });
  })();

  // 8) Phân bố điểm
  (function(){
    const ctx = ctxOf('ratingDistributionChart'); if(!ctx) return;
    new Chart(ctx,{ type:'bar',
      data:{ labels:['1-2★','3★','4★','5★'],
        datasets:[{ label:'Số lượng', data:[12,45,89,67],
          backgroundColor:[BLUE300, BLUE, TEAL, GREEN],
          hoverBackgroundColor:[rgba(BLUE300,.9), rgba(BLUE,.9), rgba(TEAL,.9), rgba(GREEN,.9)] }]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{display:false} }, scales:{ ...base.scales, y:{...base.scales.y, suggestedMax:100} } }
    });
  })();

  // 9) Top vị trí (ngang)
  (function(){
    const ctx = ctxOf('topPositionsChart'); if(!ctx) return;
    new Chart(ctx,{ type:'bar',
      data:{ labels:['Frontend Dev','Backend Dev','UX/UI','QA','PM'],
        datasets:[{ label:'Số vị trí', data:[45,38,25,20,15],
          backgroundColor:scaleBetween(NAVY, TEAL, 5),
          hoverBackgroundColor:scaleBetween(BLUE, GREEN, 5) }]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{display:false} }, indexAxis:'y' }
    });
  })();

  // 10) Time to hire
  (function(){
    const ctx = ctxOf('timeToHireChart'); if(!ctx) return;
    new Chart(ctx,{ type:'line',
      data:{ labels:['T1','T2','T3','T4','T5','T6'],
        datasets:[{ label:'Ngày trung bình', data:[32,28,25,30,26,24],
          borderColor:GREEN, backgroundColor:gradY(ctx, GREEN),
          pointBackgroundColor:'#fff', pointBorderColor:GREEN, fill:true, tension:.35 }]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{display:false} } }
    });
  })();

  // 11) Hiệu suất phòng ban (mini)
  (function(){
    const ctx = ctxOf('departmentPerformanceChart'); if(!ctx) return;
    new Chart(ctx,{ type:'bar',
      data:{ labels:['Kỹ thuật','Kinh doanh','MKT','HR','Khác'],
        datasets:[{ label:'Hiệu suất (%)', data:[82,75,68,90,78],
          backgroundColor:scaleBetween(NAVY, PASTEL, 5),
          hoverBackgroundColor:scaleBetween(BLUE, GREEN, 5) }]},
      options:{ ...base, plugins:{ ...base.plugins, legend:{display:false} }, scales:{ ...base.scales, y:{...base.scales.y, max:100} } }
    });
  })();

  /* ===== Dropdown giữ nguyên ===== */
  window.toggleFilter = function(id){
    const f = document.getElementById(id); if(!f) return;
    document.querySelectorAll('.filter-dropdown').forEach(x=>{ if(x!==f) x.classList.remove('show'); });
    f.classList.toggle('show');
  };

  /* ===== API cập nhật theo kỳ ===== */
  window.updateMainChart = function(period){
    const p = (period==='quarter')?packs.quarter : (period==='year')?packs.year : packs.month;
    if(window.monthlyTrendChart){
      monthlyTrendChart.data.labels = p.labels;
      monthlyTrendChart.data.datasets[0].data = p.candidates;
      monthlyTrendChart.data.datasets[1].data = p.interviews;
      monthlyTrendChart.update('active');
    }
    [['month','monthBtn'],['quarter','quarterBtn'],['year','yearBtn']].forEach(([k,id])=>{
      const el=document.getElementById(id); if(!el) return;
      if(period===k){ el.classList.remove('btn-outline'); el.classList.add('filter-badge'); }
      else{ el.classList.add('btn-outline'); el.classList.remove('filter-badge'); }
    });
  };
})();
