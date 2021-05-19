(function() {
    var container,
        asyncDataSource,
        virtualList,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 50,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-state-selected";

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    var data = [
        { id: 0, value: 0, text: "Item 0", letter: "a" },
        { id: 1, value: 1, text: "Item 1", letter: "b" },
        { id: 2, value: 2, text: "Item 2", letter: "a" },
        { id: 3, value: 3, text: "Item 3", letter: "b" },
        { id: 4, value: 4, text: "Item 4", letter: "b" },
        { id: 5, value: 5, text: "Item 5", letter: "a" },
        { id: 6, value: 6, text: "Item 6", letter: "b" },
        { id: 7, value: 7, text: "Item 7", letter: "b" },
        { id: 8, value: 8, text: "Item 8", letter: "b" },
        { id: 9, value: 9, text: "Item 9", letter: "b" },
        { id: 10, value: 10, text: "Item 10", letter: "b" },
        { id: 11, value: 11, text: "Item 11", letter: "b" },
        { id: 12, value: 12, text: "Item 12", letter: "b" },
        { id: 13, value: 13, text: "Item 13", letter: "b" },
        { id: 14, value: 14, text: "Item 14", letter: "a" },
        { id: 15, value: 15, text: "Item 15", letter: "a" },
        { id: 16, value: 16, text: "Item 16", letter: "a" },
        { id: 17, value: 17, text: "Item 17", letter: "b" },
        { id: 18, value: 18, text: "Item 18", letter: "b" },
        { id: 19, value: 19, text: "Item 19", letter: "a" },
        { id: 20, value: 20, text: "Item 20", letter: "a" },
        { id: 21, value: 21, text: "Item 21", letter: "b" },
        { id: 22, value: 22, text: "Item 22", letter: "b" },
        { id: 23, value: 23, text: "Item 23", letter: "b" },
        { id: 24, value: 24, text: "Item 24", letter: "b" },
        { id: 25, value: 25, text: "Item 25", letter: "b" },
        { id: 26, value: 26, text: "Item 26", letter: "b" },
        { id: 27, value: 27, text: "Item 27", letter: "b" },
        { id: 28, value: 28, text: "Item 28", letter: "b" },
        { id: 29, value: 29, text: "Item 29", letter: "b" },
        { id: 30, value: 30, text: "Item 30", letter: "a" }
    ];

    describe("VirtualList Filtering: ", function() {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            var filter = options.data.filter,
                                myData;

                            if (filter) {
                                var filterValue = options.data.filter.filters[0].value;
                                myData = data.filter(function(item) {
                                    return item.letter === filterValue;
                                });
                            } else {
                                myData = data;
                            }

                            options.success({ data: myData.slice(options.data.skip, options.data.skip + options.data.take), total: myData.length });
                        }, 0);
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            virtualList = new VirtualList(container, {
                autoBind: false,
                dataSource: asyncDataSource,
                template: "#=text# #=letter#",
                dataValueField: "value",
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                selectable: true,
                valueMapper: function(o) {
                    o.success(o.value);
                }
            });
        });

        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            Mocha.fixture.empty();
        });

        //rendering

        it("items are rendered after data is filtered", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.items().first().text(), "Item 1 b");
                    done();
                });
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "b" });
            });
        });

        it("itemCount changes after filtering", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.itemCount, 9);
                    done();
                });
                assert.equal(virtualList.itemCount, 16);
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
            });
        });

        it("itemCount changes after filtering", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.itemCount, 9);
                    done();
                });
                assert.equal(virtualList.itemCount, 16);
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
            });
        });

        it("list renders only the required amount of item placeholders after filtering", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.items().length, 9);
                    done();
                });
                assert.equal(virtualList.items().length, 16);
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
            });
        });

        it("works if the dataSource is filtered before list is created", function(done) {
            asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
            virtualList.one("listBound", function() {
                assert.equal(virtualList.items().length, 9);
                assert.equal(virtualList.items().first().text(), "Item 0 a");
                done();
            });
        });

        it("sets the correct container height after filtering", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.heightContainer.offsetHeight, 9 * 50);
                    done();
                });
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
            });
        });

        it("can be scrolled after dataSource is filtered", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    scroll(virtualList.content, 4 * CONTAINER_HEIGHT);
                    assert.equal(virtualList.items().last().text(), "Item 29 b");
                    done();
                });
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "b" });
            });
        });

        it("does not clear the values after filtering", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.equal(virtualList.value()[0], 0);
                    done();
                });
                virtualList.value([0]).done(function() {
                    asyncDataSource.filter({ field: "letter", operator: "eq", value: "b" });
                });
            });
        });

        it("highlight selected items when dataSource is filtered", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    virtualList.one("listBound", function() {
                        assert.isOk(virtualList.items().first().hasClass(SELECTED), "item is selected");
                        done();
                    });
                    assert.isOk(virtualList.items().first().hasClass(SELECTED), "item is selected");
                    asyncDataSource.filter([]);
                });
                virtualList.select(virtualList.items().first()).then(function() {
                    asyncDataSource.filter({ field: "letter", operator: "eq", value: "a" });
                });
            });
        });

        it("select the correct item after filter is cleared", function(asyncDone) {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success(data);
                        }, 0);
                    }
                }
            });

            virtualList.setDataSource(dataSource);

            dataSource.read().done(function() {
                virtualList.one("listBound", function() {
                    virtualList.select(11).done(function () {
                        virtualList.one("listBound", function() {
                            assert.equal(0, virtualList.items().find(".k-state-selected").length);
                            assert.deepEqual([17], virtualList.select());
                            asyncDone();
                        });
                        dataSource.filter([]);
                    });
                });
                dataSource.filter({ field: "letter", operator: "eq", value: "b" });
            });
        });

        it("throws ListBound event after filter is cleared", function(done) {
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    virtualList.one("listBound", function() {
                        assert.isOk(true, "listBound is fired");
                        done();
                    });
                    asyncDataSource.filter([]);
                });
                asyncDataSource.filter({ field: "letter", operator: "eq", value: "b" });
            });
        });

    });

    var localDataSource;

    describe("VirtualList Filtering (local data): ", function() {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            var data = [], i;
            for (i = 0; i < 5000; i++) {
                data.push({ text: 'Item ' + i, value: i.toString() });
            }

            localDataSource = new kendo.data.DataSource({
                data: data,
                schema: {
                    model: {
                        fields: {
                            text: { type: "string" },
                            value: { type: "string" }
                        }
                    }
                }
            });

            virtualList = new VirtualList(container, {
                dataSource: localDataSource,
                template: "#=text#",
                dataValueField: "value",
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                selectable: true,
                valueMapper: function(options) {
                    var data = this.dataSource.data();
                    var values = $.isArray(options.value) ? options.value : [options.value];
                    var res = [], i, j, l = values.length, dl = data.length;

                    for (i = 0; i < l; i++) {
                        for (j = 0; j < dl; j++) {
                            if (data[j].value === values[i]) {
                                res[i] = j;
                                break;
                            }
                        }
                    }

                    options.success(res);
                }
            });
        });

        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            Mocha.fixture.empty();
        });

        it("displays result after subsequent filtering", function(done) {
            virtualList.one("listBound", function() {
                assert.equal(this.items().first().text(), "Item 200");
            });
            localDataSource.filter({ field: "text", operator: "contains", value: "200" });

            virtualList.one("listBound", function() {
                assert.equal(this.items().first().text(), "Item 0");
            });
            localDataSource.filter([]);

            virtualList.one("listBound", function() {
                assert.equal(this.items().first().text(), "Item 1234");

                done();
            });
            localDataSource.filter({ field: "text", operator: "contains", value: "1234" });
        });

        it("set focus to the first item after subsequent filtering", function(done) {
            localDataSource.filter({ field: "text", operator: "contains", value: "200" });

            localDataSource.filter([]);

            virtualList.one("listBound", function() {
                assert.equal(this.focus().first().text(), "Item 1234");

                done();
            });
            localDataSource.filter({ field: "text", operator: "contains", value: "1234" });
        });

        it("selects item that was previously selected after filter is cleared", function(done) {
            virtualList.one("listBound", function() {
                virtualList.select(0).done(function() {
                    virtualList.one("listBound", function() {
                        assert.isOk(virtualList.items().eq(0).hasClass("k-state-selected"));
                        done();
                    });

                    localDataSource.filter([]);
                });
            });

            localDataSource.filter({ field: "text", operator: "contains", value: "0" });
        });

        it("resets pageSize after filters are cleared", function(done) {
            localDataSource.filter({ field: "text", operator: "contains", value: "200" });
            localDataSource.range(0, 8);

            virtualList.one("listBound", function() {
                assert.equal(virtualList.dataSource.pageSize(), 16);
                done();
            });

            localDataSource.filter([]);
        });

        it("clear selected values when list is filtered", function(done) {
            var container = $("<div/>").appendTo(Mocha.fixture);
            var virtualList = new VirtualList(container, {
                dataSource: localDataSource,
                template: "#=text#",
                dataValueField: "value",
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                selectable: "multiple",
                valueMapper: function(options) {
                    var data = this.dataSource.data();
                    var values = $.isArray(options.value) ? options.value : [options.value];
                    var res = [], i, j, l = values.length, dl = data.length;

                    for (i = 0; i < l; i++) {
                        for (j = 0; j < dl; j++) {
                            if (data[j].value === values[i]) {
                                res[i] = j;
                                break;
                            }
                        }
                    }

                    options.success(res);
                }
            });

            virtualList.one("listBound", function() {
                virtualList.select(0).done(function() {
                    virtualList.bind("change", function(e) {

                        assert.equal(virtualList.value().length, 0);
                        assert.equal(e.removed.length, 1);
                        assert.isOk(e.removed[0].dataItem);
                        assert.equal(e.removed[0].position, 0);
                        done();
                    });

                    virtualList.value([]);
                });
            });

            localDataSource.filter({ field: "text", operator: "contains", value: "0" });
        });
    });
}());
