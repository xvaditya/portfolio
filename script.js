/* ═══════════════════════════════════════
   VIDEO MODAL PLAYER
═══════════════════════════════════════ */
const modal        = document.getElementById('videoModal');
const modalIframe  = document.getElementById('modalIframe');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDesc');
const modalClose   = document.getElementById('modalClose');

function openModal(src, title, desc) {
    modalIframe.src  = src;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    // Wipe iframe src so video stops playing
    setTimeout(() => { modalIframe.src = ''; }, 350);
    document.body.style.overflow = '';
}

// Click on any thumbnail → open modal
document.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        openModal(
            thumb.dataset.src,
            thumb.dataset.title,
            thumb.dataset.desc
        );
    });
});

// Close button
modalClose.addEventListener('click', closeModal);

// Click outside modal box to close
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

// Escape key to close
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            closeModal();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

/* ═══════════════════════════════════════
   SMOOTH SCROLLING NAV
═══════════════════════════════════════ */
document.querySelectorAll('.nav a, .footer-social a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    });
});

/* ═══════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
    const sections  = document.querySelectorAll('section');
    const navLinks  = document.querySelectorAll('.nav a');
    let current = '';

    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
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

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════ */
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(135deg,#00ff88,#00ccff);z-index:10000;transition:width 0.1s;width:0;pointer-events:none;';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const total   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct     = (window.pageYOffset / total) * 100;
    scrollProgress.style.width = pct + '%';
});

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        const btn = contactForm.querySelector('.submit-btn');
        const orig = btn.textContent;
        btn.textContent = 'SENDING…';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    });
}

/* ═══════════════════════════════════════
   FORM VALIDATION HIGHLIGHT
═══════════════════════════════════════ */
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('blur', function() {
        this.style.borderColor = (this.value.trim() === '' && this.hasAttribute('required'))
            ? 'rgba(255,60,60,0.5)'
            : 'rgba(255,255,255,0.1)';
    });
    input.addEventListener('focus', function() { this.style.borderColor = '#00ff88'; });
});

/* ═══════════════════════════════════════
   ABOUT SECTION FADE IN
═══════════════════════════════════════ */
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logo = aboutSection.querySelector('.about-logo');
                const text = aboutSection.querySelector('.about-text');
                if (logo) logo.style.animation = 'fadeInUp 0.8s ease-out';
                if (text) text.style.animation = 'fadeInUp 0.8s ease-out 0.2s backwards';
            }
        });
    }, { threshold: 0.2 }).observe(aboutSection);
}

/* ═══════════════════════════════════════
   PARALLAX SHAPES (desktop only)
═══════════════════════════════════════ */
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.shape').forEach((shape, i) => {
            shape.style.transform = `translateY(${-(scrolled * (0.3 + i * 0.1))}px)`;
        });
    });
}

/* ═══════════════════════════════════════
   HERO CLICK → SCROLL TO TOP
═══════════════════════════════════════ */
document.addEventListener('click', e => {
    if (e.target.closest('.hero h1')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

/* ═══════════════════════════════════════
   PAGE LOAD FADE IN
═══════════════════════════════════════ */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

/* ═══════════════════════════════════════
   MOBILE TOUCH FEEDBACK
═══════════════════════════════════════ */
if (window.innerWidth <= 768) {
    document.querySelectorAll('.video-thumb, .submit-btn').forEach(el => {
        el.addEventListener('touchstart', function() { this.style.opacity = '0.75'; });
        el.addEventListener('touchend',   function() { setTimeout(() => { this.style.opacity = '1'; }, 150); });
    });
}

/* ═══════════════════════════════════════
   CONTEXT MENU BLOCK ON IFRAMES
═══════════════════════════════════════ */
document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'IFRAME') {
        e.preventDefault();
    }
});

console.log('%c ADI.FX Portfolio ', 'background:linear-gradient(135deg,#00ff88,#00ccff);color:#0a0a0a;font-size:20px;font-weight:bold;padding:10px 20px;border-radius:5px;');
