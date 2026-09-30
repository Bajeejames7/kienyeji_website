// Shared behaviour for guide and landing pages (the home page uses script.js)
(function () {
    'use strict';

    const WHATSAPP = '254769583063';

    function onActivate(el, handler) {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handler(e);
            }
        });
    }

    // Mobile menu
    const toggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.nav-menu');
    function setMenu(open) {
        toggle.classList.toggle('active', open);
        menu.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (toggle && menu) {
        toggle.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
        onActivate(toggle, () => toggle.click());
        menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    }

    // Theme (initial value is set inline in <head> to avoid a flash)
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    function paintThemeIcon() {
        const dark = root.getAttribute('data-theme') === 'dark';
        if (themeIcon) themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
        if (themeToggle) themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
    paintThemeIcon();
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('kff-theme', next); } catch (e) {}
            paintThemeIcon();
        });
    }

    // Navbar shadow + back-to-top
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    function onScroll() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        onActivate(backToTop, () => backToTop.click());
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach((q) => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const open = item.classList.toggle('active');
            q.setAttribute('aria-expanded', String(open));
        });
        onActivate(q, () => q.click());
    });

    // Bulk quote builder -> opens WhatsApp with a ready-made message
    const quote = document.getElementById('quoteForm');
    if (quote) {
        quote.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = new FormData(quote);
            const lines = [
                'Hi Kienyeji Farm Fresh, I would like a bulk quote.',
                '',
                'Business: ' + (f.get('business') || '-'),
                'Contact name: ' + (f.get('name') || '-'),
                'Product: ' + f.get('product'),
                'Quantity: ' + (f.get('quantity') || '-'),
                'How often: ' + f.get('frequency'),
                'Delivery location: ' + (f.get('location') || '-'),
                'First delivery date: ' + (f.get('date') || 'Flexible')
            ];
            if (f.get('notes')) lines.push('Notes: ' + f.get('notes'));
            const url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
            window.open(url, '_blank', 'noopener');
        });
        const date = quote.querySelector('input[type="date"]');
        if (date) {
            const d = new Date();
            d.setDate(d.getDate() + 2);
            date.min = d.toISOString().split('T')[0];
        }
    }
})();
