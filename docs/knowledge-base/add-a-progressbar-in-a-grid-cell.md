---
title: Add ProgressBars to Grid Cells
page_title: Add a ProgressBar to Cells | Kendo UI Grid for jQuery
description: An example on how to add a ProgressBar to a cell in the Kendo UI Grid.
type: how-to
slug: add-a-progressbar-in-a-grid-cell
previous_url: /knowledge-base/how-to-add-a-progressbar-in-a-grid-cell
tags: grid, progressbar
ticketid: 1104936
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
  <td>Made with version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

How can I add a ProgressBar to a Kendo UI Grid cell?

## Solution

1. Add the DOM elements for the ProgressBar by using the [`column.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template) configuration.

1. On the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event, initialize the ProgressBars by using the model value.

```dojo
<div id="grid"></div>
<script>
$("#grid").kendoGrid({
  columns: ["name", {
  	field: "progress",
    template: "<div class='progress'></div>"
  }],
  dataSource: [ { name: "Jane", progress: 100 }, { name: "John", progress: 200 }],
  editable: true,
  dataBound: function(e) {
  	var grid = this;

    grid.tbody.find(".progress").each(function(e) {
    	var row = $(this).closest("tr");
      var model = grid.dataItem(row);

      $(this).kendoProgressBar({
      	max: 1000,
        value: model.progress
      })
    });
  }
});
</script>
```
