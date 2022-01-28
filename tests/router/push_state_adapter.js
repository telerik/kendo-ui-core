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

    describe("History push state adapter", function() {
        beforeEach(function() {
            adapter = new Adapter(root);
        });

        afterEach(function() {
            adapter.stop();
        });

        it("reads the current URL from the path minus the root", function() {
            push(root + "foo");
            assert.equal(adapter.current(), "foo");
        });

        it("navigating changes the location path", function() {
            adapter.navigate("bar");
            assert.equal(location.pathname, root + "bar");
        });

        it("navigating accepts root prefixed url too", function() {
            adapter.navigate(root + "bar1");
            assert.equal(location.pathname, root + "bar1");
        });

        /**
         * Just like kendo methods/events, pushState call does not trigger the symmetric event.
         * So, we will push, then go back.
         */
        it("change calls callback when path changed", function(done) {
            adapter.change(function() {
                assert.isOk(true);
                done();
            });

            push(root + "baz");
            history.back();
        });

        it("stop cancels callback", function(done) {
            var called = false;
            adapter.change(function() {
                called = true;
            });

            adapter.stop();

            push(root + "qux");

            $(window).one("popstate", function() {
                assert.isOk(!called);
                done();
            });

            history.back();
        });

        it("normalize strips the root", function() {
            assert.equal(adapter.normalize(root + "foo"), "foo");
        });

        it("replace updates location while keeping history length same", function() {
            var initial = adapter.length();
            adapter.replace("foo");
            assert.equal(location.pathname, root + "foo");

            if (history.length === 50) {
                window.console.log("max history length reached, skipping length check");
                assert.isOk(true);
            } else {
                assert.equal(initial, adapter.length());
            }
        });

        it("normalizeCurrent will append slash if current path is missing", function() {
            var current = location.pathname;
            assert.isOk(!adapter.normalizeCurrent({ root: current + "/" }));
            assert.equal(location.pathname, current + "/");
        });

        it("normalizeCurrent will translate the hash to pathname", function(done) {
            var current = location.pathname;

            $(window).one("hashchange", function() {
                assert.isOk(!adapter.normalizeCurrent({ root: current }));
                assert.equal(location.pathname, current + "foo");
                done();
            });

            location.hash = "foo";
        });
    });
}());

