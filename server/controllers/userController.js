const User = require('../models/userModel');
const _ = require('lodash'); // module to extend and merge the changes that came in the request body to update the data.
// The formidable will allow the server to read the multipart form data and give us access to the fields and the file, if there are any.
const formidable = require('formidable');
const fs = require('fs');


exports.userById = (req, res, next, id) => {
    User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    message: "User not found."
                })
            };
            req.profile = user;
            next();
        })
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized) {
        return res.status(400).json({
            message: "User not authorized to perform this action."
        })
    };
    next();
};

exports.getUsers = async (req, res) => {
    const users = await User.find().select('_id name email updatedAt createdAt');
    res.send(users);
};

exports.getUser = async (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.profile.__v = undefined;
    return await res.status(200).json(req.profile);
};

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        };
        let user = req.profile;
        user = _.extend(user, fields);
        user.updatedAt = Date.now();
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.filepath);
            user.photo.contentType = files.photo.type
        };

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            };
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
    });
}

exports.deleteUser = (req, res) => {
    const user = req.profile;
    user.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action.'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        user.__v = undefined;
        return res.status(200).json({ message: 'User deleted successfully!' })
    });
};

exports.userPhoto = (req, res, next) => {
    const user = req.profile;
    if (user.photo.data) {
        res.set("Content-Type", user.photo.contentType);
        return res.send(user.photo.data);
    };
    next();
};

exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.id,
        { $push: { following: req.body.followId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action.'
                })
            }
            next();
        })
};

exports.addFollower = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.id } },
        { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action.'
                })
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            result.__v = undefined;
            res.json(result);
        });
};

exports.removeFollowing = (req, res, next) => {

    User.findByIdAndUpdate(
        req.body.id,
        { $pull: { following: req.body.unfollowId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action.'
                })
            }
            next();
        })

};

exports.removeFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.body.id } },
        { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action.'
                })
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            result.__v = undefined;
            res.json(result);
        });
};

exports.findPeople = (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    User.find({ _id: { $nin: following } }, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action.'
            })
        }
        res.json(result);
    }).select('name')
};