 // Scroll Progress Bar
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        }

        // Smooth Scroll for Navigation
        function smoothScrollTo(targetId) {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Parallax Effect
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }

        // Scroll Reveal Animation
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.scroll-reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        }

        // Section Visibility
        function updateSectionVisibility() {
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    section.classList.add('visible');
                }
            });
        }

        // Update Active Navigation
        function updateActiveNavigation() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Stagger Animation
        function initStaggerAnimations() {
            const staggerContainers = document.querySelectorAll('.stagger-animation');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, Math.random() * 300);
                    }
                });
            }, { threshold: 0.1 });
            
            staggerContainers.forEach(container => {
                observer.observe(container);
            });
        }
 
        // Form Handlers
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Cảm ơn bạn! Tin nhắn đã được gửi thành công.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                event.target.reset();
            }, 2000);
        }

        function handleLoginSubmit(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Đang đăng nhập...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Đăng nhập thành công! Chào mừng bạn đến với hệ thống CyberFortis.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                hideLogin();
                event.target.reset();
            }, 2000);
        }

        // Initialize Everything
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scroll to navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    smoothScrollTo(targetId);
                });
            });

            // Initialize stagger animations
            initStaggerAnimations();

            // Initial calls
            updateScrollProgress();
            revealOnScroll();
            updateSectionVisibility();
            updateActiveNavigation(); 
        });

        // Optimized scroll event handler
        let ticking = false;

        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollProgress();
                    updateParallax();
                    revealOnScroll();
                    updateSectionVisibility();
                    updateActiveNavigation();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // Trigger initial animations
            setTimeout(() => {
                const heroElements = document.querySelectorAll('#home .stagger-animation');
                heroElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animate');
                    }, index * 200);
                });
            }, 500);
        });