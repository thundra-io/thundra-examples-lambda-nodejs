# Hello Thundra
This is a simple example to demonstrate knex with thundra.

## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/thundra-knex-mysql2` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/thundra-knex-mysql2/serverless.yml` and set api key:

```yml
custom:
    thundraApiKey: <your-api-key>
    ...
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/thundra-knex-mysql2/index.js` and configure your mysql db connection:

```js
...
 connection: {
    "host": "<Your DB HOST>",
    "user": "<Your DB USER>",
    "database": "<Your DB NAME>",
    "password": "<Your DB PASSWORD>",
}
...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/thundra-knex-mysql2/` directory:

```bash
sls deploy
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/thundra-knex-mysql2/ directory:

```bash
sls invoke --function thundra-knex-mysql2
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your sql queries.