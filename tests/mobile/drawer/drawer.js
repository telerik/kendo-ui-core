module('mobile drawer', {
    setup: function() {
    }
});

test('is instantiated as a direct child of the application', 1, function() {
    var markup = $('<div><div data-role="view">Foo</div><div data-role="drawer" id="drawer">I am a drawer</div></div>');
    var app = new kendo.mobile.Application(markup);
    ok(markup.find('#drawer').data('kendoMobileDrawer'));
});
