(function() {
    var pane,
        root,
        loader;

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        ok(root.find(selector).is(":visible"));
    }

    function view(selector) {
        ok(root.find(selector).data("kendoView"));
    }

    ////////////////////////////////////////////////////////////////////
    module("mobile loader initialization", {
        setup: function() {
            root = QUnit.fixture;
            root.html('<a href="#" id="foo">Foo</a>').show();
            loader = new kendo.mobile.ui.Loader(root, {timeout: 0});
        },
        teardown: function() {
            kendo.destroy(root);
        }
    });

    test("hides loader initially", 1, function() {
        hidden(loader.element);
    });

    test("changeMessage method changes the loading message", 1, function() {
        loader.changeMessage("Changed!");
        ok(loader.element.find("h1").text() === "Changed!");
    });

    asyncTest("shows loader element", 1, function() {
        loader.show();
        setTimeout(function() {
            start();
            visible(loader.element);
        });
    });

    asyncTest("hides loader element after shown", 1, function() {
        loader.show();
        setTimeout(function() {
            start();
            loader.hide();
            hidden(loader.element);
        });
    });

    // https://developer.mozilla.org/en/DOM/document.createEvent for the insanity below
    function dispatchClick(element) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        element[0].dispatchEvent(evt);
    }

    test("prevents events during transitions", 2, function() {
        loader.transition();
        var foo = root.find("#foo");

        foo.on("mouseup", function(e) { ok(e.isDefaultPrevented()); });

        dispatchClick(foo);
        loader.transitionDone();
        foo.off("mouseup").on("mouseup", function() { ok(true); })
        dispatchClick(foo);
    });
})();
