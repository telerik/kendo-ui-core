(function(){

var AutoComplete = kendo.ui.AutoComplete;
var CLICK = kendo.support.touch ? "touchend" : "click";
var input;

module("kendo.ui.AutoComplete navigation", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }
        kendo.effects.disable();
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.effects.enable();
    }
});

test("pressing down focuses the first item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    input.val("f");
    autocomplete.search();

    input.press(kendo.keys.DOWN);
    ok(autocomplete.ul.children().first().is(".k-state-focused"));
});

test("pressing up focuses the last item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    input.press(kendo.keys.UP);
    ok(autocomplete.ul.children().last().is(".k-state-focused"));
});

test("pressing up clears the focused state from the previous item", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    autocomplete.current(autocomplete.ul.children().last());
    input.press(kendo.keys.UP);
    ok(!autocomplete.ul.children().last().is(".k-state-focused"));
});

test("pressing down clears the focused state from the previous item", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    autocomplete.current(autocomplete.ul.children().first());
    input.press(kendo.keys.DOWN);
    ok(!autocomplete.ul.children().first().is(".k-state-focused"));
});

test("clicking an item applies selected style", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        change: function() {
            ok(autocomplete.ul.children().eq(0).is(".k-state-selected"));
        }
    });

    input.val("ba");
    autocomplete.search();
    autocomplete.ul.children().eq(0).trigger(CLICK);
});

test("changing the current popup item does not update the input value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    input.press(kendo.keys.DOWN);
    equal(input.val(), "b");
});

test("pressing enter closes the dropdown", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);

    ok(!autocomplete.popup.visible());
});

test("press enter should call preventDefault when popup is visible", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    autocomplete.popup.open();

    autocomplete.select(0);
    autocomplete.element.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER,
        preventDefault: function() {
            ok(true);
        }
    });
});

test("pressing enter closes updates the value of the autocomplete", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.triggerHandler("focus");
    input.focus().val("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);

    equal(input.val(), "baz");
});

test("pressing tab closes updates the value of the autocomplete", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.triggerHandler("focus");
    input.focus().val("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.TAB);

    equal(input.val(), "baz");
});

test("select applies selected style", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());
    ok(autocomplete.ul.children().first().is(".k-state-selected"));
});

test("select sets input value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());

    equal(input.val(), "baz");
});

test("select should accepts DOM element", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first()[0]);
    ok(autocomplete.ul.children().first().is(".k-state-selected"));
});

test("moving up when there the current item is first", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().first());
    input.press(kendo.keys.UP);
    equal(autocomplete.current(), null);
});

test("moving twice up when there the current item is first makes the last item current", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().first());
    input.press(kendo.keys.UP);
    input.press(kendo.keys.UP);
    equal(autocomplete.current()[0], autocomplete.ul.children().last()[0]);
});

test("moving down when there the current item is last", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().last());
    input.press(kendo.keys.DOWN);
    equal(autocomplete.current(), null);
});
test("moving twice down when there the current item is first makes the last item current", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().last());
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.DOWN);
    equal(autocomplete.current()[0], autocomplete.ul.children().first()[0]);
});

test("esc closes the dropdown", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    input.press(kendo.keys.ESC);
    ok(!autocomplete.ul.is(":visible"));
});

test("esc calls prevent default if popup is opened", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    input.trigger({
        type: "keydown",
        keyCode: kendo.keys.ESC,
        preventDefault: function() {
            ok(true);
        }
    });
});

test("pressing the down arrows when the popup is not visible does not change value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.close();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);
    equal(input.val(), "b");
});

test("pressing the up arrows when the popup is not visible does not change value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.close();
    input.press(kendo.keys.UP);
    input.press(kendo.keys.ENTER);
    equal(input.val(), "b");
});

test("select with item click when source is filtered by API", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Baz", "Bar"]
    });

    autocomplete.search("bar");
    autocomplete.ul.children().eq(0).trigger(CLICK);

    equal(autocomplete.value(), "Bar");
});

}());
