const express = require('express');
const router = express.Router();
const {
    getUsers,
    userById,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower
} = require('../controllers/userController');
const { requireSignin } = require('../controllers/authController');

router.get('/users', requireSignin, getUsers);

router.param("userId", userById);

router.get("/user/:userId", requireSignin, getUser);

router.get("/user/photo/:userId", userPhoto);

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

module.exports = router;