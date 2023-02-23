---
title: Drag and Drop Rows between Grids When One of the Grids Is Empty
page_title: Drag and Drop Rows to an Empty Grid - Kendo UI for jQuery Data Grid
description: "Learn how to drag and drop rows between two Kendo UI Data Grids for jQuery when on of the Grids is empty."
slug: howto_dragand_drop_rows_toan_empty_grid
tags: grid, drag, drop, rows, between, empty
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I drag and drop rows to a Kendo UI Grid for jQuery when the Grid is empty?

## Solution

To achieve this scenario, add a fake row to the empty Grid. Once the user drops a real row from the other Grid, remove the fake one.

You can add the new item always to the bottom of the Grid by replacing the [`insert()`](/api/javascript/data/datasource/methods/insert) method with the [`add()`](/api/javascript/data/datasource/methods/add) method without specifying the index where the item will be placed.

```dojo
   <div class="k-d-flex k-flex-wrap">
      <div class="k-flex-grow">
        <h4 class="mb-sm">Available Products</h4>
        <div id="inStockProductsGrid"></div>
      </div>
      <div class="k-flex-grow">
        <h4 class="mb-sm">Not Available Products</h4>
        <div id="discontinuedGrid"></div>
      </div>
    </div>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
        var inStockData = [],
            discontinuedData = [];
        $.ajax({
          type: "READ",
          url: crudServiceBaseUrl + "/Products",
          dataType: "jsonp",
          success: function (data) {
            data.forEach(function (item) {
              item.Discontinued === false ? inStockData.push(item) : discontinuedData.push(item);
            });
          }
        }).done(function () {
          var inStockDS = new kendo.data.DataSource({
            data: inStockData,
            schema: {
              model: {
                id: "ProductID"
              }
            },
            pageSize: 10,
          });

          var discontinuedDS = new kendo.data.DataSource({
            data: discontinuedData,
            schema: {
              model: {
                id: "ProductID"
              }
            },
            pageSize: 10
          });


          $("#inStockProductsGrid").data("kendoGrid").setDataSource(inStockDS);
          //$("#discontinuedGrid").data("kendoGrid").setDataSource(discontinuedDS);
        });


        $("#inStockProductsGrid").kendoGrid({
          pageable: true,
          height: 400,
          width: 550,
          columns: [
            { draggable: true, width: "40px" },
            { field: "ProductName", title: "Product Name", width: "200px" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "140px" },
            {
              field: "Discontinued", title: "In Stock",
              template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
              attributes: { style: "text-align: center;" },
              width: "130px"
            }],
          dataBound: onDataBound,
          navigatable: true,
          reorderable: {
            rows: true
          },
          rowReorder: onRowRordered
        });

        $("#discontinuedGrid").kendoGrid({
          pageable: true,
          height: 400,
          width: 550,
          columns: [
            { draggable: true, width: "40px" },
            { field: "ProductName", title: "Product Name", width: "200px" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "140px" },
            {
              field: "Discontinued", title: "In Stock",
              template: "<span id='badge_#=ProductID#' class='badgeTemplate'></span>",
              attributes: { style: "text-align: center;" },
              width: "130px"
            }],
          dataBound: onDataBound,
          navigatable: true,
          reorderable: {
            rows: true
          },
          rowReorder: onRowRordered
        });
      });

      function onDataBound(e) {
        if (e.sender.dataSource.total() == 0) { //If the Grid is empty, add a dummy row.
          e.sender.dataSource.pushInsert(0, { ProductID: 0001, ProductName: "Drop a row here"});
        }

        var grid = this;
        grid.table.find("tr").each(function () {
          var dataItem = grid.dataItem(this);
          var themeColor = dataItem.Discontinued ? 'error' : 'success';
          var text = dataItem.Discontinued ? 'not available' : 'available';

          $(this).find(".badgeTemplate").kendoBadge({
            themeColor: themeColor,
            text: text,
          });
        })
      }

      function onRowRordered(ev) {
        var grid = ev.sender,
            dataSource = grid.dataSource,
            externalGrid, externalDataItem;

        if (ev.oldIndex === -1) { //The row dropped from the external Grid.
          ev.preventDefault();
          externalGrid = ev.row.parents(".k-grid").data("kendoGrid");
          externalDataItem = externalGrid.dataItem(ev.row); //Get the data item.

          if (externalDataItem.ProductID !== 0001) { //Prevent the moving of the dummy row.
            externalGrid.dataSource.remove(externalDataItem); //Remove the data item from the external Grid.
            dataSource.add(externalDataItem.toJSON()); //Add the data item in the current Grid.

            if (dataSource.total() > 1) { //Remove the dummy row if the Grid is not empty.
              var allItems = dataSource.data();
              var dummyItem = $.grep(allItems, function (n, i) { //Find the dummy row data item.
                return n.ProductID == 0001;
              });
              if (dummyItem.length > 0) {
                dataSource.remove(dummyItem[0]); //Remove it.
              }
            }
          }
        }
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
* [Dragging and Dropping the Data Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/drag-drop)
* [Product Page of the Data Grid](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
