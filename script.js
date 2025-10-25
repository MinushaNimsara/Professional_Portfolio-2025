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
        navbar.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
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
// Scroll Reveal Animation
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections, cards, and timeline items
document.querySelectorAll('section, .project-card, .skill-category, .timeline-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// Dynamic Text Animation (Optional)
// ====================================
const subtitleTexts = [
    'Software Engineer',
    'Full-Stack Developer',
    'Mobile App Developer',
    'AI Enthusiast'
];

let textIndex = 0;
const heroSubtitle = document.querySelector('.hero-subtitle');

function changeSubtitle() {
    heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
        textIndex = (textIndex + 1) % subtitleTexts.length;
        heroSubtitle.textContent = subtitleTexts[textIndex];
        heroSubtitle.style.opacity = '1';
    }, 500);
}

// Change subtitle every 3 seconds
setInterval(changeSubtitle, 3000);

// ====================================
// Cursor Effect (Optional - Advanced)
// ====================================
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// ====================================
// Project Filter (Optional Enhancement)
// ====================================
const projectTags = document.querySelectorAll('.project-tech span');

projectTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const technology = tag.textContent;
        console.log(`Filter projects by: ${technology}`);
        // You can implement filtering logic here
    });
});

// ====================================
// Add Loading Animation
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add to CSS for loading effect
const style = document.createElement('style');
style.textContent = `
    .cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    }
    
    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0.5;
    }
    
    body:not(.loaded) {
        overflow: hidden;
    }
    
    @media (max-width: 968px) {
        .cursor, .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(style);