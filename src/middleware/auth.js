const jwt = require('jsonwebtoken');
require('dotenv').config();

const SK = process.env.JWT_SK;

const checkAuth = (req, res, next) => {
    try{
        const temp = (req.headers.authorization).split(' ')[1];
    
        const verify = jwt.verify(temp, SK);
    
        req.verify = verify;

        next();
    }catch{
        res.status(401).json('UnAuthorized')
    }
}

module.exports = checkAuth;