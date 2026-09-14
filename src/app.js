const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './resources/views');
app.use(express.json());
app.use(express.static('public'));


module.exports = app;