---
title: Change Options of Widgets Dynamically
page_title: Change the Options of a Widget Programmatically | Kendo UI for jQuery
description: An example on how to change the options of the Kendo UI Grid dynamically.
type: how-to
slug: change-a-widget-options-dynamically
previous_url: /knowledge-base/how-to-change-a-widget-options-dinamically
tags: grid, setoptions, dynamically, options
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery</td>
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

How can I change the options of a Kendo UI widget programmatically?

## Solution

Set the `setOptions` method for the widget that you use.

The following example demonstrates how to dynamically change the Grid columns based on a selection of the MultiSelect widget. You can use the same approach to adjust all options of both the Grid and the other Kendo UI widgets.



```dojo
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
