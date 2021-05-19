---
title: Overview
page_title: jQuery MultiSelect Documentation | MultiSelect Overview
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_multiselect_widget
position: 1
---

# MultiSelect Overview

The MultiSelect displays a list of options and allows multiple selections from this list.

The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

* [Demo page for the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index)

## Initializing the MultiSelect

To initialize the MultiSelect, use the `<option>` tag of an existing `<select>` element with defined data items.

You can also initialize the MultiSelect through binding it to local or remote data and then using the `<select>` element. For more information, refer to the [article on data binding]({% slug databinding_multiselect %}).

Regardless of the applied initialization, the performance and functionality of the MultiSelect are consistent. For a complete example, refer to the [demo on the basic usage of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index).

> * When you initialize the MultiSelect, create it within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The MultiSelect copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

The following example demonstrates how to initialize the MultiSelect from an existing `<select>` element with defined data items.

    <select id="multiselect">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#multiselect").kendoMultiSelect();
        });
    </script>

## Functionality and Features

* [Data binding]({% slug databinding_multiselect %})
* [Grouping]({% slug grouping_kendoui_multiselect_widget %})
* [Server filtering]({% slug server_filtering_kendoui_multiselect_widget %})
* [Virtualization]({% slug virtualization_kendoui_multiselect_widget %})
* [Summary-tag mode]({% slug tagmode_multiselect %})
* [Templates]({% slug templates_multiselect %})
* [Adding new items]({% slug newitems_multiselect %})
* [Rendering and dimensions]({% slug rendering_multiselect %})
* [Globalization]({% slug globalization_multiselect %})
* [Accessibility]({% slug accessibility_kendoui_multiselect_widget %})

## Events

For a complete example on the basic MultiSelect events, refer to the [demo on using the events of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/events).

## See Also

* [Basic Usage of the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/index)
* [Using the Basic Events of the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/events)
* [Using the MultiSelect with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/multiselect/angular)
* [Using the API of the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/api)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
