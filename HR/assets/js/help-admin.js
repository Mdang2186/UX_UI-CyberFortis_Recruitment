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
 