---
title: Custom Switch
page_title: jQuery Switch Documentation | Custom Switch
description: "Get started with the jQuery Switch by Kendo UI and customize its layout and label messages."
slug: custom_kendoui_switch_widget
position: 5
---

# Custom Switch


## Customizing the Layout

With the new Switch variables introduced in R1 2019 release, the default styling of the Switch component for each of the [Sass-based themes](/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout.

For more information and examples, refer to the [Custom Switch Component Layout](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout) article, which demonstrates how to override the default Sass values in order to achieve any of the predefined custom layouts.

## Customizing the Label Messages

The following example demonstrates how to customize the checked and unchecked messages of the Switch.

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
            messages: {
                checked: "YES",
                unchecked: "NO"
            }});
    </script>

## See Also

* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [Using the API of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/api)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
