(function(){

    var throttle = kendo.throttle;

    module("throttle");

    test("throttle returns function if delay is falsy", function() {
        equal(throttle($.noop, 0), $.noop);
        equal(throttle($.noop, null), $.noop);
        equal(throttle($.noop, undefined), $.noop);
    });

    test("throttle executes function immediately at first call", function() {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);
        fn();
        equal(calls, 1);
    });

    asyncTest("throttle executes second call after delay", function() {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);
        fn();
        fn();

        equal(calls, 1);

        setTimeout(function() {
            start();
            equal(calls, 2);
        }, 100);
    });

    asyncTest("throttle does not delay call after first delay expires", function() {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);

        fn();

        setTimeout(function() {
            start();

            fn();

            equal(calls, 2);
        }, 100);
    });

    asyncTest("throttle calls function only once after delay expires", function() {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);

        fn(); fn(); fn();

        setTimeout(function() {
            start();
            equal(calls, 2);
        }, 100);
    });

    asyncTest("throttle uses last passed arguments", function() {
        var args;
        var fn = throttle(function(a) { args = a; }, 10);

        fn(1);
        fn(2);
        fn(3);

        setTimeout(function() {
            start();
            equal(args, 3);
        }, 100);
    });

    asyncTest("function is not called if it is cancelled", function() {
        var calledWithTimeout;
        var fn = throttle(function(arg) {
            calledWithTimeout = arg;
        }, 10);

        fn(false);
        fn(true);
        fn.cancel();

        setTimeout(function() {
            start();
            equal(calledWithTimeout, false);
        }, 100);
    });

}());
