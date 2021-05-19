---
title: Overview
page_title: jQuery MultiColumnComboBox Documentation | MultiColumnComboBox Overview
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_multicolumncombobox_widget
position: 1
---

# MultiColumnComboBox Overview

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

* [Data binding]({% slug databinding_kendoui_multicolumncombobox %})
* [Columns]({% slug columns_kendoui_multicolumncombobox %})
* [Filtering]({% slug filtering_kendoui_multicolumncombobox %})
* [Grouping]({% slug grouping_kendoui_multicolumncombobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_multicolumncombobox_widget %})
* [Templates]({% slug templates_kendoui_multicolumncombobox %})
* [Cascading MultiColumnComboBoxes]({% slug cascading_kendoui_multicolumncombobox_widget %})

## See Also

* [Basic Usage of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/api)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
