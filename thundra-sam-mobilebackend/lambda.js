const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

const expressProxy = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    awsServerlessExpress.proxy(server, event, context, 'CALLBACK', callback); 
};

exports.handler = expressProxy;
