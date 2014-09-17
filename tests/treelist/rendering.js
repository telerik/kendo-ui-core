(function() {
    var dom;
    var instance;

    module("TreeList rendering", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend({
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                    { id: 2, parentId: 1 }
                ]
            },
            columns: [ "id", "parentId" ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("adds wrapper class to element", function() {
        createTreeList();

        ok(dom.hasClass("k-widget"));
        ok(dom.hasClass("k-treelist"));
    });

    test("adds header element", function() {
        createTreeList();

        equal(dom.find(".k-grid-header").length, 1);
        equal(dom.find(".k-grid-header-wrap").length, 1);
        ok(instance.header);
    });

    test("renders dataSource items initially", function() {
        createTreeList();

        equal(instance.content.find("tr").length, 1);
    });

    test("renders header cells for every column", function() {
        createTreeList();

        equal(instance.header.find("th").length, 2);
    });

    test("renders data within cells", function() {
        createTreeList();

        var cells = instance.content.find("td");

        equal(cells.eq(0).text(), 1);
        equal(cells.eq(1).text(), "null");
    });

    test("refreshes DOM on dataSource change", function() {
        createTreeList();

        instance.dataSource.data([]);

        equal(instance.content.find("td").length, 0);
    });

    test("renders expand arrows", function() {
        createTreeList();

        equal(instance.content.find("span.k-icon.k-i-expand").length, 1);
    });

    test("renders expand arrows in expandable column", function() {
        createTreeList({
            columns: [ "id", { field: "parentId", expandable: true } ]
        });

        var expandArrow = instance.content.find("span.k-icon.k-i-expand")
        equal(expandArrow.closest("td").index(), 1);
    });

    var expandedDataSource = {
        data: [
            { id: 1, expanded: true, parentId: null },
            { id: 2, parentId: 1 },
            { id: 3, parentId: 1 }
        ]
    };

    test("renders child items of expanded nodes", function() {
        createTreeList({ dataSource: expandedDataSource });

        equal(instance.content.find("tr").length, 3);
    });

    test("renders indent on child items", function() {
        createTreeList({ dataSource: expandedDataSource });

        var blankIcon = instance.content.find("span.k-icon.k-i-none");
        equal(blankIcon.length, 4);
        equal(blankIcon.closest("tr").length, 2);
    });

    test("alternates k-alt styles between children", function() {
        createTreeList({ dataSource: expandedDataSource });

        var alt = instance.content.find(".k-alt");
        equal(alt.length, 1);
        equal(alt.index(), 1);
    });

    test("renders column titles within headers", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", title: "Foo" }
            ]
        });

        equal(instance.header.find("th:last").text(), "Foo");
    });

    test("does not render expand arrows when hasChildren is false", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1, parentId: null, expanded: true },
                    { id: 2, parentId: 1 }
                ]
            }
        });

        equal(instance.content.find(".k-icon.k-i-expand").length, 0);
    });

    test("column template as string", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", template: "Template #=id#" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "Template 1");
    });

    test("column template as function", function() {
        var templateFunction = function(data) {
            return "Template " + data.id;
        };

        createTreeList({
            columns: [
                "id",
                { field: "parentId", template: templateFunction },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "Template 1");
    });

    test("column without field is rendered empty", function() {
        createTreeList({
            columns: [
                "id",
                { title: "foo" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "");
    });

    test("format column value", function() {
        createTreeList({
            columns: [
                { field: "id", format: "{0}-{0}" },
                "parentId"
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.content.find("tr>td:first").text(), "1-1");
    });

    test("column values are encoded", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1, parentId: null, text: "<div>foo</div>" },
                ]
            },
            columns: [ "id", "text"]
        });

        equal(instance.content.find("tr>td:last").text(), "<div>foo</div>");
    });

    test("column values are not encoded", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1, parentId: null, text: "<div>foo</div>" },
                ]
            },
            columns: [
                "id",
                { field: "text", encoded: false }
            ]
        });

        equal(instance.content.find("tr>td:last").text(), "foo");
    });

    test("column render title", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", title: "foo" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "foo");
    });

    test("column field is rendered when no title is specified", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", title: "foo" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.header.find("tr>th:first").text(), "id");
    });

    test("render empty string for column title", function() {
        createTreeList({
            columns: [
                { template: "foo" },
                { field: "parentId", title: "foo" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.header.find("tr>th:first").text(), "");
    });

    test("column header template as string", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", headerTemplate: "Header template" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "Header template");
    });

    test("column header template as function", function() {
        var templateFunction = function(data) {
            return "Header template";
        };

        createTreeList({
            columns: [
                "id",
                { field: "parentId", headerTemplate: templateFunction },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "Header template");
    });
})();
