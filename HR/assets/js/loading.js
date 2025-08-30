/* CyberFortis Mini Loader – icon nhỏ giữa trang, tắt ngay khi trang load xong */
(function(){
  const api = {};
  const CLS_SHOW = 'show';

  function ensure(){
    let el = document.getElementById('cfMini');
    if(!el){
      el = document.createElement('div');
      el.id = 'cfMini';
      el.className = 'cf-mini';
      el.innerHTML = '<div class="cf-spinner"></div>';
      document.body.appendChild(el);
    }
    return el;
  }

  function show(){
    const el = ensure();
    // hiển thị ngay (không overlay, không nền)
    requestAnimationFrame(()=> el.classList.add(CLS_SHOW));
  }

  function hide(){
    const el = document.getElementById('cfMini');
    if(!el) return;
    el.classList.remove(CLS_SHOW);
    // “tắt ngay” → remove sớm; vẫn để 1 frame cho CSS update
    requestAnimationFrame(()=> el.remove());
  }

  // Auto: hiện khi DOM đang tải; ẩn khi window load xong
  function auto(){
    // Nếu trang đã complete thì không cần show
    if (document.readyState === 'complete') return;
    show();
    window.addEventListener('load', hide, { once:true });
    // nếu back/forward từ bfcache
    window.addEventListener('pageshow', e => { if(e.persisted) hide(); }, { once:true });
  }

  api.start = show;
  api.stop  = hide;
  api.auto  = auto;
  window.CFmini = api;

  // Tự chạy nếu script “defer” trong <head> (khuyến nghị)
  if (!document.currentScript || document.currentScript.dataset.auto !== 'false') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', auto, { once:true });
    } else {
      auto();
    }
  }
})();
