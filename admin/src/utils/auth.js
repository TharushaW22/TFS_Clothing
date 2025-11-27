export const isAuthenticated = () => !!localStorage.getItem('token');
export const getToken = () => localStorage.getItem('token');