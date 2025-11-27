import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [breakpoint, setBreakpoint] = useState('desktop');

    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width <= 480) setBreakpoint('smallMobile');
            else if (width <= 768) setBreakpoint('mobile');
            else if (width <= 1024) setBreakpoint('tablet');
            else setBreakpoint('desktop');
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    const footerStyles = {
        footer: {
            background: '#0a0a0a',
            color: 'white',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            '@media (max-width: 480px)': {
                padding: '0 15px'
            }
        },
        content: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '4rem',
            padding: '5rem 0 3rem',
            '@media (max-width: 1024px)': {
                gap: '3rem',
                padding: '4rem 0 2rem'
            },
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '3rem',
                padding: '3rem 0 2rem'
            },
            '@media (max-width: 480px)': {
                gap: '2rem',
                padding: '2rem 0 1.5rem'
            }
        },
        brandSection: {
            display: 'flex',
            flexDirection: 'column'
        },
        brandName: {
            fontSize: '1.8rem',
            fontWeight: '300',
            letterSpacing: '3px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            '@media (max-width: 768px)': {
                fontSize: '1.5rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.3rem'
            }
        },
        brandDescription: {
            color: '#888',
            lineHeight: '1.6',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            maxWidth: '300px',
            '@media (max-width: 768px)': {
                maxWidth: '100%'
            }
        },
        socialLinks: {
            display: 'flex',
            gap: '1rem',
            '@media (max-width: 480px)': {
                gap: '0.5rem'
            }
        },
        socialLink: {
            color: '#888',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            letterSpacing: '1px',
            '@media (max-width: 480px)': {
                fontSize: '0.8rem'
            }
        },
        section: {
            display: 'flex',
            flexDirection: 'column'
        },
        sectionTitle: {
            fontSize: '0.9rem',
            fontWeight: '400',
            letterSpacing: '2px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            color: '#fff',
            '@media (max-width: 768px)': {
                fontSize: '0.8rem'
            }
        },
        sectionLink: {
            color: '#888',
            textDecoration: 'none',
            marginBottom: '0.8rem',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            '@media (max-width: 768px)': {
                marginBottom: '0.6rem',
                fontSize: '0.85rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '0.8rem'
            }
        },
        sectionLinkHover: {
            color: 'white',
            transform: 'translateX(5px)'
        },
        bottom: {
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '2rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#666',
            fontSize: '0.8rem',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                gap: '1rem',
                textAlign: 'center'
            }
        },
        legalLinks: {
            display: 'flex',
            gap: '2rem',
            '@media (max-width: 1024px)': {
                gap: '1.5rem'
            },
            '@media (max-width: 768px)': {
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }
        },
        legalLink: {
            color: '#666',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            fontSize: '0.8rem',
            '@media (max-width: 480px)': {
                fontSize: '0.75rem'
            }
        }
    };

    // Helper function to handle responsive styles
    const getResponsiveStyle = (styleObj, currentBreakpoint) => {
        let styles = { ...styleObj };

        // Remove media query keys
        const mediaKeys = Object.keys(styles).filter(key => key.startsWith('@media'));
        mediaKeys.forEach(key => delete styles[key]);

        // Apply progressively
        if (currentBreakpoint !== 'desktop' && styleObj['@media (max-width: 1024px)']) {
            Object.assign(styles, styleObj['@media (max-width: 1024px)']);
        }
        if ((currentBreakpoint === 'mobile' || currentBreakpoint === 'smallMobile') && styleObj['@media (max-width: 768px)']) {
            Object.assign(styles, styleObj['@media (max-width: 768px)']);
        }
        if (currentBreakpoint === 'smallMobile' && styleObj['@media (max-width: 480px)']) {
            Object.assign(styles, styleObj['@media (max-width: 480px)']);
        }

        return styles;
    };

    return (
        <footer style={footerStyles.footer}>
            <div style={getResponsiveStyle(footerStyles.container, breakpoint)}>
                <div style={getResponsiveStyle(footerStyles.content, breakpoint)}>
                    {/* Brand Section */}
                    <div style={getResponsiveStyle(footerStyles.brandSection, breakpoint)}>
                        <div style={getResponsiveStyle(footerStyles.brandName, breakpoint)}>ELEVATE</div>
                        <p style={getResponsiveStyle(footerStyles.brandDescription, breakpoint)}>
                            Redefining modern luxury through exceptional craftsmanship 
                            and timeless design. Experience the pinnacle of fashion excellence.
                        </p>
                        <div style={getResponsiveStyle(footerStyles.socialLinks, breakpoint)}>
                            <a 
                                href="#" 
                                style={getResponsiveStyle(footerStyles.socialLink, breakpoint)}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'white';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#888';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                INSTAGRAM
                            </a>
                            <a 
                                href="#" 
                                style={getResponsiveStyle(footerStyles.socialLink, breakpoint)}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'white';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#888';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                FACEBOOK
                            </a>
                            <a 
                                href="#" 
                                style={getResponsiveStyle(footerStyles.socialLink, breakpoint)}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'white';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#888';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                TWITTER
                            </a>
                        </div>
                    </div>

                    {/* Shop Section */}
                    <div style={getResponsiveStyle(footerStyles.section, breakpoint)}>
                        <h4 style={getResponsiveStyle(footerStyles.sectionTitle, breakpoint)}>SHOP</h4>
                        <Link 
                            to="/shop?category=New" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            New Arrivals
                        </Link>
                        <Link 
                            to="/shop?category=Essentials" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Essentials
                        </Link>
                        <Link 
                            to="/shop?category=Accessories" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Accessories
                        </Link>
                        <Link 
                            to="/shop" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            All Collections
                        </Link>
                    </div>

                    {/* Information Section */}
                    <div style={getResponsiveStyle(footerStyles.section, breakpoint)}>
                        <h4 style={getResponsiveStyle(footerStyles.sectionTitle, breakpoint)}>INFORMATION</h4>
                        <Link 
                            to="/about" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/contact" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Contact
                        </Link>
                        <Link 
                            to="/shipping" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Shipping Info
                        </Link>
                        <Link 
                            to="/returns" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Returns
                        </Link>
                    </div>

                    {/* Customer Care Section */}
                    <div style={getResponsiveStyle(footerStyles.section, breakpoint)}>
                        <h4 style={getResponsiveStyle(footerStyles.sectionTitle, breakpoint)}>CUSTOMER CARE</h4>
                        <Link 
                            to="/faq" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            FAQ
                        </Link>
                        <Link 
                            to="/size-guide" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Size Guide
                        </Link>
                        <Link 
                            to="/careers" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Careers
                        </Link>
                        <Link 
                            to="/privacy" 
                            style={getResponsiveStyle(footerStyles.sectionLink, breakpoint)}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateX(5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#888';
                                e.target.style.transform = 'translateX(0)';
                            }}
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={getResponsiveStyle(footerStyles.bottom, breakpoint)}>
                    <div>
                        &copy; 2025 ELEVATE. All rights reserved.
                    </div>
                    <div style={getResponsiveStyle(footerStyles.legalLinks, breakpoint)}>
                        <Link 
                            to="/terms" 
                            style={getResponsiveStyle(footerStyles.legalLink, breakpoint)}
                            onMouseEnter={(e) => e.target.style.color = 'white'}
                            onMouseLeave={(e) => e.target.style.color = '#666'}
                        >
                            Terms of Service
                        </Link>
                        <Link 
                            to="/privacy" 
                            style={getResponsiveStyle(footerStyles.legalLink, breakpoint)}
                            onMouseEnter={(e) => e.target.style.color = 'white'}
                            onMouseLeave={(e) => e.target.style.color = '#666'}
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            to="/cookies" 
                            style={getResponsiveStyle(footerStyles.legalLink, breakpoint)}
                            onMouseEnter={(e) => e.target.style.color = 'white'}
                            onMouseLeave={(e) => e.target.style.color = '#666'}
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;