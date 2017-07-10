(function(){

var AutoComplete = kendo.ui.AutoComplete;
var input;

module("kendo.ui.AutoComplete filtering", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

asyncTest("typing minLenght number of characters filters the datasource", 2, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    autocomplete.dataSource.bind("change", function() {
        equal(this.view().length, 1);
        equal(this.view()[0], "foo");
        start();
    });

    input.val("f").press("f".charCodeAt(0));
});

asyncTest("popup is opened if there are results returned from the filter", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    autocomplete.dataSource.bind("change", function() {
        ok(autocomplete.ul.is(":visible"));
        start();
    });

    input.focus().val("f").press("f".charCodeAt(0));
});

asyncTest("popup should close if input is empty", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });
    autocomplete.popup.open();
    autocomplete.popup.bind("close", function(){
        ok(true);
        start();
    });
    input.val("").press(8/*backspace*/);
});

test("popup is opened if noDataTemplate is defined", 1, function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataTextField: "name",
        dataSource: [{ name: "foo" }, { name: "bar" }],
        noDataTemplate: "no data"
    });

    autocomplete.search("fake");

    ok(autocomplete.popup.visible());
});

test("search method supports case sensitive filtering", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["FOO", "foo", "bar"],
        ignoreCase: false
    });

    autocomplete.search("f");
    equal(autocomplete.dataSource.view()[0], "foo");
});

test("search method lowers case of the filter value when ignoreCase true", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: {
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    equal(options.filter.filters[0].value, "f");
                }
            },
            serverFiltering: true
        },
        ignoreCase: true
    });

    autocomplete.search("F");
});

test("refresh suggests on every dataSource change", 2, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    });

    input.focus();

    input.val("t");
    autocomplete.search("t");
    input.val("3");
    autocomplete.search("3");

    equal(autocomplete.value(), "3text");
    equal(autocomplete.current(), null);
});

test("refresh does not suggest if input is not active", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    });

    autocomplete.dataSource.fetch();

    equal(autocomplete.value(), "");
});

asyncTest("AutoComplete does not open popup if not active element", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        delay: 0
    });

    input.focus();
    autocomplete._search();
    input.blur();

    setTimeout(function() {
        start();
        ok(!autocomplete.popup.visible());
    }, 100);
});

test("do not remove default filter expression", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
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

    ok(autocomplete.dataSource.filter());
    equal(autocomplete.dataSource.filter().filters.length, 1);
});

test("append autocomplete filter expression ot the default one", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
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

    autocomplete.search("foo1");

    ok(autocomplete.dataSource.filter());
    equal(autocomplete.dataSource.filter().filters.length, 2);
});

test("do not append autocomplete filter twice", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
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

    autocomplete.search("foo1");
    autocomplete.search("foo2");

    equal(autocomplete.dataSource.filter().filters.length, 2);
});

asyncTest("Prevent filtration after item is selected", 0, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        delay: 0
    });

    input.val("f");
    input.triggerHandler("focus");

    autocomplete.search();
    autocomplete.ul.find("li:first").click();

    autocomplete.dataSource.bind("change", function() {
        ok(false);
    });

    input.trigger("keydown");

    setTimeout(function() {
        start();
    }, 100);
});

asyncTest("remove input value clears filter even with minLength option", 2, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        equal(this.view().length, 2);
        equal(this.view()[0], "foo");
        start();
    });

    input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });
});

asyncTest("remove input value does not clear filter if minLength and enforceMinLength", 0, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2,
        enforceMinLength: true
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        ok(false, "list should not rebind");
    });

    input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });

    setTimeout(function() {
        start();
    }, 0);
});

asyncTest("clicking on clear button does not clear filter if minLength and enforceMinLength", 0, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2,
        enforceMinLength: true
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        ok(false, "list should not rebind");
    });

    autocomplete._clear.click();

    setTimeout(function() {
        start();
    }, 0);
});

test("select item after filtering", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ]
        },
        filter: "contains"
    });

    autocomplete.element.focus();
    input.focus();

    autocomplete.search("foo1");
    autocomplete.ul.children(":first").click();

    autocomplete.search("foo2");
    autocomplete.ul.children(":first").click();

    equal(autocomplete.value(), "foo2");
});

test("AutoComplete does not revert input value on search", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ]
        },
        filter: "contains"
    });

    autocomplete.search("foo1");
    autocomplete.ul.children(":first").click();

    autocomplete.element.val("fo");
    autocomplete.search("fo");

    equal(autocomplete.value(), "fo");
});

test("AutoComplete resets list value on refresh", function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ]
        },
        filter: "contains"
    });

    autocomplete.search("foo1");
    autocomplete.ul.children(":first").click();

    autocomplete.element.val("fo");
    autocomplete.search("fo");

    equal(autocomplete.listView.value().length, 0);
});

test("AutoComplete keeps value when shared source is modified", function() {
    var source = new kendo.data.DataSource({
        data: [
            {text: "foo", value: "1", parent: 1},
            {text: "foo1", value: "2", parent: 1},
            {text: "foo2", value: "3", parent: 1},
            {text: "foo3", value: "4", parent: 2},
            {text: "foo4", value: "5", parent: 2},
            {text: "foo5", value: "6", parent: 3},
        ]
    });

    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: source,
        filter: "contains"
    });

    autocomplete.value("foo1");

    source.filter({
        field: "text",
        operator: "eq",
        value: "foo3"
    });

    equal(autocomplete.value(), "foo1");
});

test("resize popup on search when autoWidth is enabled", function(assert) {
    var data = [{text: "Foooooooooooooo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
    var autocomplete = new AutoComplete(input, {
        autoWidth: true,
        separator: ", ",
        dataTextField: "ProductName",
        autoBind: false,
        minLenght: 3,
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

    var done1 = assert.async();
    var done2 = assert.async();
    autocomplete.one("open", function() {
        assert.ok(autocomplete.wrapper.width() < autocomplete.popup.element.width());
        autocomplete.close();
        done1();
        autocomplete.one("open", function() {
            assert.ok(autocomplete.wrapper.width() >= autocomplete.popup.element.width());
            done2();
        });
        autocomplete.search("Tof");
    });
    autocomplete.search("");

});

test("autoWidth adds one pixel to avoid browser pixel rounding", function(assert) {
    var autocomplete = new AutoComplete(input, {
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

    autocomplete.search("a");
    equal(autocomplete.popup.element.parent(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1);
    autocomplete.close();
    autocomplete.search("a");
    equal(autocomplete.popup.element.parent(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1);
});

asyncTest("update popup height when no items are found", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: $.map(new Array(30), function(_, idx) { return "item" + idx.toString() })
    });

    autocomplete.search("item");

    var oldHeight = autocomplete.list.height();

    autocomplete.one("dataBound", function() {
        start();
        ok(autocomplete.list.height() < oldHeight);
    });

    autocomplete.element.focus().val("test").keydown();
});

test("removes filtering expression if field matches the dataTextField", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "too", value: 3 }],
            filter: {
                logic: "or",
                filters: [
                    { field: "text", operator: "eq", value: "bar" },
                    { field: "text", operator: "eq", value: "foo" }
                ]
            }
        }
    });

    autocomplete.search("to");

    equal(autocomplete.dataSource.filter().filters.length, 1);
});

test("keeps custom filter expresssion", 5, function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "too", value: 3 }],
            filter: {
                logic: "or",
                filters: [
                    { field: "value", operator: "eq", value: 1 },
                    { field: "value", operator: "eq", value: 2 }
                ]
            }
        }
    });

    autocomplete.search("to");

    var filters = autocomplete.dataSource.filter();

    equal(filters.logic, "and");
    equal(filters.filters.length, 2);
    equal(filters.filters[0].field, "text");
    equal(filters.filters[1].logic, "or");
    equal(filters.filters[1].filters.length, 2);
});

test("concat filters with the same logic operator", 2, function() {
    var autocomplete = new AutoComplete(input, {
        dataTextField: "text",
        dataSource: {
            data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "too", value: 3 }],
            filter: {
                logic: "or",
                filters: [
                    { field: "value", operator: "eq", value: 1 },
                    { field: "value", operator: "eq", value: 2 }
                ]
            }
        }
    });

    autocomplete.search("to");
    autocomplete.search("too");

    var filters = autocomplete.dataSource.filter();

    equal(filters.filters[1].filters.length, 2);
    equal(!filters.filters[1].filters.filters, true);
});
}());
