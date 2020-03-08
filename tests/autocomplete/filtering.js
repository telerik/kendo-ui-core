(function(){

var AutoComplete = kendo.ui.AutoComplete;
var input;

describe("kendo.ui.AutoComplete filtering", function () {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

it("typing minLenght number of characters filters the datasource", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    autocomplete.dataSource.bind("change", function() {
        assert.equal(this.view().length, 1);
        assert.equal(this.view()[0], "foo");
        done();
    });

    input.val("f").press("f".charCodeAt(0));
});

it("popup is opened if there are results returned from the filter", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });

    autocomplete.dataSource.bind("change", function() {
        assert.isOk(autocomplete.ul.is(":visible"));
        done();
    });

    input.focus().val("f").press("f".charCodeAt(0));
});

it("popup should close if input is empty", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"]
    });
    autocomplete.popup.open();
    autocomplete.popup.bind("close", function(){
        assert.isOk(true);
        done();
    });
    input.val("").press(8/*backspace*/);
});

it("popup is opened if noDataTemplate is defined", function() {
    var autocomplete = new AutoComplete(input, {
        animation: false,
        dataTextField: "name",
        dataSource: [{ name: "foo" }, { name: "bar" }],
        noDataTemplate: "no data"
    });

    autocomplete.search("fake");

    assert.isOk(autocomplete.popup.visible());
});

it("search method supports case sensitive filtering", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["FOO", "foo", "bar"],
        ignoreCase: false
    });

    autocomplete.search("f");
    assert.equal(autocomplete.dataSource.view()[0], "foo");
});

it("search method lowers case of the filter value when ignoreCase true", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: {
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].value, "f");
                }
            },
            serverFiltering: true
        },
        ignoreCase: true
    });

    autocomplete.search("F");
});

it("search method lowers case with correct culture", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: {
            accentFoldingFiltering: "tr-TR",
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].value, "kı");
                }
            },
            serverFiltering: true
        },
        ignoreCase: true
    });

    autocomplete.search("KI");
});

it("refresh suggests on every dataSource change", function() {
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

    assert.equal(autocomplete.value(), "3text");
    assert.equal(autocomplete.current(), null);
});

it("refresh does not suggest if input is not active", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    });

    autocomplete.dataSource.fetch();

    assert.equal(autocomplete.value(), "");
});

it("AutoComplete does not open popup if not active element", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        delay: 0
    });

    input.focus();
    autocomplete._search();
    input.blur();

    setTimeout(function() {
        assert.isOk(!autocomplete.popup.visible());
        done();
    }, 100);
});

it("do not remove default filter expression", function() {
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

    assert.isOk(autocomplete.dataSource.filter());
    assert.equal(autocomplete.dataSource.filter().filters.length, 1);
});

it("append autocomplete filter expression ot the default one", function() {
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

    assert.isOk(autocomplete.dataSource.filter());
    assert.equal(autocomplete.dataSource.filter().filters.length, 2);
});

it("do not append autocomplete filter twice", function() {
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

    assert.equal(autocomplete.dataSource.filter().filters.length, 2);
});

it("Prevent filtration after item is selected", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        delay: 0
    });

    input.val("f");
    input.triggerHandler("focus");

    autocomplete.search();
    autocomplete.ul.find("li:first").click();

    autocomplete.dataSource.bind("change", function() {
        assert.isOk(false);
    });

    input.trigger("keydown");

    setTimeout(function() {
        done();
    }, 100);
});

it("remove input value clears filter even with minLength option", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        assert.equal(this.view().length, 2);
        assert.equal(this.view()[0], "foo");
        done();
    });

    input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });
});

it("remove input value does not clear filter if minLength and enforceMinLength", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2,
        enforceMinLength: true
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        assert.isOk(false, "list should not rebind");
    });

    input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });

    setTimeout(function() {
        done();
    }, 0);
});

it("clicking on clear button does not clear filter if minLength and enforceMinLength", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        minLenght: 2,
        enforceMinLength: true
    });

    input.val("ba").press("a".charCodeAt(0));

    autocomplete.dataSource.bind("change", function() {
        assert.isOk(false, "list should not rebind");
    });

    autocomplete._clear.click();

    setTimeout(function() {
        done();
    }, 0);
});

it("select item after filtering", function() {
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

    assert.equal(autocomplete.value(), "foo2");
});

it("AutoComplete does not revert input value on search", function() {
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

    assert.equal(autocomplete.value(), "fo");
});

it("AutoComplete resets list value on refresh", function() {
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

    assert.equal(autocomplete.listView.value().length, 0);
});

it("AutoComplete keeps value when shared source is modified", function() {
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

    assert.equal(autocomplete.value(), "foo1");
});

it("resize popup on search when autoWidth is enabled", function(done) {
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

    autocomplete.one("open", function() {
        assert.isOk(autocomplete.wrapper.width() < autocomplete.popup.element.width());
        autocomplete.close();

        autocomplete.one("open", function() {
            assert.isOk(autocomplete.wrapper.width() >= autocomplete.popup.element.width());
            done();
        });
        autocomplete.search("Tof");
    });
    autocomplete.search("");

});

it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
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
    assert.closeTo(autocomplete.popup.element.parent(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1, 0.1);
    autocomplete.close();
    autocomplete.search("a");
    assert.closeTo(autocomplete.popup.element.parent(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1, 0.1);
});

it("enabled autoWidth disables X scrolling", function() {
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
    assert.equal(autocomplete.listView.content.css("overflow"), "hidden auto")
});

it("update popup height when no items are found", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: $.map(new Array(30), function(_, idx) { return "item" + idx.toString() })
    });

    autocomplete.search("item");

    var oldHeight = autocomplete.list.height();

    autocomplete.one("dataBound", function() {
        assert.isOk(autocomplete.list.height() < oldHeight);
        done();
    });

    autocomplete.element.focus().val("test").keydown();
});

it("removes filtering expression if field matches the dataTextField", function() {
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

    assert.equal(autocomplete.dataSource.filter().filters.length, 1);
});

it("keeps custom filter expresssion", function() {
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

    assert.equal(filters.logic, "and");
    assert.equal(filters.filters.length, 2);
    assert.equal(filters.filters[0].field, "text");
    assert.equal(filters.filters[1].logic, "or");
    assert.equal(filters.filters[1].filters.length, 2);
});

it("concat filters with the same logic operator", function() {
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

    assert.equal(filters.filters[1].filters.length, 2);
    assert.equal(!filters.filters[1].filters.filters, true);
});
    });
}());
