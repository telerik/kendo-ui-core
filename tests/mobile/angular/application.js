(function () {

    ngTestModule("Mobile Application");

    ngTest("app is instantiated from a kendo-mobile-application directive", 2,

    function() {
        QUnit.fixture.html("<div kendo-mobile-application id=foo><kendo-mobile-view></kendo-mobile-view></div>");
    },

    function() {
        var element = QUnit.fixture.find("#foo");
        ok(kendo.mobile.application);
        equal(kendo.mobile.application.element[0], element[0]);
    });
}());
