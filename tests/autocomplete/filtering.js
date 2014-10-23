(function(){

var AutoComplete = kendo.ui.AutoComplete;
var input;

module("kendo.ui.AutoComplete filtering", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }
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

    input.val("f").focus();
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

}());
