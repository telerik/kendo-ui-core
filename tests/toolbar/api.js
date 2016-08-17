(function() {
    var container,
        ToolBar = kendo.ui.ToolBar,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup;

    function click(element) {
        element.trigger(MOUSEDOWN);
        element.trigger(MOUSEUP);
    }

    module("Toolbar: API: ", {
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

        equal(toolbar.element.find("#foo").length, 0, "Button is removed from the toolbar");
        equal(toolbar.popup.element.children("li").length, 0, "Button is removed from the overflow container");
    });

    test("remove method removes buttonGroup", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
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

    test("remove method removes splitButton by the ID of its main button", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
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

    test("remove method removes splitButton with 'overflow: always'", 1, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", overflow: "always", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.remove($("#splitButton_overflow"));

       equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
    });

    test("remove method removes splitButton with 'overflow: auto'", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", overflow: "auto", menuButtons: [
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

    test("remove method removes separator by ID", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "separator", id: "foo" }
            ]
       }).data("kendoToolBar");

       toolbar.remove("#foo");

        equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
        equal(toolbar.popup.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
    });

    test("remove method removes button with overflow: 'always'", 2, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", overflow: "always" }
            ]
       }).data("kendoToolBar");

       toolbar.remove("#foo_overflow");

       equal(toolbar.element.find("#foo").length, 0, "Button is removed");
       equal(toolbar.popup.element.find("#foo_overflow").length, 0, "Button is removed");
    });

    test("remove method removes template items by their ID", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { template: '<span id="template"></span>', id: "foo" }
            ]
        }).data("kendoToolBar");

        toolbar.remove("#foo");
        equal(toolbar.element.find("#template").length, 0);
    });

    test("remove method removes overflowTemplate items by their ID", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { overflowTemplate: '<span id="template"></span>', id: "foo" }
            ]
        }).data("kendoToolBar");

        toolbar.remove("#foo_overflow");
        equal(toolbar.popup.element.find("#foo_overflow").length, 0);
    });

    test("remove method removes template and overflow template items by their ID", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                {
                    template: '<span id="template"></span>',
                    overflowTemplate: '<span id="template_overflow"></span>',
                    overflow: "auto",
                    id: "foo"
                }
            ]
        }).data("kendoToolBar");

        toolbar.remove("#foo");
        equal(toolbar.element.find("#template").length, 0);
        equal(toolbar.popup.element.find("#template_overflow").length, 0);
    });

    test("enable method enables button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#foo");

        ok(!$("#foo").hasClass("k-state-disabled"), "Toolbar button does not have k-state-disabled class");
        ok(!toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button does not have k-state-disabled class");
    });

    test("enable method disables button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: true }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#foo", false);

        ok($("#foo").hasClass("k-state-disabled"), "Toolbar button have k-state-disabled class");
        ok(toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button have k-state-disabled class");
    });

    test("enable method disables button with overflow: 'always'", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", overflow: "always", enable: true }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#foo_overflow", false);

        ok($("#foo_overflow").hasClass("k-state-disabled"), "Overflow button have k-state-disabled class");
    });

    test("enable method disables SplitButton", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" }
                ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#splitButton", false);

        var popup = $("#splitButton").parent().data("kendoPopup");

        click($(".k-split-button-arrow"));

        ok(!popup.visible(), "popup does not open");
        ok($("#splitButton").hasClass("k-state-disabled"));
    });

    test("enable method disables menuButton from SplitButton", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" }
                ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.enable("#option2", false);

        ok($("#option2").hasClass("k-state-disabled"));
        ok($("#option2_overflow").hasClass("k-state-disabled"));
    });

    test("get selected item from group returns the selected toggle button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true, group: "foo" },
                { type: "button", id: "bar", text: "bar", togglable: true, group: "foo", selected: true },
                { type: "button", id: "baz", text: "baz", togglable: true, group: "foo" }
            ]
        }).data("kendoToolBar");

        var selected = toolbar.getSelectedFromGroup("foo");

        equal(selected.attr("id"), "bar");
    });

    test("Changing the toggle state of a button is propagated to the twin element located in the command overflow popup", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo", true);
        ok($("#foo").hasClass("k-state-active"));
        ok($("#foo_overflow > .k-button").hasClass("k-state-active"));
    });

    test("Changing the toggle state of an overflow button is propagated to the twin element located in the toolbar wrapper", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo_overflow", true);
        ok($("#foo").hasClass("k-state-active"));
        ok($("#foo_overflow > .k-button").hasClass("k-state-active"));
    });

    test("toggle method selects togglable button", function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo_overflow", true);
        ok($("#foo").hasClass("k-state-active"));
        ok($("#foo_overflow > .k-button").hasClass("k-state-active"));
    });

    test("toggle method deselects togglable button", function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo_overflow", true);
        toolbar.toggle("#foo_overflow", false);
        ok(!$("#foo").hasClass("k-state-active"));
        ok(!$("#foo_overflow > .k-button").hasClass("k-state-active"));
    });

    test("toggle method respects flag 'false'", function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", togglable: true }
            ]
        }).data("kendoToolBar");

        toolbar.toggle("#foo", false);
        ok(!$("#foo").hasClass("k-state-active"));
        ok(!$("#foo_overflow > .k-button").hasClass("k-state-active"));
    });

    test("Hide method hides a button", 4, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        toolbar.hide("#foo");

        ok($("#foo").hasClass("k-state-hidden"));
        ok($("#foo").is(":hidden"));

        ok($("#foo_overflow").closest("li").hasClass("k-overflow-hidden"));
        ok($("#foo_overflow").is(":hidden"));
    });

    test("Hide method hides a button from Button group", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [{
                type: "buttonGroup",
                buttons: [
                    { text: "foo", id: "foo" },
                    { text: "bar", id: "bar" }
                ]
            }]
        }).data("kendoToolBar");

        toolbar.hide("#foo");
        ok($("#foo").is(":hidden"));

        ok($("#foo_overflow").closest("li").hasClass("k-overflow-hidden"));
        ok($("#foo_overflow").is(":hidden"));
    });

    test("Hide method hides a button from SplitButton", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [{
                type: "splitButton",
                text: "main",
                menuButtons: [
                    { text: "foo", id: "foo" },
                    { text: "bar", id: "bar" }
                ]
            }]
        }).data("kendoToolBar");

        toolbar.hide("#foo");
        ok($("#foo").is(":hidden"));

        ok($("#foo_overflow").is(":hidden"));
    });

    test("Hide method hides a SplitButton", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [{
                type: "splitButton",
                text: "main",
                menuButtons: [
                    { text: "foo", id: "foo" },
                    { text: "bar", id: "bar" }
                ]
            }]
        }).data("kendoToolBar");

        //toolbar element is `div`, overflow element is `li`
        toolbar.hide("div.k-split-button");
        ok($("div.k-split-button").is(":hidden"));

        ok($("li.k-split-button").hasClass("k-overflow-hidden"));
        ok($("li.k-split-button").is(":hidden"));
    });

    test("After hiding a button the button group updates k-group-start button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.hide("#btn1");
        ok($("#btn2").hasClass("k-group-start"));

        ok($("#btn2_overflow").hasClass("k-group-start"));
    });

    test("After hiding a button the button group updates k-group-end button", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.hide("#btn3");
        ok($("#btn2").hasClass("k-group-end"));

        ok($("#btn2_overflow").hasClass("k-group-end"));
    });

    test("Hide method hides a SplitButton", 1, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.hide($("#splitButton_wrapper"));

       ok($("#splitButton_wrapper").hasClass("k-state-hidden"));
    });

    test("Show method shows hidden button", 3, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", hidden: true, text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        toolbar.show("#foo");

        ok(!($("#foo").hasClass("k-state-hidden")));
        ok($("#foo").is(":visible"));

        ok(($("#foo_overflow").hasClass("k-overflow-hidden")));
    });

    test("Show method shows hidden button from Button group", 2, function() {
        var toolbar = container.kendoToolBar({
            items: [{
                type: "buttonGroup",
                buttons: [
                    { text: "foo", hidden: true, id: "foo" },
                    { text: "bar", id: "bar" }
                ]
            }]
        }).data("kendoToolBar");

        toolbar.show("#foo");
        ok($("#foo").is(":visible"));

        ok($("#foo_overflow").is(":hidden"));
    });

    test("Show method shows SplitButton", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [{
                type: "splitButton",
                id: "splitButton",
                hidden: true,
                text: "split button",
                menuButtons: [
                    { text: "foo", id: "foo" },
                    { text: "bar", id: "bar" }
                ]
            }]
        }).data("kendoToolBar");

        toolbar.show("#splitButton_wrapper");
        //toolbar element is `div`, overflow element is `li`
        ok($("#splitButton_wrapper").is(":visible"));
    });

    test("After showing hidden button the button group updates k-group-start button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", hidden: true, text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.show("#btn1");
        ok($("#btn1").hasClass("k-group-start"));
    });

    test("After showing hidden button the button group updates k-group-end button", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1" },
                        { id: "btn2", text: "Btn2" },
                        { id: "btn3", hidden: true, text: "Btn3" }
                    ]
                }
            ]
        }).data("kendoToolBar");

        toolbar.show("#btn3");
        ok($("#btn3").hasClass("k-group-end"));
    });

    test("Show method shows hidden SplitButton", 1, function() {
       var toolbar = container.kendoToolBar({
            items: [
                { type: "splitButton", hidden: true, id: "splitButton", text: "Split Button", menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
       }).data("kendoToolBar");

       toolbar.show($("#splitButton_wrapper"));

       ok(!($("#splitButton_wrapper").hasClass("k-state-hidden")));
    });

})();
