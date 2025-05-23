import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let DropDownList = kendo.ui.DropDownList,
    data = [{ text: "Foo", value: 1 }, { text: "Bar", value: 2 }, { text: "Baz", value: 3 }],
    select,
    input;

describe("kendo.ui.DropDownList searching", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            if (typeof key === "string") {
                key = key.charCodeAt(0);
            }

            return this.trigger({ type: "keypress", keyCode: key });
        };
        input = $("<input />").appendTo(Mocha.fixture);
        select = $("<select />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (input.data('kendoDropDownList')) {
            input.data('kendoDropDownList').destroy();
            input.add($("ul")).parent(".k-dropdownlist").remove();
        }

        if (select.data('kendoDropDownList')) {
            select.data('kendoDropDownList').destroy();
            select.add($("ul")).parent(".k-dropdownlist").remove();
        }

        input.remove();
        select.remove();
    });

    it("search select first match", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });

        dropdownlist.search("b");

        assert.isOk(dropdownlist.ul.children().eq(1).hasClass("k-selected"));
    });

    it("search select item if text number", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ text: "Foo", value: 1 }, { text: 10, value: 2 }]
        });

        dropdownlist.search("1");

        assert.isOk(dropdownlist.ul.children().eq(1).hasClass("k-selected"));
    });

    it("search select item if text is 0", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{ text: "Foo", value: 1 }, { text: 0, value: 2 }]
        });

        dropdownlist.search("0");

        assert.isOk(dropdownlist.ul.children().eq(1).hasClass("k-selected"));
    });

    it("search should not raise error if word is null", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });

        dropdownlist.search();

        assert.isOk(true);
    });

    it("search method supports a case sensitive search", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["TEXT", "text", "3text"],
            ignoreCase: false
        });

        dropdownlist.search("t");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    it("search method supports a case insensitive search", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: {
                data: ["KIN", "KAŞ"],
                accentFoldingFiltering: "tr-TR"
            },
            ignoreCase: true
        });
        input.press("k");
        input.press("ı");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    it("selects next item if starts with same character", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"]
        });

        input.press("t");
        input.press("t");

        assert.equal(dropdownlist.selectedIndex, 2);
    });

    it("selects a specific item if typed matches", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3", "text4", "text5", "text6"]
        });

        input.press("t");
        input.press("e");
        input.press("x");
        input.press("t");
        input.press("4");

        assert.equal(dropdownlist.selectedIndex, 3);
    });

    it("selects a specific item after loop", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["tt1", "t", "ttt", "tt3", "tt", "tttt"]
        });

        input.press("t");
        input.press("t");
        input.press("1");

        assert.equal(dropdownlist.selectedIndex, 0);
    });

    it("stays on the same item if changed char but still in loop", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"]
        });

        input.press("t"); //selects text2
        input.press("t"); //selects text3
        input.press("e");
        input.press("x");
        input.press("t");
        input.press("2"); //resulting text is 'ttext2'

        assert.equal(dropdownlist.selectedIndex, 2);
    });

    it("select next item if starts with same character (option label)", function() {
        let dropdownlist = new DropDownList(input, {
            optionLabel: "select...",
            dataSource: ["text1", "text2"]
        });

        input.press("t");
        assert.equal(dropdownlist.value(), "text1");

        input.press("t");
        assert.equal(dropdownlist.value(), "text2");
    });

    it("keep selection if typed text is 0ame as current data item", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["test", "500.122", "500.123"]
        });

        dropdownlist.select(0);

        input.press("5");
        input.press("0");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    it("keep selection if typed text differs", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["500.122", "500.123"]
        });

        input.press("5");
        assert.equal(dropdownlist.selectedIndex, 1);

        input.press("0");
        input.press("0");
        input.press("0");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    it("1oop items on search trigger change event", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"],
        });

        dropdownlist.bind("change", function() {
            assert.isOk(true);
        });

        input.press("t"); //selects text2
        input.press("t"); //selects text3
    });

    it("looping through items honors ignoreCase option", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "Text2", "Text3"],
            ignoreCase: true
        });

        dropdownlist.select(1);

        input.press("t"); //selects Text3
        input.press("t"); //selects text1

        assert.equal(dropdownlist.selectedIndex, 0);
    });

    it("prevent default behavior of SPACEBAR", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "Text2", "Text3"],
            ignoreCase: true
        });

        dropdownlist.select(1);

        input.trigger({
            type: "keypress",
            charCode: " ".charCodeAt(0),
            preventDefault: function() {
                assert.isOk(true);
            }
        });
    });

    it("typing same letter does not move to next item", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["test", "Bill 1", "Bill 2", "Label"],
            ignoreCase: true
        });

        input.press("b");
        input.press("i");
        input.press("l");
        input.press("l");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    it("search supports space", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["Bill 1", "Bill 2", "Label"],
            ignoreCase: true
        });

        input.press("b");
        input.press("i");
        input.press("l");
        input.press("l");
        input.press(" ");
        input.press("2");

        assert.equal(dropdownlist.selectedIndex, 1);
    });

    asyncTest("get next item after delay elapsed", function(done) {
        let dropdownlist = new DropDownList(input, {
            dataSource: ["Bill 1", "Bill 2", "Label"],
            ignoreCase: true,
            index: 1,
            delay: 0
        });

        input.press("b");

        setTimeout(function() {
            input.press("b");
            done(() => assert.equal(dropdownlist.selectedIndex, 1));
        }, 100);
    });

    it("navigation does not raise exception when data is set through setDataSource", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value"
        });

        dropdownlist.setDataSource(data);

        input.press("b");

        assert.isOk(true);
    });

    it("search does not raise exception when widget is not bound", function() {
        let dropdownlist = new DropDownList(input, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Item1", value: "1" }
            ]
        });

        input.press("i");

        assert.isOk(true);
    });

    it("search empty widget does not raise exception", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });
        dropdownlist.selectedIndex = -1; //Kendo Editor requires such functionality

        input.press("i");

        assert.isOk(true);
    });

    it("searching for nonexisting item when last item is selected does not raise error", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: [
                { text: "Black", value: "1" },
                { text: "Orange", value: "2" },
                { text: "Grey", value: "3" }
            ],
            dataTextField: "text",
            dataValueField: "value",
            index: 2
        });

        input.press("z");
        input.press("z");

        assert.isOk(true);
    });

    it("searching always start from next item", function() {
        let dropdownlist = new DropDownList(input, {
            dataSource: [
                { text: "First", value: "1" },
                { text: "Small", value: "2" },
                { text: "Same", value: "3" },
                { text: "Same", value: "4" },
                { text: "Small", value: "5" }
            ],
            dataTextField: "text",
            dataValueField: "value",
            delay: 0,
            index: 0
        });

        input.press("s");
        input.press("m");

        dropdownlist._word = "";

        input.press("s");
        input.press("m");

        assert.equal(dropdownlist.selectedIndex, 4);
    });

    it("search honors optionLabel header", function() {
        let dropdownlist = new DropDownList(input, {
            optionLabel: "Select item...",
            dataSource: ["foo", "bar", "baz"],
        });

        dropdownlist.bind("change", function() {
            assert.equal(dropdownlist.value(), "bar");
        });

        input.press("b");
    });

    it("search honors optionLabel header", function() {
        let dropdownlist = new DropDownList(input, {
            delay: 0,
            optionLabel: "Select",
            dataSource: ["Animal", "Bat", "Cat"],
        });

        input.press("a");
        dropdownlist._word = "";

        input.press("c");
        dropdownlist._word = "";

        input.press("a");

        assert.equal(dropdownlist.value(), "Animal");
    });

    asyncTest("filter items on user input", function(done) {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.bind("dataBound", function() {

            let data = dropdownlist.dataSource.view();

            done(() => {
                assert.equal(data.length, 1);
                assert.equal(data[0].text, "Orange");
            });
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("widget does not update selected text on filter", function(done) {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.bind("dataBound", function() {

            done(() => {
                assert.equal(dropdownlist.value(), "3");
                assert.equal(dropdownlist.text(), "Grey");
            });
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("widget focuses first item after search", function(done) {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.bind("dataBound", function() {
            done(() => assert.equal(dropdownlist.ul[0].firstChild, dropdownlist.current()[0]));
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("keep open popup if no items can be found", function(done) {
        let count = 0;
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.bind("close", function() {
            count++;
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("not found").keydown();

        setTimeout(function() {
            done(() => assert.equal(count, 0));
        }, 100);
    });

    asyncTest("clear filter when clear input value", function(done) {
        let dropdownlist = new DropDownList(input, {
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
        dropdownlist._prev = "not found";
        dropdownlist.filterInput.val("not found").keydown();

        dropdownlist.bind("dataBound", function() {
            done(() => assert.equal(dropdownlist.dataSource.view().length, 3));
        });

        dropdownlist.filterInput.val("").keydown();
    });

    asyncTest("does not clear filter when clear input value and enforceMinLength: true", function(done) {
        let count = 0;
        let dropdownlist = new DropDownList(input, {
            filter: "startswith",
            minLength: 3,
            enforceMinLength: true,
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
        dropdownlist._prev = "or";
        dropdownlist.filterInput.val("or").keydown();

        dropdownlist.bind("dataBound", function() {
            count++;
        });

        dropdownlist.filterInput.val("").keydown();

        setTimeout(function() {
            done(() => assert.equal(count, 0, "list should not rebind"));
        }, 0);
    });

    asyncTest("persist selected value if no items (select)", function(done) {
        let dropdownlist = new DropDownList(select, {
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

        dropdownlist.bind("dataBound", function() {
            done(() => assert.equal(dropdownlist.value(), "3"));
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    asyncTest("update popup height when no items are found", function(done) {
        let dropdownlist = new DropDownList(select, {
            noDataTemplate: () => "",
            filter: "startswith",
            delay: 0,
            dataSource: [
                { text: "Black", value: "1" },
                { text: "Orange", value: "2" },
                { text: "Grey", value: "3" }
            ],
            dataTextField: "text",
            dataValueField: "value"
        });

        dropdownlist.open();

        let height = dropdownlist.ul.height();

        dropdownlist.bind("dataBound", function() {
            done(() => assert.isOk(dropdownlist.ul.height() < height));
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    asyncTest("update popup height when no items are found and noDataTemplate is defined", function(done) {
        let dropdownlist = new DropDownList(select, {
            noDataTemplate: () => "No data found.",
            filter: "startswith",
            delay: 0,
            dataSource: [
                { text: "Black", value: "1" },
                { text: "Orange", value: "2" },
                { text: "Grey", value: "3" }
            ],
            dataTextField: "text",
            dataValueField: "value"
        });

        dropdownlist.open();

        let height = dropdownlist.ul.height();

        dropdownlist.one("dataBound", function() {
            done(() => assert.isOk(!dropdownlist.ul.height()));
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    it("search select first match of grouped list", function() {
        let data = [{ text: "Foo", value: 1, type: "a" }, { text: "Bar", value: 2, type: "b" }, { text: "Baz", value: 3, type: "a" }];
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: data,
                group: { field: "type" }
            }
        });

        dropdownlist.wrapper.focus().press("b");
        dropdownlist.wrapper.focus().press("b");

        assert.isOk(dropdownlist.ul.children().eq(2).text(), "Bar");
        assert.isOk(dropdownlist.ul.children().eq(2).hasClass("k-selected"));
    });

    asyncTest("filter on paste", function(done) {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.one("filtering", function() {
            done(() => assert.isOk(true));
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("Gre").focus().trigger({ type: "paste" });
    });


    asyncTest("resize popup on search when autoWidth is enabled", function(done) {
        kendo.effects.enable();
        let data = [{ text: "Foooooooooooooo", value: 1, type: "a" }, { text: "Bar", value: 2, type: "b" }, { text: "Baz", value: 3, type: "a" }];

        input.css("width", 200);

        let dropdownlist = new DropDownList(input, {
            autoWidth: true,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            autoBind: false,
            filter: "contains",
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

        dropdownlist.popup.one("open", function() {
            assert.isOk(dropdownlist.wrapper.width() <= dropdownlist.popup.element.width());
            dropdownlist.close();

            dropdownlist.popup.one("activate", function() {
                done(() => assert.isOk(dropdownlist.wrapper.width() <= dropdownlist.popup.element.width()));
            });
            dropdownlist.dataSource.filter({ field: "ProductName", oeprator: "contains", value: "To" });
            dropdownlist.open();
        });
        dropdownlist.open();
        kendo.effects.disable();
    });

    it("autoWidth adds one pixel to avoid browser pixel rounding", function() {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.open();
        assert.closeTo(dropdownlist.popup.element.closest(".k-animation-container").outerWidth(), dropdownlist.popup.element.outerWidth(true) + 1, 1);
        dropdownlist.close();
        dropdownlist.open();
        assert.closeTo(dropdownlist.popup.element.closest(".k-animation-container").outerWidth(), dropdownlist.popup.element.outerWidth(true) + 1, 1);
    });

    it("enabled autoWidth disables X scrolling", function() {
        let dropdownlist = new DropDownList(input, {
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

        dropdownlist.open();
        assert.equal(dropdownlist.listView.content.css("overflow"), "hidden auto");
    });

    it("removes filtering expression if field matches the dataTextField", function() {
        let dropdownlist = new DropDownList(input, {
            filter: "startswith",
            dataTextField: "text",
            dataValueField: "value",
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

        dropdownlist.search("to");

        assert.equal(dropdownlist.dataSource.filter().filters.length, 1);
    });

    it("keeps custom filter expresssion", function() {
        let dropdownlist = new DropDownList(input, {
            filter: "startswith",
            dataTextField: "text",
            dataValueField: "value",
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

        dropdownlist.search("to");

        let filters = dropdownlist.dataSource.filter();

        assert.equal(filters.logic, "and");
        assert.equal(filters.filters.length, 2);
        assert.equal(filters.filters[0].field, "text");
        assert.equal(filters.filters[1].logic, "or");
        assert.equal(filters.filters[1].filters.length, 2);
    });

    it("concat filters with the same logic operator", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            dataSource: {
                data: [{ text: "start_foo_end", value: 1 }, { text: "boo", value: 2 }, { text: "start_too_end", value: 10 }],
                filter: {
                    logic: "or",
                    filters: [
                        { field: "value", operator: "eq", value: 1 },
                        { field: "value", operator: "eq", value: 2 }
                    ]
                }
            }
        });

        dropdownlist.search("to");
        dropdownlist.search("too");

        let filters = dropdownlist.dataSource.filter();

        assert.equal(filters.filters[1].filters.length, 2);
        assert.equal(!filters.filters[1].filters.filters, true);
    });

    it("update dataSource when minLength is set", function() {
        let dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            serverFiltering: true,
            minLenght: 3,
            dataSource: {
                data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "baz", value: 3 }]
            }
        });

        dropdownlist.search("b");
        dropdownlist.select(1);
        dropdownlist.open();
        assert.equal(dropdownlist.ul.children().length, 3);

    });
});
