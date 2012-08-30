var drag,
    Drag = kendo.Drag,
    element;

function triggerTouchEvent(type, info) {
    info.target = element;
    element.trigger($.Event(type, { originalEvent: { changedTouches: [ info ] }}));
}

function press(x, y, id) {
    triggerTouchEvent("touchstart", {
        pageX: x,
        pageY: y,
        id: id || 1
    })
}

function move(x, y, id) {
    triggerTouchEvent("touchmove", {
        pageX: x,
        pageY: y,
        id: id || 1
    })
}

function release(x, y, id) {
    triggerTouchEvent("touchend", {
        pageX: x,
        pageY: y,
        id: id || 1
    })
}

module("drag", {
    setup: function() {
        element = $('<div />');
        drag = new Drag(element);
    }
});

test("raises press on touchstart", 2, function(){
    drag.bind("press", function(e) {
        equal(e.x.location, 10);
        equal(e.y.location, 20);
    });

    press(10, 20);
});

test("raises start on first mouse move", 2, function(){
    drag.bind("start", function(e) {
        equal(e.x.location, 15);
        equal(e.y.location, 25);
    });

    press(10, 20);
    move(15, 25);
});

test("raises tap on tap", 1, function(){
    drag.bind("tap", function(e) {
        ok(true);
    });

    press(10, 20);
    release();
});

asyncTest("resets velocity on direction change", 2, function(){
    drag.bind("end", function(e) {
        start();
        ok(e.x.velocity > 0);
        ok(e.y.velocity < 0);
    });

    press(10, 20)

    setTimeout(function() {
        move(1, 30);
    }, 1);

    setTimeout(function() {
        move(10, 20);
    }, 1);

    setTimeout(function() {
        release(10, 20);
    }, 1);
});

test("passes delta on mousemove", 2, function(){
    drag.bind("move", function(e) {
        equal(e.x.delta, 10);
        equal(e.y.delta, 20);
    });

    press(10, 20);
    move(20, 40);
});

test("does not track unpressed mousemove", 0, function(){
    drag.bind("move", function(e) {
        ok(false);
    });

    move(20, 40);
});

asyncTest("calculates velocity on mouseup", 2, function(){
    drag.bind("end", function(e) {
        start();
        ok(e.x.velocity > 0);
        ok(e.y.velocity < 0);
    });

    press(10, 20);

    setTimeout(function() {
        move(20, 10);
    }, 1);

    setTimeout(function() {
        release(20, 0);
    }, 1);
});

module("drag filter option", {
    setup: function() {
        element = $('<div><div id="foo" /><div id="bar" /></div>');
        drag = new Drag(element, {
            filter: "#foo"
        });
    }
});

test("binds to drag performed on elements matching filter", 1, function(){
    drag.bind("start", function(e) {
        ok(true);
    });

    element = element.find("#foo");

    press(10, 20);
    move(15, 25);
});

test("ignores drag performed on elements not matching filter", 0, function(){
    drag.bind("start", function(e) {
        ok(false);
    });
    element = element.find("#bar");

    press(10, 20);
    move(15, 25);
});

module("drag threshold option", {
    setup: function() {
        element = $('<div />');
        $("#qunit-fixture").empty().append(element);
        drag = new Drag(element, {
            threshold: 5
        });
    }
});

test("ignores drag if less than threshold option", 0, function(){
    drag.bind("start", function(e) {
        ok(false);
    });

    press(10, 20);
    move(11, 21);
});

test("raises start if distance is more than threshold option", 1, function(){
    drag.bind("start", function(e) {
        ok(true);
    });

    press(10, 20);
    move(14, 24);
});

module("drag of nested elements", {
    setup: function() {
        element = $('<div id="parent"><div class="foo" /><div id="child"><div class="foo" /></div></div>');
        parentDrag = new Drag(element, {
            filter: element.children(".foo")
        });

        childElement = element.find("#child");

        childDrag = new Drag(childElement, {
            filter: childElement.children(".foo")
        });
    }
});

test("ignores drag if filter does not match elements", 1, function() {
    parentDrag.bind("start", function() {
        ok(false);
    });

    childDrag.bind("start", function() {
        ok(true);
    });

    element = childElement.children(".foo");

    press(10, 20);
    move(24, 54);
});

module("drag gestures", {
    setup: function() {
        element = $('<div />');
        drag = new Drag(element, {multiTouch: true});

        press(10, 20);
        move(15, 25);
    }

});

test("triggers gesturestart on second touch move", 1, function(){
    drag.bind("gesturestart", function(e) {
        ok(true);
    });

    press(10, 20, 2)
    move(15, 25, 2)
});

test("accepts maximum 2 fingers", 1, function(){
    drag.bind("gesturestart", function(e) {
        ok(true);
    });

    press(10, 20, 2)
    press(10, 20, 3)
});


test("does not trigger move on second touch move", 0, function(){
    drag.bind("move", function(e) {
        ok(false);
    });

    press(10, 20, 2);
    move(15, 25, 2);
});

test("triggers gesturechange", 1, function(){
    drag.bind("gesturechange", function(e) {
        ok(true);
    });

    press(10, 20, 2);
    move(15, 25, 2);
});

test("triggers gestureend", 1, function(){
    drag.bind("gestureend", function(e) {
        ok(true);
    });

    press(10, 20, 2);
    move(15, 25, 2);
    release(15, 25, 2);
});

test("triggers end after the first touch is over", 1, function(){
    drag.bind("end", function(e) {
        ok(true);
    });

    press(10, 20, 2);
    move(15, 25, 2);
    release(15, 25, 2);
    release(15, 25, 1);
});

test("triggers gesturestart before first touch move", 1, function(){
    var gestureStarted = false;
    drag.bind("gesturestart", function(e) {
        gestureStarted = true;
    });

    drag.bind("gesturechange", function() {
        ok(gestureStarted);
    });

    press(10, 20, 2);
    move(15, 25, 1);
});
