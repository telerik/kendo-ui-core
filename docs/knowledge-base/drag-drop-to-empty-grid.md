---
title: Drag and Drop Rows to an Empty Grid
page_title: Dragging and Dropping a Row to an Empty Grid
description: Learn how to enable the dragging and dropping of a record to an empty Kendo UI for jQuery Data Grid component.
type: how-to
slug: drag-drop-empty-grid
tags: kendo, jquery, datagrid, grid, drag, drop, empty, row
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

I have two Kendo UI for jQuery Grids, one of them with no data. How can I enable the dragging and dropping of records to the empty Grid?

## Solution

By design, to be performed, the built-in drag-and-drop functionality of the Grid requires you to have at least one row (record) in the component because the drop target is the row element. 

Therefore, to enable dragging and dropping of records to your empty Grid, you have to add an empty, dummy row to the component and, when a real record has been added to it, remove the dummy row:

1. Handle the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grids and, if the Grid is empty, add a dummy row.
1. Remove the dummy row when a row is dropped into the Grid by handling the [`rowReorder`](/api/javascript/ui/grid/events/rowreorder) event handler.


```dojo
    <h4>Available Products</h4>
    <div id="inStockProductsGrid"></div>
    <h4>Not Available Products</h4>
    <div id="discontinuedGrid"></div>

    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: "https://demos.telerik.com/service/v2/core" + "/Products"
            }
          },
          pageSize: 10
        });

        $("#inStockProductsGrid").kendoGrid({
          dataSource: dataSource,
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
        if (e.sender.dataSource.total() == 0) { //if the grid is empty ==> add a dummy row
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

        if (ev.oldIndex === -1) { // Row dropped from external grid
          ev.preventDefault();
          externalGrid = ev.row.parents(".k-grid").data("kendoGrid");
          externalDataItem = externalGrid.dataItem(ev.row); //Get the data item.

          if (externalDataItem.ProductID !== 0001) { //prevent moving the dummy row
            externalGrid.dataSource.remove(externalDataItem); //Remove the data item from the external Grid.
            dataSource.add(externalDataItem.toJSON()); //Add the data item in the current Grid.

            if (dataSource.total() > 1) { //remove the dummy row if the grid is not empty
              var allItems = dataSource.data();
              var dummyItem = $.grep(allItems, function (n, i) { //find the dummy row data item
                return n.ProductID == 0001;
              });
              if (dummyItem.length > 0) {
                dataSource.remove(dummyItem[0]); //remove it
              }
            }
          }
        }
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [jQuery Grid Drag & Drop Demo](https://demos.telerik.com/kendo-ui/grid/drag-drop)
