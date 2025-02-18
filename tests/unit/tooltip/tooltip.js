import '@progress/kendo-ui/src/kendo.tooltip.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let container,
    Tooltip = kendo.ui.Tooltip;

describe("kendo.ui.tooltip", function() {
    beforeEach(function() {

        $.fn.press = function(key, ctrl, shift, alt) {
            return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
        };

        container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
    });

    afterEach(function() {

        kendo.destroy(Mocha.fixture);
    });

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    }

    it("callout class is set for the position", function() {
        let tooltip = new Tooltip(container, {
            position: "left"
        });

        tooltip.show(container);

        assert.isOk(tooltip.popup.wrapper.find(".k-callout-e").length);
    });

    it("tooltip is attached to the element", function() {
        container.kendoTooltip();

        assert.isOk(container.data("kendoTooltip") instanceof kendo.ui.Tooltip);
    });

    it("shows a popup", function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        assert.isOk(tooltip.popup.visible());
    });

    it("shows a popup on default element", function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show();

        assert.isOk(tooltip.popup.visible());
    });

    it("content is added to the tooltip", function() {
        let tooltip = new Tooltip(container, {
            content: "bar"
        });

        tooltip.show(container);

        assert.equal(tooltip.content.text(), "bar");
    });

    it("content with html is added to the tooltip", function() {
        let tooltip = new Tooltip(container, {
            content: "<span>bar</span>"
        });

        tooltip.show(container);

        assert.isOk(tooltip.content.find("span").length);
        assert.equal(tooltip.content.find("span").text(), "bar");
    });

    it("content as function", function() {
        let tooltip = new Tooltip(container, {
            content: function() {
                assert.isOk(true);
                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        assert.isOk(tooltip.content.find("span").length);
        assert.equal(tooltip.content.find("span").text(), "bar");
    });

    it("content as function target is passed", function() {
        let tooltip = new Tooltip(container, {
            content: function(e) {

                assert.deepEqual(e.target, container);

                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        assert.isOk(tooltip.content.find("span").length);
        assert.equal(tooltip.content.find("span").text(), "bar");
    });

    it("content as function sender is passed", function() {
        let tooltip = new Tooltip(container, {
            content: function(e) {

                assert.deepEqual(tooltip, e.sender);

                return "<span>bar</span>";
            }
        });

        tooltip.show(container);

        assert.isOk(tooltip.content.find("span").length);
        assert.equal(tooltip.content.find("span").text(), "bar");
    });

    it("content is updated for every element", function() {
        container.append($('<span id="first"></span><span id="second"></span>'));

        let tooltip = new Tooltip(container, {
            filter: "span",
            content: function(e) {
                assert.isOk(true);
                return "foo";
            }
        });

        tooltip.show(container.find("span:first"));

        tooltip.show(container.find("span:last"));

        assert.equal(tooltip.content.text(), "foo");
    });

    it("show is trigger on hover of  every matched element", function() {
        container.append($('<span id="first"></span><span id="second"></span>'));

        let tooltip = new Tooltip(container, {
            filter: "span",
            show: function() {
                assert.isOk(true);
            }
        });

        tooltip.show(container.find("span:first"));

        tooltip.show(container.find("span:last"));
    });

    it("show event is raised", function() {
        let tooltip = new Tooltip(container, {
            show: function() { assert.isOk(true); }
        });

        tooltip.show(container);
    });

    it("hide event is raised", function() {
        let tooltip = new Tooltip(container, {
            hide: function() { assert.isOk(true); }
        });

        tooltip.show(container);
        triggerEvent(container, "mouseleave");
    });

    it("popup creation is deferred until element is hovered", function() {
        let tooltip = new Tooltip(container, {});

        assert.isOk(!tooltip.popup);
    });

    it("same popup instance is used for multiple elements", function() {
        container.append($('<span id="first"></span><span id="second"></span>'));

        let tooltip = new Tooltip(container, {
            filter: "span"
        }),
            popup;

        tooltip.show(container.find("span:first"));

        popup = tooltip.popup;

        tooltip.show(container.find("span:last"));

        assert.deepEqual(popup, tooltip.popup);
    });

    asyncTest("popup is hidden when mouse leave the element", function(done) {
        let tooltip = new Tooltip(container);

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, tooltip.options.hideAfter);
    });

    it("popup is shown for elements matched by the filter", function() {
        container.append($("<span/>"));

        let tooltip = new Tooltip(container, {
            filter: "span"
        }),
            target = container.find("span");


        tooltip.show(target);

        assert.isOk(tooltip.popup.visible());
        assert.equal(tooltip.target()[0], target[0]);
    });

    it("popup is moved to the new element matched by the filter", function() {
        container.append($('<span id="first"></span><span id="second"></span>'));

        let tooltip = new Tooltip(container, {
            filter: "span"
        }),
            target = container.find("span:first");

        tooltip.show(target);

        target = container.find("span:last");

        tooltip.show(target);

        assert.isOk(tooltip.popup.visible());
        assert.equal(tooltip.target()[0], target[0]);
    });


    asyncTest("popup is hidden when mouse leaves the matched by the filter element ", function(done) {
        container.append($("<span/>"));

        let tooltip = new Tooltip(container, {
            filter: "span"
        }),
            target = container.find("span");


        tooltip.show(target);
        triggerEvent(target, "mouseleave");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
                assert.equal(tooltip.target()[0], target[0]);
            });
        }, tooltip.options.hideAfter);
    });

    it("popup width remains the same on subsequent shows", function() {
        let tooltip = new Tooltip(container, { content: "Tooltip content for this element" }),
            originalWidth = 0,
            latestWidth = 0;

        tooltip.show(container);
        originalWidth = tooltip.popup.element.width();
        tooltip.hide();
        tooltip.show(container);
        latestWidth = tooltip.popup.element.width();

        assert.equal(originalWidth, latestWidth);
    });

    it("popup width is recalculated properly when elements with different width are shown", function() {
        container.append(`<span id="long" title="Some very long text that will increase the width.">Long</span><br /><br />
            <span title="Short" id="short">Short</span><br /><br />`);
        let tooltip = new Tooltip(container, { filter: "span" }),
            originalWidth = 0,
            latestWidth = 0;

        tooltip.show($("#long")); // First show - big text.
        originalWidth = tooltip.popup.element.width();
        tooltip.hide();
        tooltip.show($("#short")); // Second show - small text.
        tooltip.hide();
        tooltip.show($("#long")); // Third show - big text again.
        latestWidth = tooltip.popup.element.width();

        assert.equal(originalWidth, latestWidth);
    });

    it("title attributes are temporary removed", function() {
        container.attr("title", "foo");

        let tooltip = new Tooltip(container, { showOn: "click" });

        triggerEvent(container, "mouseenter");

        assert.equal(container.attr("title"), "");
    });

    it("title attributes are preserved for element parents", function() {
        container.attr("title", "foo");
        container.append($('<span title="bar"/>'));

        let tooltip = new Tooltip(container, { filter: "span", showOn: "click" });

        triggerEvent(container.find("span"), "mouseenter");

        assert.equal(container.attr("title"), "foo");
    });

    it("title attributes is restored on mouse leave", async function() {
        container.attr("title", "foo");

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        await vi.waitUntil(() => container.attr("title") === "foo");
        assert.equal(container.attr("title"), "foo");
    });

    it("title attributes is restored on mouse leave", function() {
        container.attr("title", "foo");
        container.append($('<span title="bar"/>'));

        let tooltip = new Tooltip(container, { filter: "span" });

        tooltip.show(container.find("span"));
        triggerEvent(container.find("span"), "mouseleave");

        assert.equal(container.attr("title"), "foo");
    });

    it("popup is shown when shownOn is set to focus", function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");

        assert.isOk(tooltip.popup.visible());
    });

    it("popup hides on blur when shownOn is set to focus", async function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");
        await vi.waitUntil(() => !tooltip.popup._hovered);
        triggerEvent(input, "blur");

        await vi.waitUntil(() => !tooltip.popup.visible());
        assert.isOk(!tooltip.popup.visible());
    });

    asyncTest("popup hides on mouseleave when shownOn is set to focus and mouseenter", function(done) {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus mouseenter" });

        triggerEvent(input, "focus");
        triggerEvent(input, "mouseleave");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, tooltip.options.hideAfter);
    });

    it("popup stays open on mouseleave when shownOn is set to focus", function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");
        triggerEvent(input, "mouseleave");

        assert.isOk(tooltip.popup.visible());

        triggerEvent(tooltip.popup.element, "mouseleave");

        assert.isOk(tooltip.popup.visible());

    });

    it("popup hides on external click when shownOn is set to focus", function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");
        triggerEvent($("body"), "click");

        assert.isOk(tooltip.popup.visible());
    });

    it("content is added to the tooltip when shownOn is set to focus", function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");

        assert.equal(tooltip.content.text(), "foo");
    });

    it("title attribute is temporary removed when shownOn is set to focus", function() {
        container.append("<input />");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");

        assert.equal(input.attr("title"), "");
    });

    it("title attribute of parent is preserved when shownOn is set to focus", function() {
        container.append("<input />").attr("title", "bar");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");

        assert.equal(container.attr("title"), "bar");
    });

    it("title attributes are restored on blur when shownOn is set to focus", function() {
        container.append("<input />").attr("title", "bar");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "focus");
        triggerEvent(input, "blur");

        assert.equal(input.attr("title"), "foo");
        assert.equal(container.attr("title"), "bar");
    });

    it("title attributes are intact on mouseenter when shownOn is set to focus", function() {
        container.append("<input />").attr("title", "bar");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "mouseenter");

        assert.equal(input.attr("title"), "foo");
        assert.equal(container.attr("title"), "bar");
    });

    it("title attributes are intact on mouseleave when shownOn is set to focus", function() {
        container.append("<input />").attr("title", "bar");
        let input = container.find("input").attr("title", "foo");

        let tooltip = new Tooltip(input, { showOn: "focus" });

        triggerEvent(input, "mouseleave");

        assert.equal(input.attr("title"), "foo");
        assert.equal(container.attr("title"), "bar");
    });

    it("center position is set to the popup", function() {
        let tooltip = new Tooltip(container, {
            position: "center"
        });

        tooltip.show(container);

        assert.equal(tooltip.popup.options.position, "center center");
        assert.equal(tooltip.popup.options.origin, "center center");
    });

    it("popup width is 1px larger when no width option is set", function() {
        let tooltip = new Tooltip(container, {
            content: "content"
        });

        tooltip.show(container);
        assert.equal(kendo._outerWidth(tooltip.popup.element) + 1, tooltip.popup.wrapper.width());
    });

    it("width is set to the popup", function() {
        let tooltip = new Tooltip(container, {
            width: "100"
        });

        tooltip.show(container);
        assert.equal(tooltip.popup.element.outerWidth(), 100);
    });

    it("height is set to the popup", function() {
        let tooltip = new Tooltip(container, {
            height: "100"
        });

        tooltip.show(container);

        assert.equal(tooltip.popup.element.outerHeight(), 100);
    });

    it("callout is not rendered if center position", function() {
        let tooltip = new Tooltip(container, {
            callout: true,
            position: "center"
        });

        tooltip.show(container);

        assert.isOk(!tooltip.popup.wrapper.find(".k-callout").length);
    });

    it("callout is rendered if enabled", function() {
        let tooltip = new Tooltip(container, {
            callout: true
        });

        tooltip.show(container);

        assert.isOk(tooltip.popup.wrapper.find(".k-callout").length);
    });

    it("callout is rendered by default", function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        assert.isOk(tooltip.popup.wrapper.find(".k-callout").length);
    });

    it("callout is not rendered if not enabled", function() {
        let tooltip = new Tooltip(container, {
            callout: false
        });

        tooltip.show(container);

        assert.isOk(!tooltip.popup.wrapper.find(".k-callout").length);
    });

    it("open on click", function() {
        let tooltip = new Tooltip(container, {
            showOn: "click"
        });

        triggerEvent(container, "click");

        assert.isOk(tooltip.popup.visible());
    });

    it("hide method closes the popup", async function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        tooltip.hide();

        await vi.waitUntil(() => !tooltip.popup.visible());
        assert.isOk(!tooltip.popup.visible());
    });

    it("call hide method without opening the popup", function() {
        let tooltip = new Tooltip(container, {});

        tooltip.hide();
        assert.isOk(!tooltip.popup);
    });

    it("autoclose false does not hide the tooltip on mouseleave", function() {
        let tooltip = new Tooltip(container, {
            autoHide: false
        });
        tooltip.show(container);

        triggerEvent(container, "mouseleave");

        assert.isOk(tooltip.popup.visible());
    });

    it("autohide false renders a close button", function() {
        let tooltip = new Tooltip(container, {
            autoHide: false
        });

        tooltip.show(container);

        assert.isOk(tooltip.popup.element.find(".k-tooltip-button").length);
    });

    it("clicking the close button hides the tooltip", async function() {
        let tooltip = new Tooltip(container, {
            autoHide: false
        });

        tooltip.show(container);

        triggerEvent(tooltip.popup.element.find(".k-tooltip-button"), "click");

        await vi.waitUntil(() => !tooltip.popup.visible());
        assert.isOk(!tooltip.popup.visible());
    });

    it("animation options are passed to the popup", function() {
        let tooltip = new Tooltip(container, {
            animation: {
                open: {
                    effects: "foo"
                }
            }
        });
        tooltip.show(container);

        assert.equal(tooltip.popup.options.animation.open.effects, "foo");
    });

    it("pressing esc closes the tooltip", async function() {

        let tooltip = new Tooltip(container, {
        });
        tooltip.show(container);
        await vi.waitUntil(() => !tooltip.popup._hovered);
        container.press(kendo.keys.ESC);

        await vi.waitUntil(() => !tooltip.popup.visible());
        assert.isOk(!tooltip.popup.visible());
    });

    asyncTest("leaving the element closes the popup", function(done) {
        container.append('<span title="foo"></span><span></span>');

        let tooltip = new Tooltip(container, {
            filter: "[title]"
        });

        tooltip.show(container.find("[title]"));

        container.find("span").first().trigger("mouseleave");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, tooltip.options.hideAfter);
    });

    it("element without title clear the tooltip", function() {
        container.append('<span id="first" title="foo"></span><span id="second"></span>');

        let tooltip = new Tooltip(container, {
            filter: "span"
        });

        tooltip.show(container.find("[title]"));
        tooltip.show(container.find("#second"));

        assert.equal(tooltip.content.html(), "");
    });

    asyncTest("dont show popup when tooltip destroyed after mouseenter", function(done) {
        let tooltip = new Tooltip(container, { showAfter: 5 });

        triggerEvent(container, "mouseenter");
        tooltip.destroy();

        setTimeout(function() {
            done(() => assert.isOk(!(tooltip.popup && tooltip.popup.visible())));
        }, 10);
    });


    it("popup is resized based on content", function() {
        if (window.navigator.userAgent.includes('Firefox')) {
            this.skip();
        }
        else {
            let firstText = "foo";
            let secondText = "some very long text";

            container.append('<span id="first" title="' + firstText + '"></span><span id="second" title="' + secondText + '"></span>');

            let tooltip = new Tooltip(container, {
                filter: "span"
            });

            tooltip.show(container.find("#first"));

            let tempSpan = $("<span>" + firstText + "</span>").appendTo(Mocha.fixture);
            let actual = Math.round(tooltip.popup.element.width());
            let expected = Math.round(tempSpan.width());

            assert.closeTo(actual, expected, 2);

            tooltip.show(container.find("#second"));

            tempSpan.text(secondText);
            actual = Math.round(tooltip.popup.element.width());
            expected = Math.round(tempSpan.width());

            assert.equal(actual, 111);
            assert.equal(expected, 127);

            tempSpan.remove();
        }
    });

    asyncTest("is visible when mouse enters the popup", function(done) {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        triggerEvent(tooltip.popup.element, "mouseenter");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => tooltip.popup._hovered);
                assert.equal(tooltip.popup._hovered, true);
                assert.isOk(tooltip.popup.visible());
            });
        }, tooltip.options.hideAfter);
    });

    asyncTest("is hidden when mouse leaves the popup", function(done) {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        triggerEvent(tooltip.popup.element, "mouseleave");

        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, tooltip.options.hideAfter);
    });

    it("title attribute is restored on mouse leave from popup", async function() {
        container.attr("title", "foo");

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        triggerEvent(tooltip.popup.element, "mouseleave");

        await vi.waitUntil(() => container.attr("title") === "foo");
        assert.equal(container.attr("title"), "foo");
    });

    it("is initially offset at the edge of the anchor element", async function() {
        let tooltip = new Tooltip(container);
        let calloutDefaultBorderWidth = 6;
        let calloutPosition;
        let anchorPosition;

        tooltip.show(container);
        await vi.waitUntil(() => !tooltip.popup._hovered);

        anchorPosition = tooltip.popup.options.anchor.offset().top;
        calloutPosition = tooltip.popup.wrapper.find(".k-callout").offset().top + calloutDefaultBorderWidth;

        assert.equal(anchorPosition, calloutPosition);
    });

    it("can be offset from the anchor element", async function() {
        let tooltip = new Tooltip(container, { offset: 10 });
        let calloutDefaultBorderWidth = 6;
        let calloutPosition;
        let anchorPosition;

        tooltip.show(container);
        await vi.waitUntil(() => !tooltip.popup._hovered);

        anchorPosition = tooltip.popup.options.anchor.offset().top;
        calloutPosition = tooltip.popup.wrapper.find(".k-callout").offset().top + calloutDefaultBorderWidth;

        assert.equal(anchorPosition, calloutPosition - tooltip.options.offset);
    });


    asyncTest("hides tooltip on mouseout with hideAfter delay", function(done) {
        let tooltip = new Tooltip(container, { hideAfter: 50 });

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        setTimeout(function() {
            assert.isOk(tooltip.popup.visible());
        }, 20);
        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, 70);
    });

    asyncTest("hides tooltip on mouseout with hideAfter delay", function(done) {
        let tooltip = new Tooltip(container, { hideAfter: 50 });

        tooltip.show(container);
        triggerEvent(container, "mouseleave");

        setTimeout(function() {
            assert.isOk(tooltip.popup.visible());
        }, 20);
        setTimeout(function() {
            done(async() => {
                await vi.waitUntil(() => !tooltip.popup.visible());
                assert.isOk(!tooltip.popup.visible());
            });
        }, 70);
    });

    it("applies offset from the content of the tooltip when callout is not rendered", async function() {
        let tooltip = new Tooltip(container, { callout: false, offset: 10 });
        let tooltipElementPosition;
        let anchorPosition;

        tooltip.show(container);
        await vi.waitUntil(() => !tooltip.popup._hovered);

        anchorPosition = tooltip.popup.options.anchor.offset().top;
        tooltipElementPosition = tooltip.popup.wrapper.offset().top;

        assert.equal(anchorPosition, tooltipElementPosition - tooltip.options.offset);
    });

});
