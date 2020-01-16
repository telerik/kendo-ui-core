(function() {

var ComboBox = kendo.ui.ComboBox;
var data = [{text: "Foo", value: 1}, {text:"Bar", value:2}, {text:"Baz", value:3}];
var CLICK = kendo.support.touch ? "touchend" : "click";
var combobox;
var input;

describe("kendo.ui.ComboBox searching", function () {
    beforeEach(function() {


        $.fn.press = function(key) {
            return this.trigger({ type: "keypress", keyCode: key } );
        };

        $.fn.pressKeyDown = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };

        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {


        combobox.destroy();
        kendo.destroy(Mocha.fixture);
    });

function create(options) {
    combobox = input.kendoComboBox($.extend({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }, options)).data("kendoComboBox");
}

it("search focus first match", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: true,
        index: 0
    });

    combobox.text("b");
    combobox.search("b");

    assert.isOk(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

it("open popup on search and any items", function() {
    create();
    combobox.text("b");
    combobox.search("b");

    assert.isOk(combobox.popup.visible());
});

it("open popup with all items if empty input", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("");

    combobox._state = "accept";
    combobox.open();
    assert.equal(combobox.ul.find("li").length, data.length);
});

it("open() does not rebind popup if server filtering", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: data,
            serverFiltering: true
        },
        filter: "startswith"
    });

    stub(combobox, "_selectItem");
    combobox._state = "accept"; //simulate selected item after filtering
    combobox.open();

    assert.equal(combobox.calls("_selectItem"), 0);
});

it("search focus item if text number", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:10, value:2}]
    });

    combobox.text("1");
    combobox.search("1");

    assert.isOk(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

it("search focus item if text is 0", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
    });

    combobox.text("0");
    combobox.search("0");

    assert.isOk(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

it("focused item does not update text input value", function() {
    create();
    combobox.text("f");
    combobox.search("f");

    assert.equal(combobox.text(), "f");
});

it("current item is not cleared on search with filter none", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
    });

    combobox.select(1);
    combobox.search("f");

    assert.isOk(combobox.current()[0]);
});

it("search should raise error if word is null", function() {
    create();
    combobox.text("");
    combobox.search("");

    assert.isOk(true);
});

it("search with no filter should open popup if any match", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false
    });

    combobox.popup.bind("open", function() {
        assert.isOk(true);
    });

    combobox.text("f");
    combobox.search("f");
});

it("search with no filter should not open if no match", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false
    });

    combobox.popup.bind("open", function() {
        assert.isOk(false);
    });

    combobox.text("fooooo");
    combobox.search("fooooo");
});

it("search with no filter indicates that the filtering is started", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [],
        autoBind: false
    });

    combobox.search("fooooo");
    assert.equal(combobox._state, "filter");
});

it("ComboBox announces end of filtration on item selection", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ["foo"],
        autoBind: false
    });

    input.focus();
    combobox.search("f");
    combobox.select(0);

    assert.equal(combobox._state, "accept");
});

it("ComboBox announces end of filtration custom value", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ["foo"],
        autoBind: false
    });

    input.focus();
    combobox.search("f");
    combobox.value("custom");

    assert.equal(combobox._state, "accept");
});

it("search with startswith rebind items", function() {
    create({
        filter: "startswith"
    });
    combobox.text("f");
    combobox.search("f");

    assert.equal(combobox.ul.children().length, 1);
});

it("search with empty input and enforceMinLength: true does not rebind items", function() {
    create({
        filter: "startswith",
        minLength: 2,
        enforceMinLength: true
    });
    combobox.text("fo");
    combobox.search("fo");

    assert.equal(combobox.ul.children().length, 1);

    combobox.text("");
    combobox.search("");

    assert.equal(combobox.ul.children().length, 1);
});

it("does not rebind items when enforceMinLength: true and _clear is clicked", function() {
    create({
        filter: "startswith",
        minLength: 2,
        enforceMinLength: true
    });
    combobox.text("fo");
    combobox.search("fo");

    assert.equal(combobox.ul.children().length, 1);

    combobox._clear.click();

    assert.equal(combobox.ul.children().length, 1);
});

it("search with filter opens drop down if any items", function() {
    create({
        filter: "startswith"
    });

    combobox.popup.bind("open", function() {
        assert.isOk(true);
    });

    combobox.text("f");
    combobox.search("f");
});

it("rebound list should use correct dataItem to update text and value", function() {
    create({
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("b");
    combobox.select(combobox.ul.children().eq(1));

    assert.equal(combobox.ul.children().length, 2);
    assert.equal(combobox.value(), data[2].value);
    assert.equal(combobox.text(), data[2].text);
});

it("reopen ul after filter should show all data", function() {
    create({
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("b");

    combobox.ul.children().eq(1).click();
    combobox.open();

    assert.equal(combobox.ul.children().length, data.length);
});

it("rebound ul should has item selected", function() {
    create({
        filter: "startswith"
    });

    combobox.open();
    combobox.text("b");
    combobox.search("b");
    combobox.ul.children().eq(1).trigger(CLICK);

    combobox.open();

    assert.isOk(combobox.current().hasClass("k-state-selected"));
});

it("typing should trigger search", function(done) {
    create({
        filter: "startswith",
        filtering: function() {
            assert.isOk(true);
            done();
        }
    });

    combobox.input.val("f").trigger({type: "keydown", keyCode: "f".charCodeAt(0)});
});

it("dataSource.read triggered by typing does not update input value with dataItem.text", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        filter: "startswith",
        dataSource: data,
        autoBind: false
    });

    combobox.value("1");
    combobox.input.val("f");
    combobox.search("f");

    assert.equal(combobox.input.val(), "f");
});

it("should not trigger search on TAB", function() {
    create();

    stub(combobox, {
        search: combobox.search
    });

    combobox.input.val("f").pressKeyDown(kendo.keys.TAB);

    assert.equal(combobox.calls("search"), 0);
});

it("should not trigger search on ESC", function() {
    create();

    stub(combobox, {
        search: combobox.search
    });

    combobox.input.val("f").pressKeyDown(kendo.keys.ESC);

    assert.equal(combobox.calls("search"), 0);
});

it("allow custom value", function() {
    create();

    combobox.input.val("ffff").blur();

    assert.equal(combobox.value(), "ffff");
});

it("allow custom text when sync is disabled", function() {
    create({
        syncValueAndText: false
    });

    combobox.input.val("ffff").blur();

    assert.equal(combobox.value(), "");
    assert.equal(combobox.text(), "ffff");
});

it("do not search if text does not changed", function(done) {
    create({
        delay: 0
    });

    stub(combobox, {
        search: combobox.search
    });

    combobox._prev = "test";
    combobox.input.val("test");
    combobox.input.pressKeyDown(kendo.keys.HOME);

    setTimeout(function() {
        assert.equal(combobox.calls("search"), 0);
        done();
    });
});

it("highlight first item on refresh", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: false,
        filter: "startswith"
    });

    combobox.input.val("f");
    combobox.search("f");

    assert.isOk(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("refresh method highlights first item if options.highlightFirst is true", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true,
        filter: "startswith",
        highlightFirst: false
    });

    combobox.input.val("f");
    combobox.search("f");

    assert.equal(combobox.ul.children().filter(".k-state-focused").length, 0);
});

it("no filter and highlightFirst should always focus first item", function() {
    create();
    combobox.search("");

    assert.isOk(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("no filter and highlightFirst=false should not focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false
    });

    combobox.search("");

    assert.isOk(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("failed filter should not focus first item", function() {
    create({
        highlightFirst: false
    });
    combobox.open();
    combobox.current(combobox.ul.children("li").eq(1));

    combobox.input.val("Ice");
    combobox.search("Ice");

    assert.isOk(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("startswith filter and highlightFirst should always focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith"
    });

    combobox.search("");

    assert.isOk(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("startswith filter and highlightFirst=false should not focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false,
        filter: "startswith"
    });

    combobox.search("");

    assert.isOk(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

it("search method uses ignoreCase option", function() {
    combobox = new ComboBox(input, {
        dataSource: ["TEXT", "text"],
        ignoreCase: false,
        filter: "startswith"
    });

    combobox.search("T");

    assert.equal(combobox.ul.children().length, 1);
    assert.equal(combobox.ul.children().eq(0).text(), "TEXT");
});

it("search method lowers case of the filter value when ignoreCase true", function() {
    combobox = new ComboBox(input, {
        autoBind: false,
        dataSource: {
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].value, "f");
                }
            },
            serverFiltering: true
        },
        filter: "startswith",
        ignoreCase: true
    });

    combobox.search("F");
});

it("search method lowers case of the filter value when ignoreCase true and correct culture set", function() {
    combobox = new ComboBox(input, {
        autoBind: false,
        dataSource: {
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].value, "kı");
                }
            },
            serverFiltering: true,
            accentFoldingFiltering: "tr-TR"
        },
        filter: "startswith",
        ignoreCase: true
    });

    combobox.search("KI");
});

it("do not remove default filter expression", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    assert.isOk(combobox.dataSource.filter());
    assert.equal(combobox.dataSource.filter().filters.length, 1);
});

it("append combobox filter expression ot the default one", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");

    assert.isOk(combobox.dataSource.filter());
    assert.equal(combobox.dataSource.filter().filters.length, 2);
});

it("do not append combobox filter twice", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");
    combobox.search("foo2");

    assert.equal(combobox.dataSource.filter().filters.length, 2);
});

//TODO: Fails when all tests are run. Needs to refactor
/*it("remove only combobox filter expression on rebind", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");
    combobox.input.focus().blur();

    combobox.bind("dataBound", function() {
        assert.equal(combobox.dataSource.filter().filters.length, 1);
        assert.equal(combobox.dataSource.filter().filters[0].field, "parent");

        done();
    });

    combobox.open();
});*/

it("refresh suggests on every dataSource change", function() {
    combobox = input.kendoComboBox({
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.input.val("t");
    combobox.search("t");
    combobox.input.val("3");
    combobox.search("3");

    assert.equal(combobox.text(), "3text");
    assert.equal(combobox.current(), null);
});

it("ComboBox ignores case when filter is disabled", function() {
    combobox = input.kendoComboBox({
        dataSource: ["Text", "text", "3text"],
        ignoreCase: true, //default
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("t");
    combobox.search("t");

    assert.equal(combobox.current().index(), 0);
});

it("ComboBox honors casing when filter is disabled", function() {
    combobox = input.kendoComboBox({
        dataSource: ["Text", "text", "3text"],
        ignoreCase: false,
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("t");
    combobox.search("t");

    assert.equal(combobox.current().index(), 1);
});

it("ComboBox sets value of the select element on rebind", function() {
    kendo.destroy(Mocha.fixture);

    var select = $("<select><option value=1>Item1</option><option value=2>2Item</option></select>").appendTo(Mocha.fixture);

    combobox = select.kendoComboBox({
        filter: "contains",
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("2");
    combobox.search("2");

    //select first item after search
    combobox.ul.children().first().click();

    combobox.open();

    assert.equal(combobox.current().index(), 1);
});

it("ComboBox _clearValue removes _customOption without filtering", function() {
    kendo.destroy(Mocha.fixture);

    var select = $("<select><option value=1>Item1</option><option value=2>2Item</option></select>").appendTo(Mocha.fixture);

    combobox = select.kendoComboBox({
        value:2
    }).data("kendoComboBox");

    combobox._customOption = {text: "sometext"};
    combobox._clearValue()

    assert.isOk(!combobox._customOption);
});

it("ComboBox _clearValue removes _customOption with filtering", function() {
    kendo.destroy(Mocha.fixture);

    var select = $("<select><option value=1>Item1</option><option value=2>2Item</option></select>").appendTo(Mocha.fixture);

    combobox = select.kendoComboBox({
        filter: "contains",
        value:2
    }).data("kendoComboBox");

    combobox._customOption = {text: "sometext"};
    combobox._clearValue()

    assert.isOk(!combobox._customOption);
});

it("ComboBox does not throw exception when try to search empty DS", function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    combobox.search("12");

    assert.isOk(true);
});

it("ComboBox does not open popup if not active element", function(done) {
    combobox = input.kendoComboBox({
        delay: 0,
        autoBind: false,
        dataSource: ["bar", "baz"],
        filter: "startswith",
        dataBound: function() {
            assert.isOk(!combobox.popup.visible());
            done();
        }
    }).data("kendoComboBox");

    combobox.input.val("b").pressKeyDown(60);
});

it("ComboBox opens popup on search", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        open: function() {
            assert.isOk(true);
            done();
        }
    });

    //simulate search
    combobox.input.focus();
    combobox.input.val("b").pressKeyDown(60);
});

it("ComboBox rebinds if after search value method is called", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains"
    });

    combobox.search("Foo");
    combobox.value("");
    combobox.close();

    combobox.open();

    assert.equal(combobox.ul.children().length, 3);
});

it("ComboBox does not trigger search on SHIFT", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        autoBind: false,
        delay: 0,
        value: "1",
        text: "Foo",
        dataBound: function() {
            assert.isOk(false);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        done();
    }, 100);
});

it("ComboBox does not trigger filtering when value is set with API", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
    });

    combobox.value("1");
    combobox.one("dataBound", function() {
        assert.isOk(false);
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        done();
    }, 100);
});

it("ComboBox does not trigger filtering when set custom value", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0
    });

    combobox.value("custom");
    combobox.one("dataBound", function() {
        assert.isOk(false);
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        done();
    }, 100);
});

it("ComboBox does not fall in continuous loop after filtering", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [{
                text: "item1",
                value: 1
            }],
            filter: {
                field: "value",
                operator: "eq",
                value: 2
            }
        },
        delay: 0
    });

    combobox.dataSource.bind("change", function() {
        assert.isOk(true);
    });

    combobox.search("unknown");
});

it("ComboBox does not rebind on open if still in filter mode", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0
    });

    combobox.search("unknown");
    combobox.input.val("unknown");
    combobox.open();

    assert.equal(combobox.ul.children().length, 0);
});

it("ComboBox keeps the user input on inital bind", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false,
        delay: 0
    });

    combobox.input.val("unknown");
    combobox.search();

    assert.equal(combobox.input.val(), "unknown");
});

it("text method should set custom value to already added custom option", function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
        change: function() {
            assert.equal(this.value(), values.shift());
        }
    });

    var input = combobox.input;

    input.focus().val("unknown");
    combobox.search();
    input.blur();

    input.focus().val("unknown2");
    combobox.search();
    input.blur();
});

it("text method should set custom text to already added custom option keeping value empty", function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
        change: function() {
            assert.equal(this.text(), values.shift());
            assert.equal(this.value(), "");
        },
        syncValueAndText: false
    });

    var input = combobox.input;

    input.focus().val("unknown");
    combobox.search();
    input.blur();

    input.focus().val("unknown2");
    combobox.search();
    input.blur();
});

it("keep selected value when filtered from outside", function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        change: function() {
            assert.equal(this.value(), values.shift());
        },
        value: 2
    });

    combobox.dataSource.filter({
        field: "text",
        operator: "eq",
        value: "none"
    });


    assert.equal(combobox.value(), 2);
    assert.equal(combobox.text(), "Bar");
});

it("clear selected value if search is started (filter: none)", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "none",
        value: 2
    });

    combobox.bind("open", function() {
        assert.equal(combobox.value(), 2);
        done();
    });

    combobox.input.focus().val("Ba").trigger({ type: "keydown" });
});

it("search on paste", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith",
        value: 2
    });

    combobox.bind("open", function() {
        assert.equal(combobox.listView.dataSource.view().length, 1);
        done();
    });

    combobox.input.focus().val("F").trigger({ type: "paste" });
});

it("resize popup on search when autoWidth is enabled", function(done) {
    var data = [{text: "Foooooooooooooo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
    var combobox = new ComboBox(input, {
        autoWidth: true,
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        minLenght: 3,
        filter: "contains",
        dataSource: {
            serverFiltering: false,
            transport: {
                read: function(options) {
                    options.success([
                        { ProductName: "ChaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiChaiiiiiiiiiiiiiiiiiiiiiiiiiiiii", ProductID: 1 },
                        { ProductName: "Tofu", ProductID: 2 },
                        { ProductName: "Test3", ProductID: 3 },
                        { ProductName: "Chai3", ProductID: 4 },
                        { ProductName: "Test4", ProductID: 5 }
                    ]);
                }
            }
        }
    });

    combobox.one("open", function() {
        assert.isOk(combobox.wrapper.width() < combobox.popup.element.width());
        combobox.close();
        combobox.one("open", function() {
            assert.isOk(combobox.wrapper.width() >= combobox.popup.element.width());
            done();
        });
        combobox.search("Tof");
    });
    combobox.search("Cha");

});

it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
    var combobox = new ComboBox(input, {
        autoWidth: true,
        animation:{
            open: {
                duration:0
            },
            close: {
                duration:0
            },
        },
        dataSource: {
            data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text","Short item"]

        }
    });

    combobox.open();
    assert.closeTo(combobox.popup.element.parent(".k-animation-container").width(), combobox.popup.element.outerWidth(true) + 1, 0.1);
    combobox.close();
    combobox.open();
    assert.closeTo(combobox.popup.element.parent(".k-animation-container").width(), combobox.popup.element.outerWidth(true) + 1, 0.1);
});

it("enabled autoWidth disables X scrolling", function() {
    var combobox = new ComboBox(input, {
        autoWidth: true,
        animation:{
            open: {
                duration:0
            },
            close: {
                duration:0
            },
        },
        dataSource: {
            data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text","Short item"]

        }
    });

    combobox.open();
    assert.equal(combobox.listView.content.css("overflow"), "hidden auto")
});

it("enabled autoWidth sets overflowX to scroll when scrolling is needed", function() {
    var combobox = new ComboBox(input, {
        autoWidth: true,
        animation:{
            open: {
                duration:0
            },
            close: {
                duration:0
            },
        },
        dataSource: {
            data: [
                "Short item",
                "An item with really, really, really, really, really, really, really, really, really, long text",
                "Short item",
                "Short item",
                "Short item",
                "Short item",
                "Short item"
            ]
        }
    });

    combobox.open();
    assert.equal(combobox.listView.content.css("overflow"), "hidden scroll")
});

it("keep popup opened on empty search result if noDataTemplate", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}]
    });

    combobox.search("Foo");

    assert.isOk(combobox.popup.visible());

    combobox.search("None");

    assert.isOk(combobox.popup.visible());
});

it("close popup opened on empty search result", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}],
        noDataTemplate: ""
    });

    combobox.search("Foo");
    assert.isOk(combobox.popup.visible());

    combobox.search("None");
    assert.isOk(!combobox.popup.visible());
});

it("update popup height when no items are found", function(done) {
    var combobox = new ComboBox(input, {
        dataSource: $.map(new Array(30), function(_, idx) { return "item" + idx.toString() }),
        filter: "contains"
    });

    combobox.open();

    var oldHeight = combobox.list.height();

    combobox.one("dataBound", function() {
        assert.isOk(combobox.list.height() < oldHeight);
        done();
    });

    combobox.input.focus().val("test").keydown();
});

it("scrolls to the matched item on open", function() {
    var data = [];
    for (var i = 0; i < 50; i++) { data.push(i); }

    var combobox = new ComboBox(input, {
        dataSource: data
    });

    combobox.search("49");

    assert.isOk(combobox.ul.children().eq(49).hasClass("k-state-focused"), "item is not focused");
    assert.isOk(combobox.list.children(".k-list-scroller").scrollTop() > 200, "list is not scrolled");
});

it("concat filters with the same logic operator", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "too", value: 10 }],
            filter: {
                logic: "or",
                filters: [
                    { field: "value", operator: "eq", value: 1 },
                    { field: "value", operator: "eq", value: 2 }
                ]
            }
        },
        filter: "contains"
    });

    combobox.search("to");
    combobox.search("too");

    var filters = combobox.dataSource.filter();

    assert.equal(filters.filters[1].filters.length, 2);
    assert.equal(!filters.filters[1].filters.filters, true);
});

it("filterFields option should search by multiple columns", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        filterFields: ["text", "value"],
        dataSource: data,
        filter: "startswith"
    });

    combobox.search("Foo");

    assert.equal(combobox.ul.find("li").length, 1);

    combobox.search("1");

    assert.equal(combobox.ul.find("li").length, 1);
});

it("clear selection on empty search", function(done) {
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        change: function() {
            assert.equal(this.value(), "");
            done()
        },
        value: 2
    });

    combobox.input.val("").trigger({type: "keydown", keyCode: kendo.keys.BACKSPACE});
});

    });
}());
