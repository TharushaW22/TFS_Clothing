/*<<<<<<< Updated upstream
=======*/
// productService.js (Further Updated for Enhanced Retries)
//>>>>>>> Stashed changes
import axios from 'axios';

const API_URL = 'https://tfs-clothing.onrender.com/api/products';

// Get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('authToken');
};

//Updated upstream

// Helper function for retry with exponential backoff
// FIX: Increased retries to 5; added jitter (random + up to 1s) to backoff; added logging for debug.
const retryRequest = async (fn, retries = 5, baseDelay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.code === 'ECONNABORTED' && i < retries - 1) {
                const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000; // Jitter for thundering herd prevention
                console.log(`Retry ${i + 1}/${retries} in ${Math.round(delay)}ms...`); // FIX: Debug log for retries
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
};

//>>>>>>> Stashed changes
// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const productService = {
    getProducts: async (params = {}) => {
        try {
            const response = await api.get('/', { params });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await api.get(`/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    createProduct: async (formData) => {
        try {
            console.log('Creating product with form data:');
            // Log form data contents
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const token = getAuthToken();
            const response = await api.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
            });
            return response;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    updateProduct: async (id, formData) => {
        try {
            console.log(`Updating product ${id} with form data:`);
            // Log form data contents
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const token = getAuthToken();
            const response = await api.put(`/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
            });
            return response;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};

export { productService };