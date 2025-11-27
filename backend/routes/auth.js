const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController'); // ADD verifyToken
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', protect, verifyToken); // ADD THIS ROUTE

module.exports = router;