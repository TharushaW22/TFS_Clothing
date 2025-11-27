import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { QRCodeSVG } from 'qrcode.react';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await orderService.getUserOrders();
            const foundOrder = response.data.find(o => o._id === orderId);
            setOrder(foundOrder);
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusSteps = () => {
        const steps = ['Pending', 'Packed', 'Ready to Deliver', 'Delivered'];
        const currentIndex = steps.indexOf(order?.status);

        return steps.map((step, index) => ({
            name: step,
            completed: index <= currentIndex,
            current: index === currentIndex
        }));
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 20px'
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
        },
        orderCard: {
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        },
        orderHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        trackingCode: {
            fontSize: '1.5rem',
            fontWeight: 'bold'
        },
        status: {
            padding: '8px 20px',
            borderRadius: '20px',
            color: 'white',
            fontWeight: 'bold'
        },
        progress: {
            margin: '2rem 0'
        },
        progressSteps: {
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '1rem'
        },
        progressLine: {
            position: 'absolute',
            top: '15px',
            left: '0',
            right: '0',
            height: '2px',
            background: '#ddd',
            zIndex: 1
        },
        progressFill: {
            position: 'absolute',
            top: '15px',
            left: '0',
            height: '2px',
            background: '#000',
            zIndex: 2,
            transition: 'width 0.3s ease'
        },
        step: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
        },
        stepDot: {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        },
        stepCompleted: {
            background: '#000',
            color: 'white'
        },
        stepCurrent: {
            background: '#000',
            color: 'white'
        },
        stepPending: {
            background: '#ddd',
            color: '#666'
        },
        stepName: {
            fontSize: '0.9rem',
            textAlign: 'center'
        },
        orderDetails: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginTop: '2rem'
        },
        qrSection: {
            textAlign: 'center',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '10px'
        },
        qrTitle: {
            marginBottom: '1rem',
            fontWeight: 'bold'
        },
        itemsList: {
            marginTop: '1rem'
        },
        item: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem 0',
            borderBottom: '1px solid #eee'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem'
        },
        notFound: {
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading order details...</div>;
    }

    if (!order) {
        return (
            <div style={styles.container}>
                <div style={styles.notFound}>
                    <h2>Order not found</h2>
                    <p>The order you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const statusSteps = getStatusSteps();
    const completedWidth = `${(statusSteps.findIndex(step => step.current) / (statusSteps.length - 1)) * 100}%`;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Order Tracking</h1>

            <div style={styles.orderCard}>
                <div style={styles.orderHeader}>
                    <div style={styles.trackingCode}>Order #{order.trackingCode}</div>
                    <div
                        style={{
                            ...styles.status,
                            background:
                                order.status === 'Delivered' ? '#27ae60' :
                                    order.status === 'Ready to Deliver' ? '#3498db' :
                                        order.status === 'Packed' ? '#f39c12' : '#e74c3c'
                        }}
                    >
                        {order.status}
                    </div>
                </div>

                <div style={styles.progress}>
                    <div style={styles.progressSteps}>
                        <div style={styles.progressLine}></div>
                        <div style={{ ...styles.progressFill, width: completedWidth }}></div>

                        {statusSteps.map((step, index) => (
                            <div key={step.name} style={styles.step}>
                                <div
                                    style={{
                                        ...styles.stepDot,
                                        ...(step.completed ? styles.stepCompleted : styles.stepPending),
                                        ...(step.current && styles.stepCurrent)
                                    }}
                                >
                                    {index + 1}
                                </div>
                                <div style={styles.stepName}>{step.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.orderDetails}>
                    <div>
                        <h3>Order Details</h3>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>

                        <h4 style={{ marginTop: '1rem' }}>Billing Address</h4>
                        <p>{order.billing?.address}</p>
                        <p>{order.billing?.city}</p>
                        <p>{order.billing?.phone}</p>

                        <div style={styles.itemsList}>
                            <h4>Items ({order.items.length})</h4>
                            {order.items.map((item, index) => (
                                <div key={index} style={styles.item}>
                                    <span>{item.product?.name} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.qrSection}>
                        <div style={styles.qrTitle}>Order QR Code</div>
                        <QRCodeSVG value={order.trackingCode} size={200} />
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                            Scan to verify order
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;