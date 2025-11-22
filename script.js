document.addEventListener("DOMContentLoaded", function () {
    const services = [
        {
            id: 'service-plumbing',
            title: 'Plumbing Repairs & Installation',
            desc: 'Fast repairs, leaks, bathroom installs and drain clearing by certified plumbers.',
            svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="plumbingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#2E8B57"/>
                        <stop offset="100%" stop-color="#228B22"/>
                    </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#plumbingGrad)"/>
                <path d="M200,300 L300,200 L500,400 L400,500 Z" fill="#FFFFFF" opacity="0.1"/>
                <circle cx="400" cy="300" r="80" fill="#FFFFFF" opacity="0.2"/>
                <path d="M350,250 L450,350 M350,350 L450,250" stroke="#FFFFFF" stroke-width="8" opacity="0.3"/>
                <text x="400" y="320" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="bold">🚰</text>
                <text x="400" y="500" text-anchor="middle" fill="#FFFFFF" font-size="32" font-family="Arial">Plumbing</text>
            </svg>`,
            url: 'service-plumbing.html'
        },
        {
            id: 'service-heating',
            title: 'Heating & Boiler Services',
            desc: 'Boiler repairs, servicing and system optimisation to keep you warm and efficient.',
            svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="heatingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#2E8B57"/>
                        <stop offset="100%" stop-color="#228B22"/>
                    </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#heatingGrad)"/>
                <circle cx="400" cy="300" r="120" fill="#FFFFFF" opacity="0.1"/>
                <rect x="300" y="200" width="200" height="200" fill="#FFFFFF" opacity="0.15" rx="20"/>
                <path d="M350,250 L450,250 L450,350 L350,350 Z" fill="#FFFFFF" opacity="0.2"/>
                <text x="400" y="320" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="bold">🔥</text>
                <text x="400" y="500" text-anchor="middle" fill="#FFFFFF" font-size="32" font-family="Arial">Heating</text>
            </svg>`,
            url: 'service-heating.html'
        },
        {
            id: 'service-gas',
            title: 'Gas Safety & Installations',
            desc: 'Certified gas engineers for safe installations, inspections and repairs.',
            svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#2E8B57"/>
                        <stop offset="100%" stop-color="#228B22"/>
                    </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#gasGrad)"/>
                <circle cx="400" cy="300" r="100" fill="#FFFFFF" opacity="0.1"/>
                <path d="M350,250 Q400,200 450,250 T550,250" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.3"/>
                <text x="400" y="320" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="bold">⛽</text>
                <text x="400" y="500" text-anchor="middle" fill="#FFFFFF" font-size="32" font-family="Arial">Gas Safety</text>
            </svg>`,
            url: 'service-gas.html'
        },
        {
            id: 'service-maintenance',
            title: 'Preventative Maintenance',
            desc: 'Routine maintenance plans to preserve and extend the lifetime of home systems.',
            svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="maintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#2E8B57"/>
                        <stop offset="100%" stop-color="#228B22"/>
                    </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#maintGrad)"/>
                <path d="M300,200 L500,200 L550,300 L500,400 L300,400 L250,300 Z" fill="#FFFFFF" opacity="0.1"/>
                <circle cx="400" cy="300" r="60" fill="#FFFFFF" opacity="0.2"/>
                <text x="400" y="320" text-anchor="middle" fill="#FFFFFF" font-size="48" font-weight="bold">🔧</text>
                <text x="400" y="500" text-anchor="middle" fill="#FFFFFF" font-size="32" font-family="Arial">Maintenance</text>
            </svg>`,
            url: 'service-maintenance.html'
        }
    ];

    // Slider injection
    const slider = document.getElementById('slider');
    let currentSlide = 0;

    services.forEach((s, idx) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.opacity = idx === 0 ? '1' : '0';
        slide.style.transform = idx === 0 ? 'translateY(0)' : 'translateY(20px)';
        slide.innerHTML = `
            <div class="slide-copy">
                <h2>${s.title}</h2>
                <p>${s.desc}</p>
                <a class="btn" href="${s.url}">View Details</a>
            </div>
            <div class="svg-bg">${s.svg}</div>
        `;
        slider.appendChild(slide);
    });

    const slides = Array.from(document.querySelectorAll('.slide'));
    
    if (document.querySelector('.slide-next')) {
        document.querySelector('.slide-next').addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    if (document.querySelector('.slide-prev')) {
        document.querySelector('.slide-prev').addEventListener('click', () => showSlide(currentSlide - 1));
    }

    function showSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        slides.forEach((s, i) => {
            s.style.opacity = i === currentSlide ? '1' : '0';
            s.style.transform = i === currentSlide ? 'translateY(0)' : 'translateY(20px)';
        });
    }

    // Auto-slide every 5 seconds
    if (slides.length > 1) {
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // Services preview
    const servicesPreview = document.getElementById('services-preview');
    if (servicesPreview) {
        services.forEach((s) => {
            const block = document.createElement('section');
            block.className = 'service-block';
            block.innerHTML = `
                <div class="svg-preview">${s.svg}</div>
                <div class="copy">
                    <h3>${s.title}</h3>
                    <p class="lead dropcap">${s.desc} Learn more about how we deliver reliable solutions for every home.</p>
                    <p><a class="btn" href="${s.url}">View Details</a></p>
                </div>
            `;
            servicesPreview.appendChild(block);
        });
    }

    // News section with relevant content
    const sampleNews = [
        {
            title: 'How to Reduce Winter Heating Bills',
            src: 'Energy Tips',
            url: '#',
            excerpt: 'Discover practical ways to lower your heating costs while staying warm this winter season.'
        },
        {
            title: 'Top 5 Signs Your Boiler Needs Service',
            src: 'Maintenance',
            url: '#',
            excerpt: 'Learn the warning signs that indicate your boiler requires professional attention.'
        },
        {
            title: 'Prevent Small Leaks from Becoming Expensive',
            src: 'Plumbing',
            url: '#',
            excerpt: 'Early detection and repair can save you thousands in water damage repairs.'
        },
        {
            title: 'Smart Thermostats: Are They Worth It?',
            src: 'Technology',
            url: '#',
            excerpt: 'Explore the benefits of smart home technology for your heating system.'
        }
    ];

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const newsList = document.getElementById('news-list');
    if (newsList) {
        shuffle(sampleNews).forEach(n => {
            const item = document.createElement('article');
            item.className = 'news-item';
            item.innerHTML = `
                <h4>${n.title}</h4>
                <p class="muted">${n.src} • ${new Date().toLocaleDateString()}</p>
                <p>${n.excerpt} <a href="${n.url}">Read More</a></p>
            `;
            newsList.appendChild(item);
        });
    }

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const nav = document.querySelector('.main-nav');
            nav.classList.toggle('active');
        });
    }

    // Set current year in footer
    const yearElements = document.querySelectorAll('[id^="year"]');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };

            // Send email using FormSubmit
            fetch('https://formsubmit.co/ajax/bilalazeem@icloud.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                const msg = document.getElementById('form-msg');
                msg.textContent = 'Thank you! Your message has been sent successfully.';
                msg.style.color = '#2E8B57';
                contactForm.reset();
            })
            .catch(error => {
                const msg = document.getElementById('form-msg');
                msg.textContent = 'Sorry, there was an error sending your message. Please try again.';
                msg.style.color = '#e74c3c';
            });
        });
    }
});
