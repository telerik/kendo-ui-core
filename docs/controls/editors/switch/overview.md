---
title: Overview
page_title: jQuery Switch Documentation | Switch Overview
description: "Get started with the jQuery Switch by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_switch_widget
position: 1
---

# Switch Overview

The Switch displays two exclusive choices.

When initialized, the Switch renders the currently selected value. The Switch can be created from an `input` element of type `checkbox`. The default styling of the Switch widget for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on implementing a [custom layout for the Switch](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

* [Demo page for the Switch](https://demos.telerik.com/kendo-ui/switch)

## Initializing the Switch

To create the Switch, use an HTML `<input>` element.

    <input id="switch" />

To initialize the Switch, use a jQuery selector.

    $(document).ready(function() {
        $("#switch").kendoSwitch();
    });

## Functionality and Features

* [Checked Switch]({% slug checked_kendoui_switch_widget %})
* [Disabled Switch]({% slug disabled_kendoui_switch_widget %})
* [Read-only Switch]({% slug readonly_kendoui_switch_widget %})
* [Custom Switch]({% slug custom_kendoui_switch_widget %})
* [Accessibility]({% slug accessibility_kendoui_switch %})

## Referencing Existing Instances

To reference an existing Switch instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the API to control its behavior.

## See Also

* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [Using the API of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/api)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
