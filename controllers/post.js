const Post = require('../models/post');

exports.getPosts = (req, res) => {
const posts = Post.find().select('_id title body')
.then((posts) => {
    res.json({posts});
})
.catch(err => console.log(err));
    };

    exports.createPosts = (req, res) => {
        const post = new Post(req.body);
        //console.log("Creating Post:", req.body);
        // post.save((err, result) => {
        //     if(err) {
        //         return res.status(400).json({
        //             error: err
        //         });
        //     }
        //     res.status(200).json({
        //         post:result
        //     });
        // });

        post.save().then(result => {
            res.json({
                post:result
            });
        });
    };