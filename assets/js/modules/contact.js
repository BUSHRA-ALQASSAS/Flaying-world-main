document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const languageTabs = document.querySelectorAll('.lang-tab');
    const contactSections = {
        en: document.getElementById('contact-en'),
        ar: document.getElementById('contact-ar')
    };

    languageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            
            // Update tabs
            languageTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected form
            Object.entries(contactSections).forEach(([sectionLang, section]) => {
                section.style.display = sectionLang === lang ? 'block' : 'none';
            });

            // Update document direction
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        });
    });

    // Form submission
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const lang = form.closest('[data-lang]').dataset.lang;
                const message = lang === 'ar' 
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                    : 'Your message has been sent successfully! We will contact you soon.';
                
                alert(message);
                
                // Reset form
                form.reset();
            } catch (error) {
                // Show error message
                const lang = form.closest('[data-lang]').dataset.lang;
                const message = lang === 'ar'
                    ? 'عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.'
                    : 'Sorry, there was an error sending your message. Please try again.';
                
                alert(message);
            }
        });
    });

    // Form validation
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            
            const lang = input.closest('[data-lang]').dataset.lang;
            let message = '';
            
            if (input.validity.valueMissing) {
                message = lang === 'ar' 
                    ? 'هذا الحقل مطلوب'
                    : 'This field is required';
            } else if (input.validity.typeMismatch) {
                if (input.type === 'email') {
                    message = lang === 'ar'
                        ? 'يرجى إدخال بريد إلكتروني صحيح'
                        : 'Please enter a valid email address';
                }
            }
            
            input.setCustomValidity(message);
        });
        
        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
    });
});
