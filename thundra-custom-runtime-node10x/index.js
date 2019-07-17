exports.handler = async (event, context, callback) => {
    const generator = asyncSequenceGenerator();
    callback(null, {sequence: await generator.next()});
};

async function* asyncSequenceGenerator(maxValue = 2) {
    let currentValue = 0;
    while (currentValue < maxValue) {
        currentValue++;
        yield currentValue;
    }
}
