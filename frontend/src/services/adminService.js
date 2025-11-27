import API from './api';

export const adminService = {
    getDashboardStats: () => API.get('/admin/dashboard/stats'),
    getAllOrders: () => API.get('/admin/orders'),
    getAllContacts: () => API.get('/admin/contacts'),
    getSalesAnalytics: () => API.get('/admin/analytics/sales'),
    getTopProducts: () => API.get('/admin/analytics/top-products'),
    getRecentActivity: () => API.get('/admin/analytics/recent-activity')
};