// Скрипт загрузки и сохранения данных

// Загрузка данных из папки data
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

//сохранение результата в output.json
function saveResult(result) {
    let fs = require('fs');
    let serialized = JSON.stringify(result, null, 2);
    fs.writeFileSync('./data/output.json', serialized);
}

//входные данные
const input = loadData();

// Алгоритм
solve = (input) => {

    //получение массива из 24 часов с прописанной стоимостью энергии для каждого часа
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

    // Декартово преобразование   
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const getCartesian = (a, b, ...c) => (b ? getCartesian(f(a, b), ...c) : a);

    // получение возможного начала работы каждого прибора
    getStates = (devices) => {
        let states = [];
        for (d in devices) {

            let devStates = [];

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

    // считаем потребление приборов
    const getConsume = (state, devices) => {
        let consume = new Array(24).fill(0);
        for (i = 0; i < state.length; i++) {
            for (k = state[i]; k < (state[i] + devices[i].duration); k++) {
                consume[k] += devices[i].power;
            }
        }
        return consume;
    }

    //  Считаем стоимость
    const getCost = (consume, hours) => {
        let cost = 0;
        for (i = 0; i <= 23; i++) {
            cost = cost + consume[i] * hours[i];
        }
        return cost;
    }

    const devices = input.devices;
    let minCost = Infinity;
    let bestState = undefined;
    const saveResult = input.saveResult;
    const states = getStates(input.devices);
    const hours = getHours(input.rates);

    //  Выкидываем из выборки варианты старта приборов, при которых будет превышена максимальная мощность
    for (j = 0; j < states.length; j++) {
        let consume = getConsume(states[j], input.devices);
        if (Math.max(...consume) > input.maxPower) {
            continue;
        }
        // Находим максимально выгодные позиции старта для каждого из приборов
        cost = getCost(consume, hours);
        if (cost < minCost) {
            bestState = states[j];
            minCost = cost;
        }
    }
    // Формируем итоговый объект с данными
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

    return output;
}

const output = solve(input);

// Записываем данные в файл output.json, папка ./data
saveResult(output);