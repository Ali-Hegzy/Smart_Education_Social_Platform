const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const checkAuth = require('../middleware/auth');
const User = require('../Models/User');
require('dotenv').config();

router.post('/login', checkAuth, (req, res) => {
    const {name} = User.find(req.verify.id);

    res.json(`Hello ${name}`);
});

router.post('/register', (req, res) => {
    const SK = process.env.JWT_SK;
    const {name, email, password} = req.body;

    let bPass = bycrypt.hashSync(password, 10);

    const {lastInsertRowid} = User.create({name, email, password : bPass});

    const payload = {
        id : lastInsertRowid,
        email : email,
    }

    const token = jwt.sign(payload, SK, {expiresIn: '2h'});

    res.json(token);
});


module.exports = router;