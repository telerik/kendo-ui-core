import '@progress/kendo-ui/src/kendo.tooltip.js';

let container,
    Tooltip = kendo.ui.Tooltip;

describe("kendo.ui.tooltip aria with AXE", function() {
    beforeEach(function() {
        $.fn.press = function(key, ctrl, shift, alt) {
            return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
        };

        container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (container.data("kendoTooltip")) {
            container.kendoTooltip("destroy");
        }

        container.remove();
    });

    it("tooltip is accessible", async function() {
        let tooltip = new Tooltip(container, {
            content: "test"
        });

        tooltip.show(container);

        await axeRun(tooltip.popup.element.parent()[0]);
    });

    it("tooltip context is accessible", async function() {
        let tooltip = new Tooltip(container, {
            iframe: true,
            content: "test"
        });

        tooltip.show(container);

        await axeRunFixture();
    });
});

describe("kendo.ui.tooltip aria", function() {
    beforeEach(function() {

        $.fn.press = function(key, ctrl, shift, alt) {
            return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
        };

        container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
    });

    afterEach(function() {

        if (container.data("kendoTooltip")) {
            container.kendoTooltip("destroy");
        }

        container.remove();
    });

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    }

    it("tooltip role is assign to the popup container", function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        assert.equal(tooltip.popup.element.attr("role"), "tooltip");
    });

    it("described by attribute is added to the element", async function() {
        container.attr("id", "foo");

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        await vi.waitUntil(() => container.attr("aria-describedby") === "foo_tb_active");

        assert.equal(container.attr("aria-describedby"), "foo_tb_active");
    });

    it("described by attribute is added to the already existing described by", async function() {
        container.attr({
            "id": "foo",
            "aria-describedby": "test"
        });

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        await vi.waitUntil(() => container.attr("aria-describedby") === "test foo_tb_active");

        assert.equal(container.attr("aria-describedby"), "test foo_tb_active");
    });

    it("described by attribute is removed from the already existing described by", async function() {
        container.attr({
            "id": "foo",
            "aria-describedby": "test"
        });

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        tooltip.hide();

        await vi.waitUntil(() => container.attr("aria-describedby") === "test");

        assert.equal(container.attr("aria-describedby"), "test");
    });

    it("id attribute is added to the popup", async function() {
        container.attr("id", "foo");

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);

        await vi.waitUntil(() => tooltip.popup.element.attr("id") === "foo_tb_active");

        assert.equal(tooltip.popup.element.attr("id"), "foo_tb_active");
    });

    it("id attribute is removed from the popup on hide", async function() {
        container.attr("id", "foo");

        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        tooltip.hide();

        await vi.waitUntil(() => !tooltip.popup.element.filter("[id]").length);

        assert.isOk(!tooltip.popup.element.filter("[id]").length);
    });

    it("element id for the described by attribute is used if set", async function() {
        container.append($('<span id="first"></span><span id="second"></span>'));

        let tooltip = new Tooltip(container, {
            filter: "span"
        }),
            first = container.find("span:first");

        tooltip.show(first);

        await vi.waitUntil(() => first.attr("aria-describedby") === "first_tb_active");

        assert.equal(first.attr("aria-describedby"), "first_tb_active");
    });

    it("popup hide removes described by attribute", async function() {
        container.attr("id", "foo");
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        tooltip.hide();

        await vi.waitUntil(() => !container.filter("[aria-describedby]").length);
        assert.isOk(!container.filter("[aria-describedby]").length);
    });

    it("aria hidden is set when popup is not visible", async function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        tooltip.hide();

        await vi.waitUntil(() => tooltip.popup.element.filter("[aria-hidden=true]").length);
    });

    it("aria hidden is removed when popup is visible", async function() {
        let tooltip = new Tooltip(container, {});

        tooltip.show(container);
        await vi.waitUntil(() => tooltip.popup.visible());
        tooltip.hide();
        await vi.waitUntil(() => !tooltip.popup.visible());
        tooltip.show(container);

        await vi.waitUntil(() => !tooltip.popup.element.filter("[aria-hidden=true]").length);
    });
});
