---
title: Overview
page_title: jQuery ColorGradient Documentation - ColorGradient Overview
description: "Get started with the jQuery ColorGradient by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_colorgradient_widget
position: 1
---

# {{ site.product }} ColorGradient Overview

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

As of Kendo UI R3 2022, you can initialize the ColorGradient from an `input` element and use it for value submission. The widget is also supported as an editor in the Kendo Form.

```dojo
    <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
          ID: 1,
          Name: "John Doe",
          Address: 3,
          Color: "red"
        },
        items: [
          {
            field: "Name",
            validation: { required: true }
          },
          {
            field: "Address",
            editor:"DropDownList",
            editorOptions:{
              dataTextField:"text",
              dataValueField:"id",
              dataSource: {
                data: [
                  {text:"Sofia", id:1},
                  {text:"London", id:2},
                  {text:"New York", id:3}
                ]
              }
            }
          },
          {
            field: "Color",
            editor:"ColorGradient"
          }
        ]
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
