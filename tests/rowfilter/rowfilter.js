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

    test("dataSource remains the same instance when set to an instance of the DataSource class, acDS creates new one", function() {
        rowFilter = setup(dom, { dataSource: dataSource, acDataSource: dataSource });

        ok(rowFilter.dataSource instanceof kendo.data.DataSource);
        ok(rowFilter.dataSource === dataSource);
        ok(rowFilter.acDataSource !== dataSource);
    });

    test("acDataSource is instance of the DataSource class when set with options", function() {
        var dsOptions = { transport: { read: function () {} } };
        rowFilter = setup(dom, { acDataSource: dsOptions, dataSource: new kendo.data.DataSource() });

        ok(rowFilter.acDataSource instanceof kendo.data.DataSource);
        ok(rowFilter.acDataSource.transport.read === dsOptions.transport.read);
    });

    test("type is retrieved from dataSource when it is instance of the DataSource class ", function() {
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(rowFilter.options.type, "string");
    });

    test("uses default type when dataSource is instance of the DataSource class and field type is not defined", function() {
        delete dataSource.options.schema.model.fields.bar.type;
        rowFilter = setup(dom, { dataSource: dataSource, field: "bar" });
        equal(rowFilter.options.type, "string");
    });
    test("type is retrieved from dataSource when it is instance of the DataSource class ", function() {
        rowFilter = setup(dom, { dataSource: dataSource, field: "bar" });
        equal(rowFilter.options.type, "number");
    });

    test("creates input element by default", function() {
        rowFilter = setup(dom, { dataSource: dataSource, field: "bar" });
        equal(dom.find("input").length, 1);
    });

    test("sets the value of the input element when there is default filter", function() {
        dataSource.filter({ field:"foo", operator:"eq", value:"baz" })
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(rowFilter.element.find("input").val(), "baz");
    });

    test("sets the value of the input element when there is array as filter", function() {
        dataSource.filter([{ field:"foo", operator:"eq", value:"baz" }]);
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(dom.find("input").val(), "baz");
    });

    test("sets the value of the input element when there is composite filter", function() {
        dataSource.filter({ filters: [{ field:"foo", operator:"eq", value:"baz" }] });
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(dom.find("input").val(), "baz");
    });

    test("sets the value of the input element when there is complex composite filter", function() {
        dataSource.filter({ filters: [{ field:"faz", operator:"eq", value:"gaz" }, { field:"foo", operator:"eq", value:"baz" }] });
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(dom.find("input").val(), "baz");
    });

    test("updates the values of the filter when filter is cleared and then set", function() {
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(dom.find("input").val(), "");
        dataSource.filter({ filters: [{ field:"faz", operator:"eq", value:"gaz" }, { field:"foo", operator:"eq", value:"baz" }] });
        equal(dom.find("input").val(), "baz");
        dataSource.filter({});
        equal(dom.find("input").val(), "");
        dataSource.filter({ field:"foo", operator:"eq", value:"gaz" });
        equal(dom.find("input").val(), "gaz");
    });

    test("updates the viewmodel operator when the dataSource is initially filtered", function() {
        dataSource.filter({ filters: [{ field:"faz", operator:"eq", value:"gaz" }, { field:"foo", operator:"neq", value:"baz" }] });
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(rowFilter.viewModel.operator, "neq");
    });

    test("when viewModel is changed the filter of the dataSource is updated", function() {
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(rowFilter.viewModel.set("value", "someValue"));
        var filter = dataSource.filter();
        equal(filter.filters.length, 1);
        filter = filter.filters[0];
        equal(filter.value, "someValue");
        equal(filter.field, "foo");
        equal(filter.operator, "eq");
    });

    test("when viewModel is changed the filter of the dataSource is updated and other filters are preserved", function() {
        dataSource.filter({ field: "bar", value: "someBarvalue", operator: "neq"});
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        equal(rowFilter.viewModel.set("value", "someValue"));
        var filter = dataSource.filter();
        ok(filter.filters);
        equal(filter.logic, "and");
        var filters = filter.filters;
        equal(filters[0].value, "someBarvalue");
        equal(filters[0].field, "bar");
        equal(filters[0].operator, "neq");
        equal(filters[1].value, "someValue");
        equal(filters[1].field, "foo");
        equal(filters[1].operator, "eq");
    });

    test("when viewModel is changed to empty value, filter of the dataSource is cleared if there are no other filters", function() {
        dataSource.filter([{ field: "foo", value: "soneFooValue", operator: "neq" }]);
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        rowFilter.viewModel.set("value", "");
        var filter = dataSource.filter();
        equal(filter, null);
    });

    test("when viewModel is changed to empty value, filter of the dataSource is cleared and other filters are preserved", function() {
        dataSource.filter([{ field: "bar", value: "someBarvalue", operator: "neq" }, { field: "foo", value: "soneFooValue", operator: "neq" }]);
        rowFilter = setup(dom, { dataSource: dataSource, field: "foo" });
        rowFilter.viewModel.set("value", "");
        var filter = dataSource.filter();
        ok(filter.filters);
        equal(filter.logic, "and");
        var filters = filter.filters;
        equal(filters.length, 1);
        equal(filters[0].value, "someBarvalue");
        equal(filters[0].field, "bar");
        equal(filters[0].operator, "neq");
    });
})();
