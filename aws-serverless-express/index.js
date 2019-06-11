'use strict'
const thundra = require('@thundra/core')({});

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

const expressProxy = (event, context) => { 
    awsServerlessExpress.proxy(server, event, context);
}

exports.handler = thundra(expressProxy);