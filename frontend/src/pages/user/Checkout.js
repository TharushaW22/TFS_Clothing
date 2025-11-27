import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        paymentMethod: 'COD',
        billing: {
            address: '',
            city: '',
            phone: ''
        }
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.billing) {
            setFormData({
                ...formData,
                billing: {
                    ...formData.billing,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                totalAmount: getCartTotal() + 10 + (getCartTotal() * 0.1),
                paymentMethod: formData.paymentMethod,
                billing: formData.billing
            };

            const response = await orderService.createOrder(orderData);

            if (formData.paymentMethod === 'Card') {
                // Redirect to PayHere
                window.location.href = response.data.payUrl;
            } else {
                // COD order confirmed
                clearCart();
                navigate('/dashboard', {
                    state: {
                        message: `Order confirmed! Tracking code: ${response.data.trackingCode}`
                    }
                });
            }
        } catch (error) {
            console.error('Order failed:', error);
            alert('Order failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem 20px'
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
        },
        checkoutContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem'
        },
        form: {
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        section: {
            marginBottom: '2rem'
        },
        sectionTitle: {
            fontSize: '1.3rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #000'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
        },
        paymentMethods: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        paymentMethod: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            border: '2px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        selectedPayment: {
            borderColor: '#000',
            background: '#f8f9fa'
        },
        summary: {
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
        },
        orderItem: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #eee'
        },
        total: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            margin: '2rem 0',
            paddingTop: '1rem',
            borderTop: '2px solid #000'
        },
        submitBtn: {
            width: '100%',
            padding: '15px',
            background: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
        },
        disabledBtn: {
            opacity: 0.6,
            cursor: 'not-allowed'
        }
    };

    const subtotal = getCartTotal();
    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Checkout</h1>

            <div style={styles.checkoutContainer}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Billing Information</h3>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.billing.address}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                placeholder="Enter your address"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.billing.city}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                placeholder="Enter your city"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.billing.phone}
                                onChange={handleInputChange}
                                required
                                style={styles.input}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Payment Method</h3>

                        <div style={styles.paymentMethods}>
                            <label
                                style={{
                                    ...styles.paymentMethod,
                                    ...(formData.paymentMethod === 'COD' && styles.selectedPayment)
                                }}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={formData.paymentMethod === 'COD'}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '10px' }}
                                />
                                Cash on Delivery
                            </label>

                            <label
                                style={{
                                    ...styles.paymentMethod,
                                    ...(formData.paymentMethod === 'Card' && styles.selectedPayment)
                                }}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card"
                                    checked={formData.paymentMethod === 'Card'}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '10px' }}
                                />
                                Credit/Debit Card (PayHere)
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || cartItems.length === 0}
                        style={{
                            ...styles.submitBtn,
                            ...((loading || cartItems.length === 0) && styles.disabledBtn)
                        }}
                    >
                        {loading ? 'PROCESSING...' : `PLACE ORDER - $${total.toFixed(2)}`}
                    </button>
                </form>

                <div style={styles.summary}>
                    <h3 style={styles.sectionTitle}>Order Summary</h3>

                    {cartItems.map(item => (
                        <div key={item.product._id} style={styles.orderItem}>
                            <div>
                                <strong>{item.product.name}</strong>
                                <br />
                                <small>Qty: {item.quantity} × ${item.product.price}</small>
                            </div>
                            <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}

                    <div style={styles.orderItem}>
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div style={styles.orderItem}>
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div style={styles.orderItem}>
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div style={styles.total}>
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;