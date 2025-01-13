// Sidebar functionality
class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.toggleBtn = document.querySelector('.sidebar-toggle');
        this.closeBtn = document.querySelector('.sidebar-close');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Toggle sidebar
        this.toggleBtn?.addEventListener('click', () => this.toggleSidebar());
        this.closeBtn?.addEventListener('click', () => this.closeSidebar());

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // Handle navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Add ripple effect
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('active');
        this.updateAriaAttributes();
    }

    closeSidebar() {
        this.sidebar.classList.remove('active');
        this.updateAriaAttributes();
    }

    updateAriaAttributes() {
        const isOpen = this.sidebar.classList.contains('active');
        this.sidebar.setAttribute('aria-expanded', isOpen);
        this.toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    handleNavigation(e) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        e.currentTarget.classList.add('active');

        // Add animation class
        e.currentTarget.classList.add('nav-link-clicked');
        
        // Remove animation class after animation ends
        setTimeout(() => {
            e.currentTarget.classList.remove('nav-link-clicked');
        }, 300);

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            this.closeSidebar();
        }
    }

    createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }
}

// Initialize sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
});
