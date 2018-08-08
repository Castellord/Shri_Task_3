const chai = require('chai');
const assert = chai.assert;
const lib = require('../lib.js');
const hoursPrice = lib.getCost;

describe("Сетка часов со стоимостью", function() {

    it("Верная сетка часов при одном тарифе 7-7", function() {

        assert.equal(JSON.stringify(hoursPrice([{
            "from": 7,
            "to": 7,
            "value": 6
        }], 24)), JSON.stringify([6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]));
    });


    it("Верная сетка часов при двух тарифах", function() {

        assert.equal(JSON.stringify(hoursPrice([{
            "from": 7,
            "to": 9,
            "value": 2
        }, {
            "from": 9,
            "to": 7,
            "value": 6
        }], 24)), JSON.stringify([6, 6, 6, 6, 6, 6, 6, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]));
    });

});