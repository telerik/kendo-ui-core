(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-state-selected";

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push("Item " + i);
        }

        return items;
    }

    describe("VirtualList Primitive Data: ", function() {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 400 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            virtualSettings = {
                autoBind: false,
                dataSource: asyncDataSource,
                height: CONTAINER_HEIGHT,
                template: "#=data#"
            };
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
        });

        //selection
        function selectAll(virtual, elements, done) {
            var item = elements.shift();

            if (!item) {
                done();
                return;
            }

            virtual.select(item).done(function() {
                selectAll(virtual, elements, done);
            });
        }

        it("selecting listItem selects it as a value of the list", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().first();
                virtualList.select(element).done(function() {
                    assert.equal(virtualList.value()[0], "Item 0");
                    done();
                });
            });
        });

        it("selecting listItem selects it as a value of the list (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];

                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));
                elements.push(virtualList.items().eq(7));

                var virtualDone = function() {
                    assert.equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 2", "Item 7"]));
                    done();
                };

                selectAll(virtualList, elements, virtualDone);
            });
        });

        it("selecting already selected listItem does not deselect it as a value of the list", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().first();

                virtualList.select(element).done(function() {
                    assert.equal(virtualList.value()[0], "Item 0");

                    virtualList.select(element).done(function() {
                        assert.equal(virtualList.value()[0], "Item 0");
                        done();
                    });
                });
            });
        });

        it("selecting already selected listItem deselects it as a value of the list (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];
                var item2 = virtualList.items().eq(2);

                elements.push(virtualList.items().eq(1));
                elements.push(item2);
                elements.push(virtualList.items().eq(7));

                var virtualDone = function() {
                    virtualList.select(item2).done(function() {
                        assert.equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 7"]));
                        done();
                    });
                };

                selectAll(virtualList, elements, virtualDone);
            });
        });

        it("setting the initial value selects the item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: "Item 6"
            }));

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                done();
            });
        });

        it("setting the initial value selects the item (multiple selection)", function(done) {
            var values = ["Item 1", "Item 10", "Item 6"];
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: values
            }));

            asyncDataSource.read().then(function() {

                assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                assert.isOk(virtualList.items().eq(10).hasClass(SELECTED), "Item 10 is selected");
                assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                done();
            });
        });

        it("setting the value with the value method updates the selection", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.value("Item 9").done(function() {
                    assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
                    done();
                });
            });
        });

        it("setting the value with the value method updates the selection (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                virtualList.value(["Item 1", "Item 5", "Item 6"]).done(function() {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                    done();
                });
            });
        });

        it("value method works if called before the dataSource is fetched and list is created", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            virtualList.value("Item 3");

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
                done();
            });
        });

        it("value method works if called before the dataSource is fetched and list is created (multiple values)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            virtualList.value(["Item 1", "Item 5", "Item 9"]);

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
                done();
            });
        });

        it("selecting listItem selects it and saves the corresponding dataItem", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().first();

                virtualList.select(element).done(function() {
                    assert.equal(virtualList.selectedDataItems().length, 1, "One item is selected");
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0], "First item is selected");
                    done();
                });
            });
        });

        it("selecting listItem selects it and saves the corresponding dataItem (multiple items)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];
                elements.push(virtualList.items().eq(0));
                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));

                selectAll(virtualList, elements, function() {

                    for (var i = 0; i < 3; i++) {
                        assert.equal(virtualList.selectedDataItems()[i], asyncDataSource.data()[i]);
                    }
                    done();
                });
            });
        });

        it("saves the dataItems that correspond to the initially set values", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: ["Item 0", "Item 1"],
                selectable: "multiple",
                change: function() {

                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    done();
                }
            }));

            asyncDataSource.read();
        });

        it("selecting already selected listItem removes it from stored dataItems", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: ["Item 0", "Item 7"]
            }));

            asyncDataSource.read().then(function() {

                var element = virtualList.items().eq(0);
                virtualList.select(element).done(function() {

                    assert.equal(virtualList.selectedDataItems().length, 1, "First item is removed");
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
                    done();
                });
            });
        });

        it("changing the value through the value method updates dataItems collection", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {

                virtualList.bind("change", function() {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    done();
                });
                virtualList.value("Item 0");
            });
        });

        it("changing the value through the value method updates dataItems collection (multiple)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function() {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    done();
                });
                virtualList.value(["Item 0", "Item 1"]);
            });
        });

        it("changing the value through the value method updates dataItems collection (initially set values)", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: ["Item 7"],
                selectable: "multiple"
            }));

            virtualList.bind("listBound", function() {
                virtualList.bind("change", function() {
                    if (count !== 1) {
                        assert.equal(virtualList.selectedDataItems().length, 2);
                        assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                        assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                        done();
                    }

                    count += 1; //first change is triggered because of dataitems removal
                });
                virtualList.value(["Item 0", "Item 1"]);
            });

            asyncDataSource.read();
        });

        it("not available dataItems are retrieved by the value method", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(o) {
                    o.success([7, 256]);
                }
            }));

            asyncDataSource.read().done(function() {
                virtualList.bind("change", function() {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0] === "Item 7");
                    assert.isOk(virtualList.selectedDataItems()[1] === "Item 256");
                    done();
                });
                virtualList.value(["Item 7", "Item 256"]);
            });
        });

        it("not available dataItems are given as null in dataItems collection (initially set items)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: ["Item 7", "Item 256"],
                valueMapper: function(o) {
                    o.success([7, 256]);
                },
                selectable: "multiple",
                change: function() {

                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0] === "Item 7");
                    assert.isOk(virtualList.selectedDataItems()[1] === "Item 256");
                    done();
                }
            }));

            asyncDataSource.read();
        });

        it("selection is persisted accross ranges", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            var element;

            asyncDataSource.read().then(function() {
                element = virtualList.items().first();
                virtualList.select(element).done(function() {
                    assert.isOk(element.hasClass(SELECTED));
                    scroll(container, 4 * CONTAINER_HEIGHT);
                    setTimeout(function() {
                        scroll(container, 0);

                        assert.isOk(element.hasClass(SELECTED), "First item is not selected");
                        done();
                    }, 300);
                });
            });
        });

        it("previously selected item is de-selected (single selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element1 = virtualList.items().eq(1);
                var element2 = virtualList.items().eq(2);
                virtualList.select(element1);
                virtualList.select(element2).done(function() {
                    assert.equal(virtualList.items().filter("." + SELECTED).length, 1);
                    done();
                });
            });
        });

        it("previously selected value is removed (single selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

                selectAll(virtualList, elements, function() {
                    assert.equal(virtualList.value().length, 1);
                    assert.equal(virtualList.value()[0], "Item 2");
                    done();
                });
            });
        });

        it("select method selects the element", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().eq(1);

                virtualList.select(element).done(function() {

                    assert.isOk(element.hasClass(SELECTED));
                    assert.equal(virtualList.value()[0], "Item 1");
                    assert.equal(virtualList.selectedDataItems()[0], "Item 1");
                    done();
                });
            });
        });

    });
}());
