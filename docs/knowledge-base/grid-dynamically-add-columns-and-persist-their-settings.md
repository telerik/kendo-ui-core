---
title: Dynamically Add and Remove Columns to the Grid by Using the MultiSelect and Persist Their Settings
description: Learn how to dynamically add and remove columns in the Kendo UI for jQuery Grid by using the MultiSelect component and then persist their settings.
type: how-to
page_title: Add and Remove Columns Dynamically and Persist Their Settings - Kendo UI Grid for jQuery
slug: grid-dynamically-add-remove-columns-persist-settings
tags: grid, dynamically, columns, add, persist, settings
res_type: kb
ticketid: 1593817
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
</table>

## Description

How can I add and remove columns to the jQuery Grid component dynamically by using a [Kendo UI for jQuery MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index) while persisting their settings such as the template and title?

## Solution

To achieve the desired scenario:

1. In the [`dataBound`](/api/javascript/ui/grid/events/databound) event handler of the Grid, obtain the column configurations of the component with the initial Grid load.
1. In the [`change`](/api/javascript/ui/multiselect/events/change) event handler of the MultiSelect, set the new columns configuration object.
1. Call the [`setOptions()`](/api/javascript/ui/grid/methods/setoptions) method of the Grid with the new columns object.

```dojo
    <label for="multiselect">Select Columns to display</label>
    <input id="multiselect" style="width:50%" />
    <div id="grid"></div>
    <script>
      var gridCols;
      var columns = [{
        field:"OrderID",
        filterable: false,
        width: 70
      },{
        field: "Freight",
        width: 70
      },{
        field: "ShipName",
        title: "Ship Name",
        template: "<strong>#: ShipName # </strong>",
        width: 150
      }, {
        field: "ShipCity",
        title: "Ship City",
        template: "<strong>#: ShipCity # </strong>",
        width:300
      }];

      $("#multiselect").kendoMultiSelect({
        dataTextField:"field",
        dataValueField:"field",
        dataSource: {
          data: columns
        },
        value:["OrderID", "Freight", "ShipName", "ShipCity"],
        change: function(e){
          var grid = $("#grid").data("kendoGrid");
          var multiSelectCols = this.value();
          var newCols =[];

          if(multiSelectCols.length < gridCols.length ) {
            gridCols.forEach(function(col) {
              if(multiSelectCols.includes(col.field)) {
                newCols.push(col)
              }
            })
          } else if(multiSelectCols.length == gridCols.length) {
            newCols = gridCols
          }

          grid.setOptions({columns:newCols});  
        }
      });

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
        columns: columns
      });

      $("#grid").data("kendoGrid").one("dataBound", function(e) {
        var grid = e.sender;
        gridCols = grid.options.columns; //get the grid columns initially
      })
```

## See Also

* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
* [jQuery Grid Overview Demo](https://demos.telerik.com/kendo-ui/grid/index)
