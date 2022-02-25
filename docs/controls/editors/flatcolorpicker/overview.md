---
title: Overview
page_title: jQuery FlatColorPicker Documentation | FlatColorPicker Overview
description: "Get started with the jQuery FlatColorPicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_flatcolorpicker_widget
position: 1
---

# FlatColorPicker Overview

The FlatColorPicker component provides a rich interface to choose a color from Palette and Gradient views. It enables the user to preview the selected color before submit and to ensure that a certain contrast requirements are met.

* [Demo page for the FlatColorPicker](https://demos.telerik.com/kendo-ui/flatcolorpicker/index)

## Basic Configuration

To initialize the FlatColorPicker, use a `div` element.

The below example shows a basic initialization of the FlatColorPicker:

```dojo
    <div id="flatcolorpicker"></div>

    <script>
        $(document).ready(function(){
            $("#flatcolorpicker").kendoFlatColorPicker();
        });
    </script>
```

## Functionality and Features

* [Views]({% slug views_kendoui_flatcolorpicker_widget %})&mdash;The widget supports a gradient view and a palette view.
* [Formats]({% slug rgb_hex_kendoui_flatcolorpicker_widget %})&mdash;The widget supports RGB and HEX input formats.
* [Contrast Tool]({% slug contrast_tool_kendoui_flatcolorpicker_widget %})&mdash;The widget provides a color contrast tool, which checks the contrast ratio between two colors.
* [Accessibility]({% slug accessibility_kendoui_flatcolorpicker_widget %})&mdash;The FlatColorPicker supports various accessibility standards.

## See Also

* [Basic Usage of the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/index)
* [Using the API of the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/api)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
