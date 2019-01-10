(function() {
    var splitter;
    var create = SplitterHelpers.create;

    describe("initialization", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("constructor adds classes to container", function() {
            splitter = create({}, 1);

            assert.isOk(splitter.dom.hasClass("k-widget"));
            assert.isOk(splitter.dom.hasClass("k-splitter"));

            splitter = create({ orientation: "vertical" }, 1);

            assert.isOk(splitter.dom.hasClass("k-splitter"));
        });

        it("constructor interprets erronious orientation as horizontal", function() {
            splitter = create({ orientation: "diagonal" }, 1);

            assert.isOk(splitter.dom.hasClass("k-splitter"));
        });

        it("constructor interprets null orientation as horizontal", function() {
            splitter = create({ orientation: null }, 1);

            assert.isOk(splitter.dom.hasClass("k-splitter"));
        });

        it("init adds classes to child elements", function() {
            splitter = create({}, 1);

            assert.equal(splitter.dom.find(".k-pane").length, 1);
        });

        it("init adds splitbars between panes", function() {
            splitter = create({}, 3);

            var splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.length, 2);
            assert.equal(splitbars.eq(0).index(), 1);
            assert.equal(splitbars.eq(1).index(), 3);
            assert.equal(splitbars.attr("tabindex"), 0);
        });

        it("splitbars have collapse button for collapsible panes", function() {
            splitter = create({
                panes: [
                    { collapsible: true }, {}, { collapsible: true }
                ]
            }, 3);

            var splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.eq(0).find(".k-icon.k-i-arrow-60-left").length, 1);
            assert.equal(splitbars.eq(1).find(".k-icon.k-i-arrow-60-right").length, 1);
        });

        it("splitbars have resize handle between resizable panes", function() {
            splitter = create({
                panes: [
                    { resizable: false }, {}, {}
                ]
            }, 3);

            var splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.eq(0).find(".k-icon.k-resize-handle").length, 0);
            assert.equal(splitbars.eq(1).find(".k-icon.k-resize-handle").length, 1);
        });

        it("collapsed panes render expand arrow beside them", function() {
            splitter = create({
                panes: [
                    { collapsible: true, collapsed: true }, {}
                ]
            });

            assert.equal(splitter.dom.find(".k-i-arrow-60-right").length, 1);
        });

        it("splibars next to initially collapsed panes are not draggable", function() {
            splitter = create({
                panes: [
                    { collapsible: true, collapsed: true }, {}
                ]
            });

            assert.isOk(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
        });

        it("panes get k-scrollable class if they are scrollable", function() {
            splitter = create({
                panes: [
                    { scrollable: false }, {}
                ]
            });

            var panes = splitter.dom.find(".k-pane");

            assert.isOk(!panes.eq(0).hasClass("k-scrollable"));
            assert.isOk(panes.eq(1).hasClass("k-scrollable"));
        });

        it("inner splitters get resized after initialization of outer splitters", function() {
            var outerSplitter = $("<div id='outerSplitter' class='k-splitter' style='height:107px'><div /><div /></div>")
                .appendTo(Mocha.fixture),
                innerSplitter = $("<div id='innerSplitter' style='height:100%'><div /><div /></div>")
                    .appendTo(outerSplitter.find("div:first"));

            innerSplitter.kendoSplitter({
                orientation: "vertical"
            });

            outerSplitter.kendoSplitter({
                orientation: "horizontal"
            });

            assert.equal(innerSplitter.find(">div:first").height(), 50)
        });

        it("splibars between non-resizable and non-collapsible panes do not have a tabindex", function() {
            splitter = create({
                panes: [
                    { collapsible: false, resizable: false },
                    { collapsible: false, resizable: false }
                ]
            });

            assert.isOk(typeof splitter.dom.find(".k-splitbar").attr("tabindex") == "undefined");
        });

        //    it("initialization filters out script blocks", function() {
        //        var dom = $("<div><div /><div /><script><\/script></div>");

        //        dom.kendoSplitter();

        //        assert.equal(dom.find(".k-pane").length, 2);
        //    });
    });
}());
