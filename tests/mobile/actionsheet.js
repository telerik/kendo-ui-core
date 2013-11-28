var markup = '<div data-role="view"><a id="source" data-role="button" href="#actionSheet" data-rel="actionsheet" data-actionsheet-context="1"></a>' +
    '<ul id="actionSheet" data-role="actionsheet"><li><a id="foo" data-action="foo"></a></li></ul></div>',
    actionSheet,
    element,
    source,
    root;

module("ActionSheet", {
    setup: function() {
        root = $('#qunit-fixture');
        kendo.mobile.ui.Shim.fn.options.duration = 0;
        root.html(markup);
        new kendo.mobile.Application(root);
        element = root.find("[data-role=actionsheet]");
        source = root.find("#source");
        actionSheet = element.data("kendoMobileActionSheet");
    },
    teardown: function() {
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

test("Calls click event handler", 1, function() {
    window.foo = function() {
        ok(true);
    };

    actionSheet.open();
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});

asyncTest("Closes on click", 2, function() {
    window.foo = function() {
        ok(true);
    };

    actionSheet.open();
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
    isClosed();
});

test("Passes target in click handler", 1, function() {
    window.foo = function(e) {
        equal(e.target[0], source[0]);
    };

    actionSheet.open(source);
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});

test("Clicking a button raises command event", 2, function() {
    window.foo = function() { };

    actionSheet.openFor(root.find("#source"));

    actionSheet.bind("command", function(e) {
        equal(e.context, 1);
        equal(e.target[0], source[0]);
    });

    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});


test("Passes context in click handler", 1, function() {
    window.foo = function(e) {
        equal(e.context, 1);
    };

    actionSheet.openFor(root.find("#source"));
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});

asyncTest("Cancel button closes the sheet", 1, function() {
    var cancel = element.find("a:contains('Cancel')");

    actionSheet.open();
    cancel.trigger($.Event(kendo.support.mouseup));
    isClosed();
});

test("data-rel=actionsheet widget opens the action sheet", 1, function() {
    root.find('[data-role=button]').trigger($.Event(kendo.support.mouseup));
    isOpen();
});

test("data-rel=actionsheet widget passes the target and the context", 2, function() {
    window.foo = function(e) {
        equal(e.target[0], source[0]);
        equal(e.context, 1);
    };

    root.find('[data-role=button]').trigger($.Event(kendo.support.mouseup));
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});

asyncTest("raises close event when widget is closed by the cancel button", 1, function() {
    var cancel = element.find("a:contains('Cancel')");

    actionSheet.bind("close", function() {
        start();
        ok(true, "Should raise the close event");
    });

    actionSheet.open();
    cancel.trigger($.Event(kendo.support.mouseup));
});

asyncTest("raises close event when widget is closed on click", 1, function() {
    window.foo = function() { };

    actionSheet.bind("close", function() {
        start();
        ok(true, "Should raise the close event");
    });

    actionSheet.open();
    root.find("#foo").trigger($.Event(kendo.support.mouseup));
});

module("integration", {
    setup: function() {
        root = $('#qunit-fixture');
        window.foo = kendo.observable({});
        kendo.mobile.ui.Shim.fn.options.duration = 0;
    },
    teardown: function() {
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


