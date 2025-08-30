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

        // Chat Functions
        let chatOpen = false;
        let messageCount = 0;

        function toggleChat() {
            if (chatOpen) {
                closeChat();
            } else {
                openChat();
            }
        }

        function openChat() {
            document.getElementById('chatWindow').classList.add('show');
            document.getElementById('chatFloat').classList.remove('has-notification');
            chatOpen = true;
            
            // Focus on input
            setTimeout(() => {
                document.getElementById('chatInput').focus();
            }, 300);
        }

        function closeChat() {
            document.getElementById('chatWindow').classList.remove('show');
            chatOpen = false;
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate bot response
            setTimeout(() => {
                hideTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1500 + Math.random() * 1000);
        }

        function sendQuickMessage(message) {
            // Remove quick actions
            const actions = document.querySelector('.chat-actions');
            if (actions) {
                actions.style.display = 'none';
            }
            
            // Send message
            addMessage(message, 'user');
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate bot response
            setTimeout(() => {
                hideTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }

        function addMessage(content, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const time = new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const avatar = sender === 'user' ? 'You' : 'CB';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div>
                    <div class="message-content">${content}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            messageCount++;
        }

        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot';
            typingDiv.id = 'typingIndicator';
            
            typingDiv.innerHTML = `
                <div class="message-avatar">CB</div>
                <div>
                    <div class="typing-indicator">
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.remove();
            }
        }

        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Predefined responses
            if (lowerMessage.includes('thêm ứng viên') || lowerMessage.includes('ứng viên mới')) {
                return `Để thêm ứng viên mới, bạn có thể:
                
1. Vào trang "Ứng viên" từ menu bên trái
2. Click nút "Thêm ứng viên mới" 
3. Điền đầy đủ thông tin cá nhân
4. Upload CV (định dạng PDF, DOC, DOCX)
5. Chọn vị trí ứng tuyển
6. Click "Lưu thông tin"

Bạn cũng có thể import hàng loạt từ file Excel. Cần hỗ trợ thêm không?`;
            }
            
            if (lowerMessage.includes('xếp lịch') || lowerMessage.includes('phỏng vấn')) {
                return `Để xếp lịch phỏng vấn:

1. Vào trang "Trạng thái chờ" hoặc "Phỏng vấn"
2. Tìm ứng viên cần xếp lịch
3. Click icon lịch (📅) trong cột "Thao tác"
4. Chọn ngày, giờ và người phỏng vấn
5. Nhập địa điểm hoặc link meeting
6. Click "Xác nhận xếp lịch"

Hệ thống sẽ tự động gửi email thông báo. Bạn có câu hỏi gì khác không?`;
            }
            
            if (lowerMessage.includes('báo cáo') || lowerMessage.includes('xuất')) {
                return `Để xuất báo cáo thống kê:

1. Vào trang "Thống kê & Báo cáo"
2. Chọn loại báo cáo cần xuất
3. Thiết lập khoảng thời gian
4. Chọn các bộ lọc (vị trí, trạng thái...)
5. Click "Xuất báo cáo"
6. Chọn định dạng (Excel/PDF)

Báo cáo sẽ được tải xuống hoặc gửi email. Cần hướng dẫn chi tiết hơn không?`;
            }
            
            if (lowerMessage.includes('liên hệ') || lowerMessage.includes('nhân viên')) {
                return `Tôi sẽ kết nối bạn với nhân viên hỗ trợ ngay bây giờ. Vui lòng chờ trong giây lát...

Trong lúc chờ, bạn cũng có thể:
• Email: support@cyberfortis.com
• Hotline: 1900-xxxx (24/7)

Nhân viên hỗ trợ sẽ phản hồi trong vòng 2-3 phút. Bạn có thể mô tả vấn đề cần hỗ trợ để chúng tôi chuẩn bị tốt hơn.`;
            }
            
            if (lowerMessage.includes('mật khẩu') || lowerMessage.includes('đổi')) {
                return `Để đổi mật khẩu:

1. Vào menu "Hồ sơ Admin"
2. Click tab "Bảo mật"
3. Nhập mật khẩu hiện tại
4. Nhập mật khẩu mới (ít nhất 8 ký tự, có chữ hoa, thường và số)
5. Click "Cập nhật mật khẩu"

Nếu quên mật khẩu hiện tại, bạn có thể dùng tính năng "Quên mật khẩu" ở trang đăng nhập. Cần hỗ trợ thêm không?`;
            }
            
            // Default responses
            const defaultResponses = [
                `Cảm ơn bạn đã liên hệ! Tôi hiểu bạn đang cần hỗ trợ về "${message}". 

Để tôi có thể hỗ trợ tốt hơn, bạn có thể:
• Mô tả chi tiết vấn đề gặp phải
• Cho biết bước nào bạn đang thực hiện
• Hoặc chọn "Liên hệ nhân viên" để được hỗ trợ trực tiếp

Tôi luôn sẵn sàng giúp đỡ!`,
                
                `Tôi đã ghi nhận câu hỏi của bạn về "${message}". 

Một số tài nguyên hữu ích:
• Xem FAQ ở trên trang này
• Tải hướng dẫn sử dụng chi tiết
• Liên hệ hotline 1900-xxxx

Bạn có muốn tôi kết nối với nhân viên hỗ trợ không?`
            ];
            
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        function handleChatKeyPress(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }

        // Auto-resize textarea
        document.getElementById('chatInput').addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });

        // Simulate new message notification
        function simulateNotification() {
            if (!chatOpen) {
                document.getElementById('chatFloat').classList.add('has-notification');
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Simulate a notification after 10 seconds
            setTimeout(simulateNotification, 10000);
        });