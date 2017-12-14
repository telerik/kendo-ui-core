---
title: Export the entire grid data to Excel
description: How to export the entire data of the grid without the paging, filtering and grouping
type: how-to
page_title: Export the entire data of the grid to Excel | Kendo UI Grid
slug: grid-excel-export-entire-data
tags: grid, excel, export, whole, data, no filter, group, all pages, complete, entire
ticketid: 1140199
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid</td>
 </tr>
</table>

## Description

When I have my grid with some filtering on, I want to be able to export the complete (unfiltered) content to Excel, instead of only exporting the data that is shown because of the currently active filter.

Can this be done?

## Solution
  
The [`built-in behaviour`](https://docs.telerik.com/kendo-ui/controls/data-management/grid/excel-export#enable-export-to-excel) indeed is designed to export the current state of the Kendo UI Grid - filtered, sorted, paged, grouped. This means that to meet the requirement to export all the data (without the query), you need to intercept the [`excelExport event`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) and modify the created workbook. 

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

#### Example

```html
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

## Suggested Workarounds
  
Alternatively, you may create another hidden grid with the same dataSource and [`autoBind`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-autoBind) set to false, prevent the excelExport event of the filtered grid and trigger the export of the "hidden" grid instead using the [`saveAsExcel()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-saveAsExcel) method. The code should look something like this:  

```
excelExport: function(e){
  e.preventDefault();
  hiddenGrid.dataSource.read().then(function(){
    hiddenGrid.saveAsExcel();
  });
}
```

#### Example

```html
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
