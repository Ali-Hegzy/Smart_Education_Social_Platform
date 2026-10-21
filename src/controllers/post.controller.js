import Post from "../Models/Post.js";

function index(req, res) {
    const posts = Post.select().all();

    return res.json(...posts);
}

function store(req, res) {
    const post_body = {
        user_id : req.verify.id,
        ...req.body,
    };
    
    const post = Post.create(post_body);

    return res.json({ message: "Post created successfully", info: post });
}

export { index, store };
