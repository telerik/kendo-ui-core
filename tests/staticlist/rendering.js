(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList rendering", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        }
    });

    test("kendoStaticList renders data source items using template", function() {
        var list = new StaticList(element, {
            dataSource: ["foo"],
            template: "#:data#"
        });

        list.dataSource.read();

        var li = element.children(":first");

        equal(li.html(), "foo");
        equal(li.attr("tabindex"), -1);
        equal(li.attr("role"), "option");
        equal(li.attr("unselectable"), "on");
        equal(li.attr("class"), "k-item");
        equal(li.attr("data-offset-index"), 0);
    });

    test("kendoStaticList renders selected class if item is selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            value: ["item"],
            template: '#:data#'
        });

        list.dataSource.read();

        var li = element.children(":first");

        equal(li.attr("class"), "k-item k-state-selected k-state-focused");
    });

    test("kendoStaticList renders multiple selected class if multiple items are selected", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataSource: ["item1", "item2", "item3"],
            value: ["item1", "item3"],
            template: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected k-state-focused");
    });

    test("kendoStaticList renders selected item when object is complex", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: [
                { name: "item1" },
                { name: "item2" },
                { name: "item3" }
            ],
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected k-state-focused");
    });

    test("kendoStaticList renders grouped data source", function() {
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

        ok(!children.eq(0).children(".k-group")[0]);
        ok(!children.eq(1).children(".k-group")[0]);
        ok(children.eq(2).children(".k-group")[0]);
    });

    test("kendoStaticList renders k-first class to the group header element", function() {
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

        ok(!children.eq(0).hasClass("k-first"));
        ok(!children.eq(1).hasClass("k-first"));
        ok(children.eq(2).hasClass("k-first"));
    });

    test("kendoStaticList renders fixed grouped header", function() {
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
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        var header = list.header;

        equal(header.html(), "a");
        ok(!header[0].style.display);
    });

    test("kendoStaticList renders fixed grouped header when source is grouped dynamically", function() {
        var data = [
            { name: "item1", type: "a" },
            { name: "item2", type: "a" },
            { name: "item3", type: "b" }
        ];

        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: { },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        list.dataSource.group({ field: "type" });
        list.dataSource.data(data);

        var header = list.header;

        equal(header.html(), "a");
        ok(!header[0].style.display);
    });

    test("kendoStaticList hides fixed group header container if datasource is not grouped", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        var header = list.header;

        equal(header[0].style.display, "none");
    });

    test("kendoStaticList does not render fixed grouped header if no data", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [ ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        var header = list.header;

        equal(header.html(), "");
    });

    test("kendoStaticList does not render fixed grouped header if data is not grouped", function() {
        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        var header = list.header;

        equal(header.html(), "");
    });

    //TODO: Fix as it is unstable
    /*test("kendoStaticList renders fixed header to first visible item after scroll", function() {
        var wrapper = $('<div style="overflow:hidden;height:60px;position:absolute;"/>').appendTo(QUnit.fixture).append(element.height("100%"));

        var list = new StaticList(element, {
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" },
                    { name: "item4", type: "a" },
                    { name: "item5", type: "a" },
                    { name: "item6", type: "b" },
                    { name: "item7", type: "a" },
                    { name: "item8", type: "a" },
                    { name: "item9", type: "b" }
                ],
                group: "type"
            },
            template: '#:data.name#',
            groupTemplate: '#:data#',
            fixedGroupTemplate: '#:data#'
        });

        list.dataSource.read();

        element[0].scrollTop = 145; //scroll

        list.refresh();

        var header = list.header;

        equal(header.html(), "b");
    });*/

    test("kendoStaticList renders selected items during rendering of a grouped data source", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ],
                group: "type"
            },
            value: ["item1", "item3"],
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-first k-state-selected k-state-focused");
    });

    test("kendoStaticList sets a data items collection during rendering", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ],
                group: "type"
            },
            value: ["item1", "item3"],
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        var dataItems = list.selectedDataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[0].items[0]);
        equal(dataItems[1], list.dataSource.view()[1].items[0]);
    });

    test("StaticList persists selected values on filter", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item2"
        });

        equal(list.dataSource.view().length, 1);

        var indices = list.select();
        var dataItems = list.selectedDataItems();
        var values = list.value();

        equal(indices.length, 2);
        equal(dataItems.length, 2);
        equal(values.length, 2);

        equal(dataItems[0].name, values[0]);
        equal(dataItems[1].name, values[1]);
    });

    test("StaticList does not add already selected data item", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item1"
        });

        equal(list.dataSource.view().length, 1);

        var dataItems = list.selectedDataItems();
        var values = list.value();

        equal(dataItems.length, 2);
        equal(values.length, 2);
    });

    test("StaticList focuses first item on filter", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item1"
        });

        equal(list.focus()[0], list.element.children()[0]);
    });

    test("StaticList clears focused item when data source is empty", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item11"
        });

        equal(list.focus(), null);
    });

    test("StaticList does not render selected items on filter (single selection)", 1, function() {
        var list = new StaticList(element, {
            selectable: true,
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: "item2",
            template: '#:data.name#',
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item2"
        });

        var selectedItems = list.element.find(".k-state-selected");

        equal(selectedItems.length, 0);
    });

    test("StaticList renders selected items on filter (multiple selection)", 1, function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item2"],
            template: '#:data.name#',
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "item2"
        });

        var selectedItems = list.element.find(".k-state-selected");

        equal(selectedItems.length, 1);
    });

    test("StaticList supports group value set to undefined", function() {
        var data = [
            { name: "item", value: 1, group: "a" },
            { name: "item2", value: 2, group: "b" }
        ];

        var list = new StaticList(element, {
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success(data);
                    }
                }
            },
            template: '#:data.name#',
            dataValueField: "value"
        });

        list.dataSource.query({ filter: null });

        ok(true);
    });

    test("StaticList doesn't select value on bind if skipUpdateOnBind is true", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#',
            skipUpdateOnBind: true
        });

        stub(list, {
            value: list.value
        });

        list.dataSource.read();

        ok(!list.args("value")[0]);
    });

    test("StaticList deselects selected item if removed from source", function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataValueField: "name",
            dataSource: {
                data: [
                    { name: "item1", type: "a" },
                    { name: "item2", type: "a" },
                    { name: "item3", type: "b" }
                ]
            },
            value: ["item1", "item3"],
            template: '#:data.name#'
        });

        list.dataSource.read();
        list.dataSource.remove(list.dataSource.view()[2]); //remove item3

        deepEqual(list.value(), ["item1"]);
    });
})();
