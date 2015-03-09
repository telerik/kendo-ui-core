(function() {
    var DataSource = kendo.data.DataSource,
        ul,
        dataSource;


    function setup(options) {
        options = $.extend({
            template: "<li></li>",
            navigatable: true,
            dataSource: dataSource = new DataSource({ data: [1,2,3,4,5] })
        }, options);
        return ul.kendoListView(options);
    }

    module("listview initialization", {
        setup: function() {
            kendo.ns = "kendo-";

            $.fn.press = function(key, ctrl, shift) {
                return this.trigger( { type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift } );
            };

            ul = $("<ul />").appendTo(QUnit.fixture);
            $("<div id=\"pager\"></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
            $("#pager").remove();
            ul.remove();
        }
    });

    test("kendoListView attaches listView to element", function() {
        var ul = setup();

        ok(ul.data("kendoListView") instanceof kendo.ui.ListView);
    });

    test("k-widget and k-listview classes are applied on element", function() {
        var ul = setup();

        ok(ul.hasClass("k-widget"));
        ok(ul.hasClass("k-listview"));
    });

    test("renders item for dataSource items", function() {
        var ul = setup();

        equal(ul.find("li").length, 5);
    });

    test("options as array is used for dataSource", function() {
        var div = $("<div></div>").appendTo(QUnit.fixture).kendoListView([1,2,3]),
        dataSource = div.data("kendoListView").dataSource.data();

        equal(dataSource.length, 3);
    });

    test("dataBound event should be raised when bound", function() {
        var called = false,
        ul = setup({
            dataBound: function() {
                called = true;
            }
        });
        ok(called);
    });

    test("cancelling databinding event prevents refresh", function() {
        var ul = setup({
            dataBinding: function(e) {
                e.preventDefault();
            }
        });

        equal(ul.find("li").length, 0);
    });

    test("DataSource change action is passed to databinding event", 3, function() {
        var listView = setup().data("kendoListView");

        listView.bind("dataBinding", function(e) {
            equal(e.action, "add");
            equal(e.items.length, 1);
            equal(e.index, 1);
        });

        listView.dataSource.insert(1, {});
    });

    test("autoBind false does not populate listView", function() {
        var ul = setup({autoBind: false});
        equal(ul.find("li").length, 0);
    });

    test("altTemplate defaults to template if is not set", function() {
        var listView = setup({ template: "<li>1</li>" }).data("kendoListView");

        equal(listView.template({}), "<li>1</li>");
        equal(listView.altTemplate({}), "<li>1</li>");
    });

    test("altTemplate defined", function() {
        var listView = setup({ template: "<li>1</li>", altTemplate: "<li>2</li>" }).data("kendoListView");

        equal(listView.template({}), "<li>1</li>");
        equal(listView.altTemplate({}), "<li>2</li>");
    });

    test("altTemplate is rendered", function() {
        var ul = setup({ template: "<li>1</li>", altTemplate: "<li>2</li>" });

        equal(ul.children().eq(0).html(), "1");
        equal(ul.children().eq(1).html(), "2");
    });

    test("progress mask is shown when request starts", function() {
        var ul = setup();

        dataSource.bind("progress", function() {
            equal(ul.find("div.k-loading-mask").length, 1);
        });
        dataSource.read();
    });

    test("progress mask is hidden when request finish", function() {
        var ul = setup();

        dataSource.read();

        equal(ul.find("div.k-loading-mask").length, 0);
    });

    test("selectable false does not instantiate Selectable object", function() {
        var ul = setup({ selectable: false });
        ok(!ul.data("kendoListView").selectable);
    });

    test("selectable true instantiate Selectable object", function() {
        var ul = setup({ selectable: true });
        ok(ul.data("kendoListView").selectable);
    });

    test("selectable true instantiate Selectable object", function() {
        var listView = setup({ selectable: true }).data("kendoListView");

        ok(listView.selectable);
        ok(!listView.selectable.options.multiple);
    });

    test("selectable multiple set multiple mode of the selectable", function() {
        var listView = setup({ selectable: "multiple" }).data("kendoListView");

        ok(listView.selectable.options.multiple);
    });

    test("setOptions changes the selectable configuration", function() {
        var listView = setup({ selectable: true }).data("kendoListView");

        listView.setOptions({ "selectable": "multiple" });

        ok(listView.selectable.options.multiple);
    });

    test("setOptions disables the selectable", function() {
        var listView = setup({ selectable: true }).data("kendoListView");

        listView.setOptions({ selectable: false });

        ok(!listView.selectable);
    });

    test("focusing grid element focus first item ", function() {
        var listView = setup();
        listView.focus();
        ok(listView.find("li").first().is(".k-state-focused"));
    });

    test("down arrow moves focus on the next row same cell", function() {
        var listView = setup();
        listView.focus().press(kendo.keys.DOWN);
        ok(listView.find("li:eq(1)").hasClass("k-state-focused"));
    });

    test("right arrow moves focus on the next cell on the same row", function() {
        var listView = setup();
        listView.focus().press(kendo.keys.RIGHT);
        ok(listView.find("li:eq(1)").hasClass("k-state-focused"));
    });

    test("left arrow moves focus on the prev cell on the same row", function() {
        var listView = setup();
        listView.focus().press(kendo.keys.RIGHT).press(kendo.keys.LEFT);
        ok(listView.find("li:eq(0)").hasClass("k-state-focused"));
    });

    test("up arrow moves focus on the prev row same cell", function() {
        var listView = setup();
        listView.focus().press(kendo.keys.DOWN).press(kendo.keys.UP);
        ok(listView.find("li:eq(0)").hasClass("k-state-focused"));
    });

    test("space key select the focused item", function() {
        var listView = setup({ selectable: true });

        listView.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR);

        ok(listView.find("li:eq(1)").hasClass("k-state-selected"));
    });

    test("ctrl + space key when multiple selectoin is enabled persist the selected items", function() {
        var listView = setup({ selectable: "multiple" });

        listView.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR);
        listView.press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR, true);

        equal(listView.find(".k-state-selected").length, 2);
        ok(listView.find("li:eq(1)").hasClass("k-state-selected"));
        ok(listView.find("li:eq(2)").hasClass("k-state-selected"));
    });

    test("space key on already selected item when multiple selectoin is enabled unselects the item", function() {
        var listView = setup({ selectable: "multiple" });

        listView.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR).press(kendo.keys.SPACEBAR, true);

        ok(!listView.find("li:eq(1)").hasClass("k-state-selected"));
    });

    test("select without arguments returns selected items", function() {
        var ul = setup({ selectable: true }),
        selected;

        ul.find("li:first").addClass("k-state-selected");

        selected = ul.data("kendoListView").select();
        equal(selected.length, 1);
    });

    test("select with arguments mark the arguments as selected", function() {
        var ul = setup({
            selectable: true
        }),
        item = ul.find("li:eq(0)");

        ul.data("kendoListView").select(item);

        ok(item.hasClass("k-state-selected"));
    });

    test("select clears previously selected items if single select", function() {
        var ul = setup({
            selectable: true
        }),
        items = ul.children();
        items.eq(0).addClass("k-state-selected");
        ul.data("kendoListView").select(items.eq(1));

        ok(!items.eq(0).hasClass("k-state-selected"));
        ok(items.eq(1).hasClass("k-state-selected"));
    });

    test("select persist previously selected items if multi select", function() {
        var ul = setup({
            selectable: "multiple"
        }),
        items = ul.children();
        items.eq(0).addClass("k-state-selected");
        ul.data("kendoListView").select(items.eq(1));

        ok(items.eq(0).hasClass("k-state-selected"));
        ok(items.eq(1).hasClass("k-state-selected"));
    });

    test("select with array of items as argument select first if single select", function() {
        var ul = setup({
            selectable: true
        }),
        items = ul.children();

        ul.data("kendoListView").select(items);

        ok(items.eq(0).hasClass("k-state-selected"));
        ok(!items.eq(1).hasClass("k-state-selected"));
        ok(!items.eq(2).hasClass("k-state-selected"));
    });

    test("clearSelection clears selected items", function() {
        var listView = setup({
            selectable: true
        }).data("kendoListView"),
        item = listView.element.find("li:eq(1)").addClass("k-state-selected");

        listView.clearSelection();

        ok(!item.hasClass("k-state-selected"));
    });

    test("clearSelection triggers change event", function() {
        var triggered = false,
        listView = setup({
            selectable: true,
            change: function() {
                triggered = true;
            }
        }).data("kendoListView"),
        item = listView.element.find("li:eq(1)").addClass("k-state-selected");

        listView.clearSelection();

        ok(triggered);
    });

    test("resetting dataSource detaches the previouse events",1, function() {
        var listView = new kendo.ui.ListView($("<ul/>").appendTo(QUnit.fixture), { template: "<li></li>" });

        var dataSource = listView.dataSource;
        listView._dataSource();

        listView.bind("dataBound", function() {
            ok(false, "Change event is not detached");
        });

        dataSource.read();
        notStrictEqual(listView.dataSource, dataSource);
    });

    test("resetting DataSource rebinds the widget", function() {
        var listView = new kendo.ui.ListView($("<ul/>").appendTo(QUnit.fixture), { template: "<li></li>" });

        listView.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}]
        }));

        equal(listView.element.find("li").length, 2);
    });

    test("pageable option initialize pager", function() {
        var listView = setup({ pageable: { pagerId: "pager" } });

        ok($("#pager").data("kendoPager") instanceof kendo.ui.Pager);
    });

    test("listview DataSource is applied on the pager", function() {
        var listView = setup({ pageable: { pagerId: "pager" } }).data("kendoListView");
        var pager = $("#pager").data("kendoPager");

        ok(pager.dataSource === listView.dataSource);
    });

    test("listview pageable settings are applied on the pager", function() {
        var listView = setup({
            pageable: {
                pagerId: "pager",
                selectTemplate: "<li>foo</li>"
            }
        })
        .data("kendoListView");
    var pager = $("#pager").data("kendoPager");

    equal(pager.options.selectTemplate, "<li>foo</li>");
});

test("uid is set to item wrapper", function() {
    var listView =  setup({
        dataSource: {
            data: [{ foo: 1 }, { foo: 2 }]
        }
    }).data("kendoListView"),
    view = listView.dataSource.view(),
    items = listView.items();

    equal(items.eq(0).attr(kendo.attr("uid")), view[0].uid);
    equal(items.eq(1).attr(kendo.attr("uid")), view[1].uid);
});

test("uid is set to item wrapper on dataSource change", function() {
    var listView =  setup({
        dataSource: {
            data: [{ foo: 1 }, { foo: 2 }]
        }
    }).data("kendoListView");

    listView.dataSource.view()[0].set("foo", 3);

    var view = listView.dataSource.view(),
    items = listView.items();

    equal(items.eq(0).attr(kendo.attr("uid")), view[0].uid);
    equal(items.eq(1).attr(kendo.attr("uid")), view[1].uid);
});

test("correct item is updated when model itemchange changes the sorting order", function() {
    var listView =  setup({
        dataSource: {
            data: [{ foo: 1 }, { foo: 2 }],
            sort: {field: "foo", dir: "asc"}
        }
    }).data("kendoListView");

    listView.dataSource.at(0).set("foo", 3);

    var view = listView.dataSource.view(),
    items = listView.items();

    equal(items.eq(0).attr(kendo.attr("uid")), view[1].uid);
    equal(items.eq(1).attr(kendo.attr("uid")), view[0].uid);
});

    test("dataItem returns data item for given element", function() {
        var listView = setup({
            dataSource: [
                { foo: 1 }, { foo: 2 }
            ]
        }).data("kendoListView");

        var items = listView.items();

        equal(listView.dataItem(items.eq(0)).foo, 1);
        equal(listView.dataItem(items.eq(1)).foo, 2);
    });
})();
