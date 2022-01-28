(function() {

    function elementLocation() {
        var values = $(element).css("transform").match(/[\d.]+/g);
        return {
            scale: parseInt(values[0]),
            x: parseFloat(values[4]),
            y: parseFloat(values[5])
        };
    }

    var fixture,
        Movable = kendo.ui.Movable,
        element,
        movable;

    describe("movable", function() {
        beforeEach(function() {
            fixture = $("#qunit-fixture");
            fixture.append("<div />");
            element = fixture.children().first();
            movable = new Movable(element);
        });

        afterEach(function() {
            fixture.empty()
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

    // ------------------------------------------------------------
    var browser;

    describe("movable / IE legacy", function() {
        beforeEach(function() {
            browser = kendo.support.browser;
            kendo.support.browser = { msie: true, version: 9 };
        });
        afterEach(function() {
            kendo.support.browser = browser;
        });

        it("sets x", function() {
            movable.moveAxis("x", 10.5);
            assert.equal(element.css("left"), "10.5px");
        });

        it("sets y", function() {
            movable.moveAxis("y", 10.5);
            assert.equal(element.css("top"), "10.5px");
        });

        it("sets position", function() {
            movable.moveAxis("y", 10.5);
            assert.equal(element.css("position"), "absolute");
        });

    });
}());
