import api from './api';

export const authService = {

    // ✅ LOGIN FUNCTION
    login: (email, password) => {
        console.log("LOGIN DATA:", { email, password });   // Debug
        return api.post('/auth/login', { email, password });
    },

    // ✅ VERIFY TOKEN
    verifyToken: () => api.get('/auth/verify'),
};
