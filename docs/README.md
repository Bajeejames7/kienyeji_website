# Kienyeji Chicken Farm Website

A modern, responsive website for selling fresh, free-range Kienyeji chicken in Kenya. Built with HTML5, CSS3, and JavaScript, optimized for mobile devices and ready for GitHub Pages deployment.

## 🐔 Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Built-in SEO features for better Google ranking
- **WhatsApp Integration**: Direct order placement via WhatsApp
- **Email Ordering**: Professional email order system with Google login
- **Contact Forms**: Multiple ways for customers to reach you
- **Product Showcase**: Beautiful product cards with detailed information
- **Price Calculator**: Automatic price estimation for orders
- **Image Gallery**: Showcase your farm and chickens
- **Customer Testimonials**: Build trust with social proof
- **FAQ Section**: Answer common customer questions
- **Fast Loading**: Optimized images and code for quick loading

## 📱 Sections Included

1. **Homepage** - Hero section with main call-to-action
2. **Products** - Live chicken, cleaned chicken, and bulk orders
3. **About Us** - Your farm story and values
4. **How to Order** - Step-by-step ordering process
5. **Customer Reviews** - Testimonials from satisfied customers
6. **Photo Gallery** - Farm and product images
7. **FAQ** - Frequently asked questions
8. **Contact** - Multiple contact methods and form

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub Account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Click "Sign up" and create your account

2. **Create a New Repository**:
   - Click the "+" icon and select "New repository"
   - Name it: `kienyeji-farm-website` (or any name you prefer)
   - Make it **Public**
   - Check "Add a README file"
   - Click "Create repository"

3. **Upload Your Files**:
   - Click "uploading an existing file"
   - Drag and drop all files (`index.html`, `styles.css`, `script.js`)
   - Write a commit message: "Initial website upload"
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

5. **Access Your Website**:
   - Your website will be live at: `https://yourusername.github.io/kienyeji-farm-website`
   - It may take 5-10 minutes to become available

### Option 2: Download and Host Elsewhere

1. Download all files to your computer
2. Upload to any web hosting service (like Hostinger, Bluehost, etc.)
3. Make sure `index.html` is in the root directory

## ⚙️ Customization

### Update Your Information

1. **Contact Details** (in `index.html`):
   ```html
   <!-- Phone numbers are already updated to -->
   +254769583063
   
   <!-- Email is already updated to -->
   kienyejifreshfarm@gmail.com
   ```

2. **Email Ordering Setup**:
   - Follow the [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md) for complete email setup
   - Set up EmailJS account for email functionality
   - Configure Google login (optional)

3. **Business Information**:
   - Farm location
   - Business hours
   - Pricing (currently set to Ksh 800/900 per kg)
   - Product descriptions

4. **WhatsApp Links**:
   - Already updated to use `254769583063`
   - Update the default messages if needed

### Add Your Photos

Replace the stock images with your actual farm photos:

1. **Prepare Your Images**:
   - Resize to appropriate dimensions (e.g., 1200x800 for hero images)
   - Optimize for web (use tools like TinyPNG)
   - Upload to a free image hosting service or use GitHub

2. **Update Image URLs**:
   - Find `src="https://images.unsplash.com..."` in the HTML
   - Replace with your image URLs

### Customize Colors and Styling

In `styles.css`, you can change:

```css
/* Main brand colors */
:root {
    --primary-color: #2c5530;  /* Main green color */
    --secondary-color: #ff6b35; /* Orange accent */
    --whatsapp-color: #25d366;  /* WhatsApp green */
}
```

## 📊 SEO Features

The website includes built-in SEO optimization:

- Meta descriptions and keywords
- Structured heading hierarchy (H1, H2, H3)
- Alt text for images
- Fast loading times
- Mobile-friendly design
- Local business schema (can be added)

### Improve Your Google Ranking

1. **Google My Business**: Create a Google My Business profile
2. **Keywords**: The site already includes relevant keywords like:
   - "Kienyeji chicken for sale in Kenya"
   - "Buy indigenous chicken Nairobi"
   - "Free-range Kienyeji meat supplier"

3. **Content Marketing**: Add a blog section with articles about:
   - How to cook Kienyeji chicken
   - Benefits of indigenous poultry
   - Farm updates and news

## 📱 Mobile Optimization

The website is fully responsive and includes:

- Mobile-friendly navigation menu
- Touch-optimized buttons
- Readable text on small screens
- Fast loading on mobile data
- WhatsApp integration for easy mobile ordering

## 🔧 Technical Features

- **HTML5**: Modern semantic markup
- **CSS3**: Flexbox and Grid layouts, animations
- **JavaScript**: Interactive features, form handling
- **Font Awesome**: Icons throughout the site
- **Google Fonts**: Professional typography
- **Optimized Images**: Fast loading with lazy loading

## 📧 Email Ordering System

Your website now includes a professional email ordering system:

### Features:
- **Google Login Integration**: Customers can sign in with Google
- **Manual Email Option**: Alternative for customers without Google accounts
- **Automatic Price Calculation**: Real-time price estimates
- **Professional Email Templates**: Orders sent to kienyejifreshfarm@gmail.com
- **Complete Order Details**: All customer and order information captured

### Setup Required:
1. **EmailJS Account**: Free service for sending emails
2. **Google OAuth** (optional): For Google login functionality
3. **Email Template**: Pre-configured for your orders

**📋 Complete setup instructions in [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)**

### Customer Order Process:
1. Click "Email Order" button
2. Sign in with Google or enter email
3. Fill out order form
4. Get instant price estimate
5. Submit - email sent to you automatically

## 🛒 Order Management

**Current Setup**: All orders go through WhatsApp for personal handling.

**Future Enhancements** (optional):
- Online payment integration (M-PESA)
- Order tracking system
- Customer accounts
- Inventory management

## 🚀 Going Live Checklist

Before making your website public:

- [ ] Update all contact information
- [ ] Replace stock photos with your farm photos
- [ ] Test all WhatsApp links
- [ ] Check all prices and product information
- [ ] Test the website on mobile devices
- [ ] Test contact forms
- [ ] Verify business hours and delivery areas

## 📈 Analytics and Tracking

To track your website performance, you can add:

1. **Google Analytics**: Add tracking code to measure visitors
2. **Facebook Pixel**: Track social media traffic
3. **WhatsApp Business API**: For better customer management

## 🆘 Support and Maintenance

### Common Issues

**Website not loading after GitHub Pages setup**:
- Wait 10-15 minutes for deployment
- Check that `index.html` is in the root directory
- Verify repository is public

**WhatsApp links not working**:
- Ensure phone number format is correct (+254...)
- Test links on mobile device

**Images not showing**:
- Check image URLs are correct
- Ensure images are publicly accessible

### Regular Updates

- Update product prices regularly
- Add new customer testimonials
- Update seasonal availability
- Refresh farm photos

## 📞 Need Help?

If you need assistance with:
- Customizing the website
- Adding new features
- Setting up payment systems
- SEO optimization

Feel free to reach out for support!

## 📄 License

This website template is provided as-is for your business use. You're free to modify and use it for your Kienyeji chicken business.

---

**🌟 Ready to grow your Kienyeji chicken business online? Upload these files to GitHub and watch your orders increase!**