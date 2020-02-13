const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const posts  = [
        {
            id: 'd32r43r3r',
            title: 'First post',
            content: 'Content of first post'
        },
        {
            id: 'd243t5233e2',
            title: 'Second post',
            content: 'Content of second post'
        }
    ];

    res.status(200).json({
        message: 'Successfully retrieved posts.',
        posts
    });
});

app.post('/api/posts', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Successfully added posts.'
    });
});


module.exports = app;