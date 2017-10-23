---
title: Mixed Currency in Grid
description: An example on how to show different currencies in the Grid
type: how-to
page_title: How to Show Different Currencies in the Grid | Kendo UI Grid
slug: how-to-show-different-currencies-in-the-grid
tags: grid, currencies
ticketid: 1105869
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.1.223</td>
 </tr>
</table>


## Description
I have a global sales application where sales staff work on accounts around the globe.  They are asking to see the currency in the format for the country within the same grid.

Example:

User 1, $1,000.00

User 2, €2.000,00

User 3, £50.000.000,00

## Solution

This can be achieved via custom approach using a [column.template](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template) property of the Grid. This will require an information for every data item shown which is the correct currency. Also, a manual format has to be used for every currency.
   
Please check an example demonstrating this:  

````html
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
````
