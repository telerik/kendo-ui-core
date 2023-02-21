(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    function click(element) {
        element.trigger("click");
    }

    describe("Toolbar accessibility with AXE:", function() {
        beforeEach(function() {
            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.getKendoToolBar().destroy();
            }
        });

        it("Toolbar is accessible", function(done) {
            container.kendoToolBar({
                items: [
                    { type: "button", text: "Button" },
                    { type: "button", text: "Toggle Button", togglable: true },
                    {
                        type: "splitButton",
                        text: "Insert",
                        menuButtons: [
                            { text: "Insert above", icon: "insert-up" },
                            { text: "Insert between", icon: "insert-middle" },
                            { text: "Insert below", icon: "insert-down" }
                        ]
                    },
                    { type: "separator" },
                    {
                        type: "buttonGroup",
                        buttons: [
                            { icon: "align-left", text: "Left", togglable: true, group: "text-align" },
                            { icon: "align-center", text: "Center", togglable: true, group: "text-align" },
                            { icon: "align-right", text: "Right", togglable: true, group: "text-align" }
                        ]
                    },
                    {
                        type: "buttonGroup",
                        buttons: [
                            { icon: "bold", text: "Bold", togglable: true },
                            { icon: "italic", text: "Italic", togglable: true },
                            { icon: "underline", text: "Underline", togglable: true }
                        ]
                    },
                    {
                        type: "button",
                        text: "Action",
                        overflow: "always"
                    }
                ]
            });

            axeRunFixture(done);
        });

        it("SplitButton is accessible", function(done) {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        text: "Insert",
                        menuButtons: [
                            { text: "Insert above", icon: "insert-up" },
                            { text: "Insert between", icon: "insert-middle" },
                            { text: "Insert below", icon: "insert-down" }
                        ]
                    }
                ]
            });

            $(".k-split-button .k-button").eq(1).trigger('click');

            var splitWrapper = $("[data-role=\"buttonmenu\"]");

            axeRun(splitWrapper, done);
        });

        it("overflow container is accessible", function(done) {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        text: "Action",
                        overflow: "always"
                    },
                    {
                        type: "button",
                        text: "Another Action",
                        overflow: "always"
                    },
                    {
                        type: "button",
                        text: "Something else here",
                        overflow: "always"
                    }
                ]
            });

            $(".k-toolbar-overflow-button").trigger('click');

            var overflowWrapper = $(".k-context-menu");

            axeRun(overflowWrapper, done);
        });
    });


    describe("Toolbar WAI-ARIA:", function() {
        beforeEach(function() {
            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.getKendoToolBar().destroy();
            }
        });

        it("by default the button has aria-disabled attribute set to false", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.equal(button.attr("aria-disabled"), "false");
        });

        it("button with enable: false receives aria-disabled attribute", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            assert.equal(button.attr("aria-disabled"), "true");
        });

        it("splitbutton with enable: false has aria-disabled attribute equal to true", function() {
            container.kendoToolBar({
                items: [{
                    type: "splitButton",
                    id: "foo",
                    text: "foo",
                    enable: false,
                    menuButtons: [
                        { id: "btn", text: "text" }
                    ]
                }
                ]
            });

            var mainbutton = container.find("#foo");

            assert.equal(mainbutton.attr("aria-disabled"), 'true');
        });

        it("toggleButton receives aria-pressed attribute", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo", selected: false },
                    { type: "button", togglable: true, text: "bar", selected: true }
                ]
            });

            var buttons = container.find(".k-toggle-button");

            assert.equal(buttons.eq(0).attr("aria-pressed"), "false");
            assert.equal(buttons.eq(1).attr("aria-pressed"), "true");
        });

        it("ButtonGroup buttons receive aria-pressed attribute", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1", togglable: true, selected: false },
                            { id: "btn2", text: "Btn2", togglable: true, selected: true }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var buttons = toolbar.element.find(".k-toggle-button");

            assert.equal(buttons.eq(0).attr("aria-pressed"), "false");
            assert.equal(buttons.eq(1).attr("aria-pressed"), "true");
        });

        it("role='separator' is added to separator elements", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", text: "Button" },
                    { type: "separator" },
                    { type: "button", text: "Button" },
                    {
                        type: "button",
                        text: "Action",
                        overflow: "always"
                    },
                    { type: "separator" },
                    {
                        type: "button",
                        text: "Action",
                        overflow: "always"
                    }
                ]
            }).data("kendoToolBar");

            $(".k-toolbar-overflow-button").trigger('click');
            var separators = $(".k-separator");

            separators.each(function(i, sep) {
                assert.equal(sep.getAttribute("role"), "separator");
            });
        });

        it("aria-label is added on buttons with only text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", text: "Foo", icon: "tick", showText: "overflow", id: "id" }
                ]
            }).data("kendoToolBar");

            var button = container.find("#id");

            assert.equal(button.attr("aria-label"), "Foo");
        });

        it("aria-label is added on overflow buttons with only text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", text: "Foo", icon: "tick", showText: "toolbar", id: "id" }
                ]
            }).data("kendoToolBar");

            var button = $(".k-context-menu").find("#id_overflow");

            assert.equal(button.attr("aria-label"), "Foo");
        });
    });
}());
