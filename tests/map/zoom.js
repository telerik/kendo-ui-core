(function() {
    var dom;

    // ------------------------------------------------------------
    module("Map / Zoom", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("adds css classes to wrapper", function() {
        dom = $("<div>").kendoZoom();

        ok(dom.is(".k-widget.k-zoom.k-header.k-shadow"));
    });

    test("adds default position css classes to wrapper", function() {
        dom = $("<div>").kendoZoom();

        ok(dom.is(".k-pos-left.k-pos-top"));
    });

    test("adds custom position css classes to wrapper", function() {
        dom = $("<div>").kendoZoom({ position: "bottomLeft" });

        ok(dom.is(".k-pos-left.k-pos-bottom"));
    });

    test("creates zoom-in button", function() {
        dom = $("<div>").kendoZoom();

        ok(dom.find("button:eq(0)").is(".k-button.k-zoom-in"));
    });

    test("creates zoom-out button", function() {
        dom = $("<div>").kendoZoom();

        ok(dom.find("button:eq(1)").is(".k-button.k-zoom-out"));
    });

    test("clicking the zoom-in button triggers zoom event with positive delta argument", function() {
        dom = $("<div>").kendoZoom({
            zoom: function(e) {
                equal(e.delta, 1);
            }
        });

        dom.find(".k-zoom-in").trigger("click");
    });

    test("clicking the zoom-out button triggers zoom event with negative delta argument", function() {
        dom = $("<div>").kendoZoom({
            zoom: function(e) {
                equal(e.delta, -1);
            }
        });

        dom.find(".k-zoom-out").trigger("click");
    });

    test("zoom event delta argument is multiplied by zoomStep on zoom-in", function() {
        dom = $("<div>").kendoZoom({
            zoomStep: 100,
            zoom: function(e) {
                equal(e.delta, 100);
            }
        });

        dom.find(".k-zoom-in").trigger("click");
    });

    test("zoom event delta argument is multiplied by zoomStep on zoom-out", function() {
        dom = $("<div>").kendoZoom({
            zoomStep: 100,
            zoom: function(e) {
                equal(e.delta, -100);
            }
        });

        dom.find(".k-zoom-out").trigger("click");
    });
})();
