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
module("value", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("value method returns the actual initial value", function () {
    pb = createProgressbar({
        value: 50
    });

    equal(pb.value(), 50);
});

test("value method sets indeterminate state correctly when false is passed", function () {
    pb = createProgressbar({
        value: 50
    });

    pb.value(false);

    equal(pb.value(), false);
});

test("value method does not set indeterminate state when true is passed", function () {
    pb = createProgressbar({
        value: 50
    });

    pb.value(true);

    equal(pb.value(), 50);
});

test("value method sets value correctly when the value is between min and max", function () {
    pb = createProgressbar({
        value: 50,
        min: 20,
        max: 60
    });

    pb.value(40);

    equal(pb.value(), 40);
});

test("value method sets value equal to max value when it is bigger than max", function () {
    pb = createProgressbar({
        value: 50,
        min: 20,
        max: 60
    });

    pb.value(100);

    equal(pb.value(), pb.options.max);
});

test("value method sets value equal to min value when it is smaller than min", function () {
    pb = createProgressbar({
        value: 50,
        min: 20,
        max: 60
    });

    pb.value(10);

    equal(pb.value(), pb.options.min);
});

test("value method sets the value when it is equal to min", function () {
    pb = createProgressbar({
        value: 50,
        min: 20,
        max: 60
    });

    pb.value(20);

    equal(pb.value(), 20);
});

test("value method sets the value when it is equal to max", function () {
    pb = createProgressbar({
        value: 50,
        min: 20,
        max: 60
    });

    pb.value(60);

    equal(pb.value(), 60);
});

asyncTest("Change event is fired only once per value (type='chunk')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "chunk",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(30);
    pb.value(30);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value (type='value')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "value",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(30);
    pb.value(30);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value (type='percent')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "percent",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(30);
    pb.value(30);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value bigger than max (type='percent')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "percent",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(60);
    pb.value(65);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value bigger than max (type='value')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "value",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(60);
    pb.value(65);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value bigger than max (type='chunk')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "chunk",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(60);
    pb.value(65);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value smaller than min (type='percent')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 30,
        type: "percent",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(20);
    pb.value(15);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value smaller than min (type='value')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 30,
        type: "value",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(20);
    pb.value(15);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Change event is fired only once per value when trying to set value smaller than min (type='chunk')", function() {
    var changeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 30,
        type: "chunk",
        change: function(){
            changeFiredCounter++;
        },
        animation: false
    });

    pb.value(20);
    pb.value(15);

    setTimeout(function(){
        equal(changeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Complete event is not fired before max is reached (type='value')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "value",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(30);
    pb.value(50);
    pb.value(59);

    setTimeout(function(){
        ok(!completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired when max is reached (type='value')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "value",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(50);
    pb.value(59);
    pb.value(60);

    setTimeout(function(){
        ok(completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired each time when max is reached (type='value')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "value",
        complete: function(){
            completeFiredCounter++;
        },
        animation: false
    });

    pb.value(60);
    pb.value(50);
    pb.value(65);

    setTimeout(function(){
        equal(completeFiredCounter, 2);
        start();
    }, 30);
});

asyncTest("Complete event is not fired before max is reached (type='percent')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "percent",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(30);
    pb.value(50);
    pb.value(59);

    setTimeout(function(){
        ok(!completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired when max is reached (type='percent')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "percent",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(50);
    pb.value(59);
    pb.value(60);

    setTimeout(function(){
        ok(completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired each time when max is reached (type='percent')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "percent",
        complete: function(){
            completeFiredCounter++;
        },
        animation: false
    });

    pb.value(60);
    pb.value(50);
    pb.value(65);

    setTimeout(function(){
        equal(completeFiredCounter, 2);
        start();
    }, 30);
});

asyncTest("Complete event is not fired before max is reached (type='chunk')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "chunk",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(30);
    pb.value(50);
    pb.value(59);

    setTimeout(function(){
        ok(!completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired when max is reached (type='chunk')", function(){
    var completeFired = false;

    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        type: "chunk",
        complete: function(){
            completeFired = true;
        },
        animation: false
    });

    pb.value(50);
    pb.value(59);
    pb.value(60);

    setTimeout(function(){
        ok(completeFired);
        start();
    }, 30);
});

asyncTest("Complete event is fired each time when max is reached (type='chunk')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
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
        equal(completeFiredCounter, 2);
        start();
    }, 30);
});

asyncTest("Complete event is not fired max is set multiple times in a row (type='value')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
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
        equal(completeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Complete event is not fired max is set multiple times in a row (type='percent')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
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
        equal(completeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("Complete event is not fired max is set multiple times in a row (type='chunk')", function(){
    var completeFiredCounter = 0;

    pb = createProgressbar({
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
        equal(completeFiredCounter, 1);
        start();
    }, 30);
});

asyncTest("k-progressbar-indeterminate class is set correctly when passed value is false", function(){
    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        animation: false
    });

    pb.value(false);

    setTimeout(function() {
        ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
        start();
    }, 30);
});

asyncTest("k-progressbar-indeterminate class is removed when previous value was false", function(){
    pb = createProgressbar({
        min: 20,
        max: 60,
        value: 20,
        animation: false
    });

    pb.value(false);
    pb.value(40);

    setTimeout(function() {
        ok(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
        start();
    }, 30);
});

asyncTest("k-progressbar-indeterminate class is removed when initial value was false", function(){
    pb = createProgressbar({
        min: 20,
        max: 60,
        value: false,
        animation: false
    });

    pb.value(40);

    setTimeout(function() {
        ok(!pb.wrapper.hasClass("k-progressbar-indeterminate"));
        start();
    }, 30);
});

asyncTest("One percent is calculated correctly", function(){
    pb = createProgressbar({
        min: 0,
        max: 300,
        value: 0,
        animation: false
    });

    pb.value(40);

    setTimeout(function() {
        equal(pb._onePercent, 3);

        start();
    }, 30);
});

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("enable", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("enable method renders k-state-disabled class when false is passed", function () {
    pb = createProgressbar();

    pb.enable(false);

    ok(pb.wrapper.hasClass("k-state-disabled"));
});

test("enable method removes k-state-disabled class when no parameter is passed", function () {
    pb = createProgressbar();

    pb.enable(false);
    pb.enable();

    ok(!pb.wrapper.hasClass("k-state-disabled"));
});

test("enable method removes k-state-disabled class when true is passed", function () {
    pb = createProgressbar();

    pb.enable(false);
    pb.enable(true);

    ok(!pb.wrapper.hasClass("k-state-disabled"));
});

test("enable method does not add k-state-disabled class if not needed", function () {
    pb = createProgressbar();

    pb.enable();
    pb.enable(true);

    ok(!pb.wrapper.hasClass("k-state-disabled"));
});

test("enable method does not removes k-state-disabled class if not needed", function () {
    pb = createProgressbar();

    pb.enable(false);
    pb.enable(false);

    ok(pb.wrapper.hasClass("k-state-disabled"));
});

test("enable does not disable progressbar", function(){
    pb = createProgressbar();
    pb.enable();

    ok(!pb.wrapper.hasClass("k-state-disabled"));
});

test("initially disabled state is applied", function() {
    pb = createProgressbar({
        enable: false
    });

    ok(pb.wrapper.hasClass("k-state-disabled"));
});

test("ProgressBar does change value when disabled", function(){
    pb = createProgressbar({
        animation: false
    });
    pb.value(30);
    pb.enable(false);
    pb.value(40);

    equal(pb.value(), 40);
});

test("ProgressBar does change value when initially disabled", function(){
    pb = createProgressbar({
        animation: false,
        enable: false,
        value: 0
    });
    pb.value(30);

    equal(pb.value(), 30);
});

test("ProgressBar does change value when enabled after initially disabled", function(){
    pb = createProgressbar({
        animation: false,
        enable: false
    });
    pb.enable();
    pb.value(30);

    equal(pb.value(), 30);
});

test("ProgressBar does change value when reenabled", function(){
    pb = createProgressbar({
        animation: false
    });

    pb.enable(false);
    pb.value(30);
    pb.enable();
    pb.value(40);

    equal(pb.value(), 40);
});

test("ProgressBar does not indeterminate state when disabled", 2, function(){
    pb = createProgressbar({
        animation: false,
        value: 30
    });

    pb.enable(false);
    pb.value(false);

    equal(pb.value(), false);
    ok(pb.wrapper.hasClass("k-progressbar-indeterminate"));
});

test("ProgressBar is disabled correctly when in indeterminate state", function(){
    pb = createProgressbar({
        animation: false,
        value: 30
    });

    pb.value(false);
    pb.enable(false);

    ok(pb.wrapper.hasClass("k-state-disabled"));
});


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("setOptions", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("Animation is set to false in options", function(){
    pb = createProgressbar({
        animation: {
            duration: 500
        },
        value: 30
    });

    pb.setOptions({animation: false});

    equal(pb.options.animation, false);
});

test("Private animation object duration is set to 0", function() {
    pb = createProgressbar({
        animation: {
            duration: 500
        },
        value: 30
    });

    pb.setOptions({animation: false});

    var expectedAnimation = {duration: 0};

    deepEqual(pb._animation, expectedAnimation);
});

test("Animation duration is set correctly in options", function(){
    pb = createProgressbar({
        animation: false,
        value: 30
    });

    var newAnimation = {
        duration: 550
    };

    pb.setOptions({animation: newAnimation});

    deepEqual(pb.options.animation, newAnimation);
});

test("Private animation object duration is set correctly", function(){
    pb = createProgressbar({
        animation: false,
        value: 30
    });

    var newAnimation = {
        duration: 550
    };

    pb.setOptions({animation: newAnimation});

    deepEqual(pb._animation, newAnimation);
});

test("Type is changed correctly from value to percent", 2, function() {
    pb = createProgressbar({
        animation: false,
        value: 150,
        min: 0,
        max: 300,
        type: "value"
    });

    pb.setOptions({type: "percent"});

    equal(pb.wrapper.find(".k-progress-status:first").text(), "50%");
    equal(pb.wrapper.find(".k-progress-status:last").text(), "50%");
});

test("Type is changed correctly from percent to value", 2, function() {
    pb = createProgressbar({
        animation: false,
        value: 150,
        min: 0,
        max: 300,
        type: "percent"
    });

    pb.setOptions({type: "value"});

    equal(pb.wrapper.find(".k-progress-status:first").text(), "150");
    equal(pb.wrapper.find(".k-progress-status:last").text(), "150");
});

test("Value is changed correctly (type='value')", 3, function(){
    pb = createProgressbar({
        animation: false,
        value: 20,
        min: 0,
        max: 300,
        type: "value"
    });

    pb.setOptions({ value: 150 });

    equal(pb.value(), 150);
    equal(pb.wrapper.find(".k-progress-status:first").text(), "150");
    equal(pb.wrapper.find(".k-progress-status:last").text(), "150");
});

test("Value is changed correctly (type='percent')", 3, function(){
    pb = createProgressbar({
        animation: false,
        value: 20,
        min: 0,
        max: 300,
        type: "percent"
    });

    pb.setOptions({ value: 150 });

    equal(pb.value(), 150);
    equal(pb.wrapper.find(".k-progress-status:first").text(), "50%");
    equal(pb.wrapper.find(".k-progress-status:last").text(), "50%");
});

test("Value is changed correctly (type='chunk')", 2, function(){
    pb = createProgressbar({
        animation: false,
        value: 20,
        min: 0,
        max: 300,
        type: "chunk",
        chunkCount: 4
    });

    pb.setOptions({ value: 150 });

    equal(pb.value(), 150);
    equal(pb.wrapper.find(".k-state-selected").length, 2);
});
})();