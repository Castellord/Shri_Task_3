const chai = require('chai');
const assert = chai.assert;
const lib = require('../lib.js');
const deviseStates = lib.getStates;

describe("Время начала работы устройств", function() {
    it("Если у нас одно устройство с временем работы 22 часа", function() {
        assert.equal(
            JSON.stringify(
                deviseStates([{
                    "duration": 22
                }])
            ), JSON.stringify([
                [0, 1, 2]
            ])
        );
    });

    it("Пакет устройств - 10 часов ночью, 10 часов днем, 5 часов", function() {
        assert.equal(
            JSON.stringify(
                deviseStates([{
                        "duration": 10,
                        "mode": "night"
                    },
                    {
                        "duration": 8,
                        "mode": "night"
                    },
                    {
                        "duration": 10,
                        "mode": "day"
                    },
                    {
                        "duration": 5
                    },
                    {
                        "duration": 9
                    }
                ])
            ), JSON.stringify([
                [21],
                [21, 22, 23],
                [7, 8, 9, 10, 11],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            ])
        );
    });


});