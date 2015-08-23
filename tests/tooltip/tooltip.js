(function() {
    var container,
        Tooltip = kendo.ui.Tooltip;

    module("kendo.ui.tooltip", {
        setup: function() {
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
        }
    });

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    };

    test("callout class is set for the position", function() {
        var tooltip = new Tooltip(container, {
            position: "left"
        });

        tooltip.show(container);

        ok(tooltip.popup.wrapper.find(".k-callout-e").length);
    });

    test("tooltip is attached to the element", function() {
        container.kendoTooltip();

        ok(container.data("kendoTooltip") instanceof kendo.ui.Tooltip);
    });

    test("shows a popup", function() {
        var tooltip = new Tooltip(container, {});

        tooltip.show(container);

        ok(tooltip.popup.visible());
    });

    test("shows a popup on default element", function() {
        var tooltip = new Tooltip(container, {});

        tooltip.show();

        ok(tooltip.popup.visible());
    });

    test("content is added to the tooltip", function() {
        var tooltip = new Tooltip(container, {
            content: "bar"
        });

        tooltip.show(container);

        equal(tooltip.content.text(), "bar");
    });

    test("content with html is added to the tooltip", function() {
        var tooltip = new Tooltip(container, {
            content: "<span>bar</span>"
        });

        tooltip.show(container);

        ok(tooltip.content.find("span").length);
        equal(tooltip.content.find("span").text(), "bar");
    });

    test("content as function", 3,  function() {
        var tooltip = new Tooltip(container, {
            content: function() {
                ok(true);
                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        ok(tooltip.content.find("span").length);
        equal(tooltip.content.find("span").text(), "bar");
    });

    test("content as function target is passed", 3,  function() {
        var tooltip = new Tooltip(container, {
            content: function(e) {

                deepEqual(e.target, container);

                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        ok(tooltip.content.find("span").length);
        equal(tooltip.content.find("span").text(), "bar");
    });

    test("content as function sender is passed", 3,  function() {
        var tooltip = new Tooltip(container, {
            content: function(e) {

                deepEqual(tooltip, e.sender);

                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        ok(tooltip.content.find("span").length);
        equal(tooltip.content.find("span").text(), "bar");
    });

    test("content is updated for every element", 3, function() {
        container.append($('<span id="first"/><span id="second"/>'));

        var tooltip = new Tooltip(container, {
            filter: "span",
            content: function(e) {
                ok(true);
                return "foo";
            }
        });

        tooltip.show(container.find("span:first"));

        tooltip.show(container.find("span:last"));

        equal(tooltip.content.text(), "foo");
    });

    test("show is trigger on hover of  every matched element", 2, function() {
        container.append($('<span id="first"/><span id="second"/>'));

        var tooltip = new Tooltip(container, {
            filter: "span",
            show: function() {
                ok(true);
            }
        });

        tooltip.show(container.find("span:first"));

        tooltip.show(container.find("span:last"));
    });

    test("show event is raised", 1, function() {
        var tooltip = new Tooltip(container, {
            show: function() { ok(true); }
        });

        tooltip.show(container);
    });

    test("hide event is raised", 1, function() {
        var tooltip = new Tooltip(container, {
            hide: function() { ok(true); }
        });

        tooltip.show(container);
        triggerEvent(container, "mouseleave");
    });

    test("popup creation is deferred until element is hovered", function() {
        var tooltip = new Tooltip(container, {});

        ok(!tooltip.popup);
    });

    test("same popup instance is used for multiple elements", function() {
        container.append($('<span id="first"/><span id="second"/>'));

        var tooltip = new Tooltip(container, {
                filter: "span"
            }),
            popup;

        tooltip.show(container.find("span:first"));

        popup = tooltip.popup;

        tooltip.show(container.find("span:last"));

        deepEqual(popup, tooltip.popup);
    });

    test("popup is hidden when mouse leave the element", function() {
        var tooltip = new Tooltip(container, {});

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        ok(!tooltip.popup.visible());
    });

    test("popup is shown for elements matched by the filter", function() {
        container.append($("<span/>"));

        var tooltip = new Tooltip(container, {
                filter: "span"
            }),
            target = container.find("span");


        tooltip.show(target);

        ok(tooltip.popup.visible());
        equal(tooltip.target()[0], target[0]);
    });

    test("popup is moved to the new element matched by the filter", function() {
        container.append($('<span id="first"/><span id="second"/>'));

        var tooltip = new Tooltip(container, {
                filter: "span"
            }),
            target = container.find("span:first");

        tooltip.show(target);

        target = container.find("span:last");

        tooltip.show(target);

        ok(tooltip.popup.visible());
        equal(tooltip.target()[0], target[0]);
    });


    test("popup is hidden when mouse leaves the matched by the filter element ", function() {
        container.append($("<span/>"));

        var tooltip = new Tooltip(container, {
                filter: "span"
            }),
            target = container.find("span");


        tooltip.show(target);
        triggerEvent(target, "mouseleave");

        ok(!tooltip.popup.visible());
        equal(tooltip.target()[0], target[0]);
    });

    test("title attributes are temporary removed", function() {
        container.attr("title", "foo");

        var tooltip = new Tooltip(container, { showOn: "click" });

        triggerEvent(container, "mouseenter");

        equal(container.attr("title"), "");
    });

    test("title attributes are temporary removed from element parents", function() {
        container.attr("title", "foo");
        container.append($('<span title="bar"/>'));

        var tooltip = new Tooltip(container, { filter: "span", showOn: "click" });

        triggerEvent(container.find("span"), "mouseenter");

        equal(container.attr("title"), "");
    });

    test("title attributes is restored on mouse leave", function() {
        container.attr("title", "foo");

        var tooltip = new Tooltip(container, { });

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        equal(container.attr("title"), "foo");
    });

    test("title attributes is restored on mouse leave", function() {
        container.attr("title", "foo");
        container.append($('<span title="bar"/>'));

        var tooltip = new Tooltip(container, { filter: "span" });

        tooltip.show(container.find("span"));
        triggerEvent(container.find("span"), "mouseleave");

        equal(container.attr("title"), "foo");
    });

    test("center position is set to the popup", function() {
        var tooltip = new Tooltip(container, {
            position: "center"
        });

        tooltip.show(container);

        equal(tooltip.popup.options.position, "center center");
        equal(tooltip.popup.options.origin, "center center");
    });

    test("width is set to the popup", function() {
        var tooltip = new Tooltip(container, {
            width: "100"
        });

        tooltip.show(container);
        equal(tooltip.content.width(), 100);
    });

    test("height is set to the popup", function() {
        var tooltip = new Tooltip(container, {
            height: "100"
        });

        tooltip.show(container);

        equal(tooltip.popup.element.height(), 100);
    });

    test("callout is not rendered if center position", function() {
        var tooltip = new Tooltip(container, {
            callout: true,
            position: "center"
        });

        tooltip.show(container);

        ok(!tooltip.popup.wrapper.find(".k-callout").length);
    });

    test("callout is rendered if enabled", function() {
        var tooltip = new Tooltip(container, {
            callout: true
        });

        tooltip.show(container);

        ok(tooltip.popup.wrapper.find(".k-callout").length);
    });

    test("callout is rendered by default", function() {
        var tooltip = new Tooltip(container, { });

        tooltip.show(container);

        ok(tooltip.popup.wrapper.find(".k-callout").length);
    });

    test("callout is not rendered if not enabled", function() {
        var tooltip = new Tooltip(container, {
            callout: false
        });

        tooltip.show(container);

        ok(!tooltip.popup.wrapper.find(".k-callout").length);
    });

    test("open on click", function() {
        var tooltip = new Tooltip(container, {
            showOn: "click"
        });

        triggerEvent(container, "click");

        ok(tooltip.popup.visible());
    });

    test("hide method closes the popup", function() {
        var tooltip = new Tooltip(container, { });

        tooltip.show(container);
        tooltip.hide();

        ok(!tooltip.popup.visible());
    });

    test("call hide method without opening the popup", function() {
        var tooltip = new Tooltip(container, { });

        tooltip.hide();
        ok(!tooltip.popup);
    });

    test("autoclose false does not hide the tooltip on mouseleave", function() {
        var tooltip = new Tooltip(container, {
            autoHide: false
        });
        tooltip.show(container);

        triggerEvent(container, "mouseleave");

        ok(tooltip.popup.visible());
    });

    test("autohide false renders a close button", function() {
        var tooltip = new Tooltip(container, {
            autoHide: false
        });

        tooltip.show(container);

        ok(tooltip.popup.element.find(".k-tooltip-button").length);
    });

    test("clicking the close button hides the tooltip", function() {
        var tooltip = new Tooltip(container, {
            autoHide: false
        });

        tooltip.show(container);

        triggerEvent(tooltip.popup.element.find(".k-tooltip-button"), "click");

        ok(!tooltip.popup.visible());
    });

    test("animation options are passed to the popup", function() {
        var tooltip = new Tooltip(container, {
            animation: {
                open: {
                    effects: "foo"
                }
            }
        });
        tooltip.show(container);

        equal(tooltip.popup.options.animation.open.effects, "foo");
    });

    test("pressing esc closes the tooltip", function() {
        var tooltip = new Tooltip(container, {
        });
        tooltip.show(container);
        container.press(kendo.keys.ESC);

        ok(!tooltip.popup.visible());
    });

    test("leaving the element closes the popup", function() {
        container.append('<span title="foo"/><span/>');

        var tooltip = new Tooltip(container, {
            filter: "[title]"
        });

        tooltip.show(container.find("[title]"));

        container.find("span").first().trigger("mouseleave");

        ok(!tooltip.popup.visible());
    });

    test("element without title clear the tooltip", function() {
        container.append('<span id="first" title="foo"/><span id="second"/>');

        var tooltip = new Tooltip(container, {
            filter: "span"
        });

        tooltip.show(container.find("[title]"));
        tooltip.show(container.find("#second"));

        equal(tooltip.content.html(), "");
    });

    asyncTest("dont show popup when tooltip destroyed after mouseenter", function() {
        var tooltip = new Tooltip(container, { showAfter: 5 });

        triggerEvent(container, "mouseenter");
        tooltip.destroy();

        setTimeout(function() {
          start();
          ok(!(tooltip.popup && tooltip.popup.visible()));
        }, 10);
    });

})();
