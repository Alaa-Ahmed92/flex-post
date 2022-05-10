const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

module.exports = postSchema;
