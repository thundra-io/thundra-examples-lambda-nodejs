const tableName = '<Enter your DynamoDB table name>';
var datetime = new Date().getTime().toString();
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

var addHero = function (event) {
    return new Promise(function (resolve, reject) {

        var params = {
            "TableName": tableName,
            "Item": {
                "hero": { S: event.hero },
                "timedate": { N: datetime }
            }
        }
        dynamodb.putItem(params, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
}

var getHero = function (event) {
    return new Promise(function (resolve, reject) {

        var params = {
            "TableName": tableName
        }
        dynamodb.scan(params, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
}

module.exports = {
    getHero,
    addHero
}