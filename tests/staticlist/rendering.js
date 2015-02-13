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
        equal(li.attr("data-index"), 0);
    });

    test("kendoStaticList renders selected class if item is selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            value: ["item"],
            template: '#:data#'
        });

        list.dataSource.read();

        var li = element.children(":first");

        equal(li.attr("class"), "k-item k-state-selected");
    });

    test("kendoStaticList renders multiple selected class if multiple items are selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            value: ["item1", "item3"],
            template: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected");
    });

    test("kendoStaticList renders selected item when object is complex", function() {
        var list = new StaticList(element, {
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
        equal(children.eq(2).attr("class"), "k-item k-state-selected");
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

        ok(children.eq(0).children(".k-group")[0]);
        ok(!children.eq(1).children(".k-group")[0]);
        ok(children.eq(2).children(".k-group")[0]);
    });

    test("kendoStaticList renders selected items during rendering of a grouped data source", function() {
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
            value: ["item1", "item3"],
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-selected");
    });

    test("kendoStaticList sets a data items collection during rendering", function() {
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
            value: ["item1", "item3"],
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        var dataItems = list.dataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[0].items[0]);
        equal(dataItems[1], list.dataSource.view()[1].items[0]);
    });

    test("kendoStaticList persists selected li elements during rendering", function() {
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
            value: ["item1", "item3"],
            template: '#:data.name#',
            groupTemplate: '#:data#'
        });

        list.dataSource.read();

        //select only item checking whether the selected items are pesisted
        list.select(1);

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });
})();
