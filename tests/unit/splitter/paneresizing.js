import { roughlyEqual } from "../../helpers/unit/general-utils.js";
import { SplitterHelpers } from "../../helpers/unit/splitter-utils.js";

let splitter;
let create = SplitterHelpers.create;

function startResizing(splitter, options) {
    let resizingHandler = splitter.object.resizing;
    options = $.extend({ x: { location: 0 }, y: { location: 0 }, currentTarget: splitter.dom.find(".k-splitbar") }, options);
    options.x.startLocation = options.x.location;
    options.y.startLocation = options.y.location;

    resizingHandler._resizable._start(options);
}

function isPercentageSize(size) {
    return /^\d+(\.\d+)?%$/.test(size);
}

function isPixelSize(size) {
    return /^\d+px$/.test(size);
}

function isFluid(size) {
    return !isPercentageSize(size) && !isPixelSize(size);
}

describe("splitter horizontal pane resizing", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("resizing is initialized along with splitter", function() {
        splitter = create();

        let resizingHandler = splitter.object.resizing;

        assert.isOk(resizingHandler);
        assert.equal(resizingHandler.owner.element[0], splitter.dom[0]);
    });

    it("resizing.start creates splitbar ghost", function() {
        splitter = create();

        startResizing(splitter);

        let ghost = splitter.dom.find(".k-ghost-splitbar");

        assert.equal(ghost.length, 1);
    });

    it("resizing constraints calculated from previous pane", function() {
        splitter = create({
            panes: [{ min: "35px", max: "150px" }, {}]
        });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        assert.equal(resizingHandler._min(), 35);
        assert.equal(resizingHandler._max(), 150);
    });

    it("resizing constraints calculated from next pane", function() {
        splitter = create({
            panes: [{}, { min: "35px", max: "150px" }]
        });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        assert.equal(resizingHandler._min(), 43);
        assert.equal(resizingHandler._max(), 158);
    });

    it("resizing constraints calculated from splitbar width", function() {
        splitter = create({
            panes: [{}, {}]
        });

        let resizingHandler = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        splitbar.width(15);
        splitter.object._resize();

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        assert.equal(resizingHandler._min(), 0);
        roughlyEqual(resizingHandler._max(), splitter.dom.width() - splitbar.outerWidth(), 1);
    });

    it("resizing constraints calculated from splitbar width and pane extremes", function() {
        splitter = create({
            panes: [{}, { min: "35px", max: "150px" }]
        }, 2, { width: 210 });

        let resizingHandler = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        splitbar.width(8);
        splitter.object._resize();

        startResizing(splitter);

        // min and max will be calculated with the previous pane as the origin, taking splitbar width into account
        assert.equal(resizingHandler._min(), 50);
        assert.equal(resizingHandler._max(), 165);
    });

    it("resizing constraints calculated from pane extremes", function() {
        splitter = create({
            panes: [{ min: "60px", max: "200px" }, { min: "35px", max: "150px" }]
        });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        assert.equal(resizingHandler._min(), 60);
        assert.equal(resizingHandler._max(), 158);
    });

    it("resizing constraints for middle panes", function() {
        splitter = create({}, 4, { width: 421 });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitter.dom.find(".k-splitbar").eq(1) });

        assert.equal(resizingHandler._min(), 107);
        assert.equal(resizingHandler._max(), 297);
    });

    it.skip("resizing.dragend modifies pane sizes", function() {
        splitter = create();

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        assert.equal(parseInt(panes[0].offsetWidth), (initialPaneSizes[0] + 5));
        assert.equal(parseInt(panes[1].offsetWidth), (initialPaneSizes[1] - 5));
    });

    it.skip("resizing.dragend for middle panes", function() {
        splitter = create({}, 4, { width: 421 });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        assert.equal(panes[1].offsetWidth, initialPaneSizes[1] + 5);
        assert.equal(panes[2].offsetWidth, initialPaneSizes[2] - 5);
    });

    it.skip("resizing.dragend with variable splitbar widths", function() {
        splitter = create({}, 4, { width: 421 });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1).width(8);

        splitter.object._resize();

        let initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetWidth); });


        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: initialSplitBarPosition + 5 } });

        roughlyEqual(panes[1].offsetWidth, initialPaneSizes[1] + 5, 1);
        roughlyEqual(panes[2].offsetWidth, initialPaneSizes[2] - 5, 1);
    });

    it("resizing.dragend fires splitter resize", function() {
        let triggered = false;

        splitter = create({ resize: function() { triggered = true; } });

        let splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        startResizing(splitter);
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: 0 } });

        assert.isOk(triggered);
    });

    it.skip("resizing.dragend for panes with constraints", function() {
        splitter = create({ panes: [{ min: "50px" }, {}] });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: 0 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: 0 } });

        assert.equal(panes[0].offsetWidth, 50);
        assert.equal(panes[1].offsetWidth, 143);
    });

    it.skip("resizing.dragend assigns percentage sizes when resizing fluid panes", function() {
        splitter = create({ panes: [{ size: "100px" }, {}] });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar });

        assert.isOk(isPixelSize(panes.eq(0).data("pane").size));
        assert.isOk(isFluid(panes.eq(1).data("pane").size));
    });

    it("resizing.dragend assigns percentage sizes when resizing fluid panes", function() {
        splitter = create({ panes: [{}, { size: "100px" }] });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().left,
            panes = splitter.dom.find(".k-pane");

        startResizing(splitter, { currentTarget: splitBar, x: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ x: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, x: { location: 0 } });

        assert.isOk(isFluid(panes.eq(0).data("pane").size));
        assert.isOk(isPixelSize(panes.eq(1).data("pane").size));
    });
});

describe("splitter vertical pane resizing", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("resizing is initialized along with splitter", function() {
        splitter = create({ orientation: "vertical" });

        let resizingHandler = splitter.object.resizing;

        assert.isOk(resizingHandler);
        assert.equal(resizingHandler.owner.element[0], splitter.dom[0]);
    });

    it("resizing.start creates splitbar ghost", function() {
        splitter = create({ orientation: "vertical" });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        let ghost = splitter.dom.find(".k-ghost-splitbar");

        assert.equal(ghost.length, 1);
    });

    it("resizing constraints calculated from previous pane", function() {
        splitter = create({
            panes: [{ min: "35px", max: "150px" }, {}],
            orientation: "vertical"
        }, 2, { height: 207 });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        assert.equal(resizingHandler._min(), 35);
        assert.equal(resizingHandler._max(), 150);
    });

    it("resizing constraints calculated from next pane", function() {
        splitter = create({
            panes: [{}, { min: "35px", max: "150px" }],
            orientation: "vertical"
        }, 2, { height: 207 });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);


        // min and max will be calculated with the previous pane as the origin, taking splitbar height into account
        assert.equal(resizingHandler._min(), 43);
        assert.equal(resizingHandler._max(), 158);
    });

    it("resizing constraints calculated from pane extremes", function() {
        splitter = create({
            panes: [{ min: "60px", max: "200px" }, { min: "35px", max: "150px" }],
            orientation: "vertical"
        }, 2, { height: 207 });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter);

        assert.equal(resizingHandler._min(), 60);
        assert.equal(resizingHandler._max(), 158);
    });

    it("resizing constraints for middle panes", function() {
        splitter = create({ orientation: "vertical" }, 4, { height: 421 });

        let resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitter.dom.find(".k-splitbar").eq(1) });

        assert.equal(resizingHandler._min(), 107);
        assert.equal(resizingHandler._max(), 297);
    });

    it.skip("resizing.dragend modifies pane sizes", function() {
        splitter = create({ orientation: "vertical" });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

        startResizing(splitter, { currentTarget: splitBar, y: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, y: { location: initialSplitBarPosition + 5 } });

        assert.closeTo(parseInt(panes[0].offsetHeight), initialPaneSizes[0] + 5, 1);
        assert.closeTo(parseInt(panes[1].offsetHeight), initialPaneSizes[1] - 5, 1);
    });

    it.skip("resizing.dragend for middle panes", function() {
        splitter = create({ orientation: "vertical" }, 4, { height: 421 });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar").eq(1),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

        startResizing(splitter, { currentTarget: splitBar, y: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, y: { location: initialSplitBarPosition + 5 } });

        assert.closeTo(parseInt(panes[1].offsetHeight), initialPaneSizes[1] + 5, 1);
        assert.closeTo(parseInt(panes[2].offsetHeight), initialPaneSizes[2] - 5, 1);
    });

    it("resizing.dragend fires splitter resize", function() {
        let triggered = false;

        splitter = create({ orientation: "vertical", resize: function() { triggered = true; } });

        let splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        startResizing(splitter, { currentTarget: splitBar, y: { location: 0 } });
        resizingHandler._resizable._dragend({ currentTarget: splitBar, y: { location: 0 } });

        assert.isOk(triggered);
    });

    it("resizing.dragend does not resize splitter if Esc key was hit", function() {
        splitter = create({ orientation: "vertical" });

        let resizingHandler = splitter.object.resizing,
            splitBar = splitter.dom.find(".k-splitbar"),
            initialSplitBarPosition = splitBar.offset().top,
            panes = splitter.dom.find(".k-pane"),
            initialPaneSizes = $.map(panes, function(x) { return parseInt(x.offsetHeight); });

        resizingHandler._resizable._start({ currentTarget: splitBar, y: { location: initialSplitBarPosition } });
        resizingHandler._resizable._resize({ y: { location: initialSplitBarPosition + 5 } });
        resizingHandler._resizable._dragend({ keyCode: 27, currentTarget: splitBar });

        assert.equal(parseInt(panes[0].offsetHeight), initialPaneSizes[0]);
        assert.equal(parseInt(panes[1].offsetHeight), initialPaneSizes[1]);
    });

    it("resizing.dragend does not fire resize when cancelling drag with Esc", function() {
        let triggered = false;

        splitter = create({ orientation: "vertical" });

        let splitBar = splitter.dom.find(".k-splitbar"),
            resizingHandler = splitter.object.resizing;

        splitter.object.bind("resize", function() { triggered = true; });

        startResizing(splitter, { currentTarget: splitBar, y: { location: 0 } });
        resizingHandler._resizable._dragend({ keyCode: 27, currentTarget: splitBar });

        assert.isOk(!triggered);
    });

    it("expanding an initially collapsed pane allows it to be resized", function() {
        splitter = create({
            panes: [
                { collapsed: true, collapsible: true, size: "50px" }, {}
            ]
        });

        let splitBar = splitter.dom.find(".k-splitbar"),
            panes = splitter.dom.find(".k-pane");

        splitter.object.expand(".k-pane:first");

        let resizingHandler = splitter.object.resizing;
        assert.isOk(splitBar.is(resizingHandler._resizable.draggable.options.filter));
    });

    it("panes can be collapsed after sizing them through size()", function() {
        splitter = create({
            panes: [{ collapsible: true, size: "50px" }, {}]
        }, 2);

        let splitBar = splitter.dom.find(".k-splitbar"),
            panes = splitter.dom.find(".k-pane");

        splitter.object.size(".k-pane:first", 60);

        splitter.dom.find(".k-collapse-prev").trigger("click");

        assert.equal(panes.eq(0).width(), 0);
    });
});

describe("Nested splitters", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("splitter is bound to parent splitter resize", function() {
        let outerSplitter = create({}, 2, { height: 207 }),
            triggered = false,
            innerSplitter =
                outerSplitter.dom.find(".k-pane").eq(0)
                    .html(SplitterHelpers.generateHtml())
                    .find("> div").css({
                        height: "100%",
                        width: "100%",
                        border: 0,
                        overflow: "hidden"
                    })
                    .kendoSplitter({ orientation: "vertical", resize: function(e) { triggered = true; } });


        outerSplitter.dom.css({ width: 100, height: 100 });
        outerSplitter.object.resize();

        assert.isOk(triggered);
    });
});
