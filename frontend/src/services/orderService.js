import API from './api';

export const orderService = {
    createOrder: (orderData) => API.post('/orders', orderData),
    getUserOrders: () => API.get('/orders/myorders'),
    getAllOrders: () => API.get('/orders/admin/all'),
    updateOrderStatus: (id, status) => API.put(`/orders/admin/${id}/status`, { status }),
    getQRCode: (trackingCode) => API.get(`/orders/qr/${trackingCode}`),
    downloadOrderSticker: (orderId) => API.get(`/orders/sticker/${orderId}`, { responseType: 'blob' }),
    // ADD DELETE ORDER METHOD
    deleteOrder: (id) => API.delete(`/orders/admin/${id}`)
};