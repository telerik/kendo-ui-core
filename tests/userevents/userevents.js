(function() {
    var userEvents,
        UserEvents = kendo.UserEvents,
        element;

    module("UserEvents", {
        setup: function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { fastTap: true });
        }
    });

    test("raises press on touchstart", 2, function(){
        userEvents.bind("press", function(e) {
            equal(e.x.location, 10);
            equal(e.y.location, 20);
        });

        press(element, 10, 20);
    });

    test("includes event type in event data", 1, function(){
        userEvents.bind("press", function(e) {
            equal(e.type, "press");
        });

        press(element, 10, 20);
    });

    test("raises start on first mouse move", 2, function(){
        userEvents.bind("start", function(e) {
            equal(e.x.location, 15);
            equal(e.y.location, 25);
        });

        press(element, 10, 20);
        move(element, 15, 25);
    });

    test("raises tap on tap", 1, function(){
        userEvents.bind("tap", function(e) {
            ok(true);
        });

        press(element, 10, 20);
        release(element);
    });

    test("fires release, then tap", 1, function(){
        var releaseFired = false;

        userEvents.bind("release", function(e) {
            releaseFired = true;
        });

        userEvents.bind("tap", function(e) {
            ok(releaseFired);
        });

        press(element, 10, 20);
        release(element);
    });

    asyncTest("resets velocity on direction change", 2, function(){
        userEvents.bind("end", function(e) {
            start();
            ok(e.x.velocity > 0);
            ok(e.y.velocity < 0);
        });

        press(element, 10, 20)

        setTimeout(function() {
            move(element, 1, 30);
        }, 1);

        setTimeout(function() {
            move(element, 10, 20);
        }, 1);

        setTimeout(function() {
            release(element, 10, 20);
        }, 1);
    });

    test("passes delta on mousemove", 2, function(){
        userEvents.bind("move", function(e) {
            equal(e.x.delta, 10);
            equal(e.y.delta, 20);
        });

        press(element, 10, 20);
        move(element, 20, 40);
    });

    test("does not track unpressed mousemove", 0, function(){
        userEvents.bind("move", function(e) {
            ok(false);
        });

        move(element, 20, 40);
    });

    asyncTest("calculates velocity on mouseup", 2, function(){
        userEvents.bind("end", function(e) {
            start();
            ok(e.x.velocity > 0);
            ok(e.y.velocity < 0);
        });

        press(element, 10, 20);

        setTimeout(function() {
            move(element, 20, 10);
        }, 1);

        setTimeout(function() {
            release(element, 20, 0);
        }, 1);
    });

    module("filter option", {
        setup: function() {
            element = $('<div><div id="foo" /><div id="bar" /></div>');
            userEvents = new UserEvents(element, {
                filter: "#foo"
            });
        }
    });

    test("binds to drag performed on elements matching filter", 1, function(){
        userEvents.bind("start", function(e) {
            ok(true);
        });

        element = element.find("#foo");

        press(element, 10, 20);
        move(element, 15, 25);
    });

    test("ignores drag performed on elements not matching filter", 0, function(){
        userEvents.bind("start", function(e) {
            ok(false);
        });
        element = element.find("#bar");

        press(element, 10, 20);
        move(element, 15, 25);
    });

    module("threshold option", {
        setup: function() {
            element = $('<div />');
            $("#qunit-fixture").empty().append(element);
            userEvents = new UserEvents(element, {
                threshold: 5
            });
        }
    });

    test("ignores drag if less than threshold option", 0, function(){
        userEvents.bind("start", function(e) {
            ok(false);
        });

        press(element, 10, 20);
        move(element, 11, 21);
    });

    test("raises start if distance is more than threshold option", 1, function(){
        userEvents.bind("start", function(e) {
            ok(true);
        });

        press(element, 10, 20);
        move(element, 14, 24);
    });

    module("hold", {
        setup: function() {
            kendo.UserEvents.minHold(100);
            element = $('<div />').appendTo(QUnit.fixture);
            userEvents = new UserEvents(element, {
                threshold: 5
            });
        },
        teardown: function() {
            kendo.UserEvents.minHold(800);
        }
    });

    asyncTest("triggers hold after a while", 1, function(){
        userEvents.bind("hold", function(e) {
            ok(true);
        });

        press(element, 10, 20);

        setTimeout(function() {
            start();
            release(element, 10, 20);
        }, 200);
    });

    /*
    asyncTest("does not trigger hold if released before that", 0, function(){
        userEvents.bind("hold", function(e) {
            ok(false, "hold was triggered by release");
        });

        press(element, 10, 20);

        setTimeout(function() {
            release(element, 10, 20);
        }, 10);

        setTimeout(function() {
            start();
        }, 101);
    });

    asyncTest("does not trigger hold if moved before that", 0, function(){
        userEvents.bind("hold", function(e) {
            ok(false, "hold was triggered by move");
        });

        press(element, 10, 20);

        setTimeout(function() {
            move(element, 15, 25);
        }, 50);

        setTimeout(function() {
            start();
            release(element, 15, 25);
        }, 101);
    });
    */

    module("nested elements", {
        setup: function() {
            element = $('<div id="parent"><div class="foo" /><div id="child"><div class="foo" /></div></div>');
            parentEvents = new UserEvents(element, {
                filter: ">.foo"
            });

            childElement = element.find("#child");

            childEvents = new UserEvents(childElement, {
                filter: ">.foo"
            });
        }
    });

    test("ignores drag if filter does not match elements", 1, function() {
        parentEvents.bind("start", function() {
            ok(false);
        });

        childEvents.bind("start", function() {
            ok(true);
        });

        element = childElement.children(".foo");

        press(element, 10, 20);
        move(element, 24, 54);
    });

    module("gestures", {
        setup: function() {
            element = $('<div />');
            userEvents = new UserEvents(element, {multiTouch: true});

            press(element, 10, 20);
            move(element, 15, 25);
        }
    });

    test("gesture start passes the center of the two touches", 2, function(){
        userEvents.bind("gesturestart", function(e) {
            equal(e.center.x, 10);
            equal(e.center.y, 20);
        });

        press(element, 5, 15, 2);
    });

    test("gesture start passes the distance of the two touches", 1, function(){
        userEvents.bind("gesturestart", function(e) {
            QUnit.close(e.distance, 14.1, 0.1);
        });

        press(element, 5, 15, 2);
    });

    test("triggers gesturestart on second touch move", 1, function(){
        userEvents.bind("gesturestart", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    test("accepts maximum 2 fingers", 1, function(){
        userEvents.bind("gesturestart", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        press(element, 10, 20, 3);
    });


    test("does not trigger move on second touch move", 0, function(){
        userEvents.bind("move", function(e) {
            ok(false);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    test("triggers gesturechange", 1, function(){
        userEvents.bind("gesturechange", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    test("triggers gestureend", 1, function(){
        userEvents.bind("gestureend", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
        release(element, 15, 25, 2);
    });

    test("triggers end after the first touch is over", 1, function(){
        userEvents.bind("end", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
        release(element, 15, 25, 2);
        release(element, 15, 25, 1);
    });

    test("triggers gesturestart before first touch move", 1, function(){
        var gestureStarted = false;
        userEvents.bind("gesturestart", function(e) {
            gestureStarted = true;
        });

        userEvents.bind("gesturechange", function() {
            ok(gestureStarted);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 1);
    });

    module("UserEvents API", {
        setup: function() {
            element = $('<div />');
            userEvents = new UserEvents(element);
        }
    });

    test("raises press on press", 2, function(){
        userEvents.bind("press", function(e) {
            equal(e.x.location, 10);
            equal(e.y.location, 20);
        });

        userEvents.press(10, 20);
    });

    test("raises start on first move", 2, function(){
        userEvents.bind("start", function(e) {
            equal(e.x.location, 15);
            equal(e.y.location, 25);
        });

        userEvents.press(10, 20);
        userEvents.move(15, 25);
    });

    test("raises end on end call", 1, function(){
        userEvents.bind("end", function(e) {
            ok(true);
        });

        userEvents.press(10, 20);
        userEvents.move(15, 25);
        userEvents.end(15, 25);
    });

    test("cancel clears active touches", function(){
        press(element, 5, 15, 2);
        userEvents.cancel();
        equal(userEvents.touches.length, 0);
    });

    module("selection", {
        setup: function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { allowSelection: true });
        }
    });

    if ("onselectstart" in document.body && kendo.support.browser.msie) {
        test("raises select on selectstart", 1, function(){
            userEvents.bind("select", function(e) {
                ok(true);
            });

            element.trigger("selectstart");
        });
    } else {
        test("raises select on mousedown", 1, function(){
            userEvents.bind("select", function(e) {
                ok(true);
            });

            element.trigger("mousedown");
        });
    }
})();
