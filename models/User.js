const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('myDataBase.db');
const util = require('util');

//асинхронная версия db.run чтобы не использовать колбэки
const dbRunAsync = async function(...args) {
    return new Promise((resolve, reject) => {
        db.run(...args, function(err) {
            if (err) {
                reject(err);
            } else {
                //результат лежит в this (в доументации sqlite3)
                resolve(this);
            }
        });
    });
};

//асинхронные версии db чтобы не использовать колбэк
//в этих db функциях можно использовать promisify,
//т.к. результат будет входить вторым параметром, а не в this
const dbGetAsync = util.promisify(db.get.bind(db));
const dbAllAsync = util.promisify(db.all.bind(db));


db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.age = userData.age;
    }

    static async create(userData) {
        const {name = 'username', age = 0} = userData;
        const {lastID, changes} = await dbRunAsync(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age]);
        return new User({name, age, id: lastID});
    }

    static async findById(id) {
        const userData = await dbGetAsync(`SELECT * FROM users WHERE id = ?`, [id]);
        if (!userData) {
            return null;
        }
        return new User(userData);
    }

    static async delete(id) {
        const {changes} = await dbRunAsync(`DELETE FROM users WHERE id = ?`, [id]);
        return changes > 0;
    }

    static async updateById(id, userData) {
        const user = await User.findById(id);
        if (!user) {
            return null;
        }
        if (userData.age) {
            user.age = userData.age;
        }
        if (userData.name) {
            user.name = userData.name;
        }
        await dbRunAsync(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [user.name, user.age, user.id]);
        return user;
    }

    static async getUsersList() {
        const usersData = await dbAllAsync(`SELECT * FROM users`);
        return usersData.map(oneUserData => new User(oneUserData));
    }
}

module.exports = User;