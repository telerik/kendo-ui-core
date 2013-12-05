(function() {
    var app;
    module('mobile drawer', {
        setup: function() {
        },

        teardown: function() {
            app.destroy();
        }
    });

    test('is instantiated as a direct child of the application', 1, function() {
        var markup = $('<div><div data-role="view">Foo</div><div data-role="drawer" id="drawer">I am a drawer</div></div>');
        app = new kendo.mobile.Application(markup);
        ok(markup.find('#drawer').data('kendoMobileDrawer'));
    });


    test('triggers init', 1, function() {
        window.drawerInit = function() {
            ok(true);
            window.drawerInit = null;
        }
        var markup = $('<div><div data-role="view">Foo</div><div data-role="drawer" id="drawer" data-init="drawerInit">I am a drawer</div></div>');
        app = new kendo.mobile.Application(markup);
    });
})();
