import pkg from 'jsonwebtoken';
const { verify: _verify } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const SK = process.env.JWT_SK;

const checkAuth = (req, res, next) => {
    try{
        const temp = (req.headers.authorization).split(' ')[1];
    
        const verify = _verify(temp, SK);
    
        req.verify = verify;

        next();
    }catch{
        res.status(401).json('UnAuthorized')
    }
}

export { checkAuth };