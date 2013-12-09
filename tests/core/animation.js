(function(){

var animate = kendo.animate;
var span;

module("animate", {
    setup: function() {
        span = $("<span>foo</span>").appendTo(QUnit.fixture);
    }
});

test("animate with effect which does not exist calls the callback imeadiately", function() {
    var callbackWasCalled = false;

    animate(span, "foo", function() {
        callbackWasCalled = true;
    });

    ok(callbackWasCalled);
});

asyncTest("animate calls the callback when the effect finishes", function() {
    kendo.fx.foo = {
        setup: function(element, options) {
            options.complete();
        }
    };

    animate(span, "foo", function() {
        ok(true);
        start();
    });
});

test("element is shown every time", function() {
    span.hide();

    kendo.fx.foo = {
        setup: function(element, options) {
            options.complete();
        }
    };

    animate(span, {
        effects: "foo"
    });

    ok(span.is(":visible"));
});

test("element is hidden when hide is true", function() {
    kendo.fx.foo = {
        setup: function(element, options) {
            options.complete();
        }
    };

    animate(span, {
        effects: "foo",
        hide: true
    });
    ok(!span.is(":visible"));
});

}());
