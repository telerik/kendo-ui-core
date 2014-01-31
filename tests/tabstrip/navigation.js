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

module("tabstrip keyboard navigation", {
    setup: function() {
        div = $('<div id="test" />').appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("adds tabindex", function() {
    div.kendoTabStrip();
    equal(div.attr("tabindex"), 0);
});

test("persists tabindex", function() {
    div.attr("tabindex", 1).kendoTabStrip();
    equal(div.attr("tabindex"), 1);
});

test("does not select anything if no items", function() {
    div.kendoTabStrip();

    div.focus();

    equal(div.data("kendoTabStrip")._current(), null);
});


test("selects first item on focus", function() {
    div.kendoTabStrip();
    addItems(2);

    div.focus();

    var first = div.find(".k-item:first");
    ok(first.hasClass("k-state-focused"));
});

test("clears focused item on blur", function() {
    div.kendoTabStrip();
    addItems(2);

    div.focus();
    div.blur();

    var first = div.find(".k-item:first");
    ok(!first.hasClass("k-state-focused"));
});

test("selects next item on key DOWN", function() {
    div.kendoTabStrip();
    addItems(2);

    div.focus();
    div.trigger({
        type: "keydown",
        keyCode: keys.DOWN
    });

    var item = div.find(".k-item").eq(1);
    ok(!item.hasClass("k-state-focused"));
    ok(item.hasClass("k-state-active"));
});

test("misses next item if disabled", function() {
    div.kendoTabStrip();
    addItems(3);

    var tabstrip = div.data("kendoTabStrip");
    tabstrip.enable(div.find(".k-item").eq(1), false);

    div.focus();

    div.trigger({
        type: "keydown",
        keyCode: keys.DOWN
    });

    var item = div.find(".k-item:last");
    ok(!item.hasClass("k-state-focused"));
    ok(item.hasClass("k-state-active"));
});

test("selects first if last is selected", function() {
    div.kendoTabStrip();
    addItems(2);

    var tabstrip = div.data("kendoTabStrip");
    div.focus();

    tabstrip._current(div.find(".k-item:last"));

    div.trigger({
        type: "keydown",
        keyCode: keys.RIGHT
    });

    ok(div.find(".k-item:first").hasClass("k-state-active"));
});

test("selects prev item on key UP", function() {
    div.kendoTabStrip();
    addItems(2);

    var tabstrip = div.data("kendoTabStrip");
    div.focus();

    tabstrip._current(div.find(".k-item:last"));

    div.trigger({
        type: "keydown",
        keyCode: keys.UP
    });

    ok(div.find(".k-item:first").hasClass("k-state-active"));
    equal(div.attr("aria-activedescendant"), "test_ts_active");
});

test("selects last if current is first", function() {
    div.kendoTabStrip();
    addItems(2);

    var tabstrip = div.data("kendoTabStrip");
    div.focus();

    div.trigger({
        type: "keydown",
        keyCode: keys.LEFT
    });

    ok(div.find(".k-item:last").hasClass("k-state-active"));

});

test("misses prev item if disabled", function() {
    div.kendoTabStrip();
    addItems(3);

    div.focus();

    var tabstrip = div.data("kendoTabStrip");
    tabstrip.enable(div.find(".k-item").eq(1), false);
    tabstrip._current(div.find(".k-item:last"));

    div.trigger({
        type: "keydown",
        keyCode: keys.UP
    });

    var item = div.find(".k-item:first");
    ok(item.hasClass("k-state-active"));
});

test("selects focused item on ENTER", function() {
    div.kendoTabStrip();
    addItems(3);

    var tabstrip = div.data("kendoTabStrip"),
        item = div.find(".k-item:last");

    div.focus();
    tabstrip._current(item);

    div.trigger({
        type: "keydown",
        keyCode: keys.ENTER
    });

    equal(tabstrip.select()[0], item[0]);
});

test("selects focused item on SPACEBAR", function() {
    div.kendoTabStrip();
    addItems(3);

    var tabstrip = div.data("kendoTabStrip"),
        item = div.find(".k-item:last");

    div.focus();
    tabstrip._current(item);

    div.trigger({
        type: "keydown",
        keyCode: keys.SPACEBAR
    });

    equal(tabstrip.select()[0], item[0]);
});

test("makes clicked element focused", function() {
    div.kendoTabStrip();
    addItems(3);

    var tabstrip = div.data("kendoTabStrip"),
        item = div.find(".k-item").eq(1);

    div.focus();
    tabstrip._click(item);
    equal(tabstrip._focused[0], item[0]);
});

test("prevents default action event", function() {
    div = $('<div class="k-widget k-tabstrip k-header" id="tabstrip"><ul class="k-reset k-tabstrip-items"><li class="k-item k-state-default k-state-active"><a class="k-link" href="#tabstrip-1">Paris</a></li><li class="k-item k-state-default"><a class="k-link" href="#tabstrip-2">New York</a></li></ul><div class="k-content k-state-active" id="tabstrip-1" style="display:block"><p>Rainy weather in Paris.</p></div><div class="k-content" id="tabstrip-2"><p>Sunny weather in New York.</p></div></div>').appendTo(QUnit.fixture);
    var tabstrip = new kendo.ui.TabStrip(div)
    div.focus();
    tabstrip.tabGroup.children().eq(1).attr("data-animating", true);

    equal(tabstrip._click(div.find(".k-item").eq(1)), true);
});

test("focuses wrapper on item click", function() {
    var tabStripHtml = $('<div><ul></ul></div>').appendTo(QUnit.fixture);
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

    tabStripHtml.find(".k-item:first").click();

    equal(ts.wrapper[0], document.activeElement);

    ts.destroy();
    tabStripHtml.remove();
});

test("does not focus wrapper when click input element", function() {
    var tabStripHtml = $('<div><ul></ul></div>').appendTo(QUnit.fixture);
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

    notEqual(ts.wrapper[0], document.activeElement);

    ts.destroy();
    tabStripHtml.remove();
});
})();
