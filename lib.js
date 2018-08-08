getHours = (rates) => {
    const hours = new Array(24).fill();
    if (rates.length === 1) {
        for (i in hours) {
            hours[i] = rates[0].value;
        }
    } else {
        for (i in rates) {
            if (rates[i].from > rates[i].to) {
                rates.push({
                    "from": rates[i].from,
                    "to": 24,
                    "value": rates[i].value
                });
                rates[i].from = 0;
            }
        }
        for (i in rates) {
            for (j = rates[i].from; j < rates[i].to; j++) {
                hours[j] = rates[i].value;
            }
        }
    }
    return hours
}

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const getCartesian = (a, b, ...c) => (b ? getCartesian(f(a, b), ...c) : a);

getStates = (devices) => {
    let states = [];
    for (d in devices) {
        // добавляем каждому девайсу поле states в виде пустого массива
        let devStates = [];
        // 
        for (let i = 0; i < 24; i++) {

            if ((i + devices[d].duration) <= 24) {
                if (devices[d].mode === "day") {
                    if (i >= 7 && (i + devices[d].duration) <= 21) {
                        devStates.push(i);
                    }
                } else
                if (devices[d].mode === "night") {
                    if ((i < 7 && (i + devices[d].duration) <= 7) || (i >= 21 && (i + devices[d].duration) <= 31)) {
                        devStates.push(i);
                    }
                } else if (devices[d].mode == undefined) {
                    devStates.push(i);
                }
            }
        }
        states.push(devStates);
    }
    return getCartesian(...states);
}

const getConsume = (state, devices) => {
    let consume = new Array(24).fill(0);
    for (i = 0; i < state.length; i++) {
        for (k = state[i]; k < (state[i] + devices[i].duration); k++) {
            consume[k] += devices[i].power;
        }
    }
    return consume;
}

const getCost = (consume, hours) => {
    let cost = 0;
    for (i = 0; i <= 23; i++) {
        cost = cost + consume[i] * hours[i];
    }
    return cost;
}

exports.getCartesian = getCartesian;
exports.getConsume = getConsume;
exports.getCost = getCost;
exports.getHours = getHours;
exports.getStates = getStates;