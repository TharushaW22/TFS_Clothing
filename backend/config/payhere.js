// PayHere Sandbox Integration
const PAYHERE_URL = 'https://sandbox.payhere.co/pay/checkout';
const MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const SECRET = process.env.PAYHERE_SECRET;

const initiatePayment = (orderDetails) => {
    const params = new URLSearchParams({
        merchant_id: MERCHANT_ID,
        return_url: 'http://localhost:3000/checkout/success',  // Frontend callback
        cancel_url: 'http://localhost:3000/checkout/cancel',
        notify_url: 'http://localhost:5000/api/orders/payhere-webhook',  // Backend webhook
        order_id: orderDetails.orderId,
        items: JSON.stringify(orderDetails.items),
        currency: 'LKR',  // Or USD
        amount: orderDetails.amount,
        hash: require('crypto').createHmac('sha256', SECRET)
            .update(`${MERCHANT_ID}|${orderDetails.orderId}|${orderDetails.amount}|${orderDetails.currency}|${orderDetails.items}`)
            .digest('hex')  // Simplified hash; check PayHere docs for exact
    });
    return `${PAYHERE_URL}?${params.toString()}`;
};

module.exports = { initiatePayment };