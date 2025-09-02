
/* =====================================================
   ChatAdmin • Optimized JS (no global side-effects)
   - Locks info panel open & auto reserve width
   - Clean search, attach menu, typing indicator
   - Minimal demo data & update functions
   ===================================================== */

(function(){
  'use strict';

  /* ------------ Utils ------------ */
  const $  = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  /* ------------ Sample data (can be replaced with live) ------------ */
  const CHAT_DATA = {
    'mai':   { name:'Mai Nguyễn', avatar:'M',  color:'#FF6B9D', status:'Đang hoạt động' },
    'linh':  { name:'Linh Võ',    avatar:'L',  color:'#F39C12', status:'Ngoại tuyến' },
    'duc':   { name:'Đức Trần',   avatar:'D',  color:'#4A90E2', status:'15 phút trước' }
  };
  let CURRENT_CHAT = 'mai';

  /* ------------ Chat select & render ------------ */
  function selectChat(chatId){
    CURRENT_CHAT = chatId;
    $$('.chat-item').forEach(i => i.classList.remove('active'));
    const item = $(`.chat-item[data-id="${chatId}"]`);
    if (item) item.classList.add('active');
    updateChatContent(chatId);
  }
  window.selectChat = selectChat; // keep API used by HTML onclick

  function updateChatContent(chatId){
    const c = CHAT_DATA[chatId]; if (!c) return;

    // Center header
    const nameEl = $('#chatName'); if (nameEl) nameEl.textContent = c.name;
    const statusEl = $('#chatStatus'); if (statusEl) statusEl.textContent = c.status;
    const avatar = svgAvatar(c.avatar, 40, c.color);
    const avImg = $('#chatAvatar'); if (avImg) avImg.src = avatar;

    // Right panel
    updateChatInfoPanel(c);

    // Typing indicator
    showTypingIndicator(); setTimeout(hideTypingIndicator, 900);
  }

  function updateChatInfoPanel(c){
    const pName = $('#panelChatName');   if (pName) pName.textContent = c.name;
    const pStat = $('#panelChatStatus'); if (pStat) pStat.textContent = c.status;
    const pAv   = $('#panelChatAvatar'); if (pAv)  pAv.src = svgAvatar(c.avatar, 80, c.color);
  }

  function svgAvatar(letter, size, color){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
      <circle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='${color}'/>
      <text x='50%' y='56%' text-anchor='middle' font-size='${Math.floor(size*0.45)}' fill='#fff' font-weight='700'>${letter}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  /* ------------ Search (left + in-chat) ------------ */
  function searchChats(q){
    const k = (q||'').toLowerCase();
    $$('.chat-item').forEach(item => {
      const name = (item.getAttribute('data-name')||'').toLowerCase();
      const last = (item.getAttribute('data-message')||'').toLowerCase();
      item.style.display = (!k || name.includes(k) || last.includes(k)) ? '' : 'none';
    });
  }
  window.searchChats = searchChats;

  function showChatSearch(){ $('#chatSearchBar')?.classList.remove('hidden'); $('#chatSearchInput')?.focus(); }
  function closeChatSearch(){ $('#chatSearchBar')?.classList.add('hidden'); const i=$('#chatSearchInput'); if(i) i.value=''; clearChatSearchHighlights(); }
  function searchInChat(q){
    clearChatSearchHighlights();
    const k = (q||'').trim();
    if(!k) return;
    $$('#messagesContainer .message-bubble p').forEach(p => {
      const text = p.textContent;
      p.innerHTML = text.replace(new RegExp(`(${k})`, 'gi'), '<span class="chat-search-highlight">$1</span>');
    });
  }
  function clearChatSearchHighlights(){
    $$('.chat-search-highlight').forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
  }
  window.showChatSearch = showChatSearch;
  window.closeChatSearch = closeChatSearch;
  window.searchInChat = searchInChat;

  /* ------------ Attach menu ------------ */
  function showAttachmentMenu(){ $('#attachmentMenu')?.classList.toggle('hidden'); }
  function selectFile(){ $('#attachmentMenu')?.classList.add('hidden'); alert('Chọn tài liệu'); }
  function selectImage(){ $('#attachmentMenu')?.classList.add('hidden'); alert('Chọn hình ảnh'); }
  window.showAttachmentMenu = showAttachmentMenu;
  window.selectFile = selectFile;
  window.selectImage = selectImage;

  /* ------------ Typing indicator ------------ */
  function showTypingIndicator(){ $('#typingIndicator')?.classList.add('show'); }
  function hideTypingIndicator(){ $('#typingIndicator')?.classList.remove('show'); }

  /* ------------ Info panel: lock open & reserve space ------------ */
  function reserveForInfoPanel(){
    const main = $('#mainChatArea');
    const panel = $('#chatInfoPanel');
    if (!main || !panel) return;
    // Reset previous styles to avoid accumulation
    main.style.marginRight = '';
    main.style.paddingRight = '';
    // Set padding-right = actual width of panel
    const w = Math.ceil(panel.getBoundingClientRect().width || 320);
    main.style.paddingRight = (w + parseInt(getComputedStyle(main).getPropertyValue('--chat-panel-gap')||'0')) + 'px';
  }

  function openChatInfo(){
    const panel = $('#chatInfoPanel'); if (!panel) return;
    panel.classList.add('open'); panel.classList.remove('hidden');
    panel.style.display = 'flex';
    reserveForInfoPanel();
  }
  function toggleChatInfoPanel(){ openChatInfo(); } // keep API but always open
  window.toggleChatInfoPanel = toggleChatInfoPanel;

  function lockChatInfo(){
    openChatInfo();

    // Disable any close/toggle buttons (keep accessible states)
    const selectors = [
      '#btnCloseChatInfo','#btnToggleChatInfo','.js-close-chat-info','.js-toggle-chat-info',
      '[data-action="close-chat-info"]','[data-action="toggle-chat-info"]',
      '[aria-label="Đóng thông tin đoạn chat"]','[aria-label="Thông tin đoạn chat"]'
    ];
    document.addEventListener('click', (e) => {
      const tgt = e.target.closest(selectors.join(','));
      if (tgt){ e.preventDefault(); e.stopPropagation(); openChatInfo(); }
    }, true);
    document.querySelectorAll(selectors.join(',')).forEach(btn => {
      btn.classList.add('chatinfo-locked'); btn.setAttribute('aria-disabled','true'); btn.setAttribute('tabindex','-1');
    });

    // If any script changes class/style of panel, bring it back
    const panel = $('#chatInfoPanel');
    if (panel){
      new MutationObserver(openChatInfo).observe(panel, { attributes:true, attributeFilter:['class','style'] });
    }

    // Recalculate on resize
    let raf;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(reserveForInfoPanel);
    });
  }

  /* ------------ Init ------------ */
  document.addEventListener('DOMContentLoaded', () => {
    lockChatInfo();
    selectChat(CURRENT_CHAT);
  });

})();
