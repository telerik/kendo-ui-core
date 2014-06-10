(function() {
    var DataSource = kendo.data.DataSource,
        RowFilter = kendo.ui.RowFilter,
        rowFilter,
        model,
        dom,
        dataSource;

    module("kendo.ui.RowFilter", {
        setup: function() {
            kendo.effects.disable();
            kendo.ns = "kendo-";
            dataSource = new DataSource({
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
            });

            dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.effects.enable();
            dataSource.unbind("change");
            kendo.destroy(QUnit.fixture);
            $(".k-row-filter").remove();
            kendo.ns = "";
        }
    });

    function setup(dom, options, init) {
        var menu = new RowFilter(dom, options);
        return menu;
    }

    test("wrap element has the filter-header class", function() {
        rowFilter = setup(dom, { dataSource: dataSource });

        ok(dom.is(".grid-filter-header"));
    });

    test("dataSource remains the same instance when set to an instance of the DataSource class", function() {
        rowFilter = setup(dom, { dataSource: dataSource });

        ok(rowFilter.dataSource instanceof kendo.data.DataSource);
        ok(rowFilter.dataSource === dataSource);
    });

    test("dataSource is instance of the DataSource class when set with options", function() {
        rowFilter = setup(dom, { dataSource: { transport: { read: function () {} } } });

        ok(rowFilter.dataSource instanceof kendo.data.DataSource);
    });
})();
