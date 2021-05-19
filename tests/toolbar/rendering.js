(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    function click(element) {
        element.trigger("click");
    }

    describe("Toolbar rendering:", function() {
        beforeEach(function() {
            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        });

        /* TOOLBAR */

        it("toolbar element has a k-toolbar class", function() {
            container.kendoToolBar();

            assert.isOk(container.hasClass("k-toolbar"));
        });

        it("toolbar is resizable by default", function() {
            container.kendoToolBar();
            assert.isOk(container.data("kendoToolBar").options.resizable);
        });

        it("resizable toolbar has k-toolbar-resizable class", function() {
            container.kendoToolBar();
            assert.isOk(container.hasClass("k-toolbar-resizable"));
        });

        it("non resizable toolbar does not have k-toolbar-resizable class", function() {
            container.kendoToolBar({ resizable: false });
            assert.isOk(!container.hasClass("k-toolbar-resizable"));
        });

        /* BUTTON */

        it("button element has a k-button class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            assert.isOk(container.find("#foo").length);
        });

        it("button applies ID and text options", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.length, "ID is applied");
            assert.equal(button.text(), "foo", "Text is applied");
        });

        it("by default the button does not have k-state-disabled class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(!button.hasClass("k-state-disabled"));
        });

        it("button with enable: false receives k-state-disabled class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-state-disabled"));
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

        it("splitbutton with enable: false receives k-state-disabled class", function() {
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
            var splitbutton = mainbutton.parent(".k-split-button");

            assert.isOk(mainbutton.hasClass("k-state-disabled"));
            assert.isOk(splitbutton.hasClass("k-state-disabled"));
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

            assert.equal(mainbutton.attr("aria-disabled"), "true");
        });

        it("by default button does not have k-primary class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(!button.hasClass("k-primary"));
        });

        it("button with primary: true received k-primary class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", primary: true }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-primary"));
        });

        it("click event handler of the button is stored in the data of the rendered element", function() {
            container.kendoToolBar({
                items: [{
                    type: "button",
                    id: "foo",
                    text: "foo",
                    click: function() { }
                }]
            });

            var clickHandler = $("#foo").data("button").clickHandler;
            var overflowClickHandler = $("#foo_overflow").data("button").clickHandler;

            assert.isOk(kendo.isFunction(clickHandler), "Click event handler is saved in the data of the button element");
            assert.isOk(kendo.isFunction(overflowClickHandler), "Click event handler is saved in the data of the overflowButton element");
        });

        it("url sets a href to the button element if it is an anchor", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", url: "http://www.kendoui.com" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.attr("href") == "http://www.kendoui.com");
        });

        it("align sets a class to the button element to define its alignment", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", align: "left" },
                    { type: "button", id: "faa", align: "right" }
                ]
            });

            var button1 = container.find("#foo"),
                button2 = container.find("#faa");

            assert.isOk(button1.hasClass("k-align-left"));
            assert.isOk(button2.hasClass("k-align-right"));
        });

        it("spriteCssClass prepends a span element with corresponding class(es) to the button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", spriteCssClass: "foo bar" }
                ]
            });

            var icon = container.find("#foo").children("span.k-sprite");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("foo"));
            assert.isOk(icon.hasClass("bar"));
        });

        it("spriteCssClass adds a k-button-icon class to empty button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", spriteCssClass: "foo bar" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icon"));
        });

        it("spriteCssClass adds a k-button-icontext class if button element has text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "content", spriteCssClass: "foo bar" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icontext"));
        });

        it("icon prepends a span element with corresponding class(es) to the button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo" }
                ]
            });

            var icon = container.find("#foo").children("span.k-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-i-foo"));
        });

        it("icon adds a k-button-icon class to button with no text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icon"));
        });

        it("icon adds a k-button-icontext class if button has text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", icon: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icontext"));
        });

        it("imageUrl prepends an img element with src attribute to the button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", imageUrl: "foo" }
                ]
            });

            var image = container.find("#foo").children("img.k-image");

            assert.equal(image.length, 1);
            assert.equal(image.attr("src"), "foo");
        });

        it("imageUrl adds a k-button-icon class to empty button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", imageUrl: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icon"));
        });

        it("imageUrl adds a k-button-icontext class if button has text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", imageUrl: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-button-icontext"));
        });

        it("button receives data-overflow='auto' attribute if no overflow is specified", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.equal(button.attr("data-overflow"), "auto");
        });

        it("button overflow is set as data attribute to the HTML element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "never" }
                ]
            });

            var button = container.find("#foo");

            assert.equal(button.attr("data-overflow"), "never");
        });

        it("button element with overflow: auto is rendered both in the toolbar and in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            assert.isOk(container.find("#foo").length);
            assert.isOk(toolbar.popup.element.find("#foo_overflow").length);
        });

        it("button element with overflow: never is not rendered in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "never" }
                ]
            }).data("kendoToolBar");

            assert.isOk(container.find("#foo").length);
            assert.isOk(!toolbar.popup.element.find("#foo_overflow").length);
        });

        it("button element with overflow: always is not rendered in the toolbar container", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            assert.isOk(!container.find("#foo").length);
            assert.isOk(toolbar.popup.element.find("#foo_overflow").length);
        });

        it("button element in overflow popup has class k-overflow-button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            assert.isOk(toolbar.popup.element.find(".k-overflow-button").length);
        });

        it("button element in overflow popup is wrapped inside a <li> tag", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.popup.element.find(".k-overflow-button");

            assert.equal(button.parent().prop("tagName"), "LI");
        });

        it("button receives data-uid attribute", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.popup.element.children().eq(0);

            assert.isOk(button.data("uid"));
            assert.isOk(overflowButton.data("uid"));
            assert.equal(button.data("uid"), overflowButton.data("uid"));
        });

        it("button with showText: both has text both in toolbar and overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", showText: "both" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.popup.element.children().eq(0);

            assert.equal(button.text(), "foo");
            assert.equal(overflowButton.text(), "foo");
        });

        it("button with showText: toolbar has text only in toolbar", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", showText: "toolbar" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.popup.element.children().eq(0);

            assert.equal(button.text(), "foo");
            assert.equal(overflowButton.text(), "");
        });

        it("button with showText: overflow has text only in overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", showText: "overflow" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.popup.element.children().eq(0).find("a.k-button");

            assert.equal(button.text(), "");
            assert.equal(overflowButton.text(), "foo");
        });

        it("button with showIcon: both has icon both in toolbar and overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo", showIcon: "both" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").find("span.k-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-i-foo"));

            icon = toolbar.popup.element.find("#foo_overflow").find("span.k-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-i-foo"));
        });

        it("button with showIcon: toolbar has icon only in toolbar", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo", showIcon: "toolbar" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").children("span.k-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-i-foo"));

            icon = toolbar.popup.element.find(".k-link.k-overflow-button").children("span.k-icon");

            assert.equal(icon.length, 0);
        });

        it("button with showIcon: overflow has icon only in overflow container", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo", showIcon: "overflow" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").find("span.k-icon");

            assert.equal(icon.length, 0);

            icon = toolbar.popup.element.find("#foo_overflow").find("span.k-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-i-foo"));
        });

        it("button renders <button> tag when useButtonTag is set to true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", useButtonTag: true }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            assert.equal(button.prop("tagName"), "BUTTON", "<button> tag is rendered");
        });

        it("options.attributes are attached to the button element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            assert.isOk(button.hasClass("foo"));
        });

        it("options.attributes does not remove build-in button attributes", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            assert.isOk(button.hasClass("k-button"));
            assert.isOk(button.hasClass("foo"));
        });

        it("options.attributes are attached to the button element located in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            var button = toolbar.popup.element.find("#foo_overflow");
            assert.isOk(button.hasClass("foo"));
        });

        it("options.attributes does not remove build-in overflow button attributes", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            var button = toolbar.popup.element.find("#foo_overflow");
            assert.isOk(button.hasClass("k-item"));
            assert.isOk(button.hasClass("foo"));

            assert.isOk(button.children().hasClass("k-overflow-button"));
            assert.isOk(button.children().hasClass("foo"));
        });

        it("button is initially hidden if hidden option is set to true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", hidden: true }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.hasClass("k-state-hidden"));
            assert.isOk(button.is(":hidden"));

            var overflowButton = toolbar.popup.element.find("#foo_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
            assert.isOk(overflowButton.hasClass("k-state-hidden"));
        });

        /* TOGGLE BUTTON */

        it("toggleButton has k-toggle-button class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo" }
                ]
            });

            assert.isOk(container.find(".k-toggle-button").length);
            assert.equal(container.children().text(), "foo", "ToggleButton has correct text");
        });

        it("by default toggleButton does not have k-state-active class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo" }
                ]
            });

            assert.isOk(!container.find(".k-toggle-button.k-state-active").length);
        });

        it("toggleButton with selected: true receives k-state-active class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo", selected: true },
                    { type: "button", togglable: true, text: "bar", selected: true, overflow: "always" }
                ]
            });

            assert.isOk(container.find(".k-toggle-button.k-state-active").length);
            assert.equal($(".k-overflow-button.k-state-active").length, 2);
        });

        it("by default toggleButton does not have group", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo" }
                ]
            });

            assert.isOk(!container.find(".k-toggle-button").data("group"));
        });

        it("toggle button with group has data-group attribute set", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo", group: "foo" },
                    { type: "button", togglable: true, text: "bar", group: "foo" }
                ]
            });

            var buttons = container.find(".k-toggle-button");

            assert.equal(buttons.eq(0).data("group"), "foo");
            assert.equal(buttons.eq(1).data("group"), "foo");
        });

        it("toggle event handler of the button is stored in the data of the rendered element", function() {
            container.kendoToolBar({
                items: [{
                    type: "button",
                    togglable: true,
                    id: "foo",
                    text: "foo",
                    toggle: function() { }
                }]
            });

            var toggleHandler = $("#foo").data("button").toggleHandler;
            var overflowToggleHandler = $("#foo_overflow").data("button").toggleHandler;

            assert.isOk(kendo.isFunction(toggleHandler), "Toggle event handler is saved in the data of the button element");
            assert.isOk(kendo.isFunction(overflowToggleHandler), "Toggle event handler is saved in the data of the overflowButton element");
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

        /* BUTTON GROUP */

        it("renders ButtonGroup from JSON", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            });

            assert.isOk(container.children(".k-button-group").length, "ButtonGroup element is rendered");
            assert.equal(container.find(".k-button-group").prop("tagName"), "DIV", "ButtonGroup renders DIV element");
            assert.equal(container.find(".k-button-group").children().length, 3, "Button group contains correct amount of items");
        });

        it("ButtonGroup applies ID option", function() {
            container.kendoToolBar({
                items: [
                    { type: "buttonGroup", id: "foo", buttons: [] }
                ]
            });

            var buttonGroup = container.find("#foo");

            assert.isOk(buttonGroup.length, "ID is applied");
        });

        it("first button in the group receives k-group-start class", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            });

            var button = container.find("#btn1");
            assert.isOk(button.hasClass("k-group-start"));
        });

        it("last button in the group receives k-group-end class", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            });

            var button = container.find("#btn3");
            assert.isOk(button.hasClass("k-group-end"));
        });

        it("ButtonGroup element receives data-overflow attribute with default value", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            });

            var buttonGroup = container.find(".k-button-group");
            assert.equal(buttonGroup.attr("data-overflow"), "auto");
        });

        it("ButtonGroup element receives data-overflow attribute with set value", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", overflow: "never", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            });

            var buttonGroup = container.find(".k-button-group");
            assert.equal(buttonGroup.attr("data-overflow"), "never");
        });

        it("ButtonGroup with overflow auto is rendered both in toolbar and in overflow container", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", overflow: "auto", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var component = toolbar.element.find(".k-button-group");
            assert.isOk(component.length);

            component = toolbar.popup.element.find(".k-button-group");
            assert.isOk(component.length);
        });

        it("Overflow ButtonGroup renders li tag with buttons", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = toolbar.popup.element.find(".k-button-group");
            assert.equal(component.prop("tagName"), "LI");
            assert.equal(component.children(".k-overflow-button").length, 3);
        });

        it("Overflow ButtonGroup renders li element which has uid + overflow data", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", overflow: "always", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = toolbar.popup.element.find(".k-button-group");
            assert.equal(component.prop("tagName"), "LI");
            assert.isOk(component.data("uid"));
            assert.equal(component.data("overflow"), "always");
        });

        it("Each button in ButtonGroup receives an uid", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", overflow: "auto", buttons: [
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
                assert.isOk(buttons.eq(i).data("uid") && overflowButtons.eq(i).data("uid"), "Toolbar and Overflow buttons has ID attribute");
                assert.equal(buttons.eq(i).data("uid"), overflowButtons.eq(i).data("uid"), "Buttons has the same UID");
            }
        });

        it("options.attributes (button level) are attached to each button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#btn1").hasClass("foo"));
            assert.isOk($("#btn2").hasClass("bar"));
            assert.isOk($("#btn3").hasClass("baz"));
        });

        it("options.attributes (buttonGroup level) are attached to the buttonGroup wrapper", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", attributes: { "class": "foo" }, buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var buttonGroup = toolbar.element.find(".k-button-group");
            assert.isOk(buttonGroup.hasClass("foo"));
        });

        it("options.attributes (buttonGroup level) are attached to the buttonGroup wrapper located in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", attributes: { "class": "foo" }, buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var buttonGroup = toolbar.popup.element.find(".k-button-group");
            assert.isOk(buttonGroup.hasClass("foo"));
        });

        it("options.attrbites (button level) does not remove build-in overflow button classes", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", overflow: "always", buttons: [
                            { id: "btn1", text: "Btn1", attributes: { 'class': 'myClass' } },
                            { id: "btn2", text: "Btn2", attributes: { 'class': 'myClass' } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button1 = $("#btn1_overflow");
            assert.isOk(button1.hasClass("k-overflow-button") && button1.hasClass("myClass"));
            var button2 = $("#btn2_overflow");
            assert.isOk(button2.hasClass("k-overflow-button") && button1.hasClass("myClass"));
        });

        it("ButtonGroup with no buttons does not throw JS error", function() {
            try {
                var toolbar = container.kendoToolBar({
                    items: [
                        { type: "buttonGroup" }
                    ]
                }).data("kendoToolBar");
            } catch (e) {
                assert.isOk(false);
            }
        });

        it("hides button with hidden: true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", hidden: true, text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#btn2");
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.hasClass("k-state-hidden"));

            var overflowButton = toolbar.popup.element.find("#btn2_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
            assert.isOk(overflowButton.hasClass("k-state-hidden"));
        });

        it("k-group-start class is set to the first visible button from the group", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", hidden: true, text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#btn2");
            assert.isOk(button.hasClass("k-group-start"));

            var overflowButton = toolbar.popup.element.find("#btn2_overflow");
            assert.isOk(overflowButton.hasClass("k-group-start"));
        });

        it("k-group-end class is set to the last visible button from the group", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup", buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", hidden: true, text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#btn2");
            assert.isOk(button.hasClass("k-group-end"));

            var overflowButton = toolbar.popup.element.find("#btn2_overflow");
            assert.isOk(overflowButton.hasClass("k-group-end"));
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

        /* SPLIT BUTTON */

        it("renders splitButton from JSON", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });

            assert.isOk(container.children("div.k-split-button").length, "SplitButton element is rendered");
            assert.equal($(document.body).find(".k-split-container.k-list-container").children().length, 4, "SplitButton dropdown contains correct amount of items");
        });

        it("initializes kendoPopup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });

            assert.isOk($(document.body).find(".k-split-container.k-list-container").data("kendoPopup") instanceof kendo.ui.Popup);
        });

        it("splitButton holds reference to its popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });

            var splitButton = container.find(".k-split-button");
            assert.isOk(splitButton.data("kendoPopup") instanceof kendo.ui.Popup);
        });

        it("splitButton applies ID and text options", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var splitButton = container.find(".k-button#splitButton");

            assert.isOk(splitButton.length, "ID is applied to the main button");
            assert.equal(splitButton.text(), "foo", "Text is applied");
        });

        it("SplitButton sets id to the wrapper element", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var wrapper = container.find("#splitButton").parent();

            assert.equal(wrapper.attr("id"), "splitButton_wrapper");
        });

        it("SplitButton sets id to the popup element", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var popup = container.find("#splitButton_wrapper").data("kendoPopup");

            assert.equal(popup.element.attr("id"), "splitButton_optionlist");
        });

        it("SplitButton and its popup receive auto generated ID if ID is not explicitly set", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var splitButton = container.find(".k-split-button");
            var popup = splitButton.data("kendoPopup").element;

            assert.isOk(splitButton.attr("id"), "SplitButton has ID");
            assert.isOk(popup.attr("id"), "Popup has ID");
        });

        it("SplitButton element receives data-overflow attribute with default value", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var splitButton = container.find(".k-split-button");
            assert.equal(splitButton.attr("data-overflow"), "auto");
        });

        it("SplitButton element receives data-overflow attribute with set value", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", overflow: "never", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var splitButton = container.find(".k-split-button");
            assert.equal(splitButton.attr("data-overflow"), "never");
        });

        it("Overflow SplitButton renders li tag with buttons", function() {
            var splitButton = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = splitButton.popup.element.find(".k-split-button");

            assert.equal(component.prop("tagName"), "LI");
            assert.equal(component.find(".k-overflow-button").length, 4); //3 items + 1 main button
        });

        it("Overflow SplitButton items are wrapped in a li tag which has data-uid attribute", function() {
            var splitButton = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = splitButton.popup.element.find(".k-split-button");

            assert.equal(component.prop("tagName"), "LI");
            assert.isOk(component.data("uid"));
        });

        it("SplitButton popup is as wide as the button wrapper", function() {
            var splitButton = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", text: "foo", menuButtons: [
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
            // Use Math.floor due to chrome 79
            // assert.equal(splitButton.outerWidth(), splitButton.data("kendoPopup").element.outerWidth());
            assert.equal(Math.floor(splitButton.outerWidth()), Math.floor(splitButton.data("kendoPopup").element.outerWidth()));
        });

        it("options.attribute are attached to the main button", function() {
            var splitButton = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", attributes: { "class": "foo" }, menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#foo").hasClass("foo"));
        });

        it("options.attribute are attached to the menu buttons", function() {
            var splitButton = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#btn1").hasClass("foo"));
            assert.isOk($("#btn2").hasClass("bar"));
            assert.isOk($("#btn3").hasClass("baz"));
        });

        it("splitButton is initially hidden if hidden option is set to true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", hidden: true, menuButtons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find(".k-split-button");
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.is(":hidden"));

            var overflowButton = toolbar.popup.element.find("#foo_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
            assert.isOk(overflowButton.hasClass("k-state-hidden"));
        });

        /* SEPARATOR */

        it("renders separator from JSON", function() {
            container.kendoToolBar({
                items: [
                    { type: "separator" }
                ]
            });

            assert.isOk(container.children(".k-separator").length, "Separator element is rendered");
        });

        it("Overflow separator is wrapped inside a li tag and received data-uid attribute", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "separator" }
                ]
            }).data("kendoToolBar");

            var separator = toolbar.popup.element.find(".k-separator");

            assert.equal(separator.prop("tagName"), "LI");
            assert.isOk(separator.data("uid"));
        });

        it("options.attributes are attached to the separator element", function() {
            container.kendoToolBar({
                items: [
                    { type: "separator", attributes: { "class": "foo" } }
                ]
            });

            assert.isOk(container.children(".k-separator").hasClass("foo"));
        });

        it("options.id is attached to the separator element", function() {
            container.kendoToolBar({
                items: [
                    { type: "separator", id: "foo" }
                ]
            });

            assert.equal(container.children("#foo").length, 1);
        });

        /* COMMAND OVERFLOW */

        it("resizable toolbar receives k-toolbar-resizable class", function() {
            container.kendoToolBar();

            assert.isOk(container.hasClass("k-toolbar-resizable"));
        });

        it("non resizable toolbar does not receive k-toolbar-resizable class", function() {
            container.kendoToolBar({ resizable: false });

            assert.isOk(!container.hasClass("k-toolbar-resizable"));
        });

        it("renders overflow anchor", function() {
            container.kendoToolBar();

            assert.isOk(container.find(".k-overflow-anchor").length, "Anchor element is rendered");
        });

        it("does not renders overflow anchor if resizable is set to false", function() {
            container.kendoToolBar({ resizable: false });

            assert.isOk(!container.find(".k-overflow-anchor").length);
        });

        it("initializes command overflow popup", function() {
            var toolbar = container.kendoToolBar().data("kendoToolBar");

            assert.isOk(toolbar.popup instanceof kendo.ui.Popup);
            assert.isOk(toolbar.popup.element.length);
        });

        it("does not initiaze popup if resizable is set to false", function() {
            var toolbar = container.kendoToolBar({
                resizable: false
            }).data("kendoToolBar");

            assert.isOk(!(toolbar.popup instanceof kendo.ui.Popup));
        });

        it("button's wrapper with overflow: auto has k-overflow-hidden class", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" }
                ]
            }).data("kendoToolBar");

            var wrapper = toolbar.popup.element.children().first();
            assert.isOk(wrapper.hasClass("k-overflow-hidden"));
            assert.isOk(wrapper.is(":hidden"));
        });

        it("button's wrapper with overflow: always does not have k-overflow-hidden class", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            var wrapper = toolbar.popup.element.find(".k-button").parent();
            assert.isOk(!wrapper.hasClass("k-overflow-hidden"));
        });

        it("Same uid is attached to the toolbar component and corresponding overflow popup element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.popup.element.find(">li:first");

            assert.isOk(button.data("uid") === overflowButton.data("uid"));
        });

        it("If a template command does not have overflowTemplate it is considered as overflow: never", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>' }
                ]
            }).data("kendoToolBar");

            assert.equal($("#template").parent().data("overflow"), "never");
        });

        it("When a template command without overflowTemplate is defined no JS error is thrown", function() {
            try {
                var toolbar = container.kendoToolBar({
                    items: [
                        { template: '<span id="template"></span>' }
                    ]
                }).data("kendoToolBar");
            } catch (error) {
                assert.isOk(false, "JS error is thrown");
            }

            assert.isOk(true, "No JS error is thrown");
        });

        it("Template content is wrapped inside a <div> tag", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>' }
                ]
            }).data("kendoToolBar");

            assert.equal($("#template").parent().prop("tagName"), "DIV");
        });

        it("UID is attached to the template's wrapper element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>' }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#template").parent().data("uid"));
        });

        it("Text in template that is not wrapped in an HTML element is rendered", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    id: "foo",
                    template: "<span>foo</span>bar"
                }]
            }).data("kendoToolBar");

            assert.equal($("#foo").text(), "foobar");
        });

        /* TEMPLATES */

        it("attributes are applied to the wrapper element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>', attributes: { "class": "foo", "data-test": "test" } }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#template").parent().hasClass("foo"));
            assert.equal($("#template").parent().data("test"), "test");
        });

        it("id is applied to the wrapper element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>', id: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#foo").length);
            assert.isOk($("#foo").hasClass("foo"));
        });

        /* MISC */
        it("DOM click event of disabled button is prevented", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            container.click(function(e) {
                assert.isOk(e.isDefaultPrevented(), "enable false does not prevent the click");
            });

            click(button);
        });

        it("overflow button group selected state is reset after selection change", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup",
                        buttons: [
                            { text: "foo", id: "foo", togglable: true, group: "foo", selected: true },
                            { text: "bar", id: "bar", togglable: true, group: "foo" },
                            { text: "baz", id: "baz", togglable: true, group: "foo" }
                        ]
                    }
                ]
            });

            container.data("kendoToolBar").toggle((container.find("#bar")));

            assert.isOk(!$("#foo").hasClass("k-state-active"), 1);
            assert.isOk($("#bar").hasClass("k-state-active"), 2);
            assert.isOk(!$("#baz").hasClass("k-state-active"), 3);

            assert.isOk(!$("#foo_overflow").hasClass("k-state-active"), 4);
            assert.isOk($("#bar_overflow").hasClass("k-state-active"), 5);
            assert.isOk(!$("#baz_overflow").hasClass("k-state-active"), 6);
        });

    });
}());
