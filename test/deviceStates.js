const chai = require('chai');
const assert = chai.assert;
const lib = require('../lib.js');
const getStates = lib.getStates;

describe("Время начала работы устройств", function() {
    it("Если у нас одно устройство с временем работы 22 часа", function() {
        assert.equal(
            JSON.stringify(
                getStates([{
                    "duration": 22,
                }])
            ), JSON.stringify([
                [0],
                [1],
                [2]
            ])
        );
    });

    it("Пакет устройств - 10 часов ночью, 10 часов днем, 5 часов", function() {
        assert.equal(
            JSON.stringify(
                getStates([{
                        "duration": 7,
                        "mode": "night"
                    },
                    {
                        "duration": 5,
                        "mode": "night"
                    },
                    {
                        "duration": 14,
                        "mode": "day"
                    }
                ])
            ), JSON.stringify([
                [0, 0, 7],
                [0, 1, 7],
                [0, 2, 7]
            ])
        );
    });


});