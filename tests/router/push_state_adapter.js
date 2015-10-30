(function() {
    if (!kendo.support.pushState) {
        window.console.log("Browser does not support push state, skipping tests");
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

    test("navigating accepts root prefixed url too", 1, function() {
        adapter.navigate(root + "bar1");
        equal(location.pathname, root + "bar1");
    });

    /**
     * Just like kendo methods/events, pushState call does not trigger the symmetric event.
     * So, we will push, then go back.
     */
    asyncTest("change calls callback when path changed", 1, function() {
        adapter.change(function() {
            start();
            ok(true);
        });

        push(root + "baz");
        history.back();
    });

    asyncTest("stop cancels callback", 1, function() {
        var called = false;
        adapter.change(function() {
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

    test("replace updates location while keeping history length same", 2, function() {
        var initial = adapter.length();
        adapter.replace("foo");
        equal(location.pathname, root + "foo");

        if (history.length === 50) {
            window.console.log("max history length reached, skipping length check");
            ok(true);
        } else {
            equal(initial, adapter.length());
        }
    });

    test("normalizeCurrent will append slash if current path is missing", 2, function() {
        var current = location.pathname;
        ok(!adapter.normalizeCurrent({ root: current + "/" }));
        equal(location.pathname, current + "/");
    });

    asyncTest("normalizeCurrent will translate the hash to pathname", 2, function() {
        var current = location.pathname;

        $(window).one("hashchange", function() {
            start();
            ok(!adapter.normalizeCurrent({ root: current }));
            equal(location.pathname, current + "foo");
        });

        location.hash = "foo";
    });
})();

