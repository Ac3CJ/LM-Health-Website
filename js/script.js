// Navbar Shrink Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('shrink', window.scrollY > 50);

    const logo = document.querySelector('.logo');
    logo.classList.toggle('shrink', window.scrollY > 50);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.id === 'product') {
                document.querySelectorAll('.module-item').forEach((item, index) => {
                    // Item animations
                    item.style.animation = `fadeIn 0.5s ease-out ${index * 0.5 + 0.5}s forwards`;
                    
                    // Line animations
                    const line = item.querySelector('::before');
                    item.querySelector('.module-text').classList.add('reveal');
                    
                    // Text reveal with delay
                    setTimeout(() => {
                        item.querySelector('.module-text').classList.add('reveal');
                    }, index * 500 + 500);
                });

                const therapyContainer = document.querySelector('.therapy-container');
                therapyContainer.classList.add('visible');

                // Activate bluetooth section animation
                const bluetoothContainer = document.querySelector('.bluetooth-container');
                bluetoothContainer.classList.add('visible');
            }
        }
    });
}, observerOptions);

const style = document.createElement('style');
style.textContent = `
    .module-item::before {
        animation: var(--line-animation, none);
    }
`;
document.head.appendChild(style);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Activate text animations
document.querySelectorAll('.module-item').forEach((item, index) => {
    setTimeout(() => {
        item.querySelector('.module-text').classList.add('reveal');
    }, (index * 500) + 1400);
});