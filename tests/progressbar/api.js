(function() {

    var ProgressBar = kendo.ui.ProgressBar,
        container,
        pb;

    function moduleSetup() {


        container = $("<div id='progressbar'></div>");
        container.appendTo(Mocha.fixture);
    }

    function moduleTeardown() {

        if (pb.data && pb.data("kendoProgressBar")) {
            pb.destroy();
        }
        kendo.destroy(Mocha.fixture);
    }

    describe("ProgressBar value", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("value method returns the actual initial value", function() {
            pb = new ProgressBar(container, {
                value: 50
            });

            assert.equal(pb.value(), 50);
        });

        it("value method sets indeterminate state correctly when false is passed", function() {
            pb = new ProgressBar(container, {
                value: 50
            });

            pb.value(false);

            assert.equal(pb.value(), false);
        });

        it("value method does not set indeterminate state when true is passed", function() {
            pb = new ProgressBar(container, {
                value: 50
            });

            pb.value(true);

            assert.equal(pb.value(), 50);
        });

        it("value method sets value correctly when the value is between min and max", function() {
            pb = new ProgressBar(container, {
                value: 50,
                min: 20,
                max: 60
            });

            pb.value(40);

            assert.equal(pb.value(), 40);
        });

        it("value method sets value equal to max value when it is bigger than max", function() {
            pb = new ProgressBar(container, {
                value: 50,
                min: 20,
                max: 60
            });

            pb.value(100);

            assert.equal(pb.value(), pb.options.max);
        });

        it("value method sets value equal to min value when it is smaller than min", function() {
            pb = new ProgressBar(container, {
                value: 50,
                min: 20,
                max: 60
            });

            pb.value(10);

            assert.equal(pb.value(), pb.options.min);
        });

        it("value method sets the value when it is equal to min", function() {
            pb = new ProgressBar(container, {
                value: 50,
                min: 20,
                max: 60
            });

            pb.value(20);

            assert.equal(pb.value(), 20);
        });

        it("value method sets the value when it is equal to max", function() {
            pb = new ProgressBar(container, {
                value: 50,
                min: 20,
                max: 60
            });

            pb.value(60);

            assert.equal(pb.value(), 60);
        });

        it("Change event is fired only once per value (type='chunk')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(30);
            pb.value(30);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value (type='value')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(30);
            pb.value(30);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value (type='percent')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(30);
            pb.value(30);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value bigger than max (type='percent')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value bigger than max (type='value')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value bigger than max (type='chunk')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value smaller than min (type='percent')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 30,
                type: "percent",
                change: function(e) {
                    //change the fired counter only for the testing values - exclude initial change
                    if (e.value === 30) {
                        return;
                    }
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(20);
            pb.value(15);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value smaller than min (type='value')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 30,
                type: "value",
                change: function(e) {
                    //change the fired counter only for the testing values - exclude initial change
                    if (e.value === 30) {
                        return;
                    }
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(20);
            pb.value(15);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Change event is fired only once per value when trying to set value smaller than min (type='chunk')", function(done) {
            var changeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 30,
                type: "chunk",
                change: function() {
                    changeFiredCounter++;
                },
                animation: false
            });

            pb.value(20);
            pb.value(15);

            setTimeout(function() {
                assert.equal(changeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Complete event is not fired before max is reached (type='value')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(30);
            pb.value(50);
            pb.value(59);

            setTimeout(function() {
                assert.isOk(!completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired when max is reached (type='value')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(50);
            pb.value(59);
            pb.value(60);

            setTimeout(function() {
                assert.isOk(completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired each time when max is reached (type='value')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(50);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 2);
                done();
            }, 30);
        });

        it("Complete event is not fired before max is reached (type='percent')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(30);
            pb.value(50);
            pb.value(59);

            setTimeout(function() {
                assert.isOk(!completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired when max is reached (type='percent')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(50);
            pb.value(59);
            pb.value(60);

            setTimeout(function() {
                assert.isOk(completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired each time when max is reached (type='percent')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(50);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 2);
                done();
            }, 30);
        });

        it("Complete event is not fired before max is reached (type='chunk')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(30);
            pb.value(50);
            pb.value(59);

            setTimeout(function() {
                assert.isOk(!completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired when max is reached (type='chunk')", function(done) {
            var completeFired = false;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                complete: function() {
                    completeFired = true;
                },
                animation: false
            });

            pb.value(50);
            pb.value(59);
            pb.value(60);

            setTimeout(function() {
                assert.isOk(completeFired);
                done();
            }, 30);
        });

        it("Complete event is fired each time when max is reached (type='chunk')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(50);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 2);
                done();
            }, 30);
        });

        it("Complete event is not fired max is set multiple times in a row (type='value')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "value",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Complete event is not fired max is set multiple times in a row (type='percent')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "percent",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 1);
                done();
            }, 30);
        });

        it("Complete event is not fired max is set multiple times in a row (type='chunk')", function(done) {
            var completeFiredCounter = 0;

            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                type: "chunk",
                complete: function() {
                    completeFiredCounter++;
                },
                animation: false
            });

            pb.value(60);
            pb.value(65);

            setTimeout(function() {
                assert.equal(completeFiredCounter, 1);
                done();
            }, 30);
        });

        it("k-progressbar-indeterminate class is set correctly when passed value is false", function(done) {
            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                animation: false
            });

            pb.value(false);

            setTimeout(function() {
                assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
                done();
            }, 30);
        });

        it("k-progressbar-indeterminate class is removed when previous value was false", function(done) {
            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: 20,
                animation: false
            });

            pb.value(false);
            pb.value(40);

            setTimeout(function() {
                assert.isOk(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
                done();
            }, 30);
        });

        it("k-progressbar-indeterminate class is removed when initial value was false", function(done) {
            pb = new ProgressBar(container, {
                min: 20,
                max: 60,
                value: false,
                animation: false
            });

            pb.value(40);

            setTimeout(function() {
                assert.isOk(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
                done();
            }, 30);
        });

        it("One percent is calculated correctly", function(done) {
            pb = new ProgressBar(container, {
                min: 0,
                max: 300,
                value: 0,
                animation: false
            });

            pb.value(40);

            setTimeout(function() {
                assert.equal(pb._onePercent, 3);

                done();
            }, 30);
        });
    });

    describe("ProgressBar enable", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("enable method renders k-state-disabled class when false is passed", function() {
            pb = new ProgressBar(container);

            pb.enable(false);

            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method removes k-state-disabled class when no parameter is passed", function() {
            pb = new ProgressBar(container);

            pb.enable(false);
            pb.enable();

            assert.isOk(!pb.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method removes k-state-disabled class when true is passed", function() {
            pb = new ProgressBar(container);

            pb.enable(false);
            pb.enable(true);

            assert.isOk(!pb.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method does not add k-state-disabled class if not needed", function() {
            pb = new ProgressBar(container);

            pb.enable();
            pb.enable(true);

            assert.isOk(!pb.wrapper.hasClass("k-state-disabled"));
        });

        it("enable method does not removes k-state-disabled class if not needed", function() {
            pb = new ProgressBar(container);

            pb.enable(false);
            pb.enable(false);

            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
        });

        it("enable does not disable progressbar", function() {
            pb = new ProgressBar(container);
            pb.enable();

            assert.isOk(!pb.wrapper.hasClass("k-state-disabled"));
        });

        it("initially disabled state is applied", function() {
            pb = new ProgressBar(container, {
                enable: false
            });

            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
        });

        it("ProgressBar does change value when disabled", function() {
            pb = new ProgressBar(container, {
                animation: false
            });
            pb.value(30);
            pb.enable(false);
            pb.value(40);

            assert.equal(pb.value(), 40);
        });

        it("ProgressBar does change value when initially disabled", function() {
            pb = new ProgressBar(container, {
                animation: false,
                enable: false,
                value: 0
            });
            pb.value(30);

            assert.equal(pb.value(), 30);
        });

        it("ProgressBar does change value when enabled after initially disabled", function() {
            pb = new ProgressBar(container, {
                animation: false,
                enable: false
            });
            pb.enable();
            pb.value(30);

            assert.equal(pb.value(), 30);
        });

        it("ProgressBar does change value when reenabled", function() {
            pb = new ProgressBar(container, {
                animation: false
            });

            pb.enable(false);
            pb.value(30);
            pb.enable();
            pb.value(40);

            assert.equal(pb.value(), 40);
        });

        it("ProgressBar does not indeterminate state when disabled", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 30
            });

            pb.enable(false);
            pb.value(false);

            assert.equal(pb.value(), false);
            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("ProgressBar is disabled correctly when in indeterminate state", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 30
            });

            pb.value(false);
            pb.enable(false);

            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
        });
    });

    describe("setOptions", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("Animation is set to false in options", function() {
            pb = new ProgressBar(container, {
                animation: {
                    duration: 500
                },
                value: 30
            });

            pb.setOptions({ animation: false });

            assert.equal(pb.options.animation, false);
        });

        it("Private animation object duration is set to 0", function() {
            pb = new ProgressBar(container, {
                animation: {
                    duration: 500
                },
                value: 30
            });

            pb.setOptions({ animation: false });

            var expectedAnimation = { duration: 0 };

            assert.deepEqual(pb._animation, expectedAnimation);
        });

        it("Animation duration is set correctly in options", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 30
            });

            var newAnimation = {
                duration: 550
            };

            pb.setOptions({ animation: newAnimation });

            assert.deepEqual(pb.options.animation, newAnimation);
        });

        it("Private animation object duration is set correctly", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 30
            });

            var newAnimation = {
                duration: 550
            };

            pb.setOptions({ animation: newAnimation });

            assert.deepEqual(pb._animation, newAnimation);
        });

        it("Type is changed correctly from value to percent", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 150,
                min: 0,
                max: 300,
                type: "value"
            });

            pb.setOptions({ type: "percent" });

            assert.equal(pb.wrapper.find(".k-progress-status:first").text(), "50%");
            assert.equal(pb.wrapper.find(".k-progress-status:last").text(), "50%");
        });

        it("Type is changed correctly from percent to value", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 150,
                min: 0,
                max: 300,
                type: "percent"
            });

            pb.setOptions({ type: "value" });

            assert.equal(pb.wrapper.find(".k-progress-status:first").text(), "150");
            assert.equal(pb.wrapper.find(".k-progress-status:last").text(), "150");
        });

        it("Value is changed correctly (type='value')", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 20,
                min: 0,
                max: 300,
                type: "value"
            });

            pb.setOptions({ value: 150 });

            assert.equal(pb.value(), 150);
            assert.equal(pb.wrapper.find(".k-progress-status:first").text(), "150");
            assert.equal(pb.wrapper.find(".k-progress-status:last").text(), "150");
        });

        it("Value is changed correctly (type='percent')", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 20,
                min: 0,
                max: 300,
                type: "percent"
            });

            pb.setOptions({ value: 150 });

            assert.equal(pb.value(), 150);
            assert.equal(pb.wrapper.find(".k-progress-status:first").text(), "50%");
            assert.equal(pb.wrapper.find(".k-progress-status:last").text(), "50%");
        });

        it("Value is changed correctly (type='chunk')", function() {
            pb = new ProgressBar(container, {
                animation: false,
                value: 20,
                min: 0,
                max: 300,
                type: "chunk",
                chunkCount: 4
            });

            pb.setOptions({ value: 150 });

            assert.equal(pb.value(), 150);
            assert.equal(pb.wrapper.find(".k-state-selected").length, 2);
        });
    });
}());