/* ============================================
   BL INGENIEROS — Main JavaScript
   ============================================ */
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initNavbar();
    initSmoothScroll();
    initRevealAnimations();
    initContactForm();
});

/* ---------- Hero Slider ---------- */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    const prevBtn = document.querySelector('.hero__arrow--prev');
    const nextBtn = document.querySelector('.hero__arrow--next');
    let current = 0;
    let interval;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo(current + 1);
    }

    function startAutoPlay() {
        interval = setInterval(next, 5000);
    }

    function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }

    prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.slide));
            resetAutoPlay();
        });
    });

    startAutoPlay();
}

/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');
    const menuLinks = menu?.querySelectorAll('a');

    // Sticky shadow
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Hamburger toggle
    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu?.classList.toggle('open');
        document.body.style.overflow = menu?.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    menuLinks?.forEach(link => {
        link.addEventListener('click', () => {
            toggle?.classList.remove('active');
            menu?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = menu?.querySelector(`a[href="#${id}"]`);

            if (scrollY >= top && scrollY < top + height) {
                menuLinks?.forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        });
    });
}

/* ---------- Reveal Animations ---------- */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    // Also reveal about cards and client cards
    document.querySelectorAll('.about__card, .client-card, .objective-item').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            observer.observe(el);
        }
    });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName')?.value;
        const email = document.getElementById('formEmail')?.value;
        const message = document.getElementById('formMessage')?.value;

        if (name && email && message) {
            // Show success feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '¡MENSAJE ENVIADO!';
            btn.style.background = '#2e9b3e';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }
    });
}
