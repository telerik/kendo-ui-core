---
title: Sort groups by their aggregates
description: An example on how to implement custom group sort in the Kendo UI Grid using group aggregates.
type: how-to
page_title: Sort grid groups by group aggregate | Kendo UI Grid for jQuery
slug: grid-sort-group-by-group-aggregate
tags: grid, sort, group, aggregate, compare
ticketid: 1431802
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2019.3.917</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

I have a Kendo Grid with monthly sales data, grouped by customer. I was trying to sort the data by total sales in ascending order, but I can't find a way to sort the groups based on a specific criteria. I need to sort the groups by their aggregated fields.

## Solution

The Kendo UI DataSource group configuration has a [`compare`](/api/javascript/data/datasource/configuration/group#groupcompare) function that can be used to sort the groups order:

```
    dir: "asc",
    compare: function(a, b) {
        var a = a.items.map(x=>x.total);
        var b = b.items.map(x=>x.total);

        var reducer = (accumulator, currentValue) => accumulator  + currentValue;
        var aTotalSum = a.reduce(reducer);
        var bTotalSum = b.reduce(reducer);

        if (aTotalSum == bTotalSum) {             
            return 0;
        } else if (aTotalSum > bTotalSum) {
            return 1;
        } else {
            return -1;
        }
    }
```

```dojo
    <div id="grid"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          { customer: "Walmart", store: "Florida", july: 25, aug: 10, sep: 12, total: 47 },
          { customer: "Target", store: "Manhattan", july: 30, aug: 12, sep: 0, total: 42 },
          { customer: "Walmart", store: "Los Angeles", july: 12, aug: 12, sep: 12, total: 36 },
          { customer: "Walmart", store: "Phoenix", july: 12, aug: 0, sep: 12, total: 24 },
          { customer: "Telerik", store: "Las Vegas", july: 0, aug:0, sep: 12, total: 12 },
          { customer: "Target", store: "Seattle", july: 25, aug: 20, sep: 15, total: 60 },
          { customer: "Telerik", store: "Houston", july: 1, aug: 5, sep:0, total: 6 }
        ],
        pageSize: 10,
        schema:{
          model: {
            fields:{
              july: { type: "number"},
              aug: { type: "number"},
              sep: { type: "number"},
              total: { type: "number"}
            }
          }
        },
        group: {
          field: "customer",
          aggregates: [
            { field: "july", aggregate: "sum" },
            { field: "aug", aggregate: "sum" },
            { field: "sep", aggregate: "sum" },
            { field: "total", aggregate: "sum" }
          ],
          dir: "asc",
          compare: function(a, b) {
            var a = a.items.map(x=>x.total);
            var b = b.items.map(x=>x.total);
            var reducer = (accumulator, currentValue) => accumulator  + currentValue;
            var aTotalSum = a.reduce(reducer);
            var bTotalSum = b.reduce(reducer);
            if (aTotalSum == bTotalSum) {             
              return 0;
            } else if (aTotalSum > bTotalSum) {
              return 1;
            } else {
              return -1;
            }
          }
        },
        sort: { 
          field: "total", 
          dir: "asc"
        }
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        columns: [
          {
            field: "customer",
            groupHeaderTemplate: "#=value#",
            hidden: true,
          },
          { 
            title: "Store",
            field: "store", 
            width: 150,
            groupFooterTemplate: "<div style='text-align: right;'>Total:</div>"
          },
          { 
            title: "July Sales",
            field: "july", 
            attributes: { style: "text-align: right;" },
            groupFooterTemplate: "<div style='text-align: right;'>#= sum || ''#</div>"
          },
          { 
            title: "Aug Sales",
            field: "aug", 
            attributes: { style: "text-align: right;" },
            groupFooterTemplate: "<div style='text-align: right;'>#= sum || ''#</div>"
          },
          { 
            title: "Sep Sales",
            field: "sep", 
            attributes: { style: "text-align: right;" },
            groupFooterTemplate: "<div style='text-align: right;'>#= sum || ''#</div>"
          },
          {
            title: "Total Sales",
            field: "total",
            aggregate: ["sum"],
            width: 140,
            attributes: { style: "text-align: right;" },
            groupFooterTemplate: "<div style='text-align: right;'>Total Sales: #= sum || ''#</div>",
          }
        ]
      });
    </script>
```
