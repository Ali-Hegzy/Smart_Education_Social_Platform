import Model from "../database/Model.js";

class User extends Model{
    static table = 'users';
}

export default User;