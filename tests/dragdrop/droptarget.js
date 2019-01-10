(function() {
    var DropTarget = kendo.ui.DropTarget,
        Draggable = kendo.ui.Draggable,
        span,
        targetElement,
        target,
        draggable;

    describe("kendo.ui.DropTarget", function() {
        beforeEach(function() {
            span = $("<span/>").appendTo(Mocha.fixture);
            targetElement = $("<div>foo</div>").appendTo(Mocha.fixture);
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

        it("dragenter is raised, passing the draggable", function() {
            setup({
                dragenter: function(e) {
                    assert.isOk(e.draggable === draggable);
                }
            });
        });

        it("drag is raised, passing the droptarget", function() {
            setup({
                dragenter: function(e) {
                    assert.equal(e.draggable, draggable);
                }
            }, {
                    drag: function(e) {
                        assert.equal(e.dropTarget, target);
                    }
                });

            var offset = kendo.getOffset(targetElement);
            trigger("mousemove", { pageX: offset.left + 1, pageY: offset.top + 1, clientX: offset.left + 1, clientY: offset.top + 1 });
        });

        it("dragleave is raised, passing the draggable", function() {
            setup({
                dragleave: function(e) {
                    assert.isOk(e.draggable === draggable);
                }
            });

            trigger("mousemove", { pageX: 1, pageY: 1, clientX: 1, clientY: 1 });
        });

        it("drop is raised", function() {
            setup({
                drop: function(e) {
                    assert.isOk(e.draggable === draggable);
                }
            });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        it("dragenter is not raised for draggable from a different group", function() {
            setup({
                dragenter: function() {
                    assert.isOk(false);
                }
            }, {
                    group: "foo"
                });
        });

        it("dom event argument is passed to the drop event", function() {
            setup({
                drop: function(e) {
                    assert.isOk(e.pageX);
                }
            });

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });
        });

        it("droptarget marks the draggable as dropped", function() {
            var e, dropTarget = setup();

            var offset = kendo.getOffset(targetElement);
            trigger("mouseup", { pageX: offset.left, pageY: offset.top });

            assert.isOk(draggable.dropped);
        });

        it("destroy removes droptarget from droptargets object", function() {
            target = new DropTarget(targetElement, {
                group: "foobarbaz"
            });

            target.destroy();

            assert.isOk(!DropTarget._cache["foobarbaz"]);
        });

        it("destroy removes only destroyed object from cache", function() {
            target = new DropTarget(targetElement, { group: "qux" });

            var quxElement = $("<div />").appendTo(Mocha.fixture);
            var quxTarget = new DropTarget(quxElement, { group: "qux" });

            target.destroy();

            assert.isOk(DropTarget._cache["qux"]);
            assert.equal(DropTarget._cache["qux"].length, 1);
        });

        it("destroyGroup removes complete group from cache", function() {
            target = new DropTarget(targetElement, { group: "qux" });

            var quxElement = $("<div />").appendTo(Mocha.fixture);
            var quxTarget = new DropTarget(quxElement, { group: "qux" });

            DropTarget.destroyGroup("qux");

            assert.isOk(!DropTarget._cache["qux"]);
        });

        it("DropTarget destroy destroys the Target", function() {
            var target = new DropTarget(targetElement),
                element = target.element;

            target.destroy();

            assert.isOk(!element.data("kendoDropTarget"));
        });
    });
}());
