import api from './api';

export const contactService = {
    getAllContacts: () => api.get('/contacts'),
    markAsRead: (id) => api.put(`/contacts/${id}/read`),
    deleteContact: (id) => api.delete(`/contacts/${id}`),
};