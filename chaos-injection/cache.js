const redis = require('redis');
const config = require('./config');

class CacheService {
    constructor() {
        this.redisClient;
    };

    initRedisClient() {
        return new Promise((resolve, reject) => {
                this.redisClient = redis.createClient(config.redis);
                return resolve();
            }).catch((err) => {
                reject(err);
            });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.initRedisClient().then(() => {
                this.redisClient.get(key, (err, result) => {
                    if(err) {
                        reject(err);
                        return;
                    } else {
                        resolve(result);
                    }
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            this.initRedisClient().then(() => {
                this.redisClient.set(key, value, (err, result) => {
                    if(err) {
                        reject(err);
                        return;
                    } else {
                        resolve(result);
                    }
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    destroy() {
        this.redisClient.quit();
    }
}

module.exports = CacheService;