(function() {
    describe("Sortable AngularJS integration", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        ngTest("dropdown recognizes selected primitive items with k-ng-model", function() {
            angular.module("kendo.tests").controller("mine", function($scope, $timeout) {
                $scope.options = {
                    filter: ".item"
                };

                $scope.fooClick = function() {
                    $scope.options.filter = ".foo";
                };

                $scope.barClick = function() {
                    $scope.options.filter = ".bar";
                };
            });

            Mocha.fixture.html(
                '<div ng-controller=mine>' +
                '<kendo-sortable k-options="options" k-rebind="options"></kendo-sortable>' +
                '</div>'
            );
        },

            function() {
                var element = Mocha.fixture.find("[kendo-sortable]");
                var scope = element.scope();

                scope.fooClick();
                scope.barClick();

                assert.isOk(element.getKendoSortable() instanceof kendo.ui.Sortable);
            });
    });
}());
