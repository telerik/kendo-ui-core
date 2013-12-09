(function() {

    function triggerTouchEvent(type, e) {
        element.trigger($.Event(type, { originalEvent: { changedTouches: [e] }}));
    }

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

    module("movable", {
        setup: function() {
            fixture = $("#qunit-fixture");
            fixture.append("<div />");
            element = fixture.children().first();
            movable = new Movable(element);
        },

        teardown: function() {
            fixture.empty()
        }
    });

    test("sets x", 1, function() {
        movable.moveAxis("x", 10.5);
        equal(elementLocation()["x"], 10.5);
    });

    test("sets y", 1, function() {
        movable.moveAxis("y", 10.5);
        equal(elementLocation()["y"], 10.5);
    });

    test("rounds x", 1, function() {
        movable.round = true;
        movable.moveAxis("x", 10.5);
        equal(elementLocation()["x"], 11);
    });

    test("rounds y", 1, function() {
        movable.round = true;
        movable.moveAxis("y", 10.5);
        equal(elementLocation()["y"], 11);
    });

    // ------------------------------------------------------------
    var browser;

    module("movable / IE legacy", {
        setup: function() {
            browser = kendo.support.browser;
            kendo.support.browser = { msie: true, version: 9 };
        },
        teardown: function() {
            kendo.support.browser = browser;
        }
    });

    test("sets x", function() {
        movable.moveAxis("x", 10.5);
        equal(element.css("left"), "10.5px");
    });

    test("sets y", function() {
        movable.moveAxis("y", 10.5);
        equal(element.css("top"), "10.5px");
    });

    test("sets position", function() {
        movable.moveAxis("y", 10.5);
        equal(element.css("position"), "absolute");
    });

})();
