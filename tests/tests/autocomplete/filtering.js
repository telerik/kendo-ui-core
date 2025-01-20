import '@progress/kendo-ui/src/kendo.autocomplete.js';

let AutoComplete = kendo.ui.AutoComplete,
    input;

describe("kendo.ui.AutoComplete filtering", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("typing minLength number of characters filters the datasource", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"]
        });

        autocomplete.dataSource.bind("change", function() {
            assert.equal(this.view().length, 1);
            assert.equal(this.view()[0], "foo");
        });

        input.val("f").press("f".charCodeAt(0));
    });

    it("popup is opened if there are results returned from the filter", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"]
        });

        autocomplete.dataSource.bind("change", function() {
            assert.isOk(autocomplete.ul.is(":visible"));
        });

        input.focus().val("f").press("f".charCodeAt(0));
        await vi.waitUntil(() => autocomplete.ul.is(":visible"));
    });

    it("popup should close if input is empty", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"]
        });
        autocomplete.popup.open();
        autocomplete.popup.bind("close", function() {
            assert.isOk(true);
        });
        input.val("").press(8/*backspace*/);
    });

    it("popup is opened if noDataTemplate is defined", function() {
        let autocomplete = new AutoComplete(input, {
            animation: false,
            dataTextField: "name",
            dataSource: [{ name: "foo" }, { name: "bar" }],
            noDataTemplate: () => "no data"
        });

        autocomplete.search("fake");

        assert.isOk(autocomplete.popup.visible());
    });

    it("search method supports case sensitive filtering", function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["FOO", "foo", "bar"],
            ignoreCase: false
        });

        autocomplete.search("f");
        assert.equal(autocomplete.dataSource.view()[0], "foo");
    });

    it("search method lowers case of the filter value when ignoreCase true", function() {
        let autocomplete = new AutoComplete(input, {
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
        let autocomplete = new AutoComplete(input, {
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
        let autocomplete = new AutoComplete(input, {
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
        let autocomplete = new AutoComplete(input, {
            dataSource: ["text", "Text", "3text"],
            filter: "startswith",
            highlightFirst: false,
            suggest: true,
            delay: 0
        });

        autocomplete.dataSource.fetch();

        assert.equal(autocomplete.value(), "");
    });

    it("AutoComplete does not open popup if not active element", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["baz", "bar"],
            suggest: true,
            delay: 0
        });

        input.focus();
        autocomplete._search();
        input.blur();

        await vi.waitUntil(() => !autocomplete.popup.visible());
    });

    it("do not remove default filter expression", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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

    it("Prevent filtration after item is selected", async function() {
        let autocomplete = new AutoComplete(input, {
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
    });

    it("remove input value clears filter even with minLength option", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"],
            minLength: 2
        });

        input.val("ba").press("a".charCodeAt(0));

        autocomplete.dataSource.bind("change", function() {
            assert.equal(this.view().length, 2);
            assert.equal(this.view()[0], "foo");
        });

        input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });
    });

    it("remove input value does not clear filter if minLength and enforceMinLength", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"],
            minLength: 2,
            enforceMinLength: true
        });

        input.val("ba").press("a".charCodeAt(0));

        autocomplete.dataSource.bind("change", function() {
            assert.isOk(false, "list should not rebind");
        });

        input.val("").trigger({ type: "keydown", keyCode: kendo.keys.BACKSPACE });
    });

    it("clicking on clear button does not clear filter if minLength and enforceMinLength", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"],
            minLength: 2,
            enforceMinLength: true
        });

        input.val("ba").press("a".charCodeAt(0));

        autocomplete.dataSource.bind("change", function() {
            assert.isOk(false, "list should not rebind");
        });

        autocomplete._clear.click();
    });

    it("select item after filtering", function() {
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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
        let autocomplete = new AutoComplete(input, {
            dataTextField: "text",
            dataSource: {
                data: [
                    { text: "foo", value: "1", parent: 1 },
                    { text: "foo1", value: "2", parent: 1 },
                    { text: "foo2", value: "3", parent: 1 },
                    { text: "foo3", value: "4", parent: 2 },
                    { text: "foo4", value: "5", parent: 2 },
                    { text: "foo5", value: "6", parent: 3 },
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
        let source = new kendo.data.DataSource({
            data: [
                { text: "foo", value: "1", parent: 1 },
                { text: "foo1", value: "2", parent: 1 },
                { text: "foo2", value: "3", parent: 1 },
                { text: "foo3", value: "4", parent: 2 },
                { text: "foo4", value: "5", parent: 2 },
                { text: "foo5", value: "6", parent: 3 },
            ]
        });

        let autocomplete = new AutoComplete(input, {
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

    it("resize popup on search when autoWidth is enabled", async function() {
        let data = [{ text: "Foooooooooooooo", value: 1, type: "a" }, { text: "Bar", value: 2, type: "b" }, { text: "Baz", value: 3, type: "a" }];

        input.css("width", 200);

        let autocomplete = new AutoComplete(input, {
            autoWidth: true,
            separator: ", ",
            dataTextField: "ProductName",
            autoBind: false,
            minLength: 3,
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
            });
            autocomplete.search("Tof");
        });
        autocomplete.search("");

    });

    it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
        let autocomplete = new AutoComplete(input, {
            autoWidth: true,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                },
            },
            dataSource: {
                data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text", "Short item"]

            }
        });

        autocomplete.search("a");
        assert.closeTo(autocomplete.popup.element.closest(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1, 1);
        autocomplete.close();
        autocomplete.search("a");
        assert.closeTo(autocomplete.popup.element.closest(".k-animation-container").width(), autocomplete.popup.element.outerWidth(true) + 1, 1);
    });

    it("enabled autoWidth disables X scrolling", function() {
        let autocomplete = new AutoComplete(input, {
            autoWidth: true,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                },
            },
            dataSource: {
                data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text", "Short item"]

            }
        });

        autocomplete.search("a");
        assert.equal(autocomplete.listView.content.css("overflow"), "hidden auto");
    });

    it("update popup height when no items are found", async function() {
        let autocomplete = new AutoComplete(input, {
            dataSource: $.map(new Array(30), function(_, idx) { return "item" + idx.toString(); })
        });

        autocomplete.search("item");

        let oldHeight = autocomplete.list.height();

        autocomplete.one("dataBound", function() {
            assert.isOk(autocomplete.list.height() < oldHeight);
        });

        autocomplete.element.focus().val("test").keydown();
    });

    it("removes filtering expression if field matches the dataTextField", function() {
        let autocomplete = new AutoComplete(input, {
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

    it("keeps custom filter expression", function() {
        let autocomplete = new AutoComplete(input, {
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

        let filters = autocomplete.dataSource.filter();

        assert.equal(filters.logic, "and");
        assert.equal(filters.filters.length, 2);
        assert.equal(filters.filters[0].field, "text");
        assert.equal(filters.filters[1].logic, "or");
        assert.equal(filters.filters[1].filters.length, 2);
    });

    it("concat filters with the same logic operator", function() {
        let autocomplete = new AutoComplete(input, {
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

        let filters = autocomplete.dataSource.filter();

        assert.equal(filters.filters[1].filters.length, 2);
        assert.equal(!filters.filters[1].filters.filters, true);
    });

});
