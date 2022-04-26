const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
require('dotenv').config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: "Email is taken!"
        })
    };
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup Successfully! Please go to login." });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // If err or no user
        if (err || !user) {
            return res.status(400).json({
                error: "There is no user with that email! Please go to signup."
            })
        };
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticated(password)) {
            return res.status(400).json({
                error: "The email and password do not match."
            })
        };
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expires: new Date(Date.now() + 900000) });
        // return response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email }, message: 'You Have Successfully Logged in!' });

    })
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.status(200).json({
        message: "You are logged out successfully."
    })
};

exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})