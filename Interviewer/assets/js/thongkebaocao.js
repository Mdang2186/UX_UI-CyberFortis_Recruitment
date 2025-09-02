  // Enhanced Chart.js configuration with professional styling
        Chart.defaults.color = '#374151';
        Chart.defaults.borderColor = 'rgba(229, 231, 235, 0.8)';
        Chart.defaults.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        Chart.defaults.font.family = 'Inter';
        Chart.defaults.font.weight = '500';

        // Professional color palette - Blue and Green variations
        const colorPalette = {
            blue: {
                primary: '#1e40af',
                secondary: '#3b82f6',
                light: '#60a5fa',
                lighter: '#93c5fd',
                lightest: '#dbeafe'
            },
            green: {
                primary: '#059669',
                secondary: '#10b981',
                light: '#34d399',
                lighter: '#6ee7b7',
                lightest: '#d1fae5'
            },
            emerald: {
                primary: '#047857',
                secondary: '#059669',
                light: '#10b981',
                lighter: '#34d399',
                lightest: '#d1fae5'
            }
        };

        // Data storage for different periods
        const analyticsData = {
            month: {
                applications: 2847,
                conversionRate: 8.2,
                timeToHire: 28,
                costPerHire: 2.4,
                quickStats: ['8.2%', '7.8', 'LinkedIn', 'Frontend'],
                positionTrend: {
                    frontend: [15, 18, 16, 22, 25, 28, 26, 31, 34, 38, 42, 39],
                    ba: [12, 14, 13, 17, 19, 21, 20, 24, 26, 29, 32, 28],
                    designer: [8, 10, 9, 12, 14, 16, 15, 18, 20, 22, 25, 21],
                    marketing: [6, 8, 7, 10, 11, 13, 12, 15, 17, 19, 21, 18],
                    data: [4, 6, 5, 8, 9, 11, 10, 13, 15, 17, 19, 16]
                },
                department: [35, 25, 20, 12, 8],
                source: [856, 642, 534, 423, 287],
                monthly: [245, 289, 312, 267],
                monthlyHired: [23, 28, 31, 26],
                skills: [85, 78, 92, 67, 73, 58],
                experience: [42, 35, 18, 5],
                salary: [156, 234, 189, 98, 45],
                interviewSuccess: [65, 68, 72, 70, 75, 78, 82, 79, 85, 88, 91, 87],
                recruiter: [23, 19, 31, 17, 25],
                positions: [45, 38, 25, 20, 15]
            },
            quarter: {
                applications: 8541,
                conversionRate: 8.8,
                timeToHire: 26,
                costPerHire: 2.2,
                quickStats: ['8.8%', '8.1', 'LinkedIn', 'Frontend'],
                positionTrend: {
                    frontend: [45, 54, 48, 66, 75, 84, 78, 93, 102, 114, 126, 117],
                    ba: [36, 42, 39, 51, 57, 63, 60, 72, 78, 87, 96, 84],
                    designer: [24, 30, 27, 36, 42, 48, 45, 54, 60, 66, 75, 63],
                    marketing: [18, 24, 21, 30, 33, 39, 36, 45, 51, 57, 63, 54],
                    data: [12, 18, 15, 24, 27, 33, 30, 39, 45, 51, 57, 48]
                },
                department: [38, 28, 18, 10, 6],
                source: [2568, 1926, 1602, 1269, 861],
                monthly: [735, 867, 936, 801],
                monthlyHired: [69, 84, 93, 78],
                skills: [88, 82, 95, 71, 77, 62],
                experience: [38, 40, 17, 5],
                salary: [468, 702, 567, 294, 135],
                interviewSuccess: [68, 71, 75, 73, 78, 81, 85, 82, 88, 91, 94, 90],
                recruiter: [69, 57, 93, 51, 75],
                positions: [135, 114, 75, 60, 45]
            },
            year: {
                applications: 34164,
                conversionRate: 9.1,
                timeToHire: 24,
                costPerHire: 2.0,
                quickStats: ['9.1%', '8.3', 'LinkedIn', 'Frontend'],
                positionTrend: {
                    frontend: [180, 216, 192, 264, 300, 336, 312, 372, 408, 456, 504, 468],
                    ba: [144, 168, 156, 204, 228, 252, 240, 288, 312, 348, 384, 336],
                    designer: [96, 120, 108, 144, 168, 192, 180, 216, 240, 264, 300, 252],
                    marketing: [72, 96, 84, 120, 132, 156, 144, 180, 204, 228, 252, 216],
                    data: [48, 72, 60, 96, 108, 132, 120, 156, 180, 204, 228, 192]
                },
                department: [40, 30, 15, 8, 7],
                source: [10272, 7704, 6408, 5076, 3444],
                monthly: [2940, 3468, 3744, 3204],
                monthlyHired: [276, 336, 372, 312],
                skills: [92, 86, 98, 75, 81, 66],
                experience: [35, 42, 18, 5],
                salary: [1872, 2808, 2268, 1176, 540],
                interviewSuccess: [72, 75, 79, 77, 82, 85, 89, 86, 92, 95, 98, 94],
                recruiter: [276, 228, 372, 204, 300],
                positions: [540, 456, 300, 240, 180]
            }
        };

        let currentPeriod = 'month';

        // Initialize all charts
        document.addEventListener('DOMContentLoaded', function() {
            initializePositionTrendChart();
            initializeDepartmentChart();
            initializeSourceChart();
            initializeMonthlyChart();
            initializeSkillsChart();
            initializeExperienceChart();
            initializeSalaryChart();
            initializeInterviewSuccessChart();
            initializeRecruiterChart();
            initializePositionChart();
        });

        function initializePositionTrendChart() {
            const ctx = document.getElementById('positionTrendChart').getContext('2d');
            
            window.positionTrendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    datasets: [{
                        label: 'Frontend Developer',
                        data: [15, 18, 16, 22, 25, 28, 26, 31, 34, 38, 42, 39],
                        borderColor: colorPalette.blue.primary,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.blue.primary,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }, {
                        label: 'Business Analyst',
                        data: [12, 14, 13, 17, 19, 21, 20, 24, 26, 29, 32, 28],
                        borderColor: colorPalette.blue.secondary,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.blue.secondary,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }, {
                        label: 'UI/UX Designer',
                        data: [8, 10, 9, 12, 14, 16, 15, 18, 20, 22, 25, 21],
                        borderColor: colorPalette.green.primary,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.green.primary,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }, {
                        label: 'Marketing Specialist',
                        data: [6, 8, 7, 10, 11, 13, 12, 15, 17, 19, 21, 18],
                        borderColor: colorPalette.green.secondary,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.green.secondary,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }, {
                        label: 'Data Analyst',
                        data: [4, 6, 5, 8, 9, 11, 10, 13, 15, 17, 19, 16],
                        borderColor: colorPalette.green.light,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.green.light,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                color: '#374151',
                                padding: 25,
                                font: {
                                    size: 14,
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12,
                            displayColors: true,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13,
                                weight: '500'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeDepartmentChart() {
            const ctx = document.getElementById('departmentChart').getContext('2d');
            
            window.departmentChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['IT', 'Marketing', 'Sales', 'HR', 'Finance'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            colorPalette.blue.primary,
                            colorPalette.blue.secondary,
                            colorPalette.green.primary,
                            colorPalette.green.secondary,
                            colorPalette.green.light
                        ],
                        borderWidth: 0,
                        cutout: '65%',
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                color: '#374151',
                                font: {
                                    size: 13,
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeSourceChart() {
            const ctx = document.getElementById('sourceChart').getContext('2d');
            
            window.sourceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['LinkedIn', 'Website', 'Referral', 'Job Boards', 'Social Media'],
                    datasets: [{
                        label: 'Số lượng ứng viên',
                        data: [856, 642, 534, 423, 287],
                        backgroundColor: [
                            colorPalette.blue.primary,
                            colorPalette.blue.secondary,
                            colorPalette.green.primary,
                            colorPalette.green.secondary,
                            colorPalette.green.light
                        ],
                        borderRadius: 8,
                        borderSkipped: false,
                        hoverBackgroundColor: [
                            colorPalette.blue.secondary,
                            colorPalette.blue.light,
                            colorPalette.green.secondary,
                            colorPalette.green.light,
                            colorPalette.green.lighter
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeMonthlyChart() {
            const ctx = document.getElementById('monthlyChart').getContext('2d');
            
            window.monthlyChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['T9', 'T10', 'T11', 'T12'],
                    datasets: [{
                        label: 'Ứng viên',
                        data: [245, 289, 312, 267],
                        backgroundColor: colorPalette.blue.secondary,
                        borderRadius: 8,
                        hoverBackgroundColor: colorPalette.blue.light
                    }, {
                        label: 'Tuyển dụng',
                        data: [23, 28, 31, 26],
                        backgroundColor: colorPalette.green.secondary,
                        borderRadius: 8,
                        hoverBackgroundColor: colorPalette.green.light
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                color: '#374151',
                                font: {
                                    size: 13,
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializePositionChart() {
            const ctx = document.getElementById('positionChart').getContext('2d');
            
            window.positionChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Frontend', 'Backend', 'UX/UI', 'QA', 'PM'],
                    datasets: [{
                        label: 'Vị trí tuyển dụng',
                        data: [45, 38, 25, 20, 15],
                        backgroundColor: [
                            colorPalette.blue.primary,
                            colorPalette.blue.secondary,
                            colorPalette.green.primary,
                            colorPalette.green.secondary,
                            colorPalette.green.light
                        ],
                        borderRadius: 8,
                        borderSkipped: false,
                        hoverBackgroundColor: [
                            colorPalette.blue.secondary,
                            colorPalette.blue.light,
                            colorPalette.green.secondary,
                            colorPalette.green.light,
                            colorPalette.green.lighter
                        ]
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12,
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.x + ' vị trí';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeSkillsChart() {
            const ctx = document.getElementById('skillsChart').getContext('2d');
            
            window.skillsChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS'],
                    datasets: [{
                        label: 'Nhu cầu',
                        data: [85, 78, 92, 67, 73, 58],
                        backgroundColor: `${colorPalette.blue.secondary}20`,
                        borderColor: colorPalette.blue.secondary,
                        borderWidth: 3,
                        pointBackgroundColor: colorPalette.blue.secondary,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: colorPalette.blue.primary,
                        pointHoverBorderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)'
                            },
                            pointLabels: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '600'
                                }
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeExperienceChart() {
            const ctx = document.getElementById('experienceChart').getContext('2d');
            
            window.experienceChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Junior (0-2 năm)', 'Mid (2-5 năm)', 'Senior (5+ năm)', 'Lead/Manager'],
                    datasets: [{
                        data: [42, 35, 18, 5],
                        backgroundColor: [
                            colorPalette.green.light,
                            colorPalette.green.secondary,
                            colorPalette.blue.secondary,
                            colorPalette.blue.primary
                        ],
                        borderWidth: 0,
                        cutout: '65%',
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15,
                                color: '#374151',
                                font: {
                                    size: 11,
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeSalaryChart() {
            const ctx = document.getElementById('salaryChart').getContext('2d');
            
            window.salaryChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['5-10M', '10-15M', '15-20M', '20-30M', '30M+'],
                    datasets: [{
                        label: 'Số lượng',
                        data: [156, 234, 189, 98, 45],
                        backgroundColor: colorPalette.green.secondary,
                        borderRadius: 8,
                        borderSkipped: false,
                        hoverBackgroundColor: colorPalette.green.light
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeInterviewSuccessChart() {
            const ctx = document.getElementById('interviewSuccessChart').getContext('2d');
            
            window.interviewSuccessChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    datasets: [{
                        label: 'Tỷ lệ thành công (%)',
                        data: [65, 68, 72, 70, 75, 78, 82, 79, 85, 88, 91, 87],
                        borderColor: colorPalette.green.secondary,
                        backgroundColor: `${colorPalette.green.secondary}20`,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: colorPalette.green.primary,
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function initializeRecruiterChart() {
            const ctx = document.getElementById('recruiterChart').getContext('2d');
            
            window.recruiterChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Nguyễn An', 'Trần Bình', 'Lê Cường', 'Phạm Dung', 'Hoàng Ế'],
                    datasets: [{
                        label: 'Tuyển được',
                        data: [23, 19, 31, 17, 25],
                        backgroundColor: colorPalette.blue.secondary,
                        borderRadius: 8,
                        hoverBackgroundColor: colorPalette.blue.light
                    }, {
                        label: 'Mục tiêu',
                        data: [25, 25, 25, 25, 25],
                        backgroundColor: colorPalette.green.secondary,
                        borderRadius: 8,
                        hoverBackgroundColor: colorPalette.green.light
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                color: '#374151',
                                font: {
                                    size: 13,
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#1f2937',
                            bodyColor: '#374151',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 12,
                            padding: 12
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(243, 244, 246, 0.8)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }

        function updatePeriod(period) {
            currentPeriod = period;
            
            // Update active button with smooth transition
            document.querySelectorAll('.filter-tab').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(period + 'Btn').classList.add('active');
            
            // Update metrics with animation
            const data = analyticsData[period];
            
            // Animate metric updates
            animateValue('totalApplications', parseInt(document.getElementById('totalApplications').textContent.replace(/,/g, '')), data.applications, 1000);
            animateValue('conversionRate', parseFloat(document.getElementById('conversionRate').textContent), data.conversionRate, 1000, '%');
            animateValue('timeToHire', parseInt(document.getElementById('timeToHire').textContent), data.timeToHire, 1000);
            animateValue('costPerHire', parseFloat(document.getElementById('costPerHire').textContent), data.costPerHire, 1000, 'M');
            
            // Update quick stats
            document.getElementById('quickStat1').textContent = data.quickStats[0];
            document.getElementById('quickStat2').textContent = data.quickStats[1];
            document.getElementById('quickStat3').textContent = data.quickStats[2];
            document.getElementById('quickStat4').textContent = data.quickStats[3];
            
            // Update charts with smooth transitions
            updateChartsForPeriod(period);
        }
        
        function animateValue(elementId, start, end, duration, suffix = '') {
            const element = document.getElementById(elementId);
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    current = end;
                    clearInterval(timer);
                }
                
                if (suffix === '%') {
                    element.textContent = current.toFixed(1) + suffix;
                } else if (suffix === 'M') {
                    element.textContent = current.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }
        
        function updateChartsForPeriod(period) {
            const data = analyticsData[period];
            
            // Update all charts with smooth animations
            const charts = [
                { chart: window.positionTrendChart, updateData: () => {
                    window.positionTrendChart.data.datasets[0].data = data.positionTrend.frontend;
                    window.positionTrendChart.data.datasets[1].data = data.positionTrend.ba;
                    window.positionTrendChart.data.datasets[2].data = data.positionTrend.designer;
                    window.positionTrendChart.data.datasets[3].data = data.positionTrend.marketing;
                    window.positionTrendChart.data.datasets[4].data = data.positionTrend.data;
                }},
                { chart: window.departmentChart, updateData: () => {
                    window.departmentChart.data.datasets[0].data = data.department;
                }},
                { chart: window.sourceChart, updateData: () => {
                    window.sourceChart.data.datasets[0].data = data.source;
                }},
                { chart: window.monthlyChart, updateData: () => {
                    window.monthlyChart.data.datasets[0].data = data.monthly;
                    window.monthlyChart.data.datasets[1].data = data.monthlyHired;
                }},
                { chart: window.positionChart, updateData: () => {
                    window.positionChart.data.datasets[0].data = data.positions;
                }},
                { chart: window.skillsChart, updateData: () => {
                    window.skillsChart.data.datasets[0].data = data.skills;
                }},
                { chart: window.experienceChart, updateData: () => {
                    window.experienceChart.data.datasets[0].data = data.experience;
                }},
                { chart: window.salaryChart, updateData: () => {
                    window.salaryChart.data.datasets[0].data = data.salary;
                }},
                { chart: window.interviewSuccessChart, updateData: () => {
                    window.interviewSuccessChart.data.datasets[0].data = data.interviewSuccess;
                }},
                { chart: window.recruiterChart, updateData: () => {
                    window.recruiterChart.data.datasets[0].data = data.recruiter;
                }}
            ];
            
            charts.forEach(({ chart, updateData }) => {
                if (chart) {
                    updateData();
                    chart.update('active');
                }
            });
        }

        // Enhanced window resize handler
        window.addEventListener('resize', function() {
            const charts = [
                window.positionTrendChart,
                window.departmentChart,
                window.sourceChart,
                window.monthlyChart,
                window.positionChart,
                window.skillsChart,
                window.experienceChart,
                window.salaryChart,
                window.interviewSuccessChart,
                window.recruiterChart
            ];
            
            charts.forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
        });

        // Add smooth scroll behavior for better UX
        document.documentElement.style.scrollBehavior = 'smooth';