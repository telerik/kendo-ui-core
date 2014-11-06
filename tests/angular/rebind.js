(function() {
    module("ng-rebind and ng-delay", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("ng delay works", 1, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.foo = "";
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button k-ng-delay=foo></a></div>');
    },
    function() {
        var scope = QUnit.fixture.find("a").scope();

        scope.$apply(function(){
            scope.foo = "foo";
        });

        stop();

        setTimeout(function() {
            start();
            ok(QUnit.fixture.find("a").getKendoMobileButton());
        }, 100);
    });

    ngTest("ng delay will not delay if value is set", 1, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.foo = "foo";
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button k-ng-delay=foo></a></div>');
    },
    function() {
        ok(QUnit.fixture.find("a").getKendoMobileButton());
    });

    ngTest("ng rebind works with ng delay", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.foo = "";
            $scope.bar = "";
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button k-ng-delay=foo k-rebind=bar></a></div>');
    },
    function() {
        var scope = QUnit.fixture.find("a").scope();

        scope.$apply(function(){
            scope.foo = "foo";
        });

        stop();

        setTimeout(function() {
            ok(QUnit.fixture.find("a").getKendoMobileButton());

            scope.$apply(function(){
                scope.bar = "bar";
            });

            setTimeout(function() {
                start();
                ok(QUnit.fixture.find("a").getKendoMobileButton());
            }, 100);

        }, 100);
    });

})();
