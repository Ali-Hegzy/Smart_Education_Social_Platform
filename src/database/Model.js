class Model {
    static table = "";
    static db = require("../config/db");
    static stmt = "";
    static prepares = [];
    static wheres = [];

    static find(id) {
        const stmt = this.db.prepare(
            `SELECT * FROM ${this.table} WHERE id = ?;`,
        );
        const result = stmt.get(id);

        return result;
    }

    static where(first, operator, second) {
        this.wheres.push(`${first} ${operator} ?`);
        this.prepares.push(second);

        return this;
    }

    static select() {
        this.stmt = this.stmt.concat(`SELECT * FROM ${this.table}`);

        return this;
    }

    static get(limit) {
        const whereVars = this.wheres.join(" AND ");

        if (whereVars)
            this.stmt = this.stmt.concat(" ", "WHERE ").concat(whereVars);

        this.stmt = this.stmt.concat(" ", `LIMIT ${limit};`);

        const temp = this.db.prepare(this.stmt);
        const res = temp.all(this.prepares);

        this.prepares = [];
        this.wheres = [];

        return res;
    }

    static all() {
        const whereVars = this.wheres.join(" AND ");

        if (whereVars)
            this.stmt = this.stmt.concat(" ", "WHERE ").concat(whereVars);

        this.stmt = this.stmt.concat(`;`);

        const temp = this.db.prepare(this.stmt);
        const result = temp.all(this.prepares);

        this.prepares = [];
        this.wheres = [];

        return result;
    }

    static create(data) {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => "?").join(", ");

        this.prepares.push(...Object.values(data));

        this.stmt = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders});`;

        const temp = this.db.prepare(this.stmt);
        const result = temp.run(this.prepares);

        this.prepares = [];

        return result;
    }

    static update(id, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        this.prepares.push(...values, id);

        this.stmt = `UPDATE ${this.table} SET ${keys.map((e) => `${e} = ?`).join(", ")} WHERE id = ?`;

        const temp = this.db.prepare(this.stmt);
        const result = temp.run(this.prepares);

        this.prepares = [];

        return result;
    }

    static delete(id) {
        this.prepares.push(id);

        this.stmt = `DELETE FROM ${this.table} WHERE id = ?`;

        const temp = this.db.prepare(this.stmt);
        const result = temp.run(this.prepares);

        this.prepares = [];

        return result;
    }
}

module.exports = Model;
