---
title: Select Grid Rows Programmatically Based on the DataItem
description: An example on how to select rows in a Kendo UI Grid based on the values of the data items.
type: how-to
page_title: Automatically Check Checkboxes on Load | Kendo UI Grid
slug: checkbox-selection-select-rows-on-load
tags: checkbox selection, grid, kendo ui
ticketid: 1117204
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.2 621</td>
 </tr>
</table>

## Description

I want to have a Grid with some of its checkboxes checked by default when it loads. How can I check checkboxes programmatically by using the selectable column in the Kendo UI Grid?

## Solution

1. In the [`dataBound`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) event handler, get and save all the rows.
1. Loop through the rows by using the jQuery [`each`](https://api.jquery.com/each/) method.
1. Get every row data by using the [`dataItem`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-dataItem) method.
1. Set the current row as selected by using the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-select) method.

```html
<div id="example">
    <div id="grid"></div>

    <script>
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
                dataBound: function(e) {
                    var rows = e.sender.tbody[0].rows;

                    $(rows).each(function(e) {
                        var grid = $("#grid").data("kendoGrid");
                        var row = this;
                        var dataItem = grid.dataItem(row);

                        if (dataItem.UnitPrice >= 22) {
                            grid.select(row);
                        }

                    });
                },
                scrollable: false,
                persistSelection: true,
                sortable: true,
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

### Notes

The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.

## See Also

* [Frequently Asked Questions on Checkbox Selection]({% slug frequently_asked_questions_grid %})
* [Grid Checkbox Selection Demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.selectable)
