const storage = require("./storage.js");
const lib = require("./lib.js");


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


saveResult(`Стоимость = ${minCost}

Стейты - ${bestState}`);
console.log(minCost);
console.log(bestState);