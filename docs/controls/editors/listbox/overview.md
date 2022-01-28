---
title: Overview
page_title: jQuery ListBox Documentation | ListBox Overview
description: "Get started with the jQuery ListBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_listbox_widget
position: 1
---

# ListBox Overview

The ListBox provides suggestions depending on the typed text and allows multiple value entries.

The widget displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

* [Demo page for the ListBox](https://demos.telerik.com/kendo-ui/listbox/index)

## Initializing the ListBox

To create a Kendo UI ListBox, use a `select` HTML element and supply the configuration settings in the initialization script. Alternatively, you can use the declarative approach which conforms to the convention of initializing Kendo UI widgets with [`data`]({% slug mvvm_initialization_kendoui %}) attributes.

    <!-- Add the select HTML element that is going to hold the Kendo UI ListBox widget -->
    <select id="optional">
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
    </select>

If a data source is not provided in its configuration settings, the ListBox will use the options from the HTML elements as its data source. You can configure the widget for remote operations.

For more information, refer to the articles on:
* [Binding the ListBox to data source]({% slug databinding_kendoui_listbox_widget %})
* [Introduction to Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %})
* [Remote CRUD operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)

## Functionality and Features

* [Data Binding]({% slug databinding_kendoui_listbox_widget %})
* [Selection]({% slug selection_kendoui_listbox_widget %})
* [Dragging and dropping]({% slug dragdrop_kendoui_listbox_widget %})
* [Templates]({% slug templates_kendoui_listbox_widget %})
* [Localization]({% slug localization_listbox %})

## See Also

* [Basic Usage of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/index)
* [Using the API of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/api)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
