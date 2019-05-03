---
title: Export the Entire Grid Data to Excel
description: How to export the entire data of the grid without the paging, filtering and grouping
type: how-to
page_title: Export the Entire Data to Excel | Kendo UI Grid
slug: grid-excel-export-entire-data
tags: grid, excel, export, whole, data, no filter, group, all pages, complete, entire
ticketid: 1140199
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

How can I export to Excel the complete (unfiltered) content of a filtered Grid instead of exporting only the displayed (filtered) data?

## Solution

Use either of the following approaches:

* The [built-in behavior of the Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/export/excel-export) is designed to export only the its current state&mdash;filtered, sorted, paged, and grouped. This means that to export all the data (without the query), you need to intercept the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event and modify the created workbook.

    ```
    excelExport: function(e){
      var sheet = e.workbook.sheets[0];
      var data = grid.dataSource.data();
      var gridColumns = grid.columns;
      var columns = gridColumns.map(function(col){
          return {
            value: col.title ? col.title : col.field,
            autoWidth:true,
            background: "#7a7a7a",
            color: "#fff"
          };
      });

      var rows = [{cells:columns, type: "header"}];

      for (var i = 0; i < data.length; i++){
        var rowCells = [];
        for(var j=0;j < gridColumns.length;j++){
          var cellValue = data[i][gridColumns[j].field];
          rowCells.push({value: cellValue});
        }
        rows.push({cells: rowCells, type: "data"});
      }
      sheet.rows = rows;
    }
    ```

    The following example demonstrates the implementation of the approach.

    ```dojo
    <div id="example">
          <div id="grid"></div>

          <script>
            $(document).ready(function () {
              var dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

              var grid = $("#grid").kendoGrid({
                dataSource: dataSource,
                excel:{
                  allPages:true
                },
                pageable: true,
                height: 550,
                toolbar:["excel"],
                columns: [
                  "ProductName",
                  { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                  { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
                  { field: "Discontinued", width: "120px" }],
                filterable: true,
                excelExport: function(e){
                  var sheet = e.workbook.sheets[0];
                  var data = grid.dataSource.data();
                  var gridColumns = grid.columns;
                  var columns = gridColumns.map(function(col){
                      return {
                        value: col.title ? col.title : col.field,
                        autoWidth:true,
                        background: "#7a7a7a",
                        color: "#fff"
                      };
                  });

                  var rows = [{cells:columns, type: "header"}];

                  for (var i = 0; i < data.length; i++){
                    var rowCells = [];
                    for(var j=0;j < gridColumns.length;j++){
                      var cellValue = data[i][gridColumns[j].field];
                      rowCells.push({value: cellValue});
                    }
                    rows.push({cells: rowCells, type: "data"});
                  }
                  sheet.rows = rows;
                }
              }).data("kendoGrid");
            });
          </script>
        </div>
    ```

* Alternatively, create another hidden Grid with the same data source and with its [`autoBind`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/autobind) set to `false`. Then, prevent the `excelExport` event of the filtered Grid and trigger the export of the "hidden" Grid instead of using the [`saveAsExcel()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveasexcel) method. The code looks similar to:

    ```
    excelExport: function(e){
      e.preventDefault();
      hiddenGrid.dataSource.read().then(function(){
        hiddenGrid.saveAsExcel();
      });
    }
    ```

    The following example demonstrates the implementation of the approach.

    ```dojo
    <div id="gridOne"></div>
    <div id="gridTwo"></div>
    <script>
      var ds = new kendo.data.DataSource({
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 },
          { name: "Tim Doe", age: 13 },
          { name: "Mary Doe", age: 23 },
          { name: "August Doe", age: 34 },
          { name: "Andrew Doe", age: 44 }
      	],
        filter: [{field:"name", operator:"contains", value:"a"}]
      })
    $("#gridOne").kendoGrid({
      filterable:true,
      toolbar:["excel"],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: ds,
      excelExport: function(e){
        e.preventDefault();
        hiddenGrid.dataSource.read().then(function(){
          hiddenGrid.saveAsExcel();
        });
      }
    });

    var hiddenGrid = $("#gridTwo").kendoGrid({
          autoBind:false,
      		excel: {allPages:true},
          dataSource:ds.data()
        }).data("kendoGrid");
    </script>
      <style>
        #gridTwo{
          display:none;
        }
      </style>
    ```
