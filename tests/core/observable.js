(function() {

    var Observable = kendo.Observable;
    describe("observable", function() {

        it("bind returns this", function() {
            var observable = new Observable();

            assert.isOk(observable.bind("foo", $.noop) === observable)
        });

        it("bind stores the handler to the events list", function() {
            var observable = new Observable(),
                handler = $.noop;

            observable.bind("foo", handler);

            assert.equal(observable._events["foo"][0], handler);
        });

        it("bind stores multiple events", function() {
            var observable = new Observable(),
                handler = $.noop;

            observable.bind("foo", handler);
            observable.bind("foo", handler);

            assert.equal(observable._events["foo"][0], handler);
            assert.equal(observable._events["foo"][1], handler);
        });

        it("trigger calls the handler", function() {
            var observable = new Observable(),
                handlerWasCalled = false;

            observable.bind("foo", function() {
                handlerWasCalled = true;
            });
            observable.trigger("foo");
            assert.isOk(handlerWasCalled);
        });

        it("this in trigger is the observable", function() {
            var observable = new Observable(), that;

            observable.bind("foo", function() {
                that = this;
            });

            observable.trigger("foo");

            assert.isOk(that === observable);
        });

        it("trigger calls all bound events", function() {
            var observable = new Observable(), calls = 0;

            observable.bind("foo", function() {
                calls++;
            });

            observable.bind("foo", function() {
                calls++;
            });

            observable.trigger("foo");
            assert.equal(calls, 2);
        });

        it("trigger passes the arguments to the handler", function() {
            var observable = new Observable(), argument;

            observable.bind("foo", function(bar) {
                argument = bar;
            });

            observable.trigger("foo", { baz: "bar" });

            assert.equal(argument.baz, "bar");

        });

        it("trigger returns true if event is prevented", function() {
            var observable = new Observable();
            observable.bind("foo", function(e) {
                e.preventDefault();
            });

            var result = observable.trigger("foo");
            assert.isOk(result);
        });

        it("trigger returns false if event is not prevented", function() {
            var observable = new Observable();
            observable.bind("foo", function(e) {
            });

            var result = observable.trigger("foo");
            assert.isOk(!result);
        });

        it("unbind without handler removes all events", function() {
            var observable = new Observable();

            observable.bind("foo", $.noop);

            observable.unbind("foo");

            assert.equal(observable._events.foo.length, 0);
        });

        it("unbind without arguments removes all events", function() {
            var observable = new Observable();

            observable.bind("foo", $.noop);
            observable.bind("bar", $.noop);

            observable.unbind();

            assert.isOk($.isEmptyObject(observable._events));
        });

        it("unbind returns this", function() {
            var observable = new Observable();

            assert.isOk(observable.unbind() === observable);
        });

        it("unbind removes the specified handler", function() {
            var observable = new Observable(),
                first = function() { },
                second = function() { };

            observable.bind("foo", first).bind("foo", second);

            observable.unbind("foo", first);

            assert.equal(observable._events.foo.length, 1);
            assert.equal(observable._events.foo[0], second);
        });

        it("unbind removes handlers attached with onethe specified handler", function() {
            var observable = new Observable(),
                first = function() { },
                second = function() { };

            observable.one("foo", first).bind("foo", second);

            observable.unbind("foo", first);

            assert.equal(observable._events.foo.length, 1);
            assert.equal(observable._events.foo[0], second);
        });

        it("bind to array of events", function() {
            var observable = new Observable();

            observable.bind(["foo", "bar"], { foo: $.noop, bar: $.noop });

            assert.isOk(observable._events.foo[0] === $.noop);
            assert.isOk(observable._events.bar[0] === $.noop);
        });

        it("bind to array of events with same event handler", function() {
            var observable = new Observable();

            observable.bind(["foo", "bar"], $.noop);

            assert.isOk(observable._events.foo[0] === $.noop);
            assert.isOk(observable._events.bar[0] === $.noop);
        });

        it("bind to array of events skips missing handlers", function() {
            var observable = new Observable();

            observable.bind(["foo", "bar"], { foo: $.noop });

            assert.isOk(observable._events.foo[0] === $.noop);
            assert.isOk(typeof observable._events.bar === "undefined");
        });

        it("one binds to a event", function() {
            var observable = new Observable(),
                called = 0;

            observable.one("foo", function() {
                called++;
            });

            observable.trigger("foo");

            assert.equal(called, 1);
        });

        it("handler attached with one is called only once on multiple triggers", function() {
            var observable = new Observable(),
                called = 0;

            observable.one("foo", function() {
                called++;
            });

            observable.trigger("foo");
            observable.trigger("foo");

            assert.equal(called, 1);
        });

        it("one binds to array of events with same event handler", function() {
            var observable = new Observable(),
                called = 0;

            observable.one(["foo", "bar"], function() {
                called++;
            });

            observable.trigger("foo");
            observable.trigger("foo");

            observable.trigger("bar");
            observable.trigger("bar");

            assert.equal(called, 2);
        });

        it("this in trigger is the observable when attached through one", function() {
            var observable = new Observable(), that;

            observable.one("foo", function() {
                that = this;
            });

            observable.trigger("foo");

            assert.isOk(that === observable);
        });

        it("the observable is passed as sender in the event arguments", function() {
            var observable = new Observable();

            observable.bind("foo", function(e) {
                assert.strictEqual(e.sender, observable);
            });

            observable.trigger("foo");
        });

        it("first adds handle first", function() {
            var observable = new Observable(),
                order = [];

            observable.bind("foo", function(e) {
                order.push("bind");
            });

            observable.first("foo", function(e) {
                order.push("first");
            });

            observable.trigger("foo");

            assert.equal(order[0], "first");
            assert.equal(order[1], "bind");
        });

        it("triggering multiple handlers attached with the one method", function() {
            var observable = new Observable();

            var handlerCalled = false;

            var handler1 = function() {
                handlerCalled = true;
            };

            var handler2Called = false;

            var handler2 = function() {
                handler2Called = true;
            };

            observable.one("event", handler1)
                .one("event", handler2)
                .trigger("event");

            assert.isOk(handlerCalled, "First handler should be called");
            assert.isOk(handler2Called, "Second handler should be called");
        });

        it("can reatach a handler during event invocation", function() {
            var observable = new Observable();

            var handlerCalled = false;

            var handler1 = function() {
                handlerCalled = true;
                observable.unbind("event", handler1)
                    .bind("event", handler1);
            };

            var handler2Called = false;

            var handler2 = function() {
                handler2Called = true;

                observable.unbind("event", handler2)
                    .bind("event", handler2);
            };

            observable.bind("event", handler1)
                .bind("event", handler2)
                .trigger("event");

            assert.isOk(handlerCalled, "First handler should be called");
            assert.isOk(handler2Called, "Second handler should be called");
        });

        it("unbind detaches all instances of the event handler", function() {
            var handlerCalled = false;

            var handler = function() {
                handlerCalled = true;
            };

            var observable = new Observable();

            observable.bind("event", handler).bind("event", handler);

            observable.unbind("event", handler);

            observable.trigger("event");

            assert.equal(handlerCalled, false);
        });
    });
}());
