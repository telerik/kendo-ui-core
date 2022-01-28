---
title: Scroll to Selected Row
description: An example on how to scroll to the selected row in the Kendo UI Grid.
type: how-to
page_title: Force Scrolling to Selected Element | Kendo UI Grid for jQuery
slug: grid-scroll-selected-row
tags: grid, scroll, select
ticketid: 1141172
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I scroll the Kendo UI Grid when a row is selected?

## Solution

To programmatically scroll the Grid:

1. Handle the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event.
1. Calculate the distance.
1. In an [`animate`](https://api.jquery.com/animate/) effect, use the [`scrollTop`](https://api.jquery.com/scrollTop/) of the `.k-grid-content` element.

```dojo
<div id="grid"></div>
<script>
    var dataSource = [];

    for (i = 0; i < 100; i++) {
        dataSource.push({
            name: i,
            age: i
        });
    }

    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "age"
            }
        ],
        dataSource: dataSource,
        selectable: "row",
        scrollable: true,
        height: 500,
        change: function(e) {
            var scrollContentOffset = this.element.find("tbody").offset().top;
            var selectContentOffset = this.select().offset().top;
            var distance = selectContentOffset - scrollContentOffset;

            this.element.find(".k-grid-content").animate({
                scrollTop: distance
            }, 400);
        }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(80)");
</script>
```
