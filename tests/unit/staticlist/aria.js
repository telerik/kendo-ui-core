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

    it("StaticList renders the listbox on the content when the data is grouped", function() {
        let staticlist = new StaticList(element, {
            id: "list_listbox",
            ariaLabel: "Items",
            dataSource: {
                data: [
                    { name: "Item", type: "a" },
                    { name: "Item2", type: "b" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            fixedGroupTemplate: (data) => encode(data)
        });

        staticlist.dataSource.read();

        assert.equal(staticlist.content.attr("role"), "listbox");
        assert.equal(staticlist.content.attr("id"), "list_listbox");
        assert.equal(staticlist.content.attr("aria-label"), "Items");
        assert.equal(staticlist.content.find("ul[role=group]").length, 2);
        assert.equal(staticlist.content.find("ul[role=listbox]").length, 0);
    });

    it("StaticList renders aria-multiselectable on the content when the data is grouped", function() {
        let staticlist = new StaticList(element, {
            selectable: "multiple",
            dataSource: {
                data: [
                    { name: "Item", type: "a" },
                    { name: "Item2", type: "b" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name)
        });

        staticlist.dataSource.read();

        assert.equal(staticlist.content.attr("aria-multiselectable"), "true");
    });

    it("StaticList does not render the listbox on the content when the data is not grouped", function() {
        let staticlist = new StaticList(element, {
            dataSource: ["Item", "Item2"],
            template: (data) => encode(data)
        });

        staticlist.dataSource.read();

        assert.isUndefined(staticlist.content.attr("role"));
        assert.isUndefined(staticlist.content.attr("id"));
        assert.equal(staticlist.content.find("ul").attr("role"), "listbox");
    });

    it("StaticList removes stale naming and selection attributes of the grouped content on setOptions", function() {
        let staticlist = new StaticList(element, {
            ariaLabel: "Items",
            selectable: "multiple",
            dataSource: {
                data: [
                    { name: "Item", type: "a" },
                    { name: "Item2", type: "b" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name)
        });

        staticlist.dataSource.read();

        assert.equal(staticlist.content.attr("aria-label"), "Items");
        assert.equal(staticlist.content.attr("aria-multiselectable"), "true");

        staticlist.setOptions({ ariaLabel: null, ariaLabelledBy: "label-id", selectable: true });

        assert.equal(staticlist.content.attr("role"), "listbox");
        assert.isUndefined(staticlist.content.attr("aria-label"));
        assert.isUndefined(staticlist.content.attr("aria-multiselectable"));
        assert.equal(staticlist.content.attr("aria-labelledby"), "label-id");

        staticlist.setOptions({ ariaLabelledBy: null });

        assert.isUndefined(staticlist.content.attr("aria-labelledby"));
    });

    it("StaticList removes the listbox from the content when the grouping is removed", function() {
        let staticlist = new StaticList(element, {
            ariaLabel: "Items",
            dataSource: {
                data: [
                    { name: "Item", type: "a" },
                    { name: "Item2", type: "b" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name)
        });

        staticlist.dataSource.read();
        staticlist.dataSource.group([]);

        assert.isUndefined(staticlist.content.attr("role"));
        assert.isUndefined(staticlist.content.attr("id"));
        assert.isUndefined(staticlist.content.attr("aria-label"));
        assert.equal(staticlist.content.find("ul").attr("role"), "listbox");
    });
});
