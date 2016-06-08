---
title: Create and Use Auto Layout
page_title:  Create and Use Auto Layout | Kendo UI Grid
description: "Learn how to create and use auto layout in the Kendo UI Grid widget."
slug: howto_create_and_use_autolayout_grid
---

# Create and Use Auto Layout

The example below demonstrates how to create auto layout for the Kendo UI Grid. Note that the auto layout requires you to disable the scrolling functionality of the Grid.

###### Example

```html
    <style>
      html
      {
        font: 12px sans-serif;
      }

      .k-grid
      {
        width: 500px;
      }

      #grid3
      {
        display: inline-block;
        width: auto;    
      }

      #grid3 table
      {
        width: auto;
      }
    </style>
    <p><strong>N.B: Auto layout requires disabled Grid scrolling.</strong></p>

    <h3>No column widths, auto layout</h3>

    <div id="grid1"></div>

    <h3>One narrow column with other wide columns, auto layout</h3>

    <div id="grid2"></div>

    <h3>Minimal Grid with auto layout.</h3>

    <div id="grid3"></div>
    <script>
      var gridConfig = {
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                OrderDate: { type: "date" }
              }
            }
          },
          pageSize: 5,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        scrollable: false,
        sortable: true,
        pageable: {numeric:false, info:false}
      };

      $("#grid1").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid2").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight",
          width: 75
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid3").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
