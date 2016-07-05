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

})();
