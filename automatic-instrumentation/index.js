const thundra = require('@thundra/core');

var config = {
    traceConfig: {
        traceDefs: [{
            pattern: 'services.*'
        }]
    }
}
exports.handler = thundra(config)((event, context, callback) => {
    const heroServices = require('services');
    
    heroServices.getHero(event).then(
        (results) => {
            var found = false;
            var items = results.Items;
            for (i = 0; i < items.length; i++) {
                if (items[i].hero.S == event.hero) {
                    console.log(JSON.stringify(items[i].hero));
                    context.succeed("Hero has already been enlisted");
                }
            }
                heroServices.addHero(event).then((results) => {
                context.succeed("Enlisted");
            }).catch(
                (err) => {
                    context.fail("Could not add member- " + err);
                })
        }).catch(
            (err) => {
                context.fail('ERROR ' + err)
            })
});

