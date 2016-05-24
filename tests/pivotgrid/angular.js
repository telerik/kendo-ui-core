(function () {
    var PivotDataSource = kendo.data.PivotDataSource;

    module("Pivot AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("pivotgrid initializes with k-data-source attr", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.dataSource = { }; //options
        });

        QUnit.fixture.html('<div ng-controller=mine><div kendo-pivot-grid k-data-source=dataSource></div></div>');
    },

    function() {
        ok(QUnit.fixture.find("div.k-pivot").getKendoPivotGrid());
        ok(QUnit.fixture.find("div.k-pivot").getKendoPivotGrid().dataSource instanceof PivotDataSource);
    });

    ngTest("pivotconfigurator initializes with k-data-source attr", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.dataSource = { }; //options
        });

        QUnit.fixture.html('<div ng-controller=mine><div kendo-pivot-configurator k-data-source=dataSource></div></div>');
    },

    function() {
        ok(QUnit.fixture.find("[data-role=pivotconfigurator]").getKendoPivotConfigurator());
        ok(QUnit.fixture.find("[data-role=pivotconfigurator]").getKendoPivotConfigurator().dataSource instanceof PivotDataSource);
    });

})();
