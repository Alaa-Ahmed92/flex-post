const express = require('express');
const router = express.Router();
const {
    newConv,
    getConv
} = require('../../controllers/chat/conversationController');
const { requireSignin } = require('../../controllers/authController');

// New Conversation
router.post('/conversation', requireSignin, newConv);
// Get Conversation
router.get('/conversations/:userId', requireSignin, getConv);

module.exports = router;