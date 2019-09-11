# SAM Mobile Backend Demo
This is a simple Lambda Project with `aws-serverless-express` which demonstrates Thundra integration via SAM.

## How to run using [SAM](https://docs.aws.amazon.com/en_us/serverless-application-model/latest/developerguide/what-is-sam.html)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/thundra-sam-mobilebackend` directory:

```bash
npm install
```

#### 2 - Configuration

Open `thundra-examples-lambda-nodejs/thundra-sam-mobilebackend/deploy.yml` and set your api key:

```yml
ThundraApiKey:
    Type: String
    Default: #TODO: enter your API key here
...
```

#### 3 - Deploy

In `thundra-examples-lambda-nodejs/thundra-sam-mobilebackend/` directory:

```bash
sam package --template-file deploy.yaml --s3-bucket <YOUR-DEPLOYMENT-BUCKET-HERE> --output-template-file deploy.yaml
sam deploy --template-file ./deploy.yaml --stack-name <YOUR-STACK-NAME-HERE> --capabilities CAPABILITY_IAM
```

#### 4 - Invoke

In `thundra-examples-lambda-nodejs/thundra-sam-mobilebackend` directory:

```bash
curl -X GET https://<YOUR-API-GATEWAY-ID>.execute-api.<YOUR-DEPLOYMENT-REGION>.amazonaws.com/dev/teams
```

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your function