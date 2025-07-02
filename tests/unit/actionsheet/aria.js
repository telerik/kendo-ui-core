import '@progress/kendo-ui/src/kendo.actionsheet.js';
import { TimerUtils } from '../../helpers/unit/timer-utils.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';


let ActionSheet = kendo.ui.ActionSheet,
    div,
    instance;

describe("kendo.ui.ActionSheet accessibility with AXE", function() {

    function createInstance(options) {
        instance = new ActionSheet(div, $.extend(true, {}, {
            title: "Some title",
            items: [
                {
                    text: 'first item'
                },
                {
                    text: 'second item',
                    disabled: true
                }
            ]
        }, options));
    }
    beforeEach(function() {
        TimerUtils.initTimer();
        div = $("<div style='color:green'></div>").appendTo(Mocha.fixture);

    });
    afterEach(function() {
        TimerUtils.destroyTimer();
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("ActionSheet is accessible", function(done) {
        createInstance({
            open: function(e) {
                TimerUtils.advanceTimer(1);
                done(() => axeRunFixture());
            },
        });

        instance.open();
    });
});

describe("kendo.ui.ActionSheet WAI-ARIA", function() {
    function createInstance(options) {
        instance = new ActionSheet(div, $.extend(true, {}, {
            title: "Some title",
            items: [
                {
                    text: 'first item'
                },
                {
                    text: 'second item',
                    disabled: true
                }
            ]
        }, options));
    }
    beforeEach(function() {
        TimerUtils.initTimer();
        div = $("<div style='color:green'></div>").appendTo(Mocha.fixture);

    });
    afterEach(function() {
        TimerUtils.destroyTimer();
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("ActionSheet items collection has role='group'", function(done) {
        createInstance({
            open: function() {
                 TimerUtils.advanceTimer(1);
                 done(() => assert.equal(instance.wrapper.find(".k-list-ul").attr("role"), "group"));
            },
        });

        instance.open();
    });

    asyncTest("ActionSheet li elements have role='none'", function(done) {
        createInstance({
            open: function() {
                TimerUtils.advanceTimer(1);
                done(() => assert.equal(instance.wrapper.find(".k-actionsheet-item").attr("role"), "button"));
            },
        });

        instance.open();
    });

    asyncTest("ActionSheet has role='dialog'", function(done) {
        createInstance({
            open: function() {
                TimerUtils.advanceTimer(1);
                done(() => assert.equal(instance.wrapper.find(".k-actionsheet").attr("role"), "dialog"));
            },
        });

        instance.open();
    });

    asyncTest("ActionSheet has aria-modal='true'", function(done) {
        createInstance({
            open: function() {
                TimerUtils.advanceTimer(1);
                done(() => assert.equal(instance.wrapper.find(".k-actionsheet").attr("aria-modal"), "true"));
            },
        });

        instance.open();
    });

    asyncTest("ActionSheet has aria-hidden='true'", function(done) {
        createInstance({
            close: function() {
                TimerUtils.advanceTimer(1);
                done(() => assert.equal(instance.wrapper.find(".k-actionsheet").attr("aria-hidden"), "true"));
            },
        });

        instance.open();
        instance.close();
    });

    asyncTest("ActionSheet has aria-hidden='false'", function(done) {
        createInstance({
            open: function() {
                TimerUtils.advanceTimer(1);
                done(() => assert.equal(instance.wrapper.find(".k-actionsheet").attr("aria-hidden"), "false"));
            },
        });

        instance.open();
    });
});
