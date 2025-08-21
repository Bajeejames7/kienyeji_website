import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- ASSETS ---
const chickenImageUrl = 'https://images.unsplash.com/photo-1598515599602-23b097b63290?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const patternImageUrl = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMDI0cHgiIGhlaWdodD0iMTAyNHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wLDAgTDEwMjQsMCBMMTAyNCwxMDI0IEwwLDEwMjQgTDAsMCBaIE0yNTYsMCBMMjU6LDEwMjQgTDAsMTAyNCBMMCwyNTYgTDI1NiwyNTYgTDI1NiwwIFogTTc2OCwwIEw3NjgsMTAyNCBMMTAyNCwxMDI0IEwxMDI0LDI1NiBMNzY4LDI1NiBMNzY4LDAgWiBNMCw3NjggTDEwMjQsNzY4IEwxMDI0LDEwMjQgTDAsMTAyNCBMMCw3NjggWiBNMCwyNTYgTDEwMjQsMjU6IEwxMDI0LDAgTDAsMCBMMCwyNTYgWiBNNzY4LDc2OCBMNzY4LDEwMjQgTDI1NiwyNTYgTDEwMjQsMjU2IEwxMDI0LDc2OCBMNzY4LDc2OCBaIE03NjgsMjU2IEw3NjgsMCBMMjU2LDc2OCBMMTAyNCw3NjggTDEwMjQsMjU2IEw3NjgsMjU2IFogTTI1NiwyNTYgTDI1NiwwIEw3NjgsNzY4IEwwLDc2OCBMMCwyNTYgTDI1NiwyNTYgWiBNMjU2LDc2OCBMMjU2LDEwMjQgTDc2OCwyNTYgTDAsMjU2IEwwLDc2OCBMMjU2LDc2OCBaIE0zODQsMzIwIEw2NDAsMzIwIEw2NDAsMzkyIEwzODQsMzkyIEwzODQsMzIwIFogTTM4NCw2MDggTDY0MCw2MDggTDY0MCw2NzIgTDM4NCw2NzIgTDM4NCw2MDggWiBNNjA4LDM4NCBMNjcydiIgaWQ9IkZpbGwtMSIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0zODQsMjU2IEwzODQsMCBMMjU2LDAgTDI1NiwyNTYgTDM4NCwyNTYgWiBNNTEyLDI1NiBMNTEyLDAgTDM4NCwwIEwzODQsMjU2IEw1MTIsMjU2IFogTTY0MCwyNTYgTTY0MCwwIEw1MTIsMCBMNTEyLDI1NiBMNjQwLDI1NiBaIE03NjgsMjU2IEw3NjgsMCBMNjQwLDAgTDY0MCwyNTYgTDc2OCwyNTYgWiBNMTAyNCwzODQgTDEwMjQsMjU2IEw3NjgsMjU2IEw3NjgsMzg0IEwxMDI0LDM4NCBaIE0xMDI0LDUxMiBMMTAyNCwzODQgTDc2OCwzODQgTDc2OCw1MTIgTDEwMjQsNTEyIFogTDEwMjQsNjQwIEwxMDI0LDUxMiBMNzY4LDUxMiBMNzY4LDY0MCBMMTAyNCw2NDAgWiBNMTAyNCw3NjggTDEwMjQsNjQwIEw3NjgsNjQwIEw3NjgsNzY4IEwxMDI0LDc2OCBaIE02NDAsMTAyNCBMNjQwLDc2OCBMNzY4LDc2OCBMNzY4LDEwMjQgTDY0MCwxMDI0IFogTTUxMiwxMDI0IEw1MTIsNzY4IEw2NDAsNzY4IEw2NDAsMTAyNCBMNTEyLDEwMjQgWiBNMzg0LDEwMjQgTDM4NCw3NjggTDUxMiw3NjggTDUxMiwxMDI0IEwzODQsMTAyNCBaIE0yNTYsMTAyNCBMMjU2LDc2OCBMMzg0LDc2OCBMMzg0LDEwMjQgTDI1NiWxMDI0IFogTDAsNjQwIEwwLDc2OCBMMjU2LDc2OCBMMjU2LDY0MCBMMCw2NDAgWiBNMCw1MTIgTDAsNjQwIEwyNTYsNjQwIEwyNTYsNTEyIEwwLDUxMiBaIE0wLDM4NCBMMCw1MTIgTDI1Niw1MTIgTDI1NiwzODQgTDAsMzg0IFogTTAsMjU2IEwwLDM4NCBMMjU2LDM4NCBMMjU2LDI1NiBMMCwyNTYgWiBNMjU2LDI1NiBMMjU2LDM4NCBMNTEyLDI1NiBaIE01MTIsMjU2IEw1MTIsMzg0IEw3NjgsMjU2IFogTTc2OCw1MTIgTDc2OCw2NDAgTDUxMiw3NjggWiBNNTEyLDc2OCBMNTEyLDY0MCBMMjU2LDc2OCBaIE0zODQsNjQwIEwzODQsNTEyIEwxMjgsMzg0IEwzODQsMzg0IEwzODQsNjQwIFogTTY0MCw2NDAgTTY0MCw1MTIgTDg5NiwzODQgTDY0MCwzODQgTDY0MCw2NDAgWiBNNjA4LDY0MCBMNjA4LDUxMiBMMzk3LDM4NCBMNjA4LDM4NCBMNjA4LDY0MCBaIE01MTIsNjQwIEw1MTIsNTEyIEwyNTYsMzg0IEw1MTIsMzg0IEw1MTIsNjQwIFogTTM4NCw2MDggTDM4NCwzODQgTDEyOCw2NzIgTDM4NCw2NzIgTDM4NCw2MDggWiBNNjQwLDYwOCBNNjQwLDM4NCBMODk2LDY3MiBMNjQwLDY3MiBMNjQwLDYwOCBaIE02MDgsNjA4IEw2MDgsMzg0IEwzOTcsNjcyIEw2MDgsNjcyIEw2MDgsNjA4IFogTTUxMiw2MDggTDUxMiwzODQgTDI1Niw2NzIgTDUxMiw2NzIgTDUxMiw2MDggWiIgZmlsbD0iI0Y0MzkxQiI+PC9wYXRoPjxwYXRoIGQ9Ik0zODQsMzIwIEwzODQsMjU2IEwxMjgsMjU2IEwyNTYsMjU2IEwzODQsMjU2IEwzODQsMzIwIFogTTY0MCwzMjAgTTY0MCwyNTYgTDg5NiwyNTYgTDc2OCwyNTYgTDY0MCwyNTYgTDY0MCwzMjAgWiBNNjA4LDMyMCBNNjA4LDI1NiBMMzk3LDI1NiBMNTEyLDI1NiBMNjA4LDI1NiBMNjA4LDMyMCBaIE01MTIsMzIwIEw1MTIsMjU2IEwyNTYsMjU2IEwzODQsMjU2IEw1MTIsMjU2IEw1MTIsMzIwIFogTTM4NCwzODQgTDM4NCwzMjAgTDEyOCwzMjAgTDEyOCwzODQgTDM4NCwzODQgWiBNNjQwLDM4NCBNNjQwLDMyMCBMODk2LDMyMCBMODk2LDM4NCBNNjQwLDM4NCBaIE02MDgsMzg0IEw2MDgsMzIwIEwzOTcsMzIwIEwzOTcsMzg0IEw2MDgsMzg0IFogTTUxMiwzODQgTDUxMiwzMjAgTDI1NiwzMjAgTDI1NiwzODQgTDUxMiwzODQgWiBNMzg0LDUxMiBMMzg0LDM4NCBMMTI4LDM4NCBMMjg4LDM4NCBMMzg0LDM4NCBMMzg0LDUxMiBaIE02NDAsNTEyIE02NDAsMzg0IEw4OTYsMzg0IEw3MzYsMzg0IEw2NDAsMzg0IEw2NDAsNTEyIFogTTYwOCw1MTIgTTYwOCwzODQgTDM5NywzODQgTDQ0OCwzODQgTDYwOCwzODQgTDYwOCw1MTIgWiBNNTEyLDUxMiBMNTEyLDM4NCBMMjU2LDM4NCBMMzIwLDM4NCBMNTEyLDM4NCBMNTEyLDUxMiBaIE0zODQsNjQwIEwzODQsNTEyIEwxMjgsNTEyIEwxMjgsNjQwIEwzODQsNjQwIFogTTY0MCw2NDAgTTY0MCw1MTIgTDg5Niw1MTIgTDg5Niw2NDAgTTY0MCw2NDAgWiBNNjA4LDY0MCBMNjA4LDUxMiBMMzk3LDUxMiBMMzk3LDY0MCBMNjA4LDY0MCBaIE01MTIsNjQwIEw1MTIsNTEyIEwyNTYsNTEyIEwyNTYsNjQwIEw1MTIsNjQwIFoiIGZpbGw9IiNDMTIzMUQiPjwvcGF0aD48cGF0aCBkPSJNMzg0LDMyMCBMMzg0LDM4NCBMMjU2LDM4NCBMMjU2LDMyMCBMMzg0LDMyMCBaIE02NDAsMzIwIEw2NDAsMzg0IEw1MTIsMzg0IEw1MTIsMzIwIEw2NDAsMzIwIFogTTc2OCw1MTIgTDc2OCwzODQgTDY0MCwzODQgTDY0MCw1MTIgTDc2OCw1MTIgWiBNNTEyLDc2OCBMNTEyLDY0MCBMNjQwLDY0MCBMNjQwLDc2OCBMNTEyLDc2OCBaIE0yNTYsNjQwIEwyNTYsNTEyIEwzODQsNTEyIEwzODQsNjQwIEwyNTYsNjQwIFogTTM4NCwyNTYgTDM4NCwxMjggTDI1NiwyNTYgTDM4NCwyNTYgWiBNNTEyLDI1NiBNNTEyLDEyOCBMMzg0LDEyOCBMMzg0LDI1NiBMNTEyLDI1NiBaIE02NDAsMjU2IEw2NDAsMTI4IEw1MTIsMTI4IEw1MTIsMjU2IEw2NDAsMjU2IFogTTc2OCwzODQgTDc2OCwyNTYgTDY0MCwyNTYgTDY0MCwzODQgTDc2OCwzODQgWiBNNzY4LDUxMiBMNzY4LDM4NCBMODk2LDM4NCBMODk2LDUxMiBMNzY4LDUxMiBaIE03NjgsNjQwIEw3NjgsNTEyIEw4OTYsNTEyIEw4OTYsNjQwIEw3NjgsNjQwIFogTTY0MCw3NjggTDY0MCw2NDAgTDc2OCw2NDAgTDc2OCw3NjggTDY0MCw3NjggWiBNNTEyLDc2OCBNNTEyLDY0MCBMNjQwLDg5NiBMNjQwLDc2OCBMNTEyLDc2OCBaIE0zODQsNzY4IEwzODQsNjQwIEw1MTIsODk2IEw1MTIsNzY4IEwzODQsNzY4IFogTTI1Niw3NjggTDI1Niw2NDAgTDM4NCw4OTYgTDM4NCw3NjggTDI1Niw3NjggWiBNMjU2LDY0MCBMMjU2LDUxMiBMMzg0LDUxMiBMMzg0LDY0MCBMMjU2LDY0MCBaIE0yNTYsNTEyIEwyNTYsMzg0IEwxMjgsMzg0IEwxMjgsNTEyIEwyNTYsNTEyIFogTTI1NiwyNTYgTDI1NiwzODQgTDEyOCwzODQgTDEyOCwyNTYgTDI1NiwyNTYgWiIgZmlsbD0iIzgxNzYwMCI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIsMzg0IEw1MTIsMzIwIEwzODQsMzIwIEwzODQsMzg0IEw1MTIsMzg0IFogTTY0MCw1MTIgTDY0MCwzODQgTDc2OCwzODQgTDc2OCw1MTIgTDY0MCw1MTIgWiBNNTEyLDY0MCBMNTEyLDUxMiBMNjQwLDUxMiBMNjQwLDY0MCBMNTEyLDY0MCBaIE0zODQsNTEyIEwzODQsNjQwIEwyNTYsNjQwIEwyNTYsNTEyIEwzODQsNTEyIFoiIGZpbGw9IiNDRTk5MDAiPjwvcGF0aD48L2c+PC9zdmc+';
const phone = '0769583063';
const email = 'kienyejifreshfarm@gmail.com';
const whatsappLink = `https://wa.me/254${phone.substring(1)}`;

const theme = {
  colors: {
    primary: '#8c3b00',
    secondary: '#d9a404',
    background: '#fdfaf2',
    text: '#333333',
    lightText: '#f8f8f8',
    accent: '#c04000',
    success: '#4caf50',
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Roboto', sans-serif",
  },
};

const GlobalStyles = () => (
    React.createElement('style', null, `
        :root {
            --primary-color: ${theme.colors.primary};
            --secondary-color: ${theme.colors.secondary};
            --background-color: ${theme.colors.background};
            --text-color: ${theme.colors.text};
            --light-text-color: ${theme.colors.lightText};
            --accent-color: ${theme.colors.accent};
            --success-color: ${theme.colors.success};
            --heading-font: ${theme.fonts.heading};
            --body-font: ${theme.fonts.body};
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: var(--body-font);
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--heading-font);
            font-weight: 600;
            color: var(--primary-color);
        }
        
        h1 { font-size: 2.8rem; margin-bottom: 1rem; }
        h2 { font-size: 2.2rem; margin-bottom: 1.5rem; text-align: center; }
        h3 { font-size: 1.5rem; margin-bottom: 1rem; }

        section {
            padding: 80px 0;
        }
        
        .section-title-container {
            position: relative;
            margin-bottom: 40px;
            text-align: center;
        }
        
        .section-title-container h2 {
            display: inline-block;
            position: relative;
            padding-bottom: 10px;
        }

        .section-title-container h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background-color: var(--secondary-color);
            border-radius: 2px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 28px;
            background-color: var(--accent-color);
            color: white;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-family: var(--heading-font);
            transition: transform 0.3s ease, background-color 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn:hover {
            transform: translateY(-3px);
            background-color: #a53600;
        }

        .btn-secondary {
            background-color: transparent;
            color: var(--accent-color);
            border: 2px solid var(--accent-color);
        }
        
        .btn-secondary:hover {
            background-color: var(--accent-color);
            color: white;
        }

        .btn-whatsapp {
            background-color: #25D366;
        }
        .btn-whatsapp:hover {
            background-color: #128C7E;
        }

        @media (max-width: 768px) {
            h1 { font-size: 2.2rem; }
            h2 { font-size: 1.8rem; }
            section { padding: 50px 0; }
        }
  `)
);

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#products', label: 'Products' },
        { href: '#about', label: 'About Us' },
        { href: '#order', label: 'How to Order' },
        { href: '#contact', label: 'Contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkClickHandler = () => {
        setIsOpen(false);
    }

    return React.createElement('header', {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: isScrolled || isOpen ? 'rgba(253, 250, 242, 0.95)' : 'transparent',
            backgroundImage: isScrolled || isOpen ? `url("${patternImageUrl}")` : 'none',
            backgroundSize: '150px',
            backgroundBlendMode: 'luminosity',
            boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        }
    },
        React.createElement('nav', {
            className: "container",
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '70px',
            }
        },
            React.createElement('a', { href: "#home", style: { textDecoration: 'none', color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 'bold' } }, 'Kienyeji Fresh'),
            React.createElement('div', {
                className: "menu-icon",
                onClick: () => setIsOpen(!isOpen),
                style: {
                    display: 'none',
                    cursor: 'pointer',
                    zIndex: 1001,
                }
            },
                React.createElement('div', { style: { width: '25px', height: '3px', backgroundColor: 'var(--primary-color)', margin: '5px 0', transition: '0.4s', transform: isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none' } }),
                React.createElement('div', { style: { width: '25px', height: '3px', backgroundColor: 'var(--primary-color)', margin: '5px 0', transition: '0.4s', opacity: isOpen ? 0 : 1 } }),
                React.createElement('div', { style: { width: '25px', height: '3px', backgroundColor: 'var(--primary-color)', margin: '5px 0', transition: '0.4s', transform: isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none' } })
            ),
            React.createElement('ul', {
                className: "nav-links",
                style: {
                    display: 'flex',
                    listStyle: 'none',
                    gap: '30px'
                }
            },
                navLinks.map(link => (
                    React.createElement('li', { key: link.href },
                        React.createElement('a', {
                            href: link.href,
                            onClick: linkClickHandler,
                            style: {
                                textDecoration: 'none',
                                color: isScrolled ? 'var(--text-color)' : 'var(--light-text-color)',
                                fontWeight: 600,
                                position: 'relative',
                                padding: '5px 0'
                            }
                        }, link.label)
                    )
                ))
            )
        ),
        React.createElement('style', null, `
            .nav-links a::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--secondary-color);
                transition: width 0.3s ease;
            }
            .nav-links a:hover::after {
                width: 100%;
            }
            @media (max-width: 768px) {
                .menu-icon { display: block; }
                .nav-links {
                    position: fixed;
                    top: 0;
                    left: ${isOpen ? '0' : '-100%'};
                    width: 70%;
                    height: 100vh;
                    background-color: var(--background-color);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    transition: left 0.4s ease;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                }
                .nav-links a {
                    color: var(--text-color) !important;
                    font-size: 1.2rem;
                }
            }
        `)
    );
};

const HeroSection = () => (
    React.createElement('section', {
        id: "home",
        style: {
            minHeight: '100vh',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${chickenImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'var(--light-text-color)',
            paddingTop: '70px',
        }
    },
        React.createElement('div', { className: "container", style: { maxWidth: '800px' } },
            React.createElement('h1', { style: { color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' } },
                'Fresh, Free-Range Kienyeji Chicken – Naturally Raised, Farm to Table!'
            ),
            React.createElement('p', { style: { fontSize: '1.2rem', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' } },
                'Order fully grown, organically raised indigenous chicken with rich flavor and unbeatable nutrition.'
            ),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' } },
                React.createElement('a', { href: "#order", className: "btn" }, 'Order Now'),
                React.createElement('a', { href: "#products", className: "btn btn-secondary" }, 'View Price List'),
                React.createElement('a', { href: whatsappLink, className: "btn btn-whatsapp", target: "_blank", rel: "noopener noreferrer" }, 'WhatsApp Us')
            )
        )
    )
);

const ProductsSection = () => {
    const products = [
      { name: 'Live Chicken', details: 'Vibrant and healthy, ready for your farm or table.', weight: '1.5 – 2.5 kg (live weight)', price: 'Ksh [insert price] per bird' },
      { name: 'Slaughtered & Cleaned', details: 'Expertly prepared, whole chicken, ready to cook.', availability: 'Freshly slaughtered upon order', packaging: 'Cleaned and professionally packed' },
      { name: 'Bulk Orders', details: 'Special pricing for hotels, restaurants, and events.', minimumOrder: 'Custom pricing available', delivery: 'Scheduled delivery for your convenience' },
    ];

    return (
        React.createElement('section', { id: "products", style: { backgroundColor: 'var(--background-color)' } },
            React.createElement('div', { className: "container" },
                React.createElement('div', { className: "section-title-container" },
                    React.createElement('h2', null, 'Our Products')
                ),
                React.createElement('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px'
                    }
                },
                    products.map((product, index) => (
                        React.createElement('div', { key: index, className: "product-card" },
                            React.createElement('h3', { style: { color: 'var(--accent-color)' } }, product.name),
                            React.createElement('p', { style: { marginBottom: '20px', fontStyle: 'italic' } }, product.details),
                            React.createElement('ul', { style: { listStyle: 'none', marginBottom: '20px', textAlign: 'left', paddingLeft: '20px' } },
                                product.weight && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Weight:'), ` ${product.weight}`),
                                product.price && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Price:'), ` ${product.price}`),
                                product.availability && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Availability:'), ` ${product.availability}`),
                                product.packaging && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Packaging:'), ` ${product.packaging}`),
                                product.minimumOrder && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Orders:'), ` ${product.minimumOrder}`),
                                product.delivery && React.createElement('li', { style: { marginBottom: '10px' } }, React.createElement('strong', null, 'Delivery:'), ` ${product.delivery}`)
                            ),
                            React.createElement('a', { href: "#order", className: "btn" }, `Order ${product.name}`)
                        )
                    ))
                ),
                React.createElement('p', { style: { textAlign: 'center', marginTop: '30px', fontSize: '1.1rem' } },
                    React.createElement('strong', null, 'Delivery:'), ' Nairobi & surrounding counties (Same day or next day)', React.createElement('br', null),
                    React.createElement('strong', null, 'Minimum Order:'), ' 1 bird'
                )
            ),
            React.createElement('style', null, `
                .product-card {
                    border: 1px solid #eee;
                    border-radius: 10px;
                    padding: 30px;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
                    background-image: url("${patternImageUrl}");
                    background-size: 200px;
                    background-blend-mode: soft-light;
                    background-color: rgba(255, 255, 255, 0.9);
                    display: flex;
                    flex-direction: column;
                }
                .product-card ul {
                    flex-grow: 1;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                    background-color: rgba(255, 255, 255, 0.75);
                }
            `)
        )
    );
};

const AboutUsSection = () => (
    React.createElement('section', { id: "about", style: { backgroundColor: '#fff' } },
        React.createElement('div', { className: "container" },
            React.createElement('div', { className: "section-title-container" },
                React.createElement('h2', null, 'Our Farm Story')
            ),
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '50px',
                    alignItems: 'center'
                }
            },
                React.createElement('div', null,
                    React.createElement('h3', null, 'Ethical, Natural, Flavorful'),
                    React.createElement('p', { style: { marginBottom: '15px' } }, 'Our mission is simple: to bring back the authentic taste of Kienyeji chicken through organic, natural farming. We raise pure and improved Kienyeji breeds in a free-range system, allowing them to roam and forage on pesticide-free pastures.'),
                    React.createElement('p', { style: { marginBottom: '15px' } }, 'We believe in ethical practices, which means absolutely no hormones or unnecessary antibiotics. This commitment results in healthy, lean, and incredibly flavorful meat—just like the old days.'),
                    React.createElement('blockquote', {
                        style: {
                            borderLeft: `4px solid ${theme.colors.secondary}`,
                            paddingLeft: '20px',
                            margin: '20px 0',
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            color: '#555'
                        }
                    }, '"Our chickens roam freely, resulting in healthy, lean, and flavorful meat just like the old days."')
                ),
                React.createElement('div', {
                    style: {
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                },
                    React.createElement('img', { src: chickenImageUrl, alt: "Our free-range chickens", style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } })
                )
            )
        ),
        React.createElement('style', null, `
            @media (max-width: 768px) {
                #about .container > div:last-child {
                    grid-template-columns: 1fr;
                }
                #about .container > div:last-child > div:last-child {
                    order: -1;
                    margin-bottom: 30px;
                }
            }
        `)
    )
);

const HowToOrderSection = () => {
    const steps = [
        { icon: '📱', title: 'Place Your Order', description: 'Contact us via WhatsApp, Call, or the contact form below.' },
        { icon: '💳', title: 'Make Payment', description: 'We accept M-PESA and cash on delivery for your convenience.' },
        { icon: '🚚', title: 'Fast Delivery', description: 'Receive your order fresh at your doorstep, same or next day.' },
    ];

    return (
        React.createElement('section', { id: "order" },
            React.createElement('div', { className: "container" },
                React.createElement('div', { className: "section-title-container" },
                    React.createElement('h2', null, 'Simple Ordering Process')
                ),
                React.createElement('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '30px',
                        textAlign: 'center',
                    }
                },
                    steps.map((step, index) => (
                        React.createElement('div', { key: index, className: "step-card" },
                            React.createElement('div', { className: "step-icon" }, step.icon),
                            React.createElement('h3', null, step.title),
                            React.createElement('p', null, step.description)
                        )
                    ))
                )
            ),
            React.createElement('style', null, `
                .step-card {
                    padding: 30px 20px;
                }
                .step-icon {
                    font-size: 3rem;
                    line-height: 1;
                    margin-bottom: 15px;
                }
            `)
        )
    );
};

const ContactSection = () => {
    const [status, setStatus] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you! Your message has been sent.');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        React.createElement('section', {
            id: "contact",
            style: { 
                backgroundColor: 'var(--background-color)',
                backgroundImage: `url("${patternImageUrl}")`,
                backgroundSize: '250px',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
            }
        },
            React.createElement('div', { className: "container" },
                React.createElement('div', { className: "section-title-container" },
                    React.createElement('h2', null, 'Get In Touch')
                ),
                React.createElement('div', { className: "contact-wrapper" },
                    React.createElement('div', { className: "contact-info" },
                        React.createElement('h3', null, 'Contact Information'),
                        React.createElement('p', null, 'Ready to place an order or have questions? Reach out to us!'),
                        React.createElement('ul', null,
                            React.createElement('li', null, React.createElement('strong', null, 'Phone:'), ' ', React.createElement('a', { href: `tel:${phone}` }, phone)),
                            React.createElement('li', null, React.createElement('strong', null, 'WhatsApp:'), ' ', React.createElement('a', { href: whatsappLink, target: "_blank", rel: "noopener noreferrer" }, 'Message Us')),
                            React.createElement('li', null, React.createElement('strong', null, 'Email:'), ' ', React.createElement('a', { href: `mailto:${email}` }, email))
                        ),
                        React.createElement('p', null, 'We deliver to Nairobi, Kiambu, Machakos & Kajiado counties.')
                    ),
                    React.createElement('form', { className: "contact-form", onSubmit: handleSubmit },
                        React.createElement('h3', null, 'Send us a Message'),
                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "name" }, 'Name'),
                            React.createElement('input', { type: "text", id: "name", name: "name", required: true })
                        ),
                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "phone" }, 'Phone Number'),
                            React.createElement('input', { type: "tel", id: "phone", name: "phone", required: true })
                        ),
                        React.createElement('div', { className: "form-group" },
                            React.createElement('label', { htmlFor: "message" }, 'Your Order / Message'),
                            React.createElement('textarea', { id: "message", name: "message", rows: 5, required: true })
                        ),
                        React.createElement('button', { type: "submit", className: "btn" }, 'Send Message'),
                        status && React.createElement('p', { className: "form-status" }, status)
                    )
                )
            ),
            React.createElement('style', null, `
                .contact-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 50px;
                    background: rgba(255, 255, 255, 0.85);
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                .contact-info ul {
                    list-style: none;
                    margin: 20px 0;
                }
                .contact-info li {
                    margin-bottom: 10px;
                }
                .contact-info a {
                    color: var(--accent-color);
                    text-decoration: none;
                }
                .contact-form .form-group {
                    margin-bottom: 20px;
                }
                .contact-form label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                .contact-form input, .contact-form textarea {
                    width: 100%;
                    padding: 12px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                    font-family: var(--body-font);
                    font-size: 1rem;
                }
                 .contact-form input:focus, .contact-form textarea:focus {
                    outline: 2px solid var(--secondary-color);
                    border-color: var(--secondary-color);
                 }
                .form-status {
                    margin-top: 15px;
                    color: var(--success-color);
                    font-weight: bold;
                }
                @media (max-width: 900px) {
                    .contact-wrapper {
                        grid-template-columns: 1fr;
                    }
                }
            `)
        )
    );
};

const Footer = () => (
    React.createElement('footer', {
        style: {
            backgroundColor: 'var(--primary-color)',
            color: 'var(--light-text-color)',
            padding: '30px 0',
            textAlign: 'center',
            backgroundImage: `url("${patternImageUrl}")`,
            backgroundSize: '150px',
            backgroundBlendMode: 'multiply',
            backgroundPosition: 'center',
        }
    },
        React.createElement('div', { className: "container" },
            React.createElement('p', null, `© ${new Date().getFullYear()} Kienyeji Fresh Farm. All Rights Reserved.`),
            React.createElement('p', null, 'Authentic Flavor, Naturally Raised.')
        )
    )
);

const App = () => (
    React.createElement(React.Fragment, null,
        React.createElement(GlobalStyles, null),
        React.createElement(Header, null),
        React.createElement('main', null,
            React.createElement(HeroSection, null),
            React.createElement(ProductsSection, null),
            React.createElement(AboutUsSection, null),
            React.createElement(HowToOrderSection, null),
            React.createElement(ContactSection, null)
        ),
        React.createElement(Footer, null)
    )
);

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App, null));
}
