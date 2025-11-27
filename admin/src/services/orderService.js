import api from './api';

export const orderService = {
    getAllOrders: () => api.get('/orders/admin/all'),
    updateOrderStatus: (id, status) => api.put(`/orders/admin/${id}/status`, { status }),
    deleteOrder: (id) => api.delete(`/orders/admin/${id}`),
    downloadOrderSticker: (id) => api.get(`/orders/sticker/${id}`, { responseType: 'blob' }),
};