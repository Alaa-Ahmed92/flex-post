const mongoose = require('mongoose');
const messageSchema = require('../../schema/chat/messageSchema');

const Message = mongoose.model('message', messageSchema);

module.exports = Message;