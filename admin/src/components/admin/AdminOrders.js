import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';  // No AdminHeader import
import { orderService } from '../../services/orderService';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [hoverStates, setHoverStates] = useState({
        actionBtns: {},
        modalBtns: {}
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getAllOrders();
            console.log('Fetched orders:', response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadOrderSticker = async (orderId, trackingCode) => {
        try {
            setDownloading(true);
            const response = await orderService.downloadOrderSticker(orderId);
           
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
            alert('Error downloading sticker');
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
            alert('Error updating order status');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            console.log('Attempting to delete order ID:', orderId);
            setDeleting(true);
            const response = await orderService.deleteOrder(orderId);
            console.log('Delete response:', response);
            setDeleteConfirm(null);
            fetchOrders();
            alert('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error);
            console.error('Error details:', error.response?.data || error.message);
            alert('Error deleting order: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        } finally {
            setDeleting(false);
        }
    };

    const handleDeleteClick = (order) => {
        console.log('Delete clicked for order:', order._id, order.trackingCode);
        setDeleteConfirm(order);
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
        container: {  // Keep this for the page content wrapper
            minHeight: '100vh',
            background: '#f8f9fa'
        },
        main: {
            padding: '2rem'
        },
        title: {
            fontSize: '2rem',
            marginBottom: '2rem',
            color: '#333',
            fontWeight: 'bold'
        },
        ordersTable: {
            background: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            background: '#f8f9fa',
            padding: '1rem',
            textAlign: 'left',
            fontWeight: 'bold',
            borderBottom: '1px solid #e1e1e1',
            color: '#2c3e50'
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid #e1e1e1',
            verticalAlign: 'middle'
        },
        statusBadge: {
            padding: '6px 12px',
            borderRadius: '15px',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            display: 'inline-block',
            minWidth: '100px',
            textAlign: 'center'
        },
        actionBtn: {
            padding: '6px 12px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            marginRight: '5px'
        },
        viewBtn: {
            background: '#3498db',
            color: 'white'
        },
        downloadBtn: {
            background: '#27ae60',
            color: 'white'
        },
        deleteBtn: {
            background: '#e74c3c',
            color: 'white'
        },
        actionBtnHover: {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        },
        orderModal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        },
        orderDetails: {
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        },
        detailRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #eee'
        },
        statusSelect: {
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginRight: '1rem',
            background: 'white',
            fontSize: '0.9rem'
        },
        updateBtn: {
            padding: '8px 16px',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
        },
        loading: {
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.2rem',
            color: '#666'
        },
        noOrders: {
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
        },
        deleteModal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            backdropFilter: 'blur(5px)'
        },
        deleteConfirm: {
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        },
        deleteTitle: {
            color: '#e74c3c',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
        },
        deleteMessage: {
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.5'
        },
        deleteActions: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
        },
        cancelBtn: {
            padding: '10px 20px',
            background: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
        },
        confirmDeleteBtn: {
            padding: '10px 20px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
        },
        disabledBtn: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        actionButtons: {
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading orders...</div>  {/* No sidebar/header here—layout handles */}
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <main style={styles.main}>  {/* Content only—no sidebar/header */}
                <h1 style={styles.title}>📦 Manage Orders ({orders.length})</h1>
                <div style={styles.ordersTable}>
                    {orders.length === 0 ? (
                        <div style={styles.noOrders}>
                            <h3>No orders found</h3>
                            <p>Orders will appear here when customers place them.</p>
                        </div>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Order ID</th>
                                    <th style={styles.th}>Customer</th>
                                    <th style={styles.th}>Amount</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={styles.td}>
                                            <strong>#{order.trackingCode}</strong>
                                        </td>
                                        <td style={styles.td}>
                                            {order.user?.email || 'N/A'}
                                            {order.user?.name && (
                                                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                                    {order.user.name}
                                                </div>
                                            )}
                                        </td>
                                        <td style={styles.td}>
                                            <strong>${order.totalAmount?.toFixed(2) || '0.00'}</strong>
                                        </td>
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
                                            {new Date(order.createdAt).toLocaleDateString()}
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actionButtons}>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    style={{
                                                        ...styles.actionBtn,
                                                        ...styles.viewBtn,
                                                        ...(hoverStates.actionBtns?.[`view-${order._id}`] && styles.actionBtnHover)
                                                    }}
                                                    onMouseEnter={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`view-${order._id}`]: true }
                                                    }))}
                                                    onMouseLeave={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`view-${order._id}`]: false }
                                                    }))}
                                                >
                                                    👁️ View
                                                </button>
                                                <button
                                                    onClick={() => downloadOrderSticker(order._id, order.trackingCode)}
                                                    style={{
                                                        ...styles.actionBtn,
                                                        ...styles.downloadBtn,
                                                        ...(hoverStates.actionBtns?.[`download-${order._id}`] && styles.actionBtnHover)
                                                    }}
                                                    onMouseEnter={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`download-${order._id}`]: true }
                                                    }))}
                                                    onMouseLeave={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`download-${order._id}`]: false }
                                                    }))}
                                                    disabled={downloading}
                                                >
                                                    📦 Sticker
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(order)}
                                                    style={{
                                                        ...styles.actionBtn,
                                                        ...styles.deleteBtn,
                                                        ...(hoverStates.actionBtns?.[`delete-${order._id}`] && styles.actionBtnHover)
                                                    }}
                                                    onMouseEnter={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`delete-${order._id}`]: true }
                                                    }))}
                                                    onMouseLeave={() => setHoverStates(prev => ({
                                                        ...prev,
                                                        actionBtns: { ...prev.actionBtns, [`delete-${order._id}`]: false }
                                                    }))}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* Order Details Modal */}
                {selectedOrder && (
                    <div style={styles.orderModal}>
                        <div style={styles.orderDetails}>
                            <h2>Order Details - #{selectedOrder.trackingCode}</h2>
                            <div style={{...styles.detailRow, justifyContent: 'flex-end'}}>
                                <button
                                    onClick={() => downloadOrderSticker(selectedOrder._id, selectedOrder.trackingCode)}
                                    style={styles.downloadBtn}
                                    disabled={downloading}
                                >
                                    📦 Download Sticker
                                </button>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Customer:</strong></span>
                                <span>
                                    {selectedOrder.user?.name || 'N/A'}
                                    <br />
                                    {selectedOrder.user?.email || 'N/A'}
                                </span>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Order Date:</strong></span>
                                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Payment Method:</strong></span>
                                <span>{selectedOrder.paymentMethod}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Total Amount:</strong></span>
                                <span><strong>${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</strong></span>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Billing Address:</strong></span>
                                <span>
                                    {selectedOrder.billing?.address}, {selectedOrder.billing?.city}
                                    <br />
                                    📞 {selectedOrder.billing?.phone}
                                </span>
                            </div>
                            <div style={styles.detailRow}>
                                <span><strong>Items:</strong></span>
                                <span>
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} style={{ marginBottom: '5px' }}>
                                            • {item.product?.name} × {item.quantity} - ${item.price}
                                        </div>
                                    ))}
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
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div style={styles.deleteModal}>
                        <div style={styles.deleteConfirm}>
                            <h2 style={styles.deleteTitle}>🗑️ Delete Order</h2>
                            <p style={styles.deleteMessage}>
                                Are you sure you want to delete order <strong>#{deleteConfirm.trackingCode}</strong>?
                                <br />
                                <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                    This action cannot be undone!
                                </span>
                            </p>
                            <div style={styles.deleteActions}>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    style={styles.cancelBtn}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteOrder(deleteConfirm._id)}
                                    style={{
                                        ...styles.confirmDeleteBtn,
                                        ...(deleting && styles.disabledBtn)
                                    }}
                                    disabled={deleting}
                                >
                                    {deleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminOrders;