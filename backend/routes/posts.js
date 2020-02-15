const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Successfully retrieved posts.',
                posts: documents
            });
        })    
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then((post) => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Post not found!'
            });
        }
    })
});

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(savedPost => {
            res.status(201).json({
                message: 'Successfully added posts.',
                postId: savedPost._id
            });            
        });
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
        .then(response => {
            console.log(response);
            res.status(200).json({
                message: 'Update successful!'
            });
        })
});

router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;
    Post.deleteOne({ _id }).then(() => {
        res.json({
            message: `Post ${ _id } deleted !`
        });
    });
});

module.exports = router;