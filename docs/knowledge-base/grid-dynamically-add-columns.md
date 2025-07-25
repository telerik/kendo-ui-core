---
title: Dynamically Add and Remove Columns to the Grid
description: Learn how to dynamically add and remove columns to the Kendo UI for jQuery Grid component.
type: how-to
page_title: Add and Remove Columns Dynamically - Kendo UI for jQuery Data Grid
slug: grid-dynamically-add-columns
tags: grid, dynamically, columns, add
res_type: kb
ticketid: 1142259
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I add and remove columns to the jQuery Grid component dynamically?

## Solution

The most straightforward way to achieve the desired scenario is to have [hidden columns](/api/javascript/ui/grid/configuration/columns.hidden) and allow the users to unhide them with the help of the [column menu](/api/javascript/ui/grid/configuration/columnmenu).

An alternative option is to use the [`setOptions()`](/api/javascript/ui/grid/methods/setoptions) method with a custom UI, for example, a Kendo UI for jQuery MultiSelect that holds a collection of all the available columns: 

1. In the [`change`](/api/javascript/ui/multiselect/events/change) event handler of the MultiSelect, get the current selection with the [`value()`](/api/javascript/ui/multiselect/methods/value) method.
1. Call the [`setOptions()`](/api/javascript/ui/grid/methods/setoptions) method of the Grid with the selected items.

```dojo
    <label for="multiselect">Select Columns to display</label>
    <input id="multiselect" style="width:50%" />
    <div id="grid"></div>
    <script>
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
        width: 150
      }, {
        field: "ShipCity",
        title: "Ship City",
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
          var cols = this.value();
          var grid = $("#grid").data("kendoGrid");
          grid.setOptions({columns:cols});          
        }
      });

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata-v4",
          transport: {
            read: "https://demos.telerik.com/service/v2/odata/Orders"
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
    </script>
```

## See Also

* [Creating Grids with Dynamic Columns and Data Types]({% slug howto_createdynamiccolumnsdatatypes_grid %})
