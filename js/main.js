/* ====================================
   BrainArray — Main JavaScript
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollAnimations();
});


/* ---- Navigation ---- */

function initNav() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    // Shrink nav on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.style.padding = '0.75rem 2.5rem';
        } else {
            nav.style.padding = '1.25rem 2.5rem';
        }

        lastScroll = currentScroll;
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPage = href.split('/').pop();

        if (linkPage === currentPage ||
            (currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('nav__link--active');
        }
    });
}


/* ---- Scroll Animations ---- */

function initScrollAnimations() {
    // Animate elements when they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animatable elements
    document.querySelectorAll('.feature-card, .plus__inner, .about-value').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stagger feature cards
    document.querySelectorAll('.feature-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Stagger about values
    document.querySelectorAll('.about-value').forEach((val, i) => {
        val.style.transitionDelay = `${i * 0.1}s`;
    });
}

// CSS class for when elements are visible
const style = document.createElement('style');
style.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
