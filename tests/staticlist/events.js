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
