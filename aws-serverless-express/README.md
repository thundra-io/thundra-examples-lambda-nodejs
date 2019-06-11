# aws-serverless-express
This is a simple example to integrate Thundra with `aws-serverless-express`.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/aws-serverless-express` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/aws-serverless-express/serverless.yml` and set your api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/aws-serverless-express` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/aws-serverless-express` directory:

```bash
curl -X GET https://XXXXXXXXX.execute-api.us-west-2.amazonaws.com/dev/users
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.