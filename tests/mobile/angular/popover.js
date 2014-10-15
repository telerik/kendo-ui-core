(function () {
    ngTestModule("Mobile PopOver", {
        teardown: function() {
        }
    });

    ngTest("is initialized from kendo-data-pop-over directive", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<div kendo-mobile-pop-over id='popover'>" +
                    "<kendo-mobile-view id='popover-home' k-title=\"'PopOver'\">" +
                        "Popover home" +
                    "</kendo-mobile-view>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#popover");
        ok(element.getKendoMobilePopOver());
    });

    ngTest("is opened from button with red='popover'", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<a id='btn' kendo-mobile-button href='#popover' data-rel='popover'>PopOver</a>" +
                "<div kendo-mobile-pop-over id='popover'>" +
                    "<kendo-mobile-view id='popover-home' k-title=\"'PopOver'\">" +
                        "Popover home" +
                    "</kendo-mobile-view>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#popover"),
            button = QUnit.fixture.find("#btn");

        press(button);
        release(button);

        ok(element.is(":visible"));
    });

    ngTest("custom tag is replaced with a <div>", 1,
    function(){
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<a id='btn' kendo-mobile-button href='#popover' data-rel='popover'>PopOver</a>" +
                "<div kendo-mobile-pop-over id='popover'>" +
                    "<kendo-mobile-view id='popover-home' k-title=\"'PopOver'\">" +
                        "Popover home" +
                    "</kendo-mobile-view>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var popover = QUnit.fixture.find("#popover").getKendoMobilePopOver();
        equal(popover.element.get(0).tagName, "DIV");
    });

    ngTest("the inner View works with a ng-controller", 1,
    function() {
        angular.module('kendo.tests').controller('foo', function($scope) {
            $scope.foo = "Foo";
        })
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<span id='target'>target</span>" +
                "<div kendo-mobile-pop-over id='popover' ng-controller='foo'>" +
                    "<kendo-mobile-view id='popover-home' k-title=\"'PopOver'\">" +
                        "{{ foo }}" +
                    "</kendo-mobile-view>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var popover = QUnit.fixture.find("#popover").getKendoMobilePopOver();

        popover.openFor("#target");
        equal(popover.pane.view().scrollerContent.text(), "Foo");
    });

    ngTest("Executes the View controller each time PopOver is opened",
    2,
    function() {
        var i = 0;
        angular.module('kendo.tests').controller('foo', [ '$parse', '$scope', function($parse, $scope) {
            i ++;
            $scope.foo = i;
        }])
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<span id='target'>target</span>" +
                "<div kendo-mobile-pop-over id='popover' ng-controller='foo'>" +
                    "<kendo-mobile-view id='popover-home' k-title=\"'PopOver'\">" +
                        "{{ foo }}" +
                    "</kendo-mobile-view>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var popover = QUnit.fixture.find("#popover").getKendoMobilePopOver();

        popover.openFor("#target");
        equal(popover.pane.view().scrollerContent.text(), "1");

        popover.close();
        popover.openFor("#target");
        equal(popover.pane.view().scrollerContent.text(), "2");
    });

}());
