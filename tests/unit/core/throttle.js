import '@progress/kendo-ui/src/kendo.core.js';
import { asyncTest } from "../../helpers/unit/async-utils.js";

let throttle = kendo.throttle;

describe("throttle", function() {

    it("throttle returns function if delay is falsy", function() {
        assert.equal(throttle($.noop, 0), $.noop);
        assert.equal(throttle($.noop, null), $.noop);
        assert.equal(throttle($.noop, undefined), $.noop);
    });

    it("throttle executes function immediately at first call", function() {
        let calls = 0;
        let fn = throttle(function() { calls++; }, 10);
        fn();
        assert.equal(calls, 1);
    });

    asyncTest("throttle executes second call after delay", function(done) {
        let calls = 0;
        let fn = throttle(function() { calls++; }, 10);
        fn();
        fn();

        assert.equal(calls, 1);

        setTimeout(function() {
            done(() => assert.equal(calls, 2));
        }, 100);
    });

    asyncTest("throttle does not delay call after first delay expires", function(done) {
        let calls = 0;
        let fn = throttle(function() { calls++; }, 10);

        fn();

        setTimeout(function() {

            fn();

            done(() => assert.equal(calls, 2));
        }, 100);
    });

    asyncTest("throttle calls function only once after delay expires", function(done) {
        let calls = 0;
        let fn = throttle(function() { calls++; }, 10);

        fn(); fn(); fn();

        setTimeout(function() {
            done(() => assert.equal(calls, 2));
        }, 100);
    });

    asyncTest("throttle uses last passed arguments", function(done) {
        let args;
        let fn = throttle(function(a) { args = a; }, 10);

        fn(1);
        fn(2);
        fn(3);

        setTimeout(function() {
            done(() => assert.equal(args, 3));
        }, 100);
    });

    asyncTest("function is not called if it is cancelled", function(done) {
        let calledWithTimeout;
        let fn = throttle(function(arg) {
            calledWithTimeout = arg;
        }, 10);

        fn(false);
        fn(true);
        fn.cancel();

        setTimeout(function() {
            done(() => assert.equal(calledWithTimeout, false));
        }, 100);
    });

});
