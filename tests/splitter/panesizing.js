(function() {
    var splitter;
    var create = SplitterHelpers.create;

    describe("splitter sizing horizontal", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("fluid resizable panes get equal sizes and a splitbar between them", function() {
            splitter = create({}, 2, { width: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 148);
            assert.equal(panes.eq(1).width(), 149);
            assert.equal(panes.eq(1).offset().left - panes.offset().left, 156);
            assert.equal(splitter.dom.find(".k-splitbar").offset().left - panes.offset().left, 148);
        });

        it("fluid panes get their size after allocating space for fixed panes", function() {
            splitter = create({
                panes: [{ size: "100px" }, {}]
            }, 2, { width: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 100);
            assert.equal(panes.eq(1).width(), 197);
        });

        it("fluid panes get their size after allocating space for percentage panes", function() {
            splitter = create({
                panes: [{ size: "10%" }, {}, { size: "30%" }]
            }, 3, { width: 314 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 29);
            assert.equal(panes.eq(1).width(), 179);
            assert.equal(panes.eq(2).width(), 88);
        });

        it("sizes of percentage panes get properly rounded", function() {
            splitter = create({
                panes: [{ size: "10%" }, {}]
            }, 2, { width: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes[0].style.width, "19px");
        });

        it("sizes of fluid panes get properly rounded", function() {
            splitter = create({}, 2, { width: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).width(), 99);
            assert.equal(panes.eq(1).width(), 99);
        });
    });

    describe("splitter sizing vertical", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("fluid resizable panes get equal sizes and a splitbar between them", function() {
            splitter = create({ orientation: "vertical" }, 2, { height: 307 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(Math.round(panes.eq(0).height()), 148);
            assert.equal(Math.round(panes.eq(1).height()), 149);
            assert.equal(Math.round(panes.eq(1).offset().top - panes.offset().top), 156);
            assert.equal(Math.round(splitter.dom.find(".k-splitbar").offset().top - panes.offset().top), 148);
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
            assert.equal(panes.eq(1).height(), 197);
        });

        it("fluid panes get their size after allocating space for percentage panes", function() {
            splitter = create({
                orientation: "vertical",
                panes: [
                    { size: "10%" }, {}, { size: "30%" }
                ]
            }, 3, { height: 314 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).height(), 29);
            assert.equal(panes.eq(1).height(), 179);
            assert.equal(panes.eq(2).height(), 88);
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

            assert.equal(panes[0].style.height, "19px");
        });

        it("sizes of fluid panes get properly rounded", function() {
            splitter = create({ orientation: "vertical" }, 2, { height: 208 });

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.eq(0).height(), 99);
            assert.equal(panes.eq(1).height(), 99);
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
            assert.equal(panes.eq(1).width(), 197);
        });
    });
}());
