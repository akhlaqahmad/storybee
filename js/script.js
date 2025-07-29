// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeMobileMenu();
        initializeFAQ();
        initializeScrollEffects();
    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});

// Mobile Menu Toggle Functionality
function initializeMobileMenu() {
    try {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                
                // Toggle hamburger animation
                this.classList.toggle('active');
                
                // Update aria-expanded for accessibility
                const isExpanded = nav.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            });
            
            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-list a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// FAQ Accordion Functionality
function initializeFAQ() {
    try {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current FAQ item
                if (isExpanded) {
                    this.setAttribute('aria-expanded', 'false');
                    answer.classList.remove('active');
                } else {
                    this.setAttribute('aria-expanded', 'true');
                    answer.classList.add('active');
                }
            });
        });
    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    try {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (href === '#' || href === '') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .story-card, .step-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
    } catch (error) {
        console.error('Error initializing scroll effects:', error);
    }
}

// Statistics Counter Animation
function animateCounters() {
    try {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    } catch (error) {
        console.error('Error animating counters:', error);
    }
}

// Initialize counter animation when statistics section is visible
function initializeCounterAnimation() {
    try {
        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    } catch (error) {
        console.error('Error initializing counter animation:', error);
    }
}

// Call counter animation initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCounterAnimation();
});

// Handle image loading errors
function handleImageErrors() {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Create a placeholder div if image fails to load
                const placeholder = document.createElement('div');
                placeholder.style.width = this.style.width || '100px';
                placeholder.style.height = this.style.height || '60px';
                placeholder.style.backgroundColor = '#f1f5f9';
                placeholder.style.display = 'flex';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.color = '#64748b';
                placeholder.style.fontSize = '12px';
                placeholder.style.borderRadius = '4px';
                placeholder.textContent = 'Image not available';
                
                // Replace the image with placeholder
                if (this.parentNode) {
                    this.parentNode.replaceChild(placeholder, this);
                }
            });
        });
    } catch (error) {
        console.error('Error handling image errors:', error);
    }
}

// Initialize image error handling
document.addEventListener('DOMContentLoaded', function() {
    handleImageErrors();
});

// Add loading states for better UX
function addLoadingStates() {
    try {
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Remove loading class when page is fully loaded
        window.addEventListener('load', function() {
            document.body.classList.remove('loading');
        });
        
        // Add loading states to buttons
        const buttons = document.querySelectorAll('button, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (!this.classList.contains('loading')) {
                    this.classList.add('loading');
                    
                    // Remove loading state after 2 seconds (simulate processing)
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 2000);
                }
            });
        });
    } catch (error) {
        console.error('Error adding loading states:', error);
    }
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', function() {
    addLoadingStates();
});

// Utility function to debounce scroll events
function debounce(func, wait) {
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

// Add scroll-based header styling
function initializeHeaderScroll() {
    try {
        const header = document.querySelector('.header');
        
        const handleScroll = debounce(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
    } catch (error) {
        console.error('Error initializing header scroll:', error);
    }
}

// Initialize header scroll effects
document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderScroll();
});

// Add CSS for additional interactive states
const additionalStyles = `
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    button.loading::after {
        content: "";
        width: 16px;
        height: 16px;
        margin-left: 8px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        display: inline-block;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
