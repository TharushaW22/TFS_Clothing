const express = require('express');
const {
    createOrder,
    getUserOrders,
    updateOrderStatus,
    generateQR,
    getAllOrders,
    generateOrderSticker,
    deleteOrder // ADD THIS
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/qr/:trackingCode', generateQR);

// Admin routes
router.get('/admin/all', protect, admin, getAllOrders);
router.put('/admin/:id/status', protect, admin, updateOrderStatus);
router.get('/sticker/:id', protect, admin, generateOrderSticker);
// ADD DELETE ROUTE
router.delete('/admin/:id', protect, admin, deleteOrder);

// PayHere webhook
router.post('/payhere-webhook', (req, res) => {
    console.log('Payment callback:', req.body);
    if (req.body.status_code === '2') {
        // Update order status to Paid
    }
    res.send('OK');
});

module.exports = router;