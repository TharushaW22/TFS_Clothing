import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { user, logout } = useAuth();
    const { getCartItemsCount } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header style={{
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    position: 'relative'
                }}>
                    {/* Logo */}
                    <Link to="/home" style={{
                        color: '#000',
                        textDecoration: 'none',
                        zIndex: 1001,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <img 
                            src="https://i.ibb.co/Q3DwJg75/logo.png" 
                            alt="TFStyle Logo" 
                            style={{
                                height: '40px',
                                width: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#000',
                            letterSpacing: '-0.5px'
                        }}>
                            TFStyle
                        </span>
                    </Link>

                    {/* Mobile menu button - ALWAYS VISIBLE ON MOBILE */}
                    <button 
                        onClick={toggleMobileMenu}
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            zIndex: 1001
                        }}
                        className="mobile-menu-btn"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>

                    {/* Navigation */}
                    <nav style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center'
                    }} className="desktop-nav">
                        <Link to="/home" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}>Home</Link>
                        <Link to="/shop" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}>Shop</Link>
                        <Link to="/about" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}>About</Link>
                        <Link to="/contact" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}>Contact</Link>
                    </nav>

                    {/* Mobile Navigation */}
                    <nav style={{
                        display: 'none',
                        flexDirection: 'column',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'white',
                        padding: '80px 2rem 2rem',
                        gap: '1.5rem',
                        zIndex: 1000
                    }} className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-active' : ''}`}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '2rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <img 
                                src="https://i.ibb.co/Q3DwJg75/logo.png" 
                                alt="TFStyle Logo" 
                                style={{
                                    height: '35px',
                                    width: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                            <span style={{
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                color: '#000'
                            }}>
                                TFStyle
                            </span>
                        </div>
                        <Link to="/home" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            fontSize: '1.2rem',
                            padding: '1rem 0',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'color 0.3s ease'
                        }} onClick={closeMobileMenu}>Home</Link>
                        <Link to="/shop" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            fontSize: '1.2rem',
                            padding: '1rem 0',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'color 0.3s ease'
                        }} onClick={closeMobileMenu}>Shop</Link>
                        <Link to="/about" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            fontSize: '1.2rem',
                            padding: '1rem 0',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'color 0.3s ease'
                        }} onClick={closeMobileMenu}>About</Link>
                        <Link to="/contact" style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontWeight: '500',
                            fontSize: '1.2rem',
                            padding: '1rem 0',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'color 0.3s ease'
                        }} onClick={closeMobileMenu}>Contact</Link>
                    </nav>

                    {/* User Actions */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }} className="desktop-actions">
                        {user ? (
                            <>
                                <Link to="/dashboard" style={{
                                    color: '#666',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Hi, {user.email}
                                </Link>
                                <Link to="/cart" style={{
                                    background: '#000',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🛒 Cart ({getCartItemsCount()})
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        background: '#f8f9fa',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    background: '#f8f9fa',
                                    color: '#333',
                                    border: '1px solid #ddd',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}>Login</Link>
                                <Link to="/register" style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    background: '#000',
                                    color: 'white',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}>Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div style={{
                        display: 'none',
                        flexDirection: 'column',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'white',
                        padding: '2rem',
                        gap: '1rem',
                        borderTop: '1px solid #f0f0f0',
                        zIndex: 1000
                    }} className={`mobile-actions ${isMobileMenuOpen ? 'mobile-actions-active' : ''}`}>
                        {user ? (
                            <>
                                <Link to="/dashboard" style={{
                                    color: '#666',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500'
                                }} onClick={closeMobileMenu}>
                                    Hi, {user.email}
                                </Link>
                                <Link to="/cart" style={{
                                    background: '#000',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }} onClick={closeMobileMenu}>
                                    🛒 Cart ({getCartItemsCount()})
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '1rem',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        background: '#f8f9fa',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                        fontSize: '1.1rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{
                                    padding: '1rem',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    background: '#f8f9fa',
                                    color: '#333',
                                    border: '1px solid #ddd',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    fontWeight: '500'
                                }} onClick={closeMobileMenu}>Login</Link>
                                <Link to="/register" style={{
                                    padding: '1rem',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    background: '#000',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    fontWeight: '500'
                                }} onClick={closeMobileMenu}>Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Overlay */}
                    {isMobileMenuOpen && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999
                        }} onClick={closeMobileMenu}></div>
                    )}
                </div>
            </div>

            <style>{`
                /* Mobile Styles */
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block !important;
                    }
                    
                    .desktop-nav {
                        display: none !important;
                    }
                    
                    .desktop-actions {
                        display: none !important;
                    }
                    
                    .mobile-nav {
                        display: flex !important;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    
                    .mobile-nav-active {
                        transform: translateX(0);
                    }
                    
                    .mobile-actions {
                        display: flex !important;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    
                    .mobile-actions-active {
                        transform: translateX(0);
                    }
                }

                /* Desktop Styles */
                @media (min-width: 769px) {
                    .mobile-nav {
                        display: none !important;
                    }
                    
                    .mobile-actions {
                        display: none !important;
                    }
                    
                    .mobile-menu-btn {
                        display: none !important;
                    }
                }

                /* Hover effects */
                nav a:hover {
                    color: #000 !important;
                    transform: translateY(-1px);
                }

                .desktop-actions a:hover:not([style*="background:#000"]) {
                    color: #000 !important;
                }

                a[style*="background:#000"]:hover {
                    background: #333 !important;
                    transform: translateY(-1px);
                }

                button:hover {
                    background: #e9ecef !important;
                    transform: translateY(-1px);
                }

                a[style*="background:#f8f9fa"]:hover {
                    background: #e9ecef !important;
                    transform: translateY(-1px);
                }
            `}</style>
        </header>
    );
};

export default Header;