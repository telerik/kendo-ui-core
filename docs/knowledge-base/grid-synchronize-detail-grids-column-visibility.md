---
title: Show and Hide Columns in All Detail Grids at the Same Time
description: An example on how to apply column visibility changes to all detail Grids at the same time when using a column menu and keep column visibility in sync.
type: how-to
page_title: Apply Column Visibility Changes to All Detail Grids Using the Column Menu | Kendo UI Grid
slug: grid-show-hide-columns-in-all-detail-grids
tags: grid, hierarchy, columns, column-menu
ticketid: 1157518
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I am looking for a way to make the column visibility changes of one detail table apply to all detail tables in a hierarchical Grid.

## Solution

You can synchronize detail columns visibility in a hierarchical Grid by following these steps:

1. Add `columnHide` and `columnShow` event handlers to the detail Grids.
1. Declare an object variable that stores the columns visible state.
1. Use the Grid `dataBound` event to initially populate the columns visible state and to restore them when a new Grid is loaded.
1. When a column is hidden/shown in one Grid, manually hide/show it in all other loaded Grids and store its new state.

The following example demonstrates the full implementation of the suggested approach.

```html
    <div id="grid"></div>

    <script>
      /* Declare an object to store detail Grid columns visibility state.
         You can store this object in localStorage if you want to persist the state
         between page reloads */
      var detailColsVisibility = {};
      $(document).ready(function() {

        var element = $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 6
          },
          height: 600,
          sortable: true,
          pageable: true,
          detailInit: detailInit,
          dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
          },
          columns: [
            {
              field: "FirstName",
              title: "First Name",
              width: "110px"
            },
            {
              field: "LastName",
              title: "Last Name",
              width: "110px"
            },
            {
              field: "Country"
            }
          ]
        });
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            pageSize: 3,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          columns: [
            { field: "OrderID", width: "110px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: "300px" }
          ],
          columnMenu: true,
          dataBound: function(e){
            var grid = this;
            var columns = grid.columns;
            // populate initial columns list if the detailColsVisibility object is empty
            if(Object.getOwnPropertyNames(detailColsVisibility).length == 0){
              for(var i = 0; i < columns.length; i++){
                detailColsVisibility[columns[i].field] = !columns[i].hidden;
              }
            }
            else {
              // restore columns visibility state using the stored values
              for(var i = 0; i < columns.length; i++){
                var column = columns[i];
                if(detailColsVisibility[column.field]){
                  grid.showColumn(column);
                }
                else {
                  grid.hideColumn(column);
                }
              }
            }
          },
          columnHide: function(e){
            // hide column in all other detail Grids
            showHideAll(false, e.column.field, e.sender.element);
            // store new visibility state of column
            detailColsVisibility[e.column.field] = false;

          },
          columnShow: function(e){
            // show column in all other detail Grids
            showHideAll(true, e.column.field, e.sender.element);
            // store new visibility state of column
            detailColsVisibility[e.column.field] = true;
          }
        });

      }
      function showHideAll(show, field, element){
        // find the master Grid element
        var parentGridElement = element.parents(".k-grid");
        // find all Grid widgets inside the mater Grid element
        var detailGrids = parentGridElement.find(".k-grid");
        //traverse detail Grids and show/hide the column with the given field name
        for(var i = 0; i < detailGrids.length; i++){
          var grid = $(detailGrids[i]).data("kendoGrid");
          if(show){
            grid.showColumn(field);
          }
          else {
            grid.hideColumn(field);
          }
        }
      }
    </script>
```