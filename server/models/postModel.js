const mongoose = require('mongoose');
const postSchema = require('../schema/postSchema');

const Post = mongoose.model('post', postSchema);

module.exports = Post;