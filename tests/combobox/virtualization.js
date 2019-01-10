(function() {
    var ComboBox = kendo.ui.ComboBox,
        select;

    var CONTAINER_HEIGHT = 200;

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

    function createAsyncDataSource() {
        return new kendo.data.DataSource({
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
    }

    describe("kendo.ui.ComboBox Virtualization", function () {
        beforeEach(function() {
            kendo.ns = "";
            select = $("<select />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            if (select.data("kendoComboBox")) {
                select.data("kendoComboBox").destroy();
            }
        });

    it("ComboBox does not revert scroll position on dataBound", function(done) {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            scroll(combobox.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {

                assert.notEqual(combobox.listView.content.scrollTop(), 0);
                done();
            }, 100);

        });

        combobox.value("0");
    });

    it("widget dropdown is opened after filtering", function(done) {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.search("Item");
            combobox.select(0);
            combobox.close();
            combobox.open();

            setTimeout(function() {
                assert.isOk(combobox.list.is(":visible"));
                done();
            }, 100);
        });
    });

    it("after filtering widget's list selects item that was selected from filtered data set and is part of the first DataSource page ", function(done) {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value ? parseInt(o.value) : -1); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.search("0");
            combobox.select(0).done(function() {
                assert.isOk(combobox.listView.items().eq(0).hasClass("k-state-selected"));

                combobox.close();
                combobox.open();
            });

            setTimeout(function() {
                assert.isOk(combobox.listView.items().eq(0).hasClass("k-state-selected"));
                done();
            }, 200);
        });
    });

    it("Widget's list selects item from filtered data set after filter is cleared", function(done) {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: {
                    read: function(options) {
                        if (options.data.filter && options.data.filter.filters[0]) {
                            setTimeout(function() {
                                options.success({
                                    data: [
                                        { id: 1, value: 1, text: "Item " + 1 },
                                        { id: 11, value: 11, text: "Item " + 11 },
                                        { id: 111, value: 111, text: "Item " + 111 },
                                        { id: 1111, value: 1111, text: "Item " + 1111 }
                                    ],
                                    total: 4
                                });
                            }, 0);
                        } else {
                            setTimeout(function() {
                                options.success({ data: generateData(options.data), total: 300 });
                            }, 0);
                        }
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { var val = parseInt(o.value); o.success(isNaN(val) ? null : val); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            combobox.select(1).done(function() {
                combobox.close();

                combobox.one("dataBound", function() {
                    combobox.bind("dataBound", function() {
                        if (combobox.dataSource.page() > 1) { //wait until the binding is done
                            assert.equal(combobox.select(), 111);
                            assert.equal(combobox.dataItem().value, 111);
                            assert.isOk($("[data-offset-index=111]").hasClass("k-state-focused"));
                            assert.isOk($("[data-offset-index=111]").hasClass("k-state-selected"));
                            done();
                        }
                    });

                    //select "Item 111"
                    combobox.select(2).done(function() {
                        combobox._filterSource();
                    });
                });

                combobox.search("1");
            });
        });
    });

    it("widget keeps the selected item after filter is cleared", function(done) {
        var combobox = new ComboBox(select, {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: {
                    read: function(options) {
                        var filter = options.data.filter;

                        if (filter && filter.filters.length) {
                            setTimeout(function() {
                                options.success({
                                    data: [
                                        { id: 1, value: 1, text: "Item " + 1 },
                                        { id: 11, value: 11, text: "Item " + 11 },
                                        { id: 111, value: 111, text: "Item " + 111 },
                                        { id: 1111, value: 1111, text: "Item " + 1111 }
                                    ],
                                    total: 4
                                });
                            }, 0);
                        } else {
                            setTimeout(function() {
                                options.success({ data: generateData(options.data), total: 300 });
                            }, 0);
                        }
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            combobox.select(1).done(function() {
                combobox.close();

                combobox.one("dataBound", function() {
                    assert.equal(combobox.select(), 11);
                    assert.equal(combobox.dataItem().value, 11);
                    assert.isOk($("[data-offset-index=11]").hasClass("k-state-focused"));
                    assert.isOk($("[data-offset-index=11]").hasClass("k-state-selected"));
                    done();
                });

                combobox.open();
            });
        });

        combobox.search("1");
    });

    it("widget keeps selected value when filter is cleared (select)", function(done) {
        var data = generateData({ skip: 0, take: 40 });
        var combobox = new ComboBox(select, {
            autoBind: false,
            animation: false,
            height: 200,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: { read: function(options) { options.success(data); } },
                pageSize: 40
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 28
            }
        });

        combobox.one("dataBound", function() {
            combobox.select(0).done(function() {
                combobox.close();

                combobox.one("dataBound", function() {
                    assert.equal(combobox.value(), "11");
                    done();
                });

                combobox.open();
            });
        });

        //simulate MVVM value binding
        combobox._preselect("1", "Item1");
        combobox.search("11");
    });

    it("dataItem returns correct object based on LI element", function(done) {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource : new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 53 });
                        }, 0);
                    }
                },
                serverFiltering: true,
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        combobox.open();
        combobox.one("dataBound", function() {
            combobox.one("dataBound", function() {
                var item49 = combobox.listView.content.find("li")
                                     .filter(function(_, li) { return $(li).data("offsetIndex") == 49 });

                var dataItem = combobox.dataItem(item49);

                assert.equal(dataItem.value, 49);
                assert.equal(dataItem.text, item49.text());
                done();
            });

            scroll(combobox.listView.content, 5 * CONTAINER_HEIGHT);
        });
    });

    it("widget focuses the item found during text search", function(done) {
        var combobox = new ComboBox(select, {
            delay: 0,
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.input.focus().val("Item 1");
            combobox.input.trigger({ type: "keydown" });

            setTimeout(function() {
                assert.isOk($("[data-offset-index=1]").hasClass("k-state-focused"));
                done();
            }, 100);
        });
    });

    it("keep selected value when list is scrolled", function(done) {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();

            combobox.one("dataBound", function() {
                assert.equal(select.val(), 10);
                done();
            });

            scroll(combobox.listView.content, 5 * CONTAINER_HEIGHT);
        });

        combobox.value(10);
    });

    it("clear filter when set new value", function(done) {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(isNaN(o.value) ? -1 : o.value); },
                itemHeight: 20
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();

            combobox.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            combobox.one("dataBound", function() {

                combobox.value("");

                assert.equal(combobox.dataSource.filter().filters.length, 0);
                done();
            });
        });

        combobox.value(10);
    });

    it("use DataSource that was already read", function() {
        var noErrors = true;
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function(o) {
                    o.success([{text: "asd", value: 1}]);
                }
            }
        });
        dataSource.read();
        try {
            var combobox = new ComboBox(select, {
                close: function(e) { e.preventDefault(); },
                height: CONTAINER_HEIGHT,
                animation: false,
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dataSource,
                virtual: {
                    valueMapper: function(o) { o.success(o.value); },
                    itemHeight: 20
                }
            });
        } catch(err) {
            noErrors = false;
        }
        assert.isOk(noErrors);
    });
    });
}());
