// Smooth scrolling for navigation links
document.querySelectorAll('.nav a, .footer-social a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links (starting with #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
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

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}ms`;
        }
    });
}, observerOptions);

// Observe all cards with staggered animation
document.querySelectorAll('.card').forEach((card, index) => {
    card.dataset.delay = index * 100; // Stagger animation by 100ms per card
    observer.observe(card);
});

// Form submission handling with better feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        
        // Formspree handles the actual submission
        // Re-enable after form is processed
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 3000);
    });
}

// Parallax effect for floating shapes (disabled on mobile for performance)
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add loading animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

// Lazy loading for iframes (improves performance)
const iframes = document.querySelectorAll('iframe');
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
            }
            iframeObserver.unobserve(iframe);
        }
    });
}, { rootMargin: '200px' });

iframes.forEach(iframe => {
    iframeObserver.observe(iframe);
});

// Smooth hover effect for social links (desktop only)
const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (!isMobile) {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        if (!isMobile) {
            link.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Add scroll progress indicator
let scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.height = '3px';
scrollProgress.style.background = 'linear-gradient(135deg, #00ff88, #00ccff)';
scrollProgress.style.zIndex = '10000';
scrollProgress.style.transition = 'width 0.1s';
scrollProgress.style.width = '0';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Console message
console.log('%c ADI.FX Portfolio ', 'background: linear-gradient(135deg, #00ff88, #00ccff); color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('Portfolio loaded successfully! 🚀');

// Prevent right-click on images and iframes (protect your work)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'IFRAME') {
        e.preventDefault();
        return false;
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize for mobile/desktop detection
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        location.reload(); // Reload to apply correct mobile/desktop settings
    }, 500);
});

// Add touch feedback for mobile
if (isMobile) {
    document.querySelectorAll('.card, .social-links a, .footer-social a, .submit-btn').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
    });
}

// Smooth scroll to top when clicking logo (if you add one later)
document.addEventListener('click', (e) => {
    if (e.target.closest('.hero h1')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or return to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Improve form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#00ff88';
    });
});

// Add animation to About section on scroll
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logo = aboutSection.querySelector('.about-logo');
                const text = aboutSection.querySelector('.about-text');
                
                if (logo) logo.style.animation = 'fadeInUp 0.8s ease-out';
                if (text) text.style.animation = 'fadeInUp 0.8s ease-out 0.2s backwards';
            }
        });
    }, { threshold: 0.2 });
    
    aboutObserver.observe(aboutSection);
}

// Log performance metrics (optional - for debugging)
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }
    }, 0);
});
