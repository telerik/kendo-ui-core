(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: Events: ", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
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

        container.find("#foo").trigger("click");
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

        container.find("#foo").trigger("click");
    });

    test("click on toggleButton changes its state", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        ok(!button.hasClass("k-state-checked"));
        button.trigger("click");
        ok(button.hasClass("k-state-checked"), "Button receives k-state-checked class after click");
    });

    test("click on a toggleButton's icon changes the button state", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", icon: "foo" }
            ]
        });

        var button = container.find("#foo");
        ok(!button.hasClass("k-state-checked"));

        container.find("span.k-i-foo").trigger("click");
        ok(button.hasClass("k-state-checked"), "Button receives k-state-checked class after click");
    });

    test("click on selected toggleButton deselects it", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo" }
            ]
        });

        var button = container.find("#foo");

        button.trigger("click");
        ok(button.hasClass("k-state-checked"));

        button.trigger("click");
        ok(!button.hasClass("k-state-checked"));
    });

    test("click on disabled toggleButton does not change its state", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo", enable: false }
            ]
        });

        var button = container.find("#foo");

        button.trigger("click");
        ok(!button.hasClass("k-state-checked"), "Button state is not changed");
    });

    test("click on disabled toggleButton does not trigger the toggle event", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo", enable: false }
            ],
            toggle: function(e) {
                ok(false, "Toggle event should not fire for disabled buttons");
            }
        });

        var button = container.find("#foo");

        button.trigger("click");
    });

    test("click on toggleButton triggers toggle event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo" }
            ],
            toggle: function(e) {
                ok(true, "Toggle event is clicked");
            }
        });
        
        var button = container.find("#foo");

        button.trigger("click");
    });

    test("preventng the toggle event does not change button state", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", id: "foo", text: "foo" }
            ],
            toggle: function(e) {
                e.preventDefault();
            }
        });
        
        var button = container.find("#foo");

        button.trigger("click");
        ok(!button.hasClass("k-state-checked"));
    });

    test("selecting toggle button that belongs to a group will deselect other buttons from the same group", 4, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo", group: "foo" },
                { type: "toggleButton", text: "bar", group: "foo", selected: true }
            ]
        });

        var buttons = container.find(".k-toggle-button");

        buttons.eq(0).trigger("click");

        ok(buttons.eq(0).hasClass("k-state-checked"), "First button is selected");
        ok(!buttons.eq(1).hasClass("k-state-checked"), "Second button is deselected");
        
        buttons.eq(1).trigger("click");

        ok(!buttons.eq(0).hasClass("k-state-checked"), "First button is deselected");
        ok(buttons.eq(1).hasClass("k-state-checked"), "Second button is selected");
    });

    test("click on splitButton triggers click event", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", options: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            click: function(e) {
                ok(true, "Click event is fired");
            }
        });

        var button = container.find("#foo a:first");

        button.trigger("click");
    });

    test("click on arrow button opens the popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", options: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find("#foo").data("kendoPopup");

        button.trigger("click");

        ok(popup.visible());
    });

    test("second click at the arrow button closes the popup", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", options: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a.k-split-button-arrow");
        var popup = container.find("#foo").data("kendoPopup");

        button.trigger("click");
        ok(popup.visible());

        button.trigger("click");
        ok(!popup.visible());
    });

    test("click on the splitButton does NOT open the popup", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", options: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ]
        });

        var button = container.find("#foo a:first");
        var popup = container.find("#foo").data("kendoPopup");

        button.trigger("click");
        ok(!popup.visible());
    });

    test("click on the arrow button does NOT fire the click event", 0, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "foo", text: "foo", options: [
                    { id: "option1", text: "option1" },
                    { id: "option2", text: "option2" }
                ] }
            ],
            click: function() {
                ok(false, "Click event should not trigger!");
            }
        });

        var button = container.find("#foo a.k-split-button-arrow");

        button.trigger("click");
    });

})();
