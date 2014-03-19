(function(){

var Observable = kendo.Observable;

test("bind returns this", function() {
    var observable = new Observable();

    ok(observable.bind("foo", $.noop) === observable)
});

test("bind stores the handler to the events list", function() {
    var observable = new Observable(),
        handler = $.noop;

    observable.bind("foo", handler);

    equal(observable._events["foo"][0], handler);
});

test("bind stores multiple events", function() {
    var observable = new Observable(),
        handler = $.noop;

    observable.bind("foo", handler);
    observable.bind("foo", handler);

    equal(observable._events["foo"][0], handler);
    equal(observable._events["foo"][1], handler);
});

test("trigger calls the handler", function() {
    var observable = new Observable(),
        handlerWasCalled = false;

    observable.bind("foo", function() {
        handlerWasCalled = true;
    });
    observable.trigger("foo");
    ok(handlerWasCalled);
});

test("this in trigger is the observable", function() {
    var observable = new Observable(), that;

    observable.bind("foo", function() {
        that = this;
    });

    observable.trigger("foo");

    ok(that === observable);
});

test("trigger calls all bound events", function() {
    var observable = new Observable(), calls = 0;

    observable.bind("foo", function() {
        calls++;
    });

    observable.bind("foo", function() {
        calls++;
    });

    observable.trigger("foo");
    equal(calls, 2);
});

test("trigger passes the arguments to the handler", function() {
    var observable = new Observable(), argument;

    observable.bind("foo", function(bar) {
        argument = bar;
    });

    observable.trigger("foo", { baz: "bar"});

    equal(argument.baz, "bar");

});

test("trigger returns true if event is prevented", function() {
    var observable = new Observable();
    observable.bind("foo", function(e) {
        e.preventDefault();
    });

    var result = observable.trigger("foo");
    ok(result);
});

test("trigger returns false if event is not prevented", function() {
    var observable = new Observable();
    observable.bind("foo", function(e) {
    });

    var result = observable.trigger("foo");
    ok(!result);
});

test("unbind without handler removes all events", function() {
    var observable = new Observable();

    observable.bind("foo", $.noop);

    observable.unbind("foo");

    equal(observable._events.foo.length, 0);
});

test("unbind without arguments removes all events", function() {
    var observable = new Observable();

    observable.bind("foo", $.noop);
    observable.bind("bar", $.noop);

    observable.unbind();

    ok($.isEmptyObject(observable._events));
});

test("unbind returns this", function() {
    var observable = new Observable();

    ok(observable.unbind() === observable);
});

test("unbind removes the specified handler", function() {
    var observable = new Observable(),
        first = function() {},
        second = function() {};

    observable.bind("foo", first).bind("foo", second);

    observable.unbind("foo", first);

    equal(observable._events.foo.length, 1);
    equal(observable._events.foo[0], second);
});

test("unbind removes handlers attached with onethe specified handler", function() {
    var observable = new Observable(),
        first = function() {},
        second = function() {};

    observable.one("foo", first).bind("foo", second);

    observable.unbind("foo", first);

    equal(observable._events.foo.length, 1);
    equal(observable._events.foo[0], second);
});

test("bind to array of events", function() {
    var observable = new Observable();

    observable.bind(["foo", "bar"], { foo: $.noop, bar: $.noop } );

    ok(observable._events.foo[0] === $.noop);
    ok(observable._events.bar[0] === $.noop);
});

test("bind to array of events with same event handler", function() {
    var observable = new Observable();

    observable.bind(["foo", "bar"], $.noop);

    ok(observable._events.foo[0] === $.noop);
    ok(observable._events.bar[0] === $.noop);
});

test("bind to array of events skips missing handlers", function() {
    var observable = new Observable();

    observable.bind(["foo", "bar"], { foo: $.noop } );

    ok(observable._events.foo[0] === $.noop);
    ok(typeof observable._events.bar === "undefined");
});

test("one binds to a event", function() {
    var observable = new Observable(),
        called = 0;

    observable.one("foo", function() {
        called++;
    });

    observable.trigger("foo");

    equal(called, 1);
});

test("handler attached with one is called only once on multiple triggers", function() {
    var observable = new Observable(),
        called = 0;

    observable.one("foo", function() {
        called++;
    });

    observable.trigger("foo");
    observable.trigger("foo");

    equal(called, 1);
});

test("one binds to array of events with same event handler", function() {
    var observable = new Observable(),
        called = 0;

    observable.one(["foo", "bar"], function() {
        called++;
    });

    observable.trigger("foo");
    observable.trigger("foo");

    observable.trigger("bar");
    observable.trigger("bar");

    equal(called, 2);
});

test("this in trigger is the observable when attached through one", function() {
    var observable = new Observable(), that;

    observable.one("foo", function() {
        that = this;
    });

    observable.trigger("foo");

    ok(that === observable);
});

test("the observable is passed as sender in the event arguments", 1, function() {
    var observable = new Observable();

    observable.bind("foo", function(e) {
        strictEqual(e.sender, observable);
    });

    observable.trigger("foo");
});

test("first adds handle first", function() {
    var observable = new Observable(),
        order = [];

    observable.bind("foo", function(e) {
        order.push("bind");
    });

    observable.first("foo", function(e) {
        order.push("first");
    });

    observable.trigger("foo");

    equal(order[0], "first");
    equal(order[1], "bind");
});

test("triggering multiple handlers attached with the one method", function() {
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

    ok(handlerCalled, "First handler should be called");
    ok(handler2Called, "Second handler should be called");
});

test("can reatach a handler during event invocation", function() {
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

    ok(handlerCalled, "First handler should be called");
    ok(handler2Called, "Second handler should be called");
});

test("unbind detaches all instances of the event handler", function() {
    var handlerCalled = false;

    var handler = function() {
        handlerCalled = true;
    };

    var observable = new Observable();

    observable.bind("event", handler).bind("event", handler);

    observable.unbind("event", handler);

    observable.trigger("event");

    equal(handlerCalled, false);
});
}());
