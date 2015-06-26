(function(){
var pb;

function createPbHtml(){
    var html = "<div id='test-container'>" +
        "<div id='progressbar'></div>" +
        "</div>";

    $(html).appendTo(QUnit.fixture);
}

function createProgressbar(options){
    createPbHtml();

    $("#progressbar").kendoProgressBar(options);
    return $("#progressbar").data("kendoProgressBar");
}

function moduleSetup() {
    //pb = createProgressbar();
}

function moduleTeardown() {
    kendo.destroy(QUnit.fixture);
}

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Rendering", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

asyncTest("k-complete is added when the progress width is more than 98%", function() {
    var progressCompleted = false;

    pb = createProgressbar({
        animation: false,
        complete: function(e){
            progressCompleted = true;
        }
    });

    pb.value(99);

    setTimeout(function(){
        equal(pb.wrapper.find(".k-complete").length, 1);
        start();
    }, 30);
});

asyncTest("k-complete is removed when the progress width becomes less than 98%", function() {
    var progressCompleted = false;

    pb = createProgressbar({
        animation: false,
        complete: function(e){
            progressCompleted = true;
        }
    });

    pb.value(99);
    pb.value(90);

    setTimeout(function(){
        equal(pb.wrapper.find(".k-complete").length, 0);
        start();
    }, 30);
});

asyncTest("k-complete is not added when the progress width is less than or equal to 98%", function() {
    var progressCompleted = false;

    pb = createProgressbar({
        animation: false,
        complete: function(e){
            progressCompleted = true;
        }
    });

    pb.value(98);

    setTimeout(function(){
        equal(pb.wrapper.find(".k-complete").length, 0);
        start();
    }, 50);
});

asyncTest("Complete event has correct value parameter (type='value')", function() {
    var value;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "value",
        complete: function(e){
            value = e.value;
        }
    });

    pb.value(165);

    setTimeout(function() {
        equal(value, pb.options.max);
        start();
    }, 30);
});

asyncTest("Complete event has correct value parameter (type='percent')", function() {
    var value;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "percent",
        complete: function(e){
            value = e.value;
        }
    });

    pb.value(165);

    setTimeout(function() {
        equal(value, pb.options.max);
        start();
    }, 30);
});

asyncTest("Complete event has correct value parameter (type='chunk')", function() {
    var value;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "chunk",
        complete: function(e){
            value = e.value;
        }
    });

    pb.value(165);

    setTimeout(function() {
        equal(value, pb.options.max);
        start();
    }, 30);
});

asyncTest("Change event has correct value parameter (type='value')", function() {
    var value;
    var expected = 120;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "value",
        change: function(e){
            value = e.value;
        }
    });

    pb.value(120);

    setTimeout(function() {
        equal(value, expected);
        start();
    }, 30);
});

asyncTest("Change event has correct value parameter (type='percent')", function() {
    var value;
    var expected = 120;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "percent",
        change: function(e){
            value = e.value;
        }
    });

    pb.value(120);

    setTimeout(function() {
        equal(value, expected);
        start();
    }, 30);
});

asyncTest("Change event has correct value parameter (type='chunk')", function() {
    var value;
    var expected = 120;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "chunk",
        change: function(e){
            value = e.value;
        }
    });

    pb.value(120);

    setTimeout(function() {
        equal(value, expected);
        start();
    }, 30);
});

asyncTest("Context is correctly set in complete event (type='value')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "value",
        complete: function(e){
            context = this;
        }
    });

    pb.value(165);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Context is correctly set in complete event (type='percent')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "percent",
        complete: function(e){
            context = this;
        }
    });

    pb.value(130);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Context is correctly set in complete event (type='chunk')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "chunk",
        complete: function(e){
            context = this;
        }
    });

    pb.value(130);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Context is correctly set in change event (type='value')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "value",
        change: function(e){
            context = this;
        }
    });

    pb.value(150);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Context is correctly set in change event (type='percent')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "percent",
        change: function(e){
            context = this;
        }
    });

    pb.value(150);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Context is correctly set in change event (type='chunk')", function() {
    var context;

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        type: "chunk",
        change: function(e){
            context = this;
        }
    });

    pb.value(150);

    setTimeout(function() {
        equal(context, pb);
        start();
    }, 30);
});

asyncTest("Complete event is fired after change event", 2, function() {
    var events = [];

    pb = createProgressbar({
        min: -50,
        max: 165,
        value: -50,
        animation: false,
        complete: function(e){
            events.push("complete");
        },
        change: function(e){
            events.push("change");
        }
    });

    pb.value(165);

    setTimeout(function(){
        equal(events[0], "change");
        equal(events[1], "complete");
        start();
    }, 30);
});

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Rendering / Chunk progressbar", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("k-progressbar-reverse class is added to progressbar (type='chunk')", function() {
    pb = createProgressbar({
        type: "chunk",
        reverse: true
    });

    ok(pb.wrapper.hasClass("k-progressbar-reverse"));
});

test("Correct chunks are updated when progressbar is orientation:horizontal and reverse: false", function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "horizontal",
        reverse: false,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(2);

    equal(pb.wrapper.find("li:lt(2)").filter(".k-state-selected").length, 2);
});

test("Correct chunks are updated when progressbar is orientation:horizontal and reverse: true", function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "horizontal",
        reverse: true,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(2);

    equal(pb.wrapper.find("li:gt(2)").filter(".k-state-selected").length, 2);
});

test("Correct chunks are updated when progressbar is orientation:vertical and reverse: false", function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "vertical",
        reverse: false,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(2);

    equal(pb.wrapper.find("li:gt(2)").filter(".k-state-selected").length, 2);
});

test("Correct chunks are updated when progressbar is orientation:vertical and reverse: true", function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "vertical",
        reverse: true,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(2);

    equal(pb.wrapper.find("li:lt(2)").filter(".k-state-selected").length, 2);
});

test("Correct chunks are updated when progressbar is orientation:horizontal and reverse: false and value was decreased", 2, function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "horizontal",
        reverse: false,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(4);
    pb.value(2);

    equal(pb.wrapper.find("li:lt(2)").filter(".k-state-selected").length, 2);
    equal(pb.wrapper.find(".k-state-default").length, 3);
});

test("Correct chunks are updated when progressbar is orientation:horizontal and reverse: true and value was decreased", 2, function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "horizontal",
        reverse: true,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(4);
    pb.value(2);

    equal(pb.wrapper.find("li:gt(2)").filter(".k-state-selected").length, 2);
    equal(pb.wrapper.find(".k-state-default").length, 3);
});

test("Correct chunks are updated when progressbar is orientation:vertical and reverse: false and value was decreased", 2, function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "vertical",
        reverse: false,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(4);
    pb.value(2);

    equal(pb.wrapper.find("li:gt(2)").filter(".k-state-selected").length, 2);
    equal(pb.wrapper.find(".k-state-default").length, 3);
});

test("Correct chunks are updated when progressbar is orientation:vertical and reverse: true and value was decreased", 2, function() {
    pb = createProgressbar({
        type: "chunk",
        orientation: "vertical",
        reverse: true,
        min: 0,
        max: 5,
        value: 0,
        chunkCount: 5
    });

    pb.value(4);
    pb.value(2);

    equal(pb.wrapper.find("li:lt(2)").filter(".k-state-selected").length, 2);
    equal(pb.wrapper.find(".k-state-default").length, 3);
});

asyncTest("isStarted is set to true when the value is changed for the first time", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 10,
        type: "chunk",
        showStatus: true
    });

    pb.value(50);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});

asyncTest("isStarted remains true when the value has been changed and then set to the initial value", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        type: "chunk",
        showStatus: true
    });

    pb.value(50);
    pb.value(0);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});

asyncTest("Correct chunk count is updated when range is more than chunkCount", function() {
    pb = createProgressbar({
        min: 0,
        max: 300,
        value: 0,
        type: "chunk",
        chunkCount: 10
    });

    pb.value(150);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected").length, 5);

        start();
    }, 30);
});

asyncTest("Correct chunk count is updated when range is less than chunkCount", function() {
    pb = createProgressbar({
        min: 0,
        max: 10,
        value: 0,
        type: "chunk",
        chunkCount: 20
    });

    pb.value(2);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected").length, 4);

        start();
    }, 30);
});

asyncTest("The last chunk is not filled until max value is reached", function() {
    pb = createProgressbar({
        min: 0,
        max: 10000,
        value: 0,
        type: "chunk",
        chunkCount: 20
    });

    pb.value(9999);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected").length, 19);

        start();
    }, 30);
});


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Rendering / Regular progressbar", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is true (type: 'value')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: 100,
        animation: false,
        type: "value",
        showStatus: true
    });

    pb.value(-50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:hidden").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is true (type: 'percent')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: 100,
        animation: false,
        type: "percent",
        showStatus: true
    });

    pb.value(-50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:hidden").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is false (type: 'value')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: 100,
        animation: false,
        type: "value",
        showStatus: false
    });

    pb.value(-50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:hidden").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is false (type: 'percent')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: 100,
        animation: false,
        type: "percent",
        showStatus: false
    });

    pb.value(-50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:hidden").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is true (type: 'value')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "value",
        showStatus: true
    });

    pb.value(-20);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is true (type: 'percent')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "percent",
        showStatus: true
    });

    pb.value(-20);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is false (type: 'value')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "value",
        showStatus: false
    });

    pb.value(-20);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is false (type: 'percent')", function() {
    pb = createProgressbar({
        min: -50,
        max: 130,
        value: -50,
        animation: false,
        type: "percent",
        showStatus: false
    });

    pb.value(-20);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is shown again when hidden once, showStatus is true (type: 'value')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        animation: false,
        type: "value",
        showStatus: true
    });

    pb.value(20);
    pb.value(0);
    pb.value(50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is shown again when hidden once, showStatus is true (type: 'percent')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        animation: false,
        type: "percent",
        showStatus: true
    });

    pb.value(20);
    pb.value(0);
    pb.value(50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is shown again when hidden once, showStatus is false (type: 'value')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        animation: false,
        type: "value",
        showStatus: false
    });

    pb.value(20);
    pb.value(0);
    pb.value(50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress status wrapper is shown again when hidden once, showStatus is false (type: 'percent')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        animation: false,
        type: "percent",
        showStatus: false
    });

    pb.value(20);
    pb.value(0);
    pb.value(50);

    setTimeout(function() {
        equal(pb.wrapper.find(".k-state-selected:visible").length, 1);
        start();
    }, 30);
});

asyncTest("Progress wrapper width stays the same when the ProgressBar wrapper is resized and showStatus is false", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 50,
        animation: false,
        type: "percent",
        showStatus: false
    });

    var prevWidth = pb.wrapper.find(".k-state-selected")[0].style.width;
    pb.wrapper.width(700);
    var currentWidth = pb.wrapper.find(".k-state-selected")[0].style.width;

    setTimeout(function() {
        equal(prevWidth, currentWidth);
        start();
    }, 30);
});

asyncTest("Progress wrapper width stays the same when the ProgressBar wrapper is resized and showStatus is true", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 50,
        animation: false,
        type: "percent",
        showStatus: true
    });

    var prevWidth = pb.wrapper.find(".k-state-selected")[0].style.width;
    pb.wrapper.width(700);
    var currentWidth = pb.wrapper.find(".k-state-selected")[0].style.width;

    setTimeout(function() {
        equal(prevWidth, currentWidth);
        start();
    }, 30);
});

test("Progress status text displays 100% even when floating point calculation precision fails", 2, function () {
    pb = createProgressbar({
        min: 0,
        max: 7,
        value: 7,
        animation: false,
        type: "percent",
        showStatus: true
    });

    var statuses = pb.progressStatus;
    equal(statuses.eq(0).text(), "100%");
    equal(statuses.eq(1).text(), "100%");
});

asyncTest("Progress status holder wrapper width stays the same when the ProgressBar wrapper is resized (type='percent')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 50,
        animation: false,
        type: "percent",
        showStatus: true
    });

    var prevWidth = pb.wrapper.find(".k-state-selected .k-progress-status-wrap")[0].style.width;
    pb.wrapper.width(700);
    var currentWidth = pb.wrapper.find(".k-state-selected .k-progress-status-wrap")[0].style.width;

    setTimeout(function() {
        equal(prevWidth, currentWidth);
        start();
    }, 30);
});

asyncTest("Progress status holder wrapper width stays the same when the ProgressBar wrapper is resized (type='value')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 50,
        animation: false,
        type: "value",
        showStatus: true
    });

    var prevWidth = pb.wrapper.find(".k-state-selected .k-progress-status-wrap")[0].style.width;
    pb.wrapper.width(700);
    var currentWidth = pb.wrapper.find(".k-state-selected .k-progress-status-wrap")[0].style.width;

    setTimeout(function() {
        equal(prevWidth, currentWidth);
        start();
    }, 30);
});

asyncTest("isStarted is set to true when the value is changed for the first time (type='value')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 10,
        type: "value",
        showStatus: true,
        animation: false
    });

    pb.value(50);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});

asyncTest("isStarted remains true when the value has been changed and then set to the initial value (type='value')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        type: "value",
        showStatus: true,
        animation: false
    });

    pb.value(50);
    pb.value(0);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});

asyncTest("isStarted is set to true when the value is changed for the first time (type='percent')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 10,
        type: "percent",
        showStatus: true,
        animation: false
    });

    pb.value(50);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});

asyncTest("isStarted remains true when the value has been changed and then set to the initial value (type='percent')", function() {
    pb = createProgressbar({
        min: 0,
        max: 130,
        value: 0,
        type: "percent",
        showStatus: true,
        animation: false
    });

    pb.value(50);
    pb.value(0);

    setTimeout(function() {
        ok(pb._isStarted);

        start();
    }, 30);
});
})();