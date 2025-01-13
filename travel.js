let searchBtn = document.querySelector("#search-btn")
let searchForm = document.querySelector(".search-form") 
let loginForm = document.querySelector(".login-form")
let menuBar = document.querySelector("#menu-bar")
let amenu = document.querySelector(".navbar")
let vidBtn = document.querySelectorAll(".video-btn")
function showDetails() {
    document.getElementById('details').style.display = 'flex';
}
function closeDetails() {
    document.getElementById('details').style.display = 'none';
}

function showBookingForm() {
    closeDetails();
    document.getElementById('booking-form').style.display = 'flex';
}

function closeBookingForm() {
    document.getElementById('booking-form').style.display = 'none';
}

function closeConfirmation() {
    document.getElementById('confirmation').style.display = 'none';
}

function handleBooking(event) {
    event.preventDefault();
    
    // هنا يمكنك إضافة أي عملية تحقق إضافية للبيانات
    
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'flex';
}

function showbar(){
    searchBtn.classList.toggle("fa-times")
    searchForm.classList.toggle("active")
}
function showform(){
    loginForm.classList.add("active")
}
function hideform(){
    loginForm.classList.remove("active")

}
function showmenu(){
    menuBar.classList.toggle("fa-times")
    amenu.classList.toggle("active")
}
vidBtn.forEach(slide =>{
    slide.addEventListener("click" , function(){
        document.querySelector(".controls .blue").classList.remove("blue");
        slide.classList.add("blue");
        let src = slide.getAttribute("data-src");
        document.querySelector("#video-slider").src = src;
    })
})

var swiper = new Swiper(".review-slider", {
    spaceBetween :20,
    loop:true,
    autoplay:{
        delay:2500
    },
    breakpoints:{
        640:{
            slidesPerView:1
        },
        768:{
            slidesPerView:2
        },
        1024:{
            slidesPerView:3
        }
    }
});

// Form Validation
document.querySelector('.booking-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const adults = document.getElementById('adults').value;
    
    if (!destination || !checkin || !checkout || !adults) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();

    if (checkinDate < today) {
        alert('Check-in date cannot be in the past');
        return;
    }

    if (checkoutDate <= checkinDate) {
        alert('Check-out date must be after check-in date');
        return;
    }

    // If all validations pass, show success message
    alert('Booking submitted successfully! We will contact you soon.');
    this.reset();
});

// Set minimum date for check-in and check-out
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);
document.getElementById('checkout').setAttribute('min', today);

// Update checkout min date when checkin changes
document.getElementById('checkin').addEventListener('change', function() {
    document.getElementById('checkout').setAttribute('min', this.value);
});

// Calculate and display price based on selection
function calculatePrice() {
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    const roomType = document.getElementById('room-type').value;
    
    let basePrice = 0;
    switch(roomType) {
        case 'standard':
            basePrice = 100;
            break;
        case 'deluxe':
            basePrice = 200;
            break;
        case 'suite':
            basePrice = 300;
            break;
    }
    
    const totalPrice = (adults * basePrice) + (children * basePrice * 0.5);
    
    // Create or update price display
    let priceDisplay = document.getElementById('price-display');
    if (!priceDisplay) {
        priceDisplay = document.createElement('div');
        priceDisplay.id = 'price-display';
        document.querySelector('.booking-form form').appendChild(priceDisplay);
    }
    priceDisplay.textContent = `Total Price: $${totalPrice}`;
}

// Add event listeners for price calculation
document.getElementById('adults').addEventListener('change', calculatePrice);
document.getElementById('children').addEventListener('change', calculatePrice);
document.getElementById('room-type').addEventListener('change', calculatePrice);

// Initialize price calculation
calculatePrice();

// Form Controls
function showLoginForm() {
    document.querySelector('.login-form-container').classList.add('active');
}

function showRegisterForm() {
    document.querySelector('.login-form-container').classList.remove('active');
    document.querySelector('.register-form-container').classList.add('active');
}

function showResetForm() {
    document.querySelector('.login-form-container').classList.remove('active');
    document.querySelector('.reset-form-container').classList.add('active');
}

function hideAllForms() {
    document.querySelector('.login-form-container').classList.remove('active');
    document.querySelector('.register-form-container').classList.remove('active');
    document.querySelector('.reset-form-container').classList.remove('active');
}

// Close buttons
document.getElementById('form-close').addEventListener('click', hideAllForms);
document.getElementById('register-form-close').addEventListener('click', hideAllForms);
document.getElementById('reset-form-close').addEventListener('click', hideAllForms);

// User Authentication
let isLoggedIn = false;
let currentUser = null;

// Login Form Submit
document.querySelector('.login-form-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const remember = document.getElementById('remember').checked;

    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll just simulate a successful login
    if (email && password) {
        isLoggedIn = true;
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        updateUserInterface();
        hideAllForms();
        showSuccessMessage('Logged in successfully!');
    }
});

// Register Form Submit
document.querySelector('.register-form-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    const phone = this.querySelector('input[type="tel"]').value;

    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }

    // Here you would typically make an API call to register the user
    // For demo purposes, we'll just simulate a successful registration
    if (name && email && password && phone) {
        hideAllForms();
        showSuccessMessage('Account created successfully! You can now login.');
    }
});

// Reset Password Form Submit
document.querySelector('.reset-form-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Here you would typically make an API call to send reset password email
    if (email) {
        hideAllForms();
        showSuccessMessage('Password reset link has been sent to your email.');
    }
});

// User Interface Updates
function updateUserInterface() {
    const userMenu = document.getElementById('user-menu');
    if (isLoggedIn) {
        document.getElementById('login-btn').classList.add('logged-in');
        userMenu.classList.remove('hidden');
    } else {
        document.getElementById('login-btn').classList.remove('logged-in');
        userMenu.classList.add('hidden');
    }
}

// Logout Function
function logout() {
    isLoggedIn = false;
    currentUser = null;
    updateUserInterface();
    showSuccessMessage('Logged out successfully');
}

// Message Display Functions
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

// Toggle User Menu
document.getElementById('login-btn').addEventListener('click', function(e) {
    if (isLoggedIn) {
        e.stopPropagation();
        document.getElementById('user-menu').classList.toggle('active');
    } else {
        showLoginForm();
    }
});

// Close User Menu When Clicking Outside
document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('user-menu');
    if (!e.target.closest('#user-menu') && !e.target.closest('#login-btn')) {
        userMenu.classList.remove('active');
    }
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active Navigation Link
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.material-symbols-rounded');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme');
    themeIcon.textContent = isDarkMode ? 'light_mode' : 'dark_mode';
});

// Smooth Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Icon Button Ripple Effect
document.querySelectorAll('.icon-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Animated Counter for Numbers
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});