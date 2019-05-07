const thundra = require("@thundra/core")();

exports.handler = thundra((event, context, callback) => {
    callback(null, {msg: event.msg});
});
