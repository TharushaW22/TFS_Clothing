import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const styles = {
        sidebar: {
            width: '280px',
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            padding: '0',
            boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            zIndex: 1000
        },
        sidebarHeader: {
            padding: '2rem 1.5rem',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.2)'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        logoIcon: {
            fontSize: '2rem',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '8px',
            backdropFilter: 'blur(10px)'
        },
        logoText: {
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'white',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
        },
        logoSubtitle: {
            fontSize: '0.7rem',
            opacity: '0.8',
            fontWeight: '500',
            marginTop: '2px',
            letterSpacing: '1px'
        },
        nav: {
            padding: '1.5rem 0',
            display: 'flex',
            flexDirection: 'column'
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            margin: '4px 1rem',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            border: '1px solid transparent',
            position: 'relative',
            overflow: 'hidden'
        },
        activeNavItem: {
            background: 'rgba(255,255,255,0.15)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transform: 'translateX(5px)'
        },
        navItemHover: {
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            transform: 'translateX(5px)'
        },
        navIcon: {
            marginRight: '12px',
            fontSize: '1.2rem',
            width: '24px',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        },
        navLabel: {
            fontSize: '0.95rem',
            fontWeight: '600',
            letterSpacing: '0.3px'
        },
        activeIndicator: {
            position: 'absolute',
            right: '15px',
            width: '6px',
            height: '6px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
        },
        badge: {
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '0.7rem',
            fontWeight: '600',
            marginLeft: 'auto'
        },
        sidebarFooter: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '1.5rem',
            background: 'rgba(0,0,0,0.1)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
        },
        version: {
            fontSize: '0.75rem',
            opacity: '0.6',
            fontWeight: '500'
        }
    };

    const menuItems = [
        { 
            path: '/admin/dashboard', 
            label: 'Dashboard', 
            icon: '📊',
            badge: null
        },
        { 
            path: '/admin/products', 
            label: 'Products', 
            icon: '👕',
            badge: null
        },
        { 
            path: '/admin/orders', 
            label: 'Orders', 
            icon: '📦',
            badge: null
        },
        { 
            path: '/admin/contacts', 
            label: 'Contact Queries', 
            icon: '✉️',
            badge: null
        },
        { 
            path: '/admin/users', 
            label: 'Users', 
            icon: '👥',
            badge: null
        },
        { 
            path: '/admin/settings', 
            label: 'Settings', 
            icon: '⚙️',
            badge: null
        }
    ];

    const [hoveredItem, setHoveredItem] = React.useState(null);

    return (
        <div style={styles.sidebar}>
            {/* Header */}
            <div style={styles.sidebarHeader}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>⚡</div>
                    <div>
                        <Link to="/admin/dashboard" style={styles.logoText}>
                            AdminPro
                        </Link>
                        <div style={styles.logoSubtitle}>ADMIN PANEL</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={styles.nav}>
                {menuItems.map(item => {
                    const isActive = location.pathname === item.path;
                    const isHovered = hoveredItem === item.path;
                    
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                ...styles.navItem,
                                ...(isActive && styles.activeNavItem),
                                ...(isHovered && !isActive && styles.navItemHover)
                            }}
                            onMouseEnter={() => setHoveredItem(item.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <span style={styles.navIcon}>{item.icon}</span>
                            <span style={styles.navLabel}>{item.label}</span>
                            {isActive && <div style={styles.activeIndicator} />}
                            {item.badge && (
                                <span style={styles.badge}>{item.badge}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={styles.sidebarFooter}>
                <div style={styles.version}>v2.1.0 • Admin Panel</div>
            </div>
        </div>
    );
};

export default AdminSidebar;