/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const thundra = require("@thundra/core");
const axios = require('axios');
const thundraLog = require("@thundra/log");
const logger = thundraLog.createLogger();
const beautify = require("json-beautify");
const { wordsToNumbers } = require('words-to-numbers');
const BASE_URL = 'https://www.anapioficeandfire.com/api/';
const APP_NAME = 'Game of Thrones Wiki';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Thundra Game Of Thrones Wiki. Please ask anything about Game of Thrones.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(APP_NAME, speechText)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },

    handle(handlerInput) {
        const speechText = 'You can ask questions about books, locations and character of Game of Thrones.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(APP_NAME, speechText)
            .getResponse();
    },
};

const HouseOverlordIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HouseOverlordIntent';
    },

    async handle(handlerInput) {
        const tracer = thundra.tracer();  
        const span = tracer.startSpan('HouseOverlordIntent');
        const houseName = handlerInput.requestEnvelope.request.intent.slots.HouseName.value;

        const houseData = await get('houses', {
            name : 'House ' + houseName
        });

        let speechText = 'The House ' + houseName.toUpperCase() + ' has no lord right now.';

        if (houseData.length > 0 && houseData[0].currentLord !== '') {
            const characterData = await get('characters',  parseInt(extractIdFromURL(houseData[0].currentLord)));  
            speechText = `Overlord of House ${houseName.toUpperCase()} is ${characterData.name}.`;
        }

        span.finish();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(APP_NAME, speechText)
            .getResponse();
    },
};

const WhoPlayedCharacterIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'WhoPlayedCharacterIntent';
    },
    
    async handle(handlerInput) {
        const tracer = thundra.tracer();
        
        const span = tracer.startSpan('WhoPlayedCharacterIntent');

        const characterName = handlerInput.requestEnvelope.request.intent.slots.character.value;
        const data = await get('characters', {
            name : characterName
        });
        let speechText = `Cannot find information about ${characterName}`;

        if (data.length !== 0) {
            speechText = ` ${characterName} is played by ${data[0].playedBy[0]}`;
        }

        span.setTag('speechText', speechText);
        span.finish();
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(`${characterName}`, speechText)
            .getResponse();
    },
};

const BookInfoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BookInfoIntent';
    },
    async handle(handlerInput) {
        const tracer = thundra.tracer();
        
        const span = tracer.startSpan('AskBookInfoIntent');

        let speechText = '';

        if (handlerInput.requestEnvelope.request.
            intent.slots.nth.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
                speechText = `${handlerInput.requestEnvelope.request.intent.slots.nth.value} 
                                novel in the series A Song of Ice and Fire has not been written.`
        } else {
            const data = await get('books', {});
            const bookOrderStr = handlerInput.requestEnvelope.request.
            intent.slots.nth.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            
            const bookOrder = wordsToNumbers(bookOrderStr);

            speechText = `${data[bookOrder - 1].name} is the ${bookOrderStr} novel in the series A Song of Ice and Fire 
            written by ${data[bookOrder - 1].authors[0]} and has ${data[bookOrder - 1].numberOfPages} pages.` ;
        }

        span.setTag('speechText', speechText);
        span.finish();

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Book Info: ', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(APP_NAME, speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        logger.error(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },

    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        logger.error(`Error handled: ${error.message}`);
        const tracer = thundra.tracer();
        tracer.finishSpan();
        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const api = axios.create({
    method: 'get',
    baseURL: BASE_URL,
    timeout: 5000
});

const validate = qry => {
    if (typeof qry === 'number' && Number.isInteger(qry) || Array.isArray(qry)) {
        return `/${qry}`
    }

    if (typeof qry === 'object') {
        return `/?${Object.keys(qry)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qry[key])}`)
            .join('&')}`
    }

    throw new Error(`As argument use an object, an array, an integer or leave it blank`)
}; 

const get = async (endpoint = '', opt = {}) => {
    const tracer = thundra.tracer();
    const query = validate(opt);
    try {
        const span = tracer.startSpan('API Call');
        span.setTag('Base URL', BASE_URL);
        span.setTag('Endpoint', endpoint);
        span.setTag('Query Options', beautify(opt, null, 2, 80));

        const { data } = await api(endpoint + query);
        
        span.setTag('API Response', beautify(data, null, 2, 80));
        span.finish();
        
        return data
    } catch (e) {
        console.log(e.message);
        logger.error(e.message);
        return {
            status: e.response.status,
            error: e.response.data.error
        }
    }
};

const extractIdFromURL = (baseURL) => {
    const tracer = thundra.tracer();
    const span = tracer.startSpan('extractIdFromURL');
    const paths = baseURL.split("/");
    const id = paths[paths.length - 1];
    span.finish();
    return id;
};

const skillBuilder = Alexa.SkillBuilders.custom(); 

const lambdaHandler = skillBuilder.addRequestHandlers(
    LaunchRequestHandler,
    WhoPlayedCharacterIntentHandler,
    BookInfoIntentHandler,
    HouseOverlordIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
)
    .addErrorHandlers(ErrorHandler)
    .lambda();

exports.handler = thundra({
    plugins: [thundraLog.createLogPlugin()]
})(lambdaHandler);