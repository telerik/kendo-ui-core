---
title: Getting Started
page_title: jQuery FlatColorPicker Documentation - Getting Started with the FlatColorPicker
description: "Get started with the jQuery FlatColorPicker by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_flatcolorpicker_widget
position: 2
---


# Getting Started with the FlatColorPicker 

This guide demonstrates how to get up and running with the Kendo UI for jQuery FlatColorPicker.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="flatcolorpicker"></div>
    <script>
        $(document).ready(function(){
            $("#flatcolorpicker").kendoFlatColorPicker({
                clearButton: true
            });
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be the content of the FlatColorPicker.

```html
    <div id="flatcolorpicker"></div>
```

## 2. Initialize the FlatColorPicker

In this step, you will initialize the FlatColorPicker from the `<div>` element.

```dojo
    <div id="flatcolorpicker"></div>
    <script>
        $(document).ready(function(){
            $("#flatcolorpicker").kendoFlatColorPicker();
        });
    </script>
```

## 3. Apply Configuration Settings

Here, you will apply some settings such as [`clearButton`](/api/javascript/ui/flatcolorpicker/configuration/clearbutton), [`buttons`](/api/javascript/ui/flatcolorpicker/configuration/buttons), and [`opacity`](/api/javascript/ui/flatcolorpicker/configuration/opacity).

```dojo
    <div id="flatcolorpicker"></div>

    <script>
        $(document).ready(function(){
            $("#flatcolorpicker").kendoFlatColorPicker({ 
                buttons: true, // Display the Apply / Cancel buttons.
                clearButton: true, // Display the 'Clear color' button.
                opacity: true // Render the opacity slider to allow selection of transparency.
            });
        });
    </script>
```
## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the FlatColorPicker](https://demos.telerik.com/kendo-ui/flatcolorpicker/index)

## See Also 

* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
