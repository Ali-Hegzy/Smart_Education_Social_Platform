const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const User = require("../Models/User");
require("dotenv").config();

const SK = process.env.JWT_SK;

function login(req, res) {
    try {
        const user = User.select()
            .where("email", "=", req.body.email)
            .get(1)[0];

        if (!user) {
            return res.json({ message: "Email or password is incorrect" });
        }

        const isMatch = bycrypt.compareSync(req.body.password, user.password);

        if (!isMatch) {
            return res.json({ message: "Email or password is incorrect" });
        }

        const payload = {
            id: user.id,
            email: req.body.email,
        };

        const token = jwt.sign(payload, SK, { expiresIn: "2h" });

        return res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Something wrong happened" });
    }
}

function register(req, res) {
    const { name, email, password } = req.body;

    let bPass = bycrypt.hashSync(password, 10);

    const { lastInsertRowid } = User.create({ name, email, password: bPass });

    const payload = {
        id: lastInsertRowid,
        email: email,
    };

    const token = jwt.sign(payload, SK, { expiresIn: "2h" });

    res.json(token);
}

module.exports = { login, register };
