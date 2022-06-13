const express = require('express');
const router = express.Router();
const {
    newMessage,
    getMessage
} = require('../../controllers/chat/messageController');
const { requireSignin } = require('../../controllers/authController');

// New Message
router.post('/message', requireSignin, newMessage);

// Get Message
router.get('/message/:conversationId', requireSignin, getMessage);

module.exports = router;