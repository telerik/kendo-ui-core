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

    test("widget triggers change event on load when initial values are present", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function() {
                ok(true);
            },
            value: ["item"]
        });

        list.dataSource.read();
    });

    test("widget triggers change bofore dataBound", 1, function() {
        var triggered = false;
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: ["item"],
            dataBound: function() {
                ok(triggered);
            },
            change: function() {
                triggered = true;
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
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(true);
        });

        list.select(-1);
    });

    test("widget triggers change event when change value to a custom one", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(true);
        });

        list.value("custom");
    });

    test("widget does not trigger change when new item is added to the source", 0, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(false);
        });

        list.dataSource.add("new item");
    });

    test("widget does not trigger change when an item is removed from the source", 0, function() {
        var list = new StaticList(element, {
            dataValueField: "text",
            dataSource: [{ text: "item" }, { text: "item1" }],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(false);
        });

        list.dataSource.remove(list.dataSource.at(1));
    });

    test("widget triggers change when selected item is removed from the source", 1, function() {
        var list = new StaticList(element, {
            dataValueField: "text",
            dataSource: [{ text: "item" }, { text: "item1" }],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function() {
            ok(true);
        });

        list.dataSource.remove(list.dataSource.at(0));
    });

    test("widget passes deselected dataItem", 2, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            var removed = e.removed;

            equal(removed.length, 1);
            equal(removed[0].dataItem, list.dataSource.view()[0]);
        });

        list.select(-1);
    });

    test("widget passes deselected order index", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            value: ["item"]
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            var removed = e.removed;

            equal(removed[0].position, 0);
        });

        list.select(-1);
    });

    test("widget passes deselected indices when multiple selection is enabled", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            var removed = e.removed;

            equal(removed.length, 2);
            equal(removed[0].dataItem, "item2");
            equal(removed[1].dataItem, "item3");
        });

        list.select([1, 2]);
    });

    test("widget passes deselected order indices when multiple selection is enabled", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            selectable: "multiple",
            value: ["item2", "item3"]
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            var removed = e.removed;

            equal(removed.length, 2);
            equal(removed[0].position, 0);
            equal(removed[1].position, 1);
        });

        list.select([1, 2]);
    });

    test("widget passes selected indices", 3, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            selectable: "multiple"
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            var added = e.added;

            equal(added.length, 2);
            equal(added[0].dataItem, "item2");
            equal(added[1].dataItem, "item3");
        });

        list.select([1, 2]);
    });

    test("widget triggers change when value is cleared", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item1", "item2", "item3"],
            template: "#:data#",
            selectable: "multiple",
            value: ["item1"]
        });

        list.dataSource.read();

        list.bind("change", function(e) {
            ok(true);
        });

        list.value([]);
    });

    test("widget triggers activate event when the item is focused", 1, function() {
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

    test("widget triggers selectedItemChange event when the selected item has changed (single selection)", 3, function() {
        var list = new StaticList(element, {
            dataSource: [{ value: "item" }],
            template: "#:data.value#",
            dataValueField: "value",
            selectedItemChange: function(e) {
                var items = e.items;

                equal(items.length, 1);
                equal(items[0].index, 0);
                equal(items[0].item, this.dataSource.view()[0]);
            },
            value: ["item"]
        });

        list.dataSource.read();
        list.dataSource.view()[0].set("value", "updated");
    });

    test("widget does not trigger selectedItemChange event when updated item is not updated", 0, function() {
        var list = new StaticList(element, {
            dataSource: [{ value: "item1" }, { value: "item2" }],
            template: "#:data.value#",
            dataValueField: "value",
            selectedItemChange: function(e) {
                ok(false);
            },
            value: ["item1"]
        });

        list.dataSource.read();
        list.dataSource.view()[1].set("value", "updated");
    });

    test("widget passes only the changed items in the selectedItemChange event (multiple selection)", 3, function() {
        var list = new StaticList(element, {
            selectable: "multiple",
            dataSource: [{ value: "item1" }, { value: "item2" }],
            template: "#:data.value#",
            dataValueField: "value",
            selectedItemChange: function(e) {
                var items = e.items;

                equal(items.length, 1);
                equal(items[0].index, 1);
                equal(items[0].item, this.dataSource.view()[1]);
            },
            value: ["item1", "item2"]
        });

        list.dataSource.read();
        list.dataSource.view()[1].set("value", "updated");
    });
})();
