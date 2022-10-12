---
title: Filtering
page_title: jQuery TreeList Documentation - Filtering
description: "Get started with the jQuery TreeList by Kendo UI and learn how to filter its data."
slug: filtering_kendoui_treelist_widget
position: 4
---

# Filtering

The TreeList widget comes with built-in filtering that enables you to display only the rows that match specific search criteria.

To enable filtering in TreeList, use the `filterable` property.

## Header Row Filtering  

To enable the _filter row_ functionallity, set its filtering `mode` to `row`.  As a result, the filter row will appear in the header of the TreeList. Based on the data type of the underlying column data, the TreeList will render textboxes for string values, numeric inputs, or date pickers in the column headers for filtering. You can also specify a default filter operator that will be applied when the user enters a value in the filter textbox and presses `Enter` or `Tab` from the keyboard. To handle this scenario, set `cell` to `operator` for the corresponding column. For a runnable example, refer to the [filter-row demo of the TreeList](https://demos.telerik.com/kendo-ui/treelist/filter-row).


## See Also

* [Header Row Filtering by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/filter-row)
