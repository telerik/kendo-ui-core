---
title: Populate Column Aggregates In Separate div Elements
description: An example on how to render a column aggregate of a Kendo UI Grid in a separate div element.
type: how-to
page_title: Render Column Aggregates In Separate div Elements | Kendo UI Grid for jQuery
slug: grid-render-column-aggregate-in-a-separate-div
tags: grid, aggregates
ticketid: 1148127
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I populate a column aggregate (sum) into a separate `div` element outside the Grid?

## Solution

To retrieve the aggregate of a column, use the [`aggregates`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-aggregates) method of the dataSource.

````dojo
  <body>
    <div id="example">
      <div id="agg"> </div>
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
              aggregate: [{ field: "UnitsInStock", aggregate: "sum" }]
            },
            sortable: true,
            dataBound:function(e){
              var aggSum = e.sender.dataSource.aggregates().UnitsInStock.sum
              $('#agg').html("The sum of the Units In Stock column is: "+ aggSum)
            },
            scrollable: false,
            pageable: true,
            columns: [
              { field: "ProductName", title: "Product Name"},
              { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
              { field: "UnitsOnOrder", title: "Units On Order" },
              { field: "UnitsInStock", title: "Units In Stock"}
            ]
          });
        });
      </script>
    </div>
    <style>
      #agg{
        margin: 25px;
      }
    </style>
  </body>
````
