# express-serverless-http
This is an example project using [express](https://www.npmjs.com/package/express) and [serverless-http](https://www.npmjs.com/package/serverless-http) with Thundra async monitoring.


## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/express-serverless-http` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/express-serverless-http/serverless.yml` and set your AWS S3 deployment bucket & api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    deploymentBucket: <your-s3-deployment-bucket>
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/express-serverless-http` directory:

```bash
sls deploy
```

#### 4 - Invoke

Open Amazon API Gateway service and make a `GET` method test request.

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.