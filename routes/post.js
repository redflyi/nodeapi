const express = require('express');
const {getPosts, createPosts, postsByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');
const {requireSignin} = require('../controllers/auth');

const router = express.Router();

router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPosts, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

//Any route containing userId app will first execute user by Id method
router.param("userId", userById);

//Any route containing userId app will first execute post by Id method
router.param("postId", postById);


module.exports = router;