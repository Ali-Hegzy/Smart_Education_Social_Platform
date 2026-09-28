const Model = require("../database/Model");

class User extends Model{
    static table = 'users';
}

module.exports = User;