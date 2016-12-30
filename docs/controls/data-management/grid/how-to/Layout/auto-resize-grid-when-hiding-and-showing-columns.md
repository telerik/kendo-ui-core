---
title: Resize the Grid to Match the Visible Column Widths When Hiding or Showing Columns
page_title:  Resize the Grid to Match the Visible Column Widths When Hiding or Showing Columns | Kendo UI Grid
description: "Learn how to resize the Grid to match the visible column widths when hiding or showing columns while the sum of the column widths is less than the initial width of the Kendo UI Grid."
slug: howto_resize_grid_when_hiding_columns_grid
---

# Resize the Grid to Match the Visible Column Widths When Hiding or Showing Columns

The example below demonstrates how to resize the Grid so it matches the visible column widths when hiding or showing columns while the sum of the column widths is less than the initial width of the Kendo UI Grid.

This approach prevents the appearance of white space in the widget when the sum of the widths of the visible columns is less than the initial width of the Grid.

To achieve this behavior:

1. Store the initial width of the Grid in a variable.
2. To call the method that performs the necessary calculations, use the [`dataBound`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound), [`columnShow`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-columnShow), and [`columnHide`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-columnHide) events.

To access and loop through the columns, the `setGridWidth()` method:
* Uses the [`columns`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#fields-columns) field of the Grid.
* Calculates the sum of the visible column widths.
* Adds the width of the vertical scrollbar when necessary.

###### Example

```html
	<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          var initialGridWidth;
          function setGridWidth(e){
            var cols = e.sender.columns;
            var currentColWidth = cols.reduce(function(prev, cur){
              if(!cur.hidden){
                return prev += cur.width;
              } else {
                return prev;
              }
            }, 0);

            if(currentColWidth > initialGridWidth){
              e.sender.wrapper.width(initialGridWidth);
            } else {
              e.sender.wrapper.width(currentColWidth + kendo.support.scrollbar());
            }
          }

          var grid = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipAddress: { type: "string" }                                        
                  }
                }
              },
              pageSize: 30,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: true,
            dataBound: function(e){
              setGridWidth(e);
            },
            columnShow: function(e){
              setGridWidth(e);
            },
            columnHide: function(e){
              setGridWidth(e);
            },
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 320
            }, {
              field: "ShipName",
              title: "Ship Name",
              width: 320
            },  {
              field: "ShipAddress",
              filterable: false,
              width: 320
            }
                     ]
          }).data('kendoGrid');

          initialGridWidth = grid.wrapper.width();
        });
      </script>
    </div>
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
