(function () {
    module("NumericTextBox AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest2("k-ng-model updates model on numerictextbox change", 1, function(dom, controller, bootstrap) {
        $("<div><input kendo-numerictextbox='number' k-ng-model='value' /></div>")
            .appendTo(dom);

        controller(function($scope) {
            $scope.value = 10;
        });

        bootstrap(); var $scope = dom.scope();

        $scope.number.value(11);
        $scope.number.trigger("change");

        equal($scope.value, 11);
    });

    ngTest2("k-ng-model updates model on numerictextbox spin", 2, function(dom, controller, bootstrap) {
        $("<div><input kendo-numerictextbox='number' k-ng-model='value' /></div>")
            .appendTo(dom);

        controller(function($scope) {
            $scope.value = 10;
        });

        bootstrap(); var $scope = dom.scope();

        $scope.number._upArrowEventHandler.notify("press");

        equal($scope.number.value(), 11);
        equal($scope.value, 11);
    });

    ngTest("ng-model updates model on numerictextbox change", 1, function() {
        angular.module("kendo.tests").controller("main", function($scope) {
            $scope.value = 10;
        });

        QUnit.fixture.html('<div ng-controller=main><input kendo-numeric-text-box="number" ng-model="value" /></div>');
    },

    function() {
        var numerictextbox = QUnit.fixture.find("[data-role=numerictextbox]").getKendoNumericTextBox();

        var scope = numerictextbox.element.scope();

        numerictextbox.value(11);
        numerictextbox.trigger("change");

        equal(scope.value, 11);
    });

    ngTest("ng-model updates model on numerictextbox spin", 2, function() {
        angular.module("kendo.tests").controller("main", function($scope) {
            $scope.value = 10;
        });

        QUnit.fixture.html('<div ng-controller=main><input kendo-numeric-text-box="number" ng-model="value" /></div>');
    },

    function() {
        var numerictextbox = QUnit.fixture.find("[data-role=numerictextbox]").getKendoNumericTextBox();

        var scope = numerictextbox.element.scope();

        numerictextbox._upArrowEventHandler.notify("press");

        equal(numerictextbox.value(), 11);
        equal(scope.value, 11);
    });
})();
