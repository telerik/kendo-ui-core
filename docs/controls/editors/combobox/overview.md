---
title: Overview
page_title: jQuery ComboBox Documentation | ComboBox Overview
description: "Get started with the jQuery ComboBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_combobox_widget
position: 1
---

# ComboBox Overview

The ComboBox displays a list of values and allows for a single selection from the list.

The widget enables the user to enter custom values through the keyboard and represents a richer version of the `<select>` element.

* [Demo page for the ComboBox](https://demos.telerik.com/kendo-ui/combobox/index)

## Initializing the ComboBox

To initialize the ComboBox, use any of the following approaches:

* [Bind the widget to a local data array]({% slug databinding_kendoui_combobox %}#binding-to-local-data) and use the `<option>` tag of an existing `<select>` element with defined data items.
* [Bind the widget to a local data array]({% slug databinding_kendoui_combobox %}#binding-to-local-data) and use the `<input>` element.
* [Bind the widget to a remote data service]({% slug databinding_kendoui_combobox %}#binding-to-remote-data) and use the `<input>` element.

When you initialize the ComboBox, note the following specifics:
* Create the ComboBox within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.
* The ComboBox copies the styles and CSS classes from the `input` element to the `wrapper` element.

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_combobox %})
* [Grouping]({% slug grouping_kendoui_combobox_widget %})
* [Server filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [Templates]({% slug templates_kendoui_combobox %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Appearance]({% slug appearance_kendoui_combobox %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})

## Referencing Existing Instances

To refer an existing ComboBox widget, use the [jQuery.data()](https://api.jquery.com/jQuery.data/) configuration option.

    <input id="comboBox" />

    <script>
        var comboBox = $("#comboBox").data("kendoComboBox");
    </script>

## See Also

* [Basic Usage of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/index)
* [Using the API of the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/api)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
