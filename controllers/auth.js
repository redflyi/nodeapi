const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');


exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists)
    return res.status(403).json({
        error: "Email is already in use"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup Success"});
};

exports.signin = (req, res) => {
    //find user based on email
const {email, password} = req.body
User.findOne({email}, (err, user) => {
    if(err || !user)
    {
        return res.status(401).json({
            error: "User with that email does not exist, please register"
        });
    }

    //if user is found make sure email and password match
    //create auth method in model and use here
    if(!user.authenticate(password)){
        return res.status(401).json({
            error: "Email and password do not match"
        });
    }

    //generate token
    const token  = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    //persist token in cookie
    
    res.cookie("t", token, { expire: new Date()+ 9999});

    //return response of user/token to front end client
    const {_id, name, email} = user;
    return res.json({token, user:{_id, email, name}});
});


};

exports.signout = (req, res) => {
    
    res.clearCookie("tkn");
    return res.json({
        message: "signout success"
    });

};

exports.requireSignin = expressJwt({

    //If token is valid then express jwt opens the verified user ID in an auth key to the req obj
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
});