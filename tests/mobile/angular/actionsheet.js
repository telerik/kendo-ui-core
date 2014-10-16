
(function () {
    ngTestModule("Mobile ActionSheet", {
        setup: function() {
            kendo.mobile.ui.Shim.fn.options.duration = 0;
        }
    });


    ngTest("opens when button is tapped", 1,
    function() {
        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view>' +
            '<a kendo-mobile-button id="source" k-rel="\'actionsheet\'" href="#foo">Open</a>' +
            '<ul kendo-mobile-action-sheet id="foo"><li><a id="item"></a></li></ul>' +
        '</kendo-mobile-view></div>';
        QUnit.fixture.html(markup);
    },
    function() {
        tap(QUnit.fixture.find("#source"));

        equal(QUnit.fixture.find(".km-shim").css("display"), "block");
    });

    ngTest("action resolves to scope member", 1,
    function() {
        angular.module("kendo.tests").controller("actionsheet2", function($scope) {
            $scope.scopeAction = function(e) {
                ok(true);
            }
        });

        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view ng-controller="actionsheet2">' +
            '<a kendo-mobile-button id="source" k-rel="\'actionsheet\'" href="#foo">Open</a>' +
            '<ul kendo-mobile-action-sheet id="foo"><li><a id="item" k-action="scopeAction"></a></li></ul>' +
        '</kendo-mobile-view></div>';

        QUnit.fixture.html(markup);
    },
    function() {
        tap(QUnit.fixture.find("#source"));
        tap(QUnit.fixture.find("#item"));
    });

    ngTest("context reaches handler", 1,
    function() {
        angular.module("kendo.tests").controller("actionsheet2", function($scope) {
            $scope.scopeAction = function(e) {
                equal(e.context, 'Foo!');
            }
        });

        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view ng-controller="actionsheet2">' +
            '<a kendo-mobile-button id="source" k-rel="\'actionsheet\'" href="#foo" k-actionsheet-context="\'Foo!\'">Open</a>' +
            '<ul kendo-mobile-action-sheet id="foo"><li><a id="item" k-action="scopeAction"></a></li></ul>' +
        '</kendo-mobile-view></div>';

        QUnit.fixture.html(markup);
    },
    function() {
        tap(QUnit.fixture.find("#source"));
        tap(QUnit.fixture.find("#item"));
    });
}());

