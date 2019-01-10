(function () {
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

    describe("VirtualList AngularJS integration", function () {
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
