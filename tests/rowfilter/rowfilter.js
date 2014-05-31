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

    test("rowFilter has the filter-header class", function() {
        rowFilter = setup(dom, { dataSource: dataSource });

        ok(dom.is(".grid-filter-header"));
    });
})();
