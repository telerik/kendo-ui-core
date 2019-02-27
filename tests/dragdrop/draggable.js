(function() {
    var Draggable = kendo.ui.Draggable,
        draggable,
        span;

    describe("kendo.ui.Draggable", function() {
        beforeEach(function() {
            span = $("<span/>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            kendo.destroy(span);
        });

        function trigger(type, e, el) {
            el = el || span;
            el.trigger($.Event(type, e));
        }

        function setup(options) {
            draggable = new Draggable(span, options);
            return draggable;
        }

        it("moving the mouse beyond the allowed distance triggers the dragstart event", function() {
            setup({
                dragstart: function() {
                    assert.isOk(true);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 }, $(document.documentElement));
        });

        it("moving the mouse within the allowed distance does not trigger the dragstart event", function() {
            draggable = new Draggable(span, {
                dragstart: function() {
                    assert.isOk(false);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 1, pageY: 1 }, $(document.documentElement));

        });

        it("prevent default from drag start event does not trigger drag event", function() {
            setup({
                dragstart: function(e) {
                    e.preventDefault();
                    assert.isOk(true);
                },
                drag: function() {
                    assert.isOk(false);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
        });

        it("prevent default from drag start event does not trigger drag cancel event when pressing escape", function() {
            setup({
                dragstart: function(e) {
                    e.preventDefault();
                    assert.isOk(true);
                },
                dragcancel: function() {
                    assert.isOk(false);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("keyup", { keyCode: 27 });
        });

        it("drag event is raised during dragging", function() {
            setup({
                drag: function() {
                    assert.isOk(true);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 2 });

        });

        it("dragend event is raised", function() {
            setup({
                dragend: function() {
                    assert.isOk(true);
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("mouseup", { pageX: 10, pageY: 2 });
        });

        it("dragend event is raised when pressing escape", function() {
            setup({ dragcancel: function() { assert.isOk(true) } });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("keyup", { keyCode: 27 });
        });

        it("specifying filter", function() {
            var dragstartWasCalled = false,
                draggable = new Draggable(span.append("<span>foo</span>"), {
                    dragstart: function() {
                        dragstartWasCalled = true;
                    },
                    filter: "span"
                });


            trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
            trigger("mousemove", { pageX: 10, pageY: 10 });

            assert.isOk(dragstartWasCalled);
        });

        it("ignore skips elements matching the selector", function() {
            var notIgnored = true,
                draggable = new Draggable(span.append("<span>foo<input /></span>"), {
                    dragstart: function() {
                        notIgnored = false;
                    },
                    ignore: "input"
                });


            trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("input"));
            trigger("mousemove", { pageX: 10, pageY: 10 });

            assert.isOk(notIgnored);
        });

        it("with filter - the dragged element is currentTarget during the dragstart event", function() {
            var e, draggable = new Draggable(span.append("<span>foo</span>"), {
                dragstart: function() {
                    e = arguments[0];
                },
                filter: "span"
            });

            trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
            trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));

            assert.isOk(e.currentTarget[0] === span.find("span")[0]);
        });

        it("with filter - the dragged element is currentTarget during the drag event", function() {
            var e, draggable = new Draggable(span.append("<span>foo</span>"), {
                drag: function() {
                    e = arguments[0];
                },
                filter: "span"
            });

            trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
            trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));
            trigger("mousemove", { pageX: 20, pageY: 10 }, span.find("span"));

            assert.isOk(e.currentTarget[0] === span.find("span")[0]);
        });

        it("with filter - the dragged element is currentTarget during the dragend event", function() {
            new Draggable(span.append("<span>foo</span>"), {
                dragend: function(e) {
                    assert.isOk(e.currentTarget[0] === span.find("span")[0]);
                },
                filter: "span"
            });

            trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
            trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));
            trigger("mouseup", { pageX: 20, pageY: 10 }, span.find("span"));

        });

        it("dom event argument is passed to the dragstart event", function() {
            var e;

            setup({
                dragstart: function() {
                    e = arguments[0];
                }
            });

            trigger("mousedown", { pageX: 0, pageY: 0 });
            trigger("mousemove", { pageX: 10, pageY: 10 });

            assert.isOk(e.pageX);
        });

        it("dom event argument is passed to the dragend event", function() {
            var e;

            setup({
                dragend: function() {
                    e = arguments[0];
                }
            });

            trigger("mousedown", { pageX: 0, pageY: 0 });
            trigger("mousemove", { pageX: 10, pageY: 10 });
            trigger("mouseup", { pageX: 20, pageY: 10 });

            assert.isOk(e.pageX);
        });

        it("dom event argument is passed to the drag event", function() {
            var e;

            setup({
                drag: function() {
                    e = arguments[0];
                }
            });

            trigger("mousedown", { pageX: 0, pageY: 0 });
            trigger("mousemove", { pageX: 10, pageY: 10 });
            trigger("mousemove", { pageX: 20, pageY: 10 });

            assert.isOk(e.pageX);
        });

        it("the hint is not active after destroy", function() {
            setup({
                hint: $("<div></div>").addClass("hint")
            });

            draggable.destroy();

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });

            assert.equal($(".hint").length, 0);
        });

        it("hintDestroyed event is after the 'back to' animation is finished", function(done) {
            setup({
                hint: $("<div></div>").addClass("hint"),
                hintDestroyed: function() {
                    assert.isOk(true);
                    done();
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("mouseup", { pageX: 10, pageY: 2 });
        });

        it("hintDestroyed event is raised after dragging is cancelled", function(done) {
            setup({
                hint: $("<div></div>").addClass("hint"),
                hintDestroyed: function() {
                    assert.isOk(true);
                    done();
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 10, pageY: 1 });
            trigger("keyup", { keyCode: 27 });
        });

        it("initialTouch target is passed in dragstart event data", function() {

            Mocha.fixture.find("span")
                .attr("id", "foo")
                .css({
                    display: "block",
                    "background-color": "red",
                    width: 20,
                    height: 20
                })
                .append("<span id='bar' style='width:10px; height: 10px; background-color: blue; display: block;' />");

            setup({
                dragstart: function(e) {
                    assert.equal($(e.initialTarget).attr("id"), "bar");
                    assert.equal($(e.target).attr("id"), "foo");
                }
            });

            trigger("mousedown", { pageX: 1, pageY: 1 }, Mocha.fixture.find("#bar"));
            trigger("mousemove", { pageX: 21, pageY: 1 }, Mocha.fixture.find("#foo"));
        });

        it("hold event is not fired when holdToDrag is false", function(done) {
            var calls = 0;
            kendo.UserEvents.minHold(5);
            var draggable = setup({
                holdToDrag: false,
                hold: function (e) {
                    calls++;
                },
            });

            press(draggable.element, 10, 20);

            setTimeout(function() {
                release(draggable.element, 10, 20);
                kendo.UserEvents.minHold(800);
                assert.equal(calls, 0);
                done();
            }, 10);
        });

        it("hold event is fired when holdToDrag is true", function(done) {
            var calls = 0;
            kendo.UserEvents.minHold(5);
            var draggable = setup({
                holdToDrag: true,
                hold: function (e) {
                    calls++;
                },
            });

            press(draggable.element, 10, 20);

            setTimeout(function() {
                release(draggable.element, 10, 20);
                kendo.UserEvents.minHold(800);
                assert.equal(calls, 1);
                done();
            }, 10);
        });
    });
}());
