---
title: Change Grid's Page Size Dinamically to Adjust for Height
description: An example on how to change the page size of a Grid in order to display as many rows as possible in the available height
type: how-to
page_title: Change Grid's Page Size Dinamically to Adjust for Height
slug: grid-pagesize-relative-to-height
tags: grid, page, size, pagesize, height, adjust
ticketid: 1156556
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

I'm working on an application that uses the Kendo UI Grid and I would like to change its `pageSize` property when the `height` changes in order to always show as many rows as possible.

## Solution

By subscribing to the resize event of the window element, we can calculate how many rows would fit in the available space and change the pageSize using the DataSource's pageSize method:

```html
<style>
  html,
  body,
  #parent,
  #grid {
    margin: 0;
    padding: 0;
    border-width: 0;
    height: 100%;
    /* DO NOT USE !important for setting the Grid height! */
  }

  html {
    overflow: hidden;
    font: 13px sans-serif;
  }
</style>
<div id="parent">
  <div id="grid"></div>
</div>
<script>
  var gridElement = $("#grid");

  function resizeGrid() {
    gridElement.data("kendoGrid").resize();

    var newHeight = gridElement.height();

    var headerHeight = $(".k-grid-header").height();
    var pagerHeight = $(".k-grid-pager").height();
    var rowHeight = $("#grid tr:last").height();

    var numberOfRows = Math.round((newHeight - headerHeight - pagerHeight) / rowHeight);

    gridElement.data("kendoGrid").dataSource.pageSize(numberOfRows);
    gridElement.data("kendoGrid").refresh();
  }

  $(window).resize(function() {
    resizeGrid();
  });

  $("#grid").kendoGrid({
    dataSource: {
      type: "odata",
      transport: {
        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
      },
      schema: {
        model: {
          fields: {
            OrderID: {
              type: "number"
            },
            ShipName: {
              type: "string"
            },
            ShipCity: {
              type: "string"
            }
          }
        }
      },
      pageSize: 25
    },
    scrollable: false,
    resizable: true,
    pageable: true,
    columns: [{
        field: "OrderID",
        filterable: false,
        width: 200
      },
      "ShipName",
      "ShipCity"
    ]
  });
</script>
```

## See Also

* [opageSize method API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/pagesize)
* [jQuery resize event API Reference](https://api.jquery.com/resize/)
