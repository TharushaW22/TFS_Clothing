import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authService.verifyToken()
                .then((response) => {
                    const fetchedUser = response.data.user;
                    if (fetchedUser.role === 'admin') {
                        setUser(fetchedUser);
                    } else {
                        localStorage.removeItem('token');
                    }
                })
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        const fetchedUser = response.data.user;
        if (fetchedUser.role !== 'admin') {
            throw new Error('Access denied. Admin only.');
        }
        setUser(fetchedUser);
        localStorage.setItem('token', response.data.token);
        return response;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};