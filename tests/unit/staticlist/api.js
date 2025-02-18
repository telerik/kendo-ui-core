import '@progress/kendo-ui/src/kendo.list.js';
import { stub } from '../../helpers/unit/stub.js';
import { roughlyEqual } from '../../helpers/unit/general-utils.js';

let StaticList = kendo.ui.StaticList,
    encode = kendo.htmlEncode,
    element;

describe("kendo.ui.StaticList API", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        element = $("<ul></ul>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        element.data("kendoStaticList").destroy();

        kendo.support.touch = false;
        kendo.support.mobileOS = false;
        kendo.support.kineticScrollNeeded = false;
        kendo.ns = "";
    });

    it("setDataSource method overrides current data source", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data)
        });

        list.setDataSource(["1", "2"]);

        list.dataSource.read();

        assert.equal(list.dataSource.view().length, 2);
    });

    it("setDataSource method clears value before setting the new source", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data),
            value: "item"
        });

        list.dataSource.read();

        list.bind("change", function() {
            assert.equal(list.value().length, 0);
        });

        list.setDataSource(["1", "2"]);
    });

    it("setDataSource method sets value silently after source is changed", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data),
            value: "item"
        });

        list.dataSource.read();

        list.bind("change", function() {
            assert.isOk(true); //called only once
        });

        list.setDataSource(["1", "2"]);

        assert.equal(list.value().length, 1);
        assert.equal(list.value()[0], "item");
    });

    it("setDataSource method shows fixed header", function() {
        let list = new StaticList(element, {
            fixedGroupTemplate: (data) => encode(data),
            template: (data) => encode(data),
            value: "item"
        });

        list.setDataSource({
            data: [{ text: "item" }],
            group: { field: "text" }
        });

        assert.isOk(list.header.is(":visible"));
    });

    it("setOptions re-create templates", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.setOptions({
            template: (data) => `new ${encode(data)}`
        });

        assert.equal(element.children(":first").find(".k-list-item-text").html(), "new item");
    });

    it("setOptions does not update bound state", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data)
        });

        list.setOptions({
            template: (data) => `new ${encode(data)}`
        });

        assert.isOk(!list.bound());
    });

    it("setValue method updates values of the widget silently", function() {
        let list = new StaticList(element, {
            dataSource: ["item"],
            template: (data) => encode(data)
        });

        list.setValue("item");

        let value = list.value();
        let indices = list.select();

        assert.equal(indices.length, 0);

        assert.equal(value.length, 1);
        assert.equal(value[0], "item");
    });

    it("widget focuses last selected item during rendering", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple",
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        let current = list.focus();

        assert.equal(current[0], list.element[0].children[1]);
    });

    it("dataItems method returns list of the selected items", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(2);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 2);
        assert.equal(dataItems[0], list.dataSource.view()[0].items[0]);
        assert.equal(dataItems[1], list.dataSource.view()[1].items[0]);
    });

    it("dataItems method sets selected values", function() {
        let data = [
            { name: "item1", type: "a" },
            { name: "item2", type: "b" },
            { name: "item3", type: "a" }
        ];

        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: data,
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.selectedDataItems([data[0], data[2]]);

        let values = list.value();

        assert.equal(values.length, 2);
        assert.equal(values[0], "item1");
        assert.equal(values[1], "item3");
    });

    it("dataItemByIndex method returns a dataItem corresponding to the index", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        let dataItem = list.dataItemByIndex(2);

        assert.equal(dataItem, list.dataSource.view()[1].items[0]);
    });

    it("focus method focuses li element", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.focus(children.eq(1));

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("focus method focuses by index", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.focus(1);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("focus method clears focus if index is -1", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.focus(1);
        list.focus(-1);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("focusIndex returns the index of the focused item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.focus(children.eq(1));
        assert.equal(list.focusIndex(), 1);
    });

    it("focusIndex returns undefined if no item is focused", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.focus(1);
        list.focus(-1);

        assert.isOk(!list.focusIndex());
    });

    it("select an item by element", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(children.eq(1));


        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus k-selected");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method does not unselect already selected item (single selection)", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.select(1);

        list.bind("change", function() {
            assert.isOk(false);
        });

        list.select(1); //select again
    });

    it("select method selects same index if filtered", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.select(1);

        list.bind("change", function() {
            assert.isOk(true);
        });

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        list.select(1); //select again
    });

    it("select an item by index", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);


        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus k-selected");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("selects a single item if selectable is single", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: true,
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select([1, 2]);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-focus k-selected");
    });

    it("select items by indices", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select([1, 2]);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-selected");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-focus k-selected");
    });

    it("select method handles unexisting indices", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data),
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        let children = element.children();

        list.select([3]);

        assert.isOk(true);
    });

    it("deselect items by indices", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data),
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        let children = element.children();

        list.select([0, 2]);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-focus");
    });

    it("select method deselects previous item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.select(0);

        assert.equal(children.eq(0).attr("class"), "k-list-item k-focus k-selected");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method deselects selected items is index is -1", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.select(-1);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method selects multiple items", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.select(0);

        assert.equal(children.eq(0).attr("class"), "k-list-item k-focus k-selected");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-selected");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method deselects item in 'multiple' mode", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.select(1);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method unselects items if empty array is passed", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.select([]);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("select method works with grouped data source", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus k-selected");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-first");
    });

    it("select method sets selected data items", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.select(1);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 1);
        assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
    });

    it("select method sets selected data items when multiple elements are selected", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(1);
        list.select(0);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 2);
        assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
        assert.equal(dataItems[1], list.dataSource.view()[0].items[0]);
    });

    it("select method removes dataItems on deselect", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        list.select(0);
        list.select(1);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 0);
    });

    it("select method removes dataItems in single mode selection", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 1);
        assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
    });

    it("select method sets selected values", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.select(1);

        let values = list.value();

        assert.equal(values.length, 1);
        assert.equal(values[0], list.dataSource.view()[0].items[1].name);
    });

    it("select method deletes selected value on item unselect", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ]
            },
            template: (data) => encode(data.name),
            value: ["item2"]
        });

        list.dataSource.read();

        list.select(-1);

        let values = list.value();

        assert.equal(values.length, 0);
    });

    it("select method sets selected values when multiple elements are selected", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(1);
        list.select(0);

        let values = list.value();

        assert.equal(values.length, 2);
        assert.equal(values[0], list.dataSource.view()[0].items[1].name);
        assert.equal(values[1], list.dataSource.view()[0].items[0].name);
    });

    it("select method removes values on deselect", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        list.select(0);
        list.select(1);

        let values = list.value();

        assert.equal(values.length, 0);
    });

    it("select method removes values in single mode selection", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        let value = list.value();

        assert.equal(value.length, 1);
        assert.equal(value[0], list.dataSource.view()[0].items[1].name);
    });

    it("select method returns selected indices", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.select(1);

        let indices = list.select();

        assert.equal(indices.length, 1);
        assert.equal(indices[0], 1);
    });

    it("select method de-selects item when filtered (multiple selection)", function() {
        let list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item2"
        });

        list.bind("change", function(e) {
            let added = e.added;
            let removed = e.removed;

            assert.equal(added.length, 0);

            assert.equal(removed.length, 1);
            assert.equal(removed[0].position, 0);
            assert.equal(removed[0].dataItem.name, "item2");

            assert.equal(list.element.find(".k-selected").length, 0);
        });

        list.select(0);
    });

    it("value method selects an item", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.value("item1");

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 1);
        assert.equal(dataItems[0], list.dataSource.view()[0].items[0]);
    });

    it("value method selects multiple items", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.value(["item2", "item3"]);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 2);
        assert.equal(dataItems[0], list.dataSource.view()[1].items[0]);
        assert.equal(dataItems[1], list.dataSource.view()[0].items[1]);
    });

    it("value method does not immediately resolves the valueDeffered object in multiple selection mode", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.dataSource.read();

        list.value(["item2", "item3"]).done(function() {
            let selected = list.select();

            assert.equal(selected.length, 2);
            assert.equal(selected[0], 2);
            assert.equal(selected[1], 1);
        });
    });

    it("value method clears selected items", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.value([]);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 0);
    });

    it("value method sets selected indices", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple"
        });

        list.value(["item2", "item3"]);

        list.dataSource.read();

        let indices = list.select();

        assert.equal(indices.length, 2);
        assert.equal(indices[0], 2); //Item2
        assert.equal(indices[1], 1); //Item3 (this is before item 2 in grouped list)
    });

    it("value method deselects an item", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            value: "item1"
        });

        list.dataSource.read();

        list.value([]);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 0);
    });

    it("value method removes multiple values", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
            selectable: "multiple",
            value: ["item1", "item2", "item3"]
        });

        list.dataSource.read();

        list.value(["item3"]);

        let dataItems = list.selectedDataItems();

        assert.equal(dataItems.length, 1);
        assert.equal(dataItems[0].name, "item3");
    });

    it("value method supports null", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.value(null);

        assert.isOk(Array.isArray(list.value()));
    });

    it("value method supports empty string", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.value("");

        let value = list.value();
        assert.isOk(Array.isArray(value));
        assert.equal(value.length, 0);
    });

    it("value method selects an item with empty string value", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.value("");

        assert.equal(list.select()[0], 0);
    });

    it("value method selects an item with null value", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: null, type: "b" },
                    { name: "item3", type: "a" }
                ]
            },
            template: (data) => encode(data.name),
            groupTemplate: (data) => encode(data),
        });

        list.dataSource.read();

        list.value(null);

        assert.equal(list.select()[0], 1);
    });

    it("value method deselects deselects all items if value is []", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let children = element.children();

        list.select(1);
        list.value([]);

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("value method returns promise", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.value("item").done(function() {
            assert.isOk(true);
        });
    });

    it("value method returns promise that is resolved on bind", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.value("item").done(function() {
            assert.isOk(true);
        });

        list.dataSource.read();
    });

    it("value method clears previous selected items (single selection)", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.value("item1");
        list.value("item2");

        assert.equal(list.element.children(".k-selected").length, 1);
    });

    it("value method selects item with unescaped characters", function() {
        let list = new StaticList(element, {
            dataSource: ["item1\"", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.value("item1\"");

        assert.equal(list.element.children(".k-selected").length, 1);
    });

    it("next method focuses first item if no items are focused", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focusNext();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("next method focuses next item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focus(0);
        list.focusNext();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("prev method focuses last item if no items are focused", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focusPrev();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-focus");
    });

    it("prev method focuses prev item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focus(2);
        list.focusPrev();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("first method focuses first item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focusFirst();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item k-focus");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item");
    });

    it("last method focuses last item", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.focusLast();

        let children = element.children();

        assert.equal(children.eq(0).attr("class"), "k-list-item");
        assert.equal(children.eq(1).attr("class"), "k-list-item");
        assert.equal(children.eq(2).attr("class"), "k-list-item k-focus");
    });

    it("scrollToIndex passes the correct item to scroll method", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        stub(list, {
            scroll: list.scroll
        });

        list.dataSource.read();

        list.scrollToIndex(2);

        let children = element[0].children;

        assert.equal(list.calls("scroll"), 1);
        assert.equal(list.args("scroll")[0], children[2]);
    });

    let getData = function(length) {
        let result = [];
        for (let idx = 0; idx < length; idx++) {
            result.push("item" + idx);
        }
        return result;
    };

    it("screenHeight gets the clientHeight of the content", function() {
        let list = new StaticList(element, {
            dataSource: getData(100),
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let content = list.content.outerHeight(200);

        assert.equal(list.screenHeight(), 200);
    });

    it("scrollWith moves scroll position down", function() {
        let list = new StaticList(element, {
            dataSource: getData(100),
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let content = list.content
            .height(200)
            .scrollTop(100);

        list.scrollWith(50);

        assert.isOk(content[0].scrollTop, 150);
    });

    it("scrollWith moves scroll position up", function() {
        let list = new StaticList(element, {
            dataSource: getData(100),
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let content = list.content
            .height(200)
            .scrollTop(100);

        list.scrollWith(-50);

        roughlyEqual(content[0].scrollTop, 50, 1);
    });

    it("bound returns bound state of the list", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        assert.equal(list.bound(), false);

        list.dataSource.read();

        assert.equal(list.bound(), true);
    });

    it("bound sets bound state of the widget", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.bound(false);

        assert.equal(list.bound(), false);
    });

    it("filter method prevent value selection on re-bind", function() {
        let list = new StaticList(element, {
            value: "item2",
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();
        list.dataSource.filter({
            field: "",
            operator: "eq",
            value: "item1"
        });

        assert.equal(list.value(), "item2");
    });

    it("removeAt method removes values at current position", function() {
        let list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data),
            value: ["item2", "item1"]
        });

        list.dataSource.read();

        list.removeAt(0);

        let value = list.value();
        let indices = list.select();
        let dataItems = list.selectedDataItems();

        assert.equal(value.length, 1);
        assert.equal(indices.length, 1);
        assert.equal(dataItems.length, 1);

        assert.equal(value[0], "item1");
        assert.equal(indices[0], 0);
        assert.equal(dataItems[0], "item1");
    });

    it("removeAt method returns removed dataItem", function() {
        let list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data),
            value: ["item2", "item1"]
        });

        list.dataSource.read();

        let removed = list.removeAt(0);

        assert.equal(removed.position, 0);
        assert.equal(removed.dataItem, "item2");
        assert.isOk(!Array.isArray(removed.dataItem));
    });

    it("items returns item elements", function() {
        let list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        let items = list.items();
        assert.equal(items.length, 3);
        assert.isOk(items.eq(0).hasClass("k-list-item"));
    });

    it("isFiltered method returns true if source is filtered", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        assert.isOk(list.isFiltered());
    });

    it("isFiltered method returns false if applied filter is removed", function() {
        let list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: (data) => encode(data)
        });

        list.dataSource.read();

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });
        list.dataSource.filter({});

        assert.isOk(!list.isFiltered());
    });

    it("isFiltered method returns false if widget is no bound", function() {
        let list = new StaticList(element, {
            dataSource: {
                data: ["item1", "item2", "item3"],
                filter: { field: "", operator: "eq", value: "item2" }
            },
            template: (data) => encode(data)
        });

        //first bind is done with filtering
        list.dataSource.read();

        assert.isOk(!list.isFiltered());
    });

    it("isFiltered method returns true if bind the widget with filter", function() {
        let list = new StaticList(element, {
            dataSource: {
                data: ["item1", "item2", "item3"]
            },
            template: (data) => encode(data)
        });

        //first bind is done with filtering
        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        assert.isOk(list.isFiltered());
    });

    it("getElementIndex method LI element offset index", function() {
        let list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ]
            },
            template: (data) => encode(data.name)
        });

        list.dataSource.read();

        let index = list.getElementIndex(list.element.children().eq(2));

        assert.equal(index, 2);
    });

});
