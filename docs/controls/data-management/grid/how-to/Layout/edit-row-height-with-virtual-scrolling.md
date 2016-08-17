---
title: Adjust Row Height with Virtual Scrolling
page_title:  Adjust Row Height with Virtual Scrolling | Kendo UI Grid
description: "Learn how to adjust row height when virtual scrolling is enabled in the Kendo UI Grid widget."
slug: howto_adjust_row_height_withvirtual_scrolling_grid
---

# Adjust Row Height with Virtual Scrolling

The example below demonstrates how to adjust the row height of a Kendo UI Grid when the virtual scrolling functionality is enabled.

###### Example

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

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
