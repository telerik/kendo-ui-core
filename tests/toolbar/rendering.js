(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: JSON rendering", {
        setup: function() {
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    /* TOOLBAR */

    test("toolbar element has a k-toolbar class", 1, function() {
        container.kendoToolBar();

        ok(container.hasClass("k-toolbar"));
    });

    test("toolbar is resizable by default", 1, function() {
        container.kendoToolBar();
        ok(container.data("kendoToolBar").options.resizable);
    });

    test("resizable toolbar has k-toolbar-resizable class", 1, function() {
        container.kendoToolBar();
        ok(container.hasClass("k-toolbar-resizable"));
    });

    test("non resizable toolbar does not have k-toolbar-resizable class", 1, function() {
        container.kendoToolBar({ resizable: false });
        ok(!container.hasClass("k-toolbar-resizable"));
    });

    /* BUTTON */

    test("button element has a k-button class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        });

        ok(container.find(".k-button").length);
    });

    test("button applies ID and text options", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(button.length, "ID is applied");
        equal(button.text(), "foo", "Text is applied");
    });

    test("by default the button does not have k-state-disabled class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(!button.hasClass("k-state-disabled"));
    });

    test("button with enable: false receives k-state-disabled class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", enable: false }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-state-disabled"));
    });

    test("by default button does not have k-primary class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(!button.hasClass("k-primary"));
    });

    test("button with primary: true received k-primary class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", primary: true }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-primary"));
    });

    test("button attaches click event handler", 1, function() {
        container.kendoToolBar({
            items: [{ 
                type: "button",
                text: "foo",
                click: function() {
                    ok(true, "click event is fired"); 
                }
            }]
        });

        var button = container.find(".k-button");
        button.trigger("click");
    });

    test("spriteCssClass prepends a span element with corresponding class(es) to the button element", 3, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", spriteCssClass: "foo bar" }
            ]
        });

        var icon = container.find(".k-button").eq(0).children("span.k-sprite");

        equal(icon.length, 1);
        ok(icon.hasClass("foo"));
        ok(icon.hasClass("bar"));
    });

    test("spriteCssClass adds a k-button-icon class to empty button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", spriteCssClass: "foo bar" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icon"));
    });

    test("spriteCssClass adds a k-button-icontext class if button element has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "content", spriteCssClass: "foo bar" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icontext"));
    });

    test("icon prepends a span element with corresponding class(es) to the button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", icon: "foo" }
            ]
        });

        var icon = container.find(".k-button").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("icon adds a k-button-icon class to button with no text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", icon: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icon"));
    });

    test("icon adds a k-button-icontext class if button has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", icon: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icontext"));
    });

    test("imageUrl prepends an img element with src attribute to the button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", imageUrl: "foo" }
            ]
        });

        var image = container.find(".k-button").children("img.k-image");

        equal(image.length, 1);
        equal(image.attr("src"), "foo");
    });

    test("imageUrl adds a k-button-icon class to empty button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", imageUrl: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icon"));
    });

    test("imageUrl adds a k-button-icontext class if button has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", imageUrl: "foo" }
            ]
        });

        var button = container.find(".k-button");

        ok(button.hasClass("k-button-icontext"));
    });

    test("button receives data-overflow='auto' attribute if no overflow is specified", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        });

        var button = container.find(".k-button");

        equal(button.attr("data-overflow"), "auto");
    });

    test("button overflow is set as data attribute to the HTML element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "never" }
            ]
        });

        var button = container.find(".k-button");

        equal(button.attr("data-overflow"), "never");
    });

    test("button element with overflow: auto is rendered both in the toolbar and in the overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        }).data("kendoToolBar");

        ok(container.find(".k-button").length);
        ok(toolbar.popup.element.find(".k-button").length);
    });

    test("button element with overflow: never is not rendered in the overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "never" }
            ]
        }).data("kendoToolBar");

        ok(container.find(".k-button").length);
        ok(!toolbar.popup.element.find(".k-button").length);
    });

    test("button element with overflow: always is not rendered in the toolbar container", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        ok(!container.find(".k-button").length);
        ok(toolbar.popup.element.find(".k-button").length);
    });

    test("button element in overflow popup has class k-overflow-button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        ok(toolbar.popup.element.find(".k-overflow-button").length);
    });

    test("botton element in overflow popup is wrapped inside a <li> tag", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.popup.element.find(".k-overflow-button");

        equal(button.parent().prop("tagName"), "LI");
    });

    /* TOGGLE BUTTON */

    test("toggleButton has k-toggle-button class", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo" }
            ]
        });

        ok(container.find(".k-toggle-button").length);
        equal(container.children().text(), "foo", "ToggleButton has correct text");
    });

    test("by default toggleButton does not have k-state-selected class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo" }
            ]
        });

        ok(!container.find(".k-toggle-button.k-state-checked").length);
    });

    test("toggleButton with selected: true receives k-state-selected class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo", selected: true }
            ]
        });

        ok(container.find(".k-toggle-button.k-state-checked").length);
    });

    test("by default toggleButton does not have group", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo" }
            ]
        });

        ok(!container.find(".k-toggle-button").data("group"));
    });

    test("toggle button with group has data-group attribute set", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo", group: "foo" },
                { type: "toggleButton", text: "bar", group: "foo" }
            ]
        });

        var buttons = container.find(".k-toggle-button");

        equal(buttons.eq(0).data("group"), "foo");
        equal(buttons.eq(1).data("group"), "foo");
    });

    /* BUTTON GROUP */

    test("renders ButtonGroup from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        ok(container.children("div.k-button-group").length, "ButtonGroup element is rendered");
        equal(container.find("div.k-button-group").children().length, 3, "Button group contains correct amount of items");
    });

    test("ButtonGroup applies ID option", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", id: "foo", items: [] }
            ]
        });

        var buttonGroup = container.find("#foo");

        ok(buttonGroup.length, "ID is applied");
    });

    test("first button in the group receives k-group-start class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var buttons = container.find(".k-button");
        ok(buttons.first().hasClass("k-group-start"));
    });

    test("last button in the group receives k-group-end class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var buttons = container.find(".k-button");
        ok(buttons.last().hasClass("k-group-end"));
    });

    test("ButtonGroup element receives data-overflow attribute with default value", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var buttonGroup = container.find(".k-button-group");
        equal(buttonGroup.attr("data-overflow"), "auto");
    });

    test("ButtonGroup element receives data-overflow attribute with set value", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", overflow: "never", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var buttonGroup = container.find(".k-button-group");
        equal(buttonGroup.attr("data-overflow"), "never");
    });

    /* SPLIT BUTTON */

    test("renders splitButton from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        ok(container.children("div.k-split-button").length, "SplitButton element is rendered");
        equal($(document.body).find(".k-split-button-dropdown").children().length, 4, "SplitButton dropdown contains correct amount of items");
    });

    test("initializes kendoPopup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        ok($(document.body).find(".k-split-button-dropdown").data("kendoPopup") instanceof kendo.ui.Popup);
    });

    test("splitButton holds reference to its popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-split-button");
        ok(splitButton.data("kendoPopup") instanceof kendo.ui.Popup);
    });

    test("splitButton applies ID and text options", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "foo", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find("#splitButton");

        ok(splitButton.length, "ID is applied");
        equal(splitButton.find("a").text(), "foo", "Text is applied");
    });

    test("SplitButton sets id to the popup element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "foo", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var popup = container.find("#splitButton").data("kendoPopup");

        equal(popup.element.attr("id"), "splitButton_optionlist");
    });

    test("SplitButton and its popup receive auto generated ID if ID is not explicitly set", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-split-button");
        var popup = splitButton.data("kendoPopup").element;

        ok(splitButton.attr("id"), "SplitButton has ID");
        ok(popup.attr("id"), "Popup has ID");
    });

    test("SplitButton element receives data-overflow attribute with default value", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-split-button");
        equal(splitButton.attr("data-overflow"), "auto");
    });

    test("SplitButton element receives data-overflow attribute with set value", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", overflow: "never", text: "foo", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-split-button");
        equal(splitButton.attr("data-overflow"), "never");
    });

    /* SEPARATOR */

    test("renders separator from JSON", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
        });

        ok(container.children(".k-toolbar-separator").length, "Separator element is rendered");
    });

    /* COMMAND OVERFLOW */

    test("resizable toolbar receives k-toolbar-resizable class", 1, function() {
        container.kendoToolBar();

        ok(container.hasClass("k-toolbar-resizable"));
    });

    test("non resizable toolbar does not receive k-toolbar-resizable class", 1, function() {
        container.kendoToolBar({ resizable: false });

        ok(!container.hasClass("k-toolbar-resizable"));
    });

    test("renders overflow anchor", 1, function() {
        container.kendoToolBar();

        ok(container.find(".k-overflow-anchor").length, "Anchor element is rendered");
    });

    test("does not renders overflow anchor if resizable is set to false", 1, function() {
        container.kendoToolBar({ resizable: false });

        ok(!container.find(".k-overflow-anchor").length);
    });

    test("initializes command overflow popup", 2, function() {
        var toolbar = container.kendoToolBar().data("kendoToolBar");

        ok(toolbar.popup instanceof kendo.ui.Popup);
        ok(toolbar.popup.element.length);
    });

    test("does not initiaze popup if resizable is set to false", 1, function() {
        var toolbar = container.kendoToolBar({
            resizable: false
        }).data("kendoToolBar");

        ok(!toolbar.popup);
    });

    test("button's wrapper with overflow: auto has k-overflow-hidden class", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        }).data("kendoToolBar");

        var wrapper = toolbar.popup.element.find(".k-button").parent();
        ok(wrapper.hasClass("k-overflow-hidden"));
        ok(wrapper.is(":hidden"));
    });

    test("button's wrapper with overflow: always does not have k-overflow-hidden class", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var wrapper = toolbar.popup.element.find(".k-button").parent();
        ok(!wrapper.hasClass("k-overflow-hidden"));
    });

    test("buttons with overflow: auto are hidden upon initialization if there is not enough space", 4, function() {
        container.width(90);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" }
            ]
        }).data("kendoToolBar");

        var toolbarButtons = container.find(".k-button");
        ok(toolbarButtons.eq(0).is(":visible"), "First button is visible");
        ok(toolbarButtons.eq(1).is(":hidden"), "Second button is hidden");

        var overflowButtons = toolbar.popup.element.find(">li");
        ok(overflowButtons.eq(0).hasClass("k-overflow-hidden"), "First item is hidden");
        ok(!overflowButtons.eq(1).hasClass("k-overflow-hidden"), "Second item is visible");
    });

    test("buttons with overflow: always are always hidden upon initialization", 4, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" },
                { type: "button", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var toolbarButton = container.find(".k-button");
        equal(toolbarButton.length, 1);
        ok(toolbarButton.is(":visible"), "Foo button is visible");

        var overflowButtons = toolbar.popup.element.find(">li");
        equal(overflowButtons.length, 2);
        ok(!overflowButtons.eq(1).hasClass("k-overflow-hidden"), "Bar item is visible");
    });

    test("Toolbar's popup is automatically closed on resize", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" },
                { type: "button", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var popup = toolbar.popup;
        popup.open();

        kendo.resize($("#toolbar"));
        ok(!popup.visible());
    });

    test("Toolbar items are automatically hidden on resize if there is not enough available space", 2, function() {
        container.width(400);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(200);
        toolbar.resize();

        var button = toolbar.element.find(".k-button").last();

        ok(button.is(":hidden"));

        var listItem = toolbar.popup.element.find(">li").last();

        ok(!listItem.hasClass("k-overflow-hidden"));
    });

    test("Toolbar items are automatically shown on resize if there is enough available space", 2, function() {
        container.width(200);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        var button = toolbar.element.find(".k-button").last();

        ok(button.is(":visible"));

        var listItem = toolbar.popup.element.find(">li").last();

        ok(listItem.hasClass("k-overflow-hidden"));
    });

    test("Multiple toolbar items are hidden with a single resize", 2, function() {
        container.width(400);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(100);
        toolbar.resize();

        var buttons = toolbar.element.find(".k-button");

        ok(buttons.eq(1).is(":hidden") && buttons.eq(2).is(":hidden"));

        var listItems = toolbar.popup.element.find(">li");

        ok(!listItems.eq(1).hasClass("k-overflow-hidden") && !listItems.eq(2).hasClass("k-overflow-hidden"));
    });

    test("Multple toolbar items are shown with a singe resize", 2, function() {
        container.width(100);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        var buttons = toolbar.element.find(".k-button");

        ok(buttons.eq(1).is(":visible") && buttons.eq(2).is(":visible"));

        var listItems = toolbar.popup.element.find(">li");

        ok(listItems.eq(1).hasClass("k-overflow-hidden") && listItems.eq(2).hasClass("k-overflow-hidden"));
    });

})();
