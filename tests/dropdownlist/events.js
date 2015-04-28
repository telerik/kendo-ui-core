(function() {
    var DropDownList = kendo.ui.DropDownList,
        CLICK = kendo.support.touch ? "touchend" : "click",
        input, select;

    module("kendo.ui.DropDownList events", {
        setup: function() {
            kendo.effects.disable();
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key } );
            }
            input = $("<input />").appendTo(QUnit.fixture);
            select = $("<select></select>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            QUnit.fixture.find(":input").each(function() {
                var widget = $(this).data("kendoDropDownList");

                if (widget) {
                    widget.destroy();
                }
            });

            input.add($("ul")).parent(".k-widget").remove();
            kendo.effects.enable();
        }
    });

    test("_blur calls _change", function() {
        var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist._change = function() {
            changeWasCalled = true;
        }

        dropdownlist._blur();

        ok(changeWasCalled);
    });

    test("_blur calls popup close", 1, function() {
        var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.dataSource.read();
        dropdownlist.popup.open();

        dropdownlist.popup.bind("close", function() {
            ok(true);
        });

        dropdownlist._blur();
    });

    test("change event is not raised on load when value is selected by index", 0, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            change: function() {
                ok(false);
            }
        });
    });

    test("change event is not raised on load when option.value is defined", 0, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            value: "foo",
            change: function() {
                ok(false);
            }
        });
    });

    test("_change raises the change event if value has changed", function() {
       var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            change: function() {
                changeWasCalled = true;
            }
        });
        dropdownlist.value("bar");
        dropdownlist._old = "foo";
        dropdownlist._change();
        ok(changeWasCalled);
    });

    test("_change raises the input change event", function() {
       var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        input.bind("change", function() {
            changeWasCalled = true;
        });

        dropdownlist.value("bar");
        dropdownlist._old = "foo";
        dropdownlist._change();
        ok(changeWasCalled);
    });

    test("_change does not raise change event if value has't changed", 0, function() {
        var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(false);
        });

        dropdownlist.value("foo");
        dropdownlist.wrapper.focus().focusout();
    });

    test("_change raises change event if selectedIndex has changed", 1, function() {
        var dropdownlist = new DropDownList(select, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        dropdownlist.selectedIndex = 1;
        dropdownlist.wrapper.focus().focusout();
    });

    test("support setting a value in change event handler", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            change: function(e) {
                e.sender.select(0);
            }
        });

        dropdownlist.open();
        dropdownlist.ul.find("li:last").click();

        equal(dropdownlist.value(), "foo");
    });

    test("select does not raise the change event", 0, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(false);
        });

        dropdownlist.wrapper.focus();
        dropdownlist.select($("<li>foo</li>"));
    });

    test("clicking an item raises the change event", 1, function() {
        var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        dropdownlist.wrapper.focus();

        dropdownlist.ul.children().eq(1).trigger(CLICK);
    });

    test("change should be raised on enter", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
        dropdownlist.wrapper.press(kendo.keys.ENTER);
    });

    test("change should be raised on tab", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
        dropdownlist.wrapper.press(kendo.keys.TAB);
    });

    test("clicking an item raises the change event of HTML select", 1, function() {
        var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select, {
            dataSource: ["foo", "bar"]
        });

        select.bind("change", function() {
            ok(true);
        });

        dropdownlist.wrapper.focus();
        dropdownlist.ul.children().eq(1).trigger(CLICK);
    });

    test("change should be raised on down arrow and closed popup", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
    });

    test("open event when click arrow", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function() {
                ok(true);
            }
        });

        input.data("kendoDropDownList").wrapper.trigger(CLICK);
    });

    asyncTest("open event should be cancellable", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function(e) {
                e.preventDefault();
            }
        });

        var dropdownlist = input.data("kendoDropDownList");

        dropdownlist.wrapper.trigger(CLICK);

        setTimeout(function() {
            ok(!dropdownlist.popup.visible());
            start();
        }, 200);
    });

    test("open event when ALT + down arrow", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function() {
                ok(true);
            }
        });

        input.trigger({ type: "keydown", keyCode: kendo.keys.DOWN, altKey: true } );
    });

    test("close event when click arrow", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            close: function() {
                ok(true);
            }
        });

        var dropdownlist = input.data("kendoDropDownList");
        dropdownlist.open();
        dropdownlist.wrapper.trigger(CLICK);
    });

    asyncTest("close event should be cancellable", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            dataSource: [{text: "foo"}, {text: "bar"}],
            close: function(e) {
                e.preventDefault();
            }
        });

        var dropdownlist = input.data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.wrapper.trigger(CLICK);

        setTimeout(function() {
            ok(dropdownlist.popup.visible());
            start();
        }, 200);
    });

    test("close event when ALT + up arrow", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            dataSource: [{text: "foo"}, {text: "bar"}],
            close: function() {
                ok(true);
            }
        });

        input.data("kendoDropDownList").open();

        input.trigger({ type: "keydown", keyCode: kendo.keys.UP, altKey: true } );
    });

    test("close event when select item", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            close: function() {
                ok(true);
            }
        });

        var ddl = input.data("kendoDropDownList");
        ddl.open();

        ddl.ul.children().eq(0).trigger(CLICK);
    });

    test("click item raises select event", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataSource: ["foo"],
            select: function(e) {
                ok(e.item);
            }
        }).data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.ul.children().first().trigger(CLICK);
    });

    test("prevent select event should only close the popup", 2, function() {
        var dropdownlist = input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            value: "foo",
            select: function(e) {
                ok(true, ' select was not called');
                e.preventDefault();
            },
            change: function() {
                ok(false, ' change was called');
            }
        }).data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.ul.children().first().trigger(CLICK);

        ok(!dropdownlist.popup.visible(), 'popup is not visible');
    });

    test("selection with arrow triggers the select event", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataSource: ["foo"],
            select: function(e) {
                ok(e.item);
            }
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
    });

    test("preventing select event during navigation reverts selection", 3, function() {
        var dropdownlist = input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            select: function(e) {
                e.preventDefault()
            }
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);

        var current = dropdownlist.current();

        ok(current.hasClass("k-state-focused"));
        ok(current.hasClass("k-state-selected"));
        equal(current.html(), "foo");
    });

    test("DropDownList triggers cascade on initial load", 1, function() {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            cascade: function() {
                ok(true);
            }
        });
    });

    test("DropDownList triggers cascade when item is selected", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
        });

        dropdownlist.bind("cascade", function() {
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.ul.children(":last").click();
    });

    test("DropDownList trigger cascade set value using value method (autoBind: false)", 1, function() {
        input.val("foo");

        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            autoBind: false,
            cascade: function() {
                ok(true);
            }
        });

        input.data("kendoDropDownList").value("foo");
    });

    asyncTest("DropDownList trigger change on search if popup is closed", 2, function() {
        var cascade;

        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            value: "foo",
            cascade: function() {
                cascade = true;
            },
            change: function() {
                ok(cascade);
                ok(true);
                start();
            }
        });

        input.data("kendoDropDownList").wrapper.trigger({
            type: "keypress",
            charCode: "b".charCodeAt(0)
        });
    });

    asyncTest("DropDownList trigger change on loop", 4, function() {
        var cascade;

        var dropdownlist = new DropDownList(input, {
            dataSource: ["too", "too1"],
            value: "too",
            cascade: function() {
                cascade = true;
            },
            change: function(e) {
                ok(cascade);
                ok(true);

                if (e.sender.value() === "too") {
                    start();
                }
            }
        });

        input.data("kendoDropDownList").wrapper.trigger({
            type: "keypress",
            charCode: "t".charCodeAt(0)
        });

        input.data("kendoDropDownList").wrapper.trigger({
            type: "keypress",
            charCode: "t".charCodeAt(0)
        });
    });

    test("DropDownList does not raise change if options.value and autoBind:false", 0, function() {
        var ddl = input.kendoDropDownList({
            autoBind: false,
            dataSource: ["foo", "bar"],
            change: function() {
                ok(false);
            },
            value: "bar"
        }).data("kendoDropDownList");

        ddl.wrapper.focus().blur();
    });

    test("DropDownList from empty SELECT with autoBind:false does not raise change event", 0, function() {
        var select = $("<select/>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select, {
            autoBind: false,
            value: "bar",
            dataSource: ["foo", "bar"],
            change: function() {
                ok(false);
            }
        });

        dropdownlist.wrapper.focus().blur();
    });

    test("Dropdownlist with enabled filter triggers change on ENTER", 1, function() {
        var dropdownlist = new DropDownList(input, {
            value: "foo",
            filter: "startswith",
            dataSource: ["foo", "bar"],
            change: function() {
                equal(dropdownlist.value(), "bar");
            }
        });

        dropdownlist.open();
        dropdownlist.filterInput.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    test("Dropdownlist with enabled filter triggers change on TAB", 1, function() {
        var dropdownlist = new DropDownList(input, {
            animation: false,
            filter: "startswith",
            dataSource: ["foo", "bar"],
            change: function() {
                equal(dropdownlist.value(), "bar");
            },
            value: "foo"
        });

        dropdownlist.open();
        dropdownlist.filterInput.focusin().trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.TAB
        });
    });

    asyncTest("Dropdownlist with filtered source triggers change on document mousedown", 1, function() {
        var dropdownlist = new DropDownList(input, {
            delay: 0,
            value: "foo",
            filter: "startswith",
            dataSource: ["foo", "bar"],
            change: function() {
                equal(dropdownlist.value(), "bar");
            }
        });

        dropdownlist.open();
        dropdownlist.bind("dataBound", function() {
            start();
            dropdownlist.filterInput.focusout();
        });

        dropdownlist.filterInput.focus().val("b").keydown();
    });

    asyncTest("DropDownList triggers filtering event on data source filter", 3, function() {
        var dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                start();

                var filter = e.filter;

                equal(filter.field, "");
                equal(filter.operator, "contains");
                equal(filter.value, "baz");
            }
        }).data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("baz").keydown();
    });

    asyncTest("modifying filter expression in filtering event changes datasource result", 2, function() {
        var dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.filter.value = "foo";
            }
        }).data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("baz").keydown();

        setTimeout(function() {
            start();
            var data = dropdownlist.dataSource.view();

            equal(data.length, 1);
            equal(data[0], "foo");
        });
    });

    asyncTest("DropDownList filtering event can be prevented", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.preventDefault();
            }
        }).data("kendoDropDownList");

        dropdownlist.dataSource.bind("change", function() {
            ok(false);
        });

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("baz").keydown();

        setTimeout(function() {
            start();
            ok(true);
        });
    });

    asyncTest("DropDownList triggers filtering when filter is cleared", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains"
        }).data("kendoDropDownList");

        dropdownlist.dataSource.one("change", function() {
            dropdownlist.bind("filtering", function(e) {
                start();
                equal(e.filter, undefined);
            });

            dropdownlist.ul.children("li").first().click();
            dropdownlist.open();
        });

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("bar").keydown();
    });

    test("DropDownList with option lable raises change event on first click", 1, function() {
        var changeWasCalled = false, dropdownlist = new DropDownList(input, {
            optionLabel: "Select...",
            dataSource: ["foo", "bar"],
            change: function() {
                ok(true);
            }
        });

        dropdownlist.value("");

        dropdownlist.open();
        dropdownlist.ul.children(":first").click();
    });

    test("DropDownList triggers select event on blur after filtration", 1, function() {
        var dropdownlist = new DropDownList(input, {
            filter: "startswith",
            optionLabel: "Select...",
            dataSource: ["foo", "bar"],
            select: function(e) {
                equal(e.item[0], dropdownlist.ul.children(":first")[0]);
            }
        });

        dropdownlist.wrapper.focus();
        dropdownlist.open();
        dropdownlist.search("bar");
        dropdownlist.element.focusout();
    });

    test("DropDownList does not select focused item on blur when select event is prevented", 1, function() {
        var dropdownlist = new DropDownList(input, {
            filter: "startswith",
            dataSource: ["foo", "bar"],
            select: function(e) {
                e.preventDefault();
            }
        });

        dropdownlist.wrapper.focus();
        dropdownlist.open();
        dropdownlist.search("bar");
        dropdownlist.element.focusout();

        equal(dropdownlist.value(), "foo");
    });
})();
