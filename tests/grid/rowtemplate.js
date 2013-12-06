(function() {

    var Grid = kendo.ui.Grid,
        table,
        ObservableObject = kendo.data.ObservableObject;
        DataSource = kendo.data.DataSource;

    module("grid row template", {
        setup: function() {
            kendo.ns = "kendo-";
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
            $(table).remove();
        }
    });

    test("rowTemplate is initialized", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo" }, { field: "bar" }] });

        ok(grid.rowTemplate);
    });

    test("default rowTemplate renders table row element", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo" }, { field: "bar" }] });

        ok($(grid.rowTemplate(new ObservableObject({ foo: "foo", bar: "bar" }))).is("tr"));
    });

    test("default rowTemplate renders a table cell for each column", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo" }, { field: "bar" }] });

        equal($(grid.rowTemplate(new ObservableObject({ foo: "foo", bar: "bar" }))).find(" > td").length, 2);
    });

    test("default rowTemplate renders data for the columns", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo" }, { field: "bar" }] });

        var tr = $(grid.rowTemplate(new ObservableObject({ foo: "foo", bar: "bar" })));
        equal(tr.find("td").eq(0).text(), "foo");
        equal(tr.find("td").eq(1).text(), "bar");
    });

    test("default rowTemplate uses specified template settings renders data for the columns", function() {
        var grid = new Grid(table, { templateSettings: {useWithBlock: false, paramName: "item" }, dataSource: [], columns: [{ field: "foo" }] });

        ok(grid.rowTemplate.toString().indexOf("item.foo") > -1);
    });

    test("default rowTemplate encodes html entities", function() {
        var grid = new Grid(table,  { columns: [{ field: "foo" }] });

        ok(grid.rowTemplate(new ObservableObject({ foo: "<" })).indexOf("&lt;") > -1);
    });

    test("default rowTemplate does not encode html entities if encoded is false", function() {
        var grid = new Grid(table,  { columns: [{ field: "foo", encoded: false }] });

        ok(grid.rowTemplate(new ObservableObject({ foo: "<" })).indexOf("&lt;") == -1);
    });

    test("rowTemplate initialization from options.rowTemplate", function() {
        var grid = new Grid(table, { rowTemplate: function(data) {
            return data.foo;
        }, dataSource: [], columns: [{ field: "foo" }] });

        ok(grid.rowTemplate({foo: "bar"}).indexOf("bar") > -1);
    });

    test("rowTemplate as string", function() {
        var rowTemplate = function() { };
        var grid = new Grid(table, { rowTemplate: "<tr></tr>", dataSource: [], columns: [{ field: "foo" }] });
        equal($(grid.rowTemplate({}))[0].tagName, "TR");
    });

    test("default rowTemplate is using column templates", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", template: "item.foo" }] });

        ok(grid.rowTemplate.toString().indexOf("item.foo") > -1);
    });

    test("column template as function", function() {
        var template = function(data) {return "foo" + data.foo; };
        var grid = new Grid(table, { dataSource: [{ foo: "bar"}], columns: [{ field: "foo", template: template }] });
        ok(grid.columns[0].template === template);

        equal(grid.tbody.find("td").text(), "foobar");
    });

    test("data-kendo-id attribute is rendered for each row when model is defined", function() {
        var grid = new Grid($("<div/>").appendTo(QUnit.fixture), {
            dataSource: {
                schema: {
                    model: {
                        id: "foo"
                    }
                },
                data: [ {
                    foo: "bar"
                }]
            }
        });

        ok(grid.tbody.find("tr").attr("data-kendo-uid"));
    });

    test("data-kendo-id attribute is rendered for each row when model id is string and a column has a function template", function() {
        var grid = new Grid($("<div/>").appendTo(QUnit.fixture), {
            dataSource: {
                schema: {
                    model: {
                        id: "foo"
                    }
                },
                data: [ {
                    foo: "bar"
                }]
            },
            columns: [ {
                member: "foo",
                template: function() {}
            }]
        });

        ok(grid.tbody.find("tr").attr("data-kendo-uid"));
    });

    test("data-kendo-id attribute is not rendered if model is not set", function() {
        var grid = new Grid($("<div/>").appendTo(QUnit.fixture), {
            dataSource: {
                data: [ {
                    foo: "bar"
                }]
            },
            columns: [ {
                member: "foo",
                template: function() {}
            }]
        });

        ok(grid.rowTemplate.toString().indexOf("data-kendo-uid") === -1);
    });
})();
