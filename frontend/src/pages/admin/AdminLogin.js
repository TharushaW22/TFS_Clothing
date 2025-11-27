import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login(formData.email, formData.password);

            if (response.data.user.role !== 'admin') {
                setError('Access denied. Admin only.');
                return;
            }

            localStorage.setItem('token', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            padding: '20px'
        },
        card: {
            background: 'white',
            padding: '3rem',
            borderRadius: '10px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '450px'
        },
        title: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#333',
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        subtitle: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#666'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333',
            fontWeight: '600'
        },
        input: {
            width: '100%',
            padding: '15px',
            border: '2px solid #e1e1e1',
            borderRadius: '8px',
            fontSize: '16px'
        },
        btn: {
            width: '100%',
            padding: '15px',
            background: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
        },
        btnDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        error: {
            color: '#e74c3c',
            textAlign: 'center',
            marginBottom: '1rem',
            padding: '12px',
            background: '#ffeaea',
            borderRadius: '8px',
            border: '1px solid #f5c6cb'
        },
        adminNote: {
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1rem',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            color: '#856404'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Portal</h2>
                <p style={styles.subtitle}>Access the administration dashboard</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Admin Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter admin email"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.btn,
                            ...(loading && styles.btnDisabled)
                        }}
                    >
                        {loading ? 'SIGNING IN...' : 'SIGN IN AS ADMIN'}
                    </button>
                </form>

                <div style={styles.adminNote}>
                    <strong>Note:</strong> Only users with admin role can access this portal.
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;