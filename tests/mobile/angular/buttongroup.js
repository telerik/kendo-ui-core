
(function () {
    ngTestModule("Mobile ButtonGroup", { });
    ngTest("is instantiated from a kendo-mobile-button-group directive", 1,
    function() {
        var markup = '<div kendo-mobile-application>' +
        '<kendo-mobile-view>' +
        '<ul id="foo" kendo-mobile-button-group><li>Foo</li><li>Bar</li><li>Baz</li></ul>' +
        '</kendo-mobile-view>' +
        '</div>';

        QUnit.fixture.html(markup);
    },
    function() {
        ok(QUnit.fixture.find("#foo").getKendoMobileButtonGroup());
    });
}());
