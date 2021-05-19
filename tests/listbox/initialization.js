(function() {
    var ListBox = kendo.ui.ListBox;
    var div;
    var listbox;
    var REMOVE = "remove";

    describe("ListBox initialization", function() {
        beforeEach(function() {
            div = $("<select />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("ListBox attaches a listbox object to a target", function() {
            listbox = new ListBox(div);
            assert.isOk(div.data("kendoListBox") instanceof ListBox);
        });

        it("should add k-listbox class to wrapper", function() {
            listbox = new ListBox(div);

            assert.equal(listbox.wrapper.hasClass("k-listbox"), true);
        });

        it("Has selectedable on", function() {
            listbox = new ListBox(div, {
                selectable: true
            });

            assert.isOk(listbox.selectable instanceof kendo.ui.Selectable);
        });

        it("Selectable is always on", function() {
            listbox = new ListBox(div, {
                selectable: false
            });

            assert.isOk(listbox.selectable instanceof kendo.ui.Selectable);
        });

        it("selectable should be destroyed on widget destroy", function() {
            listbox = new ListBox(div);
            var destroySpy = spy(listbox.selectable, "destroy");

            listbox.destroy();

            assert.equal(destroySpy.calls("destroy"), 1);
            assert.equal(listbox.selectable, null);
        });
    });

    describe("ListBox initialization", function() {
        beforeEach(function() {
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("toolbar is destroyed on widget destroy", function() {
            listbox = createListBoxWithToolbar();
            var destroySpy = spy(listbox.toolbar, "destroy");

            listbox.destroy();

            assert.equal(destroySpy.calls("destroy"), 1);
            assert.equal(listbox.toolbar, null);
        });

        it("toolbar cannot be initialized without tools", function() {
            listbox = createListBox();

            assert.equal(listbox.toolbar, undefined);
        });

        it("toolbar cannot be initialized with empty list of tools", function() {
            listbox = createListBox({
                toolbar: {
                    tools: []
                }
            });

            assert.equal(listbox.toolbar, undefined);
        });

        it("toolbar is configured with default settings", function() {
            listbox = createListBox();

            assert.deepEqual(listbox.options.toolbar, { position: "right", tools: [] });
        });

        it("tollbar should render tool elements", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "left",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.toolbar.element.find("li>a.k-button").length, 1);
            assert.equal(listbox.toolbar.element.find("li>a.k-button").data("command"), REMOVE);
        });

        it("tollbar with position left should add k-listbox-toolbar-left class", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "left",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.hasClass("k-listbox-toolbar-left"), true);
        });

        it("tollbar with position right should add k-listbox-toolbar-right class", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "right",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.hasClass("k-listbox-toolbar-right"), true);
        });

        it("tollbar with position top should add k-listbox-toolbar-top class", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "top",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.hasClass("k-listbox-toolbar-top"), true);
        });

        it("tollbar with position bottom should add k-listbox-toolbar-bottom class", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "bottom",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.hasClass("k-listbox-toolbar-bottom"), true);
        });

        it("tollbar element is inserted before list when position is left", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "left",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
        });

        it("tollbar element is inserted before list when position is right", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "right",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
        });

        it("tollbar element is inserted before list when position is top", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "top",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.find(".k-list-scroller").prev()[0], listbox.toolbar.element[0]);
        });

        it("tollbar element is inserted after list when position is bottom", function() {
            listbox = createListBoxWithToolbar({
                toolbar: {
                    position: "bottom",
                    tools: [REMOVE]
                }
            });

            assert.equal(listbox.wrapper.find(".k-list-scroller").next()[0], listbox.toolbar.element[0]);
        });

        it("when providing a template function the rendered content is wrapped in a li element", function() {
            listbox = createListBox({
                template: kendo.template("<div>#:text#</div>")
            });

            assert.equal(listbox.items().first().prop('nodeName').toLowerCase(), "li");
            assert.equal(listbox.items().first().html(), "<div>item1</div>");
        });

        it("when providing a template string the rendered content is wrapped in a li element", function() {
            listbox = createListBox({
                template: "<div>#:text#</div>"
            });

            assert.equal(listbox.items().first().prop('nodeName').toLowerCase(), "li");
            assert.equal(listbox.items().first().html(), "<div>item1</div>");
        });
    });
}());
