const thundra = require('@thundra/core');

var config = {
    traceConfig: {
        traceableConfigs: [{
            pattern: 'services.*'
        }],
        //integrations : ['aws']
    }
};

exports.handler = thundra(config)((event, context, callback) => {
    const heroServices = require('services');
    let flag = false;
    heroServices.getHero(event).then(
        (results) => {
            var items = results.Items;
            for (i = 0; i < items.length; i++) {
                if (items[i].hero.S == event.hero) {
                    flag = true;
                    callback(null, "Hero has already been enlisted");
                }
            }

            if(!flag) {
                heroServices.addHero(event).then((results) => {
                    callback(null,"Enlisted");
                }).catch(
                    (err) => {
                        callback("Could not add member- " + err,null);
                    });
            }
        }).catch(
            (err) => {
                callback('ERROR ' + err, null);
            });
});

