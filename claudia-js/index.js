var thundra = require('@thundra/core')({
    apiKey: '<Your API Key>' 
});

var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    pokemon = require('pokemon');

// Wrap the proxy router with thundra    
api.proxyRouter = thundra(api.proxyRouter);

module.exports = api;

api.get('/pokemon', function(request) {
    const queryName = request.queryString.name;
    if (queryName) {
        try {
            const pokemonId = pokemon.getId(queryName);
            return pokemon.getName(pokemonId) + ' is a pokemon.';
        } catch (err) {
            console.error(err);
            return 'Not a valid pokemon name ' +  queryName;
        }
    } else {
        return 'Here is a random pokemon for you : ' + pokemon.random();
    }
});