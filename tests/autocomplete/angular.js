(function () {
    module("AutoComplete AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("autocomplete recognizes selected primitive items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-auto-complete k-ng-model=selectedColors k-data-source=colors></div>');
    },

    function() {
        equal(QUnit.fixture.find("input").getKendoAutoComplete().value(), "red,green");
    });

    ngTest("autocomplete recognizes selected object items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
    },

    function() {
        equal(QUnit.fixture.find("input").getKendoAutoComplete().value(), "red,green");
    });

    ngTest("autocomplete accepts single selected object with k-ng-model if separator is not defined", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = $scope.colors[1];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
    },

    function() {
        equal(QUnit.fixture.find("input").getKendoAutoComplete().value(), "green");
    });

    ngTest("autocomplete works with data-value-primitive in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
    },

    function() {
        equal(QUnit.fixture.find("input").getKendoAutoComplete().value(), "red,green");
    });

    ngTest("autocomplete returns primitives to model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            // $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
    },

    function() {
        var autocomplete = QUnit.fixture.find("input").getKendoAutoComplete();
        var scope = autocomplete.element.scope();
        autocomplete.dataSource.fetch();
        autocomplete.value('blue');
        autocomplete.trigger('change');
        equal(JSON.stringify(scope.selectedColors), JSON.stringify([{ color: 'blue' }]));
    });

    ngTest("autocomplete returns primitives to model with primitive", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
    },

    function() {
        var autocomplete = QUnit.fixture.find("input").getKendoAutoComplete();
        var scope = autocomplete.element.scope();
        autocomplete.dataSource.fetch();
        autocomplete.value('blue');
        autocomplete.trigger("change");
        equal(JSON.stringify(scope.selectedColors), JSON.stringify([ 'blue' ]));
    });

    ngTest("autocomplete compiles header template", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                headerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete  k-ng-model=selectedColors k-options=selectOptions /></div>');
    },

    function() {
        var header = QUnit.fixture.find("input").getKendoAutoComplete().header;
        equal(header.text(), "My text");
    });

    ngTest("autocomplete compiles footer template", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                footerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete  k-ng-model=selectedColors k-options=selectOptions /></div>');
    },

    function() {
        var widget = QUnit.fixture.find("input").getKendoAutoComplete();
        widget.search("red");

        equal(widget.footer.text(), "My text");
    });

    module("Virtualized AutoComplete AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

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
                    options.success({ data: generateData(options.data), total: 300 });
                }
            },
            serverFiltering: true,
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });
    }

    ngTest("autocomplete sets selected data item to the model", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                close: function(e) { e.preventDefault(); },
                animation: false,
                height: CONTAINER_HEIGHT,
                dataTextField: "text",
                virtual: {
                    valueMapper: function(o) { o.success(o.value); },
                    itemHeight: 20
                }
            };
            $scope.data = createAsyncDataSource();
            $scope.selectedColors = [];
        });

        QUnit.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=data k-options="options"></div>');
    },

    function(start) {
        var autocomplete = QUnit.fixture.find("input").getKendoAutoComplete();
        var scope = autocomplete.element.scope();

        autocomplete.one("dataBound", function() {
            autocomplete.one("dataBound", function() {
                var item40 = autocomplete.listView.content.find("li")
                                         .filter(function(_, li) { return $(li).data("offsetIndex") == 40 });

                item40.click();

                setTimeout(function() {
                    start();
                    equal(scope.selectedColors.length, 1);
                    equal(scope.selectedColors[0].text, "Item 40");
                }, 100);
            });

            scroll(autocomplete.listView.content, 4 * CONTAINER_HEIGHT);
        });

        autocomplete.search("Item");
    },
    true);
})();
