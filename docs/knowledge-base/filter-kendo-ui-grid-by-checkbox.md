---
title: Filtering Kendo UI Grid Based on Checkbox Selection
description: Learn how to filter a Kendo UI Grid by checkbox selection using the dataSource filter method.
type: how-to
page_title: How to Filter Grid Rows in Kendo UI Based on Checkbox Clicks
slug: filter-kendo-ui-grid-by-checkbox
tags: kendo ui, grid, filter, checkbox, datasource
res_type: kb
ticketid: 1660908
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.1.130</td>
</tr>
</tbody>
</table>

## Description

Filtering data in a Kendo UI Grid based on user interaction, such as a checkbox click, is a common scenario. This article demonstrates how to achieve this functionality by leveraging the dataSource [`filter()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method. 

This KB article also answers the following questions:
- How can I filter Grid records using a checkbox?
- Is it possible to toggle Grid data filtering based on a checkbox state?
- What method allows filtering Kendo UI Grid rows based on certain conditions?

## Solution

To filter the Kendo UI Grid records based on the state of a checkbox, follow these steps:

1. Initialize the checkbox as a Kendo UI CheckBox component.
2. Subscribe to the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/checkbox/events/change) event of the CheckBox to apply or remove the filter from the Grid's dataSource based on the checkbox state.

Here is a practical example where a Grid is filtered to show only the records where the field "Discontinued" is `true` when the checkbox is checked. If the checkbox is unchecked, the filter is removed, and all records are shown.

```html
<!-- Include the necessary Kendo UI scripts and styles in your project -->

<div id="eq1"></div>
<div id="grid"></div>

<script>
  $(document).ready(function() {
    // Initialize the checkbox
    $('#eq1').kendoCheckBox({
      label: "Filter the True records",
      change: function(e) {
        var grid = $("#grid").data("kendoGrid");
        if(e.checked) {
          // Apply the filter
          grid.dataSource.filter({ field: "Discontinued", operator: "eq", value: true });
        } else {
          // Remove the filter
          grid.dataSource.filter({});
        }
      }
    });

    // Initialize the Grid (ensure dataSource is configured)
    $("#grid").kendoGrid({
      // Grid configuration
    });
  });
</script>
```

For a live example, check the below Dojo demo.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="example">
      <input type="checkbox" id="eq1" />
      <br>
      <br>
      <div id="grid"></div>

      <script>
        $(document).ready(function() {

          $('#eq1').kendoCheckBox({
            label: "Filter the True records",
            change: function(e) {
              if(e.checked) {
                $("#grid").data("kendoGrid").dataSource.filter({ field: "Discontinued", operator: "eq", value: true });
              } else {
                $("#grid").data("kendoGrid").dataSource.filter({});
              }
              
            }
          });

          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
              input: true,
              numeric: false
            },
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          });
        });
      </script>
```

## See Also

- [Kendo UI Grid DataSource Filter Method Documentation](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter)
- [Kendo UI CheckBox Component Documentation](https://docs.telerik.com/kendo-ui/controls/editors/checkbox/overview)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
