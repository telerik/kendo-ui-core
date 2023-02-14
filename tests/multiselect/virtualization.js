(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    var CONTAINER_HEIGHT = 200;

    function popuplateSelect() {
        var options = [];
        for (var i = 0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
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

    function createAsyncDataSource(options) {
        options = options || {};
        var transport = {
            read: function(options) {
                setTimeout(function() {
                    options.success({ data: generateData(options.data), total: 300 });
                }, 0);
            }
        };

        return new kendo.data.DataSource({
            transport: options.transport || transport,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });
    }

    describe("kendo.ui.MultiSelect Initialization", function() {
        beforeEach(function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

    it("MultiSelect renders option value if only values are available", function(done) {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                var options = multiselect.element.children(":selected");

                assert.equal(options.length, 1);

                assert.equal(options[0].text, "Item 0");
                assert.equal(options[0].value, "0");
                done();
            }, 300);

        });

        multiselect.value("0");
        multiselect.open();
    });

    it("MultiSelect renders part of the selected data items and values", function(done) {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                var options = multiselect.element.children(":selected");

                options = options.sort(function(a, b) { return parseInt(a.value) - parseInt(b.value); });

                assert.equal(options.length, 2);

                assert.equal(options[0].text, "Item 0");
                assert.equal(options[0].value, "0");

                assert.equal(options[1].text, "Item 15");
                assert.equal(options[1].value, "15");
                done();
            }, 300);

        });

        multiselect.value(["0", "15"]);
        multiselect.open();
    });

    it("MultiSelect can display values that are not part of the first data page and are set through the API after initial dataBinding", function(done) {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            multiselect.close();
            multiselect.value([300]);
            setTimeout(function() {
                assert.equal(multiselect.tagList.children(".k-chip").length, 1, "Selected tag is rendered");
                done();
            }, 300);
        });

        multiselect.open();
    });

    it("MultiSelect renders <select> tag if the corresponding dataItem is not part of the current data view", function(done) {
        var multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) {
                    o.success(o.value);
                },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.close();
            multiselect.value([299]);
            setTimeout(function() {
                assert.equal(multiselect.value()[0], [299]);
                assert.equal(multiselect.element.children().last().attr("value"), "299", "Custom option is rendered");
                done();
            }, 300);
        });

        multiselect.open();
    });

    //unstable
    /*it("dataItem returns correct object based on LI element", function(done) {
        var multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource : new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            var data = generateData(options.data);
                            data = data.slice(0, 53 - ((options.data.page - 1) * options.data.pageSize));
                            options.success({ data: data, total: 53 });
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

        multiselect.open();
        multiselect.one("dataBound", function() {
                setTimeout(function() {
                    done();
                    var item49 = multiselect.listView.content.find("li")
                                         .filter(function(_, li) { return $(li).data("offsetIndex") == 49 });

                    var dataItem = multiselect.dataItem(item49);

                    assert.equal(dataItem.value, 49);
                    assert.equal(dataItem.text, item49.text());
                }, 400);

            multiselect.listView.content.scrollTop(5 * CONTAINER_HEIGHT);
        });
    });*/

    it("MultiSelect triggers change on item select", function(done) {
        var multiselect = new MultiSelect(select, {
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
            },
            change: function() {
                assert.isOk(true, "change is fired");
                done();
            }
        });

        multiselect.one("dataBound", function() {
            var item = $(multiselect.items()[1]);
            item.click();
        });
        multiselect.open();
    });

    it("clear filter when set new value", function(done) {
        var multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            multiselect.one("dataBound", function() {

                multiselect.value("");

                assert.equal(multiselect.dataSource.filter().filters.length, 0);
                done();
            });
        });

        multiselect.value(10);
    });

    it("MultiSelect selects values after open when autoBind false", function(done) {
        var multiselect = new MultiSelect(select, {
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
            },
            value: ["0", "15"]
        });

        multiselect.one("dataBound", function() {
            assert.equal(multiselect.tagList.children(".k-chip").length, 2);
            done();
        });

        multiselect.open();
    });


    it("request only pages related to the values after filter reset", function() {
        jasmine.clock().install();

        var callsAfterFilter = [];
        var transport = {
            read: function(options) {
                //gatter requests after rebind
                if (options.data.filter && !options.data.filter.filters.length) {
                    callsAfterFilter.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        var multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        var filterDataBound = function() {
            multiselect.one("change", multiselect.open);
            multiselect.ul.children().last().click();
        };

        var initialBinding = function() {
            multiselect.one("dataBound", filterDataBound);
            multiselect.search("Item 200");
        };

        multiselect.one("dataBound", initialBinding);
        multiselect.value([20, 100]);

        jasmine.clock().tick(300);

        assert.equal(callsAfterFilter.length, 3);
        assert.equal(callsAfterFilter[0].pageSize, multiselect.dataSource.options.pageSize);
        assert.equal(callsAfterFilter[0].skip, 0);
        assert.equal(callsAfterFilter[1].skip, 80);
        assert.equal(callsAfterFilter[2].skip, 200);

        jasmine.clock().uninstall();
    });

    it("reset page size when start filtering after rebind", function() {
        jasmine.clock().install();

        var requests = [];
        var watchRequests = false;

        var transport = {
            read: function(options) {
                //gatter requests after rebind
                if (watchRequests) {
                    requests.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        var multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        var secondFilter = function() {
            watchRequests = true;

            //force datasource to use specific page
            stub(multiselect.dataSource, {
                page: function() { return 6; }
            });

            //search again
            multiselect.search("Item 200");
        };

        var afterFilterRebind = function() {
            multiselect.open();

            jasmine.clock().tick(200);

            secondFilter();
        };

        var filterDataBound = function() {
            multiselect.one("change", afterFilterRebind);
            multiselect.ul.children().last().click();
        };

        var initialBinding = function() {
            multiselect.one("dataBound", filterDataBound);
            multiselect.search("Item 200");
        };

        multiselect.one("dataBound", initialBinding);
        multiselect.value([20, 100]);

        jasmine.clock().tick(400);

        assert.equal(requests[0].page, 1);
        assert.equal(requests[0].pageSize, multiselect.dataSource.options.pageSize);

        jasmine.clock().uninstall();
    });

    it("highlight selected when filtering", function() {
        jasmine.clock().install();

        var requests = [];
        var watchRequests = false;

        var transport = {
            read: function(options) {
                //gatter requests after rebind
                if (watchRequests) {
                    requests.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        var multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });
        multiselect.value([200]);
        jasmine.clock().tick(1);
        multiselect.search("Item 200");
        jasmine.clock().tick(1);
        assert.equal($(".k-selected").length, 1);
        jasmine.clock().uninstall();
    });


    it("deselecting item persists scroll position", function(done) {
        var multiselect = new MultiSelect(select, {
            animation: false,
            autoClose: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();
            multiselect.listView.content.scrollTop(4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                var scrollPosition;

                //selects the item
                multiselect.ul.children().last().click();

                scrollPosition = multiselect.listView.content.scrollTop();

                //deselects the item
                multiselect.ul.children().last().click();

                assert.equal(multiselect.listView.content.scrollTop(), scrollPosition);
                done();
            }, 300);
        });

    });
    });
}());
