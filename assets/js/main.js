// Import modules
import { initSidebar } from './modules/sidebar.js';
import { initAuth } from './modules/auth.js';
import { initBooking } from './modules/booking.js';
import { initSearch } from './modules/search.js';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initAuth();
    initBooking();
    initSearch();
});

// Global state management
const state = {
    user: null,
    isLoggedIn: false,
    theme: 'light',
    language: 'en'
};

// Theme switcher
export function toggleTheme() {
    const body = document.body;
    if (state.theme === 'light') {
        body.classList.add('dark-theme');
        state.theme = 'dark';
    } else {
        body.classList.remove('dark-theme');
        state.theme = 'light';
    }
    localStorage.setItem('theme', state.theme);
}

// Language switcher
export function changeLanguage(lang) {
    state.language = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    // Update UI text based on language
    updateUIText();
}

// Update UI text based on selected language
function updateUIText() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[state.language][key];
    });
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    state.theme = savedTheme;
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
    state.language = savedLanguage;
    document.documentElement.lang = savedLanguage;
    updateUIText();
}

// Export state for use in other modules
export { state };
