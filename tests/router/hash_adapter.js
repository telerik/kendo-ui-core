(function() {
    var Adapter = kendo.History.HashAdapter,
        adapter;

    function onHash(callback) {
        $(window).one("hashchange", callback);
    }

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
        onHash(function() {
            start();
            equal(adapter.current(), "foo");
        });
        location.hash = "foo";
    });

    asyncTest("does not decode the current URL from the hash (FF specific)", 1, function() {
        onHash(function() {
            start();
            equal(adapter.current(), "foo%23");
        });
        location.hash = "foo%23";
    });

    asyncTest("navigating changes the location hash", 1, function() {
        onHash(function() {
            start();
            equal(location.hash, "#bar");
        });
        adapter.navigate("bar");
    });

    asyncTest("navigating accepts hash string too", 1, function() {
        onHash(function() {
            start();
            equal(location.hash, "#bar1");
        });
        adapter.navigate("#bar1");
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

        onHash(function() {
            start();
            ok(!called);
        });

        location.hash = "qux";
    });

    test("normalize strips the #", 1, function() {
        equal(adapter.normalize("#foo"), "foo");
    });

    asyncTest("replace changes the location hash and keeps the history length", 2, function() {
        var initial = adapter.length();
        onHash(function() {
            start();
            equal(location.hash, "#bar");

            if (history.length === 50) {
                console.log("max history length reached, skip length check");
                ok(true);
            } else {
                equal(initial, adapter.length());
            }
        });

        adapter.replace("bar");
    });

    asyncTest("replace accepts string with hash", 1, function() {
        var initial = adapter.length();
        onHash(function() {
            start();
            equal(location.hash, "#baz");
        });

        adapter.replace("#baz");
    });

    if (kendo.support.pushState) {
        test("normalizeCurrent will translate pushState to non-pushState, removing the root from the the path", 2, function() {
            var root = location.pathname;

            stub(adapter, { replaceLocation: function(url) {
                equal(url, root + "#/bar");
            }});

            history.pushState({}, "", location.pathname + "/bar");
            ok(adapter.normalizeCurrent({ pushState: true, root: root }));
        });
    }

    test("normalizeCurrent will not touch anything if started from the root", 1, function() {
        ok(!adapter.normalizeCurrent({ pushState: true, root: location.pathname }));
    });

    module("History hash adapter (hashbang mode)", {
        setup: function() {
            adapter = new Adapter(true);
        },

        teardown: function() {
            adapter.stop();
        }
    });

    asyncTest("reads the current URL from the hash", 1, function() {
        onHash(function() {
            start();
            equal(adapter.current(), "foo");
        });
        location.hash = "!foo";
    });

    asyncTest("navigating changes the location hash", 1, function() {
        onHash(function() {
            start();
            equal(location.hash, "#!bar");
        });
        adapter.navigate("bar");
    });

    asyncTest("navigating accepts hash string too", 1, function() {
        onHash(function() {
            start();
            equal(location.hash, "#!bar1");
        });
        adapter.navigate("#!bar1");
    });

    asyncTest("navigating to non-hashbang url returns null", 1, function() {
        adapter.change(function(e) {
            start();
            ok(adapter.current() === null);
        });

        location.hash = "qux";
    });
})();
