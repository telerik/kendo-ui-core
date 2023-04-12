(function() {
    var container,
        ToolBar = kendo.ui.ToolBar,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup;

    function click(element) {
        element.trigger("click");
    }

    describe("Toolbar: Events: ", function() {
        beforeEach(function() {

            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.getKendoToolBar().destroy();
            }

            if ($("#toolbar2").data("kendoToolBar")) {
                $("#toolbar2").kendoToolBar("destroy");
            }
        });

        it("click event is fired", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ],
                click: function() {
                    assert.isOk(true, "Click event is fired");
                }
            });

            click(container.find("#foo"));
        });

        it("click event defined at button level is fired", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        id: "foo",
                        text: "foo",
                        click: function(e) {
                            assert.isOk(true, "Click event is fired");
                        }
                    }
                ]
            });

            click(container.find("#foo"));
        });

        it("both click events (toolbar and button level) are fired", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        id: "foo",
                        text: "foo",
                        click: function() {
                            assert.isOk(true, "Click event (button level) is fired");
                        }
                    }
                ],
                click: function() {
                    assert.isOk(true, "Click event (toolbar level) is fired");
                }
            });

            click(container.find("#foo"));
        });

        it("click event is not fired for disabled buttons", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ],
                click: function() {
                    assert.isOk(false, "Click event should not be fired for disabled button.");
                }
            });

            click(container.find("#foo"));
        });

        it("click event (button level) is not fired for disabled buttons", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        id: "foo",
                        text: "foo",
                        enable: false,
                        click: function() {
                            assert.isOk(false, "Click event should not be fired for disabled button.");
                        }
                    }
                ]
            });

            click(container.find("#foo"));
        });

        it("click on toggleButton changes its state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(!button.hasClass("k-selected"));
            click(button);
            assert.isOk(button.hasClass("k-selected"), "Button receives k-selected class after click");
        });

        it("click on a toggleButton's icon changes the button state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", icon: "plus" }
                ]
            });

            var button = container.find("#foo");
            assert.isOk(!button.hasClass("k-selected"));

            click(container.find("span.k-i-plus, span.k-svg-i-plus"));
            assert.isOk(button.hasClass("k-selected"), "Button receives k-selected class after click");
        });

        it("click on selected toggleButton deselects it", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            click(button);
            assert.isOk(button.hasClass("k-selected"));

            click(button);
            assert.isOk(!button.hasClass("k-selected"));
        });

        it("click on disabled toggleButton does not change its state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            click(button);
            assert.isOk(!button.hasClass("k-selected"), "Button state is not changed");
        });

        it("click on disabled toggleButton does not trigger the toggle event", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo", enable: false }
                ],
                toggle: function(e) {
                    assert.isOk(false, "Toggle event should not fire for disabled buttons");
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on disabled toggleButton does not trigger the toggle event (button level)", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        togglable: true,
                        id: "foo",
                        text: "foo",
                        enable: false,
                        toggle: function(e) {
                            assert.isOk(false, "Toggle event should not fire for disabled buttons");
                        }
                    }
                ]
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on toggleButton triggers toggle event", function(done) {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ],
                toggle: function(e) {
                    assert.isOk(true, "Toggle event is clicked");
                    done();
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on toggleButton triggers toggle event (button level)", function(done) {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        togglable: true,
                        id: "foo",
                        text: "foo",
                        toggle: function(e) {
                            assert.isOk(true, "Toggle event is clicked");
                            done();
                        }
                    }
                ]
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on toggleButton in overflow menu triggers toggle event (button level)", function(done) {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        togglable: true,
                        id: "foo",
                        text: "foo",
                        overflow: "always",
                        toggle: function(e) {
                            assert.isOk(true, "Toggle event is clicked");
                            done();
                        }
                    }
                ]
            }).getKendoToolBar();

            var button = toolbar.overflowMenu.element.find("#foo_overflow");

            click(button);
        });

        it("selecting toggle button that belongs to a group will deselect other buttons from the same group", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, text: "foo", group: "foo" },
                    { type: "button", togglable: true, text: "bar", group: "foo", selected: true }
                ]
            });

            var buttons = container.find(".k-toggle-button");

            click(buttons.eq(0));

            assert.isOk(buttons.eq(0).hasClass("k-selected"), "First button is selected");
            assert.isOk(!buttons.eq(1).hasClass("k-selected"), "Second button is deselected");

            click(buttons.eq(1));

            assert.isOk(!buttons.eq(0).hasClass("k-selected"), "First button is deselected");
            assert.isOk(buttons.eq(1).hasClass("k-selected"), "Second button is selected");
        });

        it("click on splitButton triggers click event", function(done) {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                click: function(e) {
                    assert.isOk(true, "Click event is fired");
                    done();
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on splitButton item triggers click event", function(done) {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton",
                        id: "foo",
                        text: "foo",
                        menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ],
                        click: function() {
                            assert.isOk(true, "Click event is fired");
                            done();
                        }
                    }
                ]
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var popup = slitButton.menu._popup;
            var button = popup.element.find("#option1");

            click(button);
        });

        it("click on splitButton triggers click event when in overflow", function(done) {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", overflow: "always", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ],
                        click: function(e) {
                            assert.isOk(true, "Click event is fired");
                            done();
                        }
                    }
                ]
            }).data("kendoToolBar");

            var button = toolbar.overflowMenu.element.find("#foo_overflow");

            click(button);
        });

        // it("click on splitButton item triggers click event when in overflow", function(done) {
        //     var toolbar = container.kendoToolBar({
        //         items: [
        //             {
        //                 type: "splitButton", id: "foo", text: "foo", overflow: "always", menuButtons: [
        //                     { id: "option1", text: "option1" },
        //                     { id: "option2", text: "option2" }
        //                 ],
        //                 click: function(e) {
        //                     assert.isOk(true, "Click event is fired");
        //                     done();
        //                 }
        //             }
        //         ]
        //     }).data("kendoToolBar");

        //     var button = toolbar.overflowMenu.element.find("#option1_overflow");

        //     click(button);
        // });

        // it("click on dropDownButton item triggers click event when in overflow", function(done) {
        //     var toolbar = container.kendoToolBar({
        //         items: [
        //             {
        //                 type: "dropDownButton", id: "foo", text: "foo", overflow: "always", menuButtons: [
        //                     { id: "option1", text: "option1" },
        //                     { id: "option2", text: "option2" }
        //                 ],
        //                 click: function(e) {
        //                     assert.isOk(true, "Click event is fired");
        //                     done();
        //                 }
        //             }
        //         ]
        //     }).data("kendoToolBar");

        //     var button = toolbar.overflowMenu.element.find("#option1_overflow");

        //     click(button);
        // });

        it("click on arrow button opens the popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ]
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var button = slitButton.arrowButton;
            var popup = slitButton.menu._popup;

            click(button);

            assert.isOk(popup.visible());
        });

        it("second click at the arrow button closes the popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ]
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var button = slitButton.arrowButton;
            var popup = slitButton.menu._popup;

            click(button);
            assert.isOk(popup.visible());

            click(button);
            assert.isOk(!popup.visible());
        });

        it("click on the splitButton does NOT open the popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ]
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var button = container.find("#foo");
            var popup = slitButton.menu._popup;

            click(button);
            assert.isOk(!popup.visible());
        });

        it("click on the arrow button does NOT fire the click event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                click: function() {
                    assert.isOk(false, "Click event should not trigger!");
                }
            });

            var button = container.find("#foo_wrapper a.k-split-button-arrow");

            click(button);
        });

        it("opening the splitButton popup triggers open event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function() {
                    assert.isOk(true, "Open event is triggered");
                }
            });

            var button = container.find("#foo_wrapper a.k-split-button-arrow");

            click(button);
        });

        it("open event can be prevented", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function(e) {
                    e.preventDefault();
                }
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var button = slitButton.arrowButton;
            var popup = slitButton.menu._popup;

            click(button);

            assert.isOk(!popup.visible());
        });

        it("closing the splitButton popup triggers close event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "splitButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                close: function() {
                    assert.isOk(true, "Close event is triggered");
                }
            });

            var button = container.find("#foo_wrapper a.k-split-button-arrow");

            click(button); //open
            click(button); //close
        });

        it("close event can be prevented", function() {
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
                    e.preventDefault();
                }
            });

            var slitButton = container.find("#foo").data("kendoSplitButton");
            var button = slitButton.arrowButton;
            var popup = slitButton.menu._popup;

            click(button); //open
            click(button); //close

            assert.isOk(popup.visible());
        });

        it("click on button opens the popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find("#foo").data("kendoDropDownButton");
            var popup = dropDownButton.menu._popup;

            click(dropDownButton.element);

            assert.isOk(popup.visible());
        });

        it("second click at the button closes the popup", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ]
            });

            var dropDownButton = container.find("#foo").data("kendoDropDownButton");
            var button = dropDownButton.element;
            var popup = dropDownButton.menu._popup;

            click(button);
            assert.isOk(popup.visible());

            click(button);
            assert.isOk(!popup.visible());
        });

        it("click on the button does NOT fire the click event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                click: function() {
                    assert.isOk(false, "Click event should not trigger!");
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("opening the dropDownButton popup triggers open event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function() {
                    assert.isOk(true, "Open event is triggered");
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("open event can be prevented", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                open: function(e) {
                    e.preventDefault();
                }
            });

            var dropDownButton = container.find("#foo").data("kendoDropDownButton");
            var button = dropDownButton.element;
            var popup = dropDownButton.menu._popup;

            click(button);

            assert.isOk(!popup.visible());
        });

        it("closing the dropDownButton popup triggers close event", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                close: function() {
                    assert.isOk(true, "Close event is triggered");
                }
            });

            var button = container.find("#foo");

            click(button); //open
            click(button); //close
        });

        it("close event can be prevented", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "dropDownButton", id: "foo", text: "foo", menuButtons: [
                            { id: "option1", text: "option1" },
                            { id: "option2", text: "option2" }
                        ]
                    }
                ],
                close: function(e) {
                    e.preventDefault();
                }
            });

            var dropDownButton = container.find("#foo").data("kendoDropDownButton");
            var button = dropDownButton.element;
            var popup = dropDownButton.menu._popup;

            click(button); //open
            click(button); //close

            assert.isOk(popup.visible());
        });

        /* OVERFLOW CONTAINER */

        it("clicking a button inside action overflow triggers the click event", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ],
                click: function(e) {
                    assert.isOk(true, "Click event is triggered");
                }
            }).data("kendoToolBar");

            var button = toolbar.overflowMenu.element.find("#foo_overflow > .k-button");

            click(button);
        });

        it("click event is not fired for disabled buttons (overflow)", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", enable: false }
                ],
                click: function() {
                    assert.isOk(false, "Click event should not be fired for disabled button.");
                }
            }).data("kendoToolBar");

            click(toolbar.overflowMenu.element.find("#foo"));
        });

        it("click event is fired only for the current widget instance when more than one widget is added to the page", function() {
            var toolbar1 = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ],
                click: function() {
                    assert.isOk(true, "Click event is fired");
                }
            }).data("kendoToolBar");

            $("<div id='toolbar2' />").appendTo(Mocha.fixture);

            var toolbar2 = $("#toolbar2").kendoToolBar({
                items: [
                    { type: "button", id: "bar", text: "bar" }
                ],
                click: function() {
                    assert.isOk(false, "Click event should not be fired");
                }
            }).data("kendoToolBar");

            click(container.find("#foo"));
        });

        it("click event is NOT fired when overflow anchor is pressed", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" },
                    { type: "button", text: "always", overflow: "always" }
                ],
                click: function() {
                    assert.isOk(false, "Click event is fired");
                }
            }).data("kendoToolBar");

            var overflowAnchor = toolbar.element.find(".k-toolbar-overflow-button");

            click(overflowAnchor);
        });

        it("clicking the overflow anchor fires overflowOpen event", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" },
                    { type: "button", text: "always", overflow: "always" }
                ],
                overflowOpen: function() {
                    assert.isOk(true, "overflowOpen event is fired");
                }
            }).data("kendoToolBar");

            var overflowAnchor = toolbar.element.find(".k-toolbar-overflow-button");

            click(overflowAnchor);
        });

        it("overflowOpen event can be prevented", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" },
                    { type: "button", text: "always", overflow: "always" }
                ],
                overflowOpen: function(e) {
                    e.preventDefault();
                }
            }).data("kendoToolBar");

            var overflowAnchor = toolbar.element.find(".k-toolbar-overflow-button");

            click(overflowAnchor);

            assert.isOk(toolbar.overflowMenu.element.is(":hidden"));
        });

        it("closing the overflow popup container fires overflowClose event", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" },
                    { type: "button", text: "always", overflow: "always" }
                ],
                overflowClose: function() {
                    assert.isOk(true, "overflowClose event is fired");
                }
            }).data("kendoToolBar");

            var overflowAnchor = toolbar.element.find(".k-toolbar-overflow-button");

            toolbar.overflowMenu.open();

            click(overflowAnchor);
        });

        it("overflowClose event can be prevented", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", text: "foo" },
                    { type: "button", text: "always", overflow: "always" }
                ],
                overflowClose: function(e) {
                    e.preventDefault();
                }
            }).data("kendoToolBar");

            var overflowAnchor = toolbar.element.find(".k-toolbar-overflow-button");

            toolbar.overflowMenu.open();
            click(overflowAnchor);

            assert.isOk(toolbar.overflowMenu.element.is(":visible"));
        });

        it("_overflow suffix is removed from the ID in click event data", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo" }
                ],
                click: function(e) {
                    assert.equal(e.id, "foo", "_overflow is removed.");
                }
            }).data("kendoToolBar");

            var button = toolbar.overflowMenu.element.find("#foo_overflow > .k-button");

            click(button);
        });

        it("clicking on a template button does not throw JavaScript error", function() {
            var toolbar = container.kendoToolBar({
                items: [{ template: () => "<input type='button' class='k-button' sprite-css-class='k-tool-icon k-i-align-left'/>" }]
            });

            try {
                click($("input.k-button"));
            } catch (e) {
                assert.isOk(false, "Error is thrown");
            }
        });

        if (!kendo.support.browser.mozilla) {
            it("navigates to the specified url on click", function() {
                container.kendoToolBar({
                    items: [
                        { type: "button", id: "foo", text: "foo", url: "#foo" }
                    ]
                });

            container.find("#foo")[0].click();

                assert.isOk(window.location.href.indexOf("#foo") !== -1);
            });
        }
    });
}());
