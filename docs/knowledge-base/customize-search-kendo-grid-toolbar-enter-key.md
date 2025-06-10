---
title: Customizing Search in Kendo UI Grid Toolbar to Trigger on Enter Key Press
description: Learn how to modify the search functionality in the Kendo UI Grid to initiate search only when the Enter key is pressed when serverFiltering is enabled.
type: how-to
page_title: How to Trigger Search on Enter Key Press in Kendo UI Grid with Server Filtering
slug: customize-search-kendo-grid-toolbar-enter-key
tags: kendo ui, grid, search, toolbar, serverfiltering, enter key, keydown event
res_type: kb
ticketid: 1668767
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

I want to customize the search option in the grid toolbar so that the search is triggered not by the change event but by pressing the Enter key. In my Grid, [`serverFiltering`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/serverfiltering) is enabled. This KB article also answers the following questions:

- How to prevent the Kendo UI Grid from searching on every keypress?
- How to make the Kendo UI Grid search work with the Enter key press?
- How to customize the Kendo UI Grid search functionality with serverFiltering enabled?

## Solution

To customize the search functionality in the Kendo UI [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) so that it triggers only on an Enter key press, especially when `serverFiltering` is enabled, follow these steps:

1. Attach a handler to the `keydown` event of the search box.
2. Check the pressed key. If it is not 'Enter', prevent the [`dataSource request`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requeststart) from firing.
3. If the user presses 'Enter', manually apply the filter.

Here is the JavaScript code demonstrating the solution:

```javascript
$(".k-grid-search input").on("keydown", function(e) {            
    let grid = $("#grid").data("kendoGrid");
    let filters = grid.dataSource.filter();

    if(e.keyCode != 13){
      grid.dataSource.one("requestStart", function(e) {
        e.preventDefault();
      });
    }else{
      if(filters) {
        grid.dataSource.filter(filters); 
      } else {
        grid.dataSource.filter([]);
      }
    }
});
```
Below is a runnable example: 

```dojo
 <div id="grid"></div>
    <script>
      $(document).ready(function () {
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
          toolbar: ["search"],
          messages: {
            commands: {
              search: "rechercher"
            }
          },
          search: {
            fields: [
              { name: "OrderID", operator: "eq" },
              { name: "Freight", operator: "gte" },
              { name: "ShipName", operator: "contains" },
              { name: "ShipCity", operator: "contains" }
            ]
          },
          columns: [
            {
              field: "OrderID",
              title: "Order ID",
            },
            "Freight",
            {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ]
        });

        $(".k-grid-search input").on("keydown", function(e) {            
          let grid = $("#grid").data("kendoGrid");
          let filters = grid.dataSource.filter();

          if(e.keyCode != 13){
            grid.dataSource.one("requestStart", function(e) {
              e.preventDefault();
            });
          }else{
            if(filters) {
              grid.dataSource.filter(filters); 
            } else {
              grid.dataSource.filter([]);
            }
          }
        });

      });
    </script>

```


## See Also

- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [DataSource serverFiltering Configuration](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/serverfiltering)
- [DataSource requestStart Event](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requeststart)
