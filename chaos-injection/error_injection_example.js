const thundra = require("@thundra/core");
const config = require('./config');

const thundraWrapper = thundra({
    apiKey: config.thundra.api_key
});

//Enable following commented out lines to
//programmatically add span listeners

/////////////////////////////////////////////////////////////////////////////////

// const FilteringSpanListener = thundra.listeners.FilteringSpanListener;
// const ErrorInjectorSpanListener = thundra.listeners.ErrorInjectorSpanListener;
// const StandardSpanFilterer = thundra.listeners.StandardSpanFilterer;
// const SpanFilter = thundra.listeners.SpanFilter;

// const filteringListener = new FilteringSpanListener();
// const filter = new SpanFilter();
// filter.className = 'Redis';
// filter.tags = {
//     'redis.command' : 'GET'
// };

// const filterer = new StandardSpanFilterer([filter]);

// const errorInjectorListenerConfig = {
//     injectCountFreq:1 ,
//     errorType: 'RedisError',
//     errorMessage: 'Kaboom!!! Redis crashed.',
//     injectOnFinish: true
// };

// const errorInjectorListener = new ErrorInjectorSpanListener(errorInjectorListenerConfig);
// filteringListener.listener = errorInjectorListener;
// filteringListener.spanFilterer = filterer;

// thundra.tracer().addSpanListener(filteringListener);

/////////////////////////////////////////////////////////////////////////////////

const UserService = require('./service');
const CacheService = require('./cache');

exports.handler = thundraWrapper((event, context, callback) => {
    const userService = new UserService();
    const cacheService = new CacheService();

    cacheService.get(event.id).then((data) => {
        userService.get(event.id, (res) => {
            if (res.length === 0) {
                callback(null, {
                    'statusCode': 404,
                    "body": null
                }); 
            } else {
                callback(null, {
                    'statusCode': 200,
                    "body": res
                }); 
            }

            userService.destroy();
            cacheService.destroy();
        });
    });
    // There should be catch statement here to handle the error case
    // Lambda times out because we did not handle the error properly
});
