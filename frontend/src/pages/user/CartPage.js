import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
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

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 20px',
            '@media (max-width: 480px)': {
                padding: '1.5rem 15px'
            }
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            '@media (max-width: 768px)': {
                fontSize: '2rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.8rem'
            }
        },
        cartContainer: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            alignItems: 'start',
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '1.5rem'
            }
        },
        cartItems: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        cartItem: {
            display: 'flex',
            background: 'white',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            gap: '1.5rem',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                padding: '1rem'
            }
        },
        itemImage: {
            width: '120px',
            height: '120px',
            background: '#f5f5f5',
            borderRadius: '5px',
            flexShrink: 0,
            '@media (max-width: 768px)': {
                width: '100px',
                height: '100px'
            },
            '@media (max-width: 480px)': {
                width: '80px',
                height: '80px'
            }
        },
        itemDetails: {
            flex: 1
        },
        itemName: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            '@media (max-width: 480px)': {
                fontSize: '1.1rem'
            }
        },
        itemPrice: {
            fontSize: '1.1rem',
            color: '#000',
            fontWeight: 'bold',
            marginBottom: '1rem',
            '@media (max-width: 480px)': {
                fontSize: '1rem'
            }
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            '@media (max-width: 480px)': {
                gap: '0.5rem'
            }
        },
        quantityBtn: {
            width: '30px',
            height: '30px',
            border: '1px solid #ddd',
            background: 'white',
            borderRadius: '3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '@media (max-width: 480px)': {
                width: '25px',
                height: '25px',
                fontSize: '0.9rem'
            }
        },
        quantityInput: {
            width: '50px',
            textAlign: 'center',
            padding: '5px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            '@media (max-width: 480px)': {
                width: '40px',
                fontSize: '0.9rem'
            }
        },
        removeBtn: {
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            '@media (max-width: 768px)': {
                width: '100%'
            }
        },
        summary: {
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '2rem',
            '@media (max-width: 768px)': {
                position: 'static',
                order: 2,
                marginTop: '1rem'
            },
            '@media (max-width: 480px)': {
                padding: '1.5rem'
            }
        },
        summaryTitle: {
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            '@media (max-width: 480px)': {
                fontSize: '1.3rem'
            }
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #eee',
            '@media (max-width: 480px)': {
                fontSize: '0.95rem'
            }
        },
        total: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            margin: '2rem 0',
            paddingTop: '1rem',
            borderTop: '2px solid #000',
            '@media (max-width: 480px)': {
                fontSize: '1.1rem'
            }
        },
        checkoutBtn: {
            width: '100%',
            padding: '15px',
            background: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1rem',
            '@media (max-width: 480px)': {
                padding: '12px',
                fontSize: '1rem'
            }
        },
        continueShopping: {
            display: 'block',
            textAlign: 'center',
            color: '#666',
            textDecoration: 'none',
            marginTop: '1rem',
            '@media (max-width: 480px)': {
                fontSize: '0.9rem'
            }
        },
        emptyCart: {
            textAlign: 'center',
            padding: '4rem 2rem',
            '@media (max-width: 768px)': {
                padding: '3rem 1.5rem'
            },
            '@media (max-width: 480px)': {
                padding: '2rem 1rem'
            }
        },
        emptyTitle: {
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#666',
            '@media (max-width: 768px)': {
                fontSize: '1.8rem'
            },
            '@media (max-width: 480px)': {
                fontSize: '1.5rem'
            }
        },
        shopBtn: {
            display: 'inline-block',
            padding: '12px 30px',
            background: '#000',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '1rem',
            '@media (max-width: 480px)': {
                padding: '10px 20px',
                fontSize: '0.9rem'
            }
        },
        clearCartBtn: {
            background: 'transparent',
            color: '#666',
            border: '1px solid #ddd',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '1rem',
            '@media (max-width: 768px)': {
                alignSelf: 'flex-start'
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

    if (cartItems.length === 0) {
        return (
            <div style={getResponsiveStyle(styles.container, breakpoint)}>
                <div style={getResponsiveStyle(styles.emptyCart, breakpoint)}>
                    <h2 style={getResponsiveStyle(styles.emptyTitle, breakpoint)}>Your cart is empty</h2>
                    <p>Discover our amazing products and add them to your cart!</p>
                    <Link to="/shop" style={getResponsiveStyle(styles.shopBtn, breakpoint)}>START SHOPPING</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={getResponsiveStyle(styles.container, breakpoint)}>
            <h1 style={getResponsiveStyle(styles.title, breakpoint)}>Shopping Cart</h1>

            <div style={getResponsiveStyle(styles.cartContainer, breakpoint)}>
                <div style={getResponsiveStyle(styles.cartItems, breakpoint)}>
                    <button
                        onClick={clearCart}
                        style={getResponsiveStyle(styles.clearCartBtn, breakpoint)}
                    >
                        Clear Cart
                    </button>

                    {cartItems.map(item => (
                        <div key={item.product._id} style={getResponsiveStyle(styles.cartItem, breakpoint)}>
                            <div style={getResponsiveStyle(styles.itemImage, breakpoint)}>
                                {item.product.images && item.product.images.length > 0 ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${item.product.images[0]}`}
                                        alt={item.product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                ) : (
                                    'No Image'
                                )}
                            </div>

                            <div style={getResponsiveStyle(styles.itemDetails, breakpoint)}>
                                <h3 style={getResponsiveStyle(styles.itemName, breakpoint)}>{item.product.name}</h3>
                                <p style={getResponsiveStyle(styles.itemPrice, breakpoint)}>LKR {item.product.price}</p>

                                <div style={getResponsiveStyle(styles.quantityControls, breakpoint)}>
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                        style={getResponsiveStyle(styles.quantityBtn, breakpoint)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                        style={getResponsiveStyle(styles.quantityInput, breakpoint)}
                                        min="1"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                        style={getResponsiveStyle(styles.quantityBtn, breakpoint)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product._id)}
                                    style={getResponsiveStyle(styles.removeBtn, breakpoint)}
                                >
                                    Remove
                                </button>
                            </div>

                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', '@media (max-width: 480px)': { fontSize: '1rem' } }}>
                                LKR {(item.product.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={getResponsiveStyle(styles.summary, breakpoint)}>
                    <h3 style={getResponsiveStyle(styles.summaryTitle, breakpoint)}>Order Summary</h3>

                    <div style={getResponsiveStyle(styles.summaryRow, breakpoint)}>
                        <span>Subtotal:</span>
                        <span>LKR {getCartTotal().toFixed(2)}</span>
                    </div>

                    <div style={getResponsiveStyle(styles.summaryRow, breakpoint)}>
                        <span>Shipping:</span>
                        <span>LKR 450.00</span>
                    </div>

                    <div style={getResponsiveStyle(styles.summaryRow, breakpoint)}>
                        <span>Tax:</span>
                        <span>LKR {(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>

                    <div style={getResponsiveStyle(styles.total, breakpoint)}>
                        <span>Total:</span>
                        <span>LKR {(getCartTotal() + 10 + (getCartTotal() * 0.1)).toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        style={getResponsiveStyle(styles.checkoutBtn, breakpoint)}
                    >
                        PROCEED TO CHECKOUT
                    </button>

                    <Link to="/shop" style={getResponsiveStyle(styles.continueShopping, breakpoint)}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;