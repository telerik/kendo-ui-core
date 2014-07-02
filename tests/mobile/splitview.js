(function() {
    var root,
        app;

    function setup(html) {
        root = $("<div />").appendTo($('#qunit-fixture'));
        root.append(html).wrapInner("<div />");
        location.hash = '';
        app = new kendo.mobile.Application(root.children().first());
    }

    function teardown() {
        kendo.history.stop();
        app.destroy();
    }

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        ok(root.find(selector).is(":visible"));
    }

    module('mobile SplitView as initial view', {
        setup: function() {
            setup('<div data-role="splitview" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>');
        },

        teardown: teardown
    });

    test("application treats splitview as initial view", 2, function(){
        visible("#foo");
        hidden("#bar");
    });

    test("splitview navigates to regular view", 2, function() {
        app.navigate("#bar");
        visible("#bar");
        hidden("#foo");
    });

    module('mobile SplitView as secondary view', {
        setup: function() {
            setup('<div data-role="view" id="bar">Bar</div><div data-role="splitview" id="foo">Foo</div>')
        },

        teardown: teardown
    });

    test("application hides splitview", 2, function(){
        visible("#bar");
        hidden("#foo");
    });

    test("splitview navigates to regular view", 2, function() {
        app.navigate("#foo");
        visible("#foo");
        hidden("#bar");
    });

    module('mobile SplitView panes', {
        setup: function() {
            root.html('<div data-role="splitview" id="foo"><div data-role="pane" id="foo-pane"><div data-role="view" /></div></div>');
            app = new kendo.mobile.Application(root);
        },

        teardown: teardown
    });

    test("splitview initializes nested panes", 1, function(){
        ok(root.find("#foo-pane").data("kendoMobilePane"));
    });

    module('navigation between panes', {
        setup: function() {
            setup('<div data-role="splitview">' +
                    '<div data-role="pane">' +
                        '<div data-role="view">' +
                            '<a data-role="button" href="#bar" data-target="foo">Open Bar in main pane</a>' +
                            '<a data-role="button" href="#baz" data-target="_top">Open Bar in main pane</a>' +
                        '</div>' +
                    '</div>' +
                    '<div data-role="pane" id="foo"><div data-role="view" /><div data-role="view" id="bar" /></div>' +
                    '</div>' +
                   '<div data-role="view" id="baz" />'
                        );
        },

        teardown: teardown
    });

    test("splitview navigates based on a target", 2, function(){
        hidden("#bar");
        tap(root.find("[href='#bar']"))
        visible("#bar");
    });

    test("splitview considers _top the application", 2, function(){
        hidden("#baz");
        tap(root.find("[href='#baz']"))
        visible("#baz");
    });
})();
