import '@progress/kendo-ui/src/kendo.router.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';
import { stub } from '../../helpers/unit/stub.js';

let Adapter = kendo.History.HashAdapter,
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
     * The location.hash assignment is asynchronous. Found this the hard way. This is so in both FF and Chrome.
     * Binding to hashchange may trigger events for previous hash change assignments.
     * This is why each test is asyncronous. And each test uses unique hash value to actually trigger a change.
     * And, you must not clean the hash in the teardown, as this will trigger events in subsequent tests.
     *
     */
    asyncTest("reads the current URL from the hash", function(done) {
        onHash(function() {
            done(() => assert.equal(adapter.current(), "foo"));
        });
        location.hash = "foo";
    });

    asyncTest("does not decode the current URL from the hash (FF specific)", function(done) {
        onHash(function() {
            done(() => assert.equal(adapter.current(), "foo%23"));
        });
        location.hash = "foo%23";
    });

    asyncTest("navigating changes the location hash", function(done) {
        onHash(function() {
            done(() => assert.equal(location.hash, "#bar"));
        });
        adapter.navigate("bar");
    });

    asyncTest("navigating accepts hash string too", function(done) {
        onHash(function() {
            done(() => assert.equal(location.hash, "#bar1"));
        });
        adapter.navigate("#bar1");
    });

    asyncTest("change calls callback when hash changed", function(done) {
        adapter.change(function(e) {
            done(() => assert.isOk(true));
        });

        location.hash = "baz";
    });

    asyncTest("stop cancels callback", function(done) {
        let called = false;
        adapter.change(function(e) {
            called = true;
        });

        adapter.stop();

        onHash(function() {
            done(() => assert.isOk(!called));
        });

        location.hash = "qux";
    });

    it("normalize strips the #", function() {
        assert.equal(adapter.normalize("#foo"), "foo");
    });

    asyncTest("replace changes the location hash and keeps the history length", function(done) {
        let initial = adapter.length();
        onHash(function() {
            assert.equal(location.hash, "#bar");

            done(() => {
                if (history.length === 50) {
                    // eslint-disable-next-line no-console
                    console.log("max history length reached, skip length check");
                    assert.isOk(true);
                } else {
                    assert.equal(initial, adapter.length());
                }
            });
        });

        adapter.replace("bar");
    });

    asyncTest("replace accepts string with hash", function(done) {
        let initial = adapter.length();
        onHash(function() {
            done(() => assert.equal(location.hash, "#baz"));
        });

        adapter.replace("#baz");
    });

    // This test should be transferred to e2e. Vitest does not support pushState properly.
    // if (kendo.support.pushState) {
    //     it("normalizeCurrent will translate pushState to non-pushState, removing the root from the the path", function() {
    //         let root = location.pathname;

    //         stub(adapter, {
    //             replaceLocation: function(url) {
    //                 assert.equal(url, root + "#/bar");
    //             }
    //         });

    //         history.pushState({}, "", location.pathname + "/bar");
    //         assert.isOk(adapter.normalizeCurrent({ pushState: true, root: root }));
    //     });
    // }

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

    asyncTest("reads the current URL from the hash", function(done) {
        onHash(function() {
            done(() => assert.equal(adapter.current(), "foo"));
        });
        location.hash = "!foo";
    });

    asyncTest("navigating changes the location hash", function(done) {
        onHash(function() {
            done(() => assert.equal(location.hash, "#!bar"));
        });
        adapter.navigate("bar");
    });

    asyncTest("navigating accepts hash string too", function(done) {
        onHash(function() {
            done(() => assert.equal(location.hash, "#!bar1"));
        });
        adapter.navigate("#!bar1");
    });

    asyncTest("navigating to non-hashbang url returns null", function(done) {
        adapter.change(function(e) {
            done(() => assert.isOk(adapter.current() === null));
        });

        location.hash = "qux";
    });
});
