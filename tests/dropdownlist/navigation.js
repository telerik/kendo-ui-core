(function() {
    var DropDownList = kendo.ui.DropDownList,
    data = ["foo", "bar"],
        SELECTED = "k-state-selected",
        keys = kendo.keys,
        CLICK = kendo.support.touch ? "touchend" : "click",
        input;

    module("kendo.ui.DropDownList selection", {
        setup: function() {
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key } );
            };
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            var ddl = input.data("kendoDropDownList");
            ddl.destroy();
        }
    });

   test("always select first item on dataSource change", function() {
        var dropdownlist = new DropDownList(input, ["foo", "bar"]);

        ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
   });

    test("click first li should update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");
        dropdownlist.ul.children().eq(1).trigger(CLICK);

        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);
    });

    test("value should be set to item.text if no item.value", function() {
        var data = [{ text: "Foo", value: 1 }, { text: "Bar" }];

        dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });

        dropdownlist.ul.children().eq(1).trigger(CLICK);

        equal(dropdownlist.text(), data[1].text);
        equal(dropdownlist.value(), data[1].text);
    });

    test("selecting a li should update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.select(dropdownlist.ul.children().eq(1));

        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);
    });

    test("click li should close popup", 1, function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.popup.bind("close", function(){
            ok(true);
        });

        dropdownlist.popup.open();
        dropdownlist.ul.children().eq(1).trigger(CLICK);
    });

    test("select should select a li by index", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.select(1);

        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);
    });

    test("selected should be persisted", function(){
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.select(1);

        dropdownlist.wrapper.trigger(CLICK);

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
    });

    test("only one li should be selected at a time", function(){
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.select(1);
        dropdownlist.select(0);

        dropdownlist.wrapper.trigger(CLICK);

        equal(dropdownlist.ul.children("." + SELECTED).length, 1);
    });

    test("press down arrow should focus next item and update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.wrapper.focus().press(keys.DOWN);

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);

    });

    test("press right arrow should focus next item", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.wrapper.focus().press(keys.RIGHT);

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
    });

    test("press down arrow when last item is selected should not do anything", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.dataSource.read();
        dropdownlist.select(dropdownlist.ul.children(":last"));
        dropdownlist.wrapper.focus().press(keys.DOWN);

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);

    });

    test("press up arrow should focus prev item and update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.dataSource.read();

        dropdownlist.select(1);
        dropdownlist.wrapper.focus().press(keys.UP);

        ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        equal(dropdownlist.text(), data[0]);
        equal(dropdownlist.value(), data[0]);

    });

    test("press left arrow should focus prev item", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.dataSource.read();

        dropdownlist.select(1);
        dropdownlist.wrapper.focus().press(keys.LEFT);

        ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
    });

    test("press up arrow when first item is selected should not do anything", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.wrapper.focus().press(keys.UP);

        equal(dropdownlist.selectedIndex, 0);
        equal(dropdownlist.text(), data[0]);
        equal(dropdownlist.value(), data[0]);
    });

    test("press home should focus first item and update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.dataSource.read();

        dropdownlist.select(1);
        dropdownlist.wrapper.focus().press(keys.HOME);

        ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        equal(dropdownlist.text(), data[0]);
        equal(dropdownlist.value(), data[0]);

    });

    test("press end should focus last item and update text and value", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.dataSource.read();

        dropdownlist.select(0);
        dropdownlist.wrapper.focus().press(keys.END);

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        equal(dropdownlist.text(), data[1]);
        equal(dropdownlist.value(), data[1]);

    });

    test("press enter should close popup when no change in selection", 1, function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.popup.bind("close", function(){
            ok(true);
        });

        dropdownlist.popup.open();

        dropdownlist.select(0);
        dropdownlist.wrapper.focus().press(keys.ENTER);
    });

    test("press enter should select current item", 3, function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.popup.bind("close", function(){
            equal(dropdownlist._current.index(), 1);
            ok(dropdownlist._current.hasClass("k-state-focused"));
            ok(dropdownlist._current.hasClass("k-state-selected"));
        });

        dropdownlist.popup.open();

        dropdownlist.select(0);
        dropdownlist.wrapper.focus().press(keys.DOWN).press(keys.ENTER);
    });

    test("press enter should not raise error when last item is selected", 1, function() {
        var dropdownlist = new kendo.ui.DropDownList(input, {
            dataSource: [
                { name: "Compact", value: 0 },
                { name: "Details", value: 1 }
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        dropdownlist.open();
        dropdownlist.ul.find("li:last").click();

        dropdownlist.wrapper
                    .trigger({ type: "keypress", keyCode: keys.ENTER })
                    .trigger({ type: "keypress", keyCode: keys.ENTER })
                    .trigger({ type: "keypress", keyCode: keys.ENTER })
                    .trigger({ type: "keypress", keyCode: keys.ENTER });

        ok(true);
    });

    test("selected item with enter should persist selected state", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");
        dropdownlist.popup.options.animation = false;

        dropdownlist.ul.show();
        dropdownlist.select(0);
        dropdownlist.wrapper.focus().press(keys.DOWN).press(keys.ENTER);

        dropdownlist.ul.show();

        equal(dropdownlist._current.index(), 1);
        ok(dropdownlist._current.hasClass("k-state-focused"));
        ok(dropdownlist._current.hasClass("k-state-selected"));
    });


    test("press esc should close popup when no change in selection", 1, function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.popup.bind("close", function(){
            ok(true);
        });

        dropdownlist.popup.open();

        dropdownlist.select(0);
        dropdownlist.wrapper.focus().press(keys.ESC);
    });

    test("pressing enter calls _blur", function() {
        var blurWasCalled, dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        dropdownlist._blur = function(li) {
            blurWasCalled = true;
        };

        dropdownlist._current = dropdownlist.ul.children().first();
        dropdownlist.wrapper.focus().press(kendo.keys.ENTER);
        ok(blurWasCalled);
    });

    test("pressing alt + down should open popup", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: data,
            open: function() {
                ok(true);
            }
        });

        dropdownlist.wrapper.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.DOWN});
    });

    test("pressing alt + up should close popup", 1, function() {
        var blurWasCalled, dropdownlist = new DropDownList(input, {
            dataSource: data
        });
        dropdownlist.popup.bind("close", function(){
            ok(true);
        });
        dropdownlist.open();

        dropdownlist.wrapper.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.UP});
    });

    test("navigation works after rebind", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        dropdownlist.dataSource.data(data);
        dropdownlist.wrapper.focusin();

        dropdownlist.wrapper.trigger({type: "keydown", keyCode: kendo.keys.DOWN});

        equal(dropdownlist.current().index(), 1);
    });

    test("esc calls prevent default if popup is opened", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        dropdownlist.open();

        dropdownlist.wrapper.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC,
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("add focused class on focus when widget is in readonly state", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        dropdownlist.readonly();
        dropdownlist.wrapper.focusin();

        ok(dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
    });

    test("DropDownList selects by index after continues selection", 2, function() {
        var dropdownlist = input.kendoDropDownList({
            optionLabel: "Any",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            change: function() {
                dropdownlist.dataSource.read();
            }
        }).data("kendoDropDownList");

        dropdownlist.select(1);
        dropdownlist.select(0);
        dropdownlist.trigger("change");

        ok(dropdownlist.current());
        equal(dropdownlist.current().text(), "Any");
    });

    test("DropDownList focuses filter input on open", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        equal(document.activeElement, dropdownlist.filterInput[0]);
    });

    test("DropDownList does not filter on altKey", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        stub(dropdownlist, {
            _search: dropdownlist._search
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            altKey: true
        });

        equal(dropdownlist.calls("_search"), 0);
    });

    test("DropDownList prevent 'home' logic when filterinput is focused", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        stub(dropdownlist, {
            _select: dropdownlist._select
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.HOME
        });

        equal(dropdownlist.calls("_select"), 0);
    });

    test("DropDownList returns focus to wrapper on ALT+UP", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.UP,
            altKey: true
        });

        equal(dropdownlist.wrapper[0], document.activeElement);
    });

    asyncTest("DropDownList returns focus to wrapper on ENTER", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        setTimeout(function() {
            start();
            equal(dropdownlist.wrapper[0], document.activeElement);
        });
    });

    asyncTest("DropDownList selects focused item on blur after filtering", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        dropdownlist.bind("dataBound", function() {
            start();
            dropdownlist.filterInput.focusout();

            equal(dropdownlist.value(), "item2");
        });

        dropdownlist.filterInput.focus().val("item2").keydown();
    });

    test("DropDownList calls focusout of wrapper on TAB", function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        dropdownlist.wrapper.focusout(function() {
            ok(true);
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.TAB
        });
    });

    test("DropDownList do not call focusout manually if filterInput is not focused", 0, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.focusout(function() {
            ok(false);
        });

        dropdownlist.filterInput.trigger({
            type: "keydown",
            keyCode: kendo.keys.TAB
        });
    });

    test("DropDownList do not loose focus on double wrapper click", 1, function() {
        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.click();
        dropdownlist.wrapper.click();

        equal(dropdownlist.wrapper[0], document.activeElement);
    });

    test("DropDownList removes focused state on blur", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.wrapper.mousedown().focusin().click();
        ok(dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));

        dropdownlist.wrapper.focusout();

        ok(!dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
    });

    test("DropDownList removes focused state on blur when arrow is clicked", function() {
        var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.wrapper.find(".k-icon").mousedown().click();
        dropdownlist.wrapper.focusout();

        ok(!dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
    });

    test("DropDownList closes popup with filter input on scroll", 1, function() {
        input.wrap('<div style="overflow:hidden"></div>');
        var parent = input.parent();

        var dropdownlist = input.kendoDropDownList({
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        parent.trigger("scroll");

        ok(!dropdownlist.popup.visible());
    });

    test("DropDownList does not close popup if still animating", 1, function() {
        input.wrap('<div style="overflow:hidden"></div>');
        var parent = input.parent();

        var dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "item1", value: "item1"},
                { text: "item2", value: "item2"}
            ],
            filter: "startswith"
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.open();

        parent.trigger("scroll");

        ok(dropdownlist.popup.visible());
    });
})();
