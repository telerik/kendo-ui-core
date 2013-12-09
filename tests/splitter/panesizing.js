(function() {
    var splitter;
    var create = SplitterHelpers.create;

    module("splitter sizing horizontal", SplitterHelpers.basicModule);

    test("fluid resizable panes get equal sizes and a splitbar between them", function() {
        splitter = create({}, 2, { width: 307 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).width(), 150);
        equal(panes.eq(1).width(), 150);
        equal(panes.eq(1).offset().left - panes.offset().left, 157);
        equal(splitter.dom.find(".k-splitbar").offset().left - panes.offset().left, 150);
    });

    test("fluid panes get their size after allocating space for fixed panes", function() {
        splitter = create({
                panes: [ { size: "100px" }, {} ]
            }, 2, { width: 307 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).width(), 100);
        equal(panes.eq(1).width(), 200);
    });

    test("fluid panes get their size after allocating space for percentage panes", function() {
        splitter = create({
            panes: [ { size: "10%" }, {}, { size: "30%" } ]
        }, 3, { width: 314 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).width(), 30);
        equal(panes.eq(1).width(), 180);
        equal(panes.eq(2).width(), 90);
    });

    test("sizes of percentage panes get properly rounded", function() {
        splitter = create({
            panes: [ { size: "10%" }, {} ]
        }, 2, { width: 208 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes[0].style.width, "20px");
    });

    test("sizes of fluid panes get properly rounded", function() {
        splitter = create({}, 2, { width: 208 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).width(), 100);
        equal(panes.eq(1).width(), 101);
    });

    module("splitter sizing vertical", SplitterHelpers.basicModule);

    test("fluid resizable panes get equal sizes and a splitbar between them", function() {
        splitter = create({ orientation: "vertical" }, 2, { height: 307 });

        var panes = splitter.dom.find(".k-pane");

        equal(Math.round(panes.eq(0).height()), 150);
        equal(Math.round(panes.eq(1).height()), 150);
        equal(Math.round(panes.eq(1).offset().top - panes.offset().top), 157);
        equal(Math.round(splitter.dom.find(".k-splitbar").offset().top - panes.offset().top), 150);
    });

    test("fluid panes get their size after allocating space for fixed panes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "100px" },
                {}
            ]
        }, 2, { height: 307 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).height(), 100);
        equal(panes.eq(1).height(), 200);
    });

    test("fluid panes get their size after allocating space for percentage panes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "10%" }, {}, { size: "30%" }
            ]
        }, 3, { height: 314 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).height(), 30);
        equal(panes.eq(1).height(), 180);
        equal(panes.eq(2).height(), 90);
    });

    test("sizes of percentage panes get properly rounded", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "10%" },
                {}
            ]
        }, 2, { height: 208 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes[0].style.height, "20px");
    });

    test("sizes of fluid panes get properly rounded", function() {
        splitter = create({ orientation: "vertical" }, 2, { height: 208 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).height(), 100);
        equal(panes.eq(1).height(), 101);
    });

    test("sub-pixel pane sizes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [ { size: "20.0004px" }, {} ]
        }, 2, { height: 208 });

        var panes = splitter.dom.find(".k-pane");

        equal(panes[0].style.height, "20px");
    });

    module("splitter sizing with collapsing", SplitterHelpers.basicModule);

    test("collapsed panes have size 0", function() {
        splitter = create({
            panes: [{ collapsed: true }, {}]
        });

        var panes = splitter.dom.find(".k-pane");

        equal(panes.eq(0).width(), 0);
        equal(panes.eq(1).width(), 200);
    });
})();
