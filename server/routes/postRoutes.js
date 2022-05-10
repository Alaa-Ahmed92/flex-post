const express = require('express');
const router = express.Router();
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost, postPhoto } = require('../controllers/postController');
const { requireSignin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');
const { createPostValidator } = require('../validators/postValidator');

router.get('/posts', getPosts);

router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);

router.get('/posts/by/:userId', requireSignin, postsByUser);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);

router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.param("userId", userById);

router.param("postId", postById);

router.get("/post/photo/:postId", postPhoto);

module.exports = router;