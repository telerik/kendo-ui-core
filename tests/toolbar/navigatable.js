(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    var keys = kendo.keys;

    module("Toolbar: keyboard navigation: ", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);

            $.fn.press = function (key, shiftKey, altKey) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: this
                });
            };
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
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

})();
