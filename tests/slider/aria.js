(function() {
    var Slider = kendo.ui.Slider,
        RangeSlider = kendo.ui.RangeSlider,
        input, div;

    describe("accessibility with AXE", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it('Slider is accessible', function(done) {
            input = $("<input value='1'>");
            input.appendTo(Mocha.fixture);

            var sl = new Slider(input[0], { value: 5, smallStep: 2 });

            axeRunFixture(done);
        });

        it('RangeSlider is accessible', function(done) {
            div = $("<div><input value='1'><input value='5'></div>");
            div.appendTo(Mocha.fixture);

            var rs = new RangeSlider(div[0], { tooltip: { enabled: false }, selectionStart: 3, selectionEnd: 6 });

            axeRunFixture(done);
        });

        it('vertical Slider is accessible', function(done) {
            input = $("<input value='1'>");
            input.appendTo(Mocha.fixture);

            var sl = new Slider(input[0], {
                value: 5,
                smallStep: 2,
                orientation: "vertical"
            });

            axeRunFixture(done);
        });

        it('vertical RangeSlider is accessible', function(done) {
            div = $("<div><input value='1'><input value='5'></div>");
            div.appendTo(Mocha.fixture);

            var rs = new RangeSlider(div[0], {
                tooltip: { enabled: false },
                selectionStart: 3,
                selectionEnd: 6,
                orientation: "vertical"
            });

            axeRunFixture(done);
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
            var slider = newSlider({ smallStep: 1 });

            assert.equal(slider.wrapper.find("[role='slider']").length, 1);
        });

        it('aria-valuenow is taken from the input element', function() {
            var slider = newSlider({
                smallStep: 1,
                min: -10,
                max: 10
            });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuenow"), "1");
        });

        it('aria-valuenow is taken from value option if set', function() {
            var slider = newSlider({
                smallStep: 1,
                value: 3,
                min: -10,
                max: 10
            });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuenow"), "3");
        });

        it('aria-valuemin is to 0 by default', function() {
            var slider = newSlider({ smallStep: 1, value: 3 });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemin"), "0");
        });

        it('aria-valuemin is to options.min', function() {
            var slider = newSlider({ smallStep: 1, value: 3, min: 1 });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemin"), "1");
        });

        it('aria-valuemax is to 10 by default', function() {
            var slider = newSlider({ smallStep: 1, value: 3 });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemax"), "10");
        });

        it('aria-valuemax is to options.max', function() {
            var slider = newSlider({ smallStep: 1, value: 3, max: 5 });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuemax"), "5");
        });

        it('aria-valuetext is taken from value option if set', function() {
            var slider = newSlider({
                smallStep: 1,
                value: 3,
                min: -10,
                max: 10
            });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-valuetext"), "3");
        });

        it('title present by default', function() {
            var slider = newSlider({ smallStep: 1, value: 3 });

            assert.equal(slider.wrapper.find("[role='slider']").attr("title"), "drag");
        });

        it('title is set to dragHandleTitle', function() {
            var slider = newSlider({ smallStep: 1, value: 3, dragHandleTitle: "custom" });

            assert.equal(slider.wrapper.find("[role='slider']").attr("title"), "custom");
        });

        it('aria-orientation is set to vertical when slider is vertical', function() {
            var slider = newSlider({ smallStep: 1, value: 3, orientation: "vertical" });

            assert.equal(slider.wrapper.find("[role='slider']").attr("aria-orientation"), "vertical");
        });

        it('aria-valuenow is taken from selectionStart and selectionEnd of RangeSlider', function() {
            div = $("<div><input><input></div>");
            div.appendTo(Mocha.fixture);

            var rs = new RangeSlider(div, {
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

            var rs = new RangeSlider(div, {
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
}());