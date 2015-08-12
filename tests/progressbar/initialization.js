(function(){
var ProgressBar = kendo.ui.ProgressBar,
    container;

function moduleSetup() {
    container = document.createElement("div");
    $(container).appendTo(QUnit.fixture);
}

function moduleTeardown() {
    kendo.destroy(QUnit.fixture);
}

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Initialization", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("kendoProgressBar attaches a progressbar object to target", function() {
    var dom = $('<div/>');
    dom.appendTo(QUnit.fixture);

    var pb = dom.kendoProgressBar();

    ok(pb.data("kendoProgressBar") instanceof ProgressBar);
});

test("The element of the progressbar is set to the target from which it was initialized", function() {
    var pb = new ProgressBar(container);

    equal(pb.element[0], container);
});

test("Wrapper field is initialized", function() {
   var pb = new ProgressBar(container);

   equal(pb.wrapper[0], container);
});

test("Css classes are added to the wrapper", function() {
    var pb = new ProgressBar(container);

    ok(pb.wrapper.hasClass("k-widget"));
    ok(pb.wrapper.hasClass("k-progressbar"));
});

test("Correct css classes for horizontal progressbar are added to the wrapper", function() {
    var pb = new ProgressBar(container, {
        orientation: "horizontal"
    });

    ok(pb.wrapper.hasClass("k-progressbar-horizontal"));
});

test("Correct css classes for vertical progressbar are added to the wrapper", function() {
    var pb = new ProgressBar(container, {
        orientation: "vertical"
    });

    ok(pb.wrapper.hasClass("k-progressbar-vertical"));
});

test("Correct css classes for horizontal reverse progressbar are added to the wrapper", function() {
    var pb = new ProgressBar(container, {
        reverse: true
    });

    ok(pb.wrapper.hasClass("k-progressbar-horizontal"));
    ok(pb.wrapper.hasClass("k-progressbar-reverse"));
});

test("Correct css classes for vertical reverse progressbar are added to the wrapper", function() {
    var pb = new ProgressBar(container, {
        reverse: true,
        orientation: "vertical"
    });

    ok(pb.wrapper.hasClass("k-progressbar-vertical"));
    ok(pb.wrapper.hasClass("k-progressbar-reverse"));
});

test("Initial value is normalized correctly when it is less than min", function() {
    var pb = new ProgressBar(container, {
        min: 10,
        max: 100,
        value: 0
    });

    equal(pb.options.value, pb.options.min);
});

test("Initial value is normalized correctly when it is more than max", function() {
    var pb = new ProgressBar(container, {
        min: 10,
        max: 100,
        value: 1000
    });

    equal(pb.options.value, pb.options.max);
});

asyncTest("Start event is not fired on initialization when value is more than min", function() {
    var startFired = false,
        pb = new ProgressBar(container, {
        min: 10,
        max: 100,
        value: 30,
        start: function(){
            startFired = true;
        }
    });

    setTimeout(function() {
        ok(!startFired);
        start();
    }, 50);
});

test("Progress property is set to width when orientation is horizontal", function() {
    var pb = new ProgressBar(container, {
        orientation: "horizontal"
    });

    equal(pb._progressProperty, "width");
});

test("Progress property is set to height when orientation is vertical", function() {
    var pb = new ProgressBar(container, {
        orientation: "vertical"
    });

    equal(pb._progressProperty, "height");
});


test("Animation duration is equal to default animation duration when not specified", function() {
    var pb = new ProgressBar(container, { }),
        defaultAnimationDuration = 400;

    equal(pb._animation.duration, defaultAnimationDuration);
});

test("Animation is correctly set to false", function() {
    var pb = new ProgressBar(container, {
        animation: false
    });

    ok(!pb.options.animation);
});

test("Animation duration is overriden when specified by user", function() {
    var pb = new ProgressBar(container, {
        animation: {
            duration: 789
        }
    });

    equal(pb.options.animation.duration, 789);
});

test("k-progressbar-indeterminate class is set correctly when initial value is false (type='value')", function() {
    var pb = new ProgressBar(container, {
        value: false,
        type: "value"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-progressbar-indeterminate class is set correctly when initial value is false (type='percent')", function() {
    var pb = new ProgressBar(container, {
        value: false,
        type: "percent"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-progressbar-indeterminate class is set correctly when initial value is false (type='chunk')", function() {
    var pb = new ProgressBar(container, {
        value: false,
        type: "chunk"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-progressbar-indeterminate class is not set when initial value is not false (type='value')", function() {
    var pb = new ProgressBar(container, {
        value: 20,
        type: "value"
    });

    ok(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-progressbar-indeterminate class is not set when initial value is not false (type='percent')", function() {
    var pb = new ProgressBar(container, {
        value: 20,
        type: "percent"
    });

    ok(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-progressbar-indeterminate class is not set when initial value is not false (type='chunk')", function() {
    var pb = new ProgressBar(container, {
        value: 20,
        type: "chunk"
    });

    ok(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("k-state-disabled class is added when ProgressBar is disabled initially", function() {
    var pb = new ProgressBar(container, {
        enable: false
    });

    ok(pb.wrapper.hasClass("k-state-disabled"));
});

test("Initial value is set correctly to false", function() {
    var pb = new ProgressBar(container, {
        value: false
    });

    equal(pb.value(), false);
});

test("Initial value false correctly sets status holder text to min (type='value')", function() {
    var pb = new ProgressBar(container, {
        value: false,
        type: "value"
    });

    equal(pb.wrapper.children(".k-progress-status-wrap").text(), pb.options.min);
});

test("Initial value false correctly sets status holder text to min (type='percent')", function() {
    var pb = new ProgressBar(container, {
        value: false,
        type: "percent"
    });

    equal(pb.wrapper.children(".k-progress-status-wrap").text(), pb.options.min + "%");
});

test("Progress wrapper is not added when initial value is false", function() {
    var pb = new ProgressBar(container, {
        value: false
    });

    equal(pb.wrapper.find(".k-state-selected").length, 0);
});

test("ProgressBar is correctly disabled and initial value is set to false (type='value')", 3, function() {
    var pb = new ProgressBar(container, {
        value: false,
        enable: false,
        type: "value"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
    ok(pb.wrapper.hasClass("k-state-disabled"));
    equal(pb.options.value, false);
});

test("ProgressBar is correctly disabled and initial value is set to false (type='percent')", 3, function() {
    var pb = new ProgressBar(container, {
        value: false,
        enable: false,
        type: "percent"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
    ok(pb.wrapper.hasClass("k-state-disabled"));
    equal(pb.options.value, false);
});

test("ProgressBar is correctly disabled and initial value is set to false (type='chunk')", 3, function() {
    var pb = new ProgressBar(container, {
        value: false,
        enable: false,
        type: "chunk"
    });

    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
    ok(pb.wrapper.hasClass("k-state-disabled"));
    equal(pb.options.value, false);
});

test("_isStarted is set to false initially when value is equal to min", function(){
    var pb = new ProgressBar(container, {
        value: 0,
        min: 0
    });

    equal(pb._isStarted, false);
});

test("_isStarted is set to false initially when value is not equal to min", function(){
    var pb = new ProgressBar(container, {
        value: 10,
        min: 0
    });

    equal(pb._isStarted, false);
});

test("ProgressBar is initialized correctly via data attribute", function() {
    var dom = $("<div data-role='progressbar'></div>");
    $(container).append(dom);

    kendo.init($(container));

    ok($(container.firstChild).data("kendoProgressBar") instanceof ProgressBar);
});

test("ProgressBar value is set correctly via data attribute", function() {
    var dom = $("<div data-role='progressbar' data-value='25'></div>");
    $(container).append(dom);

    kendo.init($(container));

    equal($(container.firstChild).data("kendoProgressBar").value(), 25);
});

test("ProgressBar type is set correctly via data attribute", function() {
    var dom = $("<div data-role='progressbar' data-type='chunk'></div>");
    $(container).append(dom);

    kendo.init($(container));

    equal($(container.firstChild).data("kendoProgressBar").options.type, "chunk");
});

test("ProgressBar events are raised when set via data attribute", function() {
    var dom = $("<div data-role='progressbar' data-bind='events: {change: onPbChange}' data-animation='false'></div>");
    var fired = false;

    $(container).append(dom);

    var observable = kendo.observable({
        onPbChange: function(e){
            ok(true);
        }
    });

    kendo.bind($(container), observable);

    dom.data("kendoProgressBar").value(10);
});

test("Error is thrown when invalid type is passed", function() {
    throws(function() {
        var pb = new ProgressBar(container, {
            type: "invalid"
        });
    });
});

test("Error is not thrown when type is 'value'", function() {
    var pb = new ProgressBar(container, {
        type: "value"
    });

    ok(true);
});

test("Error is not thrown when type is 'percent'", function() {
    var pb = new ProgressBar(container, {
        type: "percent"
    });

    ok(true);
});

test("Error is not thrown when type is 'chunk'", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(true);
});

test("progressStatus field is set when showStatus is true and value is equal to min (type='value')", function() {
    var pb = new ProgressBar(container, {
        type: "value"
    });

    equal(pb.progressStatus.length, 1);
});

test("progressStatus field is set when showStatus is true and value is equal to min (type='percent')", function() {
    var pb = new ProgressBar(container, {
        type: "percent"
    });

    equal(pb.progressStatus.length, 1);
});

test("progressStatus field is set when showStatus is true and value is not equal to min (type='value')", function() {
    var pb = new ProgressBar(container, {
        type: "value",
        min: 0,
        max: 10,
        value: 5
    });

    equal(pb.progressStatus.length, 2);
});

test("progressStatus field is set when showStatus is true and value is not equal to min (type='percent')", function() {
    var pb = new ProgressBar(container, {
        type: "percent",
        min: 0,
        max: 10,
        value: 5
    });

    equal(pb.progressStatus.length, 2);
});


test("progressStatus field is set to empty jQuery object when type is 'chunk'", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(pb.progressStatus instanceof jQuery);
});

test("progressWrapper field is set to empty jQuery object when type is 'chunk'", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(pb.progressWrapper instanceof jQuery);
});

test("progressWrapper field is set to empty jQuery object when value is equal to min (type='value')", function() {
    var pb = new ProgressBar(container, {
        type: "value",
        min: 5,
        value: 5
    });

    ok(pb.progressWrapper instanceof jQuery);
});

test("progressWrapper field is set to empty jQuery object when value is equal to min (type='percent')", function() {
    var pb = new ProgressBar(container, {
        type: "percent",
        min: 5,
        value: 5
    });

    ok(pb.progressWrapper instanceof jQuery);
});

test("progressWrapper field is set when value is  not equal to min (type='value')", function() {
    var pb = new ProgressBar(container, {
        type: "value",
        min: 5,
        value: 10
    });

    ok(pb.hasOwnProperty("progressWrapper"));
});

test("progressWrapper field is set when value is  not equal to min (type='percent')", function() {
    var pb = new ProgressBar(container, {
        type: "percent",
        min: 5,
        value: 10
    });

    ok(pb.hasOwnProperty("progressWrapper"));
});


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
module("Initialization / Regular ProgressBar", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("ProgressBar wrapper is empty when value is equal to min and showStatus is false", function() {
    var pb = new ProgressBar(container, {
        min: 10,
        value: 10,
        showStatus: false
    });

    ok(pb.wrapper.is(":empty"));
});

test("ProgressBar contains empty div for progress wrapper when value is not equal to min and showStatus is false", function() {
    var pb = new ProgressBar(container, {
        min: 10,
        value: 20,
        showStatus: false
    });

    var progressWrapper = pb.wrapper.find(".k-state-selected");

    equal(progressWrapper.length, 1);
    ok(progressWrapper.is(":empty"));
});

test("Size of progress wrapper div reflects value when value is not equal to min and showStatus is false", function() {
    var pb = new ProgressBar(container, {
        min: 0,
        max: 1000,
        value: 200,
        showStatus: false
    });

    var progressWrapperExpectedSize = pb._calculatePercentage().toFixed(2);
    var actualProgressWrapperSize = parseFloat(pb.wrapper.find(".k-state-selected")[0].style.width).toFixed(2);

    equal(actualProgressWrapperSize, progressWrapperExpectedSize);
});

test("ProgressBar wrapper contains progress status holder when value is equal to min and showStatus is true", function() {
    var pb = new ProgressBar(container, {
        showStatus: true
    });

    var progressStatusHolder = pb.wrapper.children("span.k-progress-status-wrap");

    equal(progressStatusHolder.length, 1);
});

test("ProgressBar wrapper contains progress status holder and progress wrapper when value is not equal to min and showStatus is true", 3, function() {
    var pb = new ProgressBar(container, {
        min: 10,
        max: 200,
        value: 50,
        showStatus: true
    });

    var progressStatusHolder = pb.wrapper.children("span.k-progress-status-wrap");
    var progressWrapper = pb.wrapper.find(".k-state-selected");
    var progressWrapperStatusHolder = $("span.k-progress-status-wrap", progressWrapper);

    equal(progressStatusHolder.length, 1);
    equal(progressWrapper.length, 1);
    equal(progressWrapperStatusHolder.length, 1);
});

test("Status holder text is set correctly when value is not equal to min and showStatus is true", function() {
    var pb = new ProgressBar(container, {
        min: 10,
        max: 200,
        value: 50,
        showStatus: true
    });

    equal(pb.wrapper.children("span.k-progress-status-wrap").text(), pb.options.value);
});


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
module("Initialization / Chunk ProgressBar", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("Chunk ProgressBar contains a single ul element to hold the chunks", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    equal(pb.wrapper.find("ul.k-reset").length, 1);
});

test("Chunk ProgressBar contains a li element for each chunk", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    equal(pb.wrapper.find("li.k-item").length, pb.options.chunkCount);
});

test("Correct css class is added to each upcoming chunk", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(pb.wrapper.find("li.k-item").hasClass("k-state-default"));
});

test("Correct css class is added to the first chunk", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(pb.wrapper.find("li.k-item:first").hasClass("k-first"));
});

test("Correct css class is added to the last chunk", function() {
    var pb = new ProgressBar(container, {
        type: "chunk"
    });

    ok(pb.wrapper.find("li.k-item:last").hasClass("k-last"));
});

test("Correct css class is added to the completed chunks", function() {
    var pb = new ProgressBar(container, {
        type: "chunk",
        value: 45
    });

    var completedChunks = pb.wrapper.find("li.k-item:lt(2)");

    equal(pb.wrapper.find("li.k-item.k-state-selected").length, completedChunks.length);
});

test("Chunk size is calculated correctly according to chunk count", function() {
    var pb = new ProgressBar(container, {
        type: "chunk",
        chunkCount: 17
    });

    var chunkCount = pb.options.chunkCount;
    var chunkWrapperSize = pb.wrapper.find("ul.k-reset").width();
    var expectedChunkSize = parseFloat(pb.wrapper.find("ul.k-reset li.k-item:first")[0].style.width).toFixed(2);
    var actualChunkSize = (100 / pb.options.chunkCount).toFixed(2);

    equal(actualChunkSize, expectedChunkSize);
});

test("Chunk count is reset to one if negative chunk count is passed", function() {
    var pb = new ProgressBar(container, {
        type: "chunk",
        chunkCount: -5
    });

    var chunkCount = pb.options.chunkCount;
    equal(chunkCount, 1);
});

test("Chunk count is reset to default if chunk count is less than two", function() {
    var pb = new ProgressBar(container, {
        type: "chunk",
        chunkCount: 1
    });

    var chunkCount = pb.options.chunkCount;
    equal(chunkCount, 1);
});
})();
