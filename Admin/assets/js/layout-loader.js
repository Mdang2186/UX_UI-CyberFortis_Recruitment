// assets/js/footer-loader.js
// Chỉ nạp nội dung vào #footer, không thay thẻ, không đụng global
(() => {
  const script = document.currentScript || document.querySelector('script[data-footer-version]');
  const VERSION = script?.getAttribute('data-footer-version') || '1.0.0';

  const key = (url) => `footer:${url}@${VERSION}`;

  async function fetchHtml(url) {
    const cached = sessionStorage.getItem(key(url));
    if (cached) return cached;

    const res = await fetch(url, { credentials:'same-origin', cache:'no-cache' });
    if (!res.ok) throw new Error(`Fetch ${url}: ${res.status}`);
    const html = await res.text();
    try { sessionStorage.setItem(key(url), html); } catch {}
    return html;
  }

  function fallbackHtml() {
    return `
      <div class="cf-footer" role="contentinfo">
        <div class="cf-footer__container">
          <div class="cf-footer__bottom">
            <p class="cf-footer__copy">© 2024 CyberFortis</p>
          </div>
        </div>
      </div>`;
  }

  async function init(selector = '#footer') {
    const host = document.querySelector(selector);
    if (!host) return;                           // không ảnh hưởng khi thiếu
    const url = host.getAttribute('data-src') || 'Footer.html';

    try {
      const html = await fetchHtml(url);
      host.innerHTML = html;                     // GIỮ wrapper #footer
      host.dispatchEvent(new CustomEvent('footer:loaded', { bubbles:true }));
    } catch (e) {
      console.error('Footer load error:', e);
      host.innerHTML = fallbackHtml();           // fallback nhẹ
    }
  }

  window.FooterLoader = { init };
  window.addEventListener('DOMContentLoaded', () => init());
})();
