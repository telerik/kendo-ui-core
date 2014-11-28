(function () {
    ngTestModule("Mobile View", {
        teardown: function() {
            kendo.mobile.application.destroy();
        }
    });

    ngTest("is instantiated from a kendo-mobile-view directive", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view id=foo></kendo-mobile-view></div>");
    },
    function() {
        var element = QUnit.fixture.find("#foo");
        equal(kendo.mobile.application.view().element[0], element[0]);
    });

    ngTest("reads configuration options from attributes", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view k-title='\"foo\"'></kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application.view().options.title, "foo");
    });

    ngTest("works with a ng-controller", 1,
    function() {
        angular.module('kendo.tests').controller('foo', function($scope) {
            $scope.foo = "Foo";
        })
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view ng-controller=foo>{{foo}}</kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application.view().scrollerContent.text(), "Foo");
    });

    ngTest("Executes the controller each time it is displayed",
    2,
    function() {
        var i = 0;
        angular.module('kendo.tests').controller('foo', [ '$parse', '$scope', function($parse, $scope) {
            i ++;
            $scope.foo = i;
        }])
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view ng-controller=foo>{{foo}}</kendo-mobile-view><kendo-mobile-view id=bar></kendo-mobile-view></div>");
    },
    function() {
        var app = kendo.mobile.application;
        equal(app.view().scrollerContent.text(), "1");
        app.navigate("#bar");
        app.navigate("#/");
        equal(app.view().scrollerContent.text(), "2");
    });

    ngTest("SplitView executes the controller each time it is displayed",
    2,
    function() {
        var i = 0;
        angular.module('kendo.tests').controller('foo', [ '$parse', '$scope', function($parse, $scope) {
            i ++;
            $scope.foo = i;
        }])
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-split-view ng-controller=foo><kendo-mobile-pane><kendo-mobile-view>{{foo}}</kendo-mobile-view></kendo-mobile-pane></kendo-mobile-split-view><kendo-mobile-view id=bar></kendo-mobile-view></div>");
    },
    function() {
        var app = kendo.mobile.application;
        equal(app.view().panes[0].view().scrollerContent.text(), "1");
        app.navigate("#bar");
        app.navigate("#/");
        equal(app.view().panes[0].view().scrollerContent.text(), "2");
    });

    ngTest("understands the layout configuration",
    1,
    function() {
        angular.module('kendo.tests').controller('foo', [ '$parse', '$scope', function($parse, $scope) {
            $scope.foo = i;
        }])
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view k-layout='\"lay\"'></kendo-mobile-view>" +
        "<kendo-mobile-layout k-id='\"lay\"'><kendo-mobile-header>Foo</kendo-mobile-header></kendo-mobile-layout>" +
        "</div>");
    },
    function() {
        var app = kendo.mobile.application;
        equal(app.view().header.text(), "Foo");
    });

    ngTest("destroys scope on destroy", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view id=foo></kendo-mobile-view></div>");
    },
    function() {
        var view = kendo.mobile.application.view();
        view.element.scope().$on("$destroy", function() {
            ok(true);
        });

        view.destroy();
    });

    ngTest("reloads remote view if reload attr is set",
    1,
    function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<kendo-mobile-view reload=true>Page 2</kendo-mobile-view>',
            contentType: "text/html",
            responseTime: 0
        });

        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view></kendo-mobile-view></div>");
    },
    function() {
        var app = kendo.mobile.application;

        var view,
            callback3 = function(e) {
                start();
                notEqual(view, e.view);
            },
            callback2 = function(e) {
                app.pane.one("viewShow", callback3);

                setTimeout(function() {
                    app.navigate("page2.html");
                });
            },
            callback1 = function(e) {
                view = e.view;
                app.pane.one("viewShow", callback2);

                setTimeout(function() {
                    app.navigate("#/");
                });
            };

        stop();
        app.pane.one("viewShow", callback1);
        app.navigate("page2.html");
    });

}());

