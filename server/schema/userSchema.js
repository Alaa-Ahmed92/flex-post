const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    nickname: {
        type: String,
        trim: true
    },
    job: {
        type: String,
        trim: true
    },
    hometown: {
        type: String,
        trim: true
    },
    currentCity: {
        type: String,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }],
    followers: [{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }]
});

userSchema.virtual('password')
    .set(function (password) {
        // Create temporary variable called _password
        this._password = password;
        // Generate a timestamp
        this.salt = uuidv4();

        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticated: function (password) {
        return this.encryptPassword(password) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return;
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return err;
        }
    }
};

module.exports = userSchema;
