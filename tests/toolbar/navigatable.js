(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    var keys = kendo.keys;

    describe("Toolbar: keyboard navigation: ", function() {
        beforeEach(function() {
            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);

            $.fn.press = function(key, shiftKey, altKey, target) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: target || this
                });
            };

            $.fn.bubblePress = function(key, shiftKey, altKey, delegateTarget) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: this[0],
                    delegateTarget: delegateTarget || this
                });
            };
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.getKendoToolBar().destroy();
            }

            container.remove();
        });

        it("altKey + down arrow opens the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    {
                        type: "buttonGroup",
                        buttons: [
                            { id: "btn1", text: "A" },
                            { id: "btn2", text: "B" }
                        ]
                    },
                    { type: "button", id: "baz", text: "baz", overflow: "always" }
                ]
            }).data("kendoToolBar");

            $(".k-toolbar-overflow-button")[0].focus();
            $(".k-toolbar-overflow-button").press(keys.DOWN, false, true);

            assert.isOk(toolbar.overflowMenu.element.is(":visible"));
        });

        it("end moves focus to the last button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" },
                    { type: "button", id: "baz", text: "baz" }
                ]
            }).data("kendoToolBar");

            $("#foo")[0].focus();
            $("#foo").press(keys.END);

            assert.isOk($(document.activeElement).is("#baz"));
        });

        it("home moves focus to the first button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" },
                    { type: "button", id: "baz", text: "baz" }
                ]
            }).data("kendoToolBar");

            $("#baz")[0].focus();
            $("#baz").press(keys.HOME);

            assert.isOk($(document.activeElement).is("#foo"));
        });

        it("home and end does not move focus from inputs", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { template: '<input id="field1" value="Text data here" />' },
                    { type: "button", id: "baz", text: "baz" }
                ]
            }).data("kendoToolBar");

            $("#field1")[0].focus();
            $("#field1").press(keys.HOME);

            assert.isOk($(document.activeElement).is("#field1"));

            $("#field1").press(keys.END);

            assert.isOk($(document.activeElement).is("#field1"));
        });

        it("splitButton navigation triggers close and open events", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                close: function(e) {
                    assert.isOk(true, "close event triggered.");
                },
                open: function(e) {
                    assert.isOk(true, "open event triggered.");
                }
            });

            var splitButton = $("#foo");
            var popupElement = $("#splitButton_optionlist");
            var option = $("#option1");

            splitButton[0].focus();
            // open popup
            splitButton.press(keys.DOWN, false, true);
            // close popup
            option.bubblePress(keys.UP, false, true, popupElement);
            // open popup
            splitButton.press(keys.DOWN, false, true);
            // close popup
            option.bubblePress(keys.TAB, false, false, popupElement);
        });

        it("splitButotn popup is not opened when disabled", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", enable: false, menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function(e) {
                    assert.isOk(true, "open event triggered.");
                }
            });

            var splitButton = $("#foo");

            splitButton[0].focus();
            splitButton.press(keys.DOWN, false, true);
        });

        it("dropDownButton navigation triggers close and open events", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                close: function(e) {
                    assert.isOk(true, "close event triggered.");
                },
                open: function(e) {
                    assert.isOk(true, "open event triggered.");
                }
            });

            var dropDownButton = $("#foo");
            var popupElement = $("#dropDownButton_optionlist");
            var option = $("#option1");

            dropDownButton[0].focus();
            // open popup
            dropDownButton.press(keys.DOWN, false, true);
            // close popup
            option.bubblePress(keys.UP, false, true, popupElement);
            // open popup
            dropDownButton.press(keys.DOWN, false, true);
            // close popup
            option.bubblePress(keys.TAB, false, false, popupElement);
        });

        it("dropDownButton popup is not opened when disabled", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", enable: false, menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function(e) {
                    assert.isOk(true, "open event triggered.");
                }
            });

            var dropDownButton = $("#foo");

            dropDownButton[0].focus();
            dropDownButton.press(keys.DOWN, false, true);
        });

        it("focusin should not throw exception when only overflowAnchor is available", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" },
                    { type: "button", id: "bar", text: "bar", overflow: "always" }
                ]
            });

            try {
                container.trigger("focusin");
                assert.isOk(true);
            } catch (error) {
                assert.isOk(false);
            }
        });

        it("right arrow moves focus to the overflow popup anchor if the activeElement is last focusable", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" },
                    { type: "button", id: "baz", text: "baz", overflow: "always" }
                ]
            }).data("kendoToolBar");

            $("#bar")[0].focus();
            $("#bar").press(keys.RIGHT);

            assert.isOk($(document.activeElement).is(".k-toolbar-overflow-button"));
        });

        it("left arrow moves focus from overflowAnchor to the last focusable element in the ToolBar", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    {
                        type: "buttonGroup",
                        buttons: [
                            { id: "btn1", text: "A" },
                            { id: "btn2", text: "B" }
                        ]
                    },
                    { type: "button", id: "baz", text: "baz", overflow: "always" }
                ]
            }).data("kendoToolBar");

            $(".k-toolbar-overflow-button")[0].focus();
            $(".k-toolbar-overflow-button").press(keys.LEFT);

            assert.isOk(document.activeElement.id, "btn2");
        });
    });
}());
