const input = require("./load.js");
const lib = require("./lib.js");

let minCost = Infinity;
let bestState = undefined;
const states = lib.getStates(input.devices);
const hours = lib.getHours(input.rates);


for (j = 0; j < states.length; j++) {
    let consume = lib.getConsume(states[j], input.devices);
    if (Math.max(...consume) > input.maxPower) {
        continue;
    }

    cost = lib.getCost(consume, hours);
    if (cost < minCost) {
        bestState = states[j];
        minCost = cost;
    }
}

console.log(minCost);
console.log(bestState);