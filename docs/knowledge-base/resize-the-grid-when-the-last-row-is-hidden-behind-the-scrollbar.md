---
title: Persist the Resizing of the Last Grid Row When Virtual Scrolling Is Enabled
description: An example on how to resize the Kendo UI Grid when its last row is hidden behind the scrollbar.
type: how-to
page_title: Resize the Grid When the Last Row Is Hidden behind the Scrollbar | Kendo UI Grid for jQuery
slug: resize-the-grid-when-the-last-row-is-hidden-behind-the-scrollbar
previous_url: /knowledge-base/how-to-resize-the-grid-when-the-last-row-is-hidden-behind-the-scrollbar
tags: grid, virtualization, scroll, resize
ticketid: 1134254
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
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61</td>
 </tr>
  <tr>
  <td>Made with version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

The last row of the Grid with virtualization gets hidden if the horizontal scrollbar appears after resizing the column.

How can I persist the resizing of the last row in the Kendo UI Grid when virtual scrolling is enabled?

## Solution

The reason for this issue is that the scrollbar is not part of the initial Grid height.

To ensure that the row will be visible, programmatically resize the Grid after the [column resizing](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnresize).

```dojo
<div id="grid" style="height: 380px;width:400px"></div>
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
      var total = 101;
      $("#grid").kendoGrid({
        columnResize: function(e) {
          e.sender.resize()
        },
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
        resizable:true,
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
