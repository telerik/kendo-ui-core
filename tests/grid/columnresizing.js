(function() {
   var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource,
        indicatorWidth = 3;

    function triggerTouchEvent(element, type, info) {
        info.target = element;
        return element.trigger($.Event(type, { originalEvent: { changedTouches: [ info ] }}));
    }

    module("grid column resize", {
        setup: function() {
            kendo.UserEvents.minHold(50);

            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);

            $.fn.press = function (x, y) {
                return triggerTouchEvent(this, "touchstart", {
                    pageX: x,
                    pageY: y,
                    id: 1
                })
            };

            $.fn.move = function (x, y) {
                return triggerTouchEvent(this, "touchmove", {
                    pageX: x,
                    pageY: y,
                    id: 1
                })
            };

            $.fn.release = function (x, y) {
                return triggerTouchEvent(this, "touchend", {
                    pageX: x,
                    pageY: y,
                    id: 1
                })
            };

            $.fn.tap = function(info) {
                return this.press(10, 10).release(10, 10);
            };
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            $(table).closest(".k-grid").remove();
            kendo.UserEvents.minHold(800);
        }
    });

    function resizeColumn(container, column, from, to) {
        $(column).trigger({ type: "mousemove", clientX: column.offset().left + column.outerWidth(), clientY: 0});

        var handle = container.find(".k-resize-handle");

        var position = handle.position();

        handle.trigger("mousedown");


        $(document.documentElement).trigger({ type: "mousemove", pageX: position.left + from, pageY: position.top });
        $(document.documentElement).trigger({ type: "mousemove", pageX: position.left + to, pageY: position.top });
        $(document.documentElement).trigger({ type: "mouseup" });
    }

    test("resizable in config options", function() {
        strictEqual(Grid.fn.options.resizable, false);
    });

    test("handler is added to the header if resizable is enabled", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        column = grid.thead.find("th:first");

        $(column).trigger({ type: "mousemove", clientX: column.offset().left + column.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").length, 1);
    });

    test("resizable widget is initialized if auto generated columns", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true
        });

        ok(grid.wrapper.find(".k-grid-header-wrap").data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("handlers not are added to the header if resizable is not enabled", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: false,
            columns: ["foo", "bar"]
        });
        ok(!grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").length);
    });

    test("th element is assign to the handle", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        column = grid.thead.find("th:first");

        $(column).trigger({ type: "mousemove", clientX: column.offset().left + column.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").first().data("th")[0], grid.thead.find("th:first")[0]);
    });

    test("handler is position over the th right side", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        });
        var firstColumn = grid.thead.find("th:first");

        $(firstColumn).trigger({ type: "mousemove", clientX: firstColumn.offset().left + firstColumn.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").first()[0].offsetTop, firstColumn[0].offsetTop);
        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").first()[0].offsetLeft, firstColumn[0].offsetLeft + firstColumn[0].offsetWidth - indicatorWidth);
    });

    test("handler is position over the th right side of a static column", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar" }]
        });
        var firstColumn = grid.staticHeader.find("th:first");

        $(firstColumn).trigger({ type: "mousemove", clientX: firstColumn.offset().left + firstColumn.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-static").children(".k-resize-handle").first()[0].offsetTop, firstColumn[0].offsetTop);
        equal(grid.wrapper.find(".k-grid-header-static").children(".k-resize-handle").first()[0].offsetLeft, firstColumn[0].offsetLeft + firstColumn[0].offsetWidth - indicatorWidth);
    });

    test("handler is position over the th right side of non static", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar" }]
        });
        var firstColumn = grid.thead.find("th:first");

        $(firstColumn).trigger({ type: "mousemove", clientX: firstColumn.offset().left + firstColumn.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").first()[0].offsetTop, firstColumn[0].offsetTop);
        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").first()[0].offsetLeft, firstColumn[0].offsetLeft + firstColumn[0].offsetWidth - indicatorWidth);
    });

    test("handler is position over the th right side of static column after hovering over a non static one", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar" }]
        });

        var nonStaticColumn = grid.thead.find("th:first");

        $(nonStaticColumn).trigger({ type: "mousemove", clientX: nonStaticColumn.offset().left + nonStaticColumn.outerWidth(), clientY: 0});

        var staticColumn = grid.staticHeader.find("th:first");

        $(staticColumn).trigger({ type: "mousemove", clientX: staticColumn.offset().left + staticColumn.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-static").children(".k-resize-handle").first()[0].offsetTop, staticColumn[0].offsetTop);
        equal(grid.wrapper.find(".k-grid-header-static").children(".k-resize-handle").first()[0].offsetLeft, staticColumn[0].offsetLeft + staticColumn[0].offsetWidth - indicatorWidth);
    });

    test("handler is position over the th right side when prev column is hidden", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        });
        grid.hideColumn("foo");

        var lastColumn = grid.thead.find("th:last");

        $(lastColumn).trigger({ type: "mousemove", clientX: lastColumn.offset().left + lastColumn.outerWidth(), clientY: 0});

        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").last()[0].offsetTop, lastColumn[0].offsetTop);
        equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").last()[0].offsetLeft, lastColumn[0].offsetLeft + lastColumn[0].offsetWidth - indicatorWidth);
    });

    test("handler is position over the th right side when scrolling is disabled", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"],
            scrollable: false,
            toolbar: ["create"]
        });
        var firstColumn = grid.thead.find("th:first");
        $(firstColumn).trigger({ type: "mousemove", clientX: firstColumn.offset().left + firstColumn.outerWidth(), clientY: 0});

        QUnit.close(grid.wrapper.children(".k-resize-handle").first().position().top, firstColumn.position().top, 1);
        QUnit.close(grid.wrapper.children(".k-resize-handle").first()[0].offsetLeft, firstColumn[0].offsetLeft + firstColumn[0].offsetWidth - indicatorWidth, 1);
    });

    test("resizable is attached to the header", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        });
        ok(grid.wrapper.find(".k-grid-header-wrap").data("kendoResizable"));
    });

    test("resizable is attached to the static header", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar" }]
        });
        ok(grid.wrapper.find(".k-grid-header-static").data("kendoResizable"));
    });

    test("resizable is attached to the header if scrolling is disabled", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            scrollable: false,
            columns: ["foo", "bar"]
        });
        ok(grid.wrapper.data("kendoResizable"));
    });

    test("column header cell width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(firstColumn[0].offsetWidth, initialWidth + 10);
    });

    test("static column body cell width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
             dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar", width:100 }]
        }),
        firstColumn = grid.staticHeader.find("th:first"),
        initialWidth = grid.staticTable.find("tr:first > td:first").width();

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(grid.staticTable.find("tr:first > td:first").width(), initialWidth + 10);
    });

    test("static column footer cell width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
             dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar", footerTemplate: "bar", width:100 }]
        }),
        firstColumn = grid.staticHeader.find("th:first"),
        footer = grid.footer.find(".k-grid-footer-static"),
        initialWidth = footer.find("tr:first > td:first").width();

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(footer.find("tr:first > td:first").width(), initialWidth + 10);
    });

    test("static footer table width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
             dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar", footerTemplate: "bar", width:100 }]
        }),
        firstColumn = grid.staticHeader.find("th:first"),
        footer = grid.footer.find(".k-grid-footer-static"),
        initialWidth = footer.find("table").width();

        resizeColumn(grid.wrapper, firstColumn, firstColumn.width(), firstColumn.width() + 10);

        equal(footer.find("table").width(), initialWidth + 10);
    });

    test("non static footer table width is not incremented when static column is resized", function() {
         var grid = new Grid(table, {
             dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: ["foo", { static: true, field: "bar", footerTemplate: "bar", width:100 }]
        }),
        firstColumn = grid.staticHeader.find("th:first"),
        footer = grid.footer.find(".k-grid-footer-wrap"),
        initialWidth = footer.find("table").width();

        resizeColumn(grid.wrapper, firstColumn, firstColumn.width(), firstColumn.width() + 10);

        equal(footer.find("table").width(), initialWidth - 10);
    });

    test("non static column footer cell width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
             dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: [ { field: "foo", width: 200 }, { static: true, field: "bar", footerTemplate: "bar", width:100 }]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.footer.find(".k-grid-footer-wrap tr:first > td:first").width();

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        QUnit.close(grid.footer.find(".k-grid-footer-wrap").find("tr:first > td:first").width(), initialWidth + 10, 2);
    });

    test("static header is not resized pass the grid container width", function() {
        table.style.width = "200px";

        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar"} ],
            resizable: true,
            columns: [{ width: 200, field: "foo"}, { static: true, field: "bar", width:100 }]
        }),
        firstColumn = grid.staticHeader.find("th:first"),
        initialWidth = grid.staticTable.find("tr:first > td:first").width();

        grid.wrapper.width(200);

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 200);

        equal(grid.staticTable.width(), 200 - kendo.support.scrollbar());
        equal(grid.staticHeader.width(), 200 - kendo.support.scrollbar());
    });

    test("column body cell width is incremented when handler is moved to the right", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.tbody.find("tr:first > td:first")[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(grid.tbody.find("tr:first > td:first")[0].offsetWidth, initialWidth + 10);
    });

    test("column header cell width is incremented when handler is moved to the right if scrolling is disabled", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            scrollable: false,
            columns: ["foo", "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(firstColumn[0].offsetWidth, initialWidth + 10);
    });

    test("column body cell width is incremented when handler is moved to the right if scrolling is disabled", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            scrollable: false,
            columns: ["foo", "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.tbody.find("tr:first > td:first")[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        equal(grid.tbody.find("tr:first > td:first")[0].offsetWidth, initialWidth + 10);
    });

    test("column footer cell width is incremented when handler is moved to the right if scrolling is disabled", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            scrollable: false,
            columns: [{ field: "foo", footerTemplate: "foo" }, "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.footer.find("tr:first > td:first")[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);
        equal(grid.footer.find("tr:first > td:first")[0].offsetWidth, initialWidth + 10);
    });

    test("columnresize event is raised", 3, function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"],
            columnResize: function(e) {
                equal(e.column.field, "foo");
                equal(e.oldWidth, initialWidth);
                equal(e.newWidth, initialWidth + 10);
            }
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);
    });

    test("columnresize event is not raised if width is not changed", function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"],
            columnResize: function(e) {
               ok(false);
            }
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth);
        expect(0);
    });

    test("column footer cell width is persisted is grid is paged", function() {
         var grid = new Grid(table, {
            dataSource: { data: [ { foo: "foo", bar: "bar" } ], pageSize: 1 },
            resizable: true,
            columns: [{ field: "foo", footerTemplate: "foo" }, "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.footer.find("tr:first > td:first")[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        var resizedWidth = grid.footer.find("tr:first > td:first")[0].offsetWidth;

        grid.dataSource.page(2);

        equal(grid.footer.find("tr:first > td:first")[0].offsetWidth, resizedWidth);
    });

    test("column footer is aligned with content after resize and refresh", function() {
         var grid = new Grid(table, {
            dataSource: { data: [ { foo: "foo", bar: "bar" } ], pageSize: 1 },
            resizable: true,
            columns: [{ field: "foo", footerTemplate: "foo" }, "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = grid.footer.find("tr:first > td:first")[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);
        grid.content.scrollLeft(10);
        grid.refresh();

        equal(grid.content.scrollLeft(), grid.footer.find(".k-grid-footer-wrap").scrollLeft());
    });

    test("columnresize after dataSource is changed", 1, function() {
         var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 10);

        grid.setDataSource(new kendo.data.DataSource({
            data: [ { foo: "foo", bar: "bar" } ]
        }));

        firstColumn = grid.thead.find("th:first"),
        initialWidth = firstColumn[0].offsetWidth;

        resizeColumn(grid.wrapper, firstColumn, initialWidth, initialWidth + 20);

        equal(firstColumn[0].offsetWidth, initialWidth + 20);
    });

    asyncTest("handler is added to the header on tap and hold in mobile grid", 1, function() {
        var grid = new Grid(table, {
            mobile: "phone",
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        column = grid.thead.find("th:first"),
        offset = column.offset();

        column.press(offset.top, offset.left);

        setTimeout(function() {
            start();
            column.release(offset.top, offset.left);

            equal(grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").length, 1);
        }, 100);
    });

    asyncTest("handler is hidden if mobile grid is refreshed", 1, function() {
        var grid = new Grid(table, {
            mobile: "phone",
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        column = grid.thead.find("th:first"),
        offset = column.offset();

        column.press(offset.top, offset.left);

        setTimeout(function() {
            start();
            column.release(offset.top, offset.left);

            grid.refresh();

            ok(!grid.wrapper.find(".k-grid-header-wrap").children(".k-resize-handle").is(":visible"));
        }, 100);
    });

    asyncTest("css class is added to the column on tap and hold", 1, function() {
        var grid = new Grid(table, {
            mobile: "phone",
            dataSource: [ { foo: "foo", bar: "bar" } ],
            resizable: true,
            columns: ["foo", "bar"]
        }),
        column = grid.thead.find("th:first"),
        offset = column.offset();

        column.press(offset.top, offset.left);

        setTimeout(function() {
            start();
            column.release(offset.top, offset.left);

            ok(column.hasClass("k-column-active"));
        }, 100);
    });
})();
