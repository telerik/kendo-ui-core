
(function () {
    ngTestModule("Mobile Navbar", {
        teardown: function() {
        }
    });

    ngTest("is instantiated from a kendo-mobile-nav-bar directive", 1,
    function() {
        QUnit.fixture.html("<kendo-mobile-nav-bar id=foo></kendo-mobile-nav-bar>");
    },
    function() {
        var element = QUnit.fixture.find("#foo");
        ok(element.getKendoMobileNavBar());
    });

    ngTest("reads title from view when in layout", 1,
    function() {
        var markup = '<div kendo-mobile-application k-layout="\'default\'">' +
        '<kendo-mobile-layout k-id="\'default\'"><kendo-mobile-header><kendo-mobile-nav-bar><kendo-view-title></kendo-view-title></kendo-mobile-nav-bar></kendo-mobile-header></kendo-mobile-layout>' +
        '<kendo-mobile-view k-title="\'Foo\'"></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        var title = QUnit.fixture.find("[data-role=view-title]");
        equal(title.text(), "Foo");
    });

    ngTest("reads title from view", 1,
    function() {
        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view k-title="\'Foo\'"><kendo-mobile-header><kendo-mobile-nav-bar><kendo-view-title></kendo-view-title></kendo-mobile-nav-bar></kendo-mobile-header></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        var title = QUnit.fixture.find("[data-role=view-title]");
        equal(title.text(), "Foo");
    });
}());

