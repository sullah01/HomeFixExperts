document.addEventListener("DOMContentLoaded", function () {
    const services = [
        {
            id: 'service-heating',
            title: 'Heating & Boiler Services',
            desc: 'Boiler repairs, servicing and system optimisation to keep you warm and efficient.',
            image: 'https://images.unsplash.com/photo-1711037868000-ea0c38991aef?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            url: 'service-heating.html'
        },
        {
            id: 'service-plumbing',
            title: 'Plumbing Repairs & Installation',
            desc: 'Fast repairs, leaks, bathroom installs and drain clearing by certified plumbers.',
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            url: 'service-plumbing.html'
        },
                {
            id: 'service-gas',
            title: 'Gas Safety & Installations',
            desc: 'Certified gas engineers for safe installations, inspections and repairs.',
            image: 'https://images.unsplash.com/photo-1744302570337-a9840df6e723?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            url: 'service-gas.html'
        },
        {
            id: 'service-maintenance',
            title: 'Preventative Maintenance',
            desc: 'Routine maintenance plans to preserve and extend the lifetime of home systems.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            url: 'service-maintenance.html'
        }
    ];

    // Slider injection with real images
    const slider = document.getElementById('slider');
    let currentSlide = 0;

    if (slider) {
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
                <div class="real-image-bg ${s.id.replace('service-', '')}-image">
                    <img src="${s.image}" alt="${s.title}" loading="lazy">
                </div>
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
    }

    // Services preview with real images
    const servicesPreview = document.getElementById('services-preview');
    if (servicesPreview) {
        services.forEach((s) => {
            const block = document.createElement('section');
            block.className = 'service-block';
            block.innerHTML = `
                <div class="real-image-preview">
                    <img src="${s.image}" alt="${s.title}" loading="lazy">
                </div>
                <div class="copy">
                    <h3>${s.title}</h3>
                    <p class="lead dropcap">${s.desc} Learn more about how we deliver reliable solutions for every home.</p>
                    <p><a class="btn" href="${s.url}">View Details</a></p>
                </div>
            `;
            servicesPreview.appendChild(block);
        });
    }

    // News section
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

// Add CSS for real image previews
const style = document.createElement('style');
style.textContent = `
    .real-image-preview {
        width: 48%;
        height: 320px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .real-image-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .real-image-preview:hover img {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        .real-image-preview {
            width: 100%;
            height: 250px;
        }
    }
`;
document.head.appendChild(style);
