import { roughlyEqual } from "../../helpers/unit/general-utils.js";
import { SplitterHelpers } from "../../helpers/unit/splitter-utils.js";

let splitter;
let create = SplitterHelpers.create;

describe("splitter sizing horizontal", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("fluid resizable panes get equal sizes and a splitbar between them", function() {
        splitter = create({}, 2, { width: 307 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).width(), 146, 1);
        roughlyEqual(panes.eq(1).width(), 147, 1);
        roughlyEqual(panes.eq(1).offset().left - panes.offset().left, 158, 1);
        roughlyEqual(splitter.dom.find(".k-splitbar").offset().left - panes.offset().left, 146, 1);
    });

    it("fluid panes get their size after allocating space for fixed panes", function() {
        splitter = create({
            panes: [{ size: "100px" }, {}]
        }, 2, { width: 307 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).width(), 100, 1);
        roughlyEqual(panes.eq(1).width(), 193, 1);
    });

    it("fluid panes get their size after allocating space for percentage panes", function() {
        splitter = create({
            panes: [{ size: "10%" }, {}, { size: "30%" }]
        }, 3, { width: 314 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).width(), 28, 1);
        roughlyEqual(panes.eq(1).width(), 174, 1);
        roughlyEqual(panes.eq(2).width(), 86, 1);
    });

    it("sizes of percentage panes get properly rounded", function() {
        splitter = create({
            panes: [{ size: "10%" }, {}]
        }, 2, { width: 208 });

        let panes = splitter.dom.find(".k-pane");

        assert.equal(panes[0].style.flexBasis, "19px");
    });

    it("sizes of fluid panes get properly rounded", function() {
        splitter = create({}, 2, { width: 208 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).width(), 97, 1);
        roughlyEqual(panes.eq(1).width(), 97, 1);
    });
});

describe("splitter sizing vertical", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("fluid resizable panes get equal sizes and a splitbar between them", function() {
        splitter = create({ orientation: "vertical" }, 2, { height: 307 });

        let panes = splitter.dom.find(".k-pane");

        assert.equal(Math.round(panes.eq(0).height()), 146);
        assert.equal(Math.round(panes.eq(1).height()), 147);
        assert.equal(Math.round(panes.eq(1).offset().top - panes.offset().top), 158);
        assert.equal(Math.round(splitter.dom.find(".k-splitbar").offset().top - panes.offset().top), 146);
    });

    it("fluid panes get their size after allocating space for fixed panes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "100px" },
                {}
            ]
        }, 2, { height: 307 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).height(), 100, 1);
        roughlyEqual(panes.eq(1).height(), 193, 1);
    });

    it("fluid panes get their size after allocating space for percentage panes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "10%" }, {}, { size: "30%" }
            ]
        }, 3, { height: 314 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).height(), 28, 1);
        roughlyEqual(panes.eq(1).height(), 174, 1);
        roughlyEqual(panes.eq(2).height(), 86, 1);
    });

    it("sizes of percentage panes get properly rounded", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { size: "10%" },
                {}
            ]
        }, 2, { height: 208 });

        let panes = splitter.dom.find(".k-pane");

        assert.equal(panes[0].style.flexBasis, "19px");
    });

    it("sizes of fluid panes get properly rounded", function() {
        splitter = create({ orientation: "vertical" }, 2, { height: 208 });

        let panes = splitter.dom.find(".k-pane");

        roughlyEqual(panes.eq(0).height(), 97, 1);
        roughlyEqual(panes.eq(1).height(), 97, 1);
    });

    it("sub-pixel pane sizes", function() {
        splitter = create({
            orientation: "vertical",
            panes: [{ size: "20.0004px" }, {}]
        }, 2, { height: 208 });

        let panes = splitter.dom.find(".k-pane");

        assert.equal(panes[0].style.flexBasis, "20px");
    });
});

describe("splitter sizing with collapsing", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("collapsed panes have size 0", function() {
        splitter = create({
            panes: [{ collapsed: true }, {}]
        });

        let panes = splitter.dom.find(".k-pane");

        assert.equal(panes.eq(0).width(), 0);
        roughlyEqual(panes.eq(1).width(), 193, 1);
    });
});
