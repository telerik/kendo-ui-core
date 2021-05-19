(function() {
    describe("NumericTextBox AngularJS integration", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        // ngTest2("k-ng-model updates model on numerictextbox change", function(dom, controller, bootstrap) {
        //     $("<div><input kendo-numerictextbox='number' k-ng-model='value' /></div>")
        //         .appendTo(dom);

        //     controller(function($scope) {
        //         $scope.value = 10;
        //     });

        //     bootstrap(); var $scope = dom.scope();

        //     $scope.number.value(11);
        //     $scope.number.trigger("change");

        //     assert.equal($scope.value, 11);
        // });

        // ngTest2("k-ng-model updates model on numerictextbox spin", function(dom, controller, bootstrap) {
        //     $("<div><input kendo-numerictextbox='number' k-ng-model='value' /></div>")
        //         .appendTo(dom);

        //     controller(function($scope) {
        //         $scope.value = 10;
        //     });

        //     bootstrap(); var $scope = dom.scope();

        //     $scope.number._upArrowEventHandler.notify("press");

        //     assert.equal($scope.number.value(), 11);
        //     assert.equal($scope.value, 11);
        // });

        ngTest("ng-model updates model on numerictextbox change", function() {
            angular.module("kendo.tests").controller("main", function($scope) {
                $scope.value = 10;
            });

            Mocha.fixture.html('<div ng-controller=main><input kendo-numeric-text-box="number" ng-model="value" /></div>');
        },

            function() {
                var numerictextbox = Mocha.fixture.find("[data-role=numerictextbox]").getKendoNumericTextBox();

                var scope = numerictextbox.element.scope();

                numerictextbox.value(11);
                numerictextbox.trigger("change");

                assert.equal(scope.value, 11);
            });

        ngTest("ng-model updates model on numerictextbox spin", function() {
            angular.module("kendo.tests").controller("main", function($scope) {
                $scope.value = 10;
            });

            Mocha.fixture.html('<div ng-controller=main><input kendo-numeric-text-box="number" ng-model="value" /></div>');
        },

            function() {
                var numerictextbox = Mocha.fixture.find("[data-role=numerictextbox]").getKendoNumericTextBox();

                var scope = numerictextbox.element.scope();

                numerictextbox._upArrowEventHandler.notify("press");

                assert.equal(numerictextbox.value(), 11);
                assert.equal(scope.value, 11);
            });

        ngTest("title attribute gets interpolated correctly", function() {
            angular.module("kendo.tests").filter("translator", function () {
                return function (value) { return value + " translated" }
            }).controller("main", function($scope) {
                $scope.value = 10;
                $scope.myTitle = "numeric test"
            });

            Mocha.fixture.html('<div ng-controller=main><input kendo-numeric-text-box="number" title="{{ myTitle | translator }}" ng-model="value" /></div>');
        }, function() {
                var numerictextbox = Mocha.fixture.find("[data-role=numerictextbox]").getKendoNumericTextBox();

                assert.equal(numerictextbox._text.attr("title"), "numeric test translated");
        });
    });
}());
