import '@progress/kendo-ui/src/kendo.progressbar.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let ProgressBar = kendo.ui.ProgressBar,
    container,
    pb;

function moduleSetup() {

    container = $("<div id='test-container'>" +
        "<div id='progressbar'></div>" +
        "</div>");

    container.appendTo(Mocha.fixture);
}

function moduleTeardown() {

    kendo.destroy(Mocha.fixture);
}

describe("ProgressBar rendering", function() {
    beforeEach(moduleSetup);
    afterEach(moduleTeardown);

    asyncTest("k-complete is added when the progress width is more than 98%", function(done) {
        let progressCompleted = false;

        pb = new ProgressBar(container, {
            animation: false,
            complete: function() {
                progressCompleted = true;
            }
        });

        pb.value(99);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-complete").length, 1));
        }, 30);
    });

    asyncTest("k-complete is removed when the progress width becomes less than 98%", function(done) {
        let progressCompleted = false;

        pb = new ProgressBar(container, {
            animation: false,
            complete: function() {
                progressCompleted = true;
            }
        });

        pb.value(99);
        pb.value(90);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-complete").length, 0));
        }, 30);
    });

    asyncTest("k-complete is not added when the progress width is less than or equal to 98%", function(done) {
        let progressCompleted = false;

        pb = new ProgressBar(container, {
            animation: false,
            complete: function() {
                progressCompleted = true;
            }
        });

        pb.value(98);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-complete").length, 0));
        }, 50);
    });

    asyncTest("Complete event has correct value parameter (type='value')", function(done) {
        let value;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "value",
            complete: function(e) {
                value = e.value;
            }
        });

        pb.value(165);

        setTimeout(function() {
            done(() => assert.equal(value, pb.options.max));
        }, 30);
    });

    asyncTest("Complete event has correct value parameter (type='percent')", function(done) {
        let value;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "percent",
            complete: function(e) {
                value = e.value;
            }
        });

        pb.value(165);

        setTimeout(function() {
            done(() => assert.equal(value, pb.options.max));
        }, 30);
    });

    asyncTest("Complete event has correct value parameter (type='chunk')", function(done) {
        let value;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "chunk",
            complete: function(e) {
                value = e.value;
            }
        });

        pb.value(165);

        setTimeout(function() {
            done(() => assert.equal(value, pb.options.max));
        }, 30);
    });

    asyncTest("Change event has correct value parameter (type='value')", function(done) {
        let value;
        let expected = 120;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "value",
            change: function(e) {
                value = e.value;
            }
        });

        pb.value(120);

        setTimeout(function() {
            done(() => assert.equal(value, expected));
        }, 30);
    });

    asyncTest("Change event has correct value parameter (type='percent')", function(done) {
        let value;
        let expected = 120;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "percent",
            change: function(e) {
                value = e.value;
            }
        });

        pb.value(120);

        setTimeout(function() {
            done(() => assert.equal(value, expected));
        }, 30);
    });

    asyncTest("Change event has correct value parameter (type='chunk')", function(done) {
        let value;
        let expected = 120;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "chunk",
            change: function(e) {
                value = e.value;
            }
        });

        pb.value(120);

        setTimeout(function() {
            done(() => assert.equal(value, expected));
        }, 30);
    });

    asyncTest("Context is correctly set in complete event (type='value')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "value",
            complete: function(e) {
                context = this;
            }
        });

        pb.value(165);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Context is correctly set in complete event (type='percent')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "percent",
            complete: function(e) {
                context = this;
            }
        });

        pb.value(130);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Context is correctly set in complete event (type='chunk')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "chunk",
            complete: function(e) {
                context = this;
            }
        });

        pb.value(130);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Context is correctly set in change event (type='value')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "value",
            change: function(e) {
                context = this;
            }
        });

        pb.value(150);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Context is correctly set in change event (type='percent')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "percent",
            change: function(e) {
                context = this;
            }
        });

        pb.value(150);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Context is correctly set in change event (type='chunk')", function(done) {
        let context;

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            type: "chunk",
            change: function(e) {
                context = this;
            }
        });

        pb.value(150);

        setTimeout(function() {
            done(() => assert.equal(context, pb));
        }, 30);
    });

    asyncTest("Complete event is fired after change event", function(done) {
        let events = [];

        pb = new ProgressBar(container, {
            min: -50,
            max: 165,
            value: -50,
            animation: false,
            complete: function(e) {
                events.push("complete");
            },
            change: function(e) {
                events.push("change");
            }
        });

        pb.value(165);

        setTimeout(function() {
            done(() => {
                assert.equal(events[0], "change");
                assert.equal(events[1], "complete");
            });
        }, 30);
    });
});

describe("Progressbar chunk rendering", function() {
    beforeEach(moduleSetup);
    afterEach(moduleTeardown);

    it("k-progressbar-reverse class is added to progressbar (type='chunk')", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            reverse: true
        });

        assert.isOk(pb.wrapper.hasClass("k-progressbar-reverse"));
    });

    it("Correct chunks are updated when progressbar is orientation:horizontal and reverse: false", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            orientation: "horizontal",
            reverse: false,
            min: 0,
            max: 5,
            value: 0,
            chunkCount: 5
        });

        pb.value(2);

        assert.equal(pb.wrapper.find("li:lt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:horizontal and reverse: true", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            orientation: "horizontal",
            reverse: true,
            min: 0,
            max: 5,
            value: 0,
            chunkCount: 5
        });

        pb.value(2);

        assert.equal(pb.wrapper.find("li:gt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:vertical and reverse: false", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            orientation: "vertical",
            reverse: false,
            min: 0,
            max: 5,
            value: 0,
            chunkCount: 5
        });

        pb.value(2);

        assert.equal(pb.wrapper.find("li:gt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:vertical and reverse: true", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            orientation: "vertical",
            reverse: true,
            min: 0,
            max: 5,
            value: 0,
            chunkCount: 5
        });

        pb.value(2);

        assert.equal(pb.wrapper.find("li:lt(2)").filter(".k-selected").length, 2);
    });

    it("No chunks are selected when progressbar is orientation:vertical and reverse: false and value is set to 0", function() {
        pb = new ProgressBar(container, {
            type: "chunk",
            orientation: "vertical",
            reverse: false,
            min: 0,
            max: 5,
            value: 1,
            chunkCount: 5
        });

        pb.value(0);

        assert.equal(pb.wrapper.find("li").filter(".k-selected").length, 0);
    });

    it("Correct chunks are updated when progressbar is orientation:horizontal and reverse: false and value was decreased", function() {
        pb = new ProgressBar(container, {
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

        assert.equal(pb.wrapper.find("li:lt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:horizontal and reverse: true and value was decreased", function() {
        pb = new ProgressBar(container, {
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

        assert.equal(pb.wrapper.find("li:gt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:vertical and reverse: false and value was decreased", function() {
        pb = new ProgressBar(container, {
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

        assert.equal(pb.wrapper.find("li:gt(2)").filter(".k-selected").length, 2);
    });

    it("Correct chunks are updated when progressbar is orientation:vertical and reverse: true and value was decreased", function() {
        pb = new ProgressBar(container, {
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

        assert.equal(pb.wrapper.find("li:lt(2)").filter(".k-selected").length, 2);
    });

    asyncTest("isStarted is set to true when the value is changed for the first time", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 10,
            type: "chunk",
            showStatus: true
        });

        pb.value(50);

        setTimeout(function() {
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });

    asyncTest("isStarted remains true when the value has been changed and then set to the initial value", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 0,
            type: "chunk",
            showStatus: true
        });

        pb.value(50);
        pb.value(0);

        setTimeout(function() {
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });

    asyncTest("Correct chunk count is updated when range is more than chunkCount", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 300,
            value: 0,
            type: "chunk",
            chunkCount: 10
        });

        pb.value(150);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected").length, 5));
        }, 30);
    });

    asyncTest("Correct chunk count is updated when range is less than chunkCount", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 10,
            value: 0,
            type: "chunk",
            chunkCount: 20
        });

        pb.value(2);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected").length, 4));
        }, 30);
    });

    asyncTest("The last chunk is not filled until max value is reached", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 10000,
            value: 0,
            type: "chunk",
            chunkCount: 20
        });

        pb.value(9999);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected").length, 19));
        }, 30);
    });
});


describe("ProgressBar value/percent rendering", function() {
    beforeEach(moduleSetup);
    afterEach(moduleTeardown);

    asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is true (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: 100,
            animation: false,
            type: "value",
            showStatus: true
        });

        pb.value(-50);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:hidden").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is true (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: 100,
            animation: false,
            type: "percent",
            showStatus: true
        });

        pb.value(-50);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:hidden").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is false (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: 100,
            animation: false,
            type: "value",
            showStatus: false
        });

        pb.value(-50);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:hidden").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is hidden when value is set to min and showStatus is false (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: 100,
            animation: false,
            type: "percent",
            showStatus: false
        });

        pb.value(-50);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:hidden").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is true (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "value",
            showStatus: true
        });

        pb.value(-20);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is true (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "percent",
            showStatus: true
        });

        pb.value(-20);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is false (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "value",
            showStatus: false
        });

        pb.value(-20);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is appended when initial value is set to min and then changed, showStatus is false (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
            min: -50,
            max: 130,
            value: -50,
            animation: false,
            type: "percent",
            showStatus: false
        });

        pb.value(-20);

        setTimeout(function() {
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is shown again when hidden once, showStatus is true (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is shown again when hidden once, showStatus is true (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is shown again when hidden once, showStatus is false (type: 'value')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress status wrapper is shown again when hidden once, showStatus is false (type: 'percent')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.equal(pb.wrapper.find(".k-selected:visible").length, 1));
        }, 30);
    });

    asyncTest("Progress wrapper width stays the same when the ProgressBar wrapper is resized and showStatus is false", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 50,
            animation: false,
            type: "percent",
            showStatus: false
        });

        let prevWidth = pb.wrapper.find(".k-selected")[0].style.width;
        pb.wrapper.width(700);
        let currentWidth = pb.wrapper.find(".k-selected")[0].style.width;

        setTimeout(function() {
            done(() => assert.equal(prevWidth, currentWidth));
        }, 30);
    });

    asyncTest("Progress wrapper width stays the same when the ProgressBar wrapper is resized and showStatus is true", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 50,
            animation: false,
            type: "percent",
            showStatus: true
        });

        let prevWidth = pb.wrapper.find(".k-selected")[0].style.width;
        pb.wrapper.width(700);
        let currentWidth = pb.wrapper.find(".k-selected")[0].style.width;

        setTimeout(function() {
            done(() => assert.equal(prevWidth, currentWidth));
        }, 30);
    });

    it("Progress status text displays 100% even when floating point calculation precision fails", function() {
        pb = new ProgressBar(container, {
            min: 0,
            max: 7,
            value: 7,
            animation: false,
            type: "percent",
            showStatus: true
        });

        let statuses = pb.progressStatus;
        assert.equal(statuses.eq(0).text(), "100%");
        assert.equal(statuses.eq(1).text(), "100%");
    });

    asyncTest("Progress status holder wrapper width stays the same when the ProgressBar wrapper is resized (type='percent')", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 50,
            animation: false,
            type: "percent",
            showStatus: true
        });

        let prevWidth = pb.wrapper.find(".k-selected .k-progress-status-wrap")[0].style.width;
        pb.wrapper.width(700);
        let currentWidth = pb.wrapper.find(".k-selected .k-progress-status-wrap")[0].style.width;

        setTimeout(function() {
            done(() => assert.equal(prevWidth, currentWidth));
        }, 30);
    });

    asyncTest("Progress status holder wrapper width stays the same when the ProgressBar wrapper is resized (type='value')", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 50,
            animation: false,
            type: "value",
            showStatus: true
        });

        let prevWidth = pb.wrapper.find(".k-selected .k-progress-status-wrap")[0].style.width;
        pb.wrapper.width(700);
        let currentWidth = pb.wrapper.find(".k-selected .k-progress-status-wrap")[0].style.width;

        setTimeout(function() {
            done(() => assert.equal(prevWidth, currentWidth));
        }, 30);
    });

    asyncTest("isStarted is set to true when the value is changed for the first time (type='value')", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 10,
            type: "value",
            showStatus: true,
            animation: false
        });

        pb.value(50);

        setTimeout(function() {
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });

    asyncTest("isStarted remains true when the value has been changed and then set to the initial value (type='value')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });

    asyncTest("isStarted is set to true when the value is changed for the first time (type='percent')", function(done) {
        pb = new ProgressBar(container, {
            min: 0,
            max: 130,
            value: 10,
            type: "percent",
            showStatus: true,
            animation: false
        });

        pb.value(50);

        setTimeout(function() {
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });

    asyncTest("isStarted remains true when the value has been changed and then set to the initial value (type='percent')", function(done) {
        pb = new ProgressBar(container, {
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
            done(() => assert.isOk(pb._isStarted));
        }, 30);
    });
});
