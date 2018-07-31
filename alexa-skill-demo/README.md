# alexa-skill-demo
This is an example Custom Alexa Skill which answers Game Of Thrones Trivia using [Alexa Skill Kit Node.js SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)


## How to run using [serverless](https://serverless.com/)

#### 1 - Installation

In `thundra-examples-lambda-nodejs/alexa-skill-demo/lambda/custom` directory:

```bash
npm install
```
#### 2 - Set up Alexa 

1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com).  In the top-right corner of the screen, click the "Sign In" button.**
(If you don't already have an account, you will be able to create a new one for free.)

2.  Once you have signed in, move your mouse over the **Your Alexa Consoles** text at the top of the screen and Select the **Skills (New)** Link.

3.  From the **Alexa Skills Console (New Console)** select the **Create Skill** button near the top of the screen.

4. Give your new skill a **Name**. This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to. Push Next.

5. Select the **Custom** model at the top of the page to add to your skill and select the **Create Skill** button at the top right.

6. **Build the Interaction Model for your skill**
	1. On the left hand navigation panel. Select the **Invocation** tab. Enter a **Skill Invocation Name**. This is the name that your users will need to say to start your skill.
	2. Next, select the **JSON Editor** tab. In the textfield provided, replace any existing code with the code provided in the [Interaction Model](./models) then click "Build Model".

	**Note:** You should notice that **Intents** and **Slot Types** will auto populate based on the JSON Interaction Model that you have now applied to your skill. 


#### 3 - Configuration

Open `thundra-examples-lambda-nodejs/alexa-skill-demo/lambda/custom/serverless.yml` and set your AWS S3 deployment bucket & api key :

```yml
custom:
    thundraApiKey: <your-api-key>
    deploymentBucket: <your-s3-deployment-bucket>
    ...
```
Alexa Skill ID provided in Enpoint Setup on Alexa Developer Console:
```yml
events:
      - alexaSkill: <your-alexa-skill-id>
```


#### 4 - Deploy

In `thundra-examples-lambda-nodejs/express-serverless-http` directory:

```bash
sls deploy
```

#### 5 - Test

You can test the skill with Alexa Simulator.

#### 5 - Enjoy your flight with Thundra!

Visit Thundra to observe your metrics. It might take 1-2 minutes to be visible.