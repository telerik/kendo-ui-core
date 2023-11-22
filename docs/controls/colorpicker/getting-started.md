---
title: Getting Started
page_title: jQuery ColorPicker Documentation - Getting Started with the ColorPicker
description: "Get started with the jQuery ColorPicker by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_colorpicker_widget
position: 2
---


# Getting Started with the ColorPicker 

This guide demonstrates how to get up and running with the Kendo UI for jQuery ColorPicker.

After the completion of this guide, you will achieve the following end result:

```dojo
    <input type="color" id="colorpicker" />

    <script>
        $(document).ready(function(){
            $("#colorpicker").kendoColorPicker({ 
                views:["palette"],
                preview:false,
                palette: "basic" 
            });
        });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page that will be used to initialize the component. The content of the `<input>` will be the content of the ColorPicker.

```html
    <input type="color" id="colorpicker" />
```

## 2. Initialize the ColorPicker

In this step, you will initialize the ColorPicker from the `<input>` element.

```dojo
    <input type="color" id="colorpicker" />

    <script>
        $(document).ready(function(){
            $("#colorpicker").kendoColorPicker();
        });
    </script>
```

## 3. Apply Configuration Settings

Here, you will apply some settings such as [`views`](/api/javascript/ui/colorpicker/configuration/views), [`preview`](/api/javascript/ui/colorpicker/configuration/preview), [`format`](/api/javascript/ui/colorgradient/configuration/format), and [`palette`](/api/javascript/ui/colorpicker/configuration/palette).

```dojo
    <input type="color" id="colorpicker" />

    <script>
        $(document).ready(function(){
            $("#colorpicker").kendoColorPicker({ 
                views:["palette"], // Set the view for the ColorPicker.
                preview:false, // Disable the displaying of the color preview element and the previously selected color for comparison.
                palette: "basic" // Define the drop-down that lists the colors.
            });
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/index)

## See Also 

* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
