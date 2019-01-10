(function() {
    var StaticList = kendo.ui.StaticList,
        element;

    describe("kendo.ui.StaticList events", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        });

        it("widget triggers dataBound event", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                dataBound: function() {
                    assert.isOk(true);
                }
            });

            list.dataSource.read();
        });

        it("widget triggers change event on load when initial values are present", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                change: function() {
                    assert.isOk(true);
                },
                value: ["item"]
            });

            list.dataSource.read();
        });

        it("widget triggers change bofore dataBound", function() {
            var triggered = false;
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"],
                dataBound: function() {
                    assert.isOk(triggered);
                },
                change: function() {
                    triggered = true;
                }
            });

            list.dataSource.read();
        });

        it("widget triggers change event on select", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                change: function() {
                    assert.isOk(true);
                }
            });

            list.dataSource.read();

            list.select(0);
        });

        it("widget triggers change event when item is deselected", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.isOk(true);
            });

            list.select(-1);
        });

        it("widget triggers change event when change value to a custom one", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.isOk(true);
            });

            list.value("custom");
        });

        it("widget does not trigger change when new item is added to the source", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.isOk(false);
            });

            list.dataSource.add("new item");
        });

        it("widget does not trigger change when an item is removed from the source", function() {
            var list = new StaticList(element, {
                dataValueField: "text",
                dataSource: [{ text: "item" }, { text: "item1" }],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.isOk(false);
            });

            list.dataSource.remove(list.dataSource.at(1));
        });

        it("widget triggers change when selected item is removed from the source", function() {
            var list = new StaticList(element, {
                dataValueField: "text",
                dataSource: [{ text: "item" }, { text: "item1" }],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function() {
                assert.isOk(true);
            });

            list.dataSource.remove(list.dataSource.at(0));
        });

        it("widget passes deselected dataItem", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                var removed = e.removed;

                assert.equal(removed.length, 1);
                assert.equal(removed[0].dataItem, list.dataSource.view()[0]);
            });

            list.select(-1);
        });

        it("widget passes deselected order index", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                value: ["item"]
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                var removed = e.removed;

                assert.equal(removed[0].position, 0);
            });

            list.select(-1);
        });

        it("widget passes deselected indices when multiple selection is enabled", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#",
                selectable: "multiple",
                value: ["item2", "item3"]
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                var removed = e.removed;

                assert.equal(removed.length, 2);
                assert.equal(removed[0].dataItem, "item2");
                assert.equal(removed[1].dataItem, "item3");
            });

            list.select([1, 2]);
        });

        it("widget passes deselected order indices when multiple selection is enabled", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#",
                selectable: "multiple",
                value: ["item2", "item3"]
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                var removed = e.removed;

                assert.equal(removed.length, 2);
                assert.equal(removed[0].position, 0);
                assert.equal(removed[1].position, 1);
            });

            list.select([1, 2]);
        });

        it("widget passes selected indices", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#",
                selectable: "multiple"
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                var added = e.added;

                assert.equal(added.length, 2);
                assert.equal(added[0].dataItem, "item2");
                assert.equal(added[1].dataItem, "item3");
            });

            list.select([1, 2]);
        });

        it("widget triggers change when value is cleared", function() {
            var list = new StaticList(element, {
                dataSource: ["item1", "item2", "item3"],
                template: "#:data#",
                selectable: "multiple",
                value: ["item1"]
            });

            list.dataSource.read();

            list.bind("change", function(e) {
                assert.isOk(true);
            });

            list.value([]);
        });

        it("widget triggers activate event when the item is focused", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                activate: function() {
                    assert.isOk(true);
                }
            });

            list.dataSource.read();

            list.focus($(list.element[0].children[0]));
        });

        it("widget triggers deactivate event when the item is unfocused", function() {
            var list = new StaticList(element, {
                dataSource: ["item"],
                template: "#:data#",
                deactivate: function() {
                    assert.isOk(true);
                },
                value: ["item"]
            });

            list.dataSource.read();

            list.focus(null);
        });

        it("widget triggers selectedItemChange event when the selected item has changed (single selection)", function() {
            var list = new StaticList(element, {
                dataSource: [{ value: "item" }],
                template: "#:data.value#",
                dataValueField: "value",
                selectedItemChange: function(e) {
                    var items = e.items;

                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 0);
                    assert.equal(items[0].item, this.dataSource.view()[0]);
                },
                value: ["item"]
            });

            list.dataSource.read();
            list.dataSource.view()[0].set("value", "updated");
        });

        it("widget does not trigger selectedItemChange event when updated item is not updated", function() {
            var list = new StaticList(element, {
                dataSource: [{ value: "item1" }, { value: "item2" }],
                template: "#:data.value#",
                dataValueField: "value",
                selectedItemChange: function(e) {
                    assert.isOk(false);
                },
                value: ["item1"]
            });

            list.dataSource.read();
            list.dataSource.view()[1].set("value", "updated");
        });

        it("widget passes only the changed items in the selectedItemChange event (multiple selection)", function() {
            var list = new StaticList(element, {
                selectable: "multiple",
                dataSource: [{ value: "item1" }, { value: "item2" }],
                template: "#:data.value#",
                dataValueField: "value",
                selectedItemChange: function(e) {
                    var items = e.items;

                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 1);
                    assert.equal(items[0].item, this.dataSource.view()[1]);
                },
                value: ["item1", "item2"]
            });

            list.dataSource.read();
            list.dataSource.view()[1].set("value", "updated");
        });
    });
}());
