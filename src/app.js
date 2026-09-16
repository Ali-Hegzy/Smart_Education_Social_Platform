const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'./resources/views'));
app.use(express.json());
app.use(express.static(path.join(__dirname ,'../public')));

app.get('/', (req, res)=>{
    res.render('index');
});

module.exports = app;