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
                container.kendoToolBar("destroy");
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
                            assert.equal(e.sender, container.data("kendoToolBar"));
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

        it("click event (button level) is not fired for buttons localted in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        id: "foo",
                        text: "foo",
                        click: function() {
                            assert.isOk(false, "Click event should not be fired for disabled button.");
                        },
                        overflow: "auto"
                    }
                ]
            }).data("kendoToolBar");

            toolbar.popup.open();
            toolbar.enable("#foo", false);

            click(toolbar.popup.element.find("#foo_overflow"));
        });

        it("click event (button level) is not fired for initially disabled buttons localted in the overflow popup", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        id: "foo",
                        text: "foo",
                        click: function() {
                            assert.isOk(false, "Click event should not be fired for disabled button.");
                        },
                        enable: false,
                        overflow: "always"
                    }
                ]
            }).data("kendoToolBar");

            toolbar.popup.open();
            click(toolbar.popup.element.find("#foo_overflow"));
        });

        it("click on toggleButton changes its state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            assert.isOk(!button.hasClass("k-state-active"));
            click(button);
            assert.isOk(button.hasClass("k-state-active"), "Button receives k-state-active class after click");
        });

        it("click on a toggleButton's icon changes the button state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", icon: "foo" }
                ]
            });

            var button = container.find("#foo");
            assert.isOk(!button.hasClass("k-state-active"));

            click(container.find("span.k-i-foo"));
            assert.isOk(button.hasClass("k-state-active"), "Button receives k-state-active class after click");
        });

        it("click on selected toggleButton deselects it", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ]
            });

            var button = container.find("#foo");

            click(button);
            assert.isOk(button.hasClass("k-state-active"));

            click(button);
            assert.isOk(!button.hasClass("k-state-active"));
        });

        it("click on disabled toggleButton does not change its state", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo", enable: false }
                ]
            });

            var button = container.find("#foo");

            click(button);
            assert.isOk(!button.hasClass("k-state-active"), "Button state is not changed");
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

        it("click on toggleButton triggers toggle event", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ],
                toggle: function(e) {
                    assert.isOk(true, "Toggle event is clicked");
                }
            });

            var button = container.find("#foo");

            click(button);
        });

        it("click on toggleButton triggers toggle event (button level)", function() {
            container.kendoToolBar({
                items: [
                    {
                        type: "button",
                        togglable: true,
                        id: "foo",
                        text: "foo",
                        toggle: function(e) {
                            assert.isOk(true, "Toggle event is clicked");
                        }
                    }
                ]
            });

            var button = container.find("#foo");

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

            assert.isOk(buttons.eq(0).hasClass("k-state-active"), "First button is selected");
            assert.isOk(!buttons.eq(1).hasClass("k-state-active"), "Second button is deselected");

            click(buttons.eq(1));

            assert.isOk(!buttons.eq(0).hasClass("k-state-active"), "First button is deselected");
            assert.isOk(buttons.eq(1).hasClass("k-state-active"), "Second button is selected");
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

            var popup = container.find("#foo_wrapper").data("kendoPopup");
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

            var button = toolbar.popup.element.find("#foo_overflow");

            click(button);
        });

        it("click on splitButton item triggers click event when in overflow", function(done) {
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

            var button = toolbar.popup.element.find("#option1_overflow");

            click(button);
        });

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

            var button = container.find("#foo_wrapper a.k-split-button-arrow");
            var popup = container.find("#foo_wrapper").data("kendoPopup");

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

            var button = container.find("#foo_wrapper a.k-split-button-arrow");
            var popup = container.find("#foo_wrapper").data("kendoPopup");

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

            var button = container.find("#foo");
            var popup = container.find("#foo_wrapper").data("kendoPopup");

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

            var button = container.find("#foo_wrapper a.k-split-button-arrow");
            var popup = container.find(".k-split-button").data("kendoPopup");

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

            var button = container.find("#foo_wrapper a.k-split-button-arrow");
            var popup = container.find(".k-split-button").data("kendoPopup");

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

            var button = toolbar.popup.element.find("#foo_overflow > .k-button");

            click(button);
        });

        it("click on toggleButton (overflow) changes its state", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    { type: "button", togglable: true, id: "foo", text: "foo" }
                ]
            }).data("kendoToolBar");

            var button = toolbar.popup.element.find("#foo_overflow > .k-button");

            assert.isOk(!button.hasClass("k-state-active"));
            click(button);
            assert.isOk(button.hasClass("k-state-active"), "Button receives k-state-active class after click");
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

            click(toolbar.popup.element.find("#foo"));
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

            var overflowAnchor = toolbar.element.find(".k-overflow-anchor");

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

            var overflowAnchor = toolbar.element.find(".k-overflow-anchor");

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

            var overflowAnchor = toolbar.element.find(".k-overflow-anchor");

            click(overflowAnchor);

            assert.isOk(toolbar.popup.element.is(":hidden"));
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

            var overflowAnchor = toolbar.element.find(".k-overflow-anchor");

            toolbar.popup.toggle();

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

            var overflowAnchor = toolbar.element.find(".k-overflow-anchor");

            toolbar.popup.toggle();
            click(overflowAnchor);

            assert.isOk(toolbar.popup.element.is(":visible"));
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

            var button = toolbar.popup.element.find("#foo_overflow > .k-button");

            click(button);
        });

        it("clicking on a template button does not throw JavaScript error", function() {
            var toolbar = container.kendoToolBar({
                items: [{ template: "<input type='button' class='k-button' sprite-css-class='k-tool-icon k-i-align-left'/>" }]
            });

            try {
                click($("input.k-button"));
            } catch (e) {
                assert.isOk(false, "Error is thrown");
            }
        });

        it("navigates to the specified url on click", function() {
            container.kendoToolBar({
                items: [
                    { type: "button", id: "foo", text: "foo", url: "#foo" }
                ]
            });

            click(container.find("#foo"));
            assert.isOk(window.location.href.indexOf("#foo") !== -1);
        });

        it("click on overflow toggle button (part of group) selects it", function() {
            var toolbar = container.kendoToolBar({
                items: [
                    {
                        type: "buttonGroup",
                        buttons: [
                            { text: "Left", id: "left", togglable: true, group: "text-align" },
                            { text: "Center", id: "center", togglable: true, group: "text-align" },
                            { text: "Right", id: "right", togglable: true, group: "text-align" }
                        ]
                    }
                ]
            }).data("kendoToolBar");

            click($("#left_overflow"));

            assert.isOk($("#left").hasClass("k-state-active"));
            assert.isOk($("#left_overflow").hasClass("k-state-active"));
        });

    });
}());
