---
title: Disabling Grid Header Keyboard Navigation
description: Learn how to disable keyboard navigation in the header of a Kendo UI Grid.
type: how-to
page_title: How to Disable Grid Header Keyboard Navigation in Kendo UI Grid
slug: disable-grid-header-keyboard-navigation-kendo-ui-grid
tags: grid, kendo ui, keyboard navigation, header, disable
res_type: kb
---

## Environment

| Property | Value |
| --- | --- |
| Product | Grid for Progress® Kendo UI® |
| Version | 2023.1.117 |

## Description

I want to disable keyboard navigation specifically in the header of a Kendo UI Grid. Currently, the keyboard navigation is enabled for the entire grid, including the header. However, I would like to have it enabled only for the grid data table.

## Solution

To achieve the desired result, you can handle the [`navigate`](/api/javascript/ui/grid/events/navigate) event of the Grid and check if the [`current`](/api/javascript/ui/grid/methods/current) element is part of the Grid header. If it is, select a cell from the first row of the Grid data. 

Below you will find a runnable example:

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          navigate: function(e){              
            if($(e.element[0]).is('th')){
              var index = e.sender.current().index()
              var nextCell = e.sender.tbody.find("tr:eq(0) td:eq("+index+")");
              e.sender.current(nextCell)
            }
            e.preventDefault()
          },
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
          navigatable: true,
          pageable: true,
          columns: [
            {
              field:"OrderID",
              filterable: false
            },
            "Freight",
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:MM/dd/yyyy}"
            }, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ]
        });
      });
    </script>
```


