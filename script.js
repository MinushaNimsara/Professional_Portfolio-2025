// ====================================
// Initialize AOS (Animate On Scroll)
// ====================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ====================================
// Typing Animation for Hero Subtitle
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Software Engineer',
            'Full-Stack Developer',
            'Mobile App Developer',
            'AI Enthusiast'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});

// ====================================
// Counter Animation
// ====================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value + '+';
            }
        };
        
        animate();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(statsSection);
}

// ====================================
// Smooth Page Load Animation
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ====================================
// Theme Toggle Functionality
// ====================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ====================================
// Mobile Navigation Toggle
// ====================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ====================================
// Scroll to Top Button
// ====================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Smooth Scrolling for Navigation Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Navbar Background on Scroll
// ====================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====================================
// Contact Form Handling with Formspree
// ====================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;
        
        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        formStatus.style.display = 'none';
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            btnText.textContent = originalText;
            
            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                // Error
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Oops! Something went wrong. Please try again.';
                formStatus.style.display = 'block';
            }
        } catch (error) {
            // Network error
            submitBtn.classList.remove('loading');
            btnText.textContent = originalText;
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Network error. Please check your connection and try again.';
            formStatus.style.display = 'block';
        }
    });
}

// ====================================
// Button Ripple Effect
// ====================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ====================================
// Active Navigation Link on Scroll
// ====================================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ====================================
// Parallax Effect for Hero Section
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ====================================
// Skills Progress Bar Animation (Optional)
// ====================================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ====================================
// Project Card Tilt Effect (Optional - 3D Effect)
// ====================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ====================================
// Image Lazy Loading
// ====================================
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ====================================
// Preloader (Optional)
// ====================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ====================================
// Copy Email on Click (Optional)
// ====================================
const emailElements = document.querySelectorAll('.contact-text p, .footer-section p');

emailElements.forEach(el => {
    if (el.textContent.includes('@')) {
        el.style.cursor = 'pointer';
        el.title = 'Click to copy email';
        
        el.addEventListener('click', () => {
            const email = el.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                // Show copied message
                const originalText = el.textContent;
                el.textContent = 'Email copied! ✓';
                el.style.color = 'var(--primary-color)';
                
                setTimeout(() => {
                    el.textContent = originalText;
                    el.style.color = '';
                }, 2000);
            });
        });
    }
});

// ====================================
// Console Message (Optional - Easter Egg)
// ====================================
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #0066FF; font-weight: bold;');
console.log('%cLooking for something? Check out my GitHub: https://github.com/MinushaNimsara', 'font-size: 14px; color: #4D94FF;');
console.log('%cLet\'s connect! 💼', 'font-size: 14px; color: #00B8FF;');

// ====================================
// Prevent Right Click on Images (Optional)
// ====================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ====================================
// Performance Optimization
// ====================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Optimized scroll handlers here
}));

// ====================================
// Smooth Reveal for Stats
// ====================================
const statCards = document.querySelectorAll('.stat-card');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

statCards.forEach(card => {
    statsObserver.observe(card);
});

// ====================================
// Form Validation Enhancement
// ====================================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
        if (this.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(this.value)) {
                this.style.borderColor = 'var(--primary-color)';
            } else if (this.value.length > 0) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        }
    });
});

// ====================================
// Keyboard Navigation Enhancement
// ====================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (e.ctrlKey || e.metaKey) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'C' to focus contact form
    if (e.key === 'c' || e.key === 'C') {
        if (e.ctrlKey || e.metaKey) return;
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('name')?.focus();
            }, 500);
        }
    }
});

// ====================================
// Dynamic Year in Footer
// ====================================
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement && yearElement.textContent.includes('2025')) {
    yearElement.textContent = `© ${currentYear} Minusha Nimsara. All rights reserved.`;
}

// ====================================
// Detect Scroll Direction
// ====================================
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(0)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ====================================
// Print Optimization
// ====================================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.pageBreakInside = 'avoid';
    });
});

// ====================================
// Initialize Everything on Load
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio loaded successfully!');
    
    // Add smooth reveal to all sections
    const allSections = document.querySelectorAll('section');
    allSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ====================================
// Service Worker Registration (Optional - for PWA)
// ====================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/