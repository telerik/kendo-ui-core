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
            kendo.ns = "";
        }
    });

    function getData(count) {


    }

    test("setDataSource method overrides current data source", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.setDataSource(["1", "2"]);

        list.dataSource.read();

        equal(list.dataSource.view().length, 2);
    });

    test("setOptions re-create templates", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item"],
            template: "new #:data#"
        });

        list.dataSource.read();

        equal(element.children(":first").html(), "new item");
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

        var dataItems = list.dataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0], list.dataSource.view()[0].items[0]);
        equal(dataItems[1], list.dataSource.view()[1].items[0]);
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

    test("select an item by element", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(children.eq(1));


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select an item by element", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(children.eq(1));


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select an item by element", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(children.eq(1));


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select an item by index", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects previous item", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
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
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
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
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
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
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method does nothing in 'multiple' mode if index is -1", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(-1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
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
        equal(children.eq(2).attr("class"), "k-item");
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

        var dataItems = list.dataItems();

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

        var dataItems = list.dataItems();

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

        var dataItems = list.dataItems();

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

        var dataItems = list.dataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0], list.dataSource.view()[0].items[1]);
    });

    test("next method focuses first item if no items are focused", function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#"
        });

        list.dataSource.read();
        list.next();

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
        list.next();

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
        list.prev();

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
        list.prev();

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
        list.first();

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
        list.last();

        var children = element.children();

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item k-state-focused");
    });
})();
