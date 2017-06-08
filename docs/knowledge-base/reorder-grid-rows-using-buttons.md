---
title: How to Reorder Rows with Buttons
description: Example on how to reorder Grid rows
type: how-to
page_title: Reorder Progress® Kendo UI® Grid rows with buttons
slug: reorder_grid_rows_with_buttons
position: 0
tags: grid, reordering, items
teampulseid:
ticketid: 1112024
publish: false
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>


## Description

I have a kendo grid, and my users need to be able to re-order rows. I'd like to add buttons on each row to move items up and down.

## Possible Solution

You can specify a column template to add the buttons on each row. In the buttons click handlers you should find reference to the corresponding row. You can attach the click handlers in the Grid dataBound event.


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Kendo UI Snippet</title>

    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.504/styles/kendo.common.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.504/styles/kendo.rtl.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.504/styles/kendo.silver.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.504/styles/kendo.mobile.all.min.css"/>

    <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2017.2.504/js/kendo.all.min.js"></script>

    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

  </head>
  <body>

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
  </body>
</html>
```

