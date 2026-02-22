import '@progress/kendo-ui/src/kendo.list.js';

let StaticList = kendo.ui.StaticList,
    encode = kendo.htmlEncode,
    input,
    element;

describe("kendo.ui.StaticList Aria", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        element = $("<div></div>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        element.data("kendoStaticList").destroy();

        kendo.support.touch = false;
        kendo.support.mobileOS = false;
        kendo.ns = "";
        element = null;
    });

    it("StaticList renders aria-selected", function() {
        let staticlist = new StaticList(element, {
            dataSource: ["Item", "Item2"],
            template: (data) => encode(data),
            value: ["Item"]
        });

        staticlist.dataSource.read();

        assert.equal(staticlist.focus().attr("aria-selected"), "true");
    });

    it("StaticList renders aria-selected false", function() {
        let staticlist = new StaticList(element, {
            dataSource: ["Item", "Item2"],
            template: (data) => encode(data)
        });

        staticlist.dataSource.read();

        assert.equal(element.find("li[aria-selected=false]").length, 2);
    });
});
