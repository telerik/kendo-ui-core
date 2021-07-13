---
title: Overview
page_title: jQuery AutoComplete Documentation | AutoComplete Overview
description: "Get started with the jQuery AutoComplete by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Overview

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/index)

## Initializing the AutoComplete

To initialize the AutoComplete, use a jQuery selector.

    <input id="autoComplete" />

    $(document).ready(function() {
     $("#autoComplete").kendoAutoComplete(["Item1", "Item2"]);
    });

The AutoComplete copies the styles and CSS classes from the `input` element to the `wrapper` element. For example, `<input id="autoComplete" class="myClass" />` results in the following output.

    <span class="k-widget k-autocomplete k-header k-state-default myClass">
        <input id="autoComplete" class="myClass" />
    </span>

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_autocomplete %})
* [Grouping]({% slug grouping_kendoui_autocomplete_widget %})
* [Server filtering]({% slug server_filtering_kendoui_autocomplete_widget %})
* [Templates]({% slug templates_kendoui_autocomplete %})
* [Virtualization]({% slug virtualization_kendoui_autocomplete_widget %})
* [Appearance]({% slug sizedimensions_kendoui_autocomplete %})

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
