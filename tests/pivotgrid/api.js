(function() {
    var PivotDataSource = kendo.data.PivotDataSource,
        PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid expand columns", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createPivot(options) {
        options = options || {};

        if (!options.dataSource) {
            options.dataSource = new kendo.data.PivotDataSource({
                schema: {
                    axes: function() {
                        return {};
                    }
                }
            });
        }

        return new PivotGrid($(div), options);
    }

    function createDataSource(tuples, data) {
        return new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: tuples || []
                            }
                        },
                        data: data || []
                    });
                }
            }
        });
    }

    test("PivotGrid calls expandColumns on click", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var dataSource = createDataSource(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        var button = th.find("span");

        stub(dataSource, {
            expandColumn: dataSource.expandColumn
        });

        button.click();

        equal(dataSource.calls("expandColumn"), 1);
        deepEqual(dataSource.args("expandColumn")[0], ["level 0"]);
    });

    test("expandMember is triggered on column header expand", 1 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];
        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            expandMember: function(e) {
                ok(true);
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        headerTable.find("th span").click();
    });

    test("expandMember arguments on column header expand", 2 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];
        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            expandMember: function(e) {
                equal(e.axis, "columns");
                equal(e.path, "level 0");
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        headerTable.find("th span").click();
    });

    test("prevent expandMember on column header expand", 1 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            expandMember: function(e) {
                e.preventDefault();
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        var button = headerTable.find("th span").click();

        ok(button.hasClass("k-i-arrow-e"));
    });

    test("collapseMember is triggered on column header collapse", 1 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];
        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            collapseMember: function(e) {
                ok(true);
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        headerTable.find("th span").click().click();
    });

    test("collapseMember arguments on column header collapse", 2 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];
        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            collapseMember: function(e) {
                equal(e.axis, "columns");
                equal(e.path, "level 0");
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        headerTable.find("th span").click().click();
    });

    test("prevent collapseMember on column header collapse", 1 , function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples),
            collapseMember: function(e) {
                e.preventDefault();
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        var button = headerTable.find("th span").click().click();

        ok(button.hasClass("k-i-arrow-s"));
    });

    test("PivotGrid collapases tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] }
        ];

        var dataSource = createDataSource(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        var button = th.find("span");

        stub(dataSource, {
            expandColumn: dataSource.expandColumn
        });

        equal(headerTable.find("th").length, 5);

        //collapse
        button.click();

        equal(dataSource.calls("expandColumn"), 0);
        equal(headerTable.find("th").length, 1);
    });

    test("PivotGrid does not request when expand manually collapsed tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] }
        ];

        var dataSource = createDataSource(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        var button = th.find("span");

        //collapse
        button.click();

        stub(dataSource, {
            expandColumn: dataSource.expandColumn
        });

        //expand
        button.click();

        equal(dataSource.calls("expandColumn"), 0);
        equal(headerTable.find("th").length, 5);
    });

    test("PivotGrid collapses child tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", hasChildren: true, parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "2", parentName: "level 0_1", children: [] }] }
        ];

        var dataSource = createDataSource(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var button = headerTable.find("span.k-icon").eq(1);

        stub(dataSource, {
            expandColumn: dataSource.expandColumn
        });

        //collapses
        button.click();

        equal(dataSource.calls("expandColumn"), 0);
        equal(headerTable.find("tr").length, 2);
    });

    module("PivotGrid expand rows", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createDataSourceRows(tuples, data, measures) {
        return new PivotDataSource({
            measures: {
                values: measures || [],
                axis: "rows"
            },
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: {
                                tuples: tuples || []
                            }
                        },
                        data: data || []
                    });
                }
            }
        });
    }

    test("PivotGrid calls expandRow on click", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var dataSource = createDataSourceRows(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");

        var td = headerTable.find("td");

        var button = td.find("span");

        stub(dataSource, {
            expandRow: dataSource.expandRow
        });

        button.click();

        equal(dataSource.calls("expandRow"), 1);
        deepEqual(dataSource.args("expandRow")[0], ["level 0"]);
    });

    test("expandMember is triggered on row expand", 1, function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            expandMember: function() {
                ok(true);
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        headerTable.find("td").find("span").click();
    });

    test("expandMember arguments on row expand", 2, function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            expandMember: function(e) {
                equal(e.axis, "rows");
                equal(e.path, "level 0");
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        headerTable.find("td").find("span").click();
    });

    test("prevent expandMember on row expand", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            expandMember: function(e) {
                e.preventDefault();
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        var button = headerTable.find("td").find("span").click();

        ok(button.hasClass("k-i-arrow-e"));
    });

    test("collapseMember is triggered on row collapse", 1, function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            collapseMember: function() {
                ok(true);
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        headerTable.find("td").find("span").click().click();
    });

    test("collapseMember arguments on row collapse", 2, function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            collapseMember: function(e) {
                equal(e.axis, "rows");
                equal(e.path, "level 0");
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        headerTable.find("td").find("span").click().click();
    });

    test("prevent collapseMember on row collapse", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples),
            collapseMember: function(e) {
                e.preventDefault();
            }
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");
        var button = headerTable.find("td").find("span").click().click();

        ok(button.hasClass("k-i-arrow-s"));
    });

    test("PivotGrid collapases tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] }
        ];

        var dataSource = createDataSourceRows(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");

        var td = headerTable.find("td");

        var button = td.find("span");

        stub(dataSource, {
            expandRow: dataSource.expandRow
        });

        equal(headerTable.find("td").length, 5);

        //collapse
        button.click();

        equal(dataSource.calls("expandRow"), 0);
        equal(headerTable.find("td").length, 1);
    });

    test("PivotGrid does not request when expand manually collapsed tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] }
        ];

        var dataSource = createDataSourceRows(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");

        var td = headerTable.find("tr:first").find("td:first");

        var button = td.find("span");

        //collapse
        button.click();

        stub(dataSource, {
            expandRow: dataSource.expandRow
        });

        //expand
        button.click();

        equal(dataSource.calls("expandRow"), 0);
    });

    test("PivotGrid collapses child tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", hasChildren: true, parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "2", parentName: "level 0_1", children: [] }] }
        ];

        var dataSource = createDataSourceRows(tuples);

        var pivotgrid = createPivot({
            dataSource: dataSource
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-rowheaders").find("table");

        var td = headerTable.find("tr:first").find("td:first");

        var button = td.find("span");

        stub(dataSource, {
            expandRow: dataSource.expandRow
        });

        //collapses
        button.click();

        equal(dataSource.calls("expandRow"), 0);
        equal(headerTable.find("tr").length, 1);
    });

    module("PivotGrid Cell Info API", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createPivot(options) {
        options = options || {};

        if (!options.dataSource) {
            options.dataSource = new kendo.data.PivotDataSource({
                schema: {
                    axes: function() {
                        return {};
                    }
                }
            });
        }

        return new PivotGrid($(div), options);
    }

    function createDataSource(tuples, data, measures) {
        return new PivotDataSource({
            measures: measures || [],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: tuples || []
                            }
                        },
                        data: data || []
                    });
                }
            }
        });
    }

    test("PivotGrid returns info for TD element", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: false, children: [] }] }
        ];

        var data = [
            { value: 1 }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data)
        });

        var cell = pivotgrid.wrapper.find(".k-grid-content").find("table").find("td");
        var info = pivotgrid.cellInfo(cell);

        equal(info.dataItem, pivotgrid.dataSource.data()[0]);
        equal(info.columnTuple, tuples[0]);
        equal(info.rowTuple, null);
        equal(info.measure, null);
    });

    test("PivotGrid returns info based on row/column index", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
        ];

        var data = [
            { value: 1 },
            { value: 2 },
            { value: 3 }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data)
        });

        var info = pivotgrid.cellInfo(1, 0);

        equal(info.dataItem, pivotgrid.dataSource.data()[1]);
        equal(info.columnTuple, tuples[1]);
        equal(info.rowTuple, null);
        equal(info.measure, null);
    });

    test("PivotGrid returns info with rowTuple based on row/column index", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
        ];

        var data = [
            { value: 1 },
            { value: 2 },
            { value: 3 }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples, data)
        });

        var info = pivotgrid.cellInfo(0, 2);

        equal(info.dataItem, pivotgrid.dataSource.data()[0]);
        equal(info.columnTuple, null);
        equal(info.rowTuple, tuples[0]);
        equal(info.measure, null);
    });

    test("PivotGrid returns info with rowTuple with measure based on indexes", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "measure 1", children: [] } ] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "measure 2", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "measure 1", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "measure 2", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] }, { name: "measure 1", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] }, { name: "measure 2", children: [] } ] }
        ];

        var data = [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 }
        ];

        var measures = ["measure 1", "measure 2"];

        var pivotgrid = createPivot({
            dataSource: createDataSourceRows(tuples, data, measures)
        });

        var info = pivotgrid.cellInfo(0, 1);

        equal(info.dataItem, pivotgrid.dataSource.data()[5]);
        equal(info.columnTuple, null);
        equal(info.rowTuple.members[0].name, "dim 0_2");
        equal(info.measure, "measure 2");
    });

    test("PivotGrid returns only measure info", function() {
        var tuples = [
            { members: [ { name: "measure 1", children: [] } ] },
            { members: [ { name: "measure 2", children: [] } ] },
        ]

        var measures = [ "measure 1", "measure 2"];

        var data = [
            { value: 1 },
            { value: 2 }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data, measures)
        });

        var info = pivotgrid.cellInfo(1, 0);

        equal(info.dataItem, pivotgrid.dataSource.data()[1]);
        equal(info.columnTuple, null);
        equal(info.rowTuple, null);
        equal(info.measure, "measure 2");
    });

    test("PivotGrid returns null if no such data cell", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
        ];

        var data = [
            { value: 1 },
            { value: 2 },
            { value: 3 }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data)
        });

        var info = pivotgrid.cellInfo(0, 1);

        equal(info, null);
    });
})();
