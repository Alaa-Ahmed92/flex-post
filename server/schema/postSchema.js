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
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }],
    comments: [{
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
    }],
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
