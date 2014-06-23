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

    function createDataSourceRows(tuples, data) {
        return new PivotDataSource({
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
})();
