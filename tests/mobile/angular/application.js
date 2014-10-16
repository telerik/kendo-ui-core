(function () {
    ngTestModule("Mobile Application", {
        teardown: function() {
            kendo.mobile.application.destroy();
        }
    });

    ngTest("app is instantiated from a kendo-mobile-application directive", 2,

    function() {
        QUnit.fixture.html("<div kendo-mobile-application id=foo><kendo-mobile-view></kendo-mobile-view></div>");
    },

    function() {
        var element = QUnit.fixture.find("#foo");
        ok(kendo.mobile.application);
        equal(kendo.mobile.application.element[0], element[0]);
    });

    ngTest("app accepts attribute options", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application k-skin='\"flat\"' id=foo><kendo-mobile-view></kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application.options.skin, 'flat');
    });

    ngTest("assignment puts reference in scope", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application='app' k-skin='\"flat\"' id=foo><kendo-mobile-view></kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application, ngScope().app);
    });
}());
