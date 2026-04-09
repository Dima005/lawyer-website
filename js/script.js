// Mobile menu toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

if (burger) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Smooth scroll
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

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Header scroll effect with hide on mobile
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide/show header on mobile when scrolling
    if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    // Compact header on scroll
    if (currentScroll > 100) {
        header.style.padding = '0.8rem 0';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.padding = '1.2rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});
