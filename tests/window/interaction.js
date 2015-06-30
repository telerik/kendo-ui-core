(function() {

    function cleanup() {
        QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
            $(element).data("kendoWindow").destroy();
        });
        QUnit.fixture.closest("body").find(".k-overlay").remove();

        kendo.effects.enable();
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

    module("interaction", {
        setup: function() {
            kendo.effects.disable();
            kendo.ui.plugin(ResizableWidget);
        },
        teardown: cleanup
    });

    function createWindow(options, element) {
        element = element || $("<div class='wnd' />").appendTo(QUnit.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    test("double-clicking refresh does not maximize window", function() {
        dialog = createWindow({
            actions: [ "refresh" ]
        });

        dialog.wrapper.find(".k-i-refresh").trigger("dblclick");

        ok(!dialog.options.isMaximized);
    });

    test("resizing window resizes inner widgets", 1, function() {
        dialog = createWindow({});
        var widgetElement = $("<div />").appendTo(dialog.element).kendoResizableWidget();
        widgetElement.data("kendoResizableWidget").bind("resize", function() { ok(true) });

        dialog.resize();
    });

    test("closing a non-modal Window does not execute toFront() of the other modal instance", function () {
        var executed = false;

        modalDialog = createWindow({
            modal: true
        });
        nonModalDialog = createWindow({
            modal: false
        });

        modalDialog.toFront = function () {
            executed = true;
        }

        nonModalDialog.close();

        ok(!executed);
    });

    var initialSize = 200;
    var resizeChange = 20;

    function resize(direction, left, top, absolute) {
        var handle = dialog.wrapper.find(".k-resize-" + direction);
        var start = handle.offset();
        var userEvents = dialog.resizing._draggable.userEvents;

        var end = {
            left: absolute ? left : (start.left + left),
            top: absolute ? top : (start.top + top)
        };

        userEvents.press(start.left, start.top, handle[0]);
        userEvents.move(end.left, end.top);
        userEvents.end(end.left, end.top);
    }

    module("resizing", {
        setup: function() {
            kendo.effects.disable();
            dialog = createWindow({
                width: initialSize,
                height: initialSize,
                position: {
                    top: "0",
                    left: "0"
                }
            });
        },
        teardown: cleanup
    });

    test("resizing window out of viewport", function() {
        resize("nw", -10, -10, true);

        equal(parseInt(dialog.wrapper.css("top"), 10), 0);
        equal(parseInt(dialog.wrapper.css("left"), 10), 0);
    });

    test("resizing window updates widget options", function() {
        resize("se", 100, 100);

        equal(dialog.options.width, dialog.wrapper.width() + "px");
        equal(dialog.options.height, dialog.wrapper.height() + "px");
    });

    test("resizing window horizontally does not update vertical positioning", function() {
        var initialWidth = dialog.wrapper.width();

        resize("w", 0, 100);

        equal(dialog.wrapper.width(), initialWidth);
    });

    test("resizing window vertically does not update horizontal positioning", function() {
        var initialHeight = dialog.wrapper.height();

        resize("n", 100, 0);

        equal(dialog.wrapper.height(), initialHeight);
    });

    module("integration", {
        setup: function() {
            kendo.effects.disable();
            dialog = createWindow();
        },
        teardown: cleanup
    });

    test("popups are closed when closing window", function() {
        var ddl = $("<input id='ddl' />").appendTo(dialog.element)
            .kendoDropDownList({
                dataSource: [ "foo", "bar" ],
                animation: false
            }).data("kendoDropDownList");

        ddl.open();

        dialog.wrapper.find(".k-window-titlebar").trigger("mousedown");

        ok($("#ddl-list").is(":hidden"));
    });
})();
