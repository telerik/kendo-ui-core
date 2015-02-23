(function() {
    var pane,
        root;

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        ok(root.find(selector).is(":visible"));
    }

    function view(selector) {
        ok(root.find(selector).data("kendoView"));
    }

    function buildPane(html) {
        root.html('<div>' + html + '</div>');
        return new kendo.mobile.ui.Pane(root.children().first());
    }


    module("mobile pane", {
        setup: function() {
            root = $("#qunit-fixture");
        },
        teardown: function() {
            pane.destroy();
            root.empty();
        }
    });

    test("navigates to given view", 1, function() {
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>');
        pane.navigate("#bar");
        visible("#bar");
    });

    test("parses url params upon navigation", 2, function() {
        window.checkParams = function(e) {
            equal(e.view.params["foo"], "baz");
            window.checkParams = null;
        }
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar" data-show="checkParams">Bar</div>');
        pane.navigate("#bar?foo=baz");
        pane.navigate("#foo");
        pane.navigate("#:back");
    });

    test("parses url params when navigating back", 1, function() {
        window.checkParams = function(e) {
            equal(e.view.params["foo"], "baz");
            window.checkParams = null;
        }
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar" data-show="checkParams">Bar</div>');
        pane.navigate("#bar?foo=baz");
    });

    test("implements initial view setting", 1, function() {
        root.html('<div><div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div></div>');
        pane.destroy();
        pane = new kendo.mobile.ui.Pane(root.children().first(), { initial: "#bar" });
        pane.navigateToInitial();
        visible("#bar");
    });

    test("navigates when a button is tapped", 1, function() {
        pane = buildPane('<div data-role="view" id="foo"><a data-role="button" id="barButton" href="#bar">Go to Bar</a></div><div data-role="view" id="bar">Bar</div>');
        tap(root.find("#barButton"));
        visible("#bar");
    });

    test("navigates when a button is pressed (and config is set)", 1, function() {
        pane = buildPane('<div data-role="view" id="foo"><a data-role="button" data-click-on="down" id="barButton" href="#bar">Go to Bar</a></div><div data-role="view" id="bar">Bar</div>');
        pane.navigate("") // instantiate the button widget
        press(root.find("#barButton"), 0, 0);
        visible("#bar");
    });

    test("goes back when a back button is pressed", 3, function() {
        pane = buildPane('<div data-role="view" id="foo"><a data-role="button" id="barButton" href="#bar">Go to' +
                ' Bar</a></div><div data-role="view" id="bar"><a data-role="backbutton" id="fooButton" ' +
                '> Back</a></div>');

        pane.navigate("#foo");
        tap(root.find("#barButton"));
        visible("#bar");

        tap(root.find("#fooButton"));
        visible("#foo");
        hidden("#bar");
    });

    test("replace replaces current view in the history stack", 1, function() {
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div><div data-role="view" id="baz">Baz</div>');
        pane.navigate("#foo");
        pane.navigate("#bar");
        pane.replace("#baz");
        pane.navigate("#:back");
        visible("#foo");
    });
})();
