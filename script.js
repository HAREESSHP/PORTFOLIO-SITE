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

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================================
       2. TYPEWRITER EFFECT
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
            typewriter.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000;
            isPaused = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    if (typewriter) {
        setTimeout(typeEffect, 500);
    }

    /* ============================================
       3. SCROLL TO TOP BUTTON
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
       4. ACTIVE NAV LINK ON SCROLL
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
       5. CONTACT FORM HANDLING
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            const mailtoLink = `mailto:bagayithiharish@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
            )}`;

            try {
                const response = await fetch('https://formspree.io/f/xpwqkqwg', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
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
                window.location.href = mailtoLink;
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }
        });
    }

    /* ============================================
       6. SMOOTH SCROLL FOR NAV
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       7. INTERSECTION OBSERVER
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

    document.querySelectorAll(
        '.project-card, .skill-category, .achievement-card, .timeline-item, .stat-item, .contact-item'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    /* ============================================
       8. FEATURED PROJECTS - SPOTLIGHT CAROUSEL
       ============================================ */
    const featuredProjects = [
        { title: "VisionX Ticketing Platform", description: "Website made to handle a summit in campus. A comprehensive event ticketing and management platform with real-time seat selection.", problem: "Manual ticket sales lead to inefficiencies, long queues, and poor attendee experience.", solution: "Built a digital ticketing system with real-time seat selection, QR code verification, and automated scheduling.", features: ["Real-time seat selection", "QR code verification", "Automated scheduling", "Dashboard analytics", "Payment integration"], techStack: ["React", "Node.js", "MongoDB", "Express"], github: "https://github.com/HAREESSHP/VISIONX", live: "", icon: "fa-ticket-alt", category: "Full Stack" },
        { title: "Pharmacy Management System", description: "A full-stack system for managing pharmacy inventory and operations.", problem: "Pharmacies struggle with inventory tracking, expiry management, and prescription record-keeping.", solution: "Developed a complete pharmacy management solution with real-time inventory, expiry alerts, and patient records.", features: ["Inventory tracking", "Expiry date alerts", "Prescription management", "Sales reporting", "Supplier management"], techStack: ["Node.js", "Express.js", "MongoDB", "JavaScript", "Bootstrap"], github: "https://github.com/HAREESSHP/HOSPITAL", live: "", icon: "fa-hospital", category: "Full Stack" },
        { title: "BloodConnect Platform", description: "A platform connecting blood donors with recipients and blood banks in real-time.", problem: "Blood shortages and delayed emergency response due to lack of real-time donor-recipient connectivity.", solution: "Created a real-time blood donation platform with emergency alerts, donor matching, and inventory tracking.", features: ["Emergency blood requests", "Donor-recipient matching", "Blood bank inventory", "Real-time notifications", "Donor history"], techStack: ["Flask", "MongoDB", "HTML/CSS", "JavaScript"], github: "https://github.com/HAREESSHP/BLOOD-DONATION-SYSTEM", live: "https://blood-donation-system-1-zf3b.onrender.com/", icon: "fa-heart", category: "AI/ML" },
        { title: "Smart Accounts", description: "A mini hackathon project for intelligent account management and financial tracking.", problem: "Small businesses lack affordable tools for automated accounting, invoice generation, and expense tracking.", solution: "Built a smart accounting platform with automated invoice generation, expense categorization, and financial insights.", features: ["Automated invoicing", "Expense categorization", "Financial dashboard", "Budget tracking", "Report generation"], techStack: ["HTML/CSS", "JavaScript", "Node.js", "MongoDB", "Chart.js"], github: "https://github.com/HAREESSHP/MINIHACKTHON", live: "", icon: "fa-wallet", category: "Hackathon" },
        { title: "Comparison Chatbox", description: "An intelligent chatbot to compare two electronic components.", problem: "Online shoppers struggle to compare products across multiple sources and make informed decisions.", solution: "Developed an AI-powered comparison chatbot using Serper API to fetch and analyze product data in real-time.", features: ["Multi-source product search", "Side-by-side comparison", "Price tracking", "Feature analysis", "NLP queries"], techStack: ["Python", "Serper API", "NLP", "Flask", "JavaScript"], github: "https://github.com/HAREESSHP/COMPARISION-CHATBOX", live: "", icon: "fa-comments", category: "AI/ML" }
    ];

    const fpTrack = document.getElementById('fpTrack');
    const fpPrev = document.getElementById('fpPrev');
    const fpNext = document.getElementById('fpNext');
    const fpDots = document.getElementById('fpDots');
    const modalOverlay = document.getElementById('fpModalOverlay');
    const modalClose = document.getElementById('fpModalClose');

    if (!fpTrack) return;

    let currentIndex = 0;

    // Populate cards
    featuredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'fp-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="fp-card-header">
                <div class="fp-card-icon"><i class="fas ${project.icon}"></i></div>
                <span class="fp-card-category">${project.category}</span>
            </div>
            <h3 class="fp-card-title">${project.title}</h3>
            <p class="fp-card-desc">${project.description}</p>
            <div class="fp-card-tech">
                ${project.techStack.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="fp-card-footer">
                <a href="${project.github}" target="_blank" rel="noopener" class="fp-btn-gh"><i class="fab fa-github"></i> GitHub</a>
                ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener" class="fp-btn-ld"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
            <div class="fp-card-hint">
                <i class="fas fa-mouse-pointer"></i> Click to know more
            </div>
        `;
        fpTrack.appendChild(card);
    });

    // Create dots
    featuredProjects.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'fp-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        fpDots.appendChild(dot);
    });

    const fpCards = document.querySelectorAll('.fp-card');
    const dots = document.querySelectorAll('.fp-dot');

    function goTo(index) {
        if (index < 0 || index >= fpCards.length || index === currentIndex) return;
        currentIndex = index;
        const scrollAmount = fpCards[index].offsetLeft - fpTrack.offsetLeft;
        fpTrack.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        updateDots();
    }

    function goNext() { goTo(currentIndex + 1); }
    function goPrev() { goTo(currentIndex - 1); }

    function updateDots() {
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Track scroll to update dots
    fpTrack.addEventListener('scroll', () => {
        const scrollPos = fpTrack.scrollLeft + fpTrack.offsetLeft + 60;
        let closest = 0;
        let minDist = Infinity;
        fpCards.forEach((card, i) => {
            const dist = Math.abs(card.offsetLeft - scrollPos);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        if (closest !== currentIndex) {
            currentIndex = closest;
            updateDots();
        }
    });

    // Button navigation
    if (fpPrev) fpPrev.addEventListener('click', goPrev);
    if (fpNext) fpNext.addEventListener('click', goNext);

    // Keyboard
    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('featured-projects');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    });

    // Touch swipe
    let touchStartX = 0;
    fpTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    fpTrack.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goPrev(); else goNext();
        }
    }, { passive: true });

    // Click card to open modal
    fpCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // Don't open modal if clicking a link
            openModal(index);
        });
    });

    // Modal
    function openModal(index) {
        const project = featuredProjects[index];
        if (!project) return;

        document.getElementById('fpModalTitle').textContent = project.title;
        document.getElementById('fpModalDesc').textContent = project.description;
        document.getElementById('fpModalProblem').textContent = project.problem;
        document.getElementById('fpModalSolution').textContent = project.solution;

        const featuresList = document.getElementById('fpModalFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f;
            featuresList.appendChild(li);
        });

        const techContainer = document.getElementById('fpModalTech');
        techContainer.innerHTML = '';
        project.techStack.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techContainer.appendChild(span);
        });

        const actionsContainer = document.getElementById('fpModalActions');
        actionsContainer.innerHTML = '';

        const githubBtn = document.createElement('a');
        githubBtn.href = project.github;
        githubBtn.target = '_blank';
        githubBtn.rel = 'noopener';
        githubBtn.className = 'fp-btn-gh';
        githubBtn.innerHTML = '<i class="fab fa-github"></i> GitHub';
        actionsContainer.appendChild(githubBtn);

        if (project.live) {
            const liveBtn = document.createElement('a');
            liveBtn.href = project.live;
            liveBtn.target = '_blank';
            liveBtn.rel = 'noopener';
            liveBtn.className = 'fp-btn-ld';
            liveBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
            actionsContainer.appendChild(liveBtn);
        }

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });

});