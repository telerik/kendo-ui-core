(function() {
    var container,
        Tooltip = kendo.ui.Tooltip;

    describe("kendo.ui.tooltip aria with AXE", function() {
        beforeEach(function() {
            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
            }

            container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoTooltip")) {
                container.kendoTooltip("destroy");
            }

            container.remove();
        });

        it("tooltip is accessible", function(done) {
            var tooltip = new Tooltip(container, {
                content: "test"
            });

            tooltip.show(container);

            axeRun(tooltip.popup.element.parent()[0], done);
        });

        it("tooltip context is accessible", function(done) {
            var tooltip = new Tooltip(container, {
                iframe: true,
                content: "test"
            });

            tooltip.show(container);

            axeRunFixture(done);
        });
    });

    describe("kendo.ui.tooltip aria", function() {
        beforeEach(function() {

            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
            }

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
        };

        it("tooltip role is assign to the popup container", function() {
            var tooltip = new Tooltip(container, {});

            tooltip.show(container);

            assert.equal(tooltip.popup.element.attr("role"), "tooltip");
        });

        it("described by attribute is added to the element", function() {
            container.attr("id", "foo");

            var tooltip = new Tooltip(container, {});

            tooltip.show(container);

            assert.equal(container.attr("aria-describedby"), "foo_tt_active");
        });

        it("described by attribute is added to the already existing described by", function() {
            container.attr({
                "id": "foo",
                "aria-describedby": "test"
            });

            var tooltip = new Tooltip(container, {});

            tooltip.show(container);

            assert.equal(container.attr("aria-describedby"), "test foo_tt_active");
        });

        it("described by attribute is removed from the already existing described by", function() {
            container.attr({
                "id": "foo",
                "aria-describedby": "test"
            });

            var tooltip = new Tooltip(container, {});

            tooltip.show(container);
            tooltip.hide();

            assert.equal(container.attr("aria-describedby"), "test");
        });

        it("id attribute is added to the popup", function() {
            container.attr("id", "foo");

            var tooltip = new Tooltip(container, {});

            tooltip.show(container);

            assert.equal(tooltip.popup.element.attr("id"), "foo_tt_active");
        });

        it("id attribute is removed from the popup on hide", function() {
            container.attr("id", "foo");

            var tooltip = new Tooltip(container, {});

            tooltip.show(container);
            tooltip.hide();

            assert.isOk(!tooltip.popup.element.filter("[id]").length);
        });

        it("element id for the described by attribute is used if set", function() {
            container.append($('<span id="first"></span><span id="second"></span>'));

            var tooltip = new Tooltip(container, {
                filter: "span"
            }),
                first = container.find("span:first");

            tooltip.show(first);

            assert.equal(first.attr("aria-describedby"), "first_tt_active");
        });

        it("popup hide removes described by attribute", function() {
            container.attr("id", "foo");
            var tooltip = new Tooltip(container, {});

            tooltip.show(container);
            tooltip.hide();
            assert.isOk(!container.filter("[aria-describedby]").length);
        });

        it("aria hidden is set when popup is not visible", function() {
            var tooltip = new Tooltip(container, {});

            tooltip.show(container);
            tooltip.hide();
            assert.isOk(tooltip.popup.element.filter("[aria-hidden=true]").length);
        });

        it("aria hidden is removed when popup is visible", function() {
            var tooltip = new Tooltip(container, {});

            tooltip.show(container);
            tooltip.hide();
            tooltip.show(container);
            assert.isOk(!tooltip.popup.element.filter("[aria-hidden=true]").length);
        });
    });
}());
