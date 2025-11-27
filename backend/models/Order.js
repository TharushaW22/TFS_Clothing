const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'Card'], required: true },
    status: { type: String, enum: ['Pending', 'Packed', 'Ready to Deliver', 'Delivered'], default: 'Pending' },
    trackingCode: String,  // Generated order code
    billing: {
        address: String,
        city: String,
        phone: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);