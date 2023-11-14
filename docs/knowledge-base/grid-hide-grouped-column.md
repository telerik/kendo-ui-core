---
title: Hide Group Columns When Grid is Grouped Initially
description: "Learn how to hide the grouped column when the dataSource is initially grouped in the Kendo UI Grid."
type: how-to
page_title: Hide the Group Column When the DataSource is Initially Grouped - Kendo UI for jQuery Grid
slug: grid-hide-grouped-column
tags: grid, hide, grouping, column
ticketid: 1608593
res_type: kb
---

## Environment

<table>	
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Grid for jQuery</td> 
	</tr>
</table>


## Description

I have enabled the [`hideOnGroup`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.hideongroup) option, but the column is still visible when the Grid is loaded initially. How can I hide the grouped column when the dataSource is grouped initially?

By design, the `hideOnGroup` option specifies if the column will be hidden when the Grid is grouped upon user interaction. For this reason, even if the dataSource is grouped initially using the group option, the respective column is visible in the table.


The example below demonstrates how the grouped column can be hidden initially.

## Solution

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event.
1. Retrieve the Grid [`groups`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/group) using the dataSource group method.
1. Use the Grid [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method.

```dojo
	<div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            group: { field: "ShipCity" },
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
          groupable: true,
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
              title: "Ship City",
              hideOnGroup: true
            }
          ]
        });

        var grid = $("#grid").data("kendoGrid"); //get a reference to the already initialized Grid
        grid.one("dataBound", function(e){ //handle its DataBound event one (the event handlers that are attached with "one" will be executed only once.)
          var grid = e.sender;
          var gridGrouping = e.sender.dataSource.group(); //Get the Grid's groups

          if(gridGrouping.length > 0) { //if there are initial groupings
            for(var i = 0; i < gridGrouping.length; i++) { //loop through them 
              grid.hideColumn(gridGrouping[i].field); //and hide the respective columns
            }
          }
        });
      });
    </script>
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid).
