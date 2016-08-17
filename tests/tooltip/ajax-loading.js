(function() {
    var container,
        Tooltip = kendo.ui.Tooltip;

    module("kendo.ui.tooltip.ajax", {
        setup: function() {
            $.mockjaxSettings.responseTime = 0;
            kendo.effects.disable();
            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger( { type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt } );
            }

            container = $("<div style='margin:50px'/>").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.effects.enable();
            if (container.data("kendoTooltip")) {
                container.kendoTooltip("destroy");
            }

            container.remove();
            $.mockjax.clear();
        }
    });

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    };

    test("ajax request is made when popup is shown", 1, function() {
        $.mockjax({
            url: "foo/baz",
            response: function(request) {
                ok(true);
                start();
            }
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            }
        });
        stop();
        tooltip.show(container);
    });

    test("response is added to the content", 1, function() {
        $.mockjax({
            url: "foo/baz",
            response: function() {
                this.responseText = "foo";
            }
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            contentLoad: function() {
                equal(tooltip.content.text(), "foo");
                start();
            }
        });

        stop();
        tooltip.show(container);
    });

    test("error event is raised if request fails", 1, function() {
        $.mockjax({
            url: "foo/baz",
            status: 500
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            error: function() {
                ok(true);
                start();
            }
        });

        stop();
        tooltip.show(container);
    });

    test("local url does not create iframe", function() {
        $.mockjax({
            url: "foo/baz",
            status: 500
        });

        var tooltip = new Tooltip(container, {
            content: { url: "foo/baz" }
        });

        tooltip.show(container);

        ok(!tooltip.content.find("iframe").length);
    });

    test("a remote `content` creates iframe", function() {
        var tooltip = new Tooltip(container, {
            content: { url:  "http://www.telerik.com/" }
        });

        tooltip.show(container);

        var iframe = tooltip.content.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), "http://www.telerik.com/");
    });

    test("iframe is created if showIframe is set", function() {
        var tooltip = new Tooltip(container, {
            content: { url:  "/foo/" },
            iframe: true
        });

        tooltip.show(container);

        ok(tooltip.content.find("iframe").length);
    });

    test("requestStart is triggered", 1, function() {
        $.mockjax({
            url: "foo/baz"
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function() {
                ok(true);
                start();
            }
        });

        stop();
        tooltip.show(container);
    });

    test("requestStart add request data if such does not exist", 1, function() {
        $.mockjax({
            url: "foo/baz",
            response: function(settings) {
                equal(settings.data.bar, "foo");
                start();
            }
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function(e) {
                e.options.data = {
                    bar: "foo"
                }
            }
        });

        stop();
        tooltip.show(container);
    });

    test("requestStart updates request data", 1, function() {
        $.mockjax({
            url: "foo/baz",
            response: function(settings) {
                equal(settings.data.bar, "foo");
                start();
            }
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz",
                data: {
                    bar: "boo"
                }
            },
            requestStart: function(e) {
                e.options.data.bar = "foo"
            }
        });

        stop();
        tooltip.show(container);
    });

    test("target is passed to the requestStart", 1, function() {
        $.mockjax({
            url: "foo/baz"
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function(e) {
                equal(e.target, container);
                start();
            }
        });

        stop();
        tooltip.show(container);
    });

    test("refresh issue an ajax request", 1, function() {
        $.mockjax({
            url: "foo/baz"
        });

        var tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            }
        });

        tooltip.show(container);

        tooltip.bind("requestStart", function() {
            ok(true);
            start();
        });

        stop();
        tooltip.refresh();
    });

    test("refresh the content", 2, function() {
        var tooltip = new Tooltip(container, {
            content: function() {
                ok(true);
            }
        });

        tooltip.show(container);

        tooltip.refresh();
    });

    test("refresh does not refresh the content if popup is not created", 0, function() {
        var tooltip = new Tooltip(container, {
            content: function() {
                ok(true);
            }
        });

        tooltip.refresh();
    });
})();
