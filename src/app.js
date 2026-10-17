const express = require('express')
const app = express();
const auth = require('./routes/auth.route');
const post = require('./routes/post.route');

app.use(express.json());

app.use(auth);

app.use('/posts', post);

app.get('/health', (req, res)=>{
    res.json('Server is working');
});

module.exports = app;