// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillBars.forEach((bar, index) => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            
            // Add staggered animation delay
            setTimeout(() => {
                bar.style.width = width;
                bar.classList.add('animated');
                
                // Add entrance animation to skill card
                if (skillCards[index]) {
                    skillCards[index].classList.add('animate-in');
                }
                
                // Animate percentage counter
                const percentage = parseInt(width);
                const percentageElement = bar.nextElementSibling;
                if (percentageElement && percentageElement.classList.contains('skill-percentage')) {
                    animateCounter(percentageElement, 0, percentage, 1500, '%');
                }
                
                // Animate skill dots
                const skillCard = bar.closest('.skill-card');
                const skillDots = skillCard.querySelectorAll('.skill-dot');
                const activeDots = Math.round((percentage / 100) * skillDots.length);
                
                skillDots.forEach((dot, dotIndex) => {
                    setTimeout(() => {
                        if (dotIndex < activeDots) {
                            dot.classList.add('active');
                        }
                    }, dotIndex * 100);
                });
                
            }, index * 200); // Staggered animation
        }
    });
};

// Counter animation function
const animateCounter = (element, start, end, duration, suffix = '%') => {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
};

// Enhanced scroll animations
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation classes
                if (element.classList.contains('skill-card')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                    }, index * 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) rotateX(-20deg) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });
};

// Add interactive hover effects
const addSkillCardInteractions = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const icon = card.querySelector('.skill-icon');
        const progressBar = card.querySelector('.skill-progress');
        
        card.addEventListener('mouseenter', () => {
            // Add extra glow effect on hover
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
            }
            
            // Add icon bounce effect
            if (icon) {
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'iconBounce 0.6s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset effects
            if (progressBar) {
                progressBar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }
            
            if (icon) {
                icon.style.animation = 'iconPulse 3s ease-in-out infinite';
            }
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-25px) rotateX(15deg) rotateY(5deg) scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
};

// Add CSS keyframes for new animations
const addCustomAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: scale(1.15) rotateY(360deg); }
            50% { transform: scale(1.25) rotateY(180deg) translateY(-5px); }
        }
        
        @keyframes skillDotPulse {
            0%, 100% { transform: scale(1.2); box-shadow: 0 0 10px rgba(0, 212, 255, 0.5); }
            50% { transform: scale(1.4); box-shadow: 0 0 20px rgba(0, 212, 255, 0.8); }
        }
        
        .skill-dot.active {
            animation: skillDotPulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
};

// Initialize enhanced skill animations
document.addEventListener('DOMContentLoaded', () => {
    addCustomAnimations();
    observeElements();
    addSkillCardInteractions();
    
    // Initial skill bar animation check
    animateSkillBars();
});

// Update scroll event listener
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Animate skill bars on scroll
    animateSkillBars();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize skill bar animation
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on load
});

// Add typing effect to hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced company logo interactions
const addCompanyLogoEffects = () => {
    const companyLogos = document.querySelectorAll('.company-logo');
    
    companyLogos.forEach(logo => {
        const logoImg = logo.querySelector('.logo-img');
        
        // Add hover effects
        logo.addEventListener('mouseenter', () => {
            if (logoImg) {
                logoImg.style.transform = 'scale(1.1) rotate(5deg)';
                logoImg.style.filter = 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.2))';
            }
        });
        
        logo.addEventListener('mouseleave', () => {
            if (logoImg) {
                logoImg.style.transform = 'scale(1)';
                logoImg.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            }
        });
        
        // Add click effect with bounce animation
        logo.addEventListener('click', () => {
            if (logoImg) {
                logoImg.style.animation = 'none';
                logoImg.offsetHeight; // Trigger reflow
                logoImg.style.animation = 'logoClick 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        });
    });
};

// Add timeline item enhanced interactions
const addTimelineInteractions = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add staggered entrance animation
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', () => {
            // Dim other timeline items
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.6';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });
            
            // Enhance current item
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            // Restore all timeline items
            timelineItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
                otherItem.style.zIndex = '1';
            });
        });
        
        // Add click to expand functionality
        item.addEventListener('click', () => {
            const content = item.querySelector('.timeline-content p');
            const techTags = item.querySelector('.tech-tags');
            
            if (content.style.maxHeight === 'none') {
                content.style.maxHeight = '';
                techTags.style.maxHeight = '';
                item.classList.remove('expanded');
            } else {
                content.style.maxHeight = 'none';
                techTags.style.maxHeight = 'none';
                item.classList.add('expanded');
            }
        });
    });
};

// Enhanced About Section Animations
const addAboutSectionAnimations = () => {
    // Stats counter animation
    const animateStatsCounter = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalCount = parseInt(target.getAttribute('data-count'));
                    
                    // Use different suffixes based on the stat type
                    let suffix = '';
                    if (finalCount === 1000) {
                        suffix = '+'; // For LeetCode problems: 1000+
                    } else if (finalCount === 2) {
                        suffix = '+'; // For experience: 2 Yrs
                    } else {
                        suffix = ''; // For projects: just the number
                    }
                    
                    animateCounter(target, 0, finalCount, 2000, suffix);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    };
    
    // Enhanced info item interactions
    const addInfoItemEffects = () => {
        const infoItems = document.querySelectorAll('.info-item');
        
        infoItems.forEach(item => {
            const badges = item.querySelectorAll('.education-badge, .contact-badge');
            
            // Add staggered badge animations on hover
            item.addEventListener('mouseenter', () => {
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.transform = 'translateY(-5px) scale(1.05)';
                        badge.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(255, 0, 128, 0.3) 100%)';
                    }, index * 100);
                });
            });
            
            item.addEventListener('mouseleave', () => {
                badges.forEach(badge => {
                    badge.style.transform = '';
                    badge.style.background = '';
                });
            });
            
            // Add click effect to badges
            badges.forEach(badge => {
                badge.addEventListener('click', () => {
                    badge.style.animation = 'none';
                    badge.offsetHeight; // Trigger reflow
                    badge.style.animation = 'badgeClick 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                });
            });
        });
    };
    
    // Typing effect for about text
    const addTypingEffect = () => {
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.3
        });
        
        aboutParagraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateX(-30px)';
            p.style.transition = `all 0.8s ease ${index * 0.2}s`;
            observer.observe(p);
        });
    };
    
    // Initialize all about section animations
    animateStatsCounter();
    addInfoItemEffects();
    addTypingEffect();
};

// Enhanced Achievements Section
const addAchievementsInteractions = () => {
    // Tab switching functionality
    const initializeTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Animate tab content entrance
                setTimeout(() => {
                    if (targetContent) {
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    }
                }, 100);
            });
        });
    };
    
    // Achievement stats counter
    const animateAchievementStats = () => {
        const statNumbers = document.querySelectorAll('.achievement-stats .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalCount = parseInt(target.getAttribute('data-target'));
                    
                    let suffix = '';
                    if (finalCount === 1000) {
                        suffix = '+';
                    }
                    
                    animateCounter(target, 0, finalCount, 2500, suffix);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    };
    
    // Card hover effects with optimized animations
    const addCardEffects = () => {
        const cards = document.querySelectorAll('.achievement-card, .certification-card, .competition-card');
        
        // Single observer for all cards to improve performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Reduced delay for faster loading
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Reduced from 200ms to 100ms
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Reduced from 0.2 for earlier triggering
            rootMargin: '50px' // Added margin for smoother loading
        });
        
        cards.forEach((card, index) => {
            // Simplified entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)'; // Reduced from 60px
            card.style.transition = 'all 0.5s ease-out'; // Simplified transition
            
            observer.observe(card);
            
            // Simplified hover interactions
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)'; // Simplified transform
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    };
    
    // Optimized tags animation
    const addTagsAnimation = () => {
        const tags = document.querySelectorAll('.tag, .skill-tag');
        
        // Use CSS for hover effects instead of JavaScript for better performance
        tags.forEach((tag) => {
            tag.style.transition = 'all 0.2s ease'; // Fast transition
        });
    };
    
    // Initialize all achievements interactions
    initializeTabs();
    animateAchievementStats();
    addCardEffects();
    addTagsAnimation();
};

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
    addCompanyLogoEffects();
    addTimelineInteractions();
    addAboutSectionAnimations();
    addAchievementsInteractions();
});

// Add CSS for new animations
const timelineStyle = document.createElement('style');
timelineStyle.textContent = `
    @keyframes logoClick {
        0% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1.05); }
    }
    
    @keyframes badgeClick {
        0% { transform: scale(1); }
        50% { transform: scale(1.15) rotate(3deg); }
        100% { transform: scale(1.05); }
    }
    
    .timeline-item {
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .timeline-item.expanded {
        background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.1) 0%, 
            rgba(26, 26, 46, 0.9) 30%, 
            rgba(255, 0, 128, 0.1) 100%
        );
    }
    
    .timeline-content p,
    .tech-tags {
        transition: max-height 0.5s ease-in-out;
        overflow: hidden;
    }
    
    .company-logo {
        cursor: pointer;
        user-select: none;
    }
    
    .logo-img {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .education-badge,
    .contact-badge {
        user-select: none;
    }
`;
document.head.appendChild(timelineStyle);

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #007bff !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Enhanced Projects Functionality
class ProjectManager {
    constructor() {
        this.projects = document.querySelectorAll('.project-card');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('projectSearch');
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        // Initialize filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Initialize search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Initialize project stats counter animation
        this.initStatsCounter();
        
        // Initialize entrance animations
        this.initEntranceAnimations();
    }
    
    handleFilterClick(button) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get filter category
        this.currentFilter = button.getAttribute('data-filter');
        
        // Filter projects
        this.filterProjects();
    }
    
    filterProjects() {
        console.log('Filtering projects with filter:', this.currentFilter); // Debug log
        
        this.projects.forEach((project, index) => {
            const category = project.getAttribute('data-category');
            const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : '';
            
            console.log('Project category:', category, 'Current filter:', this.currentFilter); // Debug log
            
            // Check if project matches filter and search
            const matchesFilter = this.currentFilter === 'all' || category === this.currentFilter;
            const matchesSearch = this.matchesSearchTerm(project, searchTerm);
            
            if (matchesFilter && matchesSearch) {
                project.classList.remove('hidden');
                project.style.display = 'block';
                // Add staggered animation delay
                setTimeout(() => {
                    project.style.animationDelay = `${index * 0.1}s`;
                }, 50);
            } else {
                project.classList.add('hidden');
                project.style.display = 'none';
            }
        });
    }
    
    handleSearch(searchTerm) {
        this.filterProjects();
    }
    
    matchesSearchTerm(project, searchTerm) {
        if (!searchTerm) return true;
        
        const title = project.querySelector('h3').textContent.toLowerCase();
        const description = project.querySelector('p').textContent.toLowerCase();
        const tech = project.getAttribute('data-tech').toLowerCase();
        const category = project.getAttribute('data-category').toLowerCase();
        
        return title.includes(searchTerm) || 
               description.includes(searchTerm) || 
               tech.includes(searchTerm) ||
               category.includes(searchTerm);
    }
    
    initStatsCounter() {
        const statsNumbers = document.querySelectorAll('.project-stats .stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsNumbers.forEach(stat => observer.observe(stat));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    initEntranceAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Animate project cards on scroll
        this.projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(50px)';
            project.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(project);
        });
        
        // Animate filter buttons
        this.filterButtons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = `all 0.4s ease ${0.5 + index * 0.1}s`;
            
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

// Enhanced Project Card Interactions
class ProjectCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.addHoverEffects(card);
            this.addClickEffects(card);
        });
    }
    
    addHoverEffects(card) {
        const img = card.querySelector('.project-img');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            // Add subtle tilt effect based on mouse position
            card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        });
        
        card.addEventListener('mouseleave', () => {
            card.removeEventListener('mousemove', this.handleMouseMove);
            card.style.transform = '';
        });
    }
    
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }
    
    addClickEffects(card) {
        const links = card.querySelectorAll('.project-link');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add ripple effect
                this.createRipple(e, link);
            });
        });
    }
    
    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize enhanced project functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
    new ProjectCardEffects();
});
