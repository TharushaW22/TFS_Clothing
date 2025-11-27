import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();
    const [hoveredItem, setHoveredItem] = useState(null);

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/orders', label: 'Orders', icon: '📦' },
        { path: '/products', label: 'Products', icon: '👕' },
        { path: '/contacts', label: 'Contacts', icon: '💬' }
    ];

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
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            borderColor: 'rgba(255,255,255,0.3)'
        },
        navItemHover: {
            background: 'rgba(255,255,255,0.1)',
            color: 'white'
        },
        navIcon: {
            marginRight: '1rem',
            fontSize: '1.2rem'
        },
        navLabel: {
            fontWeight: '500'
        },
        activeIndicator: {
            position: 'absolute',
            right: '0',
            top: '50%',
            width: '4px',
            height: '100%',
            background: 'white',
            transform: 'translateY(-50%)',
            borderRadius: '2px 0 0 2px'
        },
        sidebarFooter: {
            position: 'absolute',
            bottom: '1rem',
            left: 0,
            right: 0,
            padding: '1rem 1.5rem',
            textAlign: 'center',
            opacity: '0.8',
            fontSize: '0.75rem'
        },
        version: {
            color: 'rgba(255,255,255,0.7)'
        }
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>⚡</div>
                    <div>
                        <Link to="/" style={styles.logoText}>
                            AdminPro
                        </Link>
                        <div style={styles.logoSubtitle}>ADMIN PANEL</div>
                    </div>
                </div>
            </div>

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
                        </Link>
                    );
                })}
            </nav>

            <div style={styles.sidebarFooter}>
                <div style={styles.version}>v2.1.0 • Admin Panel</div>
            </div>
        </div>
    );
};

export default AdminSidebar;