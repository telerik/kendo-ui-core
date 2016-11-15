(function () {
    ngTestModule("Mobile Application", {
        //setup: () => { jasmine.clock().install(); },
        teardown: function() {
            kendo.mobile.application.destroy();
            //jasmine.clock().uninstall();
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

/* The test is commented as the MobileApplication needs to be executed in document "ready" handler, however
 * as from jQuery 3 the handler is always executed asyncronious. Related code:
 * https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.angular.js#L193

    ngTest("assignment puts reference in scope", 1,
    function() {
        console.log("Test bootstrap");
        QUnit.fixture.html("<div kendo-mobile-application='app' k-skin='\"flat\"' id=foo><kendo-mobile-view></kendo-mobile-view></div>");
    },
    function() {
        equal(kendo.mobile.application, ngScope().app);
    });
*/
}());
