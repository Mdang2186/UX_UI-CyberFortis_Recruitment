let currentChat = 'mai';
        let originalMessages = [];
        
        function selectChat(chatId) {
            currentChat = chatId;
            // Remove active state from all chat items
            document.querySelectorAll('.chat-item').forEach(item => {
                item.classList.remove('border-l-4', 'border-blue-500', 'bg-blue-50');
            });
            
            // Add active state to selected chat
            event.currentTarget.classList.add('border-l-4', 'border-blue-500', 'bg-blue-50');
            
            // Update chat header and messages based on selected chat
            updateChatContent(chatId);
        }
        
        function updateChatContent(chatId) {
            const chatData = {
                'mai': {
                    name: 'Mai Nguyễn',
                    avatar: 'M',
                    color: '#FF6B9D',
                    status: 'Đang hoạt động'
                },
                'duc': {
                    name: 'Đức Trần',
                    avatar: 'D',
                    color: '#4A90E2',
                    status: 'Hoạt động 5 phút trước'
                },
                'linh': {
                    name: 'Linh Võ',
                    avatar: 'L',
                    color: '#F39C12',
                    status: 'Hoạt động 1 giờ trước'
                },
                'group': {
                    name: 'Nhóm Bạn Thân',
                    avatar: 'Nhóm',
                    color: '#9B59B6',
                    status: '5 thành viên'
                },
                'an': {
                    name: 'An Lê',
                    avatar: 'A',
                    color: '#27AE60',
                    status: 'Hoạt động 5 giờ trước'
                },
                'hoa': {
                    name: 'Hoa Phạm',
                    avatar: 'H',
                    color: '#E74C3C',
                    status: 'Đang hoạt động'
                },
                'work': {
                    name: 'Nhóm Công Việc',
                    avatar: 'Work',
                    color: '#34495E',
                    status: '8 thành viên'
                },
                'nam': {
                    name: 'Nam Vũ',
                    avatar: 'N',
                    color: '#FF9500',
                    status: 'Hoạt động 1 tuần trước'
                },
                'family': {
                    name: 'Gia Đình',
                    avatar: 'GĐ',
                    color: '#E91E63',
                    status: '4 thành viên'
                },
                'study': {
                    name: 'Nhóm Học Tập',
                    avatar: 'HT',
                    color: '#673AB7',
                    status: '12 thành viên'
                },
                'gaming': {
                    name: 'Gaming Squad',
                    avatar: 'GS',
                    color: '#FF5722',
                    status: '6 thành viên'
                },
                'travel': {
                    name: 'Du Lịch Cùng Nhau',
                    avatar: 'DL',
                    color: '#00BCD4',
                    status: '8 thành viên'
                },
                'food': {
                    name: 'Hội Ăn Uống',
                    avatar: 'AU',
                    color: '#FF9800',
                    status: '15 thành viên'
                },
                'sport': {
                    name: 'CLB Thể Thao',
                    avatar: 'TT',
                    color: '#4CAF50',
                    status: '20 thành viên'
                }
            };
            
            const chat = chatData[chatId];
            if (chat) {
                // Update header
                document.getElementById('chatName').textContent = chat.name;
                document.getElementById('chatStatus').textContent = chat.status;
                
                // Update avatar
                const avatarSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='${encodeURIComponent(chat.color)}'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3E${chat.avatar}%3C/text%3E%3C/svg%3E`;
                document.getElementById('chatAvatar').src = avatarSvg;
                
                // Update panel info if open
                updateChatInfoPanel(chat);
                
                // Clear messages and show typing indicator briefly
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                }, 1500);
            }
        }
        
        function updateChatInfoPanel(chat) {
            document.getElementById('panelChatName').textContent = chat.name;
            document.getElementById('panelChatStatus').textContent = chat.status;
            
            const panelAvatarSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='${encodeURIComponent(chat.color)}'/%3E%3Ctext x='40' y='50' text-anchor='middle' fill='white' font-size='32' font-weight='bold'%3E${chat.avatar}%3C/text%3E%3C/svg%3E`;
            document.getElementById('panelChatAvatar').src = panelAvatarSvg;
        }
        
        function toggleChatInfoPanel() {
            const panel = document.getElementById('chatInfoPanel');
            const mainArea = document.getElementById('mainChatArea');
            
            if (panel.classList.contains('hidden')) {
                panel.classList.remove('hidden');
                panel.classList.add('flex');
                mainArea.style.marginRight = '320px';
                
                // Update panel with current chat info
                const chatData = {
                    'mai': { name: 'Mai Nguyễn', avatar: 'M', color: '#FF6B9D', status: 'Đang hoạt động' },
                    'duc': { name: 'Đức Trần', avatar: 'D', color: '#4A90E2', status: 'Hoạt động 5 phút trước' },
                    'linh': { name: 'Linh Võ', avatar: 'L', color: '#F39C12', status: 'Hoạt động 1 giờ trước' },
                    'group': { name: 'Nhóm Bạn Thân', avatar: 'Nhóm', color: '#9B59B6', status: '5 thành viên' },
                    'an': { name: 'An Lê', avatar: 'A', color: '#27AE60', status: 'Hoạt động 5 giờ trước' },
                    'hoa': { name: 'Hoa Phạm', avatar: 'H', color: '#E74C3C', status: 'Đang hoạt động' },
                    'work': { name: 'Nhóm Công Việc', avatar: 'Work', color: '#34495E', status: '8 thành viên' },
                    'nam': { name: 'Nam Vũ', avatar: 'N', color: '#FF9500', status: 'Hoạt động 1 tuần trước' },
                    'family': { name: 'Gia Đình', avatar: 'GĐ', color: '#E91E63', status: '4 thành viên' },
                    'study': { name: 'Nhóm Học Tập', avatar: 'HT', color: '#673AB7', status: '12 thành viên' },
                    'gaming': { name: 'Gaming Squad', avatar: 'GS', color: '#FF5722', status: '6 thành viên' },
                    'travel': { name: 'Du Lịch Cùng Nhau', avatar: 'DL', color: '#00BCD4', status: '8 thành viên' },
                    'food': { name: 'Hội Ăn Uống', avatar: 'AU', color: '#FF9800', status: '15 thành viên' },
                    'sport': { name: 'CLB Thể Thao', avatar: 'TT', color: '#4CAF50', status: '20 thành viên' }
                };
                
                const chat = chatData[currentChat];
                if (chat) {
                    updateChatInfoPanel(chat);
                }
            } else {
                panel.classList.add('hidden');
                panel.classList.remove('flex');
                mainArea.style.marginRight = '0';
            }
        }
        
        // Search functions
        function searchChats(query) {
            const chatItems = document.querySelectorAll('.chat-item');
            chatItems.forEach(item => {
                const name = item.getAttribute('data-name').toLowerCase();
                const message = item.getAttribute('data-message').toLowerCase();
                const searchTerm = query.toLowerCase();
                
                if (name.includes(searchTerm) || message.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = query ? 'none' : 'block';
                }
            });
        }
        
        function showChatSearch() {
            document.getElementById('chatSearchBar').classList.remove('hidden');
            document.getElementById('chatSearchInput').focus();
            closeChatInfo();
        }
        
        function closeChatSearch() {
            document.getElementById('chatSearchBar').classList.add('hidden');
            document.getElementById('chatSearchInput').value = '';
            clearChatSearchHighlights();
        }
        
        function searchInChat(query) {
            const messages = document.querySelectorAll('#messagesContainer .message-bubble p');
            clearChatSearchHighlights();
            
            if (query.trim()) {
                messages.forEach(message => {
                    const text = message.textContent;
                    const regex = new RegExp(`(${query})`, 'gi');
                    const highlightedText = text.replace(regex, '<span class="chat-search-highlight">$1</span>');
                    message.innerHTML = highlightedText;
                });
            }
        }
        
        function clearChatSearchHighlights() {
            const highlights = document.querySelectorAll('.chat-search-highlight');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
        }
        
        // Modal functions
        function showNewChatModal() {
            document.getElementById('newChatModal').classList.remove('hidden');
        }
        
        function closeNewChatModal() {
            document.getElementById('newChatModal').classList.add('hidden');
        }
        
        function showRoomModal() {
    closeAllModals();
    document.getElementById('roomModal').classList.remove('hidden');
}
        
        function closeRoomModal() {
            document.getElementById('roomModal').classList.add('hidden');
        }
        
        let meetingTimer;
        let meetingStartTime;
        let currentRoomCode = '';
        let isMeetingMuted = true;
        let isMeetingVideoOn = false;
        let isMeetingScreenSharing = false;
        
        function createRoom() {
    currentRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById('currentRoomCode').textContent = currentRoomCode;
    closeAllModals(); // ẩn mọi modal khác
    document.getElementById('meetingRoomModal').classList.remove('hidden');
    startMeetingTimer();
}
        
        function joinRoom() {
    const roomCode = document.getElementById('roomCodeInput').value.trim();
    if (roomCode) {
        currentRoomCode = roomCode;
        document.getElementById('currentRoomCode').textContent = roomCode;
        closeAllModals();
        document.getElementById('meetingRoomModal').classList.remove('hidden');
        startMeetingTimer();
    } else {
        alert('Vui lòng nhập mã cuộc họp!');
    }
}
        
        function startMeeting() {
            document.getElementById('meetingRoomModal').classList.remove('hidden');
            startMeetingTimer();
        }
        
        function startMeetingTimer() {
            meetingStartTime = Date.now();
            meetingTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - meetingStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
                const seconds = (elapsed % 60).toString().padStart(2, '0');
                const timeString = `${minutes}:${seconds}`;
                
                const meetingDuration = document.getElementById('meetingDuration');
                const miniMeetingDuration = document.getElementById('miniMeetingDuration');
                if (meetingDuration) meetingDuration.textContent = timeString;
                if (miniMeetingDuration) miniMeetingDuration.textContent = timeString;
            }, 1000);
        }
        
        function stopMeetingTimer() {
            if (meetingTimer) {
                clearInterval(meetingTimer);
                meetingTimer = null;
            }
        }
        
        function endMeeting() {
    if (confirm('Bạn có chắc chắn muốn kết thúc cuộc họp?')) {
        closeAllModals();
        stopMeetingTimer();
        // reset state nếu cần
        isMeetingMuted = true;
        isMeetingVideoOn = false;
        isMeetingScreenSharing = false;
        currentRoomCode = '';
    }
}function closeVoiceCall() {
    closeAllModals();
    stopCallTimer();
}
function closeVideoCall() {
    closeAllModals();
    stopCallTimer();
}
        
        function toggleMeetingMute() {
            isMeetingMuted = !isMeetingMuted;
            const muteBtn = document.getElementById('meetingMuteBtn');
            const icon = muteBtn.querySelector('i');
            
            if (isMeetingMuted) {
                muteBtn.classList.remove('bg-gray-600');
                muteBtn.classList.add('bg-red-600');
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
            } else {
                muteBtn.classList.remove('bg-red-600');
                muteBtn.classList.add('bg-gray-600');
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
            }
        }
        
        function toggleMeetingVideo() {
            isMeetingVideoOn = !isMeetingVideoOn;
            const videoBtn = document.getElementById('meetingVideoBtn');
            const icon = videoBtn.querySelector('i');
            
            if (!isMeetingVideoOn) {
                videoBtn.classList.remove('bg-gray-600');
                videoBtn.classList.add('bg-red-600');
                icon.classList.remove('fa-video');
                icon.classList.add('fa-video-slash');
            } else {
                videoBtn.classList.remove('bg-red-600');
                videoBtn.classList.add('bg-gray-600');
                icon.classList.remove('fa-video-slash');
                icon.classList.add('fa-video');
            }
        }
        
        function toggleMeetingScreenShare() {
            isMeetingScreenSharing = !isMeetingScreenSharing;
            const btn = event.currentTarget;
            
            if (isMeetingScreenSharing) {
                btn.classList.remove('bg-gray-600');
                btn.classList.add('bg-blue-600');
                alert('Đang chia sẻ màn hình...');
            } else {
                btn.classList.remove('bg-blue-600');
                btn.classList.add('bg-gray-600');
                alert('Đã dừng chia sẻ màn hình');
            }
        }
        
        function inviteToMeeting() {
            document.getElementById('inviteMeetingModal').classList.remove('hidden');
        }
        
        function closeInviteMeeting() {
            document.getElementById('inviteMeetingModal').classList.add('hidden');
        }
        
        function inviteUser(userId) {
            alert(`Đã gửi lời mời tham gia cuộc họp đến ${userId}!`);
        }
        
        function copyMeetingLink() {
            const link = `https://meet.app/${currentRoomCode}`;
            navigator.clipboard.writeText(link).then(() => {
                alert('Đã sao chép link cuộc họp!');
            }).catch(() => {
                alert('Không thể sao chép link. Vui lòng thử lại!');
            });
        }
        
        function shareRoomCode() {
            const message = `Tham gia cuộc họp của tôi!\nMã cuộc họp: ${currentRoomCode}\nLink: https://meet.app/${currentRoomCode}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Lời mời cuộc họp',
                    text: message
                });
            } else {
                navigator.clipboard.writeText(message).then(() => {
                    alert('Đã sao chép thông tin cuộc họp!');
                }).catch(() => {
                    alert('Không thể chia sẻ. Vui lòng thử lại!');
                });
            }
        }
        
        function showParticipants() {
            alert('Danh sách thành viên:\n- Bạn (Chủ phòng)\n- Mai Nguyễn\n- Đức Trần\n- Linh Võ');
        }
        
        function showMeetingChat() {
            alert('Tính năng chat trong cuộc họp sẽ được cập nhật sớm!');
        }
        
        function showMeetingSettings() {
            alert('Cài đặt cuộc họp sẽ được cập nhật sớm!');
        }
        
        // New functions for enhanced features
        function answerCall() {
            document.getElementById('answerCallBtn').classList.add('hidden');
            alert('Đã trả lời cuộc gọi!');
        }
        
        function showScheduleMeeting() {
            document.getElementById('scheduleMeetingModal').classList.remove('hidden');
            closeRoomModal();
        }
        
        function closeScheduleMeeting() {
            document.getElementById('scheduleMeetingModal').classList.add('hidden');
        }
        
        function scheduleMeeting() {
            alert('Đã lập lịch cuộc họp thành công! Thông báo sẽ được gửi đến những người được mời.');
            closeScheduleMeeting();
        }
        
        function minimizeMeeting() {
            document.getElementById('meetingRoomModal').classList.add('hidden');
            document.getElementById('minimizedMeeting').classList.remove('hidden');
            
            // Sync timer with minimized window
            const duration = document.getElementById('meetingDuration').textContent;
            document.getElementById('miniMeetingDuration').textContent = duration;
        }
        
        function maximizeMeeting() {
            document.getElementById('minimizedMeeting').classList.add('hidden');
            document.getElementById('meetingRoomModal').classList.remove('hidden');
        }
        
        // Simulate incoming call
        function simulateIncomingCall() {
            document.getElementById('answerCallBtn').classList.remove('hidden');
            document.getElementById('voiceCallModal').classList.remove('hidden');
            
            // Auto-hide answer button after 10 seconds
            setTimeout(() => {
                document.getElementById('answerCallBtn').classList.add('hidden');
            }, 10000);
        }
        
        // Call functions
        let callTimer;
        let callStartTime;
        let isMuted = false;
        let isVideoOn = true;
        let isScreenSharing = false;
        
        function startCallTimer() {
            callStartTime = Date.now();
            callTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
                const seconds = (elapsed % 60).toString().padStart(2, '0');
                const timeString = `${minutes}:${seconds}`;
                
                const callDuration = document.getElementById('callDuration');
                const voiceCallDuration = document.getElementById('voiceCallDuration');
                if (callDuration) callDuration.textContent = timeString;
                if (voiceCallDuration) voiceCallDuration.textContent = timeString;
            }, 1000);
        }
        
        function stopCallTimer() {
            if (callTimer) {
                clearInterval(callTimer);
                callTimer = null;
            }
        }
        
        function toggleMute() {
            isMuted = !isMuted;
            const muteBtn = document.getElementById('muteBtn');
            const icon = muteBtn.querySelector('i');
            
            if (isMuted) {
                muteBtn.classList.remove('bg-gray-600');
                muteBtn.classList.add('bg-red-600');
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
            } else {
                muteBtn.classList.remove('bg-red-600');
                muteBtn.classList.add('bg-gray-600');
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
            }
        }
        
        function toggleVoiceMute() {
            isMuted = !isMuted;
            const muteBtn = document.getElementById('voiceMuteBtn');
            const icon = muteBtn.querySelector('i');
            
            if (isMuted) {
                muteBtn.classList.remove('bg-gray-600');
                muteBtn.classList.add('bg-red-600');
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
            } else {
                muteBtn.classList.remove('bg-red-600');
                muteBtn.classList.add('bg-gray-600');
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
            }
        }
        
        function toggleVideo() {
            isVideoOn = !isVideoOn;
            const videoBtn = document.getElementById('videoBtn');
            const icon = videoBtn.querySelector('i');
            
            if (!isVideoOn) {
                videoBtn.classList.remove('bg-gray-600');
                videoBtn.classList.add('bg-red-600');
                icon.classList.remove('fa-video');
                icon.classList.add('fa-video-slash');
            } else {
                videoBtn.classList.remove('bg-red-600');
                videoBtn.classList.add('bg-gray-600');
                icon.classList.remove('fa-video-slash');
                icon.classList.add('fa-video');
            }
        }
        
        function toggleScreenShare() {
            isScreenSharing = !isScreenSharing;
            const btn = event.currentTarget;
            
            if (isScreenSharing) {
                btn.classList.remove('bg-gray-600');
                btn.classList.add('bg-blue-600');
                alert('Đang chia sẻ màn hình...');
            } else {
                btn.classList.remove('bg-blue-600');
                btn.classList.add('bg-gray-600');
                alert('Đã dừng chia sẻ màn hình');
            }
        }
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
        
        function switchToVideo() {
            document.getElementById('voiceCallModal').classList.add('hidden');
            document.getElementById('videoCallModal').classList.remove('hidden');
        }
        
        function showThemeModal() {
            alert('Tính năng đổi chủ đề sẽ được cập nhật sớm!');
        }
        
        function toggleDarkMode(checkbox) {
            if (checkbox.checked) {
                document.body.classList.add('dark');
                alert('Chế độ tối sẽ được áp dụng trong phiên bản tiếp theo!');
            } else {
                document.body.classList.remove('dark');
            }
        }
        
        function logout() {
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                alert('Đã đăng xuất thành công!');
                closeSettings();
            }
        }
        
        // File handling
        function showAttachmentMenu() {
            const menu = document.getElementById('attachmentMenu');
            menu.classList.toggle('hidden');
        }
        
        function selectFile() {
            document.getElementById('fileInput').click();
            document.getElementById('attachmentMenu').classList.add('hidden');
        }
        
        function selectImage() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*,video/*';
            input.onchange = handleFileSelect;
            input.click();
            document.getElementById('attachmentMenu').classList.add('hidden');
        }
        
        function handleFileSelect(event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let file of files) {
                    sendFileMessage(file);
                }
            }
        }
        
        function sendFileMessage(file) {
            const messagesContainer = document.getElementById('messagesContainer');
            const fileIcon = getFileIcon(file.type);
            const fileSize = formatFileSize(file.size);
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-xs message-bubble">
                    <div class="flex items-center space-x-3">
                        <i class="fas ${fileIcon} text-2xl"></i>
                        <div>
                            <p class="font-medium">${file.name}</p>
                            <p class="text-xs opacity-75">${fileSize}</p>
                        </div>
                    </div>
                </div>
            `;
            
            const typingIndicator = document.getElementById('typingIndicator');
            messagesContainer.insertBefore(messageDiv, typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Show response
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    addResponseMessage('Đã nhận tài liệu! 📄');
                }, 2000);
            }, 500);
        }
        
        function getFileIcon(fileType) {
            if (fileType.startsWith('image/')) return 'fa-image';
            if (fileType.startsWith('video/')) return 'fa-video';
            if (fileType.includes('pdf')) return 'fa-file-pdf';
            if (fileType.includes('word')) return 'fa-file-word';
            if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fa-file-excel';
            return 'fa-file';
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        function createPoll() {
            alert('Tính năng bình chọn sẽ được cập nhật sớm!');
            document.getElementById('attachmentMenu').classList.add('hidden');
        }
        
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (message) {
                const messagesContainer = document.getElementById('messagesContainer');
                
                // Create new message element
                const messageDiv = document.createElement('div');
                messageDiv.className = 'flex justify-end';
                messageDiv.innerHTML = `
                    <div class="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs message-bubble">
                        <p>${message}</p>
                    </div>
                `;
                
                // Insert before typing indicator
                const typingIndicator = document.getElementById('typingIndicator');
                messagesContainer.insertBefore(messageDiv, typingIndicator);
                
                // Clear input
                input.value = '';
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Show typing indicator after a delay
                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        // Add a response message
                        addResponseMessage();
                    }, 2000);
                }, 500);
            }
        }
        
        function addResponseMessage(customMessage = null) {
            const responses = [
                "Cảm ơn bạn! 😊",
                "Mình hiểu rồi!",
                "Ý kiến hay đấy! 👍",
                "Được thôi, mình sẽ suy nghĩ về điều đó",
                "Haha, bạn vui quá! 😄"
            ];
            
            const randomResponse = customMessage || responses[Math.floor(Math.random() * responses.length)];
            const messagesContainer = document.getElementById('messagesContainer');
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-start';
            messageDiv.innerHTML = `
                <div class="flex items-end space-x-2 max-w-xs">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='14' fill='%23FF6B9D'/%3E%3Ctext x='14' y='18' text-anchor='middle' fill='white' font-size='12' font-weight='bold'%3EM%3C/text%3E%3C/svg%3E" 
                         alt="Mai" class="w-7 h-7 rounded-full">
                    <div class="bg-gray-200 rounded-2xl px-4 py-2 message-bubble">
                        <p class="text-gray-800">${randomResponse}</p>
                    </div>
                </div>
            `;
            
            const typingIndicator = document.getElementById('typingIndicator');
            messagesContainer.insertBefore(messageDiv, typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function showTypingIndicator() {
            document.getElementById('typingIndicator').classList.remove('hidden');
            document.getElementById('messagesContainer').scrollTop = document.getElementById('messagesContainer').scrollHeight;
        }
        
        function hideTypingIndicator() {
            document.getElementById('typingIndicator').classList.add('hidden');
        }
        
        function startVideoCall() {
            document.getElementById('videoCallModal').classList.remove('hidden');
            startCallTimer();
            closeChatInfo();
        }
        
        function startVoiceCall() {
            document.getElementById('voiceCallModal').classList.remove('hidden');
            startCallTimer();
            closeChatInfo();
        }
        function startVoiceCall() {
    closeAllModals();
    document.getElementById('voiceCallModal').classList.remove('hidden');
    startCallTimer(); // nếu có timer
}
function startVideoCall() {
    closeAllModals();
    document.getElementById('videoCallModal').classList.remove('hidden');
    startCallTimer();
}

        function endCall() {
            document.getElementById('videoCallModal').classList.add('hidden');
            document.getElementById('voiceCallModal').classList.add('hidden');
            stopCallTimer();
            
            // Reset call states
            isMuted = false;
            isVideoOn = true;
            isScreenSharing = false;
        }
        
        function showSettings() {
            document.getElementById('settingsModal').classList.remove('hidden');
        }
        
        function closeSettings() {
            document.getElementById('settingsModal').classList.add('hidden');
        }
        
        function showChatInfo() {
            // Update chat info modal with current chat data
            const chatData = {
                'mai': {
                    name: 'Mai Nguyễn',
                    avatar: 'M',
                    color: '#FF6B9D',
                    status: 'Đang hoạt động'
                },
                'duc': {
                    name: 'Đức Trần',
                    avatar: 'D',
                    color: '#4A90E2',
                    status: 'Hoạt động 5 phút trước'
                },
                'linh': {
                    name: 'Linh Võ',
                    avatar: 'L',
                    color: '#F39C12',
                    status: 'Hoạt động 1 giờ trước'
                }
            };
            
            const chat = chatData[currentChat];
            if (chat) {
                document.getElementById('chatInfoName').textContent = chat.name;
                document.getElementById('chatInfoStatus').textContent = chat.status;
                
                const avatarSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='${encodeURIComponent(chat.color)}'/%3E%3Ctext x='40' y='50' text-anchor='middle' fill='white' font-size='32' font-weight='bold'%3E${chat.avatar}%3C/text%3E%3C/svg%3E`;
                document.getElementById('chatInfoAvatar').src = avatarSvg;
            }
            
            document.getElementById('chatInfoModal').classList.remove('hidden');
        }
        
        function closeChatInfo() {
            document.getElementById('chatInfoModal').classList.add('hidden');
        }
        
        // Close modals and menus when clicking outside
        document.addEventListener('click', function(event) {
            const modals = ['settingsModal', 'chatInfoModal', 'newChatModal', 'roomModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (event.target === modal) {
                    modal.classList.add('hidden');
                }
            });
            
            // Close attachment menu when clicking outside
            const attachmentMenu = document.getElementById('attachmentMenu');
            if (!event.target.closest('#attachmentMenu') && !event.target.closest('button[onclick="showAttachmentMenu()"]')) {
                attachmentMenu.classList.add('hidden');
            }
        });
        
        // Drag and drop file upload
        document.addEventListener('DOMContentLoaded', function() {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Drag and drop functionality
            const chatArea = document.querySelector('.flex-1.flex.flex-col');
            
            chatArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                document.getElementById('fileUploadArea').classList.remove('hidden');
            });
            
            chatArea.addEventListener('dragleave', function(e) {
                if (!chatArea.contains(e.relatedTarget)) {
                    document.getElementById('fileUploadArea').classList.add('hidden');
                }
            });
            
            chatArea.addEventListener('drop', function(e) {
                e.preventDefault();
                document.getElementById('fileUploadArea').classList.add('hidden');
                
                const files = e.dataTransfer.files;
                for (let file of files) {
                    sendFileMessage(file);
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Ctrl/Cmd + K to focus search
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Escape to close modals and search
            if (event.key === 'Escape') {
                document.querySelectorAll('.fixed.inset-0').forEach(modal => {
                    modal.classList.add('hidden');
                });
                closeChatSearch();
                document.getElementById('attachmentMenu').classList.add('hidden');
            }
        }); 
function toggleChatInfoPanel() {
  const panel = document.getElementById('chatInfoPanel');
  const main  = document.getElementById('mainChatArea');

  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    main.classList.add('pr-[320px]');
    // luôn đồng bộ nội dung theo cuộc trò chuyện đang xem
    renderInfo(CURRENT_THREAD);
  } else {
    main.classList.remove('pr-[320px]');
  }
}
 
/* ==== 1) Data threads: mỗi id là một cuộc trò chuyện ==== */
const THREADS = {
  mai: {
    name: "Mai Nguyễn",
    avatar: svgAvatar("M", "#FF6B9D"),
    status: { text: "Đang hoạt động", color: "text-green-600" },
    messages: [
      { from: "other", text: "Chào bạn! Hôm nay thế nào? 😊" },
      { from: "me",    text: "Chào Mai! Mình ổn, cảm ơn bạn. Còn bạn thì sao?" },
      { from: "other", text: "Mình cũng tốt! Ngày mai có rảnh không? Mình mời cà phê ☕" },
      { from: "me",    text: "Ý tưởng hay đấy! Mấy giờ nhỉ?" },
      { from: "other", text: "2 giờ chiều được không? Quán gần trường cũ 📍" },
      { from: "me",    text: "Oke, hẹn gặp lại nhé! 👋" }
    ]
  },

  duc: {
    name: "Đức Trần",
    avatar: svgAvatar("D", "#4A90E2"),
    status: { text: "Vừa hoạt động", color: "text-gray-500" },
    messages: [
      { from: "other", text: "Hôm nay có rảnh không? 🤔" },    { from: "other", text: "Ok, để mình gửi file Google Docs." },
    { from: "me", text: "Cứu tinh của đời mình 🙏" },
    { from: "other", text: "Haha, học chung mới vui chứ!" },
    { from: "me", text: "Tối call học nhóm đi." },
    { from: "other", text: "Quá chuẩn, 8h nhé!" },
      { from: "me",    text: "Chiều tớ bận, tối 8h được chứ?" },
      { from: "other", text: "Ok nhé!" }
    ]
  },

  linh: {
    name: "Linh Võ",
    avatar: svgAvatar("L", "#F39C12"),
    status: { text: "Ngoại tuyến", color: "text-gray-400" },
    messages: [
      { from: "me",    text: "Cảm ơn bạn nhiều! ❤️" },    { from: "other", text: "Ok, để mình gửi file Google Docs." },
    { from: "me", text: "Cứu tinh của đời mình 🙏" },

      { from: "other", text: "Không có gì nè!" }
    ]
  },

  group: {
    name: "Nhóm Bạn Thân",
    avatar: svgAvatar("Nhóm", "#9B59B6"),
    status: { text: "5 thành viên", color: "text-gray-500" },
    messages: [
      { from: "other", sender:"An", text: "Ai đi xem phim không? 🎬" },
      { from: "me",    text: "Tớ đi!" },
   { from: "other", text: "Ok, để mình gửi file Google Docs." },
    { from: "me", text: "Cứu tinh của đời mình 🙏" },
    { from: "other", text: "Haha, học chung mới vui chứ!" },
    { from: "me", text: "Tối call học nhóm đi." },
    { from: "other", text: "Quá chuẩn, 8h nhé!" },
    ]
  },hoa: {
  name: "Hoa Phạm",
  avatar: svgAvatar("H", "#E91E63"),
  status: { text: "Đang gõ…", color: "text-green-500" },
  messages: [
    { from: "other", text: "Mai thi chưa ôn gì luôn 😅" },
    { from: "me", text: "Ôi, đang cày đây. Bạn ôn tới đâu rồi?" },
    { from: "other", text: "Mình mới làm đề cương xong, stress quá!" },
    { from: "me", text: "Chia sẻ cho mình với, mình làm bài tập mãi chưa xong." },
   
    { from: "other", text: "Haha, học chung mới vui chứ!" },
    { from: "me", text: "Tối call học nhóm đi." },
    { from: "other", text: "Quá chuẩn, 8h nhé!" },
  ]
},


  // … thêm các thread khác tương tự: an, hoa, work, nam, family, study, gaming, ...
};

/* (tuỳ chọn) Lưu draft theo từng thread */
const DRAFTS = new Map();

/* ==== 2) Helper tạo avatar SVG ==== */
function svgAvatar(text, color){
  const enc = encodeURIComponent;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='${enc(color)}'/%3E%3Ctext x='40' y='50' text-anchor='middle' fill='white' font-size='32' font-weight='bold'%3E${enc(text)}%3C/text%3E%3C/svg%3E`;
}

/* ==== 3) Render header + messages + panel ==== */
function renderThread(threadId){
  const t = THREADS[threadId];
  if(!t) return;

  // Header
  document.getElementById('chatAvatar').src  = t.avatar;
  document.getElementById('chatName').textContent = t.name;
  const statusEl = document.getElementById('chatStatus');
  statusEl.className = `text-sm ${t.status.color}`;
  statusEl.textContent = t.status.text;

  // Panel info (khi mở)
  const pName   = document.getElementById('panelChatName');
  const pStatus = document.getElementById('panelChatStatus');
  const pAvatar = document.getElementById('panelChatAvatar');
  if (pName)   pName.textContent = t.name;
  if (pStatus) { pStatus.className = `${t.status.color} text-sm`; pStatus.textContent = t.status.text; }
  if (pAvatar) pAvatar.src = t.avatar;

  // Messages
  const box = document.getElementById('messagesContainer');
  box.innerHTML = t.messages.map(m => {
    if(m.from === 'me'){
      return `
        <div class="flex justify-end">
          <div class="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs message-bubble">
            <p>${escapeHTML(m.text)}</p>
          </div>
        </div>`;
    } else {
      const senderChip = m.sender ? `<span class="text-xs text-gray-500 block mb-0.5">${escapeHTML(m.sender)}</span>` : "";
      return `
        <div class="flex justify-start">
          <div class="flex items-end space-x-2 max-w-xs">
            <img src="${t.avatar.replace("80","28")}" class="w-7 h-7 rounded-full" alt="">
            <div class="bg-gray-200 rounded-2xl px-4 py-2 message-bubble">
              ${senderChip}<p class="text-gray-800">${escapeHTML(m.text)}</p>
            </div>
          </div>
        </div>`;
    }
  }).join("");

  // Scroll đáy
  box.scrollTop = box.scrollHeight + 1000;

  // Khôi phục draft (nếu có)
  const input = document.getElementById('messageInput');
  input.value = DRAFTS.get(threadId) || "";
}
function renderInfo(threadId){
  const t = THREADS[threadId];
  if(!t) return;

  // header của panel
  document.getElementById('panelChatName').textContent  = t.name;
  const statusEl = document.getElementById('panelChatStatus');
  statusEl.className = `${t.status.color} text-sm`;
  statusEl.textContent = t.status.text;
  document.getElementById('panelChatAvatar').src = t.avatar;

  // thân panel
  const info = t.info || {};
  const panel = document.getElementById('panelInfoBody');
  if(!panel) return;

  const about = info.about ? `
    <section class="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <h4 class="text-sm font-semibold text-gray-800 mb-1">Giới thiệu</h4>
      <p class="text-sm text-gray-700 leading-6">${escapeHTML(info.about)}</p>
    </section>` : "";

  const contact = (info.phone || info.email) ? `
    <section class="bg-white border border-gray-200 rounded-lg p-3">
      <h4 class="text-sm font-semibold text-gray-800 mb-2">Liên hệ</h4>
      ${info.phone ? `<div class="text-sm text-gray-700"><i class="fa fa-phone mr-2 text-gray-500"></i>${escapeHTML(info.phone)}</div>` : ""}
      ${info.email ? `<div class="text-sm text-gray-700 mt-1"><i class="fa fa-envelope mr-2 text-gray-500"></i>${escapeHTML(info.email)}</div>` : ""}
    </section>` : "";

  const members = Array.isArray(info.members) ? `
    <section class="bg-white border border-gray-200 rounded-lg p-3">
      <h4 class="text-sm font-semibold text-gray-800 mb-2">Thành viên (${info.members.length})</h4>
      <ul class="space-y-1">
        ${info.members.map(m => `
          <li class="text-sm text-gray-700 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full ${m.me ? 'bg-blue-500' : 'bg-gray-300'}"></span>
            ${escapeHTML(m.name)}${m.me ? " <span class='ml-1 text-xs text-blue-500'>(Bạn)</span>" : ""}
          </li>`).join("")}
      </ul>
    </section>` : "";

  const files = Array.isArray(info.files) && info.files.length ? `
    <section class="bg-white border border-gray-200 rounded-lg p-3">
      <h4 class="text-sm font-semibold text-gray-800 mb-2">Tệp đã chia sẻ</h4>
      <ul class="space-y-2">
        ${info.files.map(f => `
          <li class="text-sm text-gray-700 flex items-center gap-2">
            <i class="fa fa-file text-gray-400"></i>
            <a class="text-blue-600 hover:underline" href="${f.url || '#'}">${escapeHTML(f.name)}</a>
          </li>`).join("")}
      </ul>
    </section>` : "";

  panel.innerHTML = [about, contact, members, files].filter(Boolean).join('<div class="h-3"></div>');
}

/* ==== 4) Chọn thread từ list ==== */
let CURRENT_THREAD = 'mai';
function selectChat(idOrEl){
  const id = typeof idOrEl === 'string' ? idOrEl : (idOrEl.dataset?.id || idOrEl.getAttribute('data-id'));
  if(!id || !THREADS[id]) return;

  // Lưu draft thread cũ
  const input = document.getElementById('messageInput');
  if (window.CURRENT_THREAD) DRAFTS.set(CURRENT_THREAD, input.value);

  window.CURRENT_THREAD = id;

  renderThread(id);   // 1. cập nhật tin nhắn, header, panel info header
  renderInfo(id);     // 2. cập nhật nội dung panel (bắt buộc GỌI NGAY Ở ĐÂY!)

  // Active UI cho item list (nếu có)
  document.querySelectorAll('#chatList .chat-item').forEach(it => {
    it.classList.remove('active');
  });
  const activeEl = document.querySelector(`#chatList .chat-item[data-id="${id}"]`)
                 || document.querySelector(`#chatList .chat-item[onclick*="${id}"]`);
  activeEl?.classList.add('active');
}


/* ==== 5) Gửi tin gắn với thread hiện tại ==== */
function sendMessage(){
  const input = document.getElementById('messageInput');
  const text  = (input.value || "").trim();
  if(!text || !CURRENT_THREAD) return;

  // Lưu vào data
  THREADS[CURRENT_THREAD].messages.push({ from:'me', text });

  // Render nhanh phần cuối + scroll
  const box = document.getElementById('messagesContainer');
  box.insertAdjacentHTML('beforeend', `
    <div class="flex justify-end">
      <div class="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs message-bubble">
        <p>${escapeHTML(text)}</p>
      </div>
    </div>`);
  box.scrollTop = box.scrollHeight + 1000;

  input.value = "";
  DRAFTS.set(CURRENT_THREAD, "");
}

/* ==== 6) Event khởi tạo & tiện ích ==== */
document.addEventListener('DOMContentLoaded', () => {
  // Ủy quyền sự kiện cho trường hợp dùng data-id
  document.getElementById('chatList')?.addEventListener('click', (e) => {
    const item = e.target.closest('.chat-item');
    if(item && item.dataset.id){ selectChat(item); }
  });

  // Thread mặc định
  selectChat(CURRENT_THREAD);
});

function escapeHTML(s){ return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  /* ---- Sidebar collapse ---- */
  function applyCollapse(on){
    const S = sb(), M = main();
    if(!S || !M) return;
    S.classList.toggle('sidebar-collapsed', !!on);
    M.classList.toggle('main-content-collapsed', !!on);
    // aria-state on header button if exists
    const burger = $('#menuToggle'); if (burger) burger.setAttribute('aria-expanded', (!!on).toString());
    try{ localStorage.setItem('sb.state', on ? '1' : '0'); }catch(e){}
  }
  function isCollapsed(){ return sb()?.classList.contains('sidebar-collapsed'); }
  function toggleSidebar(){ applyCollapse(!isCollapsed()); }
  function restore(){ try{ applyCollapse(localStorage.getItem('sb.state')==='1'); }catch(e){} }
function startVoiceCall() {
  showCallOverlay('voice');
}
function startVideoCall() {
  showCallOverlay('video');
}
function closeAllModals() {
    // Ẩn tất cả modal liên quan gọi/thảo luận
    document.getElementById('meetingRoomModal')?.classList.add('hidden');
    document.getElementById('voiceCallModal')?.classList.add('hidden');
    document.getElementById('videoCallModal')?.classList.add('hidden');
    document.getElementById('roomModal')?.classList.add('hidden');
    document.getElementById('newChatModal')?.classList.add('hidden');
    // Ẩn luôn minimized nếu có
    document.getElementById('minimizedMeeting')?.classList.add('hidden');
}

function startMeeting() {
  showCallOverlay('meeting');
}
function showCallOverlay(type) {
  const overlay = document.getElementById('callOverlay');
  let icon = 'video', title = 'Đang gọi video...';
  if (type === 'voice') {
    icon = 'phone'; title = 'Đang gọi thoại...';
  }
  if (type === 'meeting') {
    icon = 'users'; title = 'Phòng họp video đang diễn ra...';
  }

  // Avatar & tên (fake ví dụ, tuỳ chat thật bạn thay biến)
  const avatar = `<div class="w-32 h-32 rounded-full bg-pink-400 flex items-center justify-center text-6xl text-white font-bold mx-auto mb-4">M</div>`;
  const name = `<div class="text-2xl font-semibold text-white mb-2">Mai Nguyễn</div>`;
  const status = `<div class="text-base text-gray-300 mb-6">${title}</div>`;

  overlay.innerHTML = `
    <div class="w-full h-full flex flex-col items-center justify-center">
      ${avatar}
      ${name}
      ${status}
      <div class="call-controls flex justify-center gap-4 mt-8">
        <button title="Mic" class="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl hover:bg-gray-600"><i class="fas fa-microphone"></i></button>
        <button title="Cam" class="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl hover:bg-gray-600"><i class="fas fa-video"></i></button>
        <button title="Screen share" class="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl hover:bg-gray-600"><i class="fas fa-desktop"></i></button>
        <button title="End call" onclick="closeCallOverlay()" class="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl hover:bg-red-800"><i class="fas fa-phone-slash"></i></button>
      </div>
    </div>
  `;
  overlay.classList.remove('hidden');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Ẩn header và sidebar
  let header = document.getElementById('header');
  let sidebar = document.getElementById('sidebar');
  if (header) header.style.display = 'none';
  if (sidebar) sidebar.style.display = 'none';
}

function closeCallOverlay() {
  const overlay = document.getElementById('callOverlay');
  overlay.classList.remove('active');
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
  document.body.style.overflow = '';

  // Hiện lại header và sidebar
  let header = document.getElementById('header');
  let sidebar = document.getElementById('sidebar');
  if (header) header.style.display = '';
  if (sidebar) sidebar.style.display = '';
}
/* ==== Kết nối UI gọi thoại & gọi video đã có sẵn ==== */
(function () {
  // 1) Selector "linh hoạt" để không cần đổi HTML sẵn có
  const VOICE_SELECTOR = '#voiceCallModal,[data-modal="voice-call"],.voice-call-modal';
  const VIDEO_SELECTOR = '#videoCallModal,[data-modal="video-call"],.video-call-modal';

  const $ = (sel) => document.querySelector(sel);

  // 2) Helper đảm bảo full screen (che header + sidebar)
  function ensureFullscreen(el) {
    if (!el) return;
    // Không phá layout sẵn — chỉ ép full màn hình nếu modal bạn chưa set
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.zIndex = '99999';
  }

  function lockLayout() {
    document.body.style.overflow = 'hidden';
    const header = $('#header'), sidebar = $('#sidebar');
    if (header) header.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
  }

  function restoreLayout() {
    document.body.style.overflow = '';
    const header = $('#header'), sidebar = $('#sidebar');
    if (header) header.style.display = '';
    if (sidebar) sidebar.style.display = '';
  }

  function showModal(modalEl) {
    if (!modalEl) return false;
    ensureFullscreen(modalEl);
    // Ưu tiên tailwind: .hidden/.flex; nếu UI cũ dùng display thì fallback set display:flex
    modalEl.classList.remove('hidden');
    // Nếu vẫn display:none do CSS riêng → ép hiển thị
    if (getComputedStyle(modalEl).display === 'none') {
      modalEl.style.display = 'flex';
      modalEl.style.alignItems = modalEl.style.alignItems || 'center';
      modalEl.style.justifyContent = modalEl.style.justifyContent || 'center';
      modalEl.style.background = modalEl.style.background || 'rgba(0,0,0,.85)';
    }
    return true;
  }

  function hideModal(modalEl) {
    if (!modalEl) return;
    // Trả về cơ chế tailwind
    modalEl.classList.add('hidden');
    // Gỡ ép display nếu có
    modalEl.style.display = '';
  }

  // 3) Đóng nhanh tất cả UI call (không đụng phòng họp/meeting)
  function closeAllCallUIs() {
    hideModal($(VOICE_SELECTOR));
    hideModal($(VIDEO_SELECTOR));
    restoreLayout();
    // Dừng timer nếu app bạn có
    if (window.stopCallTimer) try { window.stopCallTimer(); } catch (e) {}
  }
  window.closeAllCallUIs = closeAllCallUIs;

  // 4) Mở UI gọi thoại
  window.startVoiceCall = function () {
    closeAllCallUIs(); // tránh chồng chéo
    const voice = $(VOICE_SELECTOR);
    if (!showModal(voice)) {
      console.warn('Không tìm thấy UI gọi thoại. Kiểm tra lại id/class: #voiceCallModal hoặc data-modal="voice-call"');
      return;
    }
    lockLayout();
    // Nếu bạn có timer, truyền id hiển thị thời lượng (tùy UI sẵn có của bạn)
    if (window.startCallTimer) try { window.startCallTimer(['voiceCallDuration', 'callDuration']); } catch (e) {}
  };

  // 5) Mở UI gọi video
  window.startVideoCall = function () {
    closeAllCallUIs();
    const video = $(VIDEO_SELECTOR);
    if (!showModal(video)) {
      console.warn('Không tìm thấy UI gọi video. Kiểm tra lại id/class: #videoCallModal hoặc data-modal="video-call"');
      return;
    }
    lockLayout();
    if (window.startCallTimer) try { window.startCallTimer(['videoCallDuration', 'callDuration']); } catch (e) {}
  };

  // 6) Gắn phím ESC để thoát nhanh
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllCallUIs();
  });

  // 7) Bắt các nút đóng nếu UI sẵn có đã có data-action
  document.addEventListener('click', (e) => {
    const btnCloseVoice = e.target.closest('[data-action="close-voice"]');
    if (btnCloseVoice) { e.preventDefault(); closeAllCallUIs(); }
    const btnCloseVideo = e.target.closest('[data-action="close-video"]');
    if (btnCloseVideo) { e.preventDefault(); closeAllCallUIs(); }
  });
})();
/* ==== Kết nối UI gọi thoại & gọi video — Fullscreen, không làm mất header/sidebar sau khi tắt ==== */
(function () {
  // 1) Khai báo selector linh hoạt (đặt theo id/class bạn đang dùng)
  const VOICE_SELECTOR = '#voiceCallModal,[data-modal="voice-call"],.voice-call-modal';
  const VIDEO_SELECTOR = '#videoCallModal,[data-modal="video-call"],.video-call-modal';

  const $ = (sel) => document.querySelector(sel);

  // 2) Body flag để ẩn/hiện header + sidebar
  function lockLayout()   { document.body.classList.add('call-active'); }
  function restoreLayout(){ document.body.classList.remove('call-active'); }

  // 3) Show/Hide modal tiện dụng (không can thiệp HTML sẵn có)
  function showModal(modalEl) {
    if (!modalEl) return false;
    // ưu tiên Tailwind: .hidden/.flex; nếu CSS cũ đang display:none thì ép flex
    modalEl.classList.remove('hidden');
    if (getComputedStyle(modalEl).display === 'none') {
      modalEl.style.display = 'flex';
      modalEl.style.alignItems = modalEl.style.alignItems || 'center';
      modalEl.style.justifyContent = modalEl.style.justifyContent || 'center';
    }
    return true;
  }
  function hideModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    modalEl.style.display = ''; // gỡ ép display nếu có
  }

  // 4) Đóng tất cả UI call (KHÔNG đụng meeting)
  function closeAllCallUIs() {
    hideModal($(VOICE_SELECTOR));
    hideModal($(VIDEO_SELECTOR));
    restoreLayout();
    // dừng timer nếu app có
    if (window.stopCallTimer) try { window.stopCallTimer(); } catch (e) {}
  }
  window.closeAllCallUIs = closeAllCallUIs;

  // 5) Mở UI gọi thoại
  window.startVoiceCall = function () {
    closeAllCallUIs(); // tránh chồng chéo
    const voice = $(VOICE_SELECTOR);
    if (!showModal(voice)) {
      console.warn('Không tìm thấy UI gọi thoại. Kiểm tra selector: #voiceCallModal / [data-modal="voice-call"] / .voice-call-modal');
      return;
    }
    lockLayout();
    if (window.startCallTimer) try { window.startCallTimer(['voiceCallDuration','callDuration']); } catch (e) {}
  };

  // 6) Mở UI gọi video
  window.startVideoCall = function () {
    closeAllCallUIs();
    const video = $(VIDEO_SELECTOR);
    if (!showModal(video)) {
      console.warn('Không tìm thấy UI gọi video. Kiểm tra selector: #videoCallModal / [data-modal="video-call"] / .video-call-modal');
      return;
    }
    lockLayout();
    if (window.startCallTimer) try { window.startCallTimer(['videoCallDuration','callDuration']); } catch (e) {}
  };

  // 7) Bắt phím ESC để thoát nhanh
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllCallUIs(); });

  // 8) Bắt các nút đóng nếu UI có sẵn data-action
  document.addEventListener('click', (e) => {
    const btnCloseVoice = e.target.closest('[data-action="close-voice"]');
    if (btnCloseVoice) { e.preventDefault(); closeAllCallUIs(); }
    const btnCloseVideo = e.target.closest('[data-action="close-video"]');
    if (btnCloseVideo) { e.preventDefault(); closeAllCallUIs(); }
  });
})(); 
// === PATCH: Trình quản lý gọi thoại / gọi video — Fullscreen + khôi phục layout chuẩn ===
window.addEventListener('load', function () {
  // a) Selector linh hoạt: hỗ trợ cả id/class/data-attr bạn đang dùng
  const SELECTORS = {
    voice: ['#voiceCallModal', '#voiceCallOverlay', '[data-modal="voice-call"]', '.voice-call-modal'],
    video: ['#videoCallModal', '#videoCallOverlay', '[data-modal="video-call"]', '.video-call-modal'],
  };

  const $ = (s) => document.querySelector(s);
  const find = (arr) => { for (const s of arr) { const el = $(s); if (el) return el; } return null; };

  // b) Layout flag: dùng đúng .call-active như CSS của bạn
  function lockLayout()    { document.body.classList.add('call-active'); }
  function restoreLayout() { document.body.classList.remove('call-active'); }

  // c) Show/Hide modal tiện dụng
  function show(el) {
    if (!el) return false;
    // Ép full màn hình nếu UI sẵn chưa set
    el.style.position = el.style.position || 'fixed';
    el.style.inset = el.style.inset || '0';
    el.style.zIndex = el.style.zIndex || '99999';
    // Ưu tiên cơ chế Tailwind .hidden/.flex
    el.classList.remove('hidden');
    if (getComputedStyle(el).display === 'none') {
      el.style.display = 'flex';
      el.style.alignItems = el.style.alignItems || 'center';
      el.style.justifyContent = el.style.justifyContent || 'center';
    }
    return true;
  }
  function hide(el) {
    if (!el) return;
    el.classList.add('hidden');
    el.style.display = ''; // bỏ ép display về mặc định
  }

  // d) Đóng tất cả UI call + khôi phục layout + dừng timer
  function closeAllCallUIs() {
    hide(find(SELECTORS.voice));
    hide(find(SELECTORS.video));
    restoreLayout();
    if (window.stopCallTimer) { try { window.stopCallTimer(); } catch (e) {} }
  }

  // e) Mở call theo loại
  function openCall(type) {
    closeAllCallUIs(); // tránh chồng chéo
    const el = find(SELECTORS[type]);
    if (!show(el)) {
      console.warn('Không tìm thấy UI:', type, '→ kiểm tra id/class/data-attr của modal');
      return;
    }
    lockLayout();
    if (window.startCallTimer) {
      try {
        const targets = (type === 'voice')
          ? ['voiceCallDuration', 'callDuration']
          : ['videoCallDuration', 'callDuration'];
        window.startCallTimer(targets);
      } catch (e) {}
    }
  }

  // f) PUBLIC API — ép override các hàm cũ (kể cả inline onclick)
  window.startVoiceCall = function () { openCall('voice'); };
  window.startVideoCall = function () { openCall('video'); };
  window.endCall        = function () { closeAllCallUIs(); };     // nút “kết thúc”
  window.closeVoiceCall = function () { closeAllCallUIs(); };     // nếu UI cũ gọi tên này
  window.closeVideoCall = function () { closeAllCallUIs(); };

  // g) UX: ESC để thoát nhanh + auto bind các nút có data-action
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllCallUIs(); });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="close-voice"]'))  { e.preventDefault(); closeAllCallUIs(); }
    if (e.target.closest('[data-action="close-video"]'))  { e.preventDefault(); closeAllCallUIs(); }
    if (e.target.closest('[data-action="end-call"]'))     { e.preventDefault(); closeAllCallUIs(); }
  });
}); 
// ----- ĐẨY KHU VỰC NHẮN TIN THEO BỀ RỘNG PANEL -----
function reserveForInfoPanel() {
  const main  = document.getElementById('mainChatArea');
  const panel = document.getElementById('chatInfoPanel');
  if (!main || !panel) return;

  // Dọn sạch dấu vết cơ chế cũ để khỏi cộng dồn
  main.classList.remove('pr-[320px]');
  main.style.marginRight = '';
  main.style.paddingRight = '';

  // Nếu panel đang hiển thị -> áp padding-right đúng theo width thực tế
  const shown = getComputedStyle(panel).display !== 'none';
  if (shown) {
    const w = Math.ceil(panel.getBoundingClientRect().width || 320);
    main.style.paddingRight = w + 'px';
  }
}

// Luôn mở sẵn panel & áp layout ngay khi load
function pinInfoPanel() {
  const panel = document.getElementById('chatInfoPanel');
  if (!panel) return;
  panel.classList.remove('hidden');
  panel.classList.add('flex', 'open');
  reserveForInfoPanel();
}

// Khóa toggle: bấm “i / X” cũng chỉ giữ trạng thái mở
function toggleChatInfoPanel() { pinInfoPanel(); }

// Khởi tạo & lắng nghe resize để re-calc khi đổi viewport
document.addEventListener('DOMContentLoaded', pinInfoPanel);
window.addEventListener('resize', reserveForInfoPanel);
/* === SYNC HAMBURGER ICON WITH SIDEBAR STATE (Chat page fix) === */
(function syncHamburgerWithSidebar(){
  function els(){
    return {
      toggle: document.getElementById('menuToggle'),
      sidebar: document.getElementById('sidebar')
    };
  }
  function isCollapsed(sidebar){
    return !!sidebar && sidebar.classList.contains('sidebar-collapsed'); // true = ĐANG ĐÓNG
  }
  function sync(){
    const { toggle, sidebar } = els();
    if(!toggle || !sidebar) return;
    const open = !isCollapsed(sidebar);          // mở = không có class collapsed
    if (toggle.checked !== open) toggle.checked = open;  // OPEN => checked = true => icon X
    toggle.setAttribute('aria-expanded', String(open));
  }

  // Lần đầu
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else { sync(); }

  // Theo dõi mọi thay đổi class trên #sidebar (kể cả do code khác)
  const { sidebar } = els();
  if (sidebar) {
    new MutationObserver(sync).observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }

  // Nếu module khác broadcast hoặc đồng bộ giữa tab → vẫn sync
  window.addEventListener('sidebarToggle', sync);
  window.addEventListener('storage', (e)=> { if (e.key === 'sidebar-collapsed') sync(); });
})();
