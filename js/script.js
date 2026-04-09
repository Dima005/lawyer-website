// Mobile menu toggle
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8783124742:AAHNyS6uVbX4rbt0oOdhZjqxlqdK4omq8DE';
const TELEGRAM_CHAT_ID = '752992499'; // Дима

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Format message for Telegram
        const telegramMessage = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email || 'Не указан'}

💬 <b>Сообщение:</b>
${message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
        `.trim();
        
        try {
            // Send to Telegram
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                alert('✅ Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});
