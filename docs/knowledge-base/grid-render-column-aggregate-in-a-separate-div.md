---
title: Populate Column Aggregate In a Separate DIV Element
description: How to render a column aggregate in a separate div
type: troubleshooting
page_title: Render Column Aggregate In a Separate DIV Element
slug: grid-render-column-aggregate-in-a-separate-div
position: 
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

My requirement is to populate a column aggregate/sum into a separate div element outside of the Grid.

## Solution
  
The aggregates for a column can be retrieved using the [aggregates](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-aggregates)  method of the dataSource:  
   
  
The following example demonstrates how to show the value inside a DIV:  
  
````html
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
  

