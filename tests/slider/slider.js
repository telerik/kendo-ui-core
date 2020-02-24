(function() {

    var Slider = kendo.ui.Slider;
    var input;
    var isDefaultPrevent;

    describe("slider", function() {
        beforeEach(function() {
            input = $("<input value='1'>");
            isDefaultPrevent = false;
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture)
        });

        function newSlider(options, newInput) {
            options = $.extend({}, { tooltip: { enabled: false } }, options);

            return new Slider((newInput || input).appendTo(Mocha.fixture)[0], options);
        }

        it('slider should decrease value with a small step when down and left arrow keyboard is clicked', function() {
            var downArrow = "40", // down arrow
                leftArrow = "37", // left arrow
                slider = newSlider({ value: 5, smallStep: 2 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: downArrow,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(3, slider.value());

            slider.value(5);

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: leftArrow,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(3, slider.value());

            slider.value(5);
        });

        it('slider should increase value with a small step when down and left arrow keyboard is clicked', function() {
            var upArrow = "38"; // up arrow
            rightArrow = "39", // right arrow
                slider = newSlider({ value: 5, smallStep: 2 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: upArrow,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(7, slider.value());

            slider.value(5);

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: rightArrow,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(7, slider.value());

            slider.value(5);
        });

        it('slider should increase value with a large step when page up keyboard is clicked', function() {
            var end = "33", // page up
                slider = newSlider({ value: 5, largeStep: 3 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: end,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(8, slider.value());

            slider.value(5);
        });

        it('slider should decrease value with a large step when page down keyboard is clicked', function() {
            var home = "34", // page down
                slider = newSlider({ value: 5, largeStep: 3 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: home,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(2, slider.value());

            slider.value(5);
        });

        it('slider should increase value to maximum value when end keyboard is clicked', function() {
            var end = "35", // end
                slider = newSlider({ value: 5 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: end,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(10, slider.value());

            slider.value(5);
        });

        it('slider should increase value to minimum value when home keyboard is clicked', function() {
            var home = "36", // home
                slider = newSlider({ value: 5 }),
                dragHandle = slider.wrapper.find(".k-draghandle");

            dragHandle.focus().trigger({
                type: "keydown",
                keyCode: home,
                preventDefault: function() {
                    isDefaultPrevent = true;
                }
            });

            assert.isOk(isDefaultPrevent);
            assert.equal(0, slider.value());

            slider.value(5);
        });

        it('getValueFromPosition with small step 3 and mouse position 100 should return max value', function() {
            var slider = newSlider({ value: 0, smallStep: 3, style: "width: 156px;" }),
                mousePosition = 100,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 10);
        });

        it('getValueFromPosition with small step 2 and mouse position 78 should return 8', function() {
            var slider = newSlider({ value: 0, smallStep: 2, style: "width: 156px;" }),
                mousePosition = 78,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 8);
        });

        it('getValueFromPosition with small step 3 and mouse position 80 should return 9', function() {
            var slider = newSlider({ value: 0, smallStep: 3, style: "width: 156px;" }),
                mousePosition = 80,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 9);
        });

        it('getValueFromPosition with small step 2 and mouse position 60 should return 3', function() {
            var slider = newSlider({ value: 0, smallStep: 2, style: "width: 156px;" }),
                mousePosition = 60,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 6);
        });

        it('getValueFromPosition with small step 2 and mouse position 95 should return 10', function() {
            var slider = newSlider({ value: 0, smallStep: 2, style: "width: 156px;" }),
                mousePosition = 95,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 10);
        });

        it('getValueFromPosition with small step 2 and mouse position 9 should return 0', function() {
            var slider = newSlider({ value: 0, smallStep: 2, style: "width: 156px;" }),
                mousePosition = 9,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 0);
        });

        it('getValueFromPosition with small step 0.1 mouse position 39 should return 0.4', function() {
            var slider = newSlider({ value: 0, smallStep: 0.1, max: 1, style: "width: 156px;" }),
                mousePosition = 39,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 0.4);
        });

        it('getValueFromPosition with small step 0.1 mouse position 30 should return 0.3', function() {
            var slider = newSlider({ value: 0, smallStep: 0.1, max: 1, style: "width: 156px;" }),
                mousePosition = 30,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 0.3);
        });

        it('getValueFromPosition with small step 0.1 mouse position 48 should return 0.5', function() {
            var slider = newSlider({ value: 0, smallStep: 0.1, max: 1, style: "width: 156px;" }),
                mousePosition = 48,
                dragableArea = { startPoint: 0, endPoint: slider._maxSelection },
                value = slider._getValueFromPosition(mousePosition, dragableArea);

            assert.equal(value, 0.5);
        });

        it("slider should get value from the input", function() {
            var slider = newSlider();

            assert.equal(slider.value(), 1);
        });

        it("slider should get step from the input", function() {
            var slider = newSlider({}, $("<input step='2' />"));

            assert.equal(slider.options.smallStep, 2);
        });

        it("slider should get min from the input", function() {
            var slider = newSlider({}, $("<input min='4' />"));

            assert.equal(slider.options.min, 4);
        });

        it("slider should get max from the input", function() {
            var slider = newSlider({}, $("<input max='5' />"));

            assert.equal(slider.options.max, 5);
        });

        it("slider should have default input value", function() {
            var slider = newSlider({}, $("<input />"));

            assert.equal(slider.element.val(), 0);
        });

        it("slider should not have default value", function() {
            var slider = newSlider({ min: -20 }, $("<input />"));

            assert.equal(slider.element.val(), -20);
        });

        it("slider should have get value from the input", function() {
            var slider = newSlider({ min: -20 }, $("<input value='0' />"));

            assert.equal(slider.element.val(), 0);
        });

        it("slider resize should resize", function() {
            var slider = newSlider({}, $("<input />"));

            var initialWidth = slider._trackDiv.width();
            slider.wrapper.width(400);
            slider.resize();
            var currentWidth = slider._trackDiv.width();
            assert.isOk(initialWidth != currentWidth);
        });

        it("slider should render large ticks instead of small ticks", function() {
            var slider = newSlider({ smallStep: 1, largeStep: 1 }, $("<input />"));
            slider.wrapper.find(".k-tick-large").each(function() {
                assert.isOk($(this).hasClass("k-tick-large"));
            });
        });

        it("slider should render a small last tick", function() {
            var slider = newSlider({ max: 23 }, $("<input />"));
            var lastLargeTick = slider.wrapper.find(".k-tick-large span:last");
            assert.equal(lastLargeTick.html(), 20);
            var lastSmallTick = slider.wrapper.find(".k-tick:last");
            assert.equal(lastSmallTick.attr("title"), 23);
        });


        it("slider should handle inaccurate fraction calculations", function() {
            var slider = newSlider({ min: 0, max: 1.2, smallStep: 0.2, largeStep: 0.4 }, $("<input />"));
            var lastLargeTick = slider.wrapper.find(".k-tick-large:last");
            assert.equal(lastLargeTick.text(), 1.2);
            assert.isOk(lastLargeTick.is(".k-last"));
            assert.isOk(!!lastLargeTick.width());
        });

        it("slider should not modify input value with bg-BG culture", function() {
            kendo.culture("bg-BG");
            var slider = newSlider({}, $("<input value='5,5' />"));
            assert.equal(slider.element.val(), "5,5");
            kendo.culture("en-US");
        });

        it("should attach tick handlers when resize is called and slider is enabled", function() {
            var change = false,
                slider = newSlider({
                    min: 0,
                    max: 11,
                    largeStep: 1
                });
            slider.resize();
            slider.bind("change", function() {
                change = true;
            });
            slider.wrapper.find(".k-label").eq(1).trigger("mousedown");
            assert.equal(change, true);
        });

        it("should not call enable method when disbaled widget is resized", function() {
            var change = false,
                slider = newSlider({
                    min: 0,
                    max: 11,
                    largeStep: 1
                });
            slider.enable(false);
            slider.resize();
            slider.bind("change", function() {
                change = true;
            });
            slider.wrapper.find(".k-label").eq(1).trigger("mousedown");
            assert.equal(change, false);
        });

        it("slider should render large ticks with min value bigger then 0 correctly", function() {
            var slider = newSlider({ min: 1900, smallStep: 12, largeStep: 60, max: 2020 }, $("<input />"));
            var largeTicks = slider.wrapper.find(".k-tick-large");
            var largetTickNumbers = [1900, 1960, 2020];
            largeTicks.each(function(index) {
                assert.equal($(this).find("span").text(), largetTickNumbers[index]);
            });
        });

        it("should add active state and remove it", function() {
            var slider = newSlider({
                min: 0,
                max: 11,
                largeStep: 1
            });

            slider.resize();

            slider.wrapper.find(".k-button-increase").trigger("mousedown");
            slider.wrapper.find(".k-button-decrease").trigger("mousedown");

            assert.isOk(slider.wrapper.find(".k-button-increase").hasClass("k-state-active"));
            assert.isOk(slider.wrapper.find(".k-button-decrease").hasClass("k-state-active"));

            slider.wrapper.find(".k-button-increase").trigger("mouseup");
            slider.wrapper.find(".k-button-decrease").trigger("mouseup");

            assert.isOk(!slider.wrapper.find(".k-button-increase").hasClass("k-state-active"));
            assert.isOk(!slider.wrapper.find(".k-button-decrease").hasClass("k-state-active"));
        });

        it("slider should restore its original value on form reset", function(done) {
            Mocha.fixture.append('<form id="sliderForm" action=""><div><input id="singleSlider" value="1" /></div></form>');
            var slider = new Slider($("#singleSlider")[0], { tooltip: { enabled: false } });

            slider.value(2);
            $("#sliderForm")[0].reset();

            setTimeout(function() {
                assert.equal(slider.value(), 1);
                done();
            });
        });

        it("slider should restore its min value on form reset when no initial value has been defined", function(done) {
            Mocha.fixture.append('<form id="sliderForm" action=""><div><input id="singleSlider" /></div></form>');
            var slider = new Slider($("#singleSlider")[0], { tooltip: { enabled: false }, min: 2 });

            slider.value(3);
            $("#sliderForm")[0].reset();

            setTimeout(function() {
                assert.equal(slider.value(), 2);
                done();
            });
        });

    });
}());
