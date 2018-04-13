const thundra = require('@thundra/core')();
const express = require('express');
const slsHttp = require('serverless-http');

const app = express();
const proxy = slsHttp(app, { callbackWaitsForEmptyEventLoop: false });

app.get('/', (req, res) => {
    res.json({ success: true , msg: "Hello"});
});

exports.handler = thundra(proxy);
