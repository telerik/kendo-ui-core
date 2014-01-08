(function() {
    var dom;

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

    test("adds default position css classes to wrapper", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.is(".k-pos-left.k-pos-top"));
    });

    test("adds custom position css classes to wrapper", function() {
        dom = $("<div>").kendoNavigator({ position: "bottomLeft" });

        ok(dom.is(".k-pos-left.k-pos-bottom"));
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

    test("clicking the north button triggers the pan event with positive y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-n").trigger("click");
    });

    test("clicking the south button triggers the pan event with negative y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, -1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-s").trigger("click");
    });

    test("clicking the east button triggers the pan event with positive x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, 1);
            }
        });

        dom.find(".k-navigator-e").trigger("click");
    });

    test("clicking the west button triggers the pan event with negative x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, -1);
            }
        });

        dom.find(".k-navigator-w").trigger("click");
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
})();
