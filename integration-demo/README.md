# Integration Demo
This is a simple example to get started with Thundra's integration capabilites.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/integration-demo` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/integration-demo/serverless.yml` and set your AWS S3 deployment bucket & api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    deploymentBucket: <your-s3-deployment-bucket>
    ...
```

Create a new database in your PostgreSQL instance and create user table by running `thundra-examples-lambda-nodejs/integration-demo/create_tables.sql`

Update database config file `thundra-examples-lambda-nodejs/integration-demo/user/pg/config.js` with your PostgreSQL instance properties.

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/integration-demo` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/integration-demo` directory:

```bash
sls invoke --function integration --data '{"id" : 1}'
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.