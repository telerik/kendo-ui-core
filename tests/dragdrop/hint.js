(function() {
    var Draggable = kendo.ui.Draggable,
        draggable,
        span,
        hint;

    describe("kendo Draggable", function() {
        beforeEach(function() {
            span = $("<span/>").appendTo(Mocha.fixture);
            hint = span.clone();
        });

        afterEach(function() {
            span.remove();

            if (draggable) {
                draggable.destroy();
            }
            if (!$.isFunction(hint)) {
                hint.remove();
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
            return new Draggable(span, $.extend({ hint: hint }, options));
        }

        it("the hint is appended to the body", function() {
            draggable = setup();

            startDrag();

            assert.isOk(hint.parent().is("body"));
        });

        it("the hint is made absolute", function() {
            draggable = setup();

            startDrag();

            assert.equal(hint.css("position"), "absolute");
        });

        it("the hint is removed from DOM after the draggable is destroyed", function(done) {
            draggable = setup();

            draggable.bind("destroy", function() {
                assert.equal(hint.parents().length, 0);
                done();
            });

            startDrag();
            trigger("mouseup", { pageX: 10, pageY: 10 });

        });

        it("the hint is auto-postioned when dragged", function() {
            draggable = setup();

            var offset = kendo.getOffset(span);

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 21, pageY: 21 });

            assert.equal(parseInt(hint.css("top")), parseInt(offset.top + 20));
            assert.equal(parseInt(hint.css("left")), parseInt(offset.left + 20));
        });

        it("the hint can be constrained horizontally", function() {
            draggable = setup({ axis: "x" });

            var offset = kendo.getOffset(span);

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 21, pageY: 21 });

            var result = kendo.getOffset(hint);
            assert.equal(Math.floor(result.top), Math.floor(offset.top));
            assert.equal(result.left, offset.left + 20);
        });

        it("the hint can be constrained vertically", function() {
            draggable = setup({ axis: "y" });

            var offset = kendo.getOffset(span);

            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", { pageX: 21, pageY: 21 });

            var result = kendo.getOffset(hint);
            assert.equal(Math.floor(result.top), Math.floor(offset.top) + 20);
            assert.equal(result.left, offset.left);
        });

        it("the hint is positioned using options.cursorOffset", function() {
            draggable = setup({ cursorOffset: { left: 1, top: 1 } });

            startDrag();

            assert.equal(parseInt(hint.css("top")), 11);
            assert.equal(parseInt(hint.css("left")), 11);
        });

        it("the hint is positioned using options.cursorOffset", function() {
            draggable = setup({ cursorOffset: { left: 1, top: 1 } });

            startDrag();

            assert.equal(hint.css("top"), "11px");
            assert.equal(hint.css("left"), "11px");
        });

        it("the hint is repositioned during dragging", function() {
            draggable = setup({ cursorOffset: { left: 10, top: 10 } });

            startDrag();
            trigger("mousemove", { pageX: 100, pageY: 100 });

            assert.equal(hint.css("top"), "110px");
            assert.equal(hint.css("left"), "110px");
        });

        it("hint as a function", function() {
            var h = new $("<span/>");
            draggable = setup({ hint: function() { return h; } });

            startDrag();

            assert.isOk(draggable.hint[0] === h[0]);
            trigger("mouseup", { pageX: 10, pageY: 10 });
        });

        it("hint as a function which returns a string", function() {
            draggable = setup({ hint: function() { return "<span>foo</span>"; } });

            startDrag();

            assert.isOk(draggable.hint.is("span"));
            assert.equal(draggable.hint.text(), "foo");
            trigger("mouseup", { pageX: 10, pageY: 10 });
        });
    });
}());
