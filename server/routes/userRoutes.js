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
    removeFollower,
    findPeople
} = require('../controllers/userController');
const { requireSignin } = require('../controllers/authController');

router.get('/users', requireSignin, getUsers);

router.get('/users/findPeople/:userId', requireSignin, findPeople);

router.param("userId", userById);

router.get("/user/:userId", requireSignin, getUser);

router.get("/user/photo/:userId", userPhoto);

router.put("/users/user/follow", requireSignin, addFollowing, addFollower);
router.put("/users/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

module.exports = router;