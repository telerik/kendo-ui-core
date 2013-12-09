(function() {
    var splitter;
    var create = SplitterHelpers.create;

    module("splitter horizontal pane resizing", SplitterHelpers.basicModule);

    function startResizing(splitter, options) {
        var resizingHandler = splitter.object.resizing;
        options = $.extend({ x: { location: 0 }, y: { location: 0 }, currentTarget: splitter.dom.find(".k-splitbar") }, options)
        options.x.startLocation = options.x.location;
        options.y.startLocation = options.y.location;

        resizingHandler._resizable._start(options);
    }

    test("resizing is initialized along with splitter", function() {
        splitter = create();

        var resizingHandler = splitter.object.resizing;

        ok(resizingHandler);
        equal(resizingHandler.owner.element[0], splitter.dom[0]);
    });

    test("resizing.start creates splitbar ghost", function() {
        splitter = create();

        startResizing(splitter);

        var ghost = splitter.dom.find(".k-ghost-splitbar");

        equal(ghost.length, 1);
    });

    test("resizing constraints calculated from previous pane", function() {
        splitter = create({
            panes: [ { min: "35px", max: "150px" }, {} ]
        });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        equal(resizingHandler._min(), 35);
        equal(resizingHandler._max(), 150);
    });

    test("resizing constraints calculated from next pane", function() {
        splitter = create({
            panes: [ {}, { min: "35px", max: "150px" } ]
        });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        equal(resizingHandler._min(), 50);
        equal(resizingHandler._max(), 165);
    });

    test("resizing constraints calculated from splitbar width", function() {
        splitter = create({
            panes: [ {}, {} ]
        });

        var resizingHandler = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        splitbar.width(15);
        splitter.object._resize();

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        equal(resizingHandler._min(), 0);
        equal(resizingHandler._max(), splitter.dom.width() - splitbar.outerWidth());
    });

    test("resizing constraints calculated from splitbar width and pane extremes", function() {
        splitter = create({
            panes: [ {}, { min: "35px", max: "150px" } ]
        }, 2, { width: 210 });

        var resizingHandler = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        splitbar.width(8);
        splitter.object._resize();

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        equal(resizingHandler._min(), 50);
        equal(resizingHandler._max(), 165);
    });

    test("resizing constraints calculated from pane extremes", function() {
        splitter = create({
            panes: [ { min: "60px", max: "200px" }, { min: "35px", max: "150px" } ]
        });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        equal(resizingHandler._min(), 60);
        equal(resizingHandler._max(), 165);
    });

    test("resizing constraints for middle panes", function() {
        splitter = create({}, 4, { width: 421 });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitter.dom.find(".k-splitbar").eq(1) });

        equal(resizingHandler._min(), 107);
        equal(resizingHandler._max(), 307);
    });

    test("resizing.stop modifies pane sizes", function() {
        splitter = create();

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location : initialSplitBarPosition + 5} });
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        equal(parseInt(panes[0].offsetWidth), (initialPaneSizes[0] + 5));
        equal(parseInt(panes[1].offsetWidth), (initialPaneSizes[1] - 5));
    });

    test("resizing.stop for middle panes", function() {
        splitter = create({}, 4, { width: 421 });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location : initialSplitBarPosition + 5} });
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        equal(panes[1].offsetWidth, initialPaneSizes[1] + 5);
        equal(panes[2].offsetWidth, initialPaneSizes[2] - 5);
    });

    test("resizing.stop with variable splitbar widths", function() {
        splitter = create({}, 4, { width: 421 });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1).width(8);

        splitter.object._resize();

        var initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });


        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location : initialSplitBarPosition + 5} });
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        equal(panes[1].offsetWidth, initialPaneSizes[1] + 5);
        equal(panes[2].offsetWidth, initialPaneSizes[2] - 5);
    });

    test("resizing.stop fires splitter resize", function() {
        var triggered = false;

        splitter = create({ resize: function() { triggered = true } });

        var splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        startResizing(splitter);
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: { location :0 } });

        ok(triggered);
    });

    test("resizing.stop for panes with constraints", function() {
        splitter = create({ panes: [{ min: "50px" }, {}] });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x : {location: 0} });
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: {location: 0} });

        equal(panes[0].offsetWidth, 50);
        equal(panes[1].offsetWidth, 150);
    });

    function isPercentageSize(size) {
        return /^\d+(\.\d+)?%$/.test(size);
    }

    function isPixelSize(size) {
        return /^\d+px$/.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    test("resizing.stop assigns percentage sizes when resizing fluid panes", function() {
        splitter = create({ panes: [{ size: "100px" }, {}] });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: {location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._stop({ currentTarget: splitBar });

        ok(isPixelSize(panes.eq(0).data("pane").size));
        ok(isFluid(panes.eq(1).data("pane").size));
    });

    test("resizing.stop assigns percentage sizes when resizing fluid panes", function() {
        splitter = create({ panes: [{}, { size: "100px" }] });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: {location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location : initialSplitBarPosition + 5 } });
        resizingHandler._resizable._stop({ currentTarget: splitBar, x: { location: 0 } });

        ok(isFluid(panes.eq(0).data("pane").size));
        ok(isPixelSize(panes.eq(1).data("pane").size));
    });

    module("splitter vertical pane resizing", SplitterHelpers.basicModule);

    test("resizing is initialized along with splitter", function() {
        splitter = create({ orientation: "vertical" });

        var resizingHandler = splitter.object.resizing;

        ok(resizingHandler);
        equal(resizingHandler.owner.element[0], splitter.dom[0]);
    });

    test("resizing.start creates splitbar ghost", function() {
        splitter = create({ orientation: "vertical" });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        var ghost = splitter.dom.find(".k-ghost-splitbar");

        equal(ghost.length, 1);
    });

    test("resizing constraints calculated from previous pane", function() {
        splitter = create({
            panes: [ { min: "35px", max: "150px" }, {} ],
            orientation: "vertical"
        }, 2, { height: 207 });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        equal(resizingHandler._min(), 35);
        equal(resizingHandler._max(), 150);
    });

    test("resizing constraints calculated from next pane", function() {
        splitter = create({
            panes: [ {}, { min: "35px", max: "150px" } ],
            orientation: "vertical"
        }, 2, { height: 207 });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);


        // min and max will be calculated with the previous pane as the origin, taking splitbar height into account
        equal(resizingHandler._min(), 50);
        equal(resizingHandler._max(), 165);
    });

    test("resizing constraints calculated from pane extremes", function() {
        splitter = create({
            panes: [ { min: "60px", max: "200px" }, { min: "35px", max: "150px" } ],
            orientation: "vertical"
        }, 2, { height: 207 });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        equal(resizingHandler._min(), 60);
        equal(resizingHandler._max(), 165);
    });

    test("resizing constraints for middle panes", function() {
        splitter = create({ orientation: "vertical" }, 4, { height: 421 });

        var resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitter.dom.find(".k-splitbar").eq(1) });

        equal(resizingHandler._min(), 107);
        equal(resizingHandler._max(), 307);
    });

    test("resizing.stop modifies pane sizes", function() {
        splitter = create({ orientation: "vertical" });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

            startResizing(splitter, { currentTarget: splitBar, y: {location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: {location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._stop({ currentTarget: splitBar, y: { location: initialSplitBarPosition + 5 } });

        QUnit.close(parseInt(panes[0].offsetHeight), initialPaneSizes[0] + 5, 1);
        QUnit.close(parseInt(panes[1].offsetHeight), initialPaneSizes[1] - 5, 1);
    });

    test("resizing.stop for middle panes", function() {
        splitter = create({ orientation: "vertical" }, 4, { height: 421 });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

        startResizing(splitter, { currentTarget: splitBar, y: {location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: {location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._stop({ currentTarget: splitBar, y: { location: initialSplitBarPosition + 5 } });

        QUnit.close(parseInt(panes[1].offsetHeight), initialPaneSizes[1] + 5, 1);
        QUnit.close(parseInt(panes[2].offsetHeight), initialPaneSizes[2] - 5, 1);
    });

    test("resizing.stop fires splitter resize", function() {
        var triggered = false;

        splitter = create({ orientation: "vertical", resize: function() {triggered = true;}});

        var splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitBar, y: {location: 0 } });
        resizingHandler._resizable._stop({ currentTarget: splitBar, y: { location: 0 } });

        ok(triggered);
    });

    test("resizing.stop does not resize splitter if Esc key was hit", function() {
        splitter = create({ orientation: "vertical" });

        var resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

            resizingHandler._resizable._start({ currentTarget: splitBar, y: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: {location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._stop({ keyCode: 27, currentTarget: splitBar });

        equal(parseInt(panes[0].offsetHeight), initialPaneSizes[0]);
        equal(parseInt(panes[1].offsetHeight), initialPaneSizes[1]);
    });

    test("resizing.stop does not fire resize when cancelling drag with Esc", function() {
        var triggered = false;

        splitter = create({ orientation: "vertical" });

        var splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        splitter.object.bind("resize", function() { triggered = true; });

        startResizing(splitter, { currentTarget: splitBar, y: {location: 0 } });
        resizingHandler._resizable._stop({ keyCode: 27, currentTarget: splitBar });

        ok(!triggered);
    });

    test("expanding an initially collapsed pane allows it to be resized", function() {
        splitter = create({
            panes: [
                { collapsed: true, collapsible: true, size: "50px" }, {}
            ]
        });

        var splitBar = splitter.dom.find(".k-splitbar"),
            panes = splitter.dom.find(".k-pane");

        splitter.object.expand(".k-pane:first");

        var resizingHandler = splitter.object.resizing;
        ok(splitBar.is(resizingHandler._resizable.draggable.options.filter));
    });

    test("panes can be collapsed after sizing them through size()", function() {
        splitter = create({
            panes: [ { collapsible: true, size: "50px" }, {} ]
        }, 2);

        var splitBar = splitter.dom.find(".k-splitbar"),
            panes = splitter.dom.find(".k-pane");

        splitter.object.size(".k-pane:first", 60);

        splitter.dom.find(".k-collapse-prev").trigger("click");

        equal(panes.eq(0).width(), 0)
    });

    module("Nested splitters", SplitterHelpers.basicModule);

    test("splitter is bound to parent splitter resize", function() {
        var outerSplitter = create({}, 2, { height: 207 }),
            innerSplitter =
                outerSplitter.dom.find(".k-pane").eq(0)
                    .html(SplitterHelpers.generateHtml())
                    .find("> div").css({
                        height: "100%",
                        width: "100%",
                        border: 0,
                        overflow: "hidden"
                    })
                    .kendoSplitter({ orientation: "vertical", resize: function(e) { triggered = true; } }),
            triggered = false;


        outerSplitter.dom.css({ width: 100, height: 100 });
        outerSplitter.object.resize();

        ok(triggered);
    });
})();
