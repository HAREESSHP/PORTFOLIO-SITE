/* ==========================================
   MODERN PORTFOLIO WEBSITE - JAVASCRIPT
   Advanced Animations & Interactive Features
   ========================================== */

// ==========================================
// DARK MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
const typewriterElement = document.querySelector('.typewriter');
const roles = [
    'Full Stack Developer',
    'AI & ML Enthusiast',
    'Problem Solver',
    'Tech Innovator',
    'Web Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    typewriterElement.textContent = currentRole.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typewriterEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typewriterEffect, 500);
        return;
    }
    
    setTimeout(typewriterEffect, isDeleting ? 30 : 50);
}

typewriterEffect();

// ==========================================
// SMOOTH SCROLL
// ==========================================
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

// ==========================================
// INTERSECTION OBSERVER - SCROLL REVEAL
// ==========================================
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    revealOnScroll.observe(section);
});

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;
        
        if (distance < maxDistance) {
            const moveX = (x / distance) * 15;
            const moveY = (y / distance) * 15;
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// 3D TILT EFFECT FOR PROJECT CARDS
// ==========================================
VanillaTilt.init(document.querySelectorAll('.project-card[data-tilt]'), {
    max: 25,
    speed: 400,
    scale: 1.05
});

// ==========================================
// PARALLAX SCROLL EFFECT
// ==========================================
const parallaxBg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
    if (parallaxBg) {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
        const emailInput = contactForm.querySelector('input[placeholder="Your Email"]');
        const subjectInput = contactForm.querySelector('input[placeholder="Subject"]');
        const messageInput = contactForm.querySelector('textarea');
        
        const name = nameInput.value;
        const email = emailInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! 👋\n\nI have a message for you:\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // WhatsApp number (with country code, no + or spaces)
        const whatsappNumber = '919346315298';
        
        // Open WhatsApp Web
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Show notification
        showNotification('Opening WhatsApp... 💬');
        
        // Open WhatsApp in new tab
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 500);
        
        // Reset form
        contactForm.reset();
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// PROJECT FILTER FUNCTIONALITY
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            }
        });
    });
});

// ==========================================
// RESUME DOWNLOAD
// ==========================================
const resumeDownloadBtn = document.getElementById('resume-download');

if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'HAREESH_RESUME.pdf';
        link.download = 'HAREESH_Bagayiti_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Resume downloading...');
    });
}

// ==========================================
// NOTIFICATION FUNCTION
// ==========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:1rem 1.5rem;background:linear-gradient(135deg,#6366f1,#ec4899);color:white;border-radius:0.75rem;box-shadow:0 4px 15px rgba(99,102,241,0.4);z-index:2000;font-weight:600;animation:slideInRight 0.3s ease';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
}

// ==========================================
// INITIALIZATION LOG
// ==========================================
console.log('%cPortfolio Website Loaded Successfully! 🚀', 'color: #6366f1; font-size: 14px; font-weight: bold;');
console.log('%cAll features active: Dark Mode, Typewriter, Filters, Resume Download, Scroll-to-Top', 'color: #10b981; font-size: 12px;');
