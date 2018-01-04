---
title: Expanding Inner Grouped Rows
description: An example on how to expand the inner grouped rows
type: how-to
page_title: How to Expand the Inner Grouped Rows of the Grid
slug: grid-expanding-inner-grouped-rows
position: 
tags: filter, grid, group, expand
ticketid: 1145080
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 913</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

I have a grid that is grouped by site and then room number.
I would like to have the grid open up with all the rows collapsed. This I am able to do. What I need help in is when I manually expand a row, I would like to automatically expand any rows within that group as well.

## Solution  
  
In this scenario, we can suggest to programmatically [expand](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-expandGroup) all items of the parent grouping field on the [groupExpand](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-groupExpand) event:  
  
I made an example demonstrating this. Manually collapse all subgroups and then the main group after that notice how the subgroups are programmatically expanded once the main group is expanded:  

````html
<div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
              },
              schema:{
                model: {
                  fields: {
                    UnitsInStock: { type: "number" },
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsOnOrder: { type: "number" },
                    UnitsInStock: { type: "number" }
                  }
                }
              },
              pageSize: 7,
              group: [{
                field: "UnitsInStock"
              },
                      {
                        field: "UnitPrice"
                      }],

              aggregate: [ { field: "ProductName", aggregate: "count" },
                          { field: "UnitPrice", aggregate: "sum" },
                          { field: "UnitsOnOrder", aggregate: "average" },
                          { field: "UnitsInStock", aggregate: "min" },
                          { field: "UnitsInStock", aggregate: "max" }]
            },
            sortable: true,
            scrollable: false,
            groupable:true,
            pageable: true,
            groupExpand: function(e) {
              for (let i = 0; i < e.group.items.length; i++){
                var expanded = e.group.items[i].value
                e.sender.expandGroup(".k-grouping-row:contains("+expanded+")");
              }
            },
            columns: [
              { field: "ProductName", title: "Product Name"},
              { field: "UnitPrice", title: "Unit Price"},
              { field: "UnitsOnOrder", title: "Units On Order" },
              { field: "UnitsInStock", title: "Units In Stock"}
            ]
          });
        });
      </script>
    </div>
````

