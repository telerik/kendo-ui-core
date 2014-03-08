(function() {
    var Adapter = kendo.History.HashAdapter,
        adapter;

    module("History hash adapter", {
        setup: function() {
            adapter = new Adapter();
        },

        teardown: function() {
            adapter.stop();
        }
    });

    /**
     * The location.hash assignment is asynchronous. Found his the hard way. This is so in both FF and Chrome.
     * Binding to hashchange may trigger events for previous hash change assignments.
     * This is why each test is asyncronous. And each test uses unique hash value to actually trigger a change.
     * And, you must not clean the hash in the teardown, as this will trigger events in subsequent tests.
     *
     */
    asyncTest("reads the current URL from the hash", 1, function() {
        $(window).one("hashchange", function() {
            start();
            equal(adapter.current(), "foo");
        });
        location.hash = "foo";
    });

    asyncTest("does not decode the current URL from the hash (FF specific)", 1, function() {
        $(window).one("hashchange", function() {
            start();
            equal(adapter.current(), "foo%23");
        });
        location.hash = "foo%23";
    });

    asyncTest("navigating changes the location hash", 1, function() {
        $(window).one("hashchange", function() {
            start();
            equal(location.hash, "#bar");
        });
        adapter.navigate("bar");
    });

    asyncTest("change calls callback when hash changed", 1, function() {
        adapter.change(function(e) {
            start();
            ok(true);
        });

        location.hash = "baz";
    });

    asyncTest("stop cancels callback", 1, function() {
        var called = false;
        adapter.change(function(e) {
            called = true;
        });

        adapter.stop();

        $(window).one("hashchange", function() {
            start();
            ok(!called);
        });

        location.hash = "qux";
    });

    test("normalize returns the same URL", 1, function() {
        equal(adapter.normalize("foo"), "foo");
    });
})();

