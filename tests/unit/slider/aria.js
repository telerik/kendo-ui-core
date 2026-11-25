import '@progress/kendo-ui/src/kendo.slider.js';

let Slider = kendo.ui.Slider,
    RangeSlider = kendo.ui.RangeSlider,
    input, div;

describe("accessibility with AXE", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it('Slider is accessible', async function() {
        input = $("<input value='1'>");
        input.appendTo(Mocha.fixture);

        let sl = new Slider(input[0], { value: 5, smallStep: 2 });

        await axeRunFixture();
    });

    it('RangeSlider is accessible', async function() {
        div = $("<div><input value='1'><input value='5'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div[0], { tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 });

        await axeRunFixture();
    });

    it('vertical Slider is accessible', async function() {
        input = $("<input value='1'>");
        input.appendTo(Mocha.fixture);

        let sl = new Slider(input[0], {
            value: 5,
            smallStep: 2,
            orientation: "vertical"
        });

        await axeRunFixture();
    });

    it('vertical RangeSlider is accessible', async function() {
        div = $("<div><input value='1'><input value='5'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div[0], {
            tooltip: { enabled: false },
            selectionStart: 3,
            selectionEnd: 6,
            orientation: "vertical"
        });

        await axeRunFixture();
    });
});

describe("slider WAI-ARIA", function() {
    beforeEach(function() {
        input = $("<input value='1'>");
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    function newSlider(options, newInput) {
        options = $.extend({}, { tooltip: { enabled: false } }, options);

        return new Slider((newInput || input).appendTo(Mocha.fixture)[0], options);
    }

    it('role is set to slider', function() {
        let slider = newSlider({ smallStep: 1 });

        assert.equal(slider.wrapper.find("[role='slider']").length, 1);
    });

    it('tab-index is taken from the increase and decrease buttons', function() {
        const DECREASE_SELECTOR = ".k-button-decrease";
        const INCREASE_SELECTOR = ".k-button-increase";

        let slider = newSlider({
            smallStep: 1,
            min: -10,
            max: 10
        });

        let increaseAttr = slider.wrapper
            .find(INCREASE_SELECTOR)
            .attr("tabindex");

        let decreaseAttr = slider.wrapper
            .find(DECREASE_SELECTOR)
            .attr("tabindex");

        assert.isOk(increaseAttr != undefined);
        assert.isOk(decreaseAttr != undefined);

        assert.equal(increaseAttr, -1);
        assert.equal(decreaseAttr, -1);
    });

    it('aria-hidden is taken from the increase and decrease buttons', function() {
        const DECREASE_SELECTOR = ".k-button-decrease";
        const INCREASE_SELECTOR = ".k-button-increase";

        let slider = newSlider({
            smallStep: 1,
            min: -10,
            max: 10
        });

        let increaseAttr = slider.wrapper
            .find(INCREASE_SELECTOR)
            .attr("aria-hidden");

        let decreaseAttr = slider.wrapper
            .find(DECREASE_SELECTOR)
            .attr("aria-hidden");

        assert.isOk(increaseAttr != undefined);
        assert.isOk(decreaseAttr != undefined);

        assert.equal(increaseAttr, "true");
        assert.equal(decreaseAttr, "true");
    });

    it('aria-valuenow is taken from the input element', function() {
        let slider = newSlider({
            smallStep: 1,
            min: -10,
            max: 10
        });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuenow"), "1");
    });

    it('aria-valuenow is taken from value option if set', function() {
        let slider = newSlider({
            smallStep: 1,
            value: 3,
            min: -10,
            max: 10
        });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuenow"), "3");
    });

    it('aria-valuemin is to 0 by default', function() {
        let slider = newSlider({ smallStep: 1, value: 3 });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemin"), "0");
    });

    it('aria-valuemin is to options.min', function() {
        let slider = newSlider({ smallStep: 1, value: 3, min: 1 });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemin"), "1");
    });

    it('aria-valuemax is to 10 by default', function() {
        let slider = newSlider({ smallStep: 1, value: 3 });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemax"), "10");
    });

    it('aria-valuemax is to options.max', function() {
        let slider = newSlider({ smallStep: 1, value: 3, max: 5 });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemax"), "5");
    });

    it('aria-valuetext is taken from value option if set', function() {
        let slider = newSlider({
            smallStep: 1,
            value: 3,
            min: -10,
            max: 10
        });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuetext"), "3");
    });

    it('title present by default', function() {
        let slider = newSlider({ smallStep: 1, value: 3 });

        assert.equal(slider.wrapper.find("[role='slider']").attr("title"), "drag");
    });

    it('title is set to dragHandleTitle', function() {
        let slider = newSlider({ smallStep: 1, value: 3, dragHandleTitle: "custom" });

        assert.equal(slider.wrapper.find("[role='slider']").attr("title"), "custom");
    });

    it('aria-orientation is set to vertical when slider is vertical', function() {
        let slider = newSlider({ smallStep: 1, value: 3, orientation: "vertical" });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-orientation"), "vertical");
    });

    it('tick list is hidden from assistive technologies', function() {
        let slider = newSlider({ smallStep: 1 });

        slider._maxSelection = 300;
        slider._sliderItemsInit();

        let items = slider.wrapper.find(".k-slider-items");

        assert.equal(items.length, 1);
        assert.equal(items.attr("aria-hidden"), "true");
        assert.isNotOk(items.attr("role"));
    });

    it('ticks have role presentation', function() {
        let slider = newSlider({ smallStep: 1 });

        slider._maxSelection = 300;
        slider._sliderItemsInit();

        let ticks = slider.wrapper.find(".k-tick");

        assert.isOk(ticks.length > 0);
        assert.equal(ticks.filter("[role='presentation']").length, ticks.length);
    });

    it('aria-disabled is not rendered when the slider is enabled', function() {
        let slider = newSlider({ smallStep: 1 });

        assert.isNotOk(slider.wrapper.find("[role='slider']").attr("aria-disabled"));
    });

    it('aria-disabled is rendered when the slider is initialized disabled', function() {
        let slider = newSlider({ smallStep: 1, enabled: false });

        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-disabled"), "true");
    });

    it('aria-disabled is toggled by enable', function() {
        let slider = newSlider({ smallStep: 1 });

        slider.enable(false);
        assert.equal(slider.wrapper.find("[role='slider']").attr("aria-disabled"), "true");

        slider.enable(true);
        assert.isNotOk(slider.wrapper.find("[role='slider']").attr("aria-disabled"));
    });

    it('aria-disabled is rendered on both handles of a disabled RangeSlider and removed on enable', function() {
        div = $("<div><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, enabled: false, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.filter("[aria-disabled='true']").length, 2);

        rs.enable();

        assert.equal(handles.filter("[aria-disabled]").length, 0);
    });

    it('RangeSlider handles are named by the aria-label of their inputs', function() {
        div = $("<div><input aria-label='Minimum price'><input aria-label='Maximum price'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-label"), "Minimum price");
        assert.equal(handles.eq(1).attr("aria-label"), "Maximum price");
    });

    it('RangeSlider handles use the aria-labelledby of their inputs', function() {
        div = $("<div><input aria-labelledby='first'><input aria-labelledby='second'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-labelledby"), "first");
        assert.equal(handles.eq(1).attr("aria-labelledby"), "second");
    });

    it('RangeSlider handles copy both aria-label and aria-labelledby of their inputs', function() {
        div = $("<div><input aria-label='Minimum' aria-labelledby='first'><input aria-label='Maximum' aria-labelledby='second'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-label"), "Minimum");
        assert.equal(handles.eq(0).attr("aria-labelledby"), "first");
        assert.equal(handles.eq(1).attr("aria-label"), "Maximum");
        assert.equal(handles.eq(1).attr("aria-labelledby"), "second");
    });

    it('RangeSlider handles use the label elements of their inputs', function() {
        div = $("<div><label for='rs-min' id='rs-min-label'>Min</label><input id='rs-min'><label for='rs-max'>Max</label><input id='rs-max'></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-labelledby"), "rs-min-label");
        assert.equal(handles.eq(1).attr("aria-labelledby"), $("label[for='rs-max']").attr("id"));
        assert.isOk(handles.eq(1).attr("aria-labelledby"));
    });

    it('RangeSlider does not throw for input ids with an apostrophe and still uses aria-label', function() {
        div = $("<div><input id=\"price'min\" aria-label='Minimum price'><input id=\"price'max\"></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-label"), "Minimum price");
        assert.isNotOk(handles.eq(1).attr("aria-label"));
    });

    it('RangeSlider uses the label elements of inputs whose id has an apostrophe', function() {
        div = $("<div><label for=\"price'min\">Min</label><input id=\"price'min\"><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-labelledby"), div.find("label").attr("id"));
        assert.isOk(handles.eq(0).attr("aria-labelledby"));
    });

    it('RangeSlider handle references all label elements of its input with unique ids', function() {
        div = $("<div><label for='rs-a' id='rs-a-existing'>Price</label><label for='rs-a'>Minimum</label><label for='rs-a'>In USD</label><input id='rs-a'><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let labels = div.find("label");
        let ids = labels.map(function() { return this.id; }).get();

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-labelledby"), ids.join(" "));
        assert.equal(ids.length, 3);
        assert.equal(new Set(ids).size, 3);
        assert.isOk(ids.every(function(id) { return !!id; }));
    });

    it('RangeSlider generated label ids do not collide with existing ids in the document', function() {
        div = $("<div><label for='rs-a' id='rs-a-1_label'>Price</label><label for='rs-a'>Minimum</label><label for='rs-a'>In USD</label><input id='rs-a'><input></div>");
        div.appendTo(Mocha.fixture);
        $("<span id='rs-a_label'>Other</span>").appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let ids = div.find("label").map(function() { return this.id; }).get();
        let ownerOfId = function(id) { return $(Mocha.fixture).find("[id='" + id + "']").length; };

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-labelledby"), ids.join(" "));
        assert.equal(ids[0], "rs-a-1_label");
        assert.equal(new Set(ids).size, 3);
        assert.isOk(ids.every(function(id) { return ownerOfId(id) === 1; }));
    });

    it('RangeSlider uses label elements of a detached tree initialized before attachment', function() {
        div = $("<div id='detached-root'><label for='rs-d'>Detached</label><div id='detached-rs'><input id='rs-d'><input></div></div>");

        let rs = new RangeSlider(div.find("#detached-rs"), { smallStep: 1, tooltip: { enabled: false } });

        div.appendTo(Mocha.fixture);

        let label = div.find("label");
        let handles = rs.wrapper.find("[role='slider']");

        assert.isOk(label.attr("id"));
        assert.equal(handles.eq(0).attr("aria-labelledby"), label.attr("id"));
        assert.isNotOk(handles.eq(1).attr("aria-labelledby"));
    });

    it('RangeSlider ignores labels of another tree with the same for value', function() {
        let attachedLabel = $("<label for='rs-d'>Attached</label>").appendTo(Mocha.fixture);
        div = $("<div><div id='detached-rs'><input id='rs-d'><input></div></div>");

        let rs = new RangeSlider(div.find("#detached-rs"), { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.isNotOk(handles.eq(0).attr("aria-labelledby"));
        assert.isNotOk(attachedLabel.attr("id"));
    });

    it('RangeSlider uses only the labels of its own detached tree when ids are reused', function() {
        let attachedLabel = $("<label for='rs-d'>Attached</label>").appendTo(Mocha.fixture);
        div = $("<div><label for='rs-d'>Detached</label><div id='detached-rs'><input id='rs-d'><input></div></div>");

        let rs = new RangeSlider(div.find("#detached-rs"), { smallStep: 1, tooltip: { enabled: false } });
        let label = div.find("label");

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-labelledby"), label.attr("id"));
        assert.isNotOk(attachedLabel.attr("id"));
    });

    it('RangeSlider lists a label of the document once when the root is the document', function() {
        div = $("<div><label for='rs-e' id='rs-e-label'>Attached</label><input id='rs-e'><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-labelledby"), "rs-e-label");
    });

    it('RangeSlider handles fall back to the aria-label of the element', function() {
        div = $("<div aria-label='Price'><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-label"), "Price");
        assert.equal(handles.eq(1).attr("aria-label"), "Price");
    });

    it('RangeSlider handles fall back to the aria-labelledby of the element', function() {
        div = $("<div aria-labelledby='group'><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-labelledby"), "group");
        assert.equal(handles.eq(1).attr("aria-labelledby"), "group");
    });

    it('input labels take precedence over the label of the element', function() {
        div = $("<div aria-label='Price'><input aria-label='Minimum'><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.equal(handles.eq(0).attr("aria-label"), "Minimum");
        assert.equal(handles.eq(1).attr("aria-label"), "Price");
    });

    it('RangeSlider handles have no aria-label when nothing is labelled and are named by the title', function() {
        div = $("<div><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, { smallStep: 1, tooltip: { enabled: false } });
        let handles = rs.wrapper.find("[role='slider']");

        assert.isNotOk(handles.eq(0).attr("aria-label"));
        assert.isNotOk(handles.eq(0).attr("aria-labelledby"));
        assert.equal(handles.eq(0).attr("title"), "drag");
        assert.equal(handles.eq(1).attr("title"), "drag");
    });
    it('aria-valuenow is taken from selectionStart and selectionEnd of RangeSlider', function() {
        div = $("<div><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, {
            smallStep: 1,
            selectionStart: 0,
            selectionEnd: 3,
            min: -10,
            max: 10
        });

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-valuenow"), "0");
        assert.equal(rs.wrapper.find("[role='slider']").eq(1).attr("aria-valuenow"), "3");
    });

    it('aria-valuetext is taken from selectionStart and selectionEnd of RangeSlider', function() {
        div = $("<div><input><input></div>");
        div.appendTo(Mocha.fixture);

        let rs = new RangeSlider(div, {
            smallStep: 1,
            selectionStart: 0,
            selectionEnd: 3,
            min: -10,
            max: 10
        });

        assert.equal(rs.wrapper.find("[role='slider']").eq(0).attr("aria-valuetext"), "0 - 3");
        assert.equal(rs.wrapper.find("[role='slider']").eq(1).attr("aria-valuetext"), "0 - 3");
    });
});
