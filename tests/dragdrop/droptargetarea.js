(function() {
    var DropTargetArea = kendo.ui.DropTargetArea,
        Draggable = kendo.ui.Draggable,
        span,
        targetElement,
        target,
        draggable;

    describe("kendo.ui.DropTargetArea", function() {
        beforeEach(function() {
            targetElement = $("<div><div class='test1'>&nbsp;</div><div class='test2'>&nbsp;</div></div>").prependTo(Mocha.fixture);
            span = $("<span>Foo</span>").prependTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function trigger(type, e, el) {
            el = el || span;
            el.trigger($.Event(type, e));
        }

        function startDrag() {
            var offset = kendo.getOffset(targetElement);
            trigger("mousedown", { pageX: 1, pageY: 1, clientX: 1, clientY: 1 });

            trigger("mousemove", {
                pageX: offset.left,
                pageY: offset.top,
                clientX: offset.left,
                clientY: offset.top
            });
        }

        function setup(options, draggableOptions) {
            target = new DropTargetArea(targetElement, options);
            draggable = new Draggable(span, draggableOptions);
            startDrag();
        }

        it("dragenter is raised, passing the draggable and the dropTarget", function() {
            setup({
                filter: ".test1",
                dragenter: function(e) {
                    assert.isOk(e.draggable === draggable);
                    assert.isOk(e.dropTarget[0].className == "test1");
                }
            });
        });

        it("dragenter is not raised for elements outside of the drop target area", function() {
            target = new DropTargetArea(targetElement, { filter: ".test1", dragenter: function(e) { assert.isOk(false); } });

            draggable = new Draggable(span, {});

            bogus = $("<div class=test1>Foo</div>").prependTo(Mocha.fixture);

            var offset = kendo.getOffset(bogus);

            trigger("mousedown", { pageX: 1, pageY: 1, clientX: 1, clientY: 1 });

            trigger("mousemove", {
                pageX: offset.left,
                pageY: offset.top,
                clientX: offset.left,
                clientY: offset.top
            });
        });

        it("dragleave is raised, passing the draggable and the dropTarget", function() {
            setup({
                filter: ".test1",
                dragleave: function(e) {
                    assert.isOk(e.draggable === draggable);
                    assert.isOk(e.dropTarget[0].className == "test1");
                }
            });

            trigger("mousemove", { pageX: 0, pageY: 0, clientY: 0, clientX: 0 });
        });

        it("drop is raised and the dropTarget", function() {
            setup({
                filter: ".test1",
                drop: function(e) {
                    assert.isOk(e.draggable === draggable);
                    assert.isOk(e.dropTarget[0].className == "test1");
                }
            });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        it("dragenter is not raised for draggable from a different group", function() {
            setup({
                filter: ".test1",
                dragenter: function() {
                    assert.isOk(false);
                }
            }, {
                    group: "foo"
                });
        });

        it("dom event argument is passed to the drop event", function() {
            setup({
                filter: ".test1",
                drop: function(e) {
                    assert.isOk(e.pageX);
                }
            });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        it("DropTargetArea marks the draggable as dropped", function() {
            var e, dropArea = setup({ filter: ".test1" });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });

            assert.isOk(draggable.dropped);
        });

        it("DropTargetArea destroy destroys the Area", function() {
            var target = new DropTargetArea(targetElement),
                element = target.element;

            target.destroy();

            assert.isOk(!element.data("kendoDropTargetArea"));
        });
    });
}());
