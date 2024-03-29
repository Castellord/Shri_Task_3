const fs = require('fs');

function loadData() {
    let fs = require('fs');
    try {
        let input = fs.readFileSync('./data/input.json', 'utf-8');
        return JSON.parse(input);
    } catch (err) {
        if (err instanceof SyntaxError) {
            console.log('Save file corrupted');
            return null;
        }

        if (err.code === 'ENOENT') {
            console.log('Angry Error ENOENT');
            return null;

        }
        throw err;
    }

}

const input = loadData();

function saveResult(result) {
    let fs = require('fs');
    let serialized = JSON.stringify(result, null, 2);
    fs.writeFileSync('./data/output.json', serialized);
}



exports.devices = input.devices;
exports.rates = input.rates;
exports.maxPower = input.maxPower;
exports.saveResult = saveResult;