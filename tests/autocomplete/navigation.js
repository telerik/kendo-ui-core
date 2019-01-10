(function(){

var AutoComplete = kendo.ui.AutoComplete;
var CLICK = kendo.support.touch ? "touchend" : "click";
var FOCUSED = ".k-state-focused";
var keys = kendo.keys;
var input;

describe("kendo.ui.AutoComplete navigation", function () {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }

    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);

    });

var getData = function(length) {
    var result = [];
    for(var idx=0; idx < length; idx++) {
        result.push("item" + idx);
    }
    return result;
};

it("pressing down focuses the first item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    input.val("f");
    autocomplete.search();

    input.press(keys.DOWN);
    assert.isOk(autocomplete.ul.children().first().is(FOCUSED));
});

it("pressing up focuses the last item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    input.press(keys.UP);
    assert.isOk(autocomplete.ul.children().last().is(FOCUSED));
});

it("pressing END focuses the last item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: getData(100)
    });

    autocomplete.search("item");
    autocomplete.element.focus().trigger({
        type: "keydown",
        keyCode: keys.END
    });
    assert.isOk(autocomplete.ul.children().last().is(FOCUSED));
});

it("pressing HOME focuses the first item in the popup", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: getData(100)
    });

    autocomplete.search("item");
    autocomplete.element.focus().trigger({
        type: "keydown",
        keyCode: keys.HOME
    });
    assert.isOk(autocomplete.ul.children().first().is(FOCUSED));
});

it("pressing up clears the focused state from the previous item", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    autocomplete.current(autocomplete.ul.children().last());
    input.press(keys.UP);
    assert.isOk(!autocomplete.ul.children().last().is(FOCUSED));
});

it("pressing down clears the focused state from the previous item", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    autocomplete.current(autocomplete.ul.children().first());
    input.press(keys.DOWN);
    assert.isOk(!autocomplete.ul.children().first().is(FOCUSED));
});

it("clicking an item applies selected style", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        change: function() {
            assert.isOk(autocomplete.ul.children().eq(0).is(".k-state-selected"));
        }
    });

    input.val("ba");
    autocomplete.search();
    autocomplete.ul.children().eq(0).trigger(CLICK);
});

it("changing the current popup item does not update the input value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();

    input.press(keys.DOWN);
    assert.equal(input.val(), "b");
});

it("pressing enter closes the dropdown", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    input.press(keys.DOWN);
    input.press(keys.ENTER);

    assert.isOk(!autocomplete.popup.visible());
});

it("press enter should call preventDefault when popup is visible", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    autocomplete.popup.open();

    autocomplete.select(0);
    autocomplete.element.focus().trigger({
        type: "keydown",
        keyCode: keys.ENTER,
        preventDefault: function() {
            assert.isOk(true);
        }
        });
});

it("pressing enter closes updates the value of the autocomplete", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.triggerHandler("focus");
    input.focus().val("b");
    autocomplete.search();
    input.press(keys.DOWN);
    input.press(keys.ENTER);

    assert.equal(input.val(), "baz");
});

it("pressing tab closes updates the value of the autocomplete", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.triggerHandler("focus");
    input.focus().val("b");
    autocomplete.search();
    input.press(keys.DOWN);
    input.press(keys.TAB);

    assert.equal(input.val(), "baz");
});

it("select applies selected style", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());
    assert.isOk(autocomplete.ul.children().first().is(".k-state-selected"));
});

it("select sets input value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());

    assert.equal(input.val(), "baz");
});

it("select should accepts DOM element", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first()[0]);
    assert.isOk(autocomplete.ul.children().first().is(".k-state-selected"));
});

it("moving up when there the current item is first", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().first());
    input.press(keys.UP);
    assert.equal(autocomplete.current(), null);
});

it("moving twice up when there the current item is first makes the last item current", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().first());
    input.press(keys.UP);
    input.press(keys.UP);
    assert.equal(autocomplete.current()[0], autocomplete.ul.children().last()[0]);
});

it("moving down when there the current item is last", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().last());
    input.press(keys.DOWN);
    assert.equal(autocomplete.current(), null);
});
it("moving twice down when there the current item is first makes the last item current", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.current(autocomplete.ul.children().last());
    input.press(keys.DOWN);
    input.press(keys.DOWN);
    assert.equal(autocomplete.current()[0], autocomplete.ul.children().first()[0]);
});

it("down opens the dropdown", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    input.press(keys.DOWN);
    assert.isOk(autocomplete.ul.is(":visible"));
});

it("esc closes the dropdown", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus().val("b");
    autocomplete.search();
    input.press(keys.ESC);
    assert.isOk(!autocomplete.ul.is(":visible"));
});

it("esc calls prevent default if popup is opened", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    input.trigger({
        type: "keydown",
        keyCode: keys.ESC,
        preventDefault: function() {
            assert.isOk(true);
        }
        });
});

it("pressing the down arrows when the popup is not visible does not change value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.close();
    input.press(keys.DOWN);
    input.press(keys.ENTER);
    assert.equal(input.val(), "b");
});

it("pressing the up arrows when the popup is not visible does not change value", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.val("b");
    autocomplete.search();
    autocomplete.close();
    input.press(keys.UP);
    input.press(keys.ENTER);
    assert.equal(input.val(), "b");
});

it("select with item click when source is filtered by API", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Baz", "Bar"]
    });

    autocomplete.search("bar");
    autocomplete.ul.children().eq(0).trigger(CLICK);

    assert.equal(autocomplete.value(), "Bar");
});

it("AutoComplete scrolls content down", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: getData(100)
    });

    stub(autocomplete.listView, {
        scrollWith: autocomplete.listView.scrollWith
    });

    autocomplete.search("item");
    autocomplete.element.focus().press(keys.PAGEDOWN);

    assert.equal(autocomplete.listView.calls("scrollWith"), 1);
    assert.equal(autocomplete.listView.args("scrollWith")[0], autocomplete.listView.screenHeight());
});

it("AutoComplete scrolls content up", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: getData(100)
    });

    stub(autocomplete.listView, {
        scrollWith: autocomplete.listView.scrollWith
    });

    autocomplete.search("item");
    autocomplete.element.focus().press(keys.PAGEUP);

    assert.equal(autocomplete.listView.calls("scrollWith"), 1);
    assert.equal(autocomplete.listView.args("scrollWith")[0], -1 * autocomplete.listView.screenHeight());
});

it("AutoComplete prevents default on PAGEDOWN", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataSource: getData(100)
    });

    autocomplete.search("item");
    autocomplete.element.focus().trigger({
        type: "keydown",
        keyCode: keys.PAGEDOWN,
        preventDefault: function() {
            assert.isOk(true);
        }
        });
});

    });
}());
