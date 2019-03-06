const thundra = require("@thundra/core");
const config = require('./config');

const thundraWrapper = thundra({
    apiKey: config.thundra.api_key
});

const AWS = require('aws-sdk');

// Enable following commented out lines to
// programmatically add span listeners

/////////////////////////////////////////////////////////////////////////////////

// const FilteringSpanListener = thundra.listeners.FilteringSpanListener;
// const LatencyInjectorSpanListener = thundra.listeners.LatencyInjectorSpanListener;
// const StandardSpanFilterer = thundra.listeners.StandardSpanFilterer;
// const SpanFilter = thundra.listeners.SpanFilter;

// const filteringListener = new FilteringSpanListener();
// const filter = new SpanFilter();
// filter.className = 'AWS-Lambdas';
// filter.tags = {
//    'aws.lambda.name': 'upstream-lambdas'
// }

// const filterer = new StandardSpanFilterer([filter]);

// const latencyInjectorSpanListenerConfig = {
//     delay: 5000,
//     injectOnFinish: true
// };

// const latencyInjectorSpanListener = new LatencyInjectorSpanListener(latencyInjectorSpanListenerConfig);
// filteringListener.listener = latencyInjectorSpanListener;
// filteringListener.spanFilterer = filterer;

// thundra.tracer().addSpanListener(filteringListener);

/////////////////////////////////////////////////////////////////////////////////

exports.handler = thundraWrapper((event, context, callback) => {
    AWS.config.update({ region: 'us-west-2' });
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: 'upstream-lambda',
        InvocationType: 'RequestResponse',
        Payload: '{ "name" : "thundra" }'
    };

    lambda.invoke(params, function (err, data) {
        if (err) {
            callback(null, {
                'statusCode': 500,
                "body": null
            }); 
            return;
        }

        callback(null, {
            'statusCode': 200,
            "body": data
        }); 
    });
});
