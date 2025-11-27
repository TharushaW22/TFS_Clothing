import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const styles = {
        header: {
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            marginLeft: '0px', // This should match your sidebar width
            width: 'calc(100% - 250px)' // Subtract sidebar width from total width
        },
        headerLeft: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        headerTitle: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e293b',
            margin: 0
        },
        breadcrumb: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            color: '#64748b'
        },
        breadcrumbSeparator: {
            color: '#cbd5e1'
        },
        breadcrumbCurrent: {
            color: '#475569',
            fontWeight: '500'
        },
        userMenu: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'relative'
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
        },
        userInfoHover: {
            backgroundColor: '#f8fafc'
        },
        userAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem'
        },
        userDetails: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
        },
        userName: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1e293b'
        },
        userRole: {
            fontSize: '0.75rem',
            color: '#64748b',
            fontWeight: '500'
        },
        dropdownTrigger: {
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        dropdownTriggerHover: {
            backgroundColor: '#f1f5f9',
            color: '#475569'
        },
        dropdownMenu: {
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '200px',
            zIndex: 1000,
            overflow: 'hidden'
        },
        dropdownItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'none',
            border: 'none',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: '#475569',
            transition: 'background-color 0.2s ease',
            textDecoration: 'none'
        },
        dropdownItemHover: {
            backgroundColor: '#f8fafc'
        },
        logoutItem: {
            color: '#dc2626'
        },
        logoutItemHover: {
            backgroundColor: '#fef2f2',
            color: '#b91c1c'
        },
        dropdownDivider: {
            height: '1px',
            backgroundColor: '#f1f5f9',
            margin: '4px 0'
        },
        dropdownOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'transparent'
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.headerLeft}>
                <h1 style={styles.headerTitle}>Dashboard</h1>
                <div style={styles.breadcrumb}>
                    <span>Admin</span>
                    <span style={styles.breadcrumbSeparator}>/</span>
                    <span style={styles.breadcrumbCurrent}>Products</span>
                </div>
            </div>

            <div style={styles.userMenu}>
                <div 
                    style={{
                        ...styles.userInfo,
                        ...(showDropdown && styles.userInfoHover)
                    }}
                    onClick={handleProfileClick}
                >
                    <div style={styles.userAvatar}>
                        {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div style={styles.userDetails}>
                        <span style={styles.userName}>
                            {user?.email?.split('@')[0] || 'Admin'}
                        </span>
                        <span style={styles.userRole}>Administrator</span>
                    </div>
                </div>
                
                <button 
                    style={{
                        ...styles.dropdownTrigger,
                        ...(showDropdown && styles.dropdownTriggerHover)
                    }}
                    onClick={handleProfileClick}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>
                
                {showDropdown && (
                    <div style={styles.dropdownMenu}>
                        <button 
                            style={styles.dropdownItem}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M6 20C6 17.7909 7.79086 16 10 16H14C16.2091 16 18 17.7909 18 20" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Profile
                        </button>
                        <button 
                            style={styles.dropdownItem}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99038 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99038 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Settings
                        </button>
                        <div style={styles.dropdownDivider}></div>
                        <button 
                            style={{
                                ...styles.dropdownItem,
                                ...styles.logoutItem
                            }}
                            onClick={handleLogout}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#fef2f2';
                                e.target.style.color = '#b91c1c';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#dc2626';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2"/>
                                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M21 12H9" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div 
                    style={styles.dropdownOverlay}
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </header>
    );
};

export default AdminHeader;