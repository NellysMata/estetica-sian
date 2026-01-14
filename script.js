/**
 * @fileoverview Main script for Sian Estetica website.
 * Handles navigation interactions, cookie consent management, and scroll-to-top functionality.
 * Optimized for performance (debounced scroll), robustness, and maintainability (SOLID).
 * @version 2.0.0
 * @author EneDigital -> Refactored by Antigravity
 */

/**
 * Constants for DOM selectors and CSS classes.
 * Centralizing strings reduces simple typo errors and makes refactoring easier.
 */
const CONFIG = {
    selectors: {
        mobileMenu: 'mobile-menu',
        navList: 'nav-list',
        navLinks: '.nav-links a',
        cookieBanner: 'cookie-banner',
        acceptCookiesBtn: 'accept-cookies',
        backToTopBtn: 'backToTop',
        menuIcon: '#mobile-menu i'
    },
    classes: {
        active: 'active',
        show: 'show',
        iconBars: 'fa-bars',
        iconX: 'fa-xmark'
    },
    storage: {
        cookiesAccepted: 'cookiesAccepted'
    },
    scrollThreshold: 300
};

/**
 * Manages the Mobile Navigation Menu.
 * Responsibility: Toggle menu visibility and animate the hamburger icon.
 */
class MobileMenuController {
    constructor() {
        this.menuToggle = document.getElementById(CONFIG.selectors.mobileMenu);
        this.navList = document.getElementById(CONFIG.selectors.navList);
        this.navLinks = document.querySelectorAll(CONFIG.selectors.navLinks);
        
        // Guard clause: if critical elements are missing, do not proceed
        if (!this.menuToggle || !this.navList) {
            console.warn('MobileMenuController: Required elements not found.');
            return;
        }

        this.icon = this.menuToggle.querySelector('i');
        this.init();
    }

    /**
     * Initializes event listeners.
     */
    init() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Improve UX: Close menu when a link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    /**
     * Toggles the menu state.
     */
    toggleMenu() {
        const isActive = this.navList.classList.toggle(CONFIG.classes.active);
        this.updateIcon(isActive);
    }

    /**
     * Closes the menu explicitly.
     */
    closeMenu() {
        if (this.navList.classList.contains(CONFIG.classes.active)) {
            this.navList.classList.remove(CONFIG.classes.active);
            this.updateIcon(false);
        }
    }

    /**
     * Updates the menu icon between bars and X.
     * @param {boolean} isActive - Whether the menu is currently active.
     */
    updateIcon(isActive) {
        if (!this.icon) return;
        
        if (isActive) {
            this.icon.classList.replace(CONFIG.classes.iconBars, CONFIG.classes.iconX);
        } else {
            this.icon.classList.replace(CONFIG.classes.iconX, CONFIG.classes.iconBars);
        }
    }
}

/**
 * Manages the Cookie Consent Banner.
 * Responsibility: Show banner if not accepted, handle acceptance.
 */
class CookieConsentController {
    constructor() {
        this.banner = document.getElementById(CONFIG.selectors.cookieBanner);
        this.acceptBtn = document.getElementById(CONFIG.selectors.acceptCookiesBtn);

        if (!this.banner || !this.acceptBtn) return;

        this.init();
    }

    init() {
        // Check if previously accepted
        const isAccepted = localStorage.getItem(CONFIG.storage.cookiesAccepted) === 'true';

        if (!isAccepted) {
            // Small delay for better UX (don't block initial render)
            setTimeout(() => this.showBanner(), 1000);
        }

        this.acceptBtn.addEventListener('click', () => this.acceptCookies());
    }

    showBanner() {
        this.banner.classList.add(CONFIG.classes.show);
    }

    acceptCookies() {
        try {
            localStorage.setItem(CONFIG.storage.cookiesAccepted, 'true');
            this.banner.classList.remove(CONFIG.classes.show);
        } catch (e) {
            console.error('CookieConsentController: Failed to save preference to localStorage', e);
        }
    }
}

/**
 * Manages the "Back to Top" button.
 * Responsibility: Show/hide button on scroll, scroll to top on click.
 * Optimized with requestAnimationFrame for performance.
 */
class ScrollTopController {
    constructor() {
        this.button = document.getElementById(CONFIG.selectors.backToTopBtn);
        this.isVisible = false;
        this.ticking = false;

        if (!this.button) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Handles scroll events with requestAnimationFrame to prevent layout thrashing.
     */
    onScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.checkScrollPosition();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    checkScrollPosition() {
        const shouldShow = window.scrollY > CONFIG.scrollThreshold;
        
        // Only touch the DOM if state changes
        if (shouldShow !== this.isVisible) {
            this.isVisible = shouldShow;
            this.button.classList.toggle(CONFIG.classes.show, shouldShow);
        }
    }
}

// Initialize all controllers when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenuController();
    new CookieConsentController();
    new ScrollTopController();
    
    console.log('Sian Estetica scripts initialized.');
});
