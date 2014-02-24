(function() {
    var dom;

    function keydown(element, keyCode) {
        var e = jQuery.Event("keydown");
        e.which = keyCode;
        element.trigger(e);
    }

    // ------------------------------------------------------------
    module("Map / Navigator", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("adds css classes to wrapper", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.is(".k-widget.k-navigator.k-header.k-shadow"));
    });

    test("creates north button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(0)").is(".k-button.k-navigator-n"));
        ok(dom.find("button:eq(0) span").is(".k-icon.k-i-arrow-n"));
    });

    test("creates east button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(1)").is(".k-button.k-navigator-e"));
        ok(dom.find("button:eq(1) span").is(".k-icon.k-i-arrow-e"));
    });

    test("creates south button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(2)").is(".k-button.k-navigator-s"));
        ok(dom.find("button:eq(2) span").is(".k-icon.k-i-arrow-s"));
    });

    test("creates west button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(3)").is(".k-button.k-navigator-w"));
        ok(dom.find("button:eq(3) span").is(".k-icon.k-i-arrow-w"));
    });

    test("clicking north triggers the pan event with positive y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-n").trigger("click");
    });

    test("clicking south triggers the pan event with negative y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, -1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-s").trigger("click");
    });

    test("clicking east triggers the pan event with positive x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, 1);
            }
        });

        dom.find(".k-navigator-e").trigger("click");
    });

    test("clicking west triggers the pan event with negative x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, -1);
            }
        });

        dom.find(".k-navigator-w").trigger("click");
    });

    test("pressing up triggers the pan event with positive y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 1);
                equal(e.x, 0);
            }
        });

        keydown(dom, kendo.keys.UP);
    });

    test("pressing down triggers the pan event with negative y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, -1);
                equal(e.x, 0);
            }
        });

        keydown(dom, kendo.keys.DOWN);
    });

    test("pressing right triggers the pan event with positive x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, 1);
            }
        });

        keydown(dom, kendo.keys.RIGHT);
    });

    test("pressing left triggers the pan event with negative x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, -1);
            }
        });

        keydown(dom, kendo.keys.LEFT);
    });

    test("pan event x argument is multiplied by panStep", function() {
        dom = $("<div>").kendoNavigator({
            panStep: 100,
            pan: function(e) {
                equal(e.x, 100);
            }
        });

        dom.find(".k-navigator-e").trigger("click");
    });

    test("pan event y argument is multiplied by panStep", function() {
        dom = $("<div>").kendoNavigator({
            panStep: 100,
            pan: function(e) {
                equal(e.y, 100);
            }
        });

        dom.find(".k-navigator-n").trigger("click");
    });

    test("keyboard events fired on parent widget are processed", function() {
        var parent = $("<div data-role='foo'>");

        dom = $("<div>");
        dom.appendTo(parent);

        dom.kendoNavigator({
            pan: function() { ok(true); }
        });

        keydown(parent, kendo.keys.UP);
    });

})();
