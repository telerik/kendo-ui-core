---
title: Display Same Aggregate in Group Header Regardless of Column Used to Group By
description: An example demonstrating how to always display the sum of a particular column in the group header
type: how-to
page_title: Display Aggregate in Group Header Calculated Using Different Column | Kendo UI Grid
slug: grid-display-different-aggregate-group-header
tags: grid, aggregate, group, header, different, column, sum, average
ticketid: 1168063
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I display the sum of a specific column, let's say Units In Stock, in the header of the groups, even when I group by a different column?

## Solution

In order to access the aggregate of a specific column in a Kendo UI Template, we use the following:

```
aggregates.fieldName1.sum
```

The following sample demonstrates the approach described above by displaying the **UnitsInStock** sum aggregate in the `groupHeaderTemplate`:

```dojo
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
              UnitsInStock: { type: "number" },
              Discontinued: { type: "boolean"}
            }
          }
        },
        pageSize: 7,
        group: {
          field: "UnitsInStock", aggregates: { field: "UnitsInStock", aggregate: "sum" }

        },

        aggregate: { field: "UnitsInStock", aggregate: "sum" }
      },
      sortable: true,
      scrollable: false,
      groupable: true,
      pageable: true,
      columns: [
        { field: "ProductName", title: "Product Name", groupHeaderTemplate: "Product Name: #=value# - (Units in Stock: #=aggregates.UnitsInStock.sum#)" },
        { field: "UnitPrice", title: "Unit Price", groupHeaderTemplate: "Unit Price: #=value# - (Units in Stock: #=aggregates.UnitsInStock.sum#)" },
        { field: "UnitsOnOrder", title: "Units On Order", groupHeaderTemplate: "Units On Order: #=value# - (Units in Stock: #=aggregates.UnitsInStock.sum#)" },
        { field: "UnitsInStock", title: "Units In Stock", aggregates: ["sum"]},
        { field: "Discontinued", title: "Discontinued", groupHeaderTemplate: "Discontinued: #=value# - (Units in Stock: #=aggregates.UnitsInStock.sum#)"}
      ]
    });
  });
</script>
```

## See Also

* [groupHeaderTemplate property API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadertemplate#columns.groupHeaderTemplate)
