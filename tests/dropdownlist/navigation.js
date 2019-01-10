(function() {
    var DropDownList = kendo.ui.DropDownList,
        data = ["foo", "bar"],
        SELECTED = "k-state-selected",
        keys = kendo.keys,
        CLICK = kendo.support.touch ? "touchend" : "click",
        input;

    describe("kendo.ui.DropDownList selection", function() {
        beforeEach(function() {
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key });
            };

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var ddl = input.data("kendoDropDownList");
            ddl.destroy();
        });

        var getData = function(length) {
            var result = [];
            for (var idx = 0; idx < length; idx++) {
                result.push("item" + idx);
            }
            return result;
        };

        it("always select first item on dataSource change", function() {
            var dropdownlist = new DropDownList(input, ["foo", "bar"]);

            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        });

        it("click first li should update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");
            dropdownlist.ul.children().eq(1).trigger(CLICK);

            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);
        });

        it("value should be set to item.text if no item.value", function() {
            var data = [{ text: "Foo", value: 1 }, { text: "Bar" }];

            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: data
            });

            dropdownlist.ul.children().eq(1).trigger(CLICK);

            assert.equal(dropdownlist.text(), data[1].text);
            assert.equal(dropdownlist.value(), data[1].text);
        });

        it("selecting a li should update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.select(dropdownlist.ul.children().eq(1));

            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);
        });

        it("click li should close popup", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.popup.bind("close", function() {
                assert.isOk(true);
            });

            dropdownlist.popup.open();
            dropdownlist.ul.children().eq(1).trigger(CLICK);
        });

        it("select should select a li by index", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.select(1);

            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);
        });

        it("selected should be persisted", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.select(1);

            dropdownlist.wrapper.trigger(CLICK);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        });

        it("only one li should be selected at a time", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.select(1);
            dropdownlist.select(0);

            dropdownlist.wrapper.trigger(CLICK);

            assert.equal(dropdownlist.ul.children("." + SELECTED).length, 1);
        });

        it("press down arrow should focus next item and update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.wrapper.focus().press(keys.DOWN);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);

        });

        it("press right arrow should focus next item", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.wrapper.focus().press(keys.RIGHT);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        });

        it("press down arrow when last item is selected should not do anything", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.dataSource.read();
            dropdownlist.select(dropdownlist.ul.children(":last"));
            dropdownlist.wrapper.focus().press(keys.DOWN);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);

        });

        it("press down arrow fetches the source and select first item", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: new kendo.data.DataSource({
                    data: data
                })
            });

            dropdownlist.wrapper.focus().press(keys.DOWN);

            assert.equal(dropdownlist.select(), 0);
        });

        it("press up arrow should focus prev item and update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.dataSource.read();

            dropdownlist.select(1);
            dropdownlist.wrapper.focus().press(keys.UP);

            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
            assert.equal(dropdownlist.text(), data[0]);
            assert.equal(dropdownlist.value(), data[0]);

        });

        it("press left arrow should focus prev item", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.dataSource.read();

            dropdownlist.select(1);
            dropdownlist.wrapper.focus().press(keys.LEFT);

            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        });

        it("press right arrow should allow default when filter input is focused", function() {
            var dropdownlist = input.kendoDropDownList({
                dataSource: data,
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.filterInput.focus().val("test");
            dropdownlist.filterInput.press(keys.RIGHT);

            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        });

        it("press up arrow when first item is selected should not do anything", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.wrapper.focus().press(keys.UP);

            assert.equal(dropdownlist.selectedIndex, 0);
            assert.equal(dropdownlist.text(), data[0]);
            assert.equal(dropdownlist.value(), data[0]);
        });

        it("press home should focus first item and update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.select(1);
            dropdownlist.wrapper.focus().press(keys.HOME);

            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
            assert.equal(dropdownlist.text(), data[0]);
            assert.equal(dropdownlist.value(), data[0]);

        });

        it("press end should focus last item and update text and value", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.dataSource.read();

            dropdownlist.select(0);
            dropdownlist.wrapper.focus().press(keys.END);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(dropdownlist.text(), data[1]);
            assert.equal(dropdownlist.value(), data[1]);

        });

        it("press enter should close popup when no change in selection", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.popup.bind("close", function() {
                assert.isOk(true);
            });

            dropdownlist.popup.open();

            dropdownlist.select(0);
            dropdownlist.wrapper.focus().press(keys.ENTER);
        });

        it("press enter should keep popup opened if filter is typed and source is not loaded yet", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: data,
                delay: 500,
                filter: "startswith"
            });

            dropdownlist.open();
            dropdownlist.filterInput.focus().val("test");
            dropdownlist.filterInput.trigger("keydown");

            dropdownlist.filterInput.press(keys.ENTER);

            assert.isOk(dropdownlist.popup.visible());
        });

        it("press enter should select current item", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.popup.bind("close", function() {
                var current = dropdownlist.current();
                assert.equal(current.index(), 1);
                assert.isOk(current.hasClass("k-state-focused"));
                assert.isOk(current.hasClass("k-state-selected"));
            });

            dropdownlist.popup.open();

            dropdownlist.select(0);
            dropdownlist.wrapper.focus().press(keys.DOWN).press(keys.ENTER);
        });

        it("press enter should not raise error when last item is selected", function() {
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

            assert.isOk(true);
        });

        it("selected item with enter should persist selected state", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");
            dropdownlist.popup.options.animation = false;

            dropdownlist.ul.show();
            dropdownlist.select(0);
            dropdownlist.wrapper.focus().press(keys.DOWN).press(keys.ENTER);

            dropdownlist.ul.show();

            var current = dropdownlist.current();
            assert.equal(current.index(), 1);
            assert.isOk(current.hasClass("k-state-focused"));
            assert.isOk(current.hasClass("k-state-selected"));
        });

        it("press enter should not throw an error", function() {
            var dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.wrapper.focus().press(keys.ENTER);

            assert.isOk(true);
        });

        it("press esc should close popup when no change in selection", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.popup.bind("close", function() {
                assert.isOk(true);
            });

            dropdownlist.popup.open();

            dropdownlist.select(0);
            dropdownlist.wrapper.focus().press(keys.ESC);
        });

        it("press esc should return focus to the wrapper", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                filter: "startswith",
                data: data
            });

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.filterInput.press(keys.ESC);

            assert.equal(document.activeElement, dropdownlist.wrapper[0]);
        });

        it("pressing enter closes popup", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: data
            });

            dropdownlist.open();

            dropdownlist.wrapper.focus().press(kendo.keys.ENTER);

            assert.isOk(!dropdownlist.popup.visible());
        });

        it("pressing alt + down should open popup", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                open: function() {
                    assert.isOk(true);
                }
            });

            dropdownlist.wrapper.trigger({ type: "keydown", altKey: true, keyCode: kendo.keys.DOWN });
        });

        it("pressing alt + up should close popup", function() {
            var blurWasCalled, dropdownlist = new DropDownList(input, {
                dataSource: data
            });
            dropdownlist.popup.bind("close", function() {
                assert.isOk(true);
            });
            dropdownlist.open();

            dropdownlist.wrapper.trigger({ type: "keydown", altKey: true, keyCode: kendo.keys.UP });
        });

        it("navigation works after rebind", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data
            });

            dropdownlist.dataSource.data(data);
            dropdownlist.wrapper.focusin();

            dropdownlist.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.DOWN });

            assert.equal(dropdownlist.current().index(), 1);
        });

        it("esc calls prevent default if popup is opened", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data
            });

            dropdownlist.open();

            dropdownlist.wrapper.trigger({
                type: "keydown",
                keyCode: kendo.keys.ESC,
                preventDefault: function() {
                    assert.isOk(true);
                }
            });
        });

        it("add focused class on focus when widget is in readonly state", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data
            });

            dropdownlist.readonly();
            dropdownlist.wrapper.focusin();

            assert.isOk(dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
        });

        it("DropDownList selects by index after continues selection", function() {
            var dropdownlist = input.kendoDropDownList({
                optionLabel: "Any",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ]
            }).data("kendoDropDownList");

            dropdownlist.select(1);
            dropdownlist.select(0);
            dropdownlist.dataSource.read();

            assert.isOk(dropdownlist.current());
            assert.equal(dropdownlist.current().text(), "Any");
        });


        it("DropDownList does not filter on altKey", function() {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
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

            assert.equal(dropdownlist.calls("_search"), 0);
        });

        it("DropDownList prevent 'home' logic when filterinput is focused", function() {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
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

            assert.equal(dropdownlist.calls("_select"), 0);
        });

        it("DropDownList calls focusout of wrapper on TAB", function() {
            var dropdownlist = input.kendoDropDownList({
                animation: false,
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");


            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.wrapper.focusout(function(e) {
                assert.isOk(true);
            });

            dropdownlist.filterInput.trigger({
                type: "keydown",
                keyCode: kendo.keys.TAB
            });
        });

        it("DropDownList do not call focusout manually if filterInput is not focused", function() {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.focusout(function() {
                assert.isOk(false);
            });

            dropdownlist.filterInput.trigger({
                type: "keydown",
                keyCode: kendo.keys.TAB
            });
        });

        it("DropDownList does not lose focus on double wrapper click", function() {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                animation: false,
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.click();
            dropdownlist.wrapper.click();

            assert.equal(dropdownlist.wrapper[0], document.activeElement);
        });

        it("DropDownList removes focused state on blur", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.wrapper.mousedown().focusin().click();
            assert.isOk(dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));

            dropdownlist.wrapper.focusout();

            assert.isOk(!dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
        });

        it("DropDownList removes focused state on blur when arrow is clicked", function() {
            var dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.wrapper.find(".k-icon").mousedown().click();
            dropdownlist.wrapper.focusout();

            assert.isOk(!dropdownlist.wrapper.find(".k-dropdown-wrap").hasClass("k-state-focused"));
        });

        it("DropDownList closes popup with filter input on scroll", function() {
            input.wrap('<div style="overflow:hidden"></div>');
            var parent = input.parent();

            var dropdownlist = input.kendoDropDownList({
                animation: false,
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            parent.trigger("scroll");

            assert.isOk(!dropdownlist.popup.visible());
        });

        //option label
        it("option label is focused if defined", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any"
            });

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.isOk(current.hasClass("k-state-focused"));
        });

        it("first item is selected on down when option label is focused", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any"
            });

            dropdownlist.wrapper.focus().press(keys.DOWN);

            var current = dropdownlist.current();

            assert.equal(current[0], dropdownlist.ul.children()[0]);
        });

        it("focus option label on UP when first LI element is focused", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any",
                index: 1
            });

            dropdownlist.wrapper.focus().press(keys.UP);

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.isOk(current.hasClass("k-state-focused"));
            assert.isOk(current.hasClass("k-state-selected"));
        });

        it("stays on option label on UP", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any"
            });

            dropdownlist.wrapper.focus().press(keys.UP);

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.isOk(current.hasClass("k-state-focused"));
            assert.isOk(current.hasClass("k-state-selected"));
        });

        it("focus optionLabel on HOME", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any",
                index: 1
            });

            dropdownlist.wrapper.focus().press(keys.HOME);

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.isOk(current.hasClass("k-state-focused"));
            assert.isOk(current.hasClass("k-state-selected"));
        });

        it("unfocus optionLabel on END", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                optionLabel: "Any"
            });

            dropdownlist.wrapper.focus().press(keys.END);

            var optionLabel = dropdownlist.optionLabel;
            var current = dropdownlist.current();

            assert.equal(current[0], dropdownlist.ul.children()[data.length - 1]);

            assert.isOk(!optionLabel.hasClass("k-state-focused"));
            assert.isOk(!optionLabel.hasClass("k-state-selected"));
        });

        it("widget sets option label value if complex object", function() {
            var dropdownlist = new DropDownList(input, {
                dataValueField: "value",
                dataTextField: "text",
                dataSource: [{
                    text: "text", value: "value"
                }],
                optionLabel: {
                    text: "Any",
                    value: 0
                }
            });

            assert.equal(dropdownlist.value(), "0");
        });

        it("widget sets option label value if complex object and TAB key", function() {
            var dropdownlist = new DropDownList(input, {
                dataValueField: "value",
                dataTextField: "text",
                dataSource: [{
                    text: "text", value: "value"
                }],
                optionLabel: {
                    text: "Any",
                    value: 0
                }
            });

            dropdownlist.wrapper.focus().press(keys.TAB);

            assert.equal(dropdownlist.value(), "0");
        });

        it("Selects first item if it is focused but not selected", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data,
                index: -1
            });

            dropdownlist.listView.focusFirst();
            dropdownlist.wrapper.focus().press(keys.DOWN);

            var current = dropdownlist.current();

            assert.equal(current.index(), 0);
            assert.isOk(current.hasClass("k-state-selected"));
        });

        it("DropDownList does not focus filter input if mobile device", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: data,
                filter: "contains"
            });

            var filterInput = dropdownlist.filterInput;

            kendo.support.mobileOS = true;
            kendo.support.touch = true;

            dropdownlist.wrapper.focus().click();

            assert.notEqual(filterInput[0], document.activeElement);

            kendo.support.mobileOS = false;
            kendo.support.touch = false;
        });

        it("DropDownList clears filter on ESC", function(done) {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                filter: "startswith",
                delay: 0,
                dataSource: [
                    { text: "Black", value: "1" },
                    { text: "Orange", value: "2" },
                    { text: "Grey", value: "3" }
                ],
                dataTextField: "text",
                dataValueField: "value",
                index: 2
            });

            dropdownlist.open();
            dropdownlist.filterInput.focus().val("Gre").keydown();

            dropdownlist.one("dataBound", function() {
                dropdownlist.filterInput.press(keys.ESC);

                assert.equal(dropdownlist.dataSource.view().length, 3);
                assert.equal(dropdownlist.filterInput.val(), "");
                done();
            });
        });

        it("DropDownList scrolls content down", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: getData(100)
            });

            stub(dropdownlist.listView, {
                scrollWith: dropdownlist.listView.scrollWith
            });

            dropdownlist.open();
            dropdownlist.wrapper.press(keys.PAGEDOWN);

            assert.equal(dropdownlist.listView.calls("scrollWith"), 1);
            assert.equal(dropdownlist.listView.args("scrollWith")[0], dropdownlist.listView.screenHeight());
        });

        it("DropDownList scrolls content up", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: getData(100)
            });

            stub(dropdownlist.listView, {
                scrollWith: dropdownlist.listView.scrollWith
            });

            dropdownlist.open();
            dropdownlist.wrapper.press(keys.PAGEUP);

            assert.equal(dropdownlist.listView.calls("scrollWith"), 1);
            assert.equal(dropdownlist.listView.args("scrollWith")[0], -1 * dropdownlist.listView.screenHeight());
        });

        it("DropDownList prevents default on PAGEDOWN", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                dataSource: getData(100)
            });

            dropdownlist.open();
            dropdownlist.wrapper.trigger({
                type: "keydown",
                keyCode: keys.PAGEDOWN,
                preventDefault: function() {
                    assert.isOk(true);
                }
            });
        });

        it("Space key opens the popup", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: data
            });

            dropdownlist.wrapper.focus().press(keys.SPACEBAR);
            assert.isOk(dropdownlist.popup.visible());
        });

        it("Space key does not close popup when filtering", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                dataSource: [
                    { text: "Black", value: "1" },
                    { text: "Orange", value: "2" },
                    { text: "Grey", value: "3" }
                ],
                dataTextField: "text",
                dataValueField: "value"
            });

            dropdownlist.open();
            dropdownlist.filterInput.focus().press(keys.SPACEBAR);
            assert.isOk(dropdownlist.popup.visible());
        });
    });

    describe("kendo.ui.DropDownList animated selection", function() {
        beforeEach(function() {
            kendo.effects.enable();
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key });
            };

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var ddl = input.data("kendoDropDownList");
            ddl.destroy();
            input = null;
            kendo.effects.disable();
        });

        it("DropDownList focuses filter input on open", function(done) {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.popup.one("activate", function() {
                assert.equal(document.activeElement, dropdownlist.filterInput[0]);
                done();
            });
        });
        it("DropDownList returns focus to wrapper on ALT+UP", function(done) {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.popup.one("activate", function() {

                dropdownlist.filterInput.trigger({
                    type: "keydown",
                    keyCode: kendo.keys.UP,
                    altKey: true
                });

                assert.equal(document.activeElement, dropdownlist.wrapper[0]);
                done();
            });
        });

        it("DropDownList returns focus to wrapper on ENTER", function(done) {
            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.popup.one("activate", function() {
                dropdownlist.filterInput.trigger({
                    type: "keydown",
                    keyCode: kendo.keys.ENTER
                });

                setTimeout(function() {
                    assert.equal(dropdownlist.wrapper[0], document.activeElement);
                    done();
                });
            });
        });

        it("DropDownList shouldn't select focused item on blur after filtering", function(done) {
            var dropdownlist = input.kendoDropDownList({
                delay: 0,
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            dropdownlist.bind("dataBound", function() {
                dropdownlist.filterInput.focusout();

                assert.equal(dropdownlist.value(), "item1");
                done();
            });

            dropdownlist.filterInput.focus().val("item2").keydown();
        });

        it("DropDownList does not close popup if still animating", function() {
            input.wrap('<div style="overflow:hidden"></div>');
            var parent = input.parent();

            var dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "item1", value: "item1" },
                    { text: "item2", value: "item2" }
                ],
                filter: "startswith"
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.open();

            parent.trigger("scroll");

            assert.isOk(dropdownlist.popup.visible());
        });

    });
}());
