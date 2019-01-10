(function() {

    var Slider = kendo.ui.Slider;
    var input;

    describe("slider rendering", function() {
        beforeEach(function() {
            input = $("<input>");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function newSlider(options) {
            options = $.extend({}, { tooltip: { enabled: false } }, options);
            return new Slider(input.appendTo(Mocha.fixture)[0], options);
        }

        it("horizontal slider should apply max value", function() {
            var slider = newSlider({ value: 10 }),
                trackDivWidth = slider.wrapper.find(".k-slider-track").width(),
                selectionDivWidth = slider.wrapper.find(".k-slider-selection").width();

            assert.equal(trackDivWidth, selectionDivWidth);
        });

        it("height slider should apply max value", function() {
            var slider = newSlider({ value: 10, orientation: "vertical" }),
                trackDivHeight = slider.wrapper.find(".k-slider-track").height(),
                selectionDivHeight = slider.wrapper.find(".k-slider-selection").height();

            assert.equal(trackDivHeight, selectionDivHeight);
        });

        it("slider should apply style", function() {
            var style = "width: 200px; height: 30px;",
                slider = newSlider({ value: 10, style: style });

            assert.equal("200px", slider.wrapper.css("width"));
            assert.equal("30px", slider.wrapper.css("height"));
        });

        it("slider should apply option value to the input", function() {
            var value = 10,
                slider = newSlider({ value: value });

            assert.equal(slider.element.val(), value);
        });

        it("getValueFromPosition should increase value", function() {
            var slider = newSlider({ value: 1, smallStep: 2 }),
                dragableArea = slider._getDraggableArea(),
                step = 2 * (144 / 10);

            assert.equal(slider._getValueFromPosition(dragableArea.startPoint + step, dragableArea), 2);
        });

    });
}());
