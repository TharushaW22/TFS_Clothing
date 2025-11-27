import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

/* ✅ REQUEST INTERCEPTOR (FIXED) */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    // ✅ DO NOT ATTACH TOKEN TO LOGIN REQUEST
    if (token && !config.url.includes('/auth/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
