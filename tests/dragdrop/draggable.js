(function() {
    var Draggable = kendo.ui.Draggable,
        draggable,
        span;

    module("kendo.ui.Draggable", {
        setup: function() {
            span = $("<span/>").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.destroy(span);
        }
    });

    function trigger(type, e, el) {
        el = el || span;
        el.trigger($.Event(type, e));
    }

    function setup(options) {
        draggable = new Draggable(span, options);
        return draggable;
    }

    test("moving the mouse beyond the allowed distance triggers the dragstart event", 1, function() {
            setup({
                dragstart: function() {
                    ok(true);
                }
            });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 }, $(document.documentElement));
    });

    test("moving the mouse within the allowed distance does not trigger the dragstart event", 0, function() {
            draggable = new Draggable(span, { dragstart: function() {
                    ok(false);
                }
            });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 1, pageY: 1 }, $(document.documentElement));

    });

    test("prevent default from drag start event does not trigger drag event", 1, function() {
            setup({
                dragstart: function(e) {
                    e.preventDefault();
                    ok(true);
                },
                drag: function() {
                    ok(false);
                }
            });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
    });

    test("drag event is raised during dragging", 2, function() {
            setup({
                drag: function() {
                    ok(true);
                }
            });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 2 });

    });

    test("dragend event is raised", 1, function() {
        setup({ dragend: function() {
            ok(true);
        }});

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
        trigger("mouseup", { pageX: 10, pageY: 2 });
    });

    test("dragend event is raised when pressing escape", 1, function() {
        setup({ dragcancel: function() { ok(true) } });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
        trigger("keyup", { keyCode: 27});
    });

    test("specifying filter", function() {
        var dragstartWasCalled = false,
            draggable = new Draggable(span.append("<span>foo</span>"), {
                dragstart: function() {
                    dragstartWasCalled = true;
                },
                filter: "span"
            });


        trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
        trigger("mousemove", { pageX: 10, pageY: 10 });

        ok(dragstartWasCalled);
    });

    test("ignore skips elements matching the selector", 1, function() {
        var notIgnored = true,
            draggable = new Draggable(span.append("<span>foo<input /></span>"), {
                dragstart: function() {
                    notIgnored = false;
                },
                ignore: "input"
            });


        trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("input"));
        trigger("mousemove", { pageX: 10, pageY: 10 });

        ok(notIgnored);
    });

    test("with filter - the dragged element is currentTarget during the dragstart event", function() {
        var e, draggable = new Draggable(span.append("<span>foo</span>"), {
                dragstart: function() {
                    e = arguments[0];
                },
                filter: "span"
            });

        trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
        trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));

        ok(e.currentTarget[0] === span.find("span")[0]);
    });

    test("with filter - the dragged element is currentTarget during the drag event", function() {
        var e, draggable = new Draggable(span.append("<span>foo</span>"), {
                drag: function() {
                    e = arguments[0];
                },
                filter: "span"
            });

        trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
        trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));
        trigger("mousemove", { pageX: 20, pageY: 10 }, span.find("span"));

        ok(e.currentTarget[0] === span.find("span")[0]);
    });

    test("with filter - the dragged element is currentTarget during the dragend event", function() {
        new Draggable(span.append("<span>foo</span>"), {
                dragend: function(e) {
                    ok(e.currentTarget[0] === span.find("span")[0]);
                },
                filter: "span"
            });

        trigger("mousedown", { pageX: 0, pageY: 0 }, span.find("span"));
        trigger("mousemove", { pageX: 10, pageY: 10 }, span.find("span"));
        trigger("mouseup", { pageX: 20, pageY: 10 }, span.find("span"));

    });

    test("dom event argument is passed to the dragstart event", function() {
        var e;

        setup({
                dragstart: function() {
                    e = arguments[0];
                }
            });

        trigger("mousedown", { pageX: 0, pageY: 0 });
        trigger("mousemove", { pageX: 10, pageY: 10 });

        ok(e.pageX);
    });

    test("dom event argument is passed to the dragend event", function() {
        var e;

        setup({
                dragend: function() {
                    e = arguments[0];
                }
            });

        trigger("mousedown", { pageX: 0, pageY: 0 });
        trigger("mousemove", { pageX: 10, pageY: 10 });
        trigger("mouseup", { pageX: 20, pageY: 10 });

        ok(e.pageX);
    });

    test("dom event argument is passed to the drag event", function() {
        var e;

        setup({
                drag: function() {
                    e = arguments[0];
                }
            });

        trigger("mousedown", { pageX: 0, pageY: 0 });
        trigger("mousemove", { pageX: 10, pageY: 10 });
        trigger("mousemove", { pageX: 20, pageY: 10 });

        ok(e.pageX);
    });

    test("the hint is not active after destroy", function() {
        setup({
            hint: $("<div></div>").addClass("hint")
        });

        draggable.destroy();

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });

        equal($(".hint").length, 0);
    });

    asyncTest("hintDestroyed event is after the 'back to' animation is finished", 1, function() {
        setup({
            hint: $("<div></div>").addClass("hint"),
            hintDestroyed: function() {
                start();
                ok(true);
            }
        });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
        trigger("mouseup", { pageX: 10, pageY: 2 });
    });

    asyncTest("hintDestroyed event is raised after dragging is cancelled", 1, function() {
        setup({
            hint: $("<div></div>").addClass("hint"),
            hintDestroyed: function() {
                start();
                ok(true);
            }
        });

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 1 });
        trigger("keyup", { keyCode: 27});
    });

    test("initialTouch target is passed in dragstart event data", 2, function() {

        QUnit.fixture.find("span")
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
                equal($(e.initialTarget).attr("id"), "bar");
                equal($(e.target).attr("id"), "foo");
            }
        });

        trigger("mousedown", { pageX: 1, pageY: 1 }, QUnit.fixture.find("#bar"));
        trigger("mousemove", { pageX: 21, pageY: 1 }, QUnit.fixture.find("#foo"));
    });
})();
