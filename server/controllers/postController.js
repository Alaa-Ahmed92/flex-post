const Post = require('../models/postModel');
// The formidable will allow the server to read the multipart form data and give us access to the fields and the file, if there are any.
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash'); // module to extend and merge the changes that came in the request body to update the data.


// method to fetch a specific post by its ID
exports.postById = async (req, res, next, id) => {
    await Post.findById(id)
        .populate('postedBy', '_id name photo')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: 'Could not retrieve use post'
                })
            }
            req.post = post;
            next();
        })

}

exports.getPosts = async (req, res) => {
    await Post.find({})
        .select('_id title body createdAt')
        .populate('postedBy', '_id name')
        .sort([['createdAt', -1]])
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => console.log(err))
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        };
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.filepath);
            post.photo.contentType = files.photo.type
        };
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result);
        });
    });
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({ message: 'Post deleted successfully!' })
    });
}

exports.postsByUser = async (req, res) => {
    await Post.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name photo')
        .sort('_createdAt')
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts);
        })
}

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if (!isPoster) {
        return res.status('400').json({
            message: 'User not authorized to perform this action.'
        })
    }
    next()
};

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updatedAt = Date.now();
    post.save((err) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action.'
            })
        }
        return res.status(200).json({ post })
    })
};