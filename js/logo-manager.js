class LogoManager {
    constructor() {
        this.logos = {
            dark: 'assets/logos/logo-dark.png',
            light: 'assets/logos/logo-light.png', 
            primary: 'assets/logos/logo-primary.png'
        };
        this.init();
    }

    init() {
        this.placeHeaderLogos();
        this.placeFooterLogos();
        this.setupLogoObservers();
    }

    getContrastType(element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        
        if (rgb && rgb.length >= 3) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            return brightness > 128 ? 'light' : 'dark';
        }
        
        return 'primary';
    }

    getLogoForBackground(element) {
        const contrastType = this.getContrastType(element);
        return this.logos[contrastType === 'light' ? 'dark' : 'light'];
    }

    placeHeaderLogos() {
        const headers = document.querySelectorAll('header, .header, .navbar, [role="banner"]');
        
        headers.forEach(header => {
            // Check if logo already exists
            if (!header.querySelector('.logo')) {
                const logoUrl = this.getLogoForBackground(header);
                const logoHtml = `
                    <div class="nav-logo">
                        <a href="/" class="logo-link">
                            <img src="${logoUrl}" alt="24 7 Home Fix Experts" class="logo" />
                        </a>
                    </div>
                `;
                header.insertAdjacentHTML('afterbegin', logoHtml);
            }
        });
    }

    placeFooterLogos() {
        const footers = document.querySelectorAll('footer, .footer, [role="contentinfo"]');
        
        footers.forEach(footer => {
            if (!footer.querySelector('.logo-footer')) {
                const logoUrl = this.getLogoForBackground(footer);
                const logoHtml = `
                    <div class="footer-logo">
                        <a href="/">
                            <img src="${logoUrl}" alt="24 7 Home Fix Experts" class="logo-footer" />
                        </a>
                    </div>
                `;
                footer.insertAdjacentHTML('afterbegin', logoHtml);
            }
        });
    }

    setupLogoObservers() {
        // Update logos on scroll for sticky headers
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (Math.abs(currentScrollY - lastScrollY) > 50) {
                this.updateStickyHeaderLogos();
                lastScrollY = currentScrollY;
            }
        });

        // Update logos on resize
        window.addEventListener('resize', () => {
            this.updateAllLogos();
        });
    }

    updateStickyHeaderLogos() {
        const stickyHeaders = document.querySelectorAll('.sticky-header, .fixed-header');
        
        stickyHeaders.forEach(header => {
            const logos = header.querySelectorAll('.logo');
            const logoUrl = this.getLogoForBackground(header);
            
            logos.forEach(logo => {
                logo.src = logoUrl;
            });
        });
    }

    updateAllLogos() {
        this.placeHeaderLogos();
        this.placeFooterLogos();
    }
}

// Initialize logo manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LogoManager();
});
