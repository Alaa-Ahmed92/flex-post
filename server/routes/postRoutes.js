const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    deletePost,
    updatePost,
    postPhoto,
    likePost,
    unLikePost,
    addComment,
    turnOffComments
} = require('../controllers/postController');
const { requireSignin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');
const { createPostValidator } = require('../validators/postValidator');

// All Posts
router.get('/posts', getPosts);

// Add Post
router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);

// Posts by User
router.get('/posts/by/:userId', requireSignin, postsByUser);

// Delete Post
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

// Update Post
router.put("/post/:postId", requireSignin, isPoster, updatePost);

// User Id
router.param("userId", userById);

// Post Id
router.param("postId", postById);

// Post Photo
router.get("/post/photo/:postId", postPhoto);

// Like Post
router.put("/posts/post/like", requireSignin, likePost);

// Unlike Post
router.put("/posts/post/unlike", requireSignin, unLikePost);

// Add Comment
router.put("/posts/post/new/comment", requireSignin, addComment);

// Turn Off Comments
router.put("/posts/post/:postId", requireSignin, isPoster, turnOffComments);

module.exports = router;