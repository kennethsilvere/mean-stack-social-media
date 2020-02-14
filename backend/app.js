const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');


const app = express();

mongoose.connect('mongodb+srv://ken:TtltLBJzkbMBXIB4@cluster0-pxzgs.mongodb.net/node-angular?retryWrites=true&w=majority')
        .then(() => console.log('Database connected!'))
        .catch(() => console.log('Database connection failed!'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
                  "Origin, Content-Type, X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Successfully retrieved posts.',
                posts: documents
            });
        })    
});

app.post('/api/posts', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
    const _id = req.params.id;
    Post.deleteOne({ _id }).then(() => {
        res.json({
            message: `Post ${ _id } deleted !`
        });
    });
});


module.exports = app;