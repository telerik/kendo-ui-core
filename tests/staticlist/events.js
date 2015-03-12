(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList events", {
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

    test("widget triggers dataBound event", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            dataBound: function() {
                ok(true);
            }
        });

        list.dataSource.read();
    });

    test("widget triggers change event on select", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function() {
                ok(true);
            }
        });

        list.dataSource.read();

        list.select(0);
    });

    test("widget triggers change event when item is deselected", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function() {
                ok(true);
            },
            value: ["item"]
        });

        list.dataSource.read();

        list.select(-1);
    });

    test("widget passes deselected index", 2, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function(e) {
                var removed = e.removed;

                equal(removed.length, 1);
                equal(removed[0].index, 0);
            },
            value: ["item"]
        });

        list.dataSource.read();

        list.select(-1);
    });

    test("widget passes deselected order index", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function(e) {
                var removed = e.removed;

                equal(removed[0].position, 0);
            },
            value: ["item"]
        });

        list.dataSource.read();

        list.select(-1);
    });

    test("widget passes deselected indices when multiple selection is enabled", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            change: function(e) {
                var removed = e.removed;

                equal(removed.length, 2);
                equal(removed[0].index, 1);
                equal(removed[1].index, 2);
            },
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.select([1, 2]);
    });

    test("widget passes deselected order indices when multiple selection is enabled", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            change: function(e) {
                var removed = e.removed;

                equal(removed.length, 2);
                equal(removed[0].position, 0);
                equal(removed[1].position, 1);
            },
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.select([1, 2]);
    });

    test("widget passes selected indices", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            change: function(e) {
                var added = e.added;

                equal(added.length, 2);
                equal(added[0].index, 1);
                equal(added[1].index, 2);
            },
            selectable: "multiple"
        });

        list.dataSource.read();

        list.select([1, 2]);
    });

    test("widget triggers activate event when the item is focused", 2, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            activate: function() {
                ok(true);
            }
        });

        list.dataSource.read();

        list.focus($(list.element[0].children[0]));
    });

    test("widget triggers deactivate event when the item is unfocused", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            deactivate: function() {
                ok(true);
            },
            value: ["item"]
        });

        list.dataSource.read();

        list.focus(null);
    });
})();
