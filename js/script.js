function createPieChart() {
    const ctx = document.getElementById('mskPieChart').getContext('2d');
    const total = 1.81; // billion
    const target = (1.81 / 7.9) * 100;

    // Register the plugin (only once)
    Chart.register(ChartDataLabels);

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['With MSK Conditions', 'Without MSK Conditions'],
            datasets: [{
                data: [target, 100 - target],
                backgroundColor: ['#FFA401', '#024768'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
            },
            cutout: '0%',
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: (value, context) => {
                        return context.chart.data.labels[context.dataIndex];
                    },
                    anchor: 'center',
                    align: 'center',
                },
            }
        },
    });
}

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
    threshold: 0.25,
    rootMargin: '0px 0px -100px 0px' // Triggers when element enters viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            
            // Product Section
            if (section.id === 'product') {
                document.querySelectorAll('.module-item').forEach((item, index) => {
                    item.style.animation = `fadeIn 0.5s ease-out ${index * 0.5 + 0.5}s forwards`;
                    setTimeout(() => {
                        item.querySelector('.module-text').classList.add('reveal');
                    }, index * 500 + 500);
                });
            }
            
            // Therapy Section
            if (section.id === 'therapy') {
                section.classList.add('visible');
            }
            
            // Bluetooth Section
            if (section.id === 'bluetooth') {
                section.classList.add('visible');
            }

            // About Section
            if (section.id === 'about') {
                createPieChart();
                // Stop observing after first trigger
                observer.unobserve(section);
            }
        }
    });
}, observerOptions);

// Observe all animated sections
const sectionsToObserve = [
    document.getElementById('product'),
    document.getElementById('therapy'),
    document.getElementById('bluetooth'),
    document.getElementById('about')
];

sectionsToObserve.forEach(section => {
    if (section) observer.observe(section);
});

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

