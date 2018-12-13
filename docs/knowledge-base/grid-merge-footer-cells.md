---
title: Merge Cells in the Grid Footer
description: An example on how to fake merging cells in the footer of the Kendo UI Grid.
type: how-to
page_title: Combine Footer Cells | Kendo UI Grid
slug: grid-merge-footer-cells
tags: grid, merge, cells, footer
ticketid: 1149497
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I merge cells in the footer of the Grid?

## Solution

For the current version, it is not possible to merge cells out of the box. However, you cans till work around this issue.

1. Add the desired content in a cell by using the [`footerTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate) configuration.
1. Set the `overflow: visible;` and `white-space: nowrap;` styles for this cell.
1. Remove the borders from the desired cells by using CSS.

    ```dojo
    <style>
        .k-footer-template td:nth-child(1) {
            overflow: visible;
            white-space: nowrap;
        }

        .k-footer-template td:nth-child(1),
        .k-footer-template td:nth-child(2),
        .k-footer-template td:nth-child(3) {
            border-width: 0;
        }
    </style>

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [{
                    field: "category",
                    footerTemplate: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis turpis accumsan, porta orci et, faucibus dui."
                },
                {
                    field: "name"
                },
                {
                    field: "price"
                }
            ],
            dataSource: {
                data: [{
                        category: "Beverages",
                        name: "Chai",
                        price: 18
                    },
                    {
                        category: "Beverages",
                        name: "Chang",
                        price: 19
                    },
                    {
                        category: "Seafood",
                        name: "Konbu",
                        price: 6
                    }
                ]
            }
        });
    </script>
    ```
