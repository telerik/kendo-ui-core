(function(){

var AutoComplete = kendo.ui.AutoComplete;
var CLICK = kendo.support.touch ? "touchend" : "click";
var input;

module("kendo.ui.AutoComplete events", {
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

test("_blur calls _change", function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    autocomplete._change = function() {
        changeWasCalled = true;
    }

    autocomplete._blur();

    ok(changeWasCalled);
});

test("value set with value method does not trigger change event", 0, function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        change: function() {
            ok(false);
        }
    });

    autocomplete.value("test");
    autocomplete._blur();
});

asyncTest("raise change after search()", 1, function() {
    var autocomplete = new AutoComplete(input, {
        delay: 0,
        dataSource: ["foo", "bar"],
        change: function() {
            start();
            ok(true);
        }
    });

    input.val("test");
    autocomplete._search();

    setTimeout(function() {
        autocomplete._change();
    }, 100);
});

test("_change raises the change event if value has changed", function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        change: function() {
            changeWasCalled = true;
        }
    });

    autocomplete._prev = "foo";
    autocomplete._accessor("bar");
    autocomplete._change();
    ok(changeWasCalled);
});

test("_change is not raised initially", function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        change: function() {
            changeWasCalled = true;
        }
    });
    input.focus();
    autocomplete._change();
    ok(!changeWasCalled);
});

test("_change does not raise change event if value has't changed", function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        change: function() {
            changeWasCalled = true;
        }
    });

    autocomplete._old = "foo";
    autocomplete.value("foo");
    autocomplete._change();
    ok(!changeWasCalled);
});

test("_prev is initialzed on focus", function() {
    var autocomplete = new AutoComplete(input, {
    });

    input.val("foo").focus();
    equal(autocomplete._prev, "foo");
});

test("change is not triggered on blur with empty value", 0, function() {
    var autocomplete = new AutoComplete(input, {
            change: function() {
                ok(false);
            }
        });

    autocomplete.value(null);
    input.focus();
    input.blur();
});

test("select does not raise the change event", function() {
    var changeWasCalled = false, autocomplete = new AutoComplete(input, {
        change: function() {
            changeWasCalled = true;
        }
    });

    input.focus();
    autocomplete.select($("<li>foo</li>"));
    ok(!changeWasCalled);
});

test("clicking an item raises the change event", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo"],
        change: function() {
            ok(true);
        }
    });

    input.focus().val("f");
    autocomplete.search();
    autocomplete.ul.children().first().trigger(CLICK);
});

test("clicking an item raises the change event of the dom element", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo"]
    });

    input.focus().val("f");
    autocomplete.search();
    input.change(function() {
        ok(true);
    });
    autocomplete.ul.children().first().trigger(CLICK);
});

test("clicking an item raises the change event of the dom element even when same item is selected", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo"],
        value: "foo"
    });

    input.focus().val("f");
    autocomplete.search();

    input.change(function() {
        ok(true);
    });

    autocomplete.ul.children().first().trigger(CLICK);
});

test("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", 0, function() {
    input.kendoAutoComplete({
        dataSource: ["foo"]
    });

    input.bind("change", function() {
        ok(false);
    });

    input.focus()
        .trigger($.Event("keydown", {keyCode: 70}))
        .val("f")
        .trigger($.Event("keypress", {keyCode: 70}))
        .trigger($.Event("keydown", {keyCode: 13}));
});

test("open event when open popup on search", 1, function() {
    input.kendoAutoComplete({
        delay: 0,
        dataSource: ["foo", "bar"],
        open: function() {
            ok(true);
        }
    });

    var autocomplete = input.data("kendoAutoComplete");
    input.focus().val("f");
    autocomplete.search();
});

asyncTest("open event should be cancellable", 1, function() {
    input.kendoAutoComplete({
        delay: 0,
        dataSource: ["foo", "bar"],
        open: function(e) {
            e.preventDefault();
        }
    });

    var autocomplete = input.data("kendoAutoComplete");
    input.focus().val("f");
    autocomplete.search();

    setTimeout(function() {
        ok(!autocomplete.popup.visible());
        start();
    }, 200);
});

test("close event when popup close on click", 1, function() {
    input.kendoAutoComplete({
        delay: 0,
        dataSource: ["foo", "bar"],
        close: function() {
            ok(true);
        }
    });

    var autocomplete = input.data("kendoAutoComplete");
    input.focus().val("f");
    autocomplete.search();
    autocomplete.ul.children().first().click();
});

test("click item raises select event", 2, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo"],
        select: function(e) {
            equal(e.item[0], autocomplete.ul.children()[0]);
            equal(e.dataItem, autocomplete.dataSource.view()[0]);
        }
    }).data("kendoAutoComplete");

    input.focus().val("f");
    autocomplete.search();
    autocomplete.ul.children().first().trigger(CLICK);
});

test("prevent select event should only close the popup", function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo"],
        select: function(e) {
            e.preventDefault();
        },
        change: function() {
            ok(false);
        }
    }).data("kendoAutoComplete");

    input.focus().val("f");
    autocomplete.search();
    autocomplete.ul.children().first().trigger(CLICK);

    ok(!autocomplete.popup.visible());
});

test("select event is not raised when custom value is entered", 0, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo"],
        select: function(e) {
            ok(false);
        }
    }).data("kendoAutoComplete");

    autocomplete.dataSource.read();
    autocomplete.popup.open();

    autocomplete.element.trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });
});

test("select event is raised when first item is entered", 2, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo"],
        select: function(e) {
            equal(e.item[0], autocomplete.ul.children()[0]);
            equal(e.dataItem, autocomplete.dataSource.view()[0]);
        }
    }).data("kendoAutoComplete");

    autocomplete.dataSource.read();
    autocomplete.popup.open();
    autocomplete.listView.focus(0);

    autocomplete.element.trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });
});

test("AutoComplete triggers filtering event on data source filter", 3, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            var filter = e.filter;

            equal(filter.field, "");
            equal(filter.operator, "contains");
            equal(filter.value, "baz");
        }
    }).data("kendoAutoComplete");

    autocomplete.search("baz");
});

test("modifying filter expression in filtering event changes datasource result", 2, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            e.filter.value = "foo";
        }
    }).data("kendoAutoComplete");

    autocomplete.search("baz");

    var data = autocomplete.dataSource.view();

    equal(data.length, 1);
    equal(data[0], "foo");
});

test("AutoComplete filtering event can be prevented", 0, function() {
    var autocomplete = input.kendoAutoComplete({
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            e.preventDefault();
        }
    }).data("kendoAutoComplete");

    autocomplete.dataSource.bind("change", function() {
        ok(false);
    });

    autocomplete.search("baz");
});

    test("reset value when _clear is clicked", 1, function() {
        var autocomplete = new AutoComplete(input, {
            dataTextField: "name",
            dataSource: [
                { id: 1, name: "name1" },
                { id: 2, name: "name2" },
                { id: 3, name: "name3" }
            ],
            value: "2"
        });

        autocomplete._clear.click();
        equal(autocomplete.value(), "");
    });

    test("show clear button", 1, function() {
        var autocomplete = new AutoComplete(input, {
            dataTextField: "name",
            dataSource: [
                { id: 1, name: "name1" },
                { id: 2, name: "name2" },
                { id: 3, name: "name3" }
            ],
            value: "2"
        });

        ok(autocomplete.wrapper.find(autocomplete._clear).length > 0);
    });

    test("hide clear button", 1, function() {
        var autocomplete = new AutoComplete(input, {
            clearButton: false,
            dataTextField: "name",
            dataSource: [
                { id: 1, name: "name1" },
                { id: 2, name: "name2" },
                { id: 3, name: "name3" }
            ],
            value: "2"
        });

        equal(autocomplete.wrapper.find(autocomplete._clear).length, 0);
    });
}());
