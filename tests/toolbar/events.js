(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: Events: ", {
        setup: function() {
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

})();
