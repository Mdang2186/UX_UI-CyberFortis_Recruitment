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
  const term = (searchTerm || '').toLowerCase().trim();
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const qSpan = item.querySelector('.faq-question span');
    const aDiv  = item.querySelector('.faq-answer-content');

    // Lấy text gốc (cache ở DOMContentLoaded)
    const qOrig = qSpan?.dataset.orig || qSpan?.textContent || '';
    const aOrig = aDiv?.dataset.orig  || aDiv?.textContent  || '';

    const matches = qOrig.toLowerCase().includes(term) || aOrig.toLowerCase().includes(term);
    item.style.display = matches ? 'block' : 'none';

    // Reset về nội dung gốc
    if (qSpan && qSpan.dataset.orig) qSpan.innerHTML = qSpan.dataset.orig;
    if (aDiv  && aDiv.dataset.orig)  aDiv.innerHTML  = aDiv.dataset.orig;

    // Highlight phần trùng khớp (chỉ khi có term)
    if (term && matches) {
      const rx = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      if (qSpan) qSpan.innerHTML = qSpan.innerHTML.replace(rx, '<mark class="faq-hl">$1</mark>');
      // Nếu muốn bôi cả phần trả lời, mở comment dòng dưới:
      // if (aDiv) aDiv.innerHTML = aDiv.innerHTML.replace(rx, '<mark class="faq-hl">$1</mark>');
    }
  });

  // Đang tìm thì bỏ active ở category
  if (term) {
    document.querySelectorAll('.faq-category').forEach(btn => btn.classList.remove('active'));
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
 // ===== Search input: bật màu xanh khi có chữ + cache text gốc để highlight
document.addEventListener('DOMContentLoaded', () => {
  // 1) Gắn class is-typing để CSS tô xanh chữ khi gõ
  const searchEl = document.querySelector('.header-search input');
  const updateTypingClass = () => {
    if (!searchEl) return;
    searchEl.classList.toggle('is-typing', !!searchEl.value.trim());
  };
  if (searchEl){
    searchEl.addEventListener('input', updateTypingClass);
    updateTypingClass();
  }

  // 2) Cache nội dung gốc (để reset/rehighlight mượt)
  document.querySelectorAll('.faq-item').forEach(item => {
    const qSpan = item.querySelector('.faq-question span');
    const aDiv  = item.querySelector('.faq-answer-content');
    if (qSpan && !qSpan.dataset.orig) qSpan.dataset.orig = qSpan.innerHTML;
    if (aDiv  && !aDiv.dataset.orig)  aDiv.dataset.orig  = aDiv.innerHTML;
  });
});
