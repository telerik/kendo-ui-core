import '@progress/kendo-ui/src/kendo.router.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let Adapter = kendo.History.HistoryAdapter;

describe("History adapter", function() {

    function onHash(callback) {
        $(window).one("hashchange", callback);
    }

    asyncTest("back goes to previous location", function(done) {
        let adapter = new Adapter(),
            initial = location.hash;
        onHash(function() {
            adapter.back();
            onHash(function() {
                done(() => assert.equal(location.hash, initial));
            });
        });
        location.hash = "a";
    });

    asyncTest("forward goes to next location", function(done) {
        let adapter = new Adapter();

        onHash(function() {
            history.back();
            onHash(function() {
                adapter.forward();
                onHash(function() {
                    done(() => assert.equal(location.hash, "#b"));
                });
            });
        });

        location.hash = "b";
    });

    asyncTest("length tracks the history length", function(done) {
        let length = history.length;

        if (length === 50) {
            window.console.log("skipping history length tests, max length reached");
            done(() => assert.isOk(true));
            return;
        }

        let adapter = new Adapter(),
            initial = adapter.length();

        onHash(function() {
            done(() => assert.equal(adapter.length(), initial + 1));
        });

        location.hash = "c";
    });
});
