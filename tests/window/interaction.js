(function() {
    function cleanup() {
        Mocha.fixture
            .closest("body")
            .find(".k-window-content")
            .each(function(idx, element) {
                $(element)
                    .data("kendoWindow")
                    .destroy();
            });
        Mocha.fixture
            .closest("body")
            .find(".k-overlay")
            .remove();
    }

    function createWindow(options, element) {
        element = element || $("<div class='wnd' />").appendTo(Mocha.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    var Widget = kendo.ui.Widget;

    var ResizableWidget = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this.element.css({ width: "100%", height: "100%" });
        },
        options: {
            name: "ResizableWidget"
        }
    });

    var dialog;
    var initialSize = 200;
    var resizeChange = 20;

    function resize(direction, left, top, absolute) {
        var handle = dialog.wrapper.find(".k-resize-" + direction);
        var start = handle.offset();
        var userEvents = dialog.resizing._draggable.userEvents;

        var end = {
            left: absolute ? left : start.left + left,
            top: absolute ? top : start.top + top
        };

        userEvents.press(start.left, start.top, handle[0]);
        userEvents.move(end.left, end.top);
        userEvents.end(end.left, end.top);
    }

    describe("interaction", function() {
        beforeEach(function() { });
        afterEach(function() {
            cleanup();
        });

        it("double-clicking refresh does not maximize window", function() {
            dialog = createWindow({
                actions: ["refresh"]
            });

            dialog.wrapper.find(".k-i-reload").trigger("dblclick");

            assert.isOk(!dialog.options.isMaximized);
        });

        it("resizing window resizes inner widgets", function(done) {
            kendo.ui.plugin(ResizableWidget);

            dialog = createWindow({});
            var widgetElement = $("<div />").kendoResizableWidget();

            widgetElement.appendTo(dialog.element);

            widgetElement
                .data("kendoResizableWidget")
                .bind("resize", function() {
                    assert.isOk(true);
                    done();
                });

            dialog.resize();
        });

        it("closing a non-modal Window does not execute toFront() of the other modal instance", function() {
            var executed = false;

            modalDialog = createWindow({
                modal: true
            });
            nonModalDialog = createWindow({
                modal: false
            });

            modalDialog.toFront = function() {
                executed = true;
            };

            nonModalDialog.close();

            assert.isOk(!executed);
        });

        it("restoring a Window sets the correct dimensions when width and height are set in percentages", function() {
            var dialog = createWindow({ width: "50%", height: "50%" }),
                initialWidth = dialog.wrapper.width(),
                initialHeight = dialog.wrapper.height();

            dialog.minimize();
            dialog.restore();

            assert.equal(initialWidth, dialog.wrapper.width());
            assert.equal(initialHeight, dialog.wrapper.height());
        });
    });

    describe("resizing", function() {
        beforeEach(function() {
            dialog = createWindow({
                width: initialSize,
                height: initialSize,
                position: {
                    top: "0",
                    left: "0"
                }
            });
        });
        afterEach(function() {
            cleanup();
        });

        it("resizing window out of viewport", function() {
            resize("nw", -10, -10, true);

            assert.equal(parseInt(dialog.wrapper.css("top"), 10), 0);
            assert.equal(parseInt(dialog.wrapper.css("left"), 10), 0);
        });

        it("resizing window updates widget options", function() {
            resize("se", 100, 100);

            assert.equal(dialog.options.width, dialog.wrapper.width() + "px");
            assert.equal(dialog.options.height, dialog.wrapper.height() + "px");
        });

        it("resizing window horizontally does not update vertical positioning", function() {
            var initialWidth = dialog.wrapper.width();

            resize("w", 0, 100);

            assert.equal(dialog.wrapper.width(), initialWidth);
        });

        it("resizing window vertically does not update horizontal positioning", function() {
            var initialHeight = dialog.wrapper.height();

            resize("n", 100, 0);

            assert.equal(dialog.wrapper.height(), initialHeight);
        });
    });

    describe("integration", function() {
        beforeEach(function() {
            dialog = createWindow();
        });
        afterEach(function() {
            cleanup();
        });

        it("popups are closed when closing window", function() {
            var ddl = $("<input id='ddl' />")
                .appendTo(dialog.element)
                .kendoDropDownList({
                    dataSource: ["foo", "bar"],
                    animation: false
                })
                .data("kendoDropDownList");

            ddl.open();

            dialog.wrapper.find(".k-window-titlebar").trigger("mousedown");

            assert.isOk($("#ddl-list").is(":hidden"));
        });
    });
})();
