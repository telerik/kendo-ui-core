---
title: Sort Null Dates at the Bottom of the Grid
description: "Show the null date values at the bottom of the Grid when the data is sorted."
type: how-to
page_title: Sort Null Dates at the Bottom of the Grid - Kendo UI Grid
slug: grid-sort-null-dates-bottom
position: 
tags: grid, sort, sorting, null, bottom, show, end, ascending, descending, order, values, element, last
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
	</tbody>
</table>

## Description

How can I force the rows with `null` to appear at the end of the Grid?

## Solution

Use a [`compare`](/api/javascript/data/datasource/configuration/sort#sortcompare) function to apply custom sorting to the data.

You can apply the `compare` function to both:

   - The DataSource [`sort`](/api/javascript/data/datasource/configuration/sort#sortcompare) configuration in order to have the data sorted initially.
   - The Grid [`columns.sortable`](/api/javascript/ui/grid/configuration/columns.sortable#columnssortablecompare) configuration to allow the end-user to sort the dates by clicking on the Grid headers.

You can use the approach from the [following StackOverflow answer](https://stackoverflow.com/a/60907674) in order to sort the `null` dates at the bottom.

The following example demonstrates how to make the rows with `null` dates appear last.

```dojo
    <div id="grid"></div>

    <script>
      function customDateCompare(a, b, desc) {
        const distantFuture = new Date(8640000000000000);
        let dateA = a.OrderDate ? new Date(a.OrderDate) : distantFuture,
            dateB = b.OrderDate ? new Date(b.OrderDate) : distantFuture;

        // In desc order.
        if(desc){
          // If both dates exist, use the default sorting algorithm.
          if(a.OrderDate && b.OrderDate) {
            return dateA.getTime() - dateB.getTime();
          }

          // If one of the dates is null, reverse the calculation so the date is moved to the bottom.
          return dateB.getTime() - dateA.getTime();
        }

        // In asc order.
        // Use the default sorting.
        return dateA.getTime() - dateB.getTime();
      }

      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            data: getData(),
            pageSize: 6,
            sort: [
              { 
                field: "OrderDate", 
                dir: "desc", 
                compare: customDateCompare
              }
            ],
          },
          sortable: true,
          pageable: {
            buttonCount: 5
          },
          scrollable: false,
          columns: [
            {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            },
            {
              field: "Freight",
              width: 300
            },
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:dd/MM/yyyy}",
              sortable: {
                allowUnsort: false,
                compare: customDateCompare
              }
            }

          ]
        });

        function getData(){
          return [
            {
              OrderID : 10248,
              OrderDate : new Date(1996, 6, 10, 0, 0, 0, 0),
              ShipVia : 3,
              Freight : 32.3800,
              ShipCountry : "France"
            }, {
              OrderID : 10249,
              OrderDate : null,
              Freight : 11.6100,
              ShipCountry : "Germany"
            }, {
              OrderID : 10250,
              OrderDate : new Date(1996, 6, 8, 0, 0, 0, 0),
              Freight : 65.8300,
              ShipCountry : "Brazil"
            }, {
              OrderID : 10251,
              OrderDate : null,
              Freight : 41.3400,
              ShipCountry : "France"
            }, {
              OrderID : 10252,
              OrderDate : new Date(1996, 6, 9, 0, 0, 0, 0),
              ShipVia : 2,
              Freight : 51.3000,
              ShipCountry : "Belgium"
            }

          ];
        }

      });
    </script>
```