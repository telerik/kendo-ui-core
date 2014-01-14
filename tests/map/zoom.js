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
})();
