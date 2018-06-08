(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    var keys = kendo.keys;

    module("Toolbar: keyboard navigation: ", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);

            $.fn.press = function (key, shiftKey, altKey, target) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: target || this
                });
            };

            $.fn.bubblePress = function (key, shiftKey, altKey, delegateTarget) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: this[0],
                    delegateTarget: delegateTarget || this
                });
            };
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    test("select and enter on split button", 1, function() {
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
            click: function () {
                flag++
            }
        });

        container.focus();
        container.press(keys.ENTER, null, null, container.find(".k-split-button"));
        equal(flag, 1)
    });

    test("focuses first tool if it is a button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        toolbar.element.focus();

        equal(document.activeElement.id, "foo");
    });

    test("focuses first button of a button group if first tool is a button group", 1, function() {
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

        toolbar.element.focus();

        equal(document.activeElement.id, "foo");
    });

    test("focuses first tool if it is a split button", 1, function() {
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

        toolbar.element.focus();

        equal(document.activeElement.id, "foo_wrapper", "focuses split button wrapper");
    });

    test("focuses first focusable item in template if item is a template", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: "<input type='text' id='foo' />" }
            ]
        }).data("kendoToolBar");

        toolbar.element.focus();

        equal(document.activeElement.id, "foo");
    });

    test("focuses first focusable item if first item is not focusable", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: "<div id='foo'>foo</div>" },
                { template: "<input type='text' id='bar' />" }
            ]
        }).data("kendoToolBar");

        toolbar.element.focus();

        equal(document.activeElement.id, "bar");
    });

    test("focuses first focusable item if first item is not focusable and resizable: false", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: "<div id='foo'>foo</div>" },
                { template: "<input type='text' id='bar' />" }
            ],
            resizable: false
        }).data("kendoToolBar");

        toolbar.element.focus();

        equal(document.activeElement.id, "bar");
    });

    test("focuses no item if none of the items is focusable and resizable: false", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: "<span class='btn k-button'>foo</span>" },
                { template: "<span class='btn k-button'>bar</span>" }
            ],
            resizable: false
        }).data("kendoToolBar");

        toolbar.element.focus();

        equal(document.activeElement.id, "toolbar");
    });

    test("tab moves focus to the overflow popup anchor if the activeElement is last focusable", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz", overflow: "always" }
            ]
        }).data("kendoToolBar");

        $("#bar").focus();
        $("#bar").press(keys.TAB);

        ok($(document.activeElement).is(".k-overflow-anchor"));
    });

    test("shift + tab moves focus from overflowAnchor to the last focusable element in the ToolBar", 1, function() {
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

        $(".k-overflow-anchor").focus();
        $(".k-overflow-anchor").press(keys.TAB, true);

        ok(document.activeElement.id, "btn2");
    });

    test("altKey + down arrow opens the overflow popup", 1, function() {
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

        $(".k-overflow-anchor").focus();
        $(".k-overflow-anchor").press(keys.DOWN, false, true);

        ok(toolbar.popup.element.is(":visible"));
    });

    test("overflow popup focuses the first item when opened", 1, function() {
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
            equal(document.activeElement.text, "baz");
        });

        $(".k-overflow-anchor").focus();
        $(".k-overflow-anchor").press(keys.DOWN, false, true);
    });

    test("shift + tab moves focus from first focusable element in toolbar to last focusable element before toolbar", 1, function() {
        var spacerDiv = $("<div><input type='text' id='input1' /><input type='text' id='input2' /></div>").prependTo(QUnit.fixture);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        $("#foo.k-button").focus();
        $("#foo.k-button").press(keys.TAB, true);

        equal(document.activeElement.id, "input2");
        spacerDiv.remove();
    });

    test("shift + tab should not take overflow anchor into account when resizable is false", 1, function() {
        var getPrevFocusable = spy();
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ],
            resizable: false
        }).data("kendoToolBar");
        toolbar._getPrevFocusable = getPrevFocusable;

        $("#bar.k-button").focus();
        $("#bar.k-button").press(keys.TAB, true);

        ok(!getPrevFocusable.calls);
    });

    test("end moves focus to the last button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" }
            ]
        }).data("kendoToolBar");

        $("#foo").focus();
        $("#foo").press(keys.END);

        ok($(document.activeElement).is("#baz"));
    });

    test("home moves focus to the first button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" }
            ]
        }).data("kendoToolBar");

        $("#baz").focus();
        $("#baz").press(keys.HOME);

        ok($(document.activeElement).is("#foo"));
    });

    test("home and end does not move focus from inputs", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { template: '<input id="field1" value="Text data here" />' },
                { type: "button", id: "baz", text: "baz" }
            ]
        }).data("kendoToolBar");

        $("#field1").focus();
        $("#field1").press(keys.HOME);

        ok($(document.activeElement).is("#field1"));

        $("#field1").press(keys.END);

        ok($(document.activeElement).is("#field1"));
    });

    test("splitButton navigation triggers close and open events", 4, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", menuButtons: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            close: function(e) {
                ok(true, "close event triggered.")
            },
            open: function(e) {
                ok(true, "open event triggered.")
            }
        });

        var splitButton = $("#foo_wrapper");
        var popupElement = $("#splitButton_optionlist");
        var option = $("#option1")

        splitButton.focus();
        // open popup
        splitButton.press(keys.DOWN, false, true);
        // close popup
        option.bubblePress(keys.UP, false, true, popupElement);
        // open popup
        splitButton.press(keys.DOWN, false, true);
        // close popup
        option.bubblePress(keys.TAB, false, false, popupElement);
    });

    test("splitButotn popup is not opened when disabled", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", enable:false, menuButtons: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            open: function(e) {
                ok(true, "open event triggered.")
            }
        });

        var splitButton = $("#foo_wrapper");

        splitButton.focus();
        splitButton.press(keys.DOWN, false, true);
    });
})();
