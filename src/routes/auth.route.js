const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const checkAuth = require('../middleware/auth');
require('dotenv').config();


router.post('/login', checkAuth, (req, res) => {
    const stmt = db.prepare(`
            SELECT name FROM users WHERE id = ?
        `);
    const {name} = stmt.get(req.verify.id);

    res.json(`Hello ${name}`);
});

router.post('/register', (req, res) => {
    const SK = process.env.JWT_SK;
    const {name, email, password} = req.body;

    let bPass = bycrypt.hashSync(password, 10);

    const stmt = db.prepare(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`);

    const {lastInsertRowid} = stmt.run(name, email, bPass);

    const payload = {
        id : lastInsertRowid,
        email : email,
    }

    const token = jwt.sign(payload, SK, {expiresIn: '2h'});

    res.json(token);
});


module.exports = router;