const chai = require('chai');
const assert = chai.assert;
const power = require('../power.js');
const cartesian = power.cartesian;
const hoursRates = power.makeHoursWithPrice;

describe("Декартово преобразование", function() {
    // it("Returns correct cartesian product of 1 array", function() {
    //     assert.equal(
    //         JSON.stringify(cartesian([1, 2])),
    //         JSON.stringify([
    //             [1],
    //             [2]
    //         ])
    //     );
    // });

    it("Returns correct cartesian product of 2 arrays", function() {
        assert.equal(
            JSON.stringify(cartesian([1, 2], [3, 4])),
            JSON.stringify([
                [1, 3],
                [1, 4],
                [2, 3],
                [2, 4]
            ])
        );
    });
    it("Returns correct cartesian product of 3 arrays", function() {
        assert.equal(
            JSON.stringify(cartesian([1, 2], [3, 4], [5, 6])),
            JSON.stringify([
                [1, 3, 5],
                [1, 3, 6],
                [1, 4, 5],
                [1, 4, 6],
                [2, 3, 5],
                [2, 3, 6],
                [2, 4, 5],
                [2, 4, 6]
            ])
        );
    });

    it("Cartesian product of arrays of lenght 1 returns 1 array", function() {
        assert.equal(
            JSON.stringify(cartesian([1], [2])),
            JSON.stringify([
                [1, 2]
            ])
        );

        assert.equal(
            JSON.stringify(cartesian([1], [2], [3])),
            JSON.stringify([
                [1, 2, 3]
            ])
        );
    });
});