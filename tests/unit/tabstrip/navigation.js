import '@progress/kendo-ui/src/kendo.tabstrip.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let TabStrip = kendo.ui.TabStrip,
    keys = kendo.keys,
    div;

function addItems(count) {
    let tabstrip = div.data("kendoTabStrip");

    for (let i = 0; i < count; i++) {
        tabstrip.append({
            text: "Item" + i,
            content: "Content Item" + i
        });
    }
}

describe("tabstrip keyboard navigation", function() {
    beforeEach(function() {
        div = $('<div id="test" />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("adds tabindex to tabGroup", function() {
        let tabstrip = div.kendoTabStrip().getKendoTabStrip();
        assert.equal(tabstrip.tabGroup.attr("tabindex"), 0);
    });

    it("persists tabindex", function() {
        let tabstrip = div.attr("tabindex", 1).kendoTabStrip().getKendoTabStrip();
        assert.equal(tabstrip.tabGroup.attr("tabindex"), 1);
    });

    it("does not select anything if no items", function() {
        div.kendoTabStrip();

        div.focus();

        assert.equal(div.data("kendoTabStrip")._current(), null);
    });


    asyncTest("selects first item on focus", function(done) {
        div.kendoTabStrip();
        addItems(2);

        div.focus();
        setTimeout(function() {
            let first = div.find(".k-item:first");
            done(() => assert.isOk(first.hasClass("k-focus")));
        }, 150);
    });

    it("clears focused item on blur", function() {
        div.kendoTabStrip();
        addItems(2);

        div.focus();
        document.activeElement.blur();

        let first = div.find(".k-item:first");
        assert.isOk(!first.hasClass("k-focus"));
    });

    asyncTest("selects next item on key DOWN", function(done) {
        let tabstrip = div.kendoTabStrip({ tabPosition: "left" }).getKendoTabStrip();
        addItems(2);

        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            let item = div.find(".k-item").eq(1);
            done(() => {
                assert.isOk(item.hasClass("k-focus"));
                assert.isOk(item.hasClass("k-active"));
            });
        }, 150);
    });

    asyncTest("focuses next item if disabled", function(done) {
        div.kendoTabStrip({ tabPosition: "left" });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.enable(div.find(".k-item").eq(1), false);

        div.focus();

        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            let item = div.find(".k-item").eq(1);
            let lastItem = div.find(".k-item:last");
            done(() => {
                assert.isOk($(item).hasClass("k-focus"));
                assert.isOk(!lastItem.hasClass("k-active"));
            });
        }, 150);
    });

    asyncTest("selects first if last is selected", function(done) {
        div.kendoTabStrip();
        addItems(2);

        let tabstrip = div.data("kendoTabStrip");
        div.focus();

        setTimeout(function() {
            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            done(() => assert.isOk(div.find(".k-item:first").hasClass("k-active")));
        }, 150);
    });

    asyncTest("adjust aria-hidden when navigation from disabled item to active item", function(done) {
        div.kendoTabStrip({ animation: false });
        addItems(3);
        let tabstrip = div.data("kendoTabStrip");
        tabstrip.disable(tabstrip.items()[1]);
        div.focus();
        setTimeout(function() {
            tabstrip.activateTab(div.find(".k-item:first"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            done(() => assert.equal(div.find(".k-item:first").attr("aria-hidden"), undefined));
        }, 150);
    });

    asyncTest("selects prev item on key UP", function(done) {
        div.kendoTabStrip({ tabPosition: "left" });
        addItems(2);

        let tabstrip = div.data("kendoTabStrip");
        div.focus();
        setTimeout(function() {
            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            done(() => assert.isOk(div.find(".k-item:first").hasClass("k-active")));
        }, 150);
    });

    asyncTest("selects last if current is first", function(done) {
        div.kendoTabStrip();
        addItems(2);

        let tabstrip = div.data("kendoTabStrip");
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            done(() => assert.isOk(div.find(".k-item:last").hasClass("k-active")));
        }, 150);

    });

    asyncTest("in rtl and horizontal layout does not change selection on DOWN", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();

        setTimeout(function() {

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            done(() => assert.equal(div.find(".k-active").index(), 0));
        }, 150);
    });

    asyncTest("in rtl and horizontal layout selects next on RIGHT", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            done(() => assert.equal(div.find(".k-active").index(), 2));
        }, 150);
    });

    asyncTest("in rtl and horizontal layout selects prev on LEFT", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            done(() => assert.equal(div.find(".k-active").index(), 1));
        }, 150);
    });

    asyncTest("in rtl and horizontal layout does not change selection on UP", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            done(() => assert.equal(div.find(".k-active").index(), 0));
        }, 150);
    });

    asyncTest("in rtl and vertical layout selects prev on UP", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            done(() => assert.equal(div.find(".k-active").index(), 2));
        }, 150);
    });

    asyncTest("in rtl and vertical layout does not change selection on LEFT", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            done(() => assert.equal(div.find(".k-active").index(), 0));
        }, 150);
    });

    asyncTest("in rtl and vertical layout selects next on DOWN", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            done(() => assert.equal(div.find(".k-active").index(), 1));
        }, 150);
    });

    asyncTest("in rtl and vertical layout does not change selection on RIGHT", function(done) {
        div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
        addItems(3);

        let tabstrip = div.data("kendoTabStrip");
        tabstrip.select(0);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            done(() => assert.equal(div.find(".k-active").index(), 0));
        }, 150);
    });

    asyncTest("focuses prev item if disabled", function(done) {
        div.kendoTabStrip({ tabPosition: "left" });
        addItems(3);

        div.focus();
        setTimeout(function() {
            let tabstrip = div.data("kendoTabStrip");
            tabstrip.enable(div.find(".k-item").eq(1), false);
            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            let firstItem = div.find(".k-item:first");
            let item = div.find(".k-item").eq(1);

            done(() => {
                assert.isOk(item.hasClass("k-focus"));
                assert.isOk(!firstItem.hasClass("k-active"));
            });
        }, 150);
    });

    asyncTest("selects focused item on ENTER", function(done) {
        div.kendoTabStrip();
        addItems(3);

        let tabstrip = div.data("kendoTabStrip"),
            item = div.find(".k-item:last");

        div.focus();
        setTimeout(function() {
            tabstrip._current(item);

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.ENTER
            });

            done(() => assert.equal(tabstrip.select()[0], item[0]));
        }, 150);
    });

    asyncTest("selects focused item on SPACEBAR", function(done) {
        div.kendoTabStrip();
        addItems(3);

        let tabstrip = div.data("kendoTabStrip"),
            item = div.find(".k-item:last");

        div.focus();
        setTimeout(function() {
            tabstrip._current(item);

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.SPACEBAR
            });

            done(() => assert.equal(tabstrip.select()[0], item[0]));
        }, 150);
    });

    asyncTest("makes clicked element focused", function(done) {
        div.kendoTabStrip();
        addItems(3);

        let tabstrip = div.data("kendoTabStrip"),
            item = div.find(".k-item").eq(1);

        div.focus();
        setTimeout(function() {
            tabstrip._click(item);

            done(() => assert.equal(tabstrip._focused[0], item[0]));
        }, 150);
    });

    asyncTest("prevents default action event", function(done) {
        div = $('<div class="k-tabstrip" id="tabstrip"><ul class="k-reset k-tabstrip-items"><li class="k-item k-active"><a class="k-link" href="#tabstrip-1">Paris</a></li><li class="k-item"><a class="k-link" href="#tabstrip-2">New York</a></li></ul><div class="k-content k-active" id="tabstrip-1" style="display:block"><p>Rainy weather in Paris.</p></div><div class="k-content" id="tabstrip-2"><p>Sunny weather in New York.</p></div></div>').appendTo(Mocha.fixture);
        let tabstrip = new kendo.ui.TabStrip(div);
        div.focus();
        setTimeout(function() {
            tabstrip.tabGroup.children().eq(1).attr("data-animating", true);

            done(() => assert.equal(tabstrip._click(div.find(".k-item").eq(1)), true));
        }, 150);
    });

    it("focuses tabGroup on item click", function() {
        let tabStripHtml = $('<div><ul></ul></div>').appendTo(Mocha.fixture);
        let ts = tabStripHtml.kendoTabStrip().data("kendoTabStrip");

        ts.append({
            encoded: false,
            content: '<p>Dummy text for tab 1</p>',
            text: 'Tab 1'
        });

        ts.append({
            encoded: false,
            content: '<p>Dummy text for tab 2</p>',
            text: 'Tab 2'
        });

        tabStripHtml.find(".k-item:first").trigger("click");

        assert.equal(ts.tabGroup[0], document.activeElement);

        ts.destroy();
        tabStripHtml.remove();
    });

    it("does not focus wrapper or tabGroup when click input element", function() {
        let tabStripHtml = $('<div><ul></ul></div>').appendTo(Mocha.fixture);
        let ts = tabStripHtml.kendoTabStrip().data("kendoTabStrip");

        ts.append({
            encoded: false,
            content: '<p>Dummy text for tab 1</p>',
            text: 'Tab 1'
        });

        ts.append({
            encoded: false,
            content: '<p><span class="k-item"><input id="input1" /></span></p>',
            text: 'Tab 2'
        });

        ts.select(1);

        $("#input1").click();

        assert.notEqual(ts.wrapper[0], document.activeElement);
        assert.notEqual(ts.tabGroup[0], document.activeElement);

        ts.destroy();
        tabStripHtml.remove();
    });
});
