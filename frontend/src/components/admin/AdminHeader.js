import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const styles = {
        header: {
            background: '#ffffff',
            borderBottom: '1px solid #f1f5f9',
            padding: '1.25rem 2rem',
            marginLeft: '250px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        },
        welcome: {
            fontSize: '1rem',
            color: '#475569',
            fontWeight: '500'
        },
        userEmail: {
            color: '#1e293b',
            fontWeight: '600'
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
        },
        adminBadge: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.5px'
        },
        logoutBtn: {
            padding: '8px 20px',
            background: 'transparent',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            outline: 'none'
        },
        logoutBtnHover: {
            background: '#f8fafc',
            borderColor: '#cbd5e1',
            color: '#475569'
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <header style={styles.header}>
            <div style={styles.welcome}>
                Welcome, <span style={styles.userEmail}>{user?.email}</span>
            </div>

            <div style={styles.userInfo}>
                <span style={styles.adminBadge}>ADMIN</span>
                <button 
                    onClick={handleLogout}
                    style={{
                        ...styles.logoutBtn,
                        ...(isHovered && styles.logoutBtnHover)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;