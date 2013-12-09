(function() {
    var Draggable = kendo.ui.Draggable,
        draggable,
        span,
        hint;

    module("kendo Draggable", {
        setup: function() {
            span = $("<span/>").appendTo(QUnit.fixture);
            hint = span.clone();
        },

        teardown: function() {
            span.remove();

            if (draggable) {
                draggable.destroy();
            }
            if (!$.isFunction(hint)) {
                hint.remove();
            }
        }
    });

    function trigger(type, e, el) {
        el = el || span;
        el.trigger($.Event(type, e));
    }

    function startDrag() {
        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 10, pageY: 10 });
    }

    function setup(options) {
        return new Draggable(span, $.extend({ hint: hint}, options ));
    }

    test("the hint is appended to the body", function() {
        draggable = setup();

        startDrag();

        ok(hint.parent().is("body"));
    });

    test("the hint is made absolute", function() {
        draggable = setup();

        startDrag();

        equal(hint.css("position"), "absolute");
    });

    asyncTest("the hint is removed from DOM after the draggable is destroyed", 1, function() {
        draggable = setup();

        draggable.bind("destroy", function() {
            start();
            equal(hint.parents().length, 0);
        });

        startDrag();
        trigger("mouseup", {pageX: 10, pageY: 10});

    });

    test("the hint is auto-postioned when dragged", function() {
        draggable = setup();

        var offset = kendo.getOffset(span);

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 21, pageY: 21 });

        equal(parseInt(hint.css("top")), parseInt(offset.top + 20));
        equal(parseInt(hint.css("left")), parseInt(offset.left + 20));
    });

    test("the hint can be constrained horizontally", function() {
        draggable = setup({axis: "x"});

        var offset = kendo.getOffset(span);

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 21, pageY: 21 });

        var result = kendo.getOffset(hint);
        equal(Math.floor(result.top), Math.floor(offset.top));
        equal(result.left, offset.left + 20);
    });

    test("the hint can be constrained vertically", function() {
        draggable = setup({axis: "y"});

        var offset = kendo.getOffset(span);

        trigger("mousedown", { pageX: 1, pageY: 1 });
        trigger("mousemove", { pageX: 21, pageY: 21 });

        var result = kendo.getOffset(hint);
        equal(Math.floor(result.top), Math.floor(offset.top) + 20);
        equal(result.left, offset.left);
    });

    test("the hint is positioned using options.cursorOffset", function() {
        draggable = setup({ cursorOffset: { left: 1, top: 1 } });

        startDrag();

        equal(parseInt(hint.css("top")), 11);
        equal(parseInt(hint.css("left")), 11);
    });

    test("the hint is positioned using options.cursorOffset", function() {
        draggable = setup({ cursorOffset: { left: 1, top: 1 } });

        startDrag();

        equal(hint.css("top"), "11px");
        equal(hint.css("left"), "11px");
    });

    test("the hint is repositioned during dragging", function() {
        draggable = setup({ cursorOffset: { left: 10, top: 10 } });

        startDrag();
        trigger("mousemove", {pageX: 100, pageY: 100});

        equal(hint.css("top"), "110px");
        equal(hint.css("left"), "110px");
    });

    test("hint as a function", function() {
        var h = new $("<span/>");
        draggable = setup({ hint : function() { return h; } });

        startDrag();

        ok(draggable.hint[0] === h[0]);
        trigger("mouseup", {pageX: 10, pageY: 10});
    });

    test("hint as a function which returns a string", function() {
        draggable = setup({ hint : function() { return "<span>foo</span>"; } });

        startDrag();

        ok(draggable.hint.is("span"));
        equal(draggable.hint.text(), "foo");
        trigger("mouseup", {pageX: 10, pageY: 10});
    });
})();
