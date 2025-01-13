// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const languageSwitcher = document.querySelector('.language-switcher');

    // Handle auth form language switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            
            // Update tabs
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            authForms.forEach(form => {
                if (form.dataset.lang === lang) {
                    form.style.display = 'block';
                } else {
                    form.style.display = 'none';
                }
            });
        });
    });

    // Handle password visibility toggle
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.classList.remove('fa-eye-slash');
                btn.classList.add('fa-eye');
            } else {
                input.type = 'password';
                btn.classList.remove('fa-eye');
                btn.classList.add('fa-eye-slash');
            }
        });
    });

    // Handle form submission
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add your authentication logic here
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Example validation
            if (form.id.includes('register')) {
                if (data.password !== data['confirm-password']) {
                    showError(form, 'Passwords do not match');
                    return;
                }
            }
            
            // Simulate API call
            simulateAuth(data, form.id.includes('login') ? 'login' : 'register')
                .then(response => {
                    if (response.success) {
                        // Redirect to appropriate page
                        window.location.href = 'index.html';
                    } else {
                        showError(form, response.message);
                    }
                })
                .catch(error => {
                    showError(form, 'An error occurred. Please try again.');
                });
        });
    });

    // Handle social auth buttons
    const socialButtons = document.querySelectorAll('.social-auth-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            // Add your social auth logic here
            console.log(`Authenticating with ${provider}...`);
        });
    });
});

// Utility functions
function showError(form, message) {
    // Remove existing error message if any
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and insert error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #ff3333;
        font-size: 1.4rem;
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(255, 51, 51, 0.1);
        border-radius: 0.8rem;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(errorDiv, submitButton);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Simulate authentication API call
function simulateAuth(data, type) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (type === 'login') {
                // Simulate login validation
                if (data.email && data.password) {
                    resolve({ success: true });
                } else {
                    resolve({ 
                        success: false, 
                        message: 'Invalid email or password'
                    });
                }
            } else {
                // Simulate registration validation
                if (data.email && data.password && data.firstname && data.lastname) {
                    resolve({ success: true });
                } else {
                    resolve({ 
                        success: false, 
                        message: 'Please fill in all required fields'
                    });
                }
            }
        }, 1000);
    });
}
