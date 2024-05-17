---
title: Overview
page_title: jQuery MultiColumnComboBox Documentation - MultiColumnComboBox Overview
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_multicolumncombobox_widget
position: 1
---

# {{ site.product }} MultiColumnComboBox Overview

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

Besides the core virtualization, templates, cascading, and data-binding functionality that the standard Kendo UI ComboBox provides, the MultiColumnComboBox enables you to define columns that will be rendered in the drop-down and specify against which fields from the data source the filter will apply.

* [Demo page for the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)

## Initializing the MultiColumnComboBox

To initialize the MultiColumnComboBox, use any of the following approaches:

* Use the `<option>` tag of an existing `<select>` element with defined data items.
* Bind the widget to a local data array and use the `<input>` element.
* Bind the widget to a remote data service and use the `<input>` element.

> * Verify that you create the MultiColumnComboBox within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_multicolumncombobox %})&mdash;The MultiColumnComboBox enables you to bind it to local data arrays and to remote data services.
* [Columns]({% slug columns_kendoui_multicolumncombobox %})&mdash;You can configure multiple columns based on the data fields in the MultiColumnComboBox.
* [Filtering]({% slug filtering_kendoui_multicolumncombobox %})&mdash;The MultiColumnComboBox allows you to filter its data.
* [Grouping]({% slug grouping_kendoui_multicolumncombobox_widget %})&mdash;You can use the provided options for displaying data items categorized by a specific model field of the MultiColumnComboBox.
* [Virtualization]({% slug virtualization_kendoui_multicolumncombobox_widget %})&mdash;The MultiColumnComboBox enables you to display large datasets by using a fixed amount of list items in its popup list.
* [Templates]({% slug templates_kendoui_multicolumncombobox %})&mdash;You can also control the way a MultiColumnComboBox item or the popup header and footer are rendered by using the Kendo UI templates.
* [Cascading MultiColumnComboBoxes]({% slug cascading_kendoui_multicolumncombobox_widget %})&mdash;The cascading functionality of the MultiColumnComboBox enables you to implement a series of two or more components in which each MultiColumnComboBox is filtered according to the selected options in the previous one.
* [Appearance]({% slug appearance_kendoui_multicolumncombobox_widget %})&mdash;You can use the available styling options for configuring the size, border radius, and fill mode of the MultiColumnComboBox.
* [Prefix and suffix]({% slug prefix_suffix_multicolumncombobox %})&mdash;The MultiColumnComboBox component lets you add custom content as prefix and suffix adornments.

## Next Steps

* [Getting Started with the Kendo UI MultiColumnComboBox for jQuery]({% slug getting_started_kendoui_multicolumncombobox_component %})
* [Basic Usage of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)

## See Also

* [Basic Usage of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/api)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
