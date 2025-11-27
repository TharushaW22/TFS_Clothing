import API from './api';

export const authService = {
    login: (email, password) => API.post('/auth/login', { email, password }),
    register: (email, password) => API.post('/auth/register', { email, password }),
    verifyToken: () => API.get('/auth/verify'),
};