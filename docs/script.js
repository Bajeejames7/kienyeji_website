// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Get theme from localStorage or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);

    // Update icon based on current theme
    function updateThemeIcon(theme) {
        if (themeToggle && themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeToggle.title = 'Switch to light mode';
            } else {
                themeIcon.className = 'fas fa-moon';
                themeToggle.title = 'Switch to dark mode';
            }
        }
    }

    // Initialize icon
    updateThemeIcon(currentTheme);

    // Debug logging
    console.log('Theme initialized:', currentTheme);
    console.log('HTML data-theme:', html.getAttribute('data-theme'));

    // Function to update navbar background based on theme and scroll position
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 100) {
            if (isDarkTheme) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (isDarkTheme) {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply theme changes
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Update navbar background immediately after theme change
            updateNavbarBackground();
            
            // Add a subtle animation effect
            themeToggle.style.transform = 'rotate(360deg)';
            themeToggle.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
            
            // Debug logging
            console.log('Theme switched to:', newTheme);
        });
    } else {
        console.error('Theme toggle button not found');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbarBackground();
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const orderType = formData.get('orderType');
    const message = formData.get('message');
    
    // Create WhatsApp message for all order types
    let whatsappMessage = `Hi! I'm interested in ordering from Improved Kienyeji Fresh Farm.\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    if (email) whatsappMessage += `Email: ${email}\n`;
    
    // Add order type with pricing information
    let orderTypeText = '';
    let pricingInfo = '';
    
    switch(orderType) {
        case 'live-jogoo-kienyeji':
            orderTypeText = 'Live Jogoo (Roosters)';
            pricingInfo = 'Ksh 1,500 per bird';
            break;
        case 'live-hens-kienyeji':
            orderTypeText = 'Live Hens (Standard)';
            pricingInfo = 'Ksh 1,200 per bird';
            break;
        case 'live-hens-premium-kienyeji':
            orderTypeText = 'Live Hens (Premium)';
            pricingInfo = 'Ksh 1,300 per bird';
            break;
        case 'cleaned-jogoo-kienyeji':
            orderTypeText = 'Slaughtered & Cleaned Jogoo';
            pricingInfo = 'Ksh 1,500 per bird';
            break;
        case 'cleaned-hens-kienyeji':
            orderTypeText = 'Slaughtered & Cleaned Hens';
            pricingInfo = 'Ksh 1,200 per bird';
            break;
        case 'cleaned-hens-premium-kienyeji':
            orderTypeText = 'Slaughtered & Cleaned Hens (Premium)';
            pricingInfo = 'Ksh 1,300 per bird';
            break;
        case 'bulk-kienyeji':
            orderTypeText = 'Bulk Kienyeji Order';
            pricingInfo = 'Ksh 1,000 per bird';
            break;
        case 'eggs-kienyeji':
            orderTypeText = 'Kienyeji Eggs';
            pricingInfo = 'Ksh 900 per tray (30 eggs)';
            break;
        case 'live-broiler':
            orderTypeText = 'Live Broiler Chicken';
            pricingInfo = 'Ksh 500 per bird';
            break;
        case 'cleaned-broiler':
            orderTypeText = 'Slaughtered & Cleaned Broiler';
            pricingInfo = 'Ksh 450 per kg';
            break;
        case 'bulk-broiler':
            orderTypeText = 'Bulk Broiler Order';
            pricingInfo = 'Ksh 400 per kg';
            break;
        case 'eggs-broiler':
            orderTypeText = 'Broiler Layers Eggs';
            pricingInfo = 'Ksh 400 per tray (30 eggs)';
            break;
        default:
            orderTypeText = orderType;
            pricingInfo = 'Please provide pricing';
    }
    
    whatsappMessage += `Order Type: ${orderTypeText}\n`;
    if (pricingInfo) whatsappMessage += `Pricing: ${pricingInfo}\n`;
    whatsappMessage += `Message: ${message}`;
    
    // Add specific notes based on order type
    if (orderType.includes('bulk')) {
        whatsappMessage += `\n\nI'm interested in bulk pricing. Please provide a detailed quote and confirm minimum order quantities.`;
    } else if (orderType.includes('live')) {
        whatsappMessage += `\n\nI prefer live chicken delivery. Please confirm availability and delivery arrangements.`;
    } else if (orderType.includes('cleaned')) {
        whatsappMessage += `\n\nI need slaughtered and cleaned chicken. Please confirm processing time and delivery schedule.`;
    } else if (orderType.includes('eggs')) {
        whatsappMessage += `\n\nI'm interested in fresh eggs. Please confirm availability and delivery options.`;
    }
    
    // Add deposit information
    whatsappMessage += `\n\nNote: I understand a 50% deposit is required before processing begins.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/254769583063?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Thank you! Your message has been prepared for WhatsApp. Please send it to complete your inquiry.');
    
    // Reset form
    this.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .testimonial-card, .gallery-item, .step, .feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gallery lightbox effect (simple version)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close on escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Scroll-triggered animations for statistics or counters (if you want to add them later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Add parallax effect to hero section - DISABLED
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero-image img');
//     
//     parallaxElements.forEach(element => {
//         const speed = 0.5;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads (uncomment if desired)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// });

// Add search functionality (if you want to add a search feature later)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add price calculator (if you want to add this feature)
// Add price calculator (if you want to add this feature)
function calculatePrice() {
    // This function is now handled by the main calculatePrice function
    return 0;
}

// WhatsApp floating button pulse animation
const whatsappFloat = document.querySelector('.whatsapp-float a');
if (whatsappFloat) {
    setInterval(() => {
        whatsappFloat.style.animation = 'none';
        setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 2s infinite';
        }, 100);
    }, 10000); // Pulse every 10 seconds
}

// Add click tracking for analytics (you can integrate with Google Analytics later)
function trackClick(category, action, label) {
    // Example for Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Track: ${category} - ${action} - ${label}`);
}

// Track important button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackClick('Button', 'Click', 'Primary CTA');
    });
});

document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
        trackClick('Contact', 'WhatsApp', 'WhatsApp Button');
    });
});

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // Validate phone number format
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^(\+254|0)[17]\d{8}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
            phoneInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    // Validate email format
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    return isValid;
}

// Add real-time validation to contact form
const formInputs = contactForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateForm(contactForm);
    });
});

// Add loading state to form submission
contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Re-enable after 3 seconds (after WhatsApp opens)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Improved Kienyeji Farm website loaded successfully!');
    
    // Initialize EmailJS with error handling
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('e2rfnswmezMktxHmT'); // Your EmailJS public key
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS library not loaded');
        }
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
    
    // Set minimum date for delivery to tomorrow
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Add price calculation listeners for email order form
    const quantityInput = document.getElementById('quantity');
    const orderTypeSelect = document.getElementById('emailOrderType');
    
    if (quantityInput && orderTypeSelect) {
        // Update placeholder text based on order type
        function updateQuantityPlaceholder() {
            const orderType = orderTypeSelect.value;
            if (orderType.includes('eggs')) {
                quantityInput.placeholder = 'Number of trays (30 eggs per tray)';
            } else {
                quantityInput.placeholder = 'Number of items';
            }
        }
        
        // Update placeholder when order type changes
        orderTypeSelect.addEventListener('change', updateQuantityPlaceholder);
        
        [quantityInput, orderTypeSelect].forEach(input => {
            input.addEventListener('input', calculatePrice);
            input.addEventListener('change', calculatePrice);
        });
    }
    
    // Initialize email order form handler
    const emailOrderForm = document.getElementById('emailOrderForm');
    if (emailOrderForm) {
        emailOrderForm.addEventListener('submit', handleEmailOrderSubmit);
    }
    
    // Add floating chicken patterns
    createFloatingChickens();
    
    // Add chicken sound effects on button clicks (optional)
    addChickenSoundEffects();
    
    // Show welcome message in console
    console.log('%c🐔 Welcome to Improved Kienyeji Farm! ', 'background: #2c5530; color: white; padding: 5px 10px; border-radius: 3px;');

    
    // Test EmailJS connectivity
    setTimeout(() => {
        testEmailJSConnection();
    }, 2000);
    
    // Mobile modal enhancements
    initializeMobileModalEnhancements();
});

// Product order type selection function with updated pricing
function selectOrderType(orderType) {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Wait for scroll to complete, then fill form
    setTimeout(() => {
        const orderTypeSelect = document.getElementById('orderType');
        const messageField = document.getElementById('message');
        
        if (orderTypeSelect) {
            // Map product types to form values
            const typeMapping = {
                'live-jogoo-kienyeji': 'live-jogoo-kienyeji',
                'live-hens-kienyeji': 'live-hens-kienyeji',
                'live-hens-premium-kienyeji': 'live-hens-premium-kienyeji',
                'cleaned-jogoo-kienyeji': 'cleaned-jogoo-kienyeji',
                'cleaned-hens-kienyeji': 'cleaned-hens-kienyeji',
                'cleaned-hens-premium-kienyeji': 'cleaned-hens-premium-kienyeji',
                'bulk-kienyeji': 'bulk-hens-kienyeji',
                'bulk-hens-kienyeji': 'bulk-hens-kienyeji',
                'bulk-jogoo-kienyeji': 'bulk-jogoo-kienyeji',
                'eggs-kienyeji': 'eggs-kienyeji',
                'live-broiler': 'live-broiler',
                'cleaned-broiler': 'cleaned-broiler',
                'bulk-broiler': 'bulk-broiler',
                'eggs-broiler': 'eggs-broiler'
            };
            
            // Set the order type
            if (typeMapping[orderType]) {
                orderTypeSelect.value = typeMapping[orderType];
                
                // Add visual highlight to show selection
                orderTypeSelect.style.borderColor = '#2c5530';
                orderTypeSelect.style.boxShadow = '0 0 10px rgba(44, 85, 48, 0.3)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    orderTypeSelect.style.borderColor = '';
                    orderTypeSelect.style.boxShadow = '';
                }, 3000);
            }
        }
        
        // Pre-fill message based on order type with UPDATED PRICING
        if (messageField) {
            let preMessage = '';
            switch(orderType) {
                case 'live-jogoo-kienyeji':
                    preMessage = 'I am interested in ordering live Jogoo (Roosters) at Ksh 1,500 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                    break;
                case 'live-hens-kienyeji':
                    preMessage = 'I am interested in ordering live Improved Kienyeji Hens at Ksh 1,200 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                    break;
                case 'live-hens-premium-kienyeji':
                    preMessage = 'I am interested in ordering live Premium Improved Kienyeji Hens at Ksh 1,300 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                    break;
                case 'cleaned-jogoo-kienyeji':
                    preMessage = 'I would like to order slaughtered and cleaned Jogoo (Roosters) at Ksh 1,500 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                    break;
                case 'cleaned-hens-kienyeji':
                    preMessage = 'I would like to order slaughtered and cleaned Improved Kienyeji Hens at Ksh 1,200 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                    break;
                case 'cleaned-hens-premium-kienyeji':
                    preMessage = 'I would like to order slaughtered and cleaned Premium Improved Kienyeji Hens at Ksh 1,300 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                    break;
                case 'bulk-kienyeji':
                case 'bulk-hens-kienyeji':
                    preMessage = 'I need a bulk quote for Improved Kienyeji chickens at Ksh 1,000 per bird. Please provide availability and delivery options for 10+ birds. I understand a 50% deposit is required before processing begins.';
                    break;
                case 'bulk-jogoo-kienyeji':
                    preMessage = 'I need a bulk quote for Improved Kienyeji Jogoo at Ksh 1,300 per bird. Please provide availability and delivery options for 10+ birds. I understand a 50% deposit is required before processing begins.';
                    break;
                case 'eggs-kienyeji':
                    preMessage = 'I would like to order Improved Kienyeji eggs at Ksh 900 per tray. Please provide availability and delivery options. I understand a 50% deposit is required before processing.';
                    break;
                // UPDATED BROILER PRICING
                case 'live-broiler':
                    preMessage = 'I am interested in ordering live Broiler chickens at Ksh 500 per bird. Please provide availability and delivery details for 10+ birds. I understand a 50% deposit is required before processing.';
                    break;
                case 'cleaned-broiler':
                    preMessage = 'I would like to order slaughtered and cleaned Broiler chickens at Ksh 450 per kg. Please provide processing time and delivery information for 10+ birds. I understand a 50% deposit is required before processing.';
                    break;
                case 'bulk-broiler':
                    preMessage = 'I need a bulk quote for Broiler chickens at Ksh 400 per kg. Please provide availability and delivery options for 50+ birds. I understand a 50% deposit is required before processing begins.';
                    break;
                case 'eggs-broiler':
                    preMessage = 'I would like to order Broiler Layers eggs at Ksh 400 per tray. Please provide availability and delivery options. I understand a 50% deposit is required before processing.';
                    break;
                default:
                    preMessage = 'I am interested in placing an order. Please provide pricing and availability information. I understand a 50% deposit is required before processing begins.';
            }
            
            messageField.value = preMessage;
            
            // Add visual highlight to message field
            messageField.style.borderColor = '#2c5530';
            messageField.style.boxShadow = '0 0 10px rgba(44, 85, 48, 0.3)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                messageField.style.borderColor = '';
                messageField.style.boxShadow = '';
            }, 3000);
        }
    }, 1000);
}

// Create floating chicken emojis for decoration
function createFloatingChickens() {
    const chickens = ['🐔', '🐓', '🐣', '🐤', '🥚'];
    const container = document.body;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const chicken = document.createElement('div');
            chicken.textContent = chickens[Math.floor(Math.random() * chickens.length)];
            chicken.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 20}px;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight + 50}px;
                pointer-events: none;
                z-index: 1;
                opacity: 0.1;
                animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
            `;
            
            container.appendChild(chicken);
            
            // Remove after animation
            setTimeout(() => {
                if (chicken.parentNode) {
                    chicken.parentNode.removeChild(chicken);
                }
            }, 25000);
        }, i * 3000);
    }
}

// Add CSS animation for floating chickens
if (!document.getElementById('floating-animation')) {
    const style = document.createElement('style');
    style.id = 'floating-animation';
    style.textContent = `
        @keyframes floatUp {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 0.1;
            }
            50% {
                opacity: 0.05;
            }
            to {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add subtle chicken sound effects (optional)
function addChickenSoundEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-whatsapp');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Create a brief visual feedback
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add CSS for ripple effect
if (!document.getElementById('ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}







// Global variables for user authentication
let currentUser = null;

// Email Order Modal Functions
function showEmailOrderModal() {
    const modal = document.getElementById('emailOrderModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Mobile specific adjustments
    if (window.innerWidth <= 768) {
        // Scroll to top of modal
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 100);
        
        // Add mobile class for specific styling
        modal.classList.add('mobile-modal');
        
        // Adjust viewport meta tag for better mobile experience
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
}

function closeEmailOrderModal() {
    const modal = document.getElementById('emailOrderModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Mobile specific cleanup
    if (window.innerWidth <= 768) {
        modal.classList.remove('mobile-modal');
        
        // Restore original viewport settings
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    }
    
    // Reset form and show login section
    resetEmailOrderForm();
    showLoginSection();
}

function showLoginSection() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('orderFormSection').style.display = 'none';
}

function showOrderFormSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('orderFormSection').style.display = 'block';
    
    // Smooth scroll to top of form on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const modal = document.getElementById('emailOrderModal');
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }, 100);
    }
    
    // Focus on first form field for better UX
    setTimeout(() => {
        const firstInput = document.getElementById('customerName');
        if (firstInput && window.innerWidth > 768) {
            firstInput.focus();
        }
    }, 200);
}

function resetEmailOrderForm() {
    const form = document.getElementById('emailOrderForm');
    if (form) form.reset();
    
    const userEmail = document.getElementById('userEmail');
    if (userEmail) userEmail.value = '';
    
    const priceEstimate = document.getElementById('priceEstimate');
    if (priceEstimate) priceEstimate.style.display = 'none';
}

// Handle manual email login
function proceedWithEmail() {
    const email = document.getElementById('userEmail').value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Set user info manually
    currentUser = {
        email: email,
        name: email.split('@')[0], // Use part before @ as name
        picture: null
    };
    
    updateUserDisplay();
    showOrderFormSection();
}

// Google Sign-In callback - REMOVED
// function handleCredentialResponse(response) {
//     const payload = parseJwt(response.credential);
//     currentUser = {
//         email: payload.email,
//         name: payload.name,
//         picture: payload.picture
//     };
//     updateUserDisplay();
//     showOrderFormSection();
// }

function updateUserDisplay() {
    if (!currentUser) return;
    
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userNameDisplay) userNameDisplay.textContent = currentUser.name;
    if (userEmailDisplay) userEmailDisplay.textContent = currentUser.email;
    
    if (userAvatar) {
        if (currentUser.picture) {
            userAvatar.innerHTML = `<img src="${currentUser.picture}" alt="User" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        } else {
            userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        }
    }
    
    // Pre-fill email in form if available
    const customerNameInput = document.getElementById('customerName');
    if (customerNameInput && currentUser.name) {
        customerNameInput.value = currentUser.name;
    }
}

function signOut() {
    currentUser = null;
    // google.accounts.id.disableAutoSelect(); // REMOVED - Google Sign-In
    showLoginSection();
}

// Pricing configuration object - KIENYEJI AND BROILER CHICKENS
const PRICING_CONFIG = {
    kienyeji: {
        jogoo: {
            live: 1500,
            cleaned: 1500
        },
        hens: {
            live: 1200,
            cleaned: 1200
        },
        bulk: {
            hens: 1000,
            jogoo: 1300
        }
    },
    broiler: {
        chickens: {
            live: 500,
            cleaned: 450  // per kg
        },
        bulk: 400  // per kg
    },
    eggs: {
        kienyeji: 900,  // per tray
        broiler: 400    // per tray
    }
};

// Order type mapping - KIENYEJI AND BROILER CHICKENS
const ORDER_TYPE_MAPPING = {
    // Kienyeji Products
    'live-jogoo-kienyeji': { category: 'kienyeji', type: 'jogoo', processing: 'live' },
    'live-hens-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'live' },
    'cleaned-jogoo-kienyeji': { category: 'kienyeji', type: 'jogoo', processing: 'cleaned' },
    'cleaned-hens-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'cleaned' },
    'bulk-hens-kienyeji': { category: 'kienyeji', type: 'bulk', subtype: 'hens', processing: 'mixed' },
    'bulk-jogoo-kienyeji': { category: 'kienyeji', type: 'bulk', subtype: 'jogoo', processing: 'mixed' },
    
    // Broiler Products
    'live-broiler': { category: 'broiler', type: 'chickens', processing: 'live' },
    'cleaned-broiler': { category: 'broiler', type: 'chickens', processing: 'cleaned' },
    'bulk-broiler': { category: 'broiler', type: 'bulk', processing: 'mixed' },
    
    // Egg Products (both types available)
    'eggs-kienyeji': { category: 'eggs', type: 'kienyeji' },
    'eggs-broiler': { category: 'eggs', type: 'broiler' },
    
    // Legacy support for existing order types
    'live-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'live' },
    'cleaned-kienyeji': { category: 'kienyeji', type: 'hens', processing: 'cleaned' },
    'bulk-kienyeji': { category: 'kienyeji', type: 'bulk', subtype: 'hens', processing: 'mixed' }
};

// Price calculation for all product types
function calculatePrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const orderType = document.getElementById('emailOrderType').value;
    
    if (quantity > 0 && orderType) {
        let pricePerBird = 0;
        let totalPrice = 0;
        let usePerBird = false;
        
        // Check if it's a new product type
        if (ORDER_TYPE_MAPPING[orderType]) {
            const mapping = ORDER_TYPE_MAPPING[orderType];
            
            if (mapping.category === 'kienyeji') {
                if (mapping.type === 'bulk') {
                    // Bulk pricing depends on subtype (hens vs jogoo)
                    pricePerBird = PRICING_CONFIG.kienyeji.bulk[mapping.subtype];
                } else {
                    pricePerBird = PRICING_CONFIG.kienyeji[mapping.type][mapping.processing];
                }
                totalPrice = quantity * pricePerBird;
                usePerBird = true;
            } else if (mapping.category === 'broiler') {
                if (mapping.type === 'bulk') {
                    pricePerBird = PRICING_CONFIG.broiler.bulk;
                } else {
                    pricePerBird = PRICING_CONFIG.broiler[mapping.type][mapping.processing];
                }
                totalPrice = quantity * pricePerBird;
                usePerBird = true;
            } else if (mapping.category === 'eggs') {
                // Handle egg products - quantity represents number of trays
                const pricePerTray = PRICING_CONFIG.eggs[mapping.type];
                totalPrice = quantity * pricePerTray;
                usePerBird = false;
                
                document.getElementById('estimatedPrice').innerHTML = `
                    <div style="text-align: left;">
                        <div>${quantity} tray(s) × Ksh ${pricePerTray}/tray</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">(${quantity * 30} eggs total)</div>
                        <div style="font-size: 1.2rem; font-weight: bold; margin-top: 10px;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                        <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                            <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                        </div>
                        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                            Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                        </div>
                    </div>
                `;
                document.getElementById('priceEstimate').style.display = 'block';
                return;
            }
        } else {
            // Handle legacy cases and other product types
            switch (orderType) {
                // Legacy Kienyeji Products - map to new structure
                case 'live-kienyeji':
                    pricePerBird = PRICING_CONFIG.kienyeji.hens.live;
                    totalPrice = quantity * pricePerBird;
                    usePerBird = true;
                    break;
                case 'cleaned-kienyeji':
                    pricePerBird = PRICING_CONFIG.kienyeji.hens.cleaned;
                    totalPrice = quantity * pricePerBird;
                    usePerBird = true;
                    break;
                case 'bulk-kienyeji':
                    pricePerBird = PRICING_CONFIG.kienyeji.bulk.hens;
                    totalPrice = quantity * pricePerBird;
                    usePerBird = true;
                    break;
                
                // Broiler Products
                case 'live-broiler':
                    pricePerBird = PRICING_CONFIG.broiler.chickens.live;
                    totalPrice = quantity * pricePerBird;
                    usePerBird = true;
                    break;
                case 'cleaned-broiler':
                    // Cleaned broiler is priced per kg, assume average 1.5kg per bird
                    const avgWeightKg = 1.5;
                    const pricePerKg = PRICING_CONFIG.broiler.chickens.cleaned;
                    totalPrice = quantity * avgWeightKg * pricePerKg;
                    usePerBird = false;
                    document.getElementById('estimatedPrice').innerHTML = `
                        <div style="text-align: left;">
                            <div>${quantity} birds × ${avgWeightKg}kg × Ksh ${pricePerKg}/kg</div>
                            <div style="font-size: 1.2rem; font-weight: bold; margin-top: 10px;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                            <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                                <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                            </div>
                            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                            </div>
                        </div>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                case 'bulk-broiler':
                    // Bulk broiler is priced per kg, assume average 1.5kg per bird
                    const bulkAvgWeightKg = 1.5;
                    const bulkPricePerKg = PRICING_CONFIG.broiler.bulk;
                    totalPrice = quantity * bulkAvgWeightKg * bulkPricePerKg;
                    usePerBird = false;
                    document.getElementById('estimatedPrice').innerHTML = `
                        <div style="text-align: left;">
                            <div>${quantity} birds × ${bulkAvgWeightKg}kg × Ksh ${bulkPricePerKg}/kg (Bulk rate)</div>
                            <div style="font-size: 1.2rem; font-weight: bold; margin-top: 10px;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                            <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                                <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                            </div>
                            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                            </div>
                        </div>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                

                
                // Egg Products
                case 'eggs-kienyeji':
                    // Quantity represents number of trays (30 eggs per tray)
                    const pricePerTrayKienyeji = PRICING_CONFIG.eggs.kienyeji;
                    totalPrice = quantity * pricePerTrayKienyeji;
                    usePerBird = false;
                    document.getElementById('estimatedPrice').innerHTML = `
                        <div style="text-align: left;">
                            <div>${quantity} tray(s) × Ksh ${pricePerTrayKienyeji}/tray</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">(${quantity * 30} eggs total)</div>
                            <div style="font-size: 1.2rem; font-weight: bold; margin-top: 10px;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                            <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                                <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                            </div>
                            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                            </div>
                        </div>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                case 'eggs-broiler':
                    // Quantity represents number of trays (30 eggs per tray)
                    const pricePerTrayBroiler = PRICING_CONFIG.eggs.broiler;
                    totalPrice = quantity * pricePerTrayBroiler;
                    usePerBird = false;
                    document.getElementById('estimatedPrice').innerHTML = `
                        <div style="text-align: left;">
                            <div>${quantity} tray(s) × Ksh ${pricePerTrayBroiler}/tray</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">(${quantity * 30} eggs total)</div>
                            <div style="font-size: 1.2rem; font-weight: bold; margin-top: 10px;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                            <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                                <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                            </div>
                            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                            </div>
                        </div>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
            }
        }
        
        if (!usePerBird) {
            document.getElementById('estimatedPrice').innerHTML = `
                <div style="text-align: left;">
                    <div style="font-size: 1.2rem; font-weight: bold;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                    <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                        <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()} (50%)
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                        Balance on delivery: Ksh ${Math.round(totalPrice * 0.5).toLocaleString()}
                    </div>
                </div>
            `;
        } else {
            let depositAmount = Math.round(totalPrice * 0.5);
            document.getElementById('estimatedPrice').innerHTML = `
                <div style="text-align: left;">
                    <div style="font-size: 1.2rem; font-weight: bold;">Total: Ksh ${totalPrice.toLocaleString()}</div>
                    <div style="color: var(--secondary-color); font-weight: 600; margin-top: 8px;">
                        <i class="fas fa-info-circle"></i> Deposit Required: Ksh ${depositAmount.toLocaleString()} (50%)
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                        Balance on delivery: Ksh ${(totalPrice - depositAmount).toLocaleString()}
                    </div>
                </div>
            `;
        }
        document.getElementById('priceEstimate').style.display = 'block';
    } else {
        document.getElementById('priceEstimate').style.display = 'none';
    }
}

// Email order form submission handler
function handleEmailOrderSubmit(e) {
    e.preventDefault();
    
    console.log('Email order form submitted');
    
    if (!currentUser) {
        alert('Please enter your email address first and click "Continue with Email"');
        showLoginSection();
        return;
    }
    
    console.log('Current user:', currentUser);
    
    const formData = new FormData(e.target);
    const orderDetails = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: currentUser.email,
        orderType: formData.get('orderType'),
        quantity: formData.get('quantity'),
        deliveryLocation: formData.get('deliveryLocation'),
        deliveryDate: formData.get('deliveryDate'),
        specialInstructions: formData.get('specialInstructions')
    };
    
    console.log('Order details collected:', orderDetails);
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerPhone', 'orderType', 'quantity', 'deliveryLocation', 'deliveryDate'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!orderDetails[field] || orderDetails[field].toString().trim() === '') {
            missingFields.push(field.replace(/([A-Z])/g, ' $1').toLowerCase());
        }
    });
    
    if (missingFields.length > 0) {
        alert('Please fill in the following required fields:\n• ' + missingFields.join('\n• '));
        return;
    }
    
    // Validate phone number
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(orderDetails.customerPhone.replace(/\s/g, ''))) {
        alert('Please enter a valid Kenyan phone number\n(e.g., +254769583063 or 0769583063)');
        return;
    }
    
    // Validate quantity for specific order types
    if ((orderDetails.orderType === 'bulk-100' || orderDetails.orderType === 'slaughter') && parseInt(orderDetails.quantity) < 100) {
        alert('Large bulk orders and slaughter service require minimum 100 birds.\n\nFor smaller quantities, please select "Live Chicken", "Slaughtered & Cleaned", or "Bulk Order (10+)"');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    sendOrderEmail(orderDetails);
}

// Test EmailJS connectivity
function testEmailJSConnection() {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS is not loaded. Email orders will not work.');
        return;
    }
    
    console.log('EmailJS is loaded and ready for email sending.');
    console.log('Service ID: service_8zxkkmo');
    console.log('Template ID: template_p0v04ak');
    console.log('Public Key: e2rfnswmezMktxHmT');
}

// Send order email using EmailJS
function sendOrderEmail(orderDetails) {
    const submitBtn = document.querySelector('#emailOrderForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    console.log('Attempting to send email order:', orderDetails);
    
    // Validate EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
        alert('Email service is not available. Please try again later or use WhatsApp.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Calculate price for email based on order type
    let totalPrice = 0;
    let depositAmount = 0;
    let priceCalculation = '';
    let productName = '';
    
    const quantity = parseInt(orderDetails.quantity);
    
    // Check if it's a new product type using the mapping
    if (ORDER_TYPE_MAPPING[orderDetails.orderType]) {
        const mapping = ORDER_TYPE_MAPPING[orderDetails.orderType];
        
        if (mapping.category === 'kienyeji') {
            if (mapping.type === 'bulk') {
                const bulkPrice = PRICING_CONFIG.kienyeji.bulk;
                totalPrice = quantity * bulkPrice;
                priceCalculation = `${quantity} birds × Ksh ${bulkPrice.toLocaleString()} each (Bulk rate)`;
                productName = 'Bulk Kienyeji Order';
            } else {
                const price = PRICING_CONFIG.kienyeji[mapping.type][mapping.processing];
                totalPrice = quantity * price;
                const typeText = mapping.type === 'jogoo' ? 'Jogoo (Roosters)' : 
                               mapping.type === 'hensPremium' ? 'Hens (Premium)' : 'Hens';
                const processingText = mapping.processing === 'live' ? 'Live' : 'Slaughtered & Cleaned';
                priceCalculation = `${quantity} birds × Ksh ${price.toLocaleString()} each`;
                productName = `${processingText} ${typeText}`;
            }
            depositAmount = Math.round(totalPrice * 0.5);
        }
    } else {
        // Handle legacy and other product types
        switch (orderDetails.orderType) {
            // Legacy Kienyeji Products - use new pricing
            case 'live-kienyeji':
                const liveKienyejiPrice = PRICING_CONFIG.kienyeji.hens.live;
                totalPrice = quantity * liveKienyejiPrice;
                priceCalculation = `${quantity} birds × Ksh ${liveKienyejiPrice.toLocaleString()} each`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Live Kienyeji Hens';
                break;
            case 'cleaned-kienyeji':
                const cleanedKienyejiPrice = PRICING_CONFIG.kienyeji.hens.cleaned;
                totalPrice = quantity * cleanedKienyejiPrice;
                priceCalculation = `${quantity} birds × Ksh ${cleanedKienyejiPrice.toLocaleString()} each`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Slaughtered & Cleaned Kienyeji Hens';
                break;
            case 'bulk-kienyeji':
                const bulkKienyejiPrice = PRICING_CONFIG.kienyeji.bulk.hens;
                totalPrice = quantity * bulkKienyejiPrice;
                priceCalculation = `${quantity} birds × Ksh ${bulkKienyejiPrice.toLocaleString()} each (Bulk rate)`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Bulk Kienyeji Order';
                break;
            
            // Broiler Products
            case 'live-broiler':
                const liveBroilerPrice = PRICING_CONFIG.broiler.chickens.live;
                totalPrice = quantity * liveBroilerPrice;
                priceCalculation = `${quantity} birds × Ksh ${liveBroilerPrice.toLocaleString()} each`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Live Broiler Chicken';
                break;
            case 'cleaned-broiler':
                const avgWeightKg = 1.5; // Average weight per bird
                const cleanedBroilerPricePerKg = PRICING_CONFIG.broiler.chickens.cleaned;
                totalPrice = quantity * avgWeightKg * cleanedBroilerPricePerKg;
                priceCalculation = `${quantity} birds × ${avgWeightKg}kg × Ksh ${cleanedBroilerPricePerKg}/kg`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Slaughtered & Cleaned Broiler';
                break;
            case 'bulk-broiler':
                const bulkAvgWeightKg = 1.5; // Average weight per bird
                const bulkBroilerPricePerKg = PRICING_CONFIG.broiler.bulk;
                totalPrice = quantity * bulkAvgWeightKg * bulkBroilerPricePerKg;
                priceCalculation = `${quantity} birds × ${bulkAvgWeightKg}kg × Ksh ${bulkBroilerPricePerKg}/kg (Bulk rate)`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Bulk Broiler Order';
                break;
            
            // Egg Products
            case 'eggs-kienyeji':
                // Quantity represents number of trays (30 eggs per tray)
                const trayPriceKienyeji = PRICING_CONFIG.eggs.kienyeji;
                totalPrice = quantity * trayPriceKienyeji;
                priceCalculation = `${quantity} tray(s) × Ksh ${trayPriceKienyeji}/tray (${quantity * 30} eggs total)`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Kienyeji Eggs';
                break;
            case 'eggs-broiler':
                // Quantity represents number of trays (30 eggs per tray)
                const trayPriceBroiler = PRICING_CONFIG.eggs.broiler;
                totalPrice = quantity * trayPriceBroiler;
                priceCalculation = `${quantity} tray(s) × Ksh ${trayPriceBroiler}/tray (${quantity * 30} eggs total)`;
                depositAmount = Math.round(totalPrice * 0.5);
                productName = 'Broiler Layers Eggs';
                break;
            default:
                console.error('Invalid order type:', orderDetails.orderType);
                alert('Please select a valid order type.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
        }
    }
    
    // Prepare email template parameters (matching your template structure)
    const templateParams = {
        to_name: 'Kienyeji Farm',
        to_email: 'kienyejifreshfarm@gmail.com',
        from_name: orderDetails.customerName,
        from_email: orderDetails.customerEmail,
        reply_to: orderDetails.customerEmail,
        customer_name: orderDetails.customerName,
        customer_email: orderDetails.customerEmail,
        customer_phone: orderDetails.customerPhone,
        order_id: `KF-${Date.now()}`,
        product_name: getOrderTypeText(orderDetails.orderType),
        product_image: (orderDetails.orderType.includes('eggs')) ? 
            'https://images.unsplash.com/photo-1603569283847-aa40cc0b1420?w=64&h=64&fit=crop&crop=center' : 
            'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=64&h=64&fit=crop&crop=center',
        quantity: orderDetails.quantity,
        unit: (orderDetails.orderType.includes('eggs')) ? 'eggs' : 'chickens',
        price: totalPrice.toLocaleString(),
        delivery_cost: '0', // Free delivery or set actual cost
        total_amount: totalPrice.toLocaleString(),
        deposit_amount: depositAmount > 0 ? depositAmount.toLocaleString() : Math.round(totalPrice * 0.5).toLocaleString(),
        deposit_required: 'Yes - Minimum 50% required before processing',
        balance_amount: (totalPrice - (depositAmount > 0 ? depositAmount : Math.round(totalPrice * 0.5))).toLocaleString(),
        delivery_address: orderDetails.deliveryLocation,
        delivery_date: formatDate(orderDetails.deliveryDate),
        farm_phone: '+254769583063',
        farm_email: 'kienyejifreshfarm@gmail.com',
        special_instructions: orderDetails.specialInstructions || 'None'
    };
    
    console.log('Sending email with template params:', templateParams);
    
    // Send email using EmailJS with proper error handling - Send to both farm and customer
    console.log('Sending order notification to farm...');
    
    // First send to farm (order notification)
    emailjs.send('service_8zxkkmo', 'template_p0v04ak', templateParams)
        .then(function(response) {
            console.log('Farm notification sent successfully:', response.status, response.text);
            
            // Now send confirmation to customer
            console.log('Sending confirmation email to customer...');
            const customerTemplateParams = {
                to_name: orderDetails.customerName,
                to_email: orderDetails.customerEmail,
                from_name: '🐔 Kienyeji Farm',
                from_email: 'kienyejifreshfarm@gmail.com',
                reply_to: 'kienyejifreshfarm@gmail.com',
                customer_name: orderDetails.customerName,
                customer_email: orderDetails.customerEmail,
                customer_phone: orderDetails.customerPhone,
                order_id: `KF-${Date.now()}`,
                product_name: getOrderTypeText(orderDetails.orderType),
                quantity: orderDetails.quantity,
                unit: (orderDetails.orderType.includes('eggs')) ? 'eggs' : 'chickens',
                price: totalPrice.toLocaleString(),
                delivery_cost: '0',
                total_amount: totalPrice.toLocaleString(),
                delivery_address: orderDetails.deliveryLocation,
                delivery_date: formatDate(orderDetails.deliveryDate),
                farm_phone: '+254769583063',
                farm_email: 'kienyejifreshfarm@gmail.com',
                special_instructions: orderDetails.specialInstructions || 'None',
                message: (orderDetails.orderType.includes('eggs')) ? 
                    `Thank you for your order! We will contact you soon to confirm and arrange delivery of your fresh eggs.` : 
                    `Thank you for your order! We will contact you soon to confirm and arrange delivery of your fresh chicken.`
            };
            
            // Send customer confirmation (using the correct template ID)
            return emailjs.send('service_8zxkkmo', 'template_y4g99t4', customerTemplateParams);
        })
        .then(function(customerResponse) {
            console.log('Customer confirmation sent successfully:', customerResponse.status, customerResponse.text);
            alert('🎉 Order sent successfully! \n\n✅ You will receive a confirmation email shortly\n✅ We will contact you soon to confirm your order and arrange delivery.');
            closeEmailOrderModal();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            let errorMessage = 'Failed to send order email. ';
            
            if (error.status === 400) {
                errorMessage += 'Please check your email address and try again.';
            } else if (error.status === 401) {
                errorMessage += 'Email service authentication error.';
            } else if (error.status === 403) {
                errorMessage += 'Email service access denied.';
            } else if (error.status >= 500) {
                errorMessage += 'Email service temporarily unavailable.';
            } else {
                errorMessage += 'Please try again or contact us directly via WhatsApp.';
            }
            
            alert(errorMessage + '\n\nAlternatively, you can:\n• Call us at +254769583063\n• WhatsApp us for immediate assistance');
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getOrderTypeText(orderType) {
    switch (orderType) {
        // New Kienyeji Products
        case 'live-jogoo-kienyeji': return 'Live Jogoo (Roosters) - Ksh 1,500/bird';
        case 'live-hens-kienyeji': return 'Live Hens (Standard) - Ksh 1,200/bird';
        case 'live-hens-premium-kienyeji': return 'Live Hens (Premium) - Ksh 1,300/bird';
        case 'cleaned-jogoo-kienyeji': return 'Slaughtered & Cleaned Jogoo - Ksh 1,500/bird';
        case 'cleaned-hens-kienyeji': return 'Slaughtered & Cleaned Hens - Ksh 1,200/bird';
        case 'cleaned-hens-premium-kienyeji': return 'Slaughtered & Cleaned Hens (Premium) - Ksh 1,300/bird';
        case 'bulk-kienyeji': return 'Bulk Kienyeji Order - Ksh 1,000/bird';
        case 'bulk-hens-kienyeji': return 'Bulk Kienyeji Hens - Ksh 1,000/bird';
        case 'bulk-jogoo-kienyeji': return 'Bulk Kienyeji Jogoo - Ksh 1,300/bird';
        
        // Broiler Products
        case 'live-broiler': return 'Live Broiler Chicken (Ksh 500/bird)';
        case 'cleaned-broiler': return 'Slaughtered & Cleaned Broiler (Ksh 450/kg)';
        case 'bulk-broiler': return 'Bulk Broiler Order (Ksh 400/kg)';
        
        // Legacy Kienyeji Products (for backward compatibility)
        case 'live-kienyeji': return 'Live Kienyeji Hens - Ksh 1,200/bird';
        case 'cleaned-kienyeji': return 'Slaughtered & Cleaned Kienyeji Hens - Ksh 1,200/bird';
        

        
        // Egg Products
        case 'eggs-kienyeji': return 'Kienyeji Eggs (Ksh 900/tray)';
        case 'eggs-broiler': return 'Broiler Layers Eggs (Ksh 400/tray)';
        
        default: return 'Kienyeji Farm Order';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Product order type selection function
function selectOrderType(orderType) {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Wait for scroll to complete, then fill form
    setTimeout(() => {
        const orderTypeSelect = document.getElementById('orderType');
        if (orderTypeSelect) {
            // Map product types to form values
            const typeMapping = {
                'live-jogoo-kienyeji': 'live-jogoo-kienyeji',
                'live-hens-kienyeji': 'live-hens-kienyeji',
                'live-hens-premium-kienyeji': 'live-hens-premium-kienyeji',
                'cleaned-jogoo-kienyeji': 'cleaned-jogoo-kienyeji',
                'cleaned-hens-kienyeji': 'cleaned-hens-kienyeji',
                'cleaned-hens-premium-kienyeji': 'cleaned-hens-premium-kienyeji',
                'bulk-kienyeji': 'bulk-hens-kienyeji',
                'bulk-hens-kienyeji': 'bulk-hens-kienyeji',
                'bulk-jogoo-kienyeji': 'bulk-jogoo-kienyeji',
                'eggs-kienyeji': 'eggs-kienyeji',
                'live-broiler': 'live-broiler',
                'cleaned-broiler': 'cleaned-broiler',
                'bulk-broiler': 'bulk-broiler',
                'eggs-broiler': 'eggs-broiler',
                // Legacy support
                'live-kienyeji': 'live-hens-kienyeji',
                'cleaned-kienyeji': 'cleaned-hens-kienyeji'
            };
            
            // Set the order type
            if (typeMapping[orderType]) {
                orderTypeSelect.value = typeMapping[orderType];
                
                // Add visual highlight to show selection
                orderTypeSelect.style.borderColor = '#2c5530';
                orderTypeSelect.style.boxShadow = '0 0 10px rgba(44, 85, 48, 0.3)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    orderTypeSelect.style.borderColor = '';
                    orderTypeSelect.style.boxShadow = '';
                }, 3000);
            }
            
            // Pre-fill message based on order type
            const messageField = document.getElementById('message');
            if (messageField) {
                let preMessage = '';
                switch(orderType) {
                    case 'live-jogoo-kienyeji':
                        preMessage = 'I am interested in ordering live Jogoo (Roosters) at Ksh 1,500 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'live-hens-kienyeji':
                        preMessage = 'I am interested in ordering live Kienyeji Hens at Ksh 1,200 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'live-hens-premium-kienyeji':
                        preMessage = 'I am interested in ordering live Premium Kienyeji Hens at Ksh 1,300 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-jogoo-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Jogoo (Roosters) at Ksh 1,500 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-hens-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Kienyeji Hens at Ksh 1,200 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-hens-premium-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Premium Kienyeji Hens at Ksh 1,300 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'bulk-kienyeji':
                        preMessage = 'I need a bulk quote for Kienyeji chickens at Ksh 1,000 per bird. Please provide availability and delivery options. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'eggs-kienyeji':
                        preMessage = 'I would like to order Kienyeji eggs at Ksh 900 per tray. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'bulk-hens-kienyeji':
                        preMessage = 'I need a bulk quote for Kienyeji Hens at Ksh 1,000 per bird. Please provide availability and delivery options. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'bulk-jogoo-kienyeji':
                        preMessage = 'I need a bulk quote for Kienyeji Jogoo at Ksh 1,300 per bird. Please provide availability and delivery options. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'live-broiler':
                        preMessage = 'I am interested in ordering live Broiler chickens at Ksh 1,000 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-broiler':
                        preMessage = 'I would like to order slaughtered and cleaned Broiler chickens at Ksh 1,000 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'bulk-broiler':
                        preMessage = 'I need a bulk quote for Broiler chickens at Ksh 900 per bird. Please provide availability and delivery options for 50+ birds. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'eggs-broiler':
                        preMessage = 'I would like to order Broiler Layers eggs at Ksh 400 per tray. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    // Legacy support
                    case 'live-kienyeji':
                        preMessage = 'I am interested in ordering live Kienyeji Hens at Ksh 1,200 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Kienyeji Hens at Ksh 1,200 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                }
                messageField.value = preMessage;
                
                // Highlight message field briefly
                messageField.style.borderColor = '#2c5530';
                setTimeout(() => {
                    messageField.style.borderColor = '';
                }, 2000);
            }
        }
    }, 800); // Wait for smooth scroll to complete
}

// Parse JWT token - REMOVED (Google Sign-In functionality)

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('emailOrderModal');
    if (event.target === modal) {
        // On mobile, add a small delay to prevent accidental closure
        if (window.innerWidth <= 768) {
            // Check if user was trying to interact with form elements
            const formActions = modal.querySelector('.form-actions');
            const rect = formActions ? formActions.getBoundingClientRect() : null;
            
            if (rect && event.clientY >= rect.top - 20) {
                // User clicked near the button area, don't close
                return;
            }
        }
        closeEmailOrderModal();
    }
});

// Mobile modal enhancements
function initializeMobileModalEnhancements() {
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        const modal = document.getElementById('emailOrderModal');
        if (modal && modal.style.display === 'block') {
            // Readjust modal on orientation change
            setTimeout(() => {
                const modalBody = modal.querySelector('.modal-body');
                if (modalBody && window.innerWidth <= 768) {
                    modalBody.scrollTop = modalBody.scrollTop; // Maintain scroll position
                }
            }, 500);
        }
    });
    
    // Handle keyboard appearance on mobile
    if (window.innerWidth <= 768) {
        let initialViewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        
        const handleViewportChange = () => {
            const modal = document.getElementById('emailOrderModal');
            if (modal && modal.style.display === 'block') {
                const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                const keyboardHeight = initialViewportHeight - currentHeight;
                
                if (keyboardHeight > 150) { // Keyboard is likely visible
                    modal.classList.add('keyboard-visible');
                } else {
                    modal.classList.remove('keyboard-visible');
                }
            }
        };
        
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportChange);
        } else {
            window.addEventListener('resize', handleViewportChange);
        }
    }
    
    // Improve touch scrolling for form fields
    const formInputs = document.querySelectorAll('#emailOrderForm input, #emailOrderForm select, #emailOrderForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                // Small delay to ensure keyboard is shown
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest'
                    });
                }, 300);
            }
        });
    });
}

// Product order type selection function with updated pricing
function selectOrderType(orderType) {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Wait for scroll to complete, then fill form
    setTimeout(() => {
        const orderTypeSelect = document.getElementById('orderType');
        if (orderTypeSelect) {
            // Map product types to form values
            const typeMapping = {
                'live-jogoo-kienyeji': 'live-jogoo-kienyeji',
                'live-hens-kienyeji': 'live-hens-kienyeji',
                'live-hens-premium-kienyeji': 'live-hens-premium-kienyeji',
                'cleaned-jogoo-kienyeji': 'cleaned-jogoo-kienyeji',
                'cleaned-hens-kienyeji': 'cleaned-hens-kienyeji',
                'cleaned-hens-premium-kienyeji': 'cleaned-hens-premium-kienyeji',
                'bulk-kienyeji': 'bulk-hens-kienyeji',
                'bulk-hens-kienyeji': 'bulk-hens-kienyeji',
                'bulk-jogoo-kienyeji': 'bulk-jogoo-kienyeji',
                'eggs-kienyeji': 'eggs-kienyeji',
                'live-broiler': 'live-broiler',
                'cleaned-broiler': 'cleaned-broiler',
                'bulk-broiler': 'bulk-broiler',
                'eggs-broiler': 'eggs-broiler',
                // Legacy support
                'live-kienyeji': 'live-hens-kienyeji',
                'cleaned-kienyeji': 'cleaned-hens-kienyeji'
            };
            
            // Set the order type
            if (typeMapping[orderType]) {
                orderTypeSelect.value = typeMapping[orderType];
                
                // Add visual highlight to show selection
                orderTypeSelect.style.borderColor = '#2c5530';
                orderTypeSelect.style.boxShadow = '0 0 10px rgba(44, 85, 48, 0.3)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    orderTypeSelect.style.borderColor = '';
                    orderTypeSelect.style.boxShadow = '';
                }, 3000);
            }
            
            // Pre-fill message based on order type with UPDATED PRICING
            const messageField = document.getElementById('message');
            if (messageField) {
                let preMessage = '';
                switch(orderType) {
                    case 'live-jogoo-kienyeji':
                        preMessage = 'I am interested in ordering live Jogoo (Roosters) at Ksh 1,500 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'live-hens-kienyeji':
                        preMessage = 'I am interested in ordering live Improved Kienyeji Hens at Ksh 1,200 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'live-hens-premium-kienyeji':
                        preMessage = 'I am interested in ordering live Premium Improved Kienyeji Hens at Ksh 1,300 per bird. Please provide availability and delivery details. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-jogoo-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Jogoo (Roosters) at Ksh 1,500 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-hens-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Improved Kienyeji Hens at Ksh 1,200 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-hens-premium-kienyeji':
                        preMessage = 'I would like to order slaughtered and cleaned Premium Improved Kienyeji Hens at Ksh 1,300 per bird. Please provide processing time and delivery information. I understand a 50% deposit is required before processing.';
                        break;
                    case 'bulk-kienyeji':
                    case 'bulk-hens-kienyeji':
                        preMessage = 'I need a bulk quote for Improved Kienyeji chickens at Ksh 1,000 per bird. Please provide availability and delivery options for 10+ birds. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'bulk-jogoo-kienyeji':
                        preMessage = 'I need a bulk quote for Improved Kienyeji Jogoo at Ksh 1,300 per bird. Please provide availability and delivery options for 10+ birds. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'eggs-kienyeji':
                        preMessage = 'I would like to order Improved Kienyeji eggs at Ksh 900 per tray. Please provide availability and delivery options. I understand a 50% deposit is required before processing.';
                        break;
                    // UPDATED BROILER PRICING
                    case 'live-broiler':
                        preMessage = 'I am interested in ordering live Broiler chickens at Ksh 500 per bird. Please provide availability and delivery details for 10+ birds. I understand a 50% deposit is required before processing.';
                        break;
                    case 'cleaned-broiler':
                        preMessage = 'I would like to order slaughtered and cleaned Broiler chickens at Ksh 450 per kg. Please provide processing time and delivery information for 10+ birds. I understand a 50% deposit is required before processing.';
                        break;
                    case 'bulk-broiler':
                        preMessage = 'I need a bulk quote for Broiler chickens at Ksh 400 per kg. Please provide availability and delivery options for 50+ birds. I understand a 50% deposit is required before processing begins.';
                        break;
                    case 'eggs-broiler':
                        preMessage = 'I would like to order Broiler Layers eggs at Ksh 400 per tray. Please provide availability and delivery options. I understand a 50% deposit is required before processing.';
                        break;
                    default:
                        preMessage = 'I am interested in placing an order. Please provide pricing and availability information. I understand a 50% deposit is required before processing begins.';
                }
                
                messageField.value = preMessage;
                
                // Add visual highlight to message field
                messageField.style.borderColor = '#2c5530';
                messageField.style.boxShadow = '0 0 10px rgba(44, 85, 48, 0.3)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    messageField.style.borderColor = '';
                    messageField.style.boxShadow = '';
                }, 3000);
            }
        }
    }, 1000);
}