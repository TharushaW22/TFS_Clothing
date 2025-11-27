import API from './api';

export const contactService = {
    getAllContacts: () => API.get('/contacts'),
    markAsRead: (id) => API.put(`/contacts/${id}/read`),
    deleteContact: (id) => API.delete(`/contacts/${id}`),
    createContact: (contactData) => API.post('/contacts', contactData)
};