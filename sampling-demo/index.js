const thundra = require("@thundra/core");

const CompositeSampler = thundra.samplers.CompositeSampler;
const SamplerCompositionOperator = thundra.samplers.SamplerCompositionOperator;
const CountAwareSampler = thundra.samplers.CountAwareSampler;
const DurationAwareSampler = thundra.samplers.DurationAwareSampler;
const ErrorAwareSampler = thundra.samplers.ErrorAwareSampler;
const TimeAwareSampler = thundra.samplers.TimeAwareSampler;

const config = {
    traceConfig: {
        sampler: new DurationAwareSampler(200) // Sample traces if root span takes more than 200 ms
    },
    logConfig: {
        sampler: new ErrorAwareSampler(100) // Sample logs if lambda fails
    },
    metricConfig: {
         sampler: new CountAwareSampler(10) // Sample metrics every 10th invocation
    }
 };

exports.handler = thundra(config)((event, context, callback) => {
    callback(null, {msg: event.msg});
});

//////////////////////////////////////////////////////////////////
const sampler1 = new CountAwareSampler(5); // Samples every 2th.
const sampler3 = new ErrorAwareSampler();
// Create a composite sampler with count and time aware and combine them with AND operator, default is OR
const sampler = new CompositeSampler([sampler1, sampler3], SamplerCompositionOperator.AND)

const compositeConfig = {
    traceConfig: {
        sampler
    },
};

exports.handler_composite = thundra(compositeConfig)(async (event) => {
    
        throw new Error("custom error");
    
});

//////////////////////////////////////////////////////////////////
const errorSampler = {
    isSampled: (span) => {
        console.log(span);
        return true;
    }
};

const countSampler = new CountAwareSampler(3); // Samples every 2th.

const countAndErrorSampler = new CompositeSampler([errorSampler, countSampler], SamplerCompositionOperator.AND)

const customSamplerConfig = {
    traceConfig: {
        countSampler
    },  
};

exports.handler_custom = thundra(customSamplerConfig)( async (event) => {

    try{
        console.log(event);
        throw new Error("custom error");
    } catch(e){
        console.log(e);
        return "hata oldu";
    }    
});