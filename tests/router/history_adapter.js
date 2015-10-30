(function () {
    var Adapter = kendo.History.HistoryAdapter;

    module("History adapter");

    function onHash(callback) {
        $(window).one("hashchange", callback);
    }

    asyncTest("back goes to previous location", 1, function() {
        var adapter = new Adapter(),
            initial = location.hash;
        onHash(function() {
            adapter.back();
            onHash(function() {
                start();
                equal(location.hash, initial);
            });
        });
        location.hash = "a";
    });

    asyncTest("forward goes to next location", 1, function() {
        var adapter = new Adapter();

        onHash(function() {
            history.back();
            onHash(function() {
                adapter.forward();
                onHash(function() {
                    start();
                    equal(location.hash, "#b");
                });
            });
        });

        location.hash = "b";
    });

    asyncTest("length tracks the history length", 1, function() {
        var length = history.length;

        if (length === 50) {
            start();
            window.console.log("skipping history length tests, max length reached");
            ok(true);
            return;
        }

        var adapter = new Adapter(),
            initial = adapter.length();

        onHash(function() {
            start();
            equal(adapter.length(), initial + 1);
        });

        location.hash = "c";
    });
})();
