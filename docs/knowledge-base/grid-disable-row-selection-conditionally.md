---
title: Select Rows on Conditions
description: An example on how to conditionally select rows in the Kendo UI Grid.
type: how-to
page_title: Disable Selection of Specific Rows | Kendo UI Grid for jQuery
slug: grid-disable-row-selection-conditionally
tags: grid, selection, row
ticketid: 1147832
res_type: kb
component: grid
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I disable the selection of specific rows in the Grid?

## Solution

1. Handle the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event of the Grid.
1. In the event handler, based on a condition, remove the `k-state-selected` class from the desired rows.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "canSelect"
            }
        ],
        dataSource: [{
                name: "Name0",
                canSelect: true
            },
            {
                name: "Name1",
                canSelect: false
            },
            {
                name: "Name2",
                canSelect: false
            },
            {
                name: "Name3",
                canSelect: true
            },
            {
                name: "Name4",
                canSelect: true
            },
            {
                name: "Name5",
                canSelect: false
            }
        ],
        selectable: "multiple, row",
        change: function(e) {
            var items = e.sender.select();
            var grid = e.sender;

            items.each(function(i, e) {
                var dataItem = grid.dataItem(e);
                if (dataItem.canSelect === false) {
                    $(e).removeClass("k-state-selected");
                }
            });
        }
    });
</script>
```
