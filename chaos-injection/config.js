// Change configuration options with your own values
const config = {
    redis: {
        host: "redis_host",
        port: "redis_port",
    },
    postgresql: {
        host: 'postgresql_host',
        database: 'postgresql_db_name',
        user: 'postgresql_user_name',
        password: 'postgresql_password',
        port: 5432,
    },
    thundra: {
        api_key: "thundra_api_key"
    }
};
module.exports = config;