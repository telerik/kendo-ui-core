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

    ngTest("ng-rebind persists the template", 2, function() {
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.foo = new kendo.data.ObservableArray([1]);
            $scope.state = "a";
        });

        QUnit.fixture.html('<div ng-controller=mine><div kendo-list-view k-rebind="state" k-data-source="foo"><div k-template="" class="item">{{dataItem}}</div></div>');
    },
    function() {
        equal(QUnit.fixture.find(".item").text(), "1");
        var scope = QUnit.fixture.find(".item").parent().scope();

        scope.$apply(function() {
            scope.foo = new kendo.data.ObservableArray([2]);
            scope.state = "b";
        });

        stop();

        setTimeout(function() {
            start();
            equal(QUnit.fixture.find(".item").text(), "2");
        });
    });


    ngTest("automatic widget delay works if an option is undefined", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button data-icon="foo"></a></div>');
    },

    function() {
        var scope = QUnit.fixture.find("a").scope();

        ok(!QUnit.fixture.find("a").getKendoMobileButton());

        scope.$apply(function(){
            scope.foo = {};
        });

        stop();

        setTimeout(function() {
            start();
            ok(QUnit.fixture.find("a").getKendoMobileButton());
        }, 100);
    });

    ngTest("automatic widget delay works if an k-options is undefined", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope) {
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button k-options="foo"></a></div>');
    },

    function() {
        var scope = QUnit.fixture.find("a").scope();

        ok(!QUnit.fixture.find("a").getKendoMobileButton());

        scope.$apply(function(){
            scope.foo = {};
        });

        stop();

        setTimeout(function() {
            start();
            ok(QUnit.fixture.find("a").getKendoMobileButton());
        }, 100);
    });

    ngTest("automatic widget delay works with immediate promises", 1, function(){
        angular.module('kendo.tests').controller('mine', function($scope, $q) {
            $q(function(resolve, reject) { resolve({}); }).then(function(value) {
                $scope.foo = value;
            });
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button data-icon="foo"></a></div>');
    },

    function() {
        var scope = QUnit.fixture.find("a").scope();
        ok(QUnit.fixture.find("a").getKendoMobileButton());
    });

    var $$q;

    ngTest("automatic widget delay works with delayed promises", 2, function(){
        angular.module('kendo.tests').controller('mine', function($scope, $q) {
            $$q = $q;
        });

        QUnit.fixture.html('<div ng-controller=mine><a kendo-mobile-button data-icon="foo"></a></div>');
    },

    function() {
        var scope = QUnit.fixture.find("a").scope();
        ok(!QUnit.fixture.find("a").getKendoMobileButton());

        stop();
        setTimeout(function() {
            $$q(function(resolve, reject) { resolve({}); }).then(function(value) {
                scope.foo = value;
            });

            setTimeout(function() {
                start();
                ok(QUnit.fixture.find("a").getKendoMobileButton());
            });
        }, 100);
    });
})();
