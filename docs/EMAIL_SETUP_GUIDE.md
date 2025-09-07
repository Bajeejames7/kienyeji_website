# 📧 Email Order Setup Guide

Your website now includes email ordering functionality with Google login! Here's how to set it up:

## 🚀 Quick Setup Overview

Your website now has:
- ✅ Updated phone number: **+254769583063**
- ✅ Updated email: **kienyejifreshfarm@gmail.com**
- ✅ Email order button in hero section
- ✅ Complete email order modal with Google login
- ✅ Price calculation and order form
- ✅ Professional email template

## 📋 Setup Steps

### Step 1: Set Up EmailJS (Free Email Service)

1. **Create EmailJS Account**:
   - Go to [emailjs.com](https://www.emailjs.com)
   - Sign up for free account
   - Verify your email

2. **Create Email Service**:
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose "Gmail" (recommended)
   - Connect your **kienyejifreshfarm@gmail.com** account
   - Note the **Service ID** (e.g., `service_abc123`)

3. **Create Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:

```
Subject: New Kienyeji Chicken Order from {{customer_name}}

Hello Kienyeji Fresh Farm,

You have received a new order through your website!

ORDER DETAILS:
Customer Name: {{customer_name}}
Customer Email: {{customer_email}}
Customer Phone: {{customer_phone}}

ORDER INFORMATION:
Order Type: {{order_type}}
Quantity: {{quantity}} chickens
Estimated Weight: {{weight}} kg
Estimated Total: {{estimated_total}}

DELIVERY:
Location: {{delivery_location}}
Preferred Date: {{delivery_date}}

SPECIAL INSTRUCTIONS:
{{special_instructions}}

Order Date: {{order_date}}

Please contact the customer to confirm this order.

Best regards,
Kienyeji Farm Website
```

   - Save and note the **Template ID** (e.g., `template_xyz789`)

4. **Get Public Key**:
   - Go to "Account" → "General"
   - Copy your **Public Key** (e.g., `abc123def456`)

### Step 2: Update Website Code

**In your `script.js` file, replace these placeholders:**

1. **Line 5**: Replace `'YOUR_EMAILJS_PUBLIC_KEY'` with your actual public key
2. **Line 208**: Replace `'YOUR_SERVICE_ID'` with your service ID
3. **Line 208**: Replace `'YOUR_TEMPLATE_ID'` with your template ID

Example:
```javascript
// Line 5
emailjs.init('abc123def456'); // Your actual public key

// Line 208
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### Step 3: Set Up Google Login (Optional but Recommended)

1. **Create Google Cloud Project**:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project: "Kienyeji Farm Website"

2. **Enable Google Identity**:
   - Go to "APIs & Services" → "Library"
   - Search "Google Identity" → Enable

3. **Create OAuth Client**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "Kienyeji Farm Website"
   - Authorized JavaScript origins: Add your website URL
   - Save and copy **Client ID**

4. **Update HTML**:
   - In `index.html`, replace `YOUR_GOOGLE_CLIENT_ID` with your actual client ID

### Step 4: Test Email Functionality

1. **Upload Updated Files**:
   - Upload the updated `index.html`, `styles.css`, and `script.js`
   - Make sure EmailJS keys are added

2. **Test Order Process**:
   - Visit your website
   - Click "Email Order" button
   - Try both Google login and manual email
   - Fill out order form
   - Submit and check your email

## 🔧 Manual Email Option

If you want to skip Google login setup for now:

1. Users can click "Email Order"
2. Enter their email address manually
3. Fill out the order form
4. System sends email to **kienyejifreshfarm@gmail.com**

## 📱 How It Works for Customers

### Customer Experience:
1. **Click "Email Order"** on your website
2. **Sign in** with Google or enter email
3. **Fill order form** with:
   - Name and phone
   - Order type (Live/Cleaned/Bulk)
   - Quantity and weight
   - Delivery location and date
   - Special instructions
4. **See price estimate** automatically calculated
5. **Submit order** - email sent to you instantly

### You Receive:
- **Professional email** with all order details
- **Customer contact information**
- **Order specifications**
- **Delivery requirements**
- **Price estimate**

## 💰 Pricing in System

The system includes these prices (you can update in script.js):
- **Live Chicken**: Ksh 800/kg
- **Cleaned Chicken**: Ksh 900/kg  
- **Bulk Orders**: Ksh 750/kg (10+ chickens)

## 🛠️ Customization Options

### Update Prices:
In `script.js`, find the `calculatePrice()` function and update:
```javascript
case 'live':
    pricePerKg = 800; // Change this
case 'cleaned':
    pricePerKg = 900; // Change this
```

### Add More Order Types:
In `index.html`, add options to the select dropdown:
```html
<option value="custom">Custom Order</option>
```

## 📧 Email Template Features

Your customers' orders will include:
- ✅ Customer contact details
- ✅ Complete order specifications
- ✅ Automatic price calculation
- ✅ Delivery information
- ✅ Order timestamp
- ✅ Professional formatting

## 🚨 Important Notes

1. **Test Thoroughly**: Test email functionality before going live
2. **Check Spam**: First emails might go to spam folder
3. **Backup Contact**: Keep WhatsApp and phone as backup options
4. **Customer Service**: Respond to email orders promptly
5. **Email Limits**: EmailJS free plan has monthly limits

## 📈 Benefits for Your Business

✅ **Professional Image**: Email orders look more professional
✅ **Order Tracking**: Written record of all orders
✅ **Customer Data**: Build customer database
✅ **Convenience**: Customers can order anytime
✅ **Details**: Complete order specifications
✅ **Follow-up**: Easy to follow up with customers

## 🆘 Troubleshooting

**Email Not Sending?**
- Check EmailJS keys are correct
- Verify Gmail account connected
- Check console for error messages

**Google Login Not Working?**
- Verify Google Client ID is correct
- Check authorized domains in Google Console
- Users can still use manual email option

**Price Not Calculating?**
- Check JavaScript console for errors
- Verify order type values match script

## 🎯 Next Steps

1. Set up EmailJS account
2. Create email template
3. Update JavaScript with your keys
4. Test the email functionality
5. Train on responding to orders
6. Monitor order flow

Your email ordering system is now ready to help grow your Kienyeji chicken business! 🐔📧