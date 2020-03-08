---
title: Get the Selected Grid Rows Data
description: An example on how to get the dataItem for every selected row by using the change event of the Kendo UI Grid.
type: how-to
page_title: Get the DataItems of the Selected Rows | Kendo UI Grid for jQuery
slug: checkbox-selection-dataitems-selected-rows
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

How can I get all the data items of the selected rows when using the selectable column in the Kendo UI Grid?

## Solution

To get the `dataItem` for each selected row:

1. In the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event handler, get and save the rows in a variable by using the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method.
1. Loop through the rows by using the [`each`](https://api.jquery.com/each/) jQuery method.
1. Get every row data by using the [`dataItem`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) method.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        function onChange(e) {
            var rows = e.sender.select();
            rows.each(function(e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);

                console.log(dataItem);
            })
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
                persistSelection: true,
                sortable: true,
                change: onChange,
                columns: [{
                        selectable: true,
                        width: "50px"
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
        });
    </script>
</div>
```

## Notes

The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.

## See Also

* [Frequently Asked Questions on Checkbox Selection]({% slug frequently_asked_questions_grid %})
* [Grid Checkbox Selection Demo](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
