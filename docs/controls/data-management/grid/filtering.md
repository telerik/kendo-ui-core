---
title: Filtering
page_title: jQuery Grid Documentation | Filtering | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to filter its data."
slug: filtering_kendoui_grid_widget
position: 4
---

# Filtering

By default, the filtering functionality of the Kendo UI Grid is disabled.

To control filtering in the Grid, use the `filterable` property.

The Grid enables you to implement the following filter options:
* [Header row filtering](#filtering-by-rows)
* [Filtering by checkboxes](#filtering-by-checkboxes)
* [Custom menu filtering](#custom-mennu-filtering)

## Header Row Filtering  

To enable the filter row in the header of the Grid, set `mode` to `row`. As a result, based on the data type of the underlying column data, the Grid will render textboxes for string values, numeric inputs, or date pickers in the column headers for filtering. You can also specify a default filter operator that will be applied when the user enters a value in the filter textbox and presses `Enter` or `Tab` from the keyboard. To handle this scenario, set `cell` to `operator` for the corresponding column. For a runnable example, refer to the [filter-row demo of the Grid](https://demos.telerik.com/kendo-ui/grid/filter-row).

## Filtering by Checkboxes

To render a checkbox list in the filter menu, set `multi=true` for the desired Grid columns. You can also combine the checkbox filter with the `itemTemplate` definition and customize the checkbox items that will be displayed. For a runnable example, refer to the [multi-checkbox filter demo of the Grid](https://demos.telerik.com/kendo-ui/grid/filter-multi-checkboxes).

## Custom Menu Filtering

You can apply common settings for the menu configuration of the Grid filter and customize its UI per each column.

The runnable [demo on implementing custom menu filtering](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization) demonstrates how to:

1. Specify a single filter criterion through setting `extra=false`
1. Limit the filter operators for string columns to `starts with`, `is equal to`, and `is not equal to` only.
1. Define the built-in date-picker UI to filter the date-time column in the Grid.
1. Instantiate the Kendo UI AutoComplete and DropDownList for the **Title** and **City** columns respectively.

## See Also

* [Header Row Filtering by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/filter-row)
* [Multi-Checkbox Filtering by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/filter-multi-checkboxes)
* [Custom Menu Filtering by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization)
* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
