(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    function click(element) {
        element.trigger("mousedown");
        element.trigger("mouseup");
    }

    module("Toolbar rendering:", {
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
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        ok(container.find("#foo").length);
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
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(!button.hasClass("k-state-disabled"));
    });

    test("button with enable: false receives k-state-disabled class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-state-disabled"));
    });

    test("by default button does not have k-primary class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(!button.hasClass("k-primary"));
    });

    test("button with primary: true received k-primary class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", primary: true }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-primary"));
    });

    test("click event handler of the button is stored in the data of the rendered element", 2, function() {
        container.kendoToolBar({
            items: [{ 
                type: "button",
                id: "foo",
                text: "foo",
                click: function() { }
            }]
        });

        var button = $("#foo");
        var overflowButton = $("#foo_overflow");

        ok(kendo.isFunction(button.data("click")), "Click event handler is saved in the data of the button element");
        ok(kendo.isFunction(overflowButton.data("click")), "Click event handler is saved in the data of the overflowButton element");
    });

    test("url sets a href to the button element if it is an anchor", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", url: "http://www.kendoui.com" }
            ]
        });

        var button = container.find("#foo");

        ok(button.attr("href") == "http://www.kendoui.com");
    });

    test("align sets a class to the button element to define its alignment", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", align: "left" },
                { type: "button", id: "faa", align: "right" }
            ]
        });

        var button1 = container.find("#foo"),
            button2 = container.find("#faa");

        ok(button1.hasClass("k-align-left"));
        ok(button2.hasClass("k-align-right"));
    });

    test("spriteCssClass prepends a span element with corresponding class(es) to the button element", 3, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", spriteCssClass: "foo bar" }
            ]
        });

        var icon = container.find("#foo").children("span.k-sprite");

        equal(icon.length, 1);
        ok(icon.hasClass("foo"));
        ok(icon.hasClass("bar"));
    });

    test("spriteCssClass adds a k-button-icon class to empty button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", spriteCssClass: "foo bar" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icon"));
    });

    test("spriteCssClass adds a k-button-icontext class if button element has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "content", spriteCssClass: "foo bar" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icontext"));
    });

    test("icon prepends a span element with corresponding class(es) to the button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", icon: "foo" }
            ]
        });

        var icon = container.find("#foo").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("icon adds a k-button-icon class to button with no text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", icon: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icon"));
    });

    test("icon adds a k-button-icontext class if button has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", icon: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icontext"));
    });

    test("imageUrl prepends an img element with src attribute to the button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", imageUrl: "foo" }
            ]
        });

        var image = container.find("#foo").children("img.k-image");

        equal(image.length, 1);
        equal(image.attr("src"), "foo");
    });

    test("imageUrl adds a k-button-icon class to empty button element", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", imageUrl: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icon"));
    });

    test("imageUrl adds a k-button-icontext class if button has text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", imageUrl: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(button.hasClass("k-button-icontext"));
    });

    test("button receives data-overflow='auto' attribute if no overflow is specified", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        equal(button.attr("data-overflow"), "auto");
    });

    test("button overflow is set as data attribute to the HTML element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", overflow: "never" }
            ]
        });

        var button = container.find("#foo");

        equal(button.attr("data-overflow"), "never");
    });

    test("button element with overflow: auto is rendered both in the toolbar and in the overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        ok(container.find("#foo").length);
        ok(toolbar.popup.element.find("#foo_overflow").length);
    });

    test("button element with overflow: never is not rendered in the overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", overflow: "never" }
            ]
        }).data("kendoToolBar");

        ok(container.find("#foo").length);
        ok(!toolbar.popup.element.find("#foo_overflow").length);
    });

    test("button element with overflow: always is not rendered in the toolbar container", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        ok(!container.find("#foo").length);
        ok(toolbar.popup.element.find("#foo_overflow").length);
    });

    test("button element in overflow popup has class k-overflow-button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        ok(toolbar.popup.element.find(".k-overflow-button").length);
    });

    test("button element in overflow popup is wrapped inside a <li> tag", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.popup.element.find(".k-overflow-button");

        equal(button.parent().prop("tagName"), "LI");
    });

    test("button receives data-uid attribute", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        var overflowButton = toolbar.popup.element.children().eq(0);

        ok(button.data("uid"));
        ok(overflowButton.data("uid"));
        equal(button.data("uid"), overflowButton.data("uid"));
    });

    test("button with showText: both has text both in toolbar and overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", showText: "both" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        var overflowButton = toolbar.popup.element.children().eq(0);

        equal(button.text(), "foo");
        equal(overflowButton.text(), "foo");
    });

    test("button with showText: toolbar has text only in toolbar", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", showText: "toolbar" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        var overflowButton = toolbar.popup.element.children().eq(0);

        equal(button.text(), "foo");
        equal(overflowButton.text(), "");
    });

    test("button with showText: overflow has text only in overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", showText: "overflow" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        var overflowButton = toolbar.popup.element.children().eq(0);

        equal(button.text(), "");
        equal(overflowButton.text(), "foo");
    });

    test("button with showIcon: both has icon both in toolbar and overflow popup", 4, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", icon: "foo", showIcon: "both" }
            ]
        }).data("kendoToolBar");

        var icon = toolbar.element.find("#foo").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));

        icon = toolbar.popup.element.find("#foo_overflow").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("button with showIcon: toolbar has icon only in toolbar", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", icon: "foo", showIcon: "toolbar" }
            ]
        }).data("kendoToolBar");

        var icon = toolbar.element.find("#foo").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));

        icon = toolbar.popup.element.find(".k-link.k-overflow-button").children("span.k-icon");

        equal(icon.length, 0);
    });

    test("button with showIcon: overflow has icon only in overflow container", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", icon: "foo", showIcon: "overflow" }
            ]
        }).data("kendoToolBar");

        var icon = toolbar.element.find("#foo").children("span.k-icon");

        equal(icon.length, 0);

        icon = toolbar.popup.element.find("#foo_overflow").children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("button renders <button> tag when useButtonTag is set to true", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", useButtonTag: true }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        equal(button.prop("tagName"), "BUTTON", "<button> tag is rendered");
    });

    test("options.attributes are attached to the button element", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        ok(button.hasClass("foo"));
    });

    test("options.attributes are attached to the button element located in the overflow popup", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
            ]
        }).data("kendoToolBar");

        var button = toolbar.popup.element.find("#foo_overflow");
        ok(button.hasClass("foo"));
    });

    /* TOGGLE BUTTON */

    test("toggleButton has k-toggle-button class", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo" }
            ]
        });

        ok(container.find(".k-toggle-button").length);
        equal(container.children().text(), "foo", "ToggleButton has correct text");
    });

    test("by default toggleButton does not have k-state-selected class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo" }
            ]
        });

        ok(!container.find(".k-toggle-button.k-state-active").length);
    });

    test("toggleButton with selected: true receives k-state-selected class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo", selected: true }
            ]
        });

        ok(container.find(".k-toggle-button.k-state-active").length);
    });

    test("by default toggleButton does not have group", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo" }
            ]
        });

        ok(!container.find(".k-toggle-button").data("group"));
    });

    test("toggle button with group has data-group attribute set", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo", group: "foo" },
                { type: "button", togglable: true, text: "bar", group: "foo" }
            ]
        });

        var buttons = container.find(".k-toggle-button");

        equal(buttons.eq(0).data("group"), "foo");
        equal(buttons.eq(1).data("group"), "foo");
    });

    test("toggle event handler of the button is stored in the data of the rendered element", 2, function() {
        container.kendoToolBar({
            items: [{ 
                type: "button",
                togglable: true,
                id: "foo",
                text: "foo",
                toggle: function() { }
            }]
        });

        var button = $("#foo");
        var overflowButton = $("#foo_overflow");

        ok(kendo.isFunction(button.data("toggle")), "Toggle event handler is saved in the data of the button element");
        ok(kendo.isFunction(overflowButton.data("toggle")), "Toggle event handler is saved in the data of the overflowButton element");
    });

    /* BUTTON GROUP */

    test("renders ButtonGroup from JSON", 3, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        ok(container.children(".k-button-group").length, "ButtonGroup element is rendered");
        equal(container.find(".k-button-group").prop("tagName"), "DIV", "ButtonGroup renders DIV element");
        equal(container.find(".k-button-group").children().length, 3, "Button group contains correct amount of items");
    });

    test("ButtonGroup applies ID option", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", id: "foo", buttons: [] }
            ]
        });

        var buttonGroup = container.find("#foo");

        ok(buttonGroup.length, "ID is applied");
    });

    test("first button in the group receives k-group-start class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var button = container.find("#btn1");
        ok(button.hasClass("k-group-start"));
    });

    test("last button in the group receives k-group-end class", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        var button = container.find("#btn3");
        ok(button.hasClass("k-group-end"));
    });

    test("ButtonGroup element receives data-overflow attribute with default value", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
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
                { type: "buttonGroup", overflow: "never", buttons: [
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

    test("ButtonGroup with overflow auto is rendered both in toolbar and in overflow container", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", overflow: "auto", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        var component = toolbar.element.find(".k-button-group");
        ok(component.length);

        component = toolbar.popup.element.find(".k-button-group");
        ok(component.length);
    });

    test("Overflow ButtonGroup renders li tag with buttons", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        component = toolbar.popup.element.find(".k-button-group");
        equal(component.prop("tagName"), "LI");
        equal(component.children(".k-overflow-button").length, 3);
    });

    test("Overflow ButtonGroup renders li element which has uid + overflow data", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", overflow: "always", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        component = toolbar.popup.element.find(".k-button-group");
        equal(component.prop("tagName"), "LI");
        ok(component.data("uid"));
        equal(component.data("overflow"), "always");
    });

    test("Each button in ButtonGroup receives an uid", 6, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", overflow: "auto", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        buttons = toolbar.element.find(".k-button-group").children(".k-button");
        overflowButtons = toolbar.popup.element.find(".k-button-group").children(".k-button");

        for (var i = 0; i < buttons.length; i++) {
            ok(buttons.eq(i).data("uid") && overflowButtons.eq(i).data("uid"), "Toolbar and Overflow buttons has ID attribute");
            equal(buttons.eq(i).data("uid"), overflowButtons.eq(i).data("uid"), "Buttons has the same UID");
        }
    });

    test("options.attributes (button level) are attached to each button", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                        { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                        { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                    ]
                }
            ]
        }).data("kendoToolBar");

        ok($("#btn1").hasClass("foo"));
        ok($("#btn2").hasClass("bar"));
        ok($("#btn3").hasClass("baz"));
    });

    test("options.attributes (buttonGroup level) are attached to the buttonGroup wrapper", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", attributes: { "class": "foo" }, buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        var buttonGroup = toolbar.element.find(".k-button-group");
        ok(buttonGroup.hasClass("foo"));
    });

    test("options.attributes (buttonGroup level) are attached to the buttonGroup wrapper located in the overflow popup", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", attributes: { "class": "foo" }, buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        var buttonGroup = toolbar.popup.element.find(".k-button-group");
        ok(buttonGroup.hasClass("foo"));
    });

    test("ButtonGroup with no buttons does not throw JS error", 0, function() {
        try {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "buttonGroup" }
                ]
            }).data("kendoToolBar");
        } catch (e) {
            ok(false);
        }
    });

    /* SPLIT BUTTON */

    test("renders splitButton from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        ok(container.children("div.k-split-button").length, "SplitButton element is rendered");
        equal($(document.body).find(".k-split-container.k-list-container").children().length, 4, "SplitButton dropdown contains correct amount of items");
    });

    test("initializes kendoPopup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        ok($(document.body).find(".k-split-container.k-list-container").data("kendoPopup") instanceof kendo.ui.Popup);
    });

    test("splitButton holds reference to its popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
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
                { type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-button#splitButton");

        ok(splitButton.length, "ID is applied to the main button");
        equal(splitButton.text(), "foo", "Text is applied");
    });

    test("SplitButton sets id to the wrapper element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var wrapper = container.find("#splitButton").parent();

        equal(wrapper.attr("id"), "splitButton_wrapper");
    });

    test("SplitButton sets id to the popup element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var popup = container.find("#splitButton_wrapper").data("kendoPopup");

        equal(popup.element.attr("id"), "splitButton_optionlist");
    });

    test("SplitButton and its popup receive auto generated ID if ID is not explicitly set", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", menuButtons: [
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
                { type: "splitButton", text: "foo", menuButtons: [
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
                { type: "splitButton", overflow: "never", text: "foo", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" }
                    ]
                }
            ]
        });

        var splitButton = container.find(".k-split-button");
        equal(splitButton.attr("data-overflow"), "never");
    });

    test("Overflow SplitButton renders li tag with buttons", 2, function() {
        var splitButton = container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", menuButtons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        component = splitButton.popup.element.find(".k-split-button");

        equal(component.prop("tagName"), "LI");
        equal(component.children(".k-overflow-button").length, 4); //3 items + 1 main button
    });

    test("Overflow SplitButton items are wrapped in a li tag which has data-uid attribute", 2, function() {
        var splitButton = container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", menuButtons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        component = splitButton.popup.element.find(".k-split-button");

        equal(component.prop("tagName"), "LI");
        ok(component.data("uid"));
    });

    test("SplitButton popup is as wide as the button wrapper", 1, function() {
        var splitButton = container.kendoToolBar({
            items: [
                { type: "splitButton", text: "foo", menuButtons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        var splitButton = container.find(".k-split-button");
        var arrowButton = splitButton.find(".k-split-button-arrow");

        click(arrowButton);
        equal(splitButton.outerWidth(), splitButton.data("kendoPopup").element.outerWidth());
    });

    test("options.attribute are attached to the main button", 1, function() {
        var splitButton = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", attributes: { "class": "foo" }, menuButtons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        ok($("#foo").hasClass("foo"));
    });

    test("options.attribute are attached to the menu buttons", 3, function() {
        var splitButton = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", menuButtons: [
                        { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                        { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                        { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                    ]
                }
            ]
        }).data("kendoToolBar");

        ok($("#btn1").hasClass("foo"));
        ok($("#btn2").hasClass("bar"));
        ok($("#btn3").hasClass("baz"));
    });

    /* SEPARATOR */

    test("renders separator from JSON", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
        });

        ok(container.children(".k-separator").length, "Separator element is rendered");
    });

    test("Overflow separator is wrapped inside a li tag and received data-uid attribute", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
        }).data("kendoToolBar");

        var separator = toolbar.popup.element.find(".k-separator");

        equal(separator.prop("tagName"), "LI");
        ok(separator.data("uid"));
    });

    test("options.attributes are attached to the separator element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "separator", attributes: { "class": "foo" } }
            ]
        });

        ok(container.children(".k-separator").hasClass("foo"));
    });

    test("options.id is attached to the separator element", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "separator", id: "foo" }
            ]
        });

        equal(container.children("#foo").length, 1);
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

        ok(!(toolbar.popup instanceof kendo.ui.Popup));
    });

    test("button's wrapper with overflow: auto has k-overflow-hidden class", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        }).data("kendoToolBar");

        var wrapper = toolbar.popup.element.children().first();
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

    test("Same uid is attached to the toolbar component and corresponding overflow popup element", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.element.find("#foo");
        var overflowButton = toolbar.popup.element.find(">li:first");

        ok(button.data("uid") === overflowButton.data("uid"));
    });

    test("If a template command does not have overflowTemplate it is considered as overflow: never", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>' }
            ]
        }).data("kendoToolBar");

        equal($("#template").parent().data("overflow"), "never");
    });

    test("When a template command without overflowTemplate is defined no JS error is thrown", 1, function() {
        try {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>' }
                ]
            }).data("kendoToolBar");
        } catch(error) {
            ok(false, "JS error is thrown");
        }

        ok(true, "No JS error is thrown");
    });

    test("Template content is wrapped inside a <div> tag", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>' }
            ]
        }).data("kendoToolBar");

        equal($("#template").parent().prop("tagName"), "DIV");
    });

    test("UID is attached to the template's wrapper element", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>' }
            ]
        }).data("kendoToolBar");

        ok($("#template").parent().data("uid"));
    });

    /* TEMPLATES */

    test("attributes are applied to the wrapper element", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>', attributes: { "class": "foo", "data-test": "test" } }
            ]
        }).data("kendoToolBar");

        ok($("#template").parent().hasClass("foo"));
        equal($("#template").parent().data("test"), "test");
    });

    test("id is applied to the wrapper element", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>', id: "foo", attributes: { "class": "foo" } }
            ]
        }).data("kendoToolBar");

        ok($("#foo").length);
        ok($("#foo").hasClass("foo"));
    });

})();
