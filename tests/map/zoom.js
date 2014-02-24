(function() {
    var dom;

    // ------------------------------------------------------------
    module("Map / Zoom", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("adds css classes to wrapper", function() {
        dom = $("<div>").kendoZoomControl();

        ok(dom.is(".k-widget.k-zoom-control"));
    });

    test("creates zoom-in button", function() {
        dom = $("<div>").kendoZoomControl();

        ok(dom.find("button:eq(0)").is(".k-button.k-zoom-in"));
    });

    test("creates zoom-out button", function() {
        dom = $("<div>").kendoZoomControl();

        ok(dom.find("button:eq(1)").is(".k-button.k-zoom-out"));
    });

    test("clicking the zoom-in button triggers change event with positive delta argument", function() {
        dom = $("<div>").kendoZoomControl({
            change: function(e) {
                equal(e.delta, 1);
            }
        });

        dom.find(".k-zoom-in").trigger("click");
    });

    test("clicking the zoom-out button triggers change event with negative delta argument", function() {
        dom = $("<div>").kendoZoomControl({
            change: function(e) {
                equal(e.delta, -1);
            }
        });

        dom.find(".k-zoom-out").trigger("click");
    });

    test("pressing plus triggers change event with positive delta argument", function() {
        dom = $("<div>").kendoZoomControl({
            change: function(e) {
                equal(e.delta, 1);
            }
        });

        keydown(dom, kendo.keys.NUMPAD_PLUS);
    });

    test("pressing minus triggers change event with negative delta argument", function() {
        dom = $("<div>").kendoZoomControl({
            change: function(e) {
                equal(e.delta, -1);
            }
        });

        keydown(dom, kendo.keys.NUMPAD_MINUS);
    });

    test("change event delta argument is multiplied by zoomStep on zoom-in", function() {
        dom = $("<div>").kendoZoomControl({
            zoomStep: 100,
            change: function(e) {
                equal(e.delta, 100);
            }
        });

        dom.find(".k-zoom-in").trigger("click");
    });

    test("change event delta argument is multiplied by zoomStep on zoom-out", function() {
        dom = $("<div>").kendoZoomControl({
            zoomStep: 100,
            change: function(e) {
                equal(e.delta, -100);
            }
        });

        dom.find(".k-zoom-out").trigger("click");
    });

    test("tab index is set on control", function() {
        dom = $("<div>").kendoZoomControl();
        equal(dom.attr("tabIndex"), 0);
    });

    test("tab index is set on parent widget", function() {
        var parent = $("<div data-role='foo'>");

        dom = $("<div>");
        dom.appendTo(parent);

        dom.kendoZoomControl();

        equal(parent.attr("tabIndex"), 0);
    });

    test("keyboard events fired on parent widget are processed", function() {
        var parent = $("<div data-role='foo'>");

        dom = $("<div>");
        dom.appendTo(parent);

        dom.kendoZoomControl({
            change: function() { ok(true); }
        });

        keydown(parent, kendo.keys.NUMPAD_PLUS);
    });
})();
