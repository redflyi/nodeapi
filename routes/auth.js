const express = require('express');
const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {userSignupValidator} = require('../validator');
const { param } = require('./post');

const router = express.Router();

//router.get('/', getPosts);
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

//Any route containing userId app will first execute user by Id method
router.param("userId", userById);

module.exports = router;