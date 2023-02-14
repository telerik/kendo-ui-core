---
title: Overview
page_title: jQuery FlatColorPicker Documentation - FlatColorPicker Overview
description: "Get started with the jQuery FlatColorPicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_flatcolorpicker_widget
position: 1
---

# {{ site.product }} FlatColorPicker Overview

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
            editor:"FlatColorPicker"
          }
        ]
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
