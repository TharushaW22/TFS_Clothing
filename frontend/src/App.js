import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// User Pages
import Home from './pages/user/Home';
import Shop from './pages/user/Shop';
import ProductDetailPage from './pages/user/ProductDetailPage';
import CartPage from './pages/user/CartPage';
import Checkout from './pages/user/Checkout';
import UserDashboard from './pages/user/UserDashboard';
import OrderTracking from './pages/user/OrderTracking';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './pages/user/About';
import Contact from './pages/user/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContacts from './pages/admin/AdminContacts';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// ======================
// 404 Page Component
// ======================
const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '100px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const appStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={appStyles}>
            <Routes>
              {/* ====================== */}
              {/* User Routes */}
              {/* ====================== */}
              <Route path="/" element={<><Header /><Home /><Footer /></>} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/shop" element={<><Header /><Shop /><Footer /></>} />
              <Route path="/product/:id" element={<><Header /><ProductDetailPage /><Footer /></>} />
              <Route path="/cart" element={<><Header /><CartPage /><Footer /></>} />
              <Route path="/checkout" element={<><Header /><Checkout /><Footer /></>} />
              <Route path="/dashboard" element={<><Header /><UserDashboard /><Footer /></>} />
              <Route path="/tracking/:orderId" element={<><Header /><OrderTracking /><Footer /></>} />
              <Route path="/about" element={<><Header /><About /><Footer /></>} />
              <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ====================== */}
              {/* Admin Routes */}
              {/* ====================== */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/contacts" element={<AdminContacts />} />

              {/* ====================== */}
              {/* Catch-all 404 */}
              {/* ====================== */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
