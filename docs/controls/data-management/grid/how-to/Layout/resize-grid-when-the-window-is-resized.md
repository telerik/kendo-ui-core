---
title: Resize Grid When Window Is Resized
page_title:  Resize Grid When Window Is Resized | Kendo UI Grid Widget
description: "Learn how to resize a Kendo UI Grid widget when the parent window is resized too."
slug: howto_resize_whenthe_windowis_resized_grid
---

# Resize Grid When Window Is Resized

Web standards require elements with a percentage height to have a parent with an explicit height. The rule applies recursively until an element with a pixel height is reached, or the root `<html>` element is reached. In the latter case the `body` and `html` elements need a 100% height style as well. 100% high elements cannot have margins, paddings, borders, and siblings.

The example below demonstrates how to resize the Kendo UI Grid when the parent window is resized.

###### Example

```html
    <style>
      html,
      body,
      #parent,
      #grid
      {
        margin: 0;
        padding: 0;
        border-width: 0;
        height: 100%; /* DO NOT USE !important for setting the Grid height! */
      }

      html
      {
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
      }

      $(window).resize(function(){
        resizeGrid();
      });

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 25,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        filterable: true,
        sortable: true,
        resizable: true,
        pageable: true,
        columns: [{
          field:"OrderID",
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

Other articles on Kendo UI Grid and how-to examples related to its layout:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})