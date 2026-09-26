const express = require('express')
const app = express();
const auth = require('./routes/auth.route');

app.use(express.json());

app.use(auth);

app.get('/health', (req, res)=>{
    res.json('Server is working');
});

module.exports = app;