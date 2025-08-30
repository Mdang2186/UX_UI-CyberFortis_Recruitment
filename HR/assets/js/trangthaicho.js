 // Filter functions
        function toggleScoreFilter() {
            const dropdown = document.getElementById('scoreFilterDropdown');
            const menu = document.getElementById('scoreFilterMenu');
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function togglePositionFilter() {
            const dropdown = document.getElementById('positionFilterDropdown');
            const menu = document.getElementById('positionFilterMenu');
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function toggleWaitingFilter() {
            const dropdown = document.getElementById('waitingFilterDropdown');
            const menu = document.getElementById('waitingFilterMenu');
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function setScoreFilter(score) {
            document.querySelectorAll('#scoreFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            const scoreNames = {
                all: 'Tất cả điểm số',
                excellent: 'Xuất sắc (8.5-10)',
                good: 'Tốt (7.0-8.4)',
                average: 'Trung bình (5.5-6.9)',
                poor: 'Yếu (< 5.5)'
            };
            document.getElementById('selectedScore').textContent = scoreNames[score];
            filterTableByScore(score);
            document.getElementById('scoreFilterDropdown').classList.remove('active');
            document.getElementById('scoreFilterMenu').classList.remove('show');
        }

        function setPositionFilter(position) {
            document.querySelectorAll('#positionFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            const positionNames = {
                all: 'Tất cả vị trí',
                frontend: 'Frontend',
                backend: 'Backend',
                uiux: 'UI/UX',
                fullstack: 'Fullstack'
            };
            document.getElementById('selectedPosition').textContent = positionNames[position];
            filterTableByPosition(position);
            document.getElementById('positionFilterDropdown').classList.remove('active');
            document.getElementById('positionFilterMenu').classList.remove('show');
        }

        function setWaitingFilter(waiting) {
            document.querySelectorAll('#waitingFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            const waitingNames = {
                all: 'Tất cả thời gian chờ',
                urgent: 'Khẩn cấp (> 7 ngày)',
                warning: 'Cảnh báo (4-7 ngày)',
                normal: 'Bình thường (< 4 ngày)'
            };
            document.getElementById('selectedWaiting').textContent = waitingNames[waiting];
            filterTableByWaiting(waiting);
            document.getElementById('waitingFilterDropdown').classList.remove('active');
            document.getElementById('waitingFilterMenu').classList.remove('show');
        }

        // Đóng dropdown khi click ngoài
        document.addEventListener('click', function(event) {
            // Score filter
            const scoreDropdown = document.getElementById('scoreFilterDropdown');
            const scoreMenu = document.getElementById('scoreFilterMenu');
            if (scoreDropdown && !scoreDropdown.contains(event.target)) {
                scoreDropdown.classList.remove('active');
                scoreMenu.classList.remove('show');
            }
            // Position filter
            const positionDropdown = document.getElementById('positionFilterDropdown');
            const positionMenu = document.getElementById('positionFilterMenu');
            if (positionDropdown && !positionDropdown.contains(event.target)) {
                positionDropdown.classList.remove('active');
                positionMenu.classList.remove('show');
            }
            // Waiting filter
            const waitingDropdown = document.getElementById('waitingFilterDropdown');
            const waitingMenu = document.getElementById('waitingFilterMenu');
            if (waitingDropdown && !waitingDropdown.contains(event.target)) {
                waitingDropdown.classList.remove('active');
                waitingMenu.classList.remove('show');
            }
        });

        function filterTableByScore(score) {
            const rows = document.querySelectorAll('.candidates-table tbody tr');
            
            rows.forEach(row => {
                const scoreElement = row.querySelector('.score-value');
                let showRow = score === 'all';
                
                if (!showRow && scoreElement) {
                    const scoreValue = parseFloat(scoreElement.textContent);
                    
                    switch(score) {
                        case 'excellent':
                            showRow = scoreValue >= 8.5;
                            break;
                        case 'good':
                            showRow = scoreValue >= 7.0 && scoreValue < 8.5;
                            break;
                        case 'average':
                            showRow = scoreValue >= 5.5 && scoreValue < 7.0;
                            break;
                        case 'poor':
                            showRow = scoreValue < 5.5;
                            break;
                    }
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        function filterTableByPosition(position) {
            const rows = document.querySelectorAll('.candidates-table tbody tr');
            
            rows.forEach(row => {
                const positionElement = row.querySelector('.position-badge');
                let showRow = position === 'all';
                
                if (!showRow && positionElement) {
                    const rowPosition = positionElement.classList.contains('frontend') ? 'frontend' :
                                       positionElement.classList.contains('backend') ? 'backend' :
                                       positionElement.classList.contains('uiux') ? 'uiux' :
                                       positionElement.classList.contains('fullstack') ? 'fullstack' : 'other';
                    
                    showRow = rowPosition === position;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        function filterTableByWaiting(waiting) {
            const rows = document.querySelectorAll('.candidates-table tbody tr');
            
            rows.forEach(row => {
                const waitingElement = row.querySelector('.waiting-days');
                let showRow = waiting === 'all';
                
                if (!showRow && waitingElement) {
                    const waitingClass = waitingElement.classList.contains('urgent') ? 'urgent' :
                                        waitingElement.classList.contains('warning') ? 'warning' : 'normal';
                    
                    showRow = waitingClass === waiting;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        function searchCandidates(searchTerm) {
            const rows = document.querySelectorAll('.candidates-table tbody tr');
            const term = searchTerm.toLowerCase().trim();
            
            rows.forEach(row => {
                const candidateName = row.querySelector('.candidate-details h4').textContent.toLowerCase();
                const candidateEmail = row.querySelector('.candidate-details p').textContent.toLowerCase();
                const position = row.querySelector('.position-badge').textContent.toLowerCase();
                
                const shouldShow = term === '' || 
                    candidateName.includes(term) || 
                    candidateEmail.includes(term) || 
                    position.includes(term);
                
                row.style.display = shouldShow ? '' : 'none';
            });
        }

        // Action functions
        function viewEvaluation(candidateName) {
            // Update modal content with candidate data
            document.getElementById('candidateName').textContent = candidateName;
            document.getElementById('evaluationModal').classList.add('show');
        }

        function viewCV(candidateName) {
            alert(`Đang mở CV của ${candidateName}...`);
            // Here you would implement CV viewing functionality
        }

        function scheduleInterview(candidateName) {
            // Update modal content with candidate data
            document.getElementById('scheduleCandidate').textContent = candidateName;
            document.getElementById('scheduleModal').classList.add('show');
        }

        function scheduleFromEvaluation() {
            const candidateName = document.getElementById('candidateName').textContent;
            closeModal('evaluationModal');
            scheduleInterview(candidateName);
        }

        function confirmSchedule() {
            alert('Đã xếp lịch phỏng vấn vòng 2 thành công! Email thông báo đã được gửi cho ứng viên.');
            closeModal('scheduleModal');
        }

        function closeModal(modalId, event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById(modalId).classList.remove('show');
        }

        function exportPendingData() {
            alert('Đang xuất báo cáo trạng thái chờ...');
        }

        function bulkSchedule() {
            alert('Mở công cụ xếp lịch hàng loạt...');
        }
        
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
