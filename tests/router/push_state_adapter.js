(function() {
    if (!kendo.support.pushState) {
        console.log("Browser does not support push state, skipping tests");
        return;
    }

    var Adapter = kendo.History.PushStateAdapter,
        root = location.pathname + "/",
        adapter;

    function push(url) {
        history.pushState({}, "", url);
    }

    module("History push state adapter", {
        setup: function() {
            adapter = new Adapter(root);
        },

        teardown: function() {
            adapter.stop();
        }
    });

    test("reads the current URL from the path minus the root", 1, function() {
        push(root + "foo");
        equal(adapter.current(), "foo");
    });

    test("navigating changes the location path", 1, function() {
        adapter.navigate("bar");
        equal(location.pathname, root + "bar");
    });

    /**
     * Just like kendo methods/events, pushState call does not trigger the symmetric event.
     * So, we will push, then go back.
     */
    asyncTest("change calls callback when path changed", 1, function() {
        adapter.change(function(e) {
            start();
            ok(true);
        });

        push(root + "baz");
        history.back();
    });

    asyncTest("stop cancels callback", 1, function() {
        var called = false;
        adapter.change(function(e) {
            called = true;
        });

        adapter.stop();

        push(root + "qux");

        $(window).one("popstate", function() {
            start();
            ok(!called);
        });

        history.back();
    });

    test("normalize strips the root", 1, function() {
        equal(adapter.normalize(root + "foo"), "foo");
    });
})();

