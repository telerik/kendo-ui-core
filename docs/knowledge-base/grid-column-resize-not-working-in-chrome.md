---
title: Resizing of Grid Columns Is Not Working in Chrome When the Page Is Zoomed
description: Resizing of Grid columns is not working when zooming is enabled in Chrome version 61.
type: troubleshooting
page_title: Cannot Resize Columns in Chrome When Page Is Zoomed | Kendo UI Grid
slug: grid-column-resize-not-working-in-chrome
tags: grid, columns, resize, not, working, chrome, zoom, scale, latest, 61, version, breaks, size, width, change
ticketid: 1132050
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr><tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.913</td>
 </tr>
</table>

## Description

When the scale is not 100% or when I zoom the page, the column resize feature of the Grid doesn't work in the latest Chrome version.

## Solution

1. Override the internal `positionColumnResizeHandle` method. 

1. Test that all enabled features work as expected in your environment.

```dojo
<div id="example">
      <div id="grid"></div>

      <script>

        kendo.ui.Grid.prototype._positionColumnResizeHandle= function() {
          var that = this,
              indicatorWidth = that.options.columnResizeHandleWidth,
              lockedHead = that.lockedHeader ? that.lockedHeader.find("thead:first") : $();

          that.thead.add(lockedHead).on("mousemove" + ".kendoGrid", "th", function (e) {
            var th = $(this);
            if (th.hasClass("k-group-cell") || th.hasClass("k-hierarchy-cell")) {
              return;
            }
            that._createResizeHandle(th.closest("div"), th);
          });
        };

        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipCity: { type: "string" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShippedDate: { type: "date" }
                  }
                }
              },
              pageSize: 15
            },
            height: 550,
            sortable: true,
            resizable: true,
            pageable: true,
            columns: [
              {
                field: "OrderDate",
                title: "Order Date",
                width: 120,
                format: "{0:MM/dd/yyyy}"
              },
              {
                field: "ShipCountry",
                title: "Ship Country",
                minResizableWidth: 100
              },
              {
                field: "ShipCity",
                title: "Ship City"
              },
              {
                field: "ShipName",
                title: "Ship Name"
              },
              {
                field: "ShippedDate",
                title: "Shipped Date",
                format: "{0:MM/dd/yyyy}",
                width: 200
              },
              {
                field: "OrderID",
                title: "ID",
                width: 80
              }
            ]
          });
        });
      </script>
    </div>
```
