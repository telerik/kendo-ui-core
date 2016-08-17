---
title: Change Group Header Position When Columns Are Locked
page_title: Change Group Header Position When Columns Are Locked | Kendo UI Grid
description: "Learn how to change the position of the group header when locked columns are used in the Kendo UI Grid widget."
slug: howto_change_group_header_position_wthlocked_columns_grid
---

# Change Group Header Position When Columns Are Locked

The example below demonstrates how to change the group header position, when locked columns are used, in order to show them on the right table.

###### Example

```html
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataBound: function(e){
              var grid = this;
              this.lockedTable.find(".k-grouping-row").each(function(index) {
                var arrow = $(this).find("a");
                grid.tbody.find(".k-grouping-row:eq("+index+") td").text($(this).text())
                $(this).find("p").text(" ").append(arrow);
              })
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipCity: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30
            },
            height: 540,
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              locked: true,
              lockable: false,
              width: 50
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            }, {
              field: "ShipCity",
              title: "Ship City",
              width: 300
            },{
              field: "ShipName",
              title: "Ship Name",
              width: 300
            },  {
              field: "ShipAddress",
              lockable: false,
              width: 400
            }
                     ]
          });
        });
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
