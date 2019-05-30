# Thundra Lambda Node 10x support
This project demonstrates `async-hook` api only avaliable in nodejs.10x runtime of AWS Lambda.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/thundra-node10x` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/thundra-node10x/serverless.yml` and set your api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/thundra-node10x` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/thundra-node10x` directory:

```bash
sls invoke --function thundra-node10x --data '{"msg":"Hello"}'
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.