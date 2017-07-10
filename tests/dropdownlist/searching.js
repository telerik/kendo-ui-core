(function() {
    var DropDownList = kendo.ui.DropDownList,
        data = [{text: "Foo", value: 1}, {text:"Bar", value:2}, {text:"Baz", value:3}],
        select,
        input;

    module("kendo.ui.DropDownList searching", {
        setup: function() {
            $.fn.press = function(key) {
                if (typeof key === "string") {
                    key = key.charCodeAt(0);
                }

                return this.trigger({ type: "keypress", keyCode: key } );
            }
            input = $("<input />").appendTo(QUnit.fixture);
            select = $("<select />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (input.data('kendoDropDownList')) {
                input.data('kendoDropDownList').destroy();
                input.add($("ul")).parent(".k-widget").remove();
            }

            if (select.data('kendoDropDownList')) {
                select.data('kendoDropDownList').destroy();
                select.add($("ul")).parent(".k-widget").remove();
            }
        }
    });

    test("search select first match", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });

        dropdownlist.search("b");

        ok(dropdownlist.ul.children().eq(1).hasClass("k-state-selected"));
    });

    test("search select item if text number", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "Foo", value: 1}, {text:10, value:2}]
        });

        dropdownlist.search("1");

        ok(dropdownlist.ul.children().eq(1).hasClass("k-state-selected"));
    });

    test("search select item if text is 0", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
        });

        dropdownlist.search("0");

        ok(dropdownlist.ul.children().eq(1).hasClass("k-state-selected"));
    });

    test("search should not raise error if word is null", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });

        dropdownlist.search();

        ok(true);
    });

    test("search method supports a case sensitive search", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["TEXT", "text", "3text"],
            ignoreCase: false
        });

        dropdownlist.search("t");

        equal(dropdownlist.selectedIndex, 1);
    });

    test("selects next item if starts with same character", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"]
        });

        input.press("t");
        input.press("t");

        equal(dropdownlist.selectedIndex, 2);
    });

    test("selects a specific item if typed matches", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3", "text4", "text5", "text6"]
        });

        input.press("t");
        input.press("e");
        input.press("x");
        input.press("t");
        input.press("4");

        equal(dropdownlist.selectedIndex, 3);
    });

    test("selects a specific item after loop", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["tt1", "t", "ttt", "tt3", "tt", "tttt"]
        });

        input.press("t");
        input.press("t");
        input.press("1");

        equal(dropdownlist.selectedIndex, 0);
    });

    test("stays on the same item if changed char but still in loop", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"]
        });

        input.press("t"); //selects text2
        input.press("t"); //selects text3
        input.press("e");
        input.press("x");
        input.press("t");
        input.press("2"); //resulting text is 'ttext2'

        equal(dropdownlist.selectedIndex, 2);
    });

    test("select next item if starts with same character (option label)", 2, function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "select...",
            dataSource: ["text1", "text2"]
        });

        input.press("t");
        equal(dropdownlist.value(), "text1");

        input.press("t");
        equal(dropdownlist.value(), "text2");
    });

    test("keep selection if typed text is 0ame as current data item", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["test", "500.122", "500.123"]
        });

        dropdownlist.select(0);

        input.press("5");
        input.press("0");

        equal(dropdownlist.selectedIndex, 1);
    });

    test("keep selection if typed text differs", 2, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["500.122", "500.123"]
        });

        input.press("5");
        equal(dropdownlist.selectedIndex, 1);

        input.press("0");
        input.press("0");
        input.press("0");

        equal(dropdownlist.selectedIndex, 1);
    });

    test("1oop items on search trigger change event", 2, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"],
        });

        dropdownlist.bind("change", function() {
            ok(true);
        });

        input.press("t"); //selects text2
        input.press("t"); //selects text3
    });

    test("looping through items honors ignoreCase option", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "Text2", "Text3"],
            ignoreCase: true
        });

        dropdownlist.select(1);

        input.press("t"); //selects Text3
        input.press("t"); //selects text1

        equal(dropdownlist.selectedIndex, 0);
    });

    test("prevent default behavior of SPACEBAR", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "Text2", "Text3"],
            ignoreCase: true
        });

        dropdownlist.select(1);

        input.trigger({
            type: "keypress",
            charCode: " ".charCodeAt(0),
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("typing same letter does not move to next item", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["test", "Bill 1", "Bill 2", "Label"],
            ignoreCase: true
        });

        input.press("b");
        input.press("i");
        input.press("l");
        input.press("l");

        equal(dropdownlist.selectedIndex, 1);
    });

    test("search supports space", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["Bill 1", "Bill 2", "Label"],
            ignoreCase: true
        });

        input.press("b");
        input.press("i");
        input.press("l");
        input.press("l");
        input.press(" ");
        input.press("2");

        equal(dropdownlist.selectedIndex, 1);
    });

    asyncTest("get next item after delay elapsed", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["Bill 1", "Bill 2", "Label"],
            ignoreCase: true,
            index: 1,
            delay: 0
        });

        input.press("b");

        setTimeout(function() {
            start();
            input.press("b");
            equal(dropdownlist.selectedIndex, 1);
        }, 100);
    });

    test("navigation does not raise exception when data is set through setDataSource", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value"
        });

        dropdownlist.setDataSource(data);

        input.press("b");

        ok(true);
    });

    test("search does not raise exception when widget is not bound", function() {
        var dropdownlist = new DropDownList(input, {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Item1", value: "1" }
            ]
        });

        input.press("i");

        ok(true);
    });

    test("search empty widget does not raise exception", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        });
        dropdownlist.selectedIndex = -1; //Kendo Editor requires such functionality

        input.press("i");

        ok(true);
    });

    test("searching for nonexisting item when last item is selected does not raise error", 1, function() {
        var dropdownlist = new DropDownList(input, {
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

        ok(true);
    });

    test("searching always start from next item", 1, function() {
        var dropdownlist = new DropDownList(input, {
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

        equal(dropdownlist.selectedIndex, 4);
    });

    test("search honors optionLabel header", 1, function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select item...",
            dataSource: ["foo", "bar", "baz"],
        });

        dropdownlist.bind("change", function() {
            equal(dropdownlist.value(), "bar");
        });

        input.press("b");
    });

    test("search honors optionLabel header", 1, function() {
        var dropdownlist = new DropDownList(input, {
            delay: 0,
            optionLabel: "Select",
            dataSource: ["Animal", "Bat", "Cat"],
        });

        input.press("a");
        dropdownlist._word = "";

        input.press("c");
        dropdownlist._word = "";

        input.press("a");

        equal(dropdownlist.value(), "Animal");
    });

    asyncTest("filter items on user input", 2, function() {
        var dropdownlist = new DropDownList(input, {
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
            start();

            var data = dropdownlist.dataSource.view();

            equal(data.length, 1);
            equal(data[0].text, "Orange");
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("widget does not update selected text on filter", 2, function() {
        var dropdownlist = new DropDownList(input, {
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
            start();

            equal(dropdownlist.value(), "3");
            equal(dropdownlist.text(), "Grey");
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("widget focuses first item after search", 1, function() {
        var dropdownlist = new DropDownList(input, {
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
            start();

            equal(dropdownlist.ul[0].firstChild, dropdownlist.current()[0]);
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("or").keydown();
    });

    asyncTest("keep open popup if no items can be found", 0, function() {
        var dropdownlist = new DropDownList(input, {
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
            ok(false);
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("not found").keydown();

        setTimeout(function() {
            start();
        }, 100);
    });

    asyncTest("clear filter when clear input value", 1, function() {
        var dropdownlist = new DropDownList(input, {
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
            start();
            equal(dropdownlist.dataSource.view().length, 3);
        });

        dropdownlist.filterInput.val("").keydown();
    });

    asyncTest("does not clear filter when clear input value and enforceMinLength: true", 0, function() {
        var dropdownlist = new DropDownList(input, {
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
            ok(false, "list should not rebind");
        });

        dropdownlist.filterInput.val("").keydown();

        setTimeout(function() {
            start();
        }, 0);
    });

    asyncTest("persist selected value if no items (select)", 1, function() {
        var dropdownlist = new DropDownList(select, {
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
            start();
            equal(dropdownlist.value(), "3");
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    asyncTest("update popup height when no items are found", 1, function() {
        var dropdownlist = new DropDownList(select, {
            noDataTemplate: "",
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

        var height = dropdownlist.ul.height();

        dropdownlist.bind("dataBound", function() {
            start();
            ok(dropdownlist.ul.height() < height);
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    asyncTest("update popup height when no items are found and noDataTemplate is defined", 1, function() {
        var dropdownlist = new DropDownList(select, {
            noDataTemplate: "No data found.",
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

        var height = dropdownlist.ul.height();

        dropdownlist.one("dataBound", function() {
            start();
            ok(!dropdownlist.ul.height());
        });

        dropdownlist.filterInput.focus().val("test").keydown();
    });

    test("search select first match of grouped list", function() {
        var data = [{text: "Foo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: data,
                group: { field: "type" }
            }
        });

        dropdownlist.wrapper.focus().press("b");
        dropdownlist.wrapper.focus().press("b");

        ok(dropdownlist.ul.children().eq(2).text(), "Bar");
        ok(dropdownlist.ul.children().eq(2).hasClass("k-state-selected"));
    });

    asyncTest("filter on paste", 1, function() {
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

        dropdownlist.one("filtering", function() {
            start();
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.filterInput.val("Gre").focus().trigger({type: "paste"});
    });


    test("resize popup on search when autoWidth is enabled", function(assert) {
        var data = [{text: "Foooooooooooooo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
        var dropdownlist = new DropDownList(input, {
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

        var done1 = assert.async();
        var done2 = assert.async();
        dropdownlist.popup.one("open", function() {
            assert.ok(dropdownlist.wrapper.width() < dropdownlist.popup.element.width());
            dropdownlist.close();
            done1();
            dropdownlist.popup.one("activate", function() {
                assert.ok(dropdownlist.wrapper.width() >= dropdownlist.popup.element.width());
                done2();
            });
            dropdownlist.dataSource.filter({field: "ProductName", oeprator: "contains", value: "To"});
            dropdownlist.open();
        });
        dropdownlist.open();

    });

test("autoWidth adds one pixel to avoid browser pixel rounding", function(assert) {
    var dropdownlist = new DropDownList(input, {
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

    dropdownlist.open();
    equal(dropdownlist.popup.element.parent(".k-animation-container").width(), dropdownlist.popup.element.outerWidth(true) + 1);
    dropdownlist.close();
    dropdownlist.open();
    equal(dropdownlist.popup.element.parent(".k-animation-container").width(), dropdownlist.popup.element.outerWidth(true) + 1);
});

    test("removes filtering expression if field matches the dataTextField", 1, function() {
        var dropdownlist = new DropDownList(input, {
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

        equal(dropdownlist.dataSource.filter().filters.length, 1);
    });

    test("keeps custom filter expresssion", 5, function() {
        var dropdownlist = new DropDownList(input, {
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

        var filters = dropdownlist.dataSource.filter();

        equal(filters.logic, "and");
        equal(filters.filters.length, 2);
        equal(filters.filters[0].field, "text");
        equal(filters.filters[1].logic, "or");
        equal(filters.filters[1].filters.length, 2);
    });

    test("concat filters with the same logic operator", 2, function() {
        var dropdownlist = new DropDownList(input, {
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

        var filters = dropdownlist.dataSource.filter();

        equal(filters.filters[1].filters.length, 2);
        equal(!filters.filters[1].filters.filters, true);
    });

    test("update dataSource when minLength is set", 1, function() {
        var dropdownlist = new DropDownList(input, {
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
        equal(dropdownlist.ul.children().length, 3);

    });
})();
