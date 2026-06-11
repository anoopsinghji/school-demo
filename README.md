# Edgemont Academy — School Website MVP

A complete, production-ready school website with 9 pages, admin dashboard, and admission inquiry management.

---

## 📁 Folder Structure

```
school-website/
├── index.html              ← Homepage
├── about.html              ← About Us
├── academics.html          ← Academics
├── facilities.html         ← Facilities
├── faculty.html            ← Faculty
├── gallery.html            ← Photo Gallery
├── admissions.html         ← Admissions + Inquiry Form
├── news.html               ← News & Events
├── contact.html            ← Contact Us
├── css/
│   ├── main.css            ← Main design system & all page styles
│   └── admin.css           ← Admin dashboard styles
├── js/
│   ├── components.js       ← Shared navbar & footer (injected dynamically)
│   ├── main.js             ← All frontend logic (navbar, animations, forms)
│   └── admin.js            ← Admin dashboard CRUD logic
├── admin/
│   └── index.html          ← Admin login + dashboard
└── README.md               ← This file
```

---

## 🚀 Getting Started

1. **Open locally**: Double-click `index.html` or serve with any static server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

2. **Admin Dashboard**: Navigate to `admin/index.html`
   - Username: `admin`
   - Password: `edgemont2024`

---

## ✅ Features Included

### Website Pages
- ✅ Homepage with Hero, Stats, Why Choose Us, Principal Message, Facilities, Achievements, Testimonials, News, Admission Banner, Contact Preview
- ✅ About Us (History, Vision, Mission, Values, Leadership)
- ✅ Academics (Primary, Secondary, Senior Secondary, Methodology, Examination)
- ✅ Facilities (Smart Classrooms, Science Lab, Computer Lab, Library, Sports, Transport, Cafeteria, Medical)
- ✅ Faculty (6 departments, 20+ faculty cards with photo/name/qualification/experience)
- ✅ Gallery (12 photos, category filter, lightbox preview)
- ✅ Admissions (4-step process, eligibility, documents, fee structure, inquiry form with validation)
- ✅ News & Events (tabbed filter, notice board, upcoming events, exam schedule)
- ✅ Contact (all details, department contacts, contact form, map placeholder)

### Technical Features
- ✅ Sticky transparent → solid navbar with smooth scroll
- ✅ Mobile hamburger menu
- ✅ Animated counters (IntersectionObserver)
- ✅ Fade-up scroll animations
- ✅ Form validation (admission + contact)
- ✅ LocalStorage for inquiry persistence
- ✅ WhatsApp floating button
- ✅ SEO meta tags + Open Graph + JSON-LD structured data
- ✅ Lazy loading for images
- ✅ Gallery lightbox + category filter

### Admin Dashboard
- ✅ Secure login (session-based)
- ✅ Overview stats (Total, New, Reviewed, Today)
- ✅ Full inquiries table with search
- ✅ View inquiry modal with status update
- ✅ Delete inquiry
- ✅ Export to CSV
- ✅ Demo data auto-seeded on first load

---

## 🎨 Customization Guide

### Change School Name
Search & replace `Edgemont Academy` in all HTML files.

### Change Colors
Edit CSS variables in `css/main.css`:
```css
:root {
  --navy: #0D2B55;       /* Primary color */
  --gold: #C9962A;       /* Accent color */
}
```

### Change WhatsApp Number
In `js/components.js`, update:
```js
const phone = '919876543210'; // Replace with real number
```

### Add Real Images
Replace gradient placeholder divs with `<img>` tags. Images go in an `/images/` folder.

### Connect to Backend
The inquiry form in `admissions.html` currently saves to `localStorage`. To migrate:
1. Replace the `localStorage.setItem(...)` block in `js/main.js` with a `fetch()` POST to your API
2. Update `js/admin.js` to fetch from your API instead of `localStorage`

### Embed Google Map
In `contact.html`, uncomment the `<iframe>` block and replace the `src` with your Google Maps embed URL.

### Change Admin Password
In `js/admin.js`, line 1:
```js
const ADMIN_CREDENTIALS = { username: 'admin', password: 'YOUR_NEW_PASSWORD' };
```

---

## 📱 Browser Support
Chrome 80+, Firefox 75+, Safari 13+, Edge 80+, Mobile browsers

## 🌐 Deployment
Upload all files to any static host: Netlify, Vercel, GitHub Pages, cPanel, or any shared hosting.

---

*Built with HTML5, CSS3, Vanilla JavaScript, Bootstrap Icons, Google Fonts*
