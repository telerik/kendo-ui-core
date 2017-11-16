---
title: Select or deselect item on row click
description: Example on how to select or deselect when clicking a row in Kendo Grid
type: how-to
page_title:  Select or deselect item on row click | Kendo UI Grid
slug: select-or-deselect-item-on-row-click
tags: grid, selection, remove, deselect, unselect, select, row, click, multiple, persist
res_type: kb
component: grid
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

I enabled selection in the Grid and would like to select and deselect multiple rows by simply clicking on a row.

## Solution

When selection is enabled in the Grid component the built-in option for deselecting a row or selecting multiple rows is Ctrl+click. 

In order to deselect a row or select multiple rows by just clicking, without holding the Ctrl key you can use the approach below:


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
          selectable: "multiple",
          pageable: {
            buttonCount: 5
          },
          scrollable: false,
          persistSelection: true,
          navigatable: true,
          columns: [
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
        });

      });
    </script> 
```