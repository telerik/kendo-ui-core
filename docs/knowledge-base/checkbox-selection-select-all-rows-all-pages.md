---
title: Select All Rows on All Grid Pages
description: An example on how to select all the rows on all the pages of the Kendo UI Grid.
type: how-to
page_title: Select All Rows on All Pages with a Master Checkbox | Kendo UI Grid
slug: checkbox-selection-select-all-rows-all-pages
tags: checkbox selection, grid, kendo ui
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

How can I select all rows on all Kendo UI Grid pages?

## Solution

> **Important**
>
> The implementation of this functionality might lead to slow Grid performance.

1. Set the [`persistSelection`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/persistselection) configuration of the Grid to `true`.
1. Use a jQuery selector to subscribe for the [`click`](https://api.jquery.com/click/) event of the master checkbox.
1. In the `click` event handler:
	1. Save the current page size in a global variable by using the [`pageSize`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/pagesize) method of the Kendo UI dataSource.
	1. Show all the rows on a single page by using the `pageSize` method.
	1. Select all the rows by using the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method of the Kendo UI Grid.
	1. Bring back the old page size by using the `pageSize` method.

```dojo
<link rel="stylesheet" href="https://demos.telerik.com/kendo-ui/content/shared/styles/examples-offline.css">
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/console.js"></script>


<div id="example">
    <div id="grid"></div>

    <script>
        var oldPageSize = 0;

        function onChange(e) {
            kendoConsole.log("The selected product ids are: [" + this.selectedKeyNames().join(", ") + "]");
        };

        function onClick(e) {
            var grid = $("#grid").data("kendoGrid");

            oldPageSize = grid.dataSource.pageSize();
            grid.dataSource.pageSize(grid.dataSource.data().length);

            if (grid.dataSource.data().length === grid.select().length) {
                grid.clearSelection();
            } else {
                grid.select("tr");
            };

            grid.dataSource.pageSize(oldPageSize);
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

            var grid = $("#grid").data("kendoGrid");

            grid.thead.on("click", ".k-checkbox", onClick);
        });
    </script>
    <div class="box wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <style>
        .console div {
            height: 6em;
        }
    </style>
</div>
```

## Notes

The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.

## See Also

* [Frequently Asked Questions on Checkbox Selection]({% slug frequently_asked_questions_grid %})
* [Grid Checkbox Selection Demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
