import '@progress/kendo-ui/src/kendo.draganddrop.js';

function elementLocation() {
    let values = $(element).css("transform").match(/[\d.]+/g);
    return {
        scale: parseInt(values[0]),
        x: parseFloat(values[4]),
        y: parseFloat(values[5])
    };
}

let fixture,
    Movable = kendo.ui.Movable,
    element,
    movable;

describe("movable", function() {
    beforeEach(function() {
        element = $("<div />").appendTo(Mocha.fixture);
        movable = new Movable(element);
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        element.remove();
    });

    it("sets x", function() {
        movable.moveAxis("x", 10.5);
        assert.equal(elementLocation()["x"], 10.5);
    });

    it("sets y", function() {
        movable.moveAxis("y", 10.5);
        assert.equal(elementLocation()["y"], 10.5);
    });

    it("rounds x", function() {
        movable.round = true;
        movable.moveAxis("x", 10.5);
        assert.equal(elementLocation()["x"], 11);
    });

    it("rounds y", function() {
        movable.round = true;
        movable.moveAxis("y", 10.5);
        assert.equal(elementLocation()["y"], 11);
    });
});