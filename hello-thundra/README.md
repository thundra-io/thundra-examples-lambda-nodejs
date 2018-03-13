# Hello Thundra Project
This is a simple example to get started with Thundra.

You will learn how to observe the invocation metrics of lambda functions with Thundra using **default settings**.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/hello-thundra` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/hello-thundra/serverless.yml` and set your AWS S3 deployment bucket & api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    deploymentBucket: <your-s3-deployment-bucket>
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/hello-thundra` directory:

```bash
sls deploy
```

#### 4 - Invoke

```bash
sls invoke --function hello-thundra --data '{"msg":"Hello"}'
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.