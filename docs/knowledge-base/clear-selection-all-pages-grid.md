---
title: Clear Selection on All Grid Pages
description: An example on how to clear the selection of all pages when the persistSelection property is set to true in the Kendo UI Grid.
type: how-to
page_title: Clear Persisted Selection | Kendo UI Grid for jQuery
slug: clear-selection-all-pages-grid
tags: clear selection, persistSelection, grid, all pages
ticketid: 1133757
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How can I clear the selection on all Kendo UI Grid pages?

## Solution

1. Assign an empty object as the value of the `_selectedIds` property of the Grid.
1. Invoke the [`clearSelection`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/clearselection) method.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/orders.js"></script>

<div id="example">
    <div id="grid"></div>
    <button id="button">clearSelection</button>
    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    data: orders,
                    pageSize: 6,
                    schema: {
                        model: {
                            id: "OrderID"
                        }
                    }
                },
                selectable: "multiple",
                pageable: {
                    buttonCount: 5
                },
                scrollable: false,
                persistSelection: true,
                navigatable: true,
                columns: [{
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: 300
                    },
                    {
                        field: "Freight",
                        width: 300
                    },
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:dd/MM/yyyy}"
                    }
                ]
            });
            $("#button").kendoButton({
                click: function(e) {
                    var grid = $("#grid").data("kendoGrid");
                    grid._selectedIds = {};
                    grid.clearSelection();
                }
            })

        });
    </script>
</div>
```
