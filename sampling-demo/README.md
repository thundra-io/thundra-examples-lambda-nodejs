# Sampling Demo
This is a simple Lambda Project to demo Sampling capabililites of Thundra.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/sampling-demo` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/sampling-demo/serverless.yml` and set your api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/sampling-demo` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/sampling-demo` directory:

```bash
sls invoke --function sampling-demo-all --data '{"msg":"Hello"}'
sls invoke --function sampling-demo-composite --data '{"msg":"Hello"}'
sls invoke --function sampling-demo-custom --data '{"msg":"Hello"}'
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.