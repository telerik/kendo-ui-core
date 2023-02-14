---
title: Prevent Text Wrapping in the Grid
description: Learn how to prevent text wrapping in the Kendo UI Grid.
type: how-to
page_title: Prevent Text Wrapping - Kendo UI Grid for ASP.NET MVC
slug: grid-prevent-text-wrapping-in-the-grid
tags: grid, wrap, prevent
ticketid: 1141418
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2017.3.1026</td>
 </tr></table>


## Description

How can I prevent the text wrapping of a Grid item in a single-line stop?

## Solution

Use the following CSS implementation to prevent wrapping in all grid cells.

```
.k-grid td{
  white-space: nowrap;
}
```

Use the following implementation to prevent wrapping in specific grid cells.

1. Use the `attributes` configuration of the grid to add a class to specific columns.
1. Prevent wrapping only for the elements with the specified class.

```dojo
    <div id="grid"></div>
    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
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
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                },
                height: 550,
              	reorderable: true,
                filterable: true,
                sortable: true,
                pageable: true,
                columns: [{
                  			title: "OrderID",
                        field:"OrderID",
                        filterable: false
                    },
                    "Freight",
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                    }, {
                        field: "ShipName",
                        title: "Ship Name",
                      	attributes: {class: "nowrap"}, // Add the nowrap class to the attributes of the column.
                      	width: 100,
                    }, {
                        field: "ShipCity",
                        title: "Ship City",
                      	width: 110
                    }
                ]
            });
        });
    </script>
    
    <style>
      .k-grid .nowrap {
        white-space: nowrap;
      }
    </style>
```
