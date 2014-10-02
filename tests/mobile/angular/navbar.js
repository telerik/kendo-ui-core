
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
}());

