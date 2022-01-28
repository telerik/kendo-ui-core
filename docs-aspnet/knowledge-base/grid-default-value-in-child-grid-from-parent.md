---
title: Hierarchy child grid default date value from parent
description: An example on how to assign a default date value from a parent grid to a child grid.
type: how-to
page_title: Pass default date value from parent to child grid
slug: grid-default-value-in-child-grid-from-parent
tags: aspnet, core, dotnet-core, mvc, kendo, kendo-ui, grid, child, Hierarchy, default, date, value, property, assign, pass
ticketid: 1457037
res_type: kb
component: grid, datasource
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>DataSource for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
</table>

## Description

I have a hierarchy grid where I need to set the default value in the child's grid to values from the parent.
Also the value I need to set is a date. Here is my code:

```
    .Model(model => {
        model.Field(m => m.TestDate).DefaultValue("#= kendo.toString(TestDate,'dd/MM/yyyy') #");
    })
```

When I attempt to set the default value I get an error that says

```
    Object of type 'System.String' cannot be converted to type 'System.Nullable'1[System.DateTime]'
```

I also tried with a non-nullable DateTime but got the same error except for the System.Nullable part. 

## Solution

The behaviour you describe is expected because the Razor syntax expects a date type and such is not provided. The detail grids are evaluated on the client so the date cannot be passed via C# as it is not available at the time the child grid is created, it only becomes available once expanded.

I would suggest you use the `Edit()` event handler to find the master grid and master row and set the value to the new model programmatically instead:

```
    .Events(e=>e.Edit("addDefaultDate")).Events(e=>e.Edit("addDefaultDate"))

    function addDefaultDate(e) {
        if (e.model.isNew()) {
            var grid = this;
            var masterRow = grid.element.closest(".k-detail-row").prev();
            var masterGrid = $("#masterGridID").data("kendoGrid");
            var masterDataItem = masterGrid.dataItem(masterRow);
            e.model.set("TestDate" , masterDataItem.TestDate);
        }        
    }
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of the client-side Model](https://docs.telerik.com/kendo-ui/api/javascript/data/model)
