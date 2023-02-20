---
title: Enable Reordering in Grid by Adding Buttons to Each Row
description: Learn how to reorder Kendo UI Grid rows by adding buttons to each row to move items up and down.
type: how-to
page_title: Reorder Rows by Adding Row Buttons - Kendo UI for jQuery Data Grid
slug: reorder-grid-rows-using-buttons
tags: grid, reordering, items
ticketid: 1112024
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>

## Description

How can I enable my users to reorder the Grid rows by adding buttons to each row to move items up and down?

## Solution

1. Specify a column template to add the buttons to each Grid row.
1. In the click handlers of the buttons, find a reference to the corresponding row and attach the click handlers to the `dataBound` event of the Grid.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="grid" style="width: 800px; margin: 0 auto;"></div>

    <script>
      var grid = $("#grid").kendoGrid({
        dataSource: {
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }
            }
          },
          pageSize: 16
        },
        scrollable: true,
        selectable: true,
        height: 500,
        columns: [
          {template: `<button class="btnUp">move up</button> <button class="btnDown">move down</button>`},
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
          { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
          { field: "Discontinued", width: "130px" }
        ],
        dataBound: function() {
          $(".btnUp").on("click", function(e) {
            var selectedItem = $(this).closest("tr");
            var selectedUid = selectedItem.attr("data-uid");
            var itemIndex = selectedItem.index();
            var dataItem = grid.dataItem(selectedItem);

            var newIndex = itemIndex - 1;
            var content = $(".k-grid-content");
            var offset = selectedItem.offset().top;

            if (newIndex <= 0) {
              newIndex = 0;
            }

            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);

            grid.select("[data-uid=" + selectedUid +"]");

            //content.scrollTop(offset);
          });

          $(".btnDown").on("click", function(e) {
            var selectedItem = $(this).closest("tr");
            var selectedUid = selectedItem.attr("data-uid");
            var itemIndex = selectedItem.index();
            var dataItem = grid.dataItem(selectedItem);

            var newIndex = itemIndex + 1;
            var content = $(".k-grid-content");

            var offset = selectedItem.offset().top;

            if (newIndex < grid.dataSource.view().length) {
              grid.dataSource.remove(dataItem);
              grid.dataSource.insert(newIndex, dataItem);

              grid.select("[data-uid=" + selectedUid +"]");

              //content.scrollTop(offset);
            }
          });
        }
      }).data("kendoGrid");
    </script>
```
