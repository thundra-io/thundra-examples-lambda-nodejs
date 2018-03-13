const thundra = require("@thundra/core")({
    apiKey: process.env.thundra_apiKey
});

exports.handler = thundra((event, context, callback) => {
    callback(null, {msg: "Hello Thundra"});
});