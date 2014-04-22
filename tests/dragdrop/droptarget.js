(function() {
        var DropTarget = kendo.ui.DropTarget,
            Draggable = kendo.ui.Draggable,
            span,
            targetElement,
            target,
            draggable;

        module("kendo.ui.DropTarget", {
            setup: function() {
                span = $("<span/>").appendTo(QUnit.fixture);
                targetElement = $("<div>foo</div>").appendTo(QUnit.fixture);
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
            trigger("mousedown", { pageX: 1, pageY: 1 });
            trigger("mousemove", {
                pageX: offset.left,
                pageY: offset.top,
                clientX: offset.left,
                clientY: offset.top
            });
        }

        function setup(dropTargetOptions, draggableOptions) {
            target = new DropTarget(targetElement, dropTargetOptions);
            draggable = new Draggable(span, draggableOptions);
            startDrag();
        }

        test("dragenter is raised, passing the draggable", 1, function() {
            setup({
                    dragenter: function(e) {
                        ok(e.draggable === draggable);
                    }
                });
        });

        test("drag is raised, passing the droptarget", 3, function() {
            setup({
                    dragenter: function(e) {
                        equal(e.draggable, draggable);
                    }
                }, {
                    drag: function(e) {
                        equal(e.dropTarget, target);
                    }
                });

            var offset = kendo.getOffset(targetElement);
            trigger("mousemove", { pageX: offset.left + 1, pageY: offset.top + 1, clientX: offset.left + 1, clientY: offset.top + 1 });
        });

        test("dragleave is raised, passing the draggable", 1, function() {
            setup({
                    dragleave: function(e) {
                        ok(e.draggable === draggable);
                    }
                });

            trigger("mousemove", { pageX: 1, pageY: 1, clientX: 1, clientY: 1 });
        });

        test("drop is raised", 1, function() {
            setup({
                    drop: function(e) {
                        ok(e.draggable === draggable);
                    }
                });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        test("dragenter is not raised for draggable from a different group", 0, function() {
            setup({
                    dragenter: function() {
                        ok(false);
                    }
                }, {
                    group: "foo"
                });
        });

        test("dom event argument is passed to the drop event", 1, function() {
            setup({
                    drop: function(e) {
                        ok(e.pageX);
                    }
                });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        test("droptarget marks the draggable as dropped", function() {
            var e, dropTarget = setup();

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });

            ok(draggable.dropped);
        });

        test("destroy removes droptarget from droptargets object", function() {
            target = new DropTarget(targetElement, {
                group: "foobarbaz"
            });

            target.destroy();

            ok(!DropTarget._cache["foobarbaz"]);
        });

        test("destroy removes only destroyed object from cache", function() {
            target = new DropTarget(targetElement, { group: "qux" });

            var quxElement = $("<div />").appendTo(QUnit.fixture);
            var quxTarget = new DropTarget(quxElement, { group: "qux" });

            target.destroy();

            ok(DropTarget._cache["qux"]);
            equal(DropTarget._cache["qux"].length, 1);
        });

        test("destroyGroup removes complete group from cache", function() {
            target = new DropTarget(targetElement, { group: "qux" });

            var quxElement = $("<div />").appendTo(QUnit.fixture);
            var quxTarget = new DropTarget(quxElement, { group: "qux" });

            DropTarget.destroyGroup("qux");

            ok(!DropTarget._cache["qux"]);
        });

        test("DropTarget destroy destroys the Target", function() {
            var target = new DropTarget(targetElement),
                element = target.element;

            target.destroy();

            ok(!element.data("kendoDropTarget"));
        });
})();
