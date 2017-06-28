(function() {
    var ListBox = kendo.ui.ListBox;
    var div;
    var listbox;
    var REMOVE = "remove";

    module("ListBox initialization", {
        setup: function() {
            div = $("<select />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("ListBox attaches a listbox object to a target", function() {
        listbox = new ListBox(div);
        ok(div.data("kendoListBox") instanceof ListBox);
    });

    test("should add k-listbox class to wrapper", function() {
        listbox = new ListBox(div);

        equal(listbox.wrapper.hasClass("k-listbox"), true);
    });

    test("Has selectedable on", function() {
        listbox = new ListBox(div, {
            selectable: true
        });

        ok(listbox.selectable instanceof kendo.ui.Selectable);
    });

    test("Selectable is always on", function() {
        listbox = new ListBox(div, {
            selectable: false
        });

        ok(listbox.selectable instanceof kendo.ui.Selectable);
    });

    test("selectable should be destroyed on widget destroy", function() {
        listbox = new ListBox(div);
        var destroySpy = spy(listbox.selectable, "destroy");

        listbox.destroy();

        equal(destroySpy.calls("destroy"), 1);
        equal(listbox.selectable, null);
    });

    module("ListBox initialization", {
        setup: function() {
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("toolbar is destroyed on widget destroy", function() {
        listbox = createListBoxWithToolbar();
        var destroySpy = spy(listbox.toolbar, "destroy");

        listbox.destroy();

        equal(destroySpy.calls("destroy"), 1);
        equal(listbox.toolbar, null);
    });

    test("toolbar cannot be initialized without tools", function() {
        listbox = createListBox();

        equal(listbox.toolbar, undefined);
    });

    test("toolbar cannot be initialized with empty list of tools", function() {
        listbox = createListBox({
            toolbar: {
                tools: []
            }
        });

        equal(listbox.toolbar, undefined);
    });

    test("toolbar is configured with default settings", function() {
        listbox = createListBox();

        deepEqual(listbox.options.toolbar, { position: "right", tools: [] });
    });

    test("tollbar should render tool elements", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "left",
                tools: [REMOVE]
            }
        });

        equal(listbox.toolbar.element.find("li>a.k-button").length, 1);
        equal(listbox.toolbar.element.find("li>a.k-button").data("command"), REMOVE);
    });

    test("tollbar with position left should add k-listbox-toolbar-left class", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "left",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.hasClass("k-listbox-toolbar-left"), true);
    });

    test("tollbar with position right should add k-listbox-toolbar-right class", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "right",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.hasClass("k-listbox-toolbar-right"), true);
    });

    test("tollbar with position top should add k-listbox-toolbar-top class", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "top",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.hasClass("k-listbox-toolbar-top"), true);
    });

    test("tollbar with position bottom should add k-listbox-toolbar-bottom class", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "bottom",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.hasClass("k-listbox-toolbar-bottom"), true);
    });

    test("tollbar element is inserted before list when position is left", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "left",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
    });

    test("tollbar element is inserted before list when position is right", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "right",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
    });

    test("tollbar element is inserted before list when position is top", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "top",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
    });

    test("tollbar element is inserted after list when position is bottom", function() {
        listbox = createListBoxWithToolbar({
            toolbar: {
                position: "bottom",
                tools: [REMOVE]
            }
        });

        equal(listbox.wrapper.find(".k-list-scroller").next()[0], listbox.toolbar.element[0]);
    });

    test("when providing a template function the rendered content is wrapped in a li element", function() {
        listbox = createListBox({
            template: kendo.template("<div>#:text#</div>")
        });

        equal(listbox.items().first().prop('nodeName').toLowerCase(), "li");
        equal(listbox.items().first().html(), "<div>item1</div>");
    });

    test("when providing a template string the rendered content is wrapped in a li element", function() {
        listbox = createListBox({
            template: "<div>#:text#</div>"
        });

        equal(listbox.items().first().prop('nodeName').toLowerCase(), "li");
        equal(listbox.items().first().html(), "<div>item1</div>");
    });
})();
