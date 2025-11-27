import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobile, setIsMobile] = useState(false);
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        totalSpent: 0
    });
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            calculateStats();
        }
    }, [orders]);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getUserOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(order => 
            order.status === 'Pending' || order.status === 'Packed' || order.status === 'Ready to Deliver'
        ).length;
        const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
        const totalSpent = orders.reduce((total, order) => total + (order.totalAmount || 0), 0);

        setStats({
            totalOrders,
            pendingOrders,
            deliveredOrders,
            totalSpent
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#10b981';
            case 'Ready to Deliver': return '#f59e0b';
            case 'Packed': return '#3b82f6';
            case 'Pending': return '#6b7280';
            default: return '#9ca3af';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR'
        }).format(amount || 0);
    };

    // Clean Dashboard Styles - No Sidebar
    const styles = {
        dashboardContainer: {
            minHeight: '100vh',
            background: '#f8f9fa',
            padding: isMobile ? '80px 15px 20px' : '100px 20px 30px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        dashboard: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            marginBottom: '24px'
        },
        welcomeSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '16px',
            marginBottom: '24px'
        },
        welcomeText: {
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '4px'
        },
        welcomeSubtext: {
            fontSize: '14px',
            color: '#666666'
        },
        quickActions: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
        },
        quickActionBtn: {
            padding: '10px 16px',
            background: '#f8f9fa',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#000000',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        // Top Navigation Tabs
        navTabs: {
            display: 'flex',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            marginBottom: '24px',
            overflowX: 'auto',
            gap: '4px'
        },
        navTab: {
            flex: 1,
            padding: '12px 16px',
            background: 'transparent',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#666666',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '120px',
            whiteSpace: 'nowrap'
        },
        activeNavTab: {
            background: '#000000',
            color: '#ffffff'
        },
        // Stats Grid
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        },
        statCard: {
            background: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            textAlign: 'center'
        },
        statIcon: {
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: '#000000',
            margin: '0 auto 12px'
        },
        statValue: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '4px'
        },
        statLabel: {
            fontSize: '12px',
            fontWeight: '600',
            color: '#666666',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        // Content Area
        contentArea: {
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb'
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
        },
        sectionTitle: {
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#000000'
        },
        ordersTable: {
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
        },
        tableHeader: {
            background: '#f8f9fa',
            borderBottom: '1px solid #e5e7eb'
        },
        tableHeaderCell: {
            padding: '16px 12px',
            textAlign: 'left',
            fontSize: '12px',
            fontWeight: '600',
            color: '#666666',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        tableRow: {
            borderBottom: '1px solid #f3f4f6'
        },
        tableCell: {
            padding: '16px 12px',
            fontSize: '14px',
            color: '#374151'
        },
        statusBadge: {
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
        },
        actionButton: {
            padding: '8px 16px',
            background: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            fontSize: '16px',
            color: '#666666'
        },
        emptyState: {
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666666'
        },
        emptyIcon: {
            fontSize: '48px',
            marginBottom: '16px',
            opacity: '0.5'
        },
        profileGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto'
        },
        profileCard: {
            background: '#ffffff',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
        },
        profileTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        profileItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #f3f4f6'
        },
        profileLabel: {
            fontSize: '14px',
            color: '#666666',
            fontWeight: '500'
        },
        profileValue: {
            fontSize: '14px',
            color: '#000000',
            fontWeight: '600'
        }
    };

    const statIcons = {
        totalOrders: { icon: '📦', label: 'Total Orders' },
        pendingOrders: { icon: '⏳', label: 'Pending' },
        deliveredOrders: { icon: '✅', label: 'Delivered' },
        totalSpent: { icon: '💰', label: 'Total Spent' }
    };

    const navItems = [
        { key: 'overview', label: 'Dashboard', icon: '📊' },
        { key: 'orders', label: 'My Orders', icon: '📦' },
        { key: 'profile', label: 'Profile', icon: '👤' }
    ];

    // Add hover effects
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .quick-action-btn:hover {
                background: #000000;
                color: #ffffff;
                border-color: #000000;
            }
            .stat-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .action-btn:hover {
                background: #333333;
                transform: translateY(-1px);
            }
            .nav-tab:hover:not(.active) {
                background: #f8f9fa;
                color: #000000;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    if (loading) {
        return (
            <div style={styles.dashboardContainer}>
                <div style={styles.loading}>
                    Loading your dashboard...
                </div>
            </div>
        );
    }

    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.dashboard}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.welcomeSection}>
                        <div>
                            <div style={styles.welcomeText}>
                                Welcome back, {user?.name || 'User'}!
                            </div>
                            <div style={styles.welcomeSubtext}>
                                {user?.email}
                            </div>
                        </div>
                        
                        <div style={styles.quickActions}>
                            <Link to="/shop" style={styles.quickActionBtn} className="quick-action-btn">
                                🛍️ Continue Shopping
                            </Link>
                            <Link to="/cart" style={styles.quickActionBtn} className="quick-action-btn">
                                🛒 View Cart
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={styles.navTabs}>
                        {navItems.map(item => (
                            <button
                                key={item.key}
                                style={{
                                    ...styles.navTab,
                                    ...(activeTab === item.key && styles.activeNavTab)
                                }}
                                onClick={() => setActiveTab(item.key)}
                                className="nav-tab"
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Stats Grid - Only show on overview */}
                    {activeTab === 'overview' && (
                        <div style={styles.statsGrid}>
                            {[
                                { key: 'totalOrders', value: stats.totalOrders },
                                { key: 'pendingOrders', value: stats.pendingOrders },
                                { key: 'deliveredOrders', value: stats.deliveredOrders },
                                { key: 'totalSpent', value: formatCurrency(stats.totalSpent) }
                            ].map(stat => (
                                <div key={stat.key} style={styles.statCard} className="stat-card">
                                    <div style={styles.statIcon}>
                                        {statIcons[stat.key].icon}
                                    </div>
                                    <div style={styles.statValue}>{stat.value}</div>
                                    <div style={styles.statLabel}>{statIcons[stat.key].label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div style={styles.contentArea}>
                    {activeTab === 'overview' && (
                        <>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>Recent Orders</div>
                                {orders.length > 0 && (
                                    <button 
                                        onClick={() => setActiveTab('orders')}
                                        style={styles.actionButton}
                                        className="action-btn"
                                    >
                                        View All Orders
                                    </button>
                                )}
                            </div>

                            {orders.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <div style={styles.emptyIcon}>📦</div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#000000' }}>
                                        No orders yet
                                    </div>
                                    <div style={{ marginBottom: '20px', color: '#666666' }}>
                                        Start shopping to see your orders here
                                    </div>
                                    <Link to="/shop" style={styles.actionButton} className="action-btn">
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={styles.ordersTable}>
                                        <thead style={styles.tableHeader}>
                                            <tr>
                                                <th style={styles.tableHeaderCell}>Order ID</th>
                                                <th style={styles.tableHeaderCell}>Date</th>
                                                <th style={styles.tableHeaderCell}>Amount</th>
                                                <th style={styles.tableHeaderCell}>Status</th>
                                                <th style={styles.tableHeaderCell}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 5).map(order => (
                                                <tr key={order._id} style={styles.tableRow}>
                                                    <td style={styles.tableCell}>
                                                        <strong>#{order.trackingCode}</strong>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <strong>{formatCurrency(order.totalAmount)}</strong>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <span style={{
                                                            ...styles.statusBadge,
                                                            background: `${getStatusColor(order.status)}20`,
                                                            color: getStatusColor(order.status)
                                                        }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <Link 
                                                            to={`/tracking/${order._id}`}
                                                            style={styles.actionButton}
                                                            className="action-btn"
                                                        >
                                                            Track Order
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'orders' && (
                        <>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>All Orders ({orders.length})</div>
                            </div>

                            {orders.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <div style={styles.emptyIcon}>📦</div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#000000' }}>
                                        No orders yet
                                    </div>
                                    <div style={{ marginBottom: '20px', color: '#666666' }}>
                                        Start shopping to see your orders here
                                    </div>
                                    <Link to="/shop" style={styles.actionButton} className="action-btn">
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={styles.ordersTable}>
                                        <thead style={styles.tableHeader}>
                                            <tr>
                                                <th style={styles.tableHeaderCell}>Order ID</th>
                                                <th style={styles.tableHeaderCell}>Date</th>
                                                <th style={styles.tableHeaderCell}>Items</th>
                                                <th style={styles.tableHeaderCell}>Amount</th>
                                                <th style={styles.tableHeaderCell}>Status</th>
                                                <th style={styles.tableHeaderCell}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id} style={styles.tableRow}>
                                                    <td style={styles.tableCell}>
                                                        <strong>#{order.trackingCode}</strong>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        {order.items?.length || 0} items
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <strong>{formatCurrency(order.totalAmount)}</strong>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <span style={{
                                                            ...styles.statusBadge,
                                                            background: `${getStatusColor(order.status)}20`,
                                                            color: getStatusColor(order.status)
                                                        }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td style={styles.tableCell}>
                                                        <Link 
                                                            to={`/tracking/${order._id}`}
                                                            style={styles.actionButton}
                                                            className="action-btn"
                                                        >
                                                            Track Order
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'profile' && (
                        <>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>Profile Information</div>
                            </div>
                            
                            <div style={styles.profileGrid}>
                                <div style={styles.profileCard}>
                                    <div style={styles.profileTitle}>Personal Information</div>
                                    <div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Full Name</span>
                                            <span style={styles.profileValue}>{user?.name || 'Not provided'}</span>
                                        </div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Email Address</span>
                                            <span style={styles.profileValue}>{user?.email}</span>
                                        </div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Account Type</span>
                                            <span style={styles.profileValue}>{user?.role || 'Customer'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={styles.profileCard}>
                                    <div style={styles.profileTitle}>Account Statistics</div>
                                    <div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Member Since</span>
                                            <span style={styles.profileValue}>
                                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Total Orders</span>
                                            <span style={styles.profileValue}>{stats.totalOrders}</span>
                                        </div>
                                        <div style={styles.profileItem}>
                                            <span style={styles.profileLabel}>Total Spent</span>
                                            <span style={styles.profileValue}>{formatCurrency(stats.totalSpent)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;