// Portfolio JavaScript for Ajay Tayade

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tsParticles for constellation background
    initParticles();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize skill tags
    initSkillTags();
    
    // Initialize project cards
    initProjectCards();
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize certification cards
    initCertificationCards();
});

// Initialize tsParticles constellation background
function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "transparent"
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: ["grab", "repulse"]
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.8
                        }
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: "#2ecbd0"
                },
                links: {
                    color: "#2ecbd0",
                    distance: 120,
                    enable: true,
                    opacity: 0.4,
                    width: 1
                },
                collisions: {
                    enable: false
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce"
                    },
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 60
                },
                opacity: {
                    value: 0.7
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 3 }
                }
            },
            detectRetina: true
        });
    } else {
        // Retry after a short delay if tsParticles isn't loaded yet
        setTimeout(initParticles, 1000);
    }
}

// Initialize smooth scroll navigation with proper targeting
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .hero-buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            let targetSection;
            
            // Handle special case for home navigation
            if (targetId === 'home') {
                targetSection = document.getElementById('home');
            } else {
                targetSection = document.getElementById(targetId);
            }
            
            if (targetSection) {
                const navbarHeight = 80;
                let targetPosition;
                
                // Special handling for home section to scroll to very top
                if (targetId === 'home') {
                    targetPosition = 0;
                } else {
                    targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update browser history
                if (targetId !== 'home') {
                    history.pushState({ section: targetId }, '', `#${targetId}`);
                } else {
                    history.pushState({ section: 'home' }, '', '#home');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    // Check if we're at the very top of the page
    if (window.pageYOffset < 100) {
        current = 'home';
    } else {
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Initialize contact form validation and submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!validateForm(name, email, subject, message)) {
                return;
            }
            
            // Simulate form submission
            handleFormSubmission(this);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                message = 'Subject must be at least 5 characters';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        display: block;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validate contact form
function validateForm(name, email, subject, message) {
    const nameField = document.querySelector('input[name="name"]');
    const emailField = document.querySelector('input[name="email"]');
    const subjectField = document.querySelector('input[name="subject"]');
    const messageField = document.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    if (!validateField(nameField)) isValid = false;
    if (!validateField(emailField)) isValid = false;
    if (!validateField(subjectField)) isValid = false;
    if (!validateField(messageField)) isValid = false;
    
    return isValid;
}

// Handle form submission
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Clear any field errors
        const fieldErrors = form.querySelectorAll('.field-error');
        fieldErrors.forEach(error => error.remove());
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        ${type === 'success' 
            ? 'background-color: rgba(46, 203, 208, 0.1); color: #2ecbd0; border: 1px solid rgba(46, 203, 208, 0.3);'
            : 'background-color: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
        }
    `;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

// Initialize scroll effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 21, 36, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 21, 36, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Reveal animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // Special animations for different sections
                if (entry.target.id === 'projects') {
                    animateProjectCards();
                } else if (entry.target.id === 'experience') {
                    animateTimelineItems();
                } else if (entry.target.id === 'certifications') {
                    animateCertificationCards();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for reveal animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Add reveal class styling
    if (!document.getElementById('reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate project cards on reveal
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, index * 150);
    });
}

// Animate timeline items on reveal
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            if (index % 2 === 1) {
                item.style.transform = 'translateX(30px)';
            }
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 200);
    });
}

// Animate certification cards on reveal
function animateCertificationCards() {
    const certCards = document.querySelectorAll('.certification-card');
    certCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) rotateY(15deg)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Skill tag hover effects
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add pulse effect
            this.style.animation = 'pulse 0.3s ease-in-out';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        // Add click effect for mobile
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add subtle parallax effect to project image
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                projectImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                projectImage.style.transform = 'rotateX(0) rotateY(0)';
            });
        }
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const content = this.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1.03)';
                content.style.boxShadow = '0 12px 24px rgba(46, 203, 208, 0.15)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const content = this.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'scale(1)';
                content.style.boxShadow = '';
            }
        });
    });
}

// Certification card interactions
function initCertificationCards() {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotateY(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0)';
            }
        });
    });
}

// Add CSS keyframes for animations
if (!document.getElementById('animation-styles')) {
    const additionalStyles = document.createElement('style');
    additionalStyles.id = 'animation-styles';
    additionalStyles.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .slide-in-left {
            animation: slideInLeft 0.6s ease-out;
        }
        
        .slide-in-right {
            animation: slideInRight 0.6s ease-out;
        }
        
        .nav-link.active {
            color: #2ecbd0 !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Enhanced project card hover effects */
        .project-card {
            perspective: 1000px;
        }
        
        .project-image {
            transition: transform 0.3s ease;
            transform-style: preserve-3d;
        }
        
        /* Timeline marker pulse effect */
        .timeline-marker {
            animation: markerPulse 2s infinite;
        }
        
        @keyframes markerPulse {
            0% { box-shadow: 0 0 0 3px rgba(46, 203, 208, 0.7); }
            50% { box-shadow: 0 0 0 6px rgba(46, 203, 208, 0.3); }
            100% { box-shadow: 0 0 0 3px rgba(46, 203, 208, 0.7); }
        }
        
        /* Certification icon rotation */
        .certification-icon {
            transition: transform 0.6s ease;
        }
        
        /* Skill tag enhanced hover */
        .skill-tag {
            position: relative;
            overflow: hidden;
        }
        
        .skill-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(46, 203, 208, 0.3), transparent);
            transition: left 0.5s ease;
        }
        
        .skill-tag:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(additionalStyles);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.section) {
        const section = document.getElementById(e.state.section);
        if (section) {
            const navbarHeight = 80;
            const targetPosition = e.state.section === 'home' ? 0 : section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization: Lazy load images when they come into view
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Debug function to check if tsParticles is loaded
function checkParticles() {
    if (typeof tsParticles !== 'undefined') {
        console.log('✅ tsParticles loaded successfully');
        initParticles();
    } else {
        console.warn('⚠️ tsParticles not loaded, retrying...');
        // Retry after a short delay
        setTimeout(() => {
            if (typeof tsParticles !== 'undefined') {
                console.log('✅ tsParticles loaded on retry');
                initParticles();
            } else {
                console.error('❌ tsParticles failed to load');
            }
        }, 1000);
    }
}

// Initialize everything when DOM is ready
window.addEventListener('load', function() {
    checkParticles();
    
    // Initialize hero section animations
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('fade-in-up');
        }, 500);
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});