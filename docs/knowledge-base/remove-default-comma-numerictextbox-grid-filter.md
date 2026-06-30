---
title: Removing Default Comma in Grid Filter Cells with NumericTextBox
description: Learn how to globally configure the Kendo UI NumericTextBox in filter cells to remove the default comma separator.
type: how-to
page_title: Configure NumericTextBox to Remove Default Comma in Grid Filters
meta_title: Configure NumericTextBox to Remove Default Comma in Grid Filters
slug: remove-default-comma-numerictextbox-grid-filter
tags: numerictextbox, grid, filtering, configuration, kendo-ui, asp-net-core
res_type: kb
ticketid: 1715782
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for ASP.NET Core</td>
</tr>
<tr>
<td>Version</td>
<td>2026.2.520</td>
</tr>
</tbody>
</table>

## Description

I need to remove the default comma separator for numbers in the filter cells of a Kendo UI Grid when using a [NumericTextBox](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/editors/numerictextbox/overview). The requirement is to display numbers as integers without any commas globally for all NumericTextBox instances in Grid filters.

This knowledge base article also answers the following questions:
- How to format NumericTextBox in filter cells to remove commas?
- How to set a global configuration for NumericTextBox formatting in Kendo UI Grid?
- How to modify NumericTextBox filter cell behavior in ASP.NET Core Grid?

## Solution

To achieve the desired behavior, configure the global `NumericTextBox` options to enforce integer formatting without commas. Use the following JavaScript code to set the `decimals` to `0` and the `format` to `"n0"` globally.

### Steps

1. Add the following script in your HTML file or layout file:
```javascript
<script>
    kendo.ui.NumericTextBox.fn.options.decimals = 0;
    kendo.ui.NumericTextBox.fn.options.format = "n0";
</script>
```

2. Ensure this script runs before initializing the Grid. This ensures that all NumericTextBox instances in filter cells follow the specified configuration.

### Example

Here is an example of applying this solution: [Repl](https://netcorerepl.telerik.com/QgYUcdFI442fOToy38)

This ensures no commas appear in the NumericTextBox for filter cells, and numbers are displayed as integers.

## See Also

- [UI for ASP.NET Core  NumericTextBox Overview](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/editors/numerictextbox/overview)
- [UI for ASP.NET Core Grid Overview](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/overview)
