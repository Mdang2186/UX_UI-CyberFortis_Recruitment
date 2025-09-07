  // Data structure for filtering
        const dataByPeriod = {
            today: {
                totalCandidates: 45,
                candidatesChange: '+8%',
                openPositions: 23,
                priorityPositions: '8 ưu tiên',
                interviewsToday: 8,
                upcomingInterviews: '3 sắp tới',
                conversionRate: 28,
                conversionChange: '+5%',
                funnelData: [45, 32, 18, 12, 8, 3],
                departmentData: [12, 8, 15, 6, 4],
                hiringTrendData: [5, 8, 12, 15, 18, 22, 25],
                sourceData: [15, 12, 8, 6, 4],
                monthlyNewCandidates: 45,
                monthlyHires: 3,
                avgCost: '2.1M',
                hiringTarget: '3/5',
                qualityScore: '9.2/10',
                timeTarget: '18/35 ngày'
            },
            week: {
                totalCandidates: 312,
                candidatesChange: '+15%',
                openPositions: 23,
                priorityPositions: '8 ưu tiên',
                interviewsToday: 42,
                upcomingInterviews: '18 tuần này',
                conversionRate: 26,
                conversionChange: '+4%',
                funnelData: [312, 245, 156, 89, 52, 18],
                departmentData: [85, 62, 95, 45, 25],
                hiringTrendData: [25, 35, 45, 55, 65, 75, 85],
                sourceData: [95, 78, 65, 42, 32],
                monthlyNewCandidates: 312,
                monthlyHires: 18,
                avgCost: '8.5M',
                hiringTarget: '18/25',
                qualityScore: '8.8/10',
                timeTarget: '22/35 ngày'
            },
            month: {
                totalCandidates: 1247,
                candidatesChange: '+12%',
                openPositions: 23,
                priorityPositions: '8 ưu tiên',
                interviewsToday: 156,
                upcomingInterviews: '68 tháng này',
                conversionRate: 24,
                conversionChange: '+3%',
                funnelData: [1247, 856, 423, 234, 156, 89],
                departmentData: [345, 278, 389, 156, 79],
                hiringTrendData: [89, 125, 156, 189, 234, 278, 312],
                sourceData: [389, 312, 234, 156, 89],
                monthlyNewCandidates: 1247,
                monthlyHires: 89,
                avgCost: '15.2M',
                hiringTarget: '89/120',
                qualityScore: '8.5/10',
                timeTarget: '28/35 ngày'
            },
            quarter: {
                totalCandidates: 3542,
                candidatesChange: '+18%',
                openPositions: 23,
                priorityPositions: '8 ưu tiên',
                interviewsToday: 445,
                upcomingInterviews: '189 quý này',
                conversionRate: 22,
                conversionChange: '+1%',
                funnelData: [3542, 2456, 1234, 678, 445, 234],
                departmentData: [945, 756, 1089, 456, 296],
                hiringTrendData: [234, 345, 456, 567, 678, 789, 945],
                sourceData: [1089, 945, 678, 456, 234],
                monthlyNewCandidates: 3542,
                monthlyHires: 234,
                avgCost: '42.8M',
                hiringTarget: '234/300',
                qualityScore: '8.1/10',
                timeTarget: '32/35 ngày'
            }
        };

        const departmentData = {
            all: { multiplier: 1 },
            tech: { multiplier: 0.4 },
            marketing: { multiplier: 0.25 },
            sales: { multiplier: 0.2 },
            hr: { multiplier: 0.15 }
        };

        let charts = {};
        let currentFilters = {
            time: 'month',
            department: 'all'
        };

        // Initialize charts
        function initCharts() {
            // Funnel Chart
            const funnelCtx = document.getElementById('funnelChart').getContext('2d');
            charts.funnel = new Chart(funnelCtx, {
                type: 'bar',
                data: {
                    labels: ['Ứng tuyển', 'Sàng lọc CV', 'Phỏng vấn 1', 'Phỏng vấn 2', 'Offer', 'Onboard'],
                    datasets: [{
                        label: 'Số lượng ứng viên',
                        data: getFilteredData().funnelData,
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(16, 185, 129, 0.6)',
                            'rgba(59, 130, 246, 0.4)',
                            'rgba(16, 185, 129, 0.4)'
                        ],
                        borderColor: [
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)'
                        ],
                        borderWidth: 2,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true },
                        x: { grid: { display: false } }
                    }
                }
            });

            // Department Chart
            const deptCtx = document.getElementById('departmentChart').getContext('2d');
            charts.department = new Chart(deptCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Công nghệ', 'Marketing', 'Kinh doanh', 'Nhân sự', 'Tài chính'],
                    datasets: [{
                        data: getFilteredData().departmentData,
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(16, 185, 129, 0.6)',
                            'rgba(59, 130, 246, 0.4)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
 
            // Source Chart
            const sourceCtx = document.getElementById('sourceChart').getContext('2d');
            charts.source = new Chart(sourceCtx, {
                type: 'pie',
                data: {
                    labels: ['LinkedIn', 'Website', 'Referral', 'JobBoard', 'Social'],
                    datasets: [{
                        data: getFilteredData().sourceData,
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(16, 185, 129, 0.6)',
                            'rgba(59, 130, 246, 0.4)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }

        // Get filtered data
        function getFilteredData() {
            const baseData = dataByPeriod[currentFilters.time];
            const multiplier = departmentData[currentFilters.department].multiplier;

            return {
                totalCandidates: Math.round(baseData.totalCandidates * multiplier),
                candidatesChange: baseData.candidatesChange,
                openPositions: baseData.openPositions,
                priorityPositions: baseData.priorityPositions,
                interviewsToday: Math.round(baseData.interviewsToday * multiplier),
                upcomingInterviews: baseData.upcomingInterviews,
                conversionRate: baseData.conversionRate,
                conversionChange: baseData.conversionChange,
                funnelData: baseData.funnelData.map(val => Math.round(val * multiplier)),
                departmentData: baseData.departmentData.map(val => Math.round(val * multiplier)),
                hiringTrendData: baseData.hiringTrendData.map(val => Math.round(val * multiplier)),
                sourceData: baseData.sourceData.map(val => Math.round(val * multiplier)),
                monthlyNewCandidates: Math.round(baseData.monthlyNewCandidates * multiplier),
                monthlyHires: Math.round(baseData.monthlyHires * multiplier),
                avgCost: baseData.avgCost,
                hiringTarget: baseData.hiringTarget,
                qualityScore: baseData.qualityScore,
                timeTarget: baseData.timeTarget
            };
        }

        // Update dashboard
        function updateDashboard() {
            const data = getFilteredData();
            
            // Update stats cards
            document.getElementById('totalCandidates').textContent = data.totalCandidates.toLocaleString();
            document.getElementById('candidatesChange').textContent = data.candidatesChange;
            document.getElementById('openPositions').textContent = data.openPositions;
            document.getElementById('priorityPositions').textContent = data.priorityPositions;
            document.getElementById('interviewsToday').textContent = data.interviewsToday;
            document.getElementById('upcomingInterviews').textContent = data.upcomingInterviews;
            document.getElementById('conversionRate').textContent = data.conversionRate + '%';
            document.getElementById('conversionChange').textContent = data.conversionChange;
            
            // Update report section
            document.getElementById('monthlyNewCandidates').textContent = data.monthlyNewCandidates.toLocaleString();
            document.getElementById('monthlyHires').textContent = data.monthlyHires;
            document.getElementById('avgCost').textContent = data.avgCost;
            document.getElementById('hiringTarget').textContent = data.hiringTarget;
            document.getElementById('qualityScore').textContent = data.qualityScore;
            document.getElementById('timeTarget').textContent = data.timeTarget;
            
            // Update progress bars
            const hiringProgress = (parseInt(data.hiringTarget.split('/')[0]) / parseInt(data.hiringTarget.split('/')[1])) * 100;
            const qualityProgress = (parseFloat(data.qualityScore.split('/')[0]) / parseFloat(data.qualityScore.split('/')[1])) * 100;
            const timeProgress = (parseInt(data.timeTarget.split('/')[0]) / parseInt(data.timeTarget.split('/')[1])) * 100;
            
            document.getElementById('hiringProgress').style.width = hiringProgress + '%';
            document.getElementById('qualityProgress').style.width = qualityProgress + '%';
            document.getElementById('timeProgress').style.width = timeProgress + '%';
            
            // Update charts
            if (charts.funnel) {
                charts.funnel.data.datasets[0].data = data.funnelData;
                charts.funnel.update();
            }
            if (charts.department) {
                charts.department.data.datasets[0].data = data.departmentData;
                charts.department.update();
            }
            if (charts.hiringTrend) {
                charts.hiringTrend.data.datasets[0].data = data.hiringTrendData;
                charts.hiringTrend.update();
            }
            if (charts.source) {
                charts.source.data.datasets[0].data = data.sourceData;
                charts.source.update();
            }
            
            // Update other sections
            populateCandidatesTable();
            populatePositionsGrid();
        }

        // Populate functions
        function populateInterviewSchedule() {
            const interviews = [
                { time: '09:00 - 10:00', candidate: 'Nguyễn Văn F', position: 'Frontend Developer', status: 'Sắp tới', statusColor: 'text-blue-600' },
                { time: '11:00 - 12:00', candidate: 'Trần Thị G', position: 'Product Manager', status: 'Đã xong', statusColor: 'text-emerald-600' },
                { time: '14:00 - 15:00', candidate: 'Lê Văn H', position: 'DevOps Engineer', status: 'Chờ', statusColor: 'text-blue-500' },
                { time: '16:00 - 17:00', candidate: 'Phạm Thị I', position: 'QA Engineer', status: 'Chờ', statusColor: 'text-emerald-500' }
            ];

            const container = document.getElementById('interviewSchedule');
            container.innerHTML = interviews.map(interview => `
                <div class="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 transition-all rounded-r-lg">
                    <div class="flex items-center justify-between">
                        <p class="font-semibold text-gray-900">${interview.time}</p>
                        <span class="text-xs px-2 py-1 rounded-full bg-gray-100 ${interview.statusColor}">${interview.status}</span>
                    </div>
                    <p class="text-gray-700 text-sm font-medium mt-1">${interview.candidate}</p>
                    <p class="text-gray-500 text-xs">${interview.position}</p>
                </div>
            `).join('');
        }

        function populateTopPositions() {
            const positions = [
                { title: 'Senior Frontend', candidates: '45 ứng viên', priority: 'Urgent', priorityColor: 'text-red-600' },
                { title: 'Product Manager', candidates: '32 ứng viên', priority: 'High', priorityColor: 'text-blue-600' },
                { title: 'DevOps Engineer', candidates: '28 ứng viên', priority: 'Medium', priorityColor: 'text-emerald-600' },
                { title: 'UI/UX Designer', candidates: '23 ứng viên', priority: 'Normal', priorityColor: 'text-blue-500' }
            ];

            const container = document.getElementById('topPositions');
            container.innerHTML = positions.map(position => `
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div>
                        <p class="font-semibold text-gray-900">${position.title}</p>
                        <p class="text-gray-600 text-sm">${position.candidates}</p>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full bg-white ${position.priorityColor}">${position.priority}</span>
                </div>
            `).join('');
        }

        function populateCandidatesTable() {
            const candidates = [
                { name: 'Nguyễn Văn A', position: 'Frontend Developer', status: 'Phỏng vấn', statusColor: 'bg-blue-100 text-blue-800', date: '15/03/2024', score: '8.5/10' },
                { name: 'Trần Thị B', position: 'Backend Developer', status: 'Offer', statusColor: 'bg-emerald-100 text-emerald-800', date: '14/03/2024', score: '9.0/10' },
                { name: 'Lê Văn C', position: 'UI/UX Designer', status: 'Mới nộp', statusColor: 'bg-blue-100 text-blue-800', date: '16/03/2024', score: '7.5/10' },
                { name: 'Phạm Thị D', position: 'Product Manager', status: 'Sàng lọc', statusColor: 'bg-emerald-100 text-emerald-800', date: '13/03/2024', score: '8.0/10' }
            ];

            const container = document.getElementById('candidatesTable');
            container.innerHTML = candidates.map(candidate => `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                ${candidate.name.charAt(0)}
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-semibold text-gray-900">${candidate.name}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${candidate.position}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${candidate.statusColor}">
                            ${candidate.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${candidate.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${candidate.score}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                        <button class="text-emerald-600 hover:text-emerald-900">Phỏng vấn</button>
                    </td>
                </tr>
            `).join('');
        }

        function populatePositionsGrid() {
            const positions = [
                { title: 'Senior Frontend Developer', candidates: 45, priority: 'Urgent', priorityColor: 'bg-red-500', status: 'Đang hoạt động', salary: '25M - 40M' },
                { title: 'Product Manager', candidates: 32, priority: 'High', priorityColor: 'bg-blue-500', status: 'Đang hoạt động', salary: '30M - 50M' },
                { title: 'DevOps Engineer', candidates: 28, priority: 'Medium', priorityColor: 'bg-emerald-500', status: 'Đang hoạt động', salary: '20M - 35M' },
                { title: 'UI/UX Designer', candidates: 23, priority: 'Normal', priorityColor: 'bg-blue-400', status: 'Chờ xử lý', salary: '18M - 30M' },
                { title: 'Sales Executive', candidates: 19, priority: 'Medium', priorityColor: 'bg-emerald-400', status: 'Đang hoạt động', salary: '15M - 25M' },
                { title: 'HR Specialist', candidates: 15, priority: 'Normal', priorityColor: 'bg-blue-300', status: 'Hoàn thành', salary: '12M - 20M' }
            ];

            const container = document.getElementById('positionsGrid');
            container.innerHTML = positions.map(position => `
                <div class="bg-white rounded-lg shadow-md p-6 card-hover">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-900 mb-2">${position.title}</h3>
                            <p class="text-gray-600 text-sm mb-2">${position.candidates} ứng viên</p>
                            <p class="text-gray-500 text-sm">${position.salary}</p>
                        </div>
                        <div class="flex flex-col items-end space-y-2">
                            <span class="w-3 h-3 ${position.priorityColor} rounded-full"></span>
                            <span class="text-xs text-gray-500">${position.priority}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs px-2 py-1 rounded-full ${position.status === 'Đang hoạt động' ? 'bg-emerald-100 text-emerald-800' : position.status === 'Chờ xử lý' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                            ${position.status}
                        </span>
                        <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Modal functionality
        function initModals() {
            const modals = document.querySelectorAll('.modal');
            const modalTriggers = {
                'createJobBtn': 'createJobModal',
                'scheduleInterviewBtn': 'scheduleInterviewModal',
                'exportReportBtn': 'exportReportModal',
                'sendEmailBtn': 'sendEmailModal'
            };

            // Open modals
            Object.keys(modalTriggers).forEach(btnId => {
                const btn = document.getElementById(btnId);
                if (btn) {
                    btn.addEventListener('click', () => {
                        document.getElementById(modalTriggers[btnId]).classList.add('show');
                    });
                }
            });

            // Close modals
            document.querySelectorAll('.modal-close').forEach(btn => {
                btn.addEventListener('click', () => {
                    modals.forEach(modal => modal.classList.remove('show'));
                });
            });

            // Close on backdrop click
            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            });
        }

        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            
            notificationText.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Event listeners
        function initEventListeners() {
            // Time filter
            document.getElementById('timeFilter').addEventListener('change', function() {
                currentFilters.time = this.value;
                showNotification(`Đã cập nhật dữ liệu cho ${this.options[this.selectedIndex].text}`, 'info');
                updateDashboard();
            });

            // Department filter
            document.getElementById('departmentFilter').addEventListener('change', function() {
                currentFilters.department = this.value;
                showNotification(`Đã lọc theo ${this.options[this.selectedIndex].text}`, 'info');
                updateDashboard();
            });

            // Export button
            document.getElementById('exportBtn').addEventListener('click', () => {
                showNotification('Đang xuất báo cáo...', 'info');
                setTimeout(() => {
                    showNotification('Báo cáo đã được xuất thành công!', 'success');
                    document.getElementById('exportReportModal').classList.remove('show');
                }, 2000);
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            showNotification('Đang tải HR Dashboard...', 'info');
            
            setTimeout(() => {
                initCharts();
                populateInterviewSchedule();
                populateTopPositions();
                populateCandidatesTable();
                populatePositionsGrid();
                initModals();
                initEventListeners();
                
                showNotification('HR Dashboard đã tải thành công!', 'success');
            }, 1000);
        });function renderPositionsCards6() {
  // Dữ liệu demo — có thể thay bằng API sau này
  const positions = [
    { title: 'Senior Frontend Developer', dept: 'Công nghệ', candidates: 45, priority: 'Urgent', priorityColor: 'bg-red-500', status: 'Đang hoạt động', salary: '25M - 40M' },
    { title: 'Product Manager',           dept: 'Marketing', candidates: 32, priority: 'High',   priorityColor: 'bg-yellow-500', status: 'Đang hoạt động', salary: '30M - 50M' },
    { title: 'DevOps Engineer',           dept: 'Công nghệ', candidates: 28, priority: 'Medium', priorityColor: 'bg-blue-500',   status: 'Đang hoạt động', salary: '20M - 35M' },
    { title: 'UI/UX Designer',            dept: 'Công nghệ', candidates: 23, priority: 'Normal', priorityColor: 'bg-emerald-500', status: 'Chờ xử lý',     salary: '18M - 30M' },
    { title: 'Sales Executive',           dept: 'Kinh doanh', candidates: 19, priority: 'Medium', priorityColor: 'bg-blue-500',   status: 'Đang hoạt động', salary: '15M - 25M' },
    { title: 'HR Specialist',             dept: 'Nhân sự',    candidates: 15, priority: 'Normal', priorityColor: 'bg-emerald-500',status: 'Hoàn thành',     salary: '12M - 20M' }
  ];

  const wrap = document.getElementById('positionsCards6List');
  if (!wrap) return;

  wrap.innerHTML = positions.map(p => `
    <div class="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 ${p.priorityColor} rounded-full"></span>
          <h4 class="font-semibold text-gray-900">${p.title}</h4>
        </div>
        <div class="mt-1 text-sm text-gray-600">${p.dept} • ${p.candidates} ứng viên • ${p.salary}</div>
      </div>
      <span class="text-xs px-2 py-1 rounded-full ${
        p.status === 'Đang hoạt động' ? 'bg-emerald-100 text-emerald-800' :
        p.status === 'Chờ xử lý'      ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
      }">${p.status}</span>
    </div>
  `).join('');
}
