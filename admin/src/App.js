import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminOrders from './components/admin/AdminOrders';
import AdminProducts from './components/admin/AdminProducts';
import AdminContacts from './components/admin/AdminContacts';
import AdminSidebar from './components/admin/AdminSidebar';
import AdminHeader from './components/admin/AdminHeader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/login" replace />;
};

const AppContent = () => (
  <div style={{ display: 'flex' }}>
    <AdminSidebar />
    <div style={{ flex: 1, marginLeft: '280px' }}>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/contacts" element={<AdminContacts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>  {/* Removed basename="/admin" */}
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/*" element={<ProtectedRoute><AppContent /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
