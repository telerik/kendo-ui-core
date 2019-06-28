---
title: Adjust Row Height with Virtual Scrolling
page_title: Row Height via Virtual Scrolling | Kendo UI Grid for jQuery
description: "An example on how to adjust row height when virtual scrolling is enabled in the Kendo UI Grid widget for jQuery."
previous_url: /mvc/kendo-ui/controls/data-management/grid/how-to/Layout/edit-row-height-with-virtual-scrolling, /controls/data-management/grid/how-to/Layout/edit-row-height-with-virtual-scrolling
slug: howto_adjust_row_height_withvirtual_scrolling_grid
tags: grid, adjust, row, height, virtualization, scrolling, mode, virtual
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I adjust row height when virtual scrolling is enabled in the Kendo UI Grid widget for jQuery?

## Solution

The following example demonstrates how to adjust the row height of the Grid when the virtual scrolling functionality is enabled.

```dojo
    <div id="grid" style="height: 380px"></div>
    <style>
      .k-virtual-scrollable-wrap td {
        font-size: 14px;        
        white-space:nowrap;
        line-height: 13px;
      }

      #grid .k-virtual-scrollable-wrap tr td{
        height: 15px
      }
    </style>

    <script>
      var total = 1000000;
      $("#grid").kendoGrid({
        dataSource: {
          transport: {
            read: function(options) {
              var take = options.data.take,
                  skip = options.data.skip;
              var data = [];
              for (var i = skip; i < Math.min(skip + take, total); i++) {
                data.push({
                  OrderID: i,
                  ContactName: "Contact Contact Contact Contact Contact Contact Contact Contact Contact " + i,
                  ShipAddress: "Ship Address " + i
                });
              }
              options.success(data);
            }
          },
          schema: {
            total: function() {
              return total
            }
          },
          serverPaging: true,
          pageSize: 500
        },
        columns:[
          {field:"OrderID"},
          {field:"ContactName", width:"200px"},
          {field:"ShipAddress"}
        ],
        height: 400,
        scrollable: {
          virtual: true
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
