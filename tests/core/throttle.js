(function(){

    var throttle = kendo.throttle;

    describe("throttle", function () {

    it("throttle returns function if delay is falsy", function() {
        assert.equal(throttle($.noop, 0), $.noop);
        assert.equal(throttle($.noop, null), $.noop);
        assert.equal(throttle($.noop, undefined), $.noop);
    });

    it("throttle executes function immediately at first call", function() {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);
        fn();
        assert.equal(calls, 1);
    });

    it("throttle executes second call after delay", function(done) {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);
        fn();
        fn();

        assert.equal(calls, 1);

        setTimeout(function() {
            assert.equal(calls, 2);
            done();
        }, 100);
    });

    it("throttle does not delay call after first delay expires", function(done) {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);

        fn();

        setTimeout(function() {

            fn();

            assert.equal(calls, 2);
            done();
        }, 100);
    });

    it("throttle calls function only once after delay expires", function(done) {
        var calls = 0;
        var fn = throttle(function() { calls++; }, 10);

        fn(); fn(); fn();

        setTimeout(function() {
            assert.equal(calls, 2);
            done();
        }, 100);
    });

    it("throttle uses last passed arguments", function(done) {
        var args;
        var fn = throttle(function(a) { args = a; }, 10);

        fn(1);
        fn(2);
        fn(3);

        setTimeout(function() {
            assert.equal(args, 3);
            done();
        }, 100);
    });

    it("function is not called if it is cancelled", function(done) {
        var calledWithTimeout;
        var fn = throttle(function(arg) {
            calledWithTimeout = arg;
        }, 10);

        fn(false);
        fn(true);
        fn.cancel();

        setTimeout(function() {
            assert.equal(calledWithTimeout, false);
            done();
        }, 100);
    });

    });
}());
