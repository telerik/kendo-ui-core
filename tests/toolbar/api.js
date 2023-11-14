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
                container.getKendoToolBar().destroy();
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
            assert.equal(toolbar.overflowMenu.element.children("li").length, 0, "Button is removed from the overflow container");
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
            assert.equal(toolbar.overflowMenu.element.find(".k-button-group").length, 0, "ButtonGroup is removed from the overflow container");
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
            assert.equal(toolbar.overflowMenu.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
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

            assert.equal(toolbar.overflowMenu.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
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
            assert.equal(toolbar.overflowMenu.element.find(".k-split-button").length, 0, "SplitButton is removed from the overflow container");
        });

        it("remove method removes dropDownButton by the ID of its main button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.remove($("#dropDownButton"));

            assert.equal(toolbar.element.find(".k-menu-button").length, 0, "DropDownButton is removed from the toolbar");
            assert.equal(toolbar.overflowMenu.element.find(".k-menu-button").length, 0, "DropDownButton is removed from the overflow container");
        });

        it("remove method removes dropDownButton with 'overflow: always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", overflow: "always", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.remove($("#dropDownButton_overflow"));

            assert.equal(toolbar.overflowMenu.element.find(".k-menu-button").length, 0, "DropDownButton is removed from the overflow container");
        });

        it("remove method removes dropDownButton with 'overflow: auto'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", overflow: "auto", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.remove($("#dropDownButton"));

            assert.equal(toolbar.element.find(".k-menu-button").length, 0, "DropDownButton is removed from the toolbar");
            assert.equal(toolbar.overflowMenu.element.find(".k-menu-button").length, 0, "DropDownButton is removed from the overflow container");
        });

        it("remove method removes separator", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "separator" }
                ]
            }).data("kendoToolBar");

            toolbar.remove(toolbar.element.find(".k-separator"));

            assert.equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
            assert.equal(toolbar.overflowMenu.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
        });

        it("remove method removes separator by ID", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "separator", id: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo");

            assert.equal(toolbar.element.find(".k-separator").length, 0, "Separator is removed from the toolbar");
            assert.equal(toolbar.overflowMenu.element.find(".k-separator").length, 0, "Separator is removed from the overflow container");
        });

        it("remove method removes button with overflow: 'always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", overflow: "always" }
                ]
            }).data("kendoToolBar");

            toolbar.remove("#foo_overflow");

            assert.equal(toolbar.element.find("#foo").length, 0, "Button is removed");
            assert.equal(toolbar.overflowMenu.element.find("#foo_overflow").length, 0, "Button is removed");
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
            assert.equal(toolbar.overflowMenu.element.find("#foo_overflow").length, 0);
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
            assert.equal(toolbar.overflowMenu.element.find("#template_overflow").length, 0);
        });

        it("enable method enables button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo");

            assert.isOk(!$("#foo").hasClass("k-disabled"), "Toolbar button does not have k-disabled class");
            assert.isOk(!toolbar.overflowMenu.element.children().first().hasClass("k-disabled"), "Overflow button does not have k-disabled class");
        });

        it("enable method disables button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: true }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo", false);

            assert.isOk($("#foo").hasClass("k-disabled"), "Toolbar button have k-disabled class");
            assert.isOk(toolbar.overflowMenu.element.children().first().hasClass("k-disabled"), "Overflow button have k-disabled class");
        });

        it("enable method disables button with overflow: 'always'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", overflow: "always", enable: true }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#foo_overflow", false);

            assert.isOk($("#foo_overflow").hasClass("k-disabled"), "Overflow button have k-disabled class");
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

            var popup = $("#splitButton").data("kendoSplitButton").menu._popup;

            click($(".k-split-button-arrow"));

            assert.isOk(!popup.visible(), "popup does not open");
            assert.isOk($("#splitButton").hasClass("k-disabled"));
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

            assert.isOk($("#option2").hasClass("k-disabled"));
            assert.isOk($("#option2_overflow").hasClass("k-disabled"));
        });

        it("enable method disables DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#dropDownButton", false);

            var popup = $("#dropDownButton").data("kendoDropDownButton").menu._popup;

            click($(".k-menu-button"));

            assert.isOk(!popup.visible(), "popup does not open");
            assert.isOk($("#dropDownButton").hasClass("k-disabled"));
        });

        it("enable method disables menuButton from DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.enable("#option2", false);

            assert.isOk($("#option2").hasClass("k-disabled"));
            assert.isOk($("#option2_overflow").hasClass("k-disabled"));
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
            assert.isOk($("#foo").hasClass("k-selected"));
            assert.isOk($("#foo_overflow > .k-menu-link").hasClass("k-selected"));
        });

        it("Changing the toggle state of an overflow button is propagated to the twin element located in the toolbar wrapper", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            assert.isOk($("#foo").hasClass("k-selected"));
            assert.isOk($("#foo_overflow > .k-menu-link").hasClass("k-selected"));
        });

        it("toggle method selects togglable button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            assert.isOk($("#foo").hasClass("k-selected"));
            assert.isOk($("#foo_overflow > .k-menu-link").hasClass("k-selected"));
        });

        it("toggle method deselects togglable button", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo_overflow", true);
            toolbar.toggle("#foo_overflow", false);
            assert.isOk(!$("#foo").hasClass("k-selected"));
            assert.isOk(!$("#foo_overflow > .k-button").hasClass("k-selected"));
        });

        it("toggle method respects flag 'false'", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", togglable: true }
                ]
            }).data("kendoToolBar");

            toolbar.toggle("#foo", false);
            assert.isOk(!$("#foo").hasClass("k-active"));
            assert.isOk(!$("#foo_overflow > .k-button").hasClass("k-active"));
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
            assert.isOk($("#foo").is(":hidden"));

            assert.isOk($("#foo_overflow").closest("li").hasClass("k-hidden"));
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

            assert.isOk($("#foo_overflow").closest("li").hasClass("k-hidden"));
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

            toolbar.overflowMenu.element.children().each((i, el) => {
                assert.isOk($(el).hasClass("k-hidden"));
                assert.isOk($(el).is(":hidden"));
            });
        });

        it("Hide method hides a button from DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    type: "dropDownButton",
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

        it("Hide method hides a DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    type: "dropDownButton",
                    text: "main",
                    menuButtons: [
                        { text: "foo", id: "foo" },
                        { text: "bar", id: "bar" }
                    ]
                }]
            }).data("kendoToolBar");

            toolbar.hide(".k-menu-button");
            assert.isOk($(".k-menu-button").is(":hidden"));

            toolbar.overflowMenu.element.children().each((i, el) => {
                assert.isOk($(el).hasClass("k-hidden"));
                assert.isOk($(el).is(":hidden"));
            });
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
        });

        it("Properly hide all buttons from a ButtonGroup in Overflow", function() {
            container.width(50);

            var toolbar = container.kendoToolBar({
                items: [
                    {
                        id: "test",
                        type: "buttonGroup",
                        buttons: [
                            { id: "btn1", text: "Btn1" },
                            { id: "btn2", text: "Btn2" },
                            { id: "btn3", text: "Btn3" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.hide("#test");

            assert.isOk($("#btn2_overflow").hasClass("k-hidden"));
            assert.isOk($("#btn2_overflow").hasClass("k-force-hidden"));
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

            toolbar.hide($("#splitButton"));

            assert.isOk($("#splitButton").parent().hasClass("k-hidden"));
        });

        it("Hide method hides a DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "dropDownButton", text: "Split Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.hide($("#dropDownButton"));

            assert.isOk($("#dropDownButton").hasClass("k-hidden"));
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

            assert.isOk(($("#foo_overflow").hasClass("k-hidden")));
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

            toolbar.show("#splitButton");
            //toolbar element is `div`, overflow element is `li`
            assert.isOk($("#splitButton").parent().is(":visible"));
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

        it("Show method shows DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    type: "dropDownButton",
                    id: "dropDownButton",
                    hidden: true,
                    text: "split button",
                    menuButtons: [
                        { text: "foo", id: "foo" },
                        { text: "bar", id: "bar" }
                    ]
                }]
            }).data("kendoToolBar");

            toolbar.show("#dropDownButton");
            assert.isOk($("#dropDownButton").is(":visible"));
        });

        it("Show method shows hidden button in DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [{
                    type: "dropDownButton",
                    id: "dropDownButton",
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

        it("Show method shows hidden DropDownButton", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", hidden: true, id: "dropDownButton", text: "DropDown Button", menuButtons: [
                            { id: "option1", text: "Option 1" },
                            { id: "option2", text: "Option 2" },
                            { id: "option3", text: "Option 3" },
                            { id: "option4", text: "Option 4" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            toolbar.show($("#dropDownButton_wrapper"));

            assert.isOk(!($("#dropDownButton_wrapper").hasClass("k-hidden")));
            assert.isOk(!($("#dropDownButton_wrapper").hasClass("k-state-hidden")));
        });

        it("add method inserts the new item before the overflowAnchor", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            toolbar.add({ type: "button", text: "New Button", id: "newButton" });

            assert.equal(toolbar.overflowAnchor.prev()[0], toolbar.element.find("#newButton")[0]);
        });

    });
}());
