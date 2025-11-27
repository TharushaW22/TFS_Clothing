const sendSMS = (phone, message) => {
    console.log(`[SMS SIM] To ${phone}: ${message}`);
    // Later: twilio.client.messages.create({ to: phone, from: '+', body: message })
};

module.exports = sendSMS;