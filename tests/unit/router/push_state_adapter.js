import '@progress/kendo-ui/src/kendo.router.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let Adapter = kendo.History.PushStateAdapter,
    root = location.pathname + "/",
    adapter;

function push(url) {
    history.pushState({}, "", url);
}

describe("History push state adapter", function() {
    if (kendo.support.pushState) {
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
        asyncTest("change calls callback when path changed", function(done) {
            adapter.change(function() {
                done(() => assert.isOk(true));
            });

            push(root + "baz");
            history.back();
        });

        asyncTest("stop cancels callback", function(done) {
            let called = false;
            adapter.change(function() {
                called = true;
            });

            adapter.stop();

            push(root + "qux");

            $(window).one("popstate", function() {
                done(() => assert.isOk(!called));
            });

            history.back();
        });

        it("normalize strips the root", function() {
            assert.equal(adapter.normalize(root + "foo"), "foo");
        });

        it("replace updates location while keeping history length same", function() {
            let initial = adapter.length();
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
            let current = location.pathname;
            assert.isOk(!adapter.normalizeCurrent({ root: current + "/" }));
            assert.equal(location.pathname, current + "/");
        });

        asyncTest("normalizeCurrent will translate the hash to pathname", function(done) {
            let current = location.pathname;

            $(window).one("hashchange", function() {
                done(() => {
                    assert.isOk(!adapter.normalizeCurrent({ root: current }));
                    assert.equal(location.pathname, current + "foo");
                });
            });

            location.hash = "foo";
        });
    } else {
        it.skip("Browser does not support push state, skipping tests", () => { });
    }
});
