const thundra = require("@thundra/core");

const thundraWrapper = thundra({
    traceConfig: {
        traceableConfigs: [{
            pattern: 'user.pg.*',
            traceArgs: true,
            traceReturnValue: true,
            traceError: true,
        }],
        integrations:['http', 'pg'],
    },
});

const baseUrl = 'http://jsonplaceholder.typicode.com/users/';
const http = require('http');
const UserService = require('./user/pg/service');

exports.handler = thundraWrapper((event, context, callback) => {
    const userService = new UserService();

    userService.get(event.id, (res) => {
        if (res.length === 0) {
            callback(null, {
                'statusCode': 404,
                "body": null
            }); 
        } else {
            http.get(baseUrl + res[0].id, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    callback(null, {
                        'statusCode': 200,
                        "body": JSON.stringify(data)
                    });
                });
            }).on("error", (err) => {
                callback(null, err);
            });        
        }
        userService.destroy();
    });
});
