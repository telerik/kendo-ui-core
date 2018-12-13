---
title: Select Only One Grid Row with the Checkbox Selectable Column
description: An example on how to select only a single row by using the built-in checkbox column of the Kendo UI Grid and remove the master checkbox.
type: how-to
page_title: Limit the Selection to a Single Row | Kendo UI Grid
slug: checkbox-selection-select-single-row
tags: checkbox selection, grid, kendo ui
ticketid: 1116716
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
  <td>Tested up to version 2017.2 621</td>
 </tr>
</table>

## Description

I want to remove the master checkbox of the built-in checkbox column in the Kendo UI Grid. How can I limit the selection to one selected Grid row only?

## Solution

1. Remove the master checkbox by adding an empty [header template](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.headertemplate) to the column.
1. Subscribe for the [`click`](https://api.jquery.com/click/) event of the checkboxes by using a jQuery selector.
1. In the `click` event handler, get the row and the row classes by using the [`closest`](https://api.jquery.com/closest/) jQuery method.
1. Based on the row classes, use the [`clearSelection`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/clearselection) method of the Grid.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        function onClick(e) {
            var grid = $("#grid").data("kendoGrid");
            var row = $(e.target).closest("tr");

            if(row.hasClass("k-state-selected")){
                setTimeout(function(e) {
                    var grid = $("#grid").data("kendoGrid");
                    grid.clearSelection();
                })
            } else {
                grid.clearSelection();
            };
        };

        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui/service/Products",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                        model: {
                            id: "ProductID"
                        }
                    }
                },
                pageable: true,
                scrollable: false,
                sortable: true,
                columns: [{
                        selectable: true,
                        width: "50px",
                        headerTemplate: ' '
                    },
                    {
                        field: "ProductName",
                        title: "Product Name"
                    },
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}"
                    },
                    {
                        field: "UnitsInStock",
                        title: "Units In Stock"
                    },
                    {
                        field: "Discontinued"
                    }
                ]
            });

            var grid = $("#grid").data("kendoGrid");

            grid.tbody.on("click", ".k-checkbox", onClick);
        });
    </script>
</div>
```

## Notes

The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.

## See Also

* [Frequently Asked Questions on Checkbox Selection]({% slug frequently_asked_questions_grid %})
* [Grid Checkbox Selection Demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
