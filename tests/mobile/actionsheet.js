(function() {
    var markup = '<div data-role="view"><a id="source" data-role="button" href="#actionSheet" data-rel="actionsheet" data-actionsheet-context="1"></a>' +
        '<ul id="actionSheet" data-role="actionsheet"><li><a id="foo" data-action="foo"></a></li></ul></div>',
        actionSheet,
        element,
        source,
        root;

    module("ActionSheet", {
        setup: function() {
            root = $("<div></div>").appendTo($('#qunit-fixture'));
            kendo.mobile.ui.Shim.fn.options.duration = 0;
            root.html(markup);
            new kendo.mobile.Application(root);
            element = root.find("[data-role=actionsheet]");
            source = root.find("#source");
            actionSheet = element.data("kendoMobileActionSheet");
        },
        teardown: function() {
            kendo.mobile.application.destroy();
            kendo.destroy(root);
            root.empty();
        }
    });

    function isOpen() {
        equal(root.find(".km-shim").css("display"), "block");
    }

    function isClosed() {
        setTimeout(function() {
            start();
            equal(root.find(".km-shim").css("display"), "none");
        }, 50);
    }

    test("Is visible when open", function() {
        actionSheet.open();
        isOpen();
    });

    asyncTest("Is hidden when closed", 1, function() {
        actionSheet.open();
        actionSheet.close();
        isClosed();
    });

    asyncTest("Triggers close when shim is tapped", 1, function() {
        actionSheet.open();
        actionSheet.bind("close", function() {
            start();
            ok(true);
        })
        tap(root.find(".km-shim"));
    });

    test("Calls click event handler", 1, function() {
        window.foo = function() {
            ok(true);
        };

        actionSheet.open();
        tap(root.find("#foo"));
    });

    asyncTest("Closes on click", 2, function() {
        window.foo = function() {
            ok(true);
        };

        actionSheet.open();
        tap(root.find("#foo"));
        isClosed();
    });

    test("Passes target in click handler", 1, function() {
        window.foo = function(e) {
            equal(e.target[0], source[0]);
        };

        actionSheet.open(source);
        tap(root.find("#foo"));
    });

    test("Clicking a button raises command event", 2, function() {
        window.foo = function() { };

        actionSheet.openFor(root.find("#source"));

        actionSheet.bind("command", function(e) {
            equal(e.context, 1);
            equal(e.target[0], source[0]);
        });

        tap(root.find("#foo"));
    });


    test("Passes context in click handler", 1, function() {
        window.foo = function(e) {
            equal(e.context, 1);
        };

        actionSheet.openFor(root.find("#source"));
        tap(root.find("#foo"));
    });

    asyncTest("Cancel button closes the sheet", 1, function() {
        var cancel = element.find("a:contains('Cancel')");

        actionSheet.open();
        tap(cancel);
        isClosed();
    });

    test("data-rel=actionsheet widget opens the action sheet", 1, function() {
        tap(root.find('[data-role=button]'));
        isOpen();
    });

    test("data-rel=actionsheet widget passes the target and the context", 2, function() {
        window.foo = function(e) {
            equal(e.target[0], source[0]);
            equal(e.context, 1);
        };

        tap(root.find('[data-role=button]'));
        tap(root.find("#foo"));
    });

    asyncTest("raises close event when widget is closed by the cancel button", 1, function() {
        var cancel = element.find("a:contains('Cancel')");

        actionSheet.bind("close", function() {
            start();
            ok(true, "Should raise the close event");
        });

        actionSheet.open();
        tap(cancel);
    });

    asyncTest("raises close event when widget is closed on click", 1, function() {
        window.foo = function() { };

        actionSheet.bind("close", function() {
            start();
            ok(true, "Should raise the close event");
        });

        actionSheet.open();
        tap(root.find("#foo"));
    });

    module("integration", {
        setup: function() {
            root = $("<div></div>").appendTo($('#qunit-fixture'));
            window.foo = kendo.observable({});
            kendo.mobile.ui.Shim.fn.options.duration = 0;
        },
        teardown: function() {
            kendo.mobile.application.destroy();
            kendo.destroy(root);
            window.foo = null;
        }
    });

    test("#1240 - 2 actionsheets work in a view with model", 2, function() {
        var markup = '<div data-role="view" data-model="foo"><ul id="foo" data-role="actionsheet"></ul><ul id="bar" data-role="actionsheet"></ul></div>';

        root.html(markup);
        new kendo.mobile.Application(root);

        ok(root.find("#foo").data("kendoMobileActionSheet"));
        ok(root.find("#bar").data("kendoMobileActionSheet"));
    });

    test("#3156 - actionsheet is destroyed when the mobile view is destroyed", 1, function() {
        var markup = '<div data-role="view"><ul id="foo" data-role="actionsheet"></ul></div>';

        root.html(markup);
        var app = new kendo.mobile.Application(root);

        app.view().destroy();
        equal(root.find("#foo").length, 0);
    });
})();
