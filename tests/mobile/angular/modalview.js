(function () {
    ngTestModule("Mobile Modal View", {
        teardown: function() {
        }
    });

    ngTest("is instantiated from a kendo-mobile-modal-view directive", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>Home</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal'></kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#modal");
        ok(element.getKendoMobileModalView());
    });

    ngTest("accepts attribute options", 2,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>Home</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal' k-width='300' k-height='800'></kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var modalview = QUnit.fixture.find("#modal").getKendoMobileModalView();
        ok(modalview.options.width, 300);
        ok(modalview.options.height, 800);
    });

    ngTest("can be opened from a button with k-rel='modalview'", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<a id='myButton' kendo-mobile-button href='#modal' k-rel=\"'modalview'\">Open Modal</a>" +
            "</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal' k-width='300' k-height='800'></kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var button = QUnit.fixture.find("#myButton");
        var modalview = QUnit.fixture.find("#modal").getKendoMobileModalView();

        press(button);
        release(button);

        ok(modalview.element.is(":visible"));
    });

    ngTest("works with a ng-controller", 1,
    function() {
        angular.module('kendo.tests').controller('foo', function($scope) {
            $scope.foo = "Foo";
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
            "</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal' ng-controller='foo'>{{foo}}</kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        equal($("#modal").getKendoMobileModalView().scrollerContent.text(), "Foo");
    });

    ngTest("events can be attached via k-on- attribute", 1,
    function() {
        angular.module('kendo.tests').controller('foo', function($scope) {
            $scope.foo = "Foo";
            $scope.onOpen = function() {
                ok(true, "Open event handler is executed");
            }
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
            "</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal' ng-controller='foo' k-on-open='onOpen(kendoEvent)'></kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var modalview = QUnit.fixture.find("#modal").getKendoMobileModalView();
        modalview.trigger("open");
    });

    ngTest("controller is invoked every time modal view is opened", 2,
    function() {
        angular.module('kendo.tests').controller('foo', function($scope) {
            ok(true, "Controller is invoked");
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<a id='myButton' kendo-mobile-button href='#modal' k-rel=\"'modalview'\">Open Modal</a>" +
            "</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal' ng-controller='foo'></kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var button = QUnit.fixture.find("#myButton");
        var modalview = QUnit.fixture.find("#modal").getKendoMobileModalView();

        press(button);
        release(button);

        modalview.close();

        press(button);
        release(button);
    });

    ngTest("child widgets are initialized", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
            "</kendo-mobile-view>" + 
            "<kendo-mobile-modal-view id='modal'>" +
                "<a id='myButton' kendo-mobile-button>Button</a>" +
            "</kendo-mobile-modal-view>" +
        "</div>");
    },
    function() {
        var modalview = QUnit.fixture.find("#modal").getKendoMobileModalView();
        modalview.open();

        var button = QUnit.fixture.find("#myButton").getKendoMobileButton();
        ok(button);
    });

}());

