(function() {
    var DropTargetArea = kendo.ui.DropTargetArea,
        Draggable = kendo.ui.Draggable,
        span,
        targetElement,
        target,
        draggable;

    module("kendo.ui.DropTargetArea", {
        setup: function() {
            targetElement = $("<div><div class='test1'>&nbsp;</div><div class='test2'>&nbsp;</div></div>").prependTo(QUnit.fixture);
            span = $("<span>Foo</span>").prependTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
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

    test("dragenter is raised, passing the draggable and the dropTarget", 2, function() {
        setup({
                filter: ".test1",
                dragenter: function(e) {
                    ok(e.draggable === draggable);
                    ok(e.dropTarget[0].className == "test1");
                }
            });
    });

    test("dragenter is not raised for elements outside of the drop target area", 0, function() {
        target = new DropTargetArea(targetElement, { filter: ".test1", dragenter: function(e) { ok(false); } });

        draggable = new Draggable(span, {});

        bogus = $("<div class=test1>Foo</div>").prependTo(QUnit.fixture);

        var offset = kendo.getOffset(bogus);

        trigger("mousedown", { pageX: 1, pageY: 1, clientX: 1, clientY: 1 });

        trigger("mousemove", {
            pageX: offset.left,
            pageY: offset.top,
            clientX: offset.left,
            clientY: offset.top
        });
    });

    test("dragleave is raised, passing the draggable and the dropTarget", 2, function() {
        setup( {
                filter: ".test1",
                dragleave: function(e) {
                    ok(e.draggable === draggable);
                    ok(e.dropTarget[0].className == "test1");
                }
            });

        trigger("mousemove", { pageX: 0, pageY: 0, clientY: 0, clientX: 0 });
    });

    test("drop is raised and the dropTarget", 2, function() {
        setup({
                filter: ".test1",
                drop: function(e) {
                    ok(e.draggable === draggable);
                    ok(e.dropTarget[0].className == "test1");
                }
            });

        var offset = kendo.getOffset(targetElement);
        trigger("mouseup", { pageX: offset.left, pageY: offset.top });
    });

    test("dragenter is not raised for draggable from a different group", 0, function() {
        setup({
                filter: ".test1",
                dragenter: function() {
                    ok(false);
                }
            }, {
                group: "foo"
            });
    });

    test("dom event argument is passed to the drop event", 1, function() {
        setup( {
                filter: ".test1",
                drop: function(e) {
                    ok(e.pageX);
                }
            });

        var offset = kendo.getOffset(targetElement);
        trigger("mouseup", { pageX: offset.left, pageY: offset.top });
    });

    test("DropTargetArea marks the draggable as dropped", function() {
        var e, dropArea = setup({ filter: ".test1" });

        var offset = kendo.getOffset(targetElement);
        trigger("mouseup", { pageX: offset.left, pageY: offset.top });

        ok(draggable.dropped);
    });

    test("DropTargetArea destroy destroys the Area", function() {
        var target = new DropTargetArea(targetElement),
            element = target.element;

        target.destroy();

        ok(!element.data("kendoDropTargetArea"));
    });
})();
