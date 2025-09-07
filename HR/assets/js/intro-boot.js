(function () {
  // Cấu hình qua data-* khi nhúng (có mặc định)
  var s = document.currentScript || {};
  var INTRO = (s.dataset && s.dataset.intro) || 'IntroOnePageEmployee.html';
  var HOME  = (s.dataset && s.dataset.home)  || 'DashboardHR.html';
  var KEY   = 'intro:seen';          // sessionStorage key
  var QS_R  = 'return';              // param "return" (không bắt buộc dùng)
  var QS_F  = 'fromIntro';           // đánh dấu đã đi từ Intro
  var QS_B  = (s.dataset && s.dataset.bypass) || 'noIntro'; // ?noIntro=1 để bỏ qua

  function abs(u,b){ try{ return new URL(u, b||location.href).href; }catch(e){ return u; } }
  function same(a,b){
    var A=new URL(a,location.href), B=new URL(b,location.href);
    A.hash=B.hash=''; A.search=B.search=''; return A.href===B.href;
  }

  var here     = location.href;
  var introURL = abs(INTRO);
  var isIntro  = same(here, introURL);
  var p        = new URLSearchParams(location.search);
  var seen     = sessionStorage.getItem(KEY)==='1';
  var fromIntro= p.get(QS_F)==='1';
  var bypass   = p.get(QS_B)==='1';

  // Nếu KHÔNG ở Intro + chưa xem Intro + không bypass ⇒ ép vào Intro
  if(!isIntro && !seen && !fromIntro && !bypass){
    var u = new URL(introURL);
    u.searchParams.set(QS_R, here);      // lưu URL gốc (không bắt buộc)
    u.searchParams.set('_ts', Date.now());
    location.replace(u.href);
    return;
  }

  // API: chỉ chuyển khi người dùng bấm nút trên Intro
  window.IntroBoot = {
    /**
     * Gọi khi bấm nút ở Intro để đi tiếp.
     * next: URL đích. Nếu bỏ trống → dùng HOME.
     */
    done: function(next){
      try{
        sessionStorage.setItem(KEY,'1');                     // đánh dấu đã xem (tab hiện tại)
        var dest = abs(next || HOME);
        var d = new URL(dest, location.href);
        d.searchParams.set(QS_F,'1');                        // báo đã qua Intro để guard không chặn nữa
        location.replace(d.href);
      }catch(e){}
    },
    // Công cụ debug
    reset: function(){ sessionStorage.removeItem(KEY); },
    seen:  function(){ return sessionStorage.getItem(KEY)==='1'; }
  };

  // KHÔNG auto rời Intro: chỉ bind các nút có data-intro-next
  if(isIntro){
    document.addEventListener('click', function(e){
      var btn = e.target.closest('[data-intro-next]');
      if(btn){
        e.preventDefault();
        window.IntroBoot.done(btn.getAttribute('data-intro-next') || '');
      }
    });
  }
})();