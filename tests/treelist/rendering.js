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

        equal(instance.content.find("tr").length, 2);
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

        equal(instance.content.find("tr").length, 0);
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

    test("alternates k-alt styles correctly after expand", function() {
        createTreeList({
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 }
            ]
        });

        var rows = instance.content.find("tr");

        var firstRow = rows.eq(0);
        instance.collapse(firstRow);
        instance.expand(firstRow);

        ok(rows.eq(1).hasClass("k-alt"));
        ok(!rows.eq(2).hasClass("k-alt"));
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
                { field: "parentId", template: templateFunction }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "Template 1");
    });

    test("column template is not rendered encoded", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", template: "<div>foo</div>" },
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "foo");
    });

    test("column without field is rendered empty", function() {
        createTreeList({
            columns: [ "id", { title: "foo" } ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.content.find("tr>td:last").text(), "");
    });

    test("render empty cell if column field is undefined in the model", function() {
        createTreeList({
            columns: [ "id", "text" ],
            dataSource: {
                data: [
                    { id: 1, text: "foo",  parentId: null },
                    { id: 2, parentId: null }
                ]
            }
        });

        equal(instance.content.find("tr:first>td:last").text(), "foo");
        equal(instance.content.find("tr:last>td:last").text(), "");
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
                    { id: 1, parentId: null, text: "<div>foo</div>" }
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
                    { id: 1, parentId: null, text: "<div>foo</div>" }
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
                { field: "parentId", title: "foo" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "foo");
    });

    test("column field is rendered when no title is specified", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", title: "foo" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find("tr>th:first").text(), "id");
    });

    test("render empty string for column title", function() {
        createTreeList({
            columns: [
                { template: "foo" },
                { field: "parentId", title: "foo" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find("tr>th:first").text(), "");
    });

    test("column header template as string", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", headerTemplate: "Header template" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "Header template");
    });

    test("column header template does not encode HTML", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", headerTemplate: "<span class='foo' />" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find(".foo").length, 1);
    });

    test("column header template as function", function() {
        var templateFunction = function(data) {
            return "Header template";
        };

        createTreeList({
            columns: [
                "id",
                { field: "parentId", headerTemplate: templateFunction }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        equal(instance.header.find("tr>th:last").text(), "Header template");
    });

    test("footer template as function is rendered", function() {
        var templateFunction = function() {
            return "Footer template";
        };

        createTreeList({
            columns: [
                "id",
                { field: "parentId", footerTemplate: templateFunction }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null }
                ]
            }
        });

        var footers = instance.content.find("tr.k-footer-template");
        equal(instance.content.find("tr").length, 2);
        equal(footers.length, 1);
        equal(footers.find("td").eq(0).text(), "", "Footer cells without content should be empty");
        equal(footers.find("td").eq(1).text(), "Footer template");
    });

    test("footer template renders for child rows", function() {
        var templateFunction = function() {
            return "Footer template";
        };

        createTreeList({
            columns: [ { field: "id", footerTemplate: templateFunction } ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, expanded: true },
                    { id: 2, parentId: 1 },
                    { id: 3, parentId: 1 }
                ]
            }
        });

        var footers = instance.content.find("tr.k-footer-template");

        equal(footers.length, 2);
        equal(footers.find("td").first().find(".k-i-none").length, 2);
        equal(footers.find("td").last().text(), "Footer template");
    });

    test("footer template as string compiles template", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "foo" } ],
            dataSource: {
                data: [ { id: 1, parentId: null } ]
            }
        });

        var footers = instance.content.find("tr.k-footer-template");

        equal(footers.find("td").last().text(), "foo");
    });

    test("footer template as HTML string", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "<b>foo</b>" } ],
            dataSource: {
                data: [ { id: 1, parentId: null } ]
            }
        });

        var footers = instance.content.find("tr.k-footer-template");

        equal(footers.find("td").last().text(), "foo");
    });

    test("footer template is passed aggregate values", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "#= count #" } ],
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                    { id: 2, parentId: null }
                ],
                aggregate: [
                    { field: "id", aggregate: "count" }
                ]
            }
        });

        var footers = instance.content.find("tr.k-footer-template");

        equal(footers.find("td").last().text(), "2");
    });

    test("footer template is passed correct aggregates for child rows", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "#= count #" } ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, expanded: true },
                    { id: 2, parentId: 1 },
                    { id: 3, parentId: 1 },
                    { id: 4, parentId: 1 }
                ],
                aggregate: [
                    { field: "id", aggregate: "count" }
                ]
            }
        });

        var footerCells = instance.content.find("tr.k-footer-template td");

        equal(footerCells.eq(0).text(), "3", "Child footer template");
        equal(footerCells.eq(1).text(), "4", "Root footer template");
    });

    test("footer template gets aggregate for own column", function() {
        createTreeList({
            columns: [
                { field: "id", footerTemplate: "#= max #" },
                { field: "foo", footerTemplate: "#= sum #" }
            ],
            dataSource: {
                data: [
                    { id: 1, foo: 8, parentId: null, expanded: true },
                    { id: 2, foo: 1, parentId: 1 },
                    { id: 3, foo: 3, parentId: 1 },
                    { id: 4, foo: 5, parentId: 1 }
                ],
                aggregate: [
                    { field: "id", aggregate: "max" },
                    { field: "foo", aggregate: "sum" }
                ]
            }
        });

        var footerCells = instance.content.find("tr.k-footer-template td");

        equal(footerCells.eq(0).text(), "4", "Child footer template, max id");
        equal(footerCells.eq(1).text(), "9", "Child footer template, sum foo");
        equal(footerCells.eq(2).text(), "4", "Root footer template, max id");
        equal(footerCells.eq(3).text(), "17", "Root footer template, sum foo");
    });

    test("scrollable:false renders one table", function() {
        createTreeList({
            scrollable: false,
            dataSource: [ { id: 1 } ],
            columns: [ { field: "id" } ]
        });

        equal(instance.element.find("table").length, 1);
    });

    test("renders colgroup elements in all tables", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [ { field: "id" } ]
        });

        equal(instance.element.find("colgroup").length, 2);
    });

    test("renders single colgroup in non-scrollable grid", function() {
        createTreeList({
            scrollable: false,
            dataSource: [ { id: 1 } ],
            columns: [ { field: "id" } ]
        });

        equal(instance.element.find("colgroup").length, 1);
    });

    function button(command) {
        command = command ? (".k-grid-" + command) : ""
        return instance.content.find(".k-button.k-button-icontext" + command);
    }

    test("command column renders default buttons", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        var editButton = button("edit");
        equal(editButton.length, 1);
        equal(editButton.text(), "Edit");
        equal(editButton.find(".k-icon.k-edit").length, 1);
    });

    test("command column with multiple buttons renders them all", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit", "destroy"] }
            ]
        });

        equal(button("edit").length, 1);
        equal(button("delete").length, 1);
    });

    test("command column allows command customization", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "edit", text: "Change" } ] }
            ]
        });

        var editButton = button("edit");
        equal(editButton.length, 1);
        equal(editButton.text(), "Change");
    });

    test("custom commands render button without icon", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "foo", text: "Bar" } ] }
            ]
        });

        var fooButton = button();
        equal(fooButton.length, 1);
        equal(fooButton.text(), "Bar");
        equal(fooButton.find(".k-icon").length, 0);
    });

    test("custom commands render name as text", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "foo" } ] }
            ]
        });

        var fooButton = button();
        equal(fooButton.length, 1);
        equal(fooButton.text(), "foo");
    });

    test("change default text of edit command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "edit" } ] }
            ],
            messages: {
                commands: {
                    edit: "foo"
                }
            }
        });

        equal(button("edit").text(), "foo");
    });

    test("change default text of destroy command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "destroy" } ] }
            ],
            messages: {
                commands: {
                    destroy: "foo"
                }
            }
        });

        equal(button("delete").text(), "foo");
    });

    test("change default text of update command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "edit" } ] }
            ],
            messages: {
                commands: {
                    update: "foo"
                }
            }
        });

        instance.editRow("tr:first");
        equal(button("update").text(), "foo");
    });

    test("change default text of cancel command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "edit" } ] }
            ],
            messages: {
                commands: {
                    canceledit: "foo"
                }
            }
        });

        instance.editRow("tr:first");
        equal(button("cancel").text(), "foo");
    });

    test("change default text of create command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" }
            ],
            toolbar: [ "create" ],
            messages: {
                commands: {
                    create: "foo"
                }
            }
        });

        equal(instance.wrapper.find(".k-grid-toolbar .k-grid-add").text(), "foo");
    });

    test("defeault text for createchild command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "createchild" } ] }
            ]
        });

        equal(button("add").text(), "Add child record");
    });

    test("change default text of createchild command button", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [ { name: "createchild" } ] }
            ],
            messages: {
                commands: {
                    createchild: "foo"
                }
            }
        });

        equal(button("add").text(), "foo");
    });

    test("toolbar as a string template", function() {
        createTreeList({
            toolbar: "<p class='foo'>bar</p>"
        });

        var toolbar = dom.find(".k-header.k-grid-toolbar");
        equal(toolbar.length, 1);
        equal(toolbar.find(".foo").length, 1);
    });

    test("toolbar as a compiled template", function() {
        createTreeList({
            toolbar: kendo.template("<p class='foo'>bar</p>")
        });

        var toolbar = dom.find(".k-header.k-grid-toolbar");
        equal(toolbar.find(".foo").length, 1);
    });

    test("toolbar as an array of commands", function() {
        createTreeList({
            toolbar: ["create", "create"]
        });

        var toolbar = dom.find(".k-header.k-grid-toolbar");
        equal(toolbar.find("button").length, 2);
        equal(toolbar.find(".k-grid-add").length, 2);
    });

    test("filterable option renders filter icons", function() {
        createTreeList({
            filterable: true,
            columns: [ { field: "id" } ]
        });

        var filterButton = dom.find("th.k-header a.k-grid-filter");
        equal(filterButton.length, 1);
        equal(filterButton.find("span.k-icon.k-filter").length, 1);
    });

    test("links for filtering and sorting are rendered independent", function() {
        createTreeList({
            filterable: true,
            sortable: true,
            columns: [ { field: "id" } ]
        });

        equal(dom.find("th.k-header a a").length, 0);
    });

    test("filterable option adds classes to header cell", function() {
        createTreeList({
            filterable: true,
            columns: [ { field: "id" } ]
        });

        var headerCell = dom.find("th.k-header");
        ok(headerCell.hasClass("k-with-icon"));
        ok(headerCell.hasClass("k-filterable"));
    });

    test("filterable columns get a filterMenu instance", function() {
        createTreeList({
            filterable: true,
            columns: [ { field: "id" } ]
        });

        ok(dom.find("th.k-header").data("kendoFilterMenu"));
    });

    test("filtering icon is not rendered for command column", function() {
        createTreeList({
            filterable: true,
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        equal(dom.find(".k-grid-filter").length, 1);
    });

    test("filtering can be suppressed per column", function() {
        createTreeList({
            filterable: true,
            columns: [
                { field: "id" },
                { field: "parentId", filterable: false }
            ]
        });

        equal(dom.find(".k-grid-filter").length, 1);
    });

    test("filtering is passed filtering options", function() {
        var filterMenu = $.fn.kendoFilterMenu;

        try {
            $.fn.kendoFilterMenu = function(options) {
                ok(options.foo);
            };

            createTreeList({
                filterable: { foo: true },
                columns: [ { field: "id" } ]
            });
        } finally {
            $.fn.kendoFilterMenu = filterMenu;
        }
    });

    test("column filtering is passed filtering options", function() {
        var filterMenu = $.fn.kendoFilterMenu;

        try {
            $.fn.kendoFilterMenu = function(options) {
                equal(options.foo, "baz");
            };

            createTreeList({
                filterable: { foo: "foo" },
                columns: [ {
                    field: "id",
                    filterable: {
                        foo: "baz"
                    }
                } ]
            });
        } finally {
            $.fn.kendoFilterMenu = filterMenu;
        }
    });

    test("children of hidden row are rendered hidden", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: false },
                { id: 2, parentId: 1, expanded: true },
                { id: 3, parentId: 2 }
            ]
        });

        var rows = instance.content.find("tr");

        equal(rows.length, 3);
        ok(rows.eq(0).is(":visible"));
        ok(!rows.eq(1).is(":visible"));
        ok(!rows.eq(2).is(":visible"));
    });

    test("adjusts scrollable content height based on wrapper height", function() {
        dom.height(200);

        createTreeList();

        var height = parseInt(dom.find(".k-grid-content").height(), 10);
        ok(height > 100);
    });

    test("does not set content height if wrapper height is not set", function() {
        createTreeList();

        var height = dom.find(".k-grid-content")[0].style.height;
        ok(!height);
    });

    test("sets wrapper height based on height configuration option", function() {
        createTreeList({ height: 200 });

        var height = parseInt(dom.find(".k-grid-content").height(), 10);
        ok(height > 100);
    });

    test("column attributes are rendered on cells", function() {
        createTreeList({
            columns: [
                { field: "id", attributes: { "foo": "bar" } }
            ]
        });

        equal(dom.find("td[foo=bar]").length, 2);
    });

    test("column attributes are rendered on footer cells", function() {
        createTreeList({
            columns: [ {
                field: "id",
                attributes: { "foo": "bar" },
                footerTemplate: "footer"
            } ]
        });

        equal(dom.find(".k-footer-template td[foo=bar]").length, 2);
    });

    test("column attributes render style attribute", function() {
        createTreeList({
            columns: [
                { field: "id", attributes: { "style": "text-align: center;" } }
            ]
        });

        equal(dom.find("td[style]").css("text-align"), "center");
    });

    test("column headerAttributes are rendered on header cells", function() {
        createTreeList({
            columns: [
                { field: "id", headerAttributes: { "foo": "bar" } }
            ]
        });

        equal(dom.find("th[foo=bar]").length, 1);
    });

    test("column headerAttributes render style attribute", function() {
        createTreeList({
            columns: [
                { field: "id", headerAttributes: { "style": "text-align: center;" } }
            ]
        });

        equal(dom.find("th[style]").css("text-align"), "center");
    });
})();
