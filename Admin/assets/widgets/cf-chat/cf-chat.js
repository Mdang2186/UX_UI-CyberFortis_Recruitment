 
(function(){
  const ns = 'CFChat';
  if (window[ns]) return; // tránh double-init

  function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
  const fmtTime = () => new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'});

  const defaultOpts = {
    position: 'bottom-right',
    accent: '#107eb9',
    accent2:'#10b981',
    welcome: `Xin chào! Mình là CyberBot. Mình có thể giúp:\n• Trả lời câu hỏi về hệ thống\n• Hướng dẫn sử dụng\n• Kết nối nhân viên hỗ trợ\nBạn cần gì hôm nay?`,
    quickActions: ['Hướng dẫn thêm ứng viên','Cách xếp lịch phỏng vấn','Xuất báo cáo','Liên hệ nhân viên']
  };

  function mount(userOpts={}){
    const opts = Object.assign({}, defaultOpts, userOpts);
    // theme vars
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--cf-chat-accent', opts.accent);
    rootStyle.setProperty('--cf-chat-accent-2', opts.accent2);

    // Launcher
    const launcher = el('button','cf-chat__launcher', '<i class="fas fa-comments"></i>');
    launcher.setAttribute('aria-label','Mở chat'); launcher.type='button';

    // Chat
    const chat = el('div','cf-chat');
    const header = el('div','cf-chat__header');
    header.innerHTML = `
      <div class="cf-chat__brand">
        <div class="cf-chat__avatar"><i class="fas fa-robot"></i></div>
        <div>
          <div style="font-weight:600">CyberBot</div>
          <div class="cf-chat__status"><span class="cf-chat__dot"></span>Đang hoạt động</div>
        </div>
      </div>
      <button class="cf-chat__close" aria-label="Đóng"><i class="fas fa-times"></i></button>
    `;

    const messages = el('div','cf-chat__messages');
    const input = el('div','cf-chat__input');
    input.innerHTML = `
      <div class="cf-chat__row">
        <textarea class="cf-chat__textarea" placeholder="Nhập tin nhắn..." rows="1"></textarea>
        <button class="cf-chat__send" aria-label="Gửi"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;

    chat.append(header, messages, input);
    document.body.append(launcher, chat);

    const $ta = input.querySelector('.cf-chat__textarea');
    const $send = input.querySelector('.cf-chat__send');
    const $close = header.querySelector('.cf-chat__close');

    function open(){ chat.classList.add('is-open'); launcher.dataset.hasNoti='0'; setTimeout(()=> $ta.focus(), 150); }
    function close(){ chat.classList.remove('is-open'); }
    function toggle(){ chat.classList.contains('is-open')? close(): open(); }

    launcher.addEventListener('click', toggle);
    $close.addEventListener('click', close);

    function addMsg(text, who='bot'){
      const wrap = el('div', `cf-chat__msg ${who==='user'?'cf-chat__msg--user':''}`);
      const avatar = el('div','cf-chat__msgAvatar', who==='user'?'You':'CB');
      const bubble = el('div','cf-chat__bubble', text.replace(/\n/g,'<br>'));
      const time = el('div','cf-chat__time', fmtTime());
      const col = el('div',''); col.append(bubble,time);
      wrap.append(avatar,col); messages.append(wrap);
      messages.scrollTop = messages.scrollHeight;
    }

    function typing(show){
      const id='cf-typing';
      if(show){
        if (messages.querySelector(`#${id}`)) return;
        const wrap = el('div','cf-chat__msg',`<div class="cf-chat__msgAvatar">CB</div>
        <div class="cf-chat__typing" id="${id}">
          <div class="cf-chat__dots">
            <div class="cf-chat__dotLoading"></div>
            <div class="cf-chat__dotLoading"></div>
            <div class="cf-chat__dotLoading"></div>
          </div>
        </div>`);
        messages.append(wrap); messages.scrollTop = messages.scrollHeight;
      } else {
        const t = messages.querySelector(`#${id}`); if (t) t.parentElement.remove();
      }
    }

    // welcome
    addMsg(opts.welcome, 'bot');
    // quick actions
    if (opts.quickActions?.length){
      const actions = el('div','cf-chat__actions');
      opts.quickActions.forEach(q=>{
        const b = el('button','cf-chat__action', q);
        b.type='button';
        b.addEventListener('click', ()=>{ addMsg(q,'user'); respond(q); });
        actions.append(b);
      });
      messages.append(actions);
    }

    function respond(message){
      typing(true);
      // mô phỏng route logic – bạn có thể thay bằng API thật
      const msg = message.toLowerCase();
      let answer;
      if (msg.includes('ứng viên')) {
        answer = `Để thêm ứng viên mới:\n1. Vào trang "Ứng viên"\n2. Nhấn "Thêm ứng viên mới"\n3. Điền thông tin + upload CV\n4. Chọn vị trí\n5. Lưu`;
      } else if (msg.includes('phỏng vấn')||msg.includes('xếp lịch')) {
        answer = `Xếp lịch phỏng vấn:\n1. Mở "Phỏng vấn"\n2. Chọn ứng viên\n3. Chọn ngày/giờ/người PV\n4. Lưu – hệ thống sẽ gửi email tự động.`;
      } else if (msg.includes('báo cáo')||msg.includes('xuất')) {
        answer = `Xuất báo cáo: vào "Thống kê & Báo cáo" → chọn loại, thời gian, bộ lọc → "Xuất" (Excel/PDF).`;
      } else if (msg.includes('liên hệ')||msg.includes('nhân viên')) {
        answer = `Mình sẽ ping nhân viên hỗ trợ. Trong lúc chờ, bạn có thể email support@cyberfortis.com hoặc gọi 1900-xxxx.`;
      } else {
        answer = `Mình đã ghi nhận: "${message}". Bạn mô tả thêm bối cảnh/bước đang làm để mình hỗ trợ chi tiết hơn nhé.`;
      }
      setTimeout(()=>{ typing(false); addMsg(answer,'bot'); }, 900 + Math.random()*700);
    }

    function send(){
      const text = $ta.value.trim();
      if(!text) return;
      addMsg(text,'user');
      $ta.value=''; autoResize();
      respond(text);
    }

    function autoResize(){
      $ta.style.height='auto';
      $ta.style.height = Math.min($ta.scrollHeight, 100) + 'px';
    }

    $send.addEventListener('click', send);
    $ta.addEventListener('keydown', e=>{
      if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }
    });
    $ta.addEventListener('input', autoResize);

    // public API
    window[ns] = { open, close, toggle, mount, addMsg, respond };

    // thông báo “có tin mới” giả lập khi chưa mở
    setTimeout(()=>{ if(!chat.classList.contains('is-open')) launcher.dataset.hasNoti='1'; }, 10000);

    // data-attributes auto-theme
    const script = document.currentScript || document.querySelector('script[data-cf-chat]');
    if (script){
      const accent = script.getAttribute('data-accent');
      const accent2= script.getAttribute('data-accent2');
      if (accent) document.documentElement.style.setProperty('--cf-chat-accent', accent);
      if (accent2) document.documentElement.style.setProperty('--cf-chat-accent-2', accent2);
    }
  }

  // auto-mount
  window.addEventListener('DOMContentLoaded', ()=> mount());

  // expose namespace early
  window[ns] = { mount };
})(); 