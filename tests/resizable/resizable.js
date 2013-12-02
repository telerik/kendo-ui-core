(function() {
    var Resizable = kendo.ui.Resizable,
        handle,
        div;

    module("kendo.ui.Resizable", {
        setup: function() {
            div = $("<div style='position:absolute;top:0;left:0'><b></b><span style='position:absolute'/></div>").appendTo(QUnit.fixture);
            handle = div.find("span");
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            div.remove();
        }
    });

    function setup(options) {
        return new Resizable(div, options);
    }

    function ev(options) {
        return new $.Event(options.type, options);
    }

    function dragEvent(x, y, handle) {
        return {
            x: { location: x, startLocation: x },
            y: { location: y, startLocation: y },
            currentTarget: handle
        };
    }

    test("start is raised when element is dragged", function() {
        var called,
            resizable = setup({
                handle: "span",
                start: function() {
                    called = true;
                }
            });
        handle.trigger(ev({ type: "mousedown", pageX:0, pageY: 0 }));
        handle.trigger(ev({ type: "mousemove", pageX: 10, pageY: 0 }));
        ok(called);
    });

    test("resize is raised when element is dragged", function() {
        var called,
            resizable = setup({
                handle: "span",
                resize: function() {
                    called = true;
                }
            });
        handle.trigger(ev({ type: "mousedown", pageX:0, pageY: 0 }));
        handle.trigger(ev({ type: "mousemove", pageX: 10, pageY: 0 }));
        handle.trigger(ev({ type: "mousemove", pageX: 11, pageY: 0 }));
        ok(called);
    });

    test("resize is raised only if the handle is dragged", function() {
        var called,
            resizable = setup({
                handle: "span",
                resize: function() {
                    called = true;
                }
            });
        handle = div.find("b");
        handle.trigger(ev({ type: "mousedown", pageX:0, pageY: 0 }));
        handle.trigger(ev({ type: "mousemove", pageX: 10, pageY: 0 }));
        handle.trigger(ev({ type: "mousemove", pageX: 11, pageY: 0 }));
        ok(!called);
    });

    test("resize is raised if the vertical handle is dragged vertically", function() {
        var called,
            resizable = setup({
                orientation: "vertical",
                handle: "span",
                resize: function() {
                    called = true;
                }
            });
        handle.trigger(ev({ type: "mousedown", pageX:1, pageY: 1 }));
        handle.trigger( ev( { type: "mousemove", pageX: 1, pageY: 10 } ) );
        handle.trigger( ev( { type: "mousemove", pageX: 1, pageY: 11 } ) );
        ok(called);
    });

    test("resizeend is raised when user release the mouse", function() {
        var called,
            resizable = setup({
                handle: "span",
                resizeend: function() {
                    called = true;
                }
            });
        handle.trigger(ev({ type: "mousedown", pageX:1, pageY: 1 }));
        handle.trigger( ev( { type: "mousemove", pageX: 10, pageY: 1 } ) );
        handle.trigger( ev( { type: "mousemove", pageX: 11, pageY: 1 } ) );
        $(document.documentElement).trigger( { type: "mouseup" } );
        ok(called);
    });

    test("hint is moved during horizontal dragging", function() {
        var resizable = setup({
                handle: "span",
                hint: $("<div class='hint'/>")
            });

        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(10, 0, handle));

        equal(parseInt(div.find(".hint").offset().left), 10);
    });

    test("hint is not moved during horizontal dragging with vertical orientation", function() {
        var resizable = setup({
                handle: "span",
                orientation: "vertical",
                hint: $("<div class='hint'/>")
            });

        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(10, 10, handle));

        ok(!parseInt(div.find(".hint").offset().left));
    });

    test("hint is not moved during vertical dragging with horizontal orientation", function() {
        var resizable = setup({
                handle: "span",
                orientation: "horizontal",
                hint: $("<div class='hint'/>")
            });

        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(0, 10, handle));

        ok(!parseInt(div.find(".hint").offset().top));
    });

    test("hint is moved during vertical dragging", function() {
        var resizable = setup({
                handle: "span",
                orientation: "vertical",
                hint: $("<div class='hint'/>")
            });

        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(0, 10, handle));

        equal(parseInt(div.find(".hint").offset().top), 10);
    });

    test("hint is removed", function() {
        var resizable = setup({
                handle: "span",
                hint: $("<div class='hint'/>")
            });

        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(10, 0, handle));
        resizable._stop(dragEvent(10, 0, handle));

        equal(div.find(".hint").length, 0);
    });

    test("hint is create if function", function() {
        var el,
            resizable = setup({
                handle: "span",
                hint: function(e) {
                    el = e;
                    return $("<div class='hint'/>");
                }
            });
        resizable._start(dragEvent(0, 0, handle));

        ok(resizable.hint);
        ok(el);
    });
    test("hint is not moved over the max value", function() {
        var resizable = setup({
                handle:"span",
                hint: $("<div class='hint'/>"),
                max: 30
            });
        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(60, 0, handle));

        equal(parseInt(div.find(".hint").offset().left), 30);
    });

    test("hint is not moved out of the min value", function() {
        var resizable = setup({
                handle:"span",
                hint: $("<div class='hint'/>"),
                min: 30
            });
        resizable._start(dragEvent(60, 0, handle));
        resizable._resize(dragEvent(20, 0, handle));

        equal(parseInt(div.find(".hint").offset().left), 30);
    });

    test("hint is not moved out of the min value if min is function", function() {
        var el,
            resizable = setup({
                handle:"span",
                hint: $("<div class='hint'/>"),
                min: function(e) {
                    el = e;
                    return 30;
                }
            });
        resizable._start(dragEvent(60, 0, handle));
        resizable._resize(dragEvent(20, 0, handle));

        equal(parseInt(div.find(".hint").offset().left), 30);
        ok(el);
    });

    test("hint is not moved out of the max value if max is function", function() {
        var el,
            resizable = setup({
                handle:"span",
                hint: $("<div class='hint'/>"),
                max: function(e) {
                    el = e;
                    return 30;
                }
            });
        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(40, 0, handle));

        equal(parseInt(div.find(".hint").offset().left), 30);
        ok(el);
    });

    test("hint invalid class is applied if outsize of the max value", function() {
        var el,
            resizable = setup({
                handle:"span",
                hint: $("<div class='hint'/>"),
                max: function(e) {
                    el = e;
                    return 30;
                },
                invalidClass: "foo"
            });
        resizable._start(dragEvent(0, 0, handle));
        resizable._resize(dragEvent(40, 0, handle));

        ok(div.find(".hint").hasClass("foo"));
    });

    test("kendo.resize does not trigger resize event", 0, function() {
        var resizable = setup({
                resize: function() {
                    ok(true);
                }
            });

        div.css({ width:10 });

        kendo.resize(div);
    });
})();
