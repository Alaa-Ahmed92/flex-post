const Post = require('../models/postModel');
// The formidable will allow the server to read the multipart form data and give us access to the fields and the file, if there are any.
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash'); // module to extend and merge the changes that came in the request body to update the data.


// method to fetch a specific post by its ID
exports.postById = (req, res, next, id) => {
    Post.findById(id)
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
        .select('_id photo body createdAt')
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
            console.log(result);
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
        return res.status(200).json({ post, message: 'Post deleted successfully!' })
    });
}

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name photo')
        .sort([['createdAt', -1]])
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
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        };
        let post = req.post;
        post = _.extend(post, fields);
        post.updatedAt = Date.now();
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
            res.json(post);
        });
    });
};

exports.postPhoto = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

// Like Post
exports.like = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );
};

// Unlike Post
exports.unLikePost = (req, res, next) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.body.userId } },
        { new: true })
        // .populate('likes', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'No access.'
                })
            }
            res.json(result);
        });
};