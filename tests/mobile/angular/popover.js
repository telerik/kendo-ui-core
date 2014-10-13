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

    ngTest("is opened from ", 1,
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

}());
