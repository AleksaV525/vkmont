// ============================================================
//  VK MONT — script.js
// ============================================================

// --- 1. HAMBURGER MENI ---
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');
const navbar    = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Sprečava scroll kad je meni otvoren
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Zatvori meni pri kliku na link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// --- 2. NAVBAR SCROLL EFEKAT ---
const onScroll = () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // Pokreni odmah

// --- 3. REVEAL ANIMACIJE (Scroll) ---
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
}

// --- 4. SMOOTH SCROLL za anchor linkove ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// --- 5. KONTAKT FORMA (osnovna validacija) ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-primary');
        btn.textContent = '✓ Poruka poslata!';
        btn.style.background = '#28a745';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Pošalji poruku';
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}