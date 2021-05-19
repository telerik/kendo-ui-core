(function() {
    var ProgressBar = kendo.ui.ProgressBar,
        container;

    function moduleSetup() {

        container = document.createElement("div");
        $(container).appendTo(Mocha.fixture);
    }

    function moduleTeardown() {

        kendo.destroy(Mocha.fixture);
    }

    describe("ProgressBar initialization", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("attaches a progressbar object to target", function() {
            var dom = $('<div/>');
            dom.appendTo(Mocha.fixture);

            var pb = dom.kendoProgressBar();

            assert.isOk(pb.data("kendoProgressBar") instanceof ProgressBar);
        });

        it("The element of the progressbar is set to the target from which it was initialized", function() {
            var pb = new ProgressBar(container);

            assert.equal(pb.element[0], container);
        });

        it("Wrapper field is initialized", function() {
            var pb = new ProgressBar(container);

            assert.equal(pb.wrapper[0], container);
        });

        it("Css classes are added to the wrapper", function() {
            var pb = new ProgressBar(container);

            assert.isOk(pb.wrapper.hasClass("k-widget"));
            assert.isOk(pb.wrapper.hasClass("k-progressbar"));
        });

        it("Correct css classes for horizontal progressbar are added to the wrapper", function() {
            var pb = new ProgressBar(container, {
                orientation: "horizontal"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-horizontal"));
        });

        it("Correct css classes for vertical progressbar are added to the wrapper", function() {
            var pb = new ProgressBar(container, {
                orientation: "vertical"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-vertical"));
        });

        it("Correct css classes for horizontal reverse progressbar are added to the wrapper", function() {
            var pb = new ProgressBar(container, {
                reverse: true
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-horizontal"));
            assert.isOk(pb.wrapper.hasClass("k-progressbar-reverse"));
        });

        it("Correct css classes for vertical reverse progressbar are added to the wrapper", function() {
            var pb = new ProgressBar(container, {
                reverse: true,
                orientation: "vertical"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-vertical"));
            assert.isOk(pb.wrapper.hasClass("k-progressbar-reverse"));
        });

        it("Initial value is normalized correctly when it is less than min", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                max: 100,
                value: 0
            });

            assert.equal(pb.options.value, pb.options.min);
        });

        it("Initial value is normalized correctly when it is more than max", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                max: 100,
                value: 1000
            });

            assert.equal(pb.options.value, pb.options.max);
        });

        it("Start event is not fired on initialization when value is more than min", function(done) {
            var startFired = false,
                pb = new ProgressBar(container, {
                    min: 10,
                    max: 100,
                    value: 30,
                    start: function() {
                        startFired = true;
                    }
                });

            setTimeout(function() {
                assert.isOk(!startFired);
                done();
            }, 50);
        });

        it("Progress property is set to width when orientation is horizontal", function() {
            var pb = new ProgressBar(container, {
                orientation: "horizontal"
            });

            assert.equal(pb._progressProperty, "width");
        });

        it("Progress property is set to height when orientation is vertical", function() {
            var pb = new ProgressBar(container, {
                orientation: "vertical"
            });

            assert.equal(pb._progressProperty, "height");
        });


        it("Animation duration is equal to default animation duration when not specified", function() {
            var pb = new ProgressBar(container, {}),
                defaultAnimationDuration = 400;

            assert.equal(pb._animation.duration, defaultAnimationDuration);
        });

        it("Animation is correctly set to false", function() {
            var pb = new ProgressBar(container, {
                animation: false
            });

            assert.isOk(!pb.options.animation);
        });

        it("Animation duration is overriden when specified by user", function() {
            var pb = new ProgressBar(container, {
                animation: {
                    duration: 789
                }
            });

            assert.equal(pb.options.animation.duration, 789);
        });

        it("k-progressbar-indeterminate class is set correctly when initial value is false (type='value')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                type: "value"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-progressbar-indeterminate class is set correctly when initial value is false (type='percent')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                type: "percent"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-progressbar-indeterminate class is set correctly when initial value is false (type='chunk')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                type: "chunk"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-progressbar-indeterminate class is not set when initial value is not false (type='value')", function() {
            var pb = new ProgressBar(container, {
                value: 20,
                type: "value"
            });

            assert.isOk(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-progressbar-indeterminate class is not set when initial value is not false (type='percent')", function() {
            var pb = new ProgressBar(container, {
                value: 20,
                type: "percent"
            });

            assert.isOk(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-progressbar-indeterminate class is not set when initial value is not false (type='chunk')", function() {
            var pb = new ProgressBar(container, {
                value: 20,
                type: "chunk"
            });

            assert.isOk(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
        });

        it("k-state-disabled class is added when ProgressBar is disabled initially", function() {
            var pb = new ProgressBar(container, {
                enable: false
            });

            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
        });

        it("Initial value is set correctly to false", function() {
            var pb = new ProgressBar(container, {
                value: false
            });

            assert.equal(pb.value(), false);
        });

        it("Initial value false correctly sets status holder text to min (type='value')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                type: "value"
            });

            assert.equal(pb.wrapper.children(".k-progress-status-wrap").text(), pb.options.min);
        });

        it("Initial value false correctly sets status holder text to min (type='percent')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                type: "percent"
            });

            assert.equal(pb.wrapper.children(".k-progress-status-wrap").text(), pb.options.min + "%");
        });

        it("Progress wrapper is not added when initial value is false", function() {
            var pb = new ProgressBar(container, {
                value: false
            });

            assert.equal(pb.wrapper.find(".k-state-selected").length, 0);
        });

        it("ProgressBar is correctly disabled and initial value is set to false (type='value')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                enable: false,
                type: "value"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
            assert.equal(pb.options.value, false);
        });

        it("ProgressBar is correctly disabled and initial value is set to false (type='percent')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                enable: false,
                type: "percent"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
            assert.equal(pb.options.value, false);
        });

        it("ProgressBar is correctly disabled and initial value is set to false (type='chunk')", function() {
            var pb = new ProgressBar(container, {
                value: false,
                enable: false,
                type: "chunk"
            });

            assert.isOk(pb.wrapper.hasClass("k-progressbar-indeterminate"));
            assert.isOk(pb.wrapper.hasClass("k-state-disabled"));
            assert.equal(pb.options.value, false);
        });

        it("_isStarted is set to false initially when value is equal to min", function() {
            var pb = new ProgressBar(container, {
                value: 0,
                min: 0
            });

            assert.equal(pb._isStarted, false);
        });

        it("_isStarted is set to false initially when value is not equal to min", function() {
            var pb = new ProgressBar(container, {
                value: 10,
                min: 0
            });

            assert.equal(pb._isStarted, false);
        });

        it("ProgressBar is initialized correctly via data attribute", function() {
            var dom = $("<div data-role='progressbar'></div>");
            $(container).append(dom);

            kendo.init($(container));

            assert.isOk($(container.firstChild).data("kendoProgressBar") instanceof ProgressBar);
        });

        it("ProgressBar value is set correctly via data attribute", function() {
            var dom = $("<div data-role='progressbar' data-value='25'></div>");
            $(container).append(dom);

            kendo.init($(container));

            assert.equal($(container.firstChild).data("kendoProgressBar").value(), 25);
        });

        it("ProgressBar type is set correctly via data attribute", function() {
            var dom = $("<div data-role='progressbar' data-type='chunk'></div>");
            $(container).append(dom);

            kendo.init($(container));

            assert.equal($(container.firstChild).data("kendoProgressBar").options.type, "chunk");
        });

        it("ProgressBar events are raised when set via data attribute", function() {
            var dom = $("<div data-role='progressbar' data-bind='events: {change: onPbChange}' data-animation='false'></div>");
            var fired = false;

            $(container).append(dom);

            var observable = kendo.observable({
                onPbChange: function(e) {
                    assert.isOk(true);
                }
            });

            kendo.bind($(container), observable);

            dom.data("kendoProgressBar").value(10);
        });

        it("Error is thrown when invalid type is passed", function() {
            assert.throws(function() {
                var pb = new ProgressBar(container, {
                    type: "invalid"
                });
            });
        });

        it("Error is not thrown when type is 'value'", function() {
            var pb = new ProgressBar(container, {
                type: "value"
            });

            assert.isOk(true);
        });

        it("Error is not thrown when type is 'percent'", function() {
            var pb = new ProgressBar(container, {
                type: "percent"
            });

            assert.isOk(true);
        });

        it("Error is not thrown when type is 'chunk'", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(true);
        });

        it("progressStatus field is set when showStatus is true and value is equal to min (type='value')", function() {
            var pb = new ProgressBar(container, {
                type: "value"
            });

            assert.equal(pb.progressStatus.length, 1);
        });

        it("progressStatus field is set when showStatus is true and value is equal to min (type='percent')", function() {
            var pb = new ProgressBar(container, {
                type: "percent"
            });

            assert.equal(pb.progressStatus.length, 1);
        });

        it("progressStatus field is set when showStatus is true and value is not equal to min (type='value')", function() {
            var pb = new ProgressBar(container, {
                type: "value",
                min: 0,
                max: 10,
                value: 5
            });

            assert.equal(pb.progressStatus.length, 2);
        });

        it("progressStatus field is set when showStatus is true and value is not equal to min (type='percent')", function() {
            var pb = new ProgressBar(container, {
                type: "percent",
                min: 0,
                max: 10,
                value: 5
            });

            assert.equal(pb.progressStatus.length, 2);
        });


        it("progressStatus field is set to empty jQuery object when type is 'chunk'", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(pb.progressStatus instanceof jQuery);
        });

        it("progressWrapper field is set to empty jQuery object when type is 'chunk'", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(pb.progressWrapper instanceof jQuery);
        });

        it("progressWrapper field is set to empty jQuery object when value is equal to min (type='value')", function() {
            var pb = new ProgressBar(container, {
                type: "value",
                min: 5,
                value: 5
            });

            assert.isOk(pb.progressWrapper instanceof jQuery);
        });

        it("progressWrapper field is set to empty jQuery object when value is equal to min (type='percent')", function() {
            var pb = new ProgressBar(container, {
                type: "percent",
                min: 5,
                value: 5
            });

            assert.isOk(pb.progressWrapper instanceof jQuery);
        });

        it("progressWrapper field is set when value is  not equal to min (type='value')", function() {
            var pb = new ProgressBar(container, {
                type: "value",
                min: 5,
                value: 10
            });

            assert.isOk(pb.hasOwnProperty("progressWrapper"));
        });

        it("progressWrapper field is set when value is  not equal to min (type='percent')", function() {
            var pb = new ProgressBar(container, {
                type: "percent",
                min: 5,
                value: 10
            });

            assert.isOk(pb.hasOwnProperty("progressWrapper"));
        });
    });

    describe("ProgressBar value initialization", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("ProgressBar wrapper is empty when value is equal to min and showStatus is false", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                value: 10,
                showStatus: false
            });

            assert.isOk(pb.wrapper.is(":empty"));
        });

        it("ProgressBar contains empty div for progress wrapper when value is not equal to min and showStatus is false", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                value: 20,
                showStatus: false
            });

            var progressWrapper = pb.wrapper.find(".k-state-selected");

            assert.equal(progressWrapper.length, 1);
            assert.isOk(progressWrapper.is(":empty"));
        });

        it("Size of progress wrapper div reflects value when value is not equal to min and showStatus is false", function() {
            var pb = new ProgressBar(container, {
                min: 0,
                max: 1000,
                value: 200,
                showStatus: false
            });

            var progressWrapperExpectedSize = pb._calculatePercentage().toFixed(2);
            var actualProgressWrapperSize = parseFloat(pb.wrapper.find(".k-state-selected")[0].style.width).toFixed(2);

            assert.equal(actualProgressWrapperSize, progressWrapperExpectedSize);
        });

        it("ProgressBar wrapper contains progress status holder when value is equal to min and showStatus is true", function() {
            var pb = new ProgressBar(container, {
                showStatus: true
            });

            var progressStatusHolder = pb.wrapper.children("span.k-progress-status-wrap");

            assert.equal(progressStatusHolder.length, 1);
        });

        it("ProgressBar wrapper contains progress status holder and progress wrapper when value is not equal to min and showStatus is true", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                max: 200,
                value: 50,
                showStatus: true
            });

            var progressStatusHolder = pb.wrapper.children("span.k-progress-status-wrap");
            var progressWrapper = pb.wrapper.find(".k-state-selected");
            var progressWrapperStatusHolder = $("span.k-progress-status-wrap", progressWrapper);

            assert.equal(progressStatusHolder.length, 1);
            assert.equal(progressWrapper.length, 1);
            assert.equal(progressWrapperStatusHolder.length, 1);
        });

        it("Status holder text is set correctly when value is not equal to min and showStatus is true", function() {
            var pb = new ProgressBar(container, {
                min: 10,
                max: 200,
                value: 50,
                showStatus: true
            });

            assert.equal(pb.wrapper.children("span.k-progress-status-wrap").text(), pb.options.value);
        });
    });

    describe("ProgessBar chunk initialization", function() {
        beforeEach(moduleSetup);
        afterEach(moduleTeardown);

        it("Chunk ProgressBar contains a single ul element to hold the chunks", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.equal(pb.wrapper.find("ul.k-reset").length, 1);
        });

        it("Chunk ProgressBar contains a li element for each chunk", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.equal(pb.wrapper.find("li.k-item").length, pb.options.chunkCount);
        });

        it("Correct css class is added to each upcoming chunk", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(pb.wrapper.find("li.k-item").hasClass("k-state-default"));
        });

        it("Correct css class is added to the first chunk", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(pb.wrapper.find("li.k-item:first").hasClass("k-first"));
        });

        it("Correct css class is added to the last chunk", function() {
            var pb = new ProgressBar(container, {
                type: "chunk"
            });

            assert.isOk(pb.wrapper.find("li.k-item:last").hasClass("k-last"));
        });

        it("Correct css class is added to the completed chunks", function() {
            var pb = new ProgressBar(container, {
                type: "chunk",
                value: 45
            });

            var completedChunks = pb.wrapper.find("li.k-item:lt(2)");

            assert.equal(pb.wrapper.find("li.k-item.k-state-selected").length, completedChunks.length);
        });

        it("Chunk size is calculated correctly according to chunk count", function() {
            var pb = new ProgressBar(container, {
                type: "chunk",
                chunkCount: 17
            });

            var chunkCount = pb.options.chunkCount;
            var expectedChunkSize = parseFloat(pb.wrapper.find("ul.k-reset li.k-item:first")[0].style.width).toFixed(2);
            var actualChunkSize = (100 / chunkCount).toFixed(2);

            assert.equal(actualChunkSize, expectedChunkSize);
        });

        it("Chunk count is reset to one if negative chunk count is passed", function() {
            var pb = new ProgressBar(container, {
                type: "chunk",
                chunkCount: -5
            });

            var chunkCount = pb.options.chunkCount;
            assert.equal(chunkCount, 1);
        });

        it("Chunk count is reset to default if chunk count is less than two", function() {
            var pb = new ProgressBar(container, {
                type: "chunk",
                chunkCount: 1
            });

            var chunkCount = pb.options.chunkCount;
            assert.equal(chunkCount, 1);
        });
    });
}());
