(function() {
    var splitter;
    var create = SplitterHelpers.create;

    describe("splitter sizing horizontal", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("fluid resizable panes get equal sizes and a splitbar between them", function() {
            splitter = create({}, 2, { width: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 150);
            assert.equal(panes.eq(1).width(), 150);
            assert.equal(panes.eq(1).offset().left - panes.offset().left, 157);
            assert.equal(splitter.dom.find(".k-splitbar").offset().left - panes.offset().left, 150);
        });

        it("fluid panes get their size after allocating space for fixed panes", function() {
            splitter = create({
                panes: [{ size: "100px" }, {}]
            }, 2, { width: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 100);
            assert.equal(panes.eq(1).width(), 200);
        });

        it("fluid panes get their size after allocating space for percentage panes", function() {
            splitter = create({
                panes: [{ size: "10%" }, {}, { size: "30%" }]
            }, 3, { width: 314 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 30);
            assert.equal(panes.eq(1).width(), 180);
            assert.equal(panes.eq(2).width(), 90);
        });

        it("sizes of percentage panes get properly rounded", function() {
            splitter = create({
                panes: [{ size: "10%" }, {}]
            }, 2, { width: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes[0].style.width, "20px");
        });

        it("sizes of fluid panes get properly rounded", function() {
            splitter = create({}, 2, { width: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 100);
            assert.equal(panes.eq(1).width(), 101);
        });
    });

    describe("splitter sizing vertical", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("fluid resizable panes get equal sizes and a splitbar between them", function() {
            splitter = create({ orientation: "vertical" }, 2, { height: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(Math.round(panes.eq(0).height()), 150);
            assert.equal(Math.round(panes.eq(1).height()), 150);
            assert.equal(Math.round(panes.eq(1).offset().top - panes.offset().top), 157);
            assert.equal(Math.round(splitter.dom.find(".k-splitbar").offset().top - panes.offset().top), 150);
        });

        it("fluid panes get their size after allocating space for fixed panes", function() {
            splitter = create({
                orientation: "vertical",
                panes: [
                    { size: "100px" },
                    {}
                ]
            }, 2, { height: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).height(), 100);
            assert.equal(panes.eq(1).height(), 200);
        });

        it("fluid panes get their size after allocating space for percentage panes", function() {
            splitter = create({
                orientation: "vertical",
                panes: [
                    { size: "10%" }, {}, { size: "30%" }
                ]
            }, 3, { height: 314 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).height(), 30);
            assert.equal(panes.eq(1).height(), 180);
            assert.equal(panes.eq(2).height(), 90);
        });

        it("sizes of percentage panes get properly rounded", function() {
            splitter = create({
                orientation: "vertical",
                panes: [
                    { size: "10%" },
                    {}
                ]
            }, 2, { height: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes[0].style.height, "20px");
        });

        it("sizes of fluid panes get properly rounded", function() {
            splitter = create({ orientation: "vertical" }, 2, { height: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).height(), 100);
            assert.equal(panes.eq(1).height(), 101);
        });

        it("sub-pixel pane sizes", function() {
            splitter = create({
                orientation: "vertical",
                panes: [{ size: "20.0004px" }, {}]
            }, 2, { height: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes[0].style.height, "20px");
        });
    });

    describe("splitter sizing with collapsing", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("collapsed panes have size 0", function() {
            splitter = create({
                panes: [{ collapsed: true }, {}]
            });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 0);
            assert.equal(panes.eq(1).width(), 200);
        });
    });
}());
