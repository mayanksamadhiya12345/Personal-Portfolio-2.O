// Enhanced Hero Section Interactive Animations
class HeroAnimationController {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.setupTypingAnimation();
        this.setupStatsCounter();
        this.setupButtonEffects();
        this.setupParticleSystem();
        this.setupMouseInteractions();
        this.setupScrollIndicator();
        this.setupFloatingIcons();
        this.setupImageEffects();
        this.setupTiltEffects();
    }

    // Enhanced Typing Animation
    setupTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        const cursor = document.querySelector('.typing-cursor');
        
        if (!typingText) return;

        const texts = [
            'Research Engineer at LG SOFT India',
            'Backend Developer & System Architect', 
            'C++/Qt Expert & Problem Solver',
            'Hardware-Software Integration Specialist',
            'webOS TV Development Expert'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = Math.random() * 100 + 50; // Variable typing speed for realism
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 800;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Enhanced Stats Counter with Smooth Animation
    setupStatsCounter() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace('+', ''));
            const duration = 2500;
            const startTime = performance.now();
            const hasPlus = counter.textContent.includes('+');

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                counter.textContent = current + (hasPlus ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (hasPlus ? '+' : '');
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    setTimeout(() => animateCounter(counter), Math.random() * 200);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            const value = counter.textContent.replace('+', '');
            counter.setAttribute('data-target', value);
            counter.textContent = '0';
            observer.observe(counter);
        });
    }

    // Enhanced Button Effects
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Enhanced hover effects
            button.addEventListener('mouseenter', (e) => {
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = 'translateX(8px) scale(1.1)';
                }
            });

            button.addEventListener('mouseleave', (e) => {
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = 'translateX(0) scale(1)';
                }
            });

            // Click ripple effect
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const ripple = document.createElement('div');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    background-color: rgba(255, 255, 255, 0.5);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Enhanced Particle System
    setupParticleSystem() {
        const particleSystem = document.querySelector('.particle-system');
        if (!particleSystem) return;

        // Create more diverse particles
        for (let i = 10; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 6 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 25;
            const duration = 15 + Math.random() * 15;
            
            particle.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            // Enhanced particle colors
            const colors = [
                'linear-gradient(45deg, #007bff, #0056b3)',
                'linear-gradient(45deg, #00ff88, #00d4ff)',
                'linear-gradient(45deg, #ff0080, #ff6b9d)',
                'linear-gradient(45deg, #ffa500, #ff6347)',
                'linear-gradient(45deg, #9966cc, #663399)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleSystem.appendChild(particle);
        }
    }

    // Enhanced Mouse Interactions with Smooth Movement
    setupMouseInteractions() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (!hero) return;

        let targetX = 0;
        let targetY = 0;

        const smoothMove = () => {
            targetX += (this.mouseX - targetX) * 0.05;
            targetY += (this.mouseY - targetY) * 0.05;

            if (heroContent) {
                heroContent.style.transform = `
                    translateX(${targetX * 0.015}px) 
                    translateY(${targetY * 0.015}px) 
                    rotateY(${targetX * 0.008}deg) 
                    rotateX(${-targetY * 0.008}deg)
                `;
            }

            if (heroImage) {
                heroImage.style.transform = `
                    translateX(${-targetX * 0.02}px) 
                    translateY(${-targetY * 0.02}px) 
                    rotateY(${-targetX * 0.01}deg) 
                    rotateX(${targetY * 0.01}deg)
                `;
            }

            requestAnimationFrame(smoothMove);
        };

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            this.mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        });

        hero.addEventListener('mouseleave', () => {
            this.mouseX = 0;
            this.mouseY = 0;
        });

        smoothMove();
    }

    // Enhanced Image Effects
    setupImageEffects() {
        const imageFrame = document.querySelector('.image-frame');
        const profileImage = document.querySelector('.profile-image');
        
        if (!imageFrame || !profileImage) return;

        // Advanced image hover effects
        imageFrame.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.08) rotate(2deg)';
            profileImage.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.3) hue-rotate(5deg)';
        });

        imageFrame.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1) rotate(0deg)';
            profileImage.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.1) hue-rotate(0deg)';
        });

        // Parallax effect on scroll
        let ticking = false;
        const updateImageParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (profileImage) {
                profileImage.style.transform += ` translateY(${rate}px)`;
            }
            
            ticking = false;
        };

        const requestImageTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateImageParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestImageTick);
    }

    // Enhanced Tilt Effects
    setupTiltEffects() {
        const cards = document.querySelectorAll('.hero-badge, .tech-icon');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // Enhanced Scroll Indicator
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 400);
            const translateY = scrollY * 0.5;
            
            scrollIndicator.style.opacity = opacity;
            scrollIndicator.style.transform = `translateX(-50%) translateY(${translateY}px)`;
            
            // Hide/show based on scroll direction
            if (scrollY > lastScrollY && scrollY > 100) {
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.pointerEvents = 'auto';
            }
            
            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Enhanced click to scroll
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.about, section:not(.hero)');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Enhanced Floating Icons
    setupFloatingIcons() {
        const floatingIcons = document.querySelector('.floating-icons');
        if (!floatingIcons) return;

        const icons = ['⚛️', '🚀', '💻', '🎨', '⚡', '🔧', '🌟', '💡'];
        const positions = [
            { x: '-60px', y: '-40px', delay: '0s' },
            { x: '70px', y: '-60px', delay: '1s' },
            { x: '-50px', y: '80px', delay: '2s' },
            { x: '80px', y: '70px', delay: '3s' },
            { x: '10px', y: '-90px', delay: '4s' },
            { x: '-70px', y: '30px', delay: '5s' },
            { x: '50px', y: '-20px', delay: '6s' },
            { x: '-30px', y: '-70px', delay: '7s' }
        ];

        icons.forEach((icon, index) => {
            if (positions[index]) {
                const techIcon = document.createElement('div');
                techIcon.className = 'tech-icon';
                techIcon.textContent = icon;
                techIcon.style.setProperty('--x', positions[index].x);
                techIcon.style.setProperty('--y', positions[index].y);
                techIcon.style.setProperty('--delay', positions[index].delay);
                
                // Add interactive hover effects
                techIcon.addEventListener('mouseenter', () => {
                    techIcon.style.transform = `translate(${positions[index].x}, ${positions[index].y}) scale(1.3) rotate(360deg)`;
                });
                
                techIcon.addEventListener('mouseleave', () => {
                    techIcon.style.transform = `translate(${positions[index].x}, ${positions[index].y}) scale(1) rotate(0deg)`;
                });
                
                floatingIcons.appendChild(techIcon);
            }
        });
    }
}

// Performance optimized initialization
const initHeroAnimations = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new HeroAnimationController();
        });
    } else {
        new HeroAnimationController();
    }
};

// Initialize animations
initHeroAnimations();

// Background pattern animation
class BackgroundPatternController {
    constructor() {
        this.initPatterns();
    }

    initPatterns() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create animated background patterns
        this.createGridPattern();
        this.createFloatingOrbs();
    }

    createGridPattern() {
        const gridOverlay = document.querySelector('.grid-overlay');
        if (!gridOverlay) return;

        // Add dynamic grid animation based on scroll
        let ticking = false;
        const updateGrid = () => {
            const scrollY = window.scrollY;
            const translateX = (scrollY * 0.1) % 50;
            const translateY = (scrollY * 0.1) % 50;
            gridOverlay.style.transform = `translate(${translateX}px, ${translateY}px)`;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateGrid);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    createFloatingOrbs() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create additional floating orbs for depth
        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            orb.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 40}px;
                height: ${20 + Math.random() * 40}px;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatOrb ${10 + Math.random() * 20}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 1;
            `;
            hero.appendChild(orb);
        }

        // Add orb animation keyframes
        if (!document.querySelector('#orb-animations')) {
            const style = document.createElement('style');
            style.id = 'orb-animations';
            style.textContent = `
                @keyframes floatOrb {
                    0%, 100% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    33% { 
                        transform: translate(30px, -20px) scale(1.2);
                        opacity: 0.6;
                    }
                    66% { 
                        transform: translate(-20px, 30px) scale(0.8);
                        opacity: 0.4;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize background patterns
new BackgroundPatternController();

// Smooth reveal animations for elements
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe hero elements for staggered animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-buttons, .hero-social');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(element);
    });
};

// Add CSS for animate-in class
if (!document.querySelector('#reveal-animations')) {
    const style = document.createElement('style');
    style.id = 'reveal-animations';
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize reveal animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}
