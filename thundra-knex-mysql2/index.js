const thundra = require("@thundra/core")();

exports.handler = thundra((event, context, callback) => {
    const knex = require('knex')({
        client: 'mysql2',
        connection: {
            "host": "<Your DB HOST>",
            "user": "<Your DB USER>",
            "database": "<Your DB NAME>",
            "password": "<Your DB PASSWORD>",
        }
    });

    knex.schema
        .dropTableIfExists('accounts')
        .dropTableIfExists('users')
        .createTable('users', function(table) {
            table.increments('id');
            table.string('user_name');
        })
        .createTable('accounts', function(table) {
            table.increments('id');
            table.string('account_name');
            table
            .integer('user_id')
            .unsigned()
            .references('users.id');
        })
        .then(function() {
            return knex('users').insert({ user_name: 'Tim' });
        })
        .then(function(rows) {
            return knex('accounts').insert({ account_name: 'knex', user_id: rows[0] });
        })
        .then(function() {
            return knex('users')
            .join('accounts', 'users.id', 'accounts.user_id')
            .select('users.user_name as user', 'accounts.account_name as account');
        })
        .map(function(row) {
            knex.destroy();
            callback(null, row);
        })
        .catch(function(e) {
            knex.destroy();
            callback(e);
        });
});
