# Claudia.js Integration

This is a simple example to demonstrate Thundra and Claudia.js API builder.

## How to run using [claudia.js](https://claudiajs.com/documentation.html)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/claudia-js` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/claudia-js/index.js` and set your Thundra api key:

```js
var thundra = require('@thundra/core')({
    apiKey: '<Your API Key>' 
});
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/claudia-js` directory:

```bash
npm run create
```

#### 3.1 - Deploy

In `thundra-examples-lambda-nodejs/claudia-js` directory:

```bash
npm run update
```

#### 4 - Invoke

```bash
curl -X GET https://XXXXXXXXX.execute-api.us-west-2.amazonaws.com/latest/pokemon
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.