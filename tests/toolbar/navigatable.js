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
                container.kendoToolBar("destroy");
            }
        });

        it("select and enter on split button", function() {
            var flag = 0;
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        id: "mainButton",
                        text: "Split Button",
                        menuButtons: [
                            { text: "Action 1", id: "action1" },
                            { text: "Action 2", id: "action2" },
                            { text: "Action 3", id: "action3" }
                        ]
                    }
                ],
                click: function() {
                    flag++
                }
            });

            container[0].focus();
            container.press(keys.ENTER, null, null, container.find(".k-split-button"));
            assert.equal(flag, 1)
        });

        it("focuses first tool if it is a button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "foo");
        });

        it("focuses first button of a button group if first tool is a button group", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup",
                        buttons: [
                            { id: "foo", text: "Foo" },
                            { id: "bar", text: "Bar" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "foo");
        });

        it("focuses first tool if it is a split button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        text: "Main",
                        id: "foo",
                        menuButtons: [
                            { text: "Item 1", id: "id1" },
                            { text: "Item 2", id: "id2" },
                            { text: "Item 3", id: "id3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "foo_wrapper", "focuses split button wrapper");
        });

        it("focuses first focusable item in template if item is a template", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: "<input type='text' id='foo' />" }
                ]
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "foo");
        });

        it("focuses first focusable item if first item is not focusable", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: "<div id='foo'>foo</div>" },
                    { template: "<input type='text' id='bar' />" }
                ]
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "bar");
        });

        it("focuses first focusable item if first item is not focusable and resizable: false", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: "<div id='foo'>foo</div>" },
                    { template: "<input type='text' id='bar' />" }
                ],
                resizable: false
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "bar");
        });

        it("focuses no item if none of the items is focusable and resizable: false", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: "<span class='btn k-button'>foo</span>" },
                    { template: "<span class='btn k-button'>bar</span>" }
                ],
                resizable: false
            }).data("kendoToolBar");

            toolbar.element[0].focus();

            assert.equal(document.activeElement.id, "toolbar");
        });

        it("tab moves focus to the overflow popup anchor if the activeElement is last focusable", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" },
                    { type: "button", id: "baz", text: "baz", overflow: "always" }
                ]
            }).data("kendoToolBar");

            $("#bar")[0].focus();
            $("#bar").press(keys.TAB);

            assert.isOk($(document.activeElement).is(".k-overflow-anchor"));
        });

        it("shift + tab moves focus from overflowAnchor to the last focusable element in the ToolBar", function() {
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

            $(".k-overflow-anchor")[0].focus();
            $(".k-overflow-anchor").press(keys.TAB, true);

            assert.isOk(document.activeElement.id, "btn2");
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

            $(".k-overflow-anchor")[0].focus();
            $(".k-overflow-anchor").press(keys.DOWN, false, true);

            assert.isOk(toolbar.popup.element.is(":visible"));
        });

        it("overflow popup focuses the first item when opened", function(done) {
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

            toolbar.popup.bind("activate", function() {
                assert.equal(document.activeElement.text, "baz");
                done();
            });

            $(".k-overflow-anchor")[0].focus();
            $(".k-overflow-anchor").press(keys.DOWN, false, true);
        });

        it("shift + tab moves focus from first focusable element in toolbar to last focusable element before toolbar", function() {
            var spacerDiv = $("<div><input type='text' id='input1' /><input type='text' id='input2' /></div>").prependTo(Mocha.fixture);
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            $("#foo.k-button")[0].focus();
            $("#foo.k-button").press(keys.TAB, true);

            assert.equal(document.activeElement.id, "input2");
            spacerDiv.remove();
        });

        it("shift + tab should not take overflow anchor into account when resizable is false", function() {
            var getPrevFocusable = spy();
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" }
                ],
                resizable: false
            }).data("kendoToolBar");
            toolbar._getPrevFocusable = getPrevFocusable;

            $("#bar.k-button")[0].focus();
            $("#bar.k-button").press(keys.TAB, true);

            assert.isOk(!getPrevFocusable.calls);
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
                    assert.isOk(true, "close event triggered.")
                },
                open: function(e) {
                    assert.isOk(true, "open event triggered.")
                }
            });

            var splitButton = $("#foo_wrapper");
            var popupElement = $("#splitButton_optionlist");
            var option = $("#option1")

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
                    assert.isOk(true, "open event triggered.")
                }
            });

            var splitButton = $("#foo_wrapper");

            splitButton[0].focus();
            splitButton.press(keys.DOWN, false, true);
        });

        it("focus with only overflowAnchor should focus it", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" },
                    { type: "button", id: "bar", text: "bar", overflow: "always" }
                ]
            }).data("kendoToolBar");

            container[0].focus();

            assert.isOk(toolbar.overflowAnchor.is(":focus"));
        });

        it("shift+tab with only overflowAnchor should find previous focusable element", function() {
            var getPrevFocusable = spy();
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always" },
                    { type: "button", id: "bar", text: "bar", overflow: "always" }
                ]
            }).data("kendoToolBar");
            toolbar._getPrevFocusable = getPrevFocusable;

            toolbar.overflowAnchor[0].focus();
            toolbar.overflowAnchor.press(keys.TAB, true)

            assert.isOk(getPrevFocusable.calls);
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
    });
}());
