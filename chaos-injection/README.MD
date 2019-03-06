# Chaos engineering
Chaos engineering examples using Thundra's span listener feature.

## NodeJS
Example usage of the span listeners in NodeJS. For more detailed explanation and the API reference check out the official [documentation](https://docs.thundra.io/v1.0.0/docs/nodejs-span-listeners).

### 1. Error injection example
We are doing a basic cache operation in this example. First, we are looking for `id` of the user in redis. If user is not found in redis, then we are making a request to the PostgreSQL to find the `id`. However, the code has some missing points that escape the attention. Using Thundra's `FilteringSpanListener` we inject error to the redis call. When the redis call is failed because of the error that we inject using `FilteringSpanListener`, the executions fails. However, even if the cache fails for some user we should have been able to get user from the PostgreSQL. That was the point which escaped the attention, and we were able to notice that problem before this code goes to live. Thanks to Thundra's new span listeners!

### 2. Latency injection example
In the second example we are injecting latency this time using `LatencyInjectorSpanListener`. Basically we have a lambda function that invokes another Lambda in this example. When we run this lambda function, it successfully returns. There isn't any problem on the surface. However when we inject latency to the `upstream-lambda` call using `LatencyInjectorSpanListener` we see that our main Lambda function is timed out. The reason is that we didn't take latencies that can be happen in the `upstream-lambda` into account. Using `LatencyInjectorSpanListener` we simulate that case and we saw that main Lambda function is failed due to the latency that we inject. We saw that in order to not fail in case of the unexpected latencies, our main Lambda's timeout value should always be greater than the `upstream-lambda`'s timeout value.

# Running the examples
 To run the examples on your own be sure to add credentials to `config.js` file under the `root` directory. `config.js` file should be in the following format, just replace the each value according to your configuration:
```js
const config = {
    redis: {
        host: "redis_host",
        port: "redis_port",
        password: "redis_password"
    },
    postgresql: {
        user: "postgresql_user_name",
        host: "postgresql.host",
        password: "postgresql_password",
        dbname: "postgresql_db_name"
    },
    thundra: {
        api_key: "thundra_api_key"
    }
};
module.exports = config;

```

Open `thundra-examples-lambda-nodejs/chaos-injection/serverless.yml` and set your AWS S3 deployment bucket:

```yml
custom:
    deploymentBucket: <your-s3-deployment-bucket>
    ...
```

####  Deploy

In `thundra-examples-lambda-nodejs/chaos-injection` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/chaos-injection` directory:

```bash
sls invoke --function error_injection_example  --data '{"id":"7"}'
sls invoke --function latency_injection_example
```
