---
title: Adjust row height with virtual scrolling
page_title: Adjust row height with virtual scrolling
description: Adjust row height in with virtual scrolling
---

# Adjust row height in with virtual scrolling

The following runnable sample demonstrates how to adjust the row height of a Kendo UI Grid with virtual scrolling enabled.

#### Example

```html
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