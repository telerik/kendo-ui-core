---
title: Use both standard and checkbox selection in a Kendo Grid
description: An example on how to use both standard and checkbox selection in a Kendo Grid.
type: how-to
page_title: Use both standard and checkbox selection in a Kendo Grid | Kendo UI Grid
slug: grid-use-both-standard-and-checkbox-selection
tags: grid, selection, checkbox, standard, select, both, click, unselect, deselect
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2018.1.221</td>
 </tr>
</table>

## Description

How can I use both standard and checkbox selection in a Kendo Grid?

## Solution

Enable [Checkbox Selection](https://demos.telerik.com/kendo-ui/grid/checkbox-selection), attach an event handler to the click event of the row and via the [select](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method select/deselect the rows.
 
```html
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/orders.js"></script>


    <div id="grid"></div>

    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            data: orders,
            pageSize: 6,
            schema: {
              model: {
                id: "OrderID"
              }
            }
          },
          pageable: {
            buttonCount: 5
          },
          scrollable: false,
          persistSelection: true,
          navigatable: true,
          columns: [
            {
              selectable:true
            },
            {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            },
            {
              field: "Freight",
              width: 300
            },
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:dd/MM/yyyy}"
            }
          ]
        });

        $("#grid tbody").on("click", "tr", function(e) {
          if(!$(e.target).is('.k-checkbox-label')){
            var rowElement = this;
            var row = $(rowElement);
            var grid = $("#grid").getKendoGrid();

            if (row.hasClass("k-state-selected")) {

              var selected = grid.select();

              selected = $.grep(selected,function(x){
                var itemToRemove = grid.dataItem(row);
                var currentItem = grid.dataItem(x);

                return itemToRemove.OrderID != currentItem.OrderID
              })

              grid.clearSelection();

              grid.select(selected);

              e.stopPropagation();
            }else{
              grid.select(row)

              e.stopPropagation();
            }
          }
        });

      });
    </script>
```
