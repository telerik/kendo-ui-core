(function() {
    var Adapter = kendo.History.HashAdapter,
        adapter;

    function onHash(callback) {
        $(window).one("hashchange", callback);
    }

    describe("History hash adapter", function() {
        beforeEach(function() {
            adapter = new Adapter();
        });

        afterEach(function() {
            adapter.stop();
        });

        /**
         * The location.hash assignment is asynchronous. Found his the hard way. This is so in both FF and Chrome.
         * Binding to hashchange may trigger events for previous hash change assignments.
         * This is why each test is asyncronous. And each test uses unique hash value to actually trigger a change.
         * And, you must not clean the hash in the teardown, as this will trigger events in subsequent tests.
         *
         */
        it("reads the current URL from the hash", function(done) {
            onHash(function() {
                assert.equal(adapter.current(), "foo");
                done();
            });
            location.hash = "foo";
        });

        it("does not decode the current URL from the hash (FF specific)", function(done) {
            onHash(function() {
                assert.equal(adapter.current(), "foo%23");
                done();
            });
            location.hash = "foo%23";
        });

        it("navigating changes the location hash", function(done) {
            onHash(function() {
                assert.equal(location.hash, "#bar");
                done();
            });
            adapter.navigate("bar");
        });

        it("navigating accepts hash string too", function(done) {
            onHash(function() {
                assert.equal(location.hash, "#bar1");
                done();
            });
            adapter.navigate("#bar1");
        });

        it("change calls callback when hash changed", function(done) {
            adapter.change(function(e) {
                assert.isOk(true);
                done();
            });

            location.hash = "baz";
        });

        it("stop cancels callback", function(done) {
            var called = false;
            adapter.change(function(e) {
                called = true;
            });

            adapter.stop();

            onHash(function() {
                assert.isOk(!called);
                done();
            });

            location.hash = "qux";
        });

        it("normalize strips the #", function() {
            assert.equal(adapter.normalize("#foo"), "foo");
        });

        it("replace changes the location hash and keeps the history length", function(done) {
            var initial = adapter.length();
            onHash(function() {
                assert.equal(location.hash, "#bar");

                if (history.length === 50) {
                    console.log("max history length reached, skip length check");
                    assert.isOk(true);
                } else {
                    assert.equal(initial, adapter.length());
                }
                done();
            });

            adapter.replace("bar");
        });

        it("replace accepts string with hash", function(done) {
            var initial = adapter.length();
            onHash(function() {
                assert.equal(location.hash, "#baz");
                done();
            });

            adapter.replace("#baz");
        });

        if (kendo.support.pushState) {
            it("normalizeCurrent will translate pushState to non-pushState, removing the root from the the path", function() {
                var root = location.pathname;

                stub(adapter, {
                    replaceLocation: function(url) {
                        assert.equal(url, root + "#/bar");
                    }
                });

                history.pushState({}, "", location.pathname + "/bar");
                assert.isOk(adapter.normalizeCurrent({ pushState: true, root: root }));
            });
        }

        it("normalizeCurrent will not touch anything if started from the root", function() {
            assert.isOk(!adapter.normalizeCurrent({ pushState: true, root: location.pathname }));
        });
    });

    describe("History hash adapter (hashbang mode)", function() {
        beforeEach(function() {
            adapter = new Adapter(true);
        });

        afterEach(function() {
            adapter.stop();
        });

        it("reads the current URL from the hash", function(done) {
            onHash(function() {
                assert.equal(adapter.current(), "foo");
                done();
            });
            location.hash = "!foo";
        });

        it("navigating changes the location hash", function(done) {
            onHash(function() {
                assert.equal(location.hash, "#!bar");
                done();
            });
            adapter.navigate("bar");
        });

        it("navigating accepts hash string too", function(done) {
            onHash(function() {
                assert.equal(location.hash, "#!bar1");
                done();
            });
            adapter.navigate("#!bar1");
        });

        it("navigating to non-hashbang url returns null", function(done) {
            adapter.change(function(e) {
                assert.isOk(adapter.current() === null);
                done();
            });

            location.hash = "qux";
        });
    });
}());
