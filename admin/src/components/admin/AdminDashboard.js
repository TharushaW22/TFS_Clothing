import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [productsRes, ordersRes] = await Promise.all([
                productService.getProducts({}),
                orderService.getAllOrders()
            ]);

            const products = productsRes.data || [];
            const orders = ordersRes.data || [];

            const pendingOrders = orders.filter(o => o.status === 'Pending').length;
            const completedOrders = orders.filter(o => o.status === 'Delivered').length;
            const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                pendingOrders,
                completedOrders,
                revenue
            });

            setRecentOrders(orders.slice(0, 5).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: ['Products', 'Orders', 'Pending', 'Completed'],
        datasets: [{
            label: 'Counts',
            data: [stats.totalProducts, stats.totalOrders, stats.pendingOrders, stats.completedOrders],
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }],
    };

    const styles = {
        main: {
            padding: '2rem',
            background: '#f8f9fa'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
        },
        statCard: {
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
        },
        statValue: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333'
        },
        statLabel: {
            color: '#666',
            marginTop: '0.5rem'
        },
        chartContainer: {
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        },
        recentOrders: {
            background: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        orderItem: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem 0',
            borderBottom: '1px solid #eee'
        }
    };

    if (loading) return <div style={styles.main}>Loading...</div>;

    return (
        <div style={styles.main}>
            <h1>Dashboard</h1>
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.totalProducts}</div>
                    <div style={styles.statLabel}>Total Products</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.totalOrders}</div>
                    <div style={styles.statLabel}>Total Orders</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.pendingOrders}</div>
                    <div style={styles.statLabel}>Pending Orders</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.completedOrders}</div>
                    <div style={styles.statLabel}>Completed Orders</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>LKR {stats.revenue.toFixed(2)}</div>
                    <div style={styles.statLabel}>Total Revenue</div>
                </div>
            </div>

            <div style={styles.chartContainer}>
                <h2>Overview Chart</h2>
                <Bar data={chartData} />
            </div>

            <div style={styles.recentOrders}>
                <h2>Recent Orders</h2>
                {recentOrders.map(order => (
                    <div key={order._id} style={styles.orderItem}>
                        <span>{order.trackingCode} - {order.status}</span>
                        <span>LKR {order.totalAmount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;