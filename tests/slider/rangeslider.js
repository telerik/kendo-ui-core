(function() {

    var RangeSlider = kendo.ui.RangeSlider;
    var div = {};
    var isDefaultPrevent;

    describe("rangeslider", function() {
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

        it('range slider should properly round decimals in the change event when using the keyboard', function() {
            var upArrow = "38", // up arrow
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
        });

        it('range slider should decrease value with a small step when down and left arrow keyboard is clicked', function() {
            var downArrow = "40"; // down arrow
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

        it('range slider should increase value with a small step when down and left arrow keyboard is clicked', function() {
            var upArrow = "38", // up arrow
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

        it('range slider should increase value with a large step when page up keyboard is clicked', function() {
            var pageUp = "33", // page up
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

        it('range slider should decrease value with a large step when page down keyboard is clicked', function() {
            var pageDown = "34", // page down
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

        it('range slider should increase value to maximum value when end keyboard is clicked', function() {
            var end = "35", // end
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

        it('range slider should decrease value to minimum value when home keyboard is clicked', function() {
            var home = "36", // home
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

        it("rangeSlider should get values from the inputs", function() {
            var rangeSlider = newRangeSlider();

            assert.equal(rangeSlider.options.selectionStart, 1);
            assert.equal(rangeSlider.options.selectionEnd, 5);
        });

        it("rangeSlider should get step from the input", function() {
            var rangeSlider = newRangeSlider({}, $("<div><input step='2' /><input /></div>"));

            assert.equal(rangeSlider.options.smallStep, 2);
        });

        it("rangeSlider should get min from the input", function() {
            var rangeSlider = newRangeSlider({}, $("<div><input min='4' /><input /></div>"));

            assert.equal(rangeSlider.options.min, 4);
        });

        it("rangeSlider should get max from the input", function() {
            var rangeSlider = newRangeSlider({}, $("<div><input max='5' /><input /></div>"));

            assert.equal(rangeSlider.options.max, 5);
        });

        it("rangeSlider should set default value to the inputs", function() {
            var rangeSlider = newRangeSlider({}, $("<div><input /><input /></div>")),
                inputs = rangeSlider.element.find("input");

            assert.equal(inputs.eq(0).val(), 0);
            assert.equal(inputs.eq(1).val(), 10);
        });

        it("rangeSlider should not have default values", function() {
            var rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input /><input /></div>")),
                inputs = rangeSlider.element.find("input");

            assert.equal(inputs.eq(0).val(), -2);
            assert.equal(inputs.eq(1).val(), 40);
        });

        it("rangeSlider should get values from the inputs", function() {
            var rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input value='0' /><input value='0' /></div>")),
                inputs = rangeSlider.element.find("input");

            assert.equal(inputs.eq(0).val(), 0);
            assert.equal(inputs.eq(1).val(), 0);
        });

        it("rangeSlider resize should resize", function() {
            var rangeSlider = newRangeSlider({ min: -2, max: 40 }, $("<div><input value='0' /><input value='0' /></div>"));

            var initialWidth = rangeSlider._trackDiv.width();
            rangeSlider.wrapper.width(400);
            rangeSlider.resize();
            var currentWidth = rangeSlider._trackDiv.width();
            assert.isOk(initialWidth != currentWidth);
        });

        it("rangeSlider should render large ticks instead of small ticks", function() {
            var rangeSlider = newRangeSlider({ smallStep: 1, largeStep: 1 });
            rangeSlider.wrapper.find(".k-tick-large").each(function() {
                assert.isOk($(this).hasClass("k-tick-large"));
            })
        });

        it("rangeSlider should not modify input value with bg-BG culture", function() {
            kendo.culture("bg-BG");
            var rangeSlider = newRangeSlider({}, $("<div><input value='2,2' /><input value='4,4' /></div>"));
            inputs = rangeSlider.element.find("input");
            assert.equal(inputs.eq(0).val(), "2,2");
            assert.equal(inputs.eq(1).val(), "4,4");
            kendo.culture("en-US");
        });

        it("range slider should restore its original values on form reset", function(done) {
            Mocha.fixture.append('<form id="sliderForm" action=""><div id="rangeSlider"><input value="1" /><input value="9" /></div></form>');
            var rangeSlider = new RangeSlider($("#rangeSlider")[0], { tooltip: { enabled: false } });

            rangeSlider.values(2, 8);
            $("#sliderForm")[0].reset();

            setTimeout(function() {
                var values = rangeSlider.values();
                assert.equal(values[0], 1);
                assert.equal(values[1], 9);
                done();
            });
        });

        it("range slider should restore its min and max values on form reset when no initial values have been defined", function(done) {
            Mocha.fixture.append('<form id="sliderForm" action=""><div id="rangeSlider"><input /><input /></div></form>');
            var rangeSlider = new RangeSlider($("#rangeSlider")[0], { tooltip: { enabled: false }, min: 1, max: 9 });

            rangeSlider.values(2, 8);
            $("#sliderForm")[0].reset();

            setTimeout(function() {
                var values = rangeSlider.values();
                assert.equal(values[0], 1);
                assert.equal(values[1], 9);
                done();
            });
        });

    });
}());
