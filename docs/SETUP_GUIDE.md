# 🚀 Quick Setup Guide for Your Kienyeji Farm Website

## Step 1: Customize Your Information

Before uploading to GitHub, you need to update the website with your actual business information.

### A. Update Contact Information

**In `index.html`, find and replace:**

1. **Phone Numbers** (appears multiple times):
   - Replace `+254700000000` with your actual phone number
   - Replace `254700000000` with your WhatsApp number (without the +)

2. **Email Address**:
   - Replace `orders@kienyejifarm.com` with your actual email

3. **Business Hours**:
   - Find "Monday - Sunday: 7:00 AM - 7:00 PM" and update with your hours

4. **Location**:
   - Update "Kiambu County, 30km from Nairobi CBD" with your actual location

### B. Update Pricing

**Find these sections and update prices:**

1. **Live Chicken**: Currently shows "Ksh 800 per kg"
2. **Cleaned Chicken**: Currently shows "Ksh 900 per kg"
3. **Delivery Charges**: Update delivery fees for your areas

### C. Customize Business Details

1. **Farm Name**: Replace "Kienyeji Farm" with your actual farm name
2. **Farm Story**: Update the "About Us" section with your actual story
3. **Experience**: Update "5+ Years Experience" with your actual experience

## Step 2: Upload to GitHub

### Option A: Using GitHub Website (Easiest)

1. **Create GitHub Account**:
   - Go to [github.com](https://github.com)
   - Click "Sign up" and create account

2. **Create New Repository**:
   - Click the "+" icon → "New repository"
   - Name: `kienyeji-farm` (or your preferred name)
   - Make it **Public**
   - ✅ Check "Add a README file"
   - Click "Create repository"

3. **Upload Files**:
   - Click "uploading an existing file"
   - Drag all files from your folder:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
     - `_config.yml`
   - Commit message: "Upload Kienyeji farm website"
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to **Settings** tab
   - Scroll to **Pages** section
   - Source: "Deploy from a branch"
   - Branch: **main**
   - Folder: **/ (root)**
   - Click **Save**

5. **Get Your Website URL**:
   - Your site will be at: `https://[your-username].github.io/[repository-name]`
   - Example: `https://johnsmith.github.io/kienyeji-farm`

### Option B: Using GitHub Desktop (For Multiple Updates)

1. Download GitHub Desktop
2. Clone your repository
3. Add/edit files locally
4. Commit and push changes

## Step 3: Add Your Photos

**Currently using stock photos. Replace with your actual farm photos:**

### Quick Method (Beginner):
1. Upload photos to **Google Drive** or **Dropbox**
2. Get public sharing links
3. Replace image URLs in `index.html`

### Professional Method:
1. Upload photos to your GitHub repository
2. Update image paths in HTML
3. Optimize images for web (compress to reduce loading time)

**Image sections to update:**
- Hero section (main farm photo)
- Product photos (live chicken, cleaned chicken)
- Gallery section (6 farm photos)
- About section (farm landscape)

## Step 4: Test Everything

**Before going live, test:**

- [ ] All WhatsApp links work
- [ ] Phone numbers are correct
- [ ] Contact form opens WhatsApp with your number
- [ ] All prices are updated
- [ ] Business information is accurate
- [ ] Website loads properly on mobile

## Step 5: Promote Your Website

### Share Your Website:
- WhatsApp status with website link
- Facebook business page
- Instagram bio link
- Business cards with website URL
- Google My Business listing

### Improve Google Ranking:
- Create Google My Business profile
- Get customer reviews online
- Share website on social media
- Ask satisfied customers to share

## Common Customizations

### Change Colors
In `styles.css`, find:
```css
:root {
    --primary-color: #2c5530;  /* Main green - change this */
    --secondary-color: #ff6b35; /* Orange accent */
}
```

### Add More Products
Copy a product card section in `index.html` and modify:
- Product name
- Description
- Price
- WhatsApp message

### Update Delivery Areas
Update the delivery information section with your actual coverage areas and fees.

## 🆘 Need Help?

**Common Issues:**

1. **Website not showing**: Wait 10-15 minutes after enabling GitHub Pages
2. **WhatsApp not working**: Check phone number format (+254...)
3. **Images not loading**: Verify image URLs are correct

**Contact for support:**
- GitHub has extensive documentation
- YouTube has many GitHub Pages tutorials
- Ask a tech-savvy friend for help with first setup

## 📈 Next Steps (Optional)

Once your basic website is running:

1. **Add Google Analytics** to track visitors
2. **Set up custom domain** (buy .com domain)
3. **Add online payment** (M-PESA integration)
4. **Create social media pages** linked to website
5. **Start a blog** for better SEO

---

**🎉 You're ready to launch! Follow these steps and you'll have a professional chicken farm website live in under an hour.**