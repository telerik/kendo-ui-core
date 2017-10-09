---
title: ProgressBars in Grids
description: An example on How to Add a ProgressBar in a Grid cell
type: how-to
page_title: How to Add a ProgressBar in a Grid cell
slug: how-to-add-a-progressbar-in-a-grid-cell
tags: grid, progressbar
ticketid: 1104936
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid</td>
 </tr>
 <tr>
  <td>Makde with version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

How to Add a ProgressBar in a Grid cell?

## Solution

The desired result can be achieved by using a [column.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template) to add the DOM elements for the ProgressBar. Then on the [dataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) event to initialize the ProgressBars using the model value.

Please check the following example:

````html
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
````
