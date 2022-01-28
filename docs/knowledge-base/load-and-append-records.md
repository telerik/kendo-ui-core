---
title: Load and Append More Records While Scrolling Down
page_title: Load and Append More Records | Kendo UI Grid for jQuery
description: "An example on how to load and append more records as the user scrolls down the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/load-and-append-records, /controls/data-management/grid/how-to/binding/load-and-append-records
slug: howto_loadand_append_morerecords_while_scrollingdown_grid
tags: grid, load, append, records, while, scrolling
component: grid
type: how-to
res_type: kb
---

> **Deprecated** The functionality is available out of the box. Check [`endless scrolling`]({% slug endless_scrolling_kendoui_grid_widget %})

The following example demonstrates how to load more records when scrolling the Grid rows.

The difference between this scenario and virtual scrolling is that here the number of records constantly increases, while virtual scrolling replaces the existing records with new ones. Note that when you increase the page size, the data requests are slower.

To achieve this behavior:

1. Subscribe to the `scroll` event of the Grid data container and increment the page size by a desired value.
2. Use a flag to prevent multiple simultaneous page size increments. The flag should be set in the `scroll` event handler, and cleared in the `dataBound` event handler of the Grid.

> The functionality is incompatible with virtual scrolling.

```dojo

    <div id="grid"></div>

    <script>
        var gridElement = $("#grid")
        var pagingIncrement = 20;
        var scrollbarWidth = kendo.support.scrollbar();
        var dataBindingFlag = true;

        gridElement.kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true
            },
            pageable: true,
            dataBound: function() {
                dataBindingFlag = true;
            },
            columns: [{
                field:"OrderID"
            }, {
                field: "Freight"
            }, {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
            }, {
                field: "ShipName",
                title: "Ship Name"
            }]
        });

        var gridDataSource = gridElement.data("kendoGrid").dataSource;

        gridElement.children(".k-grid-content")
            .on("scroll", function(e){
                if (dataBindingFlag) {
                    var dataDiv = e.target;
                    var currentPageSize = gridDataSource.pageSize();
                    if (dataDiv.scrollTop >= dataDiv.scrollHeight - dataDiv.offsetHeight - scrollbarWidth && gridDataSource.total() > currentPageSize) {
                        dataBindingFlag = false;
                        gridDataSource.pageSize(currentPageSize + pagingIncrement);
                    }
                }
            });
    </script>

    <style>
        #grid { height: 300px; }
    </style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
