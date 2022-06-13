const mongoose = require('mongoose');
const conversationSchema = require('../../schema/chat/conversationSchema');

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;