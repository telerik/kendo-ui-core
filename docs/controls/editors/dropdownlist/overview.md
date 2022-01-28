---
title: Overview
page_title: jQuery DropDownList Documentation | DropDownList Overview
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_dropdownlist_widget
position: 1
---

# DropDownList Overview

The DropDownList displays a list of values and allows for a single selection from the list.

The user input is restricted within the predefined options. To apply a keyboard input, use the [Kendo UI ComboBox]({% slug overview_kendoui_combobox_widget %}).

* [Demo page for the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index)

## Initializing the DropDownList

To initialize the DropDownList, use the `<option>` tag of an existing `<select>` element with defined data items.

You can also initialize the DropDownList through binding it to local or remote data and then using the `<input>` or the `<select>` element. For more information, refer to the [article on data binding]({% slug databinding_dropdownlist_widget %}).

Regardless of the applied initialization, the performance and functionality of the DropDownList are consistent. For a complete example, refer to the [demo on the basic usage of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index).

> * When you initialize the DropDownList, create it within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The DropDownList copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

The following example demonstrates how to initialize the DropDownList from an existing `<select>` element with defined data items.

```dojo
    <select id="dropdownlist">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#dropdownlist").kendoDropDownList();
        });
    </script>
```

## Functionality and Features

* [Data binding]({% slug databinding_dropdownlist_widget %})
* [Grouping]({% slug grouping_kendoui_ddl_widget %})
* [Server filtering]({% slug server_filtering_kendoui_ddl_widget %})
* [Virtualization]({% slug virtualization_kendoui_ddl_widget %})
* [Templates]({% slug templates_dropdownlist_widget %})
* [Adding new items]({% slug newitems_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_ddl_widget %})
* [Rendering and dimensions]({% slug rendering_dropdownlist_widget %})
* [Globalization]({% slug globalization_dropdownlist_widget %})
* [Accessibility]({% slug accessibility_kendoui_grid_widget %})

For more information on implementing specific scenarios, refer to the [**Knowledge Base** section](https://docs.telerik.com/kendo-ui/knowledge-base).

## See Also

* [Basic Usage of the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/index)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [Troubleshooting]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
