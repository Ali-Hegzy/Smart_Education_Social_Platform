const Model = require("../database/Model");

class Post extends Model{
    static table = 'posts';
}

module.exports = Post;