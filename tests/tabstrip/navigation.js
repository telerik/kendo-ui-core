(function() {

    var TabStrip = kendo.ui.TabStrip,
        keys = kendo.keys,
        div;

    function addItems(count) {
        var tabstrip = div.data("kendoTabStrip");

        for (var i = 0; i < count; i++) {
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
            var tabstrip = div.kendoTabStrip().getKendoTabStrip();
            assert.equal(tabstrip.tabGroup.attr("tabindex"), 0);
        });

        it("persists tabindex", function() {
            var tabstrip = div.attr("tabindex", 1).kendoTabStrip().getKendoTabStrip();
            assert.equal(tabstrip.tabGroup.attr("tabindex"), 1);
        });

        it("does not select anything if no items", function() {
            div.kendoTabStrip();

            div.focus();

            assert.equal(div.data("kendoTabStrip")._current(), null);
        });


        it("selects first item on focus", function() {
            div.kendoTabStrip();
            addItems(2);

            div.focus();

            var first = div.find(".k-item:first");
            assert.isOk(first.hasClass("k-focus"));
        });

        it("clears focused item on blur", function() {
            div.kendoTabStrip();
            addItems(2);

            div.focus();
            document.activeElement.blur();

            var first = div.find(".k-item:first");
            assert.isOk(!first.hasClass("k-focus"));
        });

        it("selects next item on key DOWN", function() {
            let tabstrip = div.kendoTabStrip({ tabPosition: "left" }).getKendoTabStrip();
            addItems(2);

            div.focus();
            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            var item = div.find(".k-item").eq(1);
            assert.isOk(!item.hasClass("k-focus"));
            assert.isOk(item.hasClass("k-active"));
        });

        it("focuses next item if disabled", function() {
            div.kendoTabStrip({ tabPosition: "left" });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.enable(div.find(".k-item").eq(1), false);

            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            var item = div.find(".k-item").eq(1);
            var lastItem = div.find(".k-item:last");
            assert.isOk($(item).hasClass("k-focus"));
            assert.isOk(!lastItem.hasClass("k-active"));
        });

        it("selects first if last is selected", function() {
            div.kendoTabStrip();
            addItems(2);

            var tabstrip = div.data("kendoTabStrip");
            div.focus();

            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            assert.isOk(div.find(".k-item:first").hasClass("k-active"));
        });

        it("adjust aria-hidden when navigation from disabled item to active item", function() {
            div.kendoTabStrip({ animation: false });
            addItems(3);
            var tabstrip = div.data("kendoTabStrip");
            tabstrip.disable(tabstrip.items()[1]);
            div.focus();
            tabstrip.activateTab(div.find(".k-item:first"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            assert.equal(div.find(".k-item:first").attr("aria-hidden"), undefined);
        });

        it("selects prev item on key UP", function() {
            div.kendoTabStrip({ tabPosition: "left" });
            addItems(2);

            var tabstrip = div.data("kendoTabStrip");
            div.focus();

            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            assert.isOk(div.find(".k-item:first").hasClass("k-active"));
        });

        it("selects last if current is first", function() {
            div.kendoTabStrip();
            addItems(2);

            var tabstrip = div.data("kendoTabStrip");
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            assert.isOk(div.find(".k-item:last").hasClass("k-active"));

        });

        it("in rtl and horizontal layout does not change selection on DOWN", function() {
            div.addClass("k-rtl").kendoTabStrip({ animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            assert.equal(div.find(".k-active").index(), 0);
        });

        it("in rtl and horizontal layout selects next on RIGHT", function() {
            div.addClass("k-rtl").kendoTabStrip({ animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            assert.equal(div.find(".k-active").index(), 2);
        });

        it("in rtl and horizontal layout selects prev on LEFT", function() {
            div.addClass("k-rtl").kendoTabStrip({ animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            assert.equal(div.find(".k-active").index(), 1);
        });

        it("in rtl and horizontal layout does not change selection on UP", function() {
            div.addClass("k-rtl").kendoTabStrip({ animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            assert.equal(div.find(".k-active").index(), 0);
        });

        it("in rtl and vertical layout selects prev on UP", function() {
            div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            assert.equal(div.find(".k-active").index(), 2);
        });

        it("in rtl and vertical layout does not change selection on LEFT", function() {
            div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.LEFT
            });

            assert.equal(div.find(".k-active").index(), 0);
        });

        it("in rtl and vertical layout selects next on DOWN", function() {
            div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            assert.equal(div.find(".k-active").index(), 1);
        });

        it("in rtl and vertical layout does not change selection on RIGHT", function() {
            div.addClass("k-rtl").kendoTabStrip({ tabPosition: "left", animation: false });
            addItems(3);

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.select(0);
            div.focus();

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.RIGHT
            });

            assert.equal(div.find(".k-active").index(), 0);
        });

        it("focuses prev item if disabled", function() {
            div.kendoTabStrip({ tabPosition: "left" });
            addItems(3);

            div.focus();

            var tabstrip = div.data("kendoTabStrip");
            tabstrip.enable(div.find(".k-item").eq(1), false);
            tabstrip._current(div.find(".k-item:last"));

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.UP
            });

            var firstItem = div.find(".k-item:first");
            var item = div.find(".k-item").eq(1);
            assert.isOk(item.hasClass("k-focus"));
            assert.isOk(!firstItem.hasClass("k-active"));
        });

        it("selects focused item on ENTER", function() {
            div.kendoTabStrip();
            addItems(3);

            var tabstrip = div.data("kendoTabStrip"),
                item = div.find(".k-item:last");

            div.focus();
            tabstrip._current(item);

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.ENTER
            });

            assert.equal(tabstrip.select()[0], item[0]);
        });

        it("selects focused item on SPACEBAR", function() {
            div.kendoTabStrip();
            addItems(3);

            var tabstrip = div.data("kendoTabStrip"),
                item = div.find(".k-item:last");

            div.focus();
            tabstrip._current(item);

            tabstrip.tabGroup.trigger({
                type: "keydown",
                keyCode: keys.SPACEBAR
            });

            assert.equal(tabstrip.select()[0], item[0]);
        });

        it("makes clicked element focused", function() {
            div.kendoTabStrip();
            addItems(3);

            var tabstrip = div.data("kendoTabStrip"),
                item = div.find(".k-item").eq(1);

            div.focus();
            tabstrip._click(item);
            assert.equal(tabstrip._focused[0], item[0]);
        });

        it("prevents default action event", function() {
            div = $('<div class="k-widget k-tabstrip k-header" id="tabstrip"><ul class="k-reset k-tabstrip-items"><li class="k-item k-active"><a class="k-link" href="#tabstrip-1">Paris</a></li><li class="k-item"><a class="k-link" href="#tabstrip-2">New York</a></li></ul><div class="k-content k-active" id="tabstrip-1" style="display:block"><p>Rainy weather in Paris.</p></div><div class="k-content" id="tabstrip-2"><p>Sunny weather in New York.</p></div></div>').appendTo(Mocha.fixture);
            var tabstrip = new kendo.ui.TabStrip(div);
            div.focus();
            tabstrip.tabGroup.children().eq(1).attr("data-animating", true);

            assert.equal(tabstrip._click(div.find(".k-item").eq(1)), true);
        });

        it("focuses tabGroup on item click", function() {
            var tabStripHtml = $('<div><ul></ul></div>').appendTo(Mocha.fixture);
            var ts = tabStripHtml.kendoTabStrip().data("kendoTabStrip");

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
            var tabStripHtml = $('<div><ul></ul></div>').appendTo(Mocha.fixture);
            var ts = tabStripHtml.kendoTabStrip().data("kendoTabStrip");

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
}());
