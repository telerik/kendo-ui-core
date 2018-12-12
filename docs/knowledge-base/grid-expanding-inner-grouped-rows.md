---
title: Expand Inner Grouped Rows
description: An example on how to expand the inner grouped rows in a Kendo UI Grid.
type: how-to
page_title: Expand the Inner Grouped Rows | Kendo UI Grid
slug: grid-expanding-inner-grouped-rows
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
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>

## Description

My Grid is grouped by site and then room number, and when it displays its content, all rows are collapsed as intended.

How can I automatically expand any rows within that group when I manually expand a row?

## Solution

Programmatically [expand](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/expandgroup) all items of the parent grouping field on the [`groupExpand`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/groupexpand) event:

The following example demonstrates how to implement the suggested approach&mdash;manually collapse all subgroups and then the main group to see how the subgroups programmatically expand once the main group gets expanded too.

```dojo
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
