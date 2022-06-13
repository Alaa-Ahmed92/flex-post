const Conversation = require('../../models/chat/conversationModal');

// New Conversation
exports.newConv = async (req, res) => {
    const convExists = await Conversation.find({
        members: {
            $all: [req.body.senderId, req.body.receiverId]
        }
    });
    if (convExists && convExists.length !== 0) {
        return res.status(403).json({
            error: "Conv is taken!"
        })
    };
    let newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConv = await newConversation.save();
        res.status(200).json(savedConv);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get Conversation
exports.getConv = async (req, res) => {
    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
        res.status(200).json(conversation);
    } catch (err) {
        res.status(400).json(err);
    }
};