---
title: Display Mixed Currencies in Grid
description: An example on how to show different currencies in the Kendo UI Grid.
type: how-to
page_title: Show Different Currencies | Kendo UI Grid
slug: show-different-currencies-in-the-grid
tags: grid, currencies
previous_url: /knowledge-base/how-to-show-different-currencies-in-the-grid
ticketid: 1105869
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Made with version</td>
  <td>2017.1.223</td>
 </tr>
</table>


## Description

I have a global sales application in which the sales staff work on accounts around the globe. They need to see the currency in the culture format of their countries in the same Grid. For example, `User 1, $1,000.00`, `User 2, €2.000,00`, `User 3, £50.000.000,00`.

How can I display different currencies in the same Grid?

## Solution

Use a custom approach by utilizing the [`column.template`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template) property of the Grid. This logic requires information about which the correct currency for each displayed data item is and you need to use a manual format for every currency.

```dojo
<div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
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
            columns: [{
              field:"OrderID",
              filterable: false
            },
                      {field:"Freight", template:"#= currency(data)#"},
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
        function currency(data){
          if(data.Freight > 40 ){
            return kendo.toString(data.Freight, "£###.##")
          }
          return kendo.toString(data.Freight, "$###.##")
        }
      </script>
    </div>
```
