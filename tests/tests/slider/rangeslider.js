import '@progress/kendo-ui/src/kendo.slider.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.bg-BG.js';
import { asyncTest } from '../../helpers/async-utils.js';

let RangeSlider = kendo.ui.RangeSlider;
let div = {};
let isDefaultPrevent;

describe("horizontal rangeslider", function() {
    beforeEach(function() {
        div = $("<div><input value='1'><input value='5'></div>");
        isDefaultPrevent = false;
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    function newRangeSlider(options, newDiv) {
        return new RangeSlider((newDiv || div).appendTo(Mocha.fixture)[0], options);
    }

    it("range slider should properly round decimals in the change event when using the keyboard", function() {
        let upArrow = "38", // up arrow
            downArrow = "40", // down arrow
            value = 0,
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 0, selectionEnd: 6, smallStep: 0.1, largeStep: 1, min: 0, max: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        rangeSlider.bind("change", function(e) {
            value = e.value;
        });
        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.1, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.2, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.3, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.4, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.3, 6]);
    });

    it("range slider should decrease value with a small step when down and left arrow keys are pressed", function() {
        let downArrow = "40", // down arrow
            leftArrow = "37", // left arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);
    });

    it("range slider should increase value with a small step when up and right arrow keys are pressed", function() {
        let upArrow = "38", // up arrow
            rightArrow = "39", // right arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);

        // right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);
    });

    it("range slider should increase value with a large step when page up key is pressed", function() {
        let pageUp = "33", // page up
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 6]);

        rangeSlider.values(3, 6);

        // right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 9]);
    });

    it("range slider should decrease value with a large step when page down key is pressed", function() {
        let pageDown = "34", // page down
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 3]);
    });

    it("range slider should increase value to maximum value when end key is pressed", function() {
        let end = "35", // end
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag hangle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [10, 10]);

        rangeSlider.values(6, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 10]);
    });

    it("range slider should decrease value to minimum value when home key is pressed", function() {
        let home = "36", // home
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 0]);
    });

    it("range slider should get values from the inputs", function() {
        let rangeSlider = newRangeSlider();

        assert.equal(rangeSlider.options.selectionStart, 1);
        assert.equal(rangeSlider.options.selectionEnd, 5);
    });

    it("range slider should get step from the input", function() {
        let rangeSlider = newRangeSlider({}, $("<div><input step='2' /><input /></div>"));

        assert.equal(rangeSlider.options.smallStep, 2);
    });

    it("range slider should get min from the input", function() {
        let rangeSlider = newRangeSlider({}, $("<div><input min='4' /><input /></div>"));

        assert.equal(rangeSlider.options.min, 4);
    });

    it("range slider should get max from the input", function() {
        let rangeSlider = newRangeSlider({}, $("<div><input max='5' /><input /></div>"));

        assert.equal(rangeSlider.options.max, 5);
    });

    it("range slider should set default value to the inputs", function() {
        let rangeSlider = newRangeSlider({}, $("<div><input /><input /></div>")),
            inputs = rangeSlider.element.find("input");

        assert.equal(inputs.eq(0).val(), 0);
        assert.equal(inputs.eq(1).val(), 10);
    });

    it("range slider should not have default values", function() {
        let rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input /><input /></div>")),
            inputs = rangeSlider.element.find("input");

        assert.equal(inputs.eq(0).val(), -2);
        assert.equal(inputs.eq(1).val(), 40);
    });

    it("range slider should get values from the inputs", function() {
        let rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input value='0' /><input value='0' /></div>")),
            inputs = rangeSlider.element.find("input");

        assert.equal(inputs.eq(0).val(), 0);
        assert.equal(inputs.eq(1).val(), 0);
    });

    it.skip("range slider resize should resize", function() {
        let rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input value='0' /><input value='0' /></div>"));

        let initialWidth = rangeSlider._trackDiv.width();
        rangeSlider.wrapper.width(400);
        rangeSlider.resize();
        let currentWidth = rangeSlider._trackDiv.width();
        assert.isOk(initialWidth != currentWidth);
    });

    it("range slider should render large ticks instead of small ticks", function() {
        let rangeSlider = newRangeSlider({ smallStep: 1, largeStep: 1 });
        rangeSlider.wrapper.find(".k-tick-large").each(function() {
            assert.isOk($(this).hasClass("k-tick-large"));
        });
    });

    it("range slider should not modify input value with bg-BG culture", function() {
        kendo.culture("bg-BG");
        let rangeSlider = newRangeSlider({}, $("<div><input value='2,2' /><input value='4,4' /></div>"));
        let inputs = rangeSlider.element.find("input");
        assert.equal(inputs.eq(0).val(), "2,2");
        assert.equal(inputs.eq(1).val(), "4,4");
        kendo.culture("en-US");
    });

    asyncTest("range slider should restore its original values on form reset", function(done) {
        Mocha.fixture.append('<form id="sliderForm" action=""><div id="rangeSlider"><input value="1" /><input value="9" /></div></form>');
        let rangeSlider = new RangeSlider($("#rangeSlider")[0], { tooltip: { enabled: false } });

        rangeSlider.values(2, 8);
        $("#sliderForm")[0].reset();

        setTimeout(function() {
            let values = rangeSlider.values();

            done(() => {
                assert.equal(values[0], 1);
                assert.equal(values[1], 9);
            });
        });
    });

    asyncTest("range slider should restore its min and max values on form reset when no initial values have been defined", function(done) {
        Mocha.fixture.append('<form id="sliderForm" action=""><div id="rangeSlider"><input /><input /></div></form>');
        let rangeSlider = new RangeSlider($("#rangeSlider")[0], { tooltip: { enabled: false }, min: 1, max: 9 });

        rangeSlider.values(2, 8);
        $("#sliderForm")[0].reset();

        setTimeout(function() {
            let values = rangeSlider.values();

            done(() => {
                assert.equal(values[0], 1);
                assert.equal(values[1], 9);
            });
        });
    });

});

describe("horizontal rangeslider rtl", function() {
    beforeEach(function() {
        div = $("<div class='k-rtl'><input value='1'><input value='5'></div>");
        isDefaultPrevent = false;
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    function newRangeSlider(options, newDiv) {
        return new RangeSlider((newDiv || div).appendTo(Mocha.fixture)[0], options);
    }

    it("rtl range slider should properly round decimals in the change event when using the keyboard", function() {
        let upArrow = "38", // up arrow
            downArrow = "40", // down arrow
            value = 0,
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 0, selectionEnd: 6, smallStep: 0.1, largeStep: 1, min: 0, max: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        rangeSlider.bind("change", function(e) {
            value = e.value;
        });
        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.1, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.2, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.3, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.4, 6]);

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(value, [0.3, 6]);
    });

    it("rtl range slider should decrease value with a small step when down and right arrow keys are pressed", function() {
        let downArrow = "40", // down arrow
            leftArrow = "39", // right arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);
    });

    it("rtl range slider should increase value with a small step when up and left arrow keys are pressed", function() {
        let upArrow = "38", // up arrow
            rightArrow = "37", // left arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);

        // right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);
    });

    it("rtl range slider should increase value with a large step when page up key is pressed", function() {
        let pageUp = "33", // page up
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 6]);

        rangeSlider.values(3, 6);

        // right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 9]);
    });

    it("rtl range slider should decrease value with a large step when page down key is pressed", function() {
        let pageDown = "34", // page down
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 3]);
    });

    it("rtl range slider should increase value to maximum value when end key is pressed", function() {
        let end = "35", // end
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag hangle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [10, 10]);

        rangeSlider.values(6, 6);

        //right drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 10]);
    });

    it("rtl range slider should decrease value to minimum value when home key is pressed", function() {
        let home = "36", // home
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        //left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        //right drag handle
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 0]);
    });
});

describe("vertical rangeslider", function() {
    beforeEach(function() {
        div = $("<div><input value='1'><input value='5'></div>");
        isDefaultPrevent = false;
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    function newRangeSlider(options, newDiv) {
        options = $.extend({}, { orientation: "vertical" }, options);
        return new RangeSlider((newDiv || div).appendTo(Mocha.fixture)[0], options);
    }

    it("vertical range slider should decrease value with a small step when down and left arrow keys are pressed", function() {
        let downArrow = "40", // down arrow
            leftArrow = "37", // left arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);
    });

    it("vertical range slider should increase value with a small step when up and right arrow keys are pressed", function() {
        let upArrow = "38", // up arrow
            rightArrow = "39", // right arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);
    });

    it("vertical range slider should increase value with a large step when page up key is pressed", function() {
        let pageUp = "33", // page up
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 9]);
    });

    it("vertical range slider should decrease value with a large step when page down key is pressed", function() {
        let pageDown = "34", // page down
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 3]);
    });

    it("vertical range slider should increase value to maximum value when end key is pressed", function() {
        let end = "35", // end
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag hangle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [10, 10]);

        rangeSlider.values(6, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 10]);
    });

    it("vertical range slider should decrease value to minimum value when home key is pressed", function() {
        let home = "36", // home
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 0]);
    });

});

describe("vertical rangeslider rtl", function() {
    beforeEach(function() {
        div = $("<div class='k-rtl'><input value='1'><input value='5'></div>");
        isDefaultPrevent = false;
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    function newRangeSlider(options, newDiv) {
        options = $.extend({}, { orientation: "vertical" }, options);
        return new RangeSlider((newDiv || div).appendTo(Mocha.fixture)[0], options);
    }

    it("rtl vertical range slider should decrease value with a small step when down and right arrow keys are pressed", function() {
        let downArrow = "40", // down arrow
            leftArrow = "39", // right arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [2, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: downArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: leftArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 5]);
    });

    it("rtl vertical range slider should increase value with a small step when up and left arrow keys are pressed", function() {
        let upArrow = "38", // up arrow
            rightArrow = "37", // left arrow
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [4, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: upArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);

        rangeSlider.values(3, 6);
        isDefaultPrevent = false;

        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: rightArrow,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 7]);
    });

    it("rtl vertical range slider should increase value with a large step when page up key is pressed", function() {
        let pageUp = "33", // page up
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // left drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageUp,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 9]);
    });

    it("rtl vertical range slider should decrease value with a large step when page down key is pressed", function() {
        let pageDown = "34", // page down
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6, largeStep: 3 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: pageDown,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [3, 3]);
    });

    it("rtl vertical range slider should increase value to maximum value when end key is pressed", function() {
        let end = "35", // end
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag hangle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [10, 10]);

        rangeSlider.values(6, 6);

        // top drag handle
        isDefaultPrevent = false;
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: end,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [6, 10]);
    });

    it("rtl vertical range slider should decrease value to minimum value when home key is pressed", function() {
        let home = "36", // home
            rangeSlider = newRangeSlider({ tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 }),
            dragHandles = rangeSlider.wrapper.find(".k-draghandle");

        // bottom drag handle
        dragHandles.eq(0).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 6]);

        rangeSlider.values(3, 6);

        // top drag handle
        dragHandles.eq(1).focus().trigger({
            type: "keydown",
            keyCode: home,
            preventDefault: function() {
                isDefaultPrevent = true;
            }
        });

        assert.isOk(isDefaultPrevent);
        assert.deepEqual(rangeSlider.values(), [0, 0]);
    });

});
