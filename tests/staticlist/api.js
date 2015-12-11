(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList API", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.support.kineticScrollNeeded = false;
            kendo.ns = "";
        }
    });

    test("setDataSource method overrides current data source", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.setDataSource(["1", "2"]);

        list.dataSource.read();

        equal(list.dataSource.view().length, 2);
    });

    test("setDataSource method clears value before setting the new source", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: "item"
        });

        list.dataSource.read();

        list.bind("change", function() {
            equal(list.value().length, 0);
        });

        list.setDataSource(["1", "2"]);
    });

    test("setDataSource method sets value silently after source is changed", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: "item"
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(true); //called only once
        });

        list.setDataSource(["1", "2"]);

        equal(list.value().length, 1);
        equal(list.value()[0], "item");
    });

    test("setDataSource method shows fixed header", 1, function() {
        var list = new StaticList(element, {
            fixedGroupTemplate: "#:data#",
            template: "#:data#",
            value: "item"
        });

        list.setDataSource({
            data: [{ text: "item" }],
            group: { field: "text" }
        });

        ok(list.header.is(":visible"));
    });

    test("setOptions re-create templates", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.setOptions({
            template: "new #:data#"
        });

        equal(element.children(":first").html(), "new item");
    });

    test("setOptions does not update bound state", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.setOptions({
            template: "new #:data#"
        });

        ok(!list.bound());
    });

    test("setValue method updates values of the widget silently", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.setValue("item");

        var value = list.value();
        var indices = list.select();

        equal(indices.length, 0);

        equal(value.length, 1);
        equal(value[0], "item");
    });

    test("widget focuses last selected item during rendering", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple",
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        var current = list.focus();

        equal(current[0], list.element[0].children[1]);
    });

    test("dataItems method returns list of the selected items", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(2);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[0].items[0]);
        equal(dataItems[1], list.dataSource.view()[1].items[0]);
    });

    test("dataItems method sets selected values", function() {
        var data = [
            { name: "item1", type: "a" },
            { name: "item2", type: "b" },
            { name: "item3", type: "a" }
        ];

        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: data,
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.selectedDataItems([data[0], data[2]]);

        var values = list.value();

        equal(values.length, 2);
        equal(values[0], "item1");
        equal(values[1], "item3");
    });

    test("focus method focuses li element", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.focus(children.eq(1));

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("focus method focuses by index", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.focus(1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("focus method clears focus if index is -1", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.focus(1);
        list.focus(-1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("focusIndex returns the index of the focused item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.focus(children.eq(1));
        equal(list.focusIndex(), 1);
    });

    test("focusIndex returns undefined if no item is focused", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.focus(1);
        list.focus(-1);

        ok(!list.focusIndex());
    });

    test("select an item by element", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(children.eq(1));


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method does not unselect already selected item (single selection)", 0, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.select(1);

        list.bind("change", function() {
            ok(false);
        });

        list.select(1); //select again
    });

    test("select method selects same index if filtered", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.select(1);

        list.bind("change", function() {
            ok(true);
        });

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        list.select(1); //select again
    });

    test("select an item by index", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("selects a single item if selectable is single", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: true,
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select([1, 2]);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-focused k-state-selected");
    });

    test("select items by indices", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select([1, 2]);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-selected");
        equal(children.eq(2).attr("class"), "k-item k-state-focused k-state-selected");
    });

    test("select method handles unexisting indices", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#",
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        var children = element.children();

        list.select([3]);

        ok(true);
    });

    test("deselect items by indices", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#",
            value: ["item1", "item3"]
        });

        list.dataSource.read();

        var children = element.children();

        list.select([0, 2]);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-focused");
    });

    test("select method deselects previous item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(0);

        equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects selected items is index is -1", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(-1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method selects multiple items", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(0);

        equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(1).attr("class"), "k-item k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects item in 'multiple' mode", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method unselects items if empty array is passed", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select([]);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method works with grouped data source", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item k-first");
    });

    test("select method sets selected data items", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.select(1);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0], list.dataSource.view()[0].items[1]);
    });

    test("select method sets selected data items when multiple elements are selected", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(1);
        list.select(0);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[0].items[1]);
        equal(dataItems[1], list.dataSource.view()[0].items[0]);
    });

    test("select method removes dataItems on deselect", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        list.select(0);
        list.select(1);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 0);
    });

    test("select method removes dataItems in single mode selection", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0], list.dataSource.view()[0].items[1]);
    });

    test("select method sets selected values", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.select(1);

        var values = list.value();

        equal(values.length, 1);
        equal(values[0], list.dataSource.view()[0].items[1].name);
    });

    test("select method deletes selected value on item unselect", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ]
            },
            template: '#:data.name#',
            value: ["item2"]
        });

        list.dataSource.read();

        list.select(-1);

        var values = list.value();

        equal(values.length, 0);
    });

    test("select method sets selected values when multiple elements are selected", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(1);
        list.select(0);

        var values = list.value();

        equal(values.length, 2);
        equal(values[0], list.dataSource.view()[0].items[1].name);
        equal(values[1], list.dataSource.view()[0].items[0].name);
    });

    test("select method removes values on deselect", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        list.select(0);
        list.select(1);

        var values = list.value();

        equal(values.length, 0);
    });

    test("select method removes values in single mode selection", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.select(0);
        list.select(1);

        var value = list.value();

        equal(value.length, 1);
        equal(value[0], list.dataSource.view()[0].items[1].name);
    });

    test("select method returns selected indices", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.select(1);

        var indices = list.select();

        equal(indices.length, 1);
        equal(indices[0], 1);
    });

    test("select method de-selects item when filtered (multiple selection)", 5, function() {
        var list = new StaticList(element, {
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
            template: '#:data.name#',
            groupTemplate: '#:data#',
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item2"
        });

        list.bind("change", function(e) {
            var added = e.added;
            var removed = e.removed;

            equal(added.length, 0);

            equal(removed.length, 1);
            equal(removed[0].position, 0);
            equal(removed[0].dataItem.name, "item2");

            equal(list.element.find(".k-state-selected").length, 0);
        });

        list.select(0);
    });

    test("value method selects an item", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.value("item1");

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0], list.dataSource.view()[0].items[0]);
    });

    test("value method selects multiple items", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.value(["item2", "item3"]);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[1].items[0]);
        equal(dataItems[1], list.dataSource.view()[0].items[1]);
    });

    test("value method does not immediately resolves the valueDeffered object in multiple selection mode", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.dataSource.read();

        list.value(["item2", "item3"]).done(function() {
            var selected = list.select();

            equal(selected.length, 2);
            equal(selected[0], 2);
            equal(selected[1], 1);
        });
    });

    test("value method clears selected items", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.value([]);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 0);
    });

    test("value method sets selected indices", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple"
        });

        list.value(["item2", "item3"]);

        list.dataSource.read();

        var indices = list.select();

        equal(indices.length, 2);
        equal(indices[0], 2); //Item2
        equal(indices[1], 1); //Item3 (this is before item 2 in grouped list)
    });

    test("value method deselects an item", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            value: "item1"
        });

        list.dataSource.read();

        list.value([]);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 0);
    });

    test("value method removes multiple values", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            selectable: "multiple",
            value: ["item1", "item2", "item3"]
        });

        list.dataSource.read();

        list.value(["item3"]);

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0].name, "item3");
    });

    test("value method supports null", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.value(null);

        ok($.isArray(list.value()));
    });

    test("value method supports empty string", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.value("");

        var value = list.value();
        ok($.isArray(value));
        equal(value.length, 0);
    });

    test("value method selects an item with empty string value", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "", type: "a" },
                    { name: "item2", type: "b" },
                    { name: "item3", type: "a" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.value("");

        equal(list.select()[0], 0);
    });

    test("value method selects an item with null value", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: null, type: "b" },
                    { name: "item3", type: "a" }
                ]
            },
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.value(null);

        equal(list.select()[0], 1);
    });

    test("value method deselects deselects all items if value is []", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.value([]);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("value method returns promise", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.value("item").done(function() {
            ok(true);
        });
    });

    test("value method returns promise that is resolved on bind", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.value("item").done(function() {
            ok(true);
        });

        list.dataSource.read();
    });

    test("value method clears previous selected items (single selection)", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.value("item1");
        list.value("item2");

        equal(list.element.children(".k-state-selected").length, 1);
    });

    test("value method selects item with unescaped characters", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1\"", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.value("item1\"");

        equal(list.element.children(".k-state-selected").length, 1);
    });

    test("next method focuses first item if no items are focused", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focusNext();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-focused");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("next method focuses next item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focus(0);
        list.focusNext();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("prev method focuses last item if no items are focused", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focusPrev();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-focused");
    });

    test("prev method focuses prev item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focus(2);
        list.focusPrev();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("first method focuses first item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focusFirst();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-focused");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("last method focuses last item", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.focusLast();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-focused");
    });

    test("scrollToIndex passes the correct item to scroll method", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        stub(list, {
            scroll: list.scroll
        });

        list.dataSource.read();

        list.scrollToIndex(2);

        var children = element[0].children;

        equal(list.calls("scroll"), 1);
        equal(list.args("scroll")[0], children[2]);
    });

    test("bound returns bound state of the list", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        equal(list.bound(), false);

        list.dataSource.read();

        equal(list.bound(), true);
    });

    test("bound sets bound state of the widget", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.bound(false);

        equal(list.bound(), false);
    });

    test("filter method prevent value selection on re-bind", function() {
        var list = new StaticList(element, {
            value: "item2",
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.dataSource.filter({
            field: "",
            operator: "eq",
            value: "item1"
        });

        equal(list.value(), "item2");
    });

    test("removeAt method removes values at current position", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            value: ["item2", "item1"]
        });

        list.dataSource.read();

        list.removeAt(0);

        var value = list.value();
        var indices = list.select();
        var dataItems = list.selectedDataItems();

        equal(value.length, 1);
        equal(indices.length, 1);
        equal(dataItems.length, 1);

        equal(value[0], "item1");
        equal(indices[0], 0);
        equal(dataItems[0], "item1");
    });

    test("removeAt method returns removed dataItem", 3, function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            value: ["item2", "item1"]
        });

        list.dataSource.read();

        var removed = list.removeAt(0);

        equal(removed.position, 0);
        equal(removed.dataItem, "item2");
        ok(!$.isArray(removed.dataItem));
    });

    test("items returns item elements", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        var items = list.items();
        equal(items.length, 3);
        ok(items.eq(0).hasClass("k-item"));
    });

    test("isFiltered method returns true if source is filtered", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        ok(list.isFiltered());
    });

    test("isFiltered method returns false if applied filter is removed", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();

        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });
        list.dataSource.filter({});

        ok(!list.isFiltered());
    });

    test("isFiltered method returns false if widget is no bound", 1, function() {
        var list = new StaticList(element, {
            dataSource: {
                data: ["item1", "item2", "item3"],
                filter: { field: "", operator: "eq", value: "item2" }
            },
            template: "#:data#"
        });

        //first bind is done with filtering
        list.dataSource.read();

        ok(!list.isFiltered());
    });

    test("isFiltered method returns true if bind the widget with filter", 1, function() {
        var list = new StaticList(element, {
            dataSource: {
                data: ["item1", "item2", "item3"]
            },
            template: "#:data#"
        });

        //first bind is done with filtering
        list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

        ok(list.isFiltered());
    });

})();
