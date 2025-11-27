const Order = require('../models/Order');
const { initiatePayment } = require('../config/payhere');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, user: req.user.id });
        await order.save();
        const trackingCode = `ORD-${order._id.toString().slice(-6)}`;
        order.trackingCode = trackingCode;
        await order.save();

        // Simulate SMS
        console.log(`SMS sent to ${order.billing.phone}: Order ${trackingCode}`);

        if (req.body.paymentMethod === 'Card') {
            const payUrl = initiatePayment({
                orderId: order._id.toString(),
                amount: order.totalAmount,
                currency: 'LKR',
                items: order.items
            });
            res.json({ payUrl });
        } else {
            res.json({ msg: 'COD Order Confirmed', trackingCode });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name images price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        console.log('Fetching orders for user ID:', req.user.id);
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// QR for admin download (base64 for now)
const generateQR = async (req, res) => {
    try {
        const qr = await QRCode.toDataURL(req.params.trackingCode);
        res.json({ qr });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate Printable Sticker
const generateOrderSticker = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('items.product', 'name sku');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create PDF
        const doc = new PDFDocument({
            size: [400, 300], // Small sticker size
            margins: { top: 10, left: 10, right: 10, bottom: 10 }
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=order-sticker-${order.trackingCode}.pdf`);

        // Pipe PDF to response
        doc.pipe(res);

        // Generate QR Code
        const qrCodeData = JSON.stringify({
            orderId: order._id,
            trackingCode: order.trackingCode,
            customer: order.user.name,
            total: order.totalAmount
        });

        const qrCodeImage = await QRCode.toBuffer(qrCodeData, {
            width: 80,
            height: 80,
            margin: 1
        });

        // Sticker Design
        doc.rect(0, 0, 400, 300)
            .fillColor('#f8f9fa')
            .fill();

        // Header
        doc.fillColor('#2c3e50')
            .fontSize(16)
            .font('Helvetica-Bold')
            .text('ORDER DELIVERY', 20, 20);

        // QR Code
        doc.image(qrCodeImage, 280, 15, { width: 80, height: 80 });

        // Order Details
        doc.fillColor('#34495e')
            .fontSize(10)
            .font('Helvetica')
            .text(`Order ID: ${order.trackingCode}`, 20, 50)
            .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 65);

        // Customer Info
        doc.font('Helvetica-Bold')
            .text('SHIP TO:', 20, 90)
            .font('Helvetica')
            .text(order.user.name, 20, 105)
            .text(order.billing.address, 20, 120)
            .text(`${order.billing.city}, ${order.billing.postalCode}`, 20, 135)
            .text(`Phone: ${order.billing.phone}`, 20, 150);

        // Items
        doc.font('Helvetica-Bold')
            .text('ITEMS:', 20, 175)
            .font('Helvetica');

        let itemY = 190;
        order.items.forEach((item, index) => {
            if (index < 3) { // Show only first 3 items
                doc.text(`${item.product.name} x${item.quantity}`, 20, itemY);
                itemY += 15;
            }
        });

        if (order.items.length > 3) {
            doc.text(`+${order.items.length - 3} more items...`, 20, itemY);
        }

        // Footer
        doc.rect(0, 250, 400, 50)
            .fillColor('#3498db')
            .fill();

        doc.fillColor('white')
            .fontSize(12)
            .font('Helvetica-Bold')
            .text('HANDLE WITH CARE', 150, 265)
            .fontSize(8)
            .text('Scan QR code for details', 150, 280);

        doc.end();

    } catch (error) {
        console.error('Error generating sticker:', error);
        res.status(500).json({ message: 'Error generating order sticker' });
    }
};

// ADD DELETE ORDER FUNCTION
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ 
            message: 'Order deleted successfully',
            deletedOrder: {
                id: order._id,
                trackingCode: order.trackingCode
            }
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    updateOrderStatus,
    generateQR,
    getAllOrders,
    generateOrderSticker,
    deleteOrder // ADD THIS
};