---
title: How to change the options dynamically 
description: An example on how to change a widget options dynamically.
type: how-to
page_title: Change the Options of a Widget Dynamically | Kendo UI Grid
slug: how-to-change-a-widget-options-dynamically
tags: grid, setoptions, dynamically, options

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>


## Description

The article demonstrates how to programatically change the widget options dynamically.

## Solution

When the widget options have to be changed programatically at runtime, we recommend using the setOptions method for the used widget. This is the only supported way to change the options which is recommended to ensure that different unexpected issue will occur.
The following example demonstrates how to dynamically change the Grid columns based on a selection of the MultiSelect widget. The demonstrated approach can be used for changing all of the options of the Grid and the other Kendo UI widgets as well.

Please check the following [Dojo](http://dojo.telerik.com/IvIcU) for reference.
```
   <div id="example">
   <p>Select Grid columns: </p>
    <select id="columns"></select>
    <p>The Grid columns will be shown based on the values selected in the MultiSelect:</p>
    <div id="grid"></div>
    <script>
     $(document).ready(function() {
          var defaultColumns = [{field:"OrderID",filterable: false},
                                {field:"Freight"},
                                {field: "OrderDate",title: "Order Date",format: "{0:MM/dd/yyyy}"},
                                {field: "ShipName",title: "Ship Name"},
                                {field: "ShipCity",title: "Ship City"}]
    $("#columns").kendoMultiSelect({
            dataSource:{
              data:["OrderID", "Freight", "ShipName", "OrderDate", "ShipCity"]
            },
     change:function(e){
              var selectedColumns = this.value()
              var grid = $('#grid').data('kendoGrid')
              if(selectedColumns.length == 0){
                grid.setOptions({
                  columns:defaultColumns
                })
              }
              else{
                grid.setOptions({
                  columns:selectedColumns
                })
              }
            }
          })
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: defaultColumns
          });
        });
      </script>
    </div>
```