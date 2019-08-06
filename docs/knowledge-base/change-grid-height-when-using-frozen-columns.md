---
title: Change Grid Height When Using Frozen Columns
page_title: Change the Height in Grid with Frozen Columns | Kendo UI Grid for jQuery
description: "An example on how to resize the Kendo UI Grid when using frozen columns."
previous_url: /controls/data-management/grid/how-to/Layout/change-grid-height-when-using-frozen-columns
slug: howto_change_grid_height_frozen_columns
tags: grid, change, height, frozen, locked, columns
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

How can I resize a Kendo UI Grid which has frozen columns?

## Solution

The frozen column functionality requires the Grid to have fixed height. However, the suggested approach ensures that the Grid is able to calculate and construct its layout properly during resizing.

The following example demonstrates how to change the height style of the [`<div>`]({% slug widgetwrapperandelement_references_gettingstarted %}) wrapper element and then call the [`resize`]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing) method of the Grid.

```dojo
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
