(function() {
    module("ng-rebind and ng-delay", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
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
    }
    )
})();
