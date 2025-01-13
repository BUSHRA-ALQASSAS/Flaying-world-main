// Initialize Flatpickr date picker
document.addEventListener('DOMContentLoaded', function() {
    // Initialize date pickers
    const datePickerConfig = {
        minDate: "today",
        dateFormat: "Y-m-d",
        disableMobile: "true"
    };
    
    flatpickr("#departure-en", datePickerConfig);
    flatpickr("#departure-ar", Object.assign({}, datePickerConfig, {
        locale: "ar"
    }));

    // Language switcher
    const languageTabs = document.querySelectorAll('.lang-tab');
    const forms = {
        en: document.getElementById('booking-form-en'),
        ar: document.getElementById('booking-form-ar')
    };

    languageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            
            // Update tabs
            languageTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected form
            Object.entries(forms).forEach(([formLang, form]) => {
                form.style.display = formLang === lang ? 'block' : 'none';
            });

            // Update document direction
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        });
    });

    // Price calculation
    const calculatePrice = (form) => {
        const basePrice = {
            'paris': 1200,
            'dubai': 800,
            'tokyo': 1500,
            'istanbul': 600
        };

        const packageMultiplier = {
            'basic': 1,
            'standard': 1.3,
            'premium': 1.8,
            'luxury': 2.5
        };

        const destination = form.querySelector('[name="destination"]').value;
        const packageType = form.querySelector('[name="package"]').value;
        const adults = parseInt(form.querySelector('[name="adults"]').value) || 0;
        const children = parseInt(form.querySelector('[name="children"]').value) || 0;
        const services = Array.from(form.querySelectorAll('[name="services"]:checked')).length;

        let total = 0;
        
        if (destination && packageType) {
            // Calculate base price
            const base = basePrice[destination] * packageMultiplier[packageType];
            const peopleTotal = (adults * base) + (children * base * 0.6);
            
            // Calculate services price (each service costs 10% of base price)
            const servicesPrice = services * (base * 0.1);
            
            // Update price display
            form.querySelector('.base-price').textContent = `$${peopleTotal.toFixed(2)}`;
            form.querySelector('.services-price').textContent = `$${servicesPrice.toFixed(2)}`;
            form.querySelector('.total-price').textContent = `$${(peopleTotal + servicesPrice).toFixed(2)}`;
        }
    };

    // Add price calculation triggers
    ['en', 'ar'].forEach(lang => {
        const form = forms[lang];
        const priceInputs = form.querySelectorAll('select, [name="services"]');
        
        priceInputs.forEach(input => {
            input.addEventListener('change', () => calculatePrice(form));
        });
    });

    // Form submission
    Object.values(forms).forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send the form data to your backend
            // For now, we'll just show an alert
            alert('Booking submitted successfully! We will contact you shortly to confirm your reservation.');
        });
    });
});
