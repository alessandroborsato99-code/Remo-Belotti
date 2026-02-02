// Remo Belotti - Idraulico
// JavaScript - Stile IASO

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------
    // Header Scroll Effect
    // ----------------------------------------
    const header = document.getElementById('header');
    let ticking = false;

    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ----------------------------------------
    // Mobile Menu
    // ----------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-open');
            document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close on link click
        mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ----------------------------------------
    // Reveal on Scroll
    // ----------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------
    // Smooth Scroll
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu
                    if (mobileMenu?.classList.contains('is-open')) {
                        menuToggle.classList.remove('is-active');
                        mobileMenu.classList.remove('is-open');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });

    // ----------------------------------------
    // Form Handler
    // ----------------------------------------
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Success overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(28, 28, 28, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.4s ease;
            `;

            overlay.innerHTML = `
                <div style="
                    background: #E8E2DA;
                    padding: 3rem;
                    max-width: 420px;
                    text-align: center;
                    transform: translateY(20px);
                    transition: transform 0.4s ease;
                ">
                    <p style="
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 0.2em;
                        color: #5A5A5A;
                        margin-bottom: 1rem;
                    ">Grazie</p>
                    <h3 style="
                        font-family: 'Clash Display', sans-serif;
                        font-size: 2rem;
                        font-weight: 500;
                        margin-bottom: 1rem;
                        color: #1C1C1C;
                    ">Richiesta Inviata</h3>
                    <p style="
                        color: #5A5A5A;
                        margin-bottom: 2rem;
                        line-height: 1.6;
                    ">Ti risponderò entro 24 ore.</p>
                    <button onclick="this.closest('div').parentElement.remove();" style="
                        background: #1C1C1C;
                        color: #FAFAFA;
                        border: none;
                        padding: 1rem 2rem;
                        font-family: inherit;
                        font-size: 0.875rem;
                        font-weight: 500;
                        border-radius: 100px;
                        cursor: pointer;
                        transition: background 0.3s;
                    " onmouseover="this.style.background='#B07D4F'"
                       onmouseout="this.style.background='#1C1C1C'">Chiudi</button>
                </div>
            `;

            document.body.appendChild(overlay);

            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                overlay.querySelector('div').style.transform = 'translateY(0)';
            });

            form.reset();
        });
    }

});
