(function () {
    module("Sortable AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("dropdown recognizes selected primitive items with k-ng-model", 1, function() {
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

        QUnit.fixture.html(
            '<div ng-controller=mine>' +
                '<kendo-sortable k-options="options" k-rebind="options"></kendo-sortable>' +
            '</div>'
        );
    },

    function() {
        var element = QUnit.fixture.find("[kendo-sortable]");
        var scope = element.scope();

        scope.fooClick();
        scope.barClick();

        ok(element.getKendoSortable() instanceof kendo.ui.Sortable);
    });
})();
