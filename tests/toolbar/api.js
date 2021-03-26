(function() {
    var container,
        ToolBar = kendo.ui.ToolBar,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup;

    function click(element) {
        element.trigger(MOUSEDOWN);
        element.trigger(MOUSEUP);
    }

    describe("Toolbar: API: ", function() {
        beforeEach(function() {

            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        });

        it("remove method removes a button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo");

            assert.equal(toolbar.element.find("#foo").length, 0, "Button is removed from the toolbar");
            assert.equal(toolbar.popup.element.children("li").length, 0, "Button is removed from the overflow container");
        });

        it("remove method removes buttonGroup", function() {
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

            toolbar.remove(toolbar.element.find(".k-button-group").first());

            assert.equal(toolbar.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the toolbar");
            assert.equal(toolbar.popup.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the overflow container");
        });

        it("remove method removes splitButton by the ID of its main button", function() {
            var toolbar = container.kendoToolBar({
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
            }).data("kendoToolBar");

            toolbar.remove($("#splitButton"));

            assert.equal(toolbar.element.find(".k-split-button").length, 0, "SplitButton is removed from the toolbar");
            assert.equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
        });

        it("remove method removes splitButton with 'overflow: always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", overflow: "always", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.remove($("#splitButton_overflow"));

            assert.equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
        });

        it("remove method removes splitButton with 'overflow: auto'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", overflow: "auto", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.remove($("#splitButton"));

            assert.equal(toolbar.element.find(".k-split-button").length, 0, "SplitButton is removed from the toolbar");
            assert.equal(toolbar.popup.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
        });

        it("remove method removes separator", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "separator" }
                ]
            }).data("kendoToolBar");

            toolbar.remove(toolbar.element.find(".k-separator"));

            assert.equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
            assert.equal(toolbar.popup.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
        });

        it("remove method removes separator by ID", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "separator", id: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo");

            assert.equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
            assert.equal(toolbar.popup.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
        });

        it("remove method removes button with overflow: 'always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo_overflow");

            assert.equal(toolbar.element.find("#foo").length, 0, "Button is removed");
            assert.equal(toolbar.popup.element.find("#foo_overflow").length, 0, "Button is removed");
        });

        it("remove method removes template items by their ID", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { template: '<span id="template"></span>', id: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo");
            assert.equal(toolbar.element.find("#template").length, 0);
        });

        it("remove method removes overflowTemplate items by their ID", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { overflowTemplate: '<span id="template"></span>', id: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo_overflow");
            assert.equal(toolbar.popup.element.find("#foo_overflow").length, 0);
        });

        it("remove method removes template and overflow template items by their ID", function() {
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
            assert.equal(toolbar.element.find("#template").length, 0);
            assert.equal(toolbar.popup.element.find("#template_overflow").length, 0);
        });

        it("enable method enables button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo");

            assert.isOk(!$("#foo").hasClass("k-state-disabled"), "Toolbar button does not have k-state-disabled class");
            assert.isOk(!toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button does not have k-state-disabled class");
        });

        it("enable method disables button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: true }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo", false);

            assert.isOk($("#foo").hasClass("k-state-disabled"), "Toolbar button have k-state-disabled class");
            assert.isOk(toolbar.popup.element.children().first().hasClass("k-state-disabled"), "Overflow button have k-state-disabled class");
        });

        it("enable method disables button with overflow: 'always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always", enable: true }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo_overflow", false);

            assert.isOk($("#foo_overflow").hasClass("k-state-disabled"), "Overflow button have k-state-disabled class");
        });

        it("enable method disables SplitButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
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

            assert.isOk(!popup.visible(), "popup does not open");
            assert.isOk($("#splitButton").hasClass("k-state-disabled"));
        });

        it("enable method disables menuButton from SplitButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#option2", false);

            assert.isOk($("#option2").hasClass("k-state-disabled"));
            assert.isOk($("#option2_overflow").hasClass("k-state-disabled"));
        });

        it("get selected item from group returns the selected toggle button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true, group: "foo" },
                    { type: "button", id: "bar", text: "bar", togglable: true, group: "foo", selected: true },
                    { type: "button", id: "baz", text: "baz", togglable: true, group: "foo" }
                ]
            }).data("kendoToolBar");

            var selected = toolbar.getSelectedFromGroup("foo");

            assert.equal(selected.attr("id"), "bar");
        });

        it("Changing the toggle state of a button is propagated to the twin element located in the command overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo", true);
            assert.isOk($("#foo").hasClass("k-state-active"));
            assert.isOk($("#foo_overflow > .k-button").hasClass("k-state-active"));
        });

        it("Changing the toggle state of an overflow button is propagated to the twin element located in the toolbar wrapper", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            assert.isOk($("#foo").hasClass("k-state-active"));
            assert.isOk($("#foo_overflow > .k-button").hasClass("k-state-active"));
        });

        it("toggle method selects togglable button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            assert.isOk($("#foo").hasClass("k-state-active"));
            assert.isOk($("#foo_overflow > .k-button").hasClass("k-state-active"));
        });

        it("toggle method deselects togglable button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            toolbar.toggle("#foo_overflow", false);
            assert.isOk(!$("#foo").hasClass("k-state-active"));
            assert.isOk(!$("#foo_overflow > .k-button").hasClass("k-state-active"));
        });

        it("toggle method respects flag 'false'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo", false);
            assert.isOk(!$("#foo").hasClass("k-state-active"));
            assert.isOk(!$("#foo_overflow > .k-button").hasClass("k-state-active"));
        });

        it("Hide method hides a button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" },
                    { type: "button", id: "bar", text: "bar" }
                ]
            }).data("kendoToolBar");

            toolbar.hide("#foo");

            assert.isOk($("#foo").hasClass("k-hidden"));
            assert.isOk($("#foo").hasClass("k-state-hidden"));
            assert.isOk($("#foo").is(":hidden"));

            assert.isOk($("#foo_overflow").closest("li").hasClass("k-overflow-hidden"));
            assert.isOk($("#foo_overflow").is(":hidden"));
        });

        it("Hide method hides a button from Button group", function() {
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
            assert.isOk($("#foo").is(":hidden"));

            assert.isOk($("#foo_overflow").closest("li").hasClass("k-overflow-hidden"));
            assert.isOk($("#foo_overflow").is(":hidden"));
        });

        it("Hide method hides a button from SplitButton", function() {
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
            assert.isOk($("#foo").is(":hidden"));

            assert.isOk($("#foo_overflow").is(":hidden"));
        });

        it("Hide method hides a SplitButton", function() {
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
            assert.isOk($("div.k-split-button").is(":hidden"));

            assert.isOk($("li.k-split-button").hasClass("k-overflow-hidden"));
            assert.isOk($("li.k-split-button").is(":hidden"));
        });

        it("After hiding a button the button group updates k-group-start button", function() {
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

            toolbar.hide("#btn1");
            assert.isOk($("#btn2").hasClass("k-group-start"));

            assert.isOk($("#btn2_overflow").hasClass("k-group-start"));
        });

        it("After hiding a button the button group updates k-group-end button", function() {
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

            toolbar.hide("#btn3");
            assert.isOk($("#btn2").hasClass("k-group-end"));

            assert.isOk($("#btn2_overflow").hasClass("k-group-end"));
        });

        it("Hide method hides a SplitButton", function() {
            var toolbar = container.kendoToolBar({
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
            }).data("kendoToolBar");

            toolbar.hide($("#splitButton_wrapper"));

            assert.isOk($("#splitButton_wrapper").hasClass("k-hidden"));
            assert.isOk($("#splitButton_wrapper").hasClass("k-state-hidden"));
        });

        it("Show method shows hidden button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", hidden: true, text: "foo" },
                    { type: "button", id: "bar", text: "bar" }
                ]
            }).data("kendoToolBar");

            toolbar.show("#foo");

            assert.isOk(!($("#foo").hasClass("k-hidden")));
            assert.isOk(!($("#foo").hasClass("k-state-hidden")));
            assert.isOk($("#foo").is(":visible"));

            assert.isOk(($("#foo_overflow").hasClass("k-overflow-hidden")));
        });

        it("Show method shows hidden button from Button group", function() {
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
            assert.isOk($("#foo").is(":visible"));

            assert.isOk($("#foo_overflow").is(":hidden"));
        });

        it("Show method shows SplitButton", function() {
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
            assert.isOk($("#splitButton_wrapper").is(":visible"));
        });

        it("Show method shows hidden button in SplitButton", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    type: "splitButton",
                    id: "splitButton",
                    text: "split button",
                    menuButtons: [
                        { text: "foo", id: "foo" },
                        { text: "bar", id: "bar", hidden: true }
                    ]
                }]
            }).data("kendoToolBar");

            toolbar.show($("#bar"));
            assert.isOk(!$("#bar").hasClass(".k-hidden"));
        });

        it("After showing hidden button the button group updates k-group-start button", function() {
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

            toolbar.show("#btn1");
            assert.isOk($("#btn1").hasClass("k-group-start"));
        });

        it("After showing hidden button the button group updates k-group-end button", function() {
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

            toolbar.show("#btn3");
            assert.isOk($("#btn3").hasClass("k-group-end"));
        });

        it("Show method shows hidden SplitButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", hidden: true, id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.show($("#splitButton_wrapper"));

            assert.isOk(!($("#splitButton_wrapper").hasClass("k-hidden")));
            assert.isOk(!($("#splitButton_wrapper").hasClass("k-state-hidden")));
        });

        it("toggle method toggles splitButton's togglabale option", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "splitButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1", togglable: true, group: "myGroup" },
                            { id: "option2", text: "Option 2", togglable: true, group: "myGroup" },
                            { id: "option3", text: "Option 3", togglable: true, group: "myGroup" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.toggle($("#option1"), true);

            assert.isOk($("#option1").hasClass("k-state-active"));

            toolbar.toggle($("#option2"), true);

            assert.isOk(!$("#option1").hasClass("k-state-active"));
            assert.isOk($("#option2").hasClass("k-state-active"));
        });

    });
}());
