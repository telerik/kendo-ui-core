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

    ngTest("ng delay works with an assigned kmodel", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.productsDataSource = new kendo.data.ObservableArray([
              { ProductID: 1, ProductName: "ProductName1" },
              { ProductID: 2, ProductName: "ProductName2" },
              { ProductID: 3, ProductName: "ProductName3" },
              { ProductID: 4, ProductName: "ProductName4" },
              { ProductID: 5, ProductName: "ProductName5" }
            ]);
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-options="productsOptions" k-ng-model="selectedProduct" k-ng-delay="productsOptions"></select></div>'); },
    function() {
        var scope = QUnit.fixture.find("select").scope();

        scope.$apply(function(){
            scope.productsOptions = {
                dataSource: scope.productsDataSource,
                dataTextField: "ProductName",
                dataValueField: "ProductID"
            };

            scope.selectedProduct = scope.productsDataSource[2];
        });

        stop();

        setTimeout(function() {
            start();
            ok(QUnit.fixture.find("select").getKendoDropDownList());
            equal(QUnit.fixture.find("select").getKendoDropDownList().value(), 3);
        }, 100);
    });

    ngTest("ng delay works with an assigned kmodel", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.productsDataSource = new kendo.data.ObservableArray([
              { ProductID: 1, ProductName: "ProductName1" },
              { ProductID: 2, ProductName: "ProductName2" },
              { ProductID: 3, ProductName: "ProductName3" },
              { ProductID: 4, ProductName: "ProductName4" },
              { ProductID: 5, ProductName: "ProductName5" }
            ]);
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-options="productsOptions" ng-model="selectedProduct" k-ng-delay="productsOptions"></select></div>'); },
    function() {
        var scope = QUnit.fixture.find("select").scope();

        scope.$apply(function(){
            scope.productsOptions = {
                dataSource: scope.productsDataSource,
                dataTextField: "ProductName",
                dataValueField: "ProductID"
            };

            scope.selectedProduct = 3;
        });

        stop();

        setTimeout(function() {
            start();
            ok(QUnit.fixture.find("select").getKendoDropDownList());
            equal(QUnit.fixture.find("select").getKendoDropDownList().value(), 3);
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
