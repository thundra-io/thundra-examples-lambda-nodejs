const pg = require('pg');
const config = require('./config');

class UserRepository {
    constructor() {
        this.init();
    }

    init() {
        if (!this.pool) {
            this.pool = new pg.Pool(config);
        }
    }

    get(userId) {
        return this.pool.query('SELECT * from users where id = ($1)', [userId]);
    }

    save(user) {
        return this.get(user.id).then((olduser) => {
            if (!olduser || olduser.length === 0) {
                return this.pool.query('INSERT INTO users(id, name, creationTime) values($1, $2, $3)', 
                [user.id, user.name, Date.now()]);
           } else {
                return this.pool.query('UPDATE users SET name=($1) WHERE id=($2)', 
                           [user.name, user.id]);
           }
        });
    }

    delete(userId) {
        return this.pool.query('DELETE FROM users WHERE id=($1)', [userId]);     
    }

    list() {
        return this.pool.query('SELECT * from users');
    }

    async destroy() {
        this.pool.end();
        this.poll = null;
    }
}

module.exports = UserRepository;