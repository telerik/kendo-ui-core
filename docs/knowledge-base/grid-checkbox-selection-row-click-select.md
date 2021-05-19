---
title: Select Checkbox Rows by Clicking Anywhere on the Row
description: An example on how to select a row with a checkbox by clicking the row of the Kendo UI Grid.
type: how-to
page_title: Click Anywhere to Select Rows with Checkboxes | Kendo UI Grid for jQuery
slug: grid-checkbox-selection-row-click-select
tags: grid, checkbox selection, kendo ui
ticketid: 1144198
res_type: kb
component: grid
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2020.3.1021</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I select rows with checkboxes by clicking anywhere on the row of the Grid?

## Solution

1. Handle the [`click`](https://api.jquery.com/click/) event of the row.
1. In the event handler, programmatically `click` on the checkbox.

```dojo
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
                dataBound: onDataBound,
                pageable: true,
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

        function onDataBound(e) {
            var grid = e.sender;
            var rows = grid.tbody.find("[role='row']");

            rows.unbind("click");
            rows.on("click", onClick)

        };

        function onClick(e) {
            if ($(e.target).hasClass("k-checkbox")) {
                return;
            }
            var row = $(e.target).closest("tr");
            var checkbox = $(row).find(".k-checkbox");

            checkbox.click();
        };
    </script>
</div>
```
