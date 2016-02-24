(function () {
    module("MultiSelect AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("multiselect recognizes selected primitive items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoMultiSelect().value()), JSON.stringify([ "red", "green" ]));
    });

    ngTest("multiselect recognizes selected object items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoMultiSelect().dataItems()), JSON.stringify([ { color: "red" }, { color: "green" } ]));
    });

    ngTest("multiselect works with data-value-primitive in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoMultiSelect().value()), JSON.stringify(["red", "green"]));
    });

    ngTest("multiselect returns primitives to model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = QUnit.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([ 'blue' ]);
        multiSelect.trigger("change");
        equal(JSON.stringify(scope.selectedColors), JSON.stringify([ { color: 'blue' }]));
    });

    ngTest("multiselect returns primitives to model with primitive", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = QUnit.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([ 'blue' ]);
        multiSelect.trigger("change");
        equal(JSON.stringify(scope.selectedColors), JSON.stringify([ 'blue' ]));
    });

    ngTest("multiselect returns empty array when no value is set", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = QUnit.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([]);
        multiSelect.trigger("change");
        equal(JSON.stringify(scope.selectedColors), JSON.stringify([]));
    });

    ngTest("multiselect with autoBind:false fetches when value is primitive", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = ["green"];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-auto-bind="false" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = QUnit.fixture.find("select").getKendoMultiSelect();

        equal(multiSelect.value()[0], "green");
        equal(multiSelect.listView.bound(), true);
    });

    ngTest("multiselect honors autoBind:false option when valuePrimitive is false", 4, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red" }, { color: "green" }, { color: "blue" } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors });
            $scope.selectedColors = [ colors[0], colors[1] ];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-auto-bind="false" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = QUnit.fixture.find("select").getKendoMultiSelect();
        var values = multiSelect.value();

        equal(values.length, 2);
        equal(values[0], "red");
        equal(values[1], "green");

        equal(multiSelect.dataSource.view().length, 2);
    });

    ngTest("multiselect compiles tag templates", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                tagTemplate: "#:data# - {{text}}",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var tags = QUnit.fixture.find("select").getKendoMultiSelect().tagList.children();
        equal(tags.eq(0).children("span:first").text(), "red - My text");
        equal(tags.eq(1).children("span:first").text(), "green - My text");
    });

    ngTest("multiselect compiles item templates", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                itemTemplate: "{{dataItem}} - {{text}}",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var items = QUnit.fixture.find("select").getKendoMultiSelect().items();
        equal($(items[0]).text(), "red - My text");
        equal($(items[1]).text(), "green - My text");
        equal($(items[2]).text(), "blue - My text");
    });

    //ng-model

    ngTest("multiselect with autoBind:false skips binding when value is null", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = null;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-multi-select k-auto-bind="false" ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoMultiSelect();

        equal(widget.listView.bound(), false);
        equal(widget.value(), "");
    });
})();
