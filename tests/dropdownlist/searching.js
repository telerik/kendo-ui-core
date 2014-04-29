(function() {
    var DropDownList = kendo.ui.DropDownList,
        data = [{text: "Foo", value: 1}, {text:"Bar", value:2}, {text:"Baz", value:3}],
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
        },
        teardown: function() {
            input.data('kendoDropDownList').destroy();
            input.add($("ul")).parent(".k-widget").remove();
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

    test("select next item if starts with same character", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"]
        });

        input.press("t");
        input.press("t");

        equal(dropdownlist.selectedIndex, 1);
    });

    test("keep selection if typed text is same as current data item", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["500.122", "500.123"]
        });

        input.press("5");
        input.press("0");
        input.press("0");

        equal(dropdownlist.selectedIndex, 0);
    });

    test("keep selection if typed text differs", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["500.122", "500.123"]
        });

        input.press("5");
        input.press("0");
        input.press("0");
        input.press("0");

        equal(dropdownlist.selectedIndex, 0);
    });

    test("loop items on search trigger change event", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "text2", "text3"],
            change: function() {
                ok(true);
            }
        });

        input.press("t");
        input.press("t");
    });

    test("looping through items honors ignoreCase option", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["text1", "Text2", "Text3"],
            ignoreCase: true
        });

        dropdownlist.select(1);

        input.press("t");
        input.press("t");

        equal(dropdownlist.selectedIndex, 2);
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
            dataSource: ["Bill 1", "Bill 2", "Label"],
            ignoreCase: true
        });

        input.press("b");
        input.press("i");
        input.press("l");
        input.press("l");

        equal(dropdownlist.selectedIndex, 0);
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

    asyncTest("search supports space", 1, function() {
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
            equal(dropdownlist.selectedIndex, 0);
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
})();
