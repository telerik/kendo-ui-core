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
                container.getKendoToolBar().destroy();
            }
        });

        /* TOOLBAR */

        it("toolbar element has a k-toolbar class", function() {
            container.kendoToolBar();

            assert.isOk(container.hasClass("k-toolbar"));
        });

        it("toolbar element has a k-toolbar-md class by default", function() {
            container.kendoToolBar();

            assert.isOk(container.hasClass("k-toolbar-md"));
        });

        it("toolbar element sets the proper sizing class", function() {
            container.kendoToolBar({
                size: "small"
            });

            assert.isOk(container.hasClass("k-toolbar-sm"));
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

        it("by default the button does not have k-disabled class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(!button.hasClass("k-disabled"));
        });

        it("button with enable: false receives k-disabled class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-disabled"));
        });

        it("splitbutton with enable: false receives k-disabled class", function() {
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
            var arrowButton = mainbutton.next();

            assert.isOk(mainbutton.hasClass("k-disabled"));
            assert.isOk(arrowButton.hasClass("k-disabled"));
        });

        it("dropDownButton with enable: false receives k-disabled class", function() {
            container.kendoToolBar({
                items: [{
                    type: "dropDownButton",
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

            assert.isOk(mainbutton.hasClass("k-disabled"));
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

            assert.isOk(button.hasClass("k-button-solid-primary"));
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

        it("spriteCssClass adds a k-icon-button class to empty button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", spriteCssClass: "foo bar" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-icon-button"));
        });

        it("icon prepends a span element with corresponding class(es) to the button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "plus" }
                ]
            });

            var icon = container.find("#foo").children("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.is(".k-i-plus, .k-svg-i-plus"));
        });

        it("icon adds a k-icon-button class to button with no text", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-icon-button"));
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

        it("imageUrl adds a k-icon-button class to empty button element", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", imageUrl: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(button.hasClass("k-icon-button"));
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
            assert.isOk(toolbar.overflowMenu.element.find("#foo_overflow").length);
        });

        it("button element with overflow: never is not rendered in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "never" }
                ]
            }).data("kendoToolBar");

            assert.isOk(container.find("#foo").length);
            assert.isOk(!toolbar.overflowMenu.element.find("#foo_overflow").length);
        });

        it("button element with overflow: always is not rendered in the toolbar container", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            assert.isOk(!container.find("#foo").length);
            assert.isOk(toolbar.overflowMenu.element.find("#foo_overflow").length);
        });

        it("button element in overflow popup has class k-overflow-button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            assert.isOk(toolbar.overflowMenu.element.find(".k-menu-item").length);
        });

        it("button element in overflow popup is wrapped inside a <li> tag", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.overflowMenu.element.find(".k-menu-item");

            assert.equal(button.prop("tagName"), "LI");
        });

        it("button receives data-uid attribute", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.overflowMenu.element.children().eq(0);

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
            var overflowButton = toolbar.overflowMenu.element.children().eq(0);

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
            var overflowButton = toolbar.overflowMenu.element.children().eq(0);

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
            var overflowButton = toolbar.overflowMenu.element.children().eq(0);

            assert.equal(button.text(), "");
            assert.equal(overflowButton.text(), "foo");
        });

        it("button with showIcon: both has icon both in toolbar and overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "plus", showIcon: "both" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").find("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.is(".k-i-plus, .k-svg-i-plus"));

            icon = toolbar.overflowMenu.element.find("#foo_overflow").find("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.is(".k-i-plus, .k-svg-i-plus"));
        });

        it("button with showIcon: toolbar has icon only in toolbar", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "plus", showIcon: "toolbar" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").children("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.is(".k-i-plus, .k-svg-i-plus"));

            icon = toolbar.overflowMenu.element.find(".k-link.k-overflow-button").children("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 0);
        });

        it("button with showIcon: overflow has icon only in overflow container", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", icon: "plus", showIcon: "overflow" }
                ]
            }).data("kendoToolBar");

            var icon = toolbar.element.find("#foo").find("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 0);

            icon = toolbar.overflowMenu.element.find("#foo_overflow").find("span.k-icon, span.k-svg-icon");

            assert.equal(icon.length, 1);
            assert.isOk(icon.is(".k-i-plus, .k-svg-i-plus"));
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

            var button = toolbar.overflowMenu.element.find("#foo_overflow");
            assert.isOk(button.hasClass("foo"));
        });

        it("options.attributes does not remove build-in overflow button attributes", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", attributes: { "class": "foo" } }
                ]
            }).data("kendoToolBar");

            var button = toolbar.overflowMenu.element.find("#foo_overflow");
            assert.isOk(button.hasClass("k-item"));
            assert.isOk(button.hasClass("foo"));
        });

        it("button is initially hidden if hidden option is set to true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", hidden: true }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.is(":hidden"));

            var overflowButton = toolbar.overflowMenu.element.find("#foo_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
        });

        it("applies the proper sizing class to the button", function() {
            container.kendoToolBar({
                size: "small",
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            });

            assert.isOk(container.find("#foo").hasClass("k-button-sm"));
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

        it("by default toggleButton does not have k-selected class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo" }
                ]
            });

            assert.isOk(!container.find(".k-toggle-button.k-selected").length);
        });

        it("toggleButton with selected: true receives k-selected class", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo", selected: true },
                    { type: "button", togglable: true, text: "bar", selected: true, overflow: "always" }
                ]
            });

            assert.isOk(container.find(".k-toggle-button.k-selected").length);
            assert.equal($(".k-link.k-selected").length, 2);
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
            assert.equal(container.find(".k-button-group").prop("tagName"), "SPAN", "ButtonGroup renders DIV element");
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

            component = toolbar.overflowMenu.element.find(".k-menu-item");
            assert.equal(component.length, 3);
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

            component = toolbar.overflowMenu.element.find(".k-menu-item");
            assert.equal(component.prop("tagName"), "LI");
            assert.equal(component.length, 3);
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

            component = toolbar.overflowMenu.element.find(".k-menu-item");
            assert.equal(component.prop("tagName"), "LI");
            assert.isOk(component.data("uid"));
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
            overflowButtons = toolbar.overflowMenu.element.find(".k-menu-item");

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
            assert.isOk(button1.hasClass("k-menu-item") && button1.hasClass("myClass"));
            var button2 = $("#btn2_overflow");
            assert.isOk(button2.hasClass("k-menu-item") && button1.hasClass("myClass"));
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

            var overflowButton = toolbar.overflowMenu.element.find("#btn2_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
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
        });

        it("applies the proper sizing class to the buttons in the ButtonGroup", function() {
            container.kendoToolBar({
                size: "large",
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

            assert.isOk(container.find(".k-button-group .k-button").hasClass("k-button-lg"));
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
            assert.equal($("#splitButton").data("kendoSplitButton").items().length, 4, "SplitButton dropdown contains correct amount of items");
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


            var splitButton = $(document.body).find("#splitButton").data("kendoSplitButton");
            assert.isOk(splitButton.menu._popup instanceof kendo.ui.Popup);
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

            var splitButton = container.find("#splitButton").data("kendoSplitButton");
            assert.isOk(splitButton.menu._popup instanceof kendo.ui.Popup);
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

            var splitButton = container.find("#splitButton").data("kendoSplitButton");

            assert.equal(splitButton.menu.list.attr("id"), "splitButton_buttonmenu");
        });

        it("SplitButton and its popup receive auto generated ID if ID is not explicitly set", function() {
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

            var splitButton = container.find("#splitButton").data("kendoSplitButton");
            var list = splitButton.menu.list;

            assert.isOk(splitButton.element.attr("id"), "SplitButton has ID");
            assert.isOk(list.attr("id"), "Popup has ID");
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

            var splitButton = container.find(".k-split-button.k-button-group");
            assert.equal(splitButton.attr("data-overflow"), "never");
        });

        it("Overflow SplitButton renders li tag with buttons", function() {
            var toolbar = container.kendoToolBar({
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

            component = toolbar.overflowMenu.element.find(".k-menu-item");

            assert.equal(component.prop("tagName"), "LI");
            assert.equal(component.length, 4); //3 items + 1 main button
        });

        it("Overflow SplitButton items are wrapped in a li tag which has data-uid attribute", function() {
            var toolbar = container.kendoToolBar({
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

            component = toolbar.overflowMenu.element.find(".k-menu-item");

            assert.equal(component.prop("tagName"), "LI");
            assert.isOk(component.data("uid"));
        });

        it("SplitButton popup is as wide as the button wrapper", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var splitButton = container.find("#splitButton").data("kendoSplitButton");
            var arrowButton = splitButton.arrowButton;

            click(arrowButton);
            roughlyEqual(splitButton.wrapper.outerWidth(), splitButton.menu._popup.element.outerWidth(), 10);
        });

        it("options.attribute are attached to the main button", function() {
            container.kendoToolBar({
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
            container.kendoToolBar({
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

        it("default classes are preserved on menu buttons", function() {
            container.kendoToolBar({
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

            assert.isOk($("#btn1 > span").hasClass("k-link"));
            assert.isOk($("#btn2 > span").hasClass("k-link"));
            assert.isOk($("#btn3 > span").hasClass("k-link"));
            assert.isOk($("#btn1 > span").hasClass("k-menu-link"));
            assert.isOk($("#btn2 > span").hasClass("k-menu-link"));
            assert.isOk($("#btn3 > span").hasClass("k-menu-link"));
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

            var button = toolbar.element.find(".k-split-button.k-button-group");
            assert.isOk(button.hasClass("k-hidden"));
            assert.isOk(button.is(":hidden"));

            var overflowButton = toolbar.overflowMenu.element.find("#foo_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
        });

        it("applies the proper sizing class to the SplitButton", function() {
            var toolbar = container.kendoToolBar({
                size: "large",
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

            assert.isOk(container.find("#foo").hasClass("k-button-lg"));
        });

        /* DROPDOWN BUTTON */

        it("renders dropDownButton from JSON", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });

            assert.isOk(container.children(".k-menu-button").length, "DropDownButton element is rendered");
            assert.equal($("#dropDownButton").data("kendoDropDownButton").items().length, 4, "DropDownButton dropdown contains correct amount of items");
        });

        it("initializes kendoPopup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });


            var dropDownButton = $(document.body).find("#dropDownButton").data("kendoDropDownButton");
            assert.isOk(dropDownButton.menu._popup instanceof kendo.ui.Popup);
        });

        it("dropDownButton holds reference to its popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find("#dropDownButton").data("kendoDropDownButton");
            assert.isOk(dropDownButton.menu._popup instanceof kendo.ui.Popup);
        });

        it("dropDownButton applies ID and text options", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find(".k-button#dropDownButton");

            assert.isOk(dropDownButton.length, "ID is applied to the main button");
            assert.equal(dropDownButton.text(), "foo", "Text is applied");
        });

        it("DropDownButton sets id to the popup element", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find("#dropDownButton").data("kendoDropDownButton");

            assert.equal(dropDownButton.menu.list.attr("id"), "dropDownButton_buttonmenu");
        });

        it("DropDownButton and its popup receive auto generated ID if ID is not explicitly set", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find("#dropDownButton").data("kendoDropDownButton");
            var list = dropDownButton.menu.list;

            assert.isOk(dropDownButton.element.attr("id"), "DropDownButton has ID");
            assert.isOk(list.attr("id"), "Popup has ID");
        });

        it("DropDownButton element receives data-overflow attribute with set value", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", overflow: "never", text: "foo", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find(".k-menu-button");
            assert.equal(dropDownButton.attr("data-overflow"), "never");
        });

        it("Overflow DropDownButton renders li tag with buttons", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = toolbar.overflowMenu.element.find(".k-menu-item");

            assert.equal(component.prop("tagName"), "LI");
            assert.equal(toolbar.overflowMenu.element.find(".k-menu-item").length, 4);
            assert.isOk(toolbar.overflowMenu.element.find(".k-menu-item").first().hasClass("k-disabled"));
        });

        it("Overflow DropDownButton items are wrapped in a li tag which has data-uid attribute", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            component = toolbar.overflowMenu.element.find(".k-menu-item");

            assert.equal(component.prop("tagName"), "LI");
            assert.isOk(component.data("uid"));
        });

        it("DropDownButton popup is as wide as the button wrapper", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "Very long text for the button", menuButtons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var dropDownButton = container.find("#dropDownButton").data("kendoDropDownButton");
            var button = dropDownButton.element;

            click(button);

            roughlyEqual(dropDownButton.element.outerWidth(), dropDownButton.menu._popup.element.outerWidth(), 2);
        });

        it("options.attribute are attached to the main button", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", attributes: { "class": "foo" }, menuButtons: [
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
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
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

        it("default classes are preserved on menu buttons", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            assert.isOk($("#btn1 > span").hasClass("k-link"));
            assert.isOk($("#btn2 > span").hasClass("k-link"));
            assert.isOk($("#btn3 > span").hasClass("k-link"));
            assert.isOk($("#btn1 > span").hasClass("k-menu-link"));
            assert.isOk($("#btn2 > span").hasClass("k-menu-link"));
            assert.isOk($("#btn3 > span").hasClass("k-menu-link"));
        });

        it("dropDownButton is initially hidden if hidden option is set to true", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", hidden: true, menuButtons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find(".k-menu-button");
            assert.isOk(button.hasClass("k-hidden"));

            var overflowButton = toolbar.overflowMenu.element.find("#foo_overflow");
            assert.isOk(overflowButton.hasClass("k-hidden"));
        });

        it("applies the proper sizing class to the DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                size: "large",
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "btn1", text: "Btn1", attributes: { "class": "foo" } },
                            { id: "btn2", text: "Btn2", attributes: { "class": "bar" } },
                            { id: "btn3", text: "Btn3", attributes: { "class": "baz" } }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            assert.isOk(container.find("#foo").hasClass("k-button-lg"));
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

            var separator = toolbar.overflowMenu.element.find(".k-separator");

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

            assert.isOk(container.find(".k-toolbar-overflow-button").length, "Anchor element is rendered");
        });

        it("does not renders overflow anchor if resizable is set to false", function() {
            container.kendoToolBar({ resizable: false });

            assert.isOk(!container.find(".k-toolbar-overflow-button").length);
        });

        it("initializes command overflow popup menu", function() {
            var toolbar = container.kendoToolBar().data("kendoToolBar");

            assert.isOk(toolbar.overflowMenu instanceof kendo.ui.ContextMenu);
            assert.isOk(toolbar.overflowMenu.element.length);
        });

        it("does not initiaze popup menu if resizable is set to false", function() {
            var toolbar = container.kendoToolBar({
                resizable: false
            }).data("kendoToolBar");

            assert.isOk(!toolbar.overflowMenu);
        });

        it("button's wrapper with overflow: auto has k-hidden class", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" }
                ]
            }).data("kendoToolBar");

            var wrapper = toolbar.overflowMenu.element.children().first();
            assert.isOk(wrapper.hasClass("k-hidden"));
            assert.isOk(wrapper.is(":hidden"));
        });

        it("button's wrapper with overflow: always does not have k-hidden class", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            var wrapper = toolbar.overflowMenu.element.find(".k-button").parent();
            assert.isOk(!wrapper.hasClass("k-hidden"));
        });

        it("Same uid is attached to the toolbar component and corresponding overflow popup element", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.element.find("#foo");
            var overflowButton = toolbar.overflowMenu.element.find(">li:first");

            assert.isOk(button.data("uid") === overflowButton.data("uid"));
        });

        it("If a template command does not have overflowTemplate it is considered as overflow: never", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>' }
                ]
            }).data("kendoToolBar");

            assert.equal(toolbar.overflowMenu.element.children().length, 0);
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
                    template: () => "<span>foo</span>bar"
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
        it("click event of disabled button is prevented", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false, click: () => { assert.isOk(false); } }
                ]
            });

            var button = container.find("#foo");

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

            assert.isOk(!$("#foo").hasClass("k-selected"), 1);
            assert.isOk($("#bar").hasClass("k-selected"), 2);
            assert.isOk(!$("#baz").hasClass("k-selected"), 3);

            assert.isOk(!$("#foo_overflow .k-link").hasClass("k-selected"), 4);
            assert.isOk($("#bar_overflow .k-link").hasClass("k-selected"), 5);
            assert.isOk(!$("#baz_overflow .k-link").hasClass("k-selected"), 6);
        });

        it("split button has k-rounded-md class", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        menuButtons: [
                            { text: "foo", id: "foo", togglable: true, group: "foo", selected: true },
                            { text: "bar", id: "bar", togglable: true, group: "foo" },
                            { text: "baz", id: "baz", togglable: true, group: "foo" }
                        ]
                    }
                ]
            });

            var splitButton = $(".k-split-button");

            assert.isOk(splitButton.hasClass("k-rounded-md"));
        });

        it("split container has k-group k-menu-group k-reset k-menu-group-md classes", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        menuButtons: [
                            { text: "foo", id: "foo", togglable: true, group: "foo", selected: true },
                            { text: "bar", id: "bar", togglable: true, group: "foo" },
                            { text: "baz", id: "baz", togglable: true, group: "foo" }
                        ]
                    }
                ]
            });

            var splitContainer = $("[data-role=buttonmenu] > ul");

            assert.isOk(splitContainer.hasClass("k-group"));
            assert.isOk(splitContainer.hasClass("k-menu-group"));
            assert.isOk(splitContainer.hasClass("k-reset"));
            assert.isOk(splitContainer.hasClass("k-menu-group-md"));
        });

        it("items in split container k-item and k-menu-item classes", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        id: "splitButton",
                        menuButtons: [
                            { text: "foo", id: "foo", group: "foo" },
                            { text: "bar", id: "bar", group: "foo" },
                            { text: "baz", id: "baz", group: "foo" }
                        ]
                    }
                ]
            });

            var splitButton = $("#splitButton").data("kendoSplitButton");
            var items = splitButton.items();

            assert.equal(items.length, 3);

            items.each(function(i, el) {
                assert.isOk($(el).hasClass("k-item"));
                assert.isOk($(el).hasClass("k-menu-item"));
            });
        });

    });
}());
