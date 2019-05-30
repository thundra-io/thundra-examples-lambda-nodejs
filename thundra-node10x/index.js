const thundra = require("@thundra")();

const async_hooks = require('async_hooks');

exports.handler = thundra((event, context, callback) => {
    var trackedResources = {};

    //Register to async hooks API
    const asyncHook = async_hooks.createHook({
        init: (asyncId, type, triggerAsyncId, resource) => {
            // Right now we are interested only with promise and timeout resources.
            if (type === 'Timeout' || type === 'PROMISE') {
                const resourceInfo = {
                    asyncId,
                    type,
                    triggerAsyncId,
                    resource
                };
        
                trackedResources[asyncId] = resourceInfo;
                logEvent('init', resourceInfo);
            }
        },
        before: (asyncId)  => {
            const resourceInfo = trackedResources[asyncId];
            if (resourceInfo) logEvent('before', resourceInfo);
        },
        after: (asyncId)  => {
            const resourceInfo = trackedResources[asyncId];
            if (resourceInfo) logEvent('after', resourceInfo);
        },
        destroy: (asyncId)  => {
            const resourceInfo = trackedResources[asyncId]
            if (resourceInfo) logEvent('destroy', resourceInfo);
            delete trackedResources[asyncId];
        },
        promiseResolve: (asyncId)  => {
            const resourceInfo = trackedResources[asyncId];
            if (resourceInfo) logEvent('promiseResolve', resourceInfo);
        }
    });

    asyncHook.enable();

    // Use async resources
    setTimeout(() => {
        console.log('Timer timed out.');
        // Disable hooks before returning from lambda.
        asyncHook.disable();
        callback(null, {msg: event.msg});
    }, 10);

    console.log('Timer registered');

    const promise = Promise.resolve(123);

    promise.then((value) => {
        console.log(`Promise resolved with value: ${value}`);
    });
});

function logEvent(eventName, resourceInfo) {
    console.log(`[${eventName}] asyncId=${resourceInfo.asyncId}, ` +
    `type=${resourceInfo.type}, triggerAsyncId=${resourceInfo.triggerAsyncId}, ` +
    `resource=${resourceInfo.resource.constructor.name}`);
}

