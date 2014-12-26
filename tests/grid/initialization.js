(function() {
    var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource;

    module("grid initialization", {
        setup: function() {
            kendo.ns = "kendo-";
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);
        },
        teardown: function() {
            var component = $(table).data("kendoGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    test("kendoGrid attaches a grid object to target", function() {
        var gridTable = $(table).kendoGrid({ dataSource: [] });

        ok(gridTable.data("kendoGrid") instanceof Grid);
    });

    test("Grid constructor calls the read method of its datasource", function() {
        var dataSource = new DataSource({ dataSource: [] });
        var readWasCalled = false;

        dataSource.read = function() {
            readWasCalled = true;
            return $.Deferred().promise();
        };

        new Grid(table, { dataSource: dataSource } );

        ok(readWasCalled);
    });

    test("column initialization - field", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo" }, { field: "bar" }] });

        equal(grid.columns.length, 2);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "bar");
    });

    test("column initialization - template", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", template: "bar" }] });

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[0].template, "bar");
    });

    test("column initialization - treating strings as fields", function() {
        var grid = new Grid(table, { dataSource: [], columns: ["foo", { field: "bar" }] });

        equal(grid.columns.length, 2);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "bar");
    });

    test("header data attributes - data-kendo-field", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo"></th><th data-kendo-field="bar"></th></table>').appendTo(QUnit.fixture), { dataSource: [] });

        equal(grid.columns.length, 2);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "bar");
    });

    test("header data attributes - data-kendo-type", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo" data-kendo-type="number"></th><th data-kendo-field="bar"></th></table>').appendTo(QUnit.fixture), { dataSource: [] });

        equal(grid.columns.length, 2);
        equal(grid.columns[0].type, "number");
        equal(grid.columns[1].type, undefined);
    });

    test("header data attributes - data-kendo-template", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo" data-kendo-template="bar"></th></table>').appendTo(QUnit.fixture), { dataSource: [] });

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[0].template, "bar");
    });

    test("column format is applied", function() {
        var grid = new Grid(table, { dataSource: [ {foo: "foo"}, {foo: "bar"}], columns: [{ field: "foo", format: "{0} bar" }] });

        equal(grid.table.find("tr:first>td").text(), "foo bar");
        equal(grid.table.find("tr:nth(1)>td").text(), "bar bar");
    });

    test("column format with sharps is applied", function() {
        var grid = new Grid(table, { dataSource: [ {foo: 123}, {foo: 423 }], columns: [{ field: "foo", format: "{0:###.0}" }] });

        equal(grid.table.find("tr:first>td").text(), "123.0");
        equal(grid.table.find("tr:nth(1)>td").text(), "423.0");
    });

    test("column initialization - groupable", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", groupable: true }] });

        equal(grid.columns[0].field, "foo");
        ok(grid.columns[0].groupable);
    });

    test("column initialization - groupable disabled", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", groupable: false}] });

        equal(grid.columns[0].field, "foo");
        ok(!grid.columns[0].groupable);
    });

    test("column initialization - groupable attr is set for th", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", groupable: false}] });

        ok(grid.thead.find("th:first").attr(kendo.attr("groupable")) === "false");
    });

    test("column initialization - data-kendo-groupable", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo" data-kendo-groupable="true"></th></table>').appendTo(QUnit.fixture), { dataSource: [] });

        equal(grid.columns[0].field, "foo");
        ok(grid.columns[0].groupable);
    });

    test("tbody is created if not present", function() {
        var grid = new Grid(table, { dataSource: [], columns: [{ field: "foo", template: "item.foo" }] });
        equal(grid.tbody.length, 1);
    });

    test("array passed as options is treated as data", function() {
        var data = ["foo"];
        var grid = new Grid(table, data);
        ok(grid.dataSource.data()[0] === data[0]);
    });

    test("div wrapper is created around the table", function() {
        var grid = new Grid(table, []);

        ok(grid.wrapper.is("div.k-grid.k-widget"));
    });

    test("wrapper field is initialized", function() {
        var grid = new Grid(table, []);

        ok(grid.wrapper.is("div.k-grid.k-widget"));
    });

    test("datasource is populated from table if not specified", function() {
        var grid = new Grid($('<table><tr><td /><td/></tr></table>').appendTo(QUnit.fixture), {columns: [ { field:"foo" }] });

        equal(grid.dataSource.data().length, 1);
    });

    test("header text is used as a field if data-kendo-field attribute is not set", function() {
        var grid = new Grid($('<table><th>Foo</th></table>').appendTo(QUnit.fixture));

        equal(grid.columns[0].field, "Foo");
    });

    test("data-kendo-field takes precedence over the header text", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo">Foo</th></table>').appendTo(QUnit.fixture));

        equal(grid.columns[0].field, "foo");
    });

    test("everything which is not alpha numeric is stripped from header text when used as a field", function() {
        var grid = new Grid($('<table><th>  $@Foo1   Bar   </th></table>').appendTo(QUnit.fixture));

        equal(grid.columns[0].field, "Foo1Bar");
    });

    test("initializing a grid from a div", function() {
        var div = $("<div />").appendTo(QUnit.fixture), grid = new Grid(div, {scrollable: false, dataSource: [] });

        ok(grid.element[0] === div[0]);
        ok(div.children().first().is("table"));
        ok(grid.table[0] === div.children().first()[0]);
    });

    test("initializing a scrollable grid from a div", function() {
        var div = $("<div />").appendTo(QUnit.fixture), grid = new Grid(div, { dataSource: [] });

        ok(grid.element[0] === div[0]);
        equal(grid.table[0], div.find(".k-grid-content").children().first()[0]);
    });

    test("autogenerating columns", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal(grid.columns.length, 2);
    });

    test("autogenerating columns - inferring the field", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "bar");
    });

    test("autogenerating columns - generating the templates", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal(grid.tbody.find(">tr>td:first").text(), "foo");
        equal(grid.tbody.find(">tr>td:last").text(), "bar");
    });

    test("autogenerating columns - generating the th", function() {
        var grid = new Grid(table, { scrollable: false, dataSource: [ { foo: "foo", bar: "bar" } ] });

        equal(grid.table.find("tr>th:first").text(), "foo");
        equal(grid.table.find("tr>th:last").text(), "bar");
    });

    test("autogenerating columns - generating the th in scrollable grid", function() {
        var grid = new Grid(table, { scrollable: true, dataSource: [ { foo: "foo", bar: "bar" } ] });

        equal(grid.thead.find("tr>th:first").text(), "foo");
        equal(grid.thead.find("tr>th:last").text(), "bar");
    });

    test("generating the th from column metadata", function() {
        var grid = new Grid(table, { columns: [ { field: "foo" } ] });

        equal(grid.thead.find("tr>th:first").text(), "foo");
    });

    test("thead initialization", function() {
        var grid = new Grid(table, { columns: [ { field: "foo" } ] });

        equal(grid.thead.length, 1);
    });

    test("thead initialization when there is existing thead", function() {
        var grid = new Grid($("<table><thead/></table>").appendTo(QUnit.fixture), { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 1);
        equal(grid.thead.find("th").length, 1);
    });

    test("thead initialization when there is existing nested theads", function() {
        var grid = new Grid($("<table><thead/><tbody><tr><td><table><thead/></table></td></tr></tbody></table>").appendTo(QUnit.fixture), { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 2);
        equal(grid.thead.find("th").length, 1);
    });

    test("thead initialization when there is existing thead > tr", function() {
        var grid = new Grid($("<table><thead><tr/></thead></table>").appendTo(QUnit.fixture), { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 1);
        equal(grid.thead.find("tr").length, 1);
        equal(grid.thead.find("th").length, 1);
    });

    test("thead initialization when there is existing thead > tr > th", function() {
        var grid = new Grid($("<table><thead><tr><th>bar</th></tr></thead></table>").appendTo(QUnit.fixture), { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 1);
        equal(grid.thead.find("tr").length, 1);
        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("th").text(), "bar");
    });

    test("thead initialization when there are nested thead > tr > th", function() {
        var element = $("<table><thead><tr><th>bar</th></tr></thead><tbody><tr><td><table><thead><tr><th/></tr></thead></table></td></tr></tbody></table>").appendTo(QUnit.fixture);
        var grid = new Grid(element, { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 2);
        equal(grid.thead.find("tr").length, 1);
        equal(grid.thead.find("th.k-header").length, 1);
        equal(grid.thead.find("th").text(), "bar");
    });

    test("thead initialization when there are multiple header rows", function() {
        var element = $("<table><thead><tr><th>bar</th></tr><tr><th>baz</th></tr></thead></table>").appendTo(QUnit.fixture);
        var grid = new Grid(element, { columns: [ { field: "foo" } ] });

        equal(grid.wrapper.find("thead").length, 1);
        equal(grid.thead.find("tr").length, 2);
        equal(grid.thead.find("th").length, 2);
        equal(grid.thead.find("th").first().text(), "bar");
        equal(grid.thead.find("th").last().text(), "baz");
    });

    test("thead initialization when there is no thead but th exists", function() {
        var grid = new Grid($("<table><tr><th>bar</th></tr></table>").appendTo(QUnit.fixture), { });

        equal(grid.wrapper.find("thead").length, 1);
        equal(grid.wrapper.find("tr").length, 1);
        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("th").text(), "bar");
    });
    test("autoBind false does not populate grid", function() {
        var grid = new Grid(table, { autoBind: false, dataSource: [ { foo: "foo", bar: "bar" } ]});

        ok(grid.element.find("tbody > tr").length == 0);
    });

    test("th css class is set", function() {
        var grid = new Grid($("<table><thead><tr><th /></tr></thead></table>").appendTo(QUnit.fixture));

        equal(grid.thead.find(".k-header").length, grid.thead.find("th").length);
    });

    test("scrollable grid has a div for the header", function() {
        var grid = new Grid($("<table><thead><tr><th /></tr></thead></table>").appendTo(QUnit.fixture), { scrollable: true });

        equal(grid.wrapper.children().filter("div.k-grid-header").length, 1);
    });

    test("scrollable grid has a table with thead in the header", function() {
        var grid = new Grid($("<table><thead><tr><th /></tr></thead></table>").appendTo(QUnit.fixture), { scrollable: true });

        equal(grid.wrapper.children().filter("div").find("table > thead").length, 1);
    });

    test("scrollable grid has only one header when columns are autogenerated", function() {
        var grid = new Grid($(table), { scrollable: true, dataSource: [{foo:"bar"}] });

        equal(grid.wrapper.children().filter("div.k-grid-header").find("table > thead").length, 1);
    });

    test("scrollable grid header has right padding the same as the scrollbar width", function() {
        var grid = new Grid(table, { scrollable: true, dataSource: [{foo:"bar"}] });

        equal(grid.wrapper.children().filter("div.k-grid-header").css("padding-right"), kendo.support.scrollbar() + "px");
    });

    test("scrollable grid has header wrap", function() {
        var grid = new Grid(table, { scrollable: true, dataSource: [{foo:"bar"}] });

        equal(grid.wrapper.children().filter("div.k-grid-header").find("> div.k-grid-header-wrap").length, 1);
    });

    test("scrollable grid table is nested in a div", function() {
        var grid = new Grid(table, { scrollable: true, dataSource: [{foo:"bar"}] });

        ok(grid.table.parent().is("div.k-grid-content"));
    });

    test("scrollable area is sized", function() {
    var grid = new Grid(table, { height: 200, pageable: { info: false, previousNext: false }, scrollable: true, dataSource: [{foo:"bar"}], columns: [{field:"foo", footerTemplate:"bar"}]});

        equal(grid.wrapper.find(".k-grid-content").height(), 200
            - grid.wrapper.find(".k-grid-header").outerHeight()
            - grid.wrapper.find(".k-grid-footer").outerHeight()
            - grid.wrapper.find(".k-grid-pager").outerHeight());
    });

    test("expander div is added if no records", function() {
        var grid = new Grid($(table).wrap('<div style="width:200px"></div>'), { scrollable: true, dataSource: [], columns: [{field:"foo", width:300}]}),
            expander = grid.table.parent().children('.k-grid-content-expander');

        equal(expander.length, 1);
        equal(expander.width(), grid.thead.width());
    });

    test("expander div is removed if records exist", function() {
        var grid = new Grid($(table).wrap('<div style="width:200px"></div>'), { scrollable: true, dataSource: [], columns: [{field:"foo", width:300}]}),
            dataSource = new kendo.data.DataSource({
                data: [
                    { foo: "bar" }
                ]
            });

        grid.setDataSource(dataSource);

        var expander = grid.table.parent().children('.k-grid-content-expander');

        equal(expander.length, 0);
    });

    test("grid height is applied to the wrapper element", function() {
        var grid = new Grid(table, { height: 100, dataSource: [{foo:"bar"}] });

        equal(grid.wrapper.height(), 100);
    });

    test("non-scrollable grid thead has k-grid-header class", function() {
        var grid = new Grid(table, { dataSource: [{foo:"bar"}], scrollable: false });

        ok(grid.thead.hasClass("k-grid-header"));
    });

    test("col elements are created for every column in non-scrollable grid", function() {
        var grid = new Grid(table, {
            dataSource: [],
            columns: [{field: "foo" }, {field: "bar"}],
            scrollable: false
        });
        var headerTable = grid.thead.parent();

        ok(headerTable.find("colgroup").length);
        equal(headerTable.find("col").length, 2);
    });

    test("col elements are created for every column in scrollable grid", function() {
        var grid = new Grid(table, {
            dataSource: [],
            columns: [{field: "foo" }, {field: "bar"}],
            scrollable: true
        });

        var colgroups = grid.wrapper.find("colgroup");

        equal(colgroups.length, 2);
        equal(colgroups.eq(0).find("col").length, 2);
        equal(colgroups.eq(1).find("col").length, 2);
    });

    test("hierarhcy col element is created in non-scrollable grid when table element has hierarchy col defined", function() {
        var grid = new Grid($('<table><colgroup><col class="k-hierarchy-col"/></colgroup></table>').appendTo(QUnit.fixture), {
            dataSource: [],
            columns: [{field: "foo" }, {field: "bar"}],
            scrollable: false
        });
        var headerTable = grid.thead.parent();

        equal(headerTable.find("colgroup").length, 1);
        equal(headerTable.find("col").length, 3);
        ok(headerTable.find("col").eq(0).hasClass("k-hierarchy-col"));
    });

    test("hierarhcy col element is created in scrollable grid when table element has hierarchy col defined", function() {
        var grid = new Grid($('<table><colgroup><col class="k-hierarchy-col"/></colgroup></table>').appendTo(QUnit.fixture), {
            dataSource: [],
            columns: [{field: "foo" }, {field: "bar"}]
        });

        var colgroups = grid.wrapper.find("colgroup");

        equal(colgroups.length, 2);
        equal(colgroups.eq(0).find("col").length, 3);
        equal(colgroups.eq(1).find("col").length, 3);
        ok(colgroups.eq(0).find("col:first").hasClass("k-hierarchy-col"));
        ok(colgroups.eq(0).find("col:first").hasClass("k-hierarchy-col"));
    });

    test("column width is applied on col element", function() {
        var width = "200px",
            grid = new Grid(table, {
                dataSource: [],
                columns: [{field: "foo", width: width }],
                scrollable: true
            });

        var cols = grid.wrapper.find("col");
        equal(cols.length, 2);
        equal(cols[0].style.width, width);
        equal(cols[1].style.width, width);
    });

    test("column width is parsed from DOM col element when grid created from table element", function() {
        table = $('<table><colgroup><col style="width:200px"/><col /></colgroup><thead><th data-kendo-field="foo"></th><th data-kendo-field="bar"></th><th data-kendo-field="baz"></th></thead></table>');

        var grid = new Grid(table, {
                dataSource: [],
                scrollable: false
            });

        var cols = grid.wrapper.find("col");
        equal(cols.length, 3);
        equal(cols.eq(0).css("width"), "200px");
        equal(cols.eq(1).css("width"), "0px");
        equal(cols.eq(2).css("width"), "0px");
    });

    test("dataBound event is raised if bound to array", function() {
        var called = false,
            grid = new Grid(table, {
                dataSource: [ {foo:"foo", bar:"bar"} ],
                dataBound: function() { called = true; }
            });
        ok(called);
    });

    test("cancelling databinding event prevents refresh", function() {
        var grid = new Grid(table, {
                dataSource: [ {foo:"foo", bar:"bar"} ],
                dataBinding: function(e) { e.preventDefault(); }
            });

        equal(grid.items().length, 0);
    });

    test("DataSource change action is passed to databinding event", 3, function() {
        var grid = new Grid(table, {
                dataSource: [ {foo:"foo", bar:"bar"} ],
            });

        grid.bind("dataBinding", function(e) {
            equal(e.index, 1);
            equal(e.action, "add");
            equal(e.items.length, 1);
       });

       grid.dataSource.insert(1, {});
    });


    test("initialization from rendered table should disable encoding", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {scrollable: false});

        equal(grid.columns[0].encoded, false);
    });

    test("sortable columns", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            sortable: true
        });

        ok(grid.thead.find("th").data("kendoColumnSorter"), "Column is not sortable");
    });

    test("unsortable column from column settings", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            sortable: true,
            columns: [{
                sortable: false
            }]
        });

        equal(grid.thead.find("th").data("kendoColumnSorter"), undefined, "Column is not sortable");
    });

    test("unsortable column from html attribute", function() {
        $(table).html("<thead><tr><th data-kendo-sortable=false data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            sortable: true
        });

        ok(!(grid.thead.find("th").data("kendoColumnSorter") instanceof kendo.ui.ColumnSorter));
    });

    test("filterable columns", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        ok(grid.thead.find("th").data("kendoFilterMenu"));
    });

    test("filtercell does not get rendered by default", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true
        });

        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("tr").length, 1);
    });

    test("filtercell header row gets rendered when grid filterable is set to true", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: {
                mode: "cell row"
            },
            columns: ["foo"],
        });

        equal(grid.thead.find("tr").length, 2);
    });

    test("filtercell row is rendered when filterable true and initialized from div", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: ["foo"],
        });

        equal(grid.thead.find("tr").length, 2);
    });

    test("filtercell header row is inserted second", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: ["foo"],
        });

        equal(grid.thead.find("tr:eq(1)").attr("class"), "k-filter-row");
    });

    test("filtercell with detailTemplate renders detail cell th", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            detailTemplate: "foo",
            dataSource: [{foo: 1, filterable: true}],
            columns: ["foo"],
            filterable: {
                mode: "cell row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find(".k-hierarchy-cell").length, 1);
    });

    test("filtercell with detail cell is not rendered when no details", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: [{foo: 1}],
            columns: ["foo"],
            filterable: {
                mode: "cell row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find(".k-hierarchy-cell").length, 0);
    });

    test("filtercell creates group cells when grid has groups", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: {
                data: [
                    { foo: 1, bar: 2 },
                    { foo: 1, bar: 2 },
                    { foo: 2, bar: 2 },
                ],
                group: [
                    { field: "foo" },
                    { field: "bar" }
                ]
            },
            columns: ["foo"],
            filterable: {
                mode: "cell row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find(".k-group-cell").length, 2);
    });

    test("filtercell creates th cells for each column", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: {
                data: [
                    { foo: 1, bar: 1, baz: 1},
                ]
            },
            columns: ["foo", "bar", { template: "foo" }],
            filterable: {
                mode: "cell row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find("th").length, 3);
    });

    test("filtercell creates th cell with nbps when filtering for that column is disabled", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: {
                data: [
                    { foo: 1, bar: 1, baz: 1},
                ]
            },
            columns: [ { field: "foo", filterable: false }, "bar"],
            filterable: {
                mode: "cell row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find("th").length, 2);
        equal(grid.thead.find(".k-filter-row").find("th").eq(0).html(), "&nbsp;");
    });

    test("filtercell hides its th cells based on column visibility", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: {
                data: [
                    { foo: 1, bar: 1, baz: 1},
                ]
            },
            columns: ["foo", "bar", { field: "baz", hidden: true }],
            filterable: {
                mode: "row"
            }
        });

        equal(grid.thead.find(".k-filter-row").find("th:eq(2)").is(":visible"), false);
    });

    test("filtercell creates th cells and sets attributes for bound columns", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            dataSource: {
                data: [
                    { foo: 1, bar: 1, baz: 1},
                ]
            },
            columns: ["foo", "bar", { template: "foo" }],
            filterable: {
                mode: "cell row"
            }
        });

        var filterrow = grid.thead.find(".k-filter-row");
        var ths = filterrow.find("th");
        equal(ths.length, 3);
        //equal(ths.eq(0).attr(kendo.attr("field")), "foo");
        //equal(ths.eq(1).attr(kendo.attr("field")), "bar");
    });

    test("filtercell tr is not rendered when grid filterable is set to true and columns filterable to false", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                    filterable: false
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("tr").length, 1);
    });

    test("filtercell widgets are not rendered when grid filterable is set to true and columns filterable to false", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                    filterable: true
                },
                {
                    field: "col2",
                    filterable: false
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        var filterrow = grid.thead.find(".k-filter-row");
        var widgetSelector = "["+ kendo.attr("role") +"=filtercell]"
        var widgets = filterrow.find(widgetSelector);
        equal(widgets.length, 1);
    });

    test("filtercell widgets are initialized with type according to the column field", function() {
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                    filterable: true
                },
                {
                    field: "col2",
                    filterable: true
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "number"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        var firstWidget = widgets.eq(0).data("kendoFilterCell");
        equal(firstWidget.options.type, "number");
        var secondWindget = widgets.eq(1).data("kendoFilterCell");
        equal(secondWindget.options.type, "string");
    });

    test("filtercell widgets are initialized with the provided filterable options - suggestDataSource", function() {
        var readInvoked;
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                    filterable: {
                        cell: {
                            dataSource: {
                                transport: {
                                    read: function() {
                                        readInvoked = true;
                                    }
                                }
                            },
                            delay: 500
                        }
                    }
                },
                {
                    field: "col2",
                    filterable: true
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        var firstWidget = widgets.eq(0).data("kendoFilterCell");
        firstWidget.suggestDataSource.read();
        equal(firstWidget.input.data("kendoAutoComplete").options.delay, 500);
        ok(readInvoked);
    });

    test("filtercell respect the filterable.operators configuration", function() {
        var readinvoked;
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row",
                operators: {
                    string: { eq: "foo equal"}
                }
            },
            columns: [
                {
                    field: "col1",
                    filterable: {
                        operators: {
                            string: {
                                eq: "bar equal"
                            }
                        },
                        cell: {
                            datasource: {
                                transport: {
                                    read: function() {
                                        readinvoked = true;
                                    }
                                }
                            },
                            delay: 500
                        }
                    }
                },
                {
                    field: "col2",
                    filterable: true
                }
            ],
            datasource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        var firstwidget = widgets.eq(0).data("kendoFilterCell");
        firstwidget.suggestDataSource.read();
        equal(firstwidget.options.operators.string.eq , "bar equal");
    });

    test("filtercell is initialized with messages options from the Grid", function() {
        var readInvoked;
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                operators: {
                    string: {
                        eq: "IS EQUAL"
                    }
                },
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                },
                {
                    field: "col2",
                    filterable: {
                        cell: {
                            enabled: false
                        }
                    }
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        equal(widgets.length, 1);
        var firstWidget = widgets.eq(0).data("kendoFilterCell");
        equal(firstWidget.operatorDropDown.dataSource.data()[0].text, "IS EQUAL");
    });

    test("filtercell is initialized with messages options from the column messages", function() {
        var readInvoked;
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                messages: {
                    isTrue: "IS TRUE"
                },
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "boolean"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        var firstWidget = widgets.eq(0).data("kendoFilterCell");
        equal(firstWidget.wrapper.find(":radio").length, 2);
        equal(firstWidget.wrapper.find(":radio:first").parent().text(), "IS TRUE");
    });

    test("filtercell creates comboBox when values is provided for the filterable column", function() {
        var readInvoked;
        var div = $("<div/>").appendTo(QUnit.fixture);
        var grid = new Grid(div, {
            filterable: {
                mode: "cell row"
            },
            columns: [
                {
                    field: "col1",
                    values: [
                        { text: "foo", value: 1 },
                        { text: "bar", value: 2 },
                        { text: "baz", value: 3 },
                    ]
                },
                {
                    field: "col2",
                    filterable: true
                }
            ],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        });

        var widgets = grid.thead.find("["+ kendo.attr("role") +"=filtercell]");
        var firstWidget = widgets.eq(0).data("kendoFilterCell");
        var combo = firstWidget.input.data("kendoComboBox");
        ok(combo);
        equal(combo.dataSource.data().length, 3);
    });

    test("grid filterable options propagate to the filter menu", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            filterable: {
                operators: {
                    string: {
                        eq: "foo"
                    }
                }
            },
            dataSource: [
                { foo: "foo" }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").operators.string.eq, "foo");
    });

    test("grid filterable menu is not initialized when using filtermode cell", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            filterable: {
                mode: "cell"
            },
            dataSource: [
                { foo: "foo" }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu"), null);
    });

    test("column filterable options override the grid filterable options", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            filterable: {
                operators: {
                    string: {
                        eq: "foo"
                    }
                }
            },
            dataSource: [
                { foo: "foo" }
            ],
            columns: [
                {
                    field: "foo",
                    filterable: {
                        operators: {
                            string: {
                                eq: "bar"
                            }
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").operators.string.eq, "bar");
    });

    test("column filterable options override the default filterable options", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            dataSource: [
                { foo: "foo" }
            ],
            filterable: true,
            columns: [
                {
                    field: "foo",
                    filterable: {
                        operators: {
                            string: {
                                eq: "bar"
                            }
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").operators.string.eq, "bar");
    });

    test("column filterable operators are the only ones used by the filter menu", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            dataSource: [
                { foo: "foo" }
            ],
            filterable: true,
            columns: [
                {
                    field: "foo",
                    filterable: {
                        operators: {
                            string: {
                                eq: "bar"
                            }
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").operators.string.neq, undefined);
    });

    test("column filterable operators are the only ones used by the filter menu when the grid filterable is set", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            dataSource: [
                { foo: "foo" }
            ],
            filterable: {
                operators: {
                    string: {
                        eq: "foo",
                        neq: "bar"
                    }
                }
            },
            columns: [
                {
                    field: "foo",
                    filterable: {
                        operators: {
                            string: {
                                eq: "bar"
                            }
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").operators.string.neq, undefined);
    });

    test("column filterable messages override the grid filterable messages", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            dataSource: [
                { foo: "foo" }
            ],
            filterable: {
                messages: {
                    and: "foo"
                }
            },
            columns: [
                {
                    field: "foo",
                    filterable: {
                        messages: {
                            and: "bar"
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").options.messages.and, "bar");
    });

    test("column filterable messages are merged with the grid filterable messages", function() {
        var grid = new Grid($("<div>").appendTo(QUnit.fixture), {
            dataSource: [
                { foo: "foo" }
            ],
            filterable: {
                messages: {
                    and: "foo",
                    or: "foo"
                }
            },
            columns: [
                {
                    field: "foo",
                    filterable: {
                        messages: {
                            and: "bar"
                        }
                    }
                }
            ]
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").options.messages.or, "foo");
    });

    test("column without field is not filterable", function() {
        var grid = new Grid(table, {
            filterable: true,
            columns: [{ title: "foo"}],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu"), undefined, "Column is not filterable");
    });

    test("unfilterable column from column settings", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            columns: [{filterable: false}],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu"), undefined, "Column is not filterable");
    });

    test("filter menu initialized event is raised", 1, function() {
        var grid = new Grid(table, {
            filterable: true,
            columns: [{ field: "foo"}],
            filterMenuInit: function() { ok(true); }
        });

        grid.thead.find("th").data("kendoFilterMenu").link.click();
    });

    test("unfilterable column from html attribute", function() {
        $(table).html("<thead><tr><th data-kendo-filterable=false data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu"), undefined, "Column is not filterable");
    });

    test("filterable options are initialized", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: {
                extra: false
            },
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").options.extra, false);
    });

    test("filterable options are initialized from column settings", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            columns: [{ filterable: { extra: false }}],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").options.extra, false);
    });

    test("column values are passed to the filterable", function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            columns: [{ values: [{ text: "foo", value: 0 }]}],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            },
        });

        equal(grid.thead.find("th").data("kendoFilterMenu").options.values.length, 1);
    });

    test("column filterable ui as function", 1, function() {
        $(table).html("<thead><tr><th data-kendo-field='col1'>col1</th></tr></thead><tbody><tr><td>&nbsp;</td></tr></tbody>");
        var grid = new Grid(table, {
            filterable: true,
            columns: [{ filterable: {
                    ui: function(element) {
                        element.addClass("foo");
                    }
            }}],
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            col1: {}
                        }
                    }
                }
            }
        });

        grid.thead.find("th").data("kendoFilterMenu").link.click();
        equal(grid.thead.find("th").data("kendoFilterMenu").form.find(".foo").length, 2);
    });

    test("detail th is created when thead is defined", function() {
        var grid = new Grid($('<table><th data-kendo-field="foo"></th></table>').appendTo(QUnit.fixture), {
                dataSource: [],
                detailInit: $.noop }),
            th = grid.thead.find("th");

        equal(th.length, 2);
        ok(th.eq(0).hasClass("k-hierarchy-cell"));
    });

    test("render column attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", attributes: { baz: "baz1" } },
                { field: "bar", attributes: { moo: "moo1" } }
            ]
        });

        equal(grid.tbody.find("tr:first > td:first").attr("baz"), "baz1");
        equal(grid.tbody.find("tr:first > td:last").attr("moo"), "moo1");
    });

    test("render command column attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { command: "foo", attributes: { baz: "baz1" } },
                { command: "bar", attributes: { moo: "moo1" } }
            ]
        });

        equal(grid.tbody.find("tr:first > td:first").attr("baz"), "baz1");
        equal(grid.tbody.find("tr:first > td:last").attr("moo"), "moo1");
    });

    test("render command button attributes as string", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { name: "foo", attr: "baz=baz1"  } } ]
        });

        equal(grid.tbody.find("tr:first > td:first a").attr("baz"), "baz1");
    });

    test("render command button attributes as object", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { name: "foo", attr: { baz: "baz1" }  } } ]
        });

        equal(grid.tbody.find("tr:first > td:first a").attr("baz"), "baz1");
    });

    test("render column header attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", headerAttributes: { baz: "baz1" } },
                { field: "bar", headerAttributes: { moo: "moo1" } }
            ]
        });

        equal(grid.thead.find("th:first").attr("baz"), "baz1");
        equal(grid.thead.find("th:last").attr("moo"), "moo1");
    });

    test("render command column header attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { command: "foo", headerAttributes: { baz: "baz1" } },
                { command: "bar", headerAttributes: { moo: "moo1" } }
            ]
        });

        equal(grid.thead.find("th:first").attr("baz"), "baz1");
        equal(grid.thead.find("th:last").attr("moo"), "moo1");
    });

    test("render column footer attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", footerAttributes: { baz: "baz1" }, footerTemplate: "foo" },
                { field: "bar", footerAttributes: { moo: "moo1" }, footerTemplate: "bar" }
            ]
        });

        equal(grid.footer.find("td:first").attr("baz"), "baz1");
        equal(grid.footer.find("td:last").attr("moo"), "moo1");
    });

    test("render command column footer attribute", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", footerAttributes: { baz: "baz1" }, footerTemplate: "foo" },
                { command: "bar", footerAttributes: { moo: "moo1" }, footerTemplate: "bar" }
            ]
        });

        equal(grid.footer.find("td:first").attr("baz"), "baz1");
        equal(grid.footer.find("td:last").attr("moo"), "moo1");
    });

    test("css class is added to custom command button", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: "bar" }]
        });

        ok(grid.tbody.find("tr:first > td:first a").hasClass("k-grid-bar"));
    });

    test("both service and custom css classes are added to custom command button", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { className: "bar", name: "foo" } }]
        });

        var button = grid.tbody.find("tr:first > td:first a");
        ok(button.hasClass("k-grid-foo"));
        ok(button.hasClass("bar"));
    });

    test("destroy command always adds default class when className is defined", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { className: "bar", name: "destroy" } }]
        });

        var button = grid.tbody.find("tr:first > td:first a");
        ok(button.hasClass("k-grid-delete"));
        ok(button.hasClass("bar"));
    });

    test("text is used if no name is set", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { text: "bar"} }]
        });

        ok(grid.tbody.find("tr:first > td:first a").hasClass("k-grid-bar"));
    });

    test("rowTemplate and altRowTemplate commands have the same class when text is used", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { text: "bar"} }]
        });

        var rowClass = grid.tbody.find("tr:first > td:first a").attr("class");
        var altRowClass = grid.tbody.find("tr:eq(1) > td:first a").attr("class");

        equal(rowClass, altRowClass);
    });

    test("spaces are removed from the text when used as class", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: { text: "bar baz"} }]
        });

        ok(grid.tbody.find("tr:first > td:first a").hasClass("k-grid-barbaz"));
    });

    test("custom command without name throws error", function() {
        raises(function() {
            var grid = new Grid(table, {
                dataSource: [{ foo: 1, bar: "bar"}],
                columns: [{ command: { className: "foo" } }]
            });
        },
        function(error) {
            return error.message === "Custom commands should have name specified";
        });
    });

    test("rowTemplate and altRowTemplate custom commands with name have the same class", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar"} }]
        });

        var rowClass = grid.tbody.find("tr:first > td:first a").attr("class");
        var altRowClass = grid.tbody.find("tr:eq(1) > td:first a").attr("class");

        equal(rowClass, altRowClass);
    });

    test("rowTemplate and altRowTemplate custom commands have the same classes when className is defined", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar", className: "className"} }]
        });

        var rowClass = grid.tbody.find("tr:first > td:first a").attr("class");
        var altRowClass = grid.tbody.find("tr:eq(1) > td:first a").attr("class");

        equal(rowClass, altRowClass);
    });

    test("commands preserve classes when added as string attributes", function(){
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar", attr: "style=\"color:blue;\" class=\"myclass\"" } }]
        });

        ok(grid.tbody.find("tr:first > td:first a").hasClass("myclass"));
    });

    test("commands preserve rest of attributes when class added through attributes as string", function(){
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar", attr: "style=\"color:blue;\" class=\"myclass\"" } }]
        });

        equal(grid.tbody.find("tr:first > td:first a").attr("style"), "color:blue;");
    });

    test("commands preserve classes when added as object attributes", function(){
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar", attr: { class: "myclass", style: "color: blue;" } } }]
        });

        ok(grid.tbody.find("tr:first > td:first a").hasClass("myclass"));
    });

    test("commands preserve rest of attributes when class added as object attributes", function(){
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}, { foo: 2, bar: "baz"}],
            columns: [ { command: { name: "bar", attr: { class: "myclass", style: "color:blue;" } } }]
        });

        equal(grid.tbody.find("tr:first > td:first a").attr("style"), "color:blue;");
    });

    test("custom command click handler is called if only text with multiple spaces is set", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                command: {
                    text: "bar baz boo",
                    click: function() {
                        ok(true);
                    }
                }
            }]
        });
        grid.items().first().find("td:first a").click();
    });

    test("custom command click handler is called", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                command: {
                    name: "bar",
                    click: function() {
                        ok(true);
                    }
                }
            }]
        });
        grid.items().first().find("td:first a").click();
    });

    test("custom command click handler is called - multiline headers", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                title: "foo",
                columns: [{
                    command: {
                        name: "bar",
                        click: function() {
                            ok(true);
                        }
                    } }]
            }]
        });
        grid.items().first().find("td:first a").click();
    });

    test("custom command click handler is called if multiple commands", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                command: [{
                    name: "bar",
                    click: function() {
                        ok(true);
                    }
                }, "othercommand"]
            }]
        });
        grid.items().first().find("td:first a:first").click();
        grid.items().first().find("td:first a:last").click();
    });

    test("command name is passed to custom command click handler", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                command: [{
                    name: "bar",
                    click: function(e) {
                        equal(e.data.commandName, "bar");
                    }
                }]
            }]
        });
        grid.items().first().find("td:first a:first").click();
    });

    test("grid instance is the context for the custom command handler", 1, function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
            {
                command: [{
                    name: "bar",
                    click: function(e) {
                        deepEqual(this, grid);
                    }
                }]
            }]
        });
        grid.items().first().find("td:first a:first").click();
    });

    test("render column header template", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "foo", headerTemplate: "custom text" } ]
        });
        equal(grid.thead.find("tr:first > th:first").text(), "custom text");
    });

    test("column header template as function", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "foo", headerTemplate: function() { return "custom text" } } ]
        });
        equal(grid.thead.find("tr:first > th:first").text(), "custom text");
    });

    test("render command column header template", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { command: "foo", headerTemplate: "custom text" } ]
        });
        equal(grid.thead.find("tr:first > th:first").text(), "custom text");
    });

    test("column displays value from values", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "foo", values: [ { value: 0, text: "custom text" }, { value: 1, text: "custom text1" },{ value: 2, text: "custom text2" }] } ]
        });

        equal(grid.items().first().find("td:first").text(), "custom text1");
    });

    test("column displays value from values with #", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "foo", values: [ { value: 0, text: "custom text" }, { value: 1, text: "custom # text1" },{ value: 2, text: "custom text2" }] } ]
        });

        equal(grid.items().first().find("td:first").text(), "custom # text1");
    });

    test("column displays field defined via array access", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "['foo']" }]
        });

        equal(grid.items().first().find("td:first").text(), "1");
    });

    test("empty cell is displayed when value does not exists in values", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 3, bar: "bar"}],
            columns: [ { field: "foo", values: [ { value: 0, text: "custom text" }, { value: 1, text: "custom text1" },{ value: 2, text: "custom text2" }] } ]
        });

        equal(grid.items().first().find("td:first").text(), "");
    });

    test("column displays value from values if text is zero", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 0, bar: "bar"}],
            columns: [ { field: "foo", values: [ { value: 0, text: 0 }, { value: 1, text: "custom text1" },{ value: 2, text: "custom text2" }] } ]
        });

        equal(grid.items().first().find("td:first").text(), "0");
    });

    test("column does not display value from values if value field is not defined", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [ { field: "foo", values: [ "custom text" ] } ]
        });

        equal(grid.items().first().find("td:first").text(), "1");
    });

    test("hidden column does not render cols", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", hidden: true },
                { field: "bar" }
            ]
        });

        equal(grid.thead.prev().find("col").length, 1);
        equal(grid.tbody.prev().find("col").length, 1);
    });

    test("hidden group column does not render cols - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { hidden: true, columns: [ "foo" ] },
                { field: "bar" }
            ]
        });

        equal(grid.thead.prev().find("col").length, 1);
        equal(grid.tbody.prev().find("col").length, 1);
    });

    test("hidden child column does not render cols - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: [ { field: "foo", hidden: true } ] },
                { field: "bar" }
            ]
        });

        equal(grid.thead.prev().find("col").length, 1);
        equal(grid.tbody.prev().find("col").length, 1);
    });

    test("hidden column set hidden attribute for header cell", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", hidden: true },
                { field: "bar" }
            ]
        });

        equal(grid.columns[0].headerAttributes.style, "display:none");
    });

    test("hidden group column set hidden attribute for child columns header cell - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: ["foo", "baz"], hidden: true },
                { field: "bar" }
            ]
        });

        equal(grid.columns[0].headerAttributes.style, "display:none");
        equal(grid.columns[0].columns[0].headerAttributes.style, "display:none");
        equal(grid.columns[0].columns[1].headerAttributes.style, "display:none");
    });

    test("hidden group column set hidden for child columns - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: ["foo", "baz"], hidden: true },
                { field: "bar" }
            ]
        });

        ok(grid.columns[0].hidden);
        ok(grid.columns[0].columns[0].hidden);
        ok(grid.columns[0].columns[1].hidden);
    });

    test("hidden child columns set parent as hidden - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: ["foo", { columns: [{ field: "boo", hidden: true }, { field: "moo", hidden: true }], title: "baz" }] },
                { field: "bar" }
            ]
        });

        ok(!grid.columns[0].hidden);
        ok(!grid.columns[0].columns[0].hidden);
        ok(grid.columns[0].columns[1].hidden);
    });

    test("hidden child columns set parent colSpan - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: ["foo", { columns: [{ field: "boo", hidden: true }, { field: "moo" }], title: "baz" }] },
                { field: "bar" }
            ]
        });

        var parentCell = grid.thead.find(">tr:first th:first");

        equal(parentCell[0].colSpan, 2);
        equal(parentCell.attr(kendo.attr("colspan")), 3);
    });


    test("hidden all child columns set parent as hidden - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { columns: [{ field: "foo", hidden: true }, { columns: [{ field: "boo", hidden: true }, { field: "moo", hidden: true }], title: "baz" }]},
                { field: "bar" }
            ]
        });

        ok(grid.columns[0].hidden);
        ok(grid.columns[0].columns[0].hidden);
        ok(grid.columns[0].columns[1].hidden);
    });

    test("hidden column set hidden attribute for footer cell", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", hidden: true, footerTemplate: "foo" },
                { field: "bar" }
            ]
        });

        equal(grid.columns[0].footerAttributes.style, "display:none");
    });

    test("hidden columns set hidden attribute for data cell", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            columns: [
                { field: "foo", hidden: true },
                { field: "bar" }
            ]
        });

        equal(grid.columns[0].attributes.style, "display:none");
    });

    test("detail cell colspan depends on visible columns", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            detailTemplate: "foo",
            columns: [
                { field: "foo", hidden: true },
                { field: "bar" }
            ]
        });

        grid.expandRow(grid.items()[0]);

        equal(grid.tbody.find(".k-detail-row>.k-detail-cell").attr("colspan"), "1");
    });

    test("detail cell colspan depends on visible columns - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: [{ foo: 1, bar: "bar"}],
            detailTemplate: "foo",
            columns: [
                { columns: [{ field: "foo", hidden: true }, { field: "foo", hidden: false }] },
                { field: "bar" },
                { columns: [ { title: "bar", hidden: true }] }
            ]
        });

        grid.expandRow(grid.items()[0]);

        equal(grid.tbody.find(".k-detail-row>.k-detail-cell").attr("colspan"), "2");
    });

    test("group cell is visible when initially hidden grid is shown", function() {

        $(table).hide();

        var grid = new Grid(table, {
            dataSource: {
                data: [{ foo: 1, bar: "bar"}],
                group: { field: "bar" }
            },
            columns: [
                { field: "bar" },
                {title: "bar" }
            ]
        });

        $(table).show();

        grid.refresh();

        equal(grid.thead.find("th:visible").length, 3);
    });

    test("group cell is visible when initially hidden grid is shown with filter row", function() {

        $(table).hide();

        var grid = new Grid(table, {
            dataSource: {
                data: [{ foo: 1, bar: "bar"}],
                group: { field: "bar" }
            },
            filterable: { mode: "row" },
            columns: [
                { field: "bar" },
                {title: "bar" }
            ]
        });

        $(table).show();

        grid.refresh();

        equal(grid.thead.find("th:visible").length, 6);
    });
    test("group cell colspan depends on visible columns - multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: {
                data: [{ foo: 1, bar: "bar"}],
                group: { field: "bar" }
            },
            columns: [
                { columns: [{ field: "foo", hidden: true }, { field: "foo", hidden: false }] },
                { field: "bar" },
                { columns: [ { title: "bar", hidden: true }] }
            ]
        });

        equal(grid.table.find("col").length, 3);
        equal(grid.tbody.find(".k-grouping-row>td")[0].colSpan, 3);
    });

    test("group cell colspan depends on visible columns - locked columns with multiline headers", function() {
        var grid = new Grid(table, {
            dataSource: {
                data: [{ foo: 1, bar: "bar"}],
                group: { field: "bar" }
            },
            columns: [
                { columns: [{ field: "foo", hidden: true }, { field: "foo", hidden: false }] },
                { field: "bar", locked: true },
                { columns: [ { title: "bar", hidden: true }] }
            ]
        });

        equal(grid.lockedTable.find("col").length, 2);
        equal(grid.lockedTable.find(".k-grouping-row>td")[0].colSpan, 2);

        equal(grid.table.find("col").length, 1);
        equal(grid.table.find(".k-grouping-row>td")[0].colSpan, 1);
    });

    test("group cell colspan depends on visible columns", function() {
        var grid = new Grid(table, {
            dataSource: {
                data: [{ foo: 1, bar: "bar"}],
                group: { field: "foo" }
            },
            columns: [
                { field: "foo", hidden: true },
                { field: "bar" }
            ]
        });

        grid.expandRow(grid.items()[0]);

        equal(grid.tbody.find(".k-grouping-row>td").attr("colspan"), "2");
    });

    test("error is thrown if locked columns and detail template are set", function() {
        throws(function() {
            var grid = new Grid(table, {
                detailTemplate: "foo",
                columns: [ { locked: true }, "foo" ]
            });
        });
    });

    test("error is thrown if locked columns and row template are set", function() {
        throws(function() {
            var grid = new Grid(table, {
                rowTemplate: "foo",
                columns: [ { locked: true }, "foo" ]
            });
        });
    });

    test("error is thrown if locked columns and alt row template are set", function() {
        throws(function() {
            var grid = new Grid(table, {
                altRowTemplate: "foo",
                columns: [ { locked: true }, "foo" ]
            });
        });
    });

    test("error is thrown if all columns are set as locked columns", function() {
        throws(function() {
            var grid = new Grid(table, {
                columns: [ { locked: true } ]
            });
        });
    });

    test("items returns the grid items twice in frozen columns mode", function() {
        var grid = new Grid(table, {
            dataSource: [
                { foo: "foo", bar: "bar" }
            ],
            columns: [
                { field: "foo", locked: true },
                { field: "bar" }
            ]
        });

        equal(grid.items().length, 2);
    });

    test("dataItems returns the datasource view", function() {
        var grid = new Grid(table, {
            dataSource: [
                { foo: "foo", bar: "bar" }
            ],
            columns: [
                { field: "foo" },
                { field: "bar" }
            ]
        });

        equal(grid.dataItems().length, 1);
    });

    test("dataItems returns the datasource view twice in frozen columns mode", function() {
        var grid = new Grid(table, {
            dataSource: [
                { foo: "foo", bar: "bar" }
            ],
            columns: [
                { field: "foo", locked: true },
                { field: "bar" }
            ]
        });

        equal(grid.dataItems().length, 2);
    });

    test("Default commands text can be configured through the widget's options", 2, function() {
        var grid = new Grid(table, {
            dataSource: [
                { foo: "foo", bar: "bar" }
            ],
            columns: [
                { command: ["edit", { name: "destroy" }] }
            ],
            messages: {
                commands: {
                    edit: "foo",
                    destroy: "bar"
                }
            }
        });

        equal(grid.wrapper.find(".k-grid-edit").text(), "foo");
        equal(grid.wrapper.find(".k-grid-delete").text(), "bar");
    });

    test("adds column indices when initializing from HTML", function() {
        var columns = $.map("abcdefghijklm".split(""), function(x) { return { field: x }; });
        var element = $(
            "<table><thead><tr>" +
                $.map(columns, function(x) {
                    return "<th data-field='" + x.field + "'>" + x.field + "</th>";
                }).join("") +
            "</tr></thead></table>"
        ).appendTo(QUnit.fixture);
        var grid = new Grid(element, { columns: columns });

        equal(grid.thead.find("th:first").attr("data-kendo-index"), "0");
    });

})();
