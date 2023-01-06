(function() {
    var container,
        asyncDataSource,
        ITEM_HEIGHT = 20,
        CONTAINER_HEIGHT = 200;

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                text: "Item " + i,
                value: i
            });
        }

        return items;
    }

    describe("VirtualList AngularJS integration", function() {
        beforeEach(function() {
            container = "<div id='container' kendo-virtual-list k-options='virtualOptions'></div>";

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
        });

        afterEach(function() {
             kendo.destroy(Mocha.fixture);
        });

        // REMOVED DUE TO CSP

        });
}());
