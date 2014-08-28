(function() {
    var splitter;
    var create = SplitterHelpers.create;

    module("initialization", SplitterHelpers.basicModule);

    test("constructor adds classes to container", function() {
        splitter = create({}, 1);

        ok(splitter.dom.hasClass("k-widget"));
        ok(splitter.dom.hasClass("k-splitter"));

        splitter = create({ orientation: "vertical" }, 1);

        ok(splitter.dom.hasClass("k-splitter"));
    });

    test("constructor interprets erronious orientation as horizontal", function() {
        splitter = create({ orientation: "diagonal" }, 1);

        ok(splitter.dom.hasClass("k-splitter"));
    });

    test("init adds classes to child elements", function() {
        splitter = create({}, 1);

        equal(splitter.dom.find(".k-pane").length, 1);
    });

    test("init adds splitbars between panes", function() {
        splitter = create({}, 3);

        var splitbars = splitter.dom.find(".k-splitbar");

        equal(splitbars.length, 2);
        equal(splitbars.eq(0).index(), 1);
        equal(splitbars.eq(1).index(), 3);
        equal(splitbars.attr("tabindex"), 0);
    });

    test("splitbars have collapse button for collapsible panes", function() {
        splitter = create({
            panes: [
                { collapsible: true }, {}, { collapsible: true }
            ]
        }, 3);

        var splitbars = splitter.dom.find(".k-splitbar");

        equal(splitbars.eq(0).find(".k-icon.k-collapse-prev").length, 1);
        equal(splitbars.eq(1).find(".k-icon.k-collapse-next").length, 1);
    });

    test("splitbars have resize handle between resizable panes", function() {
        splitter = create({
            panes: [
                { resizable: false }, {}, {}
            ]
        }, 3);

        var splitbars = splitter.dom.find(".k-splitbar");

        equal(splitbars.eq(0).find(".k-icon.k-resize-handle").length, 0);
        equal(splitbars.eq(1).find(".k-icon.k-resize-handle").length, 1);
    });

    test("collapsed panes render expand arrow beside them", function() {
        splitter = create({
            panes: [
                { collapsible: true, collapsed: true }, {}
            ]
        });

        equal(splitter.dom.find(".k-expand-prev").length, 1);
    });

    test("splibars next to initially collapsed panes are not draggable", function() {
        splitter = create({
            panes: [
                { collapsible: true, collapsed: true }, {}
            ]
        });

        ok(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
    });

    test("panes get k-scrollable class if they are scrollable", function() {
        splitter = create({
            panes: [
                { scrollable: false }, {}
            ]
        });

        var panes = splitter.dom.find(".k-pane");

        ok(!panes.eq(0).hasClass("k-scrollable"));
        ok(panes.eq(1).hasClass("k-scrollable"));
    });

    test("inner splitters get resized after initialization of outer splitters", function() {
        var outerSplitter = $("<div id='outerSplitter' class='k-splitter' style='height:107px'><div /><div /></div>")
                .appendTo(QUnit.fixture),
            innerSplitter = $("<div id='innerSplitter' style='height:100%'><div /><div /></div>")
                .appendTo(outerSplitter.find("div:first"));

        innerSplitter.kendoSplitter({
            orientation: "vertical"
        });

        outerSplitter.kendoSplitter({
            orientation: "horizontal"
        });

        equal(innerSplitter.find(">div:first").height(), 50)
    });

    test("splibars between non-resizable and non-collapsible panes do not have a tabindex", function () {
        splitter = create({
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, resizable: false }
            ]
        });

        ok(typeof splitter.dom.find(".k-splitbar").attr("tabindex") == "undefined");
    });

//    test("initialization filters out script blocks", function() {
//        var dom = $("<div><div /><div /><script><\/script></div>");

//        dom.kendoSplitter();

//        equal(dom.find(".k-pane").length, 2);
//    });
})();
