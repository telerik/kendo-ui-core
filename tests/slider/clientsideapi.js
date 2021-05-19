(function() {

    var Slider = kendo.ui.Slider;

    function newSlider(options, sliderInput) {
        var input = $(sliderInput || "<input id='slider'>").appendTo(Mocha.fixture)[0];
        return new Slider(input, options);
    }

    describe("slider api", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("value should set slider value", function() {
            var slider = newSlider();

            slider.value(9);

            assert.equal(slider.value(), 9);
        });

        it("min method should get min value", function() {
            var slider = newSlider();

            assert.equal(slider.min(), 0);
        });

        it("max method should get max value", function() {
            var slider = newSlider();

            assert.equal(slider.max(), 10);
        });

        it("min method should set min value", function() {
            var slider = newSlider();

            slider.min(5);

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").first().attr("title"), "5");
        });

        it("max method should set max value", function() {
            var slider = newSlider();

            slider.max(15);

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").last().attr("title"), "15");
        });

        it("setOptions min should set min value", function() {
            var slider = newSlider();

            slider.setOptions({ "min": 5 });

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").first().attr("title"), "5");
        });

        it("setOptions max should set max value", function() {
            var slider = newSlider();

            slider.setOptions({ "max": 15 });

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").last().attr("title"), "15");
        });

        it("setOptions smallStep should set smallStep value", function() {
            var slider = newSlider();

            slider.setOptions({ "smallStep": 2 });

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").eq(1).attr("title"), "2");
        });

        it("setOptions largeStep should set largeStep value", function() {
            var slider = newSlider();

            slider.setOptions({ "largeStep": 2 });

            assert.equal(slider.element.parent().find(".k-slider-items").children("li").eq(2).hasClass("k-tick-large"), true);
        });

        it("value should not be null or empty string and should return old value", function() {
            var slider = newSlider();

            slider.value(2);

            slider.value(" ");

            assert.equal(slider.value(), 2);

            slider.value(null);

            assert.equal(slider.value(), 2);
        });

        it("value should be in range", function() {
            var slider = newSlider();
            $.extend(slider.options, {
                precision: 4,
                smallStep: 0.0001,
                largeStep: 0.0001,
                min: 0,
                max: 0.0004,
                value: 0.0002,
                tooltip: {
                    format: "{0:#,#.####}"
                }
            });

            assert.equal(slider.value(), 0.0002);
        });

        it("precision is correctly calculated", function() {
            var slider = newSlider();
            $.extend(slider.options, { showButtons: false });

            slider.value(11);

            assert.equal(slider.value(), 0);

            slider.value(-1);

            assert.equal(slider.value(), 0);
        });

        it("value should update slider selectionDiv", function() {
            var slider = newSlider();

            var selectionDiv = slider.wrapper.find(".k-slider-selection");

            slider.value(10);

            assert.equal(selectionDiv.width(), 130);
        });

        it("value should be in range", function() {
            var slider = newSlider();

            var selectionDiv = slider.wrapper.find(".k-slider-selection");

            slider.value(11);

            assert.equal(selectionDiv.width(), 0);

            slider.value(-1);

            assert.equal(selectionDiv.width(), 0);
        });

        it("when value is string slider should set slider value", function() {
            var slider = newSlider();

            slider.value("1");

            assert.equal(1, slider.value());
        });

        it("value should not trigger change event", function() {
            var result = true;
            var change = function(e) {
                result = false;
            };

            var slider = newSlider({ "change": change });

            slider.value(5);

            assert.isOk(result);
        });

        it("slider init should not trigger change event", function() {
            var result = true;
            var change = function(e) {
                result = false;
            };

            newSlider({ "change": change, min: 2 });

            assert.isOk(result);
        });

        it("value should set value to the input", function() {
            var slider = newSlider({ value: 1 });

            var value = 2;

            slider.value(value);

            assert.equal(slider.element.val(), value);
        });

        it("value should alter in change event handler", function() {
            var rightArrow = kendo.keys.RIGHT,
                slider = newSlider({
                    "change": function(e) {
                        e.sender.value(3);
                    }
                }),
                dragHandle = slider.wrapper.find(".k-draghandle").focus();

            dragHandle.trigger({ type: "keydown", keyCode: rightArrow });

            assert.equal(slider.value(), 3);
        });

        it("enabled with false should disable slider", function() {
            var slider = newSlider({ enabled: false });

            assert.isOk(slider.element.is("[disabled]"));
            assert.isOk(!slider.options.enabled);

            assert.equal(slider.wrapper.find(".k-draghandle").attr("tabindex"), -1);
        });

        it("disabled attribute should disable slider", function() {
            var slider = newSlider({}, "<input disabled='disabled' />");

            assert.isOk(slider.element.is("[disabled]"));
            assert.isOk(!slider.options.enabled);
        });

        it("enable method with false should disable slider", function() {
            var slider = newSlider();

            slider.disable(false);

            assert.isOk(slider.element.is("[disabled]"));
            assert.isOk(!slider.options.enabled);
        });

        it("enable method with true should enable slider", function() {
            var slider = newSlider();

            slider.enable(true);

            assert.isOk(!slider.element.attr("disabled"));
            assert.isOk(slider.options.enabled);

            assert.equal(slider.wrapper.find(".k-draghandle").attr("tabindex"), 0);
        });

        it("disable method should disable slider", function() {
            var slider = newSlider();

            slider.disable();

            assert.isOk(slider.element.is("[disabled]"));
            assert.isOk(!slider.options.enabled);
        });

        it("enable method should enable slider", function() {
            var slider = newSlider();

            slider.enable();

            assert.isOk(!slider.element.attr("disabled"));
            assert.isOk(slider.options.enabled);
        });

        it("disable method should add state disabled to the slider", function() {
            var slider = newSlider();

            slider.disable();

            assert.isOk(slider.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method should remove state disabled from the slider", function() {
            var slider = newSlider();

            slider.enable();

            assert.isOk(!slider.wrapper.hasClass("k-state-disabled"));
        });

        it("refresh method should not select minimum when slider increase his value from -1 to 0", function() {
            var slider = newSlider({ showButtons: true, min: -5, value: -1 });

            slider.value(0);

            assert.isOk(slider.value, 0);
        });

        it('slider should not trigger change if we decrease value with 1 step and value is equal to min value', function() {
            var downArrow = kendo.keys.DOWN,
                leftArrow = kendo.keys.LEFT,
                result = true;

            var change = function(e) {
                result = false;
            };

            var slider = newSlider({ "change": change, value: 0 }),
                dragHandle = slider.wrapper.find(".k-draghandle").focus();

            dragHandle.trigger({ type: "keydown", keyCode: downArrow });
            dragHandle.trigger({ type: "keydown", keyCode: leftArrow });

            assert.isOk(result);
        });
    });

    var slider;

    describe("slider destroy", function() {
        beforeEach(function() {
            slider = newSlider();
            slider.destroy();
        });

        it("removes data", function() {
            assert.isOk(!$("#slider").data("kendoSlider"));
        });

        it("unbinds events", function() {
            assert.isOk(!(slider._events || {}).slide);
        });

        it("unbinds mousedown", function() {
            assert.isOk(!($(".k-slider").data("events") || {}).mousedown);
        });
    });

    // ------------------------------------------------------------
    var RangeSlider = kendo.ui.RangeSlider;

    function newRangeSlider(options, sliderDiv) {
        var div = $(sliderDiv || "<div id='rangeslider'><input /><input /></div>").appendTo(Mocha.fixture);
        return new RangeSlider(div, options);
    }

    describe("rangeslider api", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("values should set rangeSlider selectionStart and selectionEnd", function() {
            var rangeSlider = newRangeSlider(),
                values = [0, 9];

            rangeSlider.values(values);

            assert.deepEqual(rangeSlider.value(), values);
        });

        it("value should set rangeSlider selectionStart and selectionEnd", function() {
            var rangeSlider = newRangeSlider(),
                values = [0, 9];

            rangeSlider.value(values);

            assert.deepEqual(rangeSlider.value(), values);
        });

        it("values should return array of selectionStart and selectionEnd", function() {
            var rangeSlider = newRangeSlider(),
                values = [0, 9];

            rangeSlider.values(values);

            assert.isOk(values instanceof Array);
        });

        it("values should not be null or empty string and should return old values", function() {
            var selectionStart = 1,
                selectionEnd = 3,
                rangeSlider = newRangeSlider({ selectionStart: selectionStart, selectionEnd: selectionEnd });

            rangeSlider.values(" ");

            assert.deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);

            rangeSlider.values(null);

            assert.deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);
        });

        it("values should be in range", function() {
            var selectionStart = 1,
                selectionEnd = 3,
                rangeSlider = newRangeSlider({ selectionStart: selectionStart, selectionEnd: selectionEnd });

            rangeSlider.values(-1, 11);

            assert.deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);
        });

        it("values should set rangeSlider position selectionDiv", function() {
            var rangeSlider = newRangeSlider();

            var selectionDiv = rangeSlider.wrapper.find(".k-slider-selection");

            rangeSlider.values(0, 10);

            assert.equal(selectionDiv.width(), 198);
        });

        it("values should not trigger change event", function() {
            var result = true;
            var change = function(e) {
                result = false;
            };

            var rangeSlider = newRangeSlider({ "change": change });

            rangeSlider.values(1, 3);
            assert.isOk(result);
        });

        it("init should not trigger change event", function() {
            var result = true;
            var change = function(e) {
                result = false;
            };

            newRangeSlider({ "change": change, min: -1, max: 20 });
            assert.isOk(result);
        });

        it("values should set values to the inputs", function() {
            var rangeSlider = newRangeSlider(),
                selectionStart = 2,
                selectionEnd = 5;

            rangeSlider.values(selectionStart, selectionEnd);

            var inputs = rangeSlider.element.find("input");

            assert.equal(inputs.eq(0).val(), selectionStart);
            assert.equal(inputs.eq(1).val(), selectionEnd);
        });

        it("values should set selectionStart and selectionEnd values from string parameters", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.values("1", "2");

            assert.deepEqual(rangeSlider.values(), [1, 2]);
        });

        it("values should set z-index to first handle", function() {
            var rangeSlider = newRangeSlider(),
                dragHandles = rangeSlider.wrapper.find(".k-draghandle"),
                firstDragHandle = dragHandles.eq(0);

            rangeSlider.values(10, 10);

            assert.equal(firstDragHandle.css("z-index"), 1);
        });

        it("enabled with false should disable range slider", function() {
            var rangeSlider = newRangeSlider({ enabled: false });

            assert.isOk(rangeSlider.element.find("input").is("[disabled]"));
            assert.isOk(!rangeSlider.options.enabled);

            assert.equal(rangeSlider.wrapper.find(".k-draghandle").eq(0).attr("tabindex"), -1);
            assert.equal(rangeSlider.wrapper.find(".k-draghandle").eq(1).attr("tabindex"), -1);
        });

        it("disabled attribute should disable range slider", function() {
            var rangeSlider = newRangeSlider({}, "<div><input disabled='disabled' /><input disabled='disabled' /></div>");

            assert.isOk(rangeSlider.element.find("input").is("[disabled]"));
            assert.isOk(!rangeSlider.options.enabled);
        });

        it("enable method with false should disable range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.disable(false);

            assert.isOk(rangeSlider.element.find("input").is("[disabled]"));
            assert.isOk(!rangeSlider.options.enabled);
        });

        it("enable method with true should enable range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.enable(true);

            assert.isOk(!rangeSlider.element.find("input").attr("disabled"));
            assert.isOk(rangeSlider.options.enabled);
        });

        it("disable method should disable range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.disable();

            assert.isOk(rangeSlider.element.find("input").is(":disabled"));
            assert.isOk(!rangeSlider.options.enabled);
        });

        it("enable method should enable range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.enable();

            assert.isOk(!rangeSlider.wrapper.attr("disabled"));
            assert.isOk(rangeSlider.options.enabled);
        });

        it("disable method should add state disabled to the range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.disable();

            assert.isOk(rangeSlider.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method should remove state disabled from the range slider", function() {
            var rangeSlider = newRangeSlider();

            rangeSlider.enable();

            assert.isOk(!rangeSlider.wrapper.hasClass("k-state-disabled"));

            assert.equal(rangeSlider.wrapper.find(".k-draghandle").eq(0).attr("tabindex"), 0);
            assert.equal(rangeSlider.wrapper.find(".k-draghandle").eq(1).attr("tabindex"), 0);
        });

        it('range slider should not trigger change if we decrease selectionStart with 1 step and selectionStart is equal to min value', function() {
            var downArrow = kendo.keys.down,
                leftArrow = kendo.keys.left,
                result = true;

            var change = function(e) {
                result = false;
            };

            var rangeSlider = newRangeSlider({ change: change, selectionStart: 10, selectionEnd: 10 }),
                dragHandles = rangeSlider.wrapper.find(".k-draghandle");

            dragHandles.eq(0).trigger({ type: "keydown", keyCode: downArrow });
            dragHandles.eq(0).trigger({ type: "keydown", keyCode: leftArrow });

            assert.isOk(result);
        });
    });

    var rangeSider;

    describe("rangeslider destroy", function() {
        beforeEach(function() {
            rangeSider = newRangeSlider();
            rangeSider.destroy();
        });

        it("removes data", function() {
            assert.isOk(!$("#rangeslider").data("kendoRangeSlider"));
        });

        it("unbinds events", function() {
            assert.isOk(!(rangeSider._events || {}).slide);
        });

        it("unbinds mousedown", function() {
            assert.isOk(!($(".k-slider").data("events") || {}).mousedown);
        });

    });
}());
