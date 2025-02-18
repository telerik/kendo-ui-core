import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let DropDownList = kendo.ui.DropDownList,
    CLICK = kendo.support.touch ? "touchend" : "click",
    input, select;

describe("kendo.ui.DropDownList events", function() {
    beforeEach(function() {

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };
        input = $("<input />").appendTo(Mocha.fixture);
        select = $("<select></select>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        Mocha.fixture.find(":input").each(function() {
            let widget = $(this).data("kendoDropDownList");

            if (widget) {
                widget.destroy();
            }
        });

        input.add($("ul")).parent(".k-dropdownlist").remove();
        select.remove();

    });

    it("_blur calls _change", function() {
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist._change = function() {
            changeWasCalled = true;
        };

        dropdownlist._blur();

        assert.isOk(changeWasCalled);
    });

    asyncTest("_blur calls popup close", function(done) {
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.dataSource.read();
        dropdownlist.popup.open();

        dropdownlist.popup.bind("close", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist._blur();
    });

    it("change event is not raised on load when value is selected by index", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            change: function() {
                assert.isOk(false);
            }
        });
    });

    it("change event is not raised on load when option.value is defined", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            value: "foo",
            change: function() {
                assert.isOk(false);
            }
        });
    });

    asyncTest("change event is raised once when value is 0 and widget is blurred", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Black", value: 0 },
                { text: "Orange", value: 1 },
                { text: "Grey", value: 2 }
            ],
            index: 1,
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        dropdownlist.open();
        dropdownlist.ul.find("li:first").click();

        dropdownlist._change();
        dropdownlist._change();
    });

    it("_change raises the change event if value has changed", function() {
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
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
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
            value: ""
        });
        let counter = 0;
        dropdownlist.setDataSource(["foo", "bar"]);
        dropdownlist.setOptions({
            change: function() {
                counter++;
            }
        });

        dropdownlist.open();
        dropdownlist.ul.find("li:last").click();
        assert.equal(counter, 1);
    });

    asyncTest("_change raises change event if selectedIndex has changed", function(done) {
        let dropdownlist = new DropDownList(select, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.selectedIndex = 1;
        dropdownlist.wrapper.focus().focusout();
    });

    it("change event is triggered after dataSource sort", function() {
        let counter = 0;
        let dropdownlist = new DropDownList(select, {
            dataSource: ["Apples", "Oranges", "Bananas"],
            change: function() {
                counter++;
            }
        });

        dropdownlist.value("Oranges");
        dropdownlist._old = "";
        dropdownlist._change();

        dropdownlist.value("Bananas");
        dropdownlist._old = "Oranges";
        dropdownlist._change();

        dropdownlist.dataSource.sort({ dir: "asc" });

        dropdownlist.open();
        dropdownlist.ul.find("li:last").click();

        assert.equal(counter, 3);
    });

    it("support setting a value in change event handler", function() {
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            assert.isOk(false);
        });

        dropdownlist.wrapper.focus();
        dropdownlist.select($("<li>foo</li>"));
    });

    asyncTest("clicking an item raises the change event", function(done) {
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.wrapper.focus();

        dropdownlist.ul.children().eq(1).trigger(CLICK);
    });

    asyncTest("change should be raised on enter", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.open();
        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
        dropdownlist.wrapper.press(kendo.keys.ENTER);
    });

    asyncTest("change should be raised on tab", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.open();
        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
        dropdownlist.wrapper.press(kendo.keys.TAB);
    });

    asyncTest("clicking an item raises the change event of HTML select", function(done) {
        let select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);
        let dropdownlist = new DropDownList(select, {
            dataSource: ["foo", "bar"]
        });

        select.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.wrapper.focus();
        dropdownlist.ul.children().eq(1).trigger(CLICK);
    });

    asyncTest("change should be raised on down arrow and closed popup", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("change", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
    });

    asyncTest("open event when click arrow", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function() {
                done(() => assert.isOk(true));
            }
        });

        input.data("kendoDropDownList").wrapper.trigger(CLICK);
    });

    asyncTest("open event should be cancellable", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function(e) {
                e.preventDefault();
            }
        });

        let dropdownlist = input.data("kendoDropDownList");

        dropdownlist.wrapper.trigger(CLICK);

        setTimeout(function() {
            done(() => assert.isOk(!dropdownlist.popup.visible()));
        }, 200);
    });

    asyncTest("open event when ALT + down arrow", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            open: function() {
                done(() => assert.isOk(true));
            }
        });

        input.trigger({ type: "keydown", keyCode: kendo.keys.DOWN, altKey: true });
    });

    asyncTest("close event when click arrow", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        let dropdownlist = input.data("kendoDropDownList");
        dropdownlist.open();
        dropdownlist.wrapper.trigger(CLICK);
    });

    asyncTest("close event should be cancellable", function(done) {
        input.kendoDropDownList({
            dataSource: [{ text: "foo" }, { text: "bar" }],
            close: function(e) {
                e.preventDefault();
            }
        });

        let dropdownlist = input.data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.wrapper.trigger(CLICK);

        setTimeout(function() {
            done(() => assert.isOk(dropdownlist.popup.visible()));
        }, 200);
    });

    asyncTest("close event when ALT + up arrow", function(done) {
        input.kendoDropDownList({
            dataSource: [{ text: "foo" }, { text: "bar" }],
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        input.data("kendoDropDownList").open();

        input.trigger({ type: "keydown", keyCode: kendo.keys.UP, altKey: true });
    });

    asyncTest("close event when select item", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        let ddl = input.data("kendoDropDownList");
        ddl.open();

        ddl.ul.children().eq(0).trigger(CLICK);
    });

    it("click item raises select event", function() {
        let dropdownlist = input.kendoDropDownList({
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
        let dropdownlist = input.kendoDropDownList({
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

    it("prevent select event should only close the popup", async function() {
        let dropdownlist = input.kendoDropDownList({
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

        await vi.waitUntil(() => !dropdownlist.popup.visible());
    });

    it("selection with arrow triggers the select event", function() {
        let dropdownlist = input.kendoDropDownList({
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
        let dropdownlist = input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            select: function(e) {
                e.preventDefault();
            }
        }).data("kendoDropDownList");

        dropdownlist.wrapper.focus();
        dropdownlist.wrapper.press(kendo.keys.DOWN);

        let current = dropdownlist.current();

        assert.isOk(current.hasClass("k-focus"));
        assert.isOk(current.hasClass("k-selected"));
        assert.equal(current.text(), "foo");
    });

    it("shouldn't trigger select when value has not changed (TAB)", function() {
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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

    asyncTest("DropDownList triggers cascade on initial load", function(done) {
        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            cascade: function() {
                done(() => assert.isOk(true));
            }
        });
    });

    asyncTest("DropDownList triggers cascade when item is selected", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        dropdownlist.bind("cascade", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.open();
        dropdownlist.ul.children(":last").click();
    });

    asyncTest("DropDownList trigger cascade set value using value method (autoBind: false)", function(done) {
        input.val("foo");

        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            autoBind: false,
            cascade: function() {
                done(() => assert.isOk(true));
            }
        });

        input.data("kendoDropDownList").value("foo");
    });


    asyncTest("DropDownList triggers cascade when item is selected via keyboard", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"],
            cascade: function() {
                done(() => assert.isOk(true));
            }
        });
        dropdownlist.open();
        dropdownlist.wrapper.press(kendo.keys.DOWN);
        dropdownlist.wrapper.press(kendo.keys.UP);
    });

    asyncTest("DropDownList trigger change on search if popup is closed", function(done) {
        let cascade;

        input.kendoDropDownList({
            dataSource: ["foo", "bar"],
            value: "foo",
            cascade: function() {
                cascade = true;
            },
            change: function() {
                done(() => {
                    assert.isOk(cascade);
                    assert.isOk(true);
                });
            }
        });

        input.data("kendoDropDownList").wrapper.trigger({
            type: "keypress",
            charCode: "b".charCodeAt(0)
        });
    });

    asyncTest("DropDownList trigger change on loop", function(done) {
        let cascade;

        let dropdownlist = new DropDownList(input, {
            dataSource: ["too", "too1"],
            value: "too",
            cascade: function() {
                cascade = true;
            },
            change: function(e) {
                if (e.sender.value() === "too") {
                    done(() => {
                        assert.isOk(cascade);
                        assert.isOk(true);
                    });
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
        let ddl = input.kendoDropDownList({
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
        let select = $("<select/>").appendTo(Mocha.fixture);
        let dropdownlist = new DropDownList(select, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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

    asyncTest("Dropdownlist with filtered source shouldn't trigger change on document mousedown", function(done) {
        let count = 0;
        let dropdownlist = new DropDownList(input, {
            delay: 0,
            value: "foo",
            filter: "startswith",
            dataSource: ["foo", "bar"],
            change: function() {
                count++;
            }
        });

        dropdownlist.open();
        dropdownlist.bind("dataBound", function() {
            dropdownlist.filterInput.focusout();
            done(() => assert.equal(count, 0));
        });

        dropdownlist.filterInput.focus().val("b").keydown();
    });

    asyncTest("DropDownList triggers filtering event on data source filter", function(done) {
        let dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {

                let filter = e.filter;

                done(() => {
                    assert.equal(filter.field, "");
                    assert.equal(filter.operator, "contains");
                    assert.equal(filter.value, "baz");
                });
            }
        }).data("kendoDropDownList");

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("baz").keydown();
    });

    asyncTest("modifying filter expression in filtering event changes datasource result", function(done) {
        let dropdownlist = input.kendoDropDownList({
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
            let data = dropdownlist.dataSource.view();

            done(() => {
                assert.equal(data.length, 1);
                assert.equal(data[0], "foo");
            });
        });
    });

    asyncTest("DropDownList filtering event can be prevented", function(done) {
        let count = 0;
        let dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.preventDefault();
            }
        }).data("kendoDropDownList");

        dropdownlist.dataSource.bind("change", function() {
            count++;
        });

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("baz").keydown();

        setTimeout(function() {
            done(() => assert.equal(count, 0));
        });
    });

    asyncTest("DropDownList triggers filtering when filter is cleared", function(done) {
        let dropdownlist = input.kendoDropDownList({
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains"
        }).data("kendoDropDownList");

        dropdownlist.dataSource.one("change", async function() {
            dropdownlist.bind("filtering", function(e) {
                done(() => assert.equal(e.filter, undefined));
            });

            dropdownlist.ul.children("li").first().click();
            await vi.waitUntil(() => !dropdownlist.popup.visible());
            dropdownlist.open();
        });

        dropdownlist.open();
        dropdownlist.filterInput.focus().val("bar").keydown();
    });

    asyncTest("DropDownList with option lable raises change event on first click", function(done) {
        let changeWasCalled = false, dropdownlist = new DropDownList(input, {
            optionLabel: "Select...",
            dataSource: ["foo", "bar"],
            change: function() {
                done(() => assert.isOk(true));
            }
        });

        dropdownlist.value("");

        dropdownlist.open();
        dropdownlist.ul.children(":first").click();
    });

    it("DropDownList shouldn't trigger select event on blur after filtration", function() {
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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

    asyncTest("widget triggers cascade only once on value set", function(done) {
        let ddl = new DropDownList(input, {
            optionLabel: "Select",
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: [
                { CategoryID: 1, CategoryName: "Cat1" },
                { CategoryID: 2, CategoryName: "Cat2" }
            ]
        });

        ddl.bind("cascade", function() {
            done(() => assert.isOk(true));
        });

        ddl.value(1);
    });

    it("change event is not raised when value is set through configuration", function() {
        let dropdownlist = new DropDownList(input, {
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
        let select = $("<select></select>").appendTo(Mocha.fixture);

        let dropdownlist = new DropDownList(select, {
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
        let select = $("<select></select>").appendTo(Mocha.fixture);

        let dropdownlist = new DropDownList(select, {
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
        let value = "test";

        let dropdownlist = new DropDownList(input, {
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

    asyncTest("cascading child triggers filtering event", function(done) {
        let parent = $("<input id='parent' />").appendTo(Mocha.fixture);
        let child = $("<input />").appendTo(Mocha.fixture);

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
                done(() => assert.isOk(true));
            }
        });
    });

    it("widget triggers select event END keystroke", function() {
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
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
        let dropdownlist = new DropDownList(input, {
            index: 2,
            dataSource: ["foo", "foo1", "foo2"],
            select: function() {
                assert.isOk(false);
            }
        });

        dropdownlist.wrapper.focusin().focusout();
    });

    it("widget shouldn't trigger select on blur", function() {
        let dropdownlist = new DropDownList(input, {
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

    asyncTest("element click focuses the wrapper", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "foo1", "foo2"]
        });

        dropdownlist.wrapper.on("focus", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.element.click();
    });
});
