import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { orderService } from '../../services/orderService';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState('');
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setError('');
            const response = await orderService.getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ADD THIS FUCKING FUNCTION
    const downloadOrderSticker = async (orderId, trackingCode) => {
        try {
            setDownloading(true);
            const response = await orderService.downloadOrderSticker(orderId);
            
            // Create blob and download
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `delivery-sticker-${trackingCode}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Error downloading sticker:', error);
            setError('Failed to download sticker');
        } finally {
            setDownloading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error updating order:', error);
            setError('Failed to update order status.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#27ae60';
            case 'Ready to Deliver': return '#3498db';
            case 'Packed': return '#f39c12';
            case 'Pending': return '#e74c3c';
            default: return '#666';
        }
    };

    const styles = {
        container: {
            marginLeft: '250px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            color: 'white'
        },
        main: {
            padding: '2rem'
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: 'white',
            fontWeight: '300',
            letterSpacing: '2px'
        },
        ordersTable: {
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            background: 'rgba(255,255,255,0.05)',
            padding: '1.5rem 1rem',
            textAlign: 'left',
            fontWeight: '400',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '1px',
            fontSize: '0.9rem'
        },
        td: {
            padding: '1.5rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)'
        },
        statusBadge: {
            padding: '8px 16px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'inline-block',
            letterSpacing: '0.5px'
        },
        viewBtn: {
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease',
            marginRight: '10px'
        },
        downloadBtn: {
            padding: '8px 16px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease'
        },
        actionGroup: {
            display: 'flex',
            gap: '10px'
        },
        orderModal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        },
        orderDetails: {
            background: 'rgba(26,26,26,0.95)',
            padding: '3rem',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
        },
        detailRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        },
        statusSelect: {
            padding: '10px 15px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            marginRight: '1rem',
            color: 'white',
            fontSize: '0.9rem'
        },
        updateBtn: {
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem',
            color: 'white'
        },
        noOrders: {
            textAlign: 'center',
            padding: '3rem',
            color: 'rgba(255,255,255,0.6)'
        },
        error: {
            textAlign: 'center',
            padding: '2rem',
            color: '#e74c3c',
            background: 'rgba(231, 76, 60, 0.1)',
            borderRadius: '10px',
            marginBottom: '2rem',
            border: '1px solid rgba(231, 76, 60, 0.3)'
        },
        modalTitle: {
            fontSize: '2rem',
            marginBottom: '2rem',
            fontWeight: '300',
            letterSpacing: '1px',
            color: 'white'
        },
        retryBtn: {
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginTop: '1rem'
        },
        downloading: {
            opacity: 0.6,
            cursor: 'not-allowed'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <AdminSidebar />
                <AdminHeader />
                <div style={styles.loading}>Loading orders...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <AdminSidebar />
            <AdminHeader />

            <main style={styles.main}>
                <h1 style={styles.title}>Manage Orders</h1>

                {error && (
                    <div style={styles.error}>
                        <p>{error}</p>
                        <button 
                            style={styles.retryBtn}
                            onClick={fetchOrders}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <div style={styles.ordersTable}>
                    {orders.length === 0 && !error ? (
                        <div style={styles.noOrders}>
                            <h3>No orders found</h3>
                            <p>Orders will appear here when customers place them.</p>
                        </div>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ORDER ID</th>
                                    <th style={styles.th}>CUSTOMER</th>
                                    <th style={styles.th}>AMOUNT</th>
                                    <th style={styles.th}>STATUS</th>
                                    <th style={styles.th}>DATE</th>
                                    <th style={styles.th}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={styles.td}>#{order.trackingCode}</td>
                                        <td style={styles.td}>
                                            <div>
                                                <div style={{color: 'white', fontWeight: '500'}}>
                                                    {order.user?.name || 'Customer'}
                                                </div>
                                                <div style={{fontSize: '0.8rem', opacity: 0.7}}>
                                                    {order.user?.email || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={styles.td}>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                                        <td style={styles.td}>
                                            <span
                                                style={{
                                                    ...styles.statusBadge,
                                                    background: getStatusColor(order.status)
                                                }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actionGroup}>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    style={styles.viewBtn}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = 'rgba(255,255,255,0.2)';
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                                                        e.target.style.transform = 'translateY(-2px)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'rgba(255,255,255,0.1)';
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                                                        e.target.style.transform = 'translateY(0)';
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                                {/* ADD THIS FUCKING DOWNLOAD BUTTON */}
                                                <button
                                                    onClick={() => downloadOrderSticker(order._id, order.trackingCode)}
                                                    style={{
                                                        ...styles.downloadBtn,
                                                        ...(downloading ? styles.downloading : {})
                                                    }}
                                                    disabled={downloading}
                                                    onMouseEnter={(e) => {
                                                        if (!downloading) {
                                                            e.target.style.background = '#219a52';
                                                            e.target.style.transform = 'translateY(-2px)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!downloading) {
                                                            e.target.style.background = '#27ae60';
                                                            e.target.style.transform = 'translateY(0)';
                                                        }
                                                    }}
                                                >
                                                    📦 {downloading ? 'Downloading...' : 'Sticker'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {selectedOrder && (
                    <div style={styles.orderModal}>
                        <div style={styles.orderDetails}>
                            <h2 style={styles.modalTitle}>Order Details - #{selectedOrder.trackingCode}</h2>

                            {/* ADD DOWNLOAD BUTTON IN MODAL TOO */}
                            <div style={{...styles.detailRow, justifyContent: 'flex-end'}}>
                                <button
                                    onClick={() => downloadOrderSticker(selectedOrder._id, selectedOrder.trackingCode)}
                                    style={{
                                        ...styles.downloadBtn,
                                        ...(downloading ? styles.downloading : {})
                                    }}
                                    disabled={downloading}
                                >
                                    📦 {downloading ? 'Downloading...' : 'Download Delivery Sticker'}
                                </button>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Customer:</strong></span>
                                <span style={{textAlign: 'right'}}>
                                    <div>{selectedOrder.user?.name || 'Customer'}</div>
                                    <div style={{fontSize: '0.9rem', opacity: 0.7}}>
                                        {selectedOrder.user?.email || 'N/A'}
                                    </div>
                                </span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Order Date:</strong></span>
                                <span>{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Payment Method:</strong></span>
                                <span>{selectedOrder.paymentMethod || 'N/A'}</span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Total Amount:</strong></span>
                                <span style={{fontSize: '1.2rem', fontWeight: '500', color: 'white'}}>
                                    ${selectedOrder.totalAmount?.toFixed(2) || '0.00'}
                                </span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Billing Address:</strong></span>
                                <span style={{textAlign: 'right'}}>
                                    {selectedOrder.billing?.address || 'N/A'}, {selectedOrder.billing?.city || 'N/A'}
                                    <br />
                                    Phone: {selectedOrder.billing?.phone || 'N/A'}
                                </span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Items ({selectedOrder.items?.length || 0}):</strong></span>
                                <span style={{textAlign: 'right'}}>
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} style={{marginBottom: '0.5rem'}}>
                                            {item.product?.name || 'Product'} × {item.quantity || 0} - ${item.price || 0}
                                        </div>
                                    )) || 'No items'}
                                </span>
                            </div>

                            <div style={styles.detailRow}>
                                <span><strong>Update Status:</strong></span>
                                <div>
                                    <select
                                        defaultValue={selectedOrder.status}
                                        style={styles.statusSelect}
                                        onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Ready to Deliver">Ready to Deliver</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        style={styles.updateBtn}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.2)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.1)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminOrders;