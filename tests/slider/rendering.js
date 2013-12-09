(function(){

var Slider = kendo.ui.Slider;
var input;

module("slider rendering", {
    setup: function () {
        input = $("<input>");
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

function newSlider(options) {
    options = $.extend({}, { tooltip: {enabled:false}}, options);
    return new Slider(input.appendTo(QUnit.fixture)[0], options);
}

test("horizontal slider should apply max value", function () {
    var slider = newSlider({ value: 10 }),
        trackDivWidth = slider.wrapper.find(".k-slider-track").width(),
        selectionDivWidth = slider.wrapper.find(".k-slider-selection").width();

    equal(trackDivWidth, selectionDivWidth);
});

test("height slider should apply max value", function () {
    var slider = newSlider({ value: 10, orientation: "vertical" }),
        trackDivHeight = slider.wrapper.find(".k-slider-track").height(),
        selectionDivHeight = slider.wrapper.find(".k-slider-selection").height();

    equal(trackDivHeight, selectionDivHeight);
});

test("slider should apply style", function () {
    var style = "width: 200px; height: 30px;",
        slider = newSlider({ value: 10, style: style });

    equal("200px", slider.wrapper.css("width"));
    equal("30px", slider.wrapper.css("height"));
});

test("slider should apply option value to the input", function() {
    var value = 10,
        slider = newSlider({ value: value });

    equal(slider.element.val(), value);
});

test("getValueFromPosition should increase value", function () {
    var slider = newSlider({ value: 1, smallStep: 2 }),
        dragableArea = slider._getDraggableArea(),
        step = 2 * (144 / 10);

    equal(slider._getValueFromPosition(dragableArea.startPoint + step, dragableArea), 2);
});

}());
