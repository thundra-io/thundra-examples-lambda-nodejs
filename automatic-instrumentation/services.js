const tableName = 'Avengers';
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

const getHero = function () {
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
};

module.exports = {
    getHero,
    addHero
}