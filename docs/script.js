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
    
    // Create WhatsApp message
    let whatsappMessage = `Hi! I'm interested in ordering from Kienyeji Farm.\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    if (email) whatsappMessage += `Email: ${email}\n`;
    whatsappMessage += `Order Type: ${orderType}\n`;
    whatsappMessage += `Message: ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/254700000000?text=${encodedMessage}`;
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
    
    // Initialize EmailJS
    emailjs.init('e2rfnswmezMktxHmT'); // Your EmailJS public key
    
    // Set minimum date for delivery to tomorrow
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Add price calculation listeners
    const quantityInput = document.getElementById('quantity');
    const weightInput = document.getElementById('weight');
    const orderTypeSelect = document.getElementById('emailOrderType');
    
    if (quantityInput && weightInput && orderTypeSelect) {
        [quantityInput, weightInput, orderTypeSelect].forEach(input => {
            input.addEventListener('input', calculatePrice);
            input.addEventListener('change', calculatePrice);
        });
    }
    
    // Add floating chicken patterns
    createFloatingChickens();
    
    // Add chicken sound effects on button clicks (optional)
    addChickenSoundEffects();
    
    // Show welcome message in console
    console.log('%c🐔 Welcome to Kienyeji Farm! ', 'background: #2c5530; color: white; padding: 5px 10px; border-radius: 3px;');
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

// Google Sign-In callback (you'll need to set this up with Google OAuth)
function handleCredentialResponse(response) {
    // Decode the JWT token (you'd normally do this on the server)
    const payload = parseJwt(response.credential);
    
    currentUser = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
    };
    
    updateUserDisplay();
    showOrderFormSection();
}

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
    google.accounts.id.disableAutoSelect();
    showLoginSection();
}

// Price calculation
function calculatePrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const orderType = document.getElementById('emailOrderType').value;
    
    if (quantity > 0 && orderType) {
        let pricePerKg = 0;
        let estimatedWeight = weight || (quantity * 2); // Default 2kg per chicken
        
        switch (orderType) {
            case 'live':
                pricePerKg = 800;
                break;
            case 'cleaned':
                pricePerKg = 900;
                break;
            case 'bulk':
                pricePerKg = quantity >= 10 ? 750 : 800; // Bulk discount
                break;
        }
        
        const totalPrice = Math.round(estimatedWeight * pricePerKg);
        
        document.getElementById('estimatedPrice').textContent = `Ksh ${totalPrice.toLocaleString()}`;
        document.getElementById('priceEstimate').style.display = 'block';
    } else {
        document.getElementById('priceEstimate').style.display = 'none';
    }
}

// Email order form submission
document.getElementById('emailOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        alert('Please sign in first');
        return;
    }
    
    const formData = new FormData(this);
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
    
    // Validate required fields
    if (!orderDetails.customerName || !orderDetails.customerPhone || !orderDetails.orderType || 
        !orderDetails.quantity || !orderDetails.deliveryLocation || !orderDetails.deliveryDate) {
        alert('Please fill in all required fields');
        return;
    }
    
    sendOrderEmail(orderDetails);
});

// Send order email using EmailJS
function sendOrderEmail(orderDetails) {
    const submitBtn = document.querySelector('#emailOrderForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Calculate price for email
    const weight = parseFloat(orderDetails.weight) || (parseInt(orderDetails.quantity) * 2);
    let pricePerKg = 0;
    
    switch (orderDetails.orderType) {
        case 'live':
            pricePerKg = 800;
            break;
        case 'cleaned':
            pricePerKg = 900;
            break;
        case 'bulk':
            pricePerKg = parseInt(orderDetails.quantity) >= 10 ? 750 : 800;
            break;
    }
    
    const estimatedTotal = Math.round(weight * pricePerKg);
    
    // Prepare email template parameters
    const templateParams = {
        customer_name: orderDetails.customerName,
        customer_email: orderDetails.customerEmail,
        customer_phone: orderDetails.customerPhone,
        order_type: getOrderTypeText(orderDetails.orderType),
        quantity: orderDetails.quantity,
        weight: weight,
        estimated_total: `Ksh ${estimatedTotal.toLocaleString()}`,
        delivery_location: orderDetails.deliveryLocation,
        delivery_date: formatDate(orderDetails.deliveryDate),
        special_instructions: orderDetails.specialInstructions || 'None',
        order_date: new Date().toLocaleDateString('en-GB'),
        to_email: 'kienyejifreshfarm@gmail.com',
        reply_to: orderDetails.customerEmail
    };
    
    // Send email using EmailJS
    emailjs.send('service_8zxkkmo', 'template_p0v04ak', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Order sent successfully! We will contact you soon to confirm your order.');
            closeEmailOrderModal();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send order. Please try again or contact us directly.');
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

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}

function getOrderTypeText(orderType) {
    switch (orderType) {
        case 'live': return 'Live Chicken (Ksh 800/kg)';
        case 'cleaned': return 'Slaughtered & Cleaned (Ksh 900/kg)';
        case 'bulk': return 'Bulk Order (Special rates)';
        default: return orderType;
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

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('emailOrderModal');
    if (event.target === modal) {
        closeEmailOrderModal();
    }
});