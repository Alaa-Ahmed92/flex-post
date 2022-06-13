const Message = require('../../models/chat/messageModal');

// New Message
exports.newMessage = async (req, res) => {
    const newMsg = new Message({
        conversationId: req.body.conversationId,
        senderId: req.body.senderId,
        text: req.body.text
    });
    await newMsg.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.send({
            result,
            message: 'the newMsg has been saved'
        });
    });
};

// Get Message
exports.getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
};