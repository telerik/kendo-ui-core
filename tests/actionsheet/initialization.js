(function() {
    var ActionSheet = kendo.ui.ActionSheet,
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

        it("widget should have an overlay element", function() {
            createInstance();
            assert.isOk(instance.element.parent().find('.k-overlay').length);
        });

        it("widget should add default values to missing item settings", function() {
            createInstance();
            assert.isOk(instance.options.items[0].group === "top");
            assert.isOk(instance.options.items[0].description === "");
            assert.isOk(instance.options.items[0].click === $.noop);
            assert.isOk(instance.options.items[0].iconClass === "");
            assert.isOk(instance.options.items[0].title === "first item");
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
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
            var result = false;
            instance = new ActionSheet(div,{
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
            var result = false;
            instance = new ActionSheet(div,{
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
            var result = false;
            instance = new ActionSheet(div,{
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
            instance = new ActionSheet(div,{
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
    });
}());
