---
title: Overview
page_title: jQuery ColorPalette Documentation - ColorPalette Overview
description: "Get started with the jQuery ColorPalette by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_colorpalette_widget
position: 1
---

# {{ site.product }} ColorPalette Overview

The Kendo UI for jQuery ColorPalette renders colors by using color presets (sets of predefined colors) or by implementing a custom color palette.

* [Demo page for the ColorPalette](https://demos.telerik.com/kendo-ui/colorpalette/index)

## Basic Configuration

To initialize the ColorPalette, use a `div` element. The following example shows a basic configuration of the ColorPalette widget:

```dojo
    <div id="colorpalette"></div>

    <script>
        $(document).ready(function(){
            $("#colorpalette").kendoColorPalette();
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
            editor:"ColorPalette"
          }
        ]
      });
    </script>
```

## Functionality and Features

* [Color Presets]({% slug presets_kendoui_colorpalette_widget %})&mdash;The widget provides a set of predefined color palettes.
* [Accessibility]({% slug accessibility_kendoui_colorpalette_widget %})&mdash;The ColorPalette supports various accessibility standards.

## Next Steps 

* [Getting Started with the Kendo UI ColorPalette for jQuery]({% slug getting_started_kendoui_colorpalette_widget %})
* [Basic Usage of the ColorPalette (Demo)](https://demos.telerik.com/kendo-ui/colorpalette/index)
* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)

## See Also

* [Overview of the ColorPalette (Demo)](https://demos.telerik.com/kendo-ui/colorpalette/index)
* [Using the API of the ColorPalette (Demo)](https://demos.telerik.com/kendo-ui/colorpalette/api)
* [JavaScript API Reference of the ColorPalette](/api/javascript/ui/colorpalette)
