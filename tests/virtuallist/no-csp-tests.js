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

    describe("VirtualList AngularJS integration - No CSP", function() {
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

        ngTest("virtuallist compiles templates", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.virtualOptions = {
                    dataSource: asyncDataSource,
                    height: CONTAINER_HEIGHT,
                    itemHeight: ITEM_HEIGHT,
                    dataValueField: "value",
                    template: "<span>{{dataItem.text}}</span>"
                };
            });

                Mocha.fixture.html('<div ng-controller=mine>' + container + '</div>');
            },

            function() {
                var virtualList = $("#container").data("kendoVirtualList");
                var element = virtualList.items().first();
                assert.equal(element.text(), "Item 0");

                element = virtualList.items().last();
                assert.equal(element.text(), "Item 39");
            }
        );

        ngTest("scope variables are available in the template context", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.foo = "foo";

                $scope.virtualOptions = {
                    dataSource: asyncDataSource,
                    height: CONTAINER_HEIGHT,
                    itemHeight: ITEM_HEIGHT,
                    dataValueField: "value",
                    template: "<span>{{foo}}{{dataItem.text}}</span>"
                };
            });

                Mocha.fixture.html('<div ng-controller=mine>' + container + '</div>');
            },

            function() {
                var virtualList = $("#container").data("kendoVirtualList");
                var element = virtualList.items().first();
                assert.equal(element.text(), "fooItem 0");
            });

        });
}());

(function() {
    var container,
        template,
        viewModel,
        asyncDataSource,
        virtualList,
        VirtualList = kendo.ui.VirtualList,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-selected";

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

    describe("VirtualList MVVM - No CSP", function() {
        beforeEach(function() {
            container = $("<div id='container' data-role='virtuallist' data-bind='source: asyncDataSource' data-template='tmp' data-value-field='value' data-item-height='20' data-height='200'></div>")
                .appendTo(Mocha.fixture);

            template = $("<script id='tmp' type='text/x-kendo-template'>" +
                            "<div data-bind='text: text'></div>" +
                         "</script>")
                .appendTo(Mocha.fixture);

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

            viewModel = kendo.observable({
                asyncDataSource: asyncDataSource
            });

            kendo.bind(Mocha.fixture, viewModel);
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
    });

    it("items are rendered", function(done) {
        virtualList = container.getKendoVirtualList();
        setTimeout(function() {
            assert.equal(virtualList.items().eq(0).text(), "Item 0");
            assert.equal(virtualList.items().last().text(), "Item 39");
            done();
        }, 100);
    });

    it("items are rebound after re-rendering (list scroll)", function(done) {
        virtualList = container.getKendoVirtualList();
        setTimeout(function() {
            scroll(virtualList.content, 620);
            setTimeout(function() {
                assert.equal(virtualList.items().eq(0).text(), "Item 11");
                assert.equal(virtualList.items().last().text(), "Item 50");
                done();
            }, 300);
        }, 100);
    });

    });
}());
