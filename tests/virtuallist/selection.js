(function() {
    var container,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
        virtualSettings = {},
        ITEM_HEIGHT = 20,
        CONTAINER_HEIGHT = 200,

        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected";

    function selectAll(virtual, elements, done) {
        var item = elements.shift();

        if (item === undefined) {
            done();
            return;
        }

        virtual.select(item).done(function() {
            selectAll(virtual, elements, done);
        });
    }

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                id: i,
                value: i,
                text: "Item " + i
            });
        }

        return items;
    }

    function valueMapper(o) {
        setTimeout(function() {
            o.success(o.value);
        }, 0);
    }

    describe("VirtualList Selection: ", function() {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
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
                itemHeight: ITEM_HEIGHT,
                template: "#=text#",
                dataValueField: "value"
            }
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
        });

        //VirtualList prefetch, single selection
        it("does not call prefetch for already available data", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([0]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 0);
                done();
            });
        });

        it("calls prefetch for not available data", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([90]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 1);
                done();
            });
        });

        it("calls prefetch with the correct skip, take", function(done) {
            var args;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([123]); //expected range 120 - 160

                args = asyncDataSource.args("_multiplePrefetch");
                assert.equal(args[0], 120); //skip
                assert.equal(args[1], 40); //take
                done();
            });
        });

        it("resolves the promise when data is prefetched", function(done) {
            var deferred;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            stub(asyncDataSource, {
                _multiplePrefetch: asyncDataSource._multiplePrefetch
            });

            asyncDataSource.read().then(function() {
                deferred = virtualList.prefetch([90]);
                deferred.done(function() {
                    assert.isOk(true, "promise is resolved");
                    assert.equal(asyncDataSource._ranges.length, 2);
                    done();
                });
            });
        });

        it("calls prefetch only once per range", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([90]);
                virtualList.prefetch([91]);
                virtualList.prefetch([92]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 1);
                done();
            });
        });

        //VirtualList prefetch, multiple selection
        it("does not call prefetch for already available data (multi selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([0, 4, 7]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 0);
                done();
            });
        });

        it("calls prefetch for not available data (multi selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([90, 167]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 2);
                done();
            });
        });

        it("resolves the promise when data is prefetched (multi selection)", function(done) {
            var deferred;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            stub(asyncDataSource, {
                _multiplePrefetch: asyncDataSource._multiplePrefetch
            });

            asyncDataSource.read().then(function() {
                deferred = virtualList.prefetch([90]);
                deferred.done(function() {
                    assert.isOk(true, "promise is resolved");
                    assert.equal(asyncDataSource._ranges.length, 2);
                    done();
                });
            });
        });

        it("calls prefetch only once per range (multi selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            stub(asyncDataSource, "_multiplePrefetch");

            asyncDataSource.read().then(function() {
                virtualList.prefetch([40, 82, 100]);
                virtualList.prefetch([101]);
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 2);
                done();
            });
        });

        //rendering

        it("selecting listItem visually selects it", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().first();
                virtualList.select(element).done(function() {
                    assert.isOk(element.hasClass(SELECTED));
                    done();
                });
            });
        });

        it("selecting listItem visually selects it (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];
                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));
                elements.push(virtualList.items().eq(7));

                selectAll(virtualList, elements, function() {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED))
                    assert.isOk(virtualList.items().eq(2).hasClass(SELECTED))
                    assert.isOk(virtualList.items().eq(7).hasClass(SELECTED))
                    done();
                });
            });
        });

        it("selecting already selected listItem does not visually deselect it", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            var element;

            var selectElementDone2 = function() {
                assert.isOk(element.hasClass(SELECTED));
                done();
            }

            var selectElementDone1 = function() {
                assert.isOk(element.hasClass(SELECTED));
                virtualList.select(element).done(selectElementDone2);
            }

            var asyncDataSourceThen = function() {
                element = virtualList.items().first();
                virtualList.select(element).done(selectElementDone1);
            };

            asyncDataSource.read().then(asyncDataSourceThen);
        });

        it("selecting already selected listItems visually deselects it (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            var deselectSecondDone = function() {

                assert.isOk(!virtualList.items().eq(2).hasClass(SELECTED));
                done();
            };

            var allDone = function() {
                assert.isOk(virtualList.items().eq(1).hasClass(SELECTED));
                assert.isOk(virtualList.items().eq(2).hasClass(SELECTED));
                assert.isOk(virtualList.items().eq(7).hasClass(SELECTED));

                virtualList.select(virtualList.items().eq(2)).done(deselectSecondDone);
            };

            var asyncDataSourceThen = function() {
                var elements = [];
                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));
                elements.push(virtualList.items().eq(7));

                selectAll(virtualList, elements, allDone);
            };

            asyncDataSource.read().done(asyncDataSourceThen);
        });

        it("select method updates the value of the list", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                change: function() {
                    assert.equal(virtualList.value()[0], 0);
                    done();
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(virtualList.items().first());
            });
        });

        it("select method updates the value of the list (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];
                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));
                elements.push(virtualList.items().eq(7));

                selectAll(virtualList, elements, function() {
                    assert.equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 2, 7]));
                    done();
                });
            });
        });

        it("selecting already selected listItem does not deselect it", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var selectTwoDone = function() {
                    assert.equal(virtualList.value()[0], 0);
                    done();
                };

                var selectOneDone = function() {
                    virtualList.select(virtualList.items().first()).done(selectTwoDone);
                };

                virtualList.select(virtualList.items().first()).done(selectOneDone);
            });
        });

        it("selecting already selected listItem deselects it (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var elements = [];
                elements.push(virtualList.items().eq(1));
                elements.push(virtualList.items().eq(2));
                elements.push(virtualList.items().eq(7));

                var virtualDone = function() {
                    virtualList.select(virtualList.items().eq(2)).done(function() {
                        assert.equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 7]));
                        done();
                    });
                };

                selectAll(virtualList, elements, virtualDone);
            });
        });

        it("setting the initial value selects the item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: 6,
                valueMapper: valueMapper
            }));

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                done();
            });
        });

        it("setting the initial value selects the item (multiple selection)", function(done) {
            var values = [1, 10, 6];

            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: values,
                valueMapper: valueMapper
            }));

            asyncDataSource.read().then(function() {

                for (var i = 0; i < values.length; i++) {
                    assert.isOk(virtualList.items().eq(values[i]).hasClass(SELECTED), "Item " + i + " is selected");
                }
                done();
            });
        });

        it("setting the value with the value method updates the selection", function(done) {
            var values = [1, 10, 6];
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: values,
                valueMapper: valueMapper
            }));

            virtualList.bind("listBound", function() {
                virtualList.value(9).done(function() {
                    assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is not selected");
                    done();
                });
            });

            asyncDataSource.read();
        });

        it("setting the value with the value method updates the selection (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: valueMapper,
                change: function() {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.value([1, 5, 6]);
                done();
            });
        });

        it("setting the value with the value method clears the selection in valueMapper returns null", function(done) {
            var values = [100];
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: values,
                valueMapper: function(o) { o.success([-1]); }
            }));

            virtualList.bind("listBound", function() {
                assert.equal(virtualList.value().length, 0);
                done();
            });

            asyncDataSource.read();
        });

        it("selection is cleared if non existing value is set through the API and the valueMapper returns no indexes", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: 1,
                selectable: true,
                valueMapper: function(operation) {
                    operation.success([]);
                }
            }));

            virtualList.bind("listBound", function() {
                virtualList.bind("change", function(e) {
                    assert.isOk(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
                    done();
                });
                virtualList.value("");
            });

            asyncDataSource.read();
        });

        it("selection is cleared if non existing value is set through the API and the valueMapper returns -1", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: 1,
                selectable: true,
                valueMapper: function(operation) {
                    operation.success(-1);
                }
            }));

            virtualList.bind("listBound", function() {
                virtualList.bind("change", function(e) {
                    assert.isOk(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
                    done();
                });
                virtualList.value("");
            });

            asyncDataSource.read();
        });

        it("value method works if called before the dataSource is fetched and list is created", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: valueMapper
            }));

            virtualList.value(3);

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
                done();
            });
        });

        it("value method works if called before the dataSource is fetched and list is created (multiple values)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: valueMapper
            }));

            virtualList.value([1, 5, 9]);

            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
                done();
            });
        });

        it("selecting item triggers the change event", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                change: function() {
                    assert.isOk(true, "change is triggered");
                    done();
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(virtualList.items().first());
            });
        });

        it("selecting already selected item does not trigger the change event", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: 0
            }));

            virtualList.bind("listBound", function() {
                virtualList.one("change", function() {
                    assert.isOk(false);
                });
                virtualList.select(0).done(function() {
                    done();
                });
            });

            asyncDataSource.read();
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
                value: [0, 1],
                valueMapper: valueMapper,
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
                value: [0, 7]
            }));

            virtualList.bind("listBound", function() {
                var element = virtualList.items().eq(0);

                virtualList.select(element).done(function() {
                    assert.equal(virtualList.selectedDataItems().length, 1, "First item is removed");
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
                    done();
                });
            });

            asyncDataSource.read();
        });

        it("changing the value through the value method updates dataItems collection", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: valueMapper,
                change: function() {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[1]);
                    done();
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.value([1]);
            });
        });

        it("changing the value through the value method updates dataItems collection (multi selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: valueMapper,
                change: function() {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    done();
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.value([0, 1]);
            });
        });

        it("changing the value through the value method updates dataItems collection (initially set values)", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                value: [7],
                valueMapper: valueMapper,
                selectable: "multiple"
            }));

            virtualList.bind("listBound", function() {

                virtualList.bind("change", function() {
                    if (count > 1) { //skip first change when value is cleared
                        assert.equal(virtualList.selectedDataItems().length, 2);
                        assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                        assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    }
                    count += 1;
                    done();
                });
                virtualList.value([0, 1]);
            });

            asyncDataSource.read();
        });

        it("not available dataItems set as values are prefetched", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(o) {
                    o.success([7, 256]);
                },
                change: function() {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0].value === 7);
                    assert.isOk(virtualList.selectedDataItems()[1].value === 256);
                    done();
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.value([7, 256]);
            });
        });

        it("not available dataItems set as values are prefetched (initially set items)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [7, 256],
                valueMapper: function(o) {
                    o.success([7, 256]);
                },
                change: function() {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0].value === 7);
                    assert.isOk(virtualList.selectedDataItems()[1].value === 256);
                    done();
                }
            }));

            asyncDataSource.read();
        });

        it("selection is persisted accross ranges", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                itemHeight: 40
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
                var elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

                selectAll(virtualList, elements, function() {
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
                    assert.equal(virtualList.value()[0], 2);
                    done();
                });
            });
        });

        it("previously selected dataItem is removed (single selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

                selectAll(virtualList, elements, function() {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0].value, 2);
                    done();
                });
            });
        });

        // select method

        it("select method focuses the element", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().eq(1);
                virtualList.select(element).done(function() {
                    assert.isOk(element.hasClass(FOCUSED));
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
                    assert.equal(virtualList.value()[0], 1);
                    assert.equal(virtualList.selectedDataItems()[0].value, 1);
                    done();
                });
            });
        });

        it("select method changes the focused element", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

                selectAll(virtualList, elements, function() {
                    assert.isOk(!virtualList.items().eq(1).hasClass(FOCUSED));
                    assert.isOk(virtualList.items().eq(2).hasClass(FOCUSED));
                    done();
                });
            });
        });

        it("select method changes the value", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

                selectAll(virtualList, elements, function() {
                    assert.equal(virtualList.value().length, 1);
                    assert.equal(virtualList.value()[0], 2);
                    done();
                });
            });
        });

        it("select method accepts predicate function", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(function(dataItem) {
                    return dataItem.value === 2;
                }).done(function() {
                    var element = virtualList.items().eq(2);
                    assert.isOk(element.hasClass(FOCUSED));
                    assert.isOk(element.hasClass(SELECTED));
                    assert.equal(virtualList.value()[0], 2);
                    done();
                });
            });
        });

        /*// Temporary remove this tests, optionLabel will not be supported in Q1 2015
        it("select method focuses the optionLabel", function(done) {
            var virtualList = new VirtualList(container, {
                dataSource: asyncDataSource,
                template: "#=text#",
                dataValueField: "value",
                selectable: true,
                optionLabel: {
                    value: "",
                    text: "Option Label"
                }
            });
    
            setTimeout(function() {
                done();
                virtualList.select(-1);
    
                var optionLabel = virtualList.optionLabel;
    
                assert.isOk(optionLabel.hasClass(FOCUSED));
            }, 100);
        });
    
        it("select method selects the optionLabel", function(done) {
            var virtualList = new VirtualList(container, {
                dataSource: asyncDataSource,
                template: "#=text#",
                dataValueField: "value",
                selectable: true,
                optionLabel: {
                    value: "",
                    text: "Option Label"
                }
            });
    
            setTimeout(function() {
                done();
                virtualList.select(-1);
    
                var optionLabel = virtualList.optionLabel;
    
                assert.isOk(optionLabel.hasClass(FOCUSED));
                assert.isOk(optionLabel.hasClass(SELECTED));
                assert.equal()
            }, 100);
        });
        */

        it("select method returns currently selected index", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(3).done(function() {
                    assert.equal(virtualList.select(), 3);
                    done();
                });
            });
        });

        it("select method deletes selected value when -1 is passed", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: 6
            }));

            virtualList.bind("listBound", function() {
                virtualList.select(-1).done(function() {
                    assert.equal(virtualList.value().length, 0);
                    done();
                });
            });

            asyncDataSource.read();
        });

        it("select method sets selected values when multiple elements are selected", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var virtualDone = function() {
                    assert.equal(virtualList.value().length, 2);
                    assert.equal(virtualList.value()[0], 1);
                    assert.equal(virtualList.value()[1], 0);
                    done();
                };

                selectAll(virtualList, [1, 0], virtualDone);
            });
        });

        it("select method removes values on deselect", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                var selectDone2 = function() {
                    assert.equal(virtualList.value().length, 0);
                    done();
                };

                var selectDone1 = function() {
                    selectAll(virtualList, [0, 1], selectDone2);
                };

                selectAll(virtualList, [0, 1], selectDone1);
            });
        });

        // select method

        it("focus method adds focused class to the element", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element = virtualList.items().eq(1);
                virtualList.focus(element);

                assert.isOk(element.hasClass(FOCUSED));
                done();
            });
        });

        it("focus method changes the focused element", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element1 = virtualList.items().eq(1);
                virtualList.focus(element1);

                var element2 = virtualList.items().eq(2);
                virtualList.focus(element2);

                assert.isOk(!element1.hasClass(FOCUSED));
                assert.isOk(element2.hasClass(FOCUSED));
                done();
            });
        });

        it("focus method does not change the selection", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element1 = virtualList.items().eq(1);
                virtualList.select(element1).done(function() {
                    var element2 = virtualList.items().eq(2);
                    virtualList.focus(element2);

                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                    done();
                });
            });
        });

        it("focus method accepts predicate function", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.focus(function(dataItem) {
                    return dataItem.value === 1;
                });

                var element = virtualList.items().eq(1);
                assert.isOk(element.hasClass(FOCUSED));
                done();
            });
        });

        it("next method focuses the next item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element1 = virtualList.items().eq(1);
                virtualList.select(element1).done(function() {
                    var element2 = virtualList.items().eq(2);
                    virtualList.focusNext();

                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                    done();
                });
            });
        });

        it("prev method focuses the prev item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                var element1 = virtualList.items().eq(2);
                virtualList.select(element1).done(function() {
                    var element2 = virtualList.items().eq(1);
                    virtualList.focusPrev();

                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                    done();
                });
            });
        });

        it("focus method scrolls to the focused item in case the List is in hidden container", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(0).done(function() {
                    virtualList.wrapper.hide();

                    selectAll(virtualList, [9, 10, 11, 12], function() {
                        virtualList.wrapper.show();
                        virtualList.focus(12);

                        assert.equal(virtualList.content.scrollTop(), 12 * ITEM_HEIGHT);
                        done();
                    });
                });
            });
        });

        //Comment as unstable
        //http://kendobuild/build/job/CI-Production/5849/console
        //
        /*it("next method does not focus next item if it is not loaded", function(done) {    it("next method does not focus next item if it is not loaded", function(done) {
            var asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 100);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });
    
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                dataSource: asyncDataSource
            }));
    
            asyncDataSource.read().then(function() {
                virtualList.select(39);
    
                setTimeout(function() {
                    done();
    
                    var current = virtualList.focus();
                    virtualList.focusNext();
    
                    assert.equal(virtualList.focus()[0], current[0], "incorrect item is focused");
                });
            });
        });
    
        it("prev method does not focus prev item if it is not loaded", function(done) {
            var asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 100);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });
    
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                dataSource: asyncDataSource
            }));
    
            asyncDataSource.read().then(function() {
                virtualList.select(201);
    
                setTimeout(function() {
                    done();
    
                    var current = virtualList.focus();
                    virtualList.focusPrev();
    
                    assert.equal(virtualList.focus()[0], current[0], "incorrect item is focused");
                }, 150);
            });
        });*/
    });
}());
