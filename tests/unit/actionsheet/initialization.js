import '@progress/kendo-ui/src/kendo.actionsheet.js';

let ActionSheet = kendo.ui.ActionSheet,
    div,
    instance;

describe("kendo.ui.ActionSheet initialization", function() {

    function createInstance(options) {
        instance = new ActionSheet(div, $.extend(true, {}, {
            title: "Some title",
            items: [
                {
                    title: 'first item'
                },
                {
                    title: 'second item',
                    disabled: true
                }
            ]
        }, options));
    }

    function createInstanceWithViews(options, viewsConfig) {
        if (!viewsConfig) {
            viewsConfig = [];
        }

        instance = new ActionSheet(div, $.extend(true, {}, {
            views: [
                {
                    title: "Some title",
                    items: [
                        {
                            title: 'first item'
                        },
                        {
                            title: 'second item',
                            disabled: true
                        }
                    ],
                    ...viewsConfig[0]
                },
                {
                    title: "Some title",
                    actionButtons: [
                        {
                            text: "Cancel",
                            icon: "x"
                        },
                        {
                            text: "Save",
                            icon: "check",
                            primary: true
                        }
                    ],
                    ...viewsConfig[1]
                },
            ],
        }, options));
    }
    beforeEach(function() {
        div = $("<div style='color:green'></div>").appendTo(Mocha.fixture);

    });
    afterEach(function() {
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    it("widget should render a warapper element", function() {
        createInstance();

        instance.open();
        assert.isOk(instance.element.parents('.k-actionsheet-container').length);
    });

    it("widget should render a actionsheet views", function() {
        createInstanceWithViews();

        instance.open();
        assert.isOk(instance.element.children(".k-actionsheet-view").length === 2);
    });

    it("actionsheet view renders with items", function() {
        createInstanceWithViews();

        instance.open();
        const viewWithItems = instance._hasItems();

        assert.isOk(viewWithItems.wrapper.find(".k-actionsheet-item").length === 2);
    });

    it("actionsheet view renders with actionButtons", function() {
        createInstanceWithViews();

        instance.open();
        const viewWithActionButtons = instance.views[1];

        assert.isOk(viewWithActionButtons.wrapper.find("[ref-actionsheet-action-button]").length === 2);
    });

    it("each actionsheet view has title", function() {
        createInstanceWithViews();

        instance.open();

        const headers = instance._header;

        assert.isOk(headers.length === 2);
        assert.isOk(headers[0].text() === "Some title");
        assert.isOk(headers[1].text() === "Some title");
    });

    it("each actionsheet view has footer", function() {
        createInstanceWithViews({}, [{
            footerTemplate: () => document.createTextNode("Some footer")
        }, {
            actionButtons: [],
            footerTemplate: () => document.createTextNode("Some footer")
        }]);

        instance.open();

        const footers = instance._footer;

        assert.isOk(footers.length === 2);
        assert.isOk(footers[0].text() === "Some footer");
        assert.isOk(footers[1].text() === "Some footer");
    });

    it("each actionsheet view has content", function() {
        createInstanceWithViews({}, [{
            items: [],
            contentTemplate: () => document.createTextNode("Some content")
        }, {
            contentTemplate: () => document.createTextNode("Some content")
        }]);

        instance.open();

        const contents = instance._content;

        assert.isOk(contents.length === 2);
        assert.isOk(contents[0].text() === "Some content");
        assert.isOk(contents[1].text() === "Some content");
    });

    it("actionsheet addView()", function() {
        createInstance();

        assert.isOk(instance.views.length === 1);

        instance._addView({
            title: "Some title",
            contentTemplate: () => document.createTextNode("Some content"),
            actionButtons: [
                {
                    text: "Cancel",
                    icon: "x"
                },
                {
                    text: "Save",
                    icon: "check",
                    primary: true
                }
            ]
        });

        assert.isOk(instance.views.length === 2);
    });

    it("actionsheet removeView()", function() {
        createInstanceWithViews();

        assert.isOk(instance.views.length === 2);

        instance._removeView(instance.views[1]);

        assert.isOk(instance.views.length === 1);
    });

    it("widget should have an overlay element", function() {
        createInstance();
        assert.isOk(instance.element.parent().find('.k-overlay').length);
    });

    it("widget should add default values to missing item settings", function() {
        createInstance();
        assert.isOk(instance.views[0].options.items[0].group === "top");
        assert.isOk(instance.views[0].options.items[0].description === "");
        assert.isOk(instance.views[0].options.items[0].click === $.noop);
        assert.isOk(instance.views[0].options.items[0].iconClass === "");
        assert.isOk(instance.views[0].options.items[0].title === "first item");
    });

    it("widget should instanciate a popup", function() {
        createInstance();
        assert.isOk(instance.popup instanceof kendo.ui.Popup);
    });

    it("widget should have a header when a title is specified", function() {
        createInstance();
        assert.isOk(instance.wrapper.find('.k-actionsheet-title').length);
        assert.isOk(instance.wrapper.find('.k-actionsheet-title').text() === instance.options.title);
    });

    it("widget should not have a header when a title is not specified", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.isOk(!instance.wrapper.find('.k-actionsheet-title').length);
    });

    it("widget should add a .k-actionsheet-item element for every item", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item').length, 2);
    });

    it("widget should add icon element for items with specified icon class", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    iconClass: 'iconclass'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-icon').length, 1);
    });

    it("widget should not add icon element for items with no specified icon class", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-icon').length, 0);
    });

    it("widget should add a k-actionsheet-item-description element when description is specified", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    description: 'description'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-description').text(), "description");
    });

    it("widget should not add a k-actionsheet-item-description element when description is specified", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item'
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-description').length, 0);
    });

    it("click handler should be executed upon selection of an item", function() {
        let result = false;
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    click: function() {
                        result = true;
                    }
                },
                {
                    title: 'second item'
                }
            ]
        });

        instance.open();
        instance.wrapper.find('.k-actionsheet-item:eq(0)').click();

        assert.isOk(result);
    });

    it("should add a footer when an item belongs to the bottom group", function() {
        let result = false;
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    click: function() {
                        result = true;
                    }
                },
                {
                    title: 'second item',
                    group: "bottom"
                }
            ]
        });


        assert.isOk(instance.wrapper.find('hr').length);
    });

    it("should not add a footer when no item belongs to the bottom group", function() {
        let result = false;
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    click: function() {
                        result = true;
                    }
                },
                {
                    title: 'second item'
                }
            ]
        });


        assert.isOk(!instance.wrapper.find('.k-actionsheet-footer').length);
    });

    it("icon size and color should be applied as specified in the configuration", function() {
        instance = new ActionSheet(div, {
            items: [
                {
                    title: 'first item',
                    iconClass: 'iconclass',
                    iconSize: 50,
                    iconColor: "secondary"
                },
                {
                    title: 'second item'
                }
            ]
        });

        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-icon.k-text-secondary').length, 1);
        assert.equal(instance.wrapper.find('.k-actionsheet-item .k-actionsheet-item-icon.k-text-secondary').css("font-size"), "50px");
    });

    it("should add k-disabled to disabled items", function() {
        createInstance();

        assert.isOk(instance.wrapper.find('.k-disabled').length);
    });

    it("startButton should be rendered when configured in options", function() {
        createInstance({
            startButton: {
                icon: "chevron-left",
                click: function() { }
            }
        });

        instance.open();

        const startButton = instance.element.find("[data-ref-actionsheet-start-button]");
        assert.equal(startButton.length, 1, "Start button should be present in the header");
        assert.isOk(startButton.find(".k-svg-i-chevron-left").length, "Start button should have the specified icon");
    });

    it("startButton click handler should be executed when clicked", function() {
        let clicked = false;

        createInstance({
            startButton: {
                icon: "chevron-left",
                click: function() {
                    clicked = true;
                }
            }
        });

        instance.open();

        const startButton = instance.element.find("[data-ref-actionsheet-start-button]");
        startButton.click();

        assert.isOk(clicked, "Start button click handler should be executed");
    });

    it("should apply default animation for adaptive mode", function() {
        createInstance({
            adaptive: true
        });

        const animation = instance.popup.options.animation;

        assert.isOk(animation, "Animation should be defined");
        assert.isOk(animation.open, "Open animation should be defined");
        assert.equal(animation.open.effects, "slideIn:up", "Should use slideIn:up effect");
        assert.equal(animation.open.duration, 200, "Should have 200ms duration");
    });

    it("should allow custom animation configuration", function() {
        const customAnimation = {
            open: {
                effects: "fadeIn",
                duration: 300
            },
            close: {
                effects: "fadeOut",
                duration: 150
            }
        };

        createInstance({
            adaptive: true,
            animation: customAnimation
        });

        const animation = instance.popup.options.animation;

        assert.isOk(animation, "Animation should be defined");
        assert.equal(animation.open.effects, "fadeIn", "Should use custom open effect");
        assert.equal(animation.open.duration, 300, "Should use custom open duration");
        assert.equal(animation.close.effects, "fadeOut", "Should use custom close effect");
        assert.equal(animation.close.duration, 150, "Should use custom close duration");
    });

    it("should not use animation when not in adaptive mode", function() {
        createInstance({
            adaptive: false,
            animation: {
                open: {
                    effects: "fadeIn",
                    duration: 300
                }
            }
        });

        const animation = instance.popup.options.animation;

        assert.notEqual(animation.open.effects, "fadeIn", "Should not use adaptive animation");
    });
});

