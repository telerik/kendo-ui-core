(function () {
    var container,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
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

    module("VirtualList AngularJS integration", {
        setup: function() {
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
        },

        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("virtuallist compiles templates", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.virtualOptions = {
                dataSource: asyncDataSource,
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                dataValueField: "value",
                template: "<span>{{dataItem.text}}</span>"
            };
        });

        QUnit.fixture.html('<div ng-controller=mine>' + container + '</div>');
    },

    function() {
        var virtualList = $("#container").data("kendoVirtualList");
        var element = virtualList.items().first();
        equal(element.text(), "Item 0");

        element = virtualList.items().last();
        equal(element.text(), "Item 39");
    });

    ngTest("scope variables are available in the template context", 1, function() {
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

        QUnit.fixture.html('<div ng-controller=mine>' + container + '</div>');
    },

    function() {
        var virtualList = $("#container").data("kendoVirtualList");
        var element = virtualList.items().first();
        equal(element.text(), "fooItem 0");
    });

})();
