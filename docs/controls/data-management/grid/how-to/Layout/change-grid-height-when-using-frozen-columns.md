---
title: Change Grid Height When Using Frozen Columns
page_title: Change Grid Height When Using Frozen Columns | Kendo UI Grid
description: "Learn how to resize the Grid when using frozen columns"
slug: howto_change_grid_height_frozen_columns
---

# Change Grid Height When Using Frozen Columns

Normally, the Grid height should be fixed when using frozen columns. This ensures the Grid is able to calculate and construct its layout properly.

The example below demonstrates how to resize the Grid even when frozen columns are used. The idea is to change the height style of the Grid [wrapper `<div>`]({% slug widgetwrapperandelement_references_gettingstarted %}) and then call the widget's [`resize` method]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing).

###### Example

```html
<div id="example">
  <p>Group by the ShipCountry column and collapse some groups.</p>
  <div id="grid"></div>

  <script>
    $(function() {

      function attachGroupResizeHandler(grid) {
        grid.wrapper.find(".k-grouping-row .k-icon").on("click", function(){
          resizeGrid(grid);
        });
      }

      function detachGroupResize(e) {
        e.sender.wrapper.find(".k-grouping-row .k-icon").off("click")
      }

      function onDataBound(e) {
        attachGroupResizeHandler(e.sender);
        resizeGrid(e.sender);
      }

      function resizeGrid(grid) {
        setTimeout(function() {
          var lockedContent = grid.wrapper.children(".k-grid-content-locked")
          var content = grid.wrapper.children(".k-grid-content");

          grid.wrapper.height("");
          lockedContent.height("");
          content.height("");

          grid.wrapper.height(grid.wrapper.height());

          grid.resize();
        });
      }

      $("#grid").kendoGrid({
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
                ShipCity: { type: "string" },
                ShipAddress: { type: "string" }
              }
            }
          },
          pageSize: 15
        },
        height: 540,
        dataBinding: detachGroupResize,
        dataBound: onDataBound,
        groupable: true,
        resizable: true,
        pageable: true,
        columns: [ {
          field: "OrderID",
          title: "Order ID",
          locked: true,
          lockable: false,
          width: 150
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
          locked: true,
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

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
