(function() {
    var DataSource = kendo.data.DataSource,
        FilterMenu = kendo.ui.FilterMenu,
        roleSelector = kendo.roleSelector,
        link,
        container,
        pane;


    module("kendo.ui.FilterMenu", {
        setup: function() {
            kendo.effects.disable();
            container = $('<div id="container"><a data-kendo-field="foo" class="k-grid-filter"></a></div>')
                .appendTo(QUnit.fixture);

            pane = kendo.mobile.ui.Pane.wrap(container);
            link = container.find(">a");
        },

        teardown: function() {
            pane.view().purge();
            kendo.destroy(QUnit.fixture);
            container.remove();
            kendo.effects.enable();
        }
    });

    function setup(dom, options, init) {
        options = $.extend({}, {
                animations: {
                    left: "",
                    right: ""
                },
                pane: pane,
                dataSource: {
                    schema: {
                        model: {
                            fields: {
                                foo: {
                                    type: "string"
                                },
                                bar: {
                                    type: "number"
                                },
                                baz: {
                                    type: "date"
                                },
                                boo: {
                                    type: "boolean"
                                }
                            }
                        }
                    }
                }
            },
            options);

        options.dataSource = new DataSource(options.dataSource);

        var menu = new FilterMenu(dom || container, options);

        if (init !== false) {
            menu._init();
        }

        return menu;
    }

    test("uses provided pane", function() {
        var menu = setup();

        ok(menu.pane);
    });

    test("mobile view wraps the form", function() {
        var menu = setup();

        equal(menu.form.closest(roleSelector("view")).length, 1);
    });

    test("mobile view doesn't wrap the form if no pane available", function() {
        var menu = setup(container, { pane: null });

        equal(menu.form.closest(roleSelector("view")).length, 0);
    });

    test("pane navigates to filter menu view", function() {
        var menu = setup();
        link.click();

        equal(pane.view(), menu.view);
    });

    test("pane navigates to default view on form submit", function() {
        var menu = setup();
        link.click();
        menu.form.submit();

        notEqual(pane.view(), menu.view);
        ok(!menu.view.element.is(":visible"));
    });

    test("pane navigates to default view on form reset", function() {
        var menu = setup();
        link.click();
        menu.form.trigger("reset");

        notEqual(pane.view(), menu.view);
        ok(!menu.view.element.is(":visible"));
    });
})();
