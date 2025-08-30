// Sample data for different dates

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

        const timelineData = {
            '2024-12-03': [
                {
                    time: '09:00',
                    candidate: 'Hoàng Thị Lan',
                    position: 'Frontend Developer',
                    interviewer: 'Trần Minh Tuấn',
                    status: 'scheduled'
                },
                {
                    time: '14:00',
                    candidate: 'Nguyễn Văn Bình',
                    position: 'Backend Developer',
                    interviewer: 'Lê Thị Hoa',
                    status: 'completed'
                }
            ],
            '2024-12-05': [
                {
                    time: '10:00',
                    candidate: 'Trần Thị Cúc',
                    position: 'UI/UX Designer',
                    interviewer: 'Võ Minh Khang',
                    status: 'scheduled'
                }
            ],
            '2024-12-10': [
                {
                    time: '09:00',
                    candidate: 'Lê Văn Đức',
                    position: 'Product Manager',
                    interviewer: 'Nguyễn Đức Nam',
                    status: 'scheduled'
                },
                {
                    time: '11:00',
                    candidate: 'Phạm Thị Hương',
                    position: 'Frontend Developer',
                    interviewer: 'Trần Minh Tuấn',
                    status: 'scheduled'
                },
                {
                    time: '15:00',
                    candidate: 'Võ Văn Kiên',
                    position: 'DevOps Engineer',
                    interviewer: 'Lê Thị Hoa',
                    status: 'completed'
                }
            ],
            '2024-12-12': [
                {
                    time: '09:00',
                    candidate: 'Nguyễn Văn An',
                    position: 'Frontend Developer',
                    interviewer: 'Trần Minh Tuấn',
                    status: 'scheduled'
                },
                {
                    time: '10:30',
                    candidate: 'Lê Thị Mai',
                    position: 'UI/UX Designer',
                    interviewer: 'Lê Thị Hoa',
                    status: 'completed'
                },
                {
                    time: '14:00',
                    candidate: 'Trần Thị Bình',
                    position: 'Product Manager',
                    interviewer: 'Võ Minh Khang',
                    status: 'scheduled'
                },
                {
                    time: '16:00',
                    candidate: 'Lê Minh Cường',
                    position: 'Backend Developer',
                    interviewer: 'Nguyễn Đức Nam',
                    status: 'scheduled'
                },
                {
                    time: '17:30',
                    candidate: 'Phạm Văn Đức',
                    position: 'Fullstack Developer',
                    interviewer: 'Trần Minh Tuấn',
                    status: 'scheduled'
                }
            ],
            '2024-12-18': [
                {
                    time: '10:00',
                    candidate: 'Nguyễn Thị Oanh',
                    position: 'QA Tester',
                    interviewer: 'Võ Minh Khang',
                    status: 'cancelled'
                }
            ]
        };

        function selectDate(dateStr) {
            // Remove previous selection
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            
            // Add selection to clicked date
            event.target.classList.add('selected');
            
            // Update date display
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString('vi-VN');
            document.getElementById('timeline-date').innerHTML = `
                <i class="fas fa-calendar"></i>
                ${formattedDate}
            `;
            
            // Update timeline
            updateTimeline(dateStr);
        }

        function updateTimeline(dateStr) {
            const timelineContainer = document.getElementById('timeline-content');
            const interviews = timelineData[dateStr] || [];
            
            if (interviews.length === 0) {
                timelineContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: #64748b;">
                        <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                        <div>Không có phỏng vấn nào trong ngày này</div>
                    </div>
                `;
                return;
            }
            
            timelineContainer.innerHTML = interviews.map(interview => `
                <div class="timeline-item">
                    <div class="timeline-time ${interview.status}">${interview.time}</div>
                    <div class="timeline-details ${interview.status}">
                        <div class="timeline-candidate">${interview.candidate}</div>
                        <div class="timeline-position">${interview.position}</div>
                        <div class="timeline-meta">
                            <div class="timeline-interviewer">${interview.interviewer}</div>
                            <div class="timeline-status ${interview.status}">
                                ${getStatusText(interview.status)}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function getStatusText(status) {
            const statusMap = {
                'scheduled': 'Đã lên lịch',
                'completed': 'Hoàn thành',
                'cancelled': 'Đã hủy',
                'in-progress': 'Đang diễn ra'
            };
            return statusMap[status] || status;
        }

        function changeMonth(direction) {
            // Here you would implement month navigation
            console.log(`Changing month by: ${direction}`);
        }

        // Dropdown functions
        function toggleDropdown() {
            const dropdown = document.querySelector('.dropdown');
            const menu = document.getElementById('dropdownMenu');
            
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.querySelector('.dropdown');
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
                document.getElementById('dropdownMenu').classList.remove('show');
            }
        });

        function setTimeFilter(filter) {
            // Remove active class from all dropdown items
            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            console.log(`Setting time filter to: ${filter}`);
            // Here you would filter the data based on the selected time filter
            updateTimelineData(filter);
        }

        function setPositionFilter(position) {
            // Remove active class from all filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            console.log(`Setting position filter to: ${position}`);
            // Here you would filter the interview data based on the selected position
            filterInterviewsByPosition(position);
        }

        function changePositionTimeRange(range) {
            // Remove active class from all time buttons
            document.querySelectorAll('.position-trends-chart .time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            console.log(`Changing position time range to: ${range}`);
            // Here you would update the chart data based on the selected time range
            updatePositionTrendsChart(range);
        }

        function updatePositionTrendsChart(range) {
            // Sample data for different time ranges
            const chartData = {
                month: {
                    labels: ['T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    title: 'Xu hướng theo tháng',
                    data: {
                        frontend: [30, 35, 28, 42, 38, 45, 40],
                        backend: [25, 30, 32, 28, 35, 30, 33],
                        uiux: [20, 18, 22, 25, 20, 23, 25],
                        fullstack: [15, 20, 18, 22, 25, 20, 22],
                        devops: [10, 12, 15, 18, 15, 17, 20]
                    }
                },
                quarter: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    title: 'Xu hướng theo quý',
                    data: {
                        frontend: [93, 105, 123, 85],
                        backend: [87, 95, 98, 90],
                        uiux: [60, 67, 68, 70],
                        fullstack: [53, 65, 67, 62],
                        devops: [37, 45, 50, 52]
                    }
                },
                year: {
                    labels: ['2021', '2022', '2023', '2024'],
                    title: 'Xu hướng theo năm',
                    data: {
                        frontend: [280, 320, 380, 406],
                        backend: [250, 290, 340, 370],
                        uiux: [180, 220, 250, 265],
                        fullstack: [150, 200, 230, 247],
                        devops: [100, 140, 170, 184]
                    }
                }
            };
            
            // Update chart title
            const chartTitle = document.querySelector('.position-trends-chart .chart-title');
            chartTitle.textContent = chartData[range]?.title || 'Xu hướng theo vị trí';
            
            // Update X-axis labels
            const xAxisLabels = document.getElementById('xAxisLabels');
            xAxisLabels.innerHTML = chartData[range].labels.map(label => 
                `<span style="font-size: 11px; color: #64748b; font-weight: 600;">${label}</span>`
            ).join('');
            
            // Update chart lines and points
            updateChartVisualization(chartData[range]);
            
            console.log(`Updated position trends chart with ${range} data:`, chartData[range]);
        }

        function updateChartVisualization(data) {
            const chartLines = document.getElementById('chartLines');
            const chartPoints = document.getElementById('chartPoints');
            
            // Clear existing content
            chartLines.innerHTML = '';
            chartPoints.innerHTML = '';
            
            const colors = {
                frontend: '#3b82f6',
                backend: '#10b981',
                uiux: '#f59e0b',
                fullstack: '#8b5cf6',
                devops: '#ef4444'
            };
            
            const positions = ['frontend', 'backend', 'uiux', 'fullstack', 'devops'];
            const xPositions = [60, 120, 180, 240, 300, 360, 420];
            const maxValue = Math.max(...Object.values(data.data).flat());
            
            positions.forEach(position => {
                const values = data.data[position];
                const color = colors[position];
                
                // Create path for line
                let pathData = '';
                const points = [];
                
                values.forEach((value, index) => {
                    const x = xPositions[index] || 60 + (index * 60);
                    const y = 240 - (value / maxValue) * 200; // Scale to larger chart height
                    
                    points.push({ x, y, value });
                    
                    if (index === 0) {
                        pathData += `M ${x} ${y}`;
                    } else {
                        pathData += ` L ${x} ${y}`;
                    }
                });
                
                // Add smooth curve
                const smoothPath = createSmoothPath(points);
                
                // Create line element
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                line.setAttribute('d', smoothPath);
                line.setAttribute('fill', 'none');
                line.setAttribute('stroke', color);
                line.setAttribute('stroke-width', '3');
                line.setAttribute('stroke-linecap', 'round');
                line.setAttribute('stroke-linejoin', 'round');
                chartLines.appendChild(line);
                
                // Add points
                points.forEach(point => {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', point.x);
                    circle.setAttribute('cy', point.y);
                    circle.setAttribute('r', '4');
                    circle.setAttribute('fill', color);
                    circle.setAttribute('stroke', 'white');
                    circle.setAttribute('stroke-width', '2');
                    circle.style.cursor = 'pointer';
                    
                    // Add hover effect
                    circle.addEventListener('mouseenter', function() {
                        this.setAttribute('r', '6');
                        showTooltip(point.x, point.y, point.value, position);
                    });
                    
                    circle.addEventListener('mouseleave', function() {
                        this.setAttribute('r', '4');
                        hideTooltip();
                    });
                    
                    chartPoints.appendChild(circle);
                });
            });
        }

        function createSmoothPath(points) {
            if (points.length < 2) return '';
            
            let path = `M ${points[0].x} ${points[0].y}`;
            
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const next = points[i + 1];
                
                if (i === 1) {
                    // First curve
                    const cp1x = prev.x + (curr.x - prev.x) * 0.3;
                    const cp1y = prev.y;
                    const cp2x = curr.x - (curr.x - prev.x) * 0.3;
                    const cp2y = curr.y;
                    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
                } else {
                    // Smooth curves for middle points
                    const cp1x = prev.x + (curr.x - prev.x) * 0.3;
                    const cp1y = prev.y + (curr.y - prev.y) * 0.3;
                    const cp2x = curr.x - (curr.x - prev.x) * 0.3;
                    const cp2y = curr.y - (curr.y - prev.y) * 0.3;
                    path += ` S ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
                }
            }
            
            return path;
        }

        function showTooltip(x, y, value, position) {
            // Create or update tooltip
            let tooltip = document.getElementById('chartTooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'chartTooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    pointer-events: none;
                    z-index: 1000;
                    transform: translate(-50%, -100%);
                    margin-top: -8px;
                `;
                document.body.appendChild(tooltip);
            }
            
            const positionNames = {
                frontend: 'Frontend',
                backend: 'Backend', 
                uiux: 'UI/UX',
                fullstack: 'Fullstack',
                devops: 'DevOps'
            };
            
            tooltip.textContent = `${positionNames[position]}: ${value}`;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
            tooltip.style.display = 'block';
        }

        function hideTooltip() {
            const tooltip = document.getElementById('chartTooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        }

        // Timeline dropdown functions
        function toggleTimelineDropdown() {
            const dropdown = document.querySelector('.timeline-filter-dropdown');
            const menu = document.getElementById('timelineDropdownMenu');
            
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function setTimelinePositionFilter(position) {
            // Remove active class from all dropdown items
            document.querySelectorAll('#timelineDropdownMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            // Update selected position text
            const positionNames = {
                all: 'Tất cả vị trí',
                frontend: 'Frontend Developer',
                backend: 'Backend Developer',
                uiux: 'UI/UX Designer',
                devops: 'DevOps Engineer',
                fullstack: 'Full-stack Developer'
            };
            
            document.getElementById('selectedPosition').textContent = positionNames[position];
            
            // Filter timeline interviews
            filterTimelineByPosition(position);
            
            // Close dropdown
            document.querySelector('.timeline-filter-dropdown').classList.remove('active');
            document.getElementById('timelineDropdownMenu').classList.remove('show');
        }

        function filterTimelineByPosition(position) {
            const interviewCards = document.querySelectorAll('.interview-card');
            
            interviewCards.forEach(card => {
                const positionElement = card.querySelector('.candidate-position');
                const positionText = positionElement.textContent.toLowerCase();
                
                let shouldShow = position === 'all';
                
                if (!shouldShow) {
                    switch(position) {
                        case 'frontend':
                            shouldShow = positionText.includes('frontend');
                            break;
                        case 'backend':
                            shouldShow = positionText.includes('backend');
                            break;
                        case 'uiux':
                            shouldShow = positionText.includes('ui/ux') || positionText.includes('designer');
                            break;
                        case 'devops':
                            shouldShow = positionText.includes('devops');
                            break;
                        case 'fullstack':
                            shouldShow = positionText.includes('full-stack') || positionText.includes('fullstack');
                            break;
                    }
                }
                
                card.style.display = shouldShow ? 'flex' : 'none';
            });
        }

        // Action menu functions
        function showActionMenu(event, candidateName, status) {
            event.stopPropagation();
            
            const popup = document.getElementById('actionMenuPopup');
            const rect = event.target.getBoundingClientRect();
            
            // Position the menu near the clicked button
            const menu = popup.querySelector('.action-menu');
            menu.style.position = 'fixed';
            menu.style.top = rect.bottom + 8 + 'px';
            menu.style.left = Math.min(rect.left, window.innerWidth - 220) + 'px';
            
            // Store candidate name and status for later use
            popup.dataset.candidateName = candidateName;
            popup.dataset.status = status;
            
            // Update menu content based on status
            updateActionMenuContent(status);
            
            popup.classList.add('show');
        }

        function updateActionMenuContent(status) {
            const menuContent = document.getElementById('actionMenuContent');
            
            if (status === 'completed') {
                // For completed interviews, only show view details
                menuContent.innerHTML = `
                    <button class="action-menu-item" onclick="viewDetails()">
                        <i class="fas fa-eye"></i>
                        Xem chi tiết
                    </button>
                `;
            } else {
                // For non-completed interviews, show all actions
                menuContent.innerHTML = `
                    <button class="action-menu-item" onclick="editInterview()">
                        <i class="fas fa-edit"></i>
                        Chỉnh sửa
                    </button>
                    <button class="action-menu-item" onclick="viewDetails()">
                        <i class="fas fa-eye"></i>
                        Chi tiết
                    </button>
                    <button class="action-menu-item" onclick="reschedule()">
                        <i class="fas fa-calendar-alt"></i>
                        Đổi lịch
                    </button>
                    <button class="action-menu-item" onclick="sendReminder()">
                        <i class="fas fa-bell"></i>
                        Gửi nhắc nhở
                    </button>
                `;
            }
        }

        function closeActionMenu(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('actionMenuPopup').classList.remove('show');
        }

        function editInterview() {
            const popup = document.getElementById('actionMenuPopup');
            const candidateName = popup.dataset.candidateName;
            
            // Close action menu
            closeActionMenu();
            
            // Open edit modal
            document.getElementById('candidateName').value = candidateName;
            document.getElementById('editModal').classList.add('show');
        }

        function viewDetails() {
            closeActionMenu();
            alert('Xem chi tiết phỏng vấn - Tính năng đang phát triển');
        }

        function reschedule() {
            closeActionMenu();
            alert('Đổi lịch phỏng vấn - Tính năng đang phát triển');
        }

        function sendReminder() {
            closeActionMenu();
            alert('Đã gửi email nhắc nhở thành công!');
        }

        function cancelInterview() {
            closeActionMenu();
            if (confirm('Bạn có chắc chắn muốn hủy phỏng vấn này?')) {
                alert('Đã hủy phỏng vấn thành công!');
            }
        }

        function closeModal(modalId, event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById(modalId).classList.remove('show');
        }

        function saveInterview() {
            alert('Đã lưu thay đổi thành công!');
            closeModal('editModal');
        }

        // Table filter functions
        function toggleStatusFilter() {
            const dropdown = document.querySelector('.filter-dropdown:nth-of-type(1)');
            const menu = document.getElementById('statusFilterMenu');
            
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function togglePositionFilter() {
            const dropdown = document.querySelector('.filter-dropdown:nth-of-type(2)');
            const menu = document.getElementById('positionFilterMenu');
            
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function toggleDateFilter() {
            const dropdown = document.querySelector('.filter-dropdown:nth-of-type(3)');
            const menu = document.getElementById('dateFilterMenu');
            
            dropdown.classList.toggle('active');
            menu.classList.toggle('show');
        }

        function setStatusFilter(status) {
            // Remove active class from all dropdown items
            document.querySelectorAll('#statusFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            // Update selected status text
            const statusNames = {
                all: 'Tất cả trạng thái',
                scheduled: 'Đã lên lịch',
                completed: 'Hoàn thành',
                cancelled: 'Đã hủy',
                'in-progress': 'Đang diễn ra'
            };
            
            document.getElementById('selectedStatus').textContent = statusNames[status];
            
            // Apply filter
            filterTableByStatus(status);
            
            // Close dropdown
            document.querySelector('.dropdown:nth-of-type(1)').classList.remove('active');
            document.getElementById('statusFilterMenu').classList.remove('show');
        }

        function setPositionFilter(position) {
            // Remove active class from all dropdown items
            document.querySelectorAll('#positionFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            // Update selected position text
            const positionNames = {
                all: 'Tất cả vị trí',
                frontend: 'Frontend',
                backend: 'Backend',
                uiux: 'UI/UX',
                fullstack: 'Fullstack',
                pm: 'Product Manager'
            };
            
            document.getElementById('selectedPosition').textContent = positionNames[position];
            
            // Apply filter
            filterTableByPosition(position);
            
            // Close dropdown
            document.querySelector('.filter-dropdown:nth-of-type(2)').classList.remove('active');
            document.getElementById('positionFilterMenu').classList.remove('show');
        }

        function setDateFilter(dateRange) {
            // Remove active class from all dropdown items
            document.querySelectorAll('#dateFilterMenu .dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            // Update selected date range text
            const dateRangeNames = {
                all: 'Tất cả thời gian',
                today: 'Hôm nay',
                tomorrow: 'Ngày mai',
                week: 'Tuần này',
                month: 'Tháng này',
                custom: 'Tùy chọn'
            };
            
            document.getElementById('selectedDateRange').textContent = dateRangeNames[dateRange];
            
            // Apply filter
            filterTableByDateRange(dateRange);
            
            // Close dropdown
            document.querySelector('.filter-dropdown:nth-of-type(3)').classList.remove('active');
            document.getElementById('dateFilterMenu').classList.remove('show');
        }

        function filterTableByStatus(status) {
            const rows = document.querySelectorAll('.interview-table tbody tr');
            
            rows.forEach(row => {
                const statusElement = row.querySelector('.table-status');
                let showRow = status === 'all';
                
                if (!showRow && statusElement) {
                    const rowStatus = statusElement.classList.contains('scheduled') ? 'scheduled' :
                                     statusElement.classList.contains('completed') ? 'completed' :
                                     statusElement.classList.contains('cancelled') ? 'cancelled' : 'in-progress';
                    
                    showRow = rowStatus === status;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        function filterTableByPosition(position) {
            const rows = document.querySelectorAll('.interview-table tbody tr');
            
            rows.forEach(row => {
                const positionElement = row.querySelector('.position-badge');
                let showRow = position === 'all';
                
                if (!showRow && positionElement) {
                    const rowPosition = positionElement.classList.contains('frontend') ? 'frontend' :
                                       positionElement.classList.contains('backend') ? 'backend' :
                                       positionElement.classList.contains('uiux') ? 'uiux' :
                                       positionElement.classList.contains('fullstack') ? 'fullstack' : 'pm';
                    
                    showRow = rowPosition === position;
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }

        function filterTableByDateRange(dateRange) {
            const rows = document.querySelectorAll('.interview-table tbody tr');
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            rows.forEach(row => {
                const dateElement = row.querySelector('td:nth-child(3) div:first-child');
                let showRow = dateRange === 'all';
                
                if (!showRow && dateElement) {
                    const dateText = dateElement.textContent.trim();
                    const [day, month, year] = dateText.split('/');
                    const rowDate = new Date(year, month - 1, day);
                    
                    switch(dateRange) {
                        case 'today':
                            showRow = rowDate.toDateString() === today.toDateString();
                            break;
                        case 'tomorrow':
                            showRow = rowDate.toDateString() === tomorrow.toDateString();
                            break;
                        case 'week':
                            const weekStart = new Date(today);
                            weekStart.setDate(today.getDate() - today.getDay());
                            const weekEnd = new Date(weekStart);
                            weekEnd.setDate(weekStart.getDate() + 6);
                            showRow = rowDate >= weekStart && rowDate <= weekEnd;
                            break;
                        case 'month':
                            showRow = rowDate.getMonth() === today.getMonth() && 
                                     rowDate.getFullYear() === today.getFullYear();
                            break;
                        case 'custom':
                            // For custom date range, you would implement a date picker
                            showRow = true;
                            break;
                    }
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }



        // Enhanced action functions
        function duplicateInterview() {
            closeActionMenu();
            alert('Đã tạo bản sao lịch phỏng vấn thành công!');
        }

        function sendInvitation() {
            closeActionMenu();
            alert('Đã gửi lời mời phỏng vấn qua email thành công!');
        }

        function addToCalendar() {
            closeActionMenu();
            alert('Đã thêm vào lịch Google Calendar thành công!');
        }

        function markCompleted() {
            closeActionMenu();
            if (confirm('Đánh dấu phỏng vấn này đã hoàn thành?')) {
                alert('Đã cập nhật trạng thái thành công!');
            }
        }

        function addNotes() {
            closeActionMenu();
            document.getElementById('notesModal').classList.add('show');
        }

        function exportInterview() {
            closeActionMenu();
            alert('Đang xuất thông tin phỏng vấn...');
        }

        function reschedule() {
            closeActionMenu();
            document.getElementById('rescheduleModal').classList.add('show');
        }

        function viewDetails() {
            closeActionMenu();
            document.getElementById('detailsModal').classList.add('show');
        }

        function confirmReschedule() {
            const newDate = document.getElementById('newDate').value;
            const newStartTime = document.getElementById('newStartTime').value;
            const newEndTime = document.getElementById('newEndTime').value;
            
            if (!newDate || !newStartTime || !newEndTime) {
                alert('Vui lòng điền đầy đủ thông tin lịch mới!');
                return;
            }
            
            alert('Đã đổi lịch phỏng vấn thành công! Thông báo đã được gửi cho ứng viên.');
            closeModal('rescheduleModal');
        }

        function saveNotes() {
            alert('Đã lưu ghi chú thành công!');
            closeModal('notesModal');
        }

        function viewCV() {
            alert('Đang mở CV của ứng viên...');
        }

        function searchInterviews(searchTerm) {
            const rows = document.querySelectorAll('.interview-table tbody tr');
            const term = searchTerm.toLowerCase().trim();
            
            rows.forEach(row => {
                const candidateName = row.querySelector('.candidate-details h4').textContent.toLowerCase();
                const candidateEmail = row.querySelector('.candidate-details p').textContent.toLowerCase();
                const position = row.querySelector('.position-badge').textContent.toLowerCase();
                const interviewer = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                
                const shouldShow = term === '' || 
                    candidateName.includes(term) || 
                    candidateEmail.includes(term) || 
                    position.includes(term) || 
                    interviewer.includes(term);
                
                row.style.display = shouldShow ? '' : 'none';
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            // Close main dropdown
            const dropdown = document.querySelector('.dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
                document.getElementById('dropdownMenu').classList.remove('show');
            }
            
            // Close timeline dropdown
            const timelineDropdown = document.querySelector('.timeline-filter-dropdown');
            if (timelineDropdown && !timelineDropdown.contains(event.target)) {
                timelineDropdown.classList.remove('active');
                document.getElementById('timelineDropdownMenu').classList.remove('show');
            }
            
            // Close status filter dropdown
            const statusFilterDropdown = document.querySelector('.filter-dropdown:nth-of-type(1)');
            if (statusFilterDropdown && !statusFilterDropdown.contains(event.target)) {
                statusFilterDropdown.classList.remove('active');
                document.getElementById('statusFilterMenu').classList.remove('show');
            }
            
            // Close position filter dropdown
            const positionFilterDropdown = document.querySelector('.filter-dropdown:nth-of-type(2)');
            if (positionFilterDropdown && !positionFilterDropdown.contains(event.target)) {
                positionFilterDropdown.classList.remove('active');
                document.getElementById('positionFilterMenu').classList.remove('show');
            }
            
            // Close date filter dropdown
            const dateFilterDropdown = document.querySelector('.filter-dropdown:nth-of-type(3)');
            if (dateFilterDropdown && !dateFilterDropdown.contains(event.target)) {
                dateFilterDropdown.classList.remove('active');
                document.getElementById('dateFilterMenu').classList.remove('show');
            }
            
            // Close action menu
            const actionMenu = document.getElementById('actionMenuPopup');
            if (actionMenu && !actionMenu.contains(event.target)) {
                closeActionMenu();
            }
        });

        function updateTimelineData(filter) {
            // Sample data for different time filters
            const timelineData = {
                today: [
                    {
                        time: '09:00',
                        candidate: 'Nguyễn Văn Thành',
                        position: 'Frontend Developer',
                        round: 'Vòng 2 - Technical',
                        timeRange: '09:00 - 10:30',
                        location: 'Phòng họp A1',
                        interviewer: 'Nguyễn Thị Lan',
                        status: 'confirmed',
                        priority: 'high',
                        avatar: 'NT',
                        color: 'blue'
                    }
                ],
                week: [
                    // Add more sample data for week view
                ],
                month: [
                    // Add more sample data for month view
                ]
            };
            
            console.log(`Updated timeline with ${filter} data`);
            // Here you would update the timeline display with filtered data
        }

        function filterInterviewsByPosition(position) {
            const interviewCards = document.querySelectorAll('.interview-card');
            
            interviewCards.forEach(card => {
                const positionElement = card.querySelector('.candidate-position');
                if (position === 'all' || positionElement.textContent.toLowerCase().includes(position.toLowerCase())) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log(`Filtered interviews by position: ${position}`);
        }

        function exportData() {
            console.log('Exporting interview data to Excel...');
            // Here you would implement Excel export functionality
        }

        function importData() {
            console.log('Opening import dialog...');
            // Here you would implement data import functionality
        }

        function bulkActions() {
            console.log('Opening bulk actions menu...');
            // Here you would implement bulk actions functionality
        }

        function createInterview() {
            console.log('Opening create interview form...');
            // Here you would implement create interview functionality
        }

        // Initialize with today's date selected
        document.addEventListener('DOMContentLoaded', function() {
            selectDate('2024-12-12');
            // Initialize chart with default month view
            updatePositionTrendsChart('month');
        });
        let currentRange = 'month';
function changePositionTimeRange(r){
  currentRange = r;
  document.querySelectorAll('.time-btn').forEach(b=>{
    b.classList.toggle('active', b.textContent.includes(r==='month'?'Tháng':r==='quarter'?'Quý':'Năm'));
  });
  updatePositionTrendsChart(r);
}
window.addEventListener('resize', () => updatePositionTrendsChart(currentRange));
document.addEventListener('DOMContentLoaded', () => updatePositionTrendsChart('month'));
function getLineChartDims(){
  const svg  = document.getElementById('positionChart');
  const wrap = svg.closest('.multi-line-chart') || svg.parentElement;

  // Tăng min width nếu muốn đường kẻ giãn hơn (860 -> 1000/1120)
  const w = Math.max(1000, wrap.clientWidth - 24);

  const cssH = parseInt(getComputedStyle(document.documentElement)
                        .getPropertyValue('--line-h')) || 560;
  const h = Math.max(420, cssH);

  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  return { w, h,
    left:   parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-pad-left'))   || 64,
    right:  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-pad-right'))  || 32,
    top:    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-pad-top'))    || 28,
    bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-pad-bottom')) || 44
  };
}
