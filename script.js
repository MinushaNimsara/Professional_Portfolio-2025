// ====================================
// GSAP ScrollTrigger Setup (must register before use)
// ====================================
gsap.registerPlugin(ScrollTrigger);

// ====================================
// Lenis Smooth Scroll
// ====================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ====================================
// Preloader
// ====================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Start hero animations after preloader
        animateHero();
    }, 1800);
});

// ====================================
// Custom Cursor
// ====================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for outline
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .magnetic, .skill-tag, .project-card, .github-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
} else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
}

// ====================================
// Theme Toggle
// ====================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ====================================
// Typed.js
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    new Typed('#typed-text', {
        strings: ['Software Engineer', 'Full-Stack Developer', 'Mobile App Developer', 'AI Enthusiast'],
        typeSpeed: 80, backSpeed: 40, backDelay: 2000,
        loop: true, showCursor: true, cursorChar: '|'
    });

    // Dynamic Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Fetch GitHub repos
    fetchGitHubRepos();
});

// ====================================
// Mobile Navigation
// ====================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ====================================
// Navbar Scroll Effect
// ====================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ====================================
// Scroll to Top
// ====================================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('active', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.5 });
});

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: -70, duration: 1.2 });
        }
    });
});

// ====================================
// Active Nav Link on Scroll
// ====================================
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.pageYOffset + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ====================================
// GSAP Animations
// ====================================
function animateHero() {
    const heroEls = document.querySelectorAll('.hero .reveal-up, .hero-greeting, .name-line, .hero-role, .hero-desc, .hero-cta, .hero-socials, .hero-image-wrapper, .scroll-indicator');
    // Set initial state only via JS so content is visible if GSAP fails
    gsap.set(heroEls, { opacity: 0, y: 30 });
    gsap.set('.hero-image-wrapper', { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-greeting', { y: 0, opacity: 1, duration: 0.8 })
      .to('.name-line', { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.4')
      .to('.hero-role', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .to('.hero-desc', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .to('.hero-cta', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .to('.hero-socials', { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .to('.hero-image-wrapper', { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)' }, '-=0.8')
      .to('.scroll-indicator', { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
}

// Reveal animations for sections — use 'to' with gsap.set for initial state
gsap.utils.toArray('.reveal-up').forEach(el => {
    if (el.closest('.hero')) return;

    gsap.set(el, { opacity: 0, y: 40 });
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
        },
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
    });
});

// Stagger skill tags
gsap.utils.toArray('.skill-category').forEach(cat => {
    const tags = cat.querySelectorAll('.skill-tag');
    gsap.set(tags, { opacity: 0, y: 15 });
    ScrollTrigger.create({
        trigger: cat,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(tags, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' });
        },
        once: true,
    });
});

// Stagger project cards
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
    gsap.set(projectCards, { opacity: 0, y: 50 });
    ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 85%',
        onEnter: () => {
            gsap.to(projectCards, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        },
        once: true,
    });
}

// Timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
    gsap.set(timelineItems, { opacity: 0, x: -30 });
    ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top 80%',
        onEnter: () => {
            gsap.to(timelineItems, { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' });
        },
        once: true,
    });
}

// Contact cards
const contactCards = document.querySelectorAll('.contact-card');
if (contactCards.length) {
    gsap.set(contactCards, { opacity: 0, x: -20 });
    ScrollTrigger.create({
        trigger: '.contact-details',
        start: 'top 85%',
        onEnter: () => {
            gsap.to(contactCards, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
        },
        once: true,
    });
}

// Fallback: if animations haven't fired after 5 seconds, make everything visible
setTimeout(() => {
    document.querySelectorAll('.reveal-up, .skill-tag, .project-card, .timeline-item, .contact-card').forEach(el => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.1) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        }
    });
}, 5000);

// Stat cards counter
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const animate = () => {
                        const current = +counter.innerText;
                        const increment = target / 60;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + increment);
                            requestAnimationFrame(animate);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    animate();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// ====================================
// Magnetic Effect (Desktop only)
// ====================================
if (!isTouchDevice) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ====================================
// Contact Form
// ====================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;

        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        formStatus.style.display = 'none';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST', body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            submitBtn.classList.remove('loading');
            btnText.textContent = originalText;

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
                formStatus.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
            } else {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Something went wrong. Please try again.';
                formStatus.style.display = 'block';
            }
        } catch {
            submitBtn.classList.remove('loading');
            btnText.textContent = originalText;
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Network error. Check your connection.';
            formStatus.style.display = 'block';
        }
    });
}

// ====================================
// GitHub Repositories
// ====================================
async function fetchGitHubRepos() {
    const grid = document.getElementById('githubGrid');
    const loading = document.getElementById('githubLoading');
    const errorEl = document.getElementById('githubError');
    if (!grid) return;

    const langColors = {
        'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5',
        'Java': '#b07219', 'C++': '#f34b7d', 'C#': '#178600', 'HTML': '#e34c26',
        'CSS': '#563d7c', 'PHP': '#4F5D95', 'Dart': '#00B4AB', 'Kotlin': '#A97BFF',
        'Swift': '#F05138', 'Ruby': '#701516', 'Go': '#00ADD8', 'Shell': '#89e051',
        'Jupyter Notebook': '#DA5B0B', 'Vue': '#41b883', 'SCSS': '#c6538c',
    };

    try {
        const res = await fetch('https://api.github.com/users/MinushaNimsara/repos?sort=updated&per_page=30');
        if (!res.ok) throw new Error(res.status);
        const repos = await res.json();

        const filtered = repos
            .filter(r => !r.fork && r.name !== 'MinushaNimsara')
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (loading) loading.remove();

        if (!filtered.length) {
            grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">No repositories found.</p>';
            return;
        }

        filtered.forEach((repo, i) => {
            const color = langColors[repo.language] || '#8b949e';
            const desc = repo.description || 'No description available.';
            const date = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            const card = document.createElement('div');
            card.className = 'github-card';
            card.innerHTML = `
                <div class="github-card-header">
                    <i class="fas fa-code-branch"></i>
                    <h3 title="${repo.name}">${repo.name}</h3>
                </div>
                <p class="github-card-desc">${desc}</p>
                <div class="github-card-meta">
                    ${repo.language ? `<span><span class="github-lang-dot" style="background:${color}"></span>${repo.language}</span>` : ''}
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    <span><i class="fas fa-clock"></i> ${date}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="github-card-link">
                    View Repo <i class="fas fa-arrow-right"></i>
                </a>
            `;
            grid.appendChild(card);
        });

        // Animate new cards safely
        const ghCards = document.querySelectorAll('.github-card');
        gsap.set(ghCards, { opacity: 0, y: 30 });
        ScrollTrigger.create({
            trigger: '.github-grid',
            start: 'top 88%',
            onEnter: () => {
                gsap.to(ghCards, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
            },
            once: true,
        });

        ScrollTrigger.refresh();
    } catch (err) {
        console.error('GitHub fetch failed:', err);
        if (loading) loading.remove();
        if (errorEl) errorEl.style.display = 'block';
    }
}

// ====================================
// Console Easter Egg
// ====================================
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cPortfolio built with Lenis + GSAP + ❤️', 'font-size: 14px; color: #a855f7;');