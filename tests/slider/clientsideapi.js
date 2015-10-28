(function(){

var Slider = kendo.ui.Slider;

module("slider api", {
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

function newSlider(options, sliderInput) {
    var input = $(sliderInput || "<input id='slider'>").appendTo(QUnit.fixture)[0];
    return new Slider(input, options);
}

test("value should set slider value", function() {
    var slider = newSlider();

    slider.value(9);

    equal(slider.value(), 9);
});

test("value should not be null or empty string and should return old value", function() {
    var slider = newSlider();

    slider.value(2)

    slider.value(" ");

    equal(slider.value(), 2);

    slider.value(null);

    equal(slider.value(), 2);
});

test("value should be in range", function() {
    var slider = newSlider();
    $.extend(slider.options, {
        precision: 4,
        smallStep:0.0001,
        largeStep:0.0001,
        min:0,
        max:0.0004,
        value: 0.0002,
        tooltip: {
          format: "{0:#,#.####}"
        }
    });

    equal(slider.value(), 0.0002);
});

test("precision is correctly calculated", function() {
    var slider = newSlider();
    $.extend(slider.options, { showButtons: false });

    slider.value(11);

    equal(slider.value(), 0);

    slider.value(-1);

    equal(slider.value(), 0);
});

test("value should update slider selectionDiv", function () {
    var slider = newSlider();

    var selectionDiv = slider.wrapper.find(".k-slider-selection");

    slider.value(10);

    equal(selectionDiv.width(), 130);
});

test("value should be in range", function() {
    var slider = newSlider();

    var selectionDiv = slider.wrapper.find(".k-slider-selection");

    slider.value(11);

    equal(selectionDiv.width(), 0);

    slider.value(-1);

    equal(selectionDiv.width(), 0);
});

test("when value is string slider should set slider value", function() {
    var slider = newSlider();

    slider.value("1");

    equal(1, slider.value());
});

test("value should not trigger change event", function() {
    var result = true;
    var change = function (e) {
        result = false;
    };

    var slider = newSlider({ "change": change });

    slider.value(5);

    ok(result);
});

test("slider init should not trigger change event", function() {
    var result = true;
    var change = function (e) {
        result = false;
    };

    newSlider({ "change": change, min: 2 });

    ok(result);
});

test("value should set value to the input", function() {
    var slider = newSlider({ value: 1 });

    var value = 2;

    slider.value(value);

    equal(slider.element.val(), value);
});

test("enabled with false should disable slider", function () {
    var slider = newSlider({ enabled: false });

    ok(slider.element.is("[disabled]"));
    ok(!slider.options.enabled);

    equal(slider.wrapper.find(".k-draghandle").attr("tabindex"), -1);
});

test("disabled attribute should disable slider", function () {
    var slider = newSlider({}, "<input disabled='disabled' />");

    ok(slider.element.is("[disabled]"));
    ok(!slider.options.enabled);
});

test("enable method with false should disable slider", function () {
    var slider = newSlider();

    slider.disable(false);

    ok(slider.element.is("[disabled]"));
    ok(!slider.options.enabled);
});

test("enable method with true should enable slider", function () {
    var slider = newSlider();

    slider.enable(true);

    ok(!slider.element.attr("disabled"));
    ok(slider.options.enabled);

    equal(slider.wrapper.find(".k-draghandle").attr("tabindex"), 0);
});

test("disable method should disable slider", function () {
    var slider = newSlider();

    slider.disable();

    ok(slider.element.is("[disabled]"));
    ok(!slider.options.enabled);
});

test("enable method should enable slider", function () {
    var slider = newSlider();

    slider.enable();

    ok(!slider.element.attr("disabled"));
    ok(slider.options.enabled);
});

test("disable method should add state disabled to the slider", function () {
    var slider = newSlider();

    slider.disable();

    ok(slider.wrapper.hasClass("k-state-disabled"));
});

test("enable method should remove state disabled from the slider", function () {
    var slider = newSlider();

    slider.enable();

    ok(!slider.wrapper.hasClass("k-state-disabled"));
});

test("refresh method should not select minimum when slider increase his value from -1 to 0", function () {
    var slider = newSlider({ showButtons: true, min: -5, value: -1 });

    slider.value(0)

    ok(slider.value, 0);
});

test('slider should not trigger change if we decrease value with 1 step and value is equal to min value', function () {
    var downArrow = kendo.keys.DOWN,
        leftArrow = kendo.keys.LEFT,
        result = true;

    var change = function (e) {
        result = false;
    };

    var slider = newSlider({ "change": change, value: 0 }),
        dragHandle = slider.wrapper.find(".k-draghandle").focus();

    dragHandle.trigger({ type: "keydown", keyCode: downArrow });
    dragHandle.trigger({ type: "keydown", keyCode: leftArrow });

    ok(result);
});

var slider;

module("slider destroy", {
    setup: function() {
        slider = newSlider();
        slider.destroy();
    }
});

test("removes data", function() {
    ok(!$("#slider").data("kendoSlider"));
});

test("unbinds events", function() {
    ok(!(slider._events || {}).slide);
});

test("unbinds mousedown", function() {
    ok(!($(".k-slider").data("events") || {}).mousedown);
});

// ------------------------------------------------------------
var RangeSlider = kendo.ui.RangeSlider;

module("rangeslider api", {
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

function newRangeSlider(options, sliderDiv) {
    var div = $(sliderDiv || "<div id='rangeslider'><input /><input /></div>").appendTo(QUnit.fixture);
    return new RangeSlider(div, options);
}

test("values should set rangeSlider selectionStart and selectionEnd", function () {
    var rangeSlider = newRangeSlider(),
        values = [ 0, 9 ];

    rangeSlider.values(values);

    deepEqual(rangeSlider.value(), values);
});

test("value should set rangeSlider selectionStart and selectionEnd", function () {
    var rangeSlider = newRangeSlider(),
        values = [ 0, 9 ];

    rangeSlider.value(values);

    deepEqual(rangeSlider.value(), values);
});

test("values should return array of selectionStart and selectionEnd", function () {
    var rangeSlider = newRangeSlider(),
        values = [ 0, 9 ];

    rangeSlider.values(values);

    ok(values instanceof Array);
});

test("values should not be null or empty string and should return old values", function () {
    var selectionStart = 1,
        selectionEnd = 3,
        rangeSlider = newRangeSlider({ selectionStart: selectionStart, selectionEnd: selectionEnd });

    rangeSlider.values(" ");

    deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);

    rangeSlider.values(null);

    deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);
});

test("values should be in range", function () {
    var selectionStart = 1,
        selectionEnd = 3,
        rangeSlider = newRangeSlider({ selectionStart: selectionStart, selectionEnd: selectionEnd });

    rangeSlider.values(-1, 11);

    deepEqual(rangeSlider.values(), [selectionStart, selectionEnd]);
});

test("values should set rangeSlider position selectionDiv", function () {
    var rangeSlider = newRangeSlider();

    var selectionDiv = rangeSlider.wrapper.find(".k-slider-selection");

    rangeSlider.values(0, 10);

    equal(selectionDiv.width(), 198);
});

test("values should not trigger change event", function () {
    var result = true;
    var change = function (e) {
        result = false;
    };

    var rangeSlider = newRangeSlider({ "change": change });

    rangeSlider.values(1, 3);
    ok(result);
});

test("init should not trigger change event", function () {
    var result = true;
    var change = function (e) {
        result = false;
    };

    newRangeSlider({ "change": change, min: -1, max: 20 });
    ok(result);
});

test("values should set values to the inputs", function () {
    var rangeSlider = newRangeSlider(),
        selectionStart = 2,
        selectionEnd = 5;

    rangeSlider.values(selectionStart, selectionEnd);

    var inputs = rangeSlider.element.find("input");

    equal(inputs.eq(0).val(), selectionStart);
    equal(inputs.eq(1).val(), selectionEnd);
});

test("values should set selectionStart and selectionEnd values from string parameters", function() {
    var rangeSlider = newRangeSlider();

    rangeSlider.values("1", "2");

    deepEqual(rangeSlider.values(), [ 1, 2 ]);
});

test("values should set z-index to first handle", function() {
    var rangeSlider = newRangeSlider(),
        dragHandles = rangeSlider.wrapper.find(".k-draghandle"),
        firstDragHandle = dragHandles.eq(0);

    rangeSlider.values(10, 10);

    equal(firstDragHandle.css("z-index"), 1);
});

test("enabled with false should disable range slider", function () {
    var rangeSlider = newRangeSlider({ enabled: false });

    ok(rangeSlider.element.find("input").is("[disabled]"));
    ok(!rangeSlider.options.enabled);

    equal(rangeSlider.wrapper.find(".k-draghandle").eq(0).attr("tabindex"), -1);
    equal(rangeSlider.wrapper.find(".k-draghandle").eq(1).attr("tabindex"), -1);
});

test("disabled attribute should disable range slider", function () {
    var rangeSlider = newRangeSlider({}, "<div><input disabled='disabled' /><input disabled='disabled' /></div>");

    ok(rangeSlider.element.find("input").is("[disabled]"));
    ok(!rangeSlider.options.enabled);
});

test("enable method with false should disable range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.disable(false);

    ok(rangeSlider.element.find("input").is("[disabled]"));
    ok(!rangeSlider.options.enabled);
});

test("enable method with true should enable range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.enable(true);

    ok(!rangeSlider.element.find("input").attr("disabled"));
    ok(rangeSlider.options.enabled);
});

test("disable method should disable range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.disable();

    ok(rangeSlider.element.find("input").is(":disabled"));
    ok(!rangeSlider.options.enabled);
});

test("enable method should enable range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.enable();

    ok(!rangeSlider.wrapper.attr("disabled"));
    ok(rangeSlider.options.enabled);
});

test("disable method should add state disabled to the range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.disable();

    ok(rangeSlider.wrapper.hasClass("k-state-disabled"));
});

test("enable method should remove state disabled from the range slider", function () {
    var rangeSlider = newRangeSlider();

    rangeSlider.enable();

    ok(!rangeSlider.wrapper.hasClass("k-state-disabled"));

    equal(rangeSlider.wrapper.find(".k-draghandle").eq(0).attr("tabindex"), 0);
    equal(rangeSlider.wrapper.find(".k-draghandle").eq(1).attr("tabindex"), 0);
});

test('range slider should not trigger change if we decrease selectionStart with 1 step and selectionStart is equal to min value', function () {
    var downArrow = kendo.keys.down,
        leftArrow = kendo.keys.left,
        result = true;

    var change = function (e) {
        result = false;
    };

    var rangeSlider = newRangeSlider({ change: change, selectionStart: 10, selectionEnd: 10 }),
        dragHandles = rangeSlider.wrapper.find(".k-draghandle");

    dragHandles.eq(0).trigger({ type: "keydown", keyCode: downArrow });
    dragHandles.eq(0).trigger({ type: "keydown", keyCode: leftArrow });

    ok(result);
});

var rangeSider;

module("rangeslider destroy", {
    setup: function() {
        rangeSider = newRangeSlider();
        rangeSider.destroy();
    }
});

test("removes data", function() {
    ok(!$("#rangeslider").data("kendoRangeSlider"));
});

test("unbinds events", function() {
    ok(!(rangeSider._events || {}).slide);
});

test("unbinds mousedown", function() {
    ok(!($(".k-slider").data("events") || {}).mousedown);
});

}());
