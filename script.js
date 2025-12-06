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
// CATCH ME IF YOU CAN - GAME LOGIC
// ==========================================

// Game Variables
let gameActive = true;
let targetElement = document.getElementById('movingTarget');
let gameContainer = document.querySelector('.game-container');
let contactModal = document.getElementById('contactModal');
let closeModalBtn = document.getElementById('closeModal');
let minDistance = 50; // Very small escape radius
let escapeCounter = 0;
let maxEscapes = 1; // Only 1 escape, then it's catchable

// Function to generate random position
function getRandomPosition() {
    if (!gameContainer) return { x: 0, y: 0 };
    
    const containerRect = gameContainer.getBoundingClientRect();
    const maxX = containerRect.width - 80; // 80 is target size
    const maxY = containerRect.height - 80;
    
    return {
        x: Math.random() * maxX,
        y: Math.random() * maxY
    };
}

// Function to update target position
function moveTarget() {
    if (!targetElement || !gameActive) return;
    
    const newPos = getRandomPosition();
    targetElement.style.left = newPos.x + 'px';
    targetElement.style.top = newPos.y + 'px';
}

// Initialize target position on page load
window.addEventListener('load', function() {
    if (targetElement && gameContainer) {
        moveTarget();
        escapeCounter = 0;
        
        // Move target every 2-2.5 seconds
        const moveInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(moveInterval);
                return;
            }
            moveTarget();
            escapeCounter = 0; // Reset escape counter on natural move
        }, 2000 + Math.random() * 500);
    }
});

// Handle mouse movement for escape effect
document.addEventListener('mousemove', function(e) {
    if (!targetElement || !gameActive || !gameContainer) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    
    // Calculate distance between mouse and target
    const distanceX = e.clientX - targetCenterX;
    const distanceY = e.clientY - targetCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If mouse is too close, escape! But only after a few escapes, it gives up
    if (distance < minDistance && escapeCounter < maxEscapes) {
        escapeCounter++;
        moveTarget();
        
        // Add wiggle animation to show it's nervous
        targetElement.style.animation = 'wiggle 0.2s ease';
        setTimeout(() => {
            if (gameActive) {
                targetElement.style.animation = 'floatTarget 4s ease-in-out infinite';
            }
        }, 200);
    }
});

// Handle target click to catch the target
if (targetElement) {
    targetElement.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!gameActive) return;
        
        gameActive = false;
        
        // Add celebration animation
        targetElement.style.animation = 'celebration 0.6s ease';
        
        // Show celebration message
        setTimeout(() => {
            if (contactModal) {
                contactModal.classList.add('active');
            }
            gameActive = true;
        }, 300);
    });
}

// Handle modal close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        if (contactModal) {
            contactModal.classList.remove('active');
            gameActive = true;
        }
    });
}

// Close modal when clicking outside content
if (contactModal) {
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            gameActive = true;
        }
    });
}

// Add celebration animation
const celebrationKeyframes = `
    @keyframes celebration {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(-10deg); }
        50% { transform: scale(0.9) rotate(10deg); }
        75% { transform: scale(1.15) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
`;

// Inject celebration keyframes if not already present
const style = document.createElement('style');
style.textContent = celebrationKeyframes;
document.head.appendChild(style);

// ==========================================
// RESUME DOWNLOAD
// ==========================================
const resumeDownloadBtn = document.getElementById('resume-download');
const resumeModalDownloadBtn = document.getElementById('resume-modal-download');

function downloadResume(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'HAREESH_RESUME.pdf';
    link.download = 'HAREESH_Bagayiti_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Resume downloading...');
}

if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', downloadResume);
}

if (resumeModalDownloadBtn) {
    resumeModalDownloadBtn.addEventListener('click', downloadResume);
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
