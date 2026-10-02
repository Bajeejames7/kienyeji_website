"""Builds the guide and landing pages under docs/.

GitHub Pages serves docs/ as plain files, so each page is generated here from
one shared layout (menu, footer, styles). Edit the content below, then run:

    python tools/build_pages.py

Prices and business facts must match docs/index.html.
"""
import json
import os
from urllib.parse import quote

SITE = 'https://kienyejifarmfresh.co.ke'
NAME = 'Kienyeji Farm Fresh'
PHONE = '+254769583063'
PHONE_DISPLAY = '+254 769 583 063'
EMAIL = 'kienyejifreshfarm@gmail.com'
PUBLISHED = '2026-09-30'
DOCS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs')


def wa(text):
    return 'https://wa.me/254769583063?text=' + quote(text)


def img(path):
    return '/chicken%20pics/' + quote(path)


BUSINESS_REF = {'@id': SITE + '/#business'}
ORG = {'@type': 'Organization', 'name': NAME, 'url': SITE + '/'}

# ---------------------------------------------------------------- pages index
# Used for the menu, the related-guides cards and the home page teaser.
PAGES = {
    'kienyeji-eggs': {
        'tag': 'Prices',
        'card_title': 'Kienyeji eggs price in Nairobi',
        'card_text': 'Ksh 900 a tray of 30, collected daily. How they compare with layers eggs and how to check freshness.',
        'image': 'layer-eggs.jpg',
        'image_alt': 'Tray of Improved Kienyeji eggs',
    },
    'bulk-kienyeji-chicken': {
        'tag': 'For business',
        'card_title': 'Bulk kienyeji for hotels and restaurants',
        'card_text': 'From Ksh 1,000 a bird for 10 or more. Regular supply, slaughter service and delivery in Nairobi.',
        'image': 'chiken1.jpeg',
        'image_alt': 'Improved Kienyeji chickens at our farm, ready for bulk orders',
    },
    'kienyeji-vs-broiler': {
        'tag': 'Guide',
        'card_title': 'Kienyeji vs broiler: what is the difference?',
        'card_text': 'Taste, texture, cooking time, price and which one to buy for which meal.',
        'image': 'chicken5.jpeg',
        'image_alt': 'Improved Kienyeji chickens feeding outdoors',
    },
    'how-to-cook-kienyeji-chicken': {
        'tag': 'Recipe',
        'card_title': 'How to cook kienyeji chicken',
        'card_text': 'A Kenyan-style kienyeji stew that comes out soft and full of flavour, plus boiling times.',
        'image': 'kienyeji_slaughtered.jpeg',
        'image_alt': 'Whole slaughtered and cleaned Kienyeji chicken on a plate',
    },
}


# ---------------------------------------------------------------- layout
def nav(current):
    items = [
        ('/', 'Home', None),
        ('/#products', 'Prices', None),
        ('/kienyeji-eggs/', 'Eggs', 'kienyeji-eggs'),
        ('/bulk-kienyeji-chicken/', 'Bulk Orders', 'bulk-kienyeji-chicken'),
        ('/#guides', 'Guides', None),
        ('/#contact', 'Contact', None),
    ]
    lis = []
    for href, label, slug in items:
        cur = ' aria-current="page"' if slug == current else ''
        lis.append(f'                <li class="nav-item"><a href="{href}" class="nav-link"{cur}>{label}</a></li>')
    return '''    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="/" class="brand">''' + NAME + '''</a>
            </div>
            <ul class="nav-menu">
''' + '\n'.join(lis) + '''
                <li class="nav-item">
                    <button id="themeToggle" class="theme-toggle" title="Toggle dark/light mode" aria-label="Toggle dark/light mode">
                        <i class="fas fa-moon" id="themeIcon"></i>
                    </button>
                </li>
            </ul>
            <div class="nav-toggle" id="mobile-menu" role="button" tabindex="0" aria-label="Open menu" aria-expanded="false">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>'''


def footer():
    guides = '\n'.join(
        f'                        <li><a href="/{slug}/">{p["card_title"]}</a></li>' for slug, p in PAGES.items())
    return '''    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>''' + NAME + '''</h3>
                    <p>Free-range Improved Kienyeji chicken and eggs from our farms in Nairobi and Machakos, delivered fresh across Nairobi.</p>
                    <div class="social-links">
                        <a href="https://wa.me/254769583063" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                        <a href="tel:''' + PHONE + '''" aria-label="Call us"><i class="fas fa-phone"></i></a>
                        <a href="mailto:''' + EMAIL + '''" aria-label="Email us"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/#products">Prices</a></li>
                        <li><a href="/#order">How to Order</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Guides</h4>
                    <ul>
''' + guides + '''
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <ul>
                        <li><i class="fas fa-phone"></i> ''' + PHONE_DISPLAY + '''</li>
                        <li><i class="fas fa-envelope"></i> ''' + EMAIL + '''</li>
                        <li><i class="fas fa-map-marker-alt"></i> Nairobi &amp; Machakos Counties</li>
                        <li><i class="fas fa-clock"></i> 7 AM - 7 PM Daily</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ''' + NAME + '''. All rights reserved. | Improved Kienyeji chicken and eggs, Nairobi, Kenya</p>
            </div>
        </div>
    </footer>'''


def related(current):
    cards = []
    for slug, p in PAGES.items():
        if slug == current:
            continue
        cards.append(guide_card(slug, p, heading='h3'))
    return '''    <section class="related" aria-labelledby="related-title">
        <div class="container">
            <h2 id="related-title">More from ''' + NAME + '''</h2>
            <div class="guides-grid">
''' + '\n'.join(cards) + '''
            </div>
        </div>
    </section>'''


def guide_card(slug, p, heading='h3'):
    return f'''                <a class="guide-card" href="/{slug}/">
                    <img src="{img(p['image'])}" alt="{p['image_alt']}" loading="lazy" width="400" height="250">
                    <div class="guide-card-body">
                        <span class="tag">{p['tag']}</span>
                        <{heading}>{p['card_title']}</{heading}>
                        <p>{p['card_text']}</p>
                        <span class="more">Read more <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>'''


def breadcrumb_ld(slug, title):
    return {
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE + '/'},
            {'@type': 'ListItem', 'position': 2, 'name': title, 'item': f'{SITE}/{slug}/'},
        ],
    }


def faq_ld(faqs):
    return {
        '@type': 'FAQPage',
        'mainEntity': [
            {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': strip_tags(a)}}
            for q, a in faqs
        ],
    }


def strip_tags(html):
    import re
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html)).strip()


def faq_html(faqs):
    items = []
    for q, a in faqs:
        items.append(f'''                        <div class="faq-item">
                            <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
                                <h3>{q}</h3>
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="faq-answer">
                                <p>{a}</p>
                            </div>
                        </div>''')
    return '<div class="page-faq">\n' + '\n'.join(items) + '\n                    </div>'


def toc(entries):
    return '<ul class="toc">\n' + '\n'.join(
        f'                            <li><a href="#{i}">{t}</a></li>' for i, t in entries) + '\n                        </ul>'


def render(slug, title, description, h1, lead, hero_img, hero_alt, meta_line, hero_actions,
           body, aside, ld_graph, wa_text, og_type='article'):
    ld = json.dumps({'@context': 'https://schema.org', '@graph': ld_graph}, indent=4, ensure_ascii=False)
    ld = '\n'.join('    ' + line for line in ld.split('\n'))
    url = f'{SITE}/{slug}/'
    crumb_title = PAGES[slug]['card_title']
    return f'''<!DOCTYPE html>
<html lang="en-KE">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <link rel="canonical" href="{url}">
    <meta name="theme-color" content="#2c5530">
    <meta property="og:type" content="{og_type}">
    <meta property="og:site_name" content="{NAME}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:url" content="{url}">
    <meta property="og:image" content="{SITE}{img(hero_img)}">
    <meta property="og:locale" content="en_KE">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" type="image/png" href="/chicken%20pics/Kienyeji_fresh_farm_logo-removebg-preview.png">
    <link rel="apple-touch-icon" href="/chicken%20pics/Kienyeji_fresh_farm_logo-removebg-preview.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="/styles.css">
    <script>try{{document.documentElement.setAttribute('data-theme',localStorage.getItem('kff-theme')||'light')}}catch(e){{}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script type="application/ld+json">
{ld}
    </script>
</head>
<body>
{nav(slug)}

    <header class="page-hero">
        <div class="container page-hero-inner">
            <div>
                <ol class="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li aria-current="page">{crumb_title}</li>
                </ol>
                <h1>{h1}</h1>
                <p class="lead">{lead}</p>
                <div class="hero-actions">
{hero_actions}
                </div>
                <div class="page-meta">{meta_line}</div>
            </div>
            <div class="page-hero-media">
                <img src="{img(hero_img)}" alt="{hero_alt}" width="800" height="600" fetchpriority="high">
            </div>
        </div>
    </header>

    <main class="page-body">
        <div class="container page-layout">
            <article class="prose">
{body}
            </article>
            <aside class="page-aside">
{aside}
            </aside>
        </div>
    </main>

{related(slug)}

{footer()}

    <div class="whatsapp-float">
        <a href="{wa(wa_text)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>
    <div class="back-to-top" id="backToTop" role="button" tabindex="0" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </div>

    <script src="/site.js"></script>
</body>
</html>
'''


def order_aside(price_html, blurb, wa_text, toc_entries):
    return f'''                <div class="aside-card">
                    <h2>Order now</h2>
                    {price_html}
                    <p>{blurb}</p>
                    <a href="{wa(wa_text)}" class="btn btn-whatsapp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Order on WhatsApp</a>
                    <a href="tel:{PHONE}" class="btn btn-secondary"><i class="fas fa-phone"></i> {PHONE_DISPLAY}</a>
                </div>
                <div class="aside-card">
                    <h3>On this page</h3>
                    {toc(toc_entries)}
                </div>'''


def hero_buttons(wa_text, second_href, second_label, second_icon):
    return f'''                    <a href="{wa(wa_text)}" class="btn btn-whatsapp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Order on WhatsApp</a>
                    <a href="{second_href}" class="btn btn-secondary"><i class="{second_icon}"></i> {second_label}</a>'''


def cta_band(heading, text, wa_text):
    return f'''                <div class="cta-band">
                    <div>
                        <h2>{heading}</h2>
                        <p>{text}</p>
                    </div>
                    <div class="btn-group">
                        <a href="{wa(wa_text)}" class="btn btn-whatsapp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp us</a>
                        <a href="tel:{PHONE}" class="btn btn-secondary"><i class="fas fa-phone"></i> Call</a>
                    </div>
                </div>'''


def article_ld(slug, headline, description, image):
    return {
        '@type': 'Article',
        'headline': headline,
        'description': description,
        'image': SITE + img(image),
        'datePublished': PUBLISHED,
        'dateModified': PUBLISHED,
        'author': ORG,
        'publisher': BUSINESS_REF,
        'mainEntityOfPage': f'{SITE}/{slug}/',
        'inLanguage': 'en-KE',
    }


# ================================================================ 1. Eggs
def page_eggs():
    slug = 'kienyeji-eggs'
    wa_text = "Hi Kienyeji Farm Fresh, I'd like to order Improved Kienyeji eggs. Number of trays: __ . Delivery location: __"
    faqs = [
        ('How much is a tray of kienyeji eggs?',
         'Our Improved Kienyeji eggs are <strong>Ksh 900 per tray of 30</strong>, which works out to about Ksh 30 an egg. Layers eggs are Ksh 450 per tray.'),
        ('Do you deliver eggs the same day?',
         'Yes. We offer same-day delivery within Nairobi for orders placed before 2 PM. Delivery is Ksh 200 within Nairobi and Ksh 300-500 to surrounding counties. You can also pick up free from the farm, 8 AM - 6 PM daily.'),
        ('Do you supply eggs to shops, hotels and restaurants?',
         'Yes. Bulk orders are available from 10 trays of kienyeji eggs or 20 trays of layers eggs. Send us the number of trays and how often you need them and we will give you a quote. See <a href="/bulk-kienyeji-chicken/">bulk orders</a>.'),
        ('Do I need to pay before delivery?',
         'A deposit of at least 50% is required before we process an order, by M-PESA or bank transfer. The balance is paid on delivery.'),
    ]
    body = '''                <ul class="key-facts">
                    <li><strong>Ksh 900</strong>per tray of 30</li>
                    <li><strong>~Ksh 30</strong>per egg</li>
                    <li><strong>Daily</strong>collection</li>
                    <li><strong>Ksh 200</strong>delivery in Nairobi</li>
                </ul>

                <h2 id="prices">Kienyeji egg prices</h2>
                <p>These are our current egg prices. Prices can change with the season, so we confirm the total with you on WhatsApp before you pay.</p>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead><tr><th scope="col">Eggs</th><th scope="col">Quantity</th><th scope="col">Price</th></tr></thead>
                        <tbody>
                            <tr><th scope="row">Improved Kienyeji eggs</th><td>Tray of 30</td><td class="price">Ksh 900</td></tr>
                            <tr><th scope="row">Improved Kienyeji eggs, bulk</th><td>10+ trays</td><td class="price">Ask for a quote</td></tr>
                            <tr><th scope="row">Layers eggs</th><td>Tray of 30</td><td class="price">Ksh 450</td></tr>
                            <tr><th scope="row">Layers eggs, bulk</th><td>20+ trays</td><td class="price">Ask for a quote</td></tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>Delivery:</strong> Ksh 200 within Nairobi, Ksh 300-500 to surrounding counties, or free pickup from the farm (8 AM - 6 PM daily).</p>

                <h2 id="why-price">Why kienyeji eggs cost more than layers eggs</h2>
                <p>Commercial layers are bred to lay an egg almost every day and are kept in houses on a controlled feed. Improved Kienyeji hens lay fewer eggs, spend part of the day ranging outdoors, and take longer to come into lay. Each egg costs more to produce, and that is reflected in the price.</p>
                <p>What you get for the difference is an egg from a hen raised the traditional way, which is why many families keep kienyeji eggs for breakfast and children and use layers eggs for baking and cooking in bulk.</p>

                <h2 id="compare">Kienyeji eggs vs layers eggs</h2>
                <div class="table-wrap">
                    <table class="data-table compare-table">
                        <thead><tr><th scope="col"></th><th scope="col">Improved Kienyeji eggs</th><th scope="col">Layers eggs</th></tr></thead>
                        <tbody>
                            <tr><td>The hens</td><td>Free-range Improved Kienyeji hens</td><td>Commercial layer breeds kept in houses</td></tr>
                            <tr><td>Size</td><td>Often a little smaller</td><td>Larger and very uniform</td></tr>
                            <tr><td>Yolk</td><td>Often a deeper yellow-orange, as the hens forage on greens</td><td>Usually a lighter yellow</td></tr>
                            <tr><td>Price (tray of 30)</td><td>Ksh 900</td><td>Ksh 450</td></tr>
                            <tr><td>Best for</td><td>Boiled and fried eggs, breakfast, children</td><td>Baking, cooking in large quantities, catering</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="freshness">How to check that eggs are fresh</h2>
                <p>We collect eggs daily, but it is worth knowing how to check any egg in your kitchen. The simplest way is the <strong>water test</strong>: put the egg in a bowl of cold water.</p>
                <ul>
                    <li><strong>Sinks and lies flat</strong> on its side: very fresh.</li>
                    <li><strong>Sinks but stands on its end</strong>: older but still fine to eat. Use it soon, ideally hard-boiled.</li>
                    <li><strong>Floats</strong>: too old. Throw it away.</li>
                </ul>
                <p>When you crack a fresh egg, the yolk sits up high and the white is thick and holds together instead of spreading thin across the pan.</p>

                <h2 id="storage">How to store eggs</h2>
                <ul>
                    <li>Keep them in the tray, pointed end down, in a cool place away from sunlight and the stove.</li>
                    <li>In a fridge they keep well for around 3 to 4 weeks. At room temperature, use them within about 2 weeks.</li>
                    <li>Do not wash eggs until just before you use them. Washing removes the natural coating that protects the shell.</li>
                    <li>Once eggs have been in the fridge, keep them there. Moving cold eggs to a warm room makes them sweat.</li>
                </ul>

                <h2 id="order">How to order eggs</h2>
                <ol>
                    <li>Send us a WhatsApp message with the number of trays and your delivery location.</li>
                    <li>We confirm the total including delivery.</li>
                    <li>Pay a deposit of at least 50% by M-PESA or bank transfer.</li>
                    <li>We deliver (same day in Nairobi for orders before 2 PM), and you pay the balance on delivery.</li>
                </ol>

                <h2 id="faq">Egg questions</h2>
                ''' + faq_html(faqs) + '''

''' + cta_band('Fresh kienyeji eggs, delivered', 'Tell us how many trays you need and where to deliver.', wa_text)
    aside = order_aside(
        '<p class="price-big">Ksh 900 <small>/ tray of 30</small></p>',
        'Collected daily from our free-range hens. Same-day delivery in Nairobi for orders before 2 PM.',
        wa_text,
        [('prices', 'Egg prices'), ('why-price', 'Why they cost more'), ('compare', 'Kienyeji vs layers eggs'),
         ('freshness', 'Checking freshness'), ('storage', 'Storing eggs'), ('order', 'How to order'), ('faq', 'Questions')])
    title = 'Kienyeji Eggs in Nairobi: Ksh 900 a Tray | ' + NAME
    desc = 'Improved Kienyeji eggs for Ksh 900 a tray of 30, collected daily from free-range hens. Same-day delivery in Nairobi. Order on WhatsApp.'
    ld = [
        {
            '@type': 'Product',
            'name': 'Improved Kienyeji eggs (tray of 30)',
            'description': 'Eggs from free-range Improved Kienyeji hens, collected daily. Sold by the tray of 30.',
            'image': SITE + img('layer-eggs.jpg'),
            'brand': {'@type': 'Brand', 'name': NAME},
            'offers': {
                '@type': 'Offer', 'price': '900', 'priceCurrency': 'KES',
                'availability': 'https://schema.org/InStock',
                'url': f'{SITE}/{slug}/',
                'seller': BUSINESS_REF,
                'areaServed': 'Nairobi',
            },
        },
        breadcrumb_ld(slug, PAGES[slug]['card_title']),
        faq_ld(faqs),
    ]
    return slug, render(
        slug, title, desc,
        h1='Kienyeji eggs in Nairobi: Ksh 900 a tray, collected daily',
        lead='Eggs from our free-range Improved Kienyeji hens in Nairobi and Machakos, sold by the tray of 30 and delivered across Nairobi. Here are our prices, how they compare with layers eggs, and how to keep them fresh.',
        hero_img='layer-eggs.jpg', hero_alt='Tray of Improved Kienyeji eggs',
        meta_line='<span><i class="fas fa-truck"></i> Same-day delivery in Nairobi</span><span><i class="fas fa-store"></i> Free farm pickup</span>',
        hero_actions=hero_buttons(wa_text, '#prices', 'See egg prices', 'fas fa-tags'),
        body=body, aside=aside, ld_graph=ld, wa_text=wa_text, og_type='product')


# ================================================================ 2. Bulk
def page_bulk():
    slug = 'bulk-kienyeji-chicken'
    wa_text = "Hi Kienyeji Farm Fresh, I'd like a bulk quote. Business: __ . Product and quantity: __ . Delivery location: __"
    faqs = [
        ('What is the minimum bulk order?',
         '10 birds for Improved Kienyeji hens or Jogoo, 50 birds for broilers, 10 trays for kienyeji eggs and 20 trays for layers eggs.'),
        ('How much notice do you need?',
         'Orders are processed in 2-3 working days after we receive the deposit. For a regular weekly or monthly supply, we agree a fixed delivery day with you.'),
        ('Can you slaughter and clean the chickens?',
         'Yes. The slaughter service is available on request. Chickens are slaughtered fresh for your order, never from frozen stock, and hygienically packed.'),
        ('What are the payment terms?',
         'A deposit of at least 50% is required before processing, by M-PESA or bank transfer, with the balance paid on delivery. Payment terms can be arranged for large orders of 100+ birds.'),
        ('Can we visit the farm before ordering?',
         'Yes. Farm visits are welcome between 8 AM and 5 PM. Please call ahead to arrange a time.'),
    ]
    body = '''                <ul class="key-facts">
                    <li><strong>Ksh 1,000</strong>per hen, 10+ birds</li>
                    <li><strong>10 birds</strong>minimum (kienyeji)</li>
                    <li><strong>2-3 days</strong>processing after deposit</li>
                    <li><strong>On request</strong>slaughter &amp; cleaning</li>
                </ul>

                <h2 id="prices">Bulk price list</h2>
                <p>Bulk prices apply from the minimum quantities below. For large or regular orders, send us your numbers and we will confirm availability, delivery cost and a final quote.</p>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead><tr><th scope="col">Product</th><th scope="col">Minimum</th><th scope="col">Bulk price</th></tr></thead>
                        <tbody>
                            <tr><th scope="row">Improved Kienyeji hens</th><td>10 birds</td><td class="price">Ksh 1,000 / bird</td></tr>
                            <tr><th scope="row">Improved Kienyeji Jogoo (roosters)</th><td>10 birds</td><td class="price">Ksh 1,300 / bird</td></tr>
                            <tr><th scope="row">Broilers, slaughtered</th><td>50 birds</td><td class="price">Ksh 400 / kg</td></tr>
                            <tr><th scope="row">Improved Kienyeji eggs</th><td>10 trays</td><td class="price">Quote</td></tr>
                            <tr><th scope="row">Layers eggs</th><td>20 trays</td><td class="price">Quote</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>Standard (non-bulk) prices are on our <a href="/#products">price list</a>.</p>

                <h2 id="who">Who we supply</h2>
                <p>We supply Improved Kienyeji chicken, broilers and eggs to <strong>hotels, restaurants, caterers and events</strong> in Nairobi and the surrounding areas. Our birds come from our own farms in Nairobi and Machakos counties, so we can plan supply around your menu instead of buying whatever is at the market that day.</p>
                <blockquote class="note">
                    <p>"We order bulk for our restaurant. Quality is consistent and customers always compliment the taste!"<br><strong>Grace N., restaurant owner</strong></p>
                </blockquote>

                <h2 id="how">How bulk ordering works</h2>
                <ol class="steps">
                    <li><strong>Send your request.</strong> Use the quote form below, WhatsApp or a call. Tell us the product, quantity, how often and where to deliver.</li>
                    <li><strong>Get a quote.</strong> We confirm availability, the price and the delivery cost.</li>
                    <li><strong>Pay the deposit.</strong> At least 50% by M-PESA or bank transfer. Processing starts once it is confirmed.</li>
                    <li><strong>We prepare your order.</strong> 2-3 working days. With the slaughter service, birds are slaughtered fresh for your order and hygienically packed.</li>
                    <li><strong>Delivery.</strong> We deliver to your kitchen or venue and you pay the balance on delivery.</li>
                </ol>
                <p>For a <strong>regular supply</strong>, weekly or monthly, we agree a fixed delivery day and quantity so you are never short. Payment terms can be arranged for orders of 100+ birds.</p>

                <h2 id="why">Why businesses buy from us</h2>
                <ul>
                    <li><strong>Free-range Improved Kienyeji</strong>, raised on our own farms, with feed and animal health products from a verified agrovet.</li>
                    <li><strong>Slaughtered fresh on order</strong>, never from frozen stock.</li>
                    <li><strong>Vaccinated birds</strong>, following veterinary guidelines, with health records kept.</li>
                    <li><strong>Consistent quality</strong> from one supplier, so your dishes taste the same every week.</li>
                    <li><strong>Visit before you buy.</strong> Farm visits are welcome, 8 AM - 5 PM, by appointment.</li>
                </ul>

                <h2 id="quote">Request a bulk quote</h2>
                <p>Fill this in and it opens WhatsApp with your request ready to send. Nothing is sent until you press send in WhatsApp.</p>
                <form id="quoteForm" class="quote-form contact-form">
                    <div class="form-group">
                        <label for="q-business">Business name</label>
                        <input id="q-business" name="business" type="text" placeholder="e.g. Mama's Kitchen, Westlands" autocomplete="organization">
                    </div>
                    <div class="form-group">
                        <label for="q-name">Your name</label>
                        <input id="q-name" name="name" type="text" required autocomplete="name">
                    </div>
                    <div class="form-group">
                        <label for="q-product">Product</label>
                        <select id="q-product" name="product" required>
                            <option>Improved Kienyeji hens</option>
                            <option>Improved Kienyeji Jogoo</option>
                            <option>Mixed Kienyeji hens and Jogoo</option>
                            <option>Broilers, slaughtered</option>
                            <option>Improved Kienyeji eggs</option>
                            <option>Layers eggs</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="q-quantity">Quantity</label>
                        <input id="q-quantity" name="quantity" type="text" placeholder="e.g. 30 birds or 15 trays" required>
                    </div>
                    <div class="form-group">
                        <label for="q-frequency">How often</label>
                        <select id="q-frequency" name="frequency">
                            <option>One-off order</option>
                            <option>Every week</option>
                            <option>Every two weeks</option>
                            <option>Every month</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="q-date">First delivery date</label>
                        <input id="q-date" name="date" type="date">
                    </div>
                    <div class="form-group full">
                        <label for="q-location">Delivery location</label>
                        <input id="q-location" name="location" type="text" placeholder="Area and building" required>
                    </div>
                    <div class="form-group full">
                        <label for="q-notes">Anything else (optional)</label>
                        <textarea id="q-notes" name="notes" rows="3" placeholder="Slaughtered or live, preferred weights, packaging..."></textarea>
                    </div>
                    <div class="full">
                        <button type="submit" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Send request on WhatsApp</button>
                        <p class="hint">Prefer to talk? Call <a href="tel:''' + PHONE + '''">''' + PHONE_DISPLAY + '''</a>, 7 AM - 7 PM daily.</p>
                    </div>
                </form>

                <h2 id="faq">Bulk order questions</h2>
                ''' + faq_html(faqs) + '''
'''
    aside = order_aside(
        '<p class="price-big">Ksh 1,000 <small>/ hen, 10+ birds</small></p>',
        'Jogoo Ksh 1,300 a bird. Broilers Ksh 400 a kg from 50 birds. Regular supply available.',
        wa_text,
        [('prices', 'Bulk price list'), ('who', 'Who we supply'), ('how', 'How it works'),
         ('why', 'Why buy from us'), ('quote', 'Request a quote'), ('faq', 'Questions')])
    title = 'Bulk Kienyeji Chicken Supplier in Nairobi | ' + NAME
    desc = 'Bulk Improved Kienyeji chicken for hotels, restaurants and events in Nairobi. From Ksh 1,000 a bird for 10+, slaughter service and weekly supply.'
    ld = [
        {
            '@type': 'Service',
            'name': 'Bulk Improved Kienyeji chicken supply',
            'serviceType': 'Wholesale poultry supply',
            'description': 'Bulk Improved Kienyeji chicken, broilers and eggs for hotels, restaurants, caterers and events, with optional slaughter service and regular delivery.',
            'provider': BUSINESS_REF,
            'areaServed': [{'@type': 'AdministrativeArea', 'name': 'Nairobi'},
                           {'@type': 'AdministrativeArea', 'name': 'Machakos'}],
            'offers': [
                {'@type': 'Offer', 'name': 'Improved Kienyeji hens, 10+ birds', 'price': '1000', 'priceCurrency': 'KES'},
                {'@type': 'Offer', 'name': 'Improved Kienyeji Jogoo, 10+ birds', 'price': '1300', 'priceCurrency': 'KES'},
                {'@type': 'Offer', 'name': 'Slaughtered broilers, 50+ birds (per kg)', 'price': '400', 'priceCurrency': 'KES'},
            ],
        },
        breadcrumb_ld(slug, PAGES[slug]['card_title']),
        faq_ld(faqs),
    ]
    return slug, render(
        slug, title, desc,
        h1='Bulk kienyeji chicken for hotels, restaurants and events',
        lead='Free-range Improved Kienyeji chicken, broilers and eggs in bulk, straight from our farms in Nairobi and Machakos. Slaughtered fresh for your order and delivered to your kitchen, as a one-off or on a regular schedule.',
        hero_img='chiken1.jpeg', hero_alt='Improved Kienyeji chickens at our farm, ready for bulk orders',
        meta_line='<span><i class="fas fa-utensils"></i> Hotels &middot; Restaurants &middot; Caterers &middot; Events</span>',
        hero_actions=hero_buttons(wa_text, '#quote', 'Request a quote', 'fas fa-file-invoice'),
        body=body, aside=aside, ld_graph=ld, wa_text=wa_text, og_type='website')


# ================================================================ 3. Kienyeji vs broiler
def page_vs():
    slug = 'kienyeji-vs-broiler'
    wa_text = "Hi Kienyeji Farm Fresh, I'd like to order chicken. Kienyeji or broiler: __ . Quantity: __ . Delivery location: __"
    faqs = [
        ('Is Improved Kienyeji the same as pure kienyeji?',
         'No. Pure (indigenous) kienyeji are traditional village chickens. Improved Kienyeji is a Kenyan-developed cross that keeps the hardiness and flavour of indigenous chickens but grows faster and lays more eggs, so it is more reliably available all year.'),
        ('Why does kienyeji take longer to cook than broiler?',
         'Kienyeji chickens grow for months instead of weeks and move around more, so the muscle is firmer. It needs slow, gentle cooking or a pressure cooker to become tender. See our <a href="/how-to-cook-kienyeji-chicken/">kienyeji cooking guide</a>.'),
        ('Which is better for a party or large event?',
         'Broilers are cheaper per plate and cook quickly, which suits large numbers. Many hosts serve kienyeji as the special dish, or choose kienyeji for everything when flavour matters most. We supply both in bulk.'),
    ]
    body = '''                <p class="note"><strong>Short answer:</strong> broilers are fast-growing meat chickens that are ready in about six weeks. They are soft, mild and quick to cook. Kienyeji chickens grow for several months with more time outdoors, so the meat is firmer, leaner and much more flavourful, and it needs longer, slower cooking. Kienyeji costs more because each bird takes far longer to raise.</p>

                <h2 id="compare">Side-by-side comparison</h2>
                <div class="table-wrap">
                    <table class="data-table compare-table">
                        <thead><tr><th scope="col"></th><th scope="col">Improved Kienyeji</th><th scope="col">Broiler</th></tr></thead>
                        <tbody>
                            <tr><td>What it is</td><td>Kenyan-developed cross of indigenous and improved breeds</td><td>Commercial breed developed purely for fast meat growth</td></tr>
                            <tr><td>Time to market</td><td>About 4-5 months</td><td>About 6 weeks</td></tr>
                            <tr><td>How it is raised</td><td>Free-range or semi free-range, with supplementary feed</td><td>Mostly indoors on high-energy feed</td></tr>
                            <tr><td>Look</td><td>Coloured feathers, longer legs, leaner body</td><td>White feathers, broad plump breast</td></tr>
                            <tr><td>Meat</td><td>Firm, lean, darker, rich traditional flavour</td><td>Soft, tender, more fat, mild flavour</td></tr>
                            <tr><td>Cooking time</td><td>Long: 1-2 hours of simmering, or a pressure cooker</td><td>Short: about 30-45 minutes</td></tr>
                            <tr><td>Our price</td><td>Ksh 1,200 - 1,500 per bird</td><td>Ksh 500 per bird live, Ksh 450 per kg slaughtered</td></tr>
                            <tr><td>Best for</td><td>Stews, soups, choma, special occasions</td><td>Quick meals, frying, large budget catering</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="improved">What is Improved Kienyeji?</h2>
                <p>Traditional village chickens (pure kienyeji) are hardy and full of flavour, but they grow slowly and lay few eggs. <strong>Improved Kienyeji</strong> is a Kenyan-developed hybrid that combines that hardiness and flavour with the faster growth, higher egg production and efficiency of commercial breeds.</p>
                <p>For you as a buyer, that means the kienyeji taste people remember, available reliably and at a steadier size, instead of whatever birds a village happens to have that week.</p>

                <h2 id="taste">Taste and texture</h2>
                <p>This is the biggest difference, and the reason people pay more for kienyeji. Because a kienyeji chicken lives for months and walks, scratches and forages, its muscle develops more. The result is firmer, slightly chewier meat with a deeper, more "chicken" flavour, and a richer broth when you boil it.</p>
                <p>A broiler is harvested young and moves very little, so the meat is soft and mild. It absorbs marinades well and cooks fast, which is why it is popular for frying and quick weeknight meals.</p>

                <h2 id="price">Why kienyeji costs more</h2>
                <ul>
                    <li><strong>Time:</strong> a kienyeji bird is fed and cared for over about 4-5 months, compared with about 6 weeks for a broiler.</li>
                    <li><strong>Space:</strong> free-range birds need far more space per bird than broilers kept in a house.</li>
                    <li><strong>Yield:</strong> a kienyeji chicken carries less meat on the breast for its weight than a broiler bred for size.</li>
                </ul>
                <p>At our farm that works out to <strong>Ksh 1,200 - 1,500 per kienyeji bird</strong> against <strong>Ksh 500 for a live broiler</strong>. See the full <a href="/#products">price list</a>.</p>

                <h2 id="health">Is kienyeji healthier?</h2>
                <p>Both are good sources of protein. Kienyeji meat is generally leaner, with less fat under the skin, and many people prefer knowing their chicken was raised outdoors. How healthy a meal is depends just as much on how you cook it: a kienyeji stew and a boiled broiler are both lighter than deep-fried chicken of either kind.</p>

                <h2 id="tell-apart">How to tell them apart when buying</h2>
                <ul>
                    <li><strong>Live:</strong> broilers are white, heavy and slow-moving. Kienyeji are coloured (brown, black, speckled), alert and active, with longer legs.</li>
                    <li><strong>Slaughtered:</strong> a broiler carcass is round with a wide, soft breast and pale skin. A kienyeji carcass is longer and leaner, with a narrower breast, firmer flesh and slightly darker meat.</li>
                    <li><strong>Cooking:</strong> if it is tender after 30 minutes on the stove, it was almost certainly a broiler.</li>
                </ul>

                <h2 id="which">Which should you buy?</h2>
                <ul>
                    <li><strong>Choose kienyeji</strong> for Sunday lunch, visitors, celebrations, soups and stews, or whenever flavour is what matters.</li>
                    <li><strong>Choose broiler</strong> for quick meals, fried chicken, or feeding a large group on a budget.</li>
                    <li><strong>For events</strong>, many hosts do both: broiler for volume and kienyeji as the special dish.</li>
                </ul>

                <h2 id="faq">Questions</h2>
                ''' + faq_html(faqs) + '''

''' + cta_band('Order kienyeji or broiler', 'Live or slaughtered and cleaned, delivered in Nairobi.', wa_text)
    aside = order_aside(
        '<p class="price-big">Ksh 1,200 <small>/ kienyeji hen</small></p>',
        'Jogoo Ksh 1,500. Broilers from Ksh 500. Live or slaughtered and cleaned, same-day delivery in Nairobi.',
        wa_text,
        [('compare', 'Comparison table'), ('improved', 'What is Improved Kienyeji?'), ('taste', 'Taste and texture'),
         ('price', 'Why kienyeji costs more'), ('health', 'Is it healthier?'), ('tell-apart', 'Telling them apart'),
         ('which', 'Which to buy'), ('faq', 'Questions')])
    headline = "Kienyeji vs broiler chicken: what's the difference?"
    title = "Kienyeji vs Broiler Chicken: What's the Difference? | " + NAME
    desc = 'Kienyeji vs broiler chicken compared: taste, texture, cooking time, price and health. Learn what Improved Kienyeji is and which chicken to buy for which meal.'
    ld = [article_ld(slug, headline, desc, 'chicken5.jpeg'), breadcrumb_ld(slug, PAGES[slug]['card_title']), faq_ld(faqs)]
    return slug, render(
        slug, title, desc,
        h1=headline,
        lead='Taste, texture, cooking time and price compared, from the people who raise both. Plus what "Improved Kienyeji" actually means, and which one to buy for which meal.',
        hero_img='chicken5.jpeg', hero_alt='Improved Kienyeji chickens feeding outdoors at our farm',
        meta_line='<span><i class="fas fa-clock"></i> 5 min read</span><span><i class="fas fa-seedling"></i> By ' + NAME + '</span>',
        hero_actions=hero_buttons(wa_text, '#compare', 'See the comparison', 'fas fa-table'),
        body=body, aside=aside, ld_graph=ld, wa_text=wa_text)


# ================================================================ 4. How to cook
def page_cook():
    slug = 'how-to-cook-kienyeji-chicken'
    wa_text = "Hi Kienyeji Farm Fresh, I'd like a slaughtered and cleaned kienyeji chicken. Quantity: __ . Delivery location: __"
    ingredients = [
        '1 Improved Kienyeji chicken (1.2-2 kg, slaughtered and cleaned), cut into pieces',
        '2 large onions, sliced',
        '3-4 ripe tomatoes, chopped or grated',
        '4 cloves garlic, crushed',
        '1 thumb-sized piece of ginger, grated',
        '1 green pepper (hoho), sliced',
        '1-2 carrots, sliced (optional)',
        '1 tbsp tomato paste (optional)',
        '1 tsp curry powder or chicken masala (optional)',
        '1 green chilli, chopped (optional)',
        '2 tbsp cooking oil',
        'Salt to taste',
        'About 1.5 litres of water',
        'A handful of fresh dhania (coriander), chopped',
    ]
    steps = [
        ('Start the boil', 'Rinse the chicken pieces and put them in a large sufuria with enough water to cover. Add a teaspoon of salt and half the garlic and ginger. Bring to the boil and skim off the grey foam that rises.'),
        ('Simmer until tender', 'Turn the heat down, cover and simmer gently for 1 to 1.5 hours, topping up with hot water if needed. It is ready when a fork slides easily into the thigh. In a pressure cooker this takes about 25-35 minutes once it reaches pressure.'),
        ('Keep the broth', 'Lift the chicken out and set it aside. Keep the broth: you will use some for the stew and can drink the rest as supu.'),
        ('Brown the chicken (optional)', 'For deeper flavour, fry the boiled pieces in a little hot oil for a few minutes until golden, then set aside.'),
        ('Make the base', 'In a clean sufuria, heat the oil and fry the onions until soft and golden. Add the rest of the garlic and ginger and the chilli, and stir for one minute.'),
        ('Cook the tomatoes', 'Add the tomatoes, tomato paste and curry powder. Cook, stirring, for 8-10 minutes until the tomatoes break down into a thick sauce and the oil starts to separate.'),
        ('Bring it together', 'Add the chicken, hoho, carrots and 1-2 cups of the broth. Simmer uncovered for 10-15 minutes until the sauce thickens and coats the chicken. Taste and adjust the salt.'),
        ('Serve', 'Stir in the dhania and serve hot with ugali, chapati, rice or mukimo, and sukuma wiki or kachumbari on the side.'),
    ]
    faqs = [
        ('Why is my kienyeji chicken tough?',
         'Almost always because it was not cooked long enough, or was boiled too hard. Kienyeji needs a gentle simmer for 1-2 hours, or a pressure cooker. An older Jogoo needs longer than a young hen. Keep cooking until a fork slides in easily.'),
        ('Should I boil kienyeji before frying or grilling?',
         'Yes. Boil or pressure-cook it until nearly tender first, then fry, grill or add it to a stew. Frying raw kienyeji leaves the meat tough.'),
        ('How long does kienyeji take in a pressure cooker?',
         'About 20-25 minutes for a young hen and 30-40 minutes for a mature Jogoo, counted from when the cooker reaches pressure. Cooker models vary, so check with a fork and add a few minutes if needed.'),
    ]
    ing_html = '\n'.join(f'                        <li>{i}</li>' for i in ingredients)
    step_html = '\n'.join(f'                        <li><strong>{t}.</strong> {d}</li>' for t, d in steps)
    body = '''                <p>Kienyeji chicken has far more flavour than broiler, but it is also firmer, because the birds grow for months and move around. Cook it like a broiler and it comes out tough. Cook it <strong>low and slow</strong> and it becomes tender, with a rich sauce and a broth worth drinking on its own.</p>
                <p>Below is a classic Kenyan-style kienyeji stew, followed by boiling times and other ways to cook it.</p>

                <section class="recipe-card" id="recipe">
                    <h2>Kenyan kienyeji chicken stew</h2>
                    <ul class="recipe-times">
                        <li><i class="fas fa-utensils"></i> Serves 4-6</li>
                        <li><i class="fas fa-hourglass-start"></i> Prep 20 min</li>
                        <li><i class="fas fa-fire"></i> Cook about 1 hr 45 min</li>
                        <li><i class="fas fa-bolt"></i> About 1 hr with a pressure cooker</li>
                    </ul>
                    <h3 id="ingredients">Ingredients</h3>
                    <ul class="ingredients">
''' + ing_html + '''
                    </ul>
                    <h3 id="method">Method</h3>
                    <ol class="steps">
''' + step_html + '''
                    </ol>
                </section>

                <h2 id="times">How long to boil kienyeji chicken</h2>
                <p>Times depend on the age of the bird, so always check with a fork. These are good starting points:</p>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead><tr><th scope="col">Bird</th><th scope="col">On the stove (gentle simmer)</th><th scope="col">Pressure cooker</th></tr></thead>
                        <tbody>
                            <tr><th scope="row">Young Improved Kienyeji hen</th><td>About 1 - 1.25 hours</td><td>About 20-25 minutes</td></tr>
                            <tr><th scope="row">Mature Jogoo (rooster)</th><td>About 1.5 - 2 hours or more</td><td>About 30-40 minutes</td></tr>
                            <tr><th scope="row">Broiler, for comparison</th><td>About 30-45 minutes</td><td>About 8-10 minutes</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 id="tips">Tips for soft, tasty kienyeji</h2>
                <ul>
                    <li><strong>Simmer, don't boil hard.</strong> A rolling boil tightens the meat. Keep the water just bubbling.</li>
                    <li><strong>Jogoo needs more time than a hen.</strong> Roosters have firmer meat. Plan an extra 30 minutes or more.</li>
                    <li><strong>A pressure cooker saves gas and charcoal.</strong> It cuts the cooking time by more than half.</li>
                    <li><strong>Never throw away the broth.</strong> Drink it as supu with a squeeze of lemon and dhania, or use it to cook rice.</li>
                    <li><strong>Start with a fresh bird.</strong> Chicken slaughtered fresh, never frozen, cooks more evenly and tastes better. Ours is slaughtered to order.</li>
                    <li><strong>It tastes even better the next day.</strong> Leftover stew keeps in the fridge for 2-3 days. Reheat it until piping hot.</li>
                </ul>

                <h2 id="other-ways">Other ways to cook kienyeji</h2>
                <h3>Kienyeji choma (grilled)</h3>
                <p>Boil the whole or halved bird with salt, garlic and ginger until almost tender. Then brush with oil, lemon juice and crushed garlic and grill over charcoal, turning often, until the skin is crisp and smoky. Serve with kachumbari and ugali.</p>
                <h3>Fried kienyeji</h3>
                <p>Boil the pieces until tender, drain well and pat dry, then shallow-fry in hot oil until golden and crisp. Season with salt and a little pepper or masala.</p>
                <h3>Kienyeji soup (supu)</h3>
                <p>Simmer the chicken with onion, garlic, ginger, a carrot and dhania stems for 1.5-2 hours. Season, add chopped dhania and serve the broth in mugs. Many families give it to people who are unwell or recovering.</p>

                <h2 id="faq">Cooking questions</h2>
                ''' + faq_html(faqs) + '''

''' + cta_band('Get a fresh kienyeji chicken', 'Slaughtered and cleaned for your order, never frozen. From Ksh 1,200.', wa_text)
    aside = order_aside(
        '<p class="price-big">Ksh 1,200 <small>/ cleaned hen</small></p>',
        'Slaughtered fresh on order and hygienically packed. Jogoo Ksh 1,500. Same-day delivery in Nairobi.',
        wa_text,
        [('recipe', 'Kienyeji stew recipe'), ('times', 'Boiling times'), ('tips', 'Tips for soft kienyeji'),
         ('other-ways', 'Choma, fried and soup'), ('faq', 'Questions')])
    headline = 'How to cook kienyeji chicken so it is soft and full of flavour'
    title = 'How to Cook Kienyeji Chicken (Soft Kenyan Stew) | ' + NAME
    desc = 'How to cook kienyeji chicken so it comes out soft: a Kenyan kienyeji stew recipe, boiling and pressure cooker times, plus choma, fried and supu.'
    recipe = {
        '@type': 'Recipe',
        'name': 'Kenyan kienyeji chicken stew',
        'description': 'A slow-cooked Kenyan-style Improved Kienyeji chicken stew with tomatoes, onions, garlic and ginger.',
        'image': SITE + img('kienyeji_slaughtered.jpeg'),
        'author': ORG,
        'datePublished': PUBLISHED,
        'prepTime': 'PT20M',
        'cookTime': 'PT1H45M',
        'totalTime': 'PT2H5M',
        'recipeYield': '4-6 servings',
        'recipeCategory': 'Main course',
        'recipeCuisine': 'Kenyan',
        'keywords': 'kienyeji chicken, kienyeji stew, how to cook kienyeji, Kenyan chicken stew',
        'recipeIngredient': ingredients,
        'recipeInstructions': [{'@type': 'HowToStep', 'name': t, 'text': d} for t, d in steps],
    }
    ld = [recipe, article_ld(slug, headline, desc, 'kienyeji_slaughtered.jpeg'),
          breadcrumb_ld(slug, PAGES[slug]['card_title']), faq_ld(faqs)]
    return slug, render(
        slug, title, desc,
        h1='How to cook kienyeji chicken so it is soft and full of flavour',
        lead='Kienyeji chicken is firmer than broiler, so the secret is slow cooking. Here is a classic Kenyan kienyeji stew, boiling and pressure cooker times, and other ways to cook it.',
        hero_img='kienyeji_slaughtered.jpeg', hero_alt='Whole slaughtered and cleaned Kienyeji chicken on a plate',
        meta_line='<span><i class="fas fa-clock"></i> Total about 2 hours</span><span><i class="fas fa-utensils"></i> Serves 4-6</span>',
        hero_actions=hero_buttons(wa_text, '#recipe', 'Jump to recipe', 'fas fa-arrow-down'),
        body=body, aside=aside, ld_graph=ld, wa_text=wa_text)


def home_guides_section():
    """HTML for the Guides teaser on the home page (pasted between markers)."""
    cards = '\n'.join(guide_card(slug, p) for slug, p in PAGES.items())
    return '''    <section id="guides" class="guides">
        <div class="container">
            <div class="section-header">
                <h2>Guides &amp; Buying Info</h2>
                <p>Prices, bulk supply and practical advice for buying and cooking kienyeji chicken</p>
            </div>
            <div class="guides-grid">
''' + cards + '''
            </div>
        </div>
    </section>'''


def main():
    for build in (page_eggs, page_bulk, page_vs, page_cook):
        slug, html = build()
        out = os.path.join(DOCS, slug)
        os.makedirs(out, exist_ok=True)
        with open(os.path.join(out, 'index.html'), 'w', encoding='utf-8', newline='\r\n') as f:
            f.write(html)
        print('wrote', slug + '/index.html')

    # Refresh the Guides section on the home page between its markers
    home = os.path.join(DOCS, 'index.html')
    with open(home, encoding='utf-8', newline='') as f:
        s = f.read()
    start, end = '<!-- Guides (generated by tools/build_pages.py) -->', '<!-- /Guides -->'
    if start in s:
        a = s.index(start) + len(start)
        b = s.index(end)
        s = s[:a] + '\r\n' + home_guides_section().replace('\n', '\r\n') + '\r\n    ' + s[b:]
        with open(home, 'w', encoding='utf-8', newline='') as f:
            f.write(s)
        print('updated home guides section')


if __name__ == '__main__':
    main()
