(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                text: " Item " + i
            });
        }

        return items;
    }

    var Async = kendo.Class.extend({
        init: function() {
            this.promises = [];
        },

        exec: function(callback) {
            var promise = $.Deferred();

            promise.done(callback);

            this.promises.push(promise);
        },

        resolve: function(idx) {
            var promise = this.promises[idx];

            if (!promise) {
                throw new Error("There is no promise to resolve!");
            }

            promise.resolve();
        },

        allDone: function(callback) {
            $.when.apply($, this.promises).done(callback);
        }
    });

    describe("VirtualList: ", function () {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 100 });
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
                itemHeight: ITEM_HEIGHT,
                height: CONTAINER_HEIGHT,
                template: "#:text#"
            };
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
        });

    function createAsyncDataSource(options) {
        return new kendo.data.DataSource($.extend({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 100 });
                    }, 0);
                }
            },
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        }, options));
    }

    it("each column template shows text field if there is not field defined", function() {
        var list = new VirtualList(container, {
            columns: [
                {},
            ],
            dataTextField: "text",
            dataSource: [ { id: 1, text: "item1" },
            { id: 2, text: "item2" },
            { id: 3, text: "item3" }]
        });

        assert.equal(list.templates.column0({ id: 1, text: "item1" }), "item1");
    });

     it("each column sets a new template", function() {
        var list = new VirtualList(container, {
            columns: [
                {field: "name"},
                {field: "id"}
            ],
            dataTextField: "name",
            dataSource: [ { id: 1, name: "item1" },
            { id: 2, name: "item2" },
            { id: 3, name: "item3" }]
        });

        assert.equal(list.templates.column0({ id: 1, name: "item1" }), "item1");
        assert.equal(list.templates.column1({ id: 2, name: "item2" }), "2");
    });

    it("each custom template is applied", function() {
        var list = new VirtualList(container, {
            columns: [
                {field: "name", template: "new #: name #"},
                {field: "id"}
            ],
            dataTextField: "name",
            dataSource: [ { id: 1, name: "item1" },
            { id: 2, name: "item2" },
            { id: 3, name: "item3" }]
        });

        assert.equal(list.templates.column0({ id: 1, name: "item1" }), "new item1");
    });

    });
}());
