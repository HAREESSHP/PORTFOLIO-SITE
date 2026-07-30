/**
 * PROFESSIONAL PORTFOLIO - JAVASCRIPT
 * Hareesh Bagayiti - Full Stack Developer
 * Clean, minimal, and functional
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. MOBILE MENU TOGGLE
       ============================================ */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================================
       3. TYPEWRITER EFFECT
       ============================================ */
    const roles = [
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'Python Developer',
        'Problem Solver'
    ];

    const typewriter = document.querySelector('.typewriter');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
        if (!typewriter) return;

        const currentRole = roles[roleIndex];
        
        if (isPaused) {
            isPaused = false;
            setTimeout(typeEffect, 2000);
            return;
        }

        if (isDeleting) {
            // Deleting
            typewriter.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing
            typewriter.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing - pause then delete
            speed = 2000;
            isPaused = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting - move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    // Start typewriter after a short delay
    if (typewriter) {
        setTimeout(typeEffect, 500);
    }

    /* ============================================
       4. SCROLL TO TOP BUTTON
       ============================================ */
    const scrollBtn = document.getElementById('scrollTop');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================
       5. ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary)';
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    /* ============================================
       6. CONTACT FORM HANDLING
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Build mailto link as fallback
            const mailtoLink = `mailto:bagayithiharish@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
            )}`;

            try {
                // Attempt to send via Formspree (free service)
                const response = await fetch('https://formspree.io/f/xpwqkqwg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Show success
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. I'll get back to you soon.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Fallback: open mailto link
                window.location.href = mailtoLink;
                
                // Reset form
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }
        });
    }

    /* ============================================
       7. SMOOTH SCROLL FOR NAV (Fallback)
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       8. INTERSECTION OBSERVER (Reveal Animations)
       ============================================ */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and items for fade-in animation
    document.querySelectorAll(
        '.project-card, .skill-card, .achievement-card, .timeline-item, .stat-item, .contact-item'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});