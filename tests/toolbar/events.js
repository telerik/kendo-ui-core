(function() {
    var container,
        ToolBar = kendo.ui.ToolBar,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup;

    function click(element) {
        element.trigger(MOUSEDOWN);
        element.trigger(MOUSEUP);
    }

    module("Toolbar: Events: ", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }

            if ($("#toolbar2").data("kendoToolBar")) {
                $("#toolbar2").kendoToolBar("destroy");
            }
        }
    });

    test("click event is fired", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ],
            click: function() {
                ok(true, "Click event is fired");
            }
        });

        click(container.find("#foo"));
    });

    test("click event is not fired for disabled buttons", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ],
            click: function() {
                ok(false, "Click event should not be fired for disabled button.");
            }
        });

        click(container.find("#foo"));
    });

    test("click on toggleButton changes its state", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(!button.hasClass("k-state-checked"));
        click(button);
        ok(button.hasClass("k-state-checked"), "Button receives k-state-checked class after click");
    });

    test("click on a toggleButton's icon changes the button state", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", icon: "foo" }
            ]
        });

        var button = container.find("#foo");
        ok(!button.hasClass("k-state-checked"));

        click(container.find("span.k-i-foo"));
        ok(button.hasClass("k-state-checked"), "Button receives k-state-checked class after click");
    });

    test("click on selected toggleButton deselects it", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        click(button);
        ok(button.hasClass("k-state-checked"));

        click(button);
        ok(!button.hasClass("k-state-checked"));
    });

    test("click on disabled toggleButton does not change its state", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo", enable: false }
            ]
        });

        var button = container.find("#foo");

        click(button);
        ok(!button.hasClass("k-state-checked"), "Button state is not changed");
    });

    test("click on disabled toggleButton does not trigger the toggle event", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo", enable: false }
            ],
            toggle: function(e) {
                ok(false, "Toggle event should not fire for disabled buttons");
            }
        });

        var button = container.find("#foo");

        click(button);
    });

    test("click on toggleButton triggers toggle event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo" }
            ],
            toggle: function(e) {
                ok(true, "Toggle event is clicked");
            }
        });

        var button = container.find("#foo");

        click(button);
    });

    test("preventng the toggle event does not change button state", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo" }
            ],
            toggle: function(e) {
                e.preventDefault();
            }
        });

        var button = container.find("#foo");

        click(button);
        ok(!button.hasClass("k-state-checked"));
    });

    test("selecting toggle button that belongs to a group will deselect other buttons from the same group", 4, function() {
        container.kendoToolBar({
            items: [
                { type: "button", toggle: true, text: "foo", group: "foo" },
                { type: "button", toggle: true, text: "bar", group: "foo", selected: true }
            ]
        });

        var buttons = container.find(".k-toggle-button");

        click(buttons.eq(0));

        ok(buttons.eq(0).hasClass("k-state-checked"), "First button is selected");
        ok(!buttons.eq(1).hasClass("k-state-checked"), "Second button is deselected");

        click(buttons.eq(1));

        ok(!buttons.eq(0).hasClass("k-state-checked"), "First button is deselected");
        ok(buttons.eq(1).hasClass("k-state-checked"), "Second button is selected");
    });

    test("click on splitButton triggers click event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            click: function(e) {
                ok(true, "Click event is fired");
            }
        });

        var button = container.find("#foo a:first");

        click(button);
    });

    test("click on arrow button opens the popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find("#foo").data("kendoPopup");

        click(button);

        ok(popup.visible());
    });

    test("second click at the arrow button closes the popup", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find("#foo").data("kendoPopup");

        click(button);
        ok(popup.visible());

        click(button);
        ok(!popup.visible());
    });

    test("click on the splitButton does NOT open the popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a:first");
        var popup = container.find("#foo").data("kendoPopup");

        click(button);
        ok(!popup.visible());
    });

    test("click on the arrow button does NOT fire the click event", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            click: function() {
                ok(false, "Click event should not trigger!");
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");

        click(button);
    });

    test("opening the splitButton popup triggers open event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            open: function() {
                ok(true, "Open event is triggered");
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");

        click(button);
    });

    test("open event can be prevented", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            open: function(e) {
                e.preventDefault();
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find(".k-split-button").data("kendoPopup");

        click(button);

        ok(!popup.visible());
    });

    test("closing the splitButton popup triggers close event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            close: function() {
                ok(true, "Close event is triggered");
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");

        click(button); //open
        click(button); //close
    });

    test("close event can be prevented", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", items: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            close: function(e) {
                e.preventDefault();
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find(".k-split-button").data("kendoPopup");

        click(button); //open
        click(button); //close

        ok(popup.visible());
    });

    /* OVERFLOW CONTAINER */

    test("clicking a button inside action overflow triggers the click event", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ],
            click: function(e) {
                ok(true, "Click event is triggered");
            }
        }).data("kendoToolBar");

        var button = toolbar.popup.element.find("#foo_overflow");

        click(button);
    });

    test("click on toggleButton (overflow) changes its state", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", toggle: true, id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        var button = toolbar.popup.element.find("#foo_overflow");

        ok(!button.hasClass("k-state-checked"));
        click(button);
        ok(button.hasClass("k-state-checked"), "Button receives k-state-checked class after click");
    });

    test("click event is not fired for disabled buttons (overflow)", 0, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ],
            click: function() {
                ok(false, "Click event should not be fired for disabled button.");
            }
        }).data("kendoToolBar");

        click(toolbar.popup.element.find("#foo"));
    });

    test("click event is fired only for the current widget instance when more than one widget is added to the page", 1, function() {
        var toolbar1 = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ],
            click: function() {
                ok(true, "Click event is fired");
            }
        }).data("kendoToolBar");

        $("<div id='toolbar2' />").appendTo(QUnit.fixture);

        var toolbar2 = $("#toolbar2").kendoToolBar({
            items: [
                { type: "button", id: "bar", text: "bar" }
            ],
            click: function() {
                ok(false, "Click event should not be fired");
            }
        }).data("kendoToolBar");

        click(container.find("#foo"));
    });

})();
