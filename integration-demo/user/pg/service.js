const UserRepository = require('./repository');

class UserService {
    constructor() {
        this.repository = new UserRepository();;
    }

    get(userId, callback) {
        this.repository.get(userId).then((res) => {
            callback(res.rows);
        });
    }

    save(user, callback) {
        this.repository.save(user).then((res) => {
            callback(res);
        });
    }

    delete(userId, callback) {
        return this.repository.delete(userId).then((res) => {
            callback(res);
        });
    }

    list(callback) {
        this.repository.list().then((res) => {
            callback(res.rows);
        });
    }

    async destroy() {
       this.repository.destroy();
    }
}

module.exports = UserService;
