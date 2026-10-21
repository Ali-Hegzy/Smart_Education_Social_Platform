import express, { json } from 'express';
const app = express();
import auth from './routes/auth.route.js';
import post from './routes/post.route.js';

app.use(json());

app.use(auth);

app.use('/posts', post);

app.get('/health', (req, res)=>{
    res.json('Server is working');
});

export default app;