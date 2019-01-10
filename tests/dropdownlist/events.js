(function() {
    var DropDownList = kendo.ui.DropDownList,
        CLICK = kendo.support.touch ? "touchend" : "click",
        input, select;

    describe("kendo.ui.DropDownList events", function() {
        beforeEach(function() {

            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key });
            }
            input = $("<input />").appendTo(Mocha.fixture);
            select = $("<select></select>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            Mocha.fixture.find(":input").each(function() {
                var widget = $(this).data("kendoDropDownList");

                if (widget) {
                    widget.destroy();
                }
            });

            input.add($("ul")).parent(".k-widget").remove();

        });

        it("_blur calls _change", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist._change = function() {
                changeWasCalled = true;
            }

            dropdownlist._blur();

            assert.isOk(changeWasCalled);
        });

        it("_blur calls popup close", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.dataSource.read();
            dropdownlist.popup.open();

            dropdownlist.popup.bind("close", function() {
                assert.isOk(true);
            });

            dropdownlist._blur();
        });

        it("change event is not raised on load when value is selected by index", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(false);
                }
            });
        });

        it("change event is not raised on load when option.value is defined", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
                value: "foo",
                change: function() {
                    assert.isOk(false);
                }
            });
        });

        it("change event is raised once when value is 0 and widget is blurred", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "Black", value: 0 },
                    { text: "Orange", value: 1 },
                    { text: "Grey", value: 2 }
                ],
                index: 1,
                change: function() {
                    assert.isOk(true);
                }
            });

            dropdownlist.open();
            dropdownlist.ul.find("li:first").click();

            dropdownlist._change();
            dropdownlist._change();
        });

        it("_change raises the change event if value has changed", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
                change: function() {
                    changeWasCalled = true;
                }
            });
            dropdownlist.value("bar");
            dropdownlist._old = "foo";
            dropdownlist._change();
            assert.isOk(changeWasCalled);
        });

        it("_change raises the input change event", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            input.bind("change", function() {
                changeWasCalled = true;
            });

            dropdownlist.value("bar");
            dropdownlist._old = "foo";
            dropdownlist._change();
            assert.isOk(changeWasCalled);
        });

        it("change event is triggered once after setOptions", function() {
            var dropdownlist = new DropDownList(input, {
                value: ""
            });
            var counter = 0;
            dropdownlist.setDataSource(["foo", "bar"]);
            dropdownlist.setOptions({
                change: function() {
                    counter++
                }
            });

            dropdownlist.open();
            dropdownlist.ul.find("li:last").click();
            assert.equal(counter, 1);
        });

        it("_change raises change event if selectedIndex has changed", function() {
            var dropdownlist = new DropDownList(select, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.selectedIndex = 1;
            dropdownlist.wrapper.focus().focusout();
        });

        it("support setting a value in change event handler", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
                change: function(e) {
                    e.sender.select(0);
                }
            });

            dropdownlist.open();
            dropdownlist.ul.find("li:last").click();

            assert.equal(dropdownlist.value(), "foo");
        });

        it("select does not raise the change event", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(false);
            });

            dropdownlist.wrapper.focus();
            dropdownlist.select($("<li>foo</li>"));
        });

        it("clicking an item raises the change event", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.wrapper.focus();

            dropdownlist.ul.children().eq(1).trigger(CLICK);
        });

        it("change should be raised on enter", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.open();
            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.DOWN);
            dropdownlist.wrapper.press(kendo.keys.ENTER);
        });

        it("change should be raised on tab", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.open();
            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.DOWN);
            dropdownlist.wrapper.press(kendo.keys.TAB);
        });

        it("clicking an item raises the change event of HTML select", function() {
            var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select, {
                dataSource: ["foo", "bar"]
            });

            select.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.wrapper.focus();
            dropdownlist.ul.children().eq(1).trigger(CLICK);
        });

        it("change should be raised on down arrow and closed popup", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            dropdownlist.bind("change", function() {
                assert.isOk(true);
            });

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.DOWN);
        });

        it("open event when click arrow", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                open: function() {
                    assert.isOk(true);
                }
            });

            input.data("kendoDropDownList").wrapper.trigger(CLICK);
        });

        it("open event should be cancellable", function(done) {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                open: function(e) {
                    e.preventDefault();
                }
            });

            var dropdownlist = input.data("kendoDropDownList");

            dropdownlist.wrapper.trigger(CLICK);

            setTimeout(function() {
                assert.isOk(!dropdownlist.popup.visible());
                done();
            }, 200);
        });

        it("open event when ALT + down arrow", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                open: function() {
                    assert.isOk(true);
                }
            });

            input.trigger({ type: "keydown", keyCode: kendo.keys.DOWN, altKey: true });
        });

        it("close event when click arrow", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                close: function() {
                    assert.isOk(true);
                }
            });

            var dropdownlist = input.data("kendoDropDownList");
            dropdownlist.open();
            dropdownlist.wrapper.trigger(CLICK);
        });

        it("close event should be cancellable", function(done) {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                dataSource: [{ text: "foo" }, { text: "bar" }],
                close: function(e) {
                    e.preventDefault();
                }
            });

            var dropdownlist = input.data("kendoDropDownList");

            dropdownlist.open();
            dropdownlist.wrapper.trigger(CLICK);

            setTimeout(function() {
                assert.isOk(dropdownlist.popup.visible());
                done();
            }, 200);
        });

        it("close event when ALT + up arrow", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                dataSource: [{ text: "foo" }, { text: "bar" }],
                close: function() {
                    assert.isOk(true);
                }
            });

            input.data("kendoDropDownList").open();

            input.trigger({ type: "keydown", keyCode: kendo.keys.UP, altKey: true });
        });

        it("close event when select item", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                close: function() {
                    assert.isOk(true);
                }
            });

            var ddl = input.data("kendoDropDownList");
            ddl.open();

            ddl.ul.children().eq(0).trigger(CLICK);
        });

        it("click item raises select event", function() {
            var dropdownlist = input.kendoDropDownList({
                dataSource: ["foo"],
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.ul.children()[0]);
                    assert.equal(e.dataItem, dropdownlist.dataSource.view()[0]);
                }
            }).data("kendoDropDownList");

            dropdownlist.open();
            dropdownlist.ul.children().first().trigger(CLICK);
        });

        it("click item raises select event", function() {
            var dropdownlist = input.kendoDropDownList({
                optionLabel: "select...",
                dataSource: ["foo"],
                value: "foo",
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.optionLabel[0]);
                    assert.equal(e.dataItem, "select...");
                }
            }).data("kendoDropDownList");

            dropdownlist.open();
            dropdownlist.optionLabel.trigger(CLICK);
        });

        it("prevent select event should only close the popup", function() {
            var dropdownlist = input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                value: "foo",
                select: function(e) {
                    assert.isOk(true, ' select was not called');
                    e.preventDefault();
                },
                change: function() {
                    assert.isOk(false, ' change was called');
                }
            }).data("kendoDropDownList");

            dropdownlist.open();
            dropdownlist.ul.children().first().trigger(CLICK);

            assert.isOk(!dropdownlist.popup.visible(), 'popup is not visible');
        });

        it("selection with arrow triggers the select event", function() {
            var dropdownlist = input.kendoDropDownList({
                dataSource: ["foo"],
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.ul.children()[0]);
                    assert.equal(e.dataItem, dropdownlist.dataSource.view()[0]);
                }
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.DOWN);
        });

        it("preventing select event during navigation reverts selection", function() {
            var dropdownlist = input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                select: function(e) {
                    e.preventDefault()
                }
            }).data("kendoDropDownList");

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.DOWN);

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-state-focused"));
            assert.isOk(current.hasClass("k-state-selected"));
            assert.equal(current.html(), "foo");
        });

        it("shouldn't trigger select when value has not changed (TAB)", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [
                    { id: 1, name: "foo" },
                    { id: 2, name: "bar" }
                ],
                dataValueField: "id",
                dataTextField: "name"
            });

            dropdownlist.bind("select", function() {
                assert.isOk(false);
            });

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.press(kendo.keys.TAB);
        });

        it("shouldn't trigger select when value has not changed (BLUR)", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [
                    { id: 1, name: "foo" },
                    { id: 2, name: "bar" }
                ],
                dataValueField: "id",
                dataTextField: "name"
            });

            dropdownlist.bind("select", function() {
                assert.isOk(false);
            });

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.focusout();
        });

        it("DropDownList triggers cascade on initial load", function() {
            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                cascade: function() {
                    assert.isOk(true);
                }
            });
        });

        it("DropDownList triggers cascade when item is selected", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
            });

            dropdownlist.bind("cascade", function() {
                assert.isOk(true);
            });

            dropdownlist.open();
            dropdownlist.ul.children(":last").click();
        });

        it("DropDownList trigger cascade set value using value method (autoBind: false)", function() {
            input.val("foo");

            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                autoBind: false,
                cascade: function() {
                    assert.isOk(true);
                }
            });

            input.data("kendoDropDownList").value("foo");
        });


        it("DropDownList triggers cascade when item is selected via keyboard", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"],
                cascade: function() {
                    assert.isOk(true);
                }
            });
            dropdownlist.open();
            dropdownlist.wrapper.press(kendo.keys.DOWN);
            dropdownlist.wrapper.press(kendo.keys.UP);
        });

        it("DropDownList trigger change on search if popup is closed", function(done) {
            var cascade;

            input.kendoDropDownList({
                dataSource: ["foo", "bar"],
                value: "foo",
                cascade: function() {
                    cascade = true;
                },
                change: function() {
                    assert.isOk(cascade);
                    assert.isOk(true);
                    done();
                }
            });

            input.data("kendoDropDownList").wrapper.trigger({
                type: "keypress",
                charCode: "b".charCodeAt(0)
            });
        });

        it("DropDownList trigger change on loop", function(done) {
            var cascade;

            var dropdownlist = new DropDownList(input, {
                dataSource: ["too", "too1"],
                value: "too",
                cascade: function() {
                    cascade = true;
                },
                change: function(e) {
                    assert.isOk(cascade);
                    assert.isOk(true);

                    if (e.sender.value() === "too") {
                        done();
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

        it("DropDownList does not raise change if options.value and autoBind:false", function() {
            var ddl = input.kendoDropDownList({
                autoBind: false,
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(false);
                },
                value: "bar"
            }).data("kendoDropDownList");

            ddl.wrapper.focus().blur();
        });

        it("DropDownList from empty SELECT with autoBind:false does not raise change event", function() {
            var select = $("<select/>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select, {
                autoBind: false,
                value: "bar",
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(false);
                }
            });

            dropdownlist.wrapper.focus().blur();
        });

        it("Dropdownlist with enabled filter triggers change on ENTER", function() {
            var dropdownlist = new DropDownList(input, {
                value: "foo",
                filter: "startswith",
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.equal(dropdownlist.value(), "bar");
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

        it("Dropdownlist with enabled filter triggers change on TAB", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                filter: "startswith",
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.equal(dropdownlist.value(), "bar");
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

        it("Dropdownlist with filtered source shouldn't trigger change on document mousedown", function(done) {
            var dropdownlist = new DropDownList(input, {
                delay: 0,
                value: "foo",
                filter: "startswith",
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(false);
                }
            });

            dropdownlist.open();
            dropdownlist.bind("dataBound", function() {
                dropdownlist.filterInput.focusout();
                done();
            });

            dropdownlist.filterInput.focus().val("b").keydown();
        });

        it("DropDownList triggers filtering event on data source filter", function(done) {
            var dropdownlist = input.kendoDropDownList({
                delay: 0,
                dataSource: ["foo", "bar"],
                filter: "contains",
                filtering: function(e) {

                    var filter = e.filter;

                    assert.equal(filter.field, "");
                    assert.equal(filter.operator, "contains");
                    assert.equal(filter.value, "baz");
                    done();
                }
            }).data("kendoDropDownList");

            dropdownlist.open();
            dropdownlist.filterInput.focus().val("baz").keydown();
        });

        it("modifying filter expression in filtering event changes datasource result", function(done) {
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
                var data = dropdownlist.dataSource.view();

                assert.equal(data.length, 1);
                assert.equal(data[0], "foo");
                done();
            });
        });

        it("DropDownList filtering event can be prevented", function(done) {
            var dropdownlist = input.kendoDropDownList({
                delay: 0,
                dataSource: ["foo", "bar"],
                filter: "contains",
                filtering: function(e) {
                    e.preventDefault();
                }
            }).data("kendoDropDownList");

            dropdownlist.dataSource.bind("change", function() {
                assert.isOk(false);
            });

            dropdownlist.open();
            dropdownlist.filterInput.focus().val("baz").keydown();

            setTimeout(function() {
                assert.isOk(true);
                done();
            });
        });

        it("DropDownList triggers filtering when filter is cleared", function(done) {
            var dropdownlist = input.kendoDropDownList({
                delay: 0,
                dataSource: ["foo", "bar"],
                filter: "contains"
            }).data("kendoDropDownList");

            dropdownlist.dataSource.one("change", function() {
                dropdownlist.bind("filtering", function(e) {
                    assert.equal(e.filter, undefined);
                    done();
                });

                dropdownlist.ul.children("li").first().click();
                dropdownlist.open();
            });

            dropdownlist.open();
            dropdownlist.filterInput.focus().val("bar").keydown();
        });

        it("DropDownList with option lable raises change event on first click", function() {
            var changeWasCalled = false, dropdownlist = new DropDownList(input, {
                optionLabel: "Select...",
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(true);
                }
            });

            dropdownlist.value("");

            dropdownlist.open();
            dropdownlist.ul.children(":first").click();
        });

        it("DropDownList shouldn't trigger select event on blur after filtration", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                optionLabel: "Select...",
                dataSource: ["foo", "bar"],
                select: function(e) {
                    assert.isOk(false);
                }
            });

            dropdownlist.wrapper.focus();
            dropdownlist.open();
            dropdownlist.search("bar");
            dropdownlist.element.focusout();
        });

        it("DropDownList does not select focused item on blur when select event is prevented", function() {
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

            assert.equal(dropdownlist.value(), "foo");
        });

        it("widget triggers select event when select item with loop search", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.ul.children()[1]);
                    assert.equal(e.dataItem, dropdownlist.dataSource.view()[1]);
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keypress",
                    keyCode: "f".charCodeAt(0)
                });
        });

        it("widget prevents selection on loop search preventing select event", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                select: function(e) {
                    e.preventDefault();
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keypress",
                    keyCode: "f".charCodeAt(0)
                });

            assert.equal(dropdownlist.value(), "foo");
        });

        it("widget passes optionLabel on select", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            dropdownlist.select(1);

            dropdownlist.one("select", function(e) {
                assert.isOk(e.item.hasClass("k-list-optionlabel"));
            });

            dropdownlist.wrapper.focus();
            dropdownlist.wrapper.trigger({
                type: "keydown",
                keyCode: kendo.keys.UP
            });
        });

        it("widget triggers cascade only once on value set", function() {
            var ddl = new DropDownList(input, {
                optionLabel: "Select",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: [
                    { CategoryID: 1, CategoryName: "Cat1" },
                    { CategoryID: 2, CategoryName: "Cat2" }
                ]
            });

            ddl.bind("cascade", function() {
                assert.isOk(true);
            });

            ddl.value(1);
        });

        it("change event is not raised when value is set through configuration", function() {
            var dropdownlist = new DropDownList(input, {
                value: 2,
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                change: function() {
                    assert.isOk(false);
                }
            });

            dropdownlist.wrapper.focus().blur();
        });

        it("change event is not raised when widget is not bound and value method is used", function() {
            var select = $("<select></select>").appendTo(Mocha.fixture);

            var dropdownlist = new DropDownList(select, {
                autoBind: false,
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                change: function() {
                    assert.isOk(false);
                }
            });

            dropdownlist.value(2);
            dropdownlist.wrapper.focus().blur();
        });

        it("change event is not raised when widget is empty", function() {
            var select = $("<select></select>").appendTo(Mocha.fixture);

            var dropdownlist = new DropDownList(select, {
                dataValueField: "id",
                dataTextField: "name"
            });

            dropdownlist.setDataSource([
                { id: 1, name: "name1" },
                { id: 2, name: "name2" },
                { id: 3, name: "name3" }
            ]);

            dropdownlist.bind("change", function() {
                assert.isOk(false);
            });

            dropdownlist.value("");

            dropdownlist.wrapper.focus().blur();
        });

        it("trigger set when setting value", function() {
            var value = "test";

            var dropdownlist = new DropDownList(input, {
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                set: function(e) {
                    assert.equal(e.value, value);
                }
            });

            dropdownlist.value(value);
        });

        it("cascading child triggers filtering event", function() {
            var parent = $("<input id='parent' />").appendTo(Mocha.fixture);
            var child = $("<input />").appendTo(Mocha.fixture);

            parent.kendoDropDownList({
                dataTextField: "parentID",
                dataValueField: "parentID",
                dataSource: [
                    { parentID: 1 },
                    { parentID: 2 }
                ],
                value: 1
            });

            child.kendoDropDownList({
                cascadeFrom: "parent", //id of the parent
                dataTextField: "childID",
                dataValueField: "id",
                optionLabel: "Select",
                dataSource: [
                    { parentID: 1, childID: "1", id: 1 },
                    { parentID: 1, childID: "3", id: 2 }
                ],
                filtering: function() {
                    assert.isOk(true);
                }
            });
        });

        it("widget triggers select event END keystroke", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.ul.children().last()[0]);
                    assert.equal(e.dataItem, dropdownlist.dataSource.view()[2]);
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keydown",
                    keyCode: kendo.keys.END
                });
        });

        it("widget triggers select event HOME keystroke", function() {
            var dropdownlist = new DropDownList(input, {
                index: 2,
                dataSource: ["foo", "foo1", "foo2"],
                select: function(e) {
                    assert.equal(e.item[0], dropdownlist.ul.children().first()[0]);
                    assert.equal(e.dataItem, dropdownlist.dataSource.view()[0]);
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keydown",
                    keyCode: kendo.keys.HOME
                });
        });

        it("widget prevents selection when select is prevented on END keystroke", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                select: function(e) {
                    e.preventDefault();
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keydown",
                    keyCode: kendo.keys.END
                });

            assert.equal(dropdownlist.value(), "foo");
        });

        it("widget triggers change event END keystroke", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                change: function(e) {
                    assert.equal(this.value(), "foo2");
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keydown",
                    keyCode: kendo.keys.END
                });
        });

        it("widget triggers change event HOME keystroke", function() {
            var dropdownlist = new DropDownList(input, {
                index: 2,
                dataSource: ["foo", "foo1", "foo2"],
                change: function(e) {
                    assert.equal(this.value(), "foo");
                }
            });

            dropdownlist.wrapper.focus()
                .trigger({
                    type: "keydown",
                    keyCode: kendo.keys.HOME
                });
        });

        it("widget doesn't triggers select on blur when nothing has changed", function() {
            var dropdownlist = new DropDownList(input, {
                index: 2,
                dataSource: ["foo", "foo1", "foo2"],
                select: function() {
                    assert.isOk(false);
                }
            });

            dropdownlist.wrapper.focusin().focusout();
        });

        it("widget shouldn't trigger select on blur", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "foo1", "foo2"],
                highlightFirst: true,
                select: function(e) {
                    assert.isOk(false);
                }
            });

            dropdownlist.value("");
            dropdownlist.wrapper.focusin();
            dropdownlist.open();
            dropdownlist.wrapper.focusout();
        });
    });
}());
