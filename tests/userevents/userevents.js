(function() {
    var userEvents,
        UserEvents = kendo.UserEvents,
        element;

    describe("UserEvents", function() {
        beforeEach(function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { fastTap: true });
        });

        it("raises press on touchstart", function() {
            userEvents.bind("press", function(e) {
                assert.equal(e.x.location, 10);
                assert.equal(e.y.location, 20);
            });

            press(element, 10, 20);
        });

        it("includes event type in event data", function() {
            userEvents.bind("press", function(e) {
                assert.equal(e.type, "press");
            });

            press(element, 10, 20);
        });

        it("raises start on first mouse move", function() {
            userEvents.bind("start", function(e) {
                assert.equal(e.x.location, 15);
                assert.equal(e.y.location, 25);
            });

            press(element, 10, 20);
            move(element, 15, 25);
        });

        it("raises tap on tap", function() {
            userEvents.bind("tap", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20);
            release(element);
        });

        it("fires release, then tap", function() {
            var releaseFired = false;

            userEvents.bind("release", function(e) {
                releaseFired = true;
            });

            userEvents.bind("tap", function(e) {
                assert.isOk(releaseFired);
            });

            press(element, 10, 20);
            release(element);
        });

        it("resets velocity on direction change", function(done) {
            userEvents.bind("end", function(e) {
                assert.isOk(e.x.velocity > 0);
                assert.isOk(e.y.velocity < 0);
                done();
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



        it("passes delta on mousemove", function() {
            userEvents.bind("move", function(e) {
                assert.equal(e.x.delta, 10);
                assert.equal(e.y.delta, 20);
            });

            press(element, 10, 20);
            move(element, 20, 40);
        });

        it("does not track unpressed mousemove", function() {
            userEvents.bind("move", function(e) {
                assert.isOk(false);
            });

            move(element, 20, 40);
        });

        it("calculates velocity on mouseup", function(done) {
            userEvents.bind("end", function(e) {
                assert.isOk(e.x.velocity > 0);
                assert.isOk(e.y.velocity < 0);
                done();
            });

            press(element, 10, 20);

            setTimeout(function() {
                move(element, 20, 10);
            }, 1);

            setTimeout(function() {
                release(element, 20, 0);
            }, 1);
        });
    });

    describe("filter option", function() {
        beforeEach(function() {
            element = $('<div><div id="foo"></div><div id="bar"></div></div>');
            userEvents = new UserEvents(element, {
                filter: "#foo"
            });
        });

        it("binds to drag performed on elements matching filter", function() {
            userEvents.bind("start", function(e) {
                assert.isOk(true);
            });

            element = element.find("#foo");

            press(element, 10, 20);
            move(element, 15, 25);
        });

        it("ignores drag performed on elements not matching filter", function() {
            userEvents.bind("start", function(e) {
                assert.isOk(false);
            });
            element = element.find("#bar");

            press(element, 10, 20);
            move(element, 15, 25);
        });
    });

    describe("threshold option", function() {
        beforeEach(function() {
            element = $('<div />');
            $("#qunit-fixture").empty().append(element);
            userEvents = new UserEvents(element, {
                threshold: 5
            });
        });

        it("ignores drag if less than threshold option", function() {
            userEvents.bind("start", function(e) {
                assert.isOk(false);
            });

            press(element, 10, 20);
            move(element, 11, 21);
        });

        it("raises start if distance is more than threshold option", function() {
            userEvents.bind("start", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20);
            move(element, 14, 24);
        });
    });

    describe("hold", function() {
        beforeEach(function() {
            kendo.UserEvents.minHold(100);
            element = $('<div />').appendTo(Mocha.fixture);
            userEvents = new UserEvents(element, {
                threshold: 5
            });
        });
        afterEach(function() {
            kendo.UserEvents.minHold(800);
        });

        it("triggers hold after a while", function(done) {
            userEvents.bind("hold", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20);

            setTimeout(function() {
                release(element, 10, 20);
                done();
            }, 200);
        });

        /*
        it("does not trigger hold if released before that", function(done){
            userEvents.bind("hold", function(e) {
                assert.isOk(false, "hold was triggered by release");
            });

            press(element, 10, 20);

            setTimeout(function() {
                release(element, 10, 20);
            }, 10);

            setTimeout(function() {
                done();
            }, 101);
        });

        it("does not trigger hold if moved before that", function(done){
            userEvents.bind("hold", function(e) {
                assert.isOk(false, "hold was triggered by move");
            });

            press(element, 10, 20);

            setTimeout(function() {
                move(element, 15, 25);
            }, 50);

            setTimeout(function() {
                done();
                release(element, 15, 25);
            }, 101);
        });
        */
    });

    describe("nested elements", function() {
        beforeEach(function() {
            element = $('<div id="parent"><div class="foo"></div><div id="child"><div class="foo"></div></div></div>');
            parentEvents = new UserEvents(element, {
                filter: ">.foo"
            });

            childElement = element.find("#child");

            childEvents = new UserEvents(childElement, {
                filter: ">.foo"
            });
        });

        it("ignores drag if filter does not match elements", function() {
            parentEvents.bind("start", function() {
                assert.isOk(false);
            });

            childEvents.bind("start", function() {
                assert.isOk(true);
            });

            element = childElement.children(".foo");

            press(element, 10, 20);
            move(element, 24, 54);
        });
    });

    describe("gestures", function() {
        beforeEach(function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { multiTouch: true });

            press(element, 10, 20);
            move(element, 15, 25);
        });

        it("gesture start passes the center of the two touches", function() {
            userEvents.bind("gesturestart", function(e) {
                assert.equal(e.center.x, 10);
                assert.equal(e.center.y, 20);
            });

            press(element, 5, 15, 2);
        });

        it("gesture start passes the distance of the two touches", function() {
            userEvents.bind("gesturestart", function(e) {
                assert.closeTo(e.distance, 14.1, 0.1);
            });

            press(element, 5, 15, 2);
        });

        it("triggers gesturestart on second touch move", function() {
            userEvents.bind("gesturestart", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 2);
        });

        it("accepts maximum 2 fingers", function() {
            userEvents.bind("gesturestart", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20, 2);
            press(element, 10, 20, 3);
        });


        it("does not trigger move on second touch move", function() {
            userEvents.bind("move", function(e) {
                assert.isOk(false);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 2);
        });

        it("triggers gesturechange", function() {
            userEvents.bind("gesturechange", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 2);
        });

        it("triggers gestureend", function() {
            userEvents.bind("gestureend", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 2);
            release(element, 15, 25, 2);
        });

        it("triggers end after the first touch is over", function() {
            userEvents.bind("end", function(e) {
                assert.isOk(true);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 2);
            release(element, 15, 25, 2);
            release(element, 15, 25, 1);
        });

        it("triggers gesturestart before first touch move", function() {
            var gestureStarted = false;
            userEvents.bind("gesturestart", function(e) {
                gestureStarted = true;
            });

            userEvents.bind("gesturechange", function() {
                assert.isOk(gestureStarted);
            });

            press(element, 10, 20, 2);
            move(element, 15, 25, 1);
        });
    });

    describe("UserEvents API", function() {
        beforeEach(function() {
            element = $('<div />');
            userEvents = new UserEvents(element);
        });

        it("raises press on press", function() {
            userEvents.bind("press", function(e) {
                assert.equal(e.x.location, 10);
                assert.equal(e.y.location, 20);
            });

            userEvents.press(10, 20);
        });

        it("raises start on first move", function() {
            userEvents.bind("start", function(e) {
                assert.equal(e.x.location, 15);
                assert.equal(e.y.location, 25);
            });

            userEvents.press(10, 20);
            userEvents.move(15, 25);
        });

        it("raises end on end call", function() {
            userEvents.bind("end", function(e) {
                assert.isOk(true);
            });

            userEvents.press(10, 20);
            userEvents.move(15, 25);
            userEvents.end(15, 25);
        });

        it("cancel clears active touches", function() {
            press(element, 5, 15, 2);
            userEvents.cancel();
            assert.equal(userEvents.touches.length, 0);
        });
    });

    describe("userEvents", function() {
        afterEach(function() {
            $("#qunit-fixture").find("iframe").remove();
        });

        it("sets its element owner document as surface", function() {
            var iframe = $("<iframe />")
                .appendTo("#qunit-fixture")
                .contents().find('body').append("<div id='element'></div>");
            var element = $(iframe).find("#element")[0];

            userEvents = new UserEvents(element, { global: true });

            assert.equal(userEvents.surface[0], element.ownerDocument.documentElement);
        });
    });

    describe("selection", function() {
        beforeEach(function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { allowSelection: true });
        });

        if ("onselectstart" in document.body && kendo.support.browser.msie) {
            it("raises select on selectstart", function() {
                userEvents.bind("select", function(e) {
                    assert.isOk(true);
                });

                element.trigger("selectstart");
            });
        } else {
            it("raises select on mousedown", function() {
                userEvents.bind("select", function(e) {
                    assert.isOk(true);
                });

                element.trigger("mousedown");
            });
        }
    });

    describe("doubleTap", function() {
        beforeEach(function() {
            element = $('<div />');
            userEvents = new UserEvents(element, { fastTap: true, supportDoubleTap: true });
        });

        it("doubleTap should be fired when doubleTapSupport is enabled", function(done) {
            userEvents.bind("doubleTap", function(e) {
                assert.isOk(true);
                done();
            });

            press(element, 10, 20, 1);
            release(element);
            press(element, 10, 20, 1);
            release(element);
        });

        it("tap should be fired when doubleTapSupport is enabled", function(done) {
            userEvents.bind("tap", function(e) {
                assert.isOk(true);
                done();
            });

            press(element, 10, 20, 1);
            release(element);
        });

        it("tap should be fired when two subsequent tabs are performed with a delay between them", function(done) {
            var countTap = 0;
            var countDoubleTap = 0;

            userEvents.bind("tap", function(e) {
                countTap++
            });

            userEvents.bind("doubleTap", function(e) {
                countDoubleTap++;
            });

            press(element, 10, 20);
            release(element);

            setTimeout(function() {
                press(element, 10, 20);
                release(element);

                setTimeout(function() {
                    assert.equal(countTap, 2);
                    assert.equal(countDoubleTap, 0);
                    done();
                }, 300)

            }, 450);
        });
    });
}());
