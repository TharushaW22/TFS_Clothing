const express = require('express');
const { 
    createContact, 
    getContacts, 
    markRead, 
    deleteContact, 
    replyContact 
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, admin, getContacts);
router.put('/:id/read', protect, admin, markRead);
router.delete('/:id', protect, admin, deleteContact);
router.post('/:id/reply', protect, admin, replyContact);

module.exports = router;