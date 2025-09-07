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
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to light mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to dark mode';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

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
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update navbar background immediately after theme change
    updateNavbarBackground();
    
    // Add a subtle animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    updateNavbarBackground();
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
    let whatsappMessage = `Hi! I'm interested in ordering from Kienyeji Fresh Farm.\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    if (email) whatsappMessage += `Email: ${email}\n`;
    whatsappMessage += `Order Type: ${orderType}\n`;
    whatsappMessage += `Message: ${message}`;
    
    // Add specific notes based on order type
    if (orderType === 'bulk' || orderType === 'bulk-100') {
        whatsappMessage += `\n\nI'm interested in bulk pricing. Please provide a detailed quote.`;
    } else if (orderType === 'live') {
        whatsappMessage += `\n\nI prefer live chicken delivery. Please confirm availability.`;
    } else if (orderType === 'cleaned') {
        whatsappMessage += `\n\nI need slaughtered and cleaned chicken. Please confirm processing time.`;
    }
    
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
function calculatePrice(weight, pricePerKg) {
    return weight * pricePerKg;
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
    console.log('Kienyeji Farm website loaded successfully!');
    
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
    const weightInput = document.getElementById('weight');
    const orderTypeSelect = document.getElementById('emailOrderType');
    
    if (quantityInput && weightInput && orderTypeSelect) {
        [quantityInput, weightInput, orderTypeSelect].forEach(input => {
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
    console.log('%c🐔 Welcome to Kienyeji Farm! ', 'background: #2c5530; color: white; padding: 5px 10px; border-radius: 3px;');
    
    // Test EmailJS connectivity
    setTimeout(() => {
        testEmailJSConnection();
    }, 2000);
});

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
}

function closeEmailOrderModal() {
    const modal = document.getElementById('emailOrderModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
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

// Price calculation for all product types
function calculatePrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const orderType = document.getElementById('emailOrderType').value;
    
    if (quantity > 0 && orderType) {
        let pricePerKg = 0;
        let pricePerBird = 0;
        let estimatedWeight = weight || (quantity * 2); // Default 2kg per chicken
        let totalPrice = 0;
        let usePerBird = false;
        
        switch (orderType) {
            case 'live':
                pricePerKg = 800;
                totalPrice = Math.round(estimatedWeight * pricePerKg);
                break;
            case 'cleaned':
                pricePerKg = 900;
                totalPrice = Math.round(estimatedWeight * pricePerKg);
                break;
            case 'bulk':
                pricePerKg = quantity >= 10 ? 750 : 800; // Bulk discount for 10+
                totalPrice = Math.round(estimatedWeight * pricePerKg);
                break;
            case 'bulk-100':
                if (quantity >= 100) {
                    pricePerBird = 1000;
                    totalPrice = quantity * pricePerBird;
                    usePerBird = true;
                } else {
                    document.getElementById('priceEstimate').innerHTML = `
                        <h4 style="color: #e74c3c;">Minimum Order: 100 birds</h4>
                        <small style="color: #e74c3c;">Large bulk orders require minimum 100 birds.</small>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                }
                break;
            case 'slaughter':
                if (quantity >= 100) {
                    pricePerBird = 1000;
                    totalPrice = quantity * pricePerBird;
                    let depositAmount = Math.round(totalPrice * 0.5);
                    usePerBird = true;
                    
                    document.getElementById('estimatedPrice').innerHTML = `
                        <div style="text-align: left;">
                            <div>Total: Ksh ${totalPrice.toLocaleString()}</div>
                            <div style="color: #2c5530; font-weight: bold;">Deposit Required: Ksh ${depositAmount.toLocaleString()}</div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">Remaining: Ksh ${(totalPrice - depositAmount).toLocaleString()} on delivery</div>
                        </div>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                } else {
                    document.getElementById('priceEstimate').innerHTML = `
                        <h4 style="color: #e74c3c;">Minimum Order: 100 birds</h4>
                        <small style="color: #e74c3c;">Slaughter service requires minimum 100 birds.</small>
                    `;
                    document.getElementById('priceEstimate').style.display = 'block';
                    return;
                }
                break;
        }
        
        if (!usePerBird) {
            document.getElementById('estimatedPrice').textContent = `Ksh ${totalPrice.toLocaleString()}`;
        } else {
            document.getElementById('estimatedPrice').textContent = `Ksh ${totalPrice.toLocaleString()}`;
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
        weight: formData.get('weight'),
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
    
    const quantity = parseInt(orderDetails.quantity);
    const weight = parseFloat(orderDetails.weight) || (quantity * 2);
    
    switch (orderDetails.orderType) {
        case 'live':
            totalPrice = Math.round(weight * 800);
            priceCalculation = `${weight}kg × Ksh 800/kg`;
            break;
        case 'cleaned':
            totalPrice = Math.round(weight * 900);
            priceCalculation = `${weight}kg × Ksh 900/kg`;
            break;
        case 'bulk':
            const bulkRate = quantity >= 10 ? 750 : 800;
            totalPrice = Math.round(weight * bulkRate);
            priceCalculation = `${weight}kg × Ksh ${bulkRate}/kg (Bulk rate)`;
            break;
        case 'bulk-100':
            if (quantity >= 100) {
                totalPrice = quantity * 1000;
                priceCalculation = `${quantity} birds × Ksh 1,000 each`;
            }
            break;
        case 'slaughter':
            if (quantity >= 100) {
                totalPrice = quantity * 1000;
                depositAmount = Math.round(totalPrice * 0.5);
                priceCalculation = `${quantity} birds × Ksh 1,000 each (Slaughter service)`;
            }
            break;
        default:
            console.error('Invalid order type:', orderDetails.orderType);
            alert('Please select a valid order type.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
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
        product_image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=64&h=64&fit=crop&crop=center',
        quantity: orderDetails.quantity,
        unit: 'chickens',
        price: totalPrice.toLocaleString(),
        delivery_cost: '0', // Free delivery or set actual cost
        total_amount: totalPrice.toLocaleString(),
        deposit_amount: depositAmount > 0 ? depositAmount.toLocaleString() : '0',
        deposit_required: depositAmount > 0 ? 'Yes (50% for slaughter service)' : 'Not required',
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
                unit: 'chickens',
                price: totalPrice.toLocaleString(),
                delivery_cost: '0',
                total_amount: totalPrice.toLocaleString(),
                delivery_address: orderDetails.deliveryLocation,
                delivery_date: formatDate(orderDetails.deliveryDate),
                farm_phone: '+254769583063',
                farm_email: 'kienyejifreshfarm@gmail.com',
                special_instructions: orderDetails.specialInstructions || 'None',
                message: `Thank you for your order! We will contact you soon to confirm and arrange delivery of your fresh Kienyeji chicken.`
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
        case 'live': return 'Live Chicken (Ksh 800/kg)';
        case 'cleaned': return 'Slaughtered & Cleaned (Ksh 900/kg)';
        case 'bulk': return 'Bulk Order (10+ birds - Special rates)';
        case 'bulk-100': return 'Large Bulk Order (100+ birds - Ksh 1,000 each)';
        case 'slaughter': return 'Bulk Order with Slaughter Service (50% deposit required)';
        default: return 'Kienyeji Chicken Order';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
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
                'live': 'live',
                'cleaned': 'cleaned', 
                'bulk': 'bulk'
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
                    case 'live':
                        preMessage = 'I am interested in ordering live Kienyeji chicken. Please provide availability, pricing, and delivery details.';
                        break;
                    case 'cleaned':
                        preMessage = 'I would like to order slaughtered and cleaned Kienyeji chicken. Please provide pricing, processing time, and delivery information.';
                        break;
                    case 'bulk':
                        preMessage = 'I need a bulk quote for Kienyeji chickens. Please provide special pricing for bulk orders and delivery options.';
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
        closeEmailOrderModal();
    }
});