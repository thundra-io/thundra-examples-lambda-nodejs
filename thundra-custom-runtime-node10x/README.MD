# thundra-custom-runtime-node10x

This is a simple example to set different NodeJS Runtime with Thundra Serverless Plugin.

## How to run using [serverless](https://serverless.com/)

Thundra Serverless Plugin uses Thundra NodeJS agent layer and Custom Runtime.

Thundra Custom Runtime comes with NodeJS 8.10 but you can provide different NodeJS Runtimes by adding Custom Runtime layers.

In this demo we will use Node 10x Runtime of Lambci. (https://github.com/lambci/node-custom-lambda).

We first add our Lambci  Node 10x Runtime to our function in serverless.yml

```yml
layers:
      - arn:aws:lambda:${self:custom.region}:553035198032:layer:nodejs10:14
    ...
```
In order to inform Thundra Custom Runtime about the external Node Runtime, we need to provide full path of
the external Node Runtime by setting environment variable `NODE_RUNTIME_PATH` to `/opt/bin/node`.

#### 1 - Installation

In `thundra-examples-lambda-nodejs/thundra-custom-runtime-node10x` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/thundra-custom-runtime-node10x/serverless.yml` and set your Thundraapi key:

```yml
custom:
    thundraApiKey: <your-api-key> 
    ...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/thundra-custom-runtime-node10x` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/thundra-custom-runtime-node10x` directory:

```bash
sls invoke --function async-generator
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe the results. It might take 1-2 minutes to be visible.