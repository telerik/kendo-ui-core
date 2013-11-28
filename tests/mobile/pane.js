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
            root.empty();
        }
    });

    test("navigates to given view", 1, function() {
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>');
        pane.navigate("#bar");
        visible("#bar");
    });

    test("parses url params upon navigation", 1, function() {
        window.checkParams = function(e) {
            equal(e.view.params["foo"], "baz");
            window.checkParams = null;
        }
        pane = buildPane('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar" data-show="checkParams">Bar</div>');
        pane.navigate("#bar?foo=baz");
    });

    test("implements initial view setting", 1, function() {
        root.html('<div><div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div></div>');
        var pane = new kendo.mobile.ui.Pane(root.children().first(), { initial: "#bar" });
        pane.navigateToInitial();
        visible("#bar");
    });

    test("navigates when a button is pressed", 1, function() {
        pane = buildPane('<div data-role="view" id="foo"><a data-role="button" id="barButton" href="#bar">Go to Bar</a></div><div data-role="view" id="bar">Bar</div>');
        root.find("#barButton").trigger("mouseup");
        visible("#bar");
    });

    test("goes back when a back button is pressed", 3, function() {
        pane = buildPane('<div data-role="view" id="foo"><a data-role="button" id="barButton" href="#bar">Go to' +
                ' Bar</a></div><div data-role="view" id="bar"><a data-role="backbutton" id="fooButton" ' +
                '> Back</a></div>');

        pane.navigate("#foo");
        root.find("#barButton").trigger("mouseup");
        visible("#bar");

        root.find("#fooButton").trigger("mouseup");
        visible("#foo");
        hidden("#bar");
    });
})();
