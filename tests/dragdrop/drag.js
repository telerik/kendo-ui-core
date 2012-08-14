var drag,
    Drag = kendo.Drag,
    element;

function triggerEvent(type, e, el) {
    el = el || element;
    el.trigger($.Event(type, e));
}

function triggerTouchEvent(type, e) {
    for (var i = 0; i < e.length; i ++) {
        e[i].identifier = i;
    }

    element.trigger($.Event(type, { originalEvent: { changedTouches: e }}));
}

module("drag", {
    setup: function() {
        element = $('<div />');
        $("#qunit-fixture").empty().append(element);
        drag = new Drag(element);
    }
});

test("raises start on first mouse move", 2, function(){
    drag.bind("start", function(e) {
        equal(e.x.location, 15);
        equal(e.y.location, 25);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    triggerEvent("mousemove", {pageX: 15, pageY: 25});
});

test("raises tap on tap", 1, function(){
    drag.bind("tap", function(e) {
        ok(true);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    triggerEvent("mouseup");
});

asyncTest("resets velocity on direction change", 2, function(){
    drag.bind("end", function(e) {
        start();
        ok(e.x.velocity > 0);
        ok(e.y.velocity < 0);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});

    setTimeout(function() {
        triggerEvent("mousemove", {pageX: 1, pageY: 30});
    }, 1);

    setTimeout(function() {
        triggerEvent("mousemove", {pageX: 10, pageY: 20});
    }, 1);

    setTimeout(function() {
        triggerEvent("mouseup", {pageX: 10, pageY: 20});
    }, 1);
});

test("passes delta on mousemove", 2, function(){
    drag.bind("move", function(e) {
        equal(e.x.delta, 10);
        equal(e.y.delta, 20);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    triggerEvent("mousemove", {pageX: 20, pageY: 40});
});

test("does not track unpressed mousemove", 0, function(){
    drag.bind("move", function(e) {
        ok(false);
    });

    triggerEvent("mousemove", {pageX: 20, pageY: 40});
});

asyncTest("calculates velocity on mouseup", 2, function(){
    drag.bind("end", function(e) {
        start();
        ok(e.x.velocity > 0);
        ok(e.y.velocity < 0);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    setTimeout(function() {
        triggerEvent("mousemove", {pageX: 20, pageY: 10});
    }, 1);

    setTimeout(function() {
        triggerEvent("mouseup", {pageX: 20, pageY: 0});
    }, 1);
});

module("drag filter option", {
    setup: function() {
        element = $('<div><div id="foo" /><div id="bar" /></div>');
        $("#qunit-fixture").empty().append(element);
        drag = new Drag(element, {
            filter: "#foo"
        });
    }
});

test("binds to drag performed on elements matching filter", 1, function(){
    drag.bind("start", function(e) {
        ok(true);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20}, element.find("#foo"));
    triggerEvent("mousemove", {pageX: 15, pageY: 25}, element.find("#foo"));
});

test("ignores drag performed on elements not matching filter", 0, function(){
    drag.bind("start", function(e) {
        ok(false);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20}, element.find("#bar"));
    triggerEvent("mousemove", {pageX: 15, pageY: 25}, element.find("#bar"));
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

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    triggerEvent("mousemove", {pageX: 11, pageY: 21});
});

test("raises start if distance is more than threshold option", 1, function(){
    drag.bind("start", function(e) {
        ok(true);
    });

    triggerEvent("mousedown", {pageX: 10, pageY: 20});
    triggerEvent("mousemove", {pageX: 14, pageY: 24});
});

module("drag of nested elements", {
    setup: function() {
        element = $('<div id="parent"><div class="foo" /><div id="child"><div class="foo" /></div></div>');
        $("#qunit-fixture").empty().append(element);
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

    var childFoo = childElement.children(".foo");

    triggerEvent("mousedown", {pageX: 10, pageY: 20}, childFoo);
    triggerEvent("mousemove", {pageX: 24, pageY: 54}, childFoo);
});

module("Drag Container", {});

test("Calculates correct dimensions for a given container", 4, function() {
    $("#qunit-fixture").empty().html($("#container-fixture").html());

    var boundaries = kendo.containerBoundaries($("#foo"), $("#bar"));
    var offset = kendo.getOffset($("#foo"));
    equal(boundaries.x.min, offset.left + 20);
    equal(boundaries.x.max, offset.left + 20 + 200 - 60);
    equal(boundaries.y.min, offset.top + 20);
    equal(boundaries.y.max, offset.top + 20 + 200 - 60);
});

module("drag gestures", {
    setup: function() {
        kendo.support.touch = true;
        element = $('<div />');
        $("#qunit-fixture").empty().append(element);
        drag = new Drag(element);
    },

    teardown: function() {
        kendo.support.touch = false;
    }
});

function triggerTouchEvent(type, e) {
    element.trigger($.Event(type, { originalEvent: { changedTouches: [e] }}));
}

test("raises gesturestart on second touch move", 1, function(){
    drag.bind("gesturestart", function(e) {
        ok(true);
    });

    triggerTouchEvent("mousedown", {pageX: 10, pageY: 20, identifier: 1});
    triggerTouchEvent("mousemove", {pageX: 15, pageY: 25, identifier: 1});

    triggerTouchEvent("mousedown", {pageX: 10, pageY: 20, identifier: 2});
    triggerTouchEvent("mousemove", {pageX: 15, pageY: 25, identifier: 2});
});


