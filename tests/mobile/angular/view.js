(function () {
    ngTestModule("Mobile View", {
        teardown: function() {
            kendo.mobile.application.destroy();
        }
    });

    ngTest("view is instantiated from a kendo-mobile-view directive", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view id=foo></kendo-mobile-view></div>");
    },
    function() {
        var element = QUnit.fixture.find("#foo");
        equal(kendo.mobile.application.view().element[0], element[0]);
    });


    ngTest("view reads configuration options from attributes", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application><kendo-mobile-view k-title='\"foo\"'></kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application.view().options.title, "foo");
    });
}());

