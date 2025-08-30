  // Chat data with different users
        const chatData = {
            sarah: {
                name: 'Sarah Johnson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23ec4899\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3ESJ%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            michael: {
                name: 'Michael Chen',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%233b82f6\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EMC%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            emma: {
                name: 'Emma Wilson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%2310b981\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EEW%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 1 giờ trước',
                online: true
            },
            david: {
                name: 'David Rodriguez',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23f59e0b\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EDR%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 2 giờ trước',
                online: false
            },
            lisa: {
                name: 'Lisa Thompson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%238b5cf6\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3ELT%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 3 giờ trước',
                online: false
            },
            team: {
                name: 'Team Alpha',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'url(%23teamGrad)\'/%3E%3Cdefs%3E%3ClinearGradient id=\'teamGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%238b5cf6\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23ec4899\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'14\' font-weight=\'bold\'%3E👥%3C/text%3E%3C/svg%3E',
                status: '5 thành viên',
                online: true
            },
            james: {
                name: 'James Park',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23ef4444\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EJP%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 1 ngày trước',
                online: false
            },
            anna: {
                name: 'Anna Martinez',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23f97316\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EAM%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            kevin: {
                name: 'Kevin Lee',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%2306b6d4\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EKL%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            sophie: {
                name: 'Sophie Chen',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23d946ef\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3ESC%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 1 giờ trước',
                online: false
            },
            marketing: {
                name: 'Marketing Team',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'url(%23marketingGrad)\'/%3E%3Cdefs%3E%3ClinearGradient id=\'marketingGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23ec4899\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23f43f5e\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'14\' font-weight=\'bold\'%3E📢%3C/text%3E%3C/svg%3E',
                status: '12 thành viên',
                online: true
            },
            tom: {
                name: 'Tom Wilson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%2365a30d\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3ETW%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 3 giờ trước',
                online: false
            },
            rachel: {
                name: 'Rachel Green',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23059669\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3ERG%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            design: {
                name: 'Design Squad',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'url(%23designGrad)\'/%3E%3Cdefs%3E%3ClinearGradient id=\'designGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%236366f1\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:%239333ea\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'14\' font-weight=\'bold\'%3E🎨%3C/text%3E%3C/svg%3E',
                status: '8 thành viên',
                online: true
            },
            alexj: {
                name: 'Alex Johnson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23dc2626\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EAJ%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 6 giờ trước',
                online: false
            },
            maya: {
                name: 'Maya Patel',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23be185d\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EMP%3C/text%3E%3C/svg%3E',
                status: 'Đang hoạt động',
                online: true
            },
            family: {
                name: 'Gia đình',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'url(%23familyGrad)\'/%3E%3Cdefs%3E%3ClinearGradient id=\'familyGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23facc15\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23f97316\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'14\' font-weight=\'bold\'%3E🏠%3C/text%3E%3C/svg%3E',
                status: '4 thành viên',
                online: true
            },
            ben: {
                name: 'Ben Taylor',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'20\' fill=\'%23374151\'/%3E%3Ctext x=\'20\' y=\'26\' text-anchor=\'middle\' fill=\'white\' font-family=\'Arial\' font-size=\'16\' font-weight=\'bold\'%3EBT%3C/text%3E%3C/svg%3E',
                status: 'Hoạt động 2 ngày trước',
                online: false
            }
        };

        let currentUser = 'sarah';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            updateChatHeader();
        });

        function setupEventListeners() {
            // Chat item selection
            document.querySelectorAll('.chat-item').forEach(item => {
                item.addEventListener('click', () => selectChat(item));
            });

            // Message input
            const messageInput = document.getElementById('messageInput');
            messageInput.addEventListener('input', handleMessageInput);
            messageInput.addEventListener('keydown', handleKeyDown);

            // Send button
            document.getElementById('sendBtn').addEventListener('click', sendMessage);

            // Emoji button
            document.getElementById('emojiBtn').addEventListener('click', toggleEmojiPicker);

            // Chat info button
            document.getElementById('chatInfoBtn').addEventListener('click', showChatInfo);

            // Voice and video call buttons
            document.getElementById('voiceCallBtn').addEventListener('click', startVoiceCall);
            document.getElementById('videoCallBtn').addEventListener('click', startVideoCall);

            // Sidebar toggle for mobile
            document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

            // Close emoji picker when clicking outside
            document.addEventListener('click', function(e) {
                const emojiPicker = document.getElementById('emojiPicker');
                const emojiBtn = document.getElementById('emojiBtn');
                if (!emojiPicker.contains(e.target) && !emojiBtn.contains(e.target)) {
                    emojiPicker.classList.add('hidden');
                }
            });
        }

        function selectChat(item) {
            // Remove active class from all items
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            
            // Add active class to selected item
            item.classList.add('active');
            
            // Update current user
            currentUser = item.dataset.user;
            updateChatHeader();
            
            // Remove notification badges
            const badge = item.querySelector('.bg-red-500');
            if (badge) {
                badge.remove();
            }
            
            // Remove unread indicator
            const unreadDot = item.querySelector('.bg-blue-500');
            if (unreadDot) {
                unreadDot.remove();
            }
        }

        function updateChatHeader() {
            const user = chatData[currentUser];
            if (!user) return;

            document.getElementById('currentUserName').textContent = user.name;
            document.getElementById('currentUserAvatar').src = user.avatar;
            document.getElementById('currentUserStatus').textContent = user.status;
            document.getElementById('currentUserStatus').className = user.online ? 'text-sm text-green-500' : 'text-sm text-gray-500';
        }

        function handleMessageInput() {
            const messageInput = document.getElementById('messageInput');
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
        }

        function handleKeyDown(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        }

        function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const message = messageInput.value.trim();
            
            if (!message) return;
            
            // Create message element
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="message-bubble sent">
                        ${message}
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            // Add to messages container
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.appendChild(messageDiv);
            
            // Clear input
            messageInput.value = '';
            messageInput.style.height = 'auto';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate read receipt after a delay
            setTimeout(() => {
                const checkIcon = messageDiv.querySelector('.fa-check');
                if (checkIcon) {
                    checkIcon.className = 'fas fa-check-double text-blue-400 ml-1';
                }
            }, 1000);
        }

        function toggleEmojiPicker() {
            const emojiPicker = document.getElementById('emojiPicker');
            emojiPicker.classList.toggle('hidden');
        }

        function closeEmojiPicker() {
            document.getElementById('emojiPicker').classList.add('hidden');
        }

        function insertEmoji(emoji) {
            const messageInput = document.getElementById('messageInput');
            const cursorPos = messageInput.selectionStart;
            const textBefore = messageInput.value.substring(0, cursorPos);
            const textAfter = messageInput.value.substring(cursorPos);
            
            messageInput.value = textBefore + emoji + textAfter;
            messageInput.focus();
            messageInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
            
            handleMessageInput();
        }

        function showChatInfo() {
            const user = chatData[currentUser];
            if (!user) return;

            const infoPanel = document.getElementById('chatInfoPanel');
            infoPanel.className = 'w-80 bg-white border-l border-gray-200 flex flex-col';
            infoPanel.innerHTML = `
                <!-- Header -->
                <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="font-semibold text-gray-900">Thông tin đoạn chat</h3>
                    <button onclick="closeChatInfo()" class="p-1 hover:bg-gray-100 rounded-full">
                        <i class="fas fa-times text-gray-400"></i>
                    </button>
                </div>
                
                <!-- User Info -->
                <div class="p-6 text-center border-b border-gray-200">
                    <img src="${user.avatar}" alt="${user.name}" class="w-20 h-20 rounded-full mx-auto mb-3">
                    <h4 class="font-semibold text-gray-900 text-lg">${user.name}</h4>
                    <p class="text-sm text-gray-500">${user.status}</p>
                    
                    <!-- Quick Actions -->
                    <div class="flex justify-center space-x-4 mt-4">
                        <button onclick="startVoiceCall()" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-full">
                            <i class="fas fa-phone text-blue-500"></i>
                        </button>
                        <button onclick="startVideoCall()" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-full">
                            <i class="fas fa-video text-blue-500"></i>
                        </button>
                        <button class="p-3 bg-gray-100 hover:bg-gray-200 rounded-full">
                            <i class="fas fa-user-plus text-blue-500"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Options -->
                <div class="flex-1 overflow-y-auto">
                    <div class="p-4 space-y-2">
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-bell text-gray-600"></i>
                            <span class="text-gray-900">Tắt thông báo</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-search text-gray-600"></i>
                            <span class="text-gray-900">Tìm kiếm trong đoạn chat</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-palette text-gray-600"></i>
                            <span class="text-gray-900">Thay đổi chủ đề</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-thumbs-up text-gray-600"></i>
                            <span class="text-gray-900">Thay đổi emoji</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-user-friends text-gray-600"></i>
                            <span class="text-gray-900">Tạo nhóm với ${user.name}</span>
                        </button>
                    </div>
                    
                    <!-- Media & Files -->
                    <div class="p-4 border-t border-gray-200">
                        <h5 class="font-semibold text-gray-900 mb-3">File phương tiện, file và liên kết</h5>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-image text-gray-400"></i>
                            </div>
                            <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-file text-gray-400"></i>
                            </div>
                            <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-link text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Privacy & Support -->
                    <div class="p-4 border-t border-gray-200 space-y-2">
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-exclamation-triangle text-gray-600"></i>
                            <span class="text-gray-900">Báo cáo</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-ban text-red-500"></i>
                            <span class="text-red-500">Chặn</span>
                        </button>
                        
                        <button class="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-left">
                            <i class="fas fa-trash text-red-500"></i>
                            <span class="text-red-500">Xóa đoạn chat</span>
                        </button>
                    </div>
                </div>
            `;
        }

        function closeChatInfo() {
            document.getElementById('chatInfoPanel').className = 'w-80 bg-white border-l border-gray-200 hidden';
        }

        function startVoiceCall() {
            const user = chatData[currentUser];
            showToast(`Đang gọi ${user.name}...`, 'info');
            
            // Create call overlay
            const callOverlay = document.createElement('div');
            callOverlay.id = 'callOverlay';
            callOverlay.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center';
            callOverlay.innerHTML = `
                <div class="text-center text-white">
                    <img src="${user.avatar}" alt="${user.name}" class="w-32 h-32 rounded-full mx-auto mb-6">
                    <h3 class="text-2xl font-semibold mb-2">${user.name}</h3>
                    <p class="text-lg mb-8">Đang gọi...</p>
                    
                    <div class="flex justify-center space-x-6">
                        <button onclick="endCall()" class="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center">
                            <i class="fas fa-phone-slash text-white text-xl"></i>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(callOverlay);
        }

        let callState = {
            isVideoOn: true,
            isMicOn: true,
            isScreenSharing: false,
            callDuration: 0,
            callTimer: null
        };

        function startVideoCall() {
            const user = chatData[currentUser];
            showToast(`Đang gọi video ${user.name}...`, 'info');
            
            // Reset call state
            callState = {
                isVideoOn: true,
                isMicOn: true,
                isScreenSharing: false,
                callDuration: 0,
                callTimer: null
            };
            
            // Create video call overlay
            const callOverlay = document.createElement('div');
            callOverlay.id = 'callOverlay';
            callOverlay.className = 'fixed inset-0 bg-black z-50 flex flex-col';
            callOverlay.innerHTML = `
                <!-- Call Header -->
                <div class="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
                    <div class="flex items-center justify-between text-white">
                        <div class="flex items-center space-x-3">
                            <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full">
                            <div>
                                <h3 class="font-semibold">${user.name}</h3>
                                <p id="callDuration" class="text-sm text-gray-300">Đang kết nối...</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="minimizeCall()" class="p-2 hover:bg-white/20 rounded-full">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button onclick="toggleFullscreen()" class="p-2 hover:bg-white/20 rounded-full">
                                <i class="fas fa-expand"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Video Area -->
                <div class="flex-1 relative">
                    <!-- Remote Video -->
                    <div id="remoteVideo" class="w-full h-full bg-gray-900 flex items-center justify-center">
                        <div class="text-center text-white">
                            <img src="${user.avatar}" alt="${user.name}" class="w-48 h-48 rounded-full mx-auto mb-6">
                            <h3 class="text-3xl font-semibold mb-2">${user.name}</h3>
                            <p class="text-xl">Đang kết nối...</p>
                        </div>
                    </div>
                    
                    <!-- Local Video -->
                    <div id="localVideo" class="absolute top-6 right-6 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20 cursor-move">
                        <div class="w-full h-full flex items-center justify-center text-white">
                            <div class="text-center">
                                <i class="fas fa-user text-4xl mb-2"></i>
                                <p class="text-xs">Bạn</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Screen Share Indicator -->
                    <div id="screenShareIndicator" class="absolute top-6 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm hidden">
                        <i class="fas fa-desktop mr-2"></i>
                        Đang chia sẻ màn hình
                    </div>
                    
                    <!-- Participants Panel -->
                    <div id="participantsPanel" class="absolute top-20 left-6 bg-black/70 rounded-lg p-4 text-white hidden">
                        <h4 class="font-semibold mb-3">Người tham gia (2)</h4>
                        <div class="space-y-2">
                            <div class="flex items-center space-x-2">
                                <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full">
                                <span class="text-sm">${user.name}</span>
                                <i class="fas fa-microphone text-green-400 text-xs"></i>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span class="text-xs font-bold">You</span>
                                </div>
                                <span class="text-sm">Bạn</span>
                                <i id="yourMicStatus" class="fas fa-microphone text-green-400 text-xs"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Controls -->
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <div class="flex justify-center items-center space-x-4">
                        <!-- Mic Toggle -->
                        <button id="micToggle" onclick="toggleMic()" class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-microphone text-white"></i>
                        </button>
                        
                        <!-- Video Toggle -->
                        <button id="videoToggle" onclick="toggleVideo()" class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-video text-white"></i>
                        </button>
                        
                        <!-- Screen Share -->
                        <button id="screenShareToggle" onclick="toggleScreenShare()" class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-desktop text-white"></i>
                        </button>
                        
                        <!-- More Options -->
                        <div class="relative">
                            <button onclick="toggleCallOptions()" class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                                <i class="fas fa-ellipsis-h text-white"></i>
                            </button>
                            
                            <!-- Options Menu -->
                            <div id="callOptionsMenu" class="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg py-2 min-w-48 hidden">
                                <button onclick="toggleParticipants()" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2">
                                    <i class="fas fa-users text-gray-600"></i>
                                    <span>Hiện người tham gia</span>
                                </button>
                                <button onclick="openChat()" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2">
                                    <i class="fas fa-comment text-gray-600"></i>
                                    <span>Mở chat</span>
                                </button>
                                <button onclick="recordCall()" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2">
                                    <i class="fas fa-record-vinyl text-gray-600"></i>
                                    <span>Ghi âm cuộc gọi</span>
                                </button>
                                <button onclick="takeSnapshot()" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2">
                                    <i class="fas fa-camera text-gray-600"></i>
                                    <span>Chụp ảnh màn hình</span>
                                </button>
                                <hr class="my-1">
                                <button onclick="reportIssue()" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-red-600">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>Báo cáo sự cố</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- End Call -->
                        <button onclick="endCall()" class="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-phone-slash text-white text-xl"></i>
                        </button>
                        
                        <!-- Add Participant -->
                        <button onclick="addParticipant()" class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-user-plus text-white"></i>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(callOverlay);
            
            // Start call timer after 2 seconds (simulate connection)
            setTimeout(() => {
                startCallTimer();
                document.getElementById('callDuration').textContent = '00:00';
            }, 2000);
            
            // Make local video draggable
            makeDraggable(document.getElementById('localVideo'));
        }

        function endCall() {
            const overlay = document.getElementById('callOverlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Clear call timer
            if (callState.callTimer) {
                clearInterval(callState.callTimer);
                callState.callTimer = null;
            }
            
            showToast('Cuộc gọi đã kết thúc', 'info');
        }

        function toggleMic() {
            callState.isMicOn = !callState.isMicOn;
            const micToggle = document.getElementById('micToggle');
            const yourMicStatus = document.getElementById('yourMicStatus');
            
            if (callState.isMicOn) {
                micToggle.className = 'w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors';
                micToggle.innerHTML = '<i class="fas fa-microphone text-white"></i>';
                if (yourMicStatus) yourMicStatus.className = 'fas fa-microphone text-green-400 text-xs';
                showToast('Đã bật microphone', 'success');
            } else {
                micToggle.className = 'w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors';
                micToggle.innerHTML = '<i class="fas fa-microphone-slash text-white"></i>';
                if (yourMicStatus) yourMicStatus.className = 'fas fa-microphone-slash text-red-400 text-xs';
                showToast('Đã tắt microphone', 'error');
            }
        }

        function toggleVideo() {
            callState.isVideoOn = !callState.isVideoOn;
            const videoToggle = document.getElementById('videoToggle');
            const localVideo = document.getElementById('localVideo');
            
            if (callState.isVideoOn) {
                videoToggle.className = 'w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors';
                videoToggle.innerHTML = '<i class="fas fa-video text-white"></i>';
                localVideo.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white">
                        <div class="text-center">
                            <i class="fas fa-user text-4xl mb-2"></i>
                            <p class="text-xs">Bạn</p>
                        </div>
                    </div>
                `;
                showToast('Đã bật camera', 'success');
            } else {
                videoToggle.className = 'w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors';
                videoToggle.innerHTML = '<i class="fas fa-video-slash text-white"></i>';
                localVideo.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-white bg-gray-900">
                        <div class="text-center">
                            <i class="fas fa-video-slash text-4xl mb-2"></i>
                            <p class="text-xs">Camera đã tắt</p>
                        </div>
                    </div>
                `;
                showToast('Đã tắt camera', 'error');
            }
        }

        function toggleScreenShare() {
            callState.isScreenSharing = !callState.isScreenSharing;
            const screenShareToggle = document.getElementById('screenShareToggle');
            const screenShareIndicator = document.getElementById('screenShareIndicator');
            const remoteVideo = document.getElementById('remoteVideo');
            
            if (callState.isScreenSharing) {
                screenShareToggle.className = 'w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors';
                screenShareIndicator.classList.remove('hidden');
                
                // Simulate screen sharing view
                remoteVideo.innerHTML = `
                    <div class="w-full h-full bg-blue-900 flex items-center justify-center relative">
                        <div class="text-center text-white">
                            <i class="fas fa-desktop text-6xl mb-4"></i>
                            <h3 class="text-2xl font-semibold mb-2">Đang chia sẻ màn hình</h3>
                            <p class="text-lg">Màn hình của bạn đang được chia sẻ</p>
                        </div>
                        <div class="absolute top-4 right-4 bg-black/50 rounded-lg p-2">
                            <p class="text-white text-sm">1920x1080</p>
                        </div>
                    </div>
                `;
                showToast('Đã bắt đầu chia sẻ màn hình', 'success');
            } else {
                screenShareToggle.className = 'w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors';
                screenShareIndicator.classList.add('hidden');
                
                // Return to normal video view
                const user = chatData[currentUser];
                remoteVideo.innerHTML = `
                    <div class="text-center text-white">
                        <img src="${user.avatar}" alt="${user.name}" class="w-48 h-48 rounded-full mx-auto mb-6">
                        <h3 class="text-3xl font-semibold mb-2">${user.name}</h3>
                        <p class="text-xl">Đang trong cuộc gọi</p>
                    </div>
                `;
                showToast('Đã dừng chia sẻ màn hình', 'info');
            }
        }

        function toggleCallOptions() {
            const menu = document.getElementById('callOptionsMenu');
            menu.classList.toggle('hidden');
        }

        function toggleParticipants() {
            const panel = document.getElementById('participantsPanel');
            panel.classList.toggle('hidden');
            toggleCallOptions();
        }

        function openChat() {
            // Create chat overlay during call
            const chatOverlay = document.createElement('div');
            chatOverlay.id = 'callChatOverlay';
            chatOverlay.className = 'fixed top-20 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-60 flex flex-col';
            chatOverlay.innerHTML = `
                <div class="p-3 border-b border-gray-200 flex items-center justify-between">
                    <h4 class="font-semibold">Chat trong cuộc gọi</h4>
                    <button onclick="closeCallChat()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto p-3 space-y-2">
                    <div class="text-center text-gray-500 text-sm">
                        Bắt đầu trò chuyện trong cuộc gọi
                    </div>
                </div>
                <div class="p-3 border-t border-gray-200">
                    <div class="flex space-x-2">
                        <input type="text" placeholder="Nhập tin nhắn..." class="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(chatOverlay);
            toggleCallOptions();
        }

        function closeCallChat() {
            const overlay = document.getElementById('callChatOverlay');
            if (overlay) overlay.remove();
        }

        function recordCall() {
            showToast('Đã bắt đầu ghi âm cuộc gọi', 'success');
            toggleCallOptions();
        }

        function takeSnapshot() {
            showToast('Đã chụp ảnh màn hình', 'success');
            toggleCallOptions();
        }

        function reportIssue() {
            showToast('Đã gửi báo cáo sự cố', 'info');
            toggleCallOptions();
        }

        function addParticipant() {
            showToast('Tính năng thêm người tham gia sẽ có sớm', 'info');
        }

        function minimizeCall() {
            const overlay = document.getElementById('callOverlay');
            overlay.style.transform = 'scale(0.3)';
            overlay.style.transformOrigin = 'bottom right';
            overlay.style.width = '300px';
            overlay.style.height = '200px';
            overlay.style.position = 'fixed';
            overlay.style.bottom = '20px';
            overlay.style.right = '20px';
            overlay.style.top = 'auto';
            overlay.style.left = 'auto';
        }

        function toggleFullscreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.getElementById('callOverlay').requestFullscreen();
            }
        }

        function startCallTimer() {
            callState.callTimer = setInterval(() => {
                callState.callDuration++;
                const minutes = Math.floor(callState.callDuration / 60);
                const seconds = callState.callDuration % 60;
                const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                const durationElement = document.getElementById('callDuration');
                if (durationElement) {
                    durationElement.textContent = timeString;
                }
            }, 1000);
        }

        function makeDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            
            element.onmousedown = dragMouseDown;
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }
            
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
        }

        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium ${
                type === 'success' ? 'bg-green-500' : 
                type === 'error' ? 'bg-red-500' : 
                'bg-blue-500'
            }`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        function showNewChatModal() {
            const modal = document.createElement('div');
            modal.id = 'newChatModal';
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
            modal.innerHTML = `
                <div class="bg-white rounded-lg w-96 max-h-96 flex flex-col">
                    <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 class="font-semibold text-lg">Tạo đoạn chat mới</h3>
                        <button onclick="closeNewChatModal()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="p-4">
                        <div class="mb-4">
                            <input type="text" id="newChatSearch" placeholder="Nhập tên hoặc số điện thoại..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        
                        <div class="space-y-2 max-h-48 overflow-y-auto">
                            <h4 class="text-sm font-medium text-gray-700 mb-2">Gợi ý</h4>
                            
                            <div class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer" onclick="createNewChat('alex', 'Alex Thompson', '#10b981')">
                                <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-sm">AT</span>
                                </div>
                                <div>
                                    <p class="font-medium">Alex Thompson</p>
                                    <p class="text-sm text-gray-500">Đang hoạt động</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer" onclick="createNewChat('maria', 'Maria Garcia', '#f59e0b')">
                                <div class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-sm">MG</span>
                                </div>
                                <div>
                                    <p class="font-medium">Maria Garcia</p>
                                    <p class="text-sm text-gray-500">Hoạt động 5 phút trước</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer" onclick="createNewChat('ryan', 'Ryan Kim', '#8b5cf6')">
                                <div class="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
                                    <span class="text-white font-bold text-sm">RK</span>
                                </div>
                                <div>
                                    <p class="font-medium">Ryan Kim</p>
                                    <p class="text-sm text-gray-500">Hoạt động 1 giờ trước</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer" onclick="createNewGroup()">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <i class="fas fa-users text-white"></i>
                                </div>
                                <div>
                                    <p class="font-medium">Tạo nhóm mới</p>
                                    <p class="text-sm text-gray-500">Tạo nhóm chat với nhiều người</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

        function closeNewChatModal() {
            const modal = document.getElementById('newChatModal');
            if (modal) modal.remove();
        }

        function createNewChat(userId, userName, color) {
            // Add new chat to sidebar
            const chatList = document.querySelector('.flex-1.overflow-y-auto.custom-scrollbar');
            const newChatItem = document.createElement('div');
            newChatItem.className = 'chat-item p-3 cursor-pointer';
            newChatItem.dataset.user = userId;
            newChatItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center" style="background-color: ${color}">
                            <span class="text-white font-bold text-lg">${userName.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div class="online-dot"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 truncate">${userName}</h3>
                            <span class="text-xs text-gray-500">Vừa xong</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-gray-600 truncate">Bắt đầu cuộc trò chuyện...</p>
                        </div>
                    </div>
                </div>
            `;
            
            // Add to chat data
            chatData[userId] = {
                name: userName,
                avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-family='Arial' font-size='16' font-weight='bold'%3E${userName.split(' ').map(n => n[0]).join('')}%3C/text%3E%3C/svg%3E`,
                status: 'Đang hoạt động',
                online: true
            };
            
            // Insert at top of chat list
            chatList.insertBefore(newChatItem, chatList.firstChild);
            
            // Add event listener
            newChatItem.addEventListener('click', () => selectChat(newChatItem));
            
            // Select the new chat
            selectChat(newChatItem);
            
            closeNewChatModal();
            showToast(`Đã tạo đoạn chat với ${userName}`, 'success');
        }

        function createNewGroup() {
            closeNewChatModal();
            showToast('Tính năng tạo nhóm sẽ có sớm', 'info');
        }

        function toggleAttachmentMenu() {
            const menu = document.getElementById('attachmentMenu');
            menu.classList.toggle('hidden');
        }

        function attachFile(type) {
            toggleAttachmentMenu();
            
            switch(type) {
                case 'image':
                    sendImageMessage();
                    break;
                case 'document':
                    sendDocumentMessage();
                    break;
                case 'audio':
                    sendAudioMessage();
                    break;
                case 'location':
                    sendLocationMessage();
                    break;
                case 'contact':
                    sendContactMessage();
                    break;
                case 'poll':
                    createPoll();
                    break;
            }
        }

        function sendImageMessage() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="image-message">
                        <div class="w-64 h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <div class="text-center text-white">
                                <i class="fas fa-image text-4xl mb-2"></i>
                                <p class="text-sm">Sunset_Beach.jpg</p>
                            </div>
                        </div>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã gửi ảnh', 'success');
        }

        function sendDocumentMessage() {
            const documents = [
                { name: 'Presentation.pptx', size: '3.2 MB', icon: 'fas fa-file-powerpoint', color: 'bg-orange-500' },
                { name: 'Report.docx', size: '1.8 MB', icon: 'fas fa-file-word', color: 'bg-blue-500' },
                { name: 'Spreadsheet.xlsx', size: '2.1 MB', icon: 'fas fa-file-excel', color: 'bg-green-500' },
                { name: 'Archive.zip', size: '5.4 MB', icon: 'fas fa-file-archive', color: 'bg-gray-500' }
            ];
            
            const randomDoc = documents[Math.floor(Math.random() * documents.length)];
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="file-message sent">
                        <div class="file-icon ${randomDoc.color} text-white">
                            <i class="${randomDoc.icon}"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-white">${randomDoc.name}</p>
                            <p class="text-xs text-gray-200">${randomDoc.size}</p>
                        </div>
                        <button class="p-2 hover:bg-white/20 rounded-full">
                            <i class="fas fa-download text-white"></i>
                        </button>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã gửi tài liệu', 'success');
        }

        function sendAudioMessage() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="voice-message sent">
                        <button class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-play text-white text-xs"></i>
                        </button>
                        <div class="voice-waveform">
                            <div class="wave-bar" style="height: 8px; animation-delay: 0s;"></div>
                            <div class="wave-bar" style="height: 12px; animation-delay: 0.1s;"></div>
                            <div class="wave-bar" style="height: 6px; animation-delay: 0.2s;"></div>
                            <div class="wave-bar" style="height: 14px; animation-delay: 0.3s;"></div>
                            <div class="wave-bar" style="height: 10px; animation-delay: 0.4s;"></div>
                            <div class="wave-bar" style="height: 8px; animation-delay: 0.5s;"></div>
                            <div class="wave-bar" style="height: 12px; animation-delay: 0.6s;"></div>
                        </div>
                        <span class="text-xs text-white">0:23</span>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã gửi tin nhắn thoại', 'success');
        }

        function sendLocationMessage() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="max-w-xs">
                        <div class="bg-gray-100 rounded-lg overflow-hidden">
                            <div class="h-32 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                                <i class="fas fa-map-marker-alt text-white text-3xl"></i>
                            </div>
                            <div class="p-3">
                                <p class="font-medium text-gray-900">Vị trí hiện tại</p>
                                <p class="text-sm text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
                            </div>
                        </div>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã chia sẻ vị trí', 'success');
        }

        function sendContactMessage() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                <span class="text-white font-bold">JD</span>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">John Doe</p>
                                <p class="text-sm text-gray-600">+84 123 456 789</p>
                            </div>
                        </div>
                        <button class="w-full mt-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Thêm vào danh bạ
                        </button>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã chia sẻ danh bạ', 'success');
        }

        function createPoll() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-xs">
                        <div class="flex items-center space-x-2 mb-3">
                            <i class="fas fa-poll text-blue-500"></i>
                            <h4 class="font-medium text-gray-900">Bình chọn</h4>
                        </div>
                        <p class="text-gray-900 mb-3">Chúng ta nên họp lúc nào?</p>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                                <span class="text-sm">9:00 AM</span>
                                <span class="text-xs text-gray-500">0 phiếu</span>
                            </div>
                            <div class="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                                <span class="text-sm">2:00 PM</span>
                                <span class="text-xs text-gray-500">0 phiếu</span>
                            </div>
                            <div class="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                                <span class="text-sm">4:00 PM</span>
                                <span class="text-xs text-gray-500">0 phiếu</span>
                            </div>
                        </div>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast('Đã tạo bình chọn', 'success');
        }

        function takePhoto() {
            showToast('Tính năng chụp ảnh sẽ có sớm', 'info');
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
            const fileType = file.type.split('/')[0];
            const fileName = file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(1) + ' MB';
            
            let icon = 'fas fa-file';
            let color = 'bg-gray-500';
            
            if (fileType === 'image') {
                icon = 'fas fa-image';
                color = 'bg-green-500';
            } else if (fileType === 'video') {
                icon = 'fas fa-video';
                color = 'bg-red-500';
            } else if (fileType === 'audio') {
                icon = 'fas fa-music';
                color = 'bg-purple-500';
            } else if (fileName.endsWith('.pdf')) {
                icon = 'fas fa-file-pdf';
                color = 'bg-red-500';
            } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                icon = 'fas fa-file-word';
                color = 'bg-blue-500';
            } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
                icon = 'fas fa-file-excel';
                color = 'bg-green-500';
            } else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
                icon = 'fas fa-file-powerpoint';
                color = 'bg-orange-500';
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col space-y-1 items-end">
                    <div class="file-message sent">
                        <div class="file-icon ${color} text-white">
                            <i class="${icon}"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-white">${fileName}</p>
                            <p class="text-xs text-gray-200">${fileSize}</p>
                        </div>
                        <button class="p-2 hover:bg-white/20 rounded-full">
                            <i class="fas fa-download text-white"></i>
                        </button>
                    </div>
                    <div class="message-status sent">
                        Vừa xong <i class="fas fa-check text-gray-400 ml-1"></i>
                    </div>
                </div>
            `;
            
            addMessageToChat(messageDiv);
            showToast(`Đã gửi ${fileName}`, 'success');
        }

        function addMessageToChat(messageDiv) {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate read receipt after a delay
            setTimeout(() => {
                const checkIcon = messageDiv.querySelector('.fa-check');
                if (checkIcon) {
                    checkIcon.className = 'fas fa-check-double text-blue-400 ml-1';
                }
            }, 1000);
        }

        // Close attachment menu when clicking outside
        document.addEventListener('click', function(e) {
            const attachmentMenu = document.getElementById('attachmentMenu');
            const attachmentBtn = e.target.closest('[onclick="toggleAttachmentMenu()"]');
            
            if (attachmentMenu && !attachmentMenu.contains(e.target) && !attachmentBtn) {
                attachmentMenu.classList.add('hidden');
            }
        });
        
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
