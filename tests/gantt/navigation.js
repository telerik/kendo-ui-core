(function() {

    var Gantt = kendo.ui.Gantt;
    var keys = kendo.keys;
    var gantt;
    var columns;
    var element;
    var data = [
       {
           id: 1,
           parentId: null,
           orderId: 0,
           title: "foo",
           start: new Date("2014/03/31"),
           end: new Date("2014/04/05"),
           summary: true,
           expanded: true
       },
       {
           id: 2,
           parentId: null,
           orderId: 1,
           title: "bar",
           start: new Date("2014/04/02"),
           end: new Date("2014/04/03"),
           summary: false
       },
       {
           id: 3,
           parentId: 1,
           orderId: 0,
           title: "foo.bar",
           start: new Date("2014/03/31"),
           end: new Date("2014/04/02"),
           summary: false
       },
       {
           id: 4,
           parentId: 1,
           orderId: 1,
           title: "foo.foo",
           start: new Date("2014/04/02"),
           end: new Date("2014/04/05"),
           summary: false
       }
    ];

    function focusTable(table) {

        if (table) {
            table.focus();
        } else {
            gantt.list.content.find("table").trigger("focus");
        }
    }

    function keyDown(element, args) {
        var isPlainObject = $.isPlainObject(args);
        var eventInfo = {
            type: "keydown",
            ctrlKey: false,
            altKey: false
        };

        isPlainObject ? $.extend(eventInfo, args) : eventInfo.keyCode = args;

        element.trigger(eventInfo);
    }

    module("Gantt navigatable", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);

            columns = [
                { field: "title", title: "Title", editable: true, sortable: true },
                { field: "start", title: "Start Time", sortable: true },
                { field: "end", title: "End Time", sortable: true }
            ];

            gantt = new Gantt(element, {
                columns: columns,
                navigatable: true,
                dataSource: {
                    data: data
                }
            });
        },
        teardown: function() {
            gantt = null;
            kendo.destroy(element);
            element.remove();
        }
    });

    test("focus content table focus first cell", function() {
        var content = gantt.list.content;

        focusTable();

        ok(content.find("td:first").hasClass("k-state-focused"));
    });

    test("focus content table set current element", function() {
        var content = gantt.list.content;

        focusTable();

        equal(gantt.current.get(0), content.find("td:first").get(0));
    });

    test("focus content table set current element id attribute", function() {
        var content = gantt.list.content;

        focusTable();

        ok(content.find("td:first").attr("id"));
        ok(content.find("td:first").attr("id"), "gantt_active_cell");
    });

    test("focus content table set aria-descendant", function() {
        var contentTable = gantt.list.content.find("table");

        focusTable();

        ok(contentTable.attr("aria-activedescendant"));
        equal(contentTable.attr("aria-activedescendant"), "gantt_active_cell");
    });

    test("right key move to next cell", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.RIGHT);

        equal(gantt.current.get(0), content.find("td:eq(1)").get(0));
        ok(content.find("td:eq(1)").hasClass("k-state-focused"));
    });

    test("right key does not move to next cell when current is last", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.RIGHT);
        keyDown(content.find("table"), keys.RIGHT);
        keyDown(content.find("table"), keys.RIGHT);

        equal(gantt.current.get(0), content.find("td:eq(2)").get(0));
        ok(content.find("td:eq(2)").hasClass("k-state-focused"));
    });

    test("left key move to prev cell", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.RIGHT);
        keyDown(content.find("table"), keys.LEFT);

        equal(gantt.current.get(0), content.find("td:first").get(0));
        ok(content.find("td:first").hasClass("k-state-focused"));
    });

    test("left key does not move to prev cell when current is first", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.LEFT);

        equal(gantt.current.get(0), content.find("td:first").get(0));
        ok(content.find("td:first").hasClass("k-state-focused"));
    });

    test("down key move to next row same cell", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.DOWN);

        equal(gantt.current.get(0), content.find("tr:eq(1) > td:first").get(0));
        ok(content.find("tr:eq(1) > td:first").hasClass("k-state-focused"));
    });

    test("down key does not move to next row when current is last", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.DOWN);
        keyDown(content.find("table"), keys.DOWN);
        keyDown(content.find("table"), keys.DOWN);
        keyDown(content.find("table"), keys.DOWN);

        equal(gantt.current.get(0), content.find("tr:last > td:first").get(0));
        ok(content.find("tr:last > td:first").hasClass("k-state-focused"));
    });

    test("up key move to prev row same cell", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.DOWN);
        keyDown(content.find("table"), keys.UP);

        equal(gantt.current.get(0), content.find("tr:eq(0) > td:first").get(0));
        ok(content.find("tr:eq(0) > td:first").hasClass("k-state-focused"));
    });

    test("up key move to header table row", function() {
        var content = gantt.list.content;
        var header = gantt.list.header;

        focusTable();
        keyDown(content.find("table"), keys.UP);

        equal(gantt.current.get(0), header.find("th:first").get(0));
        ok(header.find("th:first").hasClass("k-state-focused"));
    });

    test("ctrl left collapse row", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), {
            keyCode: keys.LEFT,
            ctrlKey: true
        });

        equal(content.find("tr").length, 2);
    });

    test("numpad minus key collapse row", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.NUMPAD_MINUS);

        equal(content.find("tr").length, 2);
    });

    test("ctrl right expand row", function() {
        var content = gantt.list.content;

        focusTable();
        gantt.dataSource.at(0).expanded = false;

        keyDown(content.find("table"), {
            keyCode: keys.RIGHT,
            ctrlKey: true
        });

        equal(content.find("tr").length, 4);
    });

    test("numpad plus key expand row", function() {
        var content = gantt.list.content;

        focusTable();
        gantt.dataSource.at(0).expanded = false;
        keyDown(content.find("table"), keys.NUMPAD_PLUS);

        equal(content.find("tr").length, 4);
    });

    test("space select row", function() {
        var content = gantt.list.content;

        focusTable();
        keyDown(content.find("table"), keys.SPACEBAR);

        equal(gantt.select().get(0), content.find("tr:first").get(0));
    });

    test("space does not select row when in header", function() {
        var content = gantt.list.content;
        var header = gantt.list.header;

        focusTable();
        keyDown(content.find("table"), keys.UP);
        keyDown(header.find("table"), keys.SPACEBAR);

        equal(gantt.select().length, 0);
    });

    test("enter trigger edit", function() {
        var content = gantt.list.content;

        focusTable();
        stub(gantt.list, "_startEditHandler");
        keyDown(content.find("table"), keys.ENTER);

        ok(gantt.list.calls("_startEditHandler"));
    });

    test("enter trigger sort on header", 1, function() {
        var content = gantt.list.content;
        var header = gantt.list.header;

        focusTable();
        keyDown(content.find("table"), keys.UP);

        header.find("th:first > a.k-link").on("click", function() {
            ok(true);
        });

        keyDown(header.find("table"), keys.ENTER);
    });

    test("delete remove selected task", 1, function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        stub(gantt, "removeTask");
        keyDown(content.find("table"), keys.DELETE);

        ok(gantt.calls("removeTask"));
    });

    test("delete does not call removeTask when no selection", function() {
        var content = gantt.list.content;

        focusTable();
        stub(gantt, "removeTask");
        keyDown(content.find("table"), keys.DELETE);

        ok(!gantt.calls("removeTask"));
    });

    test("numerics keys change views", function() {
        var content = gantt.list.content;

        focusTable();

        keyDown(content.find("table"), 51);
        equal(gantt.view().title, "Week");

        keyDown(content.find("table"), 52);
        equal(gantt.view().title, "Month");

        keyDown(content.find("table"), 50);
        equal(gantt.view().title, "Day");
    });

    test("numeric key 1 triggers action button click", function() {
        var content = gantt.list.content;
        var actionButton = gantt.headerDropDown.element.find("li");

        focusTable();

        actionButton.on("click", function() {
            ok(true);
        });

        keyDown(content.find("table"), 49);
    });

    test("insert key triggers action button click", 1, function() {
        var content = gantt.list.content;
        var actionButton = gantt.headerDropDown.element.find("li");

        focusTable();

        actionButton.on("click", function() {
            ok(true);
        });

        keyDown(content.find("table"), keys.INSERT);
    });

    module("Action drop-down navigatable", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);

            columns = [
                { field: "title", title: "Title", editable: true, sortable: true },
                { field: "start", title: "Start Time", sortable: true },
                { field: "end", title: "End Time", sortable: true }
            ];

            gantt = new Gantt(element, {
                columns: columns,
                navigatable: true,
                dataSource: {
                    data: data
                }
            });
        },
        teardown: function() {
            gantt = null;
            kendo.destroy(element);
            element.remove();
        }
    });

    test("insert key set focus class to first item", 1, function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);

        ok(gantt.headerDropDown.list.find("li:first").hasClass("k-state-focused"));
    });

    test("insert key set id attr to first item", 2, function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);

        ok(gantt.headerDropDown.list.find("li:first").attr("id"));
        equal(gantt.headerDropDown.list.find("li:first").attr("id"), "action-option-focused");
    });

    test("insert key set aria-descendant to list element", 2, function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);

        ok(gantt.headerDropDown.list.find("ul").attr("aria-activedescendant"));
        equal(gantt.headerDropDown.list.find("ul").attr("aria-activedescendant"), "action-option-focused");
    });

    test("key down move to next action item", function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);
        keyDown(gantt.headerDropDown.list.find("ul"), keys.DOWN);

        ok(!gantt.headerDropDown.list.find("li:first").hasClass("k-state-focused"));
        ok(gantt.headerDropDown.list.find("li:eq(1)").hasClass("k-state-focused"));
    });

    test("key down change move id attr", function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);
        keyDown(gantt.headerDropDown.list.find("ul"), keys.DOWN);

        ok(!gantt.headerDropDown.list.find("li:first").attr("id"));
        ok(gantt.headerDropDown.list.find("li:eq(1)").attr("id"));
        equal(gantt.headerDropDown.list.find("li:eq(1)").attr("id"), "action-option-focused");
    });

    test("key down last item does not move to next item when current is last", function() {
        var content = gantt.list.content;

        focusTable();
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.INSERT);
        keyDown(gantt.headerDropDown.list.find("ul"), keys.DOWN);
        keyDown(gantt.headerDropDown.list.find("ul"), keys.DOWN);
        keyDown(gantt.headerDropDown.list.find("ul"), keys.DOWN);

        ok(gantt.headerDropDown.list.find("li:last").hasClass("k-state-focused"));
    });

    module("Gantt non navigatable", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);

            columns = [
                { field: "title", title: "Title", editable: true, sortable: true },
                { field: "start", title: "Start Time", sortable: true },
                { field: "end", title: "End Time", sortable: true }
            ];

            gantt = new Gantt(element, {
                columns: columns,
                navigatable: false,
                dataSource: {
                    data: data
                }
            });
        },
        teardown: function() {
            gantt = null;
            kendo.destroy(element);
            element.remove();
        }
    });

    test("focus content table does not focus first cell", function() {
        var content = gantt.list.content;

        focusTable();

        ok(!content.find("td:first").hasClass("k-state-focused"));
    });

    test("delete key delete selected task", function() {
        var content = gantt.list.content;

        focusTable();
        stub(gantt, "removeTask");
        gantt.select("tr:first");
        keyDown(content.find("table"), keys.DELETE);

        ok(gantt.calls("removeTask"));
    });
})();