const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://ken:TtltLBJzkbMBXIB4@cluster0-pxzgs.mongodb.net/node-angular?retryWrites=true&w=majority')
        .then(() => console.log('Database connected!'))
        .catch(() => console.log('Database connection failed!'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
                  "Origin, Content-Type, X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/posts', postRoutes);

module.exports = app;