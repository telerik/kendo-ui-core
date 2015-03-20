---
title: Load and append more Grid records as the user scrolls down
page_title: Load and append more Grid records as the user scrolls down
description: Kendo Grid example that demonstrates how to load and append more Grid records as the user scrolls down.
---

The example demonstrates how to load more records when scrolling the Grid rows. The difference between this scenario and virtual scrolling is that here the number of records constantly increases, while virtual scrolling replaces the existing records with new ones.
Please note that increasing the page size will make data requests slower.

There are two things to be done:
1. Subscribe to the Grid's data container's scroll event and increment the page size by a desired value.
2. Use a flag to prevent multiple simultaneous page size increments. The flag should be set in the scroll event handler, and cleared in the Grid's dataBound event handler.

```html

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
                    read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
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
