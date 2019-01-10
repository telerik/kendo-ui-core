(function() {
    var StaticList = kendo.ui.StaticList,
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
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#"
            });

            list.setDataSource(["1", "2"]);

            list.dataSource.read();

            assert.equal(list.dataSource.view().length, 2);
        });

        it("setDataSource method clears value before setting the new source", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: "item"
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.equal(list.value().length, 0);
            });

            list.setDataSource(["1", "2"]);
        });

        it("setDataSource method sets value silently after source is changed", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
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
            var list = new StaticList(element, {
                fixedGroupTemplate: "#:data#",
                template: "#:data#",
                value: "item"
            });

            list.setDataSource({
                data: [{ text: "item" }],
                group: { field: "text" }
            });

            assert.isOk(list.header.is(":visible"));
        });

        it("setOptions re-create templates", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.setOptions({
                template: "new #:data#"
            });

            assert.equal(element.children(":first").html(), "new item");
        });

        it("setOptions does not update bound state", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#"
            });

            list.setOptions({
                template: "new #:data#"
            });

            assert.isOk(!list.bound());
        });

        it("setValue method updates values of the widget silently", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#"
            });

            list.setValue("item");

            var value = list.value();
            var indices = list.select();

            assert.equal(indices.length, 0);

            assert.equal(value.length, 1);
            assert.equal(value[0], "item");
        });

        it("widget focuses last selected item during rendering", function() {
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

            assert.equal(current[0], list.element[0].children[1]);
        });

        it("dataItems method returns list of the selected items", function() {
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

            assert.equal(dataItems.length, 2);
            assert.equal(dataItems[0], list.dataSource.view()[0].items[0]);
            assert.equal(dataItems[1], list.dataSource.view()[1].items[0]);
        });

        it("dataItems method sets selected values", function() {
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

            assert.equal(values.length, 2);
            assert.equal(values[0], "item1");
            assert.equal(values[1], "item3");
        });

        it("dataItemByIndex method returns a dataItem corresponding to the index", function() {
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

            var dataItem = list.dataItemByIndex(2);

            assert.equal(dataItem, list.dataSource.view()[1].items[0]);
        });

        it("focus method focuses li element", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.focus(children.eq(1));

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("focus method focuses by index", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.focus(1);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("focus method clears focus if index is -1", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.focus(1);
            list.focus(-1);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("focusIndex returns the index of the focused item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.focus(children.eq(1));
            assert.equal(list.focusIndex(), 1);
        });

        it("focusIndex returns undefined if no item is focused", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.focus(1);
            list.focus(-1);

            assert.isOk(!list.focusIndex());
        });

        it("select an item by element", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(children.eq(1));


            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method does not unselect already selected item (single selection)", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.select(1);

            list.bind("change", function() {
                assert.isOk(false);
            });

            list.select(1); //select again
        });

        it("select method selects same index if filtered", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
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
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);


            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("selects a single item if selectable is single", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: true,
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select([1, 2]);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item k-state-focused k-state-selected");
        });

        it("select items by indices", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select([1, 2]);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-selected");
            assert.equal(children.eq(2).attr("class"), "k-item k-state-focused k-state-selected");
        });

        it("select method handles unexisting indices", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#",
                value: ["item1", "item3"]
            });

            list.dataSource.read();

            var children = element.children();

            list.select([3]);

            assert.isOk(true);
        });

        it("deselect items by indices", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#",
                value: ["item1", "item3"]
            });

            list.dataSource.read();

            var children = element.children();

            list.select([0, 2]);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item k-state-focused");
        });

        it("select method deselects previous item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.select(0);

            assert.equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method deselects selected items is index is -1", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.select(-1);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method selects multiple items", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.select(0);

            assert.equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-selected");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method deselects item in 'multiple' mode", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.select(1);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method unselects items if empty array is passed", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                selectable: "multiple",
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.select([]);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("select method works with grouped data source", function() {
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

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
            assert.equal(children.eq(2).attr("class"), "k-item k-first");
        });

        it("select method sets selected data items", function() {
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

            assert.equal(dataItems.length, 1);
            assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
        });

        it("select method sets selected data items when multiple elements are selected", function() {
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

            assert.equal(dataItems.length, 2);
            assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
            assert.equal(dataItems[1], list.dataSource.view()[0].items[0]);
        });

        it("select method removes dataItems on deselect", function() {
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

            assert.equal(dataItems.length, 0);
        });

        it("select method removes dataItems in single mode selection", function() {
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

            assert.equal(dataItems.length, 1);
            assert.equal(dataItems[0], list.dataSource.view()[0].items[1]);
        });

        it("select method sets selected values", function() {
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

            assert.equal(values.length, 1);
            assert.equal(values[0], list.dataSource.view()[0].items[1].name);
        });

        it("select method deletes selected value on item unselect", function() {
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

            assert.equal(values.length, 0);
        });

        it("select method sets selected values when multiple elements are selected", function() {
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

            assert.equal(values.length, 2);
            assert.equal(values[0], list.dataSource.view()[0].items[1].name);
            assert.equal(values[1], list.dataSource.view()[0].items[0].name);
        });

        it("select method removes values on deselect", function() {
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

            assert.equal(values.length, 0);
        });

        it("select method removes values in single mode selection", function() {
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

            assert.equal(value.length, 1);
            assert.equal(value[0], list.dataSource.view()[0].items[1].name);
        });

        it("select method returns selected indices", function() {
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

            assert.equal(indices.length, 1);
            assert.equal(indices[0], 1);
        });

        it("select method de-selects item when filtered (multiple selection)", function() {
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

                assert.equal(added.length, 0);

                assert.equal(removed.length, 1);
                assert.equal(removed[0].position, 0);
                assert.equal(removed[0].dataItem.name, "item2");

                assert.equal(list.element.find(".k-state-selected").length, 0);
            });

            list.select(0);
        });

        it("value method selects an item", function() {
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

            assert.equal(dataItems.length, 1);
            assert.equal(dataItems[0], list.dataSource.view()[0].items[0]);
        });

        it("value method selects multiple items", function() {
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

            assert.equal(dataItems.length, 2);
            assert.equal(dataItems[0], list.dataSource.view()[1].items[0]);
            assert.equal(dataItems[1], list.dataSource.view()[0].items[1]);
        });

        it("value method does not immediately resolves the valueDeffered object in multiple selection mode", function() {
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

                assert.equal(selected.length, 2);
                assert.equal(selected[0], 2);
                assert.equal(selected[1], 1);
            });
        });

        it("value method clears selected items", function() {
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

            assert.equal(dataItems.length, 0);
        });

        it("value method sets selected indices", function() {
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

            assert.equal(indices.length, 2);
            assert.equal(indices[0], 2); //Item2
            assert.equal(indices[1], 1); //Item3 (this is before item 2 in grouped list)
        });

        it("value method deselects an item", function() {
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

            assert.equal(dataItems.length, 0);
        });

        it("value method removes multiple values", function() {
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

            assert.equal(dataItems.length, 1);
            assert.equal(dataItems[0].name, "item3");
        });

        it("value method supports null", function() {
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

            assert.isOk($.isArray(list.value()));
        });

        it("value method supports empty string", function() {
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
            assert.isOk($.isArray(value));
            assert.equal(value.length, 0);
        });

        it("value method selects an item with empty string value", function() {
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

            assert.equal(list.select()[0], 0);
        });

        it("value method selects an item with null value", function() {
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

            assert.equal(list.select()[0], 1);
        });

        it("value method deselects deselects all items if value is []", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var children = element.children();

            list.select(1);
            list.value([]);

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("value method returns promise", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.value("item").done(function() {
                assert.isOk(true);
            });
        });

        it("value method returns promise that is resolved on bind", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.value("item").done(function() {
                assert.isOk(true);
            });

            list.dataSource.read();
        });

        it("value method clears previous selected items (single selection)", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.value("item1");
            list.value("item2");

            assert.equal(list.element.children(".k-state-selected").length, 1);
        });

        it("value method selects item with unescaped characters", function() {
            var list = new StaticList(element, {
                dataSource: ["item1\"", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.value("item1\"");

            assert.equal(list.element.children(".k-state-selected").length, 1);
        });

        it("next method focuses first item if no items are focused", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focusNext();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("next method focuses next item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focus(0);
            list.focusNext();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("prev method focuses last item if no items are focused", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focusPrev();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item k-state-focused");
        });

        it("prev method focuses prev item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focus(2);
            list.focusPrev();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("first method focuses first item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focusFirst();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item k-state-focused");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item");
        });

        it("last method focuses last item", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();
            list.focusLast();

            var children = element.children();

            assert.equal(children.eq(0).attr("class"), "k-item");
            assert.equal(children.eq(1).attr("class"), "k-item");
            assert.equal(children.eq(2).attr("class"), "k-item k-state-focused");
        });

        it("scrollToIndex passes the correct item to scroll method", function() {
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

            assert.equal(list.calls("scroll"), 1);
            assert.equal(list.args("scroll")[0], children[2]);
        });

        var getData = function(length) {
            var result = [];
            for (var idx = 0; idx < length; idx++) {
                result.push("item" + idx);
            }
            return result;
        };

        it("screenHeight gets the clientHeight of the content", function() {
            var list = new StaticList(element, {
                dataSource: getData(100),
                template: "#:data#"
            });

            list.dataSource.read();

            var content = list.content.height(200);

            assert.equal(list.screenHeight(), 200);
        });

        it("scrollWith moves scroll position down", function() {
            var list = new StaticList(element, {
                dataSource: getData(100),
                template: "#:data#"
            });

            list.dataSource.read();

            var content = list.content
                .height(200)
                .scrollTop(100);

            list.scrollWith(50);

            assert.isOk(content[0].scrollTop, 150);
        });

        it("scrollWith moves scroll position up", function() {
            var list = new StaticList(element, {
                dataSource: getData(100),
                template: "#:data#"
            });

            list.dataSource.read();

            var content = list.content
                .height(200)
                .scrollTop(100);

            list.scrollWith(-50);

            assert.equal(content[0].scrollTop, 50);
        });

        it("bound returns bound state of the list", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            assert.equal(list.bound(), false);

            list.dataSource.read();

            assert.equal(list.bound(), true);
        });

        it("bound sets bound state of the widget", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.bound(false);

            assert.equal(list.bound(), false);
        });

        it("filter method prevent value selection on re-bind", function() {
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

            assert.equal(list.value(), "item2");
        });

        it("removeAt method removes values at current position", function() {
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

            assert.equal(value.length, 1);
            assert.equal(indices.length, 1);
            assert.equal(dataItems.length, 1);

            assert.equal(value[0], "item1");
            assert.equal(indices[0], 0);
            assert.equal(dataItems[0], "item1");
        });

        it("removeAt method returns removed dataItem", function() {
            var list = new StaticList(element, {
                selectable: "multiple",
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#",
                value: ["item2", "item1"]
            });

            list.dataSource.read();

            var removed = list.removeAt(0);

            assert.equal(removed.position, 0);
            assert.equal(removed.dataItem, "item2");
            assert.isOk(!$.isArray(removed.dataItem));
        });

        it("items returns item elements", function() {
            var list = new StaticList(element, {
                selectable: "multiple",
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            var items = list.items();
            assert.equal(items.length, 3);
            assert.isOk(items.eq(0).hasClass("k-item"));
        });

        it("isFiltered method returns true if source is filtered", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

            assert.isOk(list.isFiltered());
        });

        it("isFiltered method returns false if applied filter is removed", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#"
            });

            list.dataSource.read();

            list.dataSource.filter({ field: "", operator: "eq", value: "item2" });
            list.dataSource.filter({});

            assert.isOk(!list.isFiltered());
        });

        it("isFiltered method returns false if widget is no bound", function() {
            var list = new StaticList(element, {
                dataSource: {
                    data: ["item1", "item2", "item3"],
                    filter: { field: "", operator: "eq", value: "item2" }
                },
                template: "#:data#"
            });

            //first bind is done with filtering
            list.dataSource.read();

            assert.isOk(!list.isFiltered());
        });

        it("isFiltered method returns true if bind the widget with filter", function() {
            var list = new StaticList(element, {
                dataSource: {
                    data: ["item1", "item2", "item3"]
                },
                template: "#:data#"
            });

            //first bind is done with filtering
            list.dataSource.filter({ field: "", operator: "eq", value: "item2" });

            assert.isOk(list.isFiltered());
        });

        it("getElementIndex method LI element offset index", function() {
            var list = new StaticList(element, {
                dataValueField: "name",
                dataSource: {
                    data: [
                        { name: "item1", type: "a" },
                        { name: "item2", type: "b" },
                        { name: "item3", type: "a" }
                    ]
                },
                template: '#:data.name#'
            });

            list.dataSource.read();

            var index = list.getElementIndex(list.element.children().eq(2));

            assert.equal(index, 2);
        });

    });
}());
