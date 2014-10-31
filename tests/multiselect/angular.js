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
})();
