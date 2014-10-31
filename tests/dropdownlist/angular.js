(function () {
    module("DropDownList AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("dropdown recognizes selected primitive items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoDropDownList().value(), "red");
    });

    ngTest("dropdown recognizes selected object items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoDropDownList().dataItem()), JSON.stringify({ color: "red" }));
    });

    ngTest("dropdown works with data-value-primitive in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoDropDownList().value(), "red");
    });

    ngTest("dropdown returns primitives to model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = QUnit.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger('change');
        equal(JSON.stringify(scope.selectedColor), JSON.stringify({ color: 'blue' }));
    });

    ngTest("dropdown returns primitives to model with primitive", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = QUnit.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger("change");
        equal(JSON.stringify(scope.selectedColor), JSON.stringify('blue'));
    });
})();
