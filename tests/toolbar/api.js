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

    test("remove method removes a button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        }).data("kendoToolBar");

        toolbar.remove("#foo");

        equal(toolbar.element.find(".k-button").length, 0, "Button is removed from the toolbar");
        equal(toolbar.popup.element.children("li").length, 0, "Button is removed from the overflow container");
    });

    test("remove method removes buttonGroup", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                ] }
            ]
       }).data("kendoToolBar");

       toolbar.remove(toolbar.element.find(".k-button-group").first());

       equal(toolbar.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the toolbar");
       equal(toolbar.popup.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the overflow container");
    });

    test("remove method removes splitButton", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", items: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.remove($("#splitButton"));

       equal(toolbar.element.find(".k-split-button").length, 0, "SplitButton is removed from the toolbar");
       equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
    });

    test("remove method removes separator", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
       }).data("kendoToolBar");

       toolbar.remove(toolbar.element.find(".k-separator"));

        equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
        equal(toolbar.popup.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
    });

})();
