---
title: Overview
page_title: jQuery ColorGradient Documentation | ColorGradient Overview
description: "Get started with the jQuery ColorGradient by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_colorgradient_widget
position: 1
---

# ColorGradient Overview

The Kendo UI for jQuery ColorGradient renders a gradient (a hue and an alpha slider) and inputs to manually enter a desired color. You can directly add the widget to the page instead of rendering it in a popup.

* [Demo page for the ColorGradient](https://demos.telerik.com/kendo-ui/colorgradient/index)

## Basic Configuration

To initialize the ColorGradient, use a `div` element. The following example shows a basic implementation of the widget.

```dojo
    <div id="colorgradient"></div>

    <script>
        $(document).ready(function(){
            $("#colorgradient").kendoColorGradient();
        });
    </script>
```

## Functionality and Features

* [Contrast Tool]({% slug contrast_tool_kendoui_colorgradient_widget %})&mdash;The widget provides a color contrast tool, which checks the contrast ratio between two colors.
* [Formats]({% slug rgb_hex_kendoui_colorgradient_widget %})&mdash;The widget supports RGB and HEX input formats.
* [Accessibility]({% slug accessibility_kendoui_colorgradient_widget %})&mdash;The ColorGradient supports various accessibility standards.

## See Also

* [Overview of the ColorGradient (Demo)](https://demos.telerik.com/kendo-ui/colorgradient/index)
* [Using the API of the ColorGradient (Demo)](https://demos.telerik.com/kendo-ui/colorgradient/api)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorgradient)
