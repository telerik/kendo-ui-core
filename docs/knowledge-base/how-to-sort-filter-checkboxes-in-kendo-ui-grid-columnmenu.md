---
title: Sorting Filter Checkboxes in Grid ColumnMenu with Tabbed ComponentType
description: Learn how to sort filter checkboxes in ascending order when using a Grid with columnMenu componentType set to "tabbed".
type: how-to
page_title: How to Sort Filter Checkboxes in Kendo UI Grid ColumnMenu
slug: how-to-sort-filter-checkboxes-in-kendo-ui-grid-columnmenu
tags: kendo-ui, grid, sorting, filter, checkboxes, columnmenu
res_type: kb
ticketid: 1677462
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Description
When working with the [Grid for Progress® Kendo UI®](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid), specifically with its `columnMenu` configured to [`componentType = "tabbed"`](/api/javascript/ui/grid/configuration/columnmenu.componenttype) and [`filterable mode = "menu"`](/api/javascript/ui/grid/configuration/filterable.mode), I wanted the filter checkboxes to be sorted in ascending order. This knowledge base article also answers the following questions:
- How can I sort filter options in the Grid's column menu?
- Is it possible to customize the order of filter checkboxes in a Kendo UI Grid?
- Can the Grid's filter menu checkboxes be sorted alphabetically?

## Solution
To sort the filter checkboxes in ascending order for specific columns in a Kendo UI Grid with the `columnMenu` set to a `tabbed` component type, follow these steps:

1. Utilize the Grid's [`columnMenuInit`](/api/javascript/ui/grid/events/columnmenuinit) event. This event triggers when the column menu is initialized, allowing for custom logic to be applied to the filter checkboxes.
2. Inside the event handler, check for the specific fields you want to sort by using `if` statements.
3. Retrieve the `filterMultiCheck` component instance from the `columnMenuInit` event's container.
4. Clear the existing checkboxes using the `empty()` method on the `filterMultiCheck` container.
5. Sort the `checkSource` of the `filterMultiCheck` component based on the desired field and direction (`asc` for ascending).
6. Update the `checkSource` data with the sorted items.
7. Recreate the checkboxes with the sorted items by calling the `createCheckBoxes()` method on the `filterMultiCheck` component.

Below is an example demonstrating how to implement the custom sorting logic within the `columnMenuInit` event:

```javascript
$("#grid").kendoGrid({
  columnMenuInit: function(e) {
    if (e.field === "UnitPrice" || e.field === "ProductName" || e.field === "UnitsInStock") {
      var filterMultiCheck = e.container.find(".k-filterable").data("kendoFilterMultiCheck");
      filterMultiCheck.container.empty();
      filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});

      filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
      filterMultiCheck.createCheckBoxes();
    }
  },
  // Other Grid configurations...
});
```
This example targets columns by their field names (`UnitPrice`, `ProductName`, `UnitsInStock`) and sorts the filter checkboxes for these columns in ascending order. Adjust the field names as necessary for your Grid configuration.

For a practical demonstration, refer to the below Dojo example.

```dojo
    <div id="client"></div>
    <script>
      $(document).ready(function() {
        $("#client").kendoGrid({
          dataSource: {
            transport: {
              read:  {
                url: "https://demos.telerik.com/kendo-ui/service//Products",
                dataType: "jsonp"
              }
            },
            pageSize: 20
          },
          columnMenuInit: function(e) {
            if (e.field === "UnitPrice" || e.field === "ProductName" || e.field === "UnitsInStock") {
              var filterMultiCheck = e.container.find(".k-filterable").data("kendoFilterMultiCheck");
              filterMultiCheck.container.empty();
              filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});

              filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
              filterMultiCheck.createCheckBoxes();
            }
          },
          filterable: true,
          pageable: true,
          height: 550,
          columnMenu: {
            componentType: "tabbed"
          },
          filterable: {
            mode: "menu"
          }, 
          columns: [
            { field: "ProductName", filterable: { multi: true } },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: { multi: true } },
            { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: { multi: true } },
            { field: "Discontinued", width: 120, filterable: { multi: true, dataSource: [{ Discontinued: true }, { Discontinued: false }]} 
            }]
        });
      });
    </script>
111


## See Also
- [ColumnMenuInit Event of Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Sort Multiple Checkbox](https://docs.telerik.com/kendo-ui/knowledge-base/sort-multi-checkbox-filter)
