
(function () {
    ngTestModule("Mobile Button", { });

    ngTest("is instantiated from a kendo-mobile-button directive", 1,
    function() {
        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view><a kendo-mobile-button id="foo">Foo</a></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        ok(QUnit.fixture.find("#foo").getKendoMobileButton());
    });

    ngTest("works with k-rebind", 2,
    function() {
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.icon = "home";
        })

        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view ng-controller="mine"><a kendo-mobile-button k-rebind="icon" k-icon="icon" id="foo">Foo</a></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        stop();
        equal(QUnit.fixture.find("#foo > span").attr("class"), "km-icon km-home");
        var scope = QUnit.fixture.find("#foo").scope();
        scope.$apply(function() {
            scope.icon = "settings";
        });

        setTimeout(function(){
            start();
            equal(QUnit.fixture.find("#foo > span").attr("class"), "km-icon km-settings");
        }, 100);
    });

    ngTest("works with k-delay", 2,
    function() {
        angular.module('kendo.tests').controller('mine', function($scope) {
            $scope.icon = "";
        })

        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view ng-controller="mine"><a kendo-mobile-button k-ng-delay="icon" k-icon="icon" id="foo">Foo</a></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        stop();

        ok(!QUnit.fixture.find("#foo").getKendoMobileButton());

        var scope = QUnit.fixture.find("#foo").scope();

        scope.$apply(function() {
            scope.icon = "settings";
        });

        setTimeout(function(){
            start();
            ok(QUnit.fixture.find("#foo").getKendoMobileButton());
        }, 100);
    });
}());

