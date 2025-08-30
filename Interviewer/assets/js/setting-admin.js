      // Settings Navigation
        function showSection(sectionId, element) {
            // Hide all sections
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav items
            document.querySelectorAll('.settings-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked nav item
            element.classList.add('active');
        }

        // Save Settings
        function saveSettings(section) {
            // Show loading state
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Đã lưu';
                
                // Show success message
                showNotification('Cài đặt đã được lưu thành công!', 'success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        }

        // Save All Settings
        function saveAllSettings() {
            showNotification('Đang lưu tất cả cài đặt...', 'info');
            
            setTimeout(() => {
                showNotification('Tất cả cài đặt đã được lưu thành công!', 'success');
            }, 1500);
        }

        // Show Notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            `;
            
            const icon = type === 'success' ? 'check-circle' : 
                        type === 'error' ? 'exclamation-circle' : 'info-circle';
            
            notification.innerHTML = `
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Auto-resize textareas
        document.querySelectorAll('.form-textarea').forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        });



        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial active section
            showSection('general', document.querySelector('.settings-nav-item'));
        });
         // FAQ Functions
        function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const isActive = element.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-question.active').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                element.classList.add('active');
                answer.classList.add('active');
            }
        }

        function filterFAQ(category) {
            // Update active category button
            document.querySelectorAll('.faq-category').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Filter FAQ items
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function searchFAQ(searchTerm) {
            const term = searchTerm.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
                
                const matches = question.includes(term) || answer.includes(term);
                item.style.display = matches ? 'block' : 'none';
            });
            
            // Reset category filter if searching
            if (term) {
                document.querySelectorAll('.faq-category').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        }

        // Utility Functions
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        function downloadGuide() {
            alert('Đang tải xuống hướng dẫn sử dụng...');
            // In real implementation, this would trigger a file download
        }
 document.addEventListener('DOMContentLoaded', () => {
  const DISABLE_HASH_NAV = true; // ← bật/tắt ở đây

  if (DISABLE_HASH_NAV) {
    // chặn tất cả link tab trong thanh cài đặt
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.settings-nav-item[href^="#"], .settings-nav a[href^="#"]');
      if (!link) return;

      e.preventDefault(); // tắt nhảy đầu trang

      // mở đúng section (tận dụng code sẵn có của bạn)
      const sectionId =
        link.dataset.target || link.getAttribute('data-section') ||
        link.getAttribute('href').slice(1);

      const y = window.scrollY;      // giữ nguyên vị trí cuộn
      showSection(sectionId, link);  // hàm bạn đã có
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0 }));
    }, { passive: false });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Tắt hành vi anchor '#…' để khỏi cuộn/nhảy
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    // Cho phép deep-link thật sự nếu bạn muốn, còn lại thì chặn
    if (href === '#' || /^#(?!$)/.test(href)) {
      e.preventDefault();
    }
  }, { passive: false });
});
document.addEventListener('DOMContentLoaded', () => {
  // ---- state để append khi Lưu ----
  const uploadState = {
    logo   : { file:null, blobUrl:null },
    favicon: { file:null, blobUrl:null } // luôn là PNG 32x32 hoặc ICO giữ nguyên
  };

  // Ngăn thả file vào window làm mở ảnh
  ['dragover','drop'].forEach(evt => {
    window.addEventListener(evt, e => e.preventDefault(), { passive:false });
  });

  // Khởi tạo hai dropzone
  initUploader({
    root: document.getElementById('logoDropzone'),
    input: document.getElementById('logoInput'),
    maxMB: 2,
    acceptTypes: ['image/png','image/jpeg','image/svg+xml'],
    onFileReady: (file, url) => { uploadState.logo = { file, blobUrl:url }; }
  });

  initUploader({
    root: document.getElementById('faviconDropzone'),
    input: document.getElementById('faviconInput'),
    maxMB: 0.5, // 512KB
    acceptTypes: ['image/png','image/x-icon'],
    // Favicon: tự co về 32x32 PNG nếu là PNG > 32
    transform: async (file) => {
      if (file.type === 'image/png') {
        const img = await readImage(file);
        const size = Math.max(img.naturalWidth, img.naturalHeight);
        if (size !== 32) {
          const resized = await resizePng(img, 32, 32);
          return new File([resized], 'favicon.png', { type:'image/png' });
        }
      }
      return file; // giữ nguyên ICO hoặc PNG 32x32
    },
    onFileReady: (file, url) => { uploadState.favicon = { file, blobUrl:url }; }
  });

  // Hook nút Lưu (nếu bạn dùng AJAX)
  const btnSave = document.querySelector('#btnSave');
  const form = document.querySelector('#settingsForm'); // đổi đúng id form của bạn

  btnSave?.addEventListener('click', async () => {
    if (!form) return;
    const y = window.scrollY;

    const fd = new FormData(form);
    if (uploadState.logo.file)    fd.set('companyLogo', uploadState.logo.file);
    if (uploadState.favicon.file) fd.set('favicon',     uploadState.favicon.file);

    try {
      const res = await fetch('/api/settings', { method:'POST', body: fd });
      // TODO: toast thông báo theo response
    } finally {
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0 }));
    }
  });

  // ============ Helpers ============

  function initUploader({ root, input, maxMB, acceptTypes, transform, onFileReady }){
    if (!root || !input) return;

    const area = root.querySelector('.cf-upl__area');
    const preview = root.querySelector('.cf-upl__preview');
    const img = preview.querySelector('img');
    const btns = preview.querySelector('.cf-upl__actions');

    // chọn file bằng click
    area.addEventListener('click', () => input.click());
    btns.querySelector('[data-action="change"]').addEventListener('click', () => input.click());
    btns.querySelector('[data-action="remove"]').addEventListener('click', () => clearFile());

    // drag & drop
    ;['dragenter','dragover'].forEach(evt=>{
      root.addEventListener(evt, e=>{ e.preventDefault(); e.stopPropagation(); root.classList.add('is-drag'); }, { passive:false });
    });
    ;['dragleave','drop'].forEach(evt=>{
      root.addEventListener(evt, e=>{ e.preventDefault(); e.stopPropagation(); root.classList.remove('is-drag'); }, { passive:false });
    });
    root.addEventListener('drop', e=>{
      const file = (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) || null;
      if (file) handleFile(file);
    });

    // chọn bằng input
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (file) handleFile(file);
    });

    async function handleFile(file){
      // validate type
      if (acceptTypes && !acceptTypes.includes(file.type)) {
        alert(`Định dạng không hợp lệ: ${file.type}`);
        return;
      }
      // validate size
      if (maxMB && file.size > maxMB * 1024 * 1024) {
        alert(`Kích thước vượt quá ${maxMB}MB`);
        return;
      }
      // transform (ví dụ resize favicon)
      if (typeof transform === 'function') {
        file = await transform(file);
      }
      // preview
      const url = URL.createObjectURL(file);
      img.src = url;
      area.hidden = true;
      preview.hidden = false;
      // callback
      onFileReady?.(file, url);
    }

    function clearFile(){
      area.hidden = false;
      preview.hidden = true;
      img.src = '';
      input.value = '';
      onFileReady?.(null, null);
    }
  }

  function readImage(file){
    return new Promise((resolve, reject)=>{
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  function resizePng(img, w, h){
    return new Promise((resolve)=>{
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      // fill transparent background
      ctx.clearRect(0,0,w,h);
      // giữ tỉ lệ, fit vào khung
      const ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = Math.round(img.naturalWidth * ratio);
      const dh = Math.round(img.naturalHeight * ratio);
      const dx = Math.round((w - dw)/2);
      const dy = Math.round((h - dh)/2);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, dw, dh);
      canvas.toBlob(b=> resolve(b), 'image/png', 1);
    });
  }
});
