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
        var dialog = createWindow({
            actions: [ "refresh" ]
        });

        dialog.wrapper.find(".k-i-refresh").trigger("dblclick");

        ok(!dialog.options.isMaximized);
    });

    test("resizing window out of viewport", function() {
        var dialog = createWindow({});
        var userEvents = dialog.resizing._draggable.userEvents;

        var handle = dialog.wrapper.find(".k-resize-nw");
        var start = handle.offset();

        userEvents.press(start.left, start.top, handle[0]);
        userEvents.move(-10, -10, handle[0]);
        userEvents.end(-10, -10, handle[0]);

        equal(parseInt(dialog.wrapper.css("top"), 10), 0);
        equal(parseInt(dialog.wrapper.css("left"), 10), 0);
    });

    test("resizing window resizes inner widgets", 1, function() {
        var dialog = createWindow({});
        var widgetElement = $("<div />").appendTo(dialog.element).kendoResizableWidget();
        widgetElement.data("kendoResizableWidget").bind("resize", function() { ok(true) });

        dialog.resize();
    });

    test("resizing window updates widget options", 2, function() {
        var initialSize = 200,
            resizeChange = 20,
            dialog = createWindow({width:initialSize, height: initialSize, position: {top: "0", left: "0"}}),
            userEvents = dialog.resizing._draggable.userEvents;

        var handle = dialog.wrapper.find(".k-resize-se");
        var start = handle.offset();
        var end = initialSize + resizeChange;

        userEvents.press(start.left, start.top, handle[0]);
        userEvents.move(end, end + parseInt(dialog.wrapper.css("padding-top"), 10), handle[0]);
        userEvents.end(0, 0, handle[0]);

        equal(dialog.options.width, end + "px");
        equal(dialog.options.height, end + "px");
    });

    var ddl, dialog;

    module("integration", {
        setup: function() {
            kendo.effects.disable();
            dialog = createWindow();
            ddl = $("<input id='ddl' />").appendTo(dialog.element)
                .kendoDropDownList({
                    dataSource: [ "foo", "bar" ],
                    animation: false
                }).data("kendoDropDownList");
        },
        teardown: cleanup
    });

    test("popups are closed when closing window", function() {
        ddl.open();
        dialog.wrapper.find(".k-window-titlebar").trigger("mousedown");

        ok($("#ddl-list").is(":hidden"));
    });
})();