---
title: Dynamically Change the Page Size of the Grid to Adjust Its Height
description: An example on how to change the page size of a Kendo UI Grid so that it displays as many rows as possible within the available height.
type: how-to
page_title: Change the Page Size Dynamically and Adjust the Height | Kendo UI Grid for jQuery
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

How can I change the `pageSize` property of the Grid when the `height` changes so that as many rows as possible are always displayed.

## Solution

1. Calculate the number of rows that will fit in the available space by subscribing to the `resize` event of the `window` element.
1. Change the `pageSize` by using the `pageSize` method of the dataSource.

```dojo
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

* [API Reference of the pageSize Method](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/pagesize)
* [API Reference of the jQuery resize Event](https://api.jquery.com/resize/)
