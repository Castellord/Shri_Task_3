const storage = require("./storage.js");
const lib = require("./lib.js");
const devices = storage.devices;

let minCost = Infinity;
let bestState = undefined;
const saveResult = storage.saveResult;
const states = lib.getStates(storage.devices);
const hours = lib.getHours(storage.rates);


for (j = 0; j < states.length; j++) {
    let consume = lib.getConsume(states[j], storage.devices);
    if (Math.max(...consume) > storage.maxPower) {
        continue;
    }

    cost = lib.getCost(consume, hours);
    if (cost < minCost) {
        bestState = states[j];
        minCost = cost;
    }
}

const output = {
    "schedule": {},
    "consumedEnergy": {
        "value": minCost / 1000,
        "devices": {}
    }
};

for (d in devices) {
    output.consumedEnergy.devices[devices[d].id] = 0;
}

for (i = 0; i < 24; i++) {
    output.schedule[i] = [];
    for (state in bestState) {
        if (bestState[state] <= i && i < bestState[state] + devices[state].duration) {
            output.schedule[i].push(devices[state].id);
            output.consumedEnergy.devices[devices[state].id] += devices[state].power * hours[i] / 1000;
        }
    }

}

saveResult(output);