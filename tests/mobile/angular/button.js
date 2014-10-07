
(function () {
    ngTestModule("Mobile Button", { });
    ngTest("is instantiated from a kendo-mobile-button directive", 1,
    function() {
        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view><a kendo-mobile-button id="foo">Foo</a></kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        ok(QUnit.fixture.find("#foo").getKendoMobileButton());
    });
}());

