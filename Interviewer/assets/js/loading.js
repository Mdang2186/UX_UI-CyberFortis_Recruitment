/* CyberFortis Mini Loader – dots pastel xanh dương/xanh lục */
(function(){
  const api = {};
  const CLS_SHOW = 'show';

  function ensure(){
    let el = document.getElementById('cfMini');
    if(!el){
      el = document.createElement('div');
      el.id = 'cfMini';
    }
    el.className = 'cf-mini';
    // Markup dots (5 chấm)
    el.innerHTML = `
      <section class="dots-container" aria-label="Đang tải">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div>
      </section>`;
    if(!el.parentNode) document.body.appendChild(el);
    return el;
  }

  function show(){
    const el = ensure();
    requestAnimationFrame(()=> el.classList.add(CLS_SHOW));
  }

  function hide(){
    const el = document.getElementById('cfMini');
    if(!el) return;
    el.classList.remove(CLS_SHOW);
    requestAnimationFrame(()=> el.remove());
  }

  function auto(){
    if (document.readyState === 'complete') return;
    show();
    window.addEventListener('load', hide, { once:true });
    window.addEventListener('pageshow', e => { if(e.persisted) hide(); }, { once:true });
  }

  api.start = show;
  api.stop  = hide;
  api.auto  = auto;
  window.CFmini = api;

  // Tự chạy nếu không tắt bằng data-auto="false"
  if (!document.currentScript || document.currentScript.dataset.auto !== 'false') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', auto, { once:true });
    } else {
      auto();
    }
  }
})();
